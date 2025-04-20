import React, { useRef, useState } from "react";

interface PixelatedTextProps {
  text: string;
  className?: string;
}

const PixelatedText: React.FC<PixelatedTextProps> = ({ text, className }) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const rect = spanRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
    const rotateY = ((x - centerX) / centerX) * 10;
    setStyle({
      transform: `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: 'transform 0.1s',
      fontFamily: 'monospace',
      fontSize: '2.5rem',
      letterSpacing: '0.12em',
      textShadow: `0 1px 0 #222, 1px 0 0 #222, 1px 1px 0 #222, -1px 0 0 #222, 0 -1px 0 #222, -1px -1px 0 #222`,
      color: '#fff',
      filter: 'contrast(2) blur(0.5px)',
      userSelect: 'none',
      cursor: 'pointer',
      perspective: '500px',
      ...style,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s',
      fontFamily: 'monospace',
      fontSize: '2.5rem',
      letterSpacing: '0.12em',
      textShadow: `0 1px 0 #222, 1px 0 0 #222, 1px 1px 0 #222, -1px 0 0 #222, 0 -1px 0 #222, -1px -1px 0 #222`,
      color: '#fff',
      filter: 'contrast(2) blur(0.5px)',
      userSelect: 'none',
      cursor: 'pointer',
      perspective: '500px',
    });
  };

  return (
    <span
      ref={spanRef}
      className={`pixelated-text ${className ?? ""}`.trim()}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </span>
  );
};

export default PixelatedText;
