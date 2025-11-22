/**
 * SpeedControl Component
 * Playback speed selector using Semi UI Dropdown
 */

import { IconSettingStroked } from '@douyinfe/semi-icons';
import { Dropdown } from '@douyinfe/semi-ui';
import type { SpeedControlProps } from './types';

const SPEED_OPTIONS = [
  { value: 0.5, label: '0.5×' },
  { value: 0.75, label: '0.75×' },
  { value: 1, label: '正常' },
  { value: 1.25, label: '1.25×' },
  { value: 1.5, label: '1.5×' },
  { value: 2, label: '2.0×' },
];

export function SpeedControl({ currentSpeed, onSpeedChange }: SpeedControlProps) {
  const currentLabel = SPEED_OPTIONS.find((opt) => opt.value === currentSpeed)?.label || '正常';

  const menu = (
    <Dropdown.Menu>
      {SPEED_OPTIONS.map((option) => (
        <Dropdown.Item
          key={option.value}
          onClick={() => onSpeedChange(option.value)}
          active={currentSpeed === option.value}
          className={currentSpeed === option.value ? 'font-semibold' : ''}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );

  return (
    <Dropdown
      trigger="click"
      position="topRight"
      render={menu}
      clickToHide
    >
      <button
        type="button"
        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white text-sm font-medium transition-colors duration-200"
        style={{
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
        }}
      >
        <IconSettingStroked size="small" />
        <span>{currentLabel}</span>
      </button>
    </Dropdown>
  );
}
