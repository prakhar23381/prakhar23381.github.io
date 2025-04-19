"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Github, Linkedin, Instagram, Youtube, Mail, DribbbleIcon as Behance, Twitter } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/",
    color: "#ffffff",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/",
    color: "#ffffff",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/",
    color: "#ffffff",
  },
  {
    name: "Behance",
    icon: Behance,
    url: "https://behance.net/",
    color: "#ffffff",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/",
    color: "#ffffff",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/",
    color: "#ffffff",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:prakhar@example.com",
    color: "#ffffff",
  },
]

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Animate section on scroll into view
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    )

    // Stagger animate social links
    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      },
    )
  }, [])

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-6 py-20">
      <h2 className="text-5xl font-bold mb-16 text-center">Get in Touch</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {socialLinks.map((link, index) => {
          const Icon = link.icon

          return (
            <a
              key={link.name}
              ref={el => {
  itemsRef.current[index] = el;
}}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 border border-white/20 rounded-lg hover:bg-white/5 transition-colors group"
              style={{ opacity: 0 }}
            >
              <Icon size={32} className="mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          )
        })}
      </div>

      <div className="mt-20 text-center">
        <p className="text-xl">Let&apos;s create something amazing together</p>
        <p className="mt-2 text-white/60">© {new Date().getFullYear()} PRAKHAR. All rights reserved.</p>
      </div>
    </div>
  )
}
