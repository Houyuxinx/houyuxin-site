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

### 当前正式版本：音乐已新增《一个哑谜》并统一歌词排版
- [PR #3](https://github.com/Houyuxinx/houyuxin-site/pull/3) 已按站长 2026-10-08 的明确授权合并并上线；正式发布提交 `7c91e455cbb92256ae85a15d7ccaf231334f0450`，GitHub Pages 部署 #37746160704 成功，正式页面已实测。
- 《一个哑谜》位于第四首；作词：侯宇鑫；作曲、编曲：suno；按作者确认暂不显示年份。不要把它当成尚未完成或尚待合并的任务。
- 歌词共 13 段、48 个非空行。站长后续要求与原有歌曲统一排版，已整理为句间单换行、段间双换行，字词、标点、字词间空格不变。沿用全曲目共用字体及样式。
- 音频路径为 `assets/audio/one-riddle.mp3`；正式 HTTP 文件哈希与作者原件一致，浏览器播放进度推进、暂停及返回列表已核验。
- 已在正式站电脑浏览器对照两首参考歌曲，字体、字号、字重、行高完全一致，并留存页面截图；站长确认其他功能正常。本轮未单独进行真实手机 / Safari 实测或全站完整复查，详细范围见 `CHANGELOG.md`。
- 发布前恢复点：`backup/2026-10-08-before-one-riddle`，对应 `228dd5820b3d9f5951b7d8ebf53d3d8af77e09af`；发布后更新交接记录前恢复点：`backup/2026-10-08-before-release-record`，对应 `7c91e455cbb92256ae85a15d7ccaf231334f0450`。
- main 的 GitHub Pages 构建部署及正式网址更新已观察确认；Settings → Pages 的完整后台配置、分支保护和独立备份仍为未来独立任务，不要冒充已完成。
