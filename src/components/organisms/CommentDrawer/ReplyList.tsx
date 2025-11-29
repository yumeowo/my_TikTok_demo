import { motion, AnimatePresence } from 'framer-motion';
import type { ReplyListProps } from './types';
import { ReplyItem } from './ReplyItem';
import { ANIMATION_DURATION } from './constants';

/**
 * 二级评论列表组件
 */
export function ReplyList({
  replies,
  isExpanded,
  onToggleLike,
  onHideComment,
  onCopyComment,
}: ReplyListProps) {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: ANIMATION_DURATION.normal }}
          className="overflow-hidden bg-black"
        >
          {/* 回复列表 - 左侧缩进 */}
          <div className="ml-10">
            {replies.map((reply) => (
              <ReplyItem
                key={reply.id}
                reply={reply}
                onToggleLike={onToggleLike}
                onHideComment={onHideComment}
                onCopyComment={onCopyComment}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
