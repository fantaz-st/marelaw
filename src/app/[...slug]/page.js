import Article from "@/components/Routes/Article/Article";
import Articles from "@/components/Routes/Articles/Articles";
import Page from "@/components/Routes/Page/Page";
import { fetchApi } from "@/functions/fetchApi";
import { allPagesUrisQuery, newsQuery, singlePostPageQuery } from "@/helpers/queryLists";
import { getPlaiceholder } from "plaiceholder";

export async function generateMetadata({ params }) {
  return { title: "MareLaw" };
}

const catchDamnAllPage = async ({ params, searchParams }) => {
  if (params.slug[0] === "articles") {
    if (params.slug.length === 1) {
      // Fetch all articles
      const articles = await fetchApi(newsQuery.call(this, { numberOfPosts: 12, ...searchParams }));
      return <Articles articles={articles} searchParams={searchParams} />;
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

  // Default to rendering a general page
  return <Page params={params} />;
};

export default catchDamnAllPage;

export async function generateStaticParams() {
  const allPagesUris = await fetchApi(allPagesUrisQuery);
  return allPagesUris.data.pages.nodes.map((uri) => ({ params: { slug: uri.uri.split("/").filter(Boolean) } }));
}
