class Particles {
    constructor(canvasId) {
        try {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) {
                console.error(`未找到ID为"${canvasId}"的canvas元素`);
                return;
            }
            
            this.ctx = this.canvas.getContext('2d');
            if (!this.ctx) {
                console.error('无法获取canvas的2D上下文');
                return;
            }
            
            this.particles = [];
            this.animationFrameId = null;
            this.init();
        } catch (error) {
            console.error('粒子系统初始化失败:', error);
        }
    }
    
    init() {
        this.resizeCanvas();
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // 根据屏幕尺寸调整粒子数量
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        // 创建粒子
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(this.createParticle());
        }
        
        this.animate();
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(79, 195, 247, ${Math.random() * 0.5 + 0.1})`,
            life: Math.random() * 300 + 100
        };
    }
    
    handleResize() {
        // 防抖处理
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.resizeCanvas();
        }, 200);
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // 重绘所有粒子
        this.particles.forEach(p => {
            p.x = Math.random() * this.canvas.width;
            p.y = Math.random() * this.canvas.height;
        });
    }
    
    animate() {
        try {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 更新和绘制粒子
            this.particles.forEach((p, i) => {
                // 更新位置
                p.x += p.speedX;
                p.y += p.speedY;
                p.life--;
                
                // 重置死亡或超出边界的粒子
                if (p.life <= 0 || p.x < 0 || p.x > this.canvas.width || p.y < 0 || p.y > this.canvas.height) {
                    this.particles[i] = this.createParticle();
                }
                
                // 绘制粒子
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.fill();
            });
            
            // 绘制连接线（优化性能，减少计算量）
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const p1 = this.particles[i];
                    const p2 = this.particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(79, 195, 247, ${0.2 * (1 - distance/150)})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.moveTo(p1.x, p1.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                    }
                }
            }
            
            this.animationFrameId = requestAnimationFrame(() => this.animate());
        } catch (error) {
            console.error('粒子动画错误:', error);
            this.cleanup();
        }
    }
    
    cleanup() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.handleResize);
    }
}

// 初始化粒子系统
try {
    const particles = new Particles('particles-js');
    
    // 页面卸载时清理资源
    window.addEventListener('beforeunload', () => {
        particles.cleanup();
    });
} catch (error) {
    console.error('粒子效果初始化失败:', error);
}
