import Article from "@/components/Routes/Article/Article";
import Page from "@/components/Routes/Page/Page";
import { fetchApi } from "@/functions/fetchApi";
import { allPagesUrisQuery } from "@/helpers/queryLists";

export async function generateMetadata({ params }) {
  return { title: "MareLaw" };
}

const catchDamnAllPage = async ({ params }) => {
  if (params.slug[0] === "articles") return <Article params={params} />;
  return <Page params={params} />;
};

export default catchDamnAllPage;

export async function generateStaticParams() {
  const allPagesUris = await fetchApi(allPagesUrisQuery);

  return allPagesUris.data.pages.nodes.map((uri) => {
    return uri.uri;
  });
}
