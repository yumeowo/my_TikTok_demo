import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SearchInput } from './SearchInput';
import { SearchHistory } from './SearchHistory';
import { useSearchHistory } from './useSearchHistory';
import type { SearchBoxProps } from './types';

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = '搜索你感兴趣的内容',
  maxHistory = 15,
  onSearch,
  className = '',
  storageKey = 'douyin_search_history',
}) => {
  // State management
  const [searchValue, setSearchValue] = useState('');
  // Visual focus when hovering or after click (sticky)
  const [isStickyFocus, setIsStickyFocus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isFocused = isHovered || isStickyFocus;
  const [showHistory, setShowHistory] = useState(false);

  // Refs for click outside detection
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom hook for history management
  const { history, addHistory, clearHistory } = useSearchHistory(
    storageKey,
    maxHistory,
  );

  /**
   * Handle search execution
   * Adds keyword to history and triggers onSearch callback
   */
  const handleSearch = () => {
    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      return;
    }

    // Add to history
    addHistory(trimmedValue);

    // Trigger search callback
    if (onSearch) {
      onSearch(trimmedValue);
    }

    // Close history panel
    setShowHistory(false);

    // Optionally clear input after search (uncomment if desired)
    // setSearchValue('');
  };

  /**
   * Handle input focus
   * Shows history panel if there are history items
   */
  const handleFocus = () => {
    // Click or keyboard focus makes focus sticky
    setIsStickyFocus(true);
    if (history.length > 0) {
      setShowHistory(true);
    }
  };

  /**
   * Handle input blur
   * Slight delay to allow clicking on history items
   */
  const handleBlur = () => {
    // 不在这里移除聚焦，由“点击外部”统一管理
  };

  /**
   * Handle history item selection
   * Populates input with selected keyword
   */
  const handleSelectHistory = (keyword: string) => {
    setSearchValue(keyword);
    setShowHistory(false);
  };

  /**
   * Handle clear history
   * Clears all history and closes panel
   */
  const handleClearHistory = () => {
    clearHistory();
    setShowHistory(false);
  };

  /**
   * Handle click outside to close history panel
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
        setIsStickyFocus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handle Escape key to close history panel
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowHistory(false);
        setSearchValue('');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  /**
   * Update showHistory when history changes
   * If focused and history is not empty, show history
   */
  useEffect(() => {
    if (isFocused && history.length > 0) {
      setShowHistory(true);
    } else if (history.length === 0) {
      setShowHistory(false);
    }
  }, [history, isFocused]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (history.length > 0) {
          setShowHistory(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        // 如果没有点击形成的粘性聚焦，离开时关闭历史面板
        if (!isStickyFocus) {
          setShowHistory(false);
        }
      }}
      onClick={() => {
        // 任何在容器内的点击都让聚焦保持（直到外部点击）
        if (!isStickyFocus) {
          setIsStickyFocus(true);
        }
      }}
      onKeyDown={(e) => {
        // 支持键盘交互：Enter 或 Space 键
        if ((e.key === 'Enter' || e.key === ' ') && !isStickyFocus) {
          setIsStickyFocus(true);
        }
      }}
    >
      {/* Search Input */}
      <SearchInput
        value={searchValue}
        placeholder={placeholder}
        isFocused={isFocused}
        onChange={setSearchValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onEnter={handleSearch}
        onSearch={handleSearch}
      />

      {/* Search History Dropdown */}
      <SearchHistory
        history={history}
        visible={showHistory}
        onSelectHistory={handleSelectHistory}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};

export default SearchBox;