# 竞赛指南

纯静态网站，包含 ICPC 算法指南和数模罗盘，共用侧边导航。无需构建、后端或 API 密钥。

- ICPC：知识点筛选、掌握标准、前置知识、练习与资料链接、部分 GNU++17 示例、学习路线、学习记录与 JSON 导入导出。
- 数模：模型选型、模型图鉴、横向比较、学习路线。
- 学习记录保存在当前浏览器的 localStorage；两个模块使用独立存储键。
- 原始清单中的个人进度和备注未包含在公开源码中。

GitHub Pages 直接发布仓库根目录，保留 `.nojekyll` 与 `CNAME`。开发目录的 `dist/` 内容即仓库根目录的发布文件，`scripts/` 为验证脚本。

验证：`node scripts/check-icpc.cjs`、`node scripts/check-models.cjs`、`node scripts/check-snippets.cjs`（需 g++）。脚本在开发目录会读取 `dist/`，在发布仓库中会读取根目录。
