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
          className="relative overflow-hidden"
        >
          {/* 左侧连接线 */}
          <div
            className="absolute left-5 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(to bottom, #e5e7eb 0%, transparent 100%)',
            }}
          />

          {/* 回复列表 */}
          <div className="ml-13 space-y-1">
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
