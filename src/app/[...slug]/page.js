import Article from "@/components/Routes/Article/Article";
import Articles from "@/components/Routes/Articles/Articles";
import Lessons from "@/components/Routes/Lessons/Lessons";
import Page from "@/components/Routes/Page/Page";
import { fetchApi } from "@/functions/fetchApi";
import { allPagesUrisQuery, newsQuery, singlePostPageQuery } from "@/helpers/queryLists";
import { getPlaiceholder } from "plaiceholder";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SingleLesson from "@/components/Routes/SingleLesson/SingleLesson";

const lessonsDir = path.join(process.cwd(), "src", "lessons");
export const dynamic = "force-dynamic"; // Explicitly mark the page as dynamic

export async function generateMetadata({ params }) {
  return { title: "MareLaw" };
}

const catchDamnAllPage = async ({ params, searchParams }) => {
  if (params.slug[0] === "articles") {
    if (params.slug.length === 1) {
      // Fetch all articles
      const articles = await fetchApi(newsQuery.call(this, { numberOfPosts: 10, ...searchParams }));
      return <Articles initialArticles={articles} searchParams={searchParams} />;
    } else {
      // Fetch a single article
      const articleData = await fetchApi(singlePostPageQuery.call(this, params.slug[1]));
      let allArticleData = articleData.data.post;

      if (allArticleData?.featuredImage) {
        try {
          const buffer = await fetch(allArticleData.featuredImage?.node?.sourceUrl).then(async (res) => Buffer.from(await res.arrayBuffer()));
          const { base64 } = await getPlaiceholder(buffer);

          allArticleData = {
            ...allArticleData,
            featuredImage: {
              ...allArticleData.featuredImage,
              node: {
                ...allArticleData.featuredImage.node,
                base64,
              },
            },
          };
        } catch (err) {
          console.error("Error fetching image placeholder:", err);
        }
      }
      return <Article params={params} allArticleData={allArticleData} allCategories={articleData.data.categories} />;
    }
  }
  if (params.slug[0] === "lessons") {
    if (params.slug.length === 1) {
      // Get all available lessons
      const files = fs.readdirSync(lessonsDir);
      const lessons = files.map((file) => {
        const filePath = path.join(lessonsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);
        return { slug: data.slug, title: data.title };
      });

      return <Lessons lessons={lessons} />;
    } else {
      // Fetch a single lesson
      const lessonSlug = params.slug[1];
      const filePath = path.join(lessonsDir, `${lessonSlug}.md`);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { content, data } = matter(fileContent);

      return <SingleLesson content={content} metaData={data} />;
    }
  }

  // Default to rendering a general page
  return <Page params={params} />;
};

export default catchDamnAllPage;

export async function generateStaticParams() {
  const allPagesUris = await fetchApi(allPagesUrisQuery);

  // Add dynamic lesson paths
  const lessonFiles = fs.readdirSync(lessonsDir);
  const lessonPaths = lessonFiles.map((file) => ({
    params: { slug: ["lessons", file.replace(".md", "")] },
  }));

  return [...allPagesUris.data.pages.nodes.map((uri) => ({ params: { slug: uri.uri.split("/").filter(Boolean) } })), ...lessonPaths];
}
