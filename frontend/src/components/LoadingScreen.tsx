import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [text, setText] = useState("");
  const fullText = "M O H A N D A S  S";
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typingDone) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [typingDone, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#0B0B0B]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated outer glowing circle */}
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-t-gold border-r-transparent border-b-amber-500 border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner static logo */}
        <div className="absolute top-[34px] text-gold font-display font-bold text-2xl tracking-wider">
          M
        </div>

        {/* Text loading animation */}
        <motion.div
          className="mt-8 text-sm md:text-md font-display font-semibold text-gold tracking-[0.3em] h-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {text}
          {!typingDone && <span className="animate-pulse">|</span>}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-2 text-xs text-gray-500 tracking-[0.2em] uppercase font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: typingDone ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          AI & Data Science Engineer
        </motion.p>
      </div>
    </motion.div>
  );
}
