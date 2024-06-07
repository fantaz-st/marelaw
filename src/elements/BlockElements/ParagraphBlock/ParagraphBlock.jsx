import parseHtml from "@/functions/parser";
import classes from "./ParagraphBlock.module.css";
import { Typography } from "@mui/material";

const ParagraphBlock = (props) => {
  return (
    <Typography className={classes.paragraph} variant='body' component='p' sx={{ lineHeight: "2rem", textAlign: props.align, margin: "0.5rem 0 1rem" }}>
      {parseHtml(props.content)}
    </Typography>
  );
};

export default ParagraphBlock;
