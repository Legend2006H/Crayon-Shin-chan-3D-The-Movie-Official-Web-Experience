import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200"
      />

      <div className="relative z-10 w-full max-w-lg bg-neutral-900 border border-neutral-700 text-white rounded-lg shadow-2xl p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h3 className="text-base font-black uppercase tracking-wider text-red-500">
            LEGAL NOTICES & MOVIE CREDITS
          </h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Rating Box */}
        <div className="flex items-center gap-4 bg-neutral-950 p-3 rounded border border-neutral-800">
          <div className="border-2 border-yellow-400 text-yellow-400 px-2 py-1 text-center font-black text-lg">
            G / PG
          </div>
          <div className="text-xs text-neutral-300">
            <span className="font-bold block text-white">ALL AGES ENTERTAINMENT</span>
            <span>Contains High-Flying Superhero Action, Comedic Mischief, and Hilarious Wobbly Dances.</span>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="space-y-2 text-xs leading-relaxed text-neutral-400">
          <p>
            © Yoshito Usui / Futabasha, Shin-Ei Animation, TV Asahi, ADK 2026. All rights reserved. Crayon Shin-chan and all related characters and elements are registered trademarks of Futabasha Publishers Ltd.
          </p>
          <p>
            RealD 3D and the RealD 3D logo are registered trademarks of RealD Inc. IMAX is a registered trademark of IMAX Corporation.
          </p>
          <p>
            Action Kamen, Super Shiro, and Chocobi are trademarks of Futabasha / Shin-Ei Animation. Special promotional 3D experience produced for cinema release.
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
