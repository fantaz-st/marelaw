import { Box, Typography } from "@mui/material";
import classes from "./HorizontalArticleCard.module.css";
import Link from "next/link";
import formatDate from "@/functions/formatDate";

const HorizontalArticleCard = ({ article, id }) => {
  const { title, slug, author, featuredImage, categories, date } = article;
  return (
    <Box className={classes.container}>
      <Box className={classes.details}>
        <Typography as='p' variant='body'>
          BY {author.node.name}
        </Typography>
        <Typography as='p' variant='body' className={classes.date}>
          {formatDate(date)}
        </Typography>
        <Typography as='p' variant='body' className={classes.categories}>
          in
        </Typography>

        {categories.nodes.map((cat, index) => (
          <Link href={`/articles?category=${cat.slug}`} key={cat.slug}>
            <Typography as='p' variant='body' className={classes.singleCategory}>
              {cat.name}
              {index < categories.nodes.length - 1 && ", "}
            </Typography>
          </Link>
        ))}
      </Box>
      <Link href={`articles/${slug}`}>
        <Typography variant='h4'>{title}</Typography>
      </Link>
    </Box>
  );
};

export default HorizontalArticleCard;