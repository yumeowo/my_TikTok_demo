import type { CommentListProps } from './types';
import { CommentItem } from './CommentItem';

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
      <div className="flex flex-col items-center justify-center h-full text-[#353535] bg-black">
        <p className="text-sm">暂无评论</p>
        <p className="text-xs mt-1">快来发表你的精彩评论吧～</p>
      </div>
    );
  }

  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment.id}
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
        </div>
      ))}
    </>
  );
}
