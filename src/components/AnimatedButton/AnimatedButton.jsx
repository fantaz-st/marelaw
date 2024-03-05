import classes from "./AnimatedButton.module.css";

const AnimatedButton = ({ text = "Find out more" }) => {
  return (
    <button className={classes.button}>
      <div className={classes.content}>
        <div className={classes.text}>{text}</div>
        <div className={classes.icon}>
          <svg viewBox='0 0 18 18' fill='none'>
            <path d=' M.531 9H16.47M12.75 5L17 9l-4.25 4' stroke='#fff' strokeLinecap='round' strokeLinejoin='round'></path>
          </svg>
        </div>
      </div>
    </button>
  );
};

export default AnimatedButton;
