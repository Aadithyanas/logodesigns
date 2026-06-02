"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Real portfolio data from Instagram posts
const projects = [
  {
    title: "NEW LOGO LAUNCHED",
    tagline: "Logo Design",
    caption: "THIS IS MY NEW LOGO LAUNCHED",
    image: "/images/portfolio-1.webp",
    url: "https://www.instagram.com/p/DYoJ_dbDIWq",
    layout: "wide",
    likes: 15,
  },
  {
    title: "PREMIUM LOGO",
    tagline: "Professional Design",
    caption: "Premium and professional logo design",
    image: "/images/portfolio-2.webp",
    url: "https://www.instagram.com/p/DYreqDaDAQK",
    layout: "tall",
    likes: 4,
  },
  {
    title: "BRAND IDENTITY",
    tagline: "Brand Strategy",
    caption: "Do you need a logo design?",
    image: "/images/portfolio-3.webp",
    url: "https://www.instagram.com/p/DY4IkFJD4mu",
    layout: "tall",
    likes: 7,
  },
  {
    title: "MOCKUP PRESENTATION",
    tagline: "Full Brand Package",
    caption: "Premium and professional logo design with mockups",
    image: "/images/portfolio-4.webp",
    url: "https://www.instagram.com/p/DYxcQFlj1M0",
    layout: "wide",
    likes: 11,
  },
  {
    title: "JEWELLERY BRAND",
    tagline: "Logo Design",
    caption: "Jewellery brand logo design",
    image: "/images/portfolio-5.jpg",
    url: "https://www.instagram.com/p/DY9yBCuvaoQ",
    layout: "wide",
    likes: 5,
  },
  {
    title: "PERFUME BOTTLE",
    tagline: "Sticker Design",
    caption: "Perfume bottle sticker design",
    image: "/images/portfolio-6.webp",
    url: "https://www.instagram.com/p/DYmRMT-sThG",
    layout: "tall",
    likes: 8,
  },
  {
    title: "CLIENT LOGO",
    tagline: "Logo Design",
    caption: "Do you need a logo design?",
    image: "/images/portfolio-7.webp",
    url: "https://www.instagram.com/p/DYuyyCmPK2z",
    layout: "tall",
    likes: 7,
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heading = headingRef.current;
      if (heading) {
        // Outline heading slide in
        gsap.fromTo(heading, 
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );
      }

      // Cards stagger in
      gsap.utils.toArray<HTMLElement>(".gallery-card").forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100 },
          {
            opacity: 1, y: 0, duration: 1, delay: (i % 3) * 0.15, ease: "power4.out",
            scrollTrigger: { trigger: card, start: "top 85%" }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="relative py-24 md:py-36 bg-background overflow-hidden z-10">
      {/* Background diagonal stripes decoration */}
      <div className="absolute right-0 bottom-10 w-full md:w-1/2 h-[60%] opacity-20 md:opacity-40 pointer-events-none -z-10" 
           style={{ background: "repeating-linear-gradient(45deg, #E60000, #E60000 15px, transparent 15px, transparent 30px)" }}>
      </div>

      <div className="px-6 lg:px-10 max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-20">
          <h2
            ref={headingRef}
            className="text-[14vw] md:text-[9vw] font-black uppercase leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_var(--foreground)] md:[-webkit-text-stroke:2px_var(--foreground)]"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            SOLUTIONS
          </h2>
        </div>

        <div className="columns-2 lg:columns-3 gap-3 sm:gap-6 md:gap-8">
          {projects.map((project, i) => {
            const isRed = i % 2 !== 0;
            return (
              <a
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`gallery-card group relative w-full overflow-hidden cursor-pointer bg-[#0a0a0a] block border border-white/5 break-inside-avoid mb-3 sm:mb-6 md:mb-8 ${project.layout === 'tall' ? 'aspect-[3/4]' : 'aspect-square'}`}
              >
                {/* Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${isRed ? 'grayscale' : ''}`}
                />
                
                {/* Red Overlay for alternate cards */}
                {isRed && (
                  <div className="absolute inset-0 bg-[#E60000] mix-blend-multiply opacity-100 transition-opacity duration-500 group-hover:opacity-70"></div>
                )}
                
                {/* Dark gradient on the right edge to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70"></div>

                {/* Vertical Text */}
                <div 
                  className="absolute top-3 bottom-3 right-2 sm:top-6 sm:bottom-6 sm:right-4 text-white text-left font-black uppercase text-xl sm:text-3xl md:text-[2.75rem] leading-[0.85] tracking-tight flex items-start justify-start"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontFamily: "'Anton', sans-serif" }}
                >
                  {project.title}
                </div>
                
                {/* Bottom left small details */}
                <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 text-white/50 text-[10px] sm:text-xs md:text-sm font-mono tracking-widest uppercase flex flex-col gap-0.5 sm:gap-1">
                  <span className="text-white font-bold">{project.tagline}</span>
                  <span>{project.likes} LIKES</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
