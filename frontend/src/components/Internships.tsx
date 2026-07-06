import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiBriefcase, FiCalendar } from "react-icons/fi";

const internshipData = [
  {
    company: "VDart Academy",
    role: "Full Stack Development Internship",
    duration: "July 2026",
    technologies: ["Django", "React", "Vite", "Axios", "API", "AI Integration"],
    description: "Built decoupled full-stack systems connecting React/Vite frontends with Django backend services. Created RESTful APIs, handled token-based client-side authorization, and performed proof-of-concept AI model integrations.",
  },
  {
    company: "Appin Technology",
    role: "Full Stack Python Internship",
    duration: "Dec 2025 – Jan 2026",
    technologies: ["HTML", "CSS", "JavaScript", "Python Framework"],
    description: "Designed core static web frontends and mapped dynamic routes using lightweight Python web frameworks. Developed responsive layouts and verified database configurations.",
  },
];

export default function Internships() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="internship" ref={sectionRef} className="py-20 bg-darkbg/30 dark:bg-darkbg/30 light:bg-gray-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="bg-blob w-[300px] h-[300px] bg-gold/5 bottom-1/4 left-1/4" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Professional <span className="text-gold">Internships</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-gold/20 ml-4 md:ml-32 py-2 flex flex-col gap-12">
          {internshipData.map((intern, index) => {
            const itemRef = useRef(null);
            const isItemInView = useInView(itemRef, { once: true, amount: 0.3 });

            return (
              <div key={index} ref={itemRef} className="relative pl-8 md:pl-12">
                {/* Timeline node icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isItemInView ? { scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="absolute left-[-17px] top-1.5 w-8 h-8 rounded-full bg-darkbg dark:bg-darkbg light:bg-white border-2 border-gold flex items-center justify-center text-gold z-10 shadow-lg"
                >
                  <FiBriefcase className="w-3.5 h-3.5" />
                </motion.div>

                {/* Left side duration tag on desktop */}
                <div className="hidden md:block absolute left-[-160px] top-2 w-32 text-right">
                  <span className="font-display font-semibold text-xs text-gold tracking-wider flex items-center justify-end gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {intern.duration}
                  </span>
                </div>

                {/* Experience Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isItemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel p-6 rounded-xl text-left border border-gold/10 hover:border-gold/30"
                >
                  {/* Duration visible on mobile */}
                  <span className="inline-flex md:hidden items-center gap-1 text-gold font-semibold text-xs mb-2 tracking-wide font-display">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {intern.duration}
                  </span>

                  <h3 className="font-display font-bold text-lg md:text-xl text-white dark:text-white light:text-gray-900 mb-1">
                    {intern.role}
                  </h3>

                  <h4 className="font-display font-medium text-sm text-gold mb-3">
                    {intern.company}
                  </h4>

                  <p className="font-sans text-xs md:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-5">
                    {intern.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gold/5">
                    {intern.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gold/5 text-gold border border-gold/10 font-mono text-xs px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
