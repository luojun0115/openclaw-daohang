# 部署检查清单

按照以下步骤确保您的网站正确部署到 GitHub Pages。

## 步骤 1: 确认文件结构

确保您的仓库包含以下结构：
```
├── claw123/
│   ├── index.html          # 主页文件
│   ├── script.js           # JavaScript 文件
│   ├── styles.css          # CSS 文件
│   └── ...                 # 其他文件
└── .github/
    └── workflows/
        ├── static.yml      # 部署工作流
        ├── auto-test.yml   # 自动测试
        └── static-site-test.yml  # 静态站点测试
```

## 步骤 2: 提交更改

将所有更改提交到 main 分支：

```bash
git add .
git commit -m "Fix deployment configuration"
git push origin main
```

## 步骤 3: 检查 GitHub Actions

1. 前往 GitHub 仓库页面
2. 点击 **Actions** 标签页
3. 确认 **Deploy static content to Pages** 工作流正在运行或已完成
4. 确保工作流没有错误

## 步骤 4: 检查 GitHub Pages 设置

1. 前往 GitHub 仓库页面
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 确认 Source 设置为 **GitHub Actions**

## 步骤 5: 等待部署完成

1. 部署过程通常需要 1-5 分钟
2. 在 Actions 标签页中查看工作流状态
3. 成功后，页面 URL 会显示在工作流详情中

## 步骤 6: 访问您的网站

部署成功后，访问：`https://luojun0115.github.io/openclaw-daohang/`

## 故障排除

### 如果仍然显示 404：

1. **检查工作流状态**：
   - 确保 **Deploy static content to Pages** 工作流成功完成
   - 检查是否有错误消息

2. **确认 [index.html](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\index.html) 存在于 [claw123](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123) 目录中**：
   ```bash
   ls -la claw123/
   ```

3. **手动触发工作流**：
   - 前往 Actions 标签页
   - 选择 "Deploy static content to Pages" 工作流
   - 点击 "Run workflow" 按钮
   - 选择 main 分支并运行

### 如果工作流失败：

1. 检查工作流日志中的错误消息
2. 确保 [claw123](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123) 目录中包含所有必要的文件
3. 验证 HTML 文件语法是否正确

### 验证脚本

您可以运行以下命令验证您的项目结构：

```bash
# 检查 claw123 目录
ls -la claw123/

# 检查是否有 index.html
cat claw123/index.html | head -10

# 检查工作流文件
ls -la .github/workflows/
```

## 重要提醒

- 部署到 GitHub Pages 只会在 **main** 分支上有更改时触发
- 确保 [index.html](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\index.html) 存在于 [claw123](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123) 目录中
- 部署后最多可能需要 10 分钟才能生效