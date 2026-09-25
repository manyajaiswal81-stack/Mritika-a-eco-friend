// Web Audio API ambient organic soundscape generator
// Completely standalone, no external audio files required.

class SoundscapeSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private nodes: AudioNode[] = [];
  private timer: number | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // 1. Earthen Tanpura / Singing Bowl Warm Drone (Fundamental 108Hz & 216Hz)
      const freqs = [108, 162, 216, 324];
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Gentle lfo modulation for living organic shimmer
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();

        this.nodes.push(osc, gain, lfo, lfoGain);
      });

      // 2. Soft Breeze / Earthen Rustle (Pink Noise filtered)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.05;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(380, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      whiteNoise.start();

      this.nodes.push(whiteNoise, filter, noiseGain);
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.masterGain) {
      this.isPlaying = false;
      return;
    }
    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.nodes.forEach(n => {
          if ('stop' in n && typeof (n as { stop: () => void }).stop === 'function') {
            try { (n as { stop: () => void }).stop(); } catch { /* noop */ }
          }
          try { n.disconnect(); } catch { /* noop */ }
        });
        this.nodes = [];
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
        }
        this.ctx = null;
        this.isPlaying = false;
      }, 1300);
    } catch {
      this.isPlaying = false;
    }
  }

  // Harmonic singing bowl / crystal celebration chime for milestone badge unlocking
  public playMilestoneChime() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.3, now);
      master.connect(ctx.destination);

      // Solfeggio / Earthen singing bowl chord: 432Hz (Earth pitch), 540Hz, 648Hz, 864Hz
      const chimeFreqs = [432, 540, 648, 864];
      chimeFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        // Gentle envelope with bell decay
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.18 / (idx + 1), now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.5);

        osc.connect(gain);
        gain.connect(master);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 2.6);
      });

      setTimeout(() => {
        try { ctx.close(); } catch { /* noop */ }
      }, 3000);
    } catch {
      // Audio playback fallback
    }
  }
}

export const soundscape = new SoundscapeSynthesizer();
