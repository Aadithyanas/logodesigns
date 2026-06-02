"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (logoRef.current) {
        const inner = logoRef.current.querySelector(".footer-logo-inner") as HTMLElement;
        if (inner) {
          gsap.fromTo(inner,
            { height: "0%", transformOrigin: "top center" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: logoRef.current,
                start: "top bottom-=50px",
                end: "bottom bottom-=50px",
                scrub: 0.05,
              },
            }
          );
        }
      }

      gsap.utils.toArray<HTMLElement>(".footer-link").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 15, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".footer-text-appear").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative bg-foreground text-background pt-16 md:pt-24 pb-6 rounded-t-[2rem] -mt-8 z-10">
      <div className="px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 mb-16 md:mb-24">
          {/* Col 1: Pages */}
          <div className="flex flex-col gap-2">
            {["Home", "Work", "Services", "Studio", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "#home" : item === "Studio" ? "#about" : `#${item.toLowerCase()}`}
                className="footer-link link-hover text-background"
              >
                <div className="link-first"><span className="text-mono">{item}</span></div>
                <div className="link-second"><span className="text-mono">{item}</span></div>
              </Link>
            ))}
          </div>

          {/* Col 2: Socials */}
          <div className="flex flex-col gap-2">
            {[
              { label: "Instagram", href: "https://www.instagram.com/firoz_premium.logo.agency" },
              { label: "WhatsApp", href: "https://wa.link/rvgt3w" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link link-hover text-background"
              >
                <div className="link-first"><span className="text-mono">{item.label}</span></div>
                <div className="link-second"><span className="text-mono">{item.label}</span></div>
              </a>
            ))}
          </div>

          {/* Col 3 */}
          <div>
            <p className="footer-text-appear text-mono opacity-50 leading-relaxed">
              Firoz Logo and Branding Designer — Professional logo design studio available for freelance projects worldwide.
            </p>
          </div>

          {/* Col 4 */}
          <div>
            <p className="footer-text-appear text-mono opacity-50 leading-relaxed mb-4">
              Big project? Crazy thought? Or just need a logo? Book a consultation now!
            </p>
            <a href="https://wa.link/rvgt3w" target="_blank" rel="noopener noreferrer">
              <span className="footer-text-appear text-mono opacity-80">Let&apos;s talk on WhatsApp!</span>
            </a>
          </div>

          {/* Col 5: Contact + copyright */}
          <div>
            <a href="tel:+917238900819" className="footer-link link-hover text-background mb-4 block">
              <div className="link-first"><span className="text-mono">+91 7238900819</span></div>
              <div className="link-second"><span className="text-mono">+91 7238900819</span></div>
            </a>
            <div className="mt-6">
              <p className="footer-text-appear text-mono opacity-40">Copyright {new Date().getFullYear()}</p>
              <p className="footer-text-appear text-mono opacity-40">Firoz Premium Logo Agency</p>
            </div>
          </div>
        </div>

        {/* MASSIVE FIROZ NAME */}
        <div ref={logoRef} className="overflow-hidden relative" style={{ height: "clamp(120px, 25vw, 400px)" }}>
          <div
            className="footer-logo-inner overflow-hidden absolute bottom-0 left-0 right-0"
            style={{ height: "0%" }}
          >
            <div className="footer-name-massive text-[22vw] md:text-[20vw] text-center select-none whitespace-nowrap w-full absolute bottom-0 left-0 right-0 text-[#D4AF37]">
              FIROZ
            </div>
          </div>
          <div className="footer-name-massive text-[22vw] md:text-[20vw] text-center select-none whitespace-nowrap w-full absolute bottom-0 left-0 right-0 opacity-[0.1] text-[#D4AF37]">
            FIROZ
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-background/10 flex justify-between items-center">
          <p className="text-mono opacity-30">🎨 Logo Designer & Brand Strategist</p>
          <p className="text-mono opacity-30">Available worldwide</p>
        </div>
      </div>
    </footer>
  );
}
