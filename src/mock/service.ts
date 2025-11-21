/**
 * Mock Service - Provides Mock Data API
 * 模拟服务器数据并提供分页功能
 */
import type { VideoItem } from '@/types';
import { processCrawlerData } from './adapter';

class MockService {
  private videos: VideoItem[] | null = null;
  private readonly pageSize = 10;
  private readonly delay = 500; // 模拟网络延迟 500ms

  /**
   * 加载mock数据
   */
  private async loadData(): Promise<VideoItem[]> {
    if (this.videos !== null) {
      return this.videos;
    }

    try {
      // 导入mock data文件
      const { default: rawContents } = await import(
        './data/search_contents_2025-11-20.json'
      );
      const { default: rawComments } = await import(
        './data/search_comments_2025-11-20.json'
      );

      // 处理数据
      this.videos = processCrawlerData(rawContents, rawComments);
      return this.videos;
    } catch (error) {
      console.error('Failed to load mock data:', error);
      return [];
    }
  }

  /**
   * 模拟网络延迟
   */
  private async simulateDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, this.delay));
  }

  /**
   * 获取分页视频列表
   * @param page 页码，从1开始
   * @returns 分页视频数据
   */
  async getVideos(page: number): Promise<VideoItem[]> {
    // 模拟网络延迟
    await this.simulateDelay();

    // 加载数据
    const allVideos = await this.loadData();

    // 分页逻辑
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    return allVideos.slice(start, end);
  }

  /**
   * 清除缓存并重新加载数据
   */
  clearCache(): void {
    this.videos = null;
  }
}

// 导出单例实例
export const mockService = new MockService();
