"use client";

import NextLink from "next/link";
import SectionCaption from "../SectionCaption/SectionCaption";
import classes from "./AboutSection.module.css";
import { useRef } from "react";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const textRef = useRef(null);
  const aboutContainerRef = useRef(null);
  const titleRef = useRef(null);
  useGSAP(
    () => {
      gsap.set(aboutContainerRef.current, { autoAlpha: 1 });

      const word = new SplitType(titleRef.current, {
        types: "lines",
        tagName: "span",
      });

      const titleLine = word.lines;

      gsap.set(`.${classes.header}`, { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutContainerRef.current,
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
        .from(
          `.${classes.button}`,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "<"
        )
        .from(`.${classes.inner}`, {
          opacity: 0,
          yPercent: 100,
          duration: 1,
          ease: "power2.out",
        });
    },
    { scope: aboutContainerRef }
  );

  return (
    <Box className={classes.container} ref={aboutContainerRef}>
      <SectionCaption>About the project</SectionCaption>
      <Box className={classes.header}>
        <Typography variant='h3' component='h3' className={classes.title} ref={titleRef}>
          Ensuring a uniform level of seafarers&apos; qualifications
        </Typography>
        <NextLink href='/about-the-project' className={classes.button}>
          <Button>Read more</Button>
        </NextLink>
      </Box>
      <Grid container className={classes.inner}>
        <Grid item xs={12} md={6} className={classes.left}>
          <Box>
            <Typography variant='body' component='p' sx={{ marginBottom: "3rem" }}>
              The MareLaw project is a two-year initiative that began on December 1, 2022. Our mission is to improve and harmonize elements of the maritime law curriculum across our partner universities. Unlike law students, maritime students often encounter legal issues for the first time in their
              maritime law courses. Our project aims to make this complex subject more accessible and understandable for these students.
            </Typography>
            {/* <AnimatedTitle text="Ensuring a uniform level of seafarers' qualifications" variant='h3' onScroll={true} /> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.right} ref={textRef}>
          <Box>
            <List sx={{ listStyleType: "disc", margin: 0, paddingTop: 0 }}>
              <ListItem sx={{ color: "#84b4d3", marginTop: 0, paddingTop: 0 }}>
                <Typography variant='body'>
                  <strong>Unique Curriculum:</strong> Maritime law courses at maritime HEIs are tailored to meet the specific needs of the sector, differing from general law courses.
                </Typography>
              </ListItem>
              <ListItem sx={{ color: "#84b4d3" }}>
                <Typography variant='body'>
                  <strong>Student Focus:</strong> The project addresses the educational needs of maritime students who typically lack prior legal knowledge, making maritime law courses a critical component of their interdisciplinary studies.
                </Typography>
              </ListItem>
              <ListItem sx={{ color: "#84b4d3" }}>
                <Typography variant='body'>
                  <strong>Harmonization Effort:</strong> Collaboration among EU maritime universities aims to align maritime law curricula, facilitated by educators from Boxerse backgrounds.
                </Typography>
              </ListItem>
              <ListItem sx={{ color: "#84b4d3" }}>
                <Typography variant='body'>
                  <strong>Digital Transition:</strong> Adapting to the digital preferences of modern students, the project prioritizes the digitalization of teaching materials, aligning with the Digital Europe Programme&apos;s goals.
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
      <NextLink href='/about-the-project' className={classes.mobileButton}>
        <Button>Read more</Button>
      </NextLink>
    </Box>
  );
};

export default AboutSection;
