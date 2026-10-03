import React, { useState, useRef } from 'react';
import { sounds } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const TrailerModal: React.FC<Props> = ({ isOpen, onClose, initialIndex = 0 }) => {
  const [activeIdx, setActiveIdx] = useState(initialIndex);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const trailers = [
    {
      title: 'Shin-chan 3D: Journey in the Stylized World (Special Feature)',
      subtitle: 'Exclusive 3D Animation Walk Sequence',
      isLocal: true,
      videoUrl: '/videos/shinchan_3d_walk.mp4',
      poster: '/images/ui/video_poster.jpg',
      duration: '1:30',
    },
    {
      title: 'Shin-chan 3D The Movie: The New Dimension (Official Trailer)',
      subtitle: 'Battle of Supernatural Powers Teaser',
      isLocal: false,
      videoUrl: 'https://www.youtube-nocookie.com/embed/z44qP-x2D7w?autoplay=1&rel=0',
      duration: '2:15',
    },
    {
      title: 'Action Kamen & Super Shiro Kasukabe Defense Teaser',
      subtitle: 'Supernatural Showdown Trailer',
      isLocal: false,
      videoUrl: 'https://www.youtube-nocookie.com/embed/G6xGq5_pI8g?autoplay=1&rel=0',
      duration: '1:45',
    },
  ];

  const current = trailers[activeIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md animate-in fade-in duration-200"
      />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
              {current.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-16/9 bg-black flex items-center justify-center">
          {current.isLocal ? (
            <video
              ref={videoRef}
              src={current.videoUrl}
              poster={current.poster}
              autoPlay
              controls
              loop
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={current.videoUrl}
              title={current.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Trailer Selector Tabs */}
        <div className="flex items-center justify-between p-2.5 sm:p-3 bg-neutral-900/80 border-t border-neutral-800 text-xs gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
            {trailers.map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  sounds.playBlip(520);
                  setActiveIdx(i);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md font-bold uppercase text-[9px] sm:text-[10px] whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                  activeIdx === i
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 active:bg-neutral-600'
                }`}
              >
                {i === 0 ? '★ 3D Feature' : `Trailer ${i + 1}`} ({t.duration})
              </button>
            ))}
          </div>
          <span className="text-[10px] font-mono text-neutral-400 hidden md:inline shrink-0">
            IN THEATRES IN 3D & REAL D 3D
          </span>
        </div>
      </div>
    </div>
  );
};
