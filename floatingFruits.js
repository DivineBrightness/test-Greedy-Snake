// 创建一个类来管理浮动水果
class FloatingFruits {
    constructor() {
        // 创建容器
        this.createContainer();
        this.fruits = [];
        this.isActive = false;
        this.animationFrameId = null;
        // 水果图片数组
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
        
        // 为每种水果指定具体大小
        this.fruitSizes = {
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
        
        // 默认大小
        this.defaultSize = 60;
        
        // 初始化收集的水果数组为空
        this.collectedFruits = [];
        
        // 将所有水果信息预先放入果篮
        this.initializeFruitsInBasket();
      }
      // 新增方法：初始化时将所有水果放入果篮
initializeFruitsInBasket() {
    // 打乱水果图片数组，保证随机性
    const shuffledFruits = [...this.fruitImages].sort(() => Math.random() - 0.5);
    
    // 将所有水果信息添加到已收集数组中
    shuffledFruits.forEach(fruitImage => {
      const size = this.fruitSizes[fruitImage] || this.defaultSize;
      this.collectedFruits.push({
        imageUrl: fruitImage,
        size: size
      });
    });
    
    console.log(`初始化完成，果篮中有 ${this.collectedFruits.length} 个水果`);
    
    // 更新果篮显示
    this.updateBasketDisplay();
  }
  
  // 新增方法：更新果篮显示
  updateBasketDisplay() {
    if (!this.fruitBasket) return;
    
    // 更新果篮文本标签
    const basketLabel = this.fruitBasket.querySelector('div');
    if (basketLabel) {
      basketLabel.textContent = `点击释放水果 (${this.collectedFruits.length})`;
    }
    
    // 如果果篮中有水果，添加一个视觉提示
    if (this.collectedFruits.length > 0) {
      this.fruitBasket.classList.add('has-fruits');
      // 果篮有水果时的样式
      this.fruitBasket.style.filter = 'brightness(1.1) saturate(1.2)';
    } else {
      this.fruitBasket.classList.remove('has-fruits');
      // 果篮空时的样式
      this.fruitBasket.style.filter = 'brightness(1) saturate(1)';
    }
  }

// 点击果篮时放出随机水果
releaseRandomFruit() {
    // 检查果篮是否有水果
    if (this.collectedFruits.length === 0) {
      console.log('果篮中没有水果可放出');
      // 播放空篮子的抖动动画，提示用户
      this.animateBasket();
      return;
    }
    
    // 随机选择一个水果信息
    const randomIndex = Math.floor(Math.random() * this.collectedFruits.length);
    const fruitInfo = this.collectedFruits[randomIndex];
    
    // 从收集数组中移除
    this.collectedFruits.splice(randomIndex, 1);
    console.log(`从果篮放出水果，剩余 ${this.collectedFruits.length} 个`);
    
    // 更新果篮显示
    this.updateBasketDisplay();
    
    // 创建新水果元素
    const fruit = document.createElement('div');
    fruit.className = 'fruit';
    
    // 设置背景图片
    fruit.style.backgroundImage = `url(${fruitInfo.imageUrl})`;
    
    // 使用保存的大小
    fruit.style.width = `${fruitInfo.size}px`;
    fruit.style.height = `${fruitInfo.size}px`;
    
    // 从果篮位置出发
    const basketRect = this.fruitBasket.getBoundingClientRect();
    const x = basketRect.left + basketRect.width / 2 - fruitInfo.size / 2;
    const y = basketRect.top + basketRect.height / 2 - fruitInfo.size / 2;
    
    fruit.style.transform = `translate(${x}px, ${y}px) scale(0)`;
    
    // 添加到容器
    this.fruitContainer.appendChild(fruit);
    
    // 随机速度和方向
    const speedX = (Math.random() - 0.5) * 1.5; // 放出时速度稍快
    const speedY = (Math.random() * 2 - 0.5); // 向下的概率更大
    
    // 创建水果数据对象
    const fruitData = {
      element: fruit,
      x,
      y,
      speedX,
      speedY,
      size: fruitInfo.size,
      lastCollision: 0,
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0
    };
    
    // 创建从果篮弹出的动画
    const keyframes = [
      { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 },
      { transform: `translate(${x}px, ${y}px) scale(1.2)`, opacity: 0.7 },
      { transform: `translate(${x}px, ${y}px) scale(1)`, opacity: 1 }
    ];
    
    const animation = fruit.animate(keyframes, {
      duration: 400,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
    });
    
    // 动画完成后开始移动
    animation.onfinish = () => {
      this.fruits.push(fruitData);
      this.addDragEvents(fruitData);
    };
    
    // 播放果篮抖动动画
    this.animateBasket();
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
        
        // 添加果篮 - 检查是否已存在
        this.fruitBasket = document.getElementById('fruit-basket');
        if (!this.fruitBasket) {
        this.fruitBasket = document.createElement('div');
        this.fruitBasket.id = 'fruit-basket';
        this.fruitBasket.className = 'fruit-basket';
        
        // 设置果篮图像
        this.fruitBasket.style.backgroundImage = 'url("./image/fruit/fruit-basket.svg")';
        this.fruitBasket.style.backgroundSize = 'contain';
        this.fruitBasket.style.backgroundRepeat = 'no-repeat';
        this.fruitBasket.style.backgroundPosition = 'center';
        this.fruitBasket.style.width = '80px';
        this.fruitBasket.style.height = '80px';
        this.fruitBasket.style.position = 'fixed';
        this.fruitBasket.style.top = '20px';
        this.fruitBasket.style.right = '20px';
        this.fruitBasket.style.zIndex = '1000';
        this.fruitBasket.style.cursor = 'pointer';
        this.fruitBasket.style.transition = 'transform 0.2s, filter 0.3s';
        
        // 添加提示文本
        const basketLabel = document.createElement('div');
        basketLabel.style.fontSize = '12px';
        basketLabel.style.textAlign = 'center';
        basketLabel.style.marginTop = '5px';
        basketLabel.style.color = '#555';
        this.fruitBasket.appendChild(basketLabel);
        
        // 添加鼠标悬停效果
        this.fruitBasket.addEventListener('mouseenter', () => {
            if (this.collectedFruits.length > 0) {
            this.fruitBasket.style.transform = 'scale(1.05)';
            }
        });
        
        this.fruitBasket.addEventListener('mouseleave', () => {
            this.fruitBasket.style.transform = 'scale(1)';
        });
        
        // 添加点击事件，点击时放出一个收集的水果
        this.fruitBasket.addEventListener('click', () => this.releaseRandomFruit());
        
        document.body.appendChild(this.fruitBasket);
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
    // 记录拖动开始时间
    fruit.dragStartTime = Date.now();
    
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

  // 检查水果是否拖到了果篮
checkBasketDrop(fruit) {
    if (!this.fruitBasket) return false;
    
    // 获取果篮的位置和大小
    const basketRect = this.fruitBasket.getBoundingClientRect();
    
    // 获取水果的位置
    const fruitCenterX = fruit.x + fruit.size / 2;
    const fruitCenterY = fruit.y + fruit.size / 2;
    
    // 检查水果中心是否在果篮区域内
    if (fruitCenterX >= basketRect.left && 
        fruitCenterX <= basketRect.right && 
        fruitCenterY >= basketRect.top && 
        fruitCenterY <= basketRect.bottom) {
      
      // 水果被放入果篮，执行动画然后移除
      this.fruitDroppedInBasket(fruit);
      return true;
    }
    
    return false;
  }
  
// 处理水果放入果篮的效果
fruitDroppedInBasket(fruit) {
    console.log('水果被放入果篮!');
    
    // 保存水果信息用于后续放出
    const fruitInfo = {
      imageUrl: fruit.element.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1'),
      size: fruit.size
    };
    this.collectedFruits.push(fruitInfo);
    console.log(`水果已收集，果篮中共有 ${this.collectedFruits.length} 个水果`);
    
    // 更新果篮显示
    this.updateBasketDisplay();
    
    // 创建缩小并移动到果篮中心的动画
    const basketRect = this.fruitBasket.getBoundingClientRect();
    const basketCenterX = basketRect.left + basketRect.width / 2;
    const basketCenterY = basketRect.top + basketRect.height / 2;
    
    // 停止该水果的自动运动
    fruit.speedX = 0;
    fruit.speedY = 0;
    
    // 创建动画
    const keyframes = [
      { 
        transform: `translate(${fruit.x}px, ${fruit.y}px) scale(1)`,
        opacity: 1
      },
      { 
        transform: `translate(${basketCenterX - fruit.size/2}px, ${basketCenterY - fruit.size/2}px) scale(0.5)`,
        opacity: 0.7
      },
      { 
        transform: `translate(${basketCenterX - fruit.size/2}px, ${basketCenterY - fruit.size/2}px) scale(0)`,
        opacity: 0
      }
    ];
    
    const animation = fruit.element.animate(keyframes, {
      duration: 500,
      easing: 'cubic-bezier(0.42, 0, 0.58, 1)'
    });
    
    // 动画结束后从数组和DOM中移除该水果
    animation.onfinish = () => {
      this.removeFruit(fruit);
      // 添加果篮抖动效果
      this.animateBasket();
    };
  }
  
  // 从游戏中移除水果
  removeFruit(fruit) {
    // 从DOM中移除
    if (fruit.element && fruit.element.parentNode) {
      fruit.element.parentNode.removeChild(fruit.element);
    }
    
    // 从数组中移除
    const index = this.fruits.indexOf(fruit);
    if (index !== -1) {
      this.fruits.splice(index, 1);
      console.log(`水果已移除，剩余水果: ${this.fruits.length}`);
    }
    
    // 清除全局事件监听器
    if (fruit.mouseMoveHandler) {
      document.removeEventListener('mousemove', fruit.mouseMoveHandler, { capture: true });
    }
    if (fruit.mouseUpHandler) {
      document.removeEventListener('mouseup', fruit.mouseUpHandler, { capture: true });
      document.removeEventListener('mouseleave', fruit.mouseUpHandler);
    }
    if (fruit.touchMoveHandler) {
      document.removeEventListener('touchmove', fruit.touchMoveHandler, { passive: false, capture: true });
    }
    if (fruit.touchEndHandler) {
      document.removeEventListener('touchend', fruit.touchEndHandler, { passive: false, capture: true });
      document.removeEventListener('touchcancel', fruit.touchEndHandler, { passive: false, capture: true });
    }
  }
  
  // 果篮抖动动画
  animateBasket() {
    if (!this.fruitBasket) return;
    
    const keyframes = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0)' },
      { transform: 'translateY(-5px)' },
      { transform: 'translateY(0)' }
    ];
    
    this.fruitBasket.animate(keyframes, {
      duration: 500,
      easing: 'ease-in-out'
    });
  }
// 优化停止拖拽函数
stopDragging(fruit) {
    fruit.isDragging = false;
    
    // 检查是否拖到了果篮
    const basketDropped = this.checkBasketDrop(fruit);
    
    // 如果放入了果篮，就不应用后续的速度计算
    if (!basketDropped) {
      // 计算拖动的最终速度和方向
      if (fruit.dragStartClientX !== undefined && fruit.dragStartClientY !== undefined) {
        // 计算移动距离和时间
        const dx = fruit.x - fruit.dragStartX;
        const dy = fruit.y - fruit.dragStartY;
        const dragDuration = Date.now() - fruit.dragStartTime;
        
        // 计算拖动速度（像素/秒）并转换为适合游戏的速度单位
        if (dragDuration > 0) {
          // 计算速度向量，值越大移动越快
          let velX = (dx / dragDuration) * 20; 
          let velY = (dy / dragDuration) * 20;
          
          // 限制最大速度
          const maxSpeed = 3;
          const speed = Math.sqrt(velX * velX + velY * velY);
          if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            velX *= scale;
            velY *= scale;
          }
          
          // 应用拖动方向的速度，只有当速度足够大时才应用
          if (speed > 0.3) {
            fruit.speedX = velX;
            fruit.speedY = velY;
            console.log(`水果朝拖动方向移动，速度: ${speed.toFixed(2)}`);
          } else {
            // 速度太小，使用随机速度
            fruit.speedX = (Math.random() - 0.5) * 0.8;
            fruit.speedY = (Math.random() - 0.5) * 0.8;
          }
        } else {
          // 极短拖动，给一个随机速度
          fruit.speedX = (Math.random() - 0.5) * 0.8;
          fruit.speedY = (Math.random() - 0.5) * 0.8;
        }
      } else {
        // 如果没有记录拖动起始位置，使用随机速度
        fruit.speedX = (Math.random() - 0.5) * 0.8;
        fruit.speedY = (Math.random() - 0.5) * 0.8;
      }
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
    
    // 同时显示果篮
    if (this.fruitBasket) {
      this.fruitBasket.style.display = 'block';
    }
    
    this.update();
  }
  
  hide() {
    this.isActive = false;
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.fruitContainer.style.display = 'none';
    
    // 同时隐藏果篮
    if (this.fruitBasket) {
      this.fruitBasket.style.display = 'none';
    }
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