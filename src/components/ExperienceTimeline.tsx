'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
// Removed unused import
// import { comma } from 'postcss/lib/list';


const experiences = [
  // ... your experiences array - Keep this array as is
  {
    id: 1,
    title: 'Google Student Ambassador',
    company: 'Google Indonesia',
    year: '2025',
    description: 'Spearheaded the outreach and integration of Google ecosystem tools, specifically Gemini AI, within the university environment. I led strategic promotion and hands-on training sessions to empower students and faculty, demonstrating how to leverage advanced AI features to maximize academic productivity and streamline extracurricular workflows.',
    logo: '/exp_logos/google.svg',
  },
  {
    id: 2,
    title: 'Guest Speaker',
    company: 'Freelance',
    year: '2025-On Going',
    description: 'Expertly delivered high-impact workshops on Artificial Intelligence, facilitating the practical adoption of AI across diverse user groups. Beyond technical implementation, I lead strategic sharing sessions focused on navigating the IT industry, mastering public speaking, and building a strong personal brand to empower the next generation of tech professionals.',
    logo: '/exp_logos/sbc.svg',
  },
  {
    id: 3,
    title: 'AI & Software Engineer Intern',
    company: 'PT. Marstech Global',
    year: '2025',
    description: `Engineered a robust ID (KTP) recognition system utilizing YOLOv8m for high-precision detection and OCR for automated data extraction. I architected the deployment infrastructure using Python-based backends (Flask and FastAPI) to manage model loading and designed seamless data integration between the backend and the web frontend, optimizing the entire pipeline for real-time processing.`,
    logo: '/exp_logos/Logo Marstech.png',
  },
  {
    id: 4,
    title: 'Machine Learning Cohort',
    company: 'Bangkit Academy',
    year: '2024',
    description: 'Served as a Weekly Cohort Leader for ML-55, overseeing the end-to-end development of Machine Learning and AI-driven solutions. I effectively led and mentored project managers through complex capstone projects, ensuring rigorous technical standards were met while consistently delivering high-quality results within project timelines.',
    logo: '/exp_logos/bangkit.png',
  },
  {
    id: 5,
    title: 'Assistant Lecturer',
    company: 'University of PGRI Madiun',
    year: '2023-2025',
    description: `Possess a solid academic foundation in core computer science principles, including advanced Algorithms and Programming (I & II) and Database Management. Expert in Object-Oriented Programming (OOP) methodologies, providing a rigorous technical base for building structured, efficient, and scalable software solutions.`,
    logo: '/exp_logos/UNIPMA.PNg',
  },
  
];

const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Adjust offset as needed
  });

  // Smooth the scroll progress value for the line and dot
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    // Increased restDelta slightly. This means the spring animation
    // will consider itself 'at rest' sooner, potentially reducing
    // updates when the dot reaches the end of the scroll.
    restDelta: 0.01
  });

  // Create a motion value for the dot's top position, based on the *sprung* scaleY value
  // We map the scaleY value (which goes from 0 to 1) to the full height of the container (0% to 100%)
  const dotTop = useTransform(scaleY, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-10">
      {/* Central Timeline Line */}
      {/* Framer Motion automatically promotes transform properties for hardware acceleration */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-600 to-cyan-800 transform -translate-x-1/2"
        style={{ scaleY: scaleY, transformOrigin: 'top' }}
      />

      {/* Glowing Dot */}
      {/* Framer Motion handles the 'top' style updates efficiently */}
      <motion.div
        className="absolute left-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_5px_rgba(0,255,255,0.5)] transform -translate-x-1/2"
        // Use the dotTop motion value (derived from the sprung scaleY) for the top style
        style={{ top: dotTop }}
        // Optional: Add will-change property as a hint to the browser (use with caution)
        // className="absolute left-1/2 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_15px_5px_rgba(0,255,255,0.5)] transform -translate-x-1/2 will-change-top"
      />


      <div className="relative space-y-24">
        {experiences.map((exp, index) => (
          // Changed grid to 2 columns, removed the 'auto' middle column
          <div key={exp.id} className="relative grid grid-cols-1 md:grid-cols-2 items-start gap-x-20 bg-black rounded-2xl p-6 shadow-lg md:bg-transparent">
            {/* Side 1: Title, Company, Year, Logo - Conditional Alignment */}
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
              <h3 className="md:text-2xl text-xl font-bold text-gray-100">{exp.title}</h3>

              <p className="text-lg text-cyan-400 mb-1">{exp.company}</p>
              {/* Year */}
              <span
                className="md:text-xl text-md font-regular text-gray-400 mb-2"
                style={{ letterSpacing: '0.4em' }}
              >
                {exp.year}
              </span>

              {/* Logo */}
              <div className="w-10 h-10 relative flex items-center justify-center md:my-0 my-5"> {/* Added flex centering for logos */}
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  fill
                  style={{ objectFit: 'contain' }} // Use contain to show the whole logo
                  unoptimized // Keep if necessary for SVGs, but test without if possible
                />
              </div>
            </div>

            {/* Side 2: Description - Conditional Alignment */}
            <div className={`text-gray-300 md:text-lg text:md ${index % 2 !== 0 ? 'md:text-right' : 'text-left'} ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;