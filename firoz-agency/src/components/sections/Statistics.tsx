"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "400+", label: "Projects" },
  { value: "150+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function Statistics() {
  return (
    <section className="py-20 border-y border-glass-border bg-gradient-luxury relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className="text-4xl md:text-6xl font-serif text-gold mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {stat.value}
              </h3>
              <p className="text-white text-sm uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
