import { motion } from 'framer-motion';
import { IconLikeHeart, IconHeartStroked, IconMoreStroked, IconEyeClosed } from '@douyinfe/semi-icons';
import { Dropdown } from '@douyinfe/semi-ui';
import type { CommentActionsProps } from './types';
import { LIKE_ANIMATION } from './constants';
import { formatCount } from "@/utils/format";

/**
 * 评论操作按钮组组件（点赞、更多）
 */
export function CommentActions({
  isLiked,
  likeCount,
  onToggleLike,
  onCopy,
  onHide,
}: CommentActionsProps) {
  const formattedLikeCount = formatCount(likeCount);

  return (
    <div className="flex items-center gap-4">
      {/* 点赞按钮 */}
      <motion.button
        type="button"
        onClick={onToggleLike}
        whileTap={{ scale: LIKE_ANIMATION.tapScale }}
        animate={{
          scale: isLiked ? LIKE_ANIMATION.scale : 1,
        }}
        transition={{ duration: LIKE_ANIMATION.duration }}
        className={`flex items-center gap-1 text-sm ${
          isLiked ? 'text-red-500' : 'text-gray-400'
        } hover:opacity-80 transition-opacity`}
        aria-label={isLiked ? '取消点赞' : '点赞'}
      >
        {isLiked ? (
          <IconLikeHeart size="large" />
        ) : (
          <IconHeartStroked size="large" />
        )}
        {formattedLikeCount && (
          <span className="font-medium">{formattedLikeCount}</span>
        )}
      </motion.button>

      {/* 隐藏评论按钮（闭眼图标） */}
      <motion.button
        type="button"
        onClick={onHide}
        whileTap={{ scale: LIKE_ANIMATION.tapScale }}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="隐藏评论"
      >
        <IconEyeClosed size="large" style={{ opacity: 0.7 }} />
      </motion.button>

      {/* 更多操作菜单 */}
      <Dropdown
        trigger="click"
        position="bottomRight"
        render={
          <Dropdown.Menu>
            <Dropdown.Item onClick={onCopy}>复制评论</Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="更多操作"
        >
          <IconMoreStroked size="large" />
        </button>
      </Dropdown>
    </div>
  );
}
