import Link from "next/link";
import classes from "./Lessons.module.css";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Lessons = ({ lessons }) => {
  return (
    <Box as='article' className={classes.container} maxWidth='xl'>
      <Box className={classes.inner}>
        <Box className={classes.lessons}>
          <Typography variant='h1' className={classes.title}>
            Lessons
          </Typography>
          {lessons.map((lesson) => (
            <Link href={`/lessons/${lesson.slug}`} key={lesson.slug} className={classes.lesson}>
              <Typography variant='h5' className={classes.title}>
                {lesson.title}
              </Typography>
              <Button className={classes.button} sx={{ display: { xs: "none", md: "block" } }}>
                <ArrowOutwardIcon />
              </Button>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Lessons;
