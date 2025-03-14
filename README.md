
# 四季风景 & 贪吃蛇
![项目横幅](https://github.com/DivineBrightness/test-Greedy-Snake/blob/main/image/project_banner.png)  
*一个展示像素艺术四季风景并集成贪吃蛇小游戏的 Web 项目*

---

## 项目简介

“四季风景 & 贪吃蛇”是一个结合像素艺术与互动游戏的轻量级 Web 应用。用户可以通过按钮切换春、夏、秋、冬四季的像素艺术场景，并随时进入经典的贪吃蛇游戏，享受简单而有趣的体验。项目采用 HTML5、CSS 和 JavaScript 开发，支持桌面端和移动端。

## 功能特性

- **四季风景**：展示春、夏、秋、冬的像素艺术场景，支持动态切换。
- **贪吃蛇游戏**：
  - 使用键盘（方向键/WASD）或移动端虚拟按键控制。
  - 实时分数记录，支持本地存储最高分。
- **响应式设计**：适配桌面端和移动端，优化触控体验。

## 安装与运行

### 前提条件
- 任意现代浏览器（Chrome、Firefox、Safari 等）。

### 步骤
1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/DivineBrightness/test-Greedy-Snake.git
   ```
2. 进入项目目录：
   ```bash
   cd <你的仓库名>
   ```
3. 直接在浏览器中打开 `index.html` 文件：
   - 在文件资源管理器中双击 `index.html`，或
   - 使用命令行启动本地服务器（推荐）：
     ```bash
     python -m http.server 8000  # Python 3
     ```
     然后访问 `http://localhost:8000`。

无需额外依赖，打开即可运行！

## 使用方法

1. **切换季节**：点击页面中的“春季”、“夏季”、“秋季”、“冬季”按钮，欣赏不同的像素艺术风景。
2. **进入游戏**：点击“进入贪吃蛇游戏”按钮，开始游戏。
3. **游戏控制**：
   - **桌面端**：使用方向键（↑↓←→）或 WASD 控制蛇的移动，空格键暂停/继续。
   - **移动端**：使用屏幕上的虚拟按键（十字形布局）操作。
4. **返回风景**：游戏中点击“返回风景”按钮，回到四季展示页面。

## 屏幕截图

- 四季风景展示：  
  ![春季截图](https://github.com/DivineBrightness/test-Greedy-Snake/blob/main/image/spring.png)  
- 贪吃蛇游戏：  
  ![游戏截图](https://github.com/DivineBrightness/test-Greedy-Snake/blob/main/image/snake.png)

## 贡献指南

欢迎为项目贡献代码或提出建议！请按照以下步骤操作：
1. Fork 本仓库。
2. 创建你的特性分支：
   ```bash
   git checkout -b feature/你的功能
   ```
3. 提交更改：
   ```bash
   git commit -m "添加新功能：描述"
   ```
4. 推送到远程分支：
   ```bash
   git push origin feature/你的功能
   ```
5. 创建 Pull Request。

如有问题或建议，请提交 [Issue](https://github.com/DivineBrightness/test-Greedy-Snake/issues)。

## 更新日志

### 版本 1.1.0 - 2025年3月14日
- **优化**：
  - 移动端贪吃蛇虚拟按键布局调整为十字形，提升操作直观性和舒适度。
  - 增大按钮尺寸（50px -> 60px）及间距，优化触控体验。
- **调整**：
  - 重构 HTML `.mobile-controls` 结构，新增 `.control-row` 分行布局。
  - 更新 CSS 样式，支持新按键布局。

### 版本 1.0.0 - 2025年3月1日
- **新增**：
  - 初始版本，包含四季像素艺术展示（春、夏、秋、冬）。
  - 集成贪吃蛇游戏，支持键盘和移动端控制。
  - 添加分数记录及本地存储最高分功能。

*后续更新将记录在此处，敬请关注！*

## 许可证

本项目采用 [MIT 许可证](LICENSE) 开源，欢迎自由使用和修改。

## 联系方式

- **开发者**：divine
- **GitHub**：[@你的用户名](https://github.com/DivineBrightness)

