"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function audioUrl(file: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}/audio/${file}`;
}

function createAudio(src: string, options?: { loop?: boolean; volume?: number }) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.loop = options?.loop ?? false;
  audio.volume = options?.volume ?? 1;
  return audio;
}

type AudioOptions = {
  enabled?: boolean;
  loop?: boolean;
};

export function useInvitationAudio({
  enabled = true,
  loop = false
}: AudioOptions = {}) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const launchRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedMusicRef = useRef(false);
  const [musicOn, setMusicOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const launch = createAudio(audioUrl("rocket-launch.wav"), { volume: 0.4 });
    launchRef.current = launch;

    let music: HTMLAudioElement | null = null;
    const onEnded = () => setMusicOn(false);

    if (enabled) {
      music = createAudio(audioUrl("bg-music.wav"), {
        loop,
        volume: 0.16
      });
      music.addEventListener("ended", onEnded);
      musicRef.current = music;
    }

    setReady(true);

    return () => {
      if (music) {
        music.removeEventListener("ended", onEnded);
        music.pause();
      }
      launch.pause();
      musicRef.current = null;
      launchRef.current = null;
    };
  }, [enabled, loop]);

  const stopMusic = useCallback(() => {
    const music = musicRef.current;
    if (!music) return;
    music.pause();
    setMusicOn(false);
  }, []);

  const toggleMusic = useCallback(async () => {
    if (!enabled) return;

    const music = musicRef.current;
    if (!music || !hasPlayedMusicRef.current) return;

    if (!music.paused) {
      stopMusic();
      return;
    }

    // When not looping, only resume if the song is still mid-play.
    if (!loop && (music.ended || music.currentTime >= music.duration - 0.05)) {
      return;
    }

    try {
      if (loop && (music.ended || music.currentTime >= music.duration - 0.05)) {
        music.currentTime = 0;
      }
      await music.play();
      setMusicOn(true);
    } catch {
      setMusicOn(false);
    }
  }, [enabled, loop, stopMusic]);

  const playLaunch = useCallback(async () => {
    const launch = launchRef.current;
    if (!launch) return;

    try {
      launch.currentTime = 0;
      await launch.play();
    } catch {
      // Browser may block until a gesture; ignore.
    }

    if (!enabled) return;

    const music = musicRef.current;
    if (!music || hasPlayedMusicRef.current) return;
    hasPlayedMusicRef.current = true;

    // Let the launch whoosh start, then play Happy Birthday.
    window.setTimeout(() => {
      const track = musicRef.current;
      if (!track) return;
      track.currentTime = 0;
      void track.play().then(
        () => setMusicOn(true),
        () => setMusicOn(false)
      );
    }, 550);
  }, [enabled]);

  return { ready, musicOn, toggleMusic, playLaunch, musicEnabled: enabled };
}

export function MusicToggle({
  musicOn,
  onToggle
}: {
  musicOn: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`music-toggle${musicOn ? " is-on" : ""}`}
      onClick={onToggle}
      aria-pressed={musicOn}
      aria-label={musicOn ? "Mute birthday song" : "Unmute birthday song"}
      title={musicOn ? "Mute" : "Unmute"}
    >
      <span className="music-toggle-pulse" aria-hidden="true" />
      <span className="music-toggle-icon" aria-hidden="true">
        {musicOn ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V6l10-2v12" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="18" r="2.4" />
            <circle cx="17" cy="16" r="2.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V6l10-2v12" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="18" r="2.4" />
            <circle cx="17" cy="16" r="2.4" />
            <path d="M4 5l16 14" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <span className="music-toggle-label">{musicOn ? "Music on" : "Music"}</span>
    </button>
  );
}
