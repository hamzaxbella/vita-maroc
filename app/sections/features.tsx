"use client";

import { useEffect, useState } from "react";
import { calendar, location, phone } from "@/public";
import Image from "next/image";
import { motion } from "framer-motion";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('features-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features-section" className="relative py-12 md:py-16 bg-gradient-to-b from-[#e8f7fd] to-[#f2fbff] overflow-hidden">
      {/* Background dot pattern - using the grid.svg from public */}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-medium mb-8 md:mb-12 text-center md:text-left"
        >
          Raisons <br className="hidden md:block" />
          de choisir notre <span className="text-white bg-primary px-2 py-1 rounded-lg">Services.</span>
        </motion.h1>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="flex-1 flex flex-col gap-5 md:gap-6 z-10"
          >
            {/* First Feature Card - Rendez-vous en ligne */}
            <motion.div 
              variants={itemVariants}
              className="w-full md:max-w-[400px] bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                  <Image src={calendar} alt="calendar icon" width={20} height={20} />
                </div>
                <h3 className="text-lg font-medium">Rendez-vous en ligne</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3 pl-9">
                Choisissez un médecin et un créneau en fonction de vos besoins.
              </p>
            </motion.div>
            
            {/* Second Feature Card - Visite à domicile */}
            <motion.div 
              variants={itemVariants}
              className="w-full md:max-w-[400px] bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow md:ml-auto md:mr-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                  <Image src={location} alt="location icon" width={20} height={20} />
                </div>
                <h3 className="text-lg font-medium">Visite à domicile</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3 pl-9">
                Un professionnel de santé se déplace chez vous rapidement.
              </p>
            </motion.div>
            
            {/* Third Feature Card - Appels d'urgence */}
            <motion.div 
              variants={itemVariants}
              className="w-full md:max-w-[400px] bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                  <Image src={phone} alt="phone icon" width={20} height={20} />
                </div>
                <h3 className="text-lg font-medium">Appels d&apos;urgence 24h/24</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3 pl-9">
                Accès immédiat à un médecin en cas de besoin critique.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Doctor Image Section */}
          <div className="flex-1 relative hidden lg:block">
            {/* Doctor image */}
            <div className="relative z-10 h-full flex items-end justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Image 
                  className="absolute left-0 bottom-0 z-0" 
                  src={"/aboutBackground.svg"} 
                  alt="background shape" 
                  width={500} 
                  height={450} 
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <Image 
                  src="/doctor.png" 
                  alt="Doctor" 
                  width={600} 
                  height={800} 
                  className="object-contain hidden lg:block z-10 absolute -left-5 -bottom-[30px]"
                />
              </motion.div>
            </div>
          </div>

          {/* Mobile doctor image - only shown on smaller screens */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center mt-6 lg:hidden"
          >
            <Image 
              src="/doctor.png" 
              alt="Doctor" 
              width={300} 
              height={400} 
              className="object-contain max-h-[300px] md:max-h-[400px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
