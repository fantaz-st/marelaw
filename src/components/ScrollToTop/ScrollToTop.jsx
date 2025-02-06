"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import classes from "./ScrollToTop.module.css";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollToPlugin);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const buttonRef = useRef(null);

  useGSAP(
    () => {
      const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300);
      };
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    },
    { scope: buttonRef }
  );

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: true }, duration: 1, ease: "power2.out" });
  };

  return (
    <Button onClick={scrollToTop} className={`${classes.button} ${isVisible && classes.visible}`} variant='contained' ref={buttonRef}>
      <KeyboardArrowUpIcon sx={{ color: "#fff" }} />
    </Button>
  );
};

export default ScrollToTop;
