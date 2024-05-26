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

const Article = async ({ params }) => {
  const allData = await fetchApi(singlePostPageQuery.call(this, params.slug[1]));

  const { author, categories, date, id, title, blocks, featuredImage } = allData.data.post;
  let featuredImagePlaiceholder;
  if (featuredImage) {
    try {
      const buffer = await fetch(featuredImage.node?.sourceUrl).then(async (res) => Buffer.from(await res.arrayBuffer()));

      const { base64 } = await getPlaiceholder(buffer);
      featuredImagePlaiceholder = base64;
    } catch (err) {
      err;
    }
  }

  return (
    <Box as='article' className={classes.container} maxWidth='xxl'>
      <Box className={classes.inner}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} className={classes.content}>
            <ArticleHeader title={title} author={author} date={date} />

            <ArticleFeaturedImage src={featuredImage.node.sourceUrl} alt={featuredImage.node.title || title} placeholder={featuredImagePlaiceholder} />
            <Box>{blocks && blocks.map((block, i) => <Block block={block} key={i} />)}</Box>
          </Grid>
          {/* kategorije i ostalo */}
          <Grid item xs={12} md={4} className={classes.content}>
            <Box>Kategorije</Box>
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
            </List>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Article;
