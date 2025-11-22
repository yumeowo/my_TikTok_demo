/**
 * ProgressBar Component
 * Douyin-style custom progress bar with buffering visualization
 */

import { motion } from 'framer-motion';
import { type MouseEvent, useCallback, useRef, useState } from 'react';
import type { ProgressBarProps } from './types';

export function ProgressBar({
  currentTime,
  duration,
  bufferedTime,
  onSeek,
}: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Calculate progress percentages
  const playedPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPercent = duration > 0 ? (bufferedTime / duration) * 100 : 0;

  // Handle seek to position
  const handleSeek = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current || duration === 0) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const seekTime = percent * duration;
      onSeek(seekTime);
    },
    [duration, onSeek]
  );

  // Mouse down handler
  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  // Global mouse move/up handlers
  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging) return;
      handleSeek(e.clientX);
    },
    [isDragging, handleSeek]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Attach/detach global listeners
  useState(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  });

  return (
    <div
      ref={progressBarRef}
      className="absolute bottom-2 left-0 right-0 h-8 flex items-center px-4 cursor-pointer group"
      style={{ zIndex: 15 }}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Progress track background */}
      <div
        className={`relative w-full bg-white/20 rounded-full transition-all duration-200 ${
          isHovering || isDragging ? 'h-1' : 'h-0.5'
        }`}
      >
        {/* Buffered bar */}
        <div
          className="absolute left-0 top-0 h-full bg-white/30 rounded-full transition-all duration-300"
          style={{ width: `${bufferedPercent}%` }}
        />

        {/* Played bar */}
        <div
          className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100 flex items-center justify-end"
          style={{ width: `${playedPercent}%` }}
        >
          {/* Seek ball */}
          <motion.div
            className="w-3 h-3 bg-white rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{
              scale: isHovering || isDragging ? 1 : 0,
            }}
            transition={{ duration: 0.15 }}
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
