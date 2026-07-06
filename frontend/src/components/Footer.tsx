import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Internship", id: "internship" },
  { label: "Certifications", id: "certifications" },
  { label: "Achievements", id: "achievements" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  return (
    <footer className="relative bg-darkbg dark:bg-darkbg light:bg-gray-100 border-t border-gold/10 pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-gold/10">
          
          {/* Left Column: Brand */}
          <div className="md:col-span-4 text-center md:text-left">
            <button
              onClick={() => scrollToSection("home")}
              className="font-display font-bold text-xl text-gold tracking-wider uppercase cursor-pointer"
            >
              MOHANDAS S
            </button>
            <p className="font-sans text-xs text-gray-500 mt-2 max-w-xs mx-auto md:mx-0">
              Final-Year B.Tech Student in Artificial Intelligence & Data Science. Building intelligent software solutions.
            </p>
          </div>

          {/* Center Column: Quick Links */}
          <div className="md:col-span-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-display font-medium">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-colors uppercase tracking-wider cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Column: Social Channels */}
          <div className="md:col-span-3 flex justify-center md:justify-end space-x-4">
            <a
              href="https://github.com/mrmohandas143"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-panel border border-gold/10 hover:border-gold/30 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-all"
              aria-label="GitHub"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohandas-s-26439a371"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full glass-panel border border-gold/10 hover:border-gold/30 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-all"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-4.5 h-4.5" />
            </a>
            <a
              href="mailto:mrmohandas143@gmail.com"
              className="p-2.5 rounded-full glass-panel border border-gold/10 hover:border-gold/30 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-gold transition-all"
              aria-label="Email"
            >
              <FiMail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-gray-500 font-sans gap-4">
          <p>
            &copy; {new Date().getFullYear()} Mohandas S. All rights reserved.
          </p>
          <p>
            Designed & Developed by <span className="text-gold font-semibold">Mohandas S</span>
          </p>
          
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 bg-gold/10 hover:bg-gold hover:text-darkbg border border-gold/20 text-gold text-[10px] font-display font-bold uppercase tracking-wider px-3.5 py-2 rounded-full transition-all cursor-pointer"
          >
            <span>Back To Top</span>
            <FiArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
