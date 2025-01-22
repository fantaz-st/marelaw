import Link from "next/link";
import formatDate from "@/functions/formatDate";
import { Box, Typography } from "@mui/material";
import classes from "./PostCard.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import parseHtml from "@/functions/parser";

const PostCard = ({ article }) => {
  return (
    <Link href={`/articles${article.uri}`}>
      <Box
        className={classes.container}
        sx={{
          [`&:hover .${classes.title}, &:hover .${classes.excerpt}, &:hover .${classes.category}`]: {
            color: "#fff",
          },
        }}
      >
        <Box className={classes.text}>
          <Typography variant='body' className={classes.title}>
            {article.title}
          </Typography>
          <Typography variant='body' className={classes.excerpt}>
            {parseHtml(article.excerpt)}
          </Typography>
        </Box>
        <Box className={classes.footer}>
          <Box>
            {article.categories.nodes.map((cat, index) => (
              <Typography variant='body' key={cat.name} className={classes.category}>
                {cat.name}
                {index < article.categories.nodes.length - 1 && ", "}
              </Typography>
            ))}
            <span className={classes.date}>{formatDate(article.date)}</span>
          </Box>
          <ArrowForwardIcon />
        </Box>
      </Box>
    </Link>
  );
};

export default PostCard;
