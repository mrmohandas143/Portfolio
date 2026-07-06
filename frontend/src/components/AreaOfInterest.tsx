import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRobot, FaBrain } from "react-icons/fa";
import { FiEye, FiCode, FiCpu, FiWifi } from "react-icons/fi";

const interests = [
  {
    title: "Artificial Intelligence",
    icon: <FaBrain className="w-8 h-8 text-gold" />,
    description: "Deep learning neural networks, neural architectures, and intelligent reasoning systems.",
  },
  {
    title: "Machine Learning",
    icon: <FiCpu className="w-8 h-8 text-gold" />,
    description: "Predictive analytics, statistical learning, regression, classification, and clustering systems.",
  },
  {
    title: "Computer Vision",
    icon: <FiEye className="w-8 h-8 text-gold" />,
    description: "Object detection, real-time tracking, facial recognition, image segmentation using OpenCV.",
  },
  {
    title: "Full Stack Web Development",
    icon: <FiCode className="w-8 h-8 text-gold" />,
    description: "Responsive, performant frontends connected to robust backend systems using React, Vite, and Django.",
  },
  {
    title: "Robotics",
    icon: <FaRobot className="w-8 h-8 text-gold" />,
    description: "Mechanical agency, autonomous path-finding, feedback control systems, and robotic assembly.",
  },
  {
    title: "Embedded AI Systems",
    icon: <FiCpu className="w-8 h-8 text-gold animate-pulse" />,
    description: "Running lightweight machine learning models on microcontrollers and Edge AI processors.",
  },
  {
    title: "Internet of Things",
    icon: <FiWifi className="w-8 h-8 text-gold" />,
    description: "Smart sensor integrations, network communications, and hardware data acquisition.",
  },
];

export default function AreaOfInterest() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section id="interests" ref={containerRef} className="py-20 bg-darkbg/30 dark:bg-darkbg/30 light:bg-gray-50/50 relative overflow-hidden">
      {/* Subtle details */}
      <div className="bg-blob w-[250px] h-[250px] bg-gold/5 top-1/2 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Areas of <span className="text-gold">Interest</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Grid of Interests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {interests.map((interest, index) => {
            const cardRef = useRef(null);
            const isCardInView = useInView(cardRef, { once: true, amount: 0.2 });

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isCardInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-panel p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-lg hover:-translate-y-2 transition-all flex flex-col items-center text-center cursor-default group"
              >
                <div className="p-4 rounded-full bg-gold/5 dark:bg-gold/5 light:bg-gold/5 group-hover:bg-gold/10 transition-colors border border-gold/10 mb-5">
                  {interest.icon}
                </div>
                <h3 className="font-display font-bold text-base text-white dark:text-white light:text-gray-800 mb-3 group-hover:text-gold transition-colors">
                  {interest.title}
                </h3>
                <p className="font-sans text-xs text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                  {interest.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
