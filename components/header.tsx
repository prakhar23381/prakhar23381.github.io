"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import PixelatedText from "../app/pixelated-text"

interface HeaderProps {
  visible: boolean
}

export default function Header({ visible }: HeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    gsap.to(headerRef.current, {
      y: visible ? 0 : -100,
      opacity: visible ? 1 : 0,
      duration: 0.5,
      ease: "power3.out",
    })
  }, [visible])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full h-20 bg-black z-40 flex items-center justify-between px-10"
      style={{ opacity: 0, transform: "translateY(-100px)" }}
    >
      <PixelatedText text="PRAKHAR" className="text-2xl font-bold" />

      <div className="flex items-center gap-6">
        <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
          Contact Me
        </button>
        <button className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 group">
          <span className="w-6 h-0.5 bg-white group-hover:w-8 transition-all"></span>
          <span className="w-8 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white group-hover:w-8 transition-all"></span>
        </button>
      </div>
    </header>
  )
}
