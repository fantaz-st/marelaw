// import classes from './Articles.module.css';

import classes from "./Article.module.css";
import Block from "@/components/Block/Block";
import ArticleHeader from "@/components/ArticleHeader/ArticleHeader";
import { fetchApi } from "@/functions/fetchApi";
import { singlePostPageQuery } from "@/helpers/queryLists";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import ArticleFeaturedImage from "@/components/ArticleFeaturedImage/ArticleFeaturedImage";
import { getPlaiceholder } from "plaiceholder";
import formatDate from "@/functions/formatDate";

const Article = async ({ params }) => {
  const allData = await fetchApi(singlePostPageQuery.call(this, params.slug[1]));

  const { author, categories, date, id, title, blocks, featuredImage } = allData.data.post;
  let featuredImagePlaiceholder;
  if (featuredImage) {
    try {
      const buffer = await fetch(featuredImage.node?.sourceUrl).then(async (res) => Buffer.from(await res.arrayBuffer()));

      const plaiceholderData = await getPlaiceholder(buffer);
      featuredImagePlaiceholder = plaiceholderData;
    } catch (err) {
      err;
    }
  }

  return (
    <Box as='article' className={classes.container} maxWidth='xxl'>
      <Box className={classes.inner}>
        <ArticleHeader title={title} author={author} date={date} />
        <Grid container columnSpacing={12} sx={{ marginTop: "4rem" }}>
          {/* slika */}
          <Grid item xs={12} md={6} className={classes.content}>
            <ArticleFeaturedImage src={featuredImage.node.sourceUrl} alt={featuredImage.node.title || title} placeholder={featuredImagePlaiceholder} />
            <Typography variant='body' className={classes.date}>
              <span>POSTED ON</span>
              <span>{formatDate(date)}</span>
            </Typography>
            <Typography variant='body' className={classes.categories}>
              <span>POSTED AT</span>
              {categories.nodes.map((cat) => (
                <span key={cat.slug}>{cat.name}</span>
              ))}
            </Typography>
            <Typography variant='body' className={classes.author}>
              <span>POSTED BY</span>
              <span>{author.node.name}</span>
            </Typography>
            {/*  <Box>Kategorije</Box>
            <List>
              {allData.data.categories.nodes.map((cat) => {
                return (
                  <ListItem key={cat.slug}>
                    <Link href={`/articles&category=${cat.slug}`}>
                      <Typography variant='body'>{cat.name}</Typography>
                    </Link>
                  </ListItem>
                );
              })}
            </List> */}
          </Grid>
          {/* text */}
          <Grid item xs={12} md={6} className={classes.content}>
            <Box>{blocks && blocks.map((block, i) => <Block block={block} key={i} />)}</Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Article;
