import type React from 'react';
import type { IconProps as SemiIconProps } from '@douyinfe/semi-icons/lib/cjs/components/Icon';

/**
 * Icon 组件 - 统一的图标封装
 *
 * 功能：
 * - 封装 Semi Icons，提供统一接口
 * - 支持自定义大小、颜色
 * - 支持旋转、悬停效果
 * - 符合抖音交互风格
 *
 * @example
 * import { IconHeart } from '@douyinfe/semi-icons';
 * <Icon icon={IconHeart} size={24} color="#FE2C55" />
 */

/** Semi Icon 组件类型 */
type SemiIconComponent = React.ForwardRefExoticComponent<
  Omit<Omit<SemiIconProps, 'svg' | 'type'>, 'ref'> &
    React.RefAttributes<HTMLSpanElement>
>;

export interface IconProps {
  /** Semi Icon 组件 */
  icon: SemiIconComponent;
  /** 图标颜色 */
  color?: string;
  /** 是否旋转 */
  spin?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件 */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  /** 悬停效果 */
  hoverable?: boolean;
}

export function Icon({
  icon: IconComponent,
  color,
  spin = false,
  className = '',
  style = {},
  onClick,
  hoverable = false,
}: IconProps) {
  // 基础样式
  const baseClass = 'inline-flex items-center justify-center';

  // 交互样式
  const interactiveClass = onClick || hoverable ? 'cursor-pointer' : '';
  const hoverClass = hoverable ? 'hover:opacity-70 transition-opacity duration-200' : '';

  // 旋转动画
  const spinClass = spin ? 'animate-spin' : '';

  // 组合所有类名
  const combinedClassName = `${baseClass} ${interactiveClass} ${hoverClass} ${spinClass} ${className}`.trim();

  // 合并样式
  const combinedStyle: React.CSSProperties = {
    color,
    ...style,
  };

  return (
    <span
      className={combinedClassName}
      style={combinedStyle}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick(e as unknown as React.MouseEvent<HTMLSpanElement>);
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <IconComponent style={{ display: 'block' }} />
    </span>
  );
}

export default Icon;
