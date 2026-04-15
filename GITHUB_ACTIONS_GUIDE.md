# GitHub Actions 自动化工作流指南

本指南介绍如何使用项目中的自动化工作流系统。

## 工作流概览

项目中有三个自动化工作流配置：

### 1. Auto Test and Validation (`auto-test.yml`)
- **触发条件**: 每次提交到任何分支时触发
- **功能**:
  - 验证 HTML 文件结构
  - 检查 CSS 文件语法
  - 验证 JavaScript 语法
  - 在 main 分支更新时部署到 GitHub Pages

### 2. Static Site Tests (`static-site-test.yml`)
- **触发条件**: 每次提交 + 每天定时运行
- **功能**:
  - HTML 代码规范检查 (使用 htmlhint)
  - CSS 代码规范检查 (使用 csslint)
  - 检测损坏链接
  - 可访问性测试
  - 站点可用性测试

### 3. CI/CD Pipeline (`ci.yml`)
- **触发条件**: 主分支推送、PR、手动触发
- **功能**: 原始 CI/CD 工作流

### 4. Deploy to GitHub Pages (`deploy-pages.yml`) - **新的专门部署工作流**
- **触发条件**: 推送到 main 分支时触发
- **功能**:
  - 将 [claw123](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123) 目录中的内容部署到 GitHub Pages
  - 专门用于部署 [index.html](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\index.html) 和相关资源

## 如何使用

### 每次提交后
1. 提交代码到任何分支
2. 自动触发 `auto-test.yml` 和 `static-site-test.yml`
3. 在 GitHub 仓库的 **Actions** 标签页查看执行状态

### 部署 [index.html](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\index.html) 到 GitHub Pages
1. 确保 [claw123](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123) 目录中包含 [index.html](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\index.html) 文件
2. 运行验证脚本: `validate-deployment.bat`
3. 提交更改到 `main` 分支
4. 自动触发 `deploy-pages.yml` 工作流
5. 访问 `https://你的用户名.github.io/仓库名` 查看部署结果

### 合并到主分支后
1. 推送或合并代码到 `main` 分支
2. 自动触发所有工作流并部署到 GitHub Pages
3. 访问 `https://你的用户名.github.io/仓库名` 查看部署结果

## 工作流状态监控

### 查看工作流状态
1. 进入 GitHub 仓库页面
2. 点击 **Actions** 标签页
3. 查看运行中的工作流

### 手动触发工作流
1. 在 Actions 页面选择相应工作流
2. 点击 "Run workflow" 按钮
3. 选择分支并运行

### 重新运行失败的工作流
1. 进入失败的工作流详情页面
2. 点击 "Re-run jobs" 按钮

## 工作流配置说明

### deploy-pages.yml (新的专门部署工作流)
```yaml
on:
  push:
    branches: [ main ]    # 仅在推送到 main 分支时触发
  workflow_dispatch:      # 允许手动触发
```

### auto-test.yml
```yaml
on:
  push:           # 每次推送触发
  pull_request:   # 每次PR触发
  workflow_dispatch:  # 允许手动触发
```

### static-site-test.yml
```yaml
on:
  push:           # 每次推送触发
  pull_request:   # 每次PR触发
  schedule:
    - cron: '0 2 * * *'  # 每天 UTC 时间 2 点运行
  workflow_dispatch:  # 允许手动触发
```

## 部署到 GitHub Pages 的步骤

### 1. 验证部署准备
运行验证脚本确保所有必需文件存在：
```
validate-deployment.bat
```

### 2. 提交更改
确保 [claw123](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123) 目录包含：
- [index.html](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\index.html) (主页文件)
- [script.js](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\script.js) (如果有)
- [styles.css](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\styles.css) (如果有)
- 其他资源文件

### 3. 推送更改
```bash
git add .
git commit -m "Deploy updated site"
git push origin main
```

### 4. 监控部署
- 查看 Actions 标签页中的 `Deploy to GitHub Pages` 工作流
- 等待工作流完成

### 5. 访问网站
部署完成后，访问 `https://你的用户名.github.io/仓库名`

## 常见问题解决

### 1. 工作流没有触发
- 检查是否有有效的提交（空提交不会触发）
- 确认分支名拼写正确
- 验证仓库权限

### 2. 工作流失败
- 检查 Actions 日志找出具体错误
- 常见错误包括：HTML 语法错误、CSS 语法错误、JS 语法错误
- 修复错误后重新推送

### 3. 部署失败
- 仅当 main 分支更新时才会部署
- 检查 [claw123](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123) 目录是否存在
- 确认 [index.html](file://c:\Users\milong\Desktop\新建文件夹\openclaw-daohang\claw123\index.html) 文件存在

### 4. 网站无法访问
- 检查 GitHub Pages 是否已在仓库设置中启用
- 确认 `deploy-pages.yml` 工作流成功完成
- 等待最多 10 分钟让 GitHub Pages 更新

## 自定义工作流

如需自定义工作流：

1. 修改 `.github/workflows/` 目录下的 YAML 文件
2. 根据需要调整触发条件
3. 添加或删除测试步骤

### 修改触发条件示例
```yaml
on:
  push:
    branches: [ main, develop ]  # 指定多个分支
  pull_request:
    branches: [ main ]
```

### 添加新的测试步骤
在 YAML 文件的 jobs 部分添加新的 step：

```yaml
- name: Custom Test
  run: |
    # 在这里添加你的测试命令
    echo "Running custom test..."
```

## 注意事项

- 工作流运行在 GitHub 的虚拟环境中，不是本地机器
- 部署仅在 main 分支更新时发生
- 工作流文件必须位于 `.github/workflows/` 目录下
- YAML 语法必须正确，否则工作流不会运行
- GitHub Pages 需要在仓库设置中启用（Settings → Pages）

---

通过这套自动化系统，你的项目实现了：
- ✅ 每次提交自动验证
- ✅ 代码质量保证
- ✅ 自动部署
- ✅ 定期健康检查
- ✅ 可访问性验证