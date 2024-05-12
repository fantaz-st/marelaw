import classes from "./Footer.module.css";

import mareLawLogo from "../../../public/marelaw-white.svg";
import Image from "next/image";
import Link from "next/link";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import Signature from "../Signature/Signature";

const Footer = ({ menuItems }) => {
  return (
    <Box className={classes.container}>
      <Box className={classes.inner}>
        <Image src={mareLawLogo} alt='marelaw footer logo' />
        <Grid container className={classes.rows}>
          <Grid item xs={12} md={4} className={classes.links}>
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
          <Grid item xs={12} md={4} className={classes.contact} sx={{ marginTop: { xs: "1rem", md: "0" } }}>
            <Typography variant='h3' className={classes.title} sx={{ color: "#fff" }}>
              Contact
            </Typography>
            <List>
              <ListItem>
                <Typography variant='body' component='p'>
                  Ruđera Boškovića 37, 21000 Split
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

            <p></p>
          </Grid>
          <Grid item xs={12} md={4}>
            <Signature />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
