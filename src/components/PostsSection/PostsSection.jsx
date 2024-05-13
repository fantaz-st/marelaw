"use client";
import NextLink from "next/link";

import classes from "./PostsSection.module.css";
import SectionCaption from "../SectionCaption/SectionCaption";
import PostCard from "../PostCard/PostCard";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PostsSection = ({ posts }) => {
  const postsContainerRef = useRef(null);
  useGSAP(
    () => {
      gsap.set(`.${classes.inner}`, { autoAlpha: 1 });
      gsap.set(`.${classes.grid}`, { xPercent: -100 });
      gsap.to(`.${classes.grid}`, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: postsContainerRef.current,
          start: "top 20%",
          end: "top 80%",
        },
      });
    },
    { scope: postsContainerRef }
  );

  return (
    <Box className={classes.container} ref={postsContainerRef}>
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
      <Box className={classes.inner}>
        <Grid container spacing={1} className={classes.grid}>
          {posts.map((post) => {
            return (
              <Grid item xs={12} md={3} key={post.id} className={classes.item}>
                <PostCard article={post} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <NextLink href='/articles' className={classes.mobileButton}>
        <Button>Read all articles</Button>
      </NextLink>
    </Box>
  );
};

export default PostsSection;
