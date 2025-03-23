// 创建一个类来管理浮动水果
class FloatingFruits {
    constructor() {
      // 创建容器
      this.createContainer();
      this.fruits = [];
      this.isActive = false;
      this.animationFrameId = null;
      
    this.fruitImages = [
      './image/fruit/avocado.svg',
      './image/fruit/cherry.svg',
      './image/fruit/lemon.svg',
      './image/fruit/radish.svg',
      './image/fruit/watermelon.svg',
      './image/fruit/fruit.svg',
      './image/fruit/pineapple.svg',
      './image/fruit/watermelon1.svg',
      './image/fruit/bell.svg',
      './image/fruit/apple1.svg',
      './image/fruit/avacado.svg',
      './image/fruit/beet.svg',
      './image/fruit/bell1.svg',
      './image/fruit/blueberry.svg',
      './image/fruit/broccoli.svg',
      './image/fruit/coconut.svg'
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
    // 添加重置水果位置的方法
resetFruitsPosition() {
  console.log('重置水果位置');
  
  // 计算屏幕中心位置
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  // 排列方式: 网格排列
  const fruitCount = this.fruits.length;
  const gridCols = Math.ceil(Math.sqrt(fruitCount)); // 网格列数
  const gridRows = Math.ceil(fruitCount / gridCols); // 网格行数
  
  // 计算网格单元大小，考虑水果大小
  const maxFruitSize = Math.max(...this.fruits.map(fruit => fruit.size));
  const cellSize = maxFruitSize + 20; // 水果间距
  
  // 计算网格起始位置，使网格居中
  const gridWidth = gridCols * cellSize;
  const gridHeight = gridRows * cellSize;
  const startX = centerX - gridWidth / 2;
  const startY = centerY - gridHeight / 2;
  
  // 启动动画效果
  const animations = [];
  
  // 为每个水果分配位置
  this.fruits.forEach((fruit, index) => {
    // 计算在网格中的行和列
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);
    
    // 计算目标位置
    const targetX = startX + col * cellSize;
    const targetY = startY + row * cellSize;
    
    // 暂停当前运动状态并保存
    fruit.originalSpeedX = fruit.speedX;
    fruit.originalSpeedY = fruit.speedY;
    fruit.speedX = 0;
    fruit.speedY = 0;
    
    // 创建动画
    const keyframes = [
      { transform: `translate(${fruit.x}px, ${fruit.y}px)` },
      { transform: `translate(${targetX}px, ${targetY}px)` }
    ];
    
    const animation = fruit.element.animate(keyframes, {
      duration: 500 + Math.random() * 300, // 随机持续时间使动画更自然
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // 平滑的缓动函数
      fill: 'forwards' // 保持最终状态
    });
    
    // 修改动画结束回调：取消动画效果以便 update() 更新 transform
    animation.onfinish = () => {
        animation.cancel(); // 取消动画效果
        // 更新水果位置
        fruit.x = targetX;
        fruit.y = targetY;
        
        // 恢复速度：如果处于冻结状态则保持 0
    setTimeout(() => {
        if (!this.isFrozen) {
          fruit.speedX = (Math.random() - 0.5) * 0.8;
          fruit.speedY = (Math.random() - 0.5) * 0.8;
        } else {
          fruit.speedX = 0;
          fruit.speedY = 0;
        }
      }, 500 + index * 50);
  };
  
      animations.push(animation);
  });
  
  return animations;
}
    
    createFruits() {
        // 清空容器
        this.fruitContainer.innerHTML = '';
        this.fruits = [];
        
        // 打乱水果图片数组，以确保随机排序但不重复
        const shuffledFruits = [...this.fruitImages].sort(() => Math.random() - 0.5);
        
        // 使用所有水果，确保不重复
        const fruitCount = this.fruitImages.length;
        
        // 为每种水果指定具体大小
        const fruitSizes = {
          './image/fruit/avocado.svg': 60,
          './image/fruit/cherry.svg': 55,
          './image/fruit/lemon.svg': 45,
          './image/fruit/radish.svg': 65,
          './image/fruit/watermelon.svg': 50,
          './image/fruit/fruit.svg': 60,
          './image/fruit/pineapple.svg': 90,
          './image/fruit/watermelon1.svg': 70,
          './image/fruit/bell.svg': 65,
          './image/fruit/apple1.svg': 55,
          './image/fruit/avacado.svg': 60,
          './image/fruit/beet.svg': 60,
          './image/fruit/bell1.svg': 65,
          './image/fruit/blueberry.svg': 50,
          './image/fruit/broccoli.svg': 70,
          './image/fruit/coconut.svg': 95
        };
        
        // 默认大小，如果在映射中找不到对应图片
        const defaultSize = 60;
        
        // 尝试创建不重叠的水果
        for (let i = 0; i < fruitCount; i++) {
          let attempts = 0;
          let validPosition = false;
          let x, y;
          
          // 从打乱的数组中按顺序选择水果，确保不重复
          const fruitImage = shuffledFruits[i];
          
          // 获取当前水果的大小，如果没有设置则使用默认值
          const currentSize = fruitSizes[fruitImage] || defaultSize;
          
          // 尝试最多20次找到一个不重叠的位置
          while (!validPosition && attempts < 20) {
            attempts++;
            
            // 随机位置
            x = Math.random() * (window.innerWidth - currentSize);
            y = Math.random() * (window.innerHeight - currentSize);
            
            validPosition = true;
            
            // 检查与已创建的水果是否重叠
            for (let j = 0; j < this.fruits.length; j++) {
              const existingFruit = this.fruits[j];
              const dx = x - existingFruit.x;
              const dy = y - existingFruit.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // 如果太近，则位置无效
              if (distance < (currentSize + existingFruit.size) / 2 * 1.2) {
                validPosition = false;
                break;
              }
            }
          }
          
          const fruit = document.createElement('div');
          fruit.className = 'fruit';
          
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
          
          // 使用对应大小
          fruit.style.width = `${currentSize}px`;
          fruit.style.height = `${currentSize}px`;
          
          // 设置位置
          fruit.style.transform = `translate(${x}px, ${y}px)`;
          
          // 随机速度和方向 (较慢的速度)
          const speedX = (Math.random() - 0.5) * 0.8;
          const speedY = (Math.random() - 0.5) * 0.8;
          
          // 添加到容器
          this.fruitContainer.appendChild(fruit);
          
          // 保存水果数据
          const fruitData = {
            element: fruit,
            x,
            y,
            speedX,
            speedY,
            size: currentSize,
            lastCollision: 0, // 添加碰撞冷却计时器
            isDragging: false, // 拖拽状态
            dragOffsetX: 0,    // 拖拽偏移X
            dragOffsetY: 0     // 拖拽偏移Y
          };
          
          this.fruits.push(fruitData);
          
          // 添加拖拽事件
          this.addDragEvents(fruitData);
        }
      }
      
      // 添加拖拽相关事件
addDragEvents(fruit) {
    const element = fruit.element;
    
    // 鼠标按下事件
    element.addEventListener('mousedown', (e) => {
      this.startDragging(fruit, e.clientX, e.clientY);
      e.preventDefault(); // 防止选中文本等默认行为
    });
    
    // 触摸开始事件 - 修改为更可靠的方式
    element.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        this.startDragging(fruit, touch.clientX, touch.clientY);
        e.preventDefault(); // 防止滚动等默认行为
      }
    }, { passive: false }); // 显式设置passive为false，确保preventDefault生效
    
    // 全局鼠标移动事件
    const mouseMoveHandler = (e) => {
      if (fruit.isDragging) {
        this.moveDragging(fruit, e.clientX, e.clientY);
        e.preventDefault();
      }
    };
    
    // 全局触摸移动事件 - 修改为更可靠的方式
    const touchMoveHandler = (e) => {
      if (fruit.isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        this.moveDragging(fruit, touch.clientX, touch.clientY);
        e.preventDefault(); // 关键：防止页面滚动
      }
    };
    
    // 全局鼠标释放事件
    const mouseUpHandler = (e) => {
      if (fruit.isDragging) {
        this.stopDragging(fruit);
        e.preventDefault();
      }
    };
    
    // 全局触摸结束事件 - 修改为更可靠的方式
    const touchEndHandler = (e) => {
      if (fruit.isDragging) {
        this.stopDragging(fruit);
        e.preventDefault();
      }
    };
    
    // 保存事件引用，用于在fruit对象上
    fruit.mouseMoveHandler = mouseMoveHandler;
    fruit.touchMoveHandler = touchMoveHandler;
    fruit.mouseUpHandler = mouseUpHandler;
    fruit.touchEndHandler = touchEndHandler;
    
    // 绑定全局事件 - 使用捕获阶段以确保事件先被处理
    document.addEventListener('mousemove', mouseMoveHandler, { capture: true });
    document.addEventListener('mouseup', mouseUpHandler, { capture: true });
    document.addEventListener('touchmove', touchMoveHandler, { passive: false, capture: true });
    document.addEventListener('touchend', touchEndHandler, { passive: false, capture: true });
    document.addEventListener('touchcancel', touchEndHandler, { passive: false, capture: true });
    
    // 离开窗口时也停止拖动
    document.addEventListener('mouseleave', mouseUpHandler);
  }
  
  // 开始拖拽 - 修改计算方式以在触摸设备上更准确
