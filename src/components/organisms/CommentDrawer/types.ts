import type { Comment } from '@/types';

/**
 * 扩展的评论项状态，包含前端交互状态
 */
export interface CommentItemState extends Comment {
  isLiked: boolean; // 用户是否点赞
  isHidden: boolean; // 是否被隐藏
  localLikeCount: number; // 本地点赞数（用于乐观更新）
}

/**
 * 评论抽屉组件的 Props
 */
export interface CommentDrawerProps {
  videoId: string; // 视频ID
  comments: Comment[]; // 评论列表
  isOpen: boolean; // 是否打开抽屉
  onClose: () => void; // 关闭回调
}

/**
 * 评论列表组件的 Props
 */
export interface CommentListProps {
  comments: CommentItemState[]; // 一级评论列表
  replyMap: Map<string, CommentItemState[]>; // 二级评论映射
  expandedReplies: Set<string>; // 展开的回复集合
  onToggleLike: (commentId: string) => void; // 切换点赞
  onHideComment: (commentId: string) => void; // 隐藏评论
  onCopyComment: (content: string) => void; // 复制评论
  onToggleReplies: (commentId: string) => void; // 展开/收起回复
}

/**
 * 单条评论组件的 Props
 */
export interface CommentItemProps {
  comment: CommentItemState; // 评论数据
  replies?: CommentItemState[]; // 二级评论列表
  isRepliesExpanded?: boolean; // 回复是否展开
  onToggleLike: (commentId: string) => void; // 切换点赞
  onHideComment: (commentId: string) => void; // 隐藏评论
  onCopyComment: (content: string) => void; // 复制评论
  onToggleReplies?: (commentId: string) => void; // 展开/收起回复
}

/**
 * 评论操作按钮组的 Props
 */
export interface CommentActionsProps {
  isLiked: boolean; // 是否已点赞
  likeCount: number; // 点赞数
  onToggleLike: () => void; // 切换点赞
  onCopy: () => void; // 复制
  onHide: () => void; // 隐藏
}

/**
 * 回复列表组件的 Props
 */
export interface ReplyListProps {
  replies: CommentItemState[]; // 回复列表
  isExpanded: boolean; // 是否展开
  onToggleLike: (commentId: string) => void; // 切换点赞
  onHideComment: (commentId: string) => void; // 隐藏评论
  onCopyComment: (content: string) => void; // 复制评论
}

/**
 * 单条回复组件的 Props
 */
export interface ReplyItemProps {
  reply: CommentItemState; // 回复数据
  onToggleLike: (commentId: string) => void; // 切换点赞
  onHideComment: (commentId: string) => void; // 隐藏评论
  onCopyComment: (content: string) => void; // 复制评论
}

/**
 * 评论输入框组件的 Props
 */
export interface CommentInputProps {
  onSubmit: (content: string) => void; // 提交回调
  placeholder?: string; // 占位符
  maxLength?: number; // 最大长度
}
