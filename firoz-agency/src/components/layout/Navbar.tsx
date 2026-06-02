"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navTopRef = useRef<HTMLElement>(null);
  const navBottomRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Studio", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    // Nav entrance animations
    if (navTopRef.current) {
      gsap.fromTo(navTopRef.current,
        { y: "-100%" },
        { y: "0%", duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }
    if (navBottomRef.current) {
      gsap.fromTo(navBottomRef.current,
        { y: "100%" },
        { y: "0%", duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.add("theme-toggling");
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("is-dark", newTheme === "dark");
    setTimeout(() => document.documentElement.classList.remove("theme-toggling"), 350);
  };

  const openMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setMenuOpen(true);

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut", duration: 1.4 },
      onComplete: () => { isAnimating.current = false; }
    });

    tl.to(menuRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    }, 0);

    // Stagger menu link reveals
    linksRef.current.forEach((link, i) => {
      if (link) {
        const span = link.querySelector("span");
        if (span) {
          gsap.set(span, { y: "120%" });
          tl.to(span, {
            y: "0%",
            duration: 1.2,
            ease: "power4.out",
          }, 0.4 + i * 0.06);
        }
      }
    });
  };

  const closeMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut", duration: 1.2 },
      onComplete: () => {
        setMenuOpen(false);
        isAnimating.current = false;
      }
    });

    tl.to(menuRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    }, 0);
  };

  const handleMenuLinkClick = (href: string) => {
    closeMenu();
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 1300);
  };

  return (
    <>
      {/* TOP NAV BAR */}
      <nav ref={navTopRef} className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-colors duration-300" style={{ transform: "translateY(-100%)" }}>
        <div className="px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between pointer-events-auto">
            {/* Left: Logo + Dark mode */}
            <div className="flex items-center gap-8">
              <Link href="#home" className="link-hover text-foreground">
                <div className="link-first"><span className="text-mono font-bold uppercase tracking-wider">FIROZ PREMIUM LOGO AGENCY</span></div>
                <div className="link-second"><span className="text-mono font-bold uppercase tracking-wider">FIROZ PREMIUM LOGO AGENCY</span></div>
              </Link>

              <button onClick={toggleTheme} className="link-hover text-foreground hidden md:inline-flex">
                <div className="link-first"><span className="text-mono">{theme === "light" ? "Dark mode" : "Light mode"}</span></div>
                <div className="link-second"><span className="text-mono">{theme === "light" ? "Dark mode" : "Light mode"}</span></div>
              </button>
            </div>

            {/* Center: Menu toggle */}
            <button onClick={menuOpen ? closeMenu : openMenu} className="link-hover text-foreground">
              <div className="link-first"><span className="text-mono">{menuOpen ? "Close" : "Menu"}</span></div>
              <div className="link-second"><span className="text-mono">{menuOpen ? "Close" : "Open"}</span></div>
            </button>

            {/* Right: CTA */}
            <div className="hidden md:block">
              <Link href="#contact" className="link-hover text-foreground">
                <div className="link-first"><span className="text-mono">Let&apos;s talk!</span></div>
                <div className="link-second"><span className="text-mono">Contact us</span></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* BOTTOM NAV BAR */}
      <nav ref={navBottomRef} className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none hidden md:block transition-colors duration-300" style={{ transform: "translateY(100%)" }}>
        <div className="px-6 lg:px-10 py-5">
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="text-mono text-foreground opacity-80">
              🎨 Logo Designer & Brand Strategist
            </div>
            <div className="text-mono text-foreground text-right opacity-80">
              <span>+91 7238900819</span>
            </div>
          </div>
        </div>
      </nav>

      {/* FULL-SCREEN MENU OVERLAY */}
      <div
        ref={menuRef}
        className="nav-menu-overlay"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
      >
        <div className="w-full px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            {menuItems.map((item, i) => (
              <div
                key={item.label}
                ref={el => { linksRef.current[i] = el; }}
                className="menu-link cursor-pointer"
                onClick={() => handleMenuLinkClick(item.href)}
              >
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-current/20 flex flex-wrap gap-8">
            <a href="https://www.instagram.com/firoz_premium.logo.agency" target="_blank" rel="noopener noreferrer" className="text-mono opacity-60 hover:opacity-100 transition-opacity">Instagram</a>
            <a href="https://wa.link/rvgt3w" target="_blank" rel="noopener noreferrer" className="text-mono opacity-60 hover:opacity-100 transition-opacity">WhatsApp</a>
            <a href="mailto:hello@firozagency.com" className="text-mono opacity-60 hover:opacity-100 transition-opacity">hello@firozagency.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
