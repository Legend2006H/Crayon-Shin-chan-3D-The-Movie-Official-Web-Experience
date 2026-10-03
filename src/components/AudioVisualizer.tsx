import React, { useEffect, useRef } from 'react';
import { sounds } from '../utils/audio';

interface Props {
  className?: string;
  height?: number;
  width?: number;
}

export const AudioVisualizer: React.FC<Props> = ({
  className = '',
  height = 24,
  width = 72,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(32);

    const render = () => {
      animFrameId.current = requestAnimationFrame(render);

      ctx.clearRect(0, 0, width, height);

      if (sounds.analyser && sounds.enabled) {
        // Read byte frequency data
        sounds.analyser.getByteFrequencyData(dataArray);

        const barWidth = width / 12;
        let x = 0;

        for (let i = 0; i < 12; i++) {
          // Average a few frequency bins
          const val = dataArray[i * 2] || 0;
          const barHeight = Math.max(2, (val / 255) * height);

          // Neon gradient from amber to crimson
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#dc2626');
          gradient.addColorStop(0.6, '#f59e0b');
          gradient.addColorStop(1, '#fef08a');

          ctx.fillStyle = gradient;
          // Centered vertical bars
          const y = (height - barHeight) / 2;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth - 2, barHeight, 1.5);
          ctx.fill();

          x += barWidth;
        }
      } else {
        // Idle gentle waveform pulse
        const time = Date.now() * 0.003;
        const barWidth = width / 12;
        let x = 0;

        for (let i = 0; i < 12; i++) {
          const barHeight = 2 + Math.sin(time + i * 0.5) * 2;
          ctx.fillStyle = '#737373';
          const y = (height - barHeight) / 2;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth - 2, barHeight, 1);
          ctx.fill();
          x += barWidth;
        }
      }
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [height, width]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`select-none pointer-events-none ${className}`}
      title="Web Audio Synthesizer Oscilloscope"
    />
  );
};
