import { Navigation } from "./Navigation";
import { Hero } from "./HeroSection";
import { Footer } from "./Footer";

export default function SaaSHero() {
  return (
    <main className="bg-black text-white">
      <Navigation />
      <Hero />
      <Footer/>
    </main>
  );
}