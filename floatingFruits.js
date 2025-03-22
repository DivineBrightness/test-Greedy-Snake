// 创建一个类来管理浮动水果
class FloatingFruits {
    constructor() {
      // 创建容器
      this.createContainer();
      this.fruits = [];
      this.isActive = false;
      this.animationFrameId = null;
      
      this.fruitImages = [
        './image/fruit/apple.svg',
        './image/fruit/avocado.svg',
        './image/fruit/cherry.svg',
        './image/fruit/lemon.svg',
        './image/fruit/radish.svg',
        './image/fruit/watermelon.svg',
        './image/fruit/corn.svg',
        './image/fruit/fruit.svg',
        './image/fruit/Grape.png',
        './image/fruit/pineapple.svg',
        './image/fruit/watermelon1.svg',
        './image/fruit/bell.svg'
      ];
      
      // 创建水果元素
      this.createFruits();
    }
    
    createContainer() {
      // 检查容器是否已存在
      this.fruitContainer = document.getElementById('floating-fruits');
      
      if (!this.fruitContainer) {
        // 创建容器
        this.fruitContainer = document.createElement('div');
        this.fruitContainer.id = 'floating-fruits';
        this.fruitContainer.className = 'floating-fruits';
        document.body.appendChild(this.fruitContainer);
      }
    }
    
    createFruits() {
        // 清空容器
        this.fruitContainer.innerHTML = '';
        this.fruits = [];
        
        // 打乱水果图片数组，以确保随机排序但不重复
        const shuffledFruits = [...this.fruitImages].sort(() => Math.random() - 0.5);
        
        // 使用所有水果，确保不重复
        const fruitCount = this.fruitImages.length;
        
        // 固定水果大小
        const fixedSize = 60;
        
        // 尝试创建不重叠的水果
        for (let i = 0; i < fruitCount; i++) {
          let attempts = 0;
          let validPosition = false;
          let x, y;
          
          // 尝试最多20次找到一个不重叠的位置
          while (!validPosition && attempts < 20) {
            attempts++;
            
            // 随机位置
            x = Math.random() * (window.innerWidth - fixedSize);
            y = Math.random() * (window.innerHeight - fixedSize);
            
            validPosition = true;
            
            // 检查与已创建的水果是否重叠
            for (let j = 0; j < this.fruits.length; j++) {
              const existingFruit = this.fruits[j];
              const dx = x - existingFruit.x;
              const dy = y - existingFruit.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // 如果太近，则位置无效
              if (distance < fixedSize * 1.2) {
                validPosition = false;
                break;
              }
            }
          }
          
          const fruit = document.createElement('div');
          fruit.className = 'fruit';
          
          // 从打乱的数组中按顺序选择水果，确保不重复
          const fruitImage = shuffledFruits[i];
          
          // 添加调试代码，检查图片是否能加载
          const img = new Image();
          img.onload = () => {
            console.log(`成功加载: ${fruitImage}`);
          };
          img.onerror = () => {
            console.error(`无法加载: ${fruitImage}`);
          };
          img.src = fruitImage;
          
          fruit.style.backgroundImage = `url(${fruitImage})`;
          
          // 使用固定大小
          fruit.style.width = `${fixedSize}px`;
          fruit.style.height = `${fixedSize}px`;
          
          // 设置位置
          fruit.style.transform = `translate(${x}px, ${y}px)`;
          
          // 随机速度和方向 (较慢的速度)
          const speedX = (Math.random() - 0.5) * 0.8;
          const speedY = (Math.random() - 0.5) * 0.8;
          
          // 添加到容器
          this.fruitContainer.appendChild(fruit);
          
          // 保存水果数据
          this.fruits.push({
            element: fruit,
            x,
            y,
            speedX,
            speedY,
            size: fixedSize,
            lastCollision: 0 // 添加碰撞冷却计时器
          });
        }
      }
    
