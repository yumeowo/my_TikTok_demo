/**
 * useVideoPlayer Hook
 * Manages xgplayer instance and video playback state
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Player from 'xgplayer';

interface UseVideoPlayerOptions {
  videoUrl: string;
  videoId: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onProgress?: (bufferedTime: number) => void;
}

// Extended types for fullscreen API compatibility
interface ExtendedHTMLElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

export function useVideoPlayer({
  videoUrl,
  onTimeUpdate,
  onProgress,
}: UseVideoPlayerOptions) {
  const playerRef = useRef<Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedTime, setBufferedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize player
  useEffect(() => {
    if (!containerRef.current || playerRef.current) return;

    const player = new Player({
      el: containerRef.current,
      height: '100%',
      width: '100%',
      url: videoUrl,
      autoplay: false,
      playsinline: true,
      controls: false, // Hide default controls
      loop: true,
      videoInit: true,
      // Disable up/down arrow keys for volume control to avoid conflict with video switching
      keyboard: {
        keyCodeMap: {
          up: {
            disable: true, // Disable up arrow key (volume up)
          },
          down: {
            disable: true, // Disable down arrow key (volume down)
          },
        },
      },
    });

    // Event listeners
    player.on('timeupdate', () => {
      const current = player.currentTime;
      const dur = player.duration;
      setCurrentTime(current);
      setDuration(dur);
      onTimeUpdate?.(current, dur);
    });

    player.on('progress', () => {
      const buffered = player.buffered;
      if (buffered.length > 0) {
        const bufferedEnd = buffered.end(buffered.length - 1);
        setBufferedTime(bufferedEnd);
        onProgress?.(bufferedEnd);
      }
    });

    player.on('play', () => setIsPlaying(true));
    player.on('pause', () => setIsPlaying(false));
    player.on('loadedmetadata', () => {
      setDuration(player.duration);
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoUrl, onTimeUpdate, onProgress]);

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  }, [isPlaying]);

  // Seek to specific time
  const seek = useCallback((time: number) => {
    if (!playerRef.current) return;
    playerRef.current.currentTime = time;
  }, []);

  // Change playback speed
  const changeSpeed = useCallback((speed: number) => {
    if (!playerRef.current) return;
    playerRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      const elem = containerRef.current.parentElement as ExtendedHTMLElement | null;
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
      setIsFullscreen(true);
    } else {
      const doc = document as ExtendedDocument;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const doc = document as ExtendedDocument;
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return {
    containerRef,
    playerRef,
    currentTime,
    duration,
    bufferedTime,
    isPlaying,
    playbackRate,
    isFullscreen,
    togglePlay,
    seek,
    changeSpeed,
    toggleFullscreen,
  };
}
