"use client";

import Image from "next/image";
import classes from "./HeroSection.module.css";
import ladyJusticeImg from "../../../public/lady-justice.png";
import { Box, Typography } from "@mui/material";
import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const HeroSection = () => {
  const heroContainerRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const splitTitle = new SplitType(titleRef.current, { types: "words, chars" });
      gsap.set(titleRef.current, { autoAlpha: 1 });
      gsap.set(splitTitle.chars, { yPercent: 100 });
      gsap.set(subtitleRef.current, { yPercent: 100 });
      // gsap.set(imageRef.current, { scale: 1.1 });
      const tl = gsap.timeline();

      tl.to(imageRef.current, {
        scale: 1,
        duration: 1,
      })
        .to(splitTitle.chars, {
          yPercent: 0,
          autoAlpha: 1,
          stagger: 0.02,
          ease: "power2.inOut",
          delay: -0.5,
        })
        .to(subtitleRef.current, {
          yPercent: 0,
          autoAlpha: 1,
          ease: "power2.Out",
          duration: 1,
          delay: -0.25,
        });
    },
    { scope: heroContainerRef }
  );

  return (
    <Box className={classes.container} ref={heroContainerRef}>
      <Box className={classes.text} ref={textRef}>
        <Typography component='h1' variant='h1_serif' sx={{ fontSize: { xs: "2rem", md: "3.25rem", xxxl: "5rem" } }} className={classes.title} ref={titleRef}>
          MareLaw:
          <br />
          Harmonizing Maritime Law Education
        </Typography>
        <Typography component='p' variant='body' className={classes.subTitle} sx={{ marginTop: "2rem", fontSize: "1.25rem" }} ref={subtitleRef}>
          Join us in our mission to upgrade and harmonize the Maritime law STCW based curriculum for Maritime students. Discover more about our project below.
        </Typography>
        <Box className={classes.scrollDown}>
          <svg viewBox='0 0 10 28' fill='none'>
            <path d='M5 1v25.94M9 23.22l-4 4.25-4-4.25' stroke='#1D212D' strokeLinecap='round' strokeLinejoin='round'></path>
          </svg>
        </Box>
      </Box>

      <Box className={classes.imageWrapper} ref={imageRef}>
        <Box className={classes.mask}>
          <Box className={classes.image}>
            <Image src={ladyJusticeImg} alt='marelaw hero section' fill style={{ objectFit: "cover" }} sizes='50vw' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
