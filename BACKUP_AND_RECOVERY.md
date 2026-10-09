# ECHYOX｜备份、恢复与更新日志（给站长和 AI）

> 站长不需要懂 Git 或编程。以后可以直接对 GPT / Work 说：“按 BACKUP_AND_RECOVERY.md 帮我备份 / 恢复网站。”

## 先说明三件事

1. GitHub 本来就会保存每次提交的历史记录；但它**不是独立于 GitHub 的完整异地备份**。
2. `CHANGELOG.md` 是“给人看”的更新日志：什么时候做了什么、有没有上线、需要注意什么。它和 GitHub 自动保存的代码记录互相补充。
3. **恢复网站前，先核实问题和部署配置，不能为了恢复而直接覆盖 main；应在新分支准备恢复提案，让站长确认。**

## 恢复点速查（制作 V4 草稿时核实：2026-10-10）
- **当前正式代码**：实时以 GitHub `main` 为准；本次核实时主线 `512109c0e559edf7fbca021c1fd9b513d88465d8`（PR #26），[GitHub Pages #37969318494](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37969318494) `success`。**恢复点分支保存的是某次发布前的旧代码，而非最新的当前发布版**。
- **最新发布前恢复点**：[backup/2026-10-10-before-poetry-width-unify](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-10-before-poetry-width-unify) → `24e319d9a994562ab05f6a9a0ef33f5c5cd37e8b`（PR #26 发布前），当时与 main 比对一致。
- **网址更名发布前**：`backup/2026-10-10-before-becoming-url` → `dd11ea5f35e276e0a807a276c7401d1c0d000613`（PR #25 发布前）。
- **四栏目标语最终统一前**：`backup/2026-10-10-before-four-slogans-final` → `956313730b4ac52e0fc9f0b83f88279a9b705f7b`（PR #24 发布前）。
- **戏剧/音乐/诗歌词语同步前**：`backup/2026-10-10-before-slogan-refresh` → `c5cc0dc96b91bddf6ea15e1c3f80c3a1da4dd444`（PR #22 发布前）。
- **BECOMING 页面重构前**：`backup/2026-10-10-before-becoming` → `5b093675e6fcbf092ea9d432a614e8ced4856283`（PR #21 发布前）。
- **早期重要视觉里程碑**：`backup/2026-10-08-before-literary-entrance` → `3f3a8febe6394c9dc96e9f47878a2a81803f041a`（全屏文学文字入场发布前）。
- 上述恢复点均位于**相同 GitHub 仓库**，只能作为 Git 历史恢复入口；**没有证据表明当前正式 ZIP 已独立保存在作者的电脑或其他位置**。不得擅删旧备份。
- 若要恢复，**先决定修复单个故障还是回到完整旧版本**；不得无意撤销恢复点以后新增的作品、诗歌/歌词变动或已批准的页面调整。历史备份详见下方各小节。

## 最近一次恢复点详细记录：工作流程 V2 发布前（2026-10-08）
- 恢复分支：[ `backup/2026-10-08-before-workflow-v2`](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-workflow-v2)。
- 准确提交：`ca4be01b30a696f50540f02ab54bf644f1979ca0`。
- 在获得作者正式同意合并 [PR #13](https://github.com/Houyuxinx/houyuxin-site/pull/13) 前创建。通过 GitHub compare 核实与发布前 `main` 完全一致（ahead=0、behind=0）。
- [对应源码 ZIP](https://github.com/Houyuxinx/houyuxin-site/archive/ca4be01b30a696f50540f02ab54bf644f1979ca0.zip) 为 GitHub 可生成的下载地址，**本轮并未实际下载或存到另一处**。
- PR #13 只调整工作与交接规范，没有更改页面代码及资源；该正式提交为 `87635471316c80e4e4b55ab7e8d2d258cda08185`，Pages 部署 #37804092035 成功。
- 若未来发生问题，先确认应修复代码还是仅恢复说明文件，未经作者确认不得撤回已经上线的其他创作修改。

## 备份数量与整理：作者提出的待确认方案（禁止自动清理）

作者希望备份不要无限增长，倾向在新版本发布成功后保留**当前已上线版本和上一个正常版本**，其他旧版本记录可以逐渐归档。但这只是**讨论中的意向，不是删除授权**。

- GitHub 的“备份分支”主要是指向已有版本的一个索引，通常不会把全部网站文件重新完整复制一遍，因此**分支多不等于硬盘上有那么多份完整副本**；实际空间占用仍取决于新增媒体及仓库历史。
- 现在的 `main` 就是最新正式代码；应至少保留最近一个确定正常的发布前恢复点。涉及重大审美改变的里程碑版本（如文学文字入场前）建议另外保留，方便追溯。
- 已合并的功能分支、旧备份分支未来可以分批评估，而不是立即批量删除。**必须逐项确认**：相关功能已进入 main、PR 与历史仍能追溯、删除不会导致独有阶段成果失去唯一入口，并获得站长对具体分支列表的明确同意。
- **禁止自动清理**任何 `backup/` 分支、旧提交、作品媒体、PR、Issue 或更新日志。尤其别把“清理备份”理解为删网站中已做的修改。
- 建议在重要发布后把最新网站仓库 ZIP 独立保存到电脑或可信私有位置，另外保存域名/DNS 配置指引。这个 ZIP 本身不含 GitHub 全部历史、Issue/PR 或 DNS 后台信息。
- 在站长作出最终选择之前，原“每次正式更新前创建恢复点”的制度继续有效，新的清理方案不生效。

## 发布歌词滚动条与焦点边框修复前的恢复点（2026-10-08）

- 恢复分支：`backup/2026-10-08-before-lyrics-scrollbar-release`，准确提交 `bf15244a279e1fabc50fb20a308b5da4c8186918`，在合并 PR #11 之前创建，通过 GitHub compare 核实与当时 `main` 完全相同（ahead=0、behind=0）。
- 保存的是正式发布前的完整网站仓库快照，包含当时的所有页面、公开图片、音乐与试读；这是 **GitHub 同仓库备份，并非独立异地备份**。
- [查看恢复点](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-lyrics-scrollbar-release) · [下载对应提交 ZIP](https://github.com/Houyuxinx/houyuxin-site/archive/bf15244a279e1fabc50fb20a308b5da4c8186918.zip)。
- 发布提案 [PR #11](https://github.com/Houyuxinx/houyuxin-site/pull/11)，功能代码提交 `a75415ca4ba864e7b18a8ef537f15de7c13a041f`；Pages [发布 #37800113203](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37800113203) 结果 success。详细修复内容见 `CHANGELOG.md`。
- 后续出现问题仍须先与作者确认恢复范围，通过独立 PR 修复或恢复，不能擅自覆盖 main。

## 发布手机端三项修复前的恢复点（2026-10-08）

- 恢复分支：`backup/2026-10-08-before-mobile-fixes`。
- 对应准确提交：`10455db1703fc51a6dd647c1f6e99a309fc4ad75`。
- 内容：合并 PR #8 之前 `main` 的完整版本，包括当时已发布的文学星系与全部作品、资源。
- 经 GitHub compare 核对与发布前 `main` 完全一致（ahead=0，behind=0）。
- [查看备份](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-mobile-fixes) · [下载对应 ZIP](https://github.com/Houyuxinx/houyuxin-site/archive/10455db1703fc51a6dd647c1f6e99a309fc4ad75.zip)。
- [PR #8](https://github.com/Houyuxinx/houyuxin-site/pull/8) 已按作者授权合并，代码提交 `ee7ec56893b0825ce7915b297c8e231ace97cd7a`；Pages 首次构建 #37792539167 失败，但随后文档 PR #9 触发的 [部署 #37793371715](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37793371715) 最终 `success`，代码与交接记录均已合并；在线 Safari 交互未由工具亲自测试。
- 此恢复点仍在同一 GitHub 仓库中，**不是异地备份**。需要恢复时仍应新开提案让作者确认。

## 发布文学星系主视觉前的恢复点（2026-10-08）

- 名称：`backup/2026-10-08-before-literary-entrance`。
- 准确提交 SHA：`3f3a8febe6394c9dc96e9f47878a2a81803f041a`。
- 内容：在 [PR #6](https://github.com/Houyuxinx/houyuxin-site/pull/6) 合并**之前**的 `main` 完整仓库快照（四栏目主页、此前全部作品、音频与已有公开 PDF）。通过 GitHub compare 接口确认与当时 `main` 完全一致。
- [查看备份分支](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-literary-entrance) · [下载对应提交的 ZIP](https://github.com/Houyuxinx/houyuxin-site/archive/3f3a8febe6394c9dc96e9f47878a2a81803f041a.zip)。
- 新版文学星系及全站转场已通过 PR #6 发布，正式代码提交 `dfb6546ccfe88439df8bc5c469b41cb39f01a6ef`；GitHub Pages [部署 #37788352521](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37788352521) 结果 `success`。
- 这个恢复点**位于同一个 GitHub 仓库**；ZIP 尚未另行下载到电脑或异地保存。未来如要恢复，仍须按照本文流程建立修复/恢复 PR，征得作者明确同意。

## 已经准备的首个恢复点（2026-10-08）

- 名称：`backup/2026-10-08-before-handover`
- 对应的准确版本（Git 提交 SHA）：`3beabb30f480a4adea1b1963c7bf7d9e557025e0`
- 内容：2026-10-08 建立交接说明以前的 **main 整个代码仓库快照**，包括当时已经纳入 GitHub 管理的网站页面、图片/音频等 `assets/` 内容及 `docs/` PDF。
- 在线浏览旧版本：[打开备份分支](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-handover)
- 下载此版本的 ZIP：[下载初始版本 ZIP](https://github.com/Houyuxinx/houyuxin-site/archive/3beabb30f480a4adea1b1963c7bf7d9e557025e0.zip)

**核对条件：**这个备份分支指向上述固定提交，不需要也不应该改写它。ZIP 从 GitHub 在线生成；如果未把 ZIP 另存到自己电脑或独立网盘，仍然不是异地备份。ZIP 只包括该提交中的仓库文件，不包括完整 Git 修改历史、GitHub Issue/PR、GitHub Pages 后台设置或域名服务商的 DNS 资料。

## 新增《一个哑谜》前的恢复点（2026-10-08）

- 名称：`backup/2026-10-08-before-one-riddle`。
- 准确提交 SHA：`228dd5820b3d9f5951b7d8ebf53d3d8af77e09af`。
- 内容：本次新增曲目之前的完整 `main` 快照，包含原有网站、三首音乐曲目、全部已跟踪资源以及 PR #1 合并后的交接说明。
- 已通过 GitHub 接口核对恢复分支指向此提交；不要改写这个恢复分支。
- 在线查看：[新增曲目前的旧版本](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-one-riddle)。
- ZIP 下载入口：[下载此次恢复点](https://github.com/Houyuxinx/houyuxin-site/archive/228dd5820b3d9f5951b7d8ebf53d3d8af77e09af.zip)。本轮没有实际下载或另存这个 ZIP，不能称为已完成独立备份。
- 相关修改通过 [PR #3](https://github.com/Houyuxinx/houyuxin-site/pull/3) 已合并并上线，正式发布提交 `7c91e455cbb92256ae85a15d7ccaf231334f0450`；原有三首曲目保留，新歌排版已按作者审核意见统一。此恢复点仍保存新增歌曲前的三首音乐版本。

## 《一个哑谜》发布后、交接记录更新前的恢复点（2026-10-08）

- 名称：`backup/2026-10-08-before-release-record`。
- 准确提交 SHA：`7c91e455cbb92256ae85a15d7ccaf231334f0450`。
- 内容：已上线的四首歌曲版本，包含《一个哑谜》原始 MP3 及修正后的歌词换行。该快照中的部分文档仍为最初待审核文字，网页代码已经发布；最新交接状态以 main 的 `CHANGELOG.md` 为准。
- [在线查看恢复点](https://github.com/Houyuxinx/houyuxin-site/tree/backup/2026-10-08-before-release-record)。
- [下载已发布代码快照 ZIP](https://github.com/Houyuxinx/houyuxin-site/archive/7c91e455cbb92256ae85a15d7ccaf231334f0450.zip)。本轮没有实际另存这个 ZIP，不能称为已完成独立备份。
- 发布结果由 GitHub Pages 部署 #37746160704 的 success 状态及正式音乐页 / MP3 的实际读取共同核验。

## 今后每次正式更新的固定流程

1. **先登记**：在 Issue/待办中用普通话写明“想改什么”“什么不能改”。
2. **先留恢复点**：从更新前 main 的当前提交创建一个新的 `backup/YYYY-MM-DD-简短说明` 分支，并在 Issue 或 PR 记下完整提交 SHA。
3. **只在单独工作区修改**：在开发分支上改；不要直接改 main。
4. **实际核查**：按任务检查相关页面、手机屏幕、跳转、诗歌阅读、音乐播放和资源链接；没做的检查必须写“尚未验证”。
5. **先审核再上线**：提供易懂的修改说明，站长确认后才合并 PR。
6. **记录结果**：先在原 PR 中记录日期、实际发布 SHA、Pages 部署结果、发布前恢复点与未测项目；重要里程碑定期汇总到 `CHANGELOG.md`，不为几行状态文字反复触发额外上线。
7. **独立保存**：重要发布后，站长可以把此版本 ZIP 下载到自己电脑或另一处私有网盘。AI 应给出直接的下载入口，不能假装已上传其他云盘。

## 如果网站更新坏了怎么办？

站长只需说：

> “我的 echyox.com 更新后出了问题。请先查看 CHANGELOG.md 和 BACKUP_AND_RECOVERY.md，找最近一个正常的恢复点，检查问题，帮我准备一个恢复方案。先给我说明会撤销哪些修改；未经我确认，不要正式恢复。”

接手的 AI 应当：
- 先核实线上问题、当前 main 与最近正常版本之间的区别；
- 判断能否只修复问题，而不是不分青红皂白撤销所有较新的作品内容；
- 在新分支准备修复或回退 PR，说明哪些近期改动会丢失；
- 等站长明确确认后再合并；随后核实线上、更新日志。

## 额外安全提示

- 初始备份与 GitHub 版本记录都位于**同一仓库**。这足以帮助解决大量误修改问题，但不能抵御账号失去访问权、仓库删除或整个 GitHub 服务故障。
- **每隔一段时间，将完整 ZIP 独立保存到自己的电脑或另一个可信的位置**，才算增加了一层真正独立的保障。
- 不要将账号密码、域名登录资料、私人未公开作品上传到公开仓库或公开 Issue。
- 早期检查曾显示 `main` 未强制保护，但**本次没有得到完整的 2026-10-10 保护配置核实结果**。约定 AI 通过 PR 修改不是 GitHub 强制权限控制；若要开启实际分支保护，需另外按 Issue #2 核对权限、计划与设置并征求作者同意。
- 多次 GitHub Pages 实际构建与部署已成功（最近为 #37969318494），但本次没有完整读取 `Settings → Pages` 管理界面的全部选项。下一次合并也需独立核对具体部署运行结果，不能据此承诺永远自动上线。
