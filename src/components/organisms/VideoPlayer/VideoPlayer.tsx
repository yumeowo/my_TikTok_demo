/**
 * VideoPlayer Component
 * Douyin-style video player with custom controls and overlays
 */

import 'xgplayer/dist/index.min.css';
import { ActionBar } from './ActionBar';
import { InfoOverlay } from './InfoOverlay';
import { ProgressBar } from './ProgressBar';
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
  style
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

  const IconPlay = () => (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 48V23.7512L51 35.8756L72 48L51 60.1244L30 72.2488V48Z" fill="#b3b3b3" stroke="#b3b3b3" stroke-width="8" stroke-linejoin="round"/>
    </svg>
  );

  return (
    <div
      className="relative h-full bg-black overflow-hidden"
      style={ {
        ...style,
        touchAction: 'pan-y'
      }}
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
          <IconPlay />
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

      {/* Bottom control bar with progress */}
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        bufferedTime={bufferedTime}
        isPlaying={isPlaying}
        playbackRate={playbackRate}
        onSeek={seek}
        onTogglePlay={togglePlay}
        onSpeedChange={changeSpeed}
        onToggleFullscreen={toggleFullscreen}
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
