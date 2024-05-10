"use client";

import Image from "next/image";
import classes from "./HeroSection.module.css";
import ladyJusticeImg from "../../../public/lady-justice.png";
import { Box, Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <Box className={classes.container}>
      <Box className={classes.text}>
        <Typography component='h1' variant='h1_serif' sx={{ fontSize: { xs: "2rem", md: "3.25rem", xxxl: "5rem" } }} className={classes.title}>
          MareLaw:
          <br />
          Harmonizing Maritime Law Education
        </Typography>
        <Typography component='p' variant='body' className={classes.subTitle} sx={{ fontSize: "1.25rem" }}>
          Join us in our mission to upgrade and harmonize the Maritime law STCW based curriculum for Maritime students. Discover more about our project below.
        </Typography>
        <Box className={classes.scrollDown}>
          <svg viewBox='0 0 10 28' fill='none'>
            <path d='M5 1v25.94M9 23.22l-4 4.25-4-4.25' stroke='#1D212D' strokeLinecap='round' strokeLinejoin='round'></path>
          </svg>
        </Box>
      </Box>

      <Box className={classes.imageWrapper}>
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
