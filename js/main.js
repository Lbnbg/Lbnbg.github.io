// 加载控制
document.addEventListener('DOMContentLoaded', () => {
    const startTime = performance.now();
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('loaderProgress');
    
    // 模拟加载进度
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
        if(progress >= 100) clearInterval(progressInterval);
    }, 50);

    // 返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    if(backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 导航栏高亮
    document.querySelectorAll('.main-nav a').forEach(link => {
        if(link.pathname === location.pathname) {
            link.classList.add('active');
        }
    });

    // 隐藏加载动画
    setTimeout(() => {
        loader.classList.add('hidden');
        document.getElementById('loadTime')?.textContent = 
            Math.round(performance.now() - startTime);
    }, 1200);
});
