@echo off
setlocal

echo ========================================
echo 部署前验证脚本
echo ========================================

echo 检查项目结构...
if not exist claw123 (
    echo ❌ 错误: claw123 目录不存在
    pause
    exit /b 1
)

echo ✅ claw123 目录存在

echo.
echo 检查 index.html 文件...
if not exist claw123\index.html (
    echo ❌ 错误: claw123\index.html 文件不存在
    pause
    exit /b 1
)

echo ✅ index.html 文件存在

echo.
echo 检查其他关键文件...
if exist claw123\script.js (
    echo ✅ script.js 存在
) else (
    echo ⚠️  script.js 不存在
)

if exist claw123\styles.css (
    echo ✅ styles.css 存在
) else (
    echo ⚠️  styles.css 不存在
)

echo.
echo 验证 HTML 文件语法...
for %%f in (claw123\*.html) do (
    echo 检查 %%f ...
    findstr /C:"<!DOCTYPE html" "%%f" >nul
    if errorlevel 1 (
        echo ⚠️  %%f 可能缺少 DOCTYPE 声明
    ) else (
        echo ✅ %%f 包含 DOCTYPE 声明
    )
)

echo.
echo ========================================
echo 验证完成！可以安全地推送以触发部署。
echo GitHub Pages 将从 claw123 目录部署。
echo ========================================

pause