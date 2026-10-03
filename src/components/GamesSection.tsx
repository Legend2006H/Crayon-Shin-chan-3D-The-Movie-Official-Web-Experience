import React, { useState, useEffect, useRef } from 'react';
import { MINI_GAMES } from '../data/characters';
import { ShinchanCharacterArt } from './art/ShinchanCharacterArt';
import { CHARACTERS } from '../data/characters';
import { sounds } from '../utils/audio';

interface Props {
  onBackToCharacters: () => void;
}

interface ParticleEffect {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface FloatingScore {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
}

export const GamesSection: React.FC<Props> = ({ onBackToCharacters }) => {
  const [activeGameIdx, setActiveGameIdx] = useState(0);
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  // Chocobi Catch Minigame State
  const [shinchanX, setShinchanX] = useState(50); // percentage 0 - 100
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [crtMode, setCrtMode] = useState(true);
  const [screenShake, setScreenShake] = useState(false);
  const [items, setItems] = useState<
    { id: number; x: number; y: number; type: 'chocobi' | 'pepper' | 'star'; speed: number }[]
  >([]);
  const [gameOver, setGameOver] = useState(false);

  const currentGame = MINI_GAMES[activeGameIdx];
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasFxRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleEffect[]>([]);
  const floatScoresRef = useRef<FloatingScore[]>([]);
  const fxAnimFrameRef = useRef<number | null>(null);

  const handleNextGame = () => {
    sounds.playBlip(520);
    setActiveGameIdx((prev) => (prev + 1) % MINI_GAMES.length);
  };

  const handlePrevGame = () => {
    sounds.playBlip(480);
    setActiveGameIdx((prev) => (prev - 1 + MINI_GAMES.length) % MINI_GAMES.length);
  };

  const handleStartGame = () => {
    sounds.playShinchanGiggle();
    setIsPlayingGame(true);
    setScore(0);
    setLives(3);
    setCombo(0);
    setItems([]);
    setGameOver(false);
  };

  // Spawn particle burst on catch
  const spawnCatchParticles = (xPct: number, yPct: number, color: string, count = 12) => {
    const canvas = canvasFxRef.current;
    if (!canvas) return;
    const px = (xPct / 100) * canvas.width;
    const py = (yPct / 100) * canvas.height;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      particlesRef.current.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 5 + 3,
        color,
        alpha: 1,
      });
    }
  };

  const spawnFloatingScore = (xPct: number, yPct: number, text: string, color: string) => {
    const canvas = canvasFxRef.current;
    if (!canvas) return;
    const px = (xPct / 100) * canvas.width;
    const py = (yPct / 100) * canvas.height;

    floatScoresRef.current.push({
      id: Date.now() + Math.random(),
      text,
      x: px,
      y: py,
      color,
      alpha: 1,
    });
  };

  // Canvas FX animation loop
  useEffect(() => {
    if (!isPlayingGame) return;
    const canvas = canvasFxRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFx = () => {
      fxAnimFrameRef.current = requestAnimationFrame(renderFx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render & update particles
      const activeParticles: ParticleEffect[] = [];
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.alpha -= 0.03;
        p.size *= 0.96;

        if (p.alpha > 0.05 && p.size > 0.5) {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          activeParticles.push(p);
        }
      }
      particlesRef.current = activeParticles;

      // Render & update floating score popups
      const activeScores: FloatingScore[] = [];
      for (const fs of floatScoresRef.current) {
        fs.y -= 1.8;
        fs.alpha -= 0.025;

        if (fs.alpha > 0.05) {
          ctx.save();
          ctx.globalAlpha = fs.alpha;
          ctx.font = 'black 18px "Bebas Neue", sans-serif';
          ctx.fillStyle = fs.color;
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 3;
          ctx.strokeText(fs.text, fs.x, fs.y);
          ctx.fillText(fs.text, fs.x, fs.y);
          ctx.restore();
          activeScores.push(fs);
        }
      }
      floatScoresRef.current = activeScores;
    };

    renderFx();

    return () => {
      if (fxAnimFrameRef.current) cancelAnimationFrame(fxAnimFrameRef.current);
    };
  }, [isPlayingGame]);

  // Minigame loop
  useEffect(() => {
    if (!isPlayingGame || gameOver) return;

    // Spawning items
    const spawnTimer = setInterval(() => {
      setItems((prev) => {
        if (prev.length > 8) return prev;
        const rand = Math.random();
        const type = rand > 0.35 ? 'chocobi' : rand > 0.18 ? 'pepper' : 'star';
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10,
            y: 0,
            type,
            speed: Math.random() * 1.5 + 2.2,
          },
        ];
      });
    }, 650);

    // Movement & Collision timer
    const moveTimer = setInterval(() => {
      setItems((prev) => {
        const next: typeof prev = [];
        prev.forEach((item) => {
          const nextY = item.y + item.speed;

          // Check collision with Shinchan (around y = 80% to 92%)
          if (nextY >= 80 && nextY <= 92 && Math.abs(item.x - shinchanX) < 14) {
            if (item.type === 'chocobi') {
              sounds.playBlip(720);
              setCombo((c) => {
                const nextCombo = c + 1;
                const bonus = nextCombo >= 5 ? 20 : 10;
                setScore((s) => s + bonus);
                spawnCatchParticles(item.x, item.y, '#f59e0b', 10);
                spawnFloatingScore(
                  item.x,
                  item.y,
                  nextCombo >= 5 ? `+${bonus} FEVER x${nextCombo}!` : `+${bonus}`,
                  '#fde047'
                );
                return nextCombo;
              });
            } else if (item.type === 'star') {
              sounds.playActionBeam();
              setScore((s) => s + 35);
              spawnCatchParticles(item.x, item.y, '#38bdf8', 18);
              spawnFloatingScore(item.x, item.y, '+35 ACTION STAR!', '#38bdf8');
            } else if (item.type === 'pepper') {
              sounds.playBlip(200);
              setCombo(0);
              setScreenShake(true);
              setTimeout(() => setScreenShake(false), 350);
              spawnCatchParticles(item.x, item.y, '#ef4444', 12);
              spawnFloatingScore(item.x, item.y, 'OW! PEPPER! -1 HP', '#ef4444');
              setLives((l) => {
                const nextL = l - 1;
                if (nextL <= 0) setGameOver(true);
                return nextL;
              });
            }
            return; // Item caught!
          }

          // Out of screen bottom
          if (nextY > 100) {
            if (item.type === 'chocobi') {
              setCombo(0); // Missed resets combo streak
            }
            return;
          }

          next.push({ ...item, y: nextY });
        });
        return next;
      });
    }, 45);

    return () => {
      clearInterval(spawnTimer);
      clearInterval(moveTimer);
    };
  }, [isPlayingGame, gameOver, shinchanX]);

  // Handle keyboard arrow keys
  useEffect(() => {
    if (!isPlayingGame || gameOver) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setShinchanX((x) => Math.max(8, x - 7));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setShinchanX((x) => Math.min(92, x + 7));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isPlayingGame, gameOver]);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    setShinchanX(Math.max(8, Math.min(92, xPct)));
  };

  // Handle touch movement on mobile screens
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const xPct = ((touch.clientX - rect.left) / rect.width) * 100;
    setShinchanX(Math.max(8, Math.min(92, xPct)));
  };

  const shinchanChar = CHARACTERS[0];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 py-6 select-none overflow-hidden">
      <div className="absolute inset-0 bg-neutral-100/60 dark:bg-neutral-950/80 pointer-events-none transition-colors duration-300" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Shinchan 3D Cutout */}
        <div className="hidden lg:flex w-1/3 flex-col items-center justify-end">
          <ShinchanCharacterArt character={shinchanChar} isCivilian={true} className="scale-90" />
          <button
            type="button"
            onClick={onBackToCharacters}
            className="mt-3 text-xs font-black text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>←</span>
            <span>BACK TO CHARACTERS</span>
          </button>
        </div>

        {/* Center / Right: Games Showcase Deck */}
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          {!isPlayingGame ? (
            /* GAME SELECTION CARD */
            <div className="w-full max-w-md bg-white/95 dark:bg-neutral-900/95 border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-xl p-5 flex flex-col items-center text-center transition-colors duration-300">
              <div className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-widest font-sans">
                KASUKABE ARCADE
              </div>
              <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 font-mono mb-4">
                GAME {activeGameIdx + 1} OF {MINI_GAMES.length}
              </div>

              {/* Game Card Preview Box */}
              <div className="relative w-full aspect-16/10 bg-neutral-900 rounded-lg overflow-hidden shadow-inner group border border-neutral-300 dark:border-neutral-700">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-900 text-white">
                  {/* Chocobi / Action Kamen Artwork */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl animate-bounce">🐊 ⭐ 🍪</span>
                    <span className="text-lg font-black uppercase tracking-wider drop-shadow-md">
                      {currentGame.title}
                    </span>
                    <p className="text-xs text-white/90 max-w-xs text-center">
                      {currentGame.tagline}
                    </p>
                  </div>
                </div>

                {/* Bottom title bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-neutral-950/85 backdrop-blur-xs py-2 px-3 flex items-center justify-between border-t border-neutral-700">
                  <span className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white">
                    {currentGame.title}
                  </span>
                  <span className="text-[9px] font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-1.5 py-0.5 rounded">
                    {currentGame.badge}
                  </span>
                </div>
              </div>

              {/* Big Red Play Button */}
              <button
                type="button"
                onClick={handleStartGame}
                className="w-full mt-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-black tracking-widest text-xs sm:text-sm uppercase py-2.5 rounded shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                PLAY NOW
              </button>

              {/* Game Carousel Switcher */}
              <div className="mt-5 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                  SELECT A GAME TO PLAY
                </span>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrevGame}
                    className="w-7 h-7 rounded-full border border-neutral-400 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors bg-white dark:bg-neutral-800 shadow-xs cursor-pointer"
                    title="Previous Game"
                    aria-label="Previous Game"
                  >
                    ←
                  </button>

                  <div className="flex items-center gap-1.5">
                    {MINI_GAMES.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all ${
                          activeGameIdx === i ? 'bg-red-600 scale-125' : 'bg-neutral-300 dark:bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextGame}
                    className="w-7 h-7 rounded-full border border-neutral-400 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-white text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center transition-colors bg-white dark:bg-neutral-800 shadow-xs cursor-pointer"
                    title="Next Game"
                    aria-label="Next Game"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* PLAYABLE CHOCOBI BONANZA GAME CANVAS */
            <div
              className={`w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg shadow-2xl p-4 sm:p-5 flex flex-col gap-3 transition-all duration-300 ${
                screenShake ? 'translate-x-1 -translate-y-1' : ''
              }`}
            >
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <h3 className="text-sm sm:text-base font-black uppercase text-neutral-900 dark:text-white font-sans">
                    CHOCOBI BONANZA: CATCH THE SNACKS!
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {/* CRT Filter Toggle */}
                  <button
                    type="button"
                    onClick={() => setCrtMode(!crtMode)}
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      crtMode
                        ? 'bg-neutral-900 text-amber-300 border-neutral-800'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
                    }`}
                    title="Toggle Arcade CRT Scanline Shader"
                  >
                    CRT: {crtMode ? 'ON' : 'OFF'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlayingGame(false)}
                    className="text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-2 py-1 rounded cursor-pointer"
                  >
                    ✕ Exit
                  </button>
                </div>
              </div>

              {/* Game Stats Bar */}
              <div className="flex items-center justify-between px-2 text-xs font-bold font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-red-600 font-extrabold">SCORE: {score}</span>
                  {combo > 1 && (
                    <span className="px-2 py-0.5 rounded bg-amber-400 text-neutral-950 font-black text-[10px] animate-pulse">
                      COMBO x{combo}!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <span>LIVES:</span>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className="text-sm">
                      {i < lives ? '❤️' : '🖤'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Game Arena with Touch & Pointer Support */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouch}
                onTouchMove={handleTouch}
                style={{ touchAction: 'none' }}
                className="relative w-full aspect-16/10 bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 rounded-lg overflow-hidden border-2 border-neutral-800 shadow-inner cursor-crosshair select-none"
              >
                {/* Sun & Clouds */}
                <div className="absolute top-3 right-4 w-10 h-10 rounded-full bg-yellow-300/80 blur-xs pointer-events-none" />
                <div className="absolute top-3 sm:top-5 left-3 sm:left-8 bg-white/80 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] text-neutral-600 font-mono pointer-events-none">
                  <span className="hidden sm:inline">Move mouse or Left/Right keys</span>
                  <span className="sm:hidden">Drag finger or tap buttons below</span>
                </div>

                {/* Falling Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="absolute text-2xl -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 pointer-events-none"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  >
                    {item.type === 'chocobi' && (
                      <span title="Chocobi Box" className="drop-shadow">
                        🍪
                      </span>
                    )}
                    {item.type === 'star' && (
                      <span title="Action Star" className="drop-shadow animate-spin">
                        ⭐
                      </span>
                    )}
                    {item.type === 'pepper' && (
                      <span title="Green Pepper! Avoid!" className="drop-shadow">
                        🫑
                      </span>
                    )}
                  </div>
                ))}

                {/* Shin-chan Basket Catch Character */}
                <div
                  className="absolute bottom-2 -translate-x-1/2 flex flex-col items-center transition-all duration-75 pointer-events-none z-10"
                  style={{ left: `${shinchanX}%` }}
                >
                  {/* Catch Basket */}
                  <div className="w-14 h-4 bg-amber-700 border-2 border-amber-900 rounded-b-md shadow-md text-center text-[8px] font-bold text-white flex items-center justify-center">
                    CATCH!
                  </div>
                  {/* Shinchan Avatar */}
                  <img
                    src="/images/characters/shinchan_casual.png"
                    alt="Shinchan"
                    className="w-14 h-auto object-contain filter drop-shadow"
                  />
                </div>

                {/* Canvas Floating FX Layer (Particles & Floating Score) */}
                <canvas
                  ref={canvasFxRef}
                  width={560}
                  height={350}
                  className="absolute inset-0 w-full h-full pointer-events-none z-20"
                />

                {/* Retro CRT Scanline Shader Overlay */}
                {crtMode && (
                  <div
                    className="absolute inset-0 pointer-events-none z-25"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
                      backgroundSize: '100% 3px, 4px 100%',
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
                    }}
                  />
                )}

                {/* Game Over Screen */}
                {gameOver && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white z-30 animate-in fade-in">
                    <span className="text-3xl">😱</span>
                    <h4 className="text-xl font-black uppercase text-red-500 tracking-wider font-sans">
                      GAME OVER!
                    </h4>
                    <p className="text-sm font-bold font-mono">FINAL SCORE: {score}</p>
                    <button
                      type="button"
                      onClick={handleStartGame}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase px-5 py-2.5 rounded-lg shadow-lg transition-transform active:scale-95 cursor-pointer"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Dedicated On-Screen Touch Buttons */}
              <div className="flex sm:hidden items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    setShinchanX((x) => Math.max(8, x - 14));
                  }}
                  className="flex-1 py-3 bg-neutral-900 active:bg-neutral-800 text-white font-black text-xs uppercase rounded-lg shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer select-none"
                >
                  <span>◀</span>
                  <span>MOVE LEFT</span>
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    setShinchanX((x) => Math.min(92, x + 14));
                  }}
                  className="flex-1 py-3 bg-neutral-900 active:bg-neutral-800 text-white font-black text-xs uppercase rounded-lg shadow-md flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer select-none"
                >
                  <span>MOVE RIGHT</span>
                  <span>▶</span>
                </button>
              </div>

              {/* Instructions */}
              <div className="text-[10px] text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row items-center justify-between px-1 gap-1 text-center sm:text-left">
                <span>🍪 Chocobi = +10 pts • ⭐ Star = +35 pts • 🫑 Pepper = -1 Life</span>
                <span className="font-bold text-neutral-700 dark:text-neutral-300">Futaba Kindergarten Arcade</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
