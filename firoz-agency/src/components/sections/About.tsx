"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (linesRef.current) {
        const lines = linesRef.current.querySelectorAll(".about-line");
        lines.forEach((line) => {
          const inner = line.querySelector(".about-line-inner") as HTMLElement;
          if (inner) {
            gsap.set(inner, { yPercent: 110 });
            gsap.to(inner, {
              yPercent: 0,
              duration: 1.3,
              ease: "power4.out",
              scrollTrigger: { trigger: line, start: "top 92%" },
            });
          }
        });
      }

      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".mono-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingLines = [
    "FIROZ PREMIUM",
    "LOGO AGENCY —",
    "WE CREATE UNIQUE",
    "AND PROFESSIONAL",
    "LOGO DESIGNS.",
  ];

  return (
    <section ref={sectionRef} id="about" className="relative py-28 md:py-44 bg-foreground text-background rounded-t-[2rem] -mt-8 z-10">
      <div className="px-6 lg:px-10">
        <p className="mono-reveal text-mono opacity-50 mb-16 md:mb-24">About the studio</p>

        <div ref={linesRef}>
          {headingLines.map((line, i) => (
            <div key={i} className="about-line overflow-hidden">
              <div className="about-line-inner">
                <h2 className="heading-massive text-[9vw] md:text-[7vw] lg:text-[6.5vw]">
                  {line}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Real stats from Instagram data */}
        <div className="mt-24 md:mt-36 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-background/15 pt-12">
          {[
            { label: "Followers", value: "1,639" },
            { label: "Posts delivered", value: "419" },
            { label: "Following", value: "7,485" },
            { label: "Highlights", value: "9" },
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <p className="text-mono opacity-40 mb-3">{stat.label}</p>
              <p className="heading-massive text-4xl md:text-5xl">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28 max-w-3xl">
          <p className="mono-reveal text-mono opacity-50 mb-6">What we offer</p>
          <p className="simple-appear text-xl md:text-2xl leading-relaxed font-sans opacity-80">
            We create unique and professional logo designs that give your brand a premium identity. From concept to final delivery — 5 logo samples, 5 rounds of changes, all non-copyrighted original work. Available for freelance projects worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
