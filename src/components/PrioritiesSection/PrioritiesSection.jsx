"use client";

import NextLink from "next/link";
import gsap from "gsap";
import SplitType from "split-type";
import classes from "./PrioritiesSection.module.css";
import { Box, Button, Typography } from "@mui/material";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PrioritiesSection = () => {
  const scrollContainerRef = useRef(null);
  const scrollTextRef = useRef(null);

  useGSAP(
    () => {
      const text = new SplitType(scrollTextRef.current, { types: "words, chars" });

      gsap.fromTo(
        text.chars,
        {
          opacity: 0.3,
        },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: {
            trigger: scrollTextRef.current,
            /* start: "top 80%",
            end: "top 20%", */
            start: "top 80%",
            end: "bottom 30%",
            scrub: true,
            markers: false,
            toggleActions: "play play reverse reverse",
          },
        }
      );
    },
    { scope: scrollContainerRef }
  );
  return (
    <Box className={classes.container} ref={scrollContainerRef}>
      <Typography variant='h1' component='h1' sx={{ fontWeight: 300, color: "#fff", wordWrap: "break-word", boxSizing: "border-box" }} ref={scrollTextRef}>
        Our project focuses on three main priorities: promoting inter-connected higher education systems, stimulating innovative learning and teaching practices, and implementing measures against climate change
      </Typography>
      <NextLink href='/about-the-project' className={classes.button}>
        <Button variant='alt'>Read more</Button>
      </NextLink>
    </Box>
  );
};

export default PrioritiesSection;
