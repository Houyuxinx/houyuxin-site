# ECHYOX｜新对话从这里开始

> 写给以后每一次新开的 GPT、Work 或 Codex 对话。站长不需要懂编程，也不需要重新解释全部背景。

## 项目是什么
- 个人艺术创作网站：**https://echyox.com**
- 代码仓库：**https://github.com/Houyuxinx/houyuxin-site**
- 四个主要栏目：**戏剧、诗歌、音乐、寻找自己**
- 正式网站由站长决定内容和形式；AI 只是协助执行，不代替作者作艺术决定。

## 如果你是接手项目的 AI
请先读完：
1. `PROJECT_VISION.md`：创作方向和必须尊重的审美边界
2. `SITE_STRUCTURE.md`：页面在哪里、修改什么文件
3. `AGENTS.md`：你必须遵守的修改、检查和交付流程
4. `CHANGELOG.md`：做过什么、哪些问题还没解决
5. `BACKUP_AND_RECOVERY.md`：怎么备份、怎么找回旧版本
6. `README.md`：此前 V13 版本的调整记录

**重要：**这些文件不一定会被每种聊天工具自动读取。每次接手必须实际从 GitHub 读取；读不到就说明，不能假装已经了解。

## 给站长：以后新开对话，只要复制下面这段

请接手我的个人网站 ECHYOX：https://echyox.com
GitHub 仓库：https://github.com/Houyuxinx/houyuxin-site

我没有编程经验。请使用容易理解的中文和我沟通，不要让我自己找文件或执行复杂命令。

先在 GitHub 读取 START_HERE.md、PROJECT_VISION.md、SITE_STRUCTURE.md、AGENTS.md、CHANGELOG.md、BACKUP_AND_RECOVERY.md，以及当前网站的相关代码。然后用简短中文告诉我：
- 你现在理解的网站是什么样的；
- 这次准备修改什么；
- 哪些部分保持原样；
- 怎么检查修改有没有成功。

请先在单独的修改版本中工作。**未经我明确批准，不要发布到正式网站。**

我这次想做的是：【在这里写你的需求】

## 每次任务如何留痕
- 在 GitHub Issue 或 Pull Request 中记录目标、修改、检查结果和下一步。
- 修改通过后更新 `CHANGELOG.md`。
- 中途额度耗尽时，新对话先查看未合并的 Pull Request 或正在进行的 Issue，再继续。

## 当前交接状态（2026-10-08）
长期维护交接说明 V1 通过 PR #1 整理；首个恢复点为 `backup/2026-10-08-before-handover`（对应提交 `3beabb30f480a4adea1b1963c7bf7d9e557025e0`）。本项目中的文档变化不意味着网页外观有变化。尚需核实 GitHub Pages 的实际发布设置；不能冒充已经完成线上页面检查。

