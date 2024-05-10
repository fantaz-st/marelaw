import { Button } from "@mui/material";

const ButtonBlock = ({ url, title, text, linkTarget, className }) => {
  return <Button variant='outlined'>{title || text}</Button>;
};

export default ButtonBlock;
