"use client";
import NextLink from "next/link";
import classes from "./PostsSection.module.css";
import PostCard from "../PostCard/PostCard";
import { Box, Button, Grid, Typography } from "@mui/material";
import PaddingGlobal from "../PaddingGlobal/PaddingGlobal";

const PostsSection = ({ posts }) => {
  return (
    <Box className={classes.container}>
      <PaddingGlobal>
        <Box className={classes.header}>
          <Typography variant='h3' component='h3'>
            From our worldwide partners articles through to our own stories
          </Typography>
          <NextLink href='/articles' className={classes.button}>
            <Button>Read all</Button>
          </NextLink>
        </Box>
        <Grid container spacing={{ xs: 1, md: 3 }} className={classes.grid}>
          {posts.map((post) => {
            return (
              <Grid item xs={12} md={4} key={post.id} className={classes.item}>
                <PostCard article={post} />
              </Grid>
            );
          })}
        </Grid>
        <NextLink href='/articles' className={classes.mobileButton}>
          <Button>Read all articles</Button>
        </NextLink>
      </PaddingGlobal>
    </Box>
  );
};

export default PostsSection;
