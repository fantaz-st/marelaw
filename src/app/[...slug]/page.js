import Article from "@/components/Routes/Article/Article";
import Page from "@/components/Routes/Page/Page";
import { fetchApi } from "@/functions/fetchApi";
import { allPagesUrisQuery, singlePostPageQuery } from "@/helpers/queryLists";
import { getPlaiceholder } from "plaiceholder";

export async function generateMetadata({ params }) {
  return { title: "MareLaw" };
}

const catchDamnAllPage = async ({ params }) => {
  if (params.slug[0] === "articles") {
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
        err;
      }
    }
    return <Article params={params} allArticleData={allArticleData} />;
  }
  return <Page params={params} />;
};

export default catchDamnAllPage;

export async function generateStaticParams() {
  const allPagesUris = await fetchApi(allPagesUrisQuery);

  return allPagesUris.data.pages.nodes.map((uri) => {
    return uri.uri;
  });
}
