import Link from "next/link";
import classes from "./Lessons.module.css";
import { Box, Button, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const Lessons = ({ lessons }) => {
  const sortedLessons = [...lessons].sort((a, b) => {
    const extractNumbers = (str) => str.replace("lesson-", "").split(".").map(Number);

    const aParts = extractNumbers(a.slug);
    const bParts = extractNumbers(b.slug);

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aNum = aParts[i] || 0;
      const bNum = bParts[i] || 0;
      if (aNum !== bNum) return aNum - bNum;
    }
    return 0;
  });

  return (
    <Box as='article' className={classes.container} maxWidth='xl'>
      <Box className={classes.inner}>
        <Box className={classes.lessons}>
          <Typography variant='h1' className={classes.title}>
            Lessons
          </Typography>
          {sortedLessons.map((lesson, i) => (
            <Link href={`/lessons/${lesson.slug}`} key={lesson.slug} className={classes.lesson}>
              <Typography variant='h5' className={classes.title}>
                {i + 1}. {lesson.title}
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
