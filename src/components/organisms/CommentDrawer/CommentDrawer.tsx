import { useCallback, useRef } from 'react';
import { SideSheet, Toast } from '@douyinfe/semi-ui';
import type { CommentDrawerProps } from './types';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { useCommentDrawer } from './useCommentDrawer';
import { copyToClipboard } from './utils';

/**
 * 评论抽屉主容器组件
 */
export function CommentDrawer({
  comments,
  isOpen,
  onClose,
}: CommentDrawerProps) {
  // 使用评论状态管理 Hook
  const {
    topLevelComments,
    replyMap,
    expandedReplies,
    addComment,
    toggleLike,
    hideComment,
    toggleReplies,
  } = useCommentDrawer(comments);

  // 创建评论列表的 ref，用于自动滚动
  const commentListRef = useRef<HTMLDivElement>(null);

  // 处理复制评论
  const handleCopyComment = useCallback((content: string) => {
    const success = copyToClipboard(content);
    if (success) {
      Toast.success({
        content: '复制成功',
        duration: 2,
      });
    } else {
      Toast.error({
        content: '复制失败',
        duration: 2,
      });
    }
  }, []);

  // 处理提交新评论
  const handleSubmitComment = useCallback(
    (content: string) => {
      // 这里应该传入真实的用户ID，暂时使用固定值
      addComment(content, 'current-user-id');

      // 显示成功提示
      Toast.success({
        content: '评论发布成功',
        duration: 2,
      });

      // 自动滚动到最新评论
      setTimeout(() => {
        if (commentListRef.current) {
          commentListRef.current.scrollTop = 0;
        }
      }, 100);
    },
    [addComment]
  );

  // 计算总评论数（一级评论 + 二级评论）
  const totalCommentCount = comments.length;

  return (
    <SideSheet
      visible={isOpen}
      onCancel={onClose}
      title={`评论 ${totalCommentCount}`}
      headerStyle={{
        borderBottom: '1px solid #e5e7eb',
        padding: '16px',
      }}
      bodyStyle={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      mask={true}
      maskClosable={true}
      closeOnEsc={true}
    >
      {/* 评论列表 */}
      <div ref={commentListRef} className="flex-1 overflow-y-auto">
        <CommentList
          comments={topLevelComments}
          replyMap={replyMap}
          expandedReplies={expandedReplies}
          onToggleLike={toggleLike}
          onHideComment={hideComment}
          onCopyComment={handleCopyComment}
          onToggleReplies={toggleReplies}
        />
      </div>

      {/* 评论输入框（固定底部） */}
      <CommentInput onSubmit={handleSubmitComment} />
    </SideSheet>
  );
}
