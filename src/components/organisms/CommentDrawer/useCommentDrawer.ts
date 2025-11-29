import { useState, useMemo, useCallback } from 'react';
import type { Comment } from '@/types';
import type { CommentItemState } from './types';
import { generateTempCommentId } from './utils';

/**
 * 评论抽屉状态管理 Hook
 * @param initialComments 初始评论列表
 * @returns 状态和操作方法
 */
export function useCommentDrawer(initialComments: Comment[]) {
  // 将 Comment[] 转换为 CommentItemState[]
  const [comments, setComments] = useState<CommentItemState[]>(() =>
    initialComments.map((comment) => ({
      ...comment,
      isLiked: false,
      isHidden: false,
      localLikeCount: comment.stats.likeCount,
    }))
  );

  // 展开的回复集合
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  // 派生状态：一级评论列表（parentCommentId === '0'），按时间倒序
  const topLevelComments = useMemo(() => {
    return comments
      .filter((comment) => comment.parentCommentId === '0')
      .sort((a, b) => b.createTime - a.createTime);
  }, [comments]);

  // 派生状态：二级评论映射 Map<commentId, replies[]>
  const replyMap = useMemo(() => {
    const map = new Map<string, CommentItemState[]>();

    comments
      .filter((comment) => comment.parentCommentId !== '0')
      .forEach((reply) => {
        const parentId = reply.parentCommentId;
        if (!map.has(parentId)) {
          map.set(parentId, []);
        }
        map.get(parentId)!.push(reply);
      });

    // 对每个父评论的回复按时间正序排序
    map.forEach((replies) => {
      replies.sort((a, b) => a.createTime - b.createTime);
    });

    return map;
  }, [comments]);

  // 添加评论（乐观更新）
  const addComment = useCallback(
    (content: string, authorId: string) => {
      const newComment: CommentItemState = {
        id: generateTempCommentId(),
        content,
        createTime: Date.now(),
        ipLocation: '秦皇岛', // 实际应从用户信息获取
        author: {
          id: authorId,
          name: '悠梦', // 实际应从用户信息获取
          avatar: 'http://lz.sinaimg.cn/large/0084zAyygy1i7tp71zrc4j30q40q4wg5.jpg',
        },
        stats: {
          likeCount: 1010,
          subCommentCount: 0,
        },
        parentCommentId: '0',
        pictures: [],
        isLiked: false,
        isHidden: false,
        localLikeCount: 0,
      };

      // 添加到列表顶部
      setComments((prev) => [newComment, ...prev]);
    },[]);

  // 切换点赞状态
  const toggleLike = useCallback((commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const isLiked = !comment.isLiked;
          const localLikeCount = isLiked
            ? comment.localLikeCount + 1
            : comment.localLikeCount - 1;

          return {
            ...comment,
            isLiked,
            localLikeCount,
          };
        }
        return comment;
      })
    );
  }, []);

  // 隐藏评论
  const hideComment = useCallback((commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isHidden: true,
          };
        }
        return comment;
      })
    );
  }, []);

  // 展开/收起回复
  const toggleReplies = useCallback((commentId: string) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  }, []);

  return {
    comments,
    topLevelComments,
    replyMap,
    expandedReplies,
    addComment,
    toggleLike,
    hideComment,
    toggleReplies,
  };
}
