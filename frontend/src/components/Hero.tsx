import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight, FiMessageSquare, FiPhone } from "react-icons/fi";
import { SiPython, SiReact, SiDjango, SiOpencv, SiMysql, SiGithub } from "react-icons/si";
import { FaBrain } from "react-icons/fa";

const roles = [
  "AI & Data Science Engineer",
  "Computer Vision Developer",
  "Full Stack Developer",
  "Machine Learning Enthusiast",
  "AI Research Learner",
];

export default function Hero() {
  // Typing animation states
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: number;
    const fullText = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  // Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-300, 300], [-15, 15]), springConfig);

  const parallaxSlowX = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);
  const parallaxSlowY = useSpring(useTransform(mouseY, [-300, 300], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Particles Background
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 40;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isLight = document.body.classList.contains("light");
      const color = isLight ? "255, 193, 7" : "255, 193, 7"; // Keep gold color

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDownloadResume = () => {
    // Dynamically print the current page, which serves as a CV, or point to resume file
    const link = document.createElement("a");
    link.href = "/Mohandas_S_Resume.pdf";
    link.download = "Mohandas_S_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background Particles Canvas */}
      <canvas ref={canvasRef} className="particles-canvas" />

      {/* Background Glow Blobs */}
      <div className="bg-blob w-[400px] h-[400px] bg-gold top-1/4 left-1/10" />
      <div className="bg-blob w-[300px] h-[300px] bg-amber-600 bottom-1/4 right-1/10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12">
        
        {/* Left Side Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-display font-medium text-gold tracking-widest uppercase text-xs md:text-sm mb-3">
            Hello, I'm
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white dark:text-white light:text-gray-900 leading-none mb-4">
            Mohandas S
          </h1>

          <div className="h-8 md:h-10 mb-6 flex items-center">
            <span className="font-display font-bold text-lg md:text-2xl text-gold typing-caret tracking-wide pr-1">
              {currentText}
            </span>
          </div>

          <p className="font-sans text-sm md:text-base text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed mb-8 max-w-xl">
            "Final-year B.Tech student in Artificial Intelligence & Data Science passionate about Computer Vision, Machine Learning, Full Stack Development, and AI-powered applications. I enjoy solving real-world problems through intelligent software systems and continuously learning new technologies."
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleDownloadResume}
              className="flex items-center space-x-2 bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-darkbg font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <FiDownload className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
            
            <button
              onClick={() => scrollToSection("projects")}
              className="flex items-center space-x-2 bg-transparent text-white dark:text-white light:text-gray-900 border border-gold/40 hover:border-gold hover:text-gold font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:shadow-lg hover:shadow-gold/5 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <FiArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="flex items-center space-x-2 bg-transparent text-gold border border-gold/20 hover:border-gold/40 font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:shadow-lg hover:shadow-gold/5 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <FiMessageSquare className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/mrmohandas143"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-panel border border-gold/10 hover:border-gold/30 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-all"
              aria-label="GitHub"
            >
              <FiGithub className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohandas-s-26439a371"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-panel border border-gold/10 hover:border-gold/30 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-all"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="mailto:mrmohandas143@gmail.com"
              className="p-3 rounded-full glass-panel border border-gold/10 hover:border-gold/30 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-all"
              aria-label="Email"
            >
              <FiMail className="w-4.5 h-4.5" />
            </a>
            <a
              href="tel:+919965986716"
              className="p-3 rounded-full glass-panel border border-gold/10 hover:border-gold/30 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-all"
              aria-label="Phone"
              title="+91 99659 86716"
            >
              <FiPhone className="w-4.5 h-4.5" />
            </a>
          </div>
        </motion.div>

        {/* Right Side Parallax & Photo */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] sm:h-[450px]">
          
          {/* Glassmorphic Background Circle */}
          <motion.div
            style={{ x: parallaxSlowX, y: parallaxSlowY }}
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-gold/5 to-transparent border border-gold/10 backdrop-blur-[2px] z-0"
          />

          {/* Animated Glow Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-r from-gold via-amber-500 to-yellow-300 shadow-[0_0_30px_rgba(255,193,7,0.3)] animate-[spin_8s_linear_infinite] z-10"
          />

          {/* Profile Photo Wrapper */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="absolute w-52 h-52 sm:w-68 sm:h-68 rounded-full overflow-hidden border-4 border-darkbg dark:border-darkbg light:border-white shadow-xl z-20"
          >
            <img
              src="/profile.jpg"
              alt="Mohandas S Profile Picture"
              className="w-full h-full object-cover select-none scale-105 hover:scale-110 transition-transform duration-500"
            />
          </motion.div>

          {/* Floating Technology Icons */}
          
          {/* Python */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-4 sm:left-10 z-30 p-2.5 rounded-full glass-panel border border-gold/20 flex items-center justify-center text-gold cursor-default"
            title="Python"
          >
            <SiPython className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>

          {/* React */}
          <motion.div
            style={{ x: parallaxSlowX, y: parallaxSlowY }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-6 sm:right-12 z-30 p-2.5 rounded-full glass-panel border border-gold/20 flex items-center justify-center text-cyan-400 cursor-default"
            title="React"
          >
            <SiReact className="w-5 h-5 sm:w-6 sm:h-6 animate-[spin_10s_linear_infinite]" />
          </motion.div>

          {/* Django */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 left-2 sm:left-6 z-30 p-2.5 rounded-full glass-panel border border-gold/20 flex items-center justify-center text-green-500 cursor-default"
            title="Django"
          >
            <SiDjango className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>

          {/* OpenCV */}
          <motion.div
            style={{ x: parallaxSlowX, y: parallaxSlowY }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 right-2 sm:right-8 z-30 p-2.5 rounded-full glass-panel border border-gold/20 flex items-center justify-center text-red-500 cursor-default"
            title="OpenCV"
          >
            <SiOpencv className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>

          {/* AI / Brain */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-[-20px] sm:left-[-10px] transform -translate-y-1/2 z-30 p-2.5 rounded-full glass-panel border border-gold/20 flex items-center justify-center text-gold cursor-default"
            title="Artificial Intelligence"
          >
            <FaBrain className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
          </motion.div>

          {/* GitHub */}
          <motion.div
            style={{ x: parallaxSlowX, y: parallaxSlowY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[-20px] sm:right-[-10px] transform -translate-y-1/2 z-30 p-2.5 rounded-full glass-panel border border-gold/20 flex items-center justify-center text-white dark:text-white light:text-gray-800 cursor-default"
            title="GitHub"
          >
            <SiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>

          {/* MySQL */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 z-30 p-2.5 rounded-full glass-panel border border-gold/20 flex items-center justify-center text-blue-500 cursor-default"
            title="MySQL"
          >
            <SiMysql className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
