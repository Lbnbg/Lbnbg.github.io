// 增强版 AdSense 加载脚本
(function() {
    // 验证 ads.txt 的终极方法
    function verifyAdsTxt() {
        return new Promise((resolve, reject) => {
            // 创建隐藏的 iframe 直接验证
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = '/ads.txt?t=' + Date.now();
            
            iframe.onload = () => {
                try {
                    const content = iframe.contentDocument.body.innerText;
                    if (content.includes('pub-8279797322437445')) {
                        resolve(true);
                    } else {
                        reject(new Error('ads.txt 内容不包含发布商 ID'));
                    }
                } catch (e) {
                    reject(new Error('无法读取 ads.txt 内容'));
                }
                document.body.removeChild(iframe);
            };
            
            iframe.onerror = () => {
                reject(new Error('ads.txt 加载失败'));
                document.body.removeChild(iframe);
            };
            
            document.body.appendChild(iframe);
        });
    }

    // 显示 ads.txt 状态
    function showAdsStatus(isValid, message = '') {
        const statusEl = document.createElement('div');
        statusEl.id = 'ads-txt-status';
        statusEl.style.position = 'fixed';
        statusEl.style.bottom = '10px';
        statusEl.style.right = '10px';
        statusEl.style.padding = '8px 12px';
        statusEl.style.borderRadius = '4px';
        statusEl.style.fontSize = '12px';
        statusEl.style.zIndex = '9999';
        
        if (isValid) {
            statusEl.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
            statusEl.style.color = '#27ae60';
            statusEl.textContent = 'ads.txt: 已验证 ✓';
        } else {
            statusEl.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
            statusEl.style.color = '#c0392b';
            statusEl.innerHTML = `ads.txt: 未验证! <a href="/ads.txt" target="_blank" style="color:#3498db;">查看详情</a>`;
            if (message) statusEl.innerHTML += `<br>${message}`;
        }
        
        document.body.appendChild(statusEl);
    }

    // 主执行逻辑
    if (window.location.hostname === 'huiyg.com') {
        // 添加预连接提升性能
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = 'https://pagead2.googlesyndication.com';
        document.head.appendChild(preconnect);
        
        // 验证 ads.txt
        verifyAdsTxt()
            .then(() => {
                showAdsStatus(true);
                loadAdSense();
            })
            .catch(error => {
                console.error('ads.txt 验证失败:', error.message);
                showAdsStatus(false, error.message);
                loadAdSense(); // 即使验证失败也加载广告
            });
    } else {
        // 开发环境显示占位
        document.querySelectorAll('.ad-container').forEach(ad => {
            ad.innerHTML = '<p style="padding:20px;color:#b0bec5">广告位预览 (开发模式)</p>';
        });
    }
    
    // 加载 AdSense 的核心函数
    function loadAdSense() {
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
                
                // 添加广告样式
                const style = document.createElement('style');
                style.textContent = `
                    .ad-container {
                        margin: 25px auto;
                        padding: 10px;
                        background: rgba(30,60,120,0.4);
                        border-radius: 8px;
                        min-height: 90px;
                        position: relative;
                    }
                    .ad-label {
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        font-size: 0.7rem;
                        color: #b0bec5;
                    }
                    .adsbygoogle {
                        display: block;
                        margin: 0 auto;
                    }
                `;
                document.head.appendChild(style);
            } catch (e) {
                console.error('AdSense 初始化错误:', e);
            }
        };
    }
})();
