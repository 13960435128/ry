# 日语专业学习工作台 - 需求拆解文档

## 产品概述

- **产品类型**: 语言学习工作台 / 教育类 Web 应用
- **场景类型**: <scene_type>prototype-app</scene_type>
- **目标用户**: 日语专业学生、JLPT 备考者、日语兴趣学习者（年轻群体）
- **核心价值**: 整合听、说、读、写、单词、语法、汉字、游戏化学习于一体的每日日语学习闭环，通过打卡奖励和游戏化机制提升学习持续性
- **界面语言**: 中文（日语学习内容为日文）
- **主题偏好**: user_specified（和风设计，红黑/金白配色，樱花/浮世绘元素）
- **导航模式**: 路径导航
- **导航布局**: Sidebar（左侧纵向导航栏）

---

## 页面结构总览

> **说明**：左侧纵向导航栏布局，每个核心模块为独立一级页面

| 页面名称 | 文件名 | 路由 | 页面类型 | 入口来源 |
|---------|-------|------|---------|---------|
| 学习首页/打卡 | `DashboardPage.tsx` | `/` | 一级 | 导航 |
| 每日听力训练 | `ListeningPage.tsx` | `/listening` | 一级 | 导航 |
| 每日单词与语法 | `VocabGrammarPage.tsx` | `/vocab-grammar` | 一级 | 导航 |
| 每日阅读与写作 | `ReadingWritingPage.tsx` | `/reading-writing` | 一级 | 导航 |
| 每日口语练习 | `SpeakingPage.tsx` | `/speaking` | 一级 | 导航 |
| 日语汉字特训 | `KanjiPage.tsx` | `/kanji` | 一级 | 导航 |
| 互动闯关游戏 | `GamesPage.tsx` | `/games` | 一级 | 导航 |
| 每日文化小知识 | `CulturePage.tsx` | `/culture` | 一级 | 导航 |
| 打卡奖励中心 | `RewardsPage.tsx` | `/rewards` | 一级 | 导航 |

> **页面精简说明**：8 个一级页面均为用户明确提到的独立学习模块，各自有独立的学习目标和交互流程，符合"每个模块独立页面"的需求。游戏页内含 3 个子游戏，通过页面内 tab 切换，不单独拆页。

---

## 页面布局建议

### 整体布局模式
- **布局模式**: 左侧 Sidebar（固定宽 240px）+ 右侧主内容区 —— 用户明确要求"左侧纵向导航栏布局"
- **视觉重心**: 内容区 —— 每个页面以学习内容为核心，导航仅作模块切换
- **和风设计元素**: 红黑/金白配色、樱花装饰元素、浮世绘风格分隔线、和纸纹理背景

### 各页面布局指引

| 页面 | 布局模式 | 视觉重心 | 结果承载区 |
|-----|---------|---------|-----------|
| 学习首页/打卡 | 卡片网格布局 | 今日学习进度 + 打卡按钮 | 学习进度环形图、积分卡片、任务完成清单 |
| 每日听力训练 | 上下分区（上：播放器+文稿，下：练习题） | 音频播放器 + 文字稿 | 答题结果反馈、跟读录音对比 |
| 每日单词与语法 | 左右分栏（左：单词卡片区，右：语法区） | 单词卡片翻转 + 语法详解 | 默写模式结果、语法填空正确率 |
| 每日阅读与写作 | 上下分区（上：阅读区，下：写作区） | 短文阅读 + 重点词标注 | 阅读理解答题结果、写作范文对比 |
| 每日口语练习 | 卡片列表 + 模拟对话区 | 场景对话 + 模拟对话 | 绕口令练习记录、模拟对话历史 |
| 日语汉字特训 | 主从布局（左：汉字列表，右：详情+笔顺） | 汉字笔顺动画 + 测验 | 测验得分、已掌握汉字列表 |
| 互动闯关游戏 | 单页 + 游戏 tab 切换 | 游戏主画布 | 游戏得分、通关记录 |
| 每日文化小知识 | 单栏图文卡片 | 文化知识图文卡片 | 已读收藏列表 |
| 打卡奖励中心 | 上下分区（上：积分总览，下：奖励列表） | 积分进度 + 奖励兑换 | 兑换记录、自定义奖励管理 |

