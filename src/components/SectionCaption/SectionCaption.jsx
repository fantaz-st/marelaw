import { Box, Typography } from "@mui/material";
import classes from "./SectionCaption.module.css";

const SectionCaption = ({ children }) => {
  return (
    <Box className={classes.container}>
      <Typography variant='body' component='p'>
        {children}
      </Typography>
    </Box>
  );
};

export default SectionCaption;
