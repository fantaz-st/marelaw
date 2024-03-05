"use client";

import { motion, useInView } from "framer-motion";
import classes from "./AboutSection.module.css";
import { useRef } from "react";
import SectionCaption from "../SectionCaption/SectionCaption";

const AboutSection = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  const isTitleInView = useInView(titleRef, { amount: 0.7, once: true });
  const isTextInView = useInView(textRef, { amount: 0.7, once: true });

  const textContainerVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      duration: 0.5,
      delay: 2,
    },
  };

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
      <div className={classes.inner}>
        <div className={classes.title}>
          <SectionCaption>About the project</SectionCaption>
          <motion.h3 variants={titleVariants} key='heading' initial='initial' animate={isTitleInView ? "animate" : "initial"} className={classes.title}>
            {"Ensuring a uniform level of seafarers' qualifications".split(" ").map((word, i) => (
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
        <motion.div className={classes.text} ref={textRef} variants={textContainerVariant} initial='initial' animate={isTextInView ? "animate" : "initial"} exit='initial'>
          <p>
            Provedbu projekta MareLaw koordinira Pomorski fakultet u Splitu pod Erasmus+ poveljom korisnika Sveučilišta u Splitu. Glavni ciljevi projekta su promoviranje međusobno povezanih sustava visokog obrazovanja, poticanje inovativnih praksi učenja i podučavanja te okoliš i borba protiv
            klimatskih promjena.
          </p>
          <p>
            Provedbom projekta partneri će pripremiti smjernice za izradu kurikuluma predmeta pomorsko pravo za visoka pomorska učilišta, sukladno STCW konvenciji, pripremiti digitalne nastavne materijale zajedno s pitanjima za vježbu i formama za samoevaluaciju koji će se koristiti prilikom učenja
            pomorskog prava te posebno razvijati stručne i digitalne kompetencije nastavnika pohađanjem certificiranih tečajeva. Time će se nastojati povećati kvaliteta i kapacitet pomorskih visokih učilišta te osigurati ujednačena razina osposobljenosti pomoraca.
          </p>

          {/* <p>Partnerske institucije koje uz Sveučilište u Splitu sudjeluju na projektu su:</p>
          <ul>
            <li> Technical University of Catalonia</li>
            <li> Riga Technical University</li>
          </ul> */}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
