import { Button as SemiButton } from '@douyinfe/semi-ui';
import type { ButtonProps as SemiButtonProps } from '@douyinfe/semi-ui/lib/es/button';
import { motion } from 'framer-motion';
import type React from 'react';

/**
 * Button 组件 - 增强版按钮
 *
 * 功能：
 * - 基于 Semi UI Button 扩展
 * - 集成 Framer Motion 点击动画
 * - 预设抖音风格主题
 * - 支持圆形、方形等多种变体
 *
 * @example
 * <Button theme="douyin" size="large">关注</Button>
 * <Button theme="douyin-outline" icon={<IconHeart />}>点赞</Button>
 */

export interface ButtonProps extends Omit<SemiButtonProps, 'theme'> {
  /** 按钮主题 */
  theme?:
    | 'douyin' // 抖音红色主题
    | 'douyin-outline' // 抖音描边主题
    | 'douyin-text' // 抖音文字主题
    | 'default'; // 默认主题
  /** 是否圆形 */
  circle?: boolean;
  /** 是否禁用动画 */
  noAnimation?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}

// 抖音主题样式映射
const themeClassMap = {
  douyin: '!bg-[#FE2C55] !text-white !border-[#FE2C55] hover:!bg-[#E02347]',
  'douyin-outline':
    '!bg-transparent !text-[#FE2C55] !border-[#FE2C55] hover:!bg-[#FE2C55] hover:!text-white',
  'douyin-text': '!bg-transparent !text-[#FE2C55] !border-transparent hover:!bg-[#FE2C55]/10',
  default: '',
};

export function Button({
  theme = 'default',
  circle = false,
  noAnimation = false,
  className = '',
  children,
  ...restProps
}: ButtonProps) {
  // 主题样式
  const themeClass = themeClassMap[theme] || '';

  // 圆形样式
  const circleClass = circle ? '!rounded-full' : '';

  // 组合类名
  const combinedClassName = `${themeClass} ${circleClass} ${className}`.trim();

  // 动画配置
  const animationProps = noAnimation
    ? {}
    : {
        whileTap: { scale: 0.95 },
        whileHover: { scale: 1.02 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
      };

  const ButtonElement = (
    <SemiButton className={combinedClassName} {...restProps}>
      {children}
    </SemiButton>
  );

  // 如果禁用动画，直接返回按钮
  if (noAnimation) {
    return ButtonElement;
  }

  // 包裹 Framer Motion
  return <motion.div {...animationProps}>{ButtonElement}</motion.div>;
}

export default Button;
