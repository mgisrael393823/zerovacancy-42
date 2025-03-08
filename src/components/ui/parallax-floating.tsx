
"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FloatingElementProps = {
  depth?: number;
  className?: string;
  children: ReactNode;
};

export const FloatingElement: React.FC<FloatingElementProps> = ({
  depth = 1,
  className,
  children,
}) => {
  return (
    <div
      className={cn("absolute", className)}
      style={{ "--parallax-depth": depth } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

type FloatingProps = {
  sensitivity?: number;
  className?: string;
  children: ReactNode;
};

const Floating: React.FC<FloatingProps> = ({
  sensitivity = 0.1,
  className,
  children,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate position relative to center (ranges from -1 to 1)
    const relativeX = (e.clientX - centerX) / (rect.width / 2);
    const relativeY = (e.clientY - centerY) / (rect.height / 2);
    
    setPosition({
      x: relativeX * sensitivity,
      y: relativeY * sensitivity,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sensitivity]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const depth = (child.props as FloatingElementProps).depth || 1;
          
          return React.cloneElement(child, {
            style: {
              ...child.props.style,
              transform: `translate(${position.x * depth * 40}px, ${position.y * depth * 40}px)`,
              transition: 'transform 0.1s ease-out',
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default Floating;
