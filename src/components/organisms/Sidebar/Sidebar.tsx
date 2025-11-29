import type React from 'react';
import { useState } from 'react';
import { IconRefresh } from '@douyinfe/semi-icons';
import { NAV_ITEMS, BOTTOM_ACTIONS } from './constants';
import type { SidebarProps } from './types';
import tiktok from '@/assets/tiktok.png';

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
      className={`flex-col flex h-screen bg-[#161823] text-white w-[11%] fixed left-0 top-0 ${className}`}
    >
      {/* Logo Section */}
      <div className="flex items-center ml-2 px-5 py-4">
        <div className="flex items-center justify-center w-[26px] h-[26px] mr-1">
          <img src={tiktok} alt="logo" />
        </div>
        <span className="text-xl font-semibold">抖音</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            if (item.type === 'divider') {
              return (
                <li key={item.id} className="py-2 px-[18px]">
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
                    w-full flex items-center gap-3 px-4 py-2 rounded-xl
                    transition-all duration-200 ease-in-out
                    relative group
                    ${
                      isSelected
                        ? 'bg-[#2d2f38] text-white'
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
