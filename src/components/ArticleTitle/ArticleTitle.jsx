"use client";

import classes from "./ArticleTitle.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Typography } from "@mui/material";
import SplitType from "split-type";

const ArticleTitle = ({ title }) => {
  const container = useRef();
  const titleRef = useRef();

  useGSAP(
    () => {
      gsap.set(container.current, { autoAlpha: 1 });
      const splitTitle = new SplitType(titleRef.current, { types: "lines, words" });
      gsap.from(splitTitle.words, { yPercent: 100, delay: 0.5, stagger: 0.05, ease: "power2.out" });
    },
    { scope: container }
  );

  return (
    <Box className={classes.container} ref={container}>
      <Typography variant='h3' ref={titleRef} className={classes.title}>
        {title}
      </Typography>
    </Box>
  );
};

export default ArticleTitle;
