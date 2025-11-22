/**
 * Sidebar Component Types
 *
 * Type definitions for the TikTok-style sidebar navigation component
 */

export interface SidebarProps {
  selectedItem?: string; // 当前选中项，默认为 "recommend"
  onRefresh?: () => void; // 刷新视频流回调
  className?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: 'normal' | 'divider';
}

export interface BottomAction {
  id: string;
  icon: React.ReactNode;
  label: string;
}
