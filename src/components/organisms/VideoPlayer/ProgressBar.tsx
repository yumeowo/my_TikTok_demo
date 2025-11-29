/**
 * ProgressBar Component
 * Douyin-style bottom control bar with play button, time display, progress bar, and controls
 */

import {
  IconIndenpentCornersStroked,
  IconPause,
  IconPlay,
} from '@douyinfe/semi-icons';
import { Button, Dropdown, Input, Tooltip } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { type MouseEvent, useCallback, useRef, useState } from 'react';
import type { ProgressBarProps } from './types';

// Format time as MM:SS or HH:MM:SS
function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';

  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Speed options
const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function ProgressBar({
  currentTime,
  duration,
  bufferedTime,
  isPlaying,
  playbackRate,
  onSeek,
  onTogglePlay,
  onSpeedChange,
  onToggleFullscreen,
}: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [danmakuEnabled, setDanmakuEnabled] = useState(true);
  const [danmakuText, setDanmakuText] = useState('');
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
    e.stopPropagation();
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

  // Handle play button click
  const handlePlayClick = (e: MouseEvent) => {
    e.stopPropagation();
    onTogglePlay();
  };

  // Handle fullscreen button click
  const handleFullscreenClick = (e: MouseEvent) => {
    e.stopPropagation();
    onToggleFullscreen();
  };

  const IconFace = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#696969" stroke-width="4" stroke-linejoin="round"/>
      <path d="M24 35C29 35 31 31 31 31H17C17 31 19 35 24 35Z" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M31 18V22" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 18V22" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )

  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-auto"
      style={{ zIndex: 15 }}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {/* Bottom gradient background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%)',
        }}
      />

      {/* Progress bar track */}
      <div
        ref={progressBarRef}
        className="relative h-2 flex items-center px-0 cursor-pointer group"
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className={`relative w-full rounded-full transition-all duration-200 ${
            isHovering || isDragging ? 'h-1' : 'h-0.5'
          }`}
        >
          {/* Buffered bar */}
          <div
            className="absolute left-0 top-0 h-full bg-gray-700/80 rounded-full transition-all duration-300"
            style={{ width: `${bufferedPercent}%` }}
          />

          {/* Played bar */}
          <div
            className="absolute left-0 top-0 h-full bg-white/30 rounded-full transition-all duration-100 flex items-center justify-end"
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

      {/* Control bar */}
      <div className="relative flex items-center justify-between px-4 pb-2 pt-1">
        {/* Left section: Play button + Time */}
        <div className="flex items-center gap-3">
          {/* Play/Pause button */}
          <button
            type="button"
            onClick={handlePlayClick}
            className="flex items-center justify-center w-8 h-8 text-[#fff] transition-colors"
          >
            {isPlaying ? (
              <IconPause size="large" />
            ) : (
              <IconPlay size="large" />
            )}
          </button>

          {/* Time display */}
          <span className="text-[#fff] text-sm font-medium tabular-nums">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Danmaku input */}
          <div
            className="flex items-center h-8 rounded-full ml-3"
            style={{ backgroundColor: '#3b3c45' }}
          >
            {/* Danmaku toggle buttons */}
            <button
              type="button"
              onClick={ (e) => {
                e.stopPropagation();
                setDanmakuEnabled(!danmakuEnabled);
              } }
              className="flex items-center gap-0.5 px-2 h-full"
            >
              <svg
               className="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="2068"
               width="30"
               height="30"
              >
                <path d="M310.125714 443.245714v2.925715h92.16V294.034286h-143.36v40.96h96.548572v68.754285h-87.771429l-14.628571 155.062858h106.788571c0 55.588571-1.462857 92.16-5.851428 109.714285-4.388571 16.091429-19.017143 24.868571-45.348572 24.868572-13.165714 0-26.331429-1.462857-39.497143-2.925715l11.702857 45.348572c13.165714 0 26.331429 1.462857 39.497143 1.462857 45.348571-2.925714 71.68-19.017143 77.531429-48.274286 5.851429-27.794286 8.777143-86.308571 8.777143-172.617143h-103.862857l7.314285-73.142857zM715.337143 602.697143h-125.805714v-42.422857h105.325714V349.622857h-61.44c13.165714-19.017143 24.868571-42.422857 36.571428-67.291428l-46.811428-16.091429c-11.702857 29.257143-23.405714 57.051429-38.034286 83.382857h-74.605714l33.645714-14.628571c-11.702857-21.942857-23.405714-43.885714-38.034286-64.365715l-43.885714 14.628572c14.628571 19.017143 27.794286 40.96 39.497143 65.828571H438.857143v209.188572h103.862857v42.422857h-122.88v45.348571h122.88v92.16h46.811429v-92.16h125.805714v-45.348571z m-125.805714-210.651429h62.902857v45.348572h-62.902857v-45.348572z m0 84.845715h62.902857v43.885714h-62.902857v-43.885714z m-46.811429 43.885714h-61.44v-43.885714h61.44v43.885714z m0-83.382857h-61.44v-45.348572h61.44v45.348572z"
                      fill="#ffffff"
                      p-id="2069" />
                <path d="M820.662857 617.325714l-100.937143 100.937143-46.811428-46.811428-30.72 30.72 62.902857 62.902857c4.388571 4.388571 10.24 5.851429 16.091428 5.851428s11.702857-1.462857 16.091429-5.851428l117.028571-117.028572-33.645714-30.72z"
                      fill="#ffffff"
                      p-id="2070" />
              </svg>
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1833"
                width="18"
                height="18"
              >
                <path d="M1007.616 710.741333l-121.258667 225.664h-274.602666l-119.338667-225.706666 119.338667-222.293334h274.602666l121.258667 222.293334zM210.858667 430.890667H89.002667v113.024h117.717333l-1.493333 242.346666a98.346667 98.346667 0 0 1-98.346667 97.706667H0v-85.717333h74.154667c27.178667 0 49.194667-22.058667 49.194666-49.152v-118.613334H0v-289.706666h131.669333V240.213333H0V151.04h210.858667v279.893333z m219.392-219.904h53.888l41.898666-76.074667h99.029334l-41.898667 76.074667h73.813333V414.293333h-79.018666l-20.138667 34.901334h-64.298667v68.48h24.746667l-111.445333 193.024 86.698666 150.101333v22.869333H409.301333v-124.842666H221.696v-87.466667h187.605333v-60.330667h-161.706666V211.029333l83.626666-0.042666-41.898666-76.074667h98.986666l41.941334 76.074667z m321.152 370.986666a128.768 128.768 0 1 0 0 257.536 128.768 128.768 0 0 0 0-257.536z m-411.050667-64.256h71.466667V449.28H340.352v68.437333z m0-150.442666h71.466667V299.690667H340.352v67.584z m153.173333 0h71.509334V299.690667h-71.509334v67.584z"
                      fill="#ffffff"
                      p-id="1834" />
              </svg>
            </button>

            {/* Divider */ }
            <div className="w-px h-4 bg-[#5a5b65]" />

            {/* Input field */ }
            <Input
              value={ danmakuText }
              onChange={ (value) => setDanmakuText(value) }
              placeholder="发一条友好的弹幕吧"
              className="danmaku-input"
              style={ {
                backgroundColor: 'transparent',
                border: 'none',
                width: '180px',
                height: '100%',
              } }
              onClick={ (e) => e.stopPropagation() }
            />

            {/* Emoji button */ }
            <button
              type="button"
              onClick={ (e) => e.stopPropagation() }
              className="flex items-center justify-center w-8 h-full text-[#7a7b85] hover:text-white transition-colors"
            >
              <IconFace />
            </button>
          </div>
        </div>

        {/* Right section: Speed + Fullscreen */ }
        <div className="flex items-center gap-2">
          {/* Speed control */ }
          <Dropdown
            position="top"
            className="flex-col justify-center items-center rounded-xl bg-[#252632] p-1"
            trigger="hover"
            clickToHide={true}
            render={
              <Dropdown.Menu>
                {SPEED_OPTIONS.map((speed) => (
                  <Dropdown.Item
                    key={speed}
                    className="py-2 px-4 rounded-lg mx-2 text-[#bebec2] hover:bg-[#353641] hover:text-[#fff]"
                    active={playbackRate === speed}
                    onClick={() => {
                      onSpeedChange(speed);
                    }}
                  >
                    {speed === 1 ? '正常' : `${speed}x`}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            }
          >
            <Button
              theme="borderless"
              className="flex items-center justify-center px-2 h-8 text-white text-sm hover:text-white/80 transition-colors"
            >
              {playbackRate === 1 ? '倍速' : `${playbackRate}x`}
            </Button>
          </Dropdown>

          {/* Fullscreen button */}
          <Tooltip content="全屏" position="top">
            <button
              type="button"
              onClick={handleFullscreenClick}
              className="flex items-center justify-center w-8 h-8 text-white hover:text-white/80 transition-colors"
            >
              <IconIndenpentCornersStroked size="large" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
