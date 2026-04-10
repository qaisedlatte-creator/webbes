"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const getPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return (x / rect.width) * 100;
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setSliderPos(getPos(e.clientX));
  }, [getPos]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setSliderPos(getPos(e.clientX));
  }, [isDragging, getPos]);

  const onMouseUp = useCallback(() => setIsDragging(false), []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setSliderPos(getPos(e.touches[0].clientX));
  }, [getPos]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    setSliderPos(getPos(e.touches[0].clientX));
  }, [isDragging, getPos]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden select-none rounded-2xl cursor-col-resize", className)}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseUp}
    >
      {/* After (full width, base layer) */}
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image src={afterImage} alt={afterLabel} fill className="object-cover object-top" draggable={false} />
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image src={beforeImage} alt={beforeLabel} fill className="object-cover object-top" draggable={false} />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translate(-50%, -50%)" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10H14M6 10L8.5 7.5M6 10L8.5 12.5M14 10L11.5 7.5M14 10L11.5 12.5" stroke="#1A1209" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full pointer-events-none tracking-wide uppercase">
        {beforeLabel}
      </div>
      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full pointer-events-none tracking-wide uppercase">
        {afterLabel}
      </div>
    </div>
  );
}
