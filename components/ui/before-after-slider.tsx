"use client";
import { useRef, useState, useCallback, useEffect } from "react";
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
    if (!rect) return;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(pos, 2), 98));
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => { if (isDragging) getPos(e.clientX); },
    [isDragging, getPos]
  );
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => { getPos(e.touches[0].clientX); },
    [getPos]
  );

  useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl cursor-col-resize select-none border border-neutral-100",
        className
      )}
      style={{ aspectRatio: "16/9" }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After image — base layer, full width */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover object-top"
        draggable={false}
      />

      {/* Before image — clipped to sliderPos% width */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 h-full object-cover object-top"
          style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white z-10"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border border-neutral-200"
        style={{ left: `${sliderPos}%` }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M5 8L2 5M2 5L5 2M2 5H14M11 8L14 5M14 5L11 2M14 5H2"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Before label */}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="text-[10px] tracking-[0.15em] uppercase bg-white/90 text-[#0a0a0a] px-2.5 py-1 rounded-full font-medium">
          {beforeLabel}
        </span>
      </div>

      {/* After label */}
      <div className="absolute bottom-4 right-4 z-10">
        <span className="text-[10px] tracking-[0.15em] uppercase bg-[#0a0a0a]/80 text-white px-2.5 py-1 rounded-full font-medium">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
