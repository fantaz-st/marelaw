import classes from "./Articles.module.css";
import SearchInput from "@/components/SearchInput/SearchInput";
import CategoryLink from "@/components/CategoryLink/CategoryLink";
import ActiveFilters from "@/components/ActiveFilters/ActiveFilters";
import HorizontalArticleCard from "@/components/HorizontalArticleCard/HorizontalArticleCard";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";

export const dynamic = "force-static";

const Articles = ({ searchParams, articles }) => {
  // Create a mapping from category slug to category name
  const categoryMap = {};
  articles.data.categories.nodes.forEach((cat) => {
    categoryMap[cat.slug] = cat.name;
  });

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
            <ActiveFilters searchParams={searchParams} categoryMap={categoryMap} />
            <SearchInput searchParams={searchParams} />
            <Typography variant='h5'>Categories</Typography>
            <List>
              {articles.data.categories.nodes.map((cat) => (
                <ListItem key={cat.slug}>
                  <CategoryLink categorySlug={cat.slug} categoryName={cat.name} searchParams={searchParams} />
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