---

## 导航配置

- **导航布局**: Sidebar（左侧纵向，固定宽度 240px）
- **导航项**（仅一级页面，9 项）:

| 导航文字 | 路由 | 图标建议 |
|---------|------|---------|
| 学习首页 | `/` | Home / 樱花图标 |
| 每日听力 | `/listening` | Headphones |
| 单词与语法 | `/vocab-grammar` | BookOpen |
| 阅读与写作 | `/reading-writing` | FileText |
| 口语练习 | `/speaking` | MessageCircle |
| 汉字特训 | `/kanji` | PenTool |
| 闯关游戏 | `/games` | Gamepad2 |
| 文化小知识 | `/culture` | Sparkles |
| 打卡奖励 | `/rewards` | Trophy / 徽章 |

> **补充**: Sidebar 底部显示用户当前积分和连续打卡天数，和风风格装饰。

---

## 数据来源声明

| 数据/操作 | 来源类型 | 实现要求 | mock 兜底 |
|---|---|---|---|
| 每日听力内容（新闻/动漫/日剧 + 文字稿 + 题目） | demo-mock | `src/data/listening.ts` 预置每日更新数据，按日期索引 | 初始 7 天 mock 数据 |
| 每日单词与语法数据 | demo-mock | `src/data/vocab.ts`、`src/data/grammar.ts` 按 JLPT 等级和日期组织 | N5-N1 各预置 200+ 单词、50+ 语法点 mock |
| 每日阅读短文与写作主题 | demo-mock | `src/data/reading.ts`、`src/data/writing.ts` 按日期索引 | 初始 7 天 mock 数据 |
| 每日口语对话与绕口令 | demo-mock | `src/data/speaking.ts` 按日期和场景分类 | 初始 10 个场景 + 20 条绕口令 mock |
| 日语汉字数据（音读/训读/笔顺/搭配） | demo-mock | `src/data/kanji.ts` 按 JLPT 等级分类 | N5-N1 各 50+ 汉字 mock |
| 游戏题目数据（语法冒险/连连看/听力判断） | demo-mock | `src/data/games.ts` 各游戏独立数据结构 | 语法冒险 10 关、连连看 30 组、听力判断 50 句 mock |
| 每日文化小知识 | demo-mock | `src/data/culture.ts` 按日期索引 | 初始 30 条 mock |
| 用户学习记录（打卡/积分/完成进度） | local-persist | localStorage key=`__jp_learning_progress`，存储每日完成情况、积分、连续打卡天数 | 无（首次使用初始化为空） |
| 用户自定义奖励任务 | local-persist | localStorage key=`__jp_learning_rewards`，存储自定义奖励列表 | 默认 3 条系统奖励（10分/20分/30分） |
| 跟读录音与对比 | real-file + local-persist | 浏览器 MediaRecorder API 录音，localStorage 存音频 blob 引用 | 无录音时显示提示引导 |
| 写作练习提交与保存 | local-persist | localStorage key=`__jp_learning_writing`，按日期存储用户写作内容 | 无（空状态引导写作） |
| 游戏最高分与通关记录 | local-persist | localStorage key=`__jp_learning_game_scores` | 无（初始为 0 分/未通关） |
| 听力判断游戏音频合成 | demo-mock | 使用 WebAudio API 或预置短音频片段合成播放 | 预置 20 句肯定/否定句 mock 音频数据 |
| 影子跟读原音播放 | demo-mock | 播放听力材料中的原音片段 | 与听力内容一起 mock 提供 |

> **说明**: 用户明确要求"数据本地保存(localStorage)"，因此所有用户产生的数据均为 local-persist 类型。学习素材内容为 demo-mock（每日更新机制通过日期轮转 mock 数据模拟）。

---

## 功能列表

### 页面: 学习首页/打卡 (`/`)

