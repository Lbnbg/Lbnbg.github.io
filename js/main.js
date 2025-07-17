
// 加载动画控制
document.addEventListener('DOMContentLoaded', () => {
    const startTime = performance.now();
    const loader = document.getElementById('loader');
    const progressBar = document.getElementById('loaderProgress');
    
    // 模拟加载进度
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if(progress > 90) clearInterval(progressInterval);
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }, 50);

    // 返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('感谢您的留言，我们会尽快回复！');
            contactForm.reset();
        });
    }

    // 最终隐藏加载动画
    setTimeout(() => {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        setTimeout(() => {
            loader.classList.add('hidden');
            const loadTimeEl = document.getElementById('loadTime');
            if (loadTimeEl) {
                loadTimeEl.textContent = `页面加载完成耗时: ${Math.round(performance.now() - startTime)} ms`;
            }
        }, 100);
    }, 800);
});

// 导航栏激活状态
document.querySelectorAll('.main-nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});
