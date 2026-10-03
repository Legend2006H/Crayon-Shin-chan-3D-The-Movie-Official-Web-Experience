import React from 'react';
import { MovieBanner } from './MovieBanner';
import { sounds } from '../utils/audio';

export type SlideMode = 'slide-1' | 'slide-2' | 'slide-3' | 'slide-4' | 'slide-5' | 'interactive';

interface Props {
  activeSlide: SlideMode;
  onSelectSlide: (mode: SlideMode) => void;
  onBannerClick?: () => void;
  onSocialClick?: (platform: string) => void;
  onTickerClick?: () => void;
  onOpenMenu?: () => void;
}

export const Header: React.FC<Props> = ({
  activeSlide,
  onSelectSlide,
  onBannerClick,
  onSocialClick,
  onTickerClick,
  onOpenMenu,
}) => {
  const navItems = [
    { id: 'slide-1' as const, label: 'SHIN-CHAN' },
    { id: 'slide-2' as const, label: 'ACTION HERO' },
    { id: 'slide-3' as const, label: 'SHIRO & FRIENDS' },
    { id: 'slide-5' as const, label: 'KASUKABE ARCADE' },
    { id: 'slide-4' as const, label: '3D CINEMA' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-white/10 select-none shadow-md">
      {/* Hanging Official Theatrical Banner for Tablet/Desktop */}
      <div className="hidden sm:block absolute top-0 left-3 sm:left-6 md:left-8 z-50">
        <MovieBanner onClick={onBannerClick} />
      </div>

      {/* Main Header Bar */}
      <div className="w-full h-12 flex items-center justify-between px-2.5 sm:pl-52 md:pl-56 sm:pr-6 gap-2">
        {/* Mobile Left: Compact Theatrical Badge */}
        <div className="sm:hidden shrink-0 flex items-center">
          <MovieBanner onClick={onBannerClick} />
        </div>

        {/* Navigation Items (Clean Typographic Links, Touch Scrollable) */}
        <nav className="flex items-center gap-1 sm:gap-4 md:gap-6 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const isActive = activeSlide === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sounds.playBlip(540);
                  onSelectSlide(item.id);
                }}
                className={`relative py-1 px-1.5 sm:px-2 text-[10px] sm:text-[11px] md:text-xs font-montserrat font-extrabold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Center/Right Announcement Ticker (Subtle, Cinematic - Hidden on small screens) */}
        <div
          onClick={() => {
            sounds.playShinchanGiggle();
            onTickerClick?.();
          }}
          className="hidden xl:flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer max-w-sm truncate"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span className="text-[10px] font-mono tracking-wider uppercase truncate">
            IN THEATERS WORLDWIDE • REAL D 3D
          </span>
        </div>

        {/* Right Section: Mobile Menu Trigger & Social Links */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Menu Button for Mobile */}
          <button
            type="button"
            onClick={() => {
              sounds.playScan();
              onOpenMenu?.();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white border border-white/15 text-[10px] font-black tracking-wider uppercase transition-all active:scale-95"
            title="Open Kasukabe Navigation"
            aria-label="Open Navigation Menu"
          >
            <div className="w-3.5 h-2.5 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-white rounded-full" />
              <span className="w-full h-0.5 bg-white rounded-full" />
              <span className="w-full h-0.5 bg-white rounded-full" />
            </div>
            <span className="hidden xs:inline sm:hidden md:inline">MENU</span>
          </button>

          {/* Social Media Links (compact on small screens) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                sounds.playBlip(700);
                onSocialClick?.('Twitter / X');
              }}
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              title="Share on Twitter"
              aria-label="Twitter"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playBlip(600);
                onSocialClick?.('Facebook');
              }}
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              title="Share on Facebook"
              aria-label="Facebook"
            >
              <span className="font-bold text-[10px] leading-none font-serif">f</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sounds.playBlip(500);
                onSocialClick?.('YouTube');
              }}
              className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-all active:scale-95"
              title="Watch on YouTube"
              aria-label="YouTube"
            >
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
