import type React from 'react';
import {
  IconStar,
  IconAIWandLevel1,
  IconUserAdd,
  IconUserGroup,
  IconUser,
  IconLive,
  IconEmoji,
  IconPlayCircle,
  IconHome,
  IconGridView,
  IconHelpCircle,
  IconComment,
} from '@douyinfe/semi-icons';
import type { NavItem, BottomAction } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'featured',
    label: '精选',
    icon: <IconStar size="large" />,
  },
  {
    id: 'recommend',
    label: '推荐',
    icon: <IconAIWandLevel1 size="large" />,
  },
  {
    id: 'ai',
    label: 'AI抖音',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>AI</title>
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.5L19.5 8.5V15.5L12 19.5L4.5 15.5V8.5L12 4.5Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 'divider-1',
    label: '',
    icon: null,
    type: 'divider',
  },
  {
    id: 'follow',
    label: '关注',
    icon: <IconUserAdd size="large" />,
  },
  {
    id: 'friends',
    label: '朋友',
    icon: <IconUserGroup size="large" />,
  },
  {
    id: 'profile',
    label: '我的',
    icon: <IconUser size="large" />,
  },
  {
    id: 'divider-2',
    label: '',
    icon: null,
    type: 'divider',
  },
  {
    id: 'live',
    label: '直播',
    icon: <IconLive size="large" />,
  },
  {
    id: 'theater',
    label: '放映厅',
    icon: <IconEmoji size="large" />,
  },
  {
    id: 'drama',
    label: '短剧',
    icon: <IconPlayCircle size="large" />,
  },
];

export const BOTTOM_ACTIONS: BottomAction[] = [
  {
    id: 'home',
    icon: <IconHome size="large" />,
    label: '首页',
  },
  {
    id: 'categories',
    icon: <IconGridView size="large" />,
    label: '分类',
  },
  {
    id: 'help',
    icon: <IconHelpCircle size="large" />,
    label: '帮助',
  },
  {
    id: 'messages',
    icon: <IconComment size="large" />,
    label: '消息',
  },
];
