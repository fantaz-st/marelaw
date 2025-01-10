import AboutSection from "@/components/AboutSection/AboutSection";
import PostsSection from "@/components/PostsSection/PostsSection";
import PrioritiesSection from "@/components/PrioritiesSection/PrioritiesSection";
import PartnersSection from "@/components/PartnersSection/PartnersSection";
import Hero from "@/components/Hero/Hero";
import { fetchApi } from "@/functions/fetchApi";
import { allNewsQuery } from "@/helpers/queryLists";

export default async function Home() {
  const homePagePosts = await fetchApi(allNewsQuery);

  return (
    <>
      <Hero />
      <AboutSection />
      <PostsSection posts={homePagePosts.data.posts.nodes} />
      <PrioritiesSection />
      <PartnersSection />
    </>
  );
}
