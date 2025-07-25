// 增强版 AdSense 加载脚本
(function() {
    // 验证 ads.txt 的终极方法
    function verifyAdsTxt() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/ads.txt?t=' + Date.now());
            xhr.onload = () => {
                if (xhr.status === 200 && xhr.responseText.includes('pub-8279797322437445')) {
                    resolve(true);
                } else {
                    reject(new Error(xhr.status === 200 ? 
                        'ads.txt 内容不包含发布商 ID' : 
                        `ads.txt 访问失败 (HTTP ${xhr.status})`));
                }
            };
            xhr.onerror = () => reject(new Error('网络错误'));
            xhr.send();
        });
    }

    // 显示 ads.txt 状态（5秒后自动消失）
    function showAdsStatus(isValid, message = '') {
        const statusEl = document.createElement('div');
        statusEl.id = 'ads-txt-status';
        statusEl.style.position = 'fixed';
        statusEl.style.bottom = '20px';
        statusEl.style.right = '20px';
        statusEl.style.padding = '12px 16px';
        statusEl.style.borderRadius = '8px';
        statusEl.style.fontSize = '14px';
        statusEl.style.zIndex = '9999';
        statusEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        statusEl.style.transition = 'opacity 0.5s ease';
        statusEl.style.display = 'flex';
        statusEl.style.alignItems = 'center';
        
        if (isValid) {
            statusEl.style.backgroundColor = 'rgba(46, 204, 113, 0.15)';
            statusEl.style.color = '#27ae60';
            statusEl.style.border = '1px solid #2ecc71';
            statusEl.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" style="margin-right:10px;">
                    <path fill="#27ae60" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                ads.txt 验证成功
            `;
        } else {
            statusEl.style.backgroundColor = 'rgba(231, 76, 60, 0.15)';
            statusEl.style.color = '#e74c3c';
            statusEl.style.border = '1px solid #e74c3c';
            statusEl.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" style="margin-right:10px;">
                    <path fill="#e74c3c" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <div>
                    <strong>ads.txt 问题</strong>
                    <div style="font-size:0.9em;margin-top:5px;">${message}</div>
                </div>
            `;
        }
        
        // 添加关闭按钮
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.marginLeft = '15px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '18px';
        closeBtn.onclick = () => statusEl.remove();
        statusEl.appendChild(closeBtn);
        
        document.body.appendChild(statusEl);
        
        // 5秒后自动消失（仅限成功状态）
        if(isValid) {
            setTimeout(() => {
                statusEl.style.opacity = '0';
                setTimeout(() => statusEl.remove(), 500);
            }, 5000);
        }
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
                        padding: 15px;
                        background: rgba(30,60,120,0.2);
                        border-radius: 8px;
                        min-height: 90px;
                        position: relative;
                        border: 1px solid rgba(79, 195, 247, 0.3);
                    }
                    .ad-label {
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        font-size: 0.75rem;
                        color: #b0bec5;
                        background: rgba(10,20,40,0.5);
                        padding: 2px 6px;
                        border-radius: 4px;
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
