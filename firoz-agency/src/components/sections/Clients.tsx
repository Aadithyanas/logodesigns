"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  "Logo Design", "Brand Strategy", "Packaging", "Visual Identity",
  "Creative Direction", "Social Media", "Web Design", "Print Design"
];

export default function Clients() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee
      if (marqueeRef.current) {
        const items = marqueeRef.current.querySelectorAll(".marquee-item");
        const totalWidth = marqueeRef.current.scrollWidth / 2;

        gsap.to(marqueeRef.current, {
          x: -totalWidth,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      // Tools/logos reveal
      gsap.utils.toArray<HTMLElement>(".tool-logo").forEach((el, i) => {
        gsap.fromTo(el,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: "top 95%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 overflow-hidden">
      <div className="px-6 lg:px-10 mb-12">
        <p className="text-mono opacity-40">Tools & expertise</p>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden py-6 border-y border-foreground/10">
        <div ref={marqueeRef} className="flex whitespace-nowrap gap-16">
          {[...clients, ...clients].map((item, i) => (
            <div key={i} className="marquee-item flex items-center gap-4 shrink-0">
              <span className="text-3xl md:text-5xl font-serif font-bold text-foreground/80">{item}</span>
              <span className="w-2 h-2 rounded-full bg-foreground/30 shrink-0"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Tool logos grid */}
      <div className="px-6 lg:px-10 mt-16">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
          {["Ai", "Ps", "Id", "Xd", "Fg", "Sk", "Lr", "Pr"].map((tool, i) => (
            <div key={i} className="tool-logo overflow-hidden flex items-center justify-center py-6 border border-foreground/10 rounded-sm">
              <span className="text-2xl font-serif font-bold text-foreground/40">{tool}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