- **页面目标**: 总览每日学习任务，一键打卡，查看学习进度和积分
- **功能点**:
  - **今日学习概览**: 展示 8 个模块的完成状态（已完成/未完成），点击跳转对应页面
  - **打卡操作**: 完成所有每日任务后可打卡，获得 1 积分，toast 反馈打卡成功 + 连续打卡天数
  - **积分与进度展示**: 环形进度图展示当前积分距下一奖励的进度，显示连续打卡天数、总学习天数
  - **学习统计摘要**: 本周学习天数、累计单词数、累计听力时长等关键数据卡片
  - **每日一句**: 顶部展示当日日语名言/佳句，增加学习氛围

### 页面: 每日听力训练 (`/listening`)

- **页面目标**: 完成 30 分钟听力训练，包含精听、答题、跟读
- **功能点**:
  - **听力材料播放**: 日语新闻/动漫对话/日剧片段音频播放器，带播放进度、倍速控制（0.5x-2x）、逐句复读
  - **文字稿同步显示**: 音频播放时高亮当前句子，点击句子可跳转播放，支持显示/隐藏假名、中文翻译
  - **听力理解题**: 3 道选择题，提交后显示正确答案和解析，记录正确率
  - **NHK 简明日语**: 独立 tab，标注语速等级（慢/中/快），每日一段 NHK 新闻简明版
  - **影子跟读**: 点击跟读按钮，录音用户跟读内容，支持与原音波形对比、回放收听

### 页面: 每日单词与语法 (`/vocab-grammar`)

- **页面目标**: 完成 40 分钟单词和语法学习，包含新学、练习、默写
- **功能点**:
  - **每日新学单词**: 20 个单词卡片，正面日文+假名，背面中文释义+例句+近义词反义词，支持左右滑动翻卡
  - **JLPT 等级切换**: 顶部切换 N5-N1 等级，对应单词难度调整
  - **单词默写模式**: 两种模式切换——看中文写日文 / 看日文写中文，输入后即时判对，错误计入错词本
  - **每日 3 条语法**: 语法条目卡片，含接续规则、例句、易混淆语法对比（如「は」vs「が」、「~たら」vs「~ば」）
  - **语法填空练习**: 每题给出句子挖空，4 选 1 语法填空，提交后显示解析

### 页面: 每日阅读与写作 (`/reading-writing`)

- **页面目标**: 完成 30 分钟阅读和写作练习
- **功能点**:
  - **每日短文阅读**: 150-300 字日语短文，题材涵盖社会/文化/动漫/旅行，重点词汇悬浮显示释义
  - **阅读理解题**: 3-4 道选择题，检测对短文的理解，提交后显示答案解析
  - **写作练习区**: 根据指定主题写 5-8 句日语短文，富文本输入框（支持日语输入法）
  - **范文参考**: 提交写作后可查看范文，高亮优秀表达
  - **常用表达库**: 侧边可展开常用句型/连接词/表达模板，点击可插入写作区

### 页面: 每日口语练习 (`/speaking`)

- **页面目标**: 完成 20 分钟口语练习，包含场景对话、绕口令、模拟对话
- **功能点**:
  - **场景对话卡片**: 5 条实用场景对话（便利店/餐厅/问路/预约等），每条含 A/B 角色对话、发音要点讲解
  - **逐句跟读**: 点击单句可播放原音并跟读，录音后回放对比
  - **绕口令练习**: 每日一条早口言葉，显示假名标注，播放标准读音，用户可录音挑战
  - **模拟对话**: 用户选择角色 A，系统扮演角色 B，按场景进行多轮对话练习（预设对话分支，用户选择回复）
  - **发音要点讲解**: 每个场景配 2-3 个发音技巧说明（如が行鼻浊音、ら行闪音）

### 页面: 日语汉字特训 (`/kanji`)

- **页面目标**: 完成 15 分钟汉字学习，包含新学、笔顺、测验
- **功能点**:
  - **每日 10 个汉字**: 汉字卡片，展示汉字、音读、训读、常用搭配词例
  - **笔顺动画**: 点击播放笔顺书写动画，分步展示笔画顺序和书写要点
  - **汉字小测验**: 选择题（选读音/选释义）和填空题（看释义写汉字），即时判分
  - **汉字筛选**: 按 JLPT 等级筛选，支持只显示未掌握汉字
  - **已掌握标记**: 学习后可标记为"已掌握"，从每日新学队列中移除

### 页面: 互动闯关游戏 (`/games`)

