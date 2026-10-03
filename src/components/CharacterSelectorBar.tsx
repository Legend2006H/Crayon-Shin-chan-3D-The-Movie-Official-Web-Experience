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
    <footer className="relative z-20 w-full flex items-center justify-between px-4 sm:px-8 py-3 select-none border-t border-neutral-300/60 bg-white/70 backdrop-blur-xs">
      {/* Left: AUDIO TOGGLE */}
      <button
        type="button"
        onClick={() => {
          sounds.playBlip(600);
          onToggleAudio();
        }}
        className="text-[10px] sm:text-xs font-black tracking-widest text-neutral-600 hover:text-neutral-950 uppercase flex items-center gap-1.5 transition-colors"
        title="Toggle Audio"
      >
        <span>AUDIO:</span>
        <span className={audioEnabled ? 'text-red-600 font-extrabold' : 'text-neutral-400'}>
          {audioEnabled ? 'ON' : 'OFF'}
        </span>
      </button>

      {/* Center: 6 Character Avatars */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
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
