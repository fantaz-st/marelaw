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
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const PostsSection = ({ posts }) => {
  const postsContainerRef = useRef(null);
  const titleRef = useRef(null);
  useGSAP(
    () => {
      gsap.set(`.${classes.item}`, { xPercent: -100 });

      const word = new SplitType(titleRef.current, {
        types: "lines",
        tagName: "span",
      });

      const titleLine = word.lines;

      gsap.set(`.${classes.header}`, { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: postsContainerRef.current,
          start: "top 50%",
          end: "top 80%",
        },
      });

      tl.from(
        titleLine,
        {
          opacity: 0,
          yPercent: 100,
          rotationX: -80,
          ease: "power2.out",
          stagger: 0.04,
          transformOrigin: "center 5% -80px",
        }
        /*  "-=1.2" */
      )
        .from(`.${classes.button}`, {
          yPercent: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(`.${classes.item}`, {
          xPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power2.out",
        });
    },
    { scope: postsContainerRef }
  );

  return (
    <Box className={classes.container} ref={postsContainerRef}>
      <SectionCaption>Media exposure</SectionCaption>

      {/* <AnimatedTitle text='From our worldwide partners articles through to our own stories' variant='h3' /> */}
      <Box className={classes.header}>
        <Typography variant='h3' component='h3' ref={titleRef}>
          From our worldwide partners articles through to our own stories
        </Typography>
        <NextLink href='/articles' className={classes.button}>
          <Button>Read all</Button>
        </NextLink>
      </Box>
      <Grid container spacing={{ xs: 1, md: 3 }} className={classes.grid}>
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
