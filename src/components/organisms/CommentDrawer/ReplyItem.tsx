import { Avatar } from '@douyinfe/semi-ui';
import type { ReplyItemProps } from './types';
import { CommentActions } from './CommentActions';
import { AVATAR_SIZE } from './constants';
import { formatTime } from "@/utils/format";

/**
 * 单条二级评论组件
 */
export function ReplyItem({
  reply,
  onToggleLike,
  onHideComment,
  onCopyComment,
}: ReplyItemProps) {
  // 如果评论被隐藏，显示占位符
  if (reply.isHidden) {
    return (
      <div className="flex gap-2 px-4 py-2">
        <div
          className="rounded-full bg-gray-200"
          style={{
            width: AVATAR_SIZE.secondary,
            height: AVATAR_SIZE.secondary,
          }}
        />
        <div className="flex-1">
          <p className="text-xs text-gray-400">该评论已被隐藏</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 px-4 py-2 hover:bg-gray-50 transition-colors">
      {/* 头像 */}
      <Avatar
        src={reply.author.avatar}
        size="small"
        style={{ width: AVATAR_SIZE.secondary, height: AVATAR_SIZE.secondary }}
        alt={reply.author.name}
      />

      {/* 内容区域 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          {/* 用户信息 */}
          <div className="flex items-baseline gap-2 flex-1 min-w-0">
            <span className="text-xs font-medium text-gray-900 truncate">
              {reply.author.name}
            </span>
            <span className="text-xs text-gray-400 shrink-0">
              {reply.ipLocation}
            </span>
          </div>
        </div>

        {/* 评论内容 */}
        <p className="text-xs text-gray-900 mt-1 whitespace-pre-wrap break-words">
          {reply.content}
        </p>

        {/* 时间 */}
        <div className="flex items-center gap-3 mt-1 mb-1">
          <span className="text-xs text-gray-400">
            {formatTime(reply.createTime)}
          </span>
        </div>

        {/* 点赞操作按钮（新行） */}
        <div className="flex items-center gap-4">
          <CommentActions
            isLiked={reply.isLiked}
            likeCount={reply.localLikeCount}
            onToggleLike={() => onToggleLike(reply.id)}
            onCopy={() => onCopyComment(reply.content)}
            onHide={() => onHideComment(reply.id)}
          />
        </div>
      </div>
    </div>
  );
}
