/**
 * InfoOverlay Component
 * Left-bottom video information overlay with a gradient background
 */

import { Avatar } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { InfoOverlayProps } from './types';

export function InfoOverlay({ videoInfo }: InfoOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, description, author } = videoInfo;

  // Truncate description if too long
  const shouldTruncate = description.length > 60;
  const displayDescription = isExpanded || !shouldTruncate
    ? description
    : `${description.slice(0, 60)}...`;

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
      <div className="relative px-4 pb-4 pointer-events-auto">
        {/* Author section */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar
            src={author.avatar}
            alt={author.name}
            size="default"
            className="border-2 border-white"
            style={{
              width: '40px',
              height: '40px',
            }}
          />
          <span
            className="font-semibold text-white text-base"
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
            }}
          >
            @{author.name}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-white font-medium text-base mb-2"
          style={{
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
          }}
        >
          {title}
        </h3>

        {/* Description with expand/collapse */}
        <div className="flex items-start gap-2">
          <motion.p
            className="text-white text-sm leading-relaxed flex-1"
            style={{
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
            }}
            animate={{
              height: isExpanded ? 'auto' : 'auto',
            }}
          >
            {displayDescription}
          </motion.p>

          {/* Expand button */}
          {shouldTruncate && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white text-sm font-medium shrink-0 ml-1"
              style={{
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
              }}
            >
              {isExpanded ? '收起' : '展开'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
