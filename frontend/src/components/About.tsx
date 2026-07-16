
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
}

function StatCounter({ value, decimals = 0, duration = 2, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quadratic
      const currentProgress = progress * (2 - progress);
      const currentValue = start + (end - start) * currentProgress;

      setCount(currentValue);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counterInterval);
      }
    }, 1000 / 60);

    return () => clearInterval(counterInterval);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide"
          >
            About <span className="text-gold">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isSectionInView ? { width: "60px" } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-gold mx-auto mt-4 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Photo Frame */}
          <motion.div
            className="lg:col-span-5 flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group max-w-[320px] w-full">
              {/* Outer decorative borders */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-gold to-amber-500 opacity-20 group-hover:opacity-40 blur transition duration-500" />
              
              {/* Profile Image container */}
              <div className="relative rounded-xl overflow-hidden bg-[#111] dark:bg-[#111] light:bg-gray-100 border border-gold/20 p-2 shadow-2xl">
                <img
                  src="/profile.jpg"
                  alt="Mohandas S About"
                  className="w-full aspect-[4/5] object-cover rounded-lg filter grayscale group-hover:grayscale-0 transition-all duration-700 select-none"
                />
              </div>

              {/* Float border frame */}
              <div className="absolute top-4 left-4 -right-4 -bottom-4 border-2 border-dashed border-gold/30 rounded-xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
            </div>
          </motion.div>

          {/* Right Side: Narrative & Counters */}
          <motion.div
            className="lg:col-span-7 text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display font-semibold text-lg md:text-xl text-white dark:text-white light:text-gray-800 mb-4">
              AI Enthusiast & Software Developer
            </h3>
            
            <p className="font-sans text-sm md:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-8">
              I am Mohandas S, a Final-Year Artificial Intelligence & Data Science student at Indra Ganesan College of Engineering with a CGPA of 8.56. I have a strong interest in AI, Computer Vision, Machine Learning, Robotics, and Full Stack Development. I enjoy developing intelligent applications that solve practical problems and continuously improve my technical skills through projects, internships, and hackathons.
            </p>

            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              {/* CGPA */}
              <div className="glass-panel p-5 rounded-xl border border-gold/10 hover:border-gold/30 transition-all text-center">
                <p className="font-display font-bold text-2xl md:text-3xl text-gold">
                  <StatCounter value={8.56} decimals={2} />
                </p>
                <p className="font-sans text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1 uppercase tracking-wider">
                  CGPA
                </p>
              </div>

              {/* Projects */}
              <div className="glass-panel p-5 rounded-xl border border-gold/10 hover:border-gold/30 transition-all text-center">
                <p className="font-display font-bold text-2xl md:text-3xl text-gold">
                  <StatCounter value={4} />
                </p>
                <p className="font-sans text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1 uppercase tracking-wider">
                  Projects
                </p>
              </div>

              {/* Internships */}
              <div className="glass-panel p-5 rounded-xl border border-gold/10 hover:border-gold/30 transition-all text-center">
                <p className="font-display font-bold text-2xl md:text-3xl text-gold">
                  <StatCounter value={2} />
                </p>
                <p className="font-sans text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1 uppercase tracking-wider">
                  Internships
                </p>
              </div>

              {/* Certifications */}
              <div className="glass-panel p-5 rounded-xl border border-gold/10 hover:border-gold/30 transition-all text-center">
                <p className="font-display font-bold text-2xl md:text-3xl text-gold">
                  <StatCounter value={4} />
                </p>
                <p className="font-sans text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1 uppercase tracking-wider">
                  Certifications
                </p>
              </div>

              {/* Achievements */}
              <div className="glass-panel p-5 rounded-xl border border-gold/10 hover:border-gold/30 transition-all text-center col-span-2 sm:col-span-1">
                <p className="font-display font-bold text-2xl md:text-3xl text-gold">
                  <StatCounter value={5} />
                </p>
                <p className="font-sans text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 mt-1 uppercase tracking-wider">
                  Achievements
                </p>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
