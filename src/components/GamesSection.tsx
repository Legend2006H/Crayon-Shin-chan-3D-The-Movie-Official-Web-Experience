import React, { useState, useEffect, useRef } from 'react';
import { MINI_GAMES } from '../data/characters';
import { ShinchanCharacterArt } from './art/ShinchanCharacterArt';
import { CHARACTERS } from '../data/characters';
import { sounds } from '../utils/audio';

interface Props {
  onBackToCharacters: () => void;
}

export const GamesSection: React.FC<Props> = ({ onBackToCharacters }) => {
  const [activeGameIdx, setActiveGameIdx] = useState(0);
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  // Chocobi Catch Minigame State
  const [shinchanX, setShinchanX] = useState(50); // percentage 0 - 100
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState<
    { id: number; x: number; y: number; type: 'chocobi' | 'pepper' | 'star'; speed: number }[]
  >([]);
  const [gameOver, setGameOver] = useState(false);

  const currentGame = MINI_GAMES[activeGameIdx];
  const containerRef = useRef<HTMLDivElement>(null);

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
    setItems([]);
    setGameOver(false);
  };

  // Minigame loop
  useEffect(() => {
    if (!isPlayingGame || gameOver) return;

    // Spawning items
    const spawnTimer = setInterval(() => {
      setItems((prev) => {
        if (prev.length > 8) return prev;
        const rand = Math.random();
        const type = rand > 0.4 ? 'chocobi' : rand > 0.2 ? 'pepper' : 'star';
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10,
            y: 0,
            type,
            speed: Math.random() * 1.5 + 2,
          },
        ];
      });
    }, 700);

    // Movement & Collision timer
    const moveTimer = setInterval(() => {
      setItems((prev) => {
        const next: typeof prev = [];
        prev.forEach((item) => {
          const nextY = item.y + item.speed;

          // Check collision with Shinchan (around y = 82% to 92%)
          if (nextY >= 80 && nextY <= 92 && Math.abs(item.x - shinchanX) < 14) {
            if (item.type === 'chocobi') {
              sounds.playBlip(700);
              setScore((s) => s + 10);
            } else if (item.type === 'star') {
              sounds.playActionBeam();
              setScore((s) => s + 25);
            } else if (item.type === 'pepper') {
              sounds.playBlip(200);
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
              // Missed a snack
            }
            return;
          }

          next.push({ ...item, y: nextY });
        });
        return next;
      });
    }, 50);

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

  // Handle mouse / touch movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    setShinchanX(Math.max(8, Math.min(92, xPct)));
  };

  const shinchanChar = CHARACTERS[0];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 py-6 select-none overflow-hidden">
      <div className="absolute inset-0 bg-neutral-100/60 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Shinchan 3D Cutout */}
        <div className="hidden lg:flex w-1/3 flex-col items-center justify-end">
          <ShinchanCharacterArt character={shinchanChar} isCivilian={true} className="scale-90" />
          <button
            onClick={onBackToCharacters}
            className="mt-3 text-xs font-black text-neutral-600 hover:text-red-600 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span>←</span>
            <span>BACK TO CHARACTERS</span>
          </button>
        </div>

        {/* Center / Right: Games Showcase Deck */}
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          {!isPlayingGame ? (
            /* GAME SELECTION CARD */
            <div className="w-full max-w-md bg-white/95 border border-neutral-300 rounded-lg shadow-xl p-5 flex flex-col items-center text-center">
              <div className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-widest font-sans">
                KASUKABE ARCADE
              </div>
              <div className="text-xs font-bold text-neutral-500 font-mono mb-4">
                GAME {activeGameIdx + 1} OF {MINI_GAMES.length}
              </div>

              {/* Game Card Preview Box */}
              <div className="relative w-full aspect-16/10 bg-neutral-900 rounded-lg overflow-hidden shadow-inner group border border-neutral-300">
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
                onClick={handleStartGame}
                className="w-full mt-4 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-black tracking-widest text-xs sm:text-sm uppercase py-2.5 rounded shadow-lg transition-transform active:scale-98"
              >
                PLAY NOW
              </button>

              {/* Game Carousel Switcher */}
              <div className="mt-5 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                  SELECT A GAME TO PLAY
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevGame}
                    className="w-7 h-7 rounded-full border border-neutral-400 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-colors bg-white shadow-xs"
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
                          activeGameIdx === i ? 'bg-red-600 scale-125' : 'bg-neutral-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextGame}
                    className="w-7 h-7 rounded-full border border-neutral-400 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 flex items-center justify-center transition-colors bg-white shadow-xs"
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
            <div className="w-full max-w-xl bg-white border border-neutral-300 rounded-lg shadow-2xl p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <h3 className="text-sm sm:text-base font-black uppercase text-neutral-900 font-sans">
                    CHOCOBI BONANZA: CATCH THE SNACKS!
                  </h3>
                </div>
                <button
                  onClick={() => setIsPlayingGame(false)}
                  className="text-xs font-bold text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-2 py-1 rounded"
                >
                  ✕ Exit
                </button>
              </div>

              {/* Game Stats Bar */}
              <div className="flex items-center justify-between px-2 text-xs font-bold font-mono">
                <span className="text-red-600">SCORE: {score}</span>
                <div className="flex items-center gap-1">
                  <span>LIVES:</span>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className="text-sm">
                      {i < lives ? '❤️' : '🖤'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Game Arena */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="relative w-full aspect-16/10 bg-gradient-to-b from-sky-300 via-sky-100 to-amber-100 rounded-lg overflow-hidden border-2 border-neutral-800 shadow-inner cursor-crosshair"
              >
                {/* Sun & Clouds */}
                <div className="absolute top-3 right-4 w-10 h-10 rounded-full bg-yellow-300/80 blur-xs" />
                <div className="absolute top-5 left-8 bg-white/70 px-4 py-1.5 rounded-full text-[9px] text-neutral-400 font-mono">
                  Move mouse or Left/Right arrows
                </div>

                {/* Falling Items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="absolute text-2xl -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
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
                  className="absolute bottom-2 -translate-x-1/2 flex flex-col items-center transition-all duration-75 pointer-events-none"
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

                {/* Game Over Screen */}
                {gameOver && (
                  <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center gap-3 text-white z-30 animate-in fade-in">
                    <span className="text-3xl">😱</span>
                    <h4 className="text-xl font-black uppercase text-red-500 tracking-wider">
                      GAME OVER!
                    </h4>
                    <p className="text-sm font-bold">Your Score: {score}</p>
                    <button
                      onClick={handleStartGame}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase px-4 py-2 rounded shadow-lg transition-transform active:scale-95"
                    >
                      Play Again
                    </button>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="text-[10px] text-neutral-500 flex items-center justify-between px-1">
                <span>🍪 Chocobi = +10 pts • ⭐ Star = +25 pts • 🫑 Pepper = -1 Life</span>
                <span className="font-bold text-neutral-700">Futaba Kindergarten Arcade</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
