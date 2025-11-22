import { useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
import { CommentDrawer } from '@/components/organisms/CommentDrawer';
import type { Comment } from '@/types';

/**
 * CommentDrawer 演示页面
 * 展示抖音风格的评论区组件
 */
export default function CommentDemoPage() {
  const [isOpen, setIsOpen] = useState(false);

  // 模拟评论数据
  const mockComments: Comment[] = [
    {
      id: '1',
      content: '这个视频太精彩了！拍摄手法很专业，剪辑也很流畅，给我带来了很多灵感。',
      createTime: Date.now() - 5 * 60 * 1000, // 5分钟前
      ipLocation: '北京',
      author: {
        id: 'user-1',
        name: '抖音创作者',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      stats: {
        likeCount: 1234,
        subCommentCount: 3,
      },
      parentCommentId: '0',
      pictures: [],
    },
    {
      id: '2',
      content: '同意楼上，这个角度真的很新颖',
      createTime: Date.now() - 3 * 60 * 1000, // 3分钟前
      ipLocation: '上海',
      author: {
        id: 'user-2',
        name: '小红书达人',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      stats: {
        likeCount: 456,
        subCommentCount: 0,
      },
      parentCommentId: '1', // 回复给评论1
      pictures: [],
    },
    {
      id: '3',
      content: '我也觉得，学到了很多',
      createTime: Date.now() - 2 * 60 * 1000, // 2分钟前
      ipLocation: '广州',
      author: {
        id: 'user-3',
        name: '摄影爱好者',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      stats: {
        likeCount: 89,
        subCommentCount: 0,
      },
      parentCommentId: '1', // 回复给评论1
      pictures: [],
    },
    {
      id: '4',
      content: '求教程！',
      createTime: Date.now() - 60 * 1000, // 1分钟前
      ipLocation: '深圳',
      author: {
        id: 'user-4',
        name: '新手小白',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      stats: {
        likeCount: 23,
        subCommentCount: 0,
      },
      parentCommentId: '1', // 回复给评论1
      pictures: [],
    },
    {
      id: '5',
      content: '音乐很好听，是什么歌？',
      createTime: Date.now() - 10 * 60 * 1000, // 10分钟前
      ipLocation: '杭州',
      author: {
        id: 'user-5',
        name: '音乐发烧友',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      stats: {
        likeCount: 567,
        subCommentCount: 2,
      },
      parentCommentId: '0',
      pictures: [],
    },
    {
      id: '6',
      content: '这是《夜的第七章》',
      createTime: Date.now() - 8 * 60 * 1000, // 8分钟前
      ipLocation: '成都',
      author: {
        id: 'user-6',
        name: '周杰伦粉丝',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      stats: {
        likeCount: 123,
        subCommentCount: 0,
      },
      parentCommentId: '5', // 回复给评论5
      pictures: [],
    },
    {
      id: '7',
      content: '谢谢！马上去听',
      createTime: Date.now() - 7 * 60 * 1000, // 7分钟前
      ipLocation: '杭州',
      author: {
        id: 'user-5',
        name: '音乐发烧友',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      stats: {
        likeCount: 45,
        subCommentCount: 0,
      },
      parentCommentId: '5', // 回复给评论5
      pictures: [],
    },
    {
      id: '8',
      content: '已关注，期待更多作品！',
      createTime: Date.now() - 15 * 60 * 1000, // 15分钟前
      ipLocation: '武汉',
      author: {
        id: 'user-7',
        name: '热心观众',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      stats: {
        likeCount: 234,
        subCommentCount: 0,
      },
      parentCommentId: '0',
      pictures: [],
    },
    {
      id: '9',
      content: '这个拍摄地点在哪里？好想去打卡',
      createTime: Date.now() - 60 * 60 * 1000, // 1小时前
      ipLocation: '重庆',
      author: {
        id: 'user-8',
        name: '旅行达人',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      stats: {
        likeCount: 890,
        subCommentCount: 0,
      },
      parentCommentId: '0',
      pictures: [],
    },
    {
      id: '10',
      content: '点赞收藏了，太有用了！',
      createTime: Date.now() - 2 * 60 * 60 * 1000, // 2小时前
      ipLocation: '西安',
      author: {
        id: 'user-9',
        name: '学习狂人',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      stats: {
        likeCount: 345,
        subCommentCount: 0,
      },
      parentCommentId: '0',
      pictures: [],
    },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          抖音风格评论区组件演示
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          完整复刻抖音评论区的UI和交互效果，包括点赞、回复、复制、隐藏等功能。
          支持响应式布局，桌面端右侧滑出，移动端底部滑出。
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            theme="solid"
            type="primary"
            size="large"
            onClick={() => setIsOpen(true)}
          >
            打开评论区 ({mockComments.length} 条评论)
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>功能特性：</p>
          <ul className="mt-2 space-y-1">
            <li>一级评论和二级评论展示</li>
            <li>点赞动画效果（Framer Motion）</li>
            <li>复制评论内容</li>
            <li>隐藏评论</li>
            <li>展开/收起回复</li>
            <li>发布新评论（乐观更新）</li>
            <li>响应式布局（桌面/移动端）</li>
          </ul>
        </div>
      </div>

      {/* 评论抽屉 */}
      <CommentDrawer
        videoId="demo-video-123"
        comments={mockComments}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
