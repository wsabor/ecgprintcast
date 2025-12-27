import Header from "./components/Header";
import Hero from "./components/Hero";
import Mic from "./components/Mic";
import LastEpisodes from "./components/LastEpisodes";
import About from "./components/About";
import Team from "./components/Team";
import Sponsors from "./components/Sponsors";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Mic />
      <LastEpisodes />
      <About />
      <Team />
      <Sponsors />
      <Contact />
      <Footer />
    </main>
  );
}
