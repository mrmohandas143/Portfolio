import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const educationData = [
  {
    institution: "Indra Ganesan College of Engineering",
    degree: "B.Tech Artificial Intelligence & Data Science",
    duration: "2023 – 2027",
    score: "CGPA 8.56",
    description: "Specialized study in artificial intelligence, neural networks, computer vision, advanced databases, machine learning systems, robotics, and full stack web development.",
  },
  {
    institution: "Government Boys Higher Secondary School",
    degree: "Higher Secondary (Bio Maths)",
    duration: "2021 – 2023",
    score: "83%",
    description: "Focus on Mathematics, Physics, Chemistry, and Biology.",
  },
  {
    institution: "Sri Lalitha High School",
    degree: "Secondary School Leaving Certificate (SSLC)",
    duration: "2020 – 2021",
    score: "All Pass",
    description: "General high school curriculum with outstanding academic standing.",
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="education" ref={sectionRef} className="py-20 relative overflow-hidden bg-darkbg/30 dark:bg-darkbg/30 light:bg-gray-50/50">
      {/* Background glow */}
      <div className="bg-blob w-[300px] h-[300px] bg-gold/10 top-1/3 right-1/4" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Education <span className="text-gold">Timeline</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Elegant Timeline */}
        <div className="relative border-l-2 border-gold/20 ml-4 md:ml-32 py-2 flex flex-col gap-12">
          {educationData.map((item, index) => {
            const itemRef = useRef(null);
            const isItemInView = useInView(itemRef, { once: true, amount: 0.3 });

            return (
              <div key={index} ref={itemRef} className="relative pl-8 md:pl-12">
                {/* Timeline node icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={isItemInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="absolute left-[-17px] top-1.5 w-8 h-8 rounded-full bg-darkbg dark:bg-darkbg light:bg-white border-2 border-gold flex items-center justify-center text-gold z-10 shadow-lg"
                >
                  <FaGraduationCap className="w-3.5 h-3.5" />
                </motion.div>

                {/* Left side year indicator on desktop */}
                <div className="hidden md:block absolute left-[-160px] top-2 w-32 text-right">
                  <span className="font-display font-semibold text-sm text-gold tracking-wider">
                    {item.duration}
                  </span>
                </div>

                {/* Event Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isItemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-panel p-6 rounded-xl text-left border border-gold/10 hover:border-gold/30"
                >
                  {/* Duration visible on mobile */}
                  <span className="inline-block md:hidden text-gold font-semibold text-xs mb-2 tracking-wide font-display">
                    {item.duration}
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="font-display font-bold text-lg md:text-xl text-white dark:text-white light:text-gray-900">
                      {item.degree}
                    </h3>
                    <span className="px-3 py-1 text-xs font-mono font-bold bg-gold/10 text-gold rounded-full border border-gold/20 self-start sm:self-center">
                      {item.score}
                    </span>
                  </div>

                  <h4 className="font-display font-medium text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2">
                    {item.institution}
                  </h4>

                  <p className="font-sans text-xs md:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
