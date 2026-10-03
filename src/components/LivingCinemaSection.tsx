import React, { useRef, useEffect } from 'react';

export const LivingCinemaSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play when scrolled into view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay policy fallback
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="living-cinema"
      className="relative w-full min-h-[75vh] md:min-h-[88vh] lg:min-h-[95vh] overflow-hidden flex flex-col justify-end select-none bg-neutral-950"
    >
      {/* 
        Full-Area Continuous Background Video:
        - Covers the entire area edge-to-edge
        - Zoomed (scale-125, origin-[30%_35%]) so the Gemini watermark is 100% cropped out
        - Runs automatically when scrolled into view
        - Zero tabs, zero badges, zero buttons on the video
      */}
      <video
        ref={videoRef}
        src="/videos/shinchan_3d_walk.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-[1.25] origin-[30%_35%] pointer-events-none z-0"
      />

      {/* Seamless blend from the website background into the video at the top */}
      <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 md:h-44 bg-gradient-to-b from-[#f0f2f5] via-[#f0f2f5]/40 to-transparent pointer-events-none z-10" />

      {/* Seamless bottom vignette for clean transition into the footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent pointer-events-none z-10" />

      {/* Clean, authentic movie copyright footer at the very bottom */}
      <div className="relative z-20 w-full pb-16 pt-6 px-4 text-center">
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
          TOHO CO., LTD. • SHIN-EI ANIMATION • TV ASAHI • ADK EMOTIONS • FUTABASHA
        </p>
        <p className="text-[9px] sm:text-[10px] text-neutral-500 mt-1">
          © USUI YOSHITO / FUTABASHA • SHIN-EI • TV ASAHI • ADK 2026. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  );
};
