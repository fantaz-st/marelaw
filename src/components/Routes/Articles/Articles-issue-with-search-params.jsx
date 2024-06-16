"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import classes from "./Articles.module.css";
import HorizontalArticleCard from "@/components/HorizontalArticleCard/HorizontalArticleCard";
import useFetch from "@/hooks/useFetch";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { newsQuery } from "@/helpers/queryLists";
import Link from "next/link";

const Articles = ({ searchParams, initialArticles }) => {
  const { nodes: categoryNodes } = initialArticles.data.categories;
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  const { sendRequest, fetchData, loading } = useFetch();

  const [articles, setArticles] = useState(initialArticles.data.posts.nodes);
  const [endCursor, setEndCursor] = useState(initialArticles.data.posts.pageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(initialArticles.data.posts.pageInfo.hasNextPage);
  const [filter, setFilter] = useState({ category: searchParams.category, search: searchParams.search });

  const categoryMap = {};
  categoryNodes.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

  useEffect(() => {
    const fetchInitialArticles = async () => {
      const query = newsQuery.call(this, {
        numberOfPosts: 10,
        search: filter.search,
        category: filter.category,
      });

      await sendRequest(query);
    };

    fetchInitialArticles();
  }, [filter, sendRequest]);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParamsHook.toString());
    const category = urlParams.get("category") || "";
    const search = urlParams.get("search") || "";

    setFilter({ category, search });
  }, [searchParamsHook]);

  const observer = useRef();

  const loadMorePosts = useCallback(async () => {
    if (loading) return;
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
    const newFilter = { ...filter };
    if (filterType === "search") {
      newFilter.search = "";
    } else if (filterType === "category") {
      newFilter.category = "";
    }
    setFilter(newFilter);
    router.push(`/articles?${new URLSearchParams(newFilter).toString()}`);
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
            {filter.category && (
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
          <Typography variant='h5'>All categories</Typography>
          <List>
            {categoryNodes.map((cat) => (
              <ListItem key={cat.slug}>
                <Link href={`/articles?category=${cat.slug}`}>
                  <Typography variant='body'>{cat.name}</Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Articles;
