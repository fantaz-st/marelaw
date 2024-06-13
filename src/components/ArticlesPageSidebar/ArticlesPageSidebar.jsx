"use client";

import classes from "./ArticlesPageSidebar.module.css";
import Link from "next/link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ArticlesPageSidebar = ({ searchParams, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Create a mapping from category slug to category name
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", searchTerm);

    router.push(`/articles?${newSearchParams.toString()}`);
  };

  const createCategoryLink = (categorySlug) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Set the category parameter to the new categorySlug, effectively replacing any existing category
    newSearchParams.set("category", categorySlug);

    return `/articles?${newSearchParams.toString()}`;
  };

  const handleRemoveFilter = (filterType, filterValue) => {
    let newSearchString = "";

    if (filterType === "category") {
      // Clear the category parameter
      newSearchString = searchParams.search ? `search=${encodeURIComponent(searchParams.search)}` : "";
    } else if (filterType === "search") {
      // If removing a search term, just construct the search string without the search parameter
      const category = searchParams.category;
      newSearchString = category ? `category=${encodeURIComponent(category)}` : "";
    }

    router.push(`/articles?${newSearchString}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {(searchParams.category || searchParams.search) && <Typography variant='h5'>Active filters</Typography>}

      {searchParams.category && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='p'>{categoryMap[searchParams.category]}</Typography>
          <CloseRoundedIcon onClick={() => handleRemoveFilter("category", searchParams.category)} style={{ cursor: "pointer" }} />
        </Box>
      )}
      {searchParams.search && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='p'>{searchParams.search}</Typography>
          <CloseRoundedIcon onClick={() => handleRemoveFilter("search", searchParams.search)} style={{ cursor: "pointer" }} />
        </Box>
      )}

      <form onSubmit={handleSearchSubmit}>
        <TextField
          id='outlined-controlled'
          label='Search'
          inputProps={{
            style: {
              padding: "1.75rem 0.5rem",
            },
          }}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
      <Typography variant='h5'>Categories</Typography>
      <List>
        {categories.map((cat) => (
          <ListItem key={cat.slug}>
            <Link href={createCategoryLink(cat.slug)}>
              <Typography variant='body'>{cat.name}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ArticlesPageSidebar;
