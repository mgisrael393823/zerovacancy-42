
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GrainifyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Grainify = ({ className, ...props }: GrainifyProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5;
        ctx.fillRect(x, y, size, size);
      }
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} width={200} height={200} className={cn("absolute inset-0 -z-[1] opacity-20 pointer-events-none", className)} {...props} />;
};

export default Grainify;
