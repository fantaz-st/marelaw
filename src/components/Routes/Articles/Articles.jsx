"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import classes from "./Articles.module.css";
import HorizontalArticleCard from "@/components/HorizontalArticleCard/HorizontalArticleCard";
import useFetch from "@/hooks/useFetch";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { newsQuery } from "@/helpers/queryLists";

const Articles = ({ searchParams, initialArticles }) => {
  const { nodes: articleNodes } = initialArticles.data.posts;
  const { nodes: categoryNodes } = initialArticles.data.categories;

  const { sendRequest, fetchData, loading } = useFetch();

  const [articles, setArticles] = useState(articleNodes);
  const [endCursor, setEndCursor] = useState(initialArticles.data.posts.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(initialArticles.data.posts.pageInfo.hasNextPage);
  const [filter, setFilter] = useState({ category: searchParams.category, search: searchParams.search });

  const categoryMap = {};
  categoryNodes.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

  useEffect(() => {
    // Function to fetch initial articles based on searchParams
    const fetchInitialArticles = async () => {
      const query = newsQuery.call(this, {
        numberOfPosts: 10, // Adjust number of posts as needed
        search: filter.search,
        category: filter.category,
      });

      await sendRequest(query);
    };

    fetchInitialArticles();
  }, [filter]); // Fetch initial articles when filters change

  useEffect(() => {
    // Update articles when fetchData updates
    if (fetchData && fetchData.posts) {
      setArticles(fetchData.posts.nodes); // Set articles directly
      setEndCursor(fetchData.posts.pageInfo.endCursor);
      setHasNextPage(fetchData.posts.pageInfo.hasNextPage);
    }
  }, [fetchData]);

  const observer = useRef();

  const loadMorePosts = useCallback(async () => {
    if (loading) return;
    console.log("loading more posts");
    const query = newsQuery.call(this, {
      numberOfPosts: 2,
      endCursor: endCursor,
      search: filter.search,
      category: filter.category,
    });

    await sendRequest(query);
  }, [endCursor, filter.search, filter.category, sendRequest]);

  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            loadMorePosts();
          }
        },
        { threshold: 1.0, rootMargin: "0px" }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasNextPage, loadMorePosts]
  );

  const handleRemoveFilter = (filterType, filterValue) => {
    if (filterType === "search") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        search: "", // Clear the search filter
      }));
    } else if (filterType === "category") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        category: "", // Clear the category filter
      }));
    }
  };

  return (
    <Box className={classes.container} maxWidth='xl'>
      <Box className={classes.header}>
        <Typography variant='h1'>All Articles</Typography>
      </Box>
      {articles?.length === 0 && <Typography variant='body'>No articles matching your query</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box className={classes.content}>
            {articles.map((article, index) => (
              <HorizontalArticleCard
                article={article}
                id={article.id}
                key={article.id}
                ref={articles.length === index + 1 ? lastArticleElementRef : null} // Assign ref conditionally
              />
            ))}
          </Box>
          {!hasNextPage && <Typography variant='body'>No more articles matching current filters</Typography>}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(filter.category || filter.search) && <Typography variant='h5'>Active filters</Typography>}

            {Array.isArray(filter.category)
              ? filter.category.map((category, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Typography variant='body'>{categoryMap[category]}</Typography>
                    <CloseRoundedIcon onClick={() => handleRemoveFilter("category", category)} style={{ cursor: "pointer" }} />
                  </Box>
                ))
              : filter.category && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Typography variant='body'>{categoryMap[filter.category]}</Typography>
                    <CloseRoundedIcon onClick={() => handleRemoveFilter("category", filter.category)} style={{ cursor: "pointer" }} />
                  </Box>
                )}
            {filter.search && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Typography variant='body'>{filter.search}</Typography>
                <CloseRoundedIcon onClick={() => handleRemoveFilter("search", filter.search)} style={{ cursor: "pointer" }} />
              </Box>
            )}
          </Box>
          {/* <ArticlesPageSidebar searchParams={searchParams} categories={categoryNodes} /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Articles;
