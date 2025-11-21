import type React from 'react';
import { IconClose } from "@douyinfe/semi-icons";

/**
 * Tag 组件 - 标签/徽章
 *
 * 功能：
 * - 视频标签显示（如：热门、推荐、精选）
 * - 支持多种颜色主题
 * - 支持可关闭
 * - 符合抖音视觉风格
 *
 * @example
 * <Tag color="red">热门</Tag>
 * <Tag color="blue" icon={<IconStar />}>精选</Tag>
 */

export interface TagProps {
  /** 标签文本 */
  children: React.ReactNode;
  /** 颜色主题 */
  color?:
    | 'red' // 抖音红
    | 'blue' // 蓝色
    | 'yellow' // 黄色
    | 'green' // 绿色
    | 'gray' // 灰色
    | 'purple'; // 紫色
  /** 标签尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 前置图标 */
  icon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 点击事件 */
  onClick?: () => void;
}

// 颜色主题映射（抖音风格）
const colorMap = {
  red: 'bg-[#FE2C55]/10 text-[#FE2C55] border-[#FE2C55]/20',
  blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  green: 'bg-green-500/10 text-green-600 border-green-500/20',
  gray: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

// 尺寸映射
const sizeMap = {
  small: 'text-xs px-1.5 py-0.5 gap-1',
  medium: 'text-sm px-2 py-1 gap-1.5',
  large: 'text-base px-3 py-1.5 gap-2',
};

export function Tag({
  children,
  color = 'gray',
  size = 'small',
  closable = false,
  onClose,
  icon,
  className = '',
  onClick,
}: TagProps) {
  // 颜色样式
  const colorClass = colorMap[color];

  // 尺寸样式
  const sizeClass = sizeMap[size];

  // 交互样式
  const interactiveClass = onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : '';

  // 组合类名
  const combinedClassName = `inline-flex items-center justify-center rounded border ${colorClass} ${sizeClass} ${interactiveClass} ${className}`.trim();

  return (
    <span
      className={combinedClassName}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* 前置图标 */}
      {icon && <span className="inline-flex items-center">{icon}</span>}

      {/* 文本内容 */}
      <span className="font-medium whitespace-nowrap">{children}</span>

      {/* 关闭按钮 */}
      {closable && (
        <button
          type="button"
          className="inline-flex items-center justify-center ml-1 hover:opacity-70 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          aria-label="关闭标签"
        >
          <IconClose />
        </button>
      )}
    </span>
  );
}

export default Tag;
