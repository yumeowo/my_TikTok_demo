/**
 * InfoOverlay Component
 * Left-bottom video information overlay with a gradient background
 */

import type { InfoOverlayProps } from './types';
import { formatTime } from "@/utils/format";
import { Button } from "@douyinfe/semi-ui";
import { IconAISearchLevel1 } from "@douyinfe/semi-icons";

export function InfoOverlay({ videoInfo }: InfoOverlayProps) {
  const { description, author } = videoInfo;

  return (
    <div className="absolute bottom-20 left-0 right-0 pointer-events-none z-15">
      {/* Gradient overlay background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
          height: '200px',
        }}
      />

      {/* Content container */}
      <div className="relative px-4 pointer-events-auto">
        {/* Author section */}
        <div className="flex items-center gap-3 mb-2">
          <span
            className="font-semibold text-white text-base"
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
            }}
          >
            @{author.name} · {formatTime(videoInfo.createTime)}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-white text-sm leading-relaxed w-[30%] break-words"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          }}
        >
          {description}
        </p>

        <Button
          className="bg-[#363636]/60 hover:bg-gray-500 flex items-center gap-3 px-4 py-4 mt-4 mb-[-8px] rounded-lg text-white transition-colors"
        >
          <IconAISearchLevel1 />
          <div>识别画面</div>
        </Button>
      </div>
    </div>
  );
}
