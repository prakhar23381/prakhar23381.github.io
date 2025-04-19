"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "Project One",
    image: "/placeholder.svg?height=600&width=800",
    behanceUrl: "https://www.behance.net/",
    description: "A brief description of project one",
  },
  {
    id: 2,
    title: "Project Two",
    image: "/placeholder.svg?height=600&width=800",
    behanceUrl: "https://www.behance.net/",
    description: "A brief description of project two",
  },
  {
    id: 3,
    title: "Project Three",
    image: "/placeholder.svg?height=600&width=800",
    behanceUrl: "https://www.behance.net/",
    description: "A brief description of project three",
  },
  {
    id: 4,
    title: "Project Four",
    image: "/placeholder.svg?height=600&width=800",
    behanceUrl: "https://www.behance.net/",
    description: "A brief description of project four",
  },
  {
    id: 5,
    title: "Project Five",
    image: "/placeholder.svg?height=600&width=800",
    behanceUrl: "https://www.behance.net/",
    description: "A brief description of project five",
  },
]

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  // Navigate to the next project
  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  // Navigate to the previous project
  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Handle project click
  const handleProjectClick = (index: number) => {
    if (index === activeIndex) {
      // Open Behance link if clicking the active project
      window.open(projects[index].behanceUrl, "_blank")
    } else {
      // Otherwise, make the clicked project active
      setActiveIndex(index)
    }
  }

  // Update carousel position when active index changes
  useEffect(() => {
    if (!carouselRef.current) return

    // Calculate the position to center the active item
    const scrollPosition = activeIndex * (320 + 20) // item width + gap

    gsap.to(carouselRef.current, {
      x: -scrollPosition + (window.innerWidth / 2 - 160), // Center the active item
      duration: 0.8,
      ease: "power2.out",
    })

    // Update opacity and scale for all items
    itemsRef.current.forEach((item, index) => {
      if (!item) return

      gsap.to(item, {
        opacity: index === activeIndex ? 1 : 0.4,
        scale: index === activeIndex ? 1.1 : 0.9,
        duration: 0.5,
        ease: "power2.out",
      })
    })
  }, [activeIndex])

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Project carousel */}
      <div ref={carouselRef} className="flex items-center gap-5 absolute" style={{ left: 0 }}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { itemsRef.current[index] = el; }}
            className="w-80 h-96 flex-shrink-0 bg-black border border-white/20 rounded-lg overflow-hidden transition-all cursor-pointer"
            onClick={() => handleProjectClick(index)}
            style={{
              opacity: index === activeIndex ? 1 : 0.4,
              transform: `scale(${index === activeIndex ? 1.1 : 0.9})`,
            }}
          >
            <div className="relative w-full h-64">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-white/70">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevProject}
        className="absolute left-8 z-10 w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Previous project"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextProject}
        className="absolute right-8 z-10 w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Next project"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === activeIndex ? "w-8 bg-white" : "bg-white/40"}`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
