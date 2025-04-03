"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import classes from "./Articles.module.css";

import useFetch from "@/hooks/useFetch";
import { newsQuery } from "@/helpers/queryLists";
import HorizontalArticleCard from "@/components/HorizontalArticleCard/HorizontalArticleCard";

const Articles = ({ searchParams, initialArticles }) => {
  // ----------------------
  //  1) INITIAL (SSR) STATE
  // ----------------------
  const {
    data: {
      categories: { nodes: categoryNodes },
      posts: { nodes: initialNodes, pageInfo: initialPageInfo },
    },
  } = initialArticles;

  // Keep an initial list of articles from SSR
  const [articles, setArticles] = useState(initialNodes);
  const [endCursor, setEndCursor] = useState(initialPageInfo.endCursor);
  const [hasNextPage, setHasNextPage] = useState(initialPageInfo.hasNextPage);

  // ----------------------
  //  2) FILTER & SEARCH
  // ----------------------
  const initialCategory = searchParams.category || "";
  const initialSearch = searchParams.search || "";

  const [filter, setFilter] = useState({
    category: initialCategory,
    search: initialSearch,
  });
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  // A handy slug => name map for display
  const categoryMap = {};
  categoryNodes.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

  const router = useRouter();
  const searchParamsHook = useSearchParams();

  // ----------------------
  //  3) FETCH HOOK
  // ----------------------
  const { sendRequest, fetchData, error, loading: fetchLoading } = useFetch();

  // We track if we’re loading “new filters” vs. “load more”
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // ----------------------
  //  4) ALWAYS FETCH ON URL CHANGES
  // ----------------------
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParamsHook.toString());
    const urlCategory = urlParams.get("category") || "";
    const urlSearch = urlParams.get("search") || "";

    // Update our local filter
    setFilter({ category: urlCategory, search: urlSearch });

    // Fire a brand-new query
    async function fetchForNewFilter() {
      setLoadingInitial(true);
      const query = newsQuery({
        numberOfPosts: 10,
        category: urlCategory,
        search: urlSearch,
      });
      await sendRequest(query);
      setLoadingInitial(false);
    }

    fetchForNewFilter();
  }, [searchParamsHook, sendRequest]);

  // ----------------------
  //  5) PROCESS INCOMING DATA
  // ----------------------
  useEffect(() => {
    if (!fetchData || !fetchData.posts) return;

    if (loadingMore) {
      // Append unique items for "Load More"
      setArticles((prev) => {
        const prevIDs = new Set(prev.map((item) => item.id));
        const uniqueNewNodes = fetchData.posts.nodes.filter((item) => !prevIDs.has(item.id));
        return [...prev, ...uniqueNewNodes];
      });
      setLoadingMore(false);
    } else {
      // Replace for a brand-new filter
      setArticles(fetchData.posts.nodes);
    }

    setEndCursor(fetchData.posts.pageInfo.endCursor);
    setHasNextPage(fetchData.posts.pageInfo.hasNextPage);
  }, [fetchData, loadingMore]);

  // ----------------------
  //  6) LOAD MORE HANDLER
  // ----------------------
  const loadMorePosts = useCallback(async () => {
    if (fetchLoading || !hasNextPage) return;

    setLoadingMore(true);
    const query = newsQuery({
      numberOfPosts: 10,
      endCursor,
      search: filter.search,
      category: filter.category,
    });
    await sendRequest(query);
  }, [fetchLoading, hasNextPage, endCursor, filter.search, filter.category, sendRequest]);

  // ----------------------
  //  7) REMOVE FILTER
  // ----------------------
  const handleRemoveFilter = (filterType) => {
    const newFilter = { ...filter };
    if (filterType === "search") {
      newFilter.search = "";
      setSearchTerm("");
    } else if (filterType === "category") {
      newFilter.category = "";
    }

    // Build new URL params
    const params = new URLSearchParams();
    if (newFilter.category) params.set("category", newFilter.category);
    if (newFilter.search) params.set("search", newFilter.search);

    // Update local filter + push to router
    setFilter(newFilter);
    router.push(`/articles?${params.toString()}`);
  };

  // ----------------------
  //  8) SUBMIT SEARCH
  // ----------------------
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (filter.category) params.set("category", filter.category);
    if (searchTerm) params.set("search", searchTerm);

    setFilter({ ...filter, search: searchTerm });
    router.push(`/articles?${params.toString()}`);
  };

  // ----------------------
  //  9) RENDER
  // ----------------------
  return (
    <Box className={classes.container} maxWidth='xl'>
      <Box className={classes.header}>
        <Typography variant='h1'>All Articles</Typography>
      </Box>

      {/* Show an error message if there's an error */}
      {error && (
        <Typography variant='body' color='error'>
          {error.message}
        </Typography>
      )}

      {/* Show "Loading…" if a brand-new filter fetch is in progress */}
      {loadingInitial && <Typography variant='body'>Loading initial articles…</Typography>}

      {/* If no initial loading and no articles, show a fallback */}
      {!loadingInitial && articles.length === 0 && <Typography variant='body'>No articles matching your query</Typography>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} sx={{ paddingTop: "0rem !important" }}>
          <Box className={classes.content}>
            {articles.map((article) => (
              <HorizontalArticleCard article={article} id={article.id} key={article.id} />
            ))}
          </Box>

          {/* "Load More" button if there's a next page */}
          {hasNextPage && (
            <Button onClick={loadMorePosts} disabled={fetchLoading}>
              {fetchLoading ? "Loading…" : "Load More Articles"}
            </Button>
          )}

          {/* If no more pages (and not initially loading), show a message */}
          {!hasNextPage && !loadingInitial && <Typography variant='body'>No more articles matching current filters</Typography>}
        </Grid>

        <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Active filters */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {(filter.category || filter.search) && <Typography variant='h5'>Active filters</Typography>}

            {filter.category && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Typography variant='body'>{categoryMap[filter.category]}</Typography>
                <CloseRoundedIcon onClick={() => handleRemoveFilter("category")} style={{ cursor: "pointer" }} />
              </Box>
            )}

            {filter.search && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Typography variant='body'>{filter.search}</Typography>
                <CloseRoundedIcon onClick={() => handleRemoveFilter("search")} style={{ cursor: "pointer" }} />
              </Box>
            )}
          </Box>

          {/* Categories List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Typography variant='h5' mb={1}>
              All categories
            </Typography>
            {categoryNodes.map((cat) => (
              <Link href={`/articles?category=${cat.slug}`} key={cat.slug} className={classes.category}>
                <Typography variant='body'>{cat.name}</Typography>
              </Link>
            ))}
          </Box>

          {/* Search Form */}
          <Box>
            <form onSubmit={handleSearchSubmit}>
              <TextField
                label='Search'
                inputProps={{
                  style: { padding: "1.75rem 0.5rem" },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Articles;
