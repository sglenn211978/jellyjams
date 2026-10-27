// --- HARDWARE-SYNCED MULTI-TRACK AUDIO ENGINE WITH 17 AUTHENTIC VOCAL STEMS ---

export const ALL_SPECIES_LIST = [
  'diva', 'zap', 'bob', 'siren', 'sparkpuff', 'queen', 'starlight',
  'angler', 'magma', 'vent', 'obsidian', 'pyre',
  'crystal_bell', 'lofi_spore', 'nautilus', 'prism_bloom', 'lapis_groove'
];

export const SPECIES_ISLAND_MAP = {
  diva: 'lagoon', zap: 'lagoon', bob: 'lagoon', siren: 'lagoon', sparkpuff: 'lagoon', queen: 'lagoon', starlight: 'lagoon',
  angler: 'trench', magma: 'trench', vent: 'trench', obsidian: 'trench', pyre: 'trench',
  crystal_bell: 'cavern', lofi_spore: 'cavern', nautilus: 'cavern', prism_bloom: 'cavern', lapis_groove: 'cavern'
};

export const DEFAULT_UNLOCKED = {
  diva: true, zap: true,
  angler: true, magma: true,
  crystal_bell: true, lofi_spore: true
};

export class JellyAudioEngine {
  constructor() {
    this.ctx = null;
    this.stems = {};
    this.volumes = {};
    this.buffers = {};
    this.loopStartTime = 0;
    this.loopDuration = 13.7142857; // 8 bars @ 140 BPM
    this.playbackRate = 1.0;
    this.isNight = false;

    // Master Audio Processing Graph
    this.masterGain = null;
    this.clubFilter = null;
    this.bassBoost = null;
    this.delayNode = null;
    this.delayGain = null;
    this.delayFeedback = null;
    this.noiseBuffer = null;

    // High-Precision Musical Lookahead Scheduler
    this.schedulerTimer = null;
    this.lastScheduledTime = 0;
    this.totalSteps = 32; // 32 eighth-note steps per 4-bar loop (140 BPM base)
    this.currentIsland = 'lagoon';
  }

  quantizeBuffer(rawBuffer, id) {
    if (!this.ctx) return rawBuffer;
    const sampleRate = rawBuffer.sampleRate;
    const fourBarDuration = (60 / 140) * 16; // 6.857142857 s
    const fourBarSamples = Math.round(fourBarDuration * sampleRate); // 302400 @ 44.1kHz
    const eightBarSamples = fourBarSamples * 2; // 604800
    const sixteenBarSamples = fourBarSamples * 4; // 1209600

    let targetSamples = fourBarSamples;
    let shouldResample = false;

    if (id === 'zap' || rawBuffer.duration > 20.0) {
      targetSamples = sixteenBarSamples;
    } else if (id === 'diva' || id === 'lofi_spore' || id === 'sparkpuff' || id === 'starlight' || rawBuffer.duration > 9.5) {
      targetSamples = eightBarSamples;
    } else if (id === 'magma' || id === 'obsidian') {
      shouldResample = true;
    }

    const channels = rawBuffer.numberOfChannels;
    const out = this.ctx.createBuffer(channels, targetSamples, sampleRate);

    for (let ch = 0; ch < channels; ch++) {
      const src = rawBuffer.getChannelData(ch);
      const dst = out.getChannelData(ch);

      if (shouldResample && src.length > 0) {
        const ratio = (src.length - 1) / (targetSamples - 1);
        for (let i = 0; i < targetSamples; i++) {
          const pos = i * ratio;
          const idx = Math.floor(pos);
          const frac = pos - idx;
          dst[i] = idx + 1 < src.length ? src[idx] * (1 - frac) + src[idx + 1] * frac : src[idx];
        }
      } else {
        const copyLen = Math.min(src.length, targetSamples);
        dst.set(src.subarray(0, copyLen));
      }
    }
    return out;
  }

