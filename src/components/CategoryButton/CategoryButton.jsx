import { Box, Typography } from "@mui/material";
import classes from "./CategoryButton.module.css";
import Link from "next/link";

const switchColors = (name) => {
  switch (name) {
    case "Official":
      return "#b4b596";
    case "From other sources":
      return "#96b5a7";
    case "3":
      return "#bec3d5";
    case "4":
      return "#907699";
    default:
      //uncategorized
      return "#dcdcdc";
  }
};

const CategoryButton = ({ category: { name, slug }, postPage = false }) => {
  return (
    <Link href={`/articles?category=${slug}`} passHref>
      <Box className={classes.container} sx={{ backgroundColor: switchColors(name), padding: { xs: postPage ? "0.1rem 0.4rem" : "0 0.3rem", md: "0.3rem 0.6rem 0.3rem 0.4rem" } }}>
        {/* <Box className={classes["category-button-sphere"]} sx={{ backgroundColor: switchColors(name) }} /> */}
        <Typography className={classes.title} variant='body'>
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

export default CategoryButton;
