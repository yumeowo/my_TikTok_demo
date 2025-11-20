# **抖音网页版复刻 - 项目架构设计 (Mock版)**

## **1. 技术栈清单**

* **核心框架**: Modern.js (应用生成、路由、构建)
* **UI 库**: React 18 + React DOM
* **组件库**: Semi Design (@douyinfe/semi-ui) + Semi Icons
* **样式**: Tailwind CSS v4
* **状态管理**: Jotai (原子化状态管理)
* **视频播放**: xgplayer (西瓜播放器)
* **动画**: Framer Motion (用于点赞、评论抽屉动画)
* **数据源**: **离线爬虫数据 (JSON) -> 前端 Mock 适配器**

## **2. 目录结构规范 (Modern.js App模式 + 原子设计)**

```
.
├── config/                      # Modern.js 配置
├── src/
│   ├── assets/                  # 静态资源 (图片、Logo)
│   ├── mock/                    # [核心变更] 本地 Mock 数据层
│   │   ├── data/
│   │   │   ├── search_contents_*.json  # 视频数据
│   │   │   └── search_comments_*.json  # 评论数据
│   │   ├── adapter.ts           # 数据清洗适配器 (Raw -> App Model)
│   │   └── service.ts           # 模拟 API 服务 (处理分页、延迟)
│   ├── types/                   # TypeScript 类型定义
│   │   ├── index.ts
│   │   └── video.ts             # VideoItem, Comment 接口
│   ├── components/              # 组件库 (原子设计模式)
│   │   ├── atoms/               # 原子组件 (最小不可分割单元)
│   │   │   ├── Avatar/          # 用户头像
│   │   │   ├── Icon/            # 图标封装 (基于 Semi Icons)
│   │   │   ├── Button/          # 按钮扩展
│   │   │   ├── Tag/             # 标签组件
│   │   │   └── Loading/         # 加载动画
│   │   ├── molecules/           # 分子组件 (原子组合)
│   │   │   ├── UserCard/        # 用户信息卡片 (头像 + 昵称 + 关注按钮)
│   │   │   ├── VideoStats/      # 视频统计信息 (点赞/评论/分享数)
│   │   │   ├── CommentItem/     # 单条评论
│   │   │   └── ActionBar/       # 右侧操作栏 (点赞/评论/分享/收藏)
│   │   ├── organisms/           # 组织组件 (功能完整的组件)
│   │   │   ├── VideoPlayer/     # xgplayer 封装组件
│   │   │   ├── CommentDrawer/   # 评论区抽屉
│   │   │   ├── VideoCard/       # 视频卡片 (用于瀑布流)
│   │   │   ├── Sidebar/         # 侧边导航栏
│   │   │   └── Header/          # 顶部导航栏
│   │   └── templates/           # 模板组件 (页面级布局)
│   │       ├── VideoFeedLayout/ # 视频流布局模板
│   │       ├── VideoDetailLayout/ # 视频详情布局
│   │       └── WaterfallLayout/ # 瀑布流布局模板
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── useVideoFeed.ts      # 视频流逻辑 (调用 Mock Service)
│   │   ├── useComments.ts       # 评论逻辑
│   │   ├── useIntersectionObserver.ts  # 视口监听 (自动播放)
│   │   └── useKeyboardControl.ts       # 键盘控制 (上下键切换)
│   ├── store/                   # Jotai Atoms (状态管理)
│   │   ├── playerAtom.ts        # 播放器状态
│   │   ├── uiAtom.ts            # UI 状态 (侧边栏、抽屉)
│   │   └── userAtom.ts          # 用户信息和交互记录
│   ├── routes/                  # 页面路由 (基于文件系统)
│   │   ├── page.tsx             # 首页 (视频流)
│   │   ├── layout.tsx           # 根布局
│   │   ├── index.css            # 全局样式 (Tailwind 引入)
│   │   ├── video/
│   │   │   └── [id]/            # 视频详情页 (沉浸式播放)
│   │   │       └── page.tsx
│   │   └── selected/            # 抖音精选 (瀑布流)
│   │       └── page.tsx
│   └── utils/
│       ├── request.ts           # 网络请求封装 (可切换 Mock/Real)
│       └── format.ts            # 数字/时间格式化
├── tailwind.config.ts           # Tailwind 配置
├── modern.config.ts             # Modern.js 配置
├── biome.json                   # Biome 代码检查配置
└── package.json
```

