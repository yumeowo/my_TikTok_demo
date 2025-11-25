/**
 * SearchBox Component Type Definitions
 * Defines interfaces for search functionality and history management
 */

/**
 * Search history item structure
 */
export interface SearchHistoryItem {
  id: string;
  keyword: string;
  timestamp: number;
}

/**
 * SearchBox component props
 */
export interface SearchBoxProps {
  /**
   * Placeholder text for the search input
   * @default "搜索你感兴趣的内容"
   */
  placeholder?: string;

  /**
   * Maximum number of history items to store
   * @default 15
   */
  maxHistory?: number;

  /**
   * Callback when search is triggered
   * @param keyword - The search keyword
   */
  onSearch?: (keyword: string) => void;

  /**
   * Custom className for the search box container
   */
  className?: string;

  /**
   * localStorage key for storing search history
   * @default "douyin_search_history"
   */
  storageKey?: string;
}

/**
 * SearchInput component props
 */
export interface SearchInputProps {
  /**
   * Current input value
   */
  value: string;

  /**
   * Placeholder text
   */
  placeholder: string;

  /**
   * Whether the input is focused
   */
  isFocused: boolean;

  /**
   * Callback when input value changes
   */
  onChange: (value: string) => void;

  /**
   * Callback when input is focused
   */
  onFocus: () => void;

  /**
   * Callback when input is blurred
   */
  onBlur: () => void;

  /**
   * Callback when Enter key is pressed
   */
  onEnter: () => void;

  /**
   * Callback when search button is clicked
   */
  onSearch: () => void;
}

/**
 * SearchHistory component props
 */
export interface SearchHistoryProps {
  /**
   * Array of search history items
   */
  history: SearchHistoryItem[];

  /**
   * Whether the history panel is visible
   */
  visible: boolean;

  /**
   * Callback when a history item is clicked
   */
  onSelectHistory: (keyword: string) => void;

  /**
   * Callback when clear history button is clicked
   */
  onClearHistory: () => void;
}

/**
 * useSearchHistory hook return type
 */
export interface UseSearchHistoryReturn {
  /**
   * Array of search history items
   */
  history: SearchHistoryItem[];

  /**
   * Add a new search keyword to history
   */
  addHistory: (keyword: string) => void;

  /**
   * Clear all search history
   */
  clearHistory: () => void;

  /**
   * Remove a specific history item by id
   */
  removeHistory: (id: string) => void;
}
