import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#0066FF", "#00d2ff", "#FFF"],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // EmailJS keys from environment variables or custom keys
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

    if (serviceId && templateId && publicKey) {
      emailjs
        .send(
          serviceId,
          templateId,
          {
            name: formData.name,
            email: formData.email,
            from_name: formData.name,
            from_email: formData.email,
            reply_to: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: "Mohandas S",
          },
          publicKey
        )
        .then(
          () => {
            setStatus("success");
            triggerConfetti();
            setFormData({ name: "", email: "", subject: "", message: "" });
          },
          (error) => {
            console.error("EmailJS Error:", error);
            setStatus("error");
            setErrorMessage("Failed to send message via EmailJS. Please try again.");
          }
        );
    } else {
      // Mock sending fallback with canvas-confetti
      setTimeout(() => {
        setStatus("success");
        triggerConfetti();
        console.log("Mock contact form submission (No EmailJS Config):", formData);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1500);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="bg-blob w-[350px] h-[350px] bg-gold/5 top-1/3 left-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white dark:text-white light:text-gray-900 tracking-wide">
            Get In <span className="text-gold">Touch</span>
          </h2>
          <div className="h-1 bg-gold mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Info & Map */}
          <motion.div
            className="lg:col-span-5 text-left flex flex-col gap-8 h-full"
            initial={{ opacity: 0, x: -30 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="font-display font-semibold text-xl text-white dark:text-white light:text-gray-800 mb-6">
                Contact Information
              </h3>
              
              {/* Info Coordinates */}
              <div className="flex flex-col space-y-5">
                {/* Phone */}
                <div className="flex items-center space-x-4">
                  <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/10 flex-shrink-0">
                    <FiPhone className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 font-mono">PHONE</p>
                    <a href="tel:+919965986716" className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-gold transition-colors">
                      +91 99659 86716
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-4">
                  <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/10 flex-shrink-0">
                    <FiMail className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 font-mono">EMAIL</p>
                    <a href="mailto:mrmohandas143@gmail.com" className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-gold transition-colors">
                      mrmohandas143@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-4">
                  <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/10 flex-shrink-0">
                    <FiMapPin className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500 font-mono">LOCATION</p>
                    <span className="text-sm font-semibold text-gray-300 dark:text-gray-300 light:text-gray-700">
                      Trichy, Tamil Nadu, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center space-x-4 mt-8">
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
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-xl overflow-hidden border border-gold/10 shadow-lg shadow-black/40 h-[220px] w-full">
              <iframe
                title="Google Map Trichy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125406.10447385315!2d78.61864197368097!3d10.812239485292415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff2aec017%3A0xbcc3e3e3b7b62a42!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-panel p-8 rounded-2xl border border-gold/10 hover:border-gold/20 text-left">
              <h3 className="font-display font-semibold text-xl text-white dark:text-white light:text-gray-800 mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="name" className="font-mono text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="px-4 py-3 rounded-lg bg-black/45 dark:bg-black/45 light:bg-gray-100 border border-gold/10 hover:border-gold/20 focus:border-gold focus:outline-none text-sm text-white dark:text-white light:text-gray-900 transition-all font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="email" className="font-mono text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="px-4 py-3 rounded-lg bg-black/45 dark:bg-black/45 light:bg-gray-100 border border-gold/10 hover:border-gold/20 focus:border-gold focus:outline-none text-sm text-white dark:text-white light:text-gray-900 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="subject" className="font-mono text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Message subject"
                    className="px-4 py-3 rounded-lg bg-black/45 dark:bg-black/45 light:bg-gray-100 border border-gold/10 hover:border-gold/20 focus:border-gold focus:outline-none text-sm text-white dark:text-white light:text-gray-900 transition-all font-sans"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="message" className="font-mono text-xs text-gray-400 dark:text-gray-400 light:text-gray-600">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your message details here..."
                    className="px-4 py-3 rounded-lg bg-black/45 dark:bg-black/45 light:bg-gray-100 border border-gold/10 hover:border-gold/20 focus:border-gold focus:outline-none text-sm text-white dark:text-white light:text-gray-900 transition-all font-sans resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gold to-cyan-500 hover:from-cyan-500 hover:to-gold disabled:from-gold/50 disabled:to-cyan-500/50 text-darkbg font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-gold/10 hover:shadow-gold/25 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed self-end mt-4 min-w-[140px]"
                >
                  {status === "loading" ? (
                    <div className="w-4 h-4 border-2 border-darkbg border-t-transparent rounded-full animate-spin" />
                  ) : status === "success" ? (
                    <span>Sent!</span>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {/* Status Banners */}
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-semibold text-green-500 mt-2"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-semibold text-red-500 mt-2"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
