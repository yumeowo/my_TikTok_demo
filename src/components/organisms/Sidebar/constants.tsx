import type React from 'react';
import {
  IconAIWandLevel1,
  IconHelpCircleStroked,
  IconGridStroked,
  IconSettingStroked,
  IconAIStrokedLevel1,
  IconFollowStroked,
  IconUserStroked,
} from '@douyinfe/semi-icons';
import type { NavItem, BottomAction } from './types';

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'featured',
    label: '精选',
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35.9115 41.5439L41.2811 22.5439C41.6418 21.2675 40.6828 20 39.3564 20H27.8747C27.1714 20 26.651 19.3458 26.8091 18.6605L27.3086 16.4961C27.7668 14.5107 27.9139 12.4663 27.7446 10.4358L27.6527 9.3327C27.5541 8.14935 27.0393 7.03925 26.1996 6.1996C25.4315 5.43151 24.3898 5 23.3035 5H23.0644C22.4074 5 21.8021 5.35616 21.4831 5.93043L18.825 10.7149C17.6329 12.8608 15.8559 14.624 13.7009 15.7995L7.0423 19.4315C6.39977 19.7819 6 20.4554 6 21.1873V41C6 42.1046 6.89543 43 8 43H33.9869C34.882 43 35.6681 42.4053 35.9115 41.5439Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'recommend',
    label: '推荐',
    icon: <IconAIStrokedLevel1 size="large" />,
  },
  {
    id: 'ai',
    label: 'AI抖音',
    icon: <IconAIWandLevel1 size="large" />,
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
    icon: <IconFollowStroked size="large" />,
  },
  {
    id: 'friends',
    label: '朋友',
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 20C22.866 20 26 16.866 26 13C26 9.13401 22.866 6 19 6C15.134 6 12 9.13401 12 13C12 16.866 15.134 20 19 20Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M32.6077 7C34.6405 8.2249 36.0001 10.4537 36.0001 13C36.0001 15.5463 34.6405 17.7751 32.6077 19" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 40.8V42H34V40.8C34 36.3196 34 34.0794 33.1281 32.3681C32.3611 30.8628 31.1372 29.6389 29.6319 28.8719C27.9206 28 25.6804 28 21.2 28H16.8C12.3196 28 10.0794 28 8.36808 28.8719C6.86278 29.6389 5.63893 30.8628 4.87195 32.3681C4 34.0794 4 36.3196 4 40.8Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M43.9999 42.0001V40.8001C43.9999 36.3197 43.9999 34.0795 43.128 32.3682C42.361 30.8629 41.1371 29.6391 39.6318 28.8721" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: '我的',
    icon: <IconUserStroked size="large" />,
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
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="14" width="38" height="28" rx="2" stroke="#d1d5db" stroke-width="4"/>
        <path d="M24 14L38 6" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M23 14L10 6" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M35 20L35 26" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="33" y="32" width="4" height="4" rx="2" fill="#d1d5db"/>
      </svg>
    ),
  },
  {
    id: 'theater',
    label: '放映厅',
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linejoin="round"/>
        <path d="M24 18C25.6569 18 27 16.6569 27 15C27 13.3431 25.6569 12 24 12C22.3431 12 21 13.3431 21 15C21 16.6569 22.3431 18 24 18Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linejoin="round"/>
        <path d="M24 36C25.6569 36 27 34.6569 27 33C27 31.3431 25.6569 30 24 30C22.3431 30 21 31.3431 21 33C21 34.6569 22.3431 36 24 36Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linejoin="round"/>
        <path d="M15 27C16.6569 27 18 25.6569 18 24C18 22.3431 16.6569 21 15 21C13.3431 21 12 22.3431 12 24C12 25.6569 13.3431 27 15 27Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linejoin="round"/>
        <path d="M33 27C34.6569 27 36 25.6569 36 24C36 22.3431 34.6569 21 33 21C31.3431 21 30 22.3431 30 24C30 25.6569 31.3431 27 33 27Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linejoin="round"/>
        <path d="M24 44H44" stroke="#d1d5db" stroke-width="4" stroke-linecap="round"/>
      </svg>
    ),
  },
  {
    id: 'drama',
    label: '短剧',
    icon: (
      <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10C4 8.89543 4.89543 8 6 8H42C43.1046 8 44 8.89543 44 10V38C44 39.1046 43.1046 40 42 40H6C4.89543 40 4 39.1046 4 38V10Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linejoin="round"/>
        <path d="M36 8V40" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 8V40" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M38 18H44" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M38 30H44" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 18H10" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 16V20" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 8H15" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 40H15" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M33 8H39" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M33 40H39" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 30H10" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 28V32" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M44 28V32" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M44 16V20" stroke="#d1d5db" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 19L29 24L21 29V19Z" fill="none" stroke="#d1d5db" stroke-width="4" stroke-linejoin="round"/>
      </svg>
    ),
  },
];

export const BOTTOM_ACTIONS: BottomAction[] = [
  {
    id: 'settings',
    icon: <IconSettingStroked size="large" />,
    label: '设置',
  },
  {
    id: 'categories',
    icon: <IconGridStroked size="large" />,
    label: '分类',
  },
  {
    id: 'help',
    icon: <IconHelpCircleStroked size="large" />,
    label: '帮助',
  }
];
