// 增强版 AdSense 加载脚本
(function() {
    // 检查 ads.txt 是否可访问
    function verifyAdsTxt() {
        const adsTxtUrl = '/ads.txt?t=' + Date.now(); // 添加时间戳避免缓存
        
        return fetch(adsTxtUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`ads.txt 访问失败 (HTTP ${response.status})`);
                }
                return response.text();
            })
            .then(content => {
                if (!content.includes('pub-8279797322437445')) {
                    throw new Error('ads.txt 中未找到发布商 ID');
                }
                return true;
            });
    }

    // 显示 ads.txt 警告
    function showAdsTxtWarning(message) {
        console.error('AdSense 配置问题:', message);
        document.querySelectorAll('.ad-container').forEach(container => {
            container.innerHTML = `
                <div style="padding:15px; text-align:center; background:rgba(255,87,34,0.1); border-radius:8px;">
                    <p style="color:#ff5722; margin:0;">AdSense 警告: ${message}</p>
                    <p style="font-size:0.8rem; margin:5px 0 0;">
                        请确保 <a href="https://huiyg.com/ads.txt" target="_blank" style="color:#4fc3f7;">https://huiyg.com/ads.txt</a> 可访问
                    </p>
                </div>
            `;
        });
    }

    // 主执行逻辑
    if (window.location.hostname === 'huiyg.com') {
        verifyAdsTxt()
            .then(isValid => {
                if (!isValid) return;
                
                // 创建 AdSense 脚本
                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8279797322437445';
                script.crossOrigin = 'anonymous';
                script.onerror = () => console.error('AdSense 脚本加载失败');
                
                // 添加到文档头
                document.head.appendChild(script);
                
                // 初始化广告
                script.onload = () => {
                    try {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        console.error('AdSense 初始化错误:', e);
                    }
                };
            })
            .catch(error => {
                showAdsTxtWarning(error.message);
                // 即使 ads.txt 有问题，也尝试加载广告
                const script = document.createElement('script');
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8279797322437445';
                script.async = true;
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);
            });
    } else {
        // 开发环境显示占位
        document.querySelectorAll('.ad-container').forEach(ad => {
            ad.innerHTML = '<p style="padding:20px;color:#b0bec5">广告位预览</p>';
        });
    }
})();
