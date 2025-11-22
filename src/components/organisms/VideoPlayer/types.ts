/**
 * VideoPlayer Component Types
 * Defines all interfaces for the Douyin-style video player
 */

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
  className?: string;
}

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  bufferedTime: number;
  onSeek: (time: number) => void;
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
