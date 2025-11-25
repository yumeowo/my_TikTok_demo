import type React from 'react';
import { Tag, Button, Empty } from '@douyinfe/semi-ui';
import { IconDeleteStroked } from '@douyinfe/semi-icons';
import type { SearchHistoryProps } from './types';

export function SearchHistory ({
  history,
  visible,
  onSelectHistory,
  onClearHistory,
  onDeleteHistory,
}: SearchHistoryProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="absolute top-full left-0 right-0 mt-2 bg-[#252632]
      border-2 border-[#2a2a2a] rounded-lg shadow-2xl
      z-50 overflow-hidden max-h-[400px]"
    >
      {history.length > 0 ? (
        <>
          {/* Header with clear button */}
          <div className="flex items-center justify-between px-4 pt-3 pb-1 bg-[#252632]">
            <span className="text-gray-400 text-[12px] font-bold">历史记录</span>
            <Button
              type="tertiary"
              size="small"
              icon={<IconDeleteStroked size="small" />}
              onClick={onClearHistory}
              className="text-gray-500 text-[12px] hover:text-[#fff] transition-colors duration-200 py-2"
            >
              清除记录
            </Button>
          </div>

          {/* History items as tags */}
          <div className="p-4 flex flex-wrap gap-2 max-h-[340px] overflow-y-auto custom-scrollbar">
            {history.map((item) => (
              <div key={item.id} className="relative group">
                <Tag
                  size="large"
                  onClick={() => onSelectHistory(item.keyword)}
                  className="
                    bg-[#33343f]
                    text-white
                    border-none
                    cursor-pointer
                    hover:bg-[#5d5f67]
                    rounded-[5px]
                    px-4
                    py-2
                    pr-6
                    text-[12px]
                    font-normal
                  "
                >
                  {item.keyword}
                </Tag>
                {/* Delete button - small circle with X */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteHistory(item.id);
                  }}
                  className="
                    absolute
                    -top-1
                    -right-1
                    w-4
                    h-4
                    flex
                    items-center
                    justify-center
                    bg-[#33343f]
                    text-gray-400
                    rounded-full
                    border
                    border-gray-600
                    opacity-0
                    group-hover:opacity-100
                    hover:bg-[#4a4b56]
                    hover:text-white
                    transition-all
                    duration-200
                    text-[10px]
                    leading-none
                  "
                  aria-label={`删除搜索记录: ${item.keyword}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="p-8">
          <Empty
            image={
              <div className="flex justify-center items-center w-20 h-20 mx-auto mb-2 text-gray-600">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="搜索图标"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            }
            description={
              <span className="text-gray-500 text-sm">暂无搜索历史</span>
            }
            style={{
              backgroundColor: 'transparent',
            }}
          />
        </div>
      )}

      {/* Custom scrollbar styles - injected via style tag */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a1a1a;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #3a3a3a;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #4a4a4a;
          }
        `}
      </style>
    </div>
  );
}
