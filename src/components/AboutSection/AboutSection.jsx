"use client";

import NextLink from "next/link";
import SectionCaption from "../SectionCaption/SectionCaption";
import classes from "./AboutSection.module.css";
import { useRef } from "react";
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";

const AboutSection = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  return (
    <Box className={classes.container} ref={titleRef}>
      <SectionCaption>About the project</SectionCaption>
      <Box className={classes.header}>
        <Typography variant='h3' component='h3' className={classes.title}>
          Ensuring a uniform level of seafarers' qualifications
        </Typography>
        <NextLink href='/about-the-project'>
          <Button>Read more</Button>
        </NextLink>
      </Box>
      <Grid container className={classes.inner}>
        <Grid item xs={12} md={6} className={classes.left}>
          <Box>
            <Typography variant='body' component='P' sx={{ marginBottom: "3rem" }}>
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
    </Box>
  );
};

export default AboutSection;
