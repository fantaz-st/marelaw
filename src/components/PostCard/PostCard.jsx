import classes from "./PostCard.module.css";
import formatDate from "@/functions/formatDate";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import CategoryButton from "../CategoryButton/CategoryButton";

const PostCard = ({ article }) => {
  return (
    <Box className={classes.container}>
      <Box className={classes.inner}>
        <div className={classes.header}>
          <Typography variant='body' className={classes.writtenBy}>
            <span>WRITTEN </span>BY <span className={classes.author}>{article.author.node.name || article.author.node.name || "admin"}</span>
            <span className={classes.date}>{formatDate(article.date)}</span>
          </Typography>
        </div>

        <Box className={classes.categories}>
          {article.categories.nodes.map((cat) => (
            <CategoryButton category={cat} key={cat.name} />
          ))}
        </Box>

        {/* {article.featuredImage && (
          <Box className={classes.imageWrapper}>
            <Image src={article.featuredImage.node.sourceUrl} alt={article.featuredImage.node.altText || article.title} fill style={{ objectFit: "cover" }} />
          </Box>
        )} */}

        <Link href={`/articles${article.uri}`}>
          <Typography variant='h5' className={classes.title}>
            {article.title}
          </Typography>
        </Link>
        <Box className={classes.footer}>
          <Link href={`/articles${article.uri}`} className={classes.button}>
            <Typography variant='body' className={classes.readMore}>
              Read more
            </Typography>
            <Box className={classes.arrow}>
              <svg className={classes.svg} xmlns='http://www.w3.org/2000/svg' width='11.9' height='11.9' viewBox='0 0 11.9 11.9'>
                <g>
                  <path d='M0 .5h11.372v11.354'></path>
                  <path strokeWidth='.75' d='M11.3715.5.7587 11.1128'></path>
                </g>
                <g>
                  <path d='M0 .5h11.372v11.354'></path>
                  <path strokeWidth='.75' d='M11.3715.5.7587 11.1128'></path>
                </g>
              </svg>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
