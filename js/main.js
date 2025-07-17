// 增强版的加载控制
document.addEventListener('DOMContentLoaded', () => {
    try {
        const startTime = performance.now();
        const loader = document.getElementById('loader');
        const progressBar = document.getElementById('loaderProgress');
        
        // 确保元素存在
        if (!loader || !progressBar) {
            console.error('加载动画元素未找到');
            return;
        }

        // 模拟加载进度
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 30;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            if(progress >= 100) clearInterval(progressInterval);
        }, 50);

        // 返回顶部按钮控制
        const backToTop = document.getElementById('backToTop');
        if(backToTop) {
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('visible', window.scrollY > 300);
            });
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // 导航栏高亮控制
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.classList.toggle('active', link.pathname === location.pathname);
        });

        // 页面完全加载后隐藏动画
        window.addEventListener('load', () => {
            clearInterval(progressInterval);
            progressBar.style.width = '100%';
            setTimeout(() => {
                loader.classList.add('hidden');
                const loadTimeEl = document.getElementById('loadTime');
                if(loadTimeEl) {
                    loadTimeEl.textContent = Math.round(performance.now() - startTime);
                }
            }, 200);
        });

        // 10秒超时强制隐藏
        setTimeout(() => {
            if(!loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                console.warn('加载超时，强制隐藏动画');
            }
        }, 10000);

    } catch (error) {
        console.error('页面初始化错误:', error);
        const loader = document.getElementById('loader');
        if(loader) loader.style.display = 'none';
    }
});
