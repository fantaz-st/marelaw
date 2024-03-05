import classes from "./SectionCaption.module.css";

const SectionCaption = ({ children }) => {
  return (
    <div className={classes.container}>
      <p>{children}</p>
    </div>
  );
};

export default SectionCaption;
