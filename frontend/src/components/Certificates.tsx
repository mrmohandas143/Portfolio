import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiAward } from "react-icons/fi";

const certificatesData = [
  {
    title: "Data Science",
    issuer: "Great Learning Academy",
    date: "2025",
    badge: "DS",
  },
  {
    title: "Figma Bootcamp",
    issuer: "LetsUpgrade + NSDC (National Skill Development Corporation)",
    date: "2025",
    badge: "UI/UX",
  },
  {
    title: "Full Stack Development",
    issuer: "NoviTech",
    date: "2025",
    badge: "FS",
  },
  {
    title: "JavaScript Workshop",
    issuer: "EK Academy",
    date: "2024",
    badge: "JS",
  },
];

export default function Certificates() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="certifications" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="bg-blob w-[250px] h-[250px] bg-gold/5 top-1/4 right-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Licenses & <span className="text-gold">Certifications</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((cert, index) => {
            const cardRef = useRef(null);
            const isCardInView = useInView(cardRef, { once: true, amount: 0.2 });

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, y: 25 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-panel p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-lg flex flex-col justify-between h-full group"
              >
                <div>
                  {/* Badge & Year Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/10">
                      <FiAward className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono font-bold bg-gold/5 text-gold border border-gold/10 px-2 py-0.5 rounded">
                      {cert.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white dark:text-white light:text-gray-900 text-left mb-2 group-hover:text-gold transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 text-left leading-relaxed mb-6">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gold/5">
                  <span className="font-mono text-xs text-gray-500">
                    {cert.date}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
