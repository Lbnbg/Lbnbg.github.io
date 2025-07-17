// 生产环境广告加载
if(window.location.hostname === 'huiyg.com') {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8279797322437445';
    script.async = true; 
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    
    script.onload = () => {
        (adsbygoogle = window.adsbygoogle || []).push({});
        
        // 广告容器样式
        const style = document.createElement('style');
        style.textContent = `
            .ad-container {
                margin: 25px auto;
                padding: 10px;
                background: rgba(30,60,120,0.4);
                border-radius: 8px;
                min-height: 90px;
            }
            .ad-label {
                font-size: 0.7rem;
                color: #b0bec5;
                text-align: right;
            }
        `;
        document.head.appendChild(style);
    };
} else {
    // 开发环境显示占位
    document.querySelectorAll('.ad-container').forEach(ad => {
        ad.innerHTML = '<p style="padding:20px;color:#b0bec5">广告位预览</p>';
    });
}
