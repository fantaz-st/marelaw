"use client";

import { Box } from "@mui/material";
import classes from "./ArticleFeaturedImage.module.css";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ArticleFeaturedImage = ({ src, alt, placeholder }) => {
  const container = useRef();

  useGSAP(
    () => {
      gsap.set(container.current, { autoAlpha: 1 });
      gsap.to(container.current, { scale: 0.75, duration: 1, ease: "power2.out" });
    },
    { scope: container }
  );

  return (
    <Box className={classes.container} ref={container}>
      <Image src={src} fill alt={alt} style={{ objectFit: "cover" }} /* onLoad={removePlaceholder}  */ placeholder='blur' blurDataURL={placeholder} /* width={placeholder.metadata.width} height={placeholder.metadata.height} */ />
    </Box>
  );
};

export default ArticleFeaturedImage;
