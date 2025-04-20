import React from "react";
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

// Generic 3D mesh card component
import { useThree } from '@react-three/fiber';

function Card3DMesh({ imageUrl }: { imageUrl: string }) {
  const [active, setActive] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <Canvas style={{ width: '100%', height: '100%', borderRadius: '0.75rem', background: 'transparent' }} camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 5]} intensity={0.7} />
      <CardPlaneMesh imageUrl={imageUrl} active={active} setActive={setActive} />
    </Canvas>
  );
}


// Mesh for the card plane, fills the canvas using viewport size
import { useFrame } from '@react-three/fiber';

function CardPlaneMesh({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const { viewport } = useThree();
  // Get image aspect ratio and viewport aspect ratio
  const [imgAspect, setImgAspect] = React.useState(1);
  React.useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => setImgAspect(img.width / img.height);
  }, [imageUrl]);

  // Viewport is always square due to aspect-square, so plane is 1x1
  // We want to mimic object-cover: zoom in and center, no distortion
  React.useEffect(() => {
    if (!texture) return;
    // Reset
    texture.repeat.set(1, 1);
    texture.offset.set(0, 0);
    texture.center.set(0.5, 0.5);
    texture.wrapS = texture.wrapT = 1000; // RepeatWrapping
    // Calculate cover
    if (imgAspect > 1) {
      // Image is wider than tall, zoom in X
      texture.repeat.set(1 / imgAspect, 1);
    } else {
      // Image is taller or square, zoom in Y
      texture.repeat.set(1, imgAspect);
    }
    texture.needsUpdate = true;
  }, [texture, imgAspect]);

  return (
    <mesh castShadow receiveShadow>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// This will be your alternative projects section. You can customize the layout and content as you go!

export default function AltProjectsSection() {
  // Audio for card click sound effect
  const cardClickAudio = React.useRef<HTMLAudioElement | null>(null);
  React.useEffect(() => {
    cardClickAudio.current = new window.Audio('/assets/Elevator Bell - Sound Effect.mp3');
  }, []);
  const [activeCardIndex, setActiveCardIndex] = React.useState<number | null>(null);
  // Click outside handler
  const handleSectionClick = React.useCallback(() => {
    if (activeCardIndex !== null) setActiveCardIndex(null);
  }, [activeCardIndex]);
  return (
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center bg-black"
      onClick={handleSectionClick}
      style={{ position: 'relative' }}
    >
      <div className="grid grid-cols-6 grid-rows-4 gap-1.5 w-[98%] max-w-[98%]">
        {/* Example cards with varying sizes */}
        {[...Array(24)].map((_, i) => {
//2024 BANNER
  if (i === 0) {
    const active = activeCardIndex === 0;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    // Allow clicking anywhere (even on the card) to deactivate
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(0);
      // else: let section's onClick handle deactivation
    };
    // Watch for deactivation to trigger isAnimating
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 0 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    return (
      <div
        key="A-B-horizontal"
        className="col-span-2 row-span-1 flex items-center justify-center"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}
      >
        <div
          ref={cardDivRef}
          className="p-0.5 w-full h-full bg-transparent rounded-xl shadow relative group"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image on hover, sharp otherwise */}
          <img
            src="/assets/SC Banner.jpg"
            alt="SC Banner"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">SPORTS COUNCIL IIITD BANNER</span>
          </div>
        </div>
      </div>
    );
  }
  // Skip B (1)
  if (i === 1) return null;
// AMG
  if (i === 2) {
    const active = activeCardIndex === 2;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 2 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(2);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="C" className="p-0.5 col-span-1 row-span-1 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image when popped out, sharp otherwise */}
          <img
            src="/assets/AMG3.jpg"
            alt="AMG3"
            className={`absolute inset-0 w-full h-full object-cover object-bottom rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">SLS AMG Poster</span>
          </div>
        </div>
      </div>
    );
  }
//DREAMLIKE
  if (i === 5) {
    const active = activeCardIndex === 5;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 5 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(5);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="F-L-vertical" className="p-0.5 col-span-1 row-span-2 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred video when popped out, sharp otherwise */}
          <video
            src="/assets/VIDEOS/dreamlike.mp4"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">DREAMLIKE.mp4</span>
          </div>
        </div>
      </div>
    );
  }
//INFORM A TRUSTED ADULT
  if (i === 16) {
    const active = activeCardIndex === 16;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 16 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(16);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="Q" className="p-0.5 col-span-1 row-span-1 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image when popped out, sharp otherwise */}
          <img
            src="/assets/Instagram_post_16.jpg"
            alt="Instagram Post 16"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg text-center">INFORM A TRUSTED ADULT Poster</span>
          </div>
        </div>
      </div>
    );
  }
//TWO TREY
  if (i === 10) {
    const active = activeCardIndex === 10;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 10 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(10);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="K" className="p-0.5 col-span-1 row-span-1 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image when popped out, sharp otherwise */}
          <img
            src="/assets/STELLER INC./Poster2.jpg"
            alt="Poster2"
            className={`absolute inset-0 w-full h-full object-cover object-[center_70%] rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">STELLAR INC. Rebrand</span>
          </div>
        </div>
      </div>
    );
  }
  // Skip L (11)
  if (i === 11) return null;
 //JE T'AIME
  if (i === 13) {
    const active = activeCardIndex === 13;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 13 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(13);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="N" className="p-0.5 col-span-1 row-span-1 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image when popped out, sharp otherwise */}
          <img
            src="/assets/je_taime_4-01.jpg"
            alt="je t'aime 4-01"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">JE T'AIME Poster</span>
          </div>
        </div>
      </div>
    );
  }
 // CHERRAPUNJI
  if (i === 6) {
    const active = activeCardIndex === 6;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 6 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(6);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="G-M-vertical" className="p-0.5 col-span-1 row-span-2 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred video when popped out, sharp otherwise */}
          <video
            src="/assets/VIDEOS/Cherrapunji_3.mp4"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">CHERRAPUNJI.mp4</span>
          </div>
        </div>
      </div>
    );
  }
  if (i === 7) return null;
// THE ROOM
  if (i === 8) {
    const active = activeCardIndex === 8;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    // Allow clicking anywhere (even on the card) to deactivate
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(8);
      // else: let section's onClick handle deactivation
    };
    // Watch for deactivation to trigger isAnimating
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 8 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    return (
      <div
        key="I-big-3d-persp"
        className={`col-span-2 row-span-2 aspect-square flex items-center justify-center`}
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}
      >
        <div
          ref={cardDivRef}
          className={`p-0.5 w-full h-full bg-transparent rounded-xl shadow relative group`}
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image on hover, sharp otherwise */}
          <img
            src="/assets/TITLE SCREEN.png"
            alt="Title Screen"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">THE ROOM.mp4</span>
          </div>
        </div>
      </div>
    );
  }
 // Skip J (9), O (14), P (15)
  if ([9, 14, 15].includes(i)) return null;