### 最新正式版本：PR #11 音乐歌词栏轻量化（2026-10-08 已发布）
- 作者在 Safari 预览后确认原先歌词滚动条和矩形点击外框修复满意；最终额外要求核实所有歌词**水平居中**。已检查三首有歌词歌曲共用 `text-align:center` 和折行居中规则，移动端等多组样式没有改成左对齐；器乐“无歌词”提示也居中。**17 项发布前核对通过**，无需修改歌词排版。
- [PR #11](https://github.com/Houyuxinx/houyuxin-site/pull/11) 已经作者明确授权合并，代码提交 `a75415ca4ba864e7b18a8ef537f15de7c13a041f`；GitHub Pages [部署 #37800113203](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37800113203) 已成功完成。
- 歌词区在静止时滚动条透明，桌面鼠标悬停、键盘聚焦、歌词滚动时显示；停止滚动约 **1.1 秒**后隐藏（鼠标仍悬停除外）；点击歌词不再出现完整矩形外框。歌词滚动、字体、歌词正文、四首歌手动播放、原生音频进度条、1.4 秒暗场渐隐及其他板块没有改变。
- 本次仅改 `music.css`、`music.js` 和 `music.html` 的 CSS/JS 缓存引用；更新日志记录已补充。正式版本备份：`backup/2026-10-08-before-lyrics-scrollbar-release` → `bf15244a279e1fabc50fb20a308b5da4c8186918`，已验证与发布前 main 一致，非独立异地备份。
- 发布部署成功已由 GitHub Actions 核实；工具未直接在 echyox.com 运行 Safari 操作测试。网站后续修改仍须独立分支、经作者确认后再合并。

### 较早正式版本：PR #8 手机端三项修复（2026-10-08）
- 作者已经在手机端通过预览验收全部三项修复，并明确批准发布。[PR #8](https://github.com/Houyuxinx/houyuxin-site/pull/8) 已成功合并，代码提交 `ee7ec56893b0825ce7915b297c8e231ace97cd7a`。**首次发布任务 #37792539167 失败，但后续由交接文档 PR #9 触发的 [Pages 部署 #37793371715](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37793371715) 已完成，结论 success；正式分支确认包含修复代码。由于工具无法直接访问 echyox.com，未在本环境完成线上 Safari 实测。**
- 手机文学文字场最高使用 3× Retina Canvas 和缓存，15–18px 小字、像素位置对齐；原 90 条文字、非规则流动和桌面端效果保留。
- 手机诗歌年份栏依旧能够左右滑动、年份松手吸附，限制纵向/斜向数字拖动；2018—2026 的九个年份及诗歌正文不变。
- 戏剧、诗歌、音乐、寻找自己的「回到来处」直接返回 `index.html#entry-revealed` 四栏目主页，统一 1.4 秒黑场渐隐，不再叠加旧中心追光。剧目详情仍回戏剧，品牌标题可重新观看入场。
- 初次主视觉 2.35 秒、音乐四曲目手动播放、作品原文、MP3、PDF 均保留。
- 合并前恢复分支 `backup/2026-10-08-before-mobile-fixes`，准确提交 `10455db1703fc51a6dd647c1f6e99a309fc4ad75`，已核对为合并前 `main` 完整快照；非独立异地备份。
- GitHub Pages 的最终成功部署已记录在 PR #8、PR #9 与上述 Actions 任务中；作者已在发布前预览版本完成手机验收。所有后续修改仍须先待审核分支与作者确认。

### 较早正式版本：文学星系主视觉与全站渐隐（2026-10-08 已发布）
- 作者已授权正式发布；[PR #6](https://github.com/Houyuxinx/houyuxin-site/pull/6) 已合并，发布提交 `dfb6546ccfe88439df8bc5c469b41cb39f01a6ef`。GitHub Pages [部署 #37788352521](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37788352521) 成功。**当前执行环境没有完成 echyox.com 线上浏览器实测；如有问题先检查线上表现。**
- 首页 `index.html` 先展示动态文学文字场：**90 条短句/词（剧本 41／诗歌 31／歌词 18）**；中央 `HOU YUXIN`，可点击 `进入尚未完成之处`。点击后约 **2.35 秒**进入原四栏目。中央与边缘文字渐暗；只选择小段作品文字，**私人剧本原件及完整歌词、完整剧本均未上传**。
- 其余站内 HTML 导航与音乐列表↔播放器统一 **0.6 秒淡出 + 0.8 秒渐显 ≈ 1.4 秒**。四首音乐均改为用户**手动播放/暂停**，不再自动开始。
- 「主页」直接去四栏目页 `index.html#entry-revealed`；「侯宇鑫 HOU YUXIN」重看入口 `index.html?entry=1`。原作品正文、MP3 和公开试读保持不变。
- 当前恢复点：[发布前备份](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-literary-entrance)，准确提交 `3f3a8febe6394c9dc96e9f47878a2a81803f041a`，已校验与发布前 `main` 完全一致，**并非异地备份**。详细恢复指引见 `BACKUP_AND_RECOVERY.md`。
- 不要把 PR #6 当作未完成任务再重新实现。发布前迭代与 Safari 优化历史仍留在 `CHANGELOG.md`。后续修改仍须**先独立分支、提供待审核 PR、得到站长授权再上线**。

### 较早正式更新：音乐已新增《一个哑谜》并统一歌词排版
- [PR #3](https://github.com/Houyuxinx/houyuxin-site/pull/3) 已按站长 2026-10-08 的明确授权合并并上线；正式发布提交 `7c91e455cbb92256ae85a15d7ccaf231334f0450`，GitHub Pages 部署 #37746160704 成功，正式页面已实测。
- 《一个哑谜》位于第四首；作词：侯宇鑫；作曲、编曲：suno；按作者确认暂不显示年份。不要把它当成尚未完成或尚待合并的任务。
- 歌词共 13 段、48 个非空行。站长后续要求与原有歌曲统一排版，已整理为句间单换行、段间双换行，字词、标点、字词间空格不变。沿用全曲目共用字体及样式。
- 音频路径为 `assets/audio/one-riddle.mp3`；正式 HTTP 文件哈希与作者原件一致，浏览器播放进度推进、暂停及返回列表已核验。
- 已在正式站电脑浏览器对照两首参考歌曲，字体、字号、字重、行高完全一致，并留存页面截图；站长确认其他功能正常。本轮未单独进行真实手机 / Safari 实测或全站完整复查，详细范围见 `CHANGELOG.md`。
- 发布前恢复点：`backup/2026-10-08-before-one-riddle`，对应 `228dd5820b3d9f5951b7d8ebf53d3d8af77e09af`；发布后更新交接记录前恢复点：`backup/2026-10-08-before-release-record`，对应 `7c91e455cbb92256ae85a15d7ccaf231334f0450`。
- main 的 GitHub Pages 构建部署及正式网址更新已观察确认；Settings → Pages 的完整后台配置、分支保护和独立备份仍为未来独立任务，不要冒充已完成。
