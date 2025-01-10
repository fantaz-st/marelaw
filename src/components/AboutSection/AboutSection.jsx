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
import PaddingGlobal from "../PaddingGlobal/PaddingGlobal";

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
          start: "top 90%",
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
      {/* <SectionCaption>About the project</SectionCaption> */}
      <PaddingGlobal>
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
                The MareLaw project is a two-year initiative that began on December 1, 2022. Our mission is to improve and harmonize elements of the maritime law curriculum across our partner universities. Unlike law students, maritime students often encounter legal issues for the first time in
                their maritime law courses. Our project aims to make this complex subject more accessible and understandable for these students.
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
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox='0 0 887 745' fill='none' className='front_posthero-decoration'>
          <g clipPath='url(#clip0_201_2610)'>
            <path d='M0.880859 679.8C11.6909 700.2 21.9409 721.62 31.5909 744.15' stroke='currentColor'></path>
            <path d='M0.880859 549.79C40.3809 599.86 75.9109 658.1 105.631 726.81' stroke='currentColor'></path>
            <path d='M0.880859 453.64C70.4909 518.3 132.821 600.46 180.201 709.34' stroke='currentColor'></path>
            <path d='M0.880859 377.36C100.501 448.36 191.681 545.58 255.341 691.69' stroke='currentColor'></path>
            <path d='M0.880859 314.3C129.411 386.85 252.291 491.93 331.321 673.96' stroke='currentColor'></path>
            <path d='M0.880859 260.43C155.971 332.03 314.161 438.25 407.921 656.03' stroke='currentColor' className='bluer-line'></path>
            <path d='M0.880859 212.63C178.631 282.9 377.251 383.41 485.281 637.91' stroke='currentColor'></path>
            <path d='M0.880859 168.17C194.791 239.16 441.401 325.88 563.601 619.56' stroke='currentColor'></path>
            <path d='M0.880859 124.54C17.5409 130.32 34.1909 136.21 50.8509 142.23C247.481 213.25 516.871 290.56 642.621 601' stroke='currentColor'></path>
            <path d='M0.880859 82.3203C44.2309 96.1603 87.5809 110.6 130.941 125.87C326.291 194.66 600.071 269.15 722.581 582.27' stroke='currentColor'></path>
            <path d='M0.880859 41.3799C71.7809 62.3899 142.691 84.6199 213.611 109.05C407.201 175.71 685.121 247.73 803.461 563.4' stroke='currentColor'></path>
            <path d='M0.880859 0.959961C100.241 28.59 199.621 57.85 299.051 91.44C490.501 156.14 772.261 225.88 885.401 544.14' stroke='currentColor'></path>
          </g>
          <defs>
            <clipPath id='clip0_201_2610'>
              <rect width='886.34' height='744.54' fill='currentColor'></rect>
            </clipPath>
          </defs>
        </svg>
        <NextLink href='/about-the-project' className={classes.mobileButton}>
          <Button>Read more</Button>
        </NextLink>
      </PaddingGlobal>
    </Box>
  );
};

export default AboutSection;