// ROSHNARA
  if (i === 21) {
    const active = activeCardIndex === 21;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 21 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(21);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="V-W-horizontal" className="p-0.5 col-span-2 row-span-1 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred video when popped out, sharp otherwise */}
          <video
            src="/assets/VIDEOS/ROSHNARA.mp4"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">ROSHNARA.mp4</span>
          </div>
        </div>
      </div>
    );
  }
  // Skip W (22)
  if (i === 22) return null;
  // Label cards, skip A, B, F, L, G, M, V, W, I (handled above)
  const label = String.fromCharCode(65 + i);
  //LAFLAME
  if (i === 18) {
    const active = activeCardIndex === 18;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 18 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(18);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="S" className="p-0.5 col-span-1 row-span-1 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image when popped out, sharp otherwise */}
          <img
            src="/assets/laflame2 1.png"
            alt="laflame2 1"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">LAFLAME Poster</span>
          </div>
        </div>
      </div>
    );
  }
  //PORSCHE 962
  if (i === 4) {
    // ... (rest of the code remains the same)
    const active = activeCardIndex === 4;
    const [isAnimating, setIsAnimating] = React.useState(false);
    // Mouse-follow tilt effect
    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
    const tiltRef = React.useRef(tilt);
    tiltRef.current = tilt;
    // Handle z-index for pop-in animation
    React.useEffect(() => {
      if (!active && isAnimating) {
        const timeout = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timeout);
      }
    }, [active, isAnimating]);
    // When deactivating, start animation
    React.useEffect(() => {
      if (!active && activeCardIndex !== 4 && !isAnimating) {
        setIsAnimating(true);
      }
    }, [active, activeCardIndex, isAnimating]);
    // Smoothly reset tilt on deactivate
    React.useEffect(() => {
      if (!active) setTilt({ x: 0, y: 0 });
    }, [active]);
    // Global mouse move handler for 3D tilt
    const cardDivRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!active) return;
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const card = cardDivRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Calculate relative to center, range [-1, 1]
        const relX = (x - centerX) / centerX;
        const relY = (y - centerY) / centerY;
        // Max tilt angle (deg)
        const maxTilt = 10;
        setTilt({
          x: -relY * maxTilt, // rotateX (inverted for natural 3D)
          y: relX * maxTilt  // rotateY
        });
      };
      window.addEventListener('mousemove', handleGlobalMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        setTilt({ x: 0, y: 0 });
      };
    }, [active]);
    const handleCardClick = () => {
      // Play sound effect before animation
      if (cardClickAudio.current) {
        cardClickAudio.current.currentTime = 0;
        cardClickAudio.current.play();
      }
      if (activeCardIndex === null) setActiveCardIndex(4);
      // else: let section's onClick handle deactivation
    };
    return (
      <div key="E" className="p-0.5 col-span-1 row-span-1 bg-transparent rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square  relative group cursor-pointer"
        style={{ perspective: '800px', zIndex: active ? 1100 : isAnimating ? 1050 : 1 }}>
        <div
          ref={cardDivRef}
          className="w-full h-full relative group rounded-xl"
          style={{
            minWidth: 0,
            minHeight: 0,
            transform: active
              ? `translateZ(64px) scale(1.08) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'none',
            transition: 'transform 0.12s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 2px 8px 2px rgba(0,0,0,0.12), 0 0 24px 6px rgba(255,255,255,0.12)',
            pointerEvents: (active || isAnimating) ? 'auto' : undefined,
            zIndex: (active || isAnimating) ? 1000 : undefined,
            cursor: 'pointer'
          }}
          onClick={handleCardClick}
        >
          {/* Inner glow effect on hover */}
          <div className="absolute inset-0 rounded-xl pointer-events-none z-20 transition duration-200 group-hover:opacity-100 opacity-0" style={{ boxShadow: 'inset 0 0 18px 4px rgba(255,255,255,0.22)', filter: 'blur(1.5px)' }} />
          {/* Outer glow (optional, can keep for parity) */}
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200 group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] z-10" />
          {/* Blurred image when popped out, sharp otherwise */}
          <img
            src="/assets/962 - 1 1.png"
            alt="962 - 1 1"
            className={`absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200${active ? ' blur-sm' : ''}`}
            draggable={false}
          />
          {/* Overlay label, visible only when popped out */}
          <div className={`absolute inset-0 flex items-center justify-center transition duration-200 bg-black/30 rounded-xl z-20${active ? ' opacity-100' : ' opacity-0'}`}>
            <span className="text-white text-2xl font-semibold drop-shadow-lg">PORSCHE 962 Poster</span>
          </div>
        </div>
      </div>
    );
  }


    })}
    </div>
  </section>
  );
}
