import { Avatar, Button, Dropdown } from '@douyinfe/semi-ui';
import { IconChevronDown, IconChevronUp, IconMoreStroked, IconCommentStroked, IconForwardStroked, IconHeartStroked, IconDeleteStroked } from '@douyinfe/semi-icons';
import type { CommentItemProps } from './types';
import { ReplyList } from './ReplyList';
import { formatReplyButtonText } from './utils';
import { AVATAR_SIZE } from './constants';
import { formatTime, formatCount } from "@/utils/format";
import { motion } from 'framer-motion';
import { LIKE_ANIMATION } from './constants';

/**
 * 单条一级评论组件
 */
export function CommentItem({
  comment,
  replies = [],
  isRepliesExpanded = false,
  onToggleLike,
  onHideComment,
  onCopyComment,
  onToggleReplies,
}: CommentItemProps) {
  const hasReplies = replies.length > 0 && comment.stats.subCommentCount > 0;

  // 如果评论被隐藏，显示占位符
  if (comment.isHidden) {
    return (
      <div className="flex gap-3 px-4 py-3 border-b border-gray-100">
        <div
          className="rounded-full bg-gray-200"
          style={{
            width: AVATAR_SIZE.primary,
            height: AVATAR_SIZE.primary,
          }}
        />
        <div className="flex-1">
          <p className="text-sm text-gray-400">该评论已被隐藏</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <div className="flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
        {/* 头像 */}
        <Avatar
          src={comment.author.avatar}
          size="default"
          style={{ width: AVATAR_SIZE.primary, height: AVATAR_SIZE.primary }}
          alt={comment.author.name}
        />

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2">
            {/* 左侧：用户信息和内容 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                {/* 用户信息 */}
                <span className="text-sm font-medium text-gray-900 truncate">
                  {comment.author.name}
                </span>
                <span className="text-sm text-gray-400 shrink-0">
                  {comment.ipLocation}
                </span>
              </div>

              {/* 评论内容 */}
              <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap break-words">
                {comment.content}
              </p>
            </div>

            {/* 右侧：更多按钮 */}
            <Dropdown
              trigger="click"
              position="bottomRight"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => onCopyComment(comment.content)}>复制评论</Dropdown.Item>
                  <Dropdown.Item onClick={() => onHideComment(comment.id)} type="danger">隐藏评论</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <motion.button
                type="button"
                whileTap={{ scale: LIKE_ANIMATION.tapScale }}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
                aria-label="更多操作"
              >
                <IconMoreStroked size="large" />
              </motion.button>
            </Dropdown>
          </div>

          {/* 时间和回复按钮 */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-sm text-gray-400">
              {formatTime(comment.createTime)}
            </span>

            {/* 查看回复按钮 */}
            {hasReplies && onToggleReplies && (
              <Button
                theme="borderless"
                size="small"
                icon={isRepliesExpanded ? <IconChevronUp /> : <IconChevronDown />}
                iconPosition="right"
                onClick={() => onToggleReplies(comment.id)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                style={{
                  padding: '0 4px',
                  height: 'auto',
                  minHeight: 'auto',
                }}
              >
                {formatReplyButtonText(comment.stats.subCommentCount, isRepliesExpanded)}
              </Button>
            )}
          </div>

          {/* 底部操作栏：评论、分享、点赞、隐藏 */}
          <div className="flex items-center gap-6 mt-3">
            {/* 评论按钮 */}
            <motion.button
              type="button"
              whileTap={{ scale: LIKE_ANIMATION.tapScale }}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="评论"
            >
              <IconCommentStroked size="large" />
              <span>评论</span>
            </motion.button>

            {/* 分享按钮 */}
            <motion.button
              type="button"
              whileTap={{ scale: LIKE_ANIMATION.tapScale }}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="分享"
            >
              <IconForwardStroked size="large" />
              <span>分享</span>
            </motion.button>

            {/* 点赞按钮 */}
            <motion.button
              type="button"
              onClick={() => onToggleLike(comment.id)}
              whileTap={{ scale: LIKE_ANIMATION.tapScale }}
              animate={{
                scale: comment.isLiked ? LIKE_ANIMATION.scale : 1,
              }}
              transition={{ duration: LIKE_ANIMATION.duration }}
              className={`flex items-center gap-1 text-sm ${
                comment.isLiked ? 'text-red-500' : 'text-gray-400'
              } hover:opacity-80 transition-opacity`}
              aria-label={comment.isLiked ? '取消点赞' : '点赞'}
            >
              <IconHeartStroked size="large" />
              {comment.localLikeCount > 0 && (
                <span className="font-medium">{formatCount(comment.localLikeCount)}</span>
              )}
            </motion.button>

            {/* 隐藏按钮 */}
            <motion.button
              type="button"
              onClick={() => onHideComment(comment.id)}
              whileTap={{ scale: LIKE_ANIMATION.tapScale }}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="隐藏评论"
            >
              <IconDeleteStroked size="large" />
              <span>隐藏</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 二级评论列表 */}
      {hasReplies && (
        <ReplyList
          replies={replies}
          isExpanded={isRepliesExpanded}
          onToggleLike={onToggleLike}
          onHideComment={onHideComment}
          onCopyComment={onCopyComment}
        />
      )}
    </div>
  );
}
