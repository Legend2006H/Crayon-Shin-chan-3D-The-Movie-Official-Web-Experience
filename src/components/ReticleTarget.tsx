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
        className="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none"
        title={label}
        aria-label={label}
      >
        {/* Outer subtle radar ring */}
        <span className="absolute inset-0 rounded-full border border-white/60 group-hover:border-white animate-ping opacity-30" />
        {/* Middle ring */}
        <span className="absolute inset-1 rounded-full border border-white/80 group-hover:border-white shadow-xs" />
        {/* Center dot */}
        <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform shadow" />
        {/* Crosshair ticks */}
        <span className="absolute -top-1 w-0.5 h-1 bg-white/70" />
        <span className="absolute -bottom-1 w-0.5 h-1 bg-white/70" />
        <span className="absolute -left-1 w-1 h-0.5 bg-white/70" />
        <span className="absolute -right-1 w-1 h-0.5 bg-white/70" />
      </button>

      {/* Info popover tooltip */}
      {(open || false) && (
        <div className="absolute left-10 -top-4 w-52 sm:w-60 bg-neutral-950/90 text-white p-3 rounded shadow-2xl border border-neutral-700/80 backdrop-blur-md z-30 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 mb-1.5">
            <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase">
              SFIT SPEC // {label}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="text-neutral-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-300">
            {detail}
          </p>
        </div>
      )}
    </div>
  );
};
