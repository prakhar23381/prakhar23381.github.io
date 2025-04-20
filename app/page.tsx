"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CustomCursor from "@/components/custom-cursor"
import HeroSection from "@/components/hero-section"
import ProjectsCarousel from "../components/projects-carousel";
import AltProjectsSection from "../components/alt-projects-section";
import ContactSection from "@/components/contact-section"
import Header from "@/components/header"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > window.innerHeight * 0.5) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main ref={mainRef} className="relative bg-black text-white min-h-screen">
      <CustomCursor />

      {/* Header that appears after scrolling */}
      <Header visible={scrolled} />

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <HeroSection />
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-sm font-light">Scroll to continue</span>
          <div className="w-6 h-10 border border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Spacer Section */}
      <div className="h-32" />

      {/* Projects Section */}
      <section className="h-screen relative bg-black">
        <div className="h-full w-full flex items-center justify-center">
          <AltProjectsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section className="h-screen flex items-center justify-center relative">
        <ContactSection />
      </section>
    </main>
  )
}
