# ECHYOX｜网站结构与文件定位

## 2026-11-16｜维护状态校准
V6 维护规范已由 [PR #51](https://github.com/Houyuxinx/houyuxin-site/pull/51) 正式合并并部署成功。2026-11-16 作者明确授权 [PR #52](https://github.com/Houyuxinx/houyuxin-site/pull/52) 完成必要收尾检查后发布；本记录写于合并前，实际合并与部署结果以该 PR 的发布评论及 GitHub Actions 为准。下文“候选／待审核／待确认”等旧措辞属于形成时的历史记录，不代表最新授权状态。
PR #52 的双语界面调整由 `language.js` 翻译层和 `becoming.html` 的联系链接实现，`theme.js` 更新英文读屏提示；静态页面均使用一致的缓存版本；不涉及 CSS 或媒体替换。

## V6 候选｜现行结构补录（2026-11-16）
发布状态集中见 START_HERE.md 与 CHANGELOG.md。PR #47 文档同步，#48 首页分享描述曾调整，#49 更新 entrance.js 的预测式文字避让及首页引用，#50 将十个内容 HTML 的 og:description / twitter:description 统一；各页 meta description、英文数据属性与旧 searching.html 保持原状。具体文件差异以原 PR 为准。
- 十个正式内容页、旧跳转、五部戏剧、五套试读共 53 张 WebP、20 张剧照、五份 PDF、五个 MP3（含作品概念曲）与旧预览工具仍按仓库文件树核实。路径存在不等于播放或浏览器验收通过。
- 回归测试覆盖入场文字、导航/前进后退、主题与语言保持、五部戏剧试读和剧照、诗歌年份/弹窗、音频与歌词、滚动边界、减弱动态效果、分享/搜索字段与统计配置、浏览器错误。Mac Safari、iPhone Safari 真机尚待验收；Chrome/Android 兼容性、性能和恢复演练待测。测试避免污染正式 Umami 统计。
- 维护期不删除资源、不顺手重命名或重构。英文署名和新增公开邮箱尚待独立提案。

> 以下为此前维护原文，包含当时的版本快照和待办；保留用于追溯，与上方 V6 已核实状态冲突时，以 V6 说明及 GitHub 实时结果为准。

> 本文件只解释**现在网站的组成和到哪里修改**，不充当不断过期的“最新发布编号”。实时版本以 GitHub `main`、开放 PR 和 Actions 为准，完整发布历史看 `CHANGELOG.md`。

## 项目概况
- 正式网址：https://echyox.com；GitHub 仓库：`Houyuxinx/houyuxin-site`；正式分支：`main`。
- 静态网站，主要由 HTML、CSS、JavaScript 构成；根目录 `CNAME` 内容为 `echyox.com`。
- 主要作品栏目：戏剧 / 诗歌 / 音乐 / 寻找自己。网站原页面和媒体的版权、内容、是否公开由作者决定。
- 2026-11-15 补录核查基线：[PR #46](https://github.com/Houyuxinx/houyuxin-site/pull/46) 已合并，main 为 `738a3f512bc0b0c8953b24039a0f1a11eb8ff011`，[Pages #43681765660](https://github.com/Houyuxinx/houyuxin-site/actions/runs/43681765660) completed/success；PR #43—#46 均已正式发布，详见 CHANGELOG.md 续记表；实际状态仍须实时核对。
- 仓库侧没有观察到自建的 `.github/workflows` 自动测试配置；GitHub Pages 的系统构建成功**不代表网站交互实测通过**。Settings → Pages 的完整后台发布配置仍应按需核查。 2026-11-15 复核：公开接口读取 Pages 后台配置仍返回 404，[Issue #2](https://github.com/Houyuxinx/houyuxin-site/issues/2) 该项保持未完成。

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
| 域名 | `CNAME` | 自定义域名记录；正式域名继续 `https://echyox.com`，不切换至 `www`（站长 2026-11-15 确认） |

## 不能误改的已确认行为
- 默认首先进入由**90 条**剧本、诗歌、歌词精选短句组成的文学文字流动场，随后进入原四大栏目。中心文字保持呼吸区；旧抽象主视觉和圆形追光属早期设计，不可擅自恢复。
- 首次文学入场约 **2.35 秒**；栏目/作品/音乐列表与播放器的普通转场约 **1.4 秒**（0.6 秒淡出 + 0.8 秒渐显）。
- 四栏目顶部「回到来处」指向 `index.html#entry-revealed`，直接返回四栏目；点击站点作者名可主动重新观看入口。
- 手机上诗歌年份栏**必须能横向滑动**，不应改成不能滑动的静态年份网格。诗歌正文、日期及排序不得自行改写。
- 四首音乐进入播放页**不能自动开始播放，默认不启用单曲循环**；由访客自行使用按钮开启或关闭循环。此行为已于 2026-10-10 获作者明确确认，**不是待修复缺陷**。歌词保持居中，歌词栏独立上下滚动，原焦点与滚动条设计不变。
- **2026-11-15 静态审计快照**：136 个文件（11 HTML、12 CSS、11 JS、8 Markdown）；53 张 WebP、5 PDF、5 MP3、20 剧照；58 首诗、316 英文词条、74 拼音姓名。11 页共122种站内引用未发现缺失；不等于媒体全部播放或真机验证。 2026-11-15 补录：PR #45、#46 之后另新增分享图、robots.txt、sitemap.xml 与一个根目录验证文件；上述数字为审计当时快照，不代表当前文件总数。
- **2026-10-10 已完成的维护小修**：[PR #28](https://github.com/Houyuxinx/houyuxin-site/pull/28) 已将 `poetry.html` 的 CSS 查询版本更新为 `?v=20261010-width1`，将 `entrance.js` 关于入场文字数量的注释由 70 修正为 90，并更新 `tools/preview.py` 的重点检查提示。**仅为缓存标识、注释和提示变更，未更动 CSS、动画逻辑或播放器。**
- **可选而非故障（2026-11-15 更正）**：原列「多数页面没有独立描述元信息」一项已由 [PR #45](https://github.com/Houyuxinx/houyuxin-site/pull/45) 处理，十个内容页现已有分页双语描述与社交分享元信息，并新增 `robots.txt`、`sitemap.xml`；此项不再是待办。其余两项（《猛犸》一张 PNG 约 4.3 MiB；公开文件不能仅凭前端禁复制加以保密）仍未处理，先观察需求再决定是否改变。
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

## 新增模块（截至 2026-11-15，均为正式功能）
| 位置 | 核心文件 | 说明 |
|---|---|---|
| 双语 | language.js / language.css / BILINGUAL_REVIEW.md | ?lang=en；DOM 翻译和动态更新；英文题名、署名；中文文学主体保留 |
| 合作者 | shared-presence.css / 四部 work-*.html | 共同在场演职员名单、版本及诗性副标题 |
| 双主题 | theme.js / theme.css | 默认浅色，echyox-theme 记忆选择 |
| 图标 | favicon.svg / .ico / .png / favicon-192.png / 三个 apple-touch-icon PNG | 11页 head 引用，Safari 收藏已由作者确认 |
| 统计 | 十个内容 HTML 的 Umami script tag | 正式域名、查询及 hash 排除；旧 searching.html 不计入 |
| 移动布局 | shared.css / scroll-boundary.js / script-reader.css / language.css | iPhone 原生独立滚动、导航、试读按钮；需真机回归 |
| 站点发现 | `robots.txt` / `sitemap.xml` / 十页元信息与社交卡片 | [PR #45](https://github.com/Houyuxinx/houyuxin-site/pull/45) 发布；sitemap 收录十个正式内容页，不含旧 `searching.html` 与根目录验证文件 |

公开访问统计、API 凭据、个人访客数据不得加入公开仓库。作品资源路径存在不等于公开权限得到新授权。
