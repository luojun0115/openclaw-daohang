# GitHub 自动化方案指南

本指南将帮助你设置完整的 GitHub 自动化工作流，包括：
- 仓库创建和初始化
- 本地开发和提交
- 自动测试
- 自动部署到 GitHub Pages

## 第一步：创建 GitHub 仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 **+** 号，选择 **New repository**
3. 填写仓库信息：
   - Repository name: `openclaw-daohang`（或你喜欢的名字）
   - Description: 可选描述
   - **不要**勾选 "Initialize this repository with a README"
   - **不要**添加 .gitignore 或 LICENSE（我们已经配置好了）
4. 点击 **Create repository**

## 第二步：本地初始化 Git 仓库

在你的项目根目录（`c:\Users\milong\Desktop\新建文件夹\openclaw-daohang`）执行以下命令：

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "feat: initial commit with claw123 project"

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/luojun0115/openclaw-daohang.git

# 推送到 GitHub（这会触发自动工作流）
git push -u origin main
```

## 第三步：启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 **Settings** 选项卡
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分：
   - Branch: 选择 `gh-pages`
   - Folder: 选择 `/ (root)`
4. 点击 **Save**

> **注意**: 第一次推送后，GitHub Actions 会自动创建 `gh-pages` 分支并部署你的网站。

## 第四步：验证自动化工作流

### 自动测试触发条件：
- ✅ **Push 到 main 分支**：触发完整 CI/CD（测试 + 部署）
- ✅ **Pull Request**：只触发测试，不部署
- ✅ **手动触发**：在 Actions 页面可以手动运行

### 工作流包含的检查：
1. **HTML 文件验证**：检查基本结构和 DOCTYPE
2. **CSS 文件验证**：确保文件存在且非空
3. **JavaScript 语法检查**：使用 Node.js 验证语法正确性
4. **自动部署**：成功通过测试后自动部署到 GitHub Pages

## 第五步：日常开发流程

### 本地开发：
```bash
# 1. 创建新分支（可选但推荐）
git checkout -b feature/new-feature

# 2. 进行开发修改
# 编辑你的 HTML/CSS/JS 文件...

# 3. 提交更改
git add .
git commit -m "feat: add new navigation feature"

# 4. 推送到 GitHub
git push origin feature/new-feature
```

### 创建 Pull Request（推荐）：
1. 在 GitHub 上创建 Pull Request 从你的功能分支到 main
2. 自动测试会运行并显示结果
3. 合并 PR 后自动部署到生产环境

### 直接推送（简单项目）：
```bash
# 直接推送到 main 分支（会自动测试和部署）
git checkout main
git pull origin main  # 确保是最新的
git add .
git commit -m "fix: resolve responsive issue"
git push origin main
```

## 监控和调试

### 查看工作流状态：
- 访问仓库的 **Actions** 选项卡
- 点击具体的 workflow run 查看详细日志
- 失败的步骤会显示错误信息

### 手动重新运行：
- 在 Actions 页面，点击失败的 workflow
- 点击右上角的 **Re-run all jobs**

## 高级配置选项

### 如果你需要添加更多测试：

1. **创建 `package.json`**（如果需要 npm 脚本）：
```json
{
  "name": "openclaw-daohang",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"No tests configured\"",
    "lint": "eslint claw123/script.js"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}
```

2. **添加 ESLint 配置**（`.eslintrc.json`）：
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {}
}
```

### 自定义部署路径：
如果你想部署到子路径而不是根路径，修改 `.github/workflows/ci.yml` 中的 `path` 参数：

```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v2
  with:
    path: './claw123'  # 改为你想要的路径
```

## 故障排除

### 常见问题：

1. **"Remote origin already exists"**
   ```bash
   git remote remove origin
   git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
   ```

2. **Push 被拒绝**
   ```bash
   git pull origin main --rebase
   git push origin main
   ```

3. **GitHub Pages 没有更新**
   - 检查 Actions 是否成功完成
   - 等待几分钟，GitHub Pages 可能有缓存
   - 在 Settings > Pages 中检查部署状态

### 联系支持：
如果遇到无法解决的问题，请提供：
- 完整的错误日志
- 你的 GitHub 仓库链接
- 具体的操作步骤

---

🎉 **恭喜！** 你的项目现在具备了完整的自动化能力：
- ✨ 自动代码测试
- 🚀 自动部署到 GitHub Pages  
- 🔍 实时状态监控
- 📊 开发流程标准化

你的网站将在 `https://YOUR_USERNAME.github.io/openclaw-daohang/` 访问（可能需要等待几分钟首次部署）。