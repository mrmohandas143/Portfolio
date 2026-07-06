import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import AreaOfInterest from "./components/AreaOfInterest";
import Projects from "./components/Projects";
import Internships from "./components/Internships";
import Certificates from "./components/Certificates";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen bg-[#0B0B0B] dark:bg-[#0B0B0B] light:bg-[#F9F9FB] transition-colors duration-300 overflow-x-hidden">
          {/* Custom cursor overlay */}
          <CustomCursor />
          
          {/* Top scroll progress loader */}
          <ScrollProgress />
          
          {/* Sticky header navigation */}
          <Navbar />
          
          <main>
            {/* Sections mapped to active states */}
            <Hero />
            <About />
            <Education />
            <Skills />
            <AreaOfInterest />
            <Projects />
            <Internships />
            <Certificates />
            <Achievements />
            <Contact />
          </main>
          
          {/* Footer content */}
          <Footer />
        </div>
      )}
    </>
  );
}
