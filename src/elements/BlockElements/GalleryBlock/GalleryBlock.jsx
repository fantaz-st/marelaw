"use client";

import { Box, Grid, Typography } from "@mui/material";
import classes from "./GalleryBlock.module.css";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect } from "react";

const GalleryBlock = (props) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});
    return () => {
      Fancybox.destroy();
    };
  }, []);
  return (
    <Box>
      <Typography variant='h4' mb={6}>
        Image Gallery
      </Typography>
      <Grid container className={classes.gallery} spacing={1}>
        {props.slike.map((slika, i) => (
          <Grid item xs={6} md={4} key={i}>
            <Box className={classes.imageWrapper}>
              <a data-fancybox='gallery' href={slika.attributes.url}>
                <Image src={slika.attributes.url} alt={slika.attributes.caption || slika.attributes.alt || ""} data-lightboxjs='lightbox1' fill style={{ objectFit: "cover" }} sizes='(max-width: 360px) 100vw,(max-width: 1024px) 66vw,33vw' quality={100} />
              </a>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GalleryBlock;
