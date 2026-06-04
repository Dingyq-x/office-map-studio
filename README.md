# Office Map Studio

Office Map Studio 是一个可本地运行、可打包部署的独立前端 Web 应用，用于创建和编辑 Low Poly 风格虚拟办公室。当前版本将冲突中的 WebGL/Three.js 分支合并回轻量 SVG 渲染方案：办公室空间、家具、工位和员工状态均由内联 SVG 与 CSS 绘制，不依赖后端、数据库、外部图片素材或第三方 3D 模型。

新版视觉方向参考“虚拟办公室 + 员工状态 + 轻游戏化办公空间 + 温和科技办公助手”的产品体验，但不复刻任何第三方品牌、Logo、角色或具体素材。

## 功能列表

- Low Poly 风格虚拟办公室：使用 React + SVG 渲染可交互 2.5D 沙盘。
- 默认演示地图：包含前台、开放办公区、会议室 A、茶水间、休息区、12 个座位和多种家具。
- 空间分区：空间区域以菱形地板块和侧边阴影呈现，包含标签和选中 / 搜索高亮。
- 小工位：座位由桌面、椅子、座位编号、状态颜色和员工状态点组成。
- 员工状态：已占用座位显示人员标识、工作状态点与状态气泡。
- 玩具家具：会议桌、沙发、绿植、打印机、门等均用内联 SVG 图形组合绘制。
- 查看模式 / 编辑模式切换：默认进入查看模式，编辑模式下支持拖拽、新增、编辑和删除对象。
- 搜索定位：支持搜索员工、部门、座位号、空间、家具、座位状态和工作状态，点击结果会选中、定位并高亮。
- 本地保存：点击保存后布局写入 localStorage，刷新页面后自动恢复。
- 恢复默认：清空本地保存并重新加载演示地图。
- 导出图片：通过序列化当前 SVG 沙盘导出 `office-map-studio.svg`。

## 技术栈

- React
- TypeScript
- Vite
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
- 查看模式下可以点击空间、家具或工位查看详情，但不能拖拽对象。
- 切换到编辑模式后，可以在沙盘上拖拽对象，位置会回写到 MapObject 的 x/y。
- 左侧「办公室组件」是组件托盘，编辑模式下点击卡片即可投放到办公室中央。
- 右侧 Floating Object Inspector 可编辑 label、颜色、位置尺寸、空间类型、家具类型、座位状态、工作状态、员工姓名和部门。
- 已占用座位会显示人员标识、状态点、员工姓名和工作状态气泡。
- 点击保存后布局写入 localStorage。
- 刷新页面后会恢复上次保存的布局。
- 点击恢复默认会清空本地保存并重新加载演示地图。
- 搜索框可以搜索员工、部门、座位号、空间、家具、座位状态和工作状态。
- 点击搜索结果会让画布定位到对象附近，并显示黄色高亮光圈。
- 点击导出图片可以下载当前 SVG 沙盘图片。

## 数据保存说明

应用没有后端服务，也不依赖数据库。所有地图对象保存到浏览器 localStorage 中，键名为：

```text
office-map-studio.objects.v1
```

如果切换浏览器、清理站点数据或点击恢复默认，本地保存的布局会被清空或重置。

## 导出图片说明

当前版本不再依赖 Konva Stage 或 WebGL canvas。画布使用内联 SVG：

```tsx
<svg viewBox="0 0 1120 660">...</svg>
```

导出时序列化当前 SVG：

```ts
new XMLSerializer().serializeToString(svgElement)
```

下载文件名为：

```text
office-map-studio.svg
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

- 更完整的网格吸附与对齐辅助线
- 多选、复制 / 粘贴、撤销 / 重做
- 键盘快捷键
- 图层排序和对象锁定
- MiniMap 小地图
- 多楼层 / 多办公室管理
- 导入 / 导出 JSON
- 员工工作状态筛选和团队热力图
- AI Agent 任务状态看板
