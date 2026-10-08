# ECHYOX｜网站结构与文件定位

> 本文件只解释**现在网站的组成和到哪里修改**，不充当不断过期的“最新发布编号”。实时版本以 GitHub `main`、开放 PR 和 Actions 为准，完整发布历史看 `CHANGELOG.md`。

## 项目概况
- 正式网址：https://echyox.com；GitHub 仓库：`Houyuxinx/houyuxin-site`；正式分支：`main`。
- 静态网站，主要由 HTML、CSS、JavaScript 构成；根目录 `CNAME` 内容为 `echyox.com`。
- 主要作品栏目：戏剧 / 诗歌 / 音乐 / 寻找自己。网站原页面和媒体的版权、内容、是否公开由作者决定。
- **2026-10-08 核实**：最近一次正式合并为 [PR #13](https://github.com/Houyuxinx/houyuxin-site/pull/13)，当时 `main` 提交 `87635471316c80e4e4b55ab7e8d2d258cda08185`，GitHub Pages [部署 #37804092035](https://github.com/Houyuxinx/houyuxin-site/actions/runs/37804092035) 成功。这是**历史核实记录**，新任务要重新查 main；工具没有对最终线上版做真正的手机 Safari 点击验收。
- 仓库侧没有观察到自建的 `.github/workflows` 自动测试配置；GitHub Pages 的系统构建成功**不代表网站交互实测通过**。Settings → Pages 的完整后台发布配置仍应按需核查。

## 页面与文件对应关系

| 位置 | 核心文件 | 说明 |
| --- | --- | --- |
| 文字入场、四栏目入口 | `index.html`、`home.css`、`entrance.js` | 90 条文字组成的全屏流动场；中心有作者名与可点击的进入入口 |
| 戏剧目录 | `theatre.html`、`theatre.css` | 戏剧作品索引 |
| 戏剧作品详情 | `work-*.html`、`work.css` | 五个作品页面；对应剧照与剧本试读 |
| 剧照展示 | `gallery.css`、`gallery.js` | 剧目中使用的剧照浏览交互 |
| 剧本试读阅读 | `script-reader.css`、`script-reader.js` | 试读阅读功能；不得擅自公开完整私人剧本 |
| 诗歌年份与弹窗 | `poetry.html`、`poetry.css`、`poetry.js` | 年份目录、诗歌正文和阅读操作 |
| 音乐 | `music.html`、`music.css`、`music.js` | 曲目、歌词、音频及局部转场 |
| 寻找自己 | `searching.html`、`searching.css` | 个人介绍及创作状态 |
| 全站通用 | `shared.css`、`site.js`、`navigation.js` | 导航、视觉基线、暗场转场及共用交互 |
| 静态媒体 / 试读 | `assets/`、`docs/` | 公开图片、MP3 与供网页读取的试读 PDF |
| 域名 | `CNAME` | 自定义域名记录 |

## 不能误改的已确认行为
- 默认首先进入由**90 条**剧本、诗歌、歌词精选短句组成的文学文字流动场，随后进入原四大栏目。中心文字保持呼吸区；旧抽象主视觉和圆形追光属早期设计，不可擅自恢复。
- 首次文学入场约 **2.35 秒**；栏目/作品/音乐列表与播放器的普通转场约 **1.4 秒**（0.6 秒淡出 + 0.8 秒渐显）。
- 四栏目顶部「回到来处」指向 `index.html#entry-revealed`，直接返回四栏目；点击站点作者名可主动重新观看入口。
- 手机上诗歌年份栏**必须能横向滑动**，不应改成不能滑动的静态年份网格。诗歌正文、日期及排序不得自行改写。
- 四首音乐进入播放页**不能自动开始播放**；歌词保留水平居中、歌词栏独立上下滚动与细滚动条按需显示，点击歌词不出现矩形外框。无歌词器乐提示保持居中。
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
