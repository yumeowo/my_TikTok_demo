import { useState, useCallback, type KeyboardEvent } from 'react';
import { Input, Button } from '@douyinfe/semi-ui';
import type { CommentInputProps } from './types';
import { COMMENT_INPUT_CONFIG } from './constants';

/**
 * 评论输入框组件
 */
export function CommentInput({
  onSubmit,
  placeholder = COMMENT_INPUT_CONFIG.placeholder,
  maxLength = COMMENT_INPUT_CONFIG.maxLength,
}: CommentInputProps) {
  const [value, setValue] = useState('');

  // 处理提交
  const handleSubmit = useCallback(() => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onSubmit(trimmedValue);
      setValue('');
    }
  }, [value, onSubmit]);

  // 处理回车键提交
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      // 按 Enter（非 Shift+Enter）提交
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const isDisabled = !value.trim();

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-gray-200">
      <Input
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        showClear
        style={{ minHeight: '40px' }}
      />
      <Button
        theme="solid"
        type="primary"
        onClick={handleSubmit}
        disabled={isDisabled}
        style={{
          minWidth: '64px',
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        {COMMENT_INPUT_CONFIG.submitButtonText}
      </Button>
    </div>
  );
}
