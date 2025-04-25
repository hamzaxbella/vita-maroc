import About from "./sections/about";
import Features from "./sections/features";
import Footer from "./sections/footer";
import Hero from "./sections/hero";
import Process from "./sections/process";
import Testimonials from "./sections/testimonials";

export default function Home() {
  return (
    <section>
      <Hero />
      <About />
      <Features />
      <Process />
      <Testimonials />
      <Footer />
    </section>
  );
}