  async init(performersState = {}, initialVolumes = {}, currentIsland = 'lagoon') {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.warn('AudioContext resume deferred until user gesture:', e);
      }
    }

    this.currentIsland = currentIsland;
    this.loopStartTime = this.ctx.currentTime + 0.1;
    this.lastScheduledTime = this.loopStartTime;

    // 1. Pre-render a white noise buffer for Queen Beatbox's snare / claps
    const noiseLength = Math.floor(this.ctx.sampleRate * 0.5);
    const noiseBuffer = this.ctx.createBuffer(1, noiseLength, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseLength; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = noiseBuffer;

    // 2. Build Master Acoustic Processing Network
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

    this.clubFilter = this.ctx.createBiquadFilter();
    this.clubFilter.type = 'lowpass';
    this.clubFilter.frequency.setValueAtTime(20000, this.ctx.currentTime);
    this.clubFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    this.bassBoost = this.ctx.createBiquadFilter();
    this.bassBoost.type = 'lowshelf';
    this.bassBoost.frequency.setValueAtTime(95, this.ctx.currentTime);
    this.bassBoost.gain.setValueAtTime(0, this.ctx.currentTime);

    // Cosmic Rave Dub Delay Network
    this.delayNode = this.ctx.createDelay(1.0);
    this.delayNode.delayTime.setValueAtTime(0.25, this.ctx.currentTime);

    this.delayGain = this.ctx.createGain();
    this.delayGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.setValueAtTime(0.28, this.ctx.currentTime);

    // Wire up master graph
    this.clubFilter.connect(this.delayGain);
    this.delayGain.connect(this.delayNode);
    this.delayNode.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delayNode);
    this.delayNode.connect(this.bassBoost);

    this.clubFilter.connect(this.bassBoost);
    this.bassBoost.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    // 3. Preload and quantize all 17 authentic vocal recordings in parallel!
    const loadPromises = ALL_SPECIES_LIST.map(async (name) => {
      try {
        const url = `/audio/${name}.wav`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Could not find ${url}`);

        const arrayBuffer = await response.arrayBuffer();
        const rawBuffer = await this.ctx.decodeAudioData(arrayBuffer);
        this.buffers[name] = this.quantizeBuffer(rawBuffer, name);
      } catch (err) {
        console.warn(`Audio stem for ${name} not yet loaded:`, err.message);
      }
    });

    await Promise.all(loadPromises);

    // Seed saved channel volume faders
    ALL_SPECIES_LIST.forEach((id) => {
      if (initialVolumes[id] !== undefined) {
        this.volumes[id] = initialVolumes[id] > 2.5 ? initialVolumes[id] / 100 : initialVolumes[id];
      }
    });

    this.loopStartTime = this.ctx.currentTime + 0.05;
    this.lastScheduledTime = this.loopStartTime;

    // 4. Start all 17 synchronized loop audio sources in sample-accurate lockstep
    for (const name of ALL_SPECIES_LIST) {
      const audioBuffer = this.buffers[name];
      if (!audioBuffer) continue;

      const source = this.ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;

      const isUnlocked = performersState[name]?.unlocked ?? DEFAULT_UNLOCKED[name] ?? false;
      const isSleeping = Boolean(performersState[name]?.isSleeping);
      const isCurrentIsland = SPECIES_ISLAND_MAP[name] === this.currentIsland;
      const vol = this.volumes[name] ?? 1.0;

      const gainNode = this.ctx.createGain();
      const initialGain = (isCurrentIsland && isUnlocked && !isSleeping) ? Math.min(1.8, vol * 0.85) : 0;
      gainNode.gain.setValueAtTime(initialGain, this.ctx.currentTime);

      source.playbackRate.setValueAtTime(this.playbackRate, this.ctx.currentTime);

      const panner = this.createSpatialPanner(name);
      source.connect(gainNode);
      if (panner) {
        gainNode.connect(panner);
        panner.connect(this.clubFilter);
      } else {
        gainNode.connect(this.clubFilter);
      }

      const analyser = this.ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.4;
      gainNode.connect(analyser);

      source.start(this.loopStartTime);
      this.stems[name] = {
        source,
        gainNode,
        analyser,
        analyserData: new Uint8Array(analyser.frequencyBinCount),
        panner,
        isSleeping,
        unlocked: isUnlocked,
        volume: vol,
        islandId: SPECIES_ISLAND_MAP[name]
      };
    }

    // 5. Start Master Rhythmic Lookahead Sequencer
    this.startClockScheduler();
  }

  getVocalEnergy(name) {
    const stem = this.stems[name];
    if (!stem?.analyser || stem.isSleeping || stem.gainNode?.gain?.value < 0.01) {
      return 0;
    }
    stem.analyser.getByteFrequencyData(stem.analyserData);
    let sum = 0;
    const count = stem.analyserData.length;
    for (let i = 0; i < count; i++) {
      sum += stem.analyserData[i];
    }
    const avg = sum / (count * 255);
    if (avg < 0.035) return 0;
    return Math.min(1.0, (avg - 0.035) * 1.85);
  }

  createSpatialPanner(name) {
    if (!this.ctx || !this.ctx.createStereoPanner) return null;
    const panner = this.ctx.createStereoPanner();
    const panMap = {
      // Lagoon
      diva: -0.32,      // Floaty Diva (Left)
      bob: -0.15,       // Boombox Bob (Mid-Left)
      siren: -0.52,     // Volt Siren (Far-Left)
      sparkpuff: 0.0,   // DJ Spark-Puff (Center bass)
      queen: 0.22,      // Queen Beatbox (Mid-Right)
      starlight: 0.55,  // Starlight Jelly (Far-Right chime)
      zap: 0.38,        // Zap Jelly (Right)
      // Trench
      angler: -0.38,    // Angler Bass (Mid-Left)
      magma: -0.15,     // Magma Medusa (Center-Left)
      vent: 0.2,        // Vent Cracker (Center-Right)
      obsidian: 0.52,   // Obsidian Siren (Far-Right)
      pyre: -0.52,      // Pyre Puff (Far-Left)
      // Cavern
      crystal_bell: -0.42, // Crystal Bell (Left)
      lofi_spore: -0.12,   // Lo-Fi Spore (Center-Left)
      nautilus: 0.18,      // Echo Nautilus (Center-Right)
      prism_bloom: 0.5,    // Prism Bloom (Far-Right)
      lapis_groove: 0.0    // Lapis Groove (Center)
    };
    panner.pan.setValueAtTime(panMap[name] ?? 0, this.ctx.currentTime);
    return panner;
  }

  async addStem(name) {
    this.unlockPerformer(name);
  }

  setMute(name, isSleeping) {
    const stem = this.stems[name];
    if (!stem || !this.ctx) return;

    stem.isSleeping = isSleeping;
    if (stem.gainNode) {
      const now = this.ctx.currentTime;
      const isTargetIsland = stem.islandId === this.currentIsland;
      const shouldSing = isTargetIsland && stem.unlocked && !isSleeping;
      const vol = stem.volume ?? this.volumes[name] ?? 1.0;
      const targetGain = shouldSing ? Math.min(1.8, vol * 0.85) : 0;

      stem.gainNode.gain.cancelScheduledValues(now);
      stem.gainNode.gain.setValueAtTime(stem.gainNode.gain.value, now);
      stem.gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.05);
    }
  }

  setPerformerVolume(name, volume) {
    const normalized = volume > 2.5 ? volume / 100 : volume;
    const clamped = Math.max(0, Math.min(2.0, normalized));
    this.volumes[name] = clamped;

    const stem = this.stems[name];
    if (!stem) return;
    stem.volume = clamped;

    if (stem.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      const isTargetIsland = stem.islandId === this.currentIsland;
      const shouldSing = isTargetIsland && stem.unlocked && !stem.isSleeping;
      if (shouldSing) {
        stem.gainNode.gain.cancelScheduledValues(now);
        stem.gainNode.gain.setValueAtTime(stem.gainNode.gain.value, now);
        stem.gainNode.gain.linearRampToValueAtTime(Math.min(1.8, clamped * 0.85), now + 0.04);
      }
    }
  }

  setMasterVolume(volume) {
    const normalized = volume > 2.5 ? volume / 100 : volume;
    const clamped = Math.max(0, Math.min(2.0, normalized));
    this.masterVolume = clamped;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.95 * clamped, now + 0.04);
    }
  }

  setPlaybackRate(rate) {
    this.playbackRate = rate;
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    for (const stem of Object.values(this.stems)) {
      if (stem?.source?.playbackRate) {
        stem.source.playbackRate.cancelScheduledValues(now);
        stem.source.playbackRate.setValueAtTime(stem.source.playbackRate.value, now);
        stem.source.playbackRate.linearRampToValueAtTime(rate, now + 0.08);
      }
    }

    if (this.delayNode) {
      this.delayNode.delayTime.cancelScheduledValues(now);
      this.delayNode.delayTime.setValueAtTime(this.delayNode.delayTime.value, now);
      this.delayNode.delayTime.linearRampToValueAtTime(0.25 / rate, now + 0.08);
    }

    // Reset last scheduled time to current moment so scheduler picks up cleanly
    this.lastScheduledTime = Math.max(now, this.lastScheduledTime);
  }

  setNightRaveAcoustics(enableNight) {
    this.isNight = enableNight;
    if (!this.clubFilter || !this.bassBoost || !this.delayGain || !this.ctx) return;
    const now = this.ctx.currentTime;

    this.clubFilter.frequency.cancelScheduledValues(now);
    this.clubFilter.frequency.setValueAtTime(this.clubFilter.frequency.value, now);
    this.bassBoost.gain.cancelScheduledValues(now);
    this.bassBoost.gain.setValueAtTime(this.bassBoost.gain.value, now);
    this.delayGain.gain.cancelScheduledValues(now);
    this.delayGain.gain.setValueAtTime(this.delayGain.gain.value, now);

    if (enableNight) {
      // Midnight Neon Rave: Punchy low-end club boost, warm club filter sweep & dub delay
      this.clubFilter.frequency.exponentialRampToValueAtTime(2200, now + 0.4);
      this.bassBoost.gain.linearRampToValueAtTime(5.0, now + 0.4);
      this.delayGain.gain.linearRampToValueAtTime(0.35, now + 0.4);
    } else {
      // Sunlit Reef: Crisp, bright, open-air sunlit acoustics
      this.clubFilter.frequency.exponentialRampToValueAtTime(20000, now + 0.4);
      this.bassBoost.gain.linearRampToValueAtTime(0, now + 0.4);
      this.delayGain.gain.linearRampToValueAtTime(0, now + 0.4);
    }
  }

  startHybridSynth(species) {
    this.unlockPerformer(species);
  }

  unlockPerformer(species) {
    const stem = this.stems[species];
    if (!stem) return;
    stem.unlocked = true;

    if (stem.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      const isTargetIsland = stem.islandId === this.currentIsland;
      const shouldSing = isTargetIsland && !stem.isSleeping;
      const vol = stem.volume ?? this.volumes[species] ?? 1.0;
      const targetGain = shouldSing ? Math.min(1.8, vol * 0.85) : 0;

      stem.gainNode.gain.cancelScheduledValues(now);
      stem.gainNode.gain.setValueAtTime(stem.gainNode.gain.value, now);
      stem.gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.1);
    }
  }

  switchIsland(targetIslandId) {
    this.currentIsland = targetIslandId;
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    for (const [id, stem] of Object.entries(this.stems)) {
      if (stem?.gainNode) {
        const isTargetIsland = stem.islandId === targetIslandId;
        const shouldSing = isTargetIsland && stem.unlocked && !stem.isSleeping;
        const targetGain = shouldSing ? Math.min(1.8, (stem.volume ?? this.volumes[id] ?? 1.0) * 0.85) : 0;

        stem.gainNode.gain.cancelScheduledValues(now);
        stem.gainNode.gain.setValueAtTime(stem.gainNode.gain.value, now);
        stem.gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.2);
      }
    }

    this.lastScheduledTime = Math.max(now, this.lastScheduledTime);
  }

  // =========================================================================
  // PRECISION LOOKAHEAD CLOCK SCHEDULER
  // =========================================================================

  startClockScheduler() {
    if (this.schedulerTimer) clearInterval(this.schedulerTimer);

    // Ticks every 25ms to look ahead by 120ms
    this.schedulerTimer = setInterval(() => {
      this.scheduleUpcomingNotes();
    }, 25);
  }

  scheduleUpcomingNotes() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const lookaheadTime = now + 0.12;
    const stepTimeReal = (this.loopDuration / this.totalSteps) / this.playbackRate;

    // Guard against desync if tab was backgrounded
    if (this.lastScheduledTime < now - 0.2) {
      this.lastScheduledTime = now;
    }

    while (this.lastScheduledTime < lookaheadTime) {
      // Clock advances in sample-accurate lockstep with the 17-track audio loops
      this.lastScheduledTime += stepTimeReal;
    }
  }

  // =========================================================================
  // REAL-VOICE VOCAL SAMPLER & HARMONY ENGINE
  // =========================================================================
  // Slices, pitch-transposes, harmonizes, and formant-shapes the real human
  // vocal recordings (diva.mp3, zap.mp3, bob.mp3) so all 17 monsters sing
  // with authentic human-derived monster voices instead of MIDI oscillators!

  triggerVocalSample(species, bufferKey, time, opts = {}) {
    if (!this.ctx) return false;
    const buf = this.buffers[bufferKey] || this.buffers.diva || this.buffers.zap || this.buffers.bob;
    if (!buf) return false;

    const vol = opts.ignoreStemVolume ? 1.0 : (this.stems[species]?.volume ?? this.volumes[species] ?? 1.0);
    if (vol <= 0.001) return false;

    const source = this.ctx.createBufferSource();
    source.buffer = buf;

    const basePitch = opts.pitch ?? opts.rate ?? 1.0;
    const rate = Math.max(0.25, Math.min(3.5, basePitch * this.playbackRate));
    const dur = (opts.dur ?? opts.duration ?? 0.45) / this.playbackRate;

    source.playbackRate.setValueAtTime(rate, time);
    if (opts.pitchEnd) {
      const endRate = Math.max(0.25, Math.min(3.5, opts.pitchEnd * this.playbackRate));
      source.playbackRate.exponentialRampToValueAtTime(endRate, time + dur);
    }

    if (opts.detune) {
      source.detune.setValueAtTime(opts.detune, time);
    }

    if (opts.vibrato) {
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(opts.vibratoRate ?? 5.8, time);
      lfoGain.gain.setValueAtTime(opts.vibratoDepth ?? 22, time);
      lfo.connect(lfoGain);
      lfoGain.connect(source.detune);
      lfo.start(time);
      lfo.stop(time + dur + 0.03);
    }

    const env = this.ctx.createGain();
    const attack = Math.min(dur * 0.35, opts.attack ?? 0.02);
    const release = Math.min(dur * 0.45, opts.release ?? 0.08);
    // Boost vocal presence (1.45x makeup gain) so all hybrid/Trench/Cavern singers match primary stem loudness
    const peakGain = Math.min(2.2, (opts.gain ?? 0.82) * 1.45 * vol);

    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(peakGain, time + attack);
    env.gain.setValueAtTime(peakGain, time + Math.max(attack, dur - release));
    env.gain.exponentialRampToValueAtTime(0.0001, time + dur);

    if (opts.filterFreq) {
      const filter = this.ctx.createBiquadFilter();
      // Use resonant peaking formant EQ instead of narrow bandpass/highpass so vocal body is never thinned out
      const requestedType = opts.filterType || 'peaking';
      filter.type = (requestedType === 'bandpass' || requestedType === 'highpass') ? 'peaking' : requestedType;
      filter.frequency.setValueAtTime(opts.filterFreq, time);
      filter.Q.setValueAtTime(Math.min(1.8, opts.filterQ ?? 1.2), time);
      if (filter.type === 'peaking') {
        filter.gain.setValueAtTime(opts.filterGain ?? 5.5, time);
      }
      source.connect(filter);
      filter.connect(env);
    } else {
      source.connect(env);
    }

    const dest = opts.directDestination ? (this.masterGain || this.ctx.destination) : this.clubFilter;
    const panner = this.stems[species]?.panner;
    if (panner && !opts.directDestination) {
      env.connect(panner);
      panner.connect(dest);
    } else {
      env.connect(dest);
    }

    const maxOffset = Math.max(0, buf.duration - 0.15);
    const safeOffset = Math.max(0, Math.min(opts.offset ?? 0.05, maxOffset));
    const bufferSliceLen = Math.min(buf.duration - safeOffset, (dur + 0.04) * Math.max(1.0, rate));

    source.start(time, safeOffset, bufferSliceLen);
    source.stop(time + dur + 0.03);

    // Optional multi-voice vocal harmony layers (choir / duet voices)
    if (Array.isArray(opts.harmonyRates) && opts.harmonyRates.length > 0) {
      const harmGainFactor = opts.harmonyGain ?? 0.45;
      opts.harmonyRates.forEach((harmRate, idx) => {
        if (!harmRate) return;
        this.triggerVocalSample(species, bufferKey, time + (idx + 1) * 0.006, {
          ...opts,
          pitch: harmRate,
          rate: harmRate,
          gain: (opts.gain ?? 0.65) * harmGainFactor,
          harmonyRates: null
        });
      });
    }

    return true;
  }

  // =========================================================================
  // ISLAND 1 (CORAL LAGOON) REAL-VOICE HYBRID SINGERS
  // =========================================================================

  // 1. DJ Spark-Puff: Funky Human Vocal Scat & Acapella "Doo-Doo" Bassline
  playSparkPuffStep(step, time) {
    const vocalFunkPattern = {
      0:  { buf: 'bob', offset: 1.04, pitch: 0.75, dur: 0.38, gain: 0.85 }, // Deep "Doo!" bass
      2:  { buf: 'zap', offset: 0.04, pitch: 0.89, dur: 0.30, gain: 0.70 }, // "Bwa-da!" vocal scat
      4:  { buf: 'bob', offset: 1.30, pitch: 0.89, dur: 0.34, gain: 0.80 }, // "Doo!"
      6:  { buf: 'zap', offset: 0.54, pitch: 1.00, dur: 0.34, gain: 0.75 }, // "Ba-da-wow!"
      8:  { buf: 'bob', offset: 1.04, pitch: 0.84, dur: 0.38, gain: 0.85 }, // "Doo!"
      10: { buf: 'zap', offset: 1.10, pitch: 0.94, dur: 0.30, gain: 0.72 }, // "Waka!"
      12: { buf: 'bob', offset: 3.14, pitch: 1.00, dur: 0.36, gain: 0.82 }, // "Doo-ba!"
      14: { buf: 'zap', offset: 2.12, pitch: 1.12, dur: 0.34, gain: 0.75 }, // "Bow-wow!"
      16: { buf: 'bob', offset: 1.04, pitch: 0.75, dur: 0.38, gain: 0.85 }, // Deep "Doo!"
      18: { buf: 'zap', offset: 0.04, pitch: 1.00, dur: 0.30, gain: 0.72 }, // "Bwa-da!"
      20: { buf: 'bob', offset: 1.56, pitch: 0.94, dur: 0.34, gain: 0.80 }, // "Doo!"
      22: { buf: 'zap', offset: 3.16, pitch: 1.18, dur: 0.36, gain: 0.76 }, // "Da-ba-da!"
      24: { buf: 'bob', offset: 1.04, pitch: 0.89, dur: 0.38, gain: 0.85 }, // "Doo!"
      26: { buf: 'zap', offset: 0.54, pitch: 1.06, dur: 0.32, gain: 0.74 }, // "Ba-da!"
      28: { buf: 'bob', offset: 3.14, pitch: 0.84, dur: 0.36, gain: 0.82 }, // "Doo-ba!"
      30: { buf: 'zap', offset: 1.10, pitch: 1.12, dur: 0.34, gain: 0.75 }  // "Waka-bow!"
    };
    const p = vocalFunkPattern[step];
    if (!p) return;

    this.triggerVocalSample('sparkpuff', p.buf, time, {
      offset: p.offset,
      pitch: p.pitch,
      dur: p.dur,
      gain: p.gain,
      filterFreq: 950,
      filterGain: 5.0
    });
  }

  // 2. Queen Beatbox: Royal Human Vocal Beatbox & Scat Percussion
  playQueenStep(step, time) {
    const queenVocalRoutine = {
      0:  { buf: 'bob',  offset: 0.00, pitch: 1.18, dur: 0.28, gain: 0.90 }, // Vocal Kick "Bmm!"
      2:  { buf: 'bob',  offset: 2.12, pitch: 1.35, dur: 0.22, gain: 0.68 }, // Vocal Hi-Hat "Tss!"
      4:  { buf: 'bob',  offset: 0.50, pitch: 1.25, dur: 0.28, gain: 0.88 }, // Vocal Rimshot "Pff-Bap!"
      6:  { buf: 'diva', offset: 1.08, pitch: 1.33, dur: 0.26, gain: 0.65 }, // Vocal Shout "Hm!"
      8:  { buf: 'bob',  offset: 0.00, pitch: 1.18, dur: 0.28, gain: 0.90 }, // Vocal Kick "Bmm!"
      10: { buf: 'bob',  offset: 1.05, pitch: 1.33, dur: 0.26, gain: 0.75 }, // Vocal Bounce "Doo!"
      12: { buf: 'bob',  offset: 0.50, pitch: 1.28, dur: 0.28, gain: 0.88 }, // Vocal Snare "Bap!"
      14: { buf: 'zap',  offset: 0.04, pitch: 1.35, dur: 0.24, gain: 0.68 }, // Vocal Scat "Bwa!"
      16: { buf: 'bob',  offset: 0.00, pitch: 1.18, dur: 0.28, gain: 0.90 }, // Vocal Kick "Bmm!"
      18: { buf: 'bob',  offset: 2.12, pitch: 1.40, dur: 0.22, gain: 0.68 }, // Vocal "Tss!"
      20: { buf: 'bob',  offset: 0.50, pitch: 1.25, dur: 0.28, gain: 0.88 }, // Vocal Snare "Bap!"
      22: { buf: 'diva', offset: 2.12, pitch: 1.50, dur: 0.26, gain: 0.68 }, // High Vocal "La!"
      24: { buf: 'bob',  offset: 0.00, pitch: 1.22, dur: 0.28, gain: 0.90 }, // Vocal Kick "Bmm!"
      26: { buf: 'bob',  offset: 3.14, pitch: 1.33, dur: 0.26, gain: 0.78 }, // Vocal "Doo-ba!"
      28: { buf: 'bob',  offset: 0.50, pitch: 1.30, dur: 0.28, gain: 0.90 }, // Vocal Snare "Bap!"
      30: { buf: 'zap',  offset: 0.54, pitch: 1.42, dur: 0.26, gain: 0.72 }  // Vocal Turnaround "Ba-da!"
    };
    const q = queenVocalRoutine[step];
    if (!q) return;

    this.triggerVocalSample('queen', q.buf, time, {
      offset: q.offset,
      pitch: q.pitch,
      dur: q.dur,
      gain: q.gain,
      attack: 0.012
    });
  }

  // 3. Volt Siren: 2-Part Angelic Soprano Vocal Choir Harmony (Harmonizing with Diva)
  playSirenStep(step, time) {
    const sirenHarmonies = {
      0:  { offset: 0.08, p1: 1.189, p2: 1.498, dur: 0.75 }, // Minor 3rd + 5th soprano choir
      4:  { offset: 1.08, p1: 1.260, p2: 1.587, dur: 0.75 }, // Major 3rd + 6th soprano choir
      8:  { offset: 2.12, p1: 1.335, p2: 1.682, dur: 0.75 }, // 4th + Major 6th choir
      12: { offset: 3.12, p1: 1.189, p2: 1.498, dur: 0.75 }, // Minor 3rd + 5th resolution
      16: { offset: 0.08, p1: 1.260, p2: 1.682, dur: 0.75 }, // Soaring high harmony
      20: { offset: 1.08, p1: 1.335, p2: 1.782, dur: 0.80 }, // Peak siren crescendo
      24: { offset: 2.12, p1: 1.260, p2: 1.498, dur: 0.75 }, // Warm triad vocal
      28: { offset: 3.12, p1: 1.122, p2: 1.335, dur: 0.75 }  // Cadence harmony
    };
    const h = sirenHarmonies[step];
    if (!h) return;

    // Lead Siren Soprano Voice
    this.triggerVocalSample('siren', 'diva', time, {
      offset: h.offset,
      pitch: h.p1,
      pitchEnd: h.p1 * 1.015,
      dur: h.dur,
      gain: 0.68,
      vibrato: true,
      vibratoRate: 6.0,
      vibratoDepth: 20
    });

    // Upper Angelic Harmony Voice
    this.triggerVocalSample('siren', 'diva', time, {
      offset: h.offset,
      pitch: h.p2,
      detune: 12,
      dur: h.dur,
      gain: 0.48,
      vibrato: true,
      vibratoRate: 5.5,
      vibratoDepth: 16
    });
  }

  // 4. Starlight Jelly: Celestial High-Soprano Falsetto Vocal Chimes ("Haa-La-La!")
  playStarlightStep(step, time) {
    const starlightVocals = {
      0:  { offset: 2.12, pitch: 1.498, dur: 0.46 },
      3:  { offset: 1.08, pitch: 1.682, dur: 0.42 },
      6:  { offset: 2.12, pitch: 1.888, dur: 0.46 },
      8:  { offset: 0.10, pitch: 2.000, dur: 0.55 },
      11: { offset: 1.08, pitch: 1.682, dur: 0.42 },
      14: { offset: 3.12, pitch: 1.498, dur: 0.46 },
      16: { offset: 2.12, pitch: 1.587, dur: 0.46 },
      19: { offset: 1.08, pitch: 1.782, dur: 0.42 },
      22: { offset: 2.12, pitch: 2.000, dur: 0.48 },
      24: { offset: 0.10, pitch: 2.245, dur: 0.58 },
      27: { offset: 1.08, pitch: 1.888, dur: 0.42 },
      30: { offset: 3.12, pitch: 1.682, dur: 0.46 }
    };
    const s = starlightVocals[step];
    if (!s) return;

    this.triggerVocalSample('starlight', 'diva', time, {
      offset: s.offset,
      pitch: s.pitch,
      dur: s.dur,
      gain: 0.65,
      vibrato: true,
      vibratoRate: 6.4,
      vibratoDepth: 15,
      filterFreq: 2400,
      filterGain: 4.5
    });
  }

  // =========================================================================
  // INTERACTIVE REEF SOUND EFFECTS (SFX)
  // =========================================================================

  playEggCrackSound(tapNumber) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320 + tapNumber * 180, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.09);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.11);
  }

  playCoinChime(step = 0) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    // Ascending pentatonic chime scale (C6, D6, E6, G6, A6, C7)
    const pitches = [1046.50, 1174.66, 1318.51, 1567.98, 1760.00, 2093.00];
    const baseFreq = pitches[step % pitches.length] || 1046.50;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 0.82, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.05);

    env.gain.setValueAtTime(0.35, now);
    env.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(env);
    env.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  playMonsterPokeChirp(id = 'diva') {
    this.playMonsterSolo(id);
  }

  playMonsterSolo(id = 'diva') {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const buf = this.buffers[id] || this.buffers.diva;
    if (!buf) return;

    const source = this.ctx.createBufferSource();
    source.buffer = buf;
    source.playbackRate.setValueAtTime(this.playbackRate, now);

    const gainNode = this.ctx.createGain();
    const dur = Math.min(3.4, buf.duration);
    const peakGain = 1.35;

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.03);
    gainNode.gain.setValueAtTime(peakGain, now + dur - 0.35);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + dur);

    const panner = this.createSpatialPanner(id);
    source.connect(gainNode);
    if (panner) {
      gainNode.connect(panner);
      panner.connect(this.clubFilter);
    } else {
      gainNode.connect(this.clubFilter);
    }
    if (this.stems[id]?.analyser) {
      gainNode.connect(this.stems[id].analyser);
    }

    source.start(now, 0, dur);
  }

  playNomSound() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(640, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    env.gain.setValueAtTime(0.45, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    osc.connect(env);
    env.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playDolphinChirp() {
    // Disabled - dolphin and annoying beep removed
  }

  playJackpotSound() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];

    freqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      env.gain.setValueAtTime(0.35, now + i * 0.05);
      env.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.35);

      osc.connect(env);
      env.connect(this.ctx.destination);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.37);
    });
  }

  playClamPop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);

    env.gain.setValueAtTime(0.4, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(env);
    env.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.24);
  }

  playCheerPop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const env = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(1160, now + 0.12);

    env.gain.setValueAtTime(0.3, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    osc.connect(env);
    env.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Play a signature real-voice vocal riff for any monster (e.g. in Jelly-Dex or Simon Says)
  playMonsterRiff(monsterId) {
    this.playMonsterSolo(monsterId);
  }

  // Celebratory victory fanfare for Simon Says completion
  playSuccessFanfare() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 -> E5 -> G5 -> C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (idx * 0.1);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.35, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });

    this.playCheerPop();
  }

  // Encouraging playful bubble boing for a wrong tap
  playFriendlyMiss() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.24);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Playful crab claw castanet snap
  playCrabSnip() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [0, 0.045].forEach((offset, idx) => {
      const bTime = now + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(idx === 0 ? 1200 : 1600, bTime);
      gain.gain.setValueAtTime(0.28, bTime);
      gain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.04);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(bTime);
      osc.stop(bTime + 0.05);
    });
  }

  // Playful garden eel bloop
  playEelBloop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.1);
    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Silly cartoon pufferfish inflation squeak
  playPufferPuff() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.22);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  // 🎡 Lucky Starfish Prize Wheel mechanical click/tick
  playWheelTick(freq = 680) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.025);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Cute interactive tickle giggle / melodic laugh
  playTickleGiggle() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 987.77, 1174.66]; // E5, G5, B5, D6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + (idx * 0.055);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.15, t + 0.07);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  // Triumphant daily quest completion fanfare
  playQuestComplete() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    chord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + (i * 0.08);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.3, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }

  // Satisfying sticker slap / inspect pop
  playStickerSlap() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Party confetti cannon pop & metallic shimmer
  playConfettiCannon() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    // Low punch thump
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);

    // High sparkling chimes
    [1200, 1500, 1800, 2200].forEach((freq, i) => {
      const sOsc = this.ctx.createOscillator();
      const sGain = this.ctx.createGain();
      const sTime = now + 0.04 + (i * 0.03);
      sOsc.type = 'triangle';
      sOsc.frequency.setValueAtTime(freq, sTime);
      sGain.gain.setValueAtTime(0.2, sTime);
      sGain.gain.exponentialRampToValueAtTime(0.001, sTime + 0.15);
      sOsc.connect(sGain);
      sGain.connect(this.masterGain || this.ctx.destination);
      sOsc.start(sTime);
      sOsc.stop(sTime + 0.18);
    });
  }

  // Streaming bubble blaster sound
  playBubbleBlaster() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [320, 480, 640, 520, 720].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + (i * 0.04);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.06);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  // Pyrotechnic fountain spark sizzle
  playSparksBurst() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [800, 1100, 1400, 1900].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + (i * 0.05);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq + Math.random() * 200, t);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.14);
    });
  }

  // 🎹 Rainbow Sea Anemone Xylophone tone (Tuned Pentatonic Scales per Island)
  playXylophoneNote(islandId = 'lagoon', noteIndex = 0) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Harmonic pentatonic scales: guaranteed to sound in harmony with the band
    const scales = {
      lagoon: [523.25, 587.33, 659.25, 783.99, 880.00], // C5, D5, E5, G5, A5 (Bright Sunlit Pentatonic)
      trench: [440.00, 493.88, 523.25, 659.25, 739.99], // A4, B4, C5, E5, F#5 (Dorian Magma)
      cavern: [523.25, 659.25, 739.99, 783.99, 987.77]  // C5, E5, F#5, G5, B5 (Lydian Dream Crystal)
    };

    const islandScale = scales[islandId] || scales.lagoon;
    const freq = islandScale[noteIndex % islandScale.length];

    // Dual-harmonic marimba / steel-pan tone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Fundamental note
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle metallic overtone (2.76x harmonic)
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    // Warm bell-like marimba envelope
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  // =========================================================================
  // LIVE DJ SOUNDBOARD & VINYL SCRATCH ENGINE
  // =========================================================================

  // Dynamic Vinyl Scratch Effect (rotational velocity and direction modulated)
  triggerVinylScratch(velocity = 1.0, direction = 1) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const speed = Math.max(0.4, Math.min(3.0, Math.abs(velocity)));
    const duration = Math.max(0.08, Math.min(0.24, 0.16 / speed));

    // 1. Resonant Friction Noise
    if (this.noiseBuffer) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = this.noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.Q.setValueAtTime(6.5, now);

      const startFreq = direction >= 0 ? 550 * speed : 3200 * speed;
      const endFreq = direction >= 0 ? 3200 * speed : 450 * speed;

      bandpass.frequency.setValueAtTime(Math.min(16000, Math.max(200, startFreq)), now);
      bandpass.frequency.exponentialRampToValueAtTime(Math.min(16000, Math.max(200, endFreq)), now + duration);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.masterGain || this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration + 0.02);
    }

    // 2. Tonal Needle Squeak / Drag
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sawtooth';

    const basePitch = direction >= 0 ? 220 * speed : 740 * speed;
    const targetPitch = direction >= 0 ? 880 * speed : 140 * speed;

    osc.frequency.setValueAtTime(Math.max(60, basePitch), now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(60, targetPitch), now + duration);

    oscGain.gain.setValueAtTime(0.12, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Classic Arcade / Reggae Airhorn (Triple-Burst Staccato)
  triggerAirhorn() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bursts = [0, 0.1, 0.2, 0.32];
    const hornNotes = [466.16, 698.46]; // Bb4 + F5

    bursts.forEach((offset, idx) => {
      const bTime = now + offset;
      const dur = idx === 3 ? 0.28 : 0.075;

      hornNotes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';

        // Pitch scoop at attack
        osc.frequency.setValueAtTime(freq * 0.92, bTime);
        osc.frequency.exponentialRampToValueAtTime(freq, bTime + 0.02);

        gain.gain.setValueAtTime(0.24, bTime);
        gain.gain.setValueAtTime(0.24, bTime + dur - 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, bTime + dur);

        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);

        osc.start(bTime);
        osc.stop(bTime + dur + 0.02);
      });
    });
  }

  // Retro Bubble Laser Zap
  triggerLaserZap() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2600, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.16);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Sub-Bass 808 Drop
  triggerBassDrop() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(155, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.65);

    gain.gain.setValueAtTime(0.48, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.72);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.75);

    // Initial click impact
    const click = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    click.type = 'triangle';
    click.frequency.setValueAtTime(800, now);
    clickGain.gain.setValueAtTime(0.25, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    click.connect(clickGain);
    clickGain.connect(this.masterGain || this.ctx.destination);
    click.start(now);
    click.stop(now + 0.04);
  }

  // Vocal Drop: "WUB WUB!" (Formant LFO Talking Wobble)
  triggerVocalWub() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(82.41, now); // E2 bass root

    filter.type = 'bandpass';
    filter.Q.setValueAtTime(5.5, now);

    // "WUB" 1 then "WUB" 2
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.12);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.22);
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.34);
    filter.frequency.exponentialRampToValueAtTime(350, now + 0.46);

    gain.gain.setValueAtTime(0.38, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.52);
  }

  // Vocal Drop: "YEAH!" (Upbeat Vocoder Chord)
  triggerVocalYeah() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major Vocoder

    chord.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';

      osc.frequency.setValueAtTime(freq * 0.94, now);
      osc.frequency.exponentialRampToValueAtTime(freq, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  // Vocal Drop: "LET'S JAM!" (Funky Staccato Brass Punch)
  triggerVocalLetsJam() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [349.23, 440.00, 523.25, 622.25]; // F7 Funk Horns

    notes.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3400, now);
      filter.frequency.exponentialRampToValueAtTime(600, now + 0.28);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.34);
    });
  }

  // Water Bubble Cascade Barrage
  triggerBubbleBarrage() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const pitches = [587.33, 739.99, 880.00, 1174.66, 1479.98];

    pitches.forEach((freq, idx) => {
      const bTime = now + (idx * 0.045);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 1.5, bTime);
      osc.frequency.exponentialRampToValueAtTime(freq, bTime + 0.08);

      gain.gain.setValueAtTime(0.25, bTime);
      gain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(bTime);
      osc.stop(bTime + 0.14);
    });
  }

  // Deep Sea Submarine Sonar Ping
  triggerSonarPing() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, now); // A6 high chime

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(gain);
    gain.connect(this.masterGain || this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.45);
  }

  // Real-time DJ Master Filter Sweeper (0.0: underwater lowpass -> 0.5: flat -> 1.0: resonant highpass)
  setDJMasterFilter(ratio = 0.5) {
    if (!this.clubFilter || !this.ctx) return;
    const now = this.ctx.currentTime;
    const clamped = Math.max(0, Math.min(1, ratio));

    this.clubFilter.frequency.cancelScheduledValues(now);
    this.clubFilter.Q.cancelScheduledValues(now);

    if (clamped < 0.5) {
      // 0.0 -> 0.5: Underwater lowpass sweep from 350Hz up to 20000Hz
      const minCutoff = 350;
      const maxCutoff = 20000;
      const normalized = clamped / 0.5; // 0 to 1
      const targetFreq = minCutoff * Math.pow(maxCutoff / minCutoff, normalized);
      this.clubFilter.frequency.exponentialRampToValueAtTime(Math.max(100, targetFreq), now + 0.05);
      this.clubFilter.Q.linearRampToValueAtTime(1.2 + (1 - normalized) * 3.0, now + 0.05);
    } else {
      // 0.5 -> 1.0: Crisp high-end sizzle boost
      const highNorm = (clamped - 0.5) / 0.5; // 0 to 1
      this.clubFilter.frequency.exponentialRampToValueAtTime(20000, now + 0.05);
      this.clubFilter.Q.linearRampToValueAtTime(1.2 + highNorm * 6.0, now + 0.05);
    }
  }

  // =========================================================================
  // RHYTHM RUSH: BUBBLE BEATS SYNTHESIZERS
  // =========================================================================

  // Crisp, pentatonic musical bell chimes on rhythmic bubble hit
  playRhythmHit(accuracy = 'PERFECT', laneIndex = 1) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const laneFrequencies = [349.23, 440.00, 523.25]; // F4 (Left), A4 (Center), C5 (Right)
    const baseFreq = laneFrequencies[laneIndex] || 440.00;

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(baseFreq, now);

    const isPerfect = accuracy === 'PERFECT';
    const volume = isPerfect ? 0.32 : 0.22;
    const decay = isPerfect ? 0.32 : 0.22;

    gain1.gain.setValueAtTime(volume, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + decay);

    osc1.connect(gain1);
    gain1.connect(this.masterGain || this.ctx.destination);

    osc1.start(now);
    osc1.stop(now + decay + 0.02);

    // If PERFECT, add a sparkling harmonic fifth above for shimmering feedback
    if (isPerfect) {
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, now);

      gain2.gain.setValueAtTime(0.18, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc2.connect(gain2);
      gain2.connect(this.masterGain || this.ctx.destination);

      osc2.start(now);
      osc2.stop(now + 0.3);
    }
  }

  // Shimmering ascending glissando when 10x Fever Mode activates
  playRhythmFever() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [349.23, 440.00, 523.25, 659.25, 783.99]; // F4, A4, C5, E5, G5

    notes.forEach((freq, idx) => {
      const bTime = now + (idx * 0.04);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, bTime);

      gain.gain.setValueAtTime(0.24, bTime);
      gain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(bTime);
      osc.stop(bTime + 0.28);
    });
  }

  // Triumphant results fanfare depending on star count
  playRhythmResultsFanfare(stars = 3) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (stars >= 3) {
      // 3 Stars: Glorious arpeggio + crowd cheer
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const bTime = now + (idx * 0.09);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, bTime);
        gain.gain.setValueAtTime(0.32, bTime);
        gain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.45);
        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);
        osc.start(bTime);
        osc.stop(bTime + 0.5);
      });
      this.playCheerPop();
    } else if (stars === 2) {
      // 2 Stars: Cheerful major triad
      const notes = [440.00, 554.37, 659.25];
      notes.forEach((freq, idx) => {
        const bTime = now + (idx * 0.1);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, bTime);
        gain.gain.setValueAtTime(0.25, bTime);
        gain.gain.exponentialRampToValueAtTime(0.001, bTime + 0.35);
        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);
        osc.start(bTime);
        osc.stop(bTime + 0.4);
      });
    } else {
      // 1 Star: Encouraging chime
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440.00, now);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  }

  // =========================================================================
  // ISLAND 2 (ABYSSAL MAGMA TRENCH) REAL-VOICE MONSTER SINGERS
  // =========================================================================

  // 1. Angler Bass: Deep Abyssal Vocal Baritone ("DOO-BWA-DOO-WOW!")
  playAnglerStep(step, time) {
    const bassPhrase = {
      0:  { buf: 'bob', offset: 1.04, rate: 0.67, dur: 0.44, gain: 0.78, filterType: 'lowpass', filterFreq: 1200, filterQ: 2.2 }, // Deep "Doo" root
      4:  { buf: 'zap', offset: 0.04, rate: 0.56, dur: 0.42, gain: 0.72, filterType: 'bandpass', filterFreq: 750, filterQ: 2.8, vibrato: true, vibratoRate: 6.5, vibratoDepth: 14 }, // Deep vocal "Bwa-wow"
      8:  { buf: 'bob', offset: 1.55, rate: 0.75, dur: 0.44, gain: 0.76, filterType: 'lowpass', filterFreq: 1300, filterQ: 2.0 }, // "Doo-ba" minor 3rd
      12: { buf: 'zap', offset: 0.54, rate: 0.63, dur: 0.42, gain: 0.72, filterType: 'bandpass', filterFreq: 850, filterQ: 2.6 }, // Vocal growl "Da-ba"
      16: { buf: 'bob', offset: 1.04, rate: 0.67, dur: 0.45, gain: 0.80, filterType: 'lowpass', filterFreq: 1200, filterQ: 2.2 }, // Deep "Doo" root
      20: { buf: 'zap', offset: 2.12, rate: 0.75, dur: 0.42, gain: 0.74, filterType: 'bandpass', filterFreq: 950, filterQ: 2.5, vibrato: true, vibratoRate: 7.5, vibratoDepth: 16 }, // "Wow-ba" 5th
      24: { buf: 'bob', offset: 3.14, rate: 0.80, dur: 0.44, gain: 0.76, filterType: 'lowpass', filterFreq: 1350, filterQ: 2.0 }, // "Doo-ba-doo"
      28: { buf: 'zap', offset: 1.10, rate: 0.67, dur: 0.42, gain: 0.72, filterType: 'bandpass', filterFreq: 820, filterQ: 2.4 }  // Turnaround vocal
    };
    const p = bassPhrase[step];
    if (!p) return;

    this.triggerVocalSample('angler', p.buf, time, {
      offset: p.offset,
      duration: p.dur,
      rate: p.rate,
      gain: p.gain,
      attack: 0.015,
      release: 0.12,
      filterType: p.filterType,
      filterFreq: p.filterFreq,
      filterQ: p.filterQ,
      vibrato: p.vibrato || false,
      vibratoRate: p.vibratoRate || 6.0,
      vibratoDepth: p.vibratoDepth || 12
    });
  }

  // 2. Magma Medusa: Operatic Thermal Minor Vocal Lead ("AAH-MMM-LAA!")
  playMagmaStep(step, time) {
    const melodyPhrase = {
      0:  { offset: 0.08, rate: 0.89, dur: 0.48, harm: 1.06 }, // Warm minor root
      3:  { offset: 1.08, rate: 1.06, dur: 0.44, harm: 1.33 }, // Minor 3rd soar
      6:  { offset: 2.12, rate: 1.19, dur: 0.42, harm: 1.49 }, // 4th vocal climb
      8:  { offset: 3.12, rate: 1.33, dur: 0.55, harm: 1.00 }, // 5th operatic peak
      12: { offset: 1.08, rate: 1.19, dur: 0.48, harm: 0.89 }, // 4th descent
      16: { offset: 0.08, rate: 0.89, dur: 0.48, harm: 1.19 }, // Root return
      19: { offset: 2.12, rate: 0.80, dur: 0.42, harm: 1.06 }, // Sub-tonic dip
      22: { offset: 1.08, rate: 0.89, dur: 0.44, harm: 1.19 }, // Root rise
      24: { offset: 3.12, rate: 1.06, dur: 0.50, harm: 1.33 }, // Minor 3rd sustain
      28: { offset: 2.12, rate: 1.33, dur: 0.52, harm: 1.59 }  // High operatic climax
    };
    const p = melodyPhrase[step];
    if (!p) return;

    this.triggerVocalSample('magma', 'diva', time, {
      offset: p.offset,
      duration: p.dur,
      rate: p.rate,
      gain: 0.65,
      attack: 0.025,
      release: 0.16,
      filterType: 'bandpass',
      filterFreq: 1650,
      filterQ: 1.1,
      vibrato: true,
      vibratoRate: 6.2,
      vibratoDepth: 14,
      harmonyRates: [p.harm],
      harmonyGain: 0.38
    });
  }

  // 3. Vent Cracker: Volcanic Human Beatbox & Vocal Chug ("BMM-KSHH-BWA!")
  playVentStep(step, time) {
    // Heavy human beatbox kick + vocal grunt on 0, 8, 16, 24
    if (step % 8 === 0) {
      this.triggerVocalSample('vent', 'bob', time, {
        offset: 0.00,
        duration: 0.34,
        rate: 0.82,
        gain: 0.82,
        attack: 0.006,
        release: 0.09,
        filterType: 'lowpass',
        filterFreq: 1600,
        filterQ: 1.6
      });
    }

    // Volcanic vocal snare & beatbox rim-pop on 4, 12, 20, 28
    if (step % 8 === 4) {
      this.triggerVocalSample('vent', 'bob', time, {
        offset: 0.50,
        duration: 0.32,
        rate: 1.08,
        gain: 0.76,
        attack: 0.006,
        release: 0.09,
        filterType: 'highpass',
        filterFreq: 420,
        filterQ: 1.2
      });
    }

    // Syncopated vocal steam-scat on 6, 14, 22, 30
    if (step % 8 === 6) {
      this.triggerVocalSample('vent', 'zap', time, {
        offset: 1.10,
        duration: 0.26,
        rate: step === 22 ? 1.18 : 0.94,
        gain: 0.62,
        attack: 0.008,
        release: 0.07,
        filterType: 'bandpass',
        filterFreq: 1900,
        filterQ: 1.5
      });
    }
  }

  // 4. Obsidian Siren: Dual-Voice Abyssal Siren Echoes ("OOH-AAH-OOH!")
  playObsidianStep(step, time) {
    const sirenCalls = {
      2:  { offset: 0.08, rate: 1.18, echoRate: 1.49 },
      6:  { offset: 1.08, rate: 0.99, echoRate: 1.33 },
      10: { offset: 2.12, rate: 1.12, echoRate: 1.49 },
      14: { offset: 3.12, rate: 1.33, echoRate: 1.68 },
      18: { offset: 0.08, rate: 1.18, echoRate: 1.49 },
      22: { offset: 1.08, rate: 0.99, echoRate: 1.33 },
      26: { offset: 2.12, rate: 0.89, echoRate: 1.18 },
      30: { offset: 3.12, rate: 1.12, echoRate: 1.49 }
    };
    const call = sirenCalls[step];
    if (!call) return;

    // Primary siren voice
    this.triggerVocalSample('obsidian', 'diva', time, {
      offset: call.offset,
      duration: 0.42,
      rate: call.rate,
      gain: 0.58,
      attack: 0.02,
      release: 0.14,
      filterType: 'bandpass',
      filterFreq: 2100,
      filterQ: 1.2,
      vibrato: true,
      vibratoRate: 5.8,
      vibratoDepth: 11,
      harmonyRates: [call.echoRate],
      harmonyGain: 0.45
    });
  }

  // 5. Pyre Puff: Rapid-Fire Geothermal Vocal Scat ("ZAP-BA-DA-ZING!")
  playPyreStep(step, time) {
    const scatSteps = {
      1:  { buf: 'zap', offset: 0.04, rate: 1.12, dur: 0.24 },
      2:  { buf: 'zap', offset: 0.54, rate: 1.26, dur: 0.24 },
      5:  { buf: 'zap', offset: 1.10, rate: 1.33, dur: 0.24 },
      6:  { buf: 'diva', offset: 2.12, rate: 1.49, dur: 0.26 },
      9:  { buf: 'zap', offset: 2.12, rate: 1.33, dur: 0.24 },
      10: { buf: 'zap', offset: 0.54, rate: 1.26, dur: 0.24 },
      13: { buf: 'zap', offset: 3.16, rate: 1.12, dur: 0.24 },
      14: { buf: 'zap', offset: 0.04, rate: 1.00, dur: 0.26 },
      17: { buf: 'zap', offset: 0.54, rate: 1.12, dur: 0.24 },
      18: { buf: 'zap', offset: 1.10, rate: 1.26, dur: 0.24 },
      21: { buf: 'diva', offset: 1.08, rate: 1.49, dur: 0.26 },
      22: { buf: 'diva', offset: 3.12, rate: 1.68, dur: 0.28 },
      25: { buf: 'zap', offset: 2.12, rate: 1.49, dur: 0.24 },
      26: { buf: 'zap', offset: 1.10, rate: 1.33, dur: 0.24 },
      29: { buf: 'zap', offset: 0.54, rate: 1.26, dur: 0.24 },
      30: { buf: 'zap', offset: 3.16, rate: 1.12, dur: 0.26 }
    };
    const s = scatSteps[step];
    if (!s) return;

    this.triggerVocalSample('pyre', s.buf, time, {
      offset: s.offset,
      duration: s.dur,
      rate: s.rate,
      gain: 0.62,
      attack: 0.01,
      release: 0.07,
      filterType: 'bandpass',
      filterFreq: 2200,
      filterQ: 1.1
    });
  }

  // =========================================================================
  // ISLAND 3 (BIOLUMINESCENT CAVERNS) REAL-VOICE MONSTER SINGERS
  // =========================================================================

  // 1. Crystal Bell: Crystalline Acapella Soprano Plucks ("DING-LA-LA-HMM!")
  playCrystalBellStep(step, time) {
    const bellNotes = {
      0:  { offset: 0.08, rate: 1.00, harm: 1.50 }, // C
      2:  { offset: 1.08, rate: 1.26, harm: 1.50 }, // E
      4:  { offset: 2.12, rate: 1.50, harm: 2.00 }, // G
      6:  { offset: 3.12, rate: 1.68, harm: 1.26 }, // A
      8:  { offset: 0.08, rate: 2.00, harm: 1.50 }, // High C
      10: { offset: 2.12, rate: 1.68, harm: 1.26 }, // A
      12: { offset: 1.08, rate: 1.50, harm: 1.00 }, // G
      14: { offset: 0.08, rate: 1.26, harm: 1.50 }, // E
      16: { offset: 1.08, rate: 1.12, harm: 1.50 }, // D
      18: { offset: 2.12, rate: 1.26, harm: 1.68 }, // E
      20: { offset: 3.12, rate: 1.50, harm: 2.00 }, // G
      22: { offset: 0.08, rate: 2.00, harm: 1.50 }, // High C
      24: { offset: 2.12, rate: 1.78, harm: 1.33 }, // Bb/A
      26: { offset: 1.08, rate: 1.68, harm: 1.26 }, // A
      28: { offset: 3.12, rate: 1.50, harm: 1.00 }, // G
      30: { offset: 0.08, rate: 1.26, harm: 1.50 }  // E
    };
    const n = bellNotes[step];
    if (!n) return;

    this.triggerVocalSample('crystal_bell', 'diva', time, {
      offset: n.offset,
      duration: 0.34,
      rate: n.rate,
      gain: 0.58,
      attack: 0.012,
      release: 0.11,
      filterType: 'highpass',
      filterFreq: 550,
      filterQ: 0.9,
      harmonyRates: [n.harm],
      harmonyGain: 0.32
    });
  }

  // 2. Lo-Fi Spore: Warm Barbershop & Jazz Vocal Harmony Chords ("MMM-DOO-WAH!")
  playLoFiSporeStep(step, time) {
    const vocalChords = {
      0:  { offset: 0.08, root: 0.84, harmonies: [1.06, 1.26, 1.59], bassRate: 0.75 }, // Fmaj7 vocal choir
      4:  { offset: 1.08, root: 1.06, harmonies: [1.26, 1.50],       bassRate: null }, // Upper vocal comp
      8:  { offset: 2.12, root: 0.79, harmonies: [0.94, 1.19, 1.41], bassRate: 0.71 }, // Em7 vocal choir
      12: { offset: 3.12, root: 0.94, harmonies: [1.19, 1.50],       bassRate: null }, // Upper vocal comp
      16: { offset: 0.08, root: 0.71, harmonies: [0.84, 1.06, 1.26], bassRate: 0.63 }, // Dm7 vocal choir
      20: { offset: 1.08, root: 0.84, harmonies: [1.06, 1.33],       bassRate: null }, // Upper vocal comp
      24: { offset: 2.12, root: 0.75, harmonies: [0.94, 1.12, 1.41], bassRate: 0.67 }, // Cmaj7 vocal choir
      28: { offset: 3.12, root: 0.94, harmonies: [1.12, 1.50],       bassRate: null }  // Upper vocal comp
    };
    const chord = vocalChords[step];
    if (!chord) return;

    // Lush 3-to-4-voice human soprano/alto harmony pad
    this.triggerVocalSample('lofi_spore', 'diva', time, {
      offset: chord.offset,
      duration: 0.62,
      rate: chord.root,
      gain: 0.52,
      attack: 0.035,
      release: 0.22,
      filterType: 'lowpass',
      filterFreq: 2600,
      filterQ: 0.8,
      vibrato: true,
      vibratoRate: 4.8,
      vibratoDepth: 7,
      harmonyRates: chord.harmonies,
      harmonyGain: 0.42
    });

    // Warm acapella baritone root hum on main chord changes
    if (chord.bassRate) {
      this.triggerVocalSample('lofi_spore', 'bob', time, {
        offset: 1.04,
        duration: 0.55,
        rate: chord.bassRate,
        gain: 0.50,
        attack: 0.025,
        release: 0.18,
        filterType: 'lowpass',
        filterFreq: 1100,
        filterQ: 1.1
      });
    }
  }

  // 3. Echo Nautilus: Laid-Back Boom-Bap Human Beatbox & Conch Vocal Pops ("BMM-PFF-DOO!")
  playNautilusStep(step, time) {
    // Warm human beatbox kick on 0, 6, 10, 16, 22, 26
    if (step === 0 || step === 6 || step === 10 || step === 16 || step === 22 || step === 26) {
      this.triggerVocalSample('nautilus', 'bob', time, {
        offset: step % 16 === 0 ? 0.00 : 2.12,
        duration: 0.34,
        rate: 0.92,
        gain: 0.78,
        attack: 0.008,
        release: 0.09,
        filterType: 'lowpass',
        filterFreq: 1800,
        filterQ: 1.2
      });
    }

    // Crisp human beatbox rim-pop / snare on 4, 8, 12, 20, 24, 28
    if (step === 4 || step === 8 || step === 12 || step === 20 || step === 24 || step === 28) {
      const isGhost = step === 8 || step === 24;
      this.triggerVocalSample('nautilus', 'bob', time, {
        offset: isGhost ? 1.55 : 0.50,
        duration: 0.30,
        rate: isGhost ? 1.18 : 1.02,
        gain: isGhost ? 0.58 : 0.75,
        attack: 0.008,
        release: 0.08,
        filterType: 'bandpass',
        filterFreq: 1600,
        filterQ: 1.0
      });
    }
  }

  // 4. Prism Bloom: Shimmering 3-Voice Angelic Soprano Choir ("AAH-LAA-OOH!")
  playPrismBloomStep(step, time) {
    const choirSteps = {
      0:  { offset: 0.08, root: 1.00, harmonies: [1.26, 1.50] }, // C major triad choir
      3:  { offset: 1.08, root: 1.12, harmonies: [1.50, 1.68] }, // D/G choir
      6:  { offset: 2.12, root: 1.26, harmonies: [1.50, 2.00] }, // Em/C choir
      8:  { offset: 3.12, root: 1.50, harmonies: [1.89, 2.00] }, // Gmaj7 soar
      12: { offset: 1.08, root: 1.26, harmonies: [1.68, 2.00] }, // Am7 choir
      16: { offset: 0.08, root: 1.00, harmonies: [1.33, 1.68] }, // Fmaj choir
      19: { offset: 2.12, root: 1.12, harmonies: [1.50, 1.89] }, // G choir
      22: { offset: 1.08, root: 1.26, harmonies: [1.68, 2.00] }, // Am choir
      24: { offset: 3.12, root: 1.68, harmonies: [2.00, 1.26] }, // High A climax
      28: { offset: 2.12, root: 1.50, harmonies: [1.89, 1.26] }  // G resolution
    };
    const c = choirSteps[step];
    if (!c) return;

    this.triggerVocalSample('prism_bloom', 'diva', time, {
      offset: c.offset,
      duration: 0.52,
      rate: c.root,
      gain: 0.58,
      attack: 0.025,
      release: 0.18,
      filterType: 'highpass',
      filterFreq: 420,
      filterQ: 0.8,
      vibrato: true,
      vibratoRate: 5.5,
      vibratoDepth: 11,
      harmonyRates: c.harmonies,
      harmonyGain: 0.45
    });
  }

  // 5. Lapis Groove: Walking Acapella Jazz Bass ("DOO-BA-DOO-BMM!")
  playLapisGrooveStep(step, time) {
    const walkingBass = {
      0:  { buf: 'bob', offset: 1.04, rate: 0.84, dur: 0.44 }, // F "Doo"
      4:  { buf: 'bob', offset: 1.55, rate: 1.06, dur: 0.42 }, // A "Doo-ba"
      8:  { buf: 'bob', offset: 1.04, rate: 0.79, dur: 0.44 }, // E "Doo"
      12: { buf: 'bob', offset: 3.14, rate: 0.94, dur: 0.42 }, // G "Doo-ba-doo"
      16: { buf: 'bob', offset: 1.04, rate: 0.71, dur: 0.44 }, // D "Doo"
      20: { buf: 'bob', offset: 1.55, rate: 0.84, dur: 0.42 }, // F "Doo-ba"
      24: { buf: 'bob', offset: 1.04, rate: 0.67, dur: 0.44 }, // C "Doo"
      28: { buf: 'zap', offset: 0.54, rate: 0.79, dur: 0.40 }  // E vocal scat turnaround
    };
    const note = walkingBass[step];
    if (!note) return;

    this.triggerVocalSample('lapis_groove', note.buf, time, {
      offset: note.offset,
      duration: note.dur,
      rate: note.rate,
      gain: 0.76,
      attack: 0.015,
      release: 0.12,
      filterType: 'lowpass',
      filterFreq: 1450,
      filterQ: 1.4
    });
  }

  destroy() {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
    }
  }
}