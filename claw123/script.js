// PPT式翻页导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有分类区域
    const sections = document.querySelectorAll('.category-section');
    const navDots = document.querySelectorAll('.nav-dot');
    const navUp = document.getElementById('navUp');
    const navDown = document.getElementById('navDown');
    const sectionIndicator = document.getElementById('sectionIndicator');
    const backToTop = document.getElementById('backToTop');
    
    let currentSection = 0;
    let isScrolling = false;
    const sectionNames = Array.from(sections).map(s => s.querySelector('.category-title').textContent);
    
    // 更新导航状态
    function updateNavigation(index) {
        if (index < 0 || index >= sections.length) return;
        
        currentSection = index;
        
        // 更新圆点状态
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // 更新箭头按钮状态
        if (navUp) navUp.disabled = index === 0;
        if (navDown) navDown.disabled = index === sections.length - 1;
        
        // 更新侧边栏导航
        document.querySelectorAll('.sidebar-nav .nav-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    // 滚动到指定分类
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isScrolling) return;
        
        isScrolling = true;
        const targetSection = sections[index];
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        updateNavigation(index);
        showSectionIndicator(sectionNames[index]);
        
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }
    
    // 显示分类指示器
    function showSectionIndicator(name) {
        if (!sectionIndicator) return;
        sectionIndicator.querySelector('.current-name').textContent = name;
        sectionIndicator.classList.add('show');
        
        setTimeout(() => {
            sectionIndicator.classList.remove('show');
        }, 2000);
    }
    
    // 获取当前可见的分类
    function getCurrentVisibleSection() {
        const scrollPosition = window.scrollY + 100;
        let current = 0;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                current = index;
            }
        });
        
        return current;
    }
    
    // 圆点点击事件
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToSection(index);
        });
        
        // 鼠标悬停显示分类名
        dot.addEventListener('mouseenter', () => {
            showSectionIndicator(sectionNames[index]);
        });
    });
    
    // 上下箭头点击事件
    if (navUp) {
        navUp.addEventListener('click', () => {
            scrollToSection(currentSection - 1);
        });
    }
    
    if (navDown) {
        navDown.addEventListener('click', () => {
            scrollToSection(currentSection + 1);
        });
    }
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                scrollToSection(currentSection - 1);
                break;
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                scrollToSection(currentSection + 1);
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sections.length - 1);
                break;
        }
    });
    
    // 滚轮翻页（可选）
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        if (e.target.closest('.sidebar') || e.target.closest('.page-nav')) return;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            const visibleSection = getCurrentVisibleSection();
            if (visibleSection !== currentSection) {
                updateNavigation(visibleSection);
            }
        }, 100);
    }, { passive: true });
    
    // 滚动监听更新当前分类
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // 显示/隐藏回到顶部按钮
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!isScrolling) {
                const visibleSection = getCurrentVisibleSection();
                if (visibleSection !== currentSection) {
                    updateNavigation(visibleSection);
                }
            }
        }, 100);
    }, { passive: true });
    
    // 回到顶部
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            updateNavigation(0);
        });
    }
    
    // 初始化
    updateNavigation(0);
    
    // 侧边栏菜单控制
    const menuBtn = document.getElementById('menuBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    function openSidebar() {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebarMenu() {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', closeSidebarMenu);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebarMenu);
    
    // 侧边栏导航点击
    document.querySelectorAll('.sidebar-nav .nav-item').forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            closeSidebarMenu();
            setTimeout(() => {
                scrollToSection(index);
            }, 300);
        });
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const cards = document.querySelectorAll('.card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            cards.forEach(card => {
                card.style.display = 'flex';
                card.closest('.category-section').style.display = 'block';
            });
            return;
        }
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const desc = card.querySelector('.card-desc').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        document.querySelectorAll('.category-section').forEach(section => {
            const visibleCards = section.querySelectorAll('.card[style*="flex"], .card:not([style*="none"])');
            section.style.display = visibleCards.length > 0 ? 'block' : 'none';
        });
    }
    
    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
        
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 300);
        });
    }
    
    // 搜索引擎切换
    const engineSelector = document.querySelector('.search-engine-selector');
    const engines = [
        { name: 'Google', icon: 'https://www.google.com/favicon.ico' },
        { name: 'Bing', icon: 'https://www.bing.com/favicon.ico' },
        { name: 'Baidu', icon: 'https://www.baidu.com/favicon.ico' }
    ];
    let currentEngine = 0;
    
    if (engineSelector) {
        engineSelector.addEventListener('click', () => {
            currentEngine = (currentEngine + 1) % engines.length;
            const engine = engines[currentEngine];
            engineSelector.querySelector('.engine-icon').src = engine.icon;
            searchInput.placeholder = `使用 ${engine.name} 搜索 AI 智能体、工具和资源...`;
        });
    }
    
    // 搜索图标按钮聚焦搜索框
    const searchIconBtn = document.getElementById('searchIconBtn');
    if (searchIconBtn && searchInput) {
        searchIconBtn.addEventListener('click', () => {
            searchInput.focus();
        });
    }
    
    // 快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) searchInput.focus();
        }
        
        // ESC 关闭侧边栏
        if (e.key === 'Escape') {
            closeSidebarMenu();
            if (searchInput) searchInput.blur();
        }
    });
    
    // 头部滚动效果
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    }, { passive: true });
    
    // 主题切换功能
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // 从本地存储获取主题设置
    function getStoredTheme() {
        return localStorage.getItem('theme') || 'light';
    }
    
    // 设置主题
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // 更新按钮标题
        if (themeToggleBtn) {
            themeToggleBtn.title = theme === 'dark' ? '切换到明亮模式' : '切换到暗色模式';
        }
    }
    
    // 切换主题
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }
    
    // 初始化主题
    setTheme(getStoredTheme());
    
    // 主题切换按钮点击事件
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // 只有在用户没有手动设置主题时才跟随系统
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    console.log('🦞 OpenClaw 导航站已加载完成！');
    console.log('快捷键：↑/↓ 或 PageUp/PageDown 翻页，Ctrl+K 搜索，ESC 关闭菜单');
    console.log('主题切换：点击右上角太阳/月亮图标切换明亮/暗色模式');
});