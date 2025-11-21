import { motion } from 'framer-motion';
import type React from 'react';

/**
 * Loading 组件 - 加载状态显示
 *
 * 功能：
 * - 多种加载动画（旋转、脉冲、骨架屏）
 * - 支持全屏/局部加载
 * - 支持自定义文本提示
 * - 符合抖音视觉风格
 *
 * @example
 * <Loading />
 * <Loading type="skeleton" />
 * <Loading type="pulse" text="加载中..." />
 */

export interface LoadingProps {
  /** 加载动画类型 */
  type?: 'spinner' | 'pulse' | 'skeleton';
  /** 加载提示文本 */
  text?: string;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否全屏显示 */
  fullscreen?: boolean;
  /** 自定义类名 */
  className?: string;
}

// 尺寸映射
const sizeMap = {
  small: 24,
  medium: 40,
  large: 56,
};

/**
 * 旋转加载器
 */
function Spinner({ size }: { size: number }) {
  return (
    <motion.div
      className="border-4 border-gray-200 border-t-[#FE2C55] rounded-full"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: 'linear',
      }}
    />
  );
}

/**
 * 脉冲加载器（三个圆点）
 */
function Pulse() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-[#FE2C55] rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * 骨架屏加载器
 */
function Skeleton() {
  return (
    <div className="w-full space-y-3 animate-pulse">
      {/* 头像 + 标题 */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
      </div>

      {/* 视频区域 */}
      <div className="aspect-[9/16] bg-gray-200 rounded-lg" />
    </div>
  );
}

export function Loading({
  type = 'spinner',
  text,
  size = 'medium',
  fullscreen = false,
  className = '',
}: LoadingProps) {
  const actualSize = sizeMap[size];

  // 渲染加载动画
  const renderLoader = () => {
    switch (type) {
      case 'pulse':
        return <Pulse />;
      case 'skeleton':
        return <Skeleton />;
      case 'spinner':
        return <Spinner size={actualSize} />;
    }
  };

  // 骨架屏不需要居中容器
  if (type === 'skeleton') {
    return <div className={className}>{renderLoader()}</div>;
  }

  // 基础容器样式
  const containerClass = fullscreen
    ? 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm'
    : 'relative';

  return (
    <div className={`${containerClass} ${className}`}>
      <div className="flex flex-col items-center justify-center h-full gap-3">
        {renderLoader()}
        {text && <p className="text-sm text-gray-500 animate-pulse">{text}</p>}
      </div>
    </div>
  );
}

/**
 * 骨架屏组件（快捷方式）
 */
export function SkeletonLoader({ className }: { className?: string }) {
  return <Loading type="skeleton" className={className} />;
}

export default Loading;