## **3. 核心模块设计**

### **A. 数据层 (Data Layer - Mock 方案)**

完全采用**前端离线 Mock** 方案，确保演示绝对稳定。

#### **1. 数据采集 (Pre-process)**
* 使用 MediaCrawler 在本地运行一次，抓取 50+ 条视频数据
* 保存为 `src/mock/data/search_contents_*.json` 和 `search_comments_*.json`

#### **2. 数据清洗 (Adapter)**
已实现 `src/mock/adapter.ts`，提供以下功能：

```typescript
// 接口定义 (src/types/video.ts)
interface VideoItem {
  id: string;
  title: string;
  desc: string;
  videoUrl: string;
  coverUrl: string;
  createTime: number;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  stats: {
    diggCount: number;      // 点赞数
    commentCount: number;   // 评论数
    shareCount: number;     // 分享数
    collectedCount: number; // 收藏数
  };
  comments: Comment[];      // 关联评论
  sourceKeyword?: string;
}

// 核心函数
declare function processCrawlerData(contents, comments): VideoItem[];

```

**功能**：
* `normalizeContent()` - 转换视频数据
* `normalizeComment()` - 转换评论数据
* `processCrawlerData()` - 通过 `aweme_id` 关联评论到视频
* 安全的字符串转数字处理
* 提供默认头像 fallback

#### **3. 服务模拟 (Mock Service)**
待实现 `src/mock/service.ts`：

```typescript
// 模拟 API 服务
export class MockVideoService {
  private data: VideoItem[];

  constructor(videoData: VideoItem[]) {
    this.data = videoData;
  }

  // 获取视频流 (带分页和延迟)
  async getVideoFeed(page: number, pageSize = 10): Promise<VideoItem[]> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));

    const start = page * pageSize;
    const end = start + pageSize;
    return this.data.slice(start, end);
  }

  // 根据 ID 获取视频详情
  async getVideoById(id: string): Promise<VideoItem | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.data.find(item => item.id === id) || null;
  }

  // 获取评论 (支持分页)
  async getComments(videoId: string, page = 0): Promise<Comment[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const video = await this.getVideoById(videoId);
    if (!video) return [];

    const pageSize = 20;
    const start = page * pageSize;
    return video.comments.slice(start, start + pageSize);
  }
}

// 导出单例
export const mockService = new MockVideoService(
  processCrawlerData(rawContents, rawComments)
);
```

### **B. 状态管理 (Jotai) - 完整架构**

使用 Jotai 处理跨组件通信，避免 Props Drilling。

#### **播放器状态** (`src/store/playerAtom.ts`)

```typescript
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 持久化音量 (localStorage)
export const volumeAtom = atomWithStorage('dy_volume', 0.5);

// 当前播放视频 ID
export const currentVideoIdAtom = atom<string | null>(null);

// 播放状态
export const isPlayingAtom = atom(false);

// 全屏状态
export const isFullscreenAtom = atom(false);

// 静音状态
export const isMutedAtom = atom(false);
```

#### **UI 状态** (`src/store/uiAtom.ts`)

```typescript
import { atom } from 'jotai';

// 侧边栏收起状态
export const sidebarCollapsedAtom = atom(false);

// 评论抽屉状态
export const commentDrawerOpenAtom = atom(false);

// 当前查看评论的视频 ID
export const currentCommentVideoIdAtom = atom<string | null>(null);

// 加载状态
export const isLoadingAtom = atom(false);
```

#### **用户状态** (`src/store/userAtom.ts`)

