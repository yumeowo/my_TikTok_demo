'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { VideoPlayer } from '@/components/organisms/VideoPlayer';
import { CommentDrawer } from '@/components/organisms/CommentDrawer';
import { Sidebar } from '@/components/organisms/Sidebar';
import { SearchBox } from '@/components/organisms/SearchBox';
import { mockService } from '@/mock/service';
import type { VideoItem } from '@/types';

/**
 * Demo Page - 抖音风格视频播放器与评论区完整示例
 *
 * 功能特性：
 * - 侧边栏导航（Sidebar组件，桌面端固定左侧）
 * - 全屏视频播放器（VideoPlayer组件）
 * - 抽屉式评论区（CommentDrawer组件）
 * - 使用 mockService 加载视频数据
 * - 响应式布局（桌面/移动端自适应）
 * - 状态管理（点赞、评论、收藏、分享、关注）
 */
export default function DemoPage() {
  // 视频数据列表
  const [videos, setVideos] = useState<VideoItem[]>([]);

  // 加载状态
  const [isLoading, setIsLoading] = useState(true);

  // 加载视频数据
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoading(true);
        // 使用 mockService 获取第一页视频数据
        const videoData = await mockService.getVideos(1);
        setVideos(videoData);
      } catch (error) {
        console.error('加载视频数据失败:', error);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideos().then(() => console.log("成功加载视频数据"));
  }, []);

  // 当前视频索引（支持未来的多视频滑动功能）
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 评论抽屉状态
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);

  // 视频交互状态（模拟真实状态管理）
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // 视频切换动画状态
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 用于防止快速连续切换
  const isTransitioningRef = useRef(false);

  // 获取当前视频数据
  const currentVideo: VideoItem | null = videos[currentVideoIndex] || null;

  // 处理点赞
  const handleLike = () => {
    setIsLiked(prev => !prev);
    console.log('点赞状态:', !isLiked);
  };

  // 处理评论按钮点击
  const handleComment = () => {
    setCommentDrawerOpen(true);
    console.log('打开评论区');
  };

  // 处理收藏
  const handleFavorite = () => {
    setIsFavorited(prev => !prev);
    console.log('收藏状态:', !isFavorited);
  };

  // 处理分享
  const handleShare = () => {
    console.log('分享视频:', currentVideo?.id);
    // 可以集成 Web Share API
    if (navigator.share && currentVideo) {
      navigator.share({
        title: currentVideo.title,
        text: currentVideo.desc,
        url: window.location.href,
      }).catch(err => console.log('分享取消或失败', err));
    }
  };

  // 处理关注
  const handleFollow = () => {
    setIsFollowing(prev => !prev);
    console.log('关注状态:', !isFollowing);
  };

  const handleVideo = useCallback((direction: 'up' | 'down') => {
    // 边界检查 - 根据方向判断
    if (isTransitioningRef.current) return;
    if (direction === 'down' && currentVideoIndex === 0) return; // 上箭头,已经是第一个
    if (direction === 'up' && currentVideoIndex >= videos.length - 1) return; // 下箭头,已经是最后一个

    isTransitioningRef.current = true;
    setTransitionDirection(direction);
    setIsTransitioning(true);

    // 延迟切换视频索引,让退出动画先执行
    setTimeout(() => {
      // 重置状态
      setIsLiked(false);
      setIsFavorited(false);
      setIsFollowing(false);
      setCommentDrawerOpen(false); // 关闭评论抽屉,确保内容同步

      // 立即重置动画状态,防止新视频出现第二次动画
      setTransitionDirection(null);
      setIsTransitioning(false);
      isTransitioningRef.current = false;
      // 根据方向更新索引
      setCurrentVideoIndex(prev => direction === 'down' ? prev - 1 : prev + 1);
    }, 300);
  }, [currentVideoIndex, videos.length]);

  // 处理侧边栏刷新按钮
  const handleRefresh = () => {
    console.log('刷新推荐视频流');
    // 重置到第一个视频
    setCurrentVideoIndex(0);
    // 重置所有状态
    setIsLiked(false);
    setIsFavorited(false);
    setIsFollowing(false);
    setCommentDrawerOpen(false);
  };

  // 处理评论抽屉关闭
  const handleCloseCommentDrawer = () => {
    setCommentDrawerOpen(false);
    console.log('关闭评论区');
  };

  // 处理搜索
  const handleSearch = (keyword: string) => {
    console.log('搜索关键词:', keyword);
  };

  // 键盘事件监听 - 上下键切换视频
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 如果焦点在输入框中,不处理键盘事件
      const activeElement = document.activeElement;
      if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      // 上箭头 - 上一个视频 - 向下滚动
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleVideo('down');
      }
      // 下箭头 - 下一个视频 - 向上滚动
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleVideo('up');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleVideo]);

  // 容器引用，用于 SideSheet 渲染
  const containerRef = useRef<HTMLDivElement>(null);

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#161823]">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-6 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
          <h2 className="text-xl font-semibold text-white mb-2">
            加载中...
          </h2>
          <p className="text-gray-400 text-sm">
            正在获取视频数据
          </p>
        </div>
      </div>
    );
  }

  // 空状态 - 无视频数据
  if (!currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#161823]">
        <div className="text-center px-6">
          <svg
            className="w-24 h-24 mx-auto mb-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="暂无视频图标"
          >
            <title>暂无视频</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-white mb-2">
            暂无视频数据
          </h2>
          <p className="text-gray-400 text-sm">
            请检查 mock 数据文件或稍后再试
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#161823] flex">
      {/* 固定在顶部的搜索框 */}
      <div className="fixed w-full top-0 left-0 z-[100] mt-1 pointer-events-none">
        <div className="pointer-events-auto max-w-[450px] mx-auto">
          <SearchBox
            placeholder="搜索你感兴趣的内容"
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* 侧边栏 - 桌面端显示 */}
      <Sidebar
        selectedItem="recommend"
        onRefresh={handleRefresh}
      />

      {/* 主内容区域 - 视频播放器 */}
      <div  className="flex-1 relative pl-[11%] pr-[4%] pt-16 pb-4 flex items-center justify-center">
        {/* 圆角矩形盒子容器 - 抖音网页版标准尺寸 */}
        <div
          className="w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ease-in-out"
        >
          {/* 视频容器 - 带切换动画 */}
          <div
            ref={containerRef}
            className="w-full h-full"
            style={{
              transform: isTransitioning
                ? transitionDirection === 'up'
                  ? 'translateY(-100%)'
                  : 'translateY(100%)'
                : 'translateY(0)',
              opacity: isTransitioning ? 0 : 1,
              // 只在退出动画时启用 transition,进入时禁用避免第二次动画
              transition: isTransitioning ? 'all 300ms ease-in-out' : 'none',
            }}
          >
            <VideoPlayer
              key={currentVideo.id} // 确保切换视频时完全重新渲染播放器
              videoUrl={currentVideo.videoUrl}
              videoId={currentVideo.id}
              videoInfo={{
                title: currentVideo.title,
                description: currentVideo.desc,
                createTime: currentVideo.createTime,
                author: {
                  name: currentVideo.author.name,
                  avatar: currentVideo.author.avatar,
                  isFollowing: isFollowing,
                },
                stats: {
                  likes: currentVideo.stats.diggCount + (isLiked ? 1 : 0),
                  comments: currentVideo.stats.commentCount,
                  favorites: currentVideo.stats.collectedCount + (isFavorited ? 1 : 0),
                  shares: currentVideo.stats.shareCount,
                },
              }}
              onLike={handleLike}
              onComment={handleComment}
              onFavorite={handleFavorite}
              onShare={handleShare}
              onFollow={handleFollow}
              style={{
                width: commentDrawerOpen ? '70%' : '100%'
              }}
            />
          </div>
        </div>
      </div>

        {/* 评论抽屉 - 渲染在容器内部 */}
        <CommentDrawer
          key={currentVideo.id} // 确保切换视频时评论区内容同步更新
          videoId={currentVideo.id}
          comments={currentVideo.comments}
          isOpen={commentDrawerOpen}
          onClose={handleCloseCommentDrawer}
          getPopupContainer={() => containerRef.current || document.body}
        />
      </div>
  );
}
