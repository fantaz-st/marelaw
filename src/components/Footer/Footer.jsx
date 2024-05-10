import classes from "./Footer.module.css";

import mareLawLogo from "../../../public/marelaw-white.svg";
import Image from "next/image";
import Link from "next/link";
import { Box, List, ListItem, Typography } from "@mui/material";
import Signature from "../Signature/Signature";

const Footer = ({ menuItems }) => {
  return (
    <Box className={classes.container}>
      <Box className={classes.inner}>
        <Image src={mareLawLogo} alt='marelaw footer logo' />
        <Box className={classes.rows}>
          <Box className={classes.links}>
            <List className={classes.menu} sx={{ display: { xs: "none", md: "block" } }}>
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
          </Box>
          <Box className={classes.contact}>
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
          </Box>
          <Signature />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