```typescript
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// 模拟用户信息
export const userAtom = atom({
  id: 'mock_user_001',
  name: '游客用户',
  avatar: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/default-avatar.png',
});

// 点赞记录 (localStorage 持久化)
export const likedVideosAtom = atomWithStorage<Set<string>>(
  'dy_liked_videos',
  new Set(),
  {
    getItem: (key) => {
      const value = localStorage.getItem(key);
      return value ? new Set(JSON.parse(value)) : new Set();
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify([...value]));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);

// 收藏记录
export const collectedVideosAtom = atomWithStorage<Set<string>>(
  'dy_collected_videos',
  new Set(),
  {
    getItem: (key) => {
      const value = localStorage.getItem(key);
      return value ? new Set(JSON.parse(value)) : new Set();
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify([...value]));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);
```

#### **派生状态 (Derived Atoms)**

```typescript
// 当前视频是否已点赞
export const currentVideoLikedAtom = atom((get) => {
  const videoId = get(currentVideoIdAtom);
  const likedSet = get(likedVideosAtom);
  return videoId ? likedSet.has(videoId) : false;
});

// 当前视频是否已收藏
export const currentVideoCollectedAtom = atom((get) => {
  const videoId = get(currentVideoIdAtom);
  const collectedSet = get(collectedVideosAtom);
  return videoId ? collectedSet.has(videoId) : false;
});
```

#### **使用示例**

```tsx
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

function VideoPlayer({ videoId }: { videoId: string }) {
  const [volume, setVolume] = useAtom(volumeAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const setCurrentVideoId = useSetAtom(currentVideoIdAtom);

  useEffect(() => {
    setCurrentVideoId(videoId);
  }, [videoId]);

  // ...
}

function LikeButton() {
  const [likedVideos, setLikedVideos] = useAtom(likedVideosAtom);
  const currentVideoId = useAtomValue(currentVideoIdAtom);
  const isLiked = useAtomValue(currentVideoLikedAtom);

  const handleLike = () => {
    if (!currentVideoId) return;
    setLikedVideos((prev) => {
      const newSet = new Set(prev);
      if (isLiked) {
        newSet.delete(currentVideoId);
      } else {
        newSet.add(currentVideoId);
      }
      return newSet;
    });
  };

  // ...
}
```

### **C. 视频播放器 (xgplayer)**

封装 `<VideoPlayer />` 组件，核心功能：

#### **基础功能**
* 播放/暂停控制
* 音量控制 (与 `volumeAtom` 绑定)
* 进度条显示
* 全屏支持

#### **交互功能**
* 键盘控制 (ArrowUp/Down 切换视频, Space 播放/暂停)
* 双击全屏
* 点击播放/暂停

#### **核心难点**
* **实例管理**: 切换视频时销毁旧实例，创建新实例，防止内存泄漏
* **状态同步**: xgplayer 事件 → Jotai atoms
* **自动播放**: 使用 IntersectionObserver 监听视口可见性

```typescript
// 伪代码示例
useEffect(() => {
  const player = new Player({
    id: 'video-container',
    url: videoUrl,
    volume: volumeAtom.get(),
    autoplay: true,
  });

  player.on('play', () => setIsPlaying(true));
  player.on('pause', () => setIsPlaying(false));
  player.on('volumechange', (vol) => setVolume(vol));

  return () => {
    player.destroy(); // 清理实例
  };
}, [videoUrl]);
```

### **D. 评论区 (Optimistic UI)**

使用 Semi Drawer 实现侧滑评论抽屉。

#### **功能特性**
* **乐观更新**: 用户发送评论 → 立即显示在列表 → 后台提交 Mock API
* **嵌套评论**: 支持回复评论 (显示父评论引用)
* **点赞动画**: Framer Motion 实现点赞数字跳动
* **虚拟滚动**: 评论数量多时使用虚拟列表优化性能

#### **动画效果**
* **抽屉滑入**: Framer Motion `slideIn` 动画
* **点赞动效**: `<motion.div>` 实现红心缩放 + 数字变化
* **发送按钮**: 输入框有内容时按钮从禁用到激活的过渡

```tsx
// 伪代码示例
<Drawer
  visible={commentDrawerOpen}
  onClose={() => setCommentDrawerOpen(false)}
  placement="right"
  width={400}
>
  <CommentList comments={comments} />
  <CommentInput onSubmit={handleOptimisticSubmit} />
</Drawer>
```

