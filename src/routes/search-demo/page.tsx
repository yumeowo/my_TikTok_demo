import type React from 'react';
import { useState } from 'react';
import { SearchBox } from '@/components/organisms/SearchBox';
import { Card, Typography, Divider } from '@douyinfe/semi-ui';

const { Title, Paragraph, Text } = Typography;

/**
 * SearchBox Demo Page
 *
 * Demonstrates the SearchBox component functionality with:
 * - Live search results display
 * - Search history persistence
 * - Dark theme styling matching Douyin
 * - Interactive examples
 */
const SearchDemoPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [lastSearch, setLastSearch] = useState<string>('');

  /**
   * Handle search callback
   * Simulates search execution and displays results
   */
  const handleSearch = (keyword: string) => {
    setLastSearch(keyword);

    // Simulate search results
    const mockResults = [
      `${keyword} - 相关视频 1`,
      `${keyword} - 相关视频 2`,
      `${keyword} - 相关视频 3`,
      `${keyword} - 热门话题`,
      `${keyword} - 推荐用户`,
    ];

    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#1a1a1a] to-black border-b border-[#2a2a2a]">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Title
            heading={2}
            className="text-white mb-2"
            style={{ color: '#ffffff' }}
          >
            SearchBox 组件演示
          </Title>
          <Paragraph className="text-gray-400 mb-6">
            仿抖音搜索框组件 - 支持搜索历史、暗黑主题、键盘导航
          </Paragraph>

          {/* SearchBox Component */}
          <div className="flex justify-center mb-8">
            <SearchBox
              placeholder="搜索你感兴趣的内容"
              maxHistory={15}
              onSearch={handleSearch}
              className="w-full max-w-2xl"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Results Card */}
          <Card
            className="bg-[#1a1a1a] border-[#2a2a2a]"
            style={{
              backgroundColor: '#1a1a1a',
              borderColor: '#2a2a2a',
            }}
            bodyStyle={{
              padding: '24px',
            }}
          >
            <Title
              heading={4}
              className="text-white mb-4"
              style={{ color: '#ffffff' }}
            >
              搜索结果
            </Title>

            {lastSearch ? (
              <>
                <Text className="text-gray-400 mb-4 block">
                  搜索关键词: <span className="text-[#ff0050]">{lastSearch}</span>
                </Text>

                <Divider
                  style={{
                    borderColor: '#2a2a2a',
                    margin: '16px 0',
                  }}
                />

                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <div
                      key={result}
                      className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors duration-200 cursor-pointer"
                    >
                      <Text className="text-gray-300">{result}</Text>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-600 mb-2">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="搜索图标"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <Text className="text-gray-500">
                  输入关键词并搜索以查看结果
                </Text>
              </div>
            )}
          </Card>

          {/* Features Card */}
          <Card
            className="bg-[#1a1a1a] border-[#2a2a2a]"
            style={{
              backgroundColor: '#1a1a1a',
              borderColor: '#2a2a2a',
            }}
            bodyStyle={{
              padding: '24px',
            }}
          >
            <Title
              heading={4}
              className="text-white mb-4"
              style={{ color: '#ffffff' }}
            >
              功能特性
            </Title>

            <div className="space-y-4">
              <FeatureItem
                icon="🔍"
                title="智能搜索"
                description="实时搜索，支持回车键快捷搜索"
              />
              <FeatureItem
                icon="📝"
                title="搜索历史"
                description="自动保存搜索历史，最多保存15条记录"
              />
              <FeatureItem
                icon="🏷️"
                title="快速填充"
                description="点击历史标签快速填充搜索框"
              />
              <FeatureItem
                icon="🗑️"
                title="清除历史"
                description="一键清除所有搜索历史记录"
              />
              <FeatureItem
                icon="⌨️"
                title="键盘导航"
                description="支持 Enter 搜索、Esc 关闭面板"
              />
              <FeatureItem
                icon="💾"
                title="持久化存储"
                description="使用 localStorage 保存历史记录"
              />
              <FeatureItem
                icon="🎨"
                title="暗黑主题"
                description="完美适配抖音暗黑模式设计风格"
              />
              <FeatureItem
                icon="📱"
                title="响应式设计"
                description="支持移动端和桌面端自适应布局"
              />
            </div>
          </Card>
        </div>

        {/* Usage Example Card */}
        <Card
          className="bg-[#1a1a1a] border-[#2a2a2a] mt-6"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: '#2a2a2a',
          }}
          bodyStyle={{
            padding: '24px',
          }}
        >
          <Title
            heading={4}
            className="text-white mb-4"
            style={{ color: '#ffffff' }}
          >
            使用示例
          </Title>

          <div className="bg-[#0f0f0f] p-4 rounded-lg border border-[#2a2a2a] overflow-x-auto">
            <pre className="text-gray-300 text-sm">
              <code>{`"
                import { SearchBox } from '@/components';
                
                function MyComponent() {
                  const handleSearch = (keyword: string) => {
                    console.log('搜索关键词:', keyword);
                    // 执行搜索逻辑...
                  };
                
                  return (
                    <SearchBox
                      placeholder="搜索你感兴趣的内容"
                      maxHistory={15}
                      onSearch={handleSearch}
                      storageKey="my_custom_history_key"
                    />
                  );
                }
            "`}</code>
            </pre>
          </div>

          <Divider
            style={{
              borderColor: '#2a2a2a',
              margin: '24px 0',
            }}
          />

          <Title
            heading={5}
            className="text-white mb-3"
            style={{ color: '#ffffff' }}
          >
            Props 说明
          </Title>

          <div className="space-y-3">
            <PropItem
              name="placeholder"
              type="string"
              defaultValue='"搜索你感兴趣的内容"'
              description="输入框占位符文本"
            />
            <PropItem
              name="maxHistory"
              type="number"
              defaultValue="15"
              description="最大历史记录数量"
            />
            <PropItem
              name="onSearch"
              type="(keyword: string) => void"
              defaultValue="undefined"
              description="搜索回调函数"
            />
            <PropItem
              name="className"
              type="string"
              defaultValue='""'
              description="自定义样式类名"
            />
            <PropItem
              name="storageKey"
              type="string"
              defaultValue='"douyin_search_history"'
              description="localStorage 存储键名"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

/**
 * Feature Item Component
 */
interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start space-x-3 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a] hover:border-[#3a3a3a] transition-colors duration-200">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <Text className="text-white font-medium block mb-1">{title}</Text>
        <Text className="text-gray-400 text-sm">{description}</Text>
      </div>
    </div>
  );
};

/**
 * Prop Item Component
 */
interface PropItemProps {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const PropItem: React.FC<PropItemProps> = ({
  name,
  type,
  defaultValue,
  description,
}) => {
  return (
    <div className="p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
      <div className="flex items-center space-x-2 mb-2">
        <Text className="text-[#ff0050] font-mono font-medium">{name}</Text>
        <span className="text-gray-600">•</span>
        <Text className="text-gray-400 text-sm font-mono">{type}</Text>
      </div>
      <Text className="text-gray-400 text-sm block mb-2">{description}</Text>
      <Text className="text-gray-500 text-xs font-mono">
        默认值: {defaultValue}
      </Text>
    </div>
  );
};

export default SearchDemoPage;