- **页面目标**: 通过游戏化方式巩固语法、单词、听力，增加学习趣味性
- **功能点**:
  - **游戏选择入口**: 页面顶部 3 个游戏 tab/卡片切换——语法大冒险、单词连连看、听力判断
  - **语法大冒险**（闯关答题类）:
    - 10 关递进难度，每关 5 道语法选择题
    - 答对前进一格，答错显示解析并扣 1 生命（共 3 命）
    - 通关解锁下一关，全部通关解锁隐藏成就
    - 已通关关卡可重玩挑战更高分
  - **单词连连看**（消消乐类）:
    - 日语单词与中文释义/图片配对，匹配成功消除
    - 计时挑战模式，记录最佳用时
    - 支持不同 JLPT 等级难度
  - **听力判断**（听音答题类）:
    - 播放日语短句音频（WebAudio 合成/预置音频）
    - 判断句型（肯定句/否定句）或判断情绪（开心/生气/平静）
    - 限时作答，连续答对增加连击加分
  - **游戏积分榜**: 展示 3 个游戏的最高分和历史记录

### 页面: 每日文化小知识 (`/culture`)

- **页面目标**: 5 分钟快速阅读，拓宽日本文化视野
- **功能点**:
  - **当日文化卡片**: 大图 + 标题 + 详细内容，和风排版，涵盖节日、习俗、美食、动漫圣地等
  - **历史回顾**: 可浏览往期文化知识（按日历/列表方式）
  - **收藏功能**: 喜欢的文化知识可收藏，单独查看
  - **小测验彩蛋**: 部分文化知识附 1 道趣味小问题，增加互动

### 页面: 打卡奖励中心 (`/rewards`)

- **页面目标**: 管理积分和奖励，自定义兑换内容，激励持续学习
- **功能点**:
  - **积分总览**: 当前积分、累计积分、距下一奖励进度条
  - **奖励列表展示**: 系统默认奖励（10分大餐/电影票、20分周边购物、30分短途旅行）+ 用户自定义奖励，卡片式展示
  - **新增奖励**: 点击"新增奖励"按钮，弹出 Dialog，输入奖励名称、所需积分、描述，提交后新增至列表
    - 触发: 页面右上角"新增奖励"按钮
    - 交互: 弹出 Dialog 表单（名称输入 + 积分数值输入 + 描述文本域 + 提交按钮）
    - 提交: setRewards(prev => [...prev, newReward])，写入 localStorage
    - 反馈: toast.success('奖励已添加') + 关闭 Dialog + 列表刷新
    - 数据契约: IReward { id: string; name: string; points: number; description?: string; type: 'system'|'custom'; }
  - **编辑奖励**: 自定义奖励支持编辑（系统奖励不可编辑）
    - 触发: 自定义奖励卡片右上角"..."菜单 → 编辑
    - 交互: 弹出预填充的 Dialog 表单，修改后提交
    - 提交: setRewards(prev => prev.map(r => r.id === target.id ? {...r, ...updates} : r))
    - 反馈: toast.success('奖励已更新')
  - **删除奖励**: 自定义奖励支持删除
    - 触发: 自定义奖励卡片右上角"..."菜单 → 删除
    - 交互: 弹出确认 Dialog "确定删除此奖励吗？"
    - 提交: setRewards(prev => prev.filter(r => r.id !== target.id))
    - 反馈: toast.success('奖励已删除') + 列表更新
  - **兑换奖励**: 积分足够时可点击"兑换"，扣除积分，记录兑换历史
    - 触发: 奖励卡片上"兑换"按钮
    - 交互: 确认 Dialog "花费 X 积分兑换【XX】？"
    - 提交: 扣除积分 + 添加兑换记录 + 更新 localStorage
    - 反馈: toast.success('兑换成功！恭喜获得 XX') + 积分刷新
  - **打卡日历**: 日历视图展示每日打卡状态，连续打卡高亮

---

## 数据共享配置

