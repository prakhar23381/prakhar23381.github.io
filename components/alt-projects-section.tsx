import React from "react";

// This will be your alternative projects section. You can customize the layout and content as you go!
export default function AltProjectsSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="grid grid-cols-6 grid-rows-4 gap-1.5 w-[98%] max-w-[98%]">
        {/* Example cards with varying sizes */}
        {[...Array(24)].map((_, i) => {
  // Combine A and B into a horizontal rectangle at position 0
  if (i === 0) {
    return (
      <div key="A-B-horizontal" className="p-0.5 col-span-2 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 overflow-hidden relative group cursor-pointer">
        <img 
          src="/assets/SC Banner.jpg" 
          alt="SC Banner" 
          className="absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200 group-hover:blur-sm" 
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project A</span>
        </div>
      </div>
    );
  }
  // Skip B (1)
  if (i === 1) return null;
  // Display LPP5.jpg on card D (i === 3)
  if (i === 3) {
    return (
      <div key="D" className="p-0.5 col-span-1 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square overflow-hidden relative group cursor-pointer">
        <img 
          src="/assets/LPP5_TITLE.jpg" 
          alt="LPP5 TITLE" 
          className="absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200 group-hover:blur-sm" 
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project D</span>
        </div>
      </div>
    );
  }
// Display AMG3.jpg on card C (i === 2)
  if (i === 2) {
    return (
      <div key="C" className="p-0.5 col-span-1 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square overflow-hidden relative group cursor-pointer">
        <img 
          src="/assets/AMG3.jpg" 
          alt="AMG3" 
          className="absolute inset-0 w-full h-full object-cover object-bottom rounded-xl transition duration-200 group-hover:blur-sm" 
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project C</span>
        </div>
      </div>
    );
  }
// Combine F and L into a vertical rectangle at position 5
  if (i === 5) {
    return (
      <div key="F-L-vertical" className="p-0.5 col-span-1 row-span-2 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 overflow-hidden relative group cursor-pointer">
        <span className="text-3xl font-bold text-gray-700 transition duration-200 group-hover:blur-sm">F</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project F</span>
        </div>
      </div>
    );
  }
  // Add Poster2 asset to card K (i === 10)
  if (i === 10) {
    return (
      <div key="K" className="p-0.5 col-span-1 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square overflow-hidden relative group cursor-pointer">
        <img 
          src="/assets/STELLER INC./Poster2.jpg" 
          alt="Poster2" 
          className="absolute inset-0 w-full h-full object-cover object-[center_70%] rounded-xl transition duration-200 group-hover:blur-sm" 
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project K</span>
        </div>
      </div>
    );
  }
  // Skip L (11)
  if (i === 11) return null;
  // Display je t'aime 4-01.jpg on card N (i === 13)
  if (i === 13) {
    return (
      <div key="N" className="p-0.5 col-span-1 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square overflow-hidden relative group cursor-pointer">
        <img 
          src="/assets/je_taime_4-01.jpg" 
          alt="je t'aime 4-01" 
          className="absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200 group-hover:blur-sm" 
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project N</span>
        </div>
      </div>
    );
  }
// Combine G and M into a vertical rectangle at position 6
  if (i === 6) {
    return (
      <div key="G-M-vertical" className="p-0.5 col-span-1 row-span-2 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 overflow-hidden relative group cursor-pointer">
        <span className="text-3xl font-bold text-gray-700 transition duration-200 group-hover:blur-sm">G</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project G</span>
        </div>
      </div>
    );
  }
  // Skip M (12)
  if (i === 12) return null;
  // Combine I, J, O, P into one big square at position 8
  if (i === 8) {
    return (
      <div key="I-big" className="p-0.5 col-span-2 row-span-2 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square overflow-hidden relative group cursor-pointer">
        <img 
          src="/assets/TITLE SCREEN.png" 
          alt="Title Screen" 
          className="absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200 group-hover:blur-sm" 
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project I</span>
        </div>
      </div>
    );
  }
  // Skip J (9), O (14), P (15)
  if ([9, 14, 15].includes(i)) return null;
  // Combine V and W into a horizontal rectangle at position 21
  if (i === 21) {
    return (
      <div key="V-W-horizontal" className="p-0.5 col-span-2 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 overflow-hidden relative group cursor-pointer">
        <span className="text-3xl font-bold text-gray-700 transition duration-200 group-hover:blur-sm">V</span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">Project V</span>
        </div>
      </div>
    );
  }
  // Skip W (22)
  if (i === 22) return null;
  // Label cards, skip A, B, F, L, G, M, V, W, I (handled above)
  const label = String.fromCharCode(65 + i);
  // Card K (i === 10): Show STELLER INC. asset
  if (i === 10) {
    return (
      <div key="K" className="p-0.5 col-span-1 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square overflow-hidden relative group cursor-pointer">
        <img
          src="/assets/STELLER INC./Poster1.jpg"
          alt="STELLER INC. Poster1"
          className="absolute inset-0 w-full h-full object-cover rounded-xl transition duration-200 group-hover:blur-sm"
          draggable={false}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
          <span className="text-white text-2xl font-semibold drop-shadow-lg">STELLER INC.</span>
        </div>
      </div>
    );
  }
  return (
    <div key={label} className="p-0.5 col-span-1 row-span-1 bg-white rounded-xl shadow flex items-center justify-center group-hover:shadow-[0_0_24px_6px_rgba(255,255,255,0.22)] transition-shadow duration-200 aspect-square overflow-hidden relative group cursor-pointer">
      <span className="text-xl text-gray-700 transition duration-200 group-hover:blur-sm">{label}</span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30 rounded-xl">
        <span className="text-white text-2xl font-semibold drop-shadow-lg">Project {label}</span>
      </div>
    </div>
  );
})}
      </div>
    </section>
  );
}
