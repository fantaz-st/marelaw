"use client";
import { useRef } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import classes from "./PartnersSection.module.css";

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
import PaddingGlobal from "../PaddingGlobal/PaddingGlobal";

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

  /* useGSAP(
    () => {
      const loop = horizontalLoop(`.${classes.partner}`, {
        repeat: -1,
        speed: 1.7,
        paddingRight: 32,
      });

      let tl;

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
  ); */

  return (
    <Box className={classes.container} ref={containerRef}>
      {/* <SectionCaption>Our Partners</SectionCaption> */}
      <PaddingGlobal>
        <Box className={classes.header}>
          <Typography variant='h3' component='h3' className={classes.sectionSubtitle}>
            We are proud to work with several partner universities in the EU to achieve our goals
          </Typography>
          <NextLink href='/about-the-project/partner-institutions' className={classes.button}>
            <Button variant='contained'>Find out more</Button>
          </NextLink>
        </Box>
        <Box className={classes.inner}>
          <Grid container spacing={6}>
            {partners.map((partner) => {
              return (
                <Grid item xs={6} md={4} className={classes.partner} key={partner.name}>
                  <Box className={classes.partnerImageWrapper} key={partner.name}>
                    <Image
                      src={partner.img.src}
                      alt={`${partner.name} logo`}
                      width={120}
                      height={120}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  <Typography variant='h4' component='h4' className={classes.title}>
                    {partner.title}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
          {/*    <Box className={classes.marqueeWrapper} ref={marqueeWrapperRef}>
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
          </Box> */}
        </Box>
        <NextLink href='/about-the-project/partner-institutions' className={classes.mobileButton}>
          <Button>Find out more</Button>
        </NextLink>

        <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox='0 0 910 683' fill='none' data-animation='slide-fade-in' data-delay='0.8s' className='front_hero-decoration'>
          <g clipPath='url(#clip0_201_2333)'>
            <path d='M893.38 0.650391C898.44 6.49039 903.55 12.1604 908.71 17.6704' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M846.48 28.3096C866.53 50.9496 887.321 70.8896 908.711 88.5096' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M799.37 56.0898C833.87 94.2998 870.54 124.5 908.6 148.69' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M752.04 84C800.7 136.96 853.64 173.97 908.6 200.6' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M704.43 112.08C767.09 179.25 836.8 219.89 908.6 245.89' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M656.52 140.33C733.1 221.37 820.199 262.62 908.599 285.77' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M608.3 168.77C698.84 263.67 804.2 302.5 908.71 321.28' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M559.7 197.43C664.25 306.28 788.91 339.54 908.71 353.23' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M510.7 226.33C629.48 349.57 774.83 373.81 908.71 382.45' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M469.3 263.46C600.14 399.24 764.41 412.62 908.7 417.45' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M411.46 284.85C556.01 435.42 743.17 433.14 896.86 435.71C900.81 435.78 904.76 435.84 908.71 435.89' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M361.1 314.55C506.19 466.89 696.57 460.82 850.15 461.52C869.71 461.61 889.23 461.52 908.7 461.26' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M310.27 344.52C455.38 498.78 648.89 489.09 802.16 488.09C837.82 487.85 873.32 487.01 908.71 485.75' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M258.88 374.83C403.57 531.23 600.03 518.05 752.67 515.49C804.97 514.61 856.93 512.44 908.7 509.56' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M206.91 405.48C350.58 564.22 549.94 547.74 701.7 543.82C771.2 542.01 840.08 537.95 908.71 532.97' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M154.37 436.46C296.42 597.74 498.63 578.2 649.17 573.05C736.42 570.07 822.69 563.55 908.71 556.12' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M101.18 467.83C241.01 631.91 445.87 609.46 594.96 603.24C700.57 598.84 804.72 589.29 908.72 579.2' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M47.3398 499.58C184.28 666.65 391.7 641.55 539.03 634.49C663.6 628.5 786.1 615.34 908.71 602.54' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
            <path d='M0.790039 539.75C134.08 710.06 343.97 682.57 489.25 674.83C630.72 667.27 769.45 650.4 908.71 635.29' stroke='currentColor' strokeWidth='2' strokeMiterlimit='10'></path>
          </g>
        </svg>
      </PaddingGlobal>
    </Box>
  );
};

export default PartnersSection;
