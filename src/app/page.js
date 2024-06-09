import HeroSection from "@/components/HeroSection/HeroSection";
import classes from "./page.module.css";
import AboutSection from "@/components/AboutSection/AboutSection";
import PostsSection from "@/components/PostsSection/PostsSection";
import PrioritiesSection from "@/components/PrioritiesSection/PrioritiesSection";
import { fetchApi } from "@/functions/fetchApi";
import { allNewsQuery } from "@/helpers/queryLists";
import PartnersSection from "@/components/PartnersSection/PartnersSection";

export default async function Home() {
  const homePagePosts = await fetchApi(allNewsQuery);

  return (
    <main className={classes.main}>
      <HeroSection />
      <AboutSection />
      <PostsSection posts={homePagePosts.data.posts.nodes} />
      <PrioritiesSection />
      <PartnersSection />
    </main>
  );
}
