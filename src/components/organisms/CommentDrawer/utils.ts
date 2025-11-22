import copy from 'copy-to-clipboard';

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export function copyToClipboard(text: string): boolean {
  try {
    return copy(text, {
      debug: false,
      format: 'text/plain',
    });
  } catch (error) {
    console.error('Copy to clipboard error:', error);
    return false;
  }
}

/**
 * 格式化回复按钮文案
 * @param count 回复数量
 * @param isExpanded 是否已展开
 * @returns 格式化后的文案
 */
export function formatReplyButtonText(count: number, isExpanded: boolean): string {
  if (isExpanded) {
    return '收起';
  }

  if (count === 0) {
    return '';
  }

  return `查看${count}条回复`;
}

/**
 * 生成临时评论ID（用于乐观更新）
 * @returns 临时ID字符串
 */
export function generateTempCommentId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 检查是否为临时评论（尚未保存到服务器）
 * @param commentId 评论ID
 * @returns 是否为临时评论
 */
export function isTempComment(commentId: string): boolean {
  return commentId.startsWith('temp_');
}
