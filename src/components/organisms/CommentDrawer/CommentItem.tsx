import { Avatar, Button, Dropdown } from '@douyinfe/semi-ui';
import {
  IconChevronDown,
  IconChevronUp,
  IconMoreStroked,
  IconCommentStroked,
  IconCopyStroked,
  IconHeartStroked,
  IconDeleteStroked,
  IconLikeHeart
} from '@douyinfe/semi-icons';
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
      <div className="flex gap-3 px-4 py-3 bg-black">
        <div
          className="rounded-full"
          style={{
            width: AVATAR_SIZE.primary,
            height: AVATAR_SIZE.primary,
          }}
        />
        <div className="flex-1">
          <p className="text-[12px] text-[#353535]">该评论已被隐藏</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3 px-4 py-3 bg-black">
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
                <span className="text-sm font-medium text-[#e6e6e6] truncate">
                  {comment.author.name}
                </span>
              </div>

              {/* 评论内容 */}
              <p className="text-[12px] text-[#e6e6e6] mt-1 whitespace-pre-wrap break-words">
                {comment.content}
              </p>
            </div>

            {/* 右侧：更多按钮 */}
            <Dropdown
              trigger="click"
              position="bottomRight"
              className="h-[60%] bg-[#33343f] rounded-xl"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => onCopyComment(comment.content)}
                  >
                    <div className="text-[14px] text-[#e6e6e6] p-2 hover:bg-[#42434d] rounded-xl">
                      复制评论
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <motion.button
                type="button"
                whileTap={{ scale: LIKE_ANIMATION.tapScale }}
                className="text-[12px] text-[#595959] hover:text-[#e6e6e6] ml-2"
                aria-label="更多操作"
              >
                <IconMoreStroked />
              </motion.button>
            </Dropdown>
          </div>

          {/* 时间和回复按钮 */}
          <div className="flex-col items-center gap-3">
            <div className="text-[12px] font-semibold text-[#595959]">
              {formatTime(comment.createTime)} · {comment.ipLocation}
            </div>

            {/* 查看回复按钮 */}
            {hasReplies && onToggleReplies && (
              <Button
                theme="borderless"
                size="small"
                icon={isRepliesExpanded ? <IconChevronUp /> : <IconChevronDown />}
                iconPosition="right"
                onClick={() => onToggleReplies(comment.id)}
                className="text-[12px] font-bold text-[#353535] hover:text-[#e6e6e6]"
              >
                —— {formatReplyButtonText(comment.stats.subCommentCount, isRepliesExpanded)}
              </Button>
            )}
          </div>

          {/* 底部操作栏：评论、分享、点赞、隐藏 */}
          <div className="flex items-center gap-3 mt-3">
            {/* 评论按钮 */}
            <motion.button
              type="button"
              whileTap={{ scale: LIKE_ANIMATION.tapScale }}
              className="flex items-center gap-1 text-[12px] text-[#595959] hover:text-white"
              aria-label="评论"
            >
              <IconCommentStroked />
              <span>评论</span>
            </motion.button>

            {/* 复制评论按钮 */}
            <motion.button
              type="button"
              onClick={() => onCopyComment(comment.content)}
              whileTap={{ scale: LIKE_ANIMATION.tapScale }}
              className="flex items-center gap-1 text-[12px] text-[#595959] hover:text-white"
              aria-label="复制评论"
            >
              <IconCopyStroked />
              <span>复制评论</span>
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
              className="flex items-center gap-1 text-[12px] text-[#595959] hover:text-white"
              aria-label={comment.isLiked ? '取消点赞' : '点赞'}
            >
              {
                comment.isLiked ?
                  <IconLikeHeart className="text-douyin-red" /> :
                  <IconHeartStroked />
              }
              {comment.localLikeCount > 0 && (
                <span className="font-medium">{formatCount(comment.localLikeCount)}</span>
              )}
            </motion.button>

            {/* 隐藏按钮 */}
            <motion.button
              type="button"
              onClick={() => onHideComment(comment.id)}
              whileTap={{ scale: LIKE_ANIMATION.tapScale }}
              className="flex items-center gap-1 text-[12px] text-[#595959] hover:text-white"
              aria-label="隐藏评论"
            >
              <IconDeleteStroked />
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
    </>
  );
}
