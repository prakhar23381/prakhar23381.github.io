import React from "react";

// This will be your alternative projects section. You can customize the layout and content as you go!
export default function AltProjectsSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="grid grid-cols-6 grid-rows-4 gap-1.5 w-full max-w-full">
        {/* Example cards with varying sizes */}
        {[...Array(24)].map((_, i) => {
  // Combine A and B into a horizontal rectangle at position 0
  if (i === 0) {
    return (
      <div key="A-B-horizontal" className="col-span-2 row-span-1 bg-white rounded-xl shadow flex items-center justify-center overflow-hidden relative">
        <img 
          src="/assets/TITLE SCREEN.png" 
          alt="Title Screen" 
          className="absolute inset-0 w-full h-full object-cover rounded-xl" 
          draggable={false}
        />
      </div>
    );
  }
  // Skip B (1)
  if (i === 1) return null;
  // Combine F and L into a vertical rectangle at position 5
  if (i === 5) {
    return (
      <div key="F-L-vertical" className="col-span-1 row-span-2 bg-white rounded-xl shadow flex items-center justify-center text-3xl font-bold text-gray-700">
        F
      </div>
    );
  }
  // Skip L (11)
  if (i === 11) return null;
  // Combine G and M into a vertical rectangle at position 6
  if (i === 6) {
    return (
      <div key="G-M-vertical" className="col-span-1 row-span-2 bg-white rounded-xl shadow flex items-center justify-center text-3xl font-bold text-gray-700">
        G
      </div>
    );
  }
  // Skip M (12)
  if (i === 12) return null;
  // Combine I, J, O, P into one big square at position 8
  if (i === 8) {
    return (
      <div key="I-big" className="col-span-2 row-span-2 bg-white rounded-xl shadow flex items-center justify-center text-3xl font-bold text-gray-700 aspect-square">
        I
      </div>
    );
  }
  // Skip J (9), O (14), P (15)
  if ([9, 14, 15].includes(i)) return null;
  // Combine V and W into a horizontal rectangle at position 21
  if (i === 21) {
    return (
      <div key="V-W-horizontal" className="col-span-2 row-span-1 bg-white rounded-xl shadow flex items-center justify-center text-3xl font-bold text-gray-700">
        V
      </div>
    );
  }
  // Skip W (22)
  if (i === 22) return null;
  // Label cards, skip A, B, F, L, G, M, V, W, I (handled above)
  const label = String.fromCharCode(65 + i);
  return (
    <div key={label} className="col-span-1 row-span-1 bg-white rounded-xl shadow flex items-center justify-center text-xl text-gray-700 aspect-square">
      {label}
    </div>
  );
})}
      </div>
    </section>
  );
}
