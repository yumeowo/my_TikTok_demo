import type React from 'react';
import { IconSearchStroked } from '@douyinfe/semi-icons';
import type { SearchInputProps } from './types';

export function SearchInput ({
  value,
  placeholder,
  isFocused,
  onChange,
  onFocus,
  onBlur,
  onEnter,
  onSearch,
}: SearchInputProps){

  /**
   * Handle keyboard events
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // 先触发回车处理逻辑，随后清空输入框
      onEnter();
      onChange('');
    }
  };

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`
        relative w-full m-1 flex items-center rounded-xl overflow-hidden transition-all duration-300
        ${
          isFocused
            ? 'bg-[#161823] border-2 border-white shadow-none'
            : 'bg-[#393a44] border-2 border-transparent'
        }
      `}
    >
      {/* Input Field */}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className={`
          flex-1 h-10 px-4 outline-none text-white text-[16px]
          bg-transparent
          placeholder:text-[#65676e]
        `}
      />

      {/* Divider */}
      <div className="w-px h-6 bg-white/30" />

      {/* Search Button */}
      <button
        type="button"
        onClick={() => {
          // 先触发搜索逻辑，随后清空输入框
          onSearch();
          onChange('');
        }}
        className={`
          flex items-center justify-center gap-1 px-4 h-10
          text-[16px] font-medium transition-all duration-300
          ${
            isFocused
              ? 'bg-white text-[#161823]'
              : 'bg-transparent text-white'
          }
        `}
      >
        <IconSearchStroked />
        <span>搜索</span>
      </button>
    </div>
  );
}
