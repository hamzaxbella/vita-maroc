'use client'
import Image from "next/image";
import Button from "../components/button";
import { grid, illustration } from "@/public";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh]  mt-[80px] flex items-center">
      {/* Grid background with full visibility */}
      <Image 
        className="absolute top-0 left-0 z-[-1] w-full h-full object-cover" 
        src={grid} 
        fill 
        alt="background" 
        priority 
      />
      
      {/* Content container with auto-spacing */}
      <div className="auto-spacing w-full flex flex-col lg:flex-row justify-between items-center py-10 px-4 md:px-8 lg:px-0 relative">
        <motion.div 
          className="flex-1 flex flex-col gap-5 mb-10 lg:mb-0 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-[3.5rem] lg:leading-[4.5rem] font-regular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Consultez un <br className="hidden md:block" /> 
            <motion.span 
              className="text-white bg-primary rounded-2xl px-4 inline-block"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
            >médecin</motion.span> en ligne ou <br className="hidden md:block" /> 
            <span>à domicile</span>
          </motion.h1>
          <motion.p 
            className="text-black/70 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Prenez rendez-vous en quelques clics, ou demandez une visite à
            domicile. En cas d&apos;urgence, nous sommes là 24h/24.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8 justify-center lg:justify-start items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button text="Créer un compte" variant="primary" />
            <Button text="Appel d'urgence" variant="danger" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex-1 flex justify-center lg:justify-end items-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Image 
            src={illustration} 
            alt="illustration de l'application" 
            width={950} 
            height={950} 
            className="h-auto lg:-translate-x-[100px] w-[280px] sm:w-[350px] md:w-[400px] lg:max-w-[400px]" 
            priority
          />
        </motion.div>
      </div>
      
      {/* Gradient blend effect div that creates smooth transition between sections */}
      <div className="absolute -bottom-20 left-0 w-full h-[200px] bg-gradient-to-b from-transparent via-softPrimary to-transparent pointer-events-none z-0"></div>
    </section>
  );
};

export default Hero;
