import { Avatar, Dropdown } from '@douyinfe/semi-ui';
import {
  IconCommentStroked,
  IconCopyStroked,
  IconMoreStroked,
  IconHeartStroked,
  IconDeleteStroked,
  IconLikeHeart
} from '@douyinfe/semi-icons';
import type { ReplyItemProps } from './types';
import { AVATAR_SIZE, LIKE_ANIMATION } from './constants';
import { formatTime, formatCount } from "@/utils/format";
import { motion } from 'framer-motion';

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
      <div className="flex gap-3 px-4 py-3 bg-black">
        <div
          className="rounded-full"
          style={{
            width: AVATAR_SIZE.secondary,
            height: AVATAR_SIZE.secondary,
          }}
        />
        <div className="flex-1">
          <p className="text-[12px] text-[#353535]">该评论已被隐藏</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 px-4 py-3 bg-black">
      {/* 头像 */}
      <Avatar
        src={reply.author.avatar}
        size="small"
        style={{ width: AVATAR_SIZE.secondary, height: AVATAR_SIZE.secondary }}
        alt={reply.author.name}
      />

      {/* 内容区域 */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          {/* 左侧：用户信息和内容 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              {/* 用户信息 */}
              <span className="text-sm font-medium text-[#e6e6e6] truncate">
                {reply.author.name}
              </span>
            </div>

            {/* 评论内容 */}
            <p className="text-[12px] text-[#e6e6e6] mt-1 whitespace-pre-wrap break-words">
              {reply.content}
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
                  onClick={() => onCopyComment(reply.content)}
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

        {/* 时间和位置 */}
        <div className="flex-col items-center gap-3">
          <div className="text-[12px] font-semibold text-[#595959]">
            {formatTime(reply.createTime)} · {reply.ipLocation}
          </div>
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
            onClick={() => onCopyComment(reply.content)}
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
            onClick={() => onToggleLike(reply.id)}
            whileTap={{ scale: LIKE_ANIMATION.tapScale }}
            animate={{
              scale: reply.isLiked ? LIKE_ANIMATION.scale : 1,
            }}
            transition={{ duration: LIKE_ANIMATION.duration }}
            className="flex items-center gap-1 text-[12px] text-[#595959] hover:text-white"
            aria-label={reply.isLiked ? '取消点赞' : '点赞'}
          >
            {
              reply.isLiked ?
                <IconLikeHeart className="text-douyin-red" /> :
                <IconHeartStroked />
            }
            {reply.localLikeCount > 0 && (
              <span className="font-medium">{formatCount(reply.localLikeCount)}</span>
            )}
          </motion.button>

          {/* 隐藏按钮 */}
          <motion.button
            type="button"
            onClick={() => onHideComment(reply.id)}
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
  );
}
