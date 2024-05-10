"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import classes from "./AnimatedTitle.module.css";
import { Typography } from "@mui/material";

const AnimatedTitle = ({ text = "daj text", variant = "h4", fontWeight = 300, onScroll = false }) => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    initial: {
      x: "30px",
      opacity: 0,
    },
    animate: {
      x: "0px",
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  const HeadingTag = (props) => {
    const { children } = props;

    switch (variant) {
      case "h1":
        return (
          <Typography component={motion.h1} variant='h1' {...props} ref={scrollRef} sx={{ fontWeight: fontWeight }} className={classes.title}>
            {children}
          </Typography>
        );
      case "h1_serif":
        return (
          <Typography component={motion.h1} variant='h1_serif' {...props} ref={scrollRef} sx={{ fontWeight: fontWeight }} className={classes.title}>
            {children}
          </Typography>
        );
      case "h2":
        return (
          <Typography component={motion.h2} variant='h2' {...props} ref={scrollRef} sx={{ fontWeight: fontWeight }} className={classes.title}>
            {children}
          </Typography>
        );
      case "h3":
        return (
          <Typography component={motion.h3} variant='h3' {...props} ref={scrollRef} sx={{ fontWeight: fontWeight }} className={classes.title}>
            {children}
          </Typography>
        );
      case "h4":
        return (
          <Typography component={motion.h4} variant='h4' {...props} ref={scrollRef} sx={{ fontWeight: fontWeight }} className={classes.title}>
            {children}
          </Typography>
        );
      case "h5":
        return (
          <Typography component={motion.h5} variant='h6' {...props} ref={scrollRef} sx={{ fontWeight: fontWeight }} className={classes.title}>
            {children}
          </Typography>
        );
      default:
        return (
          <Typography component={motion.h6} variant='h6' {...props} ref={scrollRef} className={classes.title}>
            {children}
          </Typography>
        );
    }
  };

  const scrollRef = useRef(null);

  const isInView = useInView(scrollRef, { amount: 0.7, once: true });

  return (
    <HeadingTag key={text} variants={containerVariants} /* key='heading' */ initial='initial' animate={isInView ? "animate" : "initial"}>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          <motion.span key={i + "word"} style={{ display: "inline-block" }} variants={textVariants}>
            {word}
          </motion.span>
          <span key={i + "span"} style={{ display: "inline-block" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </HeadingTag>
  );
};

export default AnimatedTitle;
