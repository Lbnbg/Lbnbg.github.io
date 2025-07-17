class Particles {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if(!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // 创建粒子
        const count = window.innerWidth < 768 ? 30 : 50;
        for(let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(79, 195, 247, ${Math.random() * 0.5 + 0.1})`,
                life: Math.random() * 300 + 100
            });
        }
        
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            // 更新位置
            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;
            
            // 重置粒子
            if(p.life <= 0 || p.x < 0 || p.x > this.canvas.width || p.y < 0 || p.y > this.canvas.height) {
                p.x = Math.random() * this.canvas.width;
                p.y = Math.random() * this.canvas.height;
                p.life = Math.random() * 300 + 100;
            }
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // 绘制连接线
            this.particles.forEach(other => {
                const dist = Math.hypot(p.x - other.x, p.y - other.y);
                if(dist < 150) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(79, 195, 247, ${0.2 * (1 - dist/150)})`;
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化
new Particles('particles-js');
