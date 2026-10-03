/**
 * Web Audio API synthesizer for interactive UI sounds without external audio dependencies.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  public analyser: AnalyserNode | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private connectOutput(node: AudioNode) {
    if (this.analyser) {
      node.connect(this.analyser);
    } else if (this.ctx) {
      node.connect(this.ctx.destination);
    }
  }

  public playBlip(freq = 480, duration = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      this.connectOutput(gain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not permitted or supported
    }
  }

  public playScan() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(880, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      this.connectOutput(gain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // ignore
    }
  }

  public playActionBeam() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Primary laser glide
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      this.connectOutput(gain);

      osc.start(now);
      osc.stop(now + 0.35);

      // High resonance harmonic
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1400, now);
      osc2.frequency.exponentialRampToValueAtTime(400, now + 0.3);

      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc2.connect(gain2);
      this.connectOutput(gain2);

      osc2.start(now);
      osc2.stop(now + 0.3);
    } catch {
      // ignore
    }
  }

  public playShinchanGiggle() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Playful bouncy 5-note ascending/descending arpeggio
      const notes = [587.33, 783.99, 659.25, 880.00, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.07, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.18);

        osc.connect(gain);
        this.connectOutput(gain);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.18);
      });
    } catch {
      // ignore
    }
  }

  public playShiroBark() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.12].forEach((offset) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now + offset);
        osc.frequency.exponentialRampToValueAtTime(950, now + offset + 0.04);
        osc.frequency.exponentialRampToValueAtTime(450, now + offset + 0.09);

        gain.gain.setValueAtTime(0.09, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);

        osc.connect(gain);
        this.connectOutput(gain);

        osc.start(now + offset);
        osc.stop(now + offset + 0.09);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Theatrical Superpower Psychic Blast (超能力大決戦)
   * High-energy dimensional shockwave synthesizing sub-bass + resonant shimmering sweeps
   */
  public playPsychicBlast() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Heavy dimensional sub-impact
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(160, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.55);

      subGain.gain.setValueAtTime(0.2, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      subOsc.connect(subGain);
      this.connectOutput(subGain);
      subOsc.start(now);
      subOsc.stop(now + 0.55);

      // 2. Cosmic telekinetic resonance riser
      const riseOsc = this.ctx.createOscillator();
      const riseGain = this.ctx.createGain();
      riseOsc.type = 'triangle';
      riseOsc.frequency.setValueAtTime(350, now);
      riseOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
      riseOsc.frequency.exponentialRampToValueAtTime(600, now + 0.5);

      riseGain.gain.setValueAtTime(0.12, now);
      riseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      riseOsc.connect(riseGain);
      this.connectOutput(riseGain);
      riseOsc.start(now);
      riseOsc.stop(now + 0.5);
    } catch {
      // ignore
    }
  }

  /**
   * Playful comic pop sound for Onomatopoeia bubbles
   */
  public playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      this.connectOutput(gain);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }

  public playBaymaxChime() {
    this.playShinchanGiggle();
  }
}

export const sounds = new SoundController();
