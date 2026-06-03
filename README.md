# Office Map Studio

Office Map Studio 是一个可本地运行、可打包部署的独立前端 Web 应用，用于创建和编辑 2.5D 等距虚拟办公室地图。新版视觉方向参考“虚拟办公室 + 员工状态 + 轻游戏化工作台”的产品体验，但不复刻任何第三方品牌、Logo、角色或素材；所有空间、家具、座位和员工存在感均通过 Konva / Canvas 图形绘制。

## 功能列表

- 默认演示地图：包含前台、开放办公区、会议室 A、茶水间、休息区、12 个座位和多种家具。
- 虚拟办公室工作台：柔和渐变背景、HUD 顶栏、组件托盘、沙盘画布和对象 Inspector。
- 查看模式 / 编辑模式切换：默认进入查看模式，编辑模式下支持新增、拖动、编辑和删除对象。
- 2.5D 沙盘地图：浅色等距网格、浮岛地板、空间厚度、悬浮标签、玩具化家具和小工位座位。
- 员工工作状态：座位支持 working、idle、meeting、away、focus、offline 等可视状态。
- 组件仓库：可新增空间、家具、座位模板，查看模式下只读，编辑模式下可投放。
- 对象 Inspector：可查看并编辑对象基础信息、位置尺寸、业务字段和工作状态。
- 搜索定位：支持搜索员工、部门、座位号、空间、家具、状态字段，点击结果会选中、居中定位并高亮。
- 本地保存：点击保存后布局写入 localStorage，刷新页面后自动恢复。
- 恢复默认：清空本地保存并重新加载演示地图。
- 导出 PNG：将当前 Konva 画布导出为 `office-map-studio.png`。

## 技术栈

- React
- TypeScript
- Vite
- Konva.js
- react-konva
- localStorage
- CSS

## 安装命令

安装依赖：

```bash
npm install
```

## 本地运行命令

本地开发：

```bash
npm run dev
```

## 构建命令

生产构建：

```bash
npm run build
```

## 构建后预览命令

预览构建产物：

```bash
npm run preview
```

## 打包结果

打包结果：

```text
dist/
```

`npm run build` 成功后会生成可部署的 `dist/` 目录，可以通过 Nginx、对象存储静态站点、CDN 或任意静态 Web 服务部署。

## 使用说明

- 默认进入查看模式。
- 切换到编辑模式后可以新增、拖动、编辑、删除对象。
- 左侧「办公室组件」是组件托盘，编辑模式下点击卡片即可投放到虚拟办公室中央。
- 中间画布是 2.5D 办公室沙盘，点击空间、家具或工位会在右侧显示对象 Inspector。
- 已占用座位会显示员工头像暗示、员工姓名和工作状态气泡。
- 点击保存后布局写入 localStorage。
- 刷新页面后会恢复上次保存的布局。
- 点击恢复默认会清空本地保存并重新加载演示地图。
- 搜索框可以搜索员工、部门、座位号、空间、家具、座位状态和工作状态。
- 点击搜索结果会定位并高亮地图对象。
- 点击导出图片可以下载当前地图 PNG。

## 数据保存说明

应用没有后端服务，也不依赖数据库。所有地图对象保存到浏览器 localStorage 中，键名为：

```text
office-map-studio.objects.v1
```

如果切换浏览器、清理站点数据或点击恢复默认，本地保存的布局会被清空或重置。

## 导出 PNG 说明

点击顶部工具栏的「导出图片」按钮后，应用会调用 Konva Stage 的 `toDataURL` 方法生成当前地图图片，并自动下载为：

```text
office-map-studio.png
```

## 部署说明

服务器部署通常执行：

```bash
npm install
npm run build
```

然后将以下目录作为静态站点根目录：

```text
dist/
```

Nginx SPA 示例：

```nginx
server {
    listen 80;
    server_name _;
    root /var/www/office-map-studio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 后续可扩展方向

- 网格吸附与对齐辅助线
- 对象复制 / 粘贴 / 多选
- 键盘快捷键
- 图层排序和锁定
- MiniMap 小地图
- 多地图管理
- 导入 / 导出 JSON
- Undo / Redo 历史记录
- 员工工作状态批量筛选
- AI Agent 任务状态看板
