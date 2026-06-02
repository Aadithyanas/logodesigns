"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "Brand Identity", desc: "Complete visual identity systems that define your brand's presence." },
  { num: "02", title: "Logo Design", desc: "Memorable, bold logos crafted with precision and meaning." },
  { num: "03", title: "Creative Design", desc: "Visual assets, social media kits, and marketing collateral." },
  { num: "04", title: "Brand Strategy", desc: "Strategic brand positioning and market differentiation." },
  { num: "05", title: "Packaging Design", desc: "Premium packaging that elevates your product experience." },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading char animation
      const heading = headingRef.current;
      if (heading) {
        const text = heading.textContent || "";
        heading.innerHTML = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.className = "animated-char";
          span.textContent = char === " " ? "\u00A0" : char;
          heading.appendChild(span);
        });
        heading.classList.add("gsap-ready");

        const chars = heading.querySelectorAll(".animated-char");
        gsap.set(chars, { yPercent: 150, display: "inline-block" });

        gsap.to(chars, {
          yPercent: 0,
          stagger: 0.02,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, start: "top 90%" },
        });
      }

      // Service rows stagger in
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40, x: -20 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 md:py-36">
      <div className="px-6 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-4">
          <h2
            ref={headingRef}
            className="heading-display heading-appear text-[8vw] md:text-[6vw] text-foreground"
          >
            Our expertise
          </h2>
          <p className="text-mono opacity-50">Services & capabilities</p>
        </div>

        {/* Service list */}
        <div className="border-t border-foreground/10">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-row group border-b border-foreground/10 py-8 md:py-10 grid grid-cols-12 gap-4 items-center cursor-pointer hover:pl-4 transition-all duration-500"
            >
              <div className="col-span-1">
                <span className="text-mono opacity-30">{service.num}</span>
              </div>
              <div className="col-span-5 md:col-span-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
              </div>
              <div className="col-span-6 md:col-span-5">
                <p className="text-sm md:text-base text-foreground/50 font-sans">{service.desc}</p>
              </div>
              <div className="col-span-12 md:col-span-2 flex justify-end">
                <span className="text-mono opacity-0 group-hover:opacity-60 transition-opacity duration-500">View →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
