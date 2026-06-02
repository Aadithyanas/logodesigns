"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We discuss your brand's vision, goals, and target audience to understand your unique needs.",
  },
  {
    number: "02",
    title: "Research & Strategy",
    description: "Deep dive into your industry, competitors, and market trends to position your brand effectively.",
  },
  {
    number: "03",
    title: "Design Development",
    description: "Crafting concepts and visual directions that align perfectly with the established strategy.",
  },
  {
    number: "04",
    title: "Final Delivery",
    description: "Handing over complete brand guidelines, logo files, and assets ready for immediate use.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-navy-light relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4 block"
          >
            How We Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            A Seamless Process
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-glass-border -translate-y-1/2 z-0"></div>
          <div className="hidden md:block absolute top-1/2 left-0 h-[1px] bg-gold -translate-y-1/2 z-0 w-1/3 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative text-center md:text-left group"
              >
                <div className="w-20 h-20 mx-auto md:mx-0 bg-black border border-gold rounded-full flex items-center justify-center text-2xl font-serif text-gold mb-8 group-hover:bg-gold group-hover:text-black transition-colors duration-500 relative z-10 shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                
                {/* Mobile connecting line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-8 left-1/2 w-[1px] h-4 bg-gold -translate-x-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
