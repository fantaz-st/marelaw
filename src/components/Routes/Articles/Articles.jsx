import { Box, Grid, Typography } from "@mui/material";
import classes from "./Articles.module.css";
import HorizontalArticleCard from "@/components/HorizontalArticleCard/HorizontalArticleCard";
import ArticlesPageSidebar from "@/components/ArticlesPageSidebar/ArticlesPageSidebar";

const Articles = ({ searchParams, articles }) => {
  const { nodes: articleNodes } = articles.data.posts;
  const { nodes: categoryNodes } = articles.data.categories;

  return (
    <Box className={classes.container} maxWidth='xl'>
      <Box className={classes.header}>
        <Typography variant='h1'>All Articles</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box className={classes.content}>
            {articleNodes.map((article) => (
              <HorizontalArticleCard article={article} id={article.id} key={article.id} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <ArticlesPageSidebar searchParams={searchParams} categories={categoryNodes} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Articles;
