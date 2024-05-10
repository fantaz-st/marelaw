"use client";
import Image from "next/image";
import classes from "./Header.module.css";
import mareLawLogo from "../../../public/marelaw.svg";
import Link from "next/link";
import { Box, Drawer, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";

const Header = ({ menuItems }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Box className={classes.container} sx={{ padding: { xs: "0 1rem", md: "0 4rem" } }}>
        <Link href='/'>
          <Box className={classes.logo}>
            <Image src={mareLawLogo} alt='MareLaw main logo' priority />
          </Box>
        </Link>
        <Box className={classes.hamburger} sx={{ display: { xs: "block", md: "none" } }} onClick={() => toggleDrawer()}>
          <span></span>
          <span></span>
          <span></span>
        </Box>
        <List className={classes.menu} sx={{ display: { xs: "none", md: "flex" } }}>
          {menuItems.map((item) => (
            <ListItem key={item.databaseId}>
              <Link href={`${item.uri}`}>
                <Typography variant='body' sx={{ height: "100%" }}>
                  {item.label}
                </Typography>
              </Link>
              {item.childNodes.length > 0 && (
                <Box className={classes.subMenuInner}>
                  <List className={classes.subMenu}>
                    {item?.childNodes?.map((child) => {
                      return (
                        <ListItem key={child.databaseId}>
                          <Link href={`${child.uri}`}>
                            <Typography variant='body'>{child.label}</Typography>
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
      <Drawer open={open} onClose={toggleDrawer} anchor='left' sx={{ width: "100%" }}>
        <Box className={classes.close} onClick={toggleDrawer}>
          <span></span>
          <span></span>
        </Box>
        <Box className={classes.mobileDrawerInner} sx={{ minWidth: "300px", padding: "3rem 0.5rem" }}>
          <Typography variant='h2' sx={{ marginBottom: "2rem" }}>
            Menu
          </Typography>
          <List className={classes.mobileMenu}>
            <ListItem>
              <Link href={"/"}>
                <Typography variant='h3' sx={{ margin: 0, padding: 0 }}>
                  HOME
                </Typography>
              </Link>
            </ListItem>
            {menuItems.map((item) => (
              <ListItem key={item.databaseId} sx={{ color: "#84b4d3" }}>
                <Link href={`${item.uri}`}>
                  <Typography variant='h3' sx={{ margin: 0, padding: 0, textTransform: "uppercase" }}>
                    {item.label}
                  </Typography>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
