import React from 'react';
import { CHARACTERS } from '../../data/characters';
import { sounds } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  characterName: string;
  wallpaperType: 'widescreen' | 'standard';
}

export const WallpaperModal: React.FC<Props> = ({
  isOpen,
  onClose,
  characterName,
  wallpaperType,
}) => {
  if (!isOpen) return null;

  const resolution =
    wallpaperType === 'widescreen' ? '3840 × 2160 (4K UHD)' : '2048 × 1536 (Standard/Tablet)';

  const char =
    CHARACTERS.find((c) => c.name.toLowerCase().includes(characterName.toLowerCase())) ||
    CHARACTERS[0];

  const handleDownload = () => {
    sounds.playActionBeam();
    // Trigger download of the image
    const link = document.createElement('a');
    link.href = char.imageCasual;
    link.download = `Shinchan3D_${char.id}_${wallpaperType}_wallpaper.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-200"
      />

      <div className="relative z-10 w-full max-w-2xl bg-neutral-900 border border-neutral-700 text-white rounded-lg shadow-2xl p-6 flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400">
              OFFICIAL 3D WALLPAPER DOWNLOAD
            </span>
            <h3 className="text-base sm:text-lg font-black uppercase text-white font-sans">
              {char.name} - {wallpaperType.toUpperCase()}
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Wallpaper Preview Canvas */}
        <div
          className={`w-full rounded-lg bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700 flex items-center justify-between p-3.5 sm:p-6 text-center shadow-inner relative overflow-hidden ${
            wallpaperType === 'widescreen' ? 'aspect-16/10 sm:aspect-16/9' : 'aspect-4/3'
          }`}
        >
          {/* Subtle stylized watermark pattern */}
          <div className="text-yellow-400/10 text-7xl sm:text-9xl font-black select-none pointer-events-none absolute -bottom-6 -right-6 font-sans">
            3D
          </div>

          <div className="relative z-10 flex flex-col items-start text-left max-w-[60%] sm:max-w-xs">
            <span className="text-yellow-400 text-[9px] sm:text-xs font-black tracking-widest uppercase mb-1 truncate w-full">
              CRAYON SHIN-CHAN 3D
            </span>
            <h4 className="text-base sm:text-2xl font-black uppercase tracking-tight text-white mb-1 leading-tight">
              {char.name.split(' (')[0]}
            </h4>
            <p className="text-[10px] sm:text-[11px] text-neutral-300 font-medium mb-2 sm:mb-3">
              {char.japaneseName}
            </p>
            <span className="text-[9px] sm:text-[10px] text-yellow-300/90 font-mono bg-neutral-950/70 px-2 py-0.5 rounded border border-neutral-800">
              {resolution.split(' (')[0]}
            </span>
          </div>

          {/* Character 3D preview cutout inside wallpaper */}
          <div className="relative z-10 h-full flex items-center justify-center shrink-0">
            <img
              src={char.imageCasual}
              alt={char.name}
              className="max-h-28 xs:max-h-36 sm:max-h-56 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-neutral-800">
          <span className="text-[10px] sm:text-[11px] text-neutral-400 text-center sm:text-left">
            Official promotional wallpaper. Free for personal use.
          </span>
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xs uppercase px-5 py-3 sm:py-2.5 rounded-md shadow transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>⬇</span>
            <span>Download ({resolution.split(' ')[0]})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
