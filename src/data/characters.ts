export interface ReticlePoint {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  detail: string;
}

export interface CharacterData {
  id: string;
  name: string;
  japaneseName: string;
  role: string;
  tagline: string;
  heroColor: string;
  civilianColor: string;
  accentBg: string;
  quote: string;
  japaneseQuote: string;
  description: string[];
  traits: string[];
  specs: { label: string; value: string }[];
  reticles: {
    hero: ReticlePoint[];
    civilian: ReticlePoint[];
  };
  hasCivilianMode: boolean;
  imageCasual: string;
  imageHero?: string;
}

export const CHARACTERS: CharacterData[] = [
  {
    id: 'shinchan',
    name: 'SHIN-CHAN (SHINNOSUKE)',
    japaneseName: '野原しんのすけ',
    role: 'Kasukabe Defense Force Leader & Accidental Cosmic Savior',
    tagline: '5 YEARS OLD // PSYCHIC OVERDRIVE // SUPER DIMENSIONAL HERO',
    heroColor: '#16a34a',
    civilianColor: '#dc2626',
    accentBg: '#ef4444',
    quote: '"Action Beam! Hey pretty lady, ever seen a 5-year-old superhero in action?"',
    japaneseQuote: '「見れば〜？オラ、ちょっぴりスーパーマンだゾ！」',
    description: [
      "When a rogue cosmic dimension spark blasts across Kasukabe, Japan's cheekiest kindergartner unexpectedly inherits reality-bending telekinetic power! But saving the planet isn't on Shinnosuke's schedule—his primary missions remain securing chocolate Chocobi biscuits, dodging Misae's broccoli dinners, and charming pretty girls.",
      "Channeling cosmic energy through his unshakeable optimism and wacky heroic poses, Shin-chan steps up when evil threatens his hometown. With his fluttering Action Kamen cape and iconic butt-alien telekinesis, he turns cosmic warfare into unforgettable comedy."
    ],
    traits: ['★ POTATO-HEAD WISDOM', '★ CHOCOBI CONNOISSEUR', '★ TELEKINETIC BUTT DANCE'],
    specs: [
      { label: 'Classification', value: 'Level-EX Cosmic Anomaly' },
      { label: 'Kindergarten', value: 'Futaba Sunflower Class' },
      { label: 'Secret Weapon', value: 'Action Beam & Butt-Alien Telekinesis' },
      { label: 'Dreaded Nemesis', value: 'Green Bell Peppers & Misae\'s Fist' }
    ],
    reticles: {
      hero: [
        { id: 'sh1', x: 50, y: 14, label: 'Tokusatsu Justice Cowl', detail: 'Emerald battle mask synchronized with Action Kamen\'s righteous television frequency.' },
        { id: 'sh2', x: 52, y: 38, label: 'Cape of Kasukabe Valor', detail: 'Flutters dramatically with cinematic flair, defying indoor atmospheric physics.' },
        { id: 'sh3', x: 50, y: 56, label: 'Golden "A" Champion Belt', detail: 'Harnesses concentrated psychic energy ready to unleash the devastating Action Beam.' },
        { id: 'sh4', x: 28, y: 16, label: 'Fist of Righteous Mischief', detail: 'Held high to rally the Kasukabe Defense Force against cosmic invaders!' }
      ],
      civilian: [
        { id: 'sc1', x: 48, y: 16, label: 'Signature Caterpillar Brows', detail: 'Legendary eyebrows capable of expressing over 500 varieties of cheekiness.' },
        { id: 'sc2', x: 62, y: 35, label: 'Crisp Honeycrisp Apple', detail: 'Sweet afternoon snack procured before heading out on neighborhood adventures.' },
        { id: 'sc3', x: 55, y: 54, label: 'Futaba Sunflower "ひ" Badge', detail: 'Official sunflower class "ひ" (Hi) emblem proudly stitched onto his vest.' },
        { id: 'sc4', x: 41, y: 58, label: 'Leather Explorer Backpack', detail: 'Packed with emergency Chocobi boxes, action cards, and puppy snacks for Shiro.' }
      ]
    },
    hasCivilianMode: true,
    imageCasual: '/images/characters/shinchan_casual.png',
    imageHero: '/images/characters/shinchan_hero.png'
  },
  {
    id: 'shiro',
    name: 'SHIRO (SUPER SHIRO)',
    japaneseName: 'シロ (スーパーシロ)',
    role: 'Fluffy Kasukabe Guardian & Secret Intergalactic Agent',
    tagline: '200 IQ CANINE // MAXIMUM FLUFFINESS // DEFENDER OF EARTH',
    heroColor: '#0284c7',
    civilianColor: '#475569',
    accentBg: '#38bdf8',
    quote: '"Wruff! (The Nohara family\'s only responsible member is on patrol.)"',
    japaneseQuote: '「クゥ〜ン！（野原家の良心、宇宙規模で出動だワン！）」',
    description: [
      "Beneath that adorable, cotton-candy white fur lies the true mastermind of the Nohara household. Rescued in a cardboard box by Shin-chan, Shiro feeds himself, walks himself, and routinely rescues Shin-chan from hilarious blunders.",
      "In his secret persona as SUPER SHIRO, this brave pup is equipped with a high-tech superhero collar and marshmallow-soft agility to defend Kasukabe against galactic mishaps—all while making it back in time for his evening dog food bowl!"
    ],
    traits: ['★ MARSHMALLOW AGILITY', '★ SUPREME RESPONSIBILITY', '★ SECRET HERO COLLAR'],
    specs: [
      { label: 'Species & Breed', value: 'Maltese-Mix Cotton Fluff Canine' },
      { label: 'Tactical Intelligence', value: 'Highest in Nohara Household (Verified)' },
      { label: 'Secret Mission', value: 'Kasukabe Planetary Defense & Snack Security' },
      { label: 'Favorite Rations', value: 'Prime Beef Jerky & Kitchen Scraps' }
    ],
    reticles: {
      hero: [
        { id: 'sr1', x: 50, y: 22, label: 'Radar-Tuned Fluffy Ears', detail: 'Picks up the rustle of a potato chip bag opening up to 3 kilometers away.' },
        { id: 'sr2', x: 58, y: 55, label: 'Super Shiro Transponder Collar', detail: 'Secret galactic communicator directly linking Shiro to the Canine Defense Network.' },
        { id: 'sr3', x: 18, y: 70, label: 'Aero-Wagging Rudder Tail', detail: 'Provides pinpoint steering stability during high-speed leaps over fences.' },
        { id: 'sr4', x: 48, y: 88, label: 'Silent Marshmallow Paws', detail: 'Allows covert nocturnal reconnaissance without triggering Misae\'s alert radar.' }
      ],
      civilian: []
    },
    hasCivilianMode: false,
    imageCasual: '/images/characters/shiro.png'
  },
  {
    id: 'action-kamen',
    name: 'ACTION KAMEN',
    japaneseName: 'アクション仮面',
    role: 'Tokusatsu Earth Champion & Universal Idol of Justice',
    tagline: '50,000 LUMENS OF COURAGE // BROADCAST DAILY AT 5:00 PM',
    heroColor: '#15803d',
    civilianColor: '#0f172a',
    accentBg: '#22c55e',
    quote: '"WA-HA-HA-HA! Courage and laughter will always triumph over darkness! ACTION BEAM!"',
    japaneseQuote: '「ワハハハハ！正義の光よ、悪を討て！アクション・ビーム！！」',
    description: [
      "The undisputed golden standard of heroism for children across Japan, Action Kamen is broadcast every weekday at 5:00 PM sharp. Combining martial arts mastery, supersonic jet technology, and an iconic booming laugh, he stands as an impenetrable wall against villainy.",
      "Equipped with his energized gauntlets and titanium breastplate, Action Kamen channels the righteous cheer of children everywhere to obliterate cosmic conquerors with his legendary Action Beam!"
    ],
    traits: ['★ TOKUSATSU CHAMPION', '★ 50,000-LUMEN BEAM', '★ THUNDEROUS LAUGH'],
    specs: [
      { label: 'Finishing Move', value: 'Action Beam (Cross-Arm Photonic Blast)' },
      { label: 'Combat Classification', value: 'Tokusatsu Planetary Guardian' },
      { label: 'Signature Vehicle', value: 'Supersonic Action Jet Mach 7' },
      { label: 'Arch-Nemesis', value: 'Baron Black & Syndicate of Shadows' }
    ],
    reticles: {
      hero: [
        { id: 'ak1', x: 45, y: 15, label: 'Fin-Crested Hero Helm', detail: 'Armored titanium cowl featuring antennae calibrated to the frequency of justice.' },
        { id: 'ak2', x: 78, y: 18, label: 'Photonic Beam Emitter', detail: 'Crosses with left gauntlet to unleash 50,000 lumens of focused righteous energy.' },
        { id: 'ak3', x: 46, y: 44, label: 'Kinetic Shock Breastplate', detail: 'Absorbs enemy shockwaves and converts impact energy into beam ammunition.' },
        { id: 'ak4', x: 46, y: 64, label: 'Champion "A" Buckle', detail: 'Bio-resonant energy turbine ensuring unbroken battle stamina.' }
      ],
      civilian: []
    },
    hasCivilianMode: false,
    imageCasual: '/images/characters/action_kamen.png'
  },
  {
    id: 'himawari',
    name: 'HIMAWARI NOHARA',
    japaneseName: '野原ひまわり',
    role: 'Kasukabe Diamond Tycoon & High-Velocity Infant Prodigy',
    tagline: '0 YEARS OLD // GEMSTONE RADAR // UNSTOPPABLE CRAWLER',
    heroColor: '#eab308',
    civilianColor: '#f97316',
    accentBg: '#f59e0b',
    quote: '"Ta-ya-ya! Shiny diamonds and handsome gentlemen are all mine!"',
    japaneseQuote: '「たやぁ〜！キラキラお兄さんは全部オラのもの！」',
    description: [
      "Shin-chan's baby sister may not speak complete sentences yet, but she commands the household with royal authority. Possessing an instinctive radar for 24-karat gold and glittering gemstones, Himawari locks onto high-end jewelry with laser-sharp precision.",
      "Armed with a high-friction crawler onesie and a sparkling teary gaze that instantly melts father Hiroshi into submission, Himawari outmaneuvers her older brother and claims whatever treasure catches her eye."
    ],
    traits: ['★ 24K GOLD RADAR', '★ MACH 0.8 CRAWL SPEED', '★ TEARY-EYED CHARM'],
    specs: [
      { label: 'Age & Rank', value: '0 Years / Kasukabe Infant Royalty' },
      { label: 'Max Crawl Speed', value: 'Mach 0.8 on Polished Wooden Floors' },
      { label: 'Primary Weakness', value: 'Handsome Television Idols & Diamonds' },
      { label: 'Signature Move', value: 'Heart-Melting Sparkling Teary Gaze' }
    ],
    reticles: {
      hero: [
        { id: 'hw1', x: 48, y: 18, label: 'Copper Ribbon Hair Curl', detail: 'Twitches and points like a compass needle whenever precious gems are nearby.' },
        { id: 'hw2', x: 62, y: 58, label: '24-Karat Brilliant Diamond', detail: 'Her prized treasure discovered during Kasukabe city strolls, polished daily.' },
        { id: 'hw3', x: 45, y: 72, label: 'Duckling Drift Onesie', detail: 'Reinforced knee pads engineered for high-friction carpet drifting and fast escapes.' }
      ],
      civilian: []
    },
    hasCivilianMode: false,
    imageCasual: '/images/characters/himawari.png'
  },
  {
    id: 'buriburizaemon',
    name: 'BURIBURIZAEMON',
    japaneseName: 'ぶりぶりざえもん',
    role: 'The 10-Billion-Yen Ronin Pig & Master of Tactical Defection',
    tagline: 'DUAL-BOKKEN SWORDSMAN // RESCUE FEE: 10 BILLION YEN // ZERO LOYALTY',
    heroColor: '#8b5cf6',
    civilianColor: '#6b7280',
    accentBg: '#7c3aed',
    quote: '"I am always on the winning side! If you require my blade, pay the invoice first!"',
    japaneseQuote: '「私は常に強い者の味方だ。助けを呼ぶならまず着手金を振り込みたまえ！」',
    description: [
      "Conjured directly from Shin-chan's wildly transactional imagination, Buriburizaemon is a masterless samurai pig carrying twin oak bokken. While boasting peerless swordsmanship, he operates on one golden rule: immediately surrender to whoever has the upper hand.",
      "Despite demanding an exorbitant 10 billion yen retainer fee and frequently switching sides mid-battle, his hilarious blunders and opportunistic retreats somehow always save the day in the most unexpected ways."
    ],
    traits: ['★ 10 BILLION YEN FEE', '★ STRATEGIC SURRENDER', '★ OAK BOKKEN MASTERY'],
    specs: [
      { label: 'Combat Philosophy', value: '"Only fight when victory is 100% assured"' },
      { label: 'Standard Retainer', value: '10,000,000,000 Yen (Chocobi Accepted)' },
      { label: 'Primary Weapon', value: 'Dual Hand-Carved Oak Bokken Blades' },
      { label: 'Allied Loyalty', value: '0.00% (Strictly Transactional)' }
    ],
    reticles: {
      hero: [
        { id: 'bz1', x: 50, y: 22, label: 'Stoic Pig Snout & Brow', detail: 'Radiates samurai warrior dignity while covertly calculating the closest escape exit.' },
        { id: 'bz2', x: 62, y: 48, label: 'Authentic "Buri" Crest', detail: 'Hand-dyed indigo kimono crest denoting his legendary masterless ronin status.' },
        { id: 'bz3', x: 55, y: 60, label: 'Dual Oak Bokken Blades', detail: 'Whittled from sacred park timber; devastating against imaginary monsters.' },
        { id: 'bz4', x: 48, y: 64, label: 'Royal Purple Silk Obi', detail: 'Secures his wooden swords against rapid strategic retreat maneuvers.' }
      ],
      civilian: []
    },
    hasCivilianMode: false,
    imageCasual: '/images/characters/buriburizaemon.png'
  },
  {
    id: 'kazama',
    name: 'TORU KAZAMA',
    japaneseName: '風間トオル',
    role: 'Sunflower Class Prodigy & Exasperated Voice of Reason',
    tagline: 'ENGLISH CRAM SCHOOL HONORS // FUTURE DIPLOMAT // SECRET MOE-P STAN',
    heroColor: '#2563eb',
    civilianColor: '#475569',
    accentBg: '#1d4ed8',
    quote: '"Shinnosuke, stop this madness! We are civilized kindergarten gentlemen!"',
    japaneseQuote: '「しんのすけ！僕たちはエリート園児なんだぞ！変な踊りをやめろ！」',
    description: [
      "Shin-chan's refined, high-achieving best friend and Sunflower Class standout. Attending prestigious English cram schools and dressed in impeccably tailored blazers, Kazama dreams of representing Japan on the international diplomatic stage.",
      "While constantly struggling to maintain an aura of aristocratic maturity amidst Shin-chan's outrageous public antics, Kazama is the loyal tactical heart of the Kasukabe Defense Force—even if he secretly hides a massive collection of magical girl Moe-P merchandise!"
    ],
    traits: ['★ SUNFLOWER TOP RANK', '★ FLUENT ENGLISH', '★ SECRET MOE-P COLLECTOR'],
    specs: [
      { label: 'Academic Standing', value: 'Straight-A Honors & English Cram Graduate' },
      { label: 'Kasukabe Defense Role', value: 'Chief Strategist & Tactical Coordinator' },
      { label: 'Secret Vulnerability', value: 'Shin-chan Whispering In His Ear' },
      { label: 'Prized Collection', value: 'Limited Edition Moe-P Transformation Wand' }
    ],
    reticles: {
      hero: [
        { id: 'kz1', x: 50, y: 15, label: 'Futaba Straw Sun Hat', detail: 'Official sunflower crest kindergarten cap required for proper Kasukabe etiquette.' },
        { id: 'kz2', x: 49, y: 33, label: 'Crimson Silk Bowtie', detail: 'Tied with geometric perfection every morning before boarding the Cat Bus.' },
        { id: 'kz3', x: 45, y: 44, label: 'Tailored Academy Blazer', detail: 'Sharp navy wool with gold crested buttons, kept without a single wrinkle.' },
        { id: 'kz4', x: 50, y: 92, label: 'Polished Recess Loafers', detail: 'Hand-buffed leather shoes kept spotless throughout preschool recess.' }
      ],
      civilian: []
    },
    hasCivilianMode: false,
    imageCasual: '/images/characters/kazama.png'
  }
];

