import { mockService } from '@/mock/service';
import type { VideoItem } from '@/types';

export const useMockData = true; // 开关：true 使用 mock 数据，false 调用真实 API

/**
 * 获取视频列表
 * @param page 页码（从 1 开始）
 * @returns 视频列表数据
 */
export async function fetchVideos(page: number): Promise<VideoItem[]> {
  if (useMockData) {
    // 使用 mock service（包含分页和延迟逻辑）
    return mockService.getVideos(page);
  }

  // 真实 API 调用（待实现）
  try {
    const response = await fetch(`/api/videos?page=${page}`);
    const data = await response.json();
    return data.videos || [];
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    throw error;
  }
}