| 存储键名 | 数据说明 | 使用页面 |
|---------|---------|---------|
| `__jp_learning_progress` | 学习进度与打卡数据，类型 `IProgress` | 学习首页、各学习页、打卡奖励页 |
| `__jp_learning_rewards` | 奖励列表，类型 `IReward[]` | 打卡奖励页 |
| `__jp_learning_game_scores` | 游戏得分与通关记录，类型 `IGameScores` | 互动闯关游戏页 |
| `__jp_learning_kanji_mastered` | 已掌握汉字 ID 列表，类型 `string[]` | 汉字特训页 |
| `__jp_learning_writing_records` | 写作练习历史，类型 `IWritingRecord[]` | 阅读与写作页 |
| `__jp_learning_culture_favorites` | 收藏的文化知识 ID 列表，类型 `string[]` | 文化小知识页 |

```ts
// 学习进度接口
interface IProgress {
  /** 当前积分 */
  points: number;
  /** 累计总积分 */
  totalPoints: number;
  /** 连续打卡天数 */
  streak: number;
  /** 总学习天数 */
  totalDays: number;
  /** 每日完成记录，key 为日期字符串 YYYY-MM-DD */
  dailyRecords: Record<string, IDailyRecord>;
}

interface IDailyRecord {
  date: string;
  listening: boolean;
  vocabGrammar: boolean;
  readingWriting: boolean;
  speaking: boolean;
  kanji: boolean;
  games: boolean;
  culture: boolean;
  /** 是否已打卡（全部完成后可打卡） */
  checkedIn: boolean;
}

// 奖励接口
interface IReward {
  id: string;
  name: string;
  /** 兑换所需积分 */
  points: number;
  description?: string;
  /** 系统奖励不可删除/编辑 */
  type: 'system' | 'custom';
  /** 图标名称，可选 */
  icon?: string;
  createdAt: number;
}

// 游戏得分接口
interface IGameScores {
  grammarAdventure: {
    /** 已解锁的最大关卡数 (1-10) */
    unlockedLevel: number;
    /** 每关最高分 */
    levelScores: Record<number, number>;
  };
  wordMatch: {
    /** 最佳用时（秒） */
    bestTime: number;
    /** 历史最高分 */
    highScore: number;
  };
  listeningJudge: {
    /** 最高连击数 */
    maxCombo: number;
    /** 历史最高分 */
    highScore: number;
  };
}

// 写作记录接口
interface IWritingRecord {
  id: string;
  date: string;
  topic: string;
  content: string;
  createdAt: number;
}
```

---

## 技术选型补充（游戏部分）

### 语法大冒险
- **渲染层**: React + Tailwind
- **理由**: 答题类游戏，静态布局，元素较少，用 React 组件和状态管理即可
- **新增依赖**: 无

### 单词连连看
- **渲染层**: React + Tailwind + framer-motion
- **理由**: 卡片匹配消除，需要翻转/消除动效，framer-motion 足够
- **新增依赖**: `framer-motion@latest`

### 听力判断
- **渲染层**: React + Tailwind + WebAudio API
- **理由**: 听音答题类，音频播放使用浏览器原生 WebAudio / Audio 对象
- **新增依赖**: 无

-------

<scene_type>prototype-app</scene_type>

# UI 设计指南

## 1. 设计推导依据

- **参考意图**: Free Direction —— 无参考材料，按产品语义与用户描述的和风风格自主设计
- **核心情绪 / 应用类型**: 日式雅致的沉浸式日语学习工具，日常打卡 + 游戏化闯关，年轻学习者友好
- **独特记忆点**: 朱红 + 金箔 + 和纸底色的和风调色板，配以角落樱花纹样与浮世绘波浪分隔线，学习模块以"每日修行"为仪式感组织

## 2. Art Direction

- **方向名**: 和风现代 · Wa Modern
- **Design Style**: Japanese Minimal + Soft Editorial —— 以和纸质感与朱红印章感的高对比建立和风识别，用现代网格与卡片承载高密度学习内容，不幼稚、不堆砌元素
- **DNA 参数**: 圆角 subtle（`rounded-md` 为主，按钮 `rounded-full`）/ 阴影 subtle（`shadow-sm`，hover 时 `shadow-md`）/ 间距 standard（`gap-4` / `p-6`）/ 字体方向：中文无衬线 + 日文衬线混排 / 装饰手法：樱花花瓣点缀、细金线分隔、和纸纹理底、浮世绘波浪线

