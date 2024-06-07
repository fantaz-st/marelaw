"use client";

import classes from "./ArticleHeader.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Typography } from "@mui/material";
import SplitType from "split-type";
import Link from "next/link";

const ArticleHeader = ({ title }) => {
  const container = useRef();
  const titleRef = useRef();

  useGSAP(
    () => {
      gsap.set(container.current, { autoAlpha: 1 });
      const splitTitle = new SplitType(titleRef.current, { types: "lines, words" });
      const tl = gsap.timeline();
      tl.from(`.${classes.breadCrumb}`, { opacity: 0, yPercent: 100, ease: "power2.out", duration: 0.3, delay: 0.5 }).from(splitTitle.words, { yPercent: 100, ease: "power2.out", stagger: 0.03 }) /* .from(`.${classes.authorDate}`, { opacity: 0, yPercent: 100, ease: "power2.out", duration: 0.3 }) */;
    },
    { scope: container }
  );

  return (
    <Box className={classes.container} ref={container}>
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
    </Box>
  );
};

export default ArticleHeader;