startDragging(fruit, clientX, clientY) {
    fruit.isDragging = true;
    
    // 保存水果初始位置和点击/触摸点的位置
    fruit.dragStartX = fruit.x;
    fruit.dragStartY = fruit.y;
    fruit.dragStartClientX = clientX;
    fruit.dragStartClientY = clientY;
    
    // 暂停该水果的自动移动
    fruit.originalSpeedX = fruit.speedX;
    fruit.originalSpeedY = fruit.speedY;
    fruit.speedX = 0;
    fruit.speedY = 0;
    
    // 添加拖拽中的样式
    fruit.element.classList.add('dragging');
    
    // 移动到顶层
    this.fruitContainer.appendChild(fruit.element);
  }
  
  // 拖拽中移动 - 添加拖动时的碰撞检测
moveDragging(fruit, clientX, clientY) {
    // 保存旧位置用于计算碰撞
    const oldX = fruit.x;
    const oldY = fruit.y;
    
    // 计算相对于初始触摸点的移动距离
    const deltaX = clientX - fruit.dragStartClientX;
    const deltaY = clientY - fruit.dragStartClientY;
    
    // 基于初始位置和移动差值计算新位置
    fruit.x = fruit.dragStartX + deltaX;
    fruit.y = fruit.dragStartY + deltaY;
    
    // 边界检查，防止拖出窗口
    fruit.x = Math.max(0, Math.min(window.innerWidth - fruit.size, fruit.x));
    fruit.y = Math.max(0, Math.min(window.innerHeight - fruit.size, fruit.y));
    
    // 更新DOM元素位置
    fruit.element.style.transform = `translate(${fruit.x}px, ${fruit.y}px)`;
    
    // 检测拖动碰撞
    this.checkDragCollisions(fruit, oldX, oldY);
  }
  
  // 拖动时的碰撞检测
