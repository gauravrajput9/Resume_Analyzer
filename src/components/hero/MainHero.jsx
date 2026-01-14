import { Navigation } from "./Navigation";
import { Hero } from "./HeroSection";
import { Footer } from "./Footer";

export default function SaaSHero() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />
      <Hero />
      <Footer />
    </main>
  );
}