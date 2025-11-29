/**
 * VideoPlayer Component Types
 * Defines all interfaces for the Douyin-style video player
 */
import type React from "react";

export interface AuthorInfo {
  name: string;
  avatar: string;
  isFollowing?: boolean;
}

export interface VideoStats {
  likes: number;
  comments: number;
  favorites: number;
  shares: number;
}

export interface VideoInfo {
  title: string;
  createTime: number;
  description: string;
  author: AuthorInfo;
  stats: VideoStats;
}

export interface VideoPlayerProps {
  videoUrl: string;
  videoId?: string;
  videoInfo: VideoInfo;
  // Callback events
  onLike?: () => void;
  onComment?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
  onFollow?: () => void;
  // Style override
  style?: React.CSSProperties;
}

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  bufferedTime: number;
  isPlaying: boolean;
  playbackRate: number;
  onSeek: (time: number) => void;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
  onToggleFullscreen: () => void;
}

export interface InfoOverlayProps {
  videoInfo: VideoInfo;
}

export interface ActionBarProps {
  author: AuthorInfo;
  stats: VideoStats;
  onLike?: () => void;
  onComment?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
  onFollow?: () => void;
  isLiked?: boolean;
  isFavorited?: boolean;
}

export interface SpeedControlProps {
  currentSpeed: number;
  onSpeedChange: (speed: number) => void;
}
