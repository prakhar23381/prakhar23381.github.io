"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorBlobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorBlob = cursorBlobRef.current

    if (!cursor || !cursorBlob) return

    // Hide default cursor
    document.body.style.cursor = "none"

    // Initial position
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // Physics parameters
    const elasticity = 0.05 // Lower = more elastic
    const friction = 0.8 // Higher = less friction
    let velocityX = 0
    let velocityY = 0

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Distort the blob on fast movements
      const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2))

      if (speed > 5) {
        gsap.to(cursorBlob, {
          scaleX: 1 + speed * 0.01,
          scaleY: 1 - speed * 0.005,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
        })
      } else {
        gsap.to(cursorBlob, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        })
      }
    }

    // Animation loop for physics-based cursor movement
    const updateCursor = () => {
      // Calculate forces
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY

      // Apply spring force
      velocityX += dx * elasticity
      velocityY += dy * elasticity

      // Apply friction
      velocityX *= friction
      velocityY *= friction

      // Update position
      cursorX += velocityX
      cursorY += velocityY

      // Apply to DOM
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`

      requestAnimationFrame(updateCursor)
    }

    // Start animation loop
    updateCursor()

    // Add event listeners
    window.addEventListener("mousemove", onMouseMove)

    // Interactive elements handling
    const handleInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"]')

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursorBlob, {
            scale: 1.5,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            duration: 0.3,
          })
        })

        el.addEventListener("mouseleave", () => {
          gsap.to(cursorBlob, {
            scale: 1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            duration: 0.3,
          })
        })
      })
    }

    // Call once and then on any DOM changes
    handleInteractiveElements()
    const observer = new MutationObserver(handleInteractiveElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", onMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div
        ref={cursorBlobRef}
        className="w-6 h-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-full flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  )
}
