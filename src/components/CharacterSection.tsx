import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CharacterData } from '../data/characters';
import { ShinchanCharacterArt } from './art/ShinchanCharacterArt';
import { ReticleTarget } from './ReticleTarget';
import { sounds } from '../utils/audio';

interface Props {
  character: CharacterData;
  index: number;
  onDownloadWallpaper: (type: 'widescreen' | 'standard', characterName: string) => void;
  onScrollToCinema: () => void;
  onScrollToGames: () => void;
}

export const CharacterSection: React.FC<Props> = ({
  character,
  index,
  onDownloadWallpaper,
  onScrollToCinema,
  onScrollToGames,
}) => {
  const [isCivilian, setIsCivilian] = useState(true);
  const [isPlayingQuote, setIsPlayingQuote] = useState(false);

  const isEven = index % 2 === 0;

  const handlePlayQuote = () => {
    if (character.id === 'shinchan') {
      sounds.playShinchanGiggle();
    } else if (character.id === 'shiro') {
      sounds.playShiroBark();
    } else if (character.id === 'action-kamen') {
      sounds.playActionBeam();
    } else {
      sounds.playScan();
    }
    setIsPlayingQuote(true);
    setTimeout(() => setIsPlayingQuote(false), 2400);
  };

  const reticleList = isCivilian
    ? character.reticles.civilian.length > 0
      ? character.reticles.civilian
      : character.reticles.hero
    : character.reticles.hero.length > 0
    ? character.reticles.hero
    : character.reticles.civilian;

  const currentColor = isCivilian ? character.civilianColor : character.heroColor;

  return (
    <section
      id={`char-${character.id}`}
      className="relative w-full min-h-[auto] sm:min-h-[85vh] flex flex-col justify-center py-6 sm:py-12 md:py-14 px-3 sm:px-8 md:px-12 select-none border-b border-neutral-200/70 overflow-hidden"
    >
      {/* Dynamic diagonal theatrical accent ribbon */}
      <div
        className={`absolute -top-32 ${
          isEven ? '-right-28' : '-left-28'
        } w-[65%] sm:w-[55%] h-[160%] transform ${
          isEven ? '-rotate-12' : 'rotate-12'
        } pointer-events-none opacity-15 transition-all duration-700`}
        style={{ backgroundColor: currentColor }}
      />

      {/* Chapter Index Watermark */}
      <div
        className={`absolute top-4 sm:top-6 ${
          isEven ? 'right-4 sm:right-8' : 'left-4 sm:left-8'
        } text-5xl sm:text-8xl md:text-9xl font-black font-mono tracking-tighter opacity-5 pointer-events-none select-none`}
      >
        0{index + 1}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col">
        {/* Character Stage: Alternates Left/Right layout with Shin-chan positioned prominently at the top */}
        <div
          className={`flex flex-col ${
            isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center justify-between gap-5 sm:gap-8 md:gap-12 w-full`}
        >
          {/* CARTOON VISUAL STAGE */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center min-h-[270px] sm:min-h-[400px] md:min-h-[480px]">
            {/* Smooth cartoon entrance animation container */}
            <div className="relative w-full max-w-md flex items-center justify-center">
              <ShinchanCharacterArt
                character={character}
                isCivilian={isCivilian}
                fromDirection={isEven ? 'left' : 'right'}
              />

              {/* Hotspot Interactive Reticles */}
              {reticleList.map((pt) => (
                <ReticleTarget
                  key={pt.id}
                  x={pt.x}
                  y={pt.y}
                  label={pt.label}
                  detail={pt.detail}
                />
              ))}
            </div>
          </div>

          {/* CHARACTER DOSSIER & THEATRICAL TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', damping: 22, stiffness: 90, delay: 0.05 }}
            className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl"
          >
            {/* Top Label: Japanese Title + Movie Role */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-red-600 text-white shadow-xs">
                {character.japaneseName}
              </span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-500 uppercase">
                {character.role}
              </span>
            </div>

            {/* Character Main Title */}
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-900 font-sans">
                {character.name}
              </h2>

              {/* Soundbite audio voice line button */}
              <button
                type="button"
                onClick={handlePlayQuote}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all ${
                  isPlayingQuote
                    ? 'bg-red-600 border-red-600 text-white scale-110 shadow-lg'
                    : 'border-neutral-400/80 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 bg-white/90 shadow-xs'
                }`}
                title="Play Character Voice Line"
                aria-label="Play soundbite"
              >
                {isPlayingQuote ? (
                  <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path
                      d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Character Theatrical Tagline */}
            <p className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-red-600 mb-3">
              {character.tagline}
            </p>

            {/* Japanese Quote & English Catchphrase Box */}
            <div className="mb-4 p-3.5 rounded-xl bg-white/90 border border-neutral-300/80 shadow-xs">
              <p className="text-xs sm:text-sm font-black text-neutral-900 mb-1 tracking-tight">
                {character.quote}
              </p>
              <p className="text-[11px] font-bold text-neutral-500 font-mono">
                {character.japaneseQuote}
              </p>
            </div>

            {/* Civilian Mode / Action Suit Toggle (for Shin-chan) */}
            {character.hasCivilianMode && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  OUTFIT MODE:
                </span>
                <div className="inline-flex p-1 rounded-full bg-neutral-200 border border-neutral-300">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isCivilian) {
                        sounds.playShinchanGiggle();
                        setIsCivilian(true);
                      }
                    }}
                    className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded-full transition-all ${
                      isCivilian
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Casual Explorer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (isCivilian) {
                        sounds.playActionBeam();
                        setIsCivilian(false);
                      }
                    }}
                    className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded-full transition-all ${
                      !isCivilian
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Action Kamen Suit
                  </button>
                </div>
              </div>
            )}

            {/* Theatrical Story Dossier (Rich, Authentic Movie Copy) */}
            <div className="space-y-2 text-xs sm:text-[13px] leading-relaxed text-neutral-700 mb-4">
              {character.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Character Trait Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {character.traits.map((trait, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-white/80 border border-neutral-300 text-neutral-800"
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* Character Specs Box */}
            <div className="pt-3 border-t border-neutral-300/80 grid grid-cols-2 gap-3 text-[10px] sm:text-xs">
              {character.specs.map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-semibold text-neutral-500 uppercase text-[9px] font-mono">
                    {spec.label}
                  </span>
                  <span className="font-bold text-neutral-900">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons: Wallpapers & Direct Jumps */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sounds.playBlip(680);
                  onDownloadWallpaper('widescreen', character.name);
                }}
                className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-white/80 sm:bg-transparent border border-neutral-300/80 sm:border-transparent text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-neutral-900 hover:text-red-600 transition-colors active:scale-95 cursor-pointer shadow-2xs sm:shadow-none"
              >
                <span>→</span>
                <span>4K WIDESCREEN WALLPAPER</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.playBlip(680);
                  onDownloadWallpaper('standard', character.name);
                }}
                className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-white/80 sm:bg-transparent border border-neutral-300/80 sm:border-transparent text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-neutral-900 hover:text-red-600 transition-colors active:scale-95 cursor-pointer shadow-2xs sm:shadow-none"
              >
                <span>→</span>
                <span>MOBILE WALLPAPER</span>
              </button>

              <button
                type="button"
                onClick={onScrollToCinema}
                className="inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-red-50/80 sm:bg-transparent border border-red-200/80 sm:border-transparent text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-red-600 hover:text-red-700 transition-colors active:scale-95 cursor-pointer shadow-2xs sm:shadow-none"
              >
                <span>▶</span>
                <span>LIVING 3D CINEMA REEL</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
