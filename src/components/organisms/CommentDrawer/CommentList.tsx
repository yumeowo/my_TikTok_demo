import { motion, AnimatePresence } from 'framer-motion';
import type { CommentListProps } from './types';
import { CommentItem } from './CommentItem';
import { ANIMATION_DURATION } from './constants';

/**
 * 评论列表容器组件
 */
export function CommentList({
  comments,
  replyMap,
  expandedReplies,
  onToggleLike,
  onHideComment,
  onCopyComment,
  onToggleReplies,
}: CommentListProps) {
  // 如果没有评论，显示空状态
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p className="text-sm">暂无评论</p>
        <p className="text-xs mt-1">快来发表你的精彩评论吧～</p>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: ANIMATION_DURATION.normal }}
          >
            <CommentItem
              comment={comment}
              replies={replyMap.get(comment.id) || []}
              isRepliesExpanded={expandedReplies.has(comment.id)}
              onToggleLike={onToggleLike}
              onHideComment={onHideComment}
              onCopyComment={onCopyComment}
              onToggleReplies={onToggleReplies}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
