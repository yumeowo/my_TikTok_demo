// 评论数据接口
export interface Comment {
  id: string;
  content: string;
  createTime: number;
  ipLocation: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  stats: {
    likeCount: number;
    subCommentCount: number;
  };
  parentCommentId: string;
  pictures: string[];
}

// 视频数据接口
export interface VideoItem {
  id: string;
  title: string;
  desc: string;
  videoUrl: string;
  coverUrl: string;
  createTime: number;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  stats: {
    diggCount: number; // 点赞
    commentCount: number; // 评论
    shareCount: number; // 分享
    collectedCount: number; // 收藏
  };
  comments: Comment[]; // 关联的评论列表
  sourceKeyword?: string; // 搜索关键词
}