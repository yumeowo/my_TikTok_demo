import { useState, useEffect, useCallback } from 'react';
import type { SearchHistoryItem, UseSearchHistoryReturn } from './types';

/**
 * Generate a unique ID for search history items
 */
const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Custom hook for managing search history with localStorage persistence
 *
 * @param storageKey - localStorage key for storing history
 * @param maxHistory - Maximum number of history items to keep
 * @returns Object containing history array and management functions
 */
export const useSearchHistory = (
  storageKey = 'douyin_search_history',
  maxHistory = 15,
): UseSearchHistoryReturn => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  /**
   * Load history from localStorage on mount
   */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as SearchHistoryItem[];
        // Validate data structure
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
      // If localStorage is corrupted, clear it
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  /**
   * Save history to localStorage whenever it changes
   */
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }, [history, storageKey]);

  /**
   * Add a new search keyword to history
   * - Prevents duplicate entries (case-insensitive)
   * - Moves existing entry to top if duplicate
   * - Limits history to maxHistory items
   * - Trims whitespace from keyword
   */
  const addHistory = useCallback(
    (keyword: string) => {
      const trimmedKeyword = keyword.trim();

      // Don't add empty keywords
      if (!trimmedKeyword) {
        return;
      }

      setHistory((prevHistory) => {
        // Check if keyword already exists (case-insensitive)
        const existingIndex = prevHistory.findIndex(
          (item) => item.keyword.toLowerCase() === trimmedKeyword.toLowerCase(),
        );

        let newHistory: SearchHistoryItem[];

        if (existingIndex !== -1) {
          // If exists, move to top with updated timestamp
          const existingItem = prevHistory[existingIndex];
          newHistory = [
            { ...existingItem, timestamp: Date.now() },
            ...prevHistory.slice(0, existingIndex),
            ...prevHistory.slice(existingIndex + 1),
          ];
        } else {
          // If new, add to top
          const newItem: SearchHistoryItem = {
            id: generateId(),
            keyword: trimmedKeyword,
            timestamp: Date.now(),
          };
          newHistory = [newItem, ...prevHistory];
        }

        // Limit to maxHistory items
        return newHistory.slice(0, maxHistory);
      });
    },
    [maxHistory],
  );

  /**
   * Clear all search history
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  }, [storageKey]);

  /**
   * Remove a specific history item by id
   */
  const removeHistory = useCallback((id: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  }, []);

  return {
    history,
    addHistory,
    clearHistory,
    removeHistory,
  };
};
