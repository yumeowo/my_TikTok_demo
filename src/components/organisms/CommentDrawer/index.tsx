/**
 * CommentDrawer - 抖音风格的评论区组件
 *
 * 完整复刻抖音评论区的UI和交互效果：
 * - 响应式抽屉布局（桌面端右侧滑出，移动端底部滑出）
 * - 一级评论和二级评论展示
 * - 点赞、复制、隐藏评论等操作
 * - 动画效果（Framer Motion）
 * - 乐观更新（UI先更新，再同步到服务器）
 *
 * @example
 * ```tsx
 * import { CommentDrawer } from '@/components/organisms/CommentDrawer';
 *
 * function VideoPage() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>查看评论</button>
 *       <CommentDrawer
 *         videoId="123456"
 *         comments={videoComments}
 *         isOpen={isOpen}
 *         onClose={() => setIsOpen(false)}
 *       />
 *     </>
 *   );
 * }
 * ```
 */

export { CommentDrawer } from './CommentDrawer';
export type {
  CommentDrawerProps,
  CommentItemState,
  CommentListProps,
  CommentItemProps,
  CommentActionsProps,
  ReplyListProps,
  ReplyItemProps,
  CommentInputProps,
} from './types';
export { useCommentDrawer } from './useCommentDrawer';
export * from './constants';
export * from './utils';
