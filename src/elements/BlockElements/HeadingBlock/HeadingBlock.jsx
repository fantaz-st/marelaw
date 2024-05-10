import parseHtml from "@/functions/parser";
import { Typography } from "@mui/material";

const HeadingBlock = (props) => {
  // { align, anchor, backgroundColor, className, content, level, style, textAlign, textColor }

  return <Typography variant={`h${props.level}`}>{parseHtml(props.content)}</Typography>;
};

export default HeadingBlock;
