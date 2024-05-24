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
        <Grid container className={classes.rows}>
          <Grid item xs={12} md={3}>
            <Box className={classes.logo} sx={{ paddingRight: "2rem" }}>
              <Image src={mareLawLogo} alt='marelaw footer logo' />
              <Typography variant='body' color='#fff'>
                Upgrading and harmonization of Maritime law STCW based curriculum for Maritime students,
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} className={classes.links}>
            <List className={classes.menu}>
              {menuItems.map((item) => (
                <ListItem key={item.databaseId}>
                  <Link href={`${item.uri}`}>
                    <Typography variant='h3' sx={{ color: "#fff" }}>
                      {item.label}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={3} className={classes.contact} sx={{ marginTop: { xs: "1rem", md: "0" } }}>
            <Typography variant='h3' className={classes.title} sx={{ color: "#fff" }}>
              Contact
            </Typography>
            <List>
              <ListItem>
                <Typography variant='body' component='p'>
                  Ruđera Boškovića 37,
                  <br />
                  21000 Split,
                  <br />
                  Croatia
                </Typography>
              </ListItem>
              <ListItem>
                <Link href='mailto:marelaw@pfst.hr'>
                  <Typography variant='body' component='p'>
                    marelaw@pfst.hr
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box className={classes.funding2}>
              <Image src={coFundedByEuLogo} alt='Co-funded by the European Union logo' className='fundingImages' />
              <Image src={erasmusLogo} alt='Erasmus+ logo' className='fundingImages' />
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
