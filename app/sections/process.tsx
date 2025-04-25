"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Process = () => {
    const [activeTab, setActiveTab] = useState("patient");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.getElementById('process-section');
        if (section) observer.observe(section);

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const patientSteps = [
        {
            id: 1,
            title: "Créez votre compte",
            description: "Inscrivez-vous en quelques secondes avec votre nom, téléphone et adresse."
        },
        {
            id: 2,
            title: "Trouvez un médecin",
            description: "Par spécialité, localisation ou disponibilité — tout est filtrable."
        },
        {
            id: 3,
            title: "Réservez ou demandez une visite",
            description: "Choisissez un créneau pour une consultation vidéo ou une visite à domicile."
        },
        {
            id: 4,
            title: "Soyez pris en charge",
            description: "Recevez un rappel, connectez-vous, ou attendez le médecin chez vous."
        }
    ];

    const doctorSteps = [
        {
            id: 1,
            title: "Inscrivez-vous comme médecin",
            description: "Complétez vos informations professionnelles et envoyez vos justificatifs."
        },
        {
            id: 2,
            title: "Définissez vos disponibilités",
            description: "Choisissez vos horaires, lieux d&aposintervention et modes de consultation."
        },
        {
            id: 3,
            title: "Gérez vos rendez-vous",
            description: "Consultez vos demandes, acceptez ou proposez un autre horaire."
        },
        {
            id: 4,
            title: "Soignez, facturez, notez",
            description: "Consultez vos patients, suivez vos consultations, et recevez vos paiements."
        }
    ];

    const currentSteps = activeTab === "patient" ? patientSteps : doctorSteps;

    return (
        <section id="process-section" className="py-20 px-4 max-w-6xl mx-auto">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-semibold text-center mb-2"
            >
                Comment ça marche ?
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={isVisible ? { opacity: 1, width: "4rem" } : { opacity: 0, width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-10"
            />

            {/* Tab system */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex justify-center mb-16"
            >
                <div className="bg-gray-100 p-2 rounded-full inline-flex shadow-sm">
                    <motion.button 
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab("patient")}
                        className={`px-8 py-3 rounded-full text-base font-medium transition-all ${activeTab === "patient" ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md" : "text-gray-700"}`}
                    >
                        Patient
                    </motion.button>
                    <motion.button 
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab("medecin")}
                        className={`px-8 py-3 rounded-full text-base font-medium transition-all ${activeTab === "medecin" ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md" : "text-gray-700"}`}
                    >
                        Médecin
                    </motion.button>
                </div>
            </motion.div>

            {/* Process timeline */}
            <div className="relative">
                {/* Vertical timeline line - changed to dashed */}
                <motion.div 
                    initial={{ height: 0 }}
                    animate={isVisible ? { height: "100%" } : { height: 0 }}
                    transition={{ duration: 1.2, delay: 0.7 }}
                    className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-100 border-dashed border-l-2 border-primary/30"
                    style={{ height: "calc(100% - 24px)" }}
                />

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-24"
                    >
                        {currentSteps.map((step, index) => (
                            <motion.div 
                                key={step.id} 
                                initial={{ opacity: 0, y: 50 }}
                                animate={isVisible ? { 
                                    opacity: 1, 
                                    y: 0,
                                    transition: { 
                                        duration: 0.6, 
                                        delay: 0.8 + (index * 0.2) 
                                    }
                                } : { opacity: 0, y: 50 }}
                                className={`flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                            >
                                {/* Text content */}
                                <div className="w-1/2 px-8">
                                    <motion.div 
                                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                        animate={isVisible ? { 
                                            opacity: 1, 
                                            x: 0,
                                            transition: { 
                                                duration: 0.7, 
                                                delay: 0.9 + (index * 0.2) 
                                            }
                                        } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                        className={`${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"} space-y-2`}
                                    >
                                        <h3 className="text-xl font-semibold">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </motion.div>
                                </div>

                                {/* Circle with number - improved centering */}
                                <div className="relative flex items-center justify-center">
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        animate={isVisible ? { 
                                            scale: 1,
                                            transition: { 
                                                type: "spring",
                                                stiffness: 260,
                                                damping: 20,
                                                delay: 1 + (index * 0.2) 
                                            } 
                                        } : { scale: 0 }}
                                        className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-md"
                                    >
                                        {step.id}
                                    </motion.div>
                                </div>

                                {/* Empty space for opposite side */}
                                <div className="w-1/2"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Process;