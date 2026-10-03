import React from 'react';
import { CHARACTERS } from '../data/characters';
import { sounds } from '../utils/audio';

interface Props {
  activeCharacterId: string;
  onSelectCharacter: (id: string) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onOpenLegal: () => void;
}

export const CharacterSelectorBar: React.FC<Props> = ({
  activeCharacterId,
  onSelectCharacter,
  audioEnabled,
  onToggleAudio,
  onOpenLegal,
}) => {
  return (
    <footer className="relative z-30 w-full flex items-center justify-between px-2.5 sm:px-6 md:px-8 py-2 sm:py-3 select-none border-t border-neutral-300/80 bg-white/85 backdrop-blur-md pb-safe">
      {/* Left: AUDIO TOGGLE */}
      <button
        type="button"
        onClick={() => {
          sounds.playBlip(600);
          onToggleAudio();
        }}
        className="text-[10px] sm:text-xs font-black tracking-wider sm:tracking-widest text-neutral-600 hover:text-neutral-950 uppercase flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer shrink-0 py-1"
        title="Toggle Audio"
        aria-label="Toggle Audio"
      >
        {/* Speaker Icon */}
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          {audioEnabled ? (
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          ) : (
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          )}
        </svg>
        <span className="hidden xs:inline">AUDIO:</span>
        <span className={audioEnabled ? 'text-red-600 font-extrabold' : 'text-neutral-400'}>
          {audioEnabled ? 'ON' : 'OFF'}
        </span>
      </button>

      {/* Center: 6 Character Avatars */}
      <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar py-0.5">
        {CHARACTERS.map((char) => {
          const isActive = char.id === activeCharacterId;

          return (
            <button
              key={char.id}
              onClick={() => {
                if (char.id === 'shinchan') {
                  sounds.playShinchanGiggle();
                } else if (char.id === 'shiro') {
                  sounds.playShiroBark();
                } else if (char.id === 'action-kamen') {
                  sounds.playActionBeam();
                } else {
                  sounds.playBlip(520);
                }
                onSelectCharacter(char.id);
              }}
              className={`group relative p-1.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-neutral-900 text-white scale-110 shadow-md ring-2 ring-red-500/80 ring-offset-2'
                  : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/80 hover:scale-105'
              }`}
              title={`${char.name} (${char.japaneseName})`}
              aria-label={char.name}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                {char.id === 'shinchan' && (
                  /* Shinchan Face Icon: chubby cheeks, caterpillar eyebrows, happy smile */
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-1.5">
                    {/* Head shape */}
                    <path d="M 4 14 Q 3 9 10 7 Q 17 6 20 11 Q 22 16 16 19 Q 10 20 5 18 Z" />
                    {/* Thick caterpillar brows */}
                    <path d="M 6 10 Q 9 8 11 9" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 14 9 Q 16 8 18 10" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Eyes */}
                    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="16" cy="12" r="1.5" fill="currentColor" />
                    {/* Smile */}
                    <path d="M 10 15 Q 13 18 16 15" strokeLinecap="round" />
                  </svg>
                )}

                {char.id === 'shiro' && (
                  /* Shiro Puppy Face Icon */
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-1.5">
                    {/* Fluffy head */}
                    <circle cx="12" cy="12" r="7" />
                    {/* Floppy ears */}
                    <path d="M 5 9 Q 2 12 5 15" strokeLinecap="round" />
                    <path d="M 19 9 Q 22 12 19 15" strokeLinecap="round" />
                    {/* Eyes & nose */}
                    <circle cx="9.5" cy="11.5" r="1.2" fill="currentColor" />
                    <circle cx="14.5" cy="11.5" r="1.2" fill="currentColor" />
                    <ellipse cx="12" cy="13.5" rx="1.5" ry="1" fill="currentColor" />
                    <path d="M 11 15 Q 12 16.5 13 15" strokeLinecap="round" />
                  </svg>
                )}

                {char.id === 'action-kamen' && (
                  /* Action Kamen Mask Icon */
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-1.5">
                    {/* Helmet cowl */}
                    <path d="M 5 16 L 4 10 L 8 6 L 12 4 L 16 6 L 20 10 L 19 16 Z" />
                    {/* Top Fin */}
                    <line x1="12" y1="4" x2="12" y2="8" strokeWidth="2" strokeLinecap="round" />
                    {/* Visor */}
                    <path d="M 7 12 Q 12 14 17 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}

                {char.id === 'himawari' && (
                  /* Himawari Baby Face Icon */
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-1.5">
                    <circle cx="12" cy="13" r="7" />
                    {/* Top hair curl */}
                    <path d="M 12 6 Q 14 3 16 5 Q 14 8 12 6" fill="currentColor" />
                    {/* Big eyes */}
                    <circle cx="9.5" cy="12.5" r="1.8" fill="currentColor" />
                    <circle cx="14.5" cy="12.5" r="1.8" fill="currentColor" />
                    {/* Laughing mouth */}
                    <path d="M 10 16 Q 12 18.5 14 16 Z" fill="currentColor" />
                  </svg>
                )}

                {char.id === 'buriburizaemon' && (
                  /* Buriburizaemon Pig Snout Icon */
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-1.5">
                    {/* Pig face */}
                    <circle cx="12" cy="12" r="7.5" />
                    {/* Ears */}
                    <path d="M 7 6 L 5 3 L 9 4 Z" fill="currentColor" />
                    <path d="M 17 6 L 19 3 L 15 4 Z" fill="currentColor" />
                    {/* Snout oval with two nostrils */}
                    <ellipse cx="12" cy="13.5" rx="3.5" ry="2.5" />
                    <circle cx="10.8" cy="13.5" r="0.8" fill="currentColor" />
                    <circle cx="13.2" cy="13.5" r="0.8" fill="currentColor" />
                    {/* Determined eyes */}
                    <circle cx="9" cy="10" r="1.2" fill="currentColor" />
                    <circle cx="15" cy="10" r="1.2" fill="currentColor" />
                  </svg>
                )}

                {char.id === 'kazama' && (
                  /* Kazama School Hat & Neat Hair Icon */
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-1.5">
                    {/* Kindergarten straw hat dome */}
                    <ellipse cx="12" cy="9" rx="6" ry="4" />
                    <line x1="4" y1="12" x2="20" y2="12" strokeWidth="1.8" strokeLinecap="round" />
                    {/* Neat jaw */}
                    <path d="M 7 12 Q 12 19 17 12" />
                    {/* Bowtie */}
                    <path d="M 10 18 L 14 18 L 12 17 Z" fill="currentColor" />
                  </svg>
                )}
              </div>

              {/* Active Indicator Dot */}
              {isActive && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: LEGAL DROPDOWN */}
      <button
        type="button"
        onClick={() => {
          sounds.playBlip(540);
          onOpenLegal();
        }}
        className="text-[10px] sm:text-xs font-black tracking-widest text-neutral-600 hover:text-neutral-950 uppercase flex items-center gap-1 transition-colors"
      >
        <span>LEGAL</span>
        <span className="text-[9px]">▾</span>
      </button>
    </footer>
  );
};
