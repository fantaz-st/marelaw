"use client";
import { useRef } from "react";
import classes from "./Hero.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import PaddingGlobal from "../PaddingGlobal/PaddingGlobal";

const Hero = () => {
  const heroContainerRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(
    () => {
      const splitTitle = new SplitType(titleRef.current, { types: "lines" });
      const lines = splitTitle.lines;
      const tl = gsap.timeline();

      lines.forEach((line) => {
        const text = line.textContent;
        line.textContent = ""; // brisi original text
        const innerSpan = document.createElement("span");
        innerSpan.classList.add(classes.inner);
        innerSpan.textContent = text;
        line.appendChild(innerSpan);
      });

      tl.to(titleRef.current, { opacity: 1, duration: 0 }).to(`.${classes.inner}`, {
        y: "0%",
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: heroContainerRef }
  );

  return (
    <div className={classes.container} ref={heroContainerRef}>
      <PaddingGlobal>
        <div className={classes.content}>
          <div className={classes.text}>
            <div className={classes.title} ref={titleRef}>
              Marelaw - Upgrading and harmonization of Maritime law STCW based curriculum for Maritime students
            </div>
          </div>
        </div>
      </PaddingGlobal>
      <div className={classes.waves}>{/* <Image src='/waves-fntz.svg' alt='waves svg' width={3000} height={550} /> */}</div>
    </div>
  );
};

export default Hero;
