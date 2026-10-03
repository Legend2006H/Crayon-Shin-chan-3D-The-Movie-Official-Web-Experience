import React from 'react';
import { CHARACTERS } from '../data/characters';
import { sounds } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onSelectNav: (section: 'characters' | 'games' | 'cinema' | 'trailers' | 'tickets' | 'wallpapers') => void;
  onSelectCharacter: (id: string) => void;
}

export const NavigationDrawer: React.FC<Props> = ({
  isOpen,
  onToggle,
  onSelectNav,
  onSelectCharacter,
}) => {
  return (
    <>
      {/* Right Edge Navigation Tab Handle (Fixed so it stays accessible at all scroll points) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center select-none">
        <button
          onClick={() => {
            sounds.playScan();
            onToggle();
          }}
          className="group flex items-center gap-1.5 py-3 sm:py-4 pl-2 pr-1 bg-white/90 hover:bg-white text-neutral-800 border-y border-l border-neutral-300 rounded-l-lg shadow-lg backdrop-blur-md transition-all hover:pl-3 active:scale-95 cursor-pointer"
          title="Open Kasukabe Navigation"
          aria-label="Open Navigation Menu"
        >
          {/* Concentric Circle Reticle */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-neutral-500 group-hover:border-red-600 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-red-600" />
          </div>

          {/* Vertical "NAVIGATION" Text */}
          <span
            className="text-[9px] font-black tracking-widest text-neutral-700 group-hover:text-red-600 uppercase"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            NAVIGATION
          </span>
        </button>
      </div>

      {/* Slide-out Navigation Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={onToggle}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          />

          {/* Drawer Content */}
          <div className="relative w-80 max-w-[88vw] h-full bg-neutral-950 text-white p-5 sm:p-6 shadow-2xl flex flex-col justify-between border-l border-neutral-800 z-10 overflow-y-auto animate-in slide-in-from-right duration-200 pb-safe">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-red-500 uppercase">
                    KASUKABE CINEMA HQ
                  </span>
                  <h2 className="text-xl font-black uppercase tracking-tight text-white font-sans">
                    NAVIGATION
                  </h2>
                </div>
                <button
                  onClick={onToggle}
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-sm transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Main Jump Links */}
              <div className="space-y-1">
                {[
                  { id: 'characters', label: 'THE CAST (3D CHARACTERS)' },
                  { id: 'cinema', label: '3D WORLD CINEMA (SPECIAL CUT)' },
                  { id: 'games', label: 'KASUKABE ARCADE (MINI-GAMES)' },
                  { id: 'trailers', label: 'OFFICIAL 3D TRAILERS' },
                  { id: 'tickets', label: 'GET TICKETS & SHOWTIMES' },
                  { id: 'wallpapers', label: 'DOWNLOAD 4K WALLPAPERS' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playBlip(620);
                      onSelectNav(
                        item.id as
                          | 'characters'
                          | 'games'
                          | 'cinema'
                          | 'trailers'
                          | 'tickets'
                          | 'wallpapers'
                      );
                      onToggle();
                    }}
                    className="w-full text-left py-2.5 px-3 rounded hover:bg-neutral-900 text-neutral-300 hover:text-white font-black text-xs uppercase tracking-wider flex items-center justify-between transition-colors group"
                  >
                    <span>{item.label}</span>
                    <span className="text-neutral-600 group-hover:text-red-500 transition-colors">
                      →
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick Jump to Specific Heroes */}
              <div className="mt-8 pt-4 border-t border-neutral-800">
                <span className="text-[9px] font-black tracking-widest text-neutral-500 uppercase block mb-3">
                  CHARACTER DOSSIERS
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CHARACTERS.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => {
                        sounds.playBlip(540);
                        onSelectCharacter(char.id);
                        onToggle();
                      }}
                      className="text-left text-[11px] font-bold text-neutral-400 hover:text-white hover:bg-neutral-900 py-1.5 px-2 rounded truncate transition-colors"
                    >
                      {char.name.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="text-[10px] text-neutral-500 border-t border-neutral-800 pt-3">
              <p className="font-semibold text-neutral-400">Crayon Shin-chan 3D The Movie</p>
              <p>In Theatres Worldwide in RealD 3D & IMAX 3D.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
