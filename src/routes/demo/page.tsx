'use client';

import { useState, useMemo } from 'react';
import { VideoPlayer } from '@/components/organisms/VideoPlayer';
import { CommentDrawer } from '@/components/organisms/CommentDrawer';
import { Sidebar } from '@/components/organisms/Sidebar';
import { processCrawlerData } from '@/mock/adapter';
import type { VideoItem } from '@/types';
import type {
  CrawlerRawContent,
  CrawlerRawComment,
} from '@/mock/adapter';

// 导入爬虫数据
import rawContents from '@/mock/data/search_contents_2025-11-20.json';
import rawComments from '@/mock/data/search_comments_2025-11-20.json';

/**
 * Demo Page - 抖音风格视频播放器与评论区完整示例
 *
 * 功能特性：
 * - 侧边栏导航（Sidebar组件，桌面端固定左侧）
 * - 全屏视频播放器（VideoPlayer组件）
 * - 抽屉式评论区（CommentDrawer组件）
 * - 使用真实爬虫数据（通过 processCrawlerData 处理）
 * - 响应式布局（桌面/移动端自适应）
 * - 状态管理（点赞、评论、收藏、分享、关注）
 */
export default function DemoPage() {
  // 处理爬虫数据，获取视频列表（含关联评论）
  const videos = useMemo(() => {
    try {
      return processCrawlerData(
        rawContents as CrawlerRawContent[],
        rawComments as CrawlerRawComment[]
      );
    } catch (error) {
      console.error('处理爬虫数据失败:', error);
      return [];
    }
  }, []);

  // 当前视频索引（支持未来的多视频滑动功能）
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // 评论抽屉状态
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);

  // 视频交互状态（模拟真实状态管理）
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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

  // 空状态 - 无视频数据
  if (!currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-black">
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
    <div className="relative w-screen h-screen overflow-hidden bg-black flex">
      {/* 侧边栏 - 桌面端显示 */}
      <Sidebar
        selectedItem="recommend"
        onRefresh={handleRefresh}
        className="hidden md:block"
      />

      {/* 主内容区域 - 视频播放器 */}
      <div className="flex-1 relative md:ml-52">
        <VideoPlayer
          videoUrl={currentVideo.videoUrl}
          videoId={currentVideo.id}
          videoInfo={{
            title: currentVideo.title,
            description: currentVideo.desc,
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
        />

        {/* 评论抽屉 */}
        <CommentDrawer
          videoId={currentVideo.id}
          comments={currentVideo.comments}
          isOpen={commentDrawerOpen}
          onClose={handleCloseCommentDrawer}
        />

        {/* 调试信息（开发环境下显示） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 md:left-56 bg-black/80 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm z-[9999] pointer-events-none">
            <div>视频ID: {currentVideo.id}</div>
            <div>索引: {currentVideoIndex + 1} / {videos.length}</div>
            <div>评论数: {currentVideo.comments.length}</div>
            <div>状态: {commentDrawerOpen ? '评论区已打开' : '播放中'}</div>
          </div>
        )}
      </div>
    </div>
  );
}
