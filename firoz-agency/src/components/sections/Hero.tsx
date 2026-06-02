"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".hero-line");
        lines.forEach((line, i) => {
          const inner = line.querySelector(".hero-line-inner") as HTMLElement;
          if (inner) {
            gsap.set(inner, { yPercent: 120 });
            gsap.to(inner, {
              yPercent: 0,
              duration: 1.4,
              ease: "power4.out",
              delay: 0.3 + i * 0.1,
            });
          }
        });
      }

      if (subtextRef.current) {
        gsap.fromTo(subtextRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 1.2 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex flex-col justify-center pt-20">
      <div className="px-6 lg:px-10 relative z-10">
        {/* MASSIVE CENTERED HEADING */}
        <div ref={headingRef} className="text-center">
          {["WE THINK", "CRAFT AND", "DESIGN"].map((line, i) => (
            <div key={i} className="hero-line overflow-hidden">
              <div className="hero-line-inner">
                <h1 className="heading-massive text-[15vw] md:text-[14vw] lg:text-[13vw] font-black leading-[0.85] text-foreground">
                  {line}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div ref={subtextRef} className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 opacity-0">
          <p className="text-base md:text-lg max-w-md font-sans text-foreground/60 leading-relaxed">
            🎨 Logo Designer & Brand Strategist. Available for freelance projects. We create unique and professional logo designs that give your brand a premium identity.
          </p>

          <div className="flex items-center gap-5">
            <div className="w-28 h-16 md:w-36 md:h-20 rounded-full overflow-hidden relative shrink-0">
              <Image
                src="/images/profile.jpg"
                alt="Firoz Logo and Branding Designer"
                fill
                className="object-cover"
              />
            </div>
            <a href="https://wa.link/rvgt3w" target="_blank" rel="noopener noreferrer" className="text-mono border-b border-foreground/30 hover:border-foreground pb-1 transition-colors whitespace-nowrap">
              Book a Consultation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
