import {
  IconComment, IconForward,
  IconLikeHeart,
  IconPlusCircle,
  IconStar,
} from '@douyinfe/semi-icons';
import { Avatar } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ActionBarProps } from './types';
import { formatCount } from "@/utils/format";

interface ActionButtonProps {
  icon: React.ReactNode;
  count?: number;
  active?: boolean;
  onClick?: () => void;
  activeColor?: string;
}

function ActionButton({ icon, count, active, onClick, activeColor = '#FE2C55' }: ActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className="flex flex-col items-center gap-1.5 cursor-pointer"
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: isPressed ? 0.9 : 1,
      }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="text-3xl"
        style={{
          color: active ? activeColor : 'white',
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))',
        }}
        animate={{
          scale: active ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {icon}
      </motion.div>
      {count !== undefined && (
        <span
          className="text-white text-xs font-medium"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          }}
        >
          {formatCount(count)}
        </span>
      )}
    </motion.button>
  );
}

export function ActionBar({
  author,
  stats,
  onLike,
  onComment,
  onFollow,
  isLiked: initialIsLiked = false
}: ActionBarProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [localStats, setLocalStats] = useState(stats);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalStats((prev) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
    onLike?.();
  };

  // const handleFavorite = () => {
  //   setIsFavorited(!isFavorited);
  //   setLocalStats((prev) => ({
  //     ...prev,
  //     favorites: isFavorited ? prev.favorites - 1 : prev.favorites + 1,
  //   }));
  //   onFavorite?.();
  // };

  return (
    <div className="absolute right-4 bottom-28 flex flex-col items-center gap-6" style={{ zIndex: 15 }}>
      {/* Author Avatar with Follow Button */}
      <div className="relative">
        <Avatar
          src={author.avatar}
          alt={author.name}
          size="extra-large"
          className="border-2 border-white cursor-pointer"
          style={{
            width: '48px',
            height: '48px',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
          }}
        />
        {!author.isFollowing && (
          <motion.button
            type="button"
            onClick={onFollow}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            whileTap={{ scale: 0.9 }}
          >
            <IconPlusCircle
              size="large"
              style={{
                color: '#FE2C55',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
              }}
            />
          </motion.button>
        )}
      </div>

      {/* Like Button */}
      <ActionButton
        icon={<IconLikeHeart size="extra-large" />}
        count={localStats.likes}
        active={isLiked}
        onClick={handleLike}
      />

      {/* Comment Button */}
      <ActionButton
        icon={<IconComment size="extra-large" />}
        count={localStats.comments}
        onClick={onComment}
      />

      {/* Favorite Button */}
      <ActionButton
        icon={<IconStar size="extra-large" />}
        count={localStats.favorites}
        activeColor="#FFD700"
      />

      {/* Share Button */}
      <ActionButton
        icon={<IconForward size="extra-large" />}
        count={localStats.shares}
      />
    </div>
  );
}