### **E. 样式集成策略 (Tailwind CSS + Semi UI)**

#### **组合使用原则**

1. **基础组件优先用 Semi UI**
   * Button, Input, Select, Modal, Drawer 等使用 `@douyinfe/semi-ui`
   * 保持 UI 一致性，减少重复开发

2. **布局和间距用 Tailwind CSS**
   * 使用 Tailwind 的 flex/grid/spacing 工具类
   * 响应式断点：`md:`, `lg:`, `xl:`

3. **自定义动画用 Framer Motion**
   * 点赞按钮的"红心爆炸"动画
   * 评论抽屉的滑入/滑出
   * 数字跳动效果

4. **主题定制**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'douyin-red': '#FE2C55',      // 抖音主色
        'douyin-bg': '#121212',       // 深色背景
        'douyin-card': '#1C1C1E',     // 卡片背景
      },
      animation: {
        'like-pop': 'scale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    }
  }
}
```

#### **组件样式示例**

```tsx
// 使用 Semi UI 基础 + Tailwind 布局 + Framer Motion 动画
import { Button } from '@douyinfe/semi-ui';
import { IconHeart } from '@douyinfe/semi-icons';
import { motion } from 'framer-motion';

export function LikeButton({ count, isLiked, onLike }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div whileTap={{ scale: 0.8 }}>
        <Button
          icon={<IconHeart />}
          type={isLiked ? 'danger' : 'tertiary'}
          className="!rounded-full !w-12 !h-12"
          onClick={onLike}
        />
      </motion.div>
      <motion.span
        key={count}
        initial={{ scale: 1.5, color: '#FE2C55' }}
        animate={{ scale: 1, color: '#fff' }}
        className="text-xs"
      >
        {count > 10000 ? `${(count / 10000).toFixed(1)}w` : count}
      </motion.span>
    </div>
  );
}
```

#### **样式优先级处理**

当 Semi UI 和 Tailwind CSS 样式冲突时：

```tsx
// 方法 1: 使用 ! 重要性修饰符
<Button className="!bg-douyin-red !text-white" />

// 方法 2: 使用 CSS Modules (如果需要复杂样式)
import styles from './styles.module.css';
<Button className={styles.customButton} />

