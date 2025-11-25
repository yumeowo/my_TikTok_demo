import type React from 'react';
import { useState } from 'react';
import { IconRefresh } from '@douyinfe/semi-icons';
import { NAV_ITEMS, BOTTOM_ACTIONS } from './constants';
import type { SidebarProps } from './types';

export function Sidebar ({
  selectedItem = 'recommend',
  onRefresh,
  className = '',
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleNavClick = (itemId: string) => {
    // For now, only "recommend" has interaction
    // Other items will be implemented later
    if (itemId === 'recommend' && onRefresh) {
      onRefresh();
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-[#1F1F1F] text-white w-52 fixed left-0 top-0 ${className}`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex items-center justify-center w-10 h-10">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>抖音Logo</title>
            <path
              d="M26.5 10.5C26.5 10.5 25.5 8.5 24 7.5C22.5 6.5 20.5 6.5 19.5 6.5C19.5 6.5 16 6 12 6C8 6 4.5 6.5 4.5 6.5C3.5 6.5 1.5 6.5 0 7.5C-1.5 8.5 -2.5 10.5 -2.5 10.5C-2.5 10.5 -3 13.5 -3 16.5V19.5C-3 22.5 -2.5 25.5 -2.5 25.5C-2.5 25.5 -1.5 27.5 0 28.5C1.5 29.5 3.5 29.5 4.5 29.5C4.5 29.5 8 30 12 30C16 30 19.5 29.5 19.5 29.5C20.5 29.5 22.5 29.5 24 28.5C25.5 27.5 26.5 25.5 26.5 25.5C26.5 25.5 27 22.5 27 19.5V16.5C27 13.5 26.5 10.5 26.5 10.5Z"
              fill="#25F4EE"
              transform="translate(3, 0)"
            />
            <path
              d="M26.5 10.5C26.5 10.5 25.5 8.5 24 7.5C22.5 6.5 20.5 6.5 19.5 6.5C19.5 6.5 16 6 12 6C8 6 4.5 6.5 4.5 6.5C3.5 6.5 1.5 6.5 0 7.5C-1.5 8.5 -2.5 10.5 -2.5 10.5C-2.5 10.5 -3 13.5 -3 16.5V19.5C-3 22.5 -2.5 25.5 -2.5 25.5C-2.5 25.5 -1.5 27.5 0 28.5C1.5 29.5 3.5 29.5 4.5 29.5C4.5 29.5 8 30 12 30C16 30 19.5 29.5 19.5 29.5C20.5 29.5 22.5 29.5 24 28.5C25.5 27.5 26.5 25.5 26.5 25.5C26.5 25.5 27 22.5 27 19.5V16.5C27 13.5 26.5 10.5 26.5 10.5Z"
              fill="#FE2C55"
              transform="translate(1, 2)"
            />
            <path
              d="M19 14L14 17V11L19 14Z"
              fill="white"
            />
          </svg>
        </div>
        <span className="text-xl font-semibold">抖音</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            if (item.type === 'divider') {
              return (
                <li key={item.id} className="py-2">
                  <div className="h-px bg-gray-700 opacity-50" />
                </li>
              );
            }

            const isSelected = item.id === selectedItem;
            const isHovered = hoveredItem === item.id;
            const isRecommend = item.id === 'recommend';

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 ease-in-out
                    relative group
                    ${
                      isSelected
                        ? 'bg-[#2F2F2F] text-white'
                        : 'text-gray-300 hover:bg-[#2A2A2A]'
                    }
                  `}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleNavClick(item.id)}
                >
                  {/* Icon */}
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span className="flex-1 text-left text-base font-medium">
                    {item.label}
                  </span>

                  {/* Refresh Icon - Only for Recommend on Hover */}
                  {isRecommend && isHovered && (
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                      <IconRefresh size="small" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-gray-800 px-3 py-4">
        <div className="flex items-center justify-around">
          {BOTTOM_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              className="relative flex flex-col items-center gap-1 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#2A2A2A] transition-all duration-200"
              title={action.label}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {action.icon}
              </span>
              {action.id === 'messages' && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
