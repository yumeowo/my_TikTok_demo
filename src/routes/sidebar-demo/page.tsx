import type React from 'react';
import { Toast } from '@douyinfe/semi-ui';
import Sidebar from '@/components/organisms/Sidebar';

const SidebarDemo: React.FC = () => {
  const handleRefresh = () => {
    Toast.success({
      content: '刷新视频流',
      duration: 2,
    });
    console.log('Refreshing video feed...');
  };

  return (
    <div className="flex h-screen bg-[#141414]">
      {/* Sidebar */}
      <Sidebar selectedItem="recommend" onRefresh={handleRefresh} />

      {/* Main Content Area */}
      <div className="flex-1 ml-52 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Sidebar Demo</h1>
          <p className="text-gray-400 mb-8">
            Hover over "推荐" to see the refresh icon
          </p>
          <div className="bg-[#2F2F2F] rounded-lg p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Features:</h2>
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#FE2C55] mt-1">•</span>
                <span>默认选中"推荐"项（深色背景）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FE2C55] mt-1">•</span>
                <span>鼠标悬停在"推荐"上显示刷新图标</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FE2C55] mt-1">•</span>
                <span>其他导航项悬停时背景高亮</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FE2C55] mt-1">•</span>
                <span>底部4个图标按钮（消息有红点提示）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FE2C55] mt-1">•</span>
                <span>平滑过渡动画效果</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDemo;
