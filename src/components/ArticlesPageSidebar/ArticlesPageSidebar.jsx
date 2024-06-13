"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import classes from "./ArticlesPageSidebar.module.css";

const ArticlesPageSidebar = ({ searchParams, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Create a mapping from category slug to category name
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

  const handleSearchSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (searchTerm) {
        router.push(`/articles?search=${searchTerm}`);
      }
    },
    [searchTerm, router]
  );

  const handleRemoveFilter = useCallback(
    (filterType, filterValue) => {
      const newParams = { ...searchParams };
      delete newParams[filterType];
      router.push(`/articles?${new URLSearchParams(newParams).toString()}`);
    },
    [searchParams, router]
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }} className={classes.sidebar}>
      {(searchParams.category || searchParams.search) && <Typography variant='h5'>Active filters</Typography>}

      {searchParams.category && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='body1'>{categoryMap[searchParams.category]}</Typography>
          <CloseRoundedIcon onClick={() => handleRemoveFilter("category", searchParams.category)} style={{ cursor: "pointer" }} />
        </Box>
      )}
      {searchParams.search && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant='body1'>{searchParams.search}</Typography>
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
            <Link href={`/articles?category=${cat.slug}`}>
              <Typography variant='body1'>{cat.name}</Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ArticlesPageSidebar;
