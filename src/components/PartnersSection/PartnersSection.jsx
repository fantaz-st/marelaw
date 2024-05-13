"use client";
import { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import classes from "./PartnersSection.module.css";
import SectionCaption from "../SectionCaption/SectionCaption";

import unist from "../../assets/partners/unist.svg";
import pfst from "../../assets/partners/pfst.svg";
import pravst from "../../assets/partners/pravst.jpg";
import ffst from "../../assets/partners/ffst.svg";
import rtu from "../../assets/partners/rtu.svg";
import upc from "../../assets/partners/upc.svg";
import Image from "next/image";
import horizontalLoop from "@/functions/horizontalLoop";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NextLink from "next/link";

const partners = [
  {
    name: "unist",
    img: unist,
    title: "University of Split",
  },
  {
    name: "pfst",
    img: pfst,
    title: "Faculty of Maritime Studies",
  },
  {
    name: "pravst",
    img: pravst,
    title: "Faculty of Law",
  },
  {
    name: "ffst",
    img: ffst,
    title: "Faculty of Humanities and Social Sciences",
  },
  {
    name: "rtu",
    img: rtu,
    title: "Riga Technical University",
  },
  {
    name: "upc",
    img: upc,
    title: "Universitat Politecnica de Catalunya",
  },
];
gsap.registerPlugin(ScrollTrigger);

const PartnersSection = () => {
  const containerRef = useRef(null);
  const marqueeWrapperRef = useRef(null);

  useGSAP(
    () => {
      const loop = horizontalLoop(`.${classes.partner}`, {
        repeat: -1,
        speed: 1.7,
        paddingRight: 32,
      });

      let tl;
      /* const partnersLogos = gsap.utils.toArray(`.${classes.partner}`);
      gsap.set(partnersLogos, { yPercent: 200, opacity: 0 });
      gsap.to(partnersLogos, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: marqueeWrapperRef.current,
          start: "top+=50% bottom-=10%",
          end: "bottom+=50% top+=20%",
        },
      }); */
      Observer.create({
        target: window,
        type: "wheel,touch",
        onChangeY: (self) => {
          tl && tl.kill();
          const factor = self.deltaY > 0 ? 1 : -1;
          tl = gsap
            .timeline()
            .to(loop, { timeScale: factor, duration: 0.25 })
            .to(loop, { timeScale: 1 * factor, duration: 1 });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <Box className={classes.container} ref={containerRef}>
      <SectionCaption>Our Partners</SectionCaption>
      <Box className={classes.header}>
        <Typography variant='h3' component='h3' className={classes.sectionSubtitle}>
          We are proud to work with several partner universities in the EU to achieve our goals
        </Typography>
        <NextLink href='/about-the-project/partner-institutions' className={classes.button}>
          <Button variant='contained'>Find out more</Button>
        </NextLink>
      </Box>
      <Box className={classes.inner}>
        <Box className={classes.marqueeWrapper} ref={marqueeWrapperRef}>
          <Box className={classes.marqueeInner}>
            {partners.map((partner) => {
              return (
                <Box className={classes.partner} key={partner.name}>
                  <Box className={classes.partnerImageWrapper} key={partner.name}>
                    <Image src={partner.img.src} alt={`${partner.name} logo`} fill sizes='120px' style={{ objectFit: "cover" }} />
                  </Box>
                  <Typography variant='h1' component='h1' className={classes.title}>
                    {partner.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <NextLink href='/about-the-project/partner-institutions' className={classes.mobileButton}>
        <Button>Find out more</Button>
      </NextLink>
    </Box>
  );
};

export default PartnersSection;