// 方法 3: 使用 Semi UI 的 style prop
<Button style={{ backgroundColor: '#FE2C55' }} />
```

## **4. 开发实施步骤 (Development Roadmap)**

### **Phase 1: 基础设施搭建** (预估 1-2 天)

#### 安装依赖
```bash
pnpm add jotai xgplayer framer-motion @douyinfe/semi-icons
pnpm add -D @types/node
```

#### 创建目录结构
```bash
mkdir -p src/components/{atoms,molecules,organisms,templates}
mkdir -p src/hooks src/store src/utils src/assets
```

#### 实现基础工具
- [ ] `src/utils/format.ts` - 数字格式化工具
  ```typescript
  // 1234567 → "123.5w"
  declare function formatCount(num: number): string;

  // 时间戳 → "2天前"
  declare function formatTime(timestamp: number): string;
  ```

- [ ] `src/utils/request.ts` - Mock 请求封装
  ```typescript
  export const useMockData = true; // 开关
  declare async function fetchVideos(page: number): Promise<VideoItem[]>;
  ```

- [ ] `src/mock/service.ts` - Mock Service 实现
  * 分页逻辑
  * 延迟模拟 (500ms)
  * 单例导出

### **Phase 2: 原子组件开发** (预估 2-3 天)

#### Atoms 层组件

- [ ] **Avatar** (`src/components/atoms/Avatar/`)
  * Props: `src`, `size`, `fallback`
  * 支持加载失败显示占位符
  * 圆形/方形切换

- [ ] **Icon** (`src/components/atoms/Icon/`)
  * 统一封装 `@douyinfe/semi-icons`
  * 支持自定义大小和颜色

- [ ] **Button** (`src/components/atoms/Button/`)
  * 扩展 Semi Button
  * 增加 Framer Motion 点击动画
  * 预设抖音风格主题

- [ ] **Tag** (`src/components/atoms/Tag/`)
  * 视频标签组件
  * 支持不同颜色主题

- [ ] **Loading** (`src/components/atoms/Loading/`)
  * 加载动画组件
  * 骨架屏支持

### **Phase 3: 核心组件开发** (预估 5-7 天)

#### 优先级 1: 视频播放器

- [ ] **VideoPlayer** (`src/components/organisms/VideoPlayer/`)
  * 封装 xgplayer
  * 实现键盘控制 Hook (`useKeyboardControl`)
  * 音量控制与 Jotai 绑定
  * 播放/暂停状态同步
  * 实例销毁逻辑 (防止内存泄漏)
  * 自动播放 (IntersectionObserver)

#### 优先级 2: 交互组件

- [ ] **ActionBar** (`src/components/molecules/ActionBar/`)
  * 右侧操作栏布局
  * 包含: 点赞/评论/分享/收藏按钮
  * 垂直排列，固定定位

- [ ] **LikeButton** (ActionBar 子组件)
  * Framer Motion 点击缩放动画
  * 点赞状态切换 (红色/灰色)
  * 数字跳动动画

- [ ] **CommentItem** (`src/components/molecules/CommentItem/`)
  * 单条评论显示
  * 支持嵌套回复 (显示父评论)
  * 点赞/回复操作

- [ ] **CommentDrawer** (`src/components/organisms/CommentDrawer/`)
  * 基于 Semi Drawer
  * 评论列表 (虚拟滚动优化)
  * 评论输入框 (带表情支持)
  * 乐观更新逻辑

#### 优先级 3: 布局组件

- [ ] **Sidebar** (`src/components/organisms/Sidebar/`)
  * 侧边导航栏
  * 可收起/展开 (绑定 `sidebarCollapsedAtom`)
  * 导航菜单项 (推荐/精选/关注)

- [ ] **Header** (`src/components/organisms/Header/`)
  * 顶部导航栏
  * Logo + 搜索框 + 用户信息

- [ ] **Layout** (`src/routes/layout.tsx` 优化)
  * 整合 Sidebar + Header + Outlet
  * 响应式布局

### **Phase 4: 页面开发** (预估 3-4 天)

- [ ] **首页** (`src/routes/page.tsx`)
  * 视频流布局 (上下滑动切换)
  * 使用 IntersectionObserver 实现自动播放
  * 集成 VideoPlayer + ActionBar
  * 实现 `useVideoFeed` Hook
  * 下拉刷新 / 上滑加载更多

- [ ] **视频详情页** (`src/routes/video/[id]/page.tsx`)
  * 沉浸式播放界面
  * 评论区集成 (CommentDrawer)
  * 相关推荐视频列表

- [ ] **精选页** (`src/routes/selected/page.tsx`)
  * 瀑布流布局 (CSS Grid 或 `react-masonry-css`)
  * VideoCard 组件 (卡片展示)
  * 懒加载优化 (IntersectionObserver)

### **Phase 5: 优化与完善** (预估 2-3 天)

#### 性能优化

- [ ] 视频预加载策略 (下一个视频提前加载)
- [ ] 图片懒加载 (`loading="lazy"` 或 `react-lazyload`)
- [ ] 虚拟滚动 (评论列表、视频列表)
- [ ] Code Splitting (路由级别代码分割)

#### 用户体验优化

- [ ] 骨架屏 (加载时显示)
- [ ] 错误处理 (视频加载失败、网络错误)
- [ ] 空状态 (暂无评论、暂无视频)
- [ ] Toast 提示 (操作反馈)

#### 响应式适配

- [ ] 手机端适配 (触摸手势、底部导航)
- [ ] 平板适配 (两栏布局)
- [ ] PC 端优化 (宽屏布局)

#### 测试与调试

- [ ] Biome 代码检查通过
- [ ] 跨浏览器测试 (Chrome, Firefox, Safari)
- [ ] 性能测试 (Lighthouse 评分 > 90)

---

### **总预计时间**: 13-19 天

## **5. 组件开发规范**

### **5.1 组件文件组织**

采用**单组件单文件夹**模式：

```
components/organisms/VideoPlayer/
├── index.tsx              # 组件主文件或导出文件
├── VideoPlayer.tsx        # 组件实现 (如果 index.tsx 只做导出)
├── types.ts               # 组件 Props 类型定义
├── useVideoPlayer.ts      # 组件内部逻辑 Hook
└── styles.module.css      # 自定义样式 (如果 Tailwind 不够用)
```

**简单组件可直接使用 `index.tsx`**：

```
components/atoms/Avatar/
└── index.tsx              # 组件定义 + 导出
```

### **5.2 Props 接口设计**

```typescript
// ✅ 好的 Props 设计
interface VideoPlayerProps {
  videoId: string;                    // 必需属性
  autoPlay?: boolean;                 // 可选属性 (提供默认值)
  onEnded?: () => void;               // 事件回调
  className?: string;                 // 支持外部样式覆盖
  controls?: {                        // 嵌套配置对象
    showProgressBar?: boolean;
    showVolumeControl?: boolean;
  };
}

