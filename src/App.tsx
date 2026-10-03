import React, { useState, useEffect } from 'react';
import { CHARACTERS } from './data/characters';
import { Header, SlideMode } from './components/Header';
import { SparkleCursor } from './components/SparkleCursor';
import { CharacterSection } from './components/CharacterSection';
import { GamesSection } from './components/GamesSection';
import { LivingCinemaSection } from './components/LivingCinemaSection';
import { CharacterSelectorBar } from './components/CharacterSelectorBar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { TrailerModal } from './components/modals/TrailerModal';
import { TicketModal } from './components/modals/TicketModal';
import { LegalModal } from './components/modals/LegalModal';
import { WallpaperModal } from './components/modals/WallpaperModal';
import { sounds } from './utils/audio';

export default function App() {
  const [activeSlide, setActiveSlide] = useState<SlideMode>('slide-1');
  const [activeCharacterId, setActiveCharacterId] = useState<string>('shinchan');
  const [sparkleEnabled, setSparkleEnabled] = useState(true);

  // Modals state
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerIdx, setTrailerIdx] = useState(0);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [searchZip, setSearchZip] = useState('10001');
  const [legalOpen, setLegalOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [wallpaperModal, setWallpaperModal] = useState<{
    open: boolean;
    characterName: string;
    type: 'widescreen' | 'standard';
  }>({
    open: false,
    characterName: 'SHIN-CHAN (SHINNOSUKE)',
    type: 'widescreen',
  });

  // Audio state
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    sounds.enabled = nextState;
  };

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Slide navigation click
  const handleSelectSlide = (mode: SlideMode) => {
    setActiveSlide(mode);
    if (mode === 'slide-1' || mode === 'slide-2') {
      scrollToId('char-shinchan');
    } else if (mode === 'slide-3') {
      scrollToId('char-shiro');
    } else if (mode === 'slide-4') {
      scrollToId('living-cinema');
    } else if (mode === 'slide-5') {
      scrollToId('kasukabe-arcade');
    }
  };

  // Active section scroll spy
  useEffect(() => {
    const sections = CHARACTERS.map((c) => ({
      id: c.id,
      el: document.getElementById(`char-${c.id}`),
    }));
    const arcadeEl = document.getElementById('kasukabe-arcade');
    const cinemaEl = document.getElementById('living-cinema');

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      if (cinemaEl && scrollPos >= cinemaEl.offsetTop) {
        setActiveSlide('slide-4');
        return;
      }
      if (arcadeEl && scrollPos >= arcadeEl.offsetTop) {
        setActiveSlide('slide-5');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        if (item.el && scrollPos >= item.el.offsetTop) {
          setActiveCharacterId(item.id);
          if (item.id === 'shinchan') setActiveSlide('slide-1');
          else if (item.id === 'shiro') setActiveSlide('slide-3');
          else setActiveSlide('interactive');
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5] text-neutral-900 font-sans relative selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Anime Stardust Cursor Canvas Particles */}
      <SparkleCursor enabled={sparkleEnabled} />

      {/* Unified Professional Studio Header */}
      <Header
        activeSlide={activeSlide}
        onSelectSlide={handleSelectSlide}
        onBannerClick={() => {
          sounds.playShinchanGiggle();
          scrollToId('char-shinchan');
        }}
        onTickerClick={() => {
          showToast('Crayon Shin-chan 3D: Special Chocobi Collectibles available in theaters now!');
        }}
        onSocialClick={(platform) => {
          showToast(`Opening Crayon Shin-chan 3D on ${platform}!`);
        }}
        onOpenMenu={() => setNavDrawerOpen(true)}
      />

      {/* Main Theatrical Showcase Experience */}
      <main className="relative flex-1 w-full pb-20">
        {/* Character Sections: 6 Full Theatrical Character Showcases with 3D Holographic Tilt & Manga Speedlines */}
        {CHARACTERS.map((char, index) => (
          <CharacterSection
            key={char.id}
            character={char}
            index={index}
            onDownloadWallpaper={(type, charName) => {
              setWallpaperModal({
                open: true,
                characterName: charName,
                type,
              });
            }}
            onScrollToCinema={() => scrollToId('living-cinema')}
            onScrollToGames={() => scrollToId('kasukabe-arcade')}
          />
        ))}

        {/* Kasukabe Arcade Section with Retro CRT Shader & Canvas FX */}
        <section id="kasukabe-arcade" className="relative w-full py-16 border-b border-neutral-300/80 bg-neutral-100/50">
          <div className="max-w-6xl mx-auto px-4">
            <GamesSection onBackToCharacters={() => scrollToId('char-shinchan')} />
          </div>
        </section>

        {/* Living 3D Cinema Continuous Video Showcase */}
        <LivingCinemaSection />
      </main>

      {/* Right Edge "NAVIGATION" Drawer Toggle */}
      <NavigationDrawer
        isOpen={navDrawerOpen}
        onToggle={() => setNavDrawerOpen(!navDrawerOpen)}
        onSelectNav={(section) => {
          if (section === 'games') {
            scrollToId('kasukabe-arcade');
          } else if (section === 'cinema') {
            scrollToId('living-cinema');
          } else if (section === 'trailers') {
            setTrailerOpen(true);
          } else if (section === 'tickets') {
            setTicketOpen(true);
          } else if (section === 'wallpapers') {
            setWallpaperModal({
              open: true,
              characterName: 'SHIN-CHAN (SHINNOSUKE)',
              type: 'widescreen',
            });
          } else {
            scrollToId('char-shinchan');
          }
        }}
        onSelectCharacter={(id) => {
          scrollToId(`char-${id}`);
          setActiveCharacterId(id);
        }}
      />

      {/* Fixed Floating Bottom Character Bar with Audio Oscilloscope & Legal Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-30 shadow-2xl">
        <CharacterSelectorBar
          activeCharacterId={activeCharacterId}
          onSelectCharacter={(id) => {
            setActiveCharacterId(id);
            scrollToId(`char-${id}`);
          }}
          audioEnabled={audioEnabled}
          onToggleAudio={handleToggleAudio}
          onOpenLegal={() => setLegalOpen(true)}
          sparkleEnabled={sparkleEnabled}
          onToggleSparkle={() => setSparkleEnabled(!sparkleEnabled)}
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl border border-neutral-700 animate-in fade-in slide-in-from-bottom duration-200">
          {toastMessage}
        </div>
      )}

      {/* Interactive Modals */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        initialIndex={trailerIdx}
      />

      <TicketModal
        isOpen={ticketOpen}
        onClose={() => setTicketOpen(false)}
        zipCode={searchZip}
      />

      <LegalModal
        isOpen={legalOpen}
        onClose={() => setLegalOpen(false)}
      />

      <WallpaperModal
        isOpen={wallpaperModal.open}
        onClose={() => setWallpaperModal({ ...wallpaperModal, open: false })}
        characterName={wallpaperModal.characterName}
        wallpaperType={wallpaperModal.type}
      />
    </div>
  );
}
