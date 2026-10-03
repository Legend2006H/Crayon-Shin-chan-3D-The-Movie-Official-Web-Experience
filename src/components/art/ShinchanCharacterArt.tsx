import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CharacterData } from '../../data/characters';
import { sounds } from '../../utils/audio';

interface Props {
  character: CharacterData;
  isCivilian?: boolean;
  className?: string;
  fromDirection?: 'left' | 'right' | 'bottom';
}

interface MangaBubble {
  id: number;
  text: string;
  subtext: string;
  x: number;
  y: number;
}

export const ShinchanCharacterArt: React.FC<Props> = ({
  character,
  isCivilian = false,
  className = '',
  fromDirection = 'left',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50 });
  const [bubbles, setBubbles] = useState<MangaBubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const speedlineCanvasRef = useRef<HTMLCanvasElement>(null);

  // Pick the right image
  const imgSrc =
    character.hasCivilianMode && !isCivilian && character.imageHero
      ? character.imageHero
      : character.imageCasual;

  const initialX = fromDirection === 'left' ? -60 : fromDirection === 'right' ? 60 : 0;
  const initialRotate = fromDirection === 'left' ? -3 : fromDirection === 'right' ? 3 : 0;

  // Authentic Manga Onomatopoeia by Character
  const getCharacterBubble = () => {
    switch (character.id) {
      case 'shinchan':
        return [
          { text: 'ほっほーい！', subtext: 'HOH-HOI!' },
          { text: 'おマタ〜！', subtext: 'O-MATA~!' },
          { text: 'オラ、しんのすけ！', subtext: "I'M SHINNOSUKE!" },
          { text: 'ぶりぶり〜！', subtext: 'BURI BURI~!' },
        ];
      case 'shiro':
        return [
          { text: 'ワフッ！', subtext: 'WOOF!' },
          { text: 'わたあめ！', subtext: 'COTTON CANDY!' },
          { text: 'クゥ〜ン', subtext: 'WHINE~' },
        ];
      case 'action-kamen':
        return [
          { text: 'アクション・ビーム！', subtext: 'ACTION BEAM!' },
          { text: 'ワッハッハ！', subtext: 'WA-HA-HA!' },
          { text: '正義は勝つ！', subtext: 'JUSTICE PREVAILS!' },
        ];
      case 'himawari':
        return [
          { text: 'たや〜！', subtext: 'TAYA~!' },
          { text: 'キラキラ〜！', subtext: 'SHINY JEWELS!' },
          { text: 'イケメン〜♡', subtext: 'HANDSOME GUY♡' },
        ];
      case 'buriburizaemon':
        return [
          { text: '救いのヒーロー！', subtext: 'HERO OF SALVATION!' },
          { text: '常に強い者の味方だ', subtext: 'I SIDE WITH THE STRONGEST' },
          { text: '助け賃は10億円', subtext: 'REWARD: 1 BILLION YEN' },
        ];
      case 'kazama':
        return [
          { text: 'しんのすけ、やめろ！', subtext: 'SHINNOSUKE STOP IT!' },
          { text: '僕はエリートだ！', subtext: "I'M AN ELITE STUDENT!" },
          { text: 'もえP可愛い…', subtext: 'MOE-P IS CUTE...' },
        ];
      default:
        return [{ text: 'ドヤッ！', subtext: 'TA-DA!' }];
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Calculate 3D card tilt angles (max +- 14 degrees)
    const rx = ((y / rect.height) - 0.5) * -16;
    const ry = ((x / rect.width) - 0.5) * 16;

    setTilt({ rx, ry, px, py });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0, px: 50, py: 50 });
  };

  // Click character to spawn comic pop balloon & play sound
  const handleClickCharacter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pool = getCharacterBubble();
    const pick = pool[Math.floor(Math.random() * pool.length)];

    if (character.id === 'shinchan') sounds.playShinchanGiggle();
    else if (character.id === 'shiro') sounds.playShiroBark();
    else if (character.id === 'action-kamen') sounds.playActionBeam();
    else sounds.playPop();

    const newBubble: MangaBubble = {
      id: Date.now() + Math.random(),
      text: pick.text,
      subtext: pick.subtext,
      x: Math.max(40, Math.min(rect.width - 40, x)),
      y: Math.max(30, Math.min(rect.height - 30, y)),
    };

    setBubbles((prev) => [...prev.slice(-3), newBubble]);

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
    }, 1800);
  };

  // Draw Manga Action Speedlines (集中線) when hovered
  useEffect(() => {
    const canvas = speedlineCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const w = (canvas.width = 400);
    const h = (canvas.height = 400);
    const cx = w / 2;
    const cy = h / 2;

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      if (isHovered) {
        ctx.fillStyle = character.civilianColor || '#ef4444';
        ctx.globalAlpha = 0.08;

        const lineCount = 36;
        const timeOffset = Date.now() * 0.002;

        for (let i = 0; i < lineCount; i++) {
          const angle = (i / lineCount) * Math.PI * 2 + (Math.sin(timeOffset + i) * 0.02);
          const length = 180 + Math.sin(timeOffset * 3 + i) * 20;
          const innerR = 75;

          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle - 0.03) * length, cy + Math.sin(angle - 0.03) * length);
          ctx.lineTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
          ctx.lineTo(cx + Math.cos(angle + 0.03) * length, cy + Math.sin(angle + 0.03) * length);
          ctx.closePath();
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isHovered, character.civilianColor]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      onClick={handleClickCharacter}
      style={{ perspective: 1000 }}
      className={`relative flex flex-col items-center justify-center select-none pt-2 sm:pt-4 pb-2 cursor-pointer group ${className}`}
      title="Click to interact & trigger voice soundbite!"
    >
      {/* Dynamic Manga Speedlines Canvas in Background */}
      <canvas
        ref={speedlineCanvasRef}
        width={400}
        height={400}
        className={`absolute -top-6 w-[280px] sm:w-[380px] md:w-[440px] h-[280px] sm:h-[380px] md:h-[440px] pointer-events-none transition-opacity duration-500 z-0 ${
          isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
        }`}
      />

      {/* Dynamic Ambient Glow Behind Character */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.35 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-2xl sm:blur-3xl -z-10 pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: isCivilian ? character.civilianColor : character.heroColor,
          transform: isHovered
            ? `translate(${(tilt.px - 50) * 0.4}px, ${(tilt.py - 50) * 0.4}px) scale(1.15)`
            : undefined,
        }}
      />

      {/* 3D Tilted Cartoon Cutout Container */}
      <motion.div
        key={`${character.id}-${isCivilian ? 'civ' : 'hero'}`}
        initial={{
          x: initialX,
          opacity: 0,
          scale: 0.92,
          rotate: initialRotate,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 16,
          mass: 0.9,
        }}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.04)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative z-10 flex items-center justify-center"
      >
        {/* Holographic foil gloss sheen overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-20"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(255,255,255,0.7) 0%, rgba(254,240,138,0.2) 40%, transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />

        <img
          src={imgSrc}
          alt={character.name}
          fetchPriority="high"
          draggable={false}
          className={`max-h-[260px] sm:max-h-[380px] md:max-h-[480px] w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition-all duration-300 ${
            isHovered
              ? 'drop-shadow-[0_24px_36px_rgba(0,0,0,0.32)] -translate-y-1'
              : 'translate-y-0'
          }`}
        />

        {/* Japanese Manga Floating Onomatopoeia Speech Bubbles */}
        <AnimatePresence>
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              initial={{ scale: 0, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: -25 }}
              exit={{ scale: 0.7, opacity: 0, y: -45 }}
              transition={{ type: 'spring', stiffness: 220, damping: 15 }}
              style={{
                left: b.x,
                top: b.y,
                transform: 'translate(-50%, -100%)',
              }}
              className="absolute z-30 pointer-events-none"
            >
              <div className="bg-amber-300 border-2 border-neutral-900 px-3 py-1.5 rounded-xl shadow-[4px_4px_0px_#171717] flex flex-col items-center">
                <span className="font-jp font-black text-xs sm:text-sm text-neutral-900 whitespace-nowrap">
                  {b.text}
                </span>
                <span className="font-mono font-bold text-[8px] text-neutral-800 tracking-wider">
                  {b.subtext}
                </span>
                {/* Comic speech triangle pointer */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-neutral-900 -mb-2 mt-0.5" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Realistic 3D Ground Shadow Oval that settles synchronously */}
      <motion.div
        initial={{ scaleX: 0.3, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.35 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-40 sm:w-56 md:w-64 h-4 sm:h-6 rounded-[100%] bg-neutral-900/30 blur-md -mt-2 sm:-mt-4 transition-all duration-300"
        style={{
          transform: isHovered
            ? `translate(${(tilt.px - 50) * -0.2}px, 6px) scale(${1 - Math.abs(tilt.rx) * 0.01})`
            : undefined,
          opacity: isHovered ? 0.25 : undefined,
        }}
      />
    </div>
  );
};
