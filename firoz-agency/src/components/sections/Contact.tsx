"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading line reveal
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll(".contact-line");
        lines.forEach((line) => {
          const inner = line.querySelector(".contact-line-inner") as HTMLElement;
          if (inner) {
            gsap.set(inner, { yPercent: 120 });
            gsap.to(inner, {
              yPercent: 0,
              duration: 1.4,
              ease: "power4.out",
              scrollTrigger: { trigger: line, start: "top 90%" },
            });
          }
        });
      }

      // Form fields stagger
      if (formRef.current) {
        gsap.utils.toArray<HTMLElement>(".contact-field-row").forEach((el, i) => {
          gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.8, delay: i * 0.08, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 95%" },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    // Build WhatsApp message
    const lines = [
      `Hello 👋`,
      `I'm *${name || "a potential client"}*.`,
      ``,
      `*Brand Name:* ${brandName || "Not specified"}`,
      `*Business Type:* ${businessType || "Not specified"}`,
      `*Interest:* ${interest || "Not specified"}`,
      ``,
      `*Message:*`,
      message || "I'd like to discuss a project.",
      ``,
      `Looking forward to hearing from you!`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    // Use WhatsApp number from the Instagram data
    const whatsappUrl = `https://wa.me/917238900819?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-44 bg-foreground text-background rounded-t-[2rem] -mt-8 z-10">
      <div className="px-6 lg:px-10">
        {/* TWO-COLUMN LAYOUT: Heading left, Form right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT SIDE: Massive heading + info */}
          <div ref={headingRef} className="flex flex-col justify-between">
            <div>
              {["LET'S WORK", "TOGETHER"].map((line, i) => (
                <div key={i} className="contact-line overflow-hidden">
                  <div className="contact-line-inner">
                    <h2 className="heading-massive text-[14vw] lg:text-[7vw]">{line}</h2>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 lg:mt-auto space-y-6">
              <p className="text-mono opacity-50 leading-relaxed max-w-sm">
                🎨 Logo Designer & Brand Strategist<br />
                Available for freelance projects 📩<br />
                Book a Consultation — All Designs Available
              </p>

              <div className="flex flex-col gap-3">
                <a href="https://wa.link/rvgt3w" target="_blank" rel="noopener noreferrer" className="text-mono opacity-70 hover:opacity-100 transition-opacity">
                  📱 WhatsApp: +91 7238900819
                </a>
                <a href="https://www.instagram.com/firoz_premium.logo.agency" target="_blank" rel="noopener noreferrer" className="text-mono opacity-70 hover:opacity-100 transition-opacity">
                  📸 @firoz_premium.logo.agency
                </a>
              </div>

              <div className="flex gap-4 mt-6">
                <div>
                  <p className="heading-massive text-3xl">1,639</p>
                  <p className="text-mono opacity-40 mt-1">Followers</p>
                </div>
                <div>
                  <p className="heading-massive text-3xl">419</p>
                  <p className="text-mono opacity-40 mt-1">Posts</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: WhatsApp form */}
          <div ref={formRef}>
            <p className="text-mono opacity-40 mb-8">Send us a message via WhatsApp</p>

            <form onSubmit={handleWhatsApp} className="space-y-0">
              <div className="contact-field-row border-b border-background/10 py-5">
                <label className="text-mono opacity-40 mb-2 block">Your Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="contact-field !text-background !border-transparent"
                />
              </div>

              <div className="contact-field-row border-b border-background/10 py-5">
                <label className="text-mono opacity-40 mb-2 block">Brand Name</label>
                <input
                  type="text"
                  placeholder="Your brand / company name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="contact-field !text-background !border-transparent"
                />
              </div>

              <div className="contact-field-row border-b border-background/10 py-5">
                <label className="text-mono opacity-40 mb-2 block">Business Type</label>
                <input
                  type="text"
                  placeholder="e.g. Restaurant, Fashion, Tech..."
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="contact-field !text-background !border-transparent"
                />
              </div>

              <div className="contact-field-row border-b border-background/10 py-5">
                <label className="text-mono opacity-40 mb-2 block">Interest</label>
                <div className="flex flex-wrap gap-3 mt-3">
                  {["Logo Design", "Brand Identity", "Packaging", "Full Package"].map((item) => (
                    <label key={item} className="cursor-pointer">
                      <input
                        type="radio"
                        name="interest"
                        value={item}
                        className="sr-only peer"
                        onChange={(e) => setInterest(e.target.value)}
                      />
                      <span className="text-mono px-4 py-2 border border-background/20 rounded-full peer-checked:bg-background peer-checked:text-foreground transition-all duration-300 hover:border-background/50">
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="contact-field-row border-b border-background/10 py-5">
                <label className="text-mono opacity-40 mb-2 block">Message</label>
                <textarea
                  placeholder="Tell us about your project, preferred colors, any reference..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="contact-field !text-background !border-transparent resize-none"
                />
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                  type="submit"
                  className="bg-[#25D366] text-white px-10 py-4 rounded-full text-mono font-bold hover:scale-105 active:scale-95 transition-transform duration-300 flex items-center gap-3"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </button>
                <span className="text-mono opacity-30">Redirects to WhatsApp chat</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