checkDragCollisions(draggedFruit, oldX, oldY) {
    const now = Date.now();
    
    // 计算拖动速度向量 (用于计算碰撞力度)
    const dragVelocityX = draggedFruit.x - oldX;
    const dragVelocityY = draggedFruit.y - oldY;
    const dragSpeed = Math.sqrt(dragVelocityX * dragVelocityX + dragVelocityY * dragVelocityY);
    
    // 只有当拖动速度足够快时才检测碰撞
    if (dragSpeed < 0.5) return;
    
    for (let i = 0; i < this.fruits.length; i++) {
      const targetFruit = this.fruits[i];
      
      // 跳过与自己的碰撞和正在拖拽的其他水果
      if (targetFruit === draggedFruit || targetFruit.isDragging) continue;
      
      // 检查冷却时间
      if (now - targetFruit.lastCollision < 200) continue;
      
      // 圆形碰撞检测
      const dx = draggedFruit.x - targetFruit.x;
      const dy = draggedFruit.y - targetFruit.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = (draggedFruit.size + targetFruit.size) / 2;
      
      if (distance < minDistance) {
        // 计算碰撞角度
        const angle = Math.atan2(dy, dx);
        
        // 计算碰撞力度 - 拖动越快，力度越大
        const impact = Math.min(10, 3 + dragSpeed * 2); 
        
        // 分离水果，防止粘连，拖动碰撞时分离更远
        const overlap = minDistance - distance + 5; 
        
        // 将被碰撞的水果弹开
        targetFruit.x -= Math.cos(angle) * overlap;
        targetFruit.y -= Math.sin(angle) * overlap;
        
        // 给予被碰撞水果一个与拖动方向相关的速度
        const force = impact / targetFruit.size * 10; // 小水果受到更大的力
        targetFruit.speedX = -Math.cos(angle) * force;
        targetFruit.speedY = -Math.sin(angle) * force;
        
        // 设置更长的冷却时间
        targetFruit.lastCollision = now;
        
        // 添加碰撞特效
        this.createCollisionEffect(targetFruit);
        
        // 立即更新位置，防止下一帧仍然重叠
        targetFruit.element.style.transform = `translate(${targetFruit.x}px, ${targetFruit.y}px)`;
      }
    }
  }
  // 创建碰撞特效
