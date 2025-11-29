import { useCallback, useRef, useState } from 'react';
import { SideSheet, Toast } from '@douyinfe/semi-ui';
import type { CommentDrawerProps } from './types';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { useCommentDrawer } from './useCommentDrawer';
import { copyToClipboard } from './utils';
import { IconClose } from "@douyinfe/semi-icons";

/**
 * 评论抽屉主容器组件
 */
export function CommentDrawer({
  comments,
  isOpen,
  onClose,
  getPopupContainer,
}: CommentDrawerProps & {
  getPopupContainer?: () => HTMLElement;
}) {
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

      setTotalCommentCount((prev) => prev + 1);

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
  const [totalCommentCount,setTotalCommentCount] = useState(comments.length);

  function Header(){
    return (
      <div className="w-full justify-between m-0 mr-6 bg-black text-[#e6e6e6]">
        {/* Navigation Bar */}
        <div className="flex items-center gap-8 px-2 py-3 text-[16px] font-[550]">
          <button
            type="button"
            className="text-[#595959] hover:text-white transition-colors"
          >
            TA的作品
          </button>
          <button
            type="button"
            className="text-white"
          >
            评论
            <div className="py-1 border-b-[3px] border-douyin-red" />
          </button>
          <button
            type="button"
            className="text-[#595959] hover:text-white transition-colors"
          >
            相关推荐
          </button>
          <button
            type="button"
            className="text-[#595959] hover:text-white transition-colors"
          >
            合集
          </button>
          <button
            type="button"
            className="text-[#595959] hover:text-white transition-colors"
            onClick={ onClose }
          >
            <IconClose size="large"/>
          </button>
        </div>

        <div className="pb-1 pt-2 text-[12px] text-[#595959]">
          大家都在搜: 影视飓风
        </div>
        <div className="pb-2 text-[12px]">
          全部评论({totalCommentCount})
        </div>
      </div>
    )
  }

  return (
    <SideSheet
      visible={ isOpen }
      width="30%"
      onCancel={ onClose }
      title={ <Header /> }
      footer={<CommentInput onSubmit={ handleSubmitComment } />}
      headerStyle={{
        padding: 0,
        margin: 0
      }}
      bodyStyle={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      style={{
        padding: 0,
        margin: 0
      }}
      mask={ false }
      closeOnEsc={ true }
      getPopupContainer={ getPopupContainer }
    >
      {/* 评论列表 */ }
      <div ref={ commentListRef } className="flex-1 overflow-y-auto">
        <CommentList
          comments={ topLevelComments }
          replyMap={ replyMap }
          expandedReplies={ expandedReplies }
          onToggleLike={ toggleLike }
          onHideComment={ hideComment }
          onCopyComment={ handleCopyComment }
          onToggleReplies={ toggleReplies }
        />
      </div>
    </SideSheet>
  );
}
