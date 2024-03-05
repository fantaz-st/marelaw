"use client";

import { motion, useInView } from "framer-motion";
import Accordion from "../Accordion/Accordion";
import SectionCaption from "../SectionCaption/SectionCaption";
import classes from "./FAQSection.module.css";
import { useRef } from "react";

const questionsAnswers = [
  {
    question: "Does the Pope shit in the woods?",
    answer: "Well, last time I checked, he prefers the Vatican restrooms, but you never know, he might be into nature walks too!",
  },
  {
    question: "Does the Pope shit in the woods?",
    answer: "Well, last time I checked, he prefers the Vatican restrooms, but you never know, he might be into nature walks too!",
  },
  {
    question: "Does the Pope shit in the woods?",
    answer: "Well, last time I checked, he prefers the Vatican restrooms, but you never know, he might be into nature walks too!",
  },
  {
    question: "Does the Pope shit in the woods?",
    answer: "Well, last time I checked, he prefers the Vatican restrooms, but you never know, he might be into nature walks too!",
  },
];

const FAQSection = () => {
  const titleRef = useRef(null);

  const isTitleInView = useInView(titleRef, { amount: 0.7, once: true });

  const titleVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
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
  return (
    <div className={classes.container} ref={titleRef}>
      <div className={classes.title}>
        <SectionCaption>Frequently asked question</SectionCaption>
        <motion.h3 variants={titleVariants} key='heading' initial='initial' animate={isTitleInView ? "animate" : "initial"} className={classes.title}>
          {"Navigating Your Queries: FAQ Edition".split(" ").map((word, i) => (
            <span key={i}>
              <motion.span key={i + "word"} style={{ display: "inline-block" }} variants={wordVariants}>
                {word}
              </motion.span>
              <span key={i + "span"} style={{ display: "inline-block" }}>
                &nbsp;
              </span>
            </span>
          ))}
        </motion.h3>
      </div>

      <Accordion questionsAnswers={questionsAnswers} />
    </div>
  );
};

export default FAQSection;
