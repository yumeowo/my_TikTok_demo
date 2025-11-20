# **抖音网页版复刻 \- 项目架构设计 (Mock版)**

## **1\. 技术栈清单**

* **核心框架**: Modern.js (应用生成、路由、构建)
* **UI 库**: React 18 \+ React DOM
* **组件库**: Semi Design (@douyinfe/semi-ui) \+ Semi Icons
* **样式**: Tailwind CSS
* **状态管理**: Jotai (原子化状态管理)
* **视频播放**: xgplayer (西瓜播放器)
* **动画**: Framer Motion (用于点赞、评论抽屉动画)
* **数据源**: **离线爬虫数据 (JSON) \-\> 前端 Mock 适配器**

## **2\. 目录结构规范 (Modern.js Monorepo/App模式)**

.  
├── config/                  \# Modern.js 配置  
├── src/  
│   ├── assets/              \# 静态资源 (图片、Logo)  
│   ├── mock/                \# \[核心变更\] 本地 Mock 数据层  
│   │   ├── data/  
│   │   │   └── raw\_douyin.json \# 爬虫抓取的原始 JSON 文件  
│   │   ├── adapter.ts       \# 数据清洗适配器 (Raw \-\> App Model)  
│   │   └── service.ts       \# 模拟 API 服务 (处理分页、延迟)  
│   ├── components/          \# 公共组件  
│   │   ├── VideoPlayer/     \# xgplayer 封装组件  
│   │   ├── CommentDrawer/   \# 评论区抽屉  
│   │   ├── LikeButton/      \# 点赞动效组件  
│   │   └── Layout/          \# 全局布局 (Sidebar \+ AppBar)  
│   ├── hooks/               \# 自定义 Hooks  
│   │   ├── useVideoFeed.ts  \# 视频流逻辑 (调用 Mock Service)  
│   │   └── useComments.ts   \# 评论逻辑  
│   ├── store/               \# Jotai Atoms (状态管理)  
│   │   ├── playerAtom.ts    \# 播放器状态 (音量, 播放中, 当前视频ID)  
│   │   └── userAtom.ts      \# 模拟用户信息  
│   ├── routes/              \# 页面路由 (基于文件系统)  
│   │   ├── page.tsx         \# 首页 (重定向或默认推荐)  
│   │   ├── layout.tsx       \# 根布局  
│   │   ├── video/  
│   │   │   └── \[id\]/        \# 视频详情页 (沉浸式播放)  
│   │   │       └── page.tsx  
│   │   └── selected/        \# 抖音精选 (瀑布流)  
│   │       └── page.tsx  
│   └── utils/  
│       ├── request.ts       \# 网络请求封装 (可切换 Mock/Real)  
│       └── format.ts        \# 数字/时间格式化  
├── tailwind.config.js       \# Tailwind 配置  
└── package.json

## **3\. 核心模块设计**

### **A. 数据层 (Data Layer \- Mock 方案)**

完全采用**前端离线 Mock** 方案，确保演示绝对稳定。

1. **数据采集 (Pre-process)**:
    * 使用 MediaCrawler 在本地运行一次，抓取 50+ 条视频数据。
    * 保存为 src/mock/data/raw\_douyin.json。
2. **数据清洗 (Adapter)**:
    * 编写 adapter.ts 将复杂的爬虫字段映射为前端需要的简单 Interface。
    * *Input*: aweme\_id, video.play\_addr.url\_list\[0\], ...
    * *Output*: id, videoUrl, author, diggCount.
3. **服务模拟 (Mock Service)**:
    * 在 service.ts 中模拟网络请求延迟 (setTimeout 500ms)。
    * 实现简单的分页逻辑 (Slice Array)，防止一次性加载过多导致卡顿。

### **B. 状态管理 (Jotai)**

使用 Jotai 处理跨组件通信，避免 Props Drilling。

// store/playerAtom.ts  
import { atom } from 'jotai';  
import { atomWithStorage } from 'jotai/utils';

// 持久化音量 (需求点：本地存储音量)  
export const volumeAtom \= atomWithStorage('dy\_volume', 0.5);

// 当前播放的视频 ID  
export const currentVideoIdAtom \= atom\<string | null\>(null);

// 侧边栏是否收起  
export const sidebarCollapsedAtom \= atom(false);

### **C. 视频播放器 (xgplayer)**

* 封装 \<Player /\> 组件。
* 监听键盘事件 useEffect 绑定 ArrowUp / ArrowDown。
* **核心难点**: 切换视频时，xgplayer 的实例销毁与重建，防止内存泄漏。

### **D. 评论区 (Optimistic UI)**

* **乐观更新**: 用户点击发送 \-\> 先在前端 List 插入数据 \-\> 再发送请求。
* **动画**: 使用 Framer Motion 实现点赞的“红心破裂”和数字跳动。