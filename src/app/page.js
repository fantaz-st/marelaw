import HeroSection from "@/components/HeroSection/HeroSection";
import classes from "./page.module.css";
import AboutSection from "@/components/AboutSection/AboutSection";
import Footer from "@/components/Footer/Footer";
import FAQSection from "@/components/FAQSection/FAQSection";

export default function Home() {
  return (
    <main className={classes.main}>
      <HeroSection />
      <AboutSection />
      <FAQSection />
      <Footer />
      {/* <div style={{ height: "100vh" }} /> */}
    </main>
  );
}
