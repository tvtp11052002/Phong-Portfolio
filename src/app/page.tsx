'use client';

import Image from "next/image";
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import { motion } from "framer-motion";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// Animation variants
// const container = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const item = {
//   hidden: { opacity: 0, y: 20 },
//   show: { 
//     opacity: 1, 
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 24
//     }
//   }
// };

// const continuousAnimation = {
//   animate: {
//     y: [0, -5, 0],
//     scale: [1, 1.05, 1],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   }
// };

// const typingAnimation = {
//   initial: { width: 0 },
//   animate: { 
//     width: "100%",
//     transition: {
//       duration: 1,
//       ease: "easeInOut"
//     }
//   }
// };

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      
      {/* Background Images with Blur Effect - Now covering all sections */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-15">
          <Image
            src="/images/avatar.jpg"
            alt="Background"
            fill
            className="object-cover blur-[0px]"
            priority
          />
        </div>
        <div className="absolute left-0 w-1/2 h-full opacity-25">
          <Image
            src="/images/avatar_no_background_4.png"
            alt="Background"
            fill
            className="object-cover blur-[0px]"
            priority
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white/30 to-white/50 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-800/50"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative z-10">
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold mb-6"
          >
            <span>Hi, I&apos;m </span>
            {Array.from("Tuan Phong").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block text-blue-600"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24
                    }
                  },
                  animate: {
                    y: [0, -5, 0],
                    scale: [1, 1.05, 1],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut"
                    }
                  }
                }}
                initial="hidden"
                animate={["show", "animate"]}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
          >
            Backend/AI Developer crafting intelligent solutions
          </motion.p>
          <motion.div 
            className="flex justify-center gap-8 mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.7 }}
          >
            <a
              href="https://github.com/tvtp11052002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/tvtp11052002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/tvtp11052002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
          </motion.div>
          <motion.a
            href="/documents/BackendAI_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.9 }}
          >
            View My CV
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </motion.a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I&apos;m a Backend-AI engineer with strong experience in Python, AWS, and scientific modeling. I’ve contributed to environmental simulation systems like DayCent, built data pipelines and APIs for GHG analysis, and applied OCR and federated learning to solve real-world problems. My focus is on scalable, efficient backend systems that bridge AI and environmental intelligence.
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Backend Development</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "Node.js", "REST APIs", "SQL/NoSQL"].map((skill, index) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                          variants={fadeInUp}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">AI & Machine Learning</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Machine Learning", "Deep Learning", "Data Science", "AI Models"].map((skill, index) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                          variants={fadeInUp}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Additional Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Problem Solving", "Team Collaboration", "Agile Development", "Technical Writing"].map((skill, index) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative h-96 w-96 mx-auto"
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 dark:from-cyan-600 dark:via-blue-600 dark:to-indigo-600 p-[4px] shadow-[0_0_12px_rgba(6,182,212,0.3),0_0_24px_rgba(6,182,212,0.2)] dark:shadow-[0_0_12px_rgba(6,182,212,0.4),0_0_24px_rgba(6,182,212,0.3)]"
                animate={{
                  background: [
                    'linear-gradient(to right, rgb(34, 211, 238), rgb(59, 130, 246), rgb(99, 102, 241))',
                    'linear-gradient(to right, rgb(99, 102, 241), rgb(34, 211, 238), rgb(59, 130, 246))',
                    'linear-gradient(to right, rgb(59, 130, 246), rgb(99, 102, 241), rgb(34, 211, 238))',
                    'linear-gradient(to right, rgb(34, 211, 238), rgb(59, 130, 246), rgb(99, 102, 241))',
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src="/images/avatar_circle.jpg"
                    alt="Tuan Phong"
                    fill
                    className="object-cover rounded-full transition-all duration-300 hover:scale-105"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Projects />

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <motion.div 
              className="space-y-8"
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Feel free to reach out to me for any opportunities or collaborations. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: <MdEmail className="text-xl" />, text: "tvtp11052002@gmail.com" },
                  { icon: <MdPhone className="text-xl" />, text: "+84 335 294 028" },
                  { icon: <FaGithub className="text-xl" />, text: "github.com/tvtp11052002", url: "https://github.com/tvtp11052002" },
                  { icon: <FaLinkedin className="text-xl" />, text: "linkedin.com/in/tvtp11052002", url: "https://linkedin.com/in/tvtp11052002" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="text-blue-500 dark:text-blue-400 w-6">
                      {item.icon}
                    </div>
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300">{item.text}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 p-8 rounded-lg shadow-lg backdrop-blur-sm"
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600"
                      placeholder="+84 123 456 789"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600"
                    >
                      <option value="">Select a subject</option>
                      <option value="job">Job Opportunity</option>
                      <option value="project">Project Collaboration</option>
                      <option value="freelance">Freelance Work</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700/50 dark:border-gray-600"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
