/**
 * MediaCrawler 数据清洗工具
 * 将爬虫的原始复杂 JSON 转换为前端组件需要的简单结构
 */
import type { Comment, VideoItem } from '@/types';

// 定义爬虫原始数据的部分结构 (Source Interface - 参考 MediaCrawler 输出)
// 爬虫视频数据原始结构
interface CrawlerRawContent {
  aweme_id: string;
  title: string;
  desc: string;
  create_time: number;
  user_id: string;
  nickname: string;
  avatar: string;
  liked_count: string;
  collected_count: string;
  comment_count: string;
  share_count: string;
  cover_url: string;
  video_download_url: string;
  source_keyword: string;
}

// 爬虫评论数据原始结构
interface CrawlerRawComment {
  comment_id: string;
  aweme_id: string;
  content: string;
  create_time: number;
  ip_location: string;
  user_id: string;
  nickname: string;
  avatar: string;
  like_count: number;
  sub_comment_count: string;
  parent_comment_id: string;
  pictures: string;
}

/**
 * 将单条爬虫评论数据转换为标准格式
 * @param raw 爬虫的原始评论 JSON 对象
 */
export const normalizeComment = (raw: CrawlerRawComment): Comment => {
  // 解析图片URL（可能是单个URL字符串或空字符串）
  const parsePictures = (picturesStr: string): string[] => {
    if (!picturesStr || picturesStr.trim() === '') {
      return [];
    }
    // 如果是单个URL，直接返回数组
    return [picturesStr];
  };

  // 安全的数字转换
  const safeNumber = (value: string | number): number => {
    if (typeof value === 'number') return value;
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed)? 0 : parsed;
  };

  return {
    id: raw.comment_id,
    content: raw.content || '',
    createTime: raw.create_time,
    ipLocation: raw.ip_location || '',
    author: {
      id: raw.user_id,
      name: raw.nickname || '匿名用户',
      avatar: raw.avatar || 'https://sf6-cdn-tos.douyinstatic.com/img/user-avatar/default~300x300.image',
    },
    stats: {
      likeCount: safeNumber(raw.like_count),
      subCommentCount: safeNumber(raw.sub_comment_count),
    },
    parentCommentId: raw.parent_comment_id || '0',
    pictures: parsePictures(raw.pictures),
  };
};

/**
 * 将单条爬虫视频数据转换为标准格式（不含评论）
 * @param raw 爬虫的原始视频 JSON 对象
 */
export const normalizeContent = (raw: CrawlerRawContent): VideoItem => {
  // 安全的数字转换（处理字符串类型的数字）
  const safeNumber = (value: string | number): number => {
    if (typeof value === 'number') return value;
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed)? 0 : parsed;
  };

  return {
    id: raw.aweme_id,
    title: raw.title || raw.desc || '无标题视频',
    desc: raw.desc || '',
    videoUrl: raw.video_download_url || '',
    coverUrl: raw.cover_url || '',
    createTime: raw.create_time,
    author: {
      id: raw.user_id,
      name: raw.nickname || '未知用户',
      avatar: raw.avatar || 'https://sf6-cdn-tos.douyinstatic.com/img/user-avatar/default~300x300.image',
    },
    stats: {
      diggCount: safeNumber(raw.liked_count),
      commentCount: safeNumber(raw.comment_count),
      shareCount: safeNumber(raw.share_count),
      collectedCount: safeNumber(raw.collected_count),
    },
    comments: [], // 初始化为空数组，后续通过关联函数填充
    sourceKeyword: raw.source_keyword,
  };
};

/**
 * 完整的数据处理流程：将爬虫数据转换为前端所需格式
 * @param rawContents 原始视频数据数组
 * @param rawComments 原始评论数据数组
 * @returns 关联了评论的视频数据数组
 */
export const processCrawlerData = (
  rawContents: CrawlerRawContent[],
  rawComments: CrawlerRawComment[]
): VideoItem[] => {
  // 1. 先将评论按 aweme_id 分组
  const commentsByAwemeId = new Map<string, Comment[]>();

  rawComments.forEach(rawComment => {
    const awemeId = rawComment.aweme_id;
    if (!commentsByAwemeId.has(awemeId)) {
      commentsByAwemeId.set(awemeId, []);
    }
    commentsByAwemeId.get(awemeId)!.push(normalizeComment(rawComment));
  });

  // 2. 转换视频数据并关联评论
  return rawContents.map(rawContent => {
    const videoItem = normalizeContent(rawContent);
    const awemeId = rawContent.aweme_id;

    // 关联该视频的所有评论
    if (commentsByAwemeId.has(awemeId)) {
      videoItem.comments = commentsByAwemeId.get(awemeId)!;
    }

    return videoItem;
  });
};

/* 测试样例
import _rawContents from './data/search_contents_2025-11-20.json';
import _rawComments from './data/search_comments_2025-11-20.json';

console.log(processCrawlerData(_rawContents, _rawComments));
*/
