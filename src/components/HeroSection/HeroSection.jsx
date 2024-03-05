import Image from "next/image";
import AnimatedTitle from "../AnimatedTitle/AnimatedTitle";
import classes from "./HeroSection.module.css";

import ladyJusticeImg from "../../../public/lady-justice.png";
const HeroSection = () => {
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <AnimatedTitle text='MareLaw' variant='h1' fontWeight={400} />
        <AnimatedTitle text='Upgrading and harmonization of Maritime law STCW based curriculum for Maritime students' variant='h5' fontWeight={300} />
        <div className={classes.scrollDown}>
          <svg viewBox='0 0 10 28' fill='none'>
            <path d='M5 1v25.94M9 23.22l-4 4.25-4-4.25' stroke='#1D212D' strokeLinecap='round' strokeLinejoin='round'></path>
          </svg>
        </div>
      </div>
      <div className={classes.image}>
        <Image src={ladyJusticeImg} alt='marelaw hero section' />
      </div>
    </div>
  );
};

export default HeroSection;
