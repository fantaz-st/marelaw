import Article from "@/components/Routes/Article/Article";
import Articles from "@/components/Routes/Articles/Articles";
import Lessons from "@/components/Routes/Lessons/Lessons";
import Page from "@/components/Routes/Page/Page";
import SingleLesson from "@/components/Routes/SingleLesson/SingleLesson";
import { fetchApi } from "@/functions/fetchApi";
import { allPagesUrisQuery, newsQuery, singlePostPageQuery } from "@/helpers/queryLists";
import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Team from "@/components/Routes/Team/Team";
import SingleTeamMember from "@/components/Routes/SingleTeamMember/SingleTeamMember";

const lessonsDir = path.join(process.cwd(), "src", "lessons");
const teamDir = path.join(process.cwd(), "src", "team");

// Explicitly mark the page as dynamic (Next 13+ optional, if you need it)
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  return { title: "MareLaw" };
}

const catchDamnAllPage = async ({ params, searchParams }) => {
  //
  // 1) ARTICLES
  //
  if (params.slug[0] === "articles") {
    if (params.slug.length === 1) {
      // All articles
      const articles = await fetchApi(newsQuery.call(this, { numberOfPosts: 10, ...searchParams }));
      return <Articles initialArticles={articles} searchParams={searchParams} />;
    } else {
      // Single article
      const articleData = await fetchApi(singlePostPageQuery.call(this, params.slug[1]));
      let allArticleData = articleData.data.post;

      // Attempt to fetch Plaiceholder for the featured image
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

  //
  // 2) LESSONS
  //
  if (params.slug[0] === "lessons") {
    if (params.slug.length === 1) {
      // All lessons
      const files = fs.readdirSync(lessonsDir);
      const lessons = files.map((file) => {
        const filePath = path.join(lessonsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);
        return { slug: data.slug, title: data.title };
      });

      return <Lessons lessons={lessons} />;
    } else {
      // Single lesson
      const lessonSlug = params.slug[1];
      const filePath = path.join(lessonsDir, `${lessonSlug}.md`);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { content, data } = matter(fileContent);

      return <SingleLesson content={content} metaData={data} />;
    }
  }

  //
  // 3) TEAM
  //
  if (params.slug[0] === "team") {
    if (params.slug.length === 1) {
      // All team members
      const files = fs.readdirSync(teamDir);
      const team = files.map((file) => {
        const filePath = path.join(teamDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);
        // Return anything you need for listing (slug, title, role, etc.)
        return {
          slug: data.slug,
          title: data.title,
          role: data.role || "",
        };
      });

      // Reuse <Lessons> or create a dedicated <Team /> component
      return <Team team={team} />;
    } else {
      // Single team member
      const memberSlug = params.slug[1];
      const filePath = path.join(teamDir, `${memberSlug}.md`);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { content, data } = matter(fileContent);

      // Reuse <SingleLesson> or a dedicated <TeamMember /> component
      return <SingleTeamMember content={content} metaData={data} />;
    }
  }

  //
  // 4) FALLBACK: GENERAL PAGE
  //
  return <Page params={params} />;
};

export default catchDamnAllPage;

//
// 5) GENERATE STATIC PARAMS
//
export async function generateStaticParams() {
  // Fetch all page URIs
  const allPagesUris = await fetchApi(allPagesUrisQuery);

  // Lessons
  const lessonFiles = fs.readdirSync(lessonsDir);
  const lessonPaths = lessonFiles.map((file) => ({
    params: { slug: ["lessons", file.replace(".md", "")] },
  }));

  // Team
  const teamFiles = fs.readdirSync(teamDir);
  const teamPaths = teamFiles.map((file) => ({
    params: { slug: ["team", file.replace(".md", "")] },
  }));

  // Merge everything
  return [
    // WordPress pages
    ...allPagesUris.data.pages.nodes.map((uri) => ({
      params: { slug: uri.uri.split("/").filter(Boolean) },
    })),
    // Markdown lessons
    ...lessonPaths,
    // Markdown team
    ...teamPaths,
  ];
}