    update() {
      if (!this.isActive) return;
      
      // 更新每个水果的位置
      this.fruits.forEach(fruit => {
        // 更新位置
        fruit.x += fruit.speedX;
        fruit.y += fruit.speedY;
        
        // 边界检测，碰到边界反弹
        if (fruit.x <= 0 || fruit.x >= window.innerWidth - fruit.size) {
          fruit.speedX *= -1;
          fruit.x = Math.max(0, Math.min(window.innerWidth - fruit.size, fruit.x));
        }
        
        if (fruit.y <= 0 || fruit.y >= window.innerHeight - fruit.size) {
          fruit.speedY *= -1;
          fruit.y = Math.max(0, Math.min(window.innerHeight - fruit.size, fruit.y));
        }
        
        // 应用新位置
        fruit.element.style.transform = `translate(${fruit.x}px, ${fruit.y}px)`;
      });
      
      // 碰撞检测
      const now = Date.now();
      for (let i = 0; i < this.fruits.length; i++) {
        for (let j = i + 1; j < this.fruits.length; j++) {
          const fruitA = this.fruits[i];
          const fruitB = this.fruits[j];
          
          // 检查冷却时间 - 防止连续碰撞
          if (now - fruitA.lastCollision < 500 || now - fruitB.lastCollision < 500) {
            continue;
          }
          
          // 简单的圆形碰撞检测
          const dx = fruitA.x - fruitB.x;
          const dy = fruitA.y - fruitB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (fruitA.size + fruitB.size) / 2;
          
          if (distance < minDistance) {
            // 计算碰撞角度
            const angle = Math.atan2(dy, dx);
            
            // 分离水果，防止粘连
            const overlap = minDistance - distance + 2; // 额外2px分离距离
            
            // 将水果沿碰撞方向分离
            fruitA.x += Math.cos(angle) * overlap / 2;
            fruitA.y += Math.sin(angle) * overlap / 2;
            fruitB.x -= Math.cos(angle) * overlap / 2;
            fruitB.y -= Math.sin(angle) * overlap / 2;
            
            // 交换速度方向，模拟碰撞
            const tempSpeedX = fruitA.speedX;
            const tempSpeedY = fruitA.speedY;
            
            fruitA.speedX = fruitB.speedX;
            fruitA.speedY = fruitB.speedY;
            
            fruitB.speedX = tempSpeedX;
            fruitB.speedY = tempSpeedY;
            
            // 稍微加速，使碰撞更有活力
            fruitA.speedX *= 1.05;
            fruitA.speedY *= 1.05;
            fruitB.speedX *= 1.05;
            fruitB.speedY *= 1.05;
            
            // 更新碰撞时间
            fruitA.lastCollision = now;
            fruitB.lastCollision = now;
            
            // 立即更新位置，防止下一帧仍然重叠
            fruitA.element.style.transform = `translate(${fruitA.x}px, ${fruitA.y}px)`;
            fruitB.element.style.transform = `translate(${fruitB.x}px, ${fruitB.y}px)`;
          }
        }
      }
      
      // 继续下一帧动画
      this.animationFrameId = requestAnimationFrame(() => this.update());
    }
    
    show() {
      if (this.isActive) return;
      
      this.isActive = true;
      this.fruitContainer.style.display = 'block';
      this.update();
    }
    
    hide() {
      this.isActive = false;
      
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      
      this.fruitContainer.style.display = 'none';
    }
    
    // 用于窗口大小改变时重新定位水果
    resize() {
      this.fruits.forEach(fruit => {
        // 确保水果在视口内
        fruit.x = Math.min(fruit.x, window.innerWidth - fruit.size);
        fruit.y = Math.min(fruit.y, window.innerHeight - fruit.size);
        
        // 应用新位置
        fruit.element.style.transform = `translate(${fruit.x}px, ${fruit.y}px)`;
      });
    }
  }
  
  // 创建全局对象
  window.floatingFruits = new FloatingFruits();
  
  // 监听窗口大小改变事件
  window.addEventListener('resize', () => {
    if (window.floatingFruits) {
      window.floatingFruits.resize();
    }
  });
  
  // 在页面加载完成后显示水果
  document.addEventListener('DOMContentLoaded', () => {
    // 检查是否在主页
    const isHomePage = 
      document.getElementById('games-selection').style.display === 'none' && 
      document.getElementById('snake-game').style.display === 'none' && 
      document.getElementById('tetris-game').style.display === 'none';
    
    if (isHomePage && window.floatingFruits) {
      window.floatingFruits.show();
    }
  });