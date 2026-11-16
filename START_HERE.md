# ECHYOX｜下一位 GPT / Work 从这里开始

## 2026-11-16｜最新核实与身份提案（优先于下文历史快照）
PR #51 已获作者批准并合并，正式提交 `4334f9ae8d7f338af9a5fd3904d3e2f55e6e30f3`，[Pages #43818737949](https://github.com/Houyuxinx/houyuxin-site/actions/runs/43818737949) completed/success。恢复点 `backup/2026-11-16-before-pr51-maintenance-v6` → `965da5466e05b78d186da8e5dbd837e45211b2a8`（已核实 identical）；主分支保护保持开启，正常 PR 合并成功，未执行拒绝直写的破坏性测试。
2026-11-16 作者明确确认：网站艺术视觉标识 `HOU YUXIN`、中文姓名 `侯宇鑫` 均原样保留；英文个人署名统一 `Yuxin Hou`，仅搜索结构化数据将 `Hou Yuxin` 保留为检索别名。中文界面联系显示 `hyxtheatre@163.com`，英文界面显示 `houyx0516@gmail.com`，实际 mailto 与显示地址同步；两邮箱均在公开源代码中。经作者本轮追加确认，英文档案内全部 74 位演职人员（含作者）统一采用名在前、姓在后；其他 73 位只调整原有汉语拼音词序，保留拼写、原中文姓名、职务及版本关系；并非逐一核实的本人偏好署名，今后有具体本人署名可另经确认调整。英文剧名、文学正文、原始 PDF、图标、海报、布局及交互不改。该身份代码为本轮待审核提案，未经作者明确批准不得发布。

> 下文保留历史快照；涉及发布状态、本人署名及联系方式时以上方记录和 GitHub 实际状态为准。

## V6｜接手入口（2026-11-16，待审核）
本页只给出接手顺序、已核实基线与不可越过的授权边界；历次事实只在 CHANGELOG.md/原 PR 集中维护，避免多个文件重复更新版本编号。V6 本身尚未获准合并。

### 先核实，再开始
- 正式网站：https://echyox.com；仓库：https://github.com/Houyuxinx/houyuxin-site；正式分支：main。
- 本轮只读核实：PR #50 已合并，main 为 `965da5466e05b78d186da8e5dbd837e45211b2a8`，[Pages #43698789071](https://github.com/Houyuxinx/houyuxin-site/actions/runs/43698789071) completed/success；PR #47—#50 均已发布，本轮尚无开放 PR（创建 V6 提案前）。此为快照，不替代实时查询。
- 2026-11-16 作者亲自建立 [ECHYOX Main Protection](https://github.com/Houyuxinx/houyuxin-site/rules/27353864)；API 已核实 active、仅默认分支 main、禁止删除/强推、必须经 PR、审批人数 0、豁免名单为空；main protected=true。正常合并仍可能由有权限的 AI 执行，故须继续遵守作者明确授权制度。尚未进行拦截或真实合并测试。
- 同仓库已有 41 个备份分支；仓库外独立备份、Pages 管理后台配置、真实设备回归及恢复演练未独立核实（Issue #2 仍开放）。详见 BACKUP_AND_RECOVERY.md。
- 不得把 V6 的候选变更当成已发布功能。英文署名及新增公开联系邮箱尚待作者另行确认；此次仅维护文档。

### 核心文件
| 文件 | 职责 |
|---|---|
| AGENTS.md | 权限、协作、审核及发布规则 |
| PROJECT_VISION.md | 已确认艺术方向和不可擅改的设计 |
| SITE_STRUCTURE.md | 文件定位、功能及测试范围 |
| CHANGELOG.md | 真实发布记录、历史与待办 |
| BACKUP_AND_RECOVERY.md | 备份、保护与恢复步骤 |
| README.md | 项目概览及历史入口 |
| BILINGUAL_REVIEW.md | 双语任务额外必读：译文、专名与署名边界 |

接手时实际读取本页及前六份核心文件、最新 main、开放 PR、相关 Issue/分支与最近部署；双语任务额外读 BILINGUAL_REVIEW.md 和相关源码。读不到应说明，不得凭聊天记忆推断。

### 当下必须保留的艺术与功能
- 90 条中文文学流动文字入场、预测轨迹避让 V3、中心呼吸区、四栏目（戏剧/诗歌/音乐/寻找自己）。首次入场约 2.35 秒、站内普通转场约 1.4 秒；不恢复旧圆形追光。实际表现须浏览器检验。
- 新访客默认白天，可切黑夜并记忆；英文界面保留中文文学原文，英文入口 ?lang=en；五个英文剧名固定，署名/作品内容不自动改写。
- 手机诗歌年份横向滑动；诗歌正文、日期、署名不改；音乐及作品页音频手动播放、循环默认关闭，歌词居中独立滚动；《一个哑谜》正式保留。
- 十个正式内容页、旧 searching.html 兼容跳转、试读 PDF、剧照、共同在场档案、Umami 已批准的统计范围；分享描述统一为「保存过去，也向尚未发生的一切保持开放。」（搜索摘要未被 PR #50 修改）。
- 稳定维护期优先真实缺陷与作者明确要求；不擅自重构、新增作品、清理分支或安装插件。

### 每轮协作
1. 只读确认现状、明确改动范围与验收方式。
2. 检查是否有其他 AI 正在处理同一任务；同一任务沿用原 PR，不重复创建。不同 AI 接力以仓库与 PR 记录为准。
3. 独立工作分支，提交待审核 PR；网页变更给可预览版本，纯文档给差异。未经作者对具体版本明确授权不得合并。
4. 发布前保存当时 main 的恢复点；发布后核对部署、在原 PR 留 SHA/恢复点/未测项目，定期汇总日志。
5. 只读审计、静态检查、模拟浏览器、真实 Safari 与部署是不同证据。未经授权不改变安全设置、域名或其他服务，也不上传未授权素材。

### 可复制给任何新 AI
请接手 ECHYOX（https://echyox.com），仓库：https://github.com/Houyuxinx/houyuxin-site 。我没有编程经验。先实际阅读 START_HERE.md、AGENTS.md、PROJECT_VISION.md、SITE_STRUCTURE.md、CHANGELOG.md、BACKUP_AND_RECOVERY.md、README.md；双语任务另读 BILINGUAL_REVIEW.md。核实最新 main、开放 PR、Issue、分支和部署，说明已完成/未完成/是否上线/下一步。独立 PR 预览后等我明确授权才发布，不直接修改 main，不删除历史或作品，不擅自改变账户设置。若是续做，沿用原任务的分支/PR；断连时停止修改并说明。

### 历史入口
旧版接手全文已完整保存在 [PR #50 基线的 START_HERE.md](https://github.com/Houyuxinx/houyuxin-site/blob/965da5466e05b78d186da8e5dbd837e45211b2a8/START_HERE.md)；本次将接手入口收束为现行指引，历史不从 Git 中删除。
