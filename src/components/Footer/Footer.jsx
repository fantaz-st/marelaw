"use client";

import classes from "./Footer.module.css";

import mareLawLogo from "../../../public/marelaw-white.svg";
import Image from "next/image";
import Link from "next/link";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import Signature from "../Signature/Signature";

import erasmusLogo from "../../assets/erasmus-plus.svg";
import coFundedByEuLogo from "../../assets/co-funded-eu.svg";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ menuItems }) => {
  const containerRef = useRef();
  const fundingRef = useRef();
  const tl = gsap.timeline();

  /* useGSAP(
    () => {
      tl.from(fundingRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "50% 100%",
          end: "50% 80%",
          // markers: true,

          scrub: true,
        },
      });
    },
    { scope: containerRef }
  ); */

  return (
    <Box className={classes.container} ref={containerRef}>
      <Box className={classes.inner}>
        <Grid container className={classes.rows} spacing={3}>
          <Grid item xs={12} md={3}>
            <Box className={classes.logo} sx={{ paddingRight: "2rem" }}>
              <Image src={mareLawLogo} alt='marelaw footer logo' />
              <Typography variant='body' color='#fff' mt={4}>
                Upgrading and harmonization of Maritime law STCW based curriculum for Maritime students,
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3} className={classes.links}>
            <Typography variant='body' sx={{ fontWeight: 500, color: "#fff" }}>
              Menu
            </Typography>
            <Box className={classes.menu}>
              {menuItems.map((item) => (
                <Link href={`${item.uri}`} key={item.databaseId}>
                  <Typography variant='body' sx={{ color: "#fff" }}>
                    {item.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={3} className={classes.contact} sx={{ marginTop: { xs: "1rem", md: "0" } }}>
            <Typography variant='body' sx={{ fontWeight: 500, color: "#fff" }}>
              Contact
            </Typography>

            <Typography variant='body' component='p'>
              Ruđera Boškovića 37,
              <br />
              21000 Split,
              <br />
              Croatia
            </Typography>

            <Link href='mailto:marelaw@pfst.hr'>
              <Typography variant='body' component='p'>
                marelaw@pfst.hr
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box className={classes.funding2}>
              <Image src={coFundedByEuLogo} width={300} alt='Co-funded by the European Union logo' className='fundingImages' />
              <Image src={erasmusLogo} width={300} alt='Erasmus+ logo' className='fundingImages' />
            </Box>
            <Signature />
          </Grid>
        </Grid>
        {/* <Box className={classes.funding} ref={fundingRef}>
          <Image src={coFundedByEuLogo} alt='Co-funded by the European Union logo' width={200} className='fundingImages' />
          <Image src={erasmusLogo} alt='Erasmus+ logo' width={200} className='fundingImages' />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Footer;
