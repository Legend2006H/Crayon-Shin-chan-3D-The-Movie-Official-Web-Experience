import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CharacterData } from '../../data/characters';

interface Props {
  character: CharacterData;
  isCivilian?: boolean;
  className?: string;
  fromDirection?: 'left' | 'right' | 'bottom';
}

export const ShinchanCharacterArt: React.FC<Props> = ({
  character,
  isCivilian = false,
  className = '',
  fromDirection = 'left',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Pick the right image
  const imgSrc =
    character.hasCivilianMode && !isCivilian && character.imageHero
      ? character.imageHero
      : character.imageCasual;

  const initialX = fromDirection === 'left' ? -60 : fromDirection === 'right' ? 60 : 0;
  const initialRotate = fromDirection === 'left' ? -3 : fromDirection === 'right' ? 3 : 0;

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none pt-2 sm:pt-4 pb-2 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Ambient Glow Behind Character */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.35 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute w-56 h-56 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-2xl sm:blur-3xl -z-10 pointer-events-none transition-all duration-700"
        style={{
          backgroundColor: isCivilian ? character.civilianColor : character.heroColor,
          transform: isHovered ? 'scale(1.12)' : undefined,
        }}
      />

      {/* Main 3D Cartoon Cutout with smooth physical entrance */}
      <motion.div
        key={`${character.id}-${isCivilian ? 'civ' : 'hero'}`}
        initial={{
          x: initialX,
          opacity: 0,
          scale: 0.92,
          rotate: initialRotate,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 16,
          mass: 0.9,
        }}
        className="relative z-10 flex items-center justify-center transition-transform duration-300 ease-out"
      >
        <img
          src={imgSrc}
          alt={character.name}
          fetchPriority="high"
          draggable={false}
          className={`max-h-[260px] sm:max-h-[380px] md:max-h-[480px] w-auto object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.22)] transition-all duration-500 ${
            isHovered ? 'scale-[1.03] -translate-y-2 drop-shadow-[0_20px_32px_rgba(0,0,0,0.28)]' : 'scale-100 translate-y-0'
          }`}
        />
      </motion.div>

      {/* Realistic 3D Ground Shadow Oval that settles synchronously */}
      <motion.div
        initial={{ scaleX: 0.3, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.35 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-40 sm:w-56 md:w-64 h-4 sm:h-6 rounded-[100%] bg-neutral-900/30 blur-md -mt-2 sm:-mt-4 transition-all duration-500"
        style={{
          transform: isHovered ? 'scale(0.9) translateY(4px)' : undefined,
          opacity: isHovered ? 0.22 : undefined,
        }}
      />
    </div>
  );
};
