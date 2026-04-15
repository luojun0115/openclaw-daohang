@echo off
setlocal

echo ========================================
echo Git 推送错误修复脚本
echo ========================================

echo 正在检查 Git 状态...
git status

echo.
echo 尝试方法一：拉取并重新推送
echo.

git pull --rebase origin main

if %errorlevel% equ 0 (
    echo 拉取成功，正在推送...
    git push -u origin main
    
    if %errorlevel% equ 0 (
        echo.
        echo ✅ 修复成功！推送完成。
        goto :success
    )
)

echo.
echo 方法一失败，尝试方法二：强制推送
echo 警告：这将覆盖远程仓库的内容！
echo.

choice /c YN /m "是否继续强制推送？"
if errorlevel 2 goto :cancel

git push -u origin main --force

if %errorlevel% equ 0 (
    echo.
    echo ✅ 强制推送成功！
    goto :success
) else (
    echo.
    echo ❌ 所有方法都失败了，请手动检查问题。
    goto :failed
)

:success
echo.
echo ========================================
echo 修复完成！现在你的自动化工作流应该正常运行了。
echo 访问 GitHub Actions 查看工作流状态。
echo ========================================
pause
exit /b 0

:cancel
echo.
echo 已取消操作。
pause
exit /b 1

:failed
echo.
echo 请尝试以下手动步骤：
echo 1. git fetch origin
echo 2. git merge origin/main
echo 3. 解决任何合并冲突
echo 4. git push -u origin main
pause
exit /b 1