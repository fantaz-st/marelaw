"use client";
import { useRef } from "react";
import classes from "./Hero.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import PaddingGlobal from "../PaddingGlobal/PaddingGlobal";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const Hero = () => {
  const heroContainerRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  useGSAP(
    () => {
      const splitTitle = new SplitType(titleRef.current, { types: "lines" });
      const lines = splitTitle.lines;
      const tl = gsap.timeline();

      lines.forEach((line) => {
        const text = line.textContent;
        line.textContent = ""; // brisi original text
        const innerSpan = document.createElement("span");
        innerSpan.classList.add(classes.inner);
        innerSpan.textContent = text;
        line.appendChild(innerSpan);
      });

      tl.to(titleRef.current, { opacity: 1, duration: 0 })
        .to(`.${classes.inner}`, {
          y: "0%",
          stagger: 0.1,
          ease: "power2.out",
        })
        .to(subTitleRef.current, { opacity: 1, duration: 0.5 });
    },
    { scope: heroContainerRef }
  );

  return (
    <Box className={classes.container} ref={heroContainerRef}>
      <PaddingGlobal>
        <Box className={classes.content}>
          <Box className={classes.text}>
            <Box className={classes.title} ref={titleRef}>
              MareLaw - Upgrading and harmonization of Maritime law STCW based curriculum for Maritime students
            </Box>

            <Typography variant='h5' className={classes.subtitle} ref={subTitleRef}>
              Master Maritime Law with 20+ in-depth lessons.
              <Link href='/lessons' style={{ textDecoration: "underline", marginLeft: "10px" }} className={classes.link}>
                <span data-hover='Start Learning'>Start Learning</span>
              </Link>
            </Typography>
          </Box>
        </Box>
      </PaddingGlobal>
      <Box className={classes.waves}>{/* <Image src='/waves-fntz.svg' alt='waves svg' width={3000} height={550} /> */}</Box>
    </Box>
  );
};

export default Hero;