// ❌ 避免的设计
interface BadProps {
  data: any;                          // 不要使用 any
  config: object;                     // 不要使用 object
  callback: Function;                 // 不要使用 Function
}
```

### **5.3 组件命名规范**

* **PascalCase**: 所有组件名用大驼峰 (`VideoPlayer`, `CommentDrawer`)
* **文件名与组件名一致**: `VideoPlayer.tsx` 导出 `VideoPlayer`
* **Hooks 用 use 前缀**: `useVideoFeed`, `useComments`, `useKeyboardControl`
* **类型定义用 Props/State 后缀**: `VideoPlayerProps`, `CommentState`
* **常量用 UPPER_SNAKE_CASE**: `DEFAULT_VOLUME`, `MAX_COMMENT_LENGTH`

### **5.4 组件导出方式**

```typescript
// src/components/organisms/VideoPlayer/index.tsx
export { VideoPlayer } from './VideoPlayer';
export type { VideoPlayerProps } from './types';

// 使用时
import { VideoPlayer, type VideoPlayerProps } from '@/components/organisms/VideoPlayer';
```

### **5.5 TypeScript 规范**

* **严格模式**: 启用 `strict: true`
* **避免 any**: 使用 `unknown` 或具体类型
* **Props 接口导出**: 方便其他组件引用
* **事件类型明确**: `React.MouseEvent<HTMLButtonElement>`

```typescript
// ✅ 推荐
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

// ❌ 避免
interface ButtonProps {
  onClick: Function;
  children: any;
}
```

### **5.6 样式规范**

* **优先使用 Tailwind CSS**: 布局、间距、颜色
* **Semi UI 作为基础**: Button, Input, Drawer 等
* **Framer Motion 做动画**: 交互动画、过渡效果
* **CSS Modules 作为补充**: 复杂样式或需要覆盖的场景

```tsx
// 示例：组合使用
import { Button } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';

export function LikeButton() {
  return (
    <motion.div
      whileTap={{ scale: 0.85 }}
      className="flex flex-col items-center gap-2"
    >
      <Button
        icon={<IconHeart />}
        type="danger"
        className="!rounded-full !w-14 !h-14"
      />
      <span className="text-sm text-gray-400">1.2w</span>
    </motion.div>
  );
}
```

### **5.7 状态管理规范**

* **全局状态用 Jotai**: 播放器状态、用户信息
* **本地状态用 useState**: 组件内部临时状态
* **表单状态用 useForm**: 如果表单复杂，可引入 `react-hook-form`
* **避免 Props Drilling**: 超过 2 层传递就使用 Jotai

```tsx
// ✅ 推荐：使用 Jotai
function VideoPlayer() {
  const [volume, setVolume] = useAtom(volumeAtom);
  // ...
}

// ❌ 避免：深层传递 Props
<Layout volume={volume}>
  <Content volume={volume}>
    <Player volume={volume} />
  </Content>
