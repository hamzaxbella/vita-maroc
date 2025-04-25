'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Using external images instead of local files
const testimonials = [
  {
    id: 1,
    name: 'Fatima B.',
    location: 'Casablanca',
    role: 'Patient',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: "J'ai réservé un médecin pour ma mère en 2 minutes, et il est venu chez nous le jour même. Franchement, c'est la santé version 2025."
  },
  {
    id: 2,
    name: 'Dr. Yassine A.',
    location: 'Rabat',
    role: 'Doctor',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: "La plateforme est bien faite. Je gère mes rendez-vous facilement, et les patients sont sérieux. Je recommande à mes collègues."
  },
  {
    id: 3,
    name: 'Sofia L.',
    location: 'Marrakech',
    role: 'Patient',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: "J'étais malade en pleine nuit, j'ai utilisé l'appel d'urgence, et un médecin m'a rappelée dans les 10 minutes. Merci pour ce service !"
  },
  {
    id: 4,
    name: 'Dr. Amine T.',
    location: 'Agadir',
    role: 'Doctor',
    image: 'https://randomuser.me/api/portraits/men/86.jpg',
    quote: "Le système de visites à domicile m'a permis d'élargir ma patientèle sans stress. Tout est fluide et sécurisé."
  },
  {
    id: 5,
    name: 'Hicham E.',
    location: 'Fès',
    role: 'Patient',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
    quote: "Je n'ai plus besoin d'attendre aux urgences. Je consulte depuis chez moi, tranquille. C'est simple, rapide, et rassurant."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  
  // Auto sliding functionality
  useEffect(() => {
    if (!isAutoSliding) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoSliding]);

  const handlePrev = () => {
    setIsAutoSliding(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoSliding(false);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  // Get current testimonial
  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-white"
    >
      <div className="auto-spacing">
        {/* Clean minimalist header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-primary text-sm uppercase tracking-wider font-medium mb-2 block">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ce que nos utilisateurs disent</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* Modern, clean testimonial card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border-l-4 border-primary">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Minimalist profile display */}
                  <div className="md:mr-2">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-gray-100">
                        <Image 
                          src={currentTestimonial.image} 
                          alt={currentTestimonial.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        {currentTestimonial.role === 'Doctor' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M10 6a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0v-6.5A.75.75 0 0110 6z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" className="w-3 h-3">
                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Clean content layout */}
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-medium">{currentTestimonial.name}</h3>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-gray-500 text-sm">{currentTestimonial.location}</span>
                    </div>
                    
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i}
                          className="w-4 h-4 text-primary" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-4">
                      &quot;{currentTestimonial.quote}&quot;
                    </p>
                    
                    <div className="text-xs text-primary font-medium uppercase tracking-wide">
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Minimal navigation */}
          <div className="mt-10 flex justify-between items-center">
            {/* Simple dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoSliding(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex 
                      ? "bg-primary" 
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Clean navigation arrows */}
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={handleNext}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;