## 3. Color System

**色彩关系**: 和纸米白背景 + 墨黑主文字 + 朱红 primary（印章色） + 金箔 accent + 浅米杏卡片底
**配色设计理由**: 朱红作为主交互与品牌锚点（日语学习 + 和风印章意象），金箔作轻量强调与完成态，和纸米白护眼适合长时间学习，墨黑确保高对比度阅读。accent 用金而非第二种强色，保持克制雅致。
**主色推导**: 从日式神社朱红与印章印泥色出发，取饱和适中的正红，明度控制在 45% 左右，既有视觉重量又不刺眼；金箔 accent 取低饱和暖黄，呼应传统漆器与金襕织物。
**使用比例**: 65% 和纸中性 / 25% 金与浅杏辅助 / 10% 朱红 primary；primary 仅用于主按钮、当前导航、关键进度与徽章，禁止 tab 边框、icon、链接同时铺满朱红。

| 角色 | CSS 变量 | Tailwind Class | HSL 值 | 设计说明 |
|---|---|---|---|---|
| bg | `--background` | `bg-background` | hsl(40 30% 96%) | 和纸米白底，微暖护眼 |
| card | `--card` | `bg-card` | hsl(45 40% 98%) | 卡片与面板，比 bg 略浅偏白 |
| text | `--foreground` | `text-foreground` | hsl(20 10% 12%) | 墨黑主文字，偏暖不冷 |
| textMuted | `--muted-foreground` | `text-muted-foreground` | hsl(25 8% 45%) | 辅助说明、注音、元信息 |
| primary | `--primary` | `bg-primary` / `text-primary` | hsl(2 75% 42%) | 朱红印泥色，主交互与品牌锚点 |
| primaryForeground | `--primary-foreground` | `text-primary-foreground` | hsl(40 60% 97%) | 和纸白，primary 上文字 |
| accent | `--accent` | `bg-accent` | hsl(42 70% 88%) | 金箔浅底，hover / 选中 / 进度底色 |
| accentForeground | `--accent-foreground` | `text-accent-foreground` | hsl(30 50% 25%) | 深棕金，accent 上文字与图标 |
| border | `--border` | `border-border` | hsl(35 20% 82%) | 暖灰分隔线，接近和纸肌理 |

**语义色提示**: 
- 成功：绿松色 hsl(150 35% 38%)，bg hsl(150 40% 92%) / border hsl(150 30% 75%) / text hsl(150 35% 28%)；饱和度与 primary 对齐，偏冷调中和暖底
- 警告：金橙 hsl(36 80% 50%)，bg hsl(40 85% 92%) / border hsl(36 70% 75%) / text hsl(28 60% 30%)；与金箔 accent 同色系，加深即警告
- 错误：深朱红 hsl(2 80% 35%)，bg hsl(2 70% 93%) / border hsl(2 60% 75%) / text hsl(2 70% 25%)；与 primary 同色相，仅明度降低作错误态
- 游戏胜负：胜利用金箔 accent 加深，失败用错误深朱红；保持和风调性，不用霓虹高饱和

## 4. 字体与节奏

- **font-display**: Noto Serif SC + Noto Serif JP —— 标题、日语汉字特训、文化小知识用衬线，呼应日文活字与古籍感
- **font-body**: Noto Sans SC + Noto Sans JP —— 正文、菜单、表单用无衬线，保证长时间学习的清晰度；日语单词注音用小号 serif
- **字号**: H1 text-4xl ~ text-5xl；H2 text-2xl；body text-base；muted text-sm；日语汉字展示可放大到 text-6xl ~ text-7xl
- **圆角**: subtle —— 卡片 `rounded-md`，按钮 `rounded-full`（和印章/签押呼应），输入框 `rounded-md`

## 5. 全局布局契约

