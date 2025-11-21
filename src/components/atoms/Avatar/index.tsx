import { useState } from 'react';
import type React from 'react';

/**
 * Avatar 组件 - 用户头像展示
 *
 * 功能：
 * - 支持多种尺寸规格
 * - 支持圆形/方形切换
 * - 图片加载失败时显示默认占位符
 * - 符合抖音视觉风格
 *
 * @example
 * <Avatar src="https://example.com/avatar.jpg" size="md" />
 * <Avatar src="https://example.com/avatar.jpg" size="lg" shape="square" />
 */

export interface AvatarProps {
  /** 头像图片地址 */
  src?: string;
  /** 头像尺寸 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** 形状：圆形或方形 */
  shape?: 'circle' | 'square';
  /** 加载失败时的占位图 */
  fallback?: string;
  /** 用户名称（用于生成默认头像） */
  alt?: string;
  /** 自定义类名 */
  className?: string;
  /** 点击事件 */
  onClick?: () => void;
}

// 预设尺寸映射
const sizeMap = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

// 默认占位符（抖音官方默认头像）
const DEFAULT_FALLBACK =
  'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/default-avatar.png';

export function Avatar({
  src,
  size = 'md',
  shape = 'circle',
  fallback = DEFAULT_FALLBACK,
  alt = '用户',
  className = '',
  onClick,
}: AvatarProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  // 计算实际尺寸
  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  // 处理图片加载失败
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  // 形状样式
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';

  // 交互样式
  const interactiveClass = onClick
    ? 'cursor-pointer hover:opacity-80 transition-opacity'
    : '';

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden bg-gray-200 ${shapeClass} ${interactiveClass} ${className}`}
      style={{
        width: actualSize,
        height: actualSize,
        minWidth: actualSize,
        minHeight: actualSize,
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={alt}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
          draggable={false}
        />
      ) : (
        // 文字占位符
        <span
          className="text-white font-medium select-none"
          style={{
            fontSize: actualSize * 0.4,
          }}
        >
          {alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default Avatar;
