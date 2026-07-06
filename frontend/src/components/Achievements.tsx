import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiAward, FiUsers, FiCpu, FiTrendingUp } from "react-icons/fi";

const achievementsData = [
  {
    title: "Second Place in Project Expo",
    subtitle: "Project Exhibition",
    icon: <span className="text-2xl">🥈</span>,
    description: "Awarded runner-up positions for demonstrating high-impact hardware-software prototypes to academic and industrial panels.",
  },
  {
    title: "Hackathon Participant",
    subtitle: "Product building competitions",
    icon: <FiCpu className="w-6 h-6 text-gold" />,
    description: "Competed in high-stress hackathons, designing machine learning and web solutions within strict 24-48 hour time-limits.",
  },
  {
    title: "National Symposium Participant",
    subtitle: "Inter-collegiate Symposiums",
    icon: <FiTrendingUp className="w-6 h-6 text-gold" />,
    description: "Presented research insights, participated in coding competitions, and network events at national engineering gatherings.",
  },
  {
    title: "Department Office Bearer",
    subtitle: "Leadership Role",
    icon: <FiUsers className="w-6 h-6 text-gold" />,
    description: "Appointed as student representative, managing administrative operations and bridging relationships between student committees and senior faculty.",
  },
  {
    title: "Leadership & Event Coordination",
    subtitle: "Extra-curricular organizer",
    icon: <FiAward className="w-6 h-6 text-gold" />,
    description: "Structured technical workshops, scheduled guest seminars, and co-directed cultural events, boosting student participation.",
  },
];

export default function Achievements() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="achievements" ref={sectionRef} className="py-20 bg-darkbg/30 dark:bg-darkbg/30 light:bg-gray-50/50 relative overflow-hidden">
      <div className="bg-blob w-[300px] h-[300px] bg-gold/5 bottom-0 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Honors & <span className="text-gold">Achievements</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item, index) => {
            const cardRef = useRef(null);
            const isCardInView = useInView(cardRef, { once: true, amount: 0.2 });

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isCardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`glass-panel p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-lg flex flex-col justify-between text-left cursor-default group h-full ${
                  index === 0 ? "md:col-span-2 lg:col-span-1 border-gold/30 bg-gold/[0.02]" : ""
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="p-3 rounded-xl bg-gold/5 dark:bg-gold/5 light:bg-gold/5 border border-gold/10 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {index === 0 && (
                      <span className="bg-gold/10 text-gold border border-gold/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        Podium Finish
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-white dark:text-white light:text-gray-900 mb-1 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  
                  <h4 className="font-display text-xs text-gold font-medium mb-4 tracking-wide uppercase">
                    {item.subtitle}
                  </h4>

                  <p className="font-sans text-xs md:text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
