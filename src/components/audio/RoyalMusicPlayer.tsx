import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '../../data/weddingConfig';

interface RoyalMusicPlayerProps {
  autoPlayTriggered: boolean;
}

export const RoyalMusicPlayer: React.FC<RoyalMusicPlayerProps> = ({ autoPlayTriggered }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Audio elements & synth fallback
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ masterGain: GainNode | null; oscillators: OscillatorNode[] }>({
    masterGain: null,
    oscillators: [],
  });

  // Synthesize peaceful royal Indian Tanpura / Drone (Sa - Pa - Sa' Raag Yaman harmonic resonance)
  const startSynthDrone = () => {
    try {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') return;
      
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      synthNodesRef.current.masterGain = masterGain;

      // Sacred Tanpura Frequencies: C#3 (138.59 Hz), G#3 (207.65 Hz), C#4 (277.18 Hz), F#3 (185.00 Hz)
      const freqs = [138.59, 207.65, 277.18, 185.00];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle vibrato/shimmer
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        oscs.push(osc);
      });

      synthNodesRef.current.oscillators = oscs;
      setIsPlaying(true);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const stopSynthDrone = () => {
    if (synthNodesRef.current.masterGain && audioCtxRef.current) {
      synthNodesRef.current.masterGain.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1);
      setTimeout(() => {
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.suspend();
        }
      }, 1000);
    }
    setIsPlaying(false);
  };

  // Attempt playing audio element, gracefully falling back to synth drone
  const startMusic = async () => {
    setHasInteracted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0;
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        // Fade in
        let vol = 0;
        const interval = setInterval(() => {
          if (audioRef.current && vol < 0.5) {
            vol = Math.min(0.5, vol + 0.05);
            audioRef.current.volume = vol;
          } else {
            clearInterval(interval);
          }
        }, 120);
      } catch {
        // Fallback to synthesized Indian drone if file fails to load or CORS
        startSynthDrone();
      }
    } else {
      startSynthDrone();
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthDrone();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
      if (synthNodesRef.current.masterGain && audioCtxRef.current) {
        synthNodesRef.current.masterGain.gain.linearRampToValueAtTime(0.12, audioCtxRef.current.currentTime + 0.3);
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.muted = true;
      if (synthNodesRef.current.masterGain && audioCtxRef.current) {
        synthNodesRef.current.masterGain.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
      }
    }
  };

  // Trigger when parent envelope opens
  useEffect(() => {
    if (autoPlayTriggered && !hasInteracted) {
      startMusic();
    }
  }, [autoPlayTriggered, hasInteracted]);

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingConfig.music.src}
        loop
        preload="auto"
        onError={() => {
          // If external audio source fails, synth drone is ready
        }}
      />

      {/* Floating Royal Music Control */}
      <div 
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        <div 
          className={`transition-all duration-300 pointer-events-none px-3 py-1.5 rounded-full royal-glass shadow-royal text-xs font-serif text-neutral-800 border border-gold-400 hidden sm:flex items-center gap-2 ${
            showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
          }`}
        >
          <Music className="w-3.5 h-3.5 text-gold-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{isPlaying ? weddingConfig.music.title : 'Play Shehnai & Sitar Music'}</span>
        </div>

        {/* Music Player Button */}
        <button
          onClick={isPlaying ? toggleMute : togglePlay}
          aria-label={isPlaying ? (isMuted ? "Unmute royal music" : "Mute royal music") : "Play wedding music"}
          className="relative group p-3.5 rounded-full bg-gradient-to-br from-neutral-900 via-royal-maroon to-neutral-950 text-gold-300 border-2 border-gold-400 shadow-royal hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
        >
          {/* Animated Gold Ring */}
          {isPlaying && !isMuted && (
            <span className="absolute -inset-1 rounded-full border border-gold-400/50 animate-ping opacity-60 pointer-events-none" />
          )}

          {/* Equalizer animation bars */}
          {isPlaying && !isMuted ? (
            <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
              <span className="w-1 bg-gold-400 rounded-sm animate-[bounce_0.8s_infinite] h-2.5" />
              <span className="w-1 bg-gold-300 rounded-sm animate-[bounce_1.1s_infinite_0.2s] h-4" />
              <span className="w-1 bg-gold-400 rounded-sm animate-[bounce_0.9s_infinite_0.4s] h-3" />
            </div>
          ) : isMuted ? (
            <VolumeX className="w-4 h-4 text-neutral-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-gold-400 group-hover:text-gold-200" />
          )}
        </button>
      </div>
    </>
  );
};
