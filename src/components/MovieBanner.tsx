import React from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
}

export const MovieBanner: React.FC<Props> = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative z-30 cursor-pointer select-none group transition-transform duration-300 hover:scale-[1.02] active:scale-98 ${className}`}
      title="Crayon Shin-chan 3D The Movie - Official Theatrical Experience"
    >
      {/* 1. Mobile Compact Theatrical Pill / Header Badge (shown on <sm screens) */}
      <div className="sm:hidden flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-[#b91c1c] via-[#dc2626] to-[#7f1d1d] text-white rounded-lg border border-amber-400/80 shadow-[0_4px_12px_rgba(220,38,38,0.4)]">
        <span className="text-amber-300 text-[9px] animate-pulse">★</span>
        <div className="flex items-center gap-1">
          <span className="font-bebas text-lg leading-none tracking-wider text-white">
            SHIN-CHAN
          </span>
          <span className="font-montserrat font-black italic text-xs tracking-tighter bg-gradient-to-b from-yellow-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
            3D
          </span>
        </div>
        <span className="px-1 py-0.2 bg-black/40 border border-amber-400/50 rounded font-mono text-[8px] text-amber-200 uppercase font-bold">
          THE MOVIE
        </span>
      </div>

      {/* 2. Hanging Theatrical Ribbon Body (shown on sm+ screens) */}
      <div className="hidden sm:flex flex-col items-center">
        <div className="w-[165px] md:w-[185px] bg-gradient-to-b from-[#b91c1c] via-[#dc2626] to-[#7f1d1d] text-white shadow-[0_16px_36px_rgba(0,0,0,0.45)] border-x-2 border-b-2 border-amber-400/70 px-3 pt-3 pb-3.5 flex flex-col items-center text-center rounded-b-xl relative overflow-hidden">
          {/* Subtle fabric sheen and light reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/20 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400/80" />

          {/* Top Japanese Official Logo Crest */}
          <div className="relative z-10 w-full py-0.5 px-2 rounded-full bg-black/30 border border-amber-400/40 flex items-center justify-center gap-1.5 mb-2 shadow-xs">
            <span className="text-amber-300 text-[9px]">★</span>
            <span className="font-jp text-[10px] sm:text-[11px] font-black tracking-widest text-amber-300 drop-shadow-sm">
              クレヨンしんちゃん
            </span>
            <span className="text-amber-300 text-[9px]">★</span>
          </div>

          {/* Main "SHIN-CHAN" Cinematic Title */}
          <div className="relative z-10 leading-none">
            <h1 className="font-bebas text-3xl sm:text-4xl tracking-wider text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)] m-0 p-0 font-normal">
              SHIN-CHAN
            </h1>

            {/* Golden 3D Holographic Lockup */}
            <div className="flex items-center justify-center gap-1.5 my-1">
              <span className="font-montserrat font-black italic text-3xl sm:text-[34px] tracking-tighter bg-gradient-to-b from-yellow-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                3D
              </span>
              <div className="flex flex-col items-start leading-none text-left">
                <span className="font-bebas text-sm sm:text-base tracking-widest text-amber-200 uppercase drop-shadow">
                  THE MOVIE
                </span>
                <span className="font-jp text-[8px] font-black tracking-widest text-white/80 uppercase">
                  新次元！超能力大決戦
                </span>
              </div>
            </div>
          </div>

          {/* Theatrical Golden Emblem Divider */}
          <div className="relative z-10 w-full flex items-center justify-center gap-2 my-1.5 opacity-80">
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
            <span className="text-[10px] text-amber-300 animate-pulse">◆</span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-amber-400 to-amber-300" />
          </div>

          {/* Release Status: IN THEATRES NOW WORLDWIDE */}
          <div className="relative z-10 w-full flex flex-col items-center">
            <span className="font-montserrat font-extrabold text-[9px] sm:text-[10px] uppercase tracking-widest text-white/90 drop-shadow-sm">
              IN THEATRES NOW
            </span>
            <span className="font-bebas text-lg sm:text-xl tracking-wider text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] leading-none mt-0.5">
              WORLDWIDE
            </span>
          </div>

          {/* Formats Ribbon Pills */}
          <div className="relative z-10 mt-2 flex items-center justify-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-black/40 border border-amber-400/50 font-mono font-bold text-[8px] text-amber-200">
              REAL D 3D
            </span>
            <span className="px-1.5 py-0.5 rounded bg-black/40 border border-amber-400/50 font-mono font-bold text-[8px] text-white">
              IMAX 3D
            </span>
          </div>

          {/* Gold stitched bottom edge accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500" />
        </div>

        {/* Ribbon Swallowtail Cutout Shadow */}
        <div className="w-full flex justify-center -mt-0.5">
          <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[8px] border-t-amber-500/80 drop-shadow-md" />
        </div>
      </div>
    </div>
  );
};
