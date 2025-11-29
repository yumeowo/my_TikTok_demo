/**
 * 动画时长配置
 */
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

/**
 * 评论输入框配置
 */
export const COMMENT_INPUT_CONFIG = {
  placeholder: '留下你的精彩评论吧',
  submitButtonText: '发布',
} as const;

/**
 * 头像尺寸配置
 */
export const AVATAR_SIZE = {
  primary: 40, // 一级评论头像
  secondary: 32, // 二级评论头像
} as const;

/**
 * 点赞动画配置
 */
export const LIKE_ANIMATION = {
  scale: [1, 1.2, 1] as number[],
  duration: 0.3,
  tapScale: 0.85,
};