createCollisionEffect(fruit) {
    // 1. 添加一个临时的动画类
    fruit.element.classList.add('collision');
    
    // 创建动画关键帧
    const keyframes = [
      { transform: `translate(${fruit.x}px, ${fruit.y}px) scale(1)`, filter: 'brightness(1) blur(0px)' },
      { transform: `translate(${fruit.x}px, ${fruit.y}px) scale(1.2)`, filter: 'brightness(1.5) blur(0px)' },
      { transform: `translate(${fruit.x}px, ${fruit.y}px) scale(1)`, filter: 'brightness(1) blur(0px)' }
    ];
    
    // 应用动画
    const animation = fruit.element.animate(keyframes, {
      duration: 300,
      easing: 'ease-out'
    });
    
    // 动画结束后移除类
    animation.onfinish = () => {
      fruit.element.classList.remove('collision');
    };
  }
  // 新增 toggleFreeze 方法，用于切换水果运动状态
toggleFreeze() {
    // 切换冻结状态
    this.isFrozen = !this.isFrozen;
    if (this.isFrozen) {
      console.log("水果已冻结");
      // 调用 resetFruitsPosition 重新排列水果，动画中会保持速度为 0
      this.resetFruitsPosition();
    } else {
      console.log("水果恢复移动");
      // 恢复每个水果的随机速度
      this.fruits.forEach(fruit => {
        fruit.speedX = (Math.random() - 0.5) * 0.8;
        fruit.speedY = (Math.random() - 0.5) * 0.8;
      });
    }
  }
  // 优化停止拖拽函数
stopDragging(fruit) {
    fruit.isDragging = false;
    
    // 恢复原有速度，添加随机性使其平滑并增加变化
    if (fruit.originalSpeedX && fruit.originalSpeedY) {
      // 若速度接近于0，给一个小的随机初速度
      if (Math.abs(fruit.originalSpeedX) < 0.1 && Math.abs(fruit.originalSpeedY) < 0.1) {
        fruit.speedX = (Math.random() - 0.5) * 0.6;
        fruit.speedY = (Math.random() - 0.5) * 0.6;
      } else {
        // 正常恢复速度
        fruit.speedX = fruit.originalSpeedX * (0.8 + Math.random() * 0.4);
        fruit.speedY = fruit.originalSpeedY * (0.8 + Math.random() * 0.4);
      }
    } else {
      // 如果没有原始速度记录，给一个新的随机速度
      fruit.speedX = (Math.random() - 0.5) * 0.8;
      fruit.speedY = (Math.random() - 0.5) * 0.8;
    }
    
    // 删除拖拽中的样式
    fruit.element.classList.remove('dragging');
    
    // 清除临时属性
    delete fruit.originalSpeedX;
    delete fruit.originalSpeedY;
    delete fruit.dragStartX;
    delete fruit.dragStartY;
    delete fruit.dragStartClientX;
    delete fruit.dragStartClientY;
    
    // 设置一个短暂的碰撞冷却，以防止松手后立即碰撞
    fruit.lastCollision = Date.now();
  }
    
  update() {
    if (!this.isActive) return;
    
    // 更新每个水果的位置
    this.fruits.forEach(fruit => {
      // 跳过正在拖拽的水果
      if (fruit.isDragging) return;
      
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
      // 跳过正在拖拽的水果
      if (this.fruits[i].isDragging) continue;
      
      for (let j = i + 1; j < this.fruits.length; j++) {
        // 跳过正在拖拽的水果
        if (this.fruits[j].isDragging) continue;
        
        const fruitA = this.fruits[i];
        const fruitB = this.fruits[j];
        
        // 检查冷却时间 - 降低冷却时间以避免水果不动的问题
        if (now - fruitA.lastCollision < 300 || now - fruitB.lastCollision < 300) {
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
          
          // 稍微加速，使碰撞更有活力，但不要太快
          fruitA.speedX *= 1.03;
          fruitA.speedY *= 1.03;
          fruitB.speedX *= 1.03;
          fruitB.speedY *= 1.03;
          
          // 限制最大速度
          const maxSpeed = 1.5;
          fruitA.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, fruitA.speedX));
          fruitA.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, fruitA.speedY));
          fruitB.speedX = Math.max(-maxSpeed, Math.min(maxSpeed, fruitB.speedX));
          fruitB.speedY = Math.max(-maxSpeed, Math.min(maxSpeed, fruitB.speedY));
          
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