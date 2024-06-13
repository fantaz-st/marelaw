"use client";

import classes from "./ArticlesPageSidebar.module.css";
import Link from "next/link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ArticlesPageSidebar = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("search", searchTerm);
    router.push(`/articles?${newSearchParams.toString()}`);
  };

  const createCategoryLink = (categorySlug) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("category", categorySlug);
    return `/articles?${newSearchParams.toString()}`;
  };

  const handleRemoveFilter = (filterType) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (filterType === "category") {
      newSearchParams.delete("category");
    } else if (filterType === "search") {
      newSearchParams.delete("search");
    }
    router.push(`/articles?${newSearchParams.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(searchParams.get("category") || searchParams.get("search")) && <Typography variant='h5'>Active filters</Typography>}
      {searchParams.get("category") && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='body1'>{categoryMap[searchParams.get("category")]}</Typography>
          <CloseRoundedIcon onClick={() => handleRemoveFilter("category")} style={{ cursor: "pointer" }} />
        </Box>
      )}
      {searchParams.get("search") && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='body1'>{searchParams.get("search")}</Typography>
          <CloseRoundedIcon onClick={() => handleRemoveFilter("search")} style={{ cursor: "pointer" }} />
        </Box>
      )}
      <form onSubmit={handleSearchSubmit}>
        <TextField id='outlined-controlled' label='Search' inputProps={{ style: { padding: "1.75rem 0.5rem" } }} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      </form>
      <Typography variant='h5'>Categories</Typography>
      <List>
        {categories.map((cat) => (
          <ListItem key={cat.slug}>
            <Link href={createCategoryLink(cat.slug)}>
              <Typography variant='body1'>{cat.name}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ArticlesPageSidebar;
