import Link from "next/link";
import classes from "./Lessons.module.css";
import { Box, List, ListItem, Typography } from "@mui/material";

const Lessons = ({ lessons }) => {
  return (
    <Box as='article' className={classes.container} maxWidth='xl'>
      <Box className={classes.inner}>
        <Box className={classes.lessons}>
          <Typography variant='h1' className={classes.title}>
            Lessons
          </Typography>
          <List>
            {lessons.map((lesson) => (
              <ListItem key={lesson.slug}>
                <Link href={`/lessons/${lesson.slug}`}>{lesson.title}</Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Lessons;
