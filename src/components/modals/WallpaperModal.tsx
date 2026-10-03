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
          className={`w-full rounded bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700 flex items-center justify-between p-6 text-center shadow-inner relative overflow-hidden ${
            wallpaperType === 'widescreen' ? 'aspect-16/9' : 'aspect-4/3'
          }`}
        >
          {/* Subtle stylized watermark pattern */}
          <div className="text-yellow-400/10 text-9xl font-black select-none pointer-events-none absolute -bottom-8 -right-8 font-sans">
            3D
          </div>

          <div className="relative z-10 flex flex-col items-start text-left max-w-xs">
            <span className="text-yellow-400 text-xs font-black tracking-widest uppercase mb-1">
              CRAYON SHIN-CHAN 3D THE MOVIE
            </span>
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-1">
              {char.name}
            </h4>
            <p className="text-[11px] text-neutral-300 font-medium mb-3">
              {char.japaneseName} • {char.role}
            </p>
            <span className="text-[10px] text-yellow-300/80 font-mono bg-neutral-950/60 px-2 py-1 rounded border border-neutral-800">
              Resolution: {resolution}
            </span>
          </div>

          {/* Character 3D preview cutout inside wallpaper */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <img
              src={char.imageCasual}
              alt={char.name}
              className="max-h-48 sm:max-h-56 w-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
          <span className="text-[11px] text-neutral-400">
            Official cinema promotional wallpaper. Free for personal desktop and mobile use.
          </span>
          <button
            onClick={handleDownload}
            className="bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase px-5 py-2.5 rounded shadow transition-all active:scale-98 flex items-center gap-1.5"
          >
            <span>⬇</span>
            <span>Download ({resolution.split(' ')[0]})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
