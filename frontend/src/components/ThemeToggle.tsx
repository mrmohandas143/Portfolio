import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      }
    } else {
      // Default is dark mode
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2.5 rounded-full glass-panel flex items-center justify-center text-gold border border-gold/10 hover:border-gold/30 transition-all cursor-pointer relative z-50"
      aria-label="Toggle Theme"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 transition-transform hover:rotate-45" />
      ) : (
        <FiMoon className="w-5 h-5 transition-transform hover:-rotate-12" />
      )}
    </motion.button>
  );
}
