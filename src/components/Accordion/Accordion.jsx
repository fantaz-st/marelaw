"use client";

import { useState } from "react";
import classes from "./Accordion.module.css";

const AccordionItem = ({ showDescription, ariaExpanded, fontWeightBold, item, index, onClick }) => (
  <div className={classes.question} key={item.question}>
    <dt>
      <div aria-expanded={ariaExpanded} aria-controls={`faq${index + 1}_desc`} data-qa='faq__question-button' className={fontWeightBold ? `${classes.button} ${classes.bold}` : classes.button} onClick={onClick}>
        <h5>{item.question}</h5>
        <div className={classes.arrow} />
      </div>
    </dt>
    <dd>
      <p id={`faq${index + 1}_desc`} data-qa='faq__desc' className={showDescription ? `${classes.description} ${classes.showDescription}` : classes.description}>
        {item.answer}
      </p>
    </dd>
  </div>
);

const Accordion = ({ questionsAnswers }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const renderedQuestionsAnswers = questionsAnswers.map((item, index) => {
    const showDescription = index === activeIndex ? "showDescription" : "";
    const fontWeightBold = index === activeIndex ? "bold" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    return (
      <AccordionItem
        key={index}
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        onClick={() => {
          activeIndex === index ? setActiveIndex(null) : setActiveIndex(index);
        }}
      />
    );
  });

  return (
    <div className={classes.faq}>
      <dl className={classes.list}>{renderedQuestionsAnswers}</dl>
    </div>
  );
};

export default Accordion;
