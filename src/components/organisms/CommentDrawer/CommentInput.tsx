import { useState, useCallback, type KeyboardEvent } from 'react';
import { Input } from '@douyinfe/semi-ui';
import type { CommentInputProps } from './types';
import { COMMENT_INPUT_CONFIG } from './constants';
import { IconImageStroked, IconSend } from "@douyinfe/semi-icons";

/**
 * 评论输入框组件
 */
export function CommentInput({
  onSubmit,
  placeholder = COMMENT_INPUT_CONFIG.placeholder,
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

  const IconAt = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44V44C28.9886 44 33.5507 42.1735 37.0539 39.1529" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z" fill="none" stroke="#696969" stroke-width="4" stroke-linejoin="round"/>
      <path d="M32 24C32 27.3137 34.6863 30 38 30V30C41.3137 30 44 27.3137 44 24" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 25V16" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
  const IconFace = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#696969" stroke-width="4" stroke-linejoin="round"/>
      <path d="M24 35C29 35 31 31 31 31H17C17 31 19 35 24 35Z" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M31 18V22" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 18V22" stroke="#696969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )

  return (
    <div className="w-full h-[42px] flex items-center bg-[#333333] rounded-xl px-2 border-[1px] border-transparent hover:border-white">
      <Input
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        showClear
        className="text-[#e6e6e6] px-3"
        suffix={
          <div className="flex justify-between gap-3 cursor-pointer">
            <IconImageStroked size="extra-large" className="text-[#696969] hover:text-[#e6e6e6]" />
            <IconAt />
            <IconFace />
            <IconSend
              size="extra-large"
              className={`${isDisabled ? 'text-[#696969]' : 'text-douyin-red'}`}
              onClick={handleSubmit}
            />
          </div>
        }
      />
    </div>
  );
}
