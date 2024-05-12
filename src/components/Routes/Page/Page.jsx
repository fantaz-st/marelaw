import Block from "@/components/Block/Block";
import { fetchApi } from "@/functions/fetchApi";
import { singlePageContent } from "@/helpers/queryLists";
import { Box, Typography } from "@mui/material";

const Page = async ({ params }) => {
  const { data } = await fetchApi(singlePageContent.call(this, params.slug.join("/")));

  return (
    <Box className='content' sx={{ padding: { xs: "4rem 1rem 0rem", md: "6rem 4rem" } }}>
      <Typography variant='h2'>{data?.page?.title || "Undefined"}</Typography>
      {data.page.blocks && data.page.blocks.map((block, i) => <Block block={block} key={i} />)}
    </Box>
  );
};

export default Page;
