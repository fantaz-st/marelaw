import Link from "next/link";
import NextLink from "next/link";

import classes from "./PostsSection.module.css";
import SectionCaption from "../SectionCaption/SectionCaption";
import PostCard from "../PostCard/PostCard";
import { Box, Button, Grid, Typography } from "@mui/material";

const PostsSection = ({ posts }) => {
  return (
    <Box className={classes.container}>
      <SectionCaption>Media exposure</SectionCaption>

      {/* <AnimatedTitle text='From our worldwide partners articles through to our own stories' variant='h3' /> */}
      <Box className={classes.header}>
        <Typography variant='h3' component='h3'>
          From our worldwide partners articles through to our own stories
        </Typography>
        <NextLink href='/articles' className={classes.button}>
          <Button>Read all</Button>
        </NextLink>
      </Box>

      <Grid container spacing={1} className={classes.inner}>
        {posts.map((post) => {
          return (
            <Grid item xs={12} md={3} key={post.id} className={classes.item}>
              <PostCard article={post} />
            </Grid>
          );
        })}
      </Grid>
      <NextLink href='/articles' className={classes.mobileButton}>
        <Button>Read all articles</Button>
      </NextLink>
    </Box>
  );
};

export default PostsSection;
