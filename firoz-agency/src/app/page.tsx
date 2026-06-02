import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import Clients from "@/components/sections/Clients";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Portfolio />
      <Clients />
      <About />
      <Services />
      <Contact />
    </main>
  );
}