</Layout>
```

### **5.8 代码注释规范**

* **组件顶部 JSDoc**: 说明组件用途和主要功能
* **复杂逻辑添加注释**: 算法、业务逻辑
* **避免无意义注释**: 代码即注释，清晰命名胜过注释

```typescript
/**
 * 视频播放器组件
 *
 * 功能：
 * - 封装 xgplayer，支持播放/暂停/音量控制
 * - 键盘控制 (ArrowUp/Down 切换视频)
 * - 自动播放 (基于视口可见性)
 *
 * @example
 * <VideoPlayer videoId="123" autoPlay />
 */
export function VideoPlayer({ videoId, autoPlay = true }: Props) {
  // 实现...
}
```

### **5.9 性能优化规范**

* **使用 React.memo**: 避免不必要的重渲染
* **使用 useMemo/useCallback**: 缓存计算结果和函数
* **懒加载组件**: `React.lazy` + `Suspense`
* **虚拟滚动**: 长列表使用 `react-window` 或 `react-virtualized`

```tsx
// ✅ 使用 memo 优化
export const CommentItem = React.memo(({ comment }: Props) => {
  // ...
});

// ✅ 使用 useMemo 缓存计算
const formattedCount = useMemo(() => formatCount(count), [count]);

// ✅ 使用 useCallback 缓存函数
const handleLike = useCallback(() => {
  // ...
}, [likedVideos, currentVideoId]);
```

### **5.10 测试规范** (可选)

如果项目需要测试覆盖：

* **单元测试**: 使用 Vitest 测试工具函数
* **组件测试**: 使用 `@testing-library/react` 测试组件行为
* **E2E 测试**: 使用 Playwright 测试关键流程

```typescript
// 示例：工具函数测试
import { describe, it, expect } from 'vitest';
import { formatCount } from '@/utils/format';

describe('formatCount', () => {
  it('应该将大数字格式化为万', () => {
    expect(formatCount(12345)).toBe('1.2w');
  });
});
```

---

## **附录：关键技术点总结**

### **xgplayer 实例管理**
```typescript
useEffect(() => {
  const player = new Player({ /* config */ });

  return () => {
    player.destroy(); // ⚠️ 必须销毁，防止内存泄漏
  };
}, [videoUrl]);
```

### **IntersectionObserver 自动播放**
```typescript
const videoRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        player.play();
      } else {
        player.pause();
      }
    },
    { threshold: 0.5 }
  );

  if (videoRef.current) {
    observer.observe(videoRef.current);
  }

  return () => observer.disconnect();
}, []);
```

### **Jotai 持久化状态**
```typescript
import { atomWithStorage } from 'jotai/utils';

// Set 类型需要自定义序列化
export const likedVideosAtom = atomWithStorage<Set<string>>(
  'dy_liked_videos',
  new Set(),
  {
    getItem: (key) => {
      const value = localStorage.getItem(key);
      return value ? new Set(JSON.parse(value)) : new Set();
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify([...value]));
    },
    removeItem: (key) => localStorage.removeItem(key),
  }
);
```

### **Framer Motion 动画**
```tsx
// 点赞按钮动画
<motion.button
  whileTap={{ scale: 0.8 }}
  whileHover={{ scale: 1.1 }}
  animate={{
    backgroundColor: isLiked ? '#FE2C55' : '#333'
  }}
>
  <IconHeart />
</motion.button>

// 数字跳动动画
<motion.span
  key={count}
  initial={{ scale: 1.3, y: -10 }}
  animate={{ scale: 1, y: 0 }}
>
  {count}
</motion.span>
```

---

## **总结**

本项目采用 **Modern.js + React 18 + Tailwind CSS v4 + Semi UI + Jotai** 技术栈，基于 **原子设计模式** 构建组件库，使用 **离线 Mock 数据** 确保演示稳定性。

**核心亮点**：
1. **原子设计模式**: 组件层次清晰，复用性强
2. **状态管理完善**: Jotai 原子化状态，支持持久化
3. **性能优化**: 虚拟滚动、懒加载、视频预加载
4. **用户体验**: 乐观更新、动画流畅、响应式适配

**开发顺序**：基础设施 → 原子组件 → 核心组件 → 页面 → 优化完善

**预计时间**：13-19 天完成完整功能开发。
