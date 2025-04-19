"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Canvas } from "@react-three/fiber"
import { Text3D, Center, Environment } from "@react-three/drei"
import type * as THREE from "three" // Import THREE

// Rotating text component
function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const titles = ["Designer", "Developer", "Animator", "Filmmaker"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-8 overflow-hidden">
      <div className="relative">
        {titles.map((title, index) => (
          <div
            key={title}
            className={`absolute left-0 transition-all duration-500 ${
              index === currentIndex ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"
            }`}
          >
            {title}
          </div>
        ))}
      </div>
      <span className="ml-2">based in Delhi</span>
    </div>
  )
}

// 3D Text component
function AnimatedName() {
  const [mounted, setMounted] = useState(false)
  const textRef = useRef<THREE.Mesh>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !textRef.current) return

    const geometry = textRef.current.geometry
    geometry.computeBoundingBox()
    const boundingBox = geometry.boundingBox
    if (!boundingBox) return
    const calculatedWidth = boundingBox.max.x - boundingBox.min.x
    setWidth(calculatedWidth)

    gsap.to(textRef.current.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none",
    })

    // Floating animation
    gsap.to(textRef.current.position, {
      y: 0.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [mounted])

  if (!mounted) return null;
  return (
    <Center>
      <Text3D
        position={[-width / 2, 0, 0]} // width is the text width
        ref={textRef}
        font="/fonts/helvetiker_bold.typeface.json"
        size={2}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        PRAKHAR
        <meshStandardMaterial color="white" />
      </Text3D>
    </Center>
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textContainerRef.current || !buttonsRef.current) return

    // Set up scroll trigger for hero to header transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    tl.to(sectionRef.current, {
      height: "80px",
      ease: "power2.inOut",
    })
      .to(
        textContainerRef.current,
        {
          opacity: 0,
          y: -50,
          ease: "power2.inOut",
        },
        "<",
      )
      .to(
        buttonsRef.current,
        {
          bottom: "auto",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          ease: "power2.inOut",
        },
        "<",
      )

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill()
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className="w-full h-full relative">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <AnimatedName />
          <Environment preset="studio" />
        </Canvas>
      </div>

      <div ref={textContainerRef} className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
        <RotatingText />
      </div>

      <div ref={buttonsRef} className="absolute bottom-10 right-10 flex items-center gap-6">
        <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
          Contact Me
        </button>
        <button className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 group">
          <span className="w-6 h-0.5 bg-white group-hover:w-8 transition-all"></span>
          <span className="w-8 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white group-hover:w-8 transition-all"></span>
        </button>
      </div>
    </div>
  )
}
