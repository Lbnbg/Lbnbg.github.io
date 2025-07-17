// 广告控制脚本
(function() {
    // 仅在生产环境加载广告
    if (window.location.hostname === 'huiyg.com') {
        // 检查是否已加载
        if (window.adsbygoogle && window.adsbygoogle.loaded) return;
        
        // 创建脚本元素
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8279797322437445';
        script.crossOrigin = 'anonymous';
        script.onload = () => {
            // 初始化自动广告
            try {
                (adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('AdSense加载失败:', e);
            }
        };
        
        document.head.appendChild(script);
        
        // 添加广告容器样式
        const style = document.createElement('style');
        style.textContent = `
            .adsbygoogle {
                display: block;
                margin: 0 auto;
                max-width: 100%;
            }
            .ad-container {
                min-height: 90px;
                position: relative;
            }
            .ad-label {
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 0.7rem;
                color: #999;
            }
            @media (max-width: 768px) {
                .ad-container {
                    min-height: 50px;
                }
            }
        `;
        document.head.appendChild(style);
    } else {
        // 开发环境显示占位
        document.querySelectorAll('.ad-container').forEach(container => {
            container.innerHTML = `
                <div style="padding: 15px; background: rgba(30,60,120,0.3); border-radius: 8px; color: #b0bec5;">
                    <p>广告位 (仅在生产环境显示)</p>
                    <p>huiyg.com</p>
                </div>
            `;
        });
    }
})();
