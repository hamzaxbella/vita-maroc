'use client'
import { about } from "@/public"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const About = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
    
    return (
        <section ref={sectionRef} className="min-h-screen my-[3rem] auto-spacing overflow-hidden">
            <motion.div 
                className="flex flex-col justify-center items-center gap-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h1 className="w-fit text-2xl md:text-3xl font-semibold text-center px-4">Á propos de notre service</h1>
                <motion.div 
                    className="w-12 h-1 bg-primary rounded-full" 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />
            </motion.div>

            <div className="flex flex-col lg:flex-row py-8 md:py-12 lg:py-[5rem] gap-8 md:gap-10 lg:gap-[5rem]">
                <motion.div 
                    className="w-full lg:flex-1 flex justify-center items-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Image 
                        src={about} 
                        alt="about us image" 
                        width={900} 
                        height={900} 
                        className="w-full max-w-[500px] h-auto "
                    />
                </motion.div>
                
                <motion.div 
                    className="w-full lg:flex-1 flex flex-col justify-center items-center lg:items-start gap-5 px-4 md:px-6"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <motion.h1 
                        className="text-xl md:text-2xl leading-8 md:leading-10 font-semibold text-center lg:text-left"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Nous sommes une plateforme de santé qui connecte les patients aux médecins, en ligne ou à domicile.
                    </motion.h1>
                    
                    <motion.p
                        className="text-center lg:text-left text-black/70"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        En quelques clics, vous pouvez réserver une consultation, demander une visite médicale chez vous, ou contacter un professionnel en cas d&apos;urgence.
                    </motion.p>
                    <p className="mb-4">Notre plateforme est conçue pour faciliter l&apos;accès aux soins de santé pour tous les Marocains.</p>
                </motion.div>
            </div>
        </section>
    )
}

export default About