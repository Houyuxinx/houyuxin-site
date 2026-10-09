# ECHYOX｜网站结构与文件定位

> 本文件只解释**现在网站的组成和到哪里修改**，不充当不断过期的“最新发布编号”。实时版本以 GitHub `main`、开放 PR 和 Actions 为准，完整发布历史看 `CHANGELOG.md`。

## 项目概况
- 正式网址：https://echyox.com；GitHub 仓库：`Houyuxinx/houyuxin-site`；正式分支：`main`。
- 静态网站，主要由 HTML、CSS、JavaScript 构成；根目录 `CNAME` 内容为 `echyox.com`。
- 主要作品栏目：戏剧 / 诗歌 / 音乐 / 寻找自己。网站原页面和媒体的版权、内容、是否公开由作者决定。
- **当前核实快照（2026-10-10）**：PR #28 已正式发布，`main` 为 `33109612fbe40525ed60fb0781a9a9e13b0bb7d0`，Pages [#37977744036](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37977744036) `success`。新任务要重新核实版本；构建成功不代替 Safari 实机验收。
- 仓库侧没有观察到自建的 `.github/workflows` 自动测试配置；GitHub Pages 的系统构建成功**不代表网站交互实测通过**。Settings → Pages 的完整后台发布配置仍应按需核查。

## 页面与文件对应关系

| 位置 | 核心文件 | 说明 |
| --- | --- | --- |
| 文字入场、四栏目入口 | `index.html`、`home.css`、`entrance.js` | 90 条文字组成的全屏流动场；中心有作者名与可点击的进入入口 |
| 戏剧目录 | `theatre.html`、`theatre.css` | 戏剧作品索引 |
| 戏剧作品详情 | `work-*.html`、`work.css` | 五个作品页面；对应剧照与剧本试读 |
| 剧照展示 | `gallery.css`、`gallery.js` | 剧目中使用的剧照浏览交互 |
| 剧本试读阅读 | `script-reader.css`、`script-reader.js` | 试读阅读功能；不得擅自公开完整私人剧本 |
| 诗歌年份与弹窗 | `poetry.html`、`poetry.css`、`poetry.js` | 年份目录、诗歌正文和阅读操作；PR #26 起诗歌外层宽度继承 `shared.css` 的 `.page` 规则，与戏剧、音乐一致 |
| 音乐 | `music.html`、`music.css`、`music.js` | 曲目、歌词、音频及局部转场 |
| 寻找自己 | `becoming.html`、`searching.css`；旧网址由 `searching.html` 自动跳转 | BECOMING：关于我、创作中关注的部分问题、经过（2026—2019 主要创作及演出活动倒序时间轴）、此刻、联系。主页第四卡片文案见 `index.html` |
| 全站通用 | `shared.css`、`site.js`、`navigation.js` | 导航、视觉基线、暗场转场及共用交互 |
| 静态媒体 / 试读 | `assets/`、`docs/` | 公开图片、MP3 与供网页读取的试读 PDF |
| 域名 | `CNAME` | 自定义域名记录 |

## 不能误改的已确认行为
- 默认首先进入由**90 条**剧本、诗歌、歌词精选短句组成的文学文字流动场，随后进入原四大栏目。中心文字保持呼吸区；旧抽象主视觉和圆形追光属早期设计，不可擅自恢复。
- 首次文学入场约 **2.35 秒**；栏目/作品/音乐列表与播放器的普通转场约 **1.4 秒**（0.6 秒淡出 + 0.8 秒渐显）。
- 四栏目顶部「回到来处」指向 `index.html#entry-revealed`，直接返回四栏目；点击站点作者名可主动重新观看入口。
- 手机上诗歌年份栏**必须能横向滑动**，不应改成不能滑动的静态年份网格。诗歌正文、日期及排序不得自行改写。
- 四首音乐进入播放页**不能自动开始播放，默认不启用单曲循环**；由访客自行使用按钮开启或关闭循环。此行为已于 2026-10-10 获作者明确确认，**不是待修复缺陷**。歌词保持居中，歌词栏独立上下滚动，原焦点与滚动条设计不变。
- **本次静态审计结果（2026-10-10）**：仓库共 123 个文件，其中 11 个 HTML、9 个 CSS、9 个 JavaScript、7 份 Markdown；五部戏剧试读共 53 张 WebP 图片，另有五份试读 PDF、五个 MP3（音乐栏目四首及戏剧作品内一首）和 58 首诗歌。相关文件路径与引用匹配；这不能替代浏览器实测，也不能自动证明所有资源的公开授权。
- **2026-10-10 已完成的维护小修**：[PR #28](https://github.com/Houyuxinx/houyuxin-site/pull/28) 已将 `poetry.html` 的 CSS 查询版本更新为 `?v=20261010-width1`，将 `entrance.js` 关于入场文字数量的注释由 70 修正为 90，并更新 `tools/preview.py` 的重点检查提示。**仅为缓存标识、注释和提示变更，未更动 CSS、动画逻辑或播放器。**
- **可选而非故障**：多数页面没有独立描述元信息；《猛犸》一张 PNG 约 4.3 MiB；公开文件不能仅凭前端禁复制加以保密。先观察需求再决定是否改变。
- `music.html` 里有 `window.TRACKS` 曲目/歌词数据；`poetry.html` 中有大量诗歌正文。修改前应逐字核对数据并保护换行、日期、署名。
- `site.js`、`shared.css` 存在防选取、复制、打印等前端限制，但**无法彻底阻止公开文字或媒体被获取**。完整私人剧本、密码和私密素材不得上传公开仓库。
- `shared.css`、`site.js`、`navigation.js` 可能影响全站。任何小范围修改，原则上避免顺手改它们；必须改时说明全站影响并扩大核对范围。

## 哪些说明放在哪
- 当前任务与接手规则：`START_HERE.md`、`AGENTS.md`。
- 设计边界：`PROJECT_VISION.md`。
- 历次发布、当时“待审核”的迭代记录、未完成事项：`CHANGELOG.md`。
- 备份分支的准确地址、最新可恢复版本：`BACKUP_AND_RECOVERY.md`。
- V13 初期设计历史：`README.md`。**历史版本不应覆盖当前站点。**

## 暂不执行的可选改进
网站作品与样式当前仍部分混放在 HTML 中。未来可在作者批准后研究更容易新增诗歌/音乐的管理方法；**不能未经同意重构网站或修改作品正文**。

## 「寻找自己」已完成的正式状态（2026-10-10）
- 2026-10-10 前后经 [PR #21](https://github.com/Houyuxinx/houyuxin-site/pull/21)、[#24](https://github.com/Houyuxinx/houyuxin-site/pull/24)、[#25](https://github.com/Houyuxinx/houyuxin-site/pull/25) 已发布 BECOMING 重构、作者选定的四栏目标语、页面网址与浏览器标题。
- 当前正式页面是 `becoming.html`，原 `searching.html` 仅用于兼容自动跳转；页面仍引入原 `searching.css`，**不要为追求文件名整齐而贸然重命名 CSS**。
- 当前页面保留「关于我 / 创作中关注的部分问题 / 经过 / 此刻 / 联系」以及 2026→2019 年倒序时间线；正文只保留邮箱链接，全站统一顶部导航不受此限制。
- 此前草稿期「待审核/未上线」的逐轮说明已归档在 `CHANGELOG.md`，不应再被解释为现存待办。