- **Reference Layout Use**: 按需求结构推导，左侧纵向导航 + 右侧内容区
- **Page / Section Order**: 与八大模块一一对应：听力 / 单词语法 / 阅读写作 / 口语 / 汉字特训 / 闯关游戏 / 文化知识 / 打卡奖励
- **Standard Content Zone**: Tool 型，`max-w-5xl` + `mx-auto`；学习卡片与题组适合中等宽度，避免阅读行长过长
- **Shell / Frame Alignment**: 左侧导航固定宽 240px，内容区独立滚动，内容容器在导航右侧居中对齐
- **Padding & Rhythm**: `px-4 md:px-6 lg:px-8 py-8 md:py-10`，模块间间距 `gap-6`，卡片内距 `p-6`
- **Full-bleed Zones**: 页面顶部每日进度条、文化小知识横幅可全宽；卡片网格与正文受 Standard Content Zone 约束
- **Local Narrowing**: 写作练习正文区、语法对比详解可收窄至 `max-w-2xl`，专注阅读
- **Overflow Strategy**: 单词列表、汉字表格、游戏排行榜使用 `overflow-x-auto`；不拓宽全局容器
- **Flexibility Boundary**: 移动端可折叠导航为抽屉、卡片内边距减半、游戏区单列；不允许改变主色、圆角和阴影语言

## 6. 视觉与动效

- **装饰**: 樱花花瓣（页面角落低透明度点缀）、细金线（模块标题下划线）、浮世绘波浪线（分页与分隔）、和纸噪点纹理（bg 极低透明度叠加）
- **阴影/边界**: 轻 —— 卡片 `shadow-sm` + `border` 双层表达，hover 时 `shadow-md`；主按钮用实色 + 内阴影质感
- **动效**: 克制精致 —— hover 缓动 150ms，打卡完成与游戏通关有轻量弹跳 + 金粉粒子；页面切换淡入，不做大幅位移

## 7. 组件原则

- 按钮、输入、卡片、菜单必须有 Default / Hover / Active / Focus-visible / Disabled 状态
- Primary 用朱红实底 + 圆角胶囊形，只给主行动；Secondary 用金底深棕字；Ghost 用透明底 + hover 金箔浅底
- 学习进度用金箔渐变填充 + 朱红终点标记；错误 / 正确反馈以色相 + 图标双通道表达
- 空状态、加载骨架延续和纸 + 金箔配色，不回退到默认 shadcn 灰

## 8. Image Direction

- **Image Role**: 页面装饰元素 + 模块头图 + 游戏场景背景 + 文化小知识插图
- **Image Art Direction**: 现代和风扁平化插画，有限色板（朱红、金、墨、和纸白），简洁线条 + 色块平涂 + 少量纹理；构图居中或不对称留白，光线均匀无强阴影，材质感为和纸肌理 + 金箔点缀；情绪平静雅致又带学习活力
- **Image Prompt Keywords**: ukiyo-e inspired flat illustration, japanese minimal style, limited color palette of vermilion gold and ink black, washi paper texture, cherry blossom petals, wave pattern, clean lines, flat color blocks, subtle gold foil accents, soft warm lighting, generous negative space
- **Image Avoidance**: 避免 3D 渲染、照片合成素材、动漫截图风、高饱和彩虹色、Q 版幼稚卡通、繁复浮世绘原样照搬、商务人物图库感

## 9. Anti-patterns

- **Over-decorated kimono**: 把樱花、波浪、折扇、家纹堆满界面，像节日海报而不像学习工具；装饰只保留 1-2 种且置于低权重位置（角落、分隔线、空状态）
- **Red everywhere**: 朱红同时用在按钮、tab、icon、边框、链接、进度条；按 65-25-10 收回 primary，多数交互交给金箔 accent 与中性色
- **Anime cartoon drift**: 为了"吸引年轻人"改成 Q 版动漫风，丢失雅致感；年轻感来自清晰布局、游戏化反馈和明快节奏，不是卡通形象
- **Invisible japanese text**: 日语假名与汉字字号过小、注音对比度不足；日文展示字号不小于 14px，注音 textMuted 但保证 ≥ 3:1 对比度
- **Default SaaS blue fallback**: 开发时图省事回退到默认蓝色按钮与紫色渐变；必须替换为朱红 + 金箔系统
- **Game mode dissonance**: 游戏页突然切换成霓虹/像素风，与全站和风割裂；游戏用同一套朱红金墨色板，仅增加动效强度与反馈密度