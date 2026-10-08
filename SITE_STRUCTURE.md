# ECHYOX｜网站结构说明（2026-10-08）

## 一眼理解
- 正式网址：`https://echyox.com`
- GitHub 仓库：`Houyuxinx/houyuxin-site`
- 主分支：`main`。
- 技术形式：以 **HTML、CSS、JavaScript** 组成的静态网站；现有文件中未见必须运行的后端应用。
- 根目录 `CNAME` 的内容是 `echyox.com`。
- **注意：尚未核查仓库 Settings → Pages，不能仅凭 CNAME 断定实际部署来源或发布速度。**

## 修改页面时去哪找文件

| 网站部分 | 主要页面或文件 | 作用 |
| --- | --- | --- |
| 首页 | `index.html`、`home.css` | 四大栏目的入口 |
| 戏剧列表 | `theatre.html`、`theatre.css` | 剧目目录 |
| 剧目详情 | `work-*.html`、`work.css` | 各剧目的资料与相关内容 |
| 诗歌 | `poetry.html`、`poetry.css`、`poetry.js` | 诗歌、年份目录、阅读弹窗 |
| 音乐 | `music.html`、`music.css`、`music.js` | 曲目列表、播放、歌词 |
| 寻找自己 | `searching.html`、`searching.css` | 个人介绍等 |
| 全站公共样式 | `shared.css` | 色彩、字体、导航、舞台光圈等 |
| 全站交互 | `site.js`、`navigation.js` | 导航、动效、音频附加控制 |
| 资源 | `assets/` | 图片、音频等素材 |
| 剧本试读 | `docs/` | 可供网页访问的 PDF 文件 |
| 域名 | `CNAME` | 自定义域名绑定记录 |

## 维护时的重要技术事实
1. `poetry.html` 当前含大量直接写在 HTML 中的诗歌正文；新增作品要特别小心顺序、日期和阅读功能，不能只改可见标题。
2. `music.html` 当前包含 `window.TRACKS` 曲目数据及歌词，音频使用 `assets/audio/` 中的文件；列表和播放数据应保持一致。
3. `site.js` 和 `shared.css` 目前有禁止选取、复制和打印等限制。但这些前端限制并不能保护已公开的源码或媒体文件，需要把是否继续保留作为单独的作者决策。
4. 更改 `shared.css`、`site.js` 或 `navigation.js` 可能影响全站；优先避免在单页任务中修改它们。
5. 现有根目录没有观察到 `.github/workflows`，也未观察到一套已明确维护的自动测试配置。不能声称“自动测试通过”，除非确实执行过。
6. 不要把完整未公开剧本、密码、密钥、私人信息提交到公开仓库。

## 历史版本与备份
- `CHANGELOG.md` 是给人看的长期更新日志。
- `BACKUP_AND_RECOVERY.md` 是恢复旧版的说明和恢复点索引。
- `backup/2026-10-08-before-handover` 保存 2026-10-08 整理文档之前的 main 快照。

## 上线前需要确认的事项
- GitHub 仓库 `Settings → Pages` 实际发布源；
- 自定义域名是否仍正确；
- 新版是否可在电脑与手机打开；
- 四大栏目、剧目详情、诗歌阅读、音乐播放、PDF 是否正常；
- 如上线后出现异常，如何定位并回退到上一版本。

## 一项未来可选优化（不是这次要做的）
逐步把作品内容与页面样式分开管理，让新添诗歌和音乐更容易，减少误改页面的机会。**在未取得作者确认前，不要大规模改造网站架构。**
