// import classes from './Articles.module.css';

import Block from "@/components/Block/Block";
import { fetchApi } from "@/functions/fetchApi";
import { singlePostPageQuery } from "@/helpers/queryLists";
import { Box, Grid, Typography } from "@mui/material";
import classes from "./Article.module.css";
import formatDate from "@/functions/formatDate";
import Image from "next/image";
import Link from "next/link";

const Article = async ({ params }) => {
  const allData = await fetchApi(singlePostPageQuery.call(this, params.slug[1]));
  //   let category = allData?.data?.post?.categories?.nodes[0]?.name;
  //   let postData = allData.data.post;
  const { author, categories, date, id, title, blocks, featuredImage } = allData.data.post;
  return (
    <Box as='article' className={classes.container} maxWidth='xxl'>
      <Box className={classes.inner}>
        <Typography variant='body' component='p' className={classes.breadCrumb}>
          <Link href='/' style={{ marginRight: "0.35rem" }}>
            HOME
          </Link>
          /
          <Link href='/articles' style={{ margin: "0 0.35rem" }}>
            ARTICLES
          </Link>
          /<span style={{ marginLeft: "0.35rem" }}>{title}</span>
        </Typography>

        <Grid container>
          <Grid item xs={12} md={8} className={classes.content}>
            <Box className={classes.imageWrapper}>
              <Image src={featuredImage.node.sourceUrl} alt={featuredImage.node.title || title} fill style={{ objectFit: "cover" }} />
            </Box>
            <Typography variant='h1' className={classes.title}>
              {title}
            </Typography>
            <Typography variant='body' className={classes.authorDate}>
              <span className={classes.author}>{author.node.name}</span>
              <span className={classes.date}>{formatDate(date)}</span>
            </Typography>
            <Box>{blocks && blocks.map((block, i) => <Block block={block} key={i} />)}</Box>
          </Grid>

          {/* kategorije i ostalo */}
          <Grid item xs={12} md={8} className={classes.content}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Article;
