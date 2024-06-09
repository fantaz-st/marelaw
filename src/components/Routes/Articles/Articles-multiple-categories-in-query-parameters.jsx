"use client";
import { Box, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classes from "./Articles.module.css";
import HorizontalArticleCard from "@/components/HorizontalArticleCard/HorizontalArticleCard";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Articles = ({ searchParams, articles }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  /* const handleSearchSubmit = (event) => {
    event.preventDefault();

    router.push(`/articles?search=${encodeURIComponent(searchTerm)}`);
  }; */

  // Create a mapping from category slug to category name
  const categoryMap = {};
  articles.data.categories.nodes.forEach((cat) => {
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

    // Get current categories from searchParams, or initialize an empty array if none exist
    const currentCategories = newSearchParams.getAll("category");

    if (!currentCategories.includes(categorySlug)) {
      currentCategories.push(categorySlug);
    }

    newSearchParams.delete("category"); // Remove existing category parameters
    currentCategories.forEach((cat) => newSearchParams.append("category", cat)); // Add updated categories

    return `/articles?${newSearchParams.toString()}`;
  };

  const handleRemoveFilter = (filterType, filterValue) => {
    let newSearchString = "";

    if (filterType === "category") {
      // Get current categories from searchParams, or initialize an empty array if none exist
      let currentCategories = searchParams.category || [];

      // Ensure currentCategories is an array
      if (!Array.isArray(currentCategories)) {
        currentCategories = [currentCategories];
      }

      // Remove the specified category
      currentCategories = currentCategories.filter((cat) => cat !== filterValue);

      // Construct the category part of the search string
      const categorySearchString = currentCategories.map((cat) => `category=${encodeURIComponent(cat)}`).join("&");

      // Construct the new search string
      newSearchString = categorySearchString;

      // If there's a search term, add it to the search string
      if (searchParams.search) {
        newSearchString += `&search=${encodeURIComponent(searchParams.search)}`;
      }
    } else if (filterType === "search") {
      // If removing a search term, just construct the search string from the categories
      const currentCategories = searchParams.category || [];
      newSearchString = Array.isArray(currentCategories) ? currentCategories.map((cat) => `category=${encodeURIComponent(cat)}`).join("&") : `category=${encodeURIComponent(currentCategories)}`;
    }

    router.push(`/articles?${newSearchString}`);
  };

  return (
    <Box className={classes.container} maxWidth='xl'>
      <Box className={classes.header}>
        <Typography variant='h1'>All Articles</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box className={classes.content}>
            {articles.data.posts.nodes.map((article) => (
              <HorizontalArticleCard article={article} id={article.id} key={article.id} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Typography variant='h5'>Active filters</Typography>

            {Array.isArray(searchParams.category)
              ? searchParams.category.map((cat, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Typography variant='p'>{categoryMap[cat]}</Typography>
                    <CloseRoundedIcon onClick={() => handleRemoveFilter("category", cat)} style={{ cursor: "pointer" }} />
                  </Box>
                ))
              : searchParams.category && (
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
                    padding: "1.75rem 0",
                  },
                }}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </form>
            <Typography variant='h5'>Categories</Typography>
            <List>
              {articles.data.categories.nodes.map((cat) => (
                <ListItem key={cat.slug}>
                  <Link href={createCategoryLink(cat.slug)}>
                    <Typography variant='body'>{cat.name}</Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Articles;
