import React, { useState } from 'react';
import { sounds } from '../utils/audio';

interface Props {
  x: number;
  y: number;
  label: string;
  detail: string;
}

export const ReticleTarget: React.FC<Props> = ({ x, y, label, detail }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
    >
      {/* Concentric Reticle Rings matching the official website */}
      <button
        type="button"
        onClick={() => {
          sounds.playScan();
          setOpen(!open);
        }}
        onMouseEnter={() => sounds.playBlip(750, 0.04)}
        className="relative flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-full focus:outline-none cursor-pointer"
        title={label}
        aria-label={label}
      >
        {/* Outer subtle radar ring */}
        <span className="absolute inset-0 rounded-full border border-white/60 group-hover:border-white animate-ping opacity-30 pointer-events-none" />
        {/* Middle ring */}
        <span className="absolute inset-1 rounded-full border border-white/80 group-hover:border-white shadow-xs pointer-events-none" />
        {/* Center dot */}
        <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform shadow pointer-events-none" />
        {/* Crosshair ticks */}
        <span className="absolute -top-1 w-0.5 h-1 bg-white/70" />
        <span className="absolute -bottom-1 w-0.5 h-1 bg-white/70" />
        <span className="absolute -left-1 w-1 h-0.5 bg-white/70" />
        <span className="absolute -right-1 w-1 h-0.5 bg-white/70" />
      </button>

      {/* Info popover tooltip with adaptive screen boundary clamping */}
      {open && (
        <div
          className={`absolute -top-4 w-48 sm:w-56 max-w-[75vw] bg-neutral-950/95 text-white p-3 rounded-lg shadow-2xl border border-neutral-700/80 backdrop-blur-md z-30 animate-in fade-in zoom-in-95 duration-150 ${
            x > 50 ? 'right-9 left-auto' : 'left-9 right-auto'
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1 mb-1.5">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-red-400 uppercase truncate">
              SFIT // {label}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="text-neutral-400 hover:text-white text-xs px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-[10px] sm:text-[11px] leading-relaxed text-neutral-300">
            {detail}
          </p>
        </div>
      )}
    </div>
  );
};
