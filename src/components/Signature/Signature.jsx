"use client";
import classes from "./Signature.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Box, Typography } from "@mui/material";
import SplitType from "split-type";
import Link from "next/link";

import cbLogo from "../../assets/cb_logo.svg";
import Image from "next/image";

const Signature = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      const titles = gsap.utils.toArray(textRef.current.children);
      const tl = gsap.timeline({ repeat: -1 });
      tl.set(textRef.current, { opacity: 1 });
      titles.forEach((title) => {
        const splitTitle = new SplitType(title, {
          types: "chars",
          tagName: "span",
        });
        tl.from(
          splitTitle.chars,
          {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.1,
          },
          "<"
        ).to(
          splitTitle.chars,
          {
            opacity: 0,
            y: -20,
            rotateX: 90,
            stagger: 0.1,
          },
          "<1.5"
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <Box className={classes.container} ref={containerRef}>
      <Image src={cbLogo} height={40} width={30} alt='cblogo' />

      <Link className={classes.text} ref={textRef} href='mailto:cbabic@pfst.hr'>
        <Typography variant='body' component='p'>
          DESIGNED
        </Typography>
        <Typography variant='body' component='p'>
          DEVELOPED
        </Typography>
        <Typography variant='body' component='p'>
          MAINTAINED
        </Typography>
        <Typography variant='body' component='p'>
          BY CBABIC
        </Typography>
      </Link>
    </Box>
  );
};

export default Signature;
