# ECHYOX｜下一位 GPT / Work 从这里开始

> 本页是**接手入口**，不是完整历史日志。先确认 GitHub 的实时状态，再执行本次任务。作者没有编程经验，所有反馈使用普通中文。

## 网站和已确认的基本状态
- 网站：https://echyox.com
- 仓库：https://github.com/Houyuxinx/houyuxin-site
- 正式分支：`main`；四栏目：戏剧、诗歌、音乐、寻找自己。
- 当前设计基线：先见由 90 条作品文字组成的全屏流动入场，再进入四栏目；主视觉约 2.35 秒切入，普通站内转场约 1.4 秒。不得擅自恢复早期的抽象主视觉或圆形追光。
- 音乐由访客手动播放；歌词水平居中、歌词栏滚动条闲置时隐藏，点击歌词不出现矩形外框。手机诗歌年份可**左右滑动**。
- **最近核实基线（2026-10-10 的快照，后续必须重新检查）**：最新正式合并为 [PR #28](https://github.com/Houyuxinx/houyuxin-site/pull/28)，`main` 提交 `33109612fbe40525ed60fb0781a9a9e13b0bb7d0`，GitHub Pages [#37977744036](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37977744036) `completed/success`。诗歌、戏剧、音乐外层宽度已统一；「寻找自己」正式路径为 `/becoming.html`，原 `/searching.html` 跳转兼容。
- **网站阶段**：已由建站期转为**稳定维护期**。未经作者指定，不为“优化”随意重设计、清理作品或重写共用动画；维护时坚持「先确认问题是否存在 → 核实原因 → 局部修复 → 审核发布」。
- **遗留任务核实状态（2026-10-10）**：[PR #23](https://github.com/Houyuxinx/houyuxin-site/pull/23) 因已由 PR #24 正式版本取代，已关闭（未合并）；[Issue #4](https://github.com/Houyuxinx/houyuxin-site/issues/4) 的早期抽象主视觉被文学文字入场取代，已以 `not planned` 关闭。两者历史保留，不得再自动执行。**[Issue #2](https://github.com/Houyuxinx/houyuxin-site/issues/2) 仍开放**，涉及独立备份、分支保护、Pages 设置等安全事项，未完成的内容不可宣称已完成。
- **最近发布前恢复点（针对 PR #28）**：`backup/2026-10-10-before-audit-maintenance-fixes` → `512109c0e559edf7fbca021c1fd9b513d88465d8`；详情见 `BACKUP_AND_RECOVERY.md`。这是同仓库的 Git 恢复点，尚无证据表明已完成独立异地备份。

## 依次阅读这七份文件
1. `START_HERE.md`（本页）：接手说明与上次核实状态。
2. `AGENTS.md`：**必须遵守**的工作规则、预览、授权、插件限制和断线续做。
3. `PROJECT_VISION.md`：已确认的审美方向与尚未决定的内容。
4. `SITE_STRUCTURE.md`：栏目、文件位置、可能牵连其他页面的共用代码。
5. `CHANGELOG.md`：发布时间线、此前试验与尚未完成的事项；**旧标题的“待审核”不代表今天仍待审核**。
6. `BACKUP_AND_RECOVERY.md`：恢复点和恢复步骤；禁止未经同意删旧备份。
7. `README.md`：仓库导航与原始 V13 历史。

请**实际读取文件**并核对与本次任务相关的代码；读不到要直说，不能装作已经读过。接着查看实时 `main`、未合并 PR、相关 Issue/分支、最新成功部署。旧对话、上面的固定提交号、旧日志都不是实时状态的替代品。

## 每次维护的固定合作方式
- 先说清楚：**本次具体改哪里、保留什么、怎么检查**。
- 小修也要汇报关键步骤；大型艺术调整先给明显不同的方案让作者选择，再分轮制作。优先沿用已经开展的 PR，不凭空推倒重来。
- 只在独立分支修改并交付**可供作者查看的待审核版本**；电脑/手机有关的修改要说明预览方式、实测与尚未验证之处。
- 作者对**具体版本**明确同意后才可以合并发布。发布前留恢复点，发布后核对 GitHub Pages；合并成功不等于部署成功。
- 未经授权不得使用 Canva、额外托管/网盘等不相关服务，也不能删除作品、历史记录或备份。
- 发布结果优先留在原 PR；避免只为修改几行状态说明反复触发正式网站部署。交接说明定期整理即可。

## 可以直接复制给新 AI
请接手 ECHYOX（https://echyox.com），仓库：https://github.com/Houyuxinx/houyuxin-site 。我没有编程经验。先实际阅读 START_HERE.md、AGENTS.md、PROJECT_VISION.md、SITE_STRUCTURE.md、CHANGELOG.md、BACKUP_AND_RECOVERY.md 和 README.md，再检查最新 main、未合并 PR、相关 Issue 与本次涉及的代码。用普通中文告诉我已确认的进度、准备修改哪里、哪些地方保持不变、怎样预览和检查。请在独立待审核版本里工作，每阶段汇报；没有我针对具体版本的明确授权，不得合并、发布或删除任何东西。

## 连接中断/停止思考后的续做话术
请继续 ECHYOX 上次未完成的任务。先核对 GitHub 最新 main、未合并 PR、相关分支、Issue 和最后保存的提交，告诉我**已完成 / 未完成 / 是否上线 / 下一步**。如果有原 PR，请在它上面继续，不重做、不重复创建、不擅自发布；如果无法连接 GitHub，请停止修改并说明。

> 最新任务的详细进度应记在**原 PR/Issue**。此文件只保留简要状态，历次具体变更请查 `CHANGELOG.md`。
