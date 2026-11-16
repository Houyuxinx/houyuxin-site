# ECHYOX｜下一位 GPT / Work 从这里开始

## V6｜接手入口（2026-11-16）
V6 维护规范已由 [PR #51](https://github.com/Houyuxinx/houyuxin-site/pull/51) 正式合并并部署成功。2026-11-16 作者明确授权 [PR #52](https://github.com/Houyuxinx/houyuxin-site/pull/52) 完成必要收尾检查后发布；本记录写于合并前，实际合并与部署结果以该 PR 的发布评论及 GitHub Actions 为准。下文“候选／待审核／待确认”等旧措辞属于形成时的历史记录，不代表最新授权状态。

### 先核实，再开始
- 正式网址：https://echyox.com；仓库：https://github.com/Houyuxinx/houyuxin-site；正式分支 main。
- 发布前基线 main `4334f9ae8d7f338af9a5fd3904d3e2f55e6e30f3`，PR #51 的 [Pages #43818737949](https://github.com/Houyuxinx/houyuxin-site/actions/runs/43818737949) completed/success。PR #52 已授权；必须查看实时 main、开放 PR 和最新部署，不把这份快照当实时状态。
- [ECHYOX Main Protection](https://github.com/Houyuxinx/houyuxin-site/rules/27353864) 已启用，仅默认 main，禁止删除及强推、必须经 PR、无额外审批、无豁免；仍必须经作者授权才合并。
- 作者确认的规范：中文姓名侯宇鑫，英文个人署名 Yuxin Hou，视觉字标 HOU YUXIN 保持原样；英文档案 74 位演职人员名在前、姓在后，保留原拼音与汉字；中文联系 hyxtheatre@163.com，英文联系 houyx0516@gmail.com，显示与 mailto 同步。文学正文、已定剧名及中文社交分享描述不变；奖项事实与译名依据见 BILINGUAL_REVIEW.md。
- 发布前恢复点 `backup/2026-11-16-before-pr52-english-credentials` → `4334f9ae8d7f338af9a5fd3904d3e2f55e6e30f3`，已与发布前 main 比较 identical（ahead=0、behind=0）。独立异地备份、恢复演练、真实 Safari/iPhone 与 Android 全面回归仍未核实，不将静态检查冒充真机。 Issue #2 的独立备份与 Pages 后台核查尚未关闭。
- 详细审校事实及来源已保留于 CHANGELOG.md / BILINGUAL_REVIEW.md；[前一候选完整接手记录](https://github.com/Houyuxinx/houyuxin-site/blob/88ed60892027fc5270f40bb61c1c4cc059247d2f/START_HERE.md) 可追溯。

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
