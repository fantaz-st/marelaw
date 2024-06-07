"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Block from "@/components/Block/Block";
import formatDate from "@/functions/formatDate";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import classes from "./Article.module.css";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";

import SplitType from "split-type";

const Article = ({ allArticleData }) => {
  const container = useRef(null);
  const titleRef = useRef(null);

  const { author, categories, date, id, title, blocks, featuredImage } = allArticleData;

  useGSAP(
    () => {
      gsap.set(container.current, { autoAlpha: 1 });
      const splitTitle = new SplitType(titleRef.current, { types: "lines, words" });

      const tl = gsap.timeline();

      tl.from(`.${classes.breadCrumb}`, { opacity: 0, yPercent: 100, ease: "power2.out", duration: 0.3, delay: 0.5 })
        .from(splitTitle.words, { yPercent: 100, ease: "power2.out", stagger: 0.03 })
        .from(`.${classes.details}`, { opacity: 0, yPercent: -100, ease: "power2.out", duration: 0.3 })
        .from(`.${classes.image}`, { opacity: 0, yPercent: -100, ease: "power2.out", duration: 0.5 });
    },
    { scope: container }
  );

  return (
    <Box as='article' className={classes.container} maxWidth='xl' ref={container}>
      <Box className={classes.inner}>
        <Typography variant='body' component='p' className={classes.breadCrumb}>
          <Link href='/' style={{ marginRight: "0.35rem" }}>
            HOME
          </Link>
          /
          <Link href='/articles' style={{ margin: "0 0.35rem" }}>
            ARTICLES
          </Link>
          /<span style={{ marginLeft: "0.35rem" }}>{title}</span>
        </Typography>

        <Typography variant='h1' ref={titleRef} className={classes.title}>
          {title}
        </Typography>

        <Box className={classes.details}>
          <span>BY {author.node.name}</span>
          <span className={classes.date}>{formatDate(date)}</span>
          <span className={classes.categories}>
            in {""}
            {categories.nodes.map((cat) => (
              <span key={cat.slug}>{cat.name}</span>
            ))}
          </span>
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Box className={classes.imageWrapper}>
              <Image src={featuredImage.node.sourceUrl} fill alt={featuredImage.node.title || title} style={{ objectFit: "cover" }} placeholder='blur' blurDataURL={featuredImage.node.base64} className={classes.image} />
            </Box>

            {/* text */}
            <Box>{blocks && blocks.map((block, i) => <Block block={block} key={i} />)}</Box>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <Box>Kategorije</Box>
            <List>
              {allArticleData.categories.nodes.map((cat) => {
                return (
                  <ListItem key={cat.slug}>
                    <Link href={`/articles&category=${cat.slug}`}>
                      <Typography variant='body'>{cat.name}</Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Article;
