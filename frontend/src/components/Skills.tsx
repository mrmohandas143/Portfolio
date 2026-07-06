import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SiPython, SiJavascript, SiReact, SiVite, SiDjango, SiMysql, SiSqlite, SiGit, SiGithub } from "react-icons/si";
import { FaBrain, FaRegEye, FaCogs, FaDatabase, FaLaptopCode, FaWrench, FaHtml5, FaCss3Alt, FaFileExcel } from "react-icons/fa";

interface SkillItem {
  name: string;
  level: number; // percentage 0-100
  icon?: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming",
      icon: <FaLaptopCode className="w-5 h-5 text-gold" />,
      skills: [
        { name: "Python", level: 90, icon: <SiPython className="text-yellow-400" /> },
      ],
    },
    {
      title: "Frontend Development",
      icon: <SiReact className="w-5 h-5 text-gold animate-[spin_12s_linear_infinite]" />,
      skills: [
        { name: "React", level: 85, icon: <SiReact className="text-cyan-400" /> },
        { name: "Vite", level: 80, icon: <SiVite className="text-purple-400" /> },
        { name: "JavaScript", level: 85, icon: <SiJavascript className="text-yellow-300" /> },
        { name: "HTML5", level: 90, icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS3", level: 85, icon: <FaCss3Alt className="text-blue-500" /> },
      ],
    },
    {
      title: "Backend Development",
      icon: <FaCogs className="w-5 h-5 text-gold" />,
      skills: [
        { name: "Django", level: 80, icon: <SiDjango className="text-emerald-500" /> },
        { name: "Python Frameworks", level: 85, icon: <SiPython className="text-yellow-500" /> },
      ],
    },
    {
      title: "Database Systems",
      icon: <FaDatabase className="w-5 h-5 text-gold" />,
      skills: [
        { name: "MySQL", level: 80, icon: <SiMysql className="text-blue-400" /> },
        { name: "SQLite", level: 85, icon: <SiSqlite className="text-sky-500" /> },
      ],
    },
    {
      title: "Artificial Intelligence",
      icon: <FaBrain className="w-5 h-5 text-gold" />,
      skills: [
        { name: "Machine Learning", level: 85, icon: <FaBrain className="text-pink-400" /> },
        { name: "Computer Vision", level: 90, icon: <FaRegEye className="text-indigo-400" /> },
        { name: "AI Vision Algorithms", level: 85, icon: <FaBrain className="text-gold" /> },
      ],
    },
    {
      title: "Tools & Utilities",
      icon: <FaWrench className="w-5 h-5 text-gold" />,
      skills: [
        { name: "Git", level: 80, icon: <SiGit className="text-orange-600" /> },
        { name: "GitHub", level: 85, icon: <SiGithub className="text-white" /> },
        { name: "MS Office (Word, PPT, Excel)", level: 90, icon: <FaFileExcel className="text-green-600" /> },
      ],
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="bg-blob w-[400px] h-[400px] bg-gold/5 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Technical <span className="text-gold">Skills</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => {
            const cardRef = useRef(null);
            const isCardInView = useInView(cardRef, { once: true, amount: 0.2 });

            return (
              <motion.div
                key={catIdx}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: catIdx * 0.05 }}
                className="glass-panel p-6 rounded-2xl border border-gold/10 hover:border-gold/30 hover:shadow-lg flex flex-col h-full"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-gold/10">
                  {category.icon}
                  <h3 className="font-display font-bold text-base md:text-lg text-white dark:text-white light:text-gray-800">
                    {category.title}
                  </h3>
                </div>

                {/* Skills progress list */}
                <div className="flex flex-col space-y-4 flex-grow">
                  {category.skills.map((skill, skIdx) => (
                    <div key={skIdx} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-300 dark:text-gray-300 light:text-gray-700">
                          {skill.icon && <span className="text-base">{skill.icon}</span>}
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="font-mono text-xs text-gold font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Skill bar background */}
                      <div className="w-full h-1.5 bg-gold/5 dark:bg-gold/5 light:bg-gray-200 rounded-full overflow-hidden">
                        {/* Animated progress fill */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isCardInView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 + skIdx * 0.05 }}
                          className="h-full bg-gradient-to-r from-gold to-cyan-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
