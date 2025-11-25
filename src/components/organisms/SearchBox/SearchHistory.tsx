import type React from 'react';
import { Tag, Button, Empty } from '@douyinfe/semi-ui';
import { IconClose } from '@douyinfe/semi-icons';
import type { SearchHistoryProps } from './types';

/**
 * SearchHistory Component
 *
 * Displays search history as clickable tags with clear functionality.
 * Shows "历史记录" header with "清除记录" button.
 */
export const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  visible,
  onSelectHistory,
  onClearHistory,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-lg shadow-2xl z-50 overflow-hidden"
      style={{
        maxHeight: '400px',
      }}
    >
      {history.length > 0 ? (
        <>
          {/* Header with clear button */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a] bg-[#0f0f0f]">
            <span className="text-gray-400 text-sm font-medium">历史记录</span>
            <Button
              type="tertiary"
              size="small"
              icon={<IconClose />}
              onClick={onClearHistory}
              className="text-gray-500 hover:text-[#ff0050] transition-colors duration-200"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '4px 8px',
              }}
            >
              清除记录
            </Button>
          </div>

          {/* History items as tags */}
          <div className="p-4 flex flex-wrap gap-2 max-h-[340px] overflow-y-auto custom-scrollbar">
            {history.map((item) => (
              <Tag
                key={item.id}
                size="large"
                onClick={() => onSelectHistory(item.keyword)}
                className="
                  bg-[#2a2a2a]
                  text-gray-300
                  border-none
                  cursor-pointer
                  hover:bg-[#3a3a3a]
                  hover:text-white
                  transition-all
                  duration-200
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-normal
                "
                style={{
                  backgroundColor: '#2a2a2a',
                  color: '#d1d5db',
                  border: 'none',
                }}
              >
                {item.keyword}
              </Tag>
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
};
