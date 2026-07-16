import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiGithub, FiExternalLink, FiLayers, FiMaximize2, FiX } from "react-icons/fi";

interface Project {
  id: number;
  title: string;
  category: "AI/Robotics" | "Full Stack";
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string; // Placeholder or we can use generated patterns
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Autonomous University Robotic Assistant",
    category: "AI/Robotics",
    description: "An AI-powered robotic surveillance system developed using Raspberry Pi and Python for smart campus monitoring.",
    longDescription: "An AI-powered robotic surveillance system developed using Raspberry Pi and Python for smart campus monitoring. Key features include real-time computer vision processing, custom voice assistant commands, autonomous navigation algorithms, active obstacle detection, servo-motorized camera controls, and IMU-based stabilization. The system integrates intelligent path finding and communicates surveillance reports dynamically.",
    technologies: ["Python", "Raspberry Pi", "OpenCV", "AI Vision Algorithms", "Voice Assistant", "Camera Module", "Servo Motors", "IMU"],
    githubUrl: "https://github.com/Darkvoide/Monitoring_App",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "College Management System",
    category: "Full Stack",
    description: "A modern full-stack web application for managing students, faculty, attendance, authentication, and academic administration.",
    longDescription: "A modern full-stack web application for managing student directories, faculty rosters, attendance tracking, secure authentication, and academic administration. Built using a decoupled architecture with a React front-end and a Django backend API. Includes role-based access control (Admin, Teacher, Student) and integrations for smart campus monitoring.",
    technologies: ["React", "Vite", "Django", "Python", "SQLite", "Axios", "HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/mrmohandas143/College-Management",
    image: "/college_management_dashboard.png",
  },
  {
    id: 3,
    title: "Campus Monitoring System",
    category: "AI/Robotics",
    description: "Built an AI-powered face recognition application to classify students/staff, provide real-time email/SMS alerts for unauthorized access, and enhance campus security using OpenCV and Python.",
    longDescription: "Developed an AI-powered face recognition application designed to enhance campus security. Leveraging OpenCV and advanced face recognition libraries, the system performs real-time detection and classification of students and staff members. It actively monitors entrance points and is equipped with an automated security response module to trigger instant email and SMS alerts for unauthorized access attempts, keeping security personnel informed in real time.",
    technologies: ["Python", "OpenCV (cv2)", "Face Recognition", "Computer Vision", "Email Alerts"],
    githubUrl: "https://github.com/Darkvoide/Monitoring_App",
    image: "/campus_monitoring_system.png",
  },
  {
    id: 4,
    title: "JARVIS - AI Voice Assistant",
    category: "AI/Robotics",
    description: "Developed an AI-powered voice assistant with speech recognition, Google Gemini AI integration, neural text-to-speech, web automation, Wikipedia search, and Raspberry Pi GPIO-based hardware control.",
    longDescription: "Developed a sophisticated AI voice assistant inspired by JARVIS, powered by Python and the Google Gemini API. It leverages asynchronous programming (AsyncIO) to execute speech recognition, web automation, Wikipedia searches, and neural text-to-speech (Edge-TTS) for fluid voice interactions. Additionally, it integrates with Raspberry Pi GPIO pins to control local hardware devices, bridging virtual intelligence with physical systems.",
    technologies: ["Python", "Google Gemini API", "SpeechRecognition", "Edge-TTS", "AsyncIO"],
    githubUrl: "https://github.com/mrmohandas143/Jarvis",
    image: "/jarvis_voice_assistant.png",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<"All" | "AI/Robotics" | "Full Stack">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredProjects = projectsData.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="bg-blob w-[300px] h-[300px] bg-gold/5 top-0 right-0 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Featured <span className="text-gold">Projects</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center space-x-3 mb-12">
          {(["All", "AI/Robotics", "Full Stack"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs md:text-sm uppercase tracking-wider font-display font-bold rounded-full transition-all border cursor-pointer ${
                filter === cat
                  ? "bg-gold text-darkbg border-gold shadow-lg shadow-gold/20"
                  : "bg-transparent text-gray-400 border-gold/10 hover:border-gold/30 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="glass-panel rounded-2xl overflow-hidden border border-gold/10 hover:border-gold/30 flex flex-col group h-full"
              >
                {/* Project Image Panel */}
                <div className="relative h-48 md:h-60 w-full overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbg/90 to-transparent opacity-80" />
                  
                  {/* Category Tag Overlay */}
                  <span className="absolute top-4 left-4 bg-gold/10 backdrop-blur-md text-gold border border-gold/20 text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <FiLayers className="w-3.5 h-3.5" />
                    {project.category}
                  </span>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-full bg-gold/10 backdrop-blur-md border border-gold/20 text-gold hover:bg-gold hover:text-darkbg transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 cursor-pointer"
                    aria-label="Maximize details"
                  >
                    <FiMaximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Panel */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="font-display font-bold text-xl text-white dark:text-white light:text-gray-900 mb-3 group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="font-sans text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gold/5 dark:bg-gold/5 light:bg-gray-100 text-gold font-mono text-xs px-2.5 py-1 rounded border border-gold/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="bg-gold/5 text-gold font-mono text-xs px-2.5 py-1 rounded border border-gold/10">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-3 border-t border-gold/10">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 text-xs font-display font-bold uppercase tracking-wider text-gray-400 hover:text-gold transition-colors cursor-pointer"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 text-xs font-display font-bold uppercase tracking-wider text-gray-400 hover:text-gold transition-colors cursor-pointer"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="ml-auto text-xs font-display font-bold uppercase tracking-wider text-gold hover:text-white transition-colors cursor-pointer"
                    >
                      Read More &rarr;
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Overlay for Detailed Project Review */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-2xl bg-darkbg border border-gold/20 rounded-2xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-gold hover:text-darkbg border border-gold/10 text-white transition-all cursor-pointer z-10"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5" />
                </button>

                {/* Banner Image */}
                <div className="h-48 md:h-64 w-full relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkbg via-darkbg/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 pr-12">
                    <span className="bg-gold/10 text-gold border border-gold/20 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full mb-2 inline-block">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Modal Info */}
                <div className="p-6 md:p-8 text-left max-h-[50vh] overflow-y-auto">
                  <h4 className="font-display font-semibold text-sm text-gold uppercase tracking-wider mb-2">
                    Project Overview
                  </h4>
                  <p className="font-sans text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-6">
                    {selectedProject.longDescription}
                  </p>

                  <h4 className="font-display font-semibold text-sm text-gold uppercase tracking-wider mb-3">
                    Technologies Utilized
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gold/5 text-gold border border-gold/10 font-mono text-xs px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gold/10">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-transparent text-white border border-gold/20 hover:border-gold hover:text-gold px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>Repository</span>
                    </a>

                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gradient-to-r from-gold to-cyan-500 hover:from-cyan-500 hover:to-gold text-darkbg px-5 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-gold/10 hover:shadow-gold/25"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