export interface MiniGame {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
}

export const MINI_GAMES: MiniGame[] = [
  {
    id: 'chocobi-catch',
    title: 'CHOCOBI BONANZA',
    tagline: 'Catch falling pink Chocobi biscuit boxes and gold stars while dodging green peppers!',
    badge: 'FEATURED ARCADE',
    description: 'Move Shin-chan left and right with your mouse or keys to catch delicious Chocobi boxes and Action Kamen cards! Watch out for Misae\'s dreaded green peppers!'
  },
  {
    id: 'action-beam-blast',
    title: 'ACTION BEAM BLAST',
    tagline: 'Charge up your Action Kamen power and blast alien invader targets across Kasukabe!',
    badge: 'ACTION CHALLENGE',
    description: 'Aim and unleash high-energy Action Beams! Time your power bar to reach 100% maximum overdrive for the ultimate triple-laser finish!'
  },
  {
    id: 'super-shiro-run',
    title: 'SUPER SHIRO FLUFFY RUN',
    tagline: 'Guide Super Shiro across Kasukabe rooftops collecting bones and saving the day!',
    badge: 'SPEED ARCADE',
    description: 'Jump, duck, and use Shiro\'s fluffy marshmallow roll to leap over obstacles, grab tasty puppy treats, and return home before dinner!'
  }
];
