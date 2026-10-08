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

### 最近已发布：音乐新增《一个哑谜》（2026-10-08）
- **发布状态已核实**：歌曲新增与歌词排版修正已通过 [PR #3](https://github.com/Houyuxinx/houyuxin-site/pull/3) 合并至 `main`；发布提交 `7c91e455cbb92256ae85a15d7ccaf231334f0450`，对应 [GitHub Pages 部署运行成功](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37746160704)。不要再将此任务当作“待审核未上线”或重复上传歌曲。
- 曲目位于音乐列表第四位；作词：侯宇鑫；作曲、编曲：suno；作者已确认不显示年份。MP3：`assets/audio/one-riddle.mp3`。
- 歌词正文 13 段、48 个非空行；上线前按作者审核意见调整为句间单换行、段间双换行，未改动正文文字。旧曲目及其音频、CSS、脚本保持不变。
- 修改前恢复点：`backup/2026-10-08-before-one-riddle`，对应 `228dd5820b3d9f5951b7d8ebf53d3d8af77e09af`。此为 GitHub 仓库内恢复点，并非独立离线备份。
- 作者在发布前反馈功能正常并授权发布。仓库/部署状态已核对，但本次交接文档补录**没有独立完成真实手机/Safari 或桌面浏览器全流程测试**，不能虚构结果。

### 下一项已确定但尚未制作的视觉开发需求
- 抽象艺术入场主视觉“未完成的形状”制作要求见 [Issue #4](https://github.com/Houyuxinx/houyuxin-site/issues/4)。它与已发布的歌曲是**两项独立任务**。
- 接手新任务请先查当前 `main` 与所有未合并 PR / 待办，避免用旧聊天状态覆盖新版本。未经站长明确同意，不得合并或正式发布。
