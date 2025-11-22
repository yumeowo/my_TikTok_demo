/**
 * VideoPlayer Component
 * Douyin-style video player with custom controls and overlays
 */

import 'xgplayer/dist/index.min.css';
import { IconPlayCircle } from '@douyinfe/semi-icons';
import { ActionBar } from './ActionBar';
import { InfoOverlay } from './InfoOverlay';
import { ProgressBar } from './ProgressBar';
import { SpeedControl } from './SpeedControl';
import type { VideoPlayerProps } from './types';
import { useVideoPlayer } from './useVideoPlayer';

export function VideoPlayer({
  videoUrl,
  videoId = 'video-player',
  videoInfo,
  onLike,
  onComment,
  onFavorite,
  onShare,
  onFollow,
  className = '',
}: VideoPlayerProps) {
  const {
    containerRef,
    currentTime,
    duration,
    bufferedTime,
    isPlaying,
    playbackRate,
    togglePlay,
    seek,
    changeSpeed,
    toggleFullscreen,
  } = useVideoPlayer({
    videoUrl,
    videoId,
  });

  return (
    <div
      className={`relative w-full h-full bg-black overflow-hidden ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Video container */}
      <div
        ref={containerRef}
        id={videoId}
        className="w-full h-full"
        onClick={togglePlay}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePlay();
          }
        }}
        role="button"
        tabIndex={0}
      />

      {/* Center play/pause overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <div
            className="w-20 h-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <IconPlayCircle
              size="extra-large"
              style={{
                color: 'white',
                fontSize: '48px',
              }}
            />
          </div>
        </div>
      )}

      {/* Info overlay (left-bottom) */}
      <InfoOverlay videoInfo={videoInfo} />

      {/* Action bar (right-side) */}
      <ActionBar
        author={videoInfo.author}
        stats={videoInfo.stats}
        onLike={onLike}
        onComment={onComment}
        onFavorite={onFavorite}
        onShare={onShare}
        onFollow={onFollow}
      />

      {/* Top controls bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto z-20">
        {/* Speed control */}
        <SpeedControl currentSpeed={playbackRate} onSpeedChange={changeSpeed} />

        {/* Fullscreen button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white text-sm font-medium transition-colors duration-200"
          style={{
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
          }}
        >
          全屏
        </button>
      </div>

      {/* Progress bar (bottom) */}
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        bufferedTime={bufferedTime}
        onSeek={seek}
      />

      {/* Overlay gradient mask for better text visibility */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%)',
          zIndex: 5,
        }}
      />
    </div>
  );
}
