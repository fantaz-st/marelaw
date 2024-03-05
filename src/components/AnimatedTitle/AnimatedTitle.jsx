"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AnimatedTitle = ({ text = "daj text", variant = "h4", fontWeight = 400, onScroll = false }) => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants = {
    initial: {
      x: "30px",
      opacity: 0,
    },
    animate: {
      x: "0px",
      opacity: 1,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  const HeadingTag = (props) => {
    const { children } = props;

    switch (variant) {
      case "h1":
        return (
          <motion.h1 {...props} ref={scrollRef} style={{ fontWeight: fontWeight }}>
            {children}
          </motion.h1>
        );
      case "h2":
        return (
          <motion.h2 {...props} ref={scrollRef} style={{ fontWeight: fontWeight }}>
            {children}
          </motion.h2>
        );
      case "h3":
        return (
          <motion.h3 {...props} ref={scrollRef} style={{ fontWeight: fontWeight }}>
            {children}
          </motion.h3>
        );
      case "h4":
        return (
          <motion.h4 {...props} ref={scrollRef} style={{ fontWeight: fontWeight }}>
            {children}
          </motion.h4>
        );
      case "h5":
        return (
          <motion.h5 {...props} ref={scrollRef} style={{ fontWeight: fontWeight }}>
            {children}
          </motion.h5>
        );
      default:
        return (
          <motion.h4 {...props} ref={scrollRef}>
            {children}
          </motion.h4>
        );
    }
  };

  const scrollRef = useRef(null);

  const isInView = useInView(scrollRef, { amount: 0.7, once: true });

  console.log(onScroll);
  return (
    <HeadingTag variants={containerVariants} key='heading' initial='initial' animate={isInView ? "animate" : "initial"}>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          <motion.span key={i + "word"} style={{ display: "inline-block" }} variants={textVariants}>
            {word}
          </motion.span>
          <span key={i + "span"} style={{ display: "inline-block" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </HeadingTag>
  );
};

export default AnimatedTitle;
