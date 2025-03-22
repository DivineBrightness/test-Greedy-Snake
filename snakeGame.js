// snakeGame.js
class SnakeGame {
    constructor() {
      this.isPlaying = false; // 添加游戏状态标记
      this.canvas = document.getElementById('game-canvas');
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) console.error('Canvas 上下文未初始化');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.blockSize = 20;
      this.widthInBlocks = this.width / this.blockSize;
      this.heightInBlocks = this.height / this.blockSize;
      this.score = 0;
      this.highScore = localStorage.getItem('snakeHighScore') || 0;
      this.gameOver = false;
      this.paused = false;
      this.intervalId = null;
      this.snake = [{x: 6, y: 10}, {x: 5, y: 10}, {x: 4, y: 10}];
      this.direction = 'right';
      this.nextDirection = 'right';
      this.pausedDirection = null; // 暂停时记录的方向
      this.pausedNextDirection = null; // 暂停时记录的下一个方向
      this.food = this.createFood();
      this.scoreElement = document.getElementById('score');
      this.highScoreElement = document.getElementById('high-score');
      this.highScoreElement.textContent = this.highScore;
      this.keyDownHandler = this.handleKeyDown.bind(this); // 保存引用以便后续移除
      this.initEventListeners();
      loadLeaderboard("snake", "snake-leaderboard-content");
    }
  
// 修改 initEventListeners 方法，合并开始和暂停按钮
initEventListeners() {
  // 添加键盘事件监听器
  document.addEventListener('keydown', this.keyDownHandler);
  
  // 替换原来分开的开始和暂停按钮
  const playPauseBtn = document.getElementById('snake-play-pause-btn');
  const playPauseIcon = document.getElementById('snake-play-pause-icon');
  
  if (playPauseBtn) {
    this.playPauseBtnHandler = () => {
      if (this.gameOver) {
        // 重置游戏
        this.reset();
        this.start();
        playPauseIcon.src = './image/pause.svg';
      } else if (this.paused) {
        // 继续游戏
        this.togglePause();
        playPauseIcon.src = './image/pause.svg';
      } else if (!this.animationFrameId) {
        // 开始新游戏
        this.start();
        playPauseIcon.src = './image/pause.svg';
      } else {
        // 暂停游戏
        this.togglePause();
        playPauseIcon.src = './image/start.svg';
      }
    };
    
    playPauseBtn.addEventListener('click', this.playPauseBtnHandler);
  }
  
  // 修改方向按钮处理，添加暂停检查
  const upBtn = document.getElementById('up-btn');
  const leftBtn = document.getElementById('left-btn');
  const rightBtn = document.getElementById('right-btn');
  const downBtn = document.getElementById('down-btn');
  
  this.upBtnHandler = () => { 
    if (!this.paused && !this.gameOver && this.direction !== 'down') 
      this.nextDirection = 'up'; 
  };
  this.leftBtnHandler = () => { 
    if (!this.paused && !this.gameOver && this.direction !== 'right') 
      this.nextDirection = 'left'; 
  };
  this.rightBtnHandler = () => { 
    if (!this.paused && !this.gameOver && this.direction !== 'left') 
      this.nextDirection = 'right'; 
  };
  this.downBtnHandler = () => { 
    if (!this.paused && !this.gameOver && this.direction !== 'up') 
      this.nextDirection = 'down'; 
  };
  
  if (upBtn) upBtn.addEventListener('click', this.upBtnHandler);
  if (leftBtn) leftBtn.addEventListener('click', this.leftBtnHandler);
  if (rightBtn) rightBtn.addEventListener('click', this.rightBtnHandler);
  if (downBtn) downBtn.addEventListener('click', this.downBtnHandler);
}

// 更新 handleKeyDown 方法，确保空格键只触发一次暂停/继续
handleKeyDown(e) {
  // 阻止所有游戏控制键的默认行为
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
    e.preventDefault();
  }
  
  // 防止快速连续按空格键导致的闪烁问题
  if (e.key === ' ') {
    // 使用防抖处理空格键
    if (this.spaceKeyTimeout) {
      clearTimeout(this.spaceKeyTimeout);
    }
    
    this.spaceKeyTimeout = setTimeout(() => {
      if (!this.gameOver) {
        this.togglePause();
        
        // 同步更新按钮图标
        const playPauseIcon = document.getElementById('snake-play-pause-icon');
        if (playPauseIcon) {
          playPauseIcon.src = this.paused ? './image/start.svg' : './image/pause.svg';
        }
      }
    }, 100); // 100ms内的连续空格按键只响应一次
    
    return;
  }
  
  // 其他按键处理保持不变
  if (this.gameOver || this.paused) return;
  
  switch(e.key) {
    case 'ArrowUp': case 'w': case 'W': if (this.direction !== 'down') this.nextDirection = 'up'; break;
    case 'ArrowDown': case 's': case 'S': if (this.direction !== 'up') this.nextDirection = 'down'; break;
    case 'ArrowLeft': case 'a': case 'A': if (this.direction !== 'right') this.nextDirection = 'left'; break;
    case 'ArrowRight': case 'd': case 'D': if (this.direction !== 'left') this.nextDirection = 'right'; break;
  }
}
  
    createFood() {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * this.widthInBlocks),
          y: Math.floor(Math.random() * this.heightInBlocks)
        };
      } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
      return newFood;
    }
  
    drawBlock(x, y, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
      this.ctx.strokeStyle = '#FFF';
      this.ctx.strokeRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }
  
    drawScore() {
      this.scoreElement.textContent = this.score;
      if (this.score > this.highScore) {
        this.highScore = this.score;
        this.highScoreElement.textContent = this.highScore;
        localStorage.setItem('snakeHighScore', this.highScore);
      }
    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.snake.forEach((segment, index) => {
        const color = index === 0 ? '#4CAF50' : '#8BC34A';
        this.drawBlock(segment.x, segment.y, color);
      });
      this.drawBlock(this.food.x, this.food.y, '#FF5722');
    }
  
// 修改 drawGameOver 方法，在显示模态框时禁用键盘事件

drawGameOver() {
  // 清除Canvas
  this.ctx.clearRect(0, 0, this.width, this.height);
  
  // 显示模态框并更新其内容
  const modal = document.getElementById('snake-modal');
  const modalContent = modal.querySelector('div');
  
  // 更新模态框内容 - 将关闭按钮单独放在右上角
  modalContent.innerHTML = `
    <button class="modal-close-btn"><img src="./image/x-circle.svg" alt="关闭" class="close-icon"></button>
    <div class="modal-header">
      <h2 style="color:rgb(3, 93, 61); margin-bottom: 15px; font-size: 24px;">游戏结束!</h2>
    </div>
    <p style="font-size: 20px; margin-bottom: 20px;">最终得分: <strong>${this.score}</strong></p>
    <p style="margin-bottom: 15px;">选择你的名字提交成绩:</p>
    <select id="snake-player-select">
      <option value="">请选择</option>
    </select>
    <!-- 添加自定义输入框 -->
    <div class="custom-name-container">
      <span>或者</span>
      <input type="text" id="snake-custom-name" placeholder="输入自定义名字" maxlength="20">
    </div>
    <button id="snake-submit-btn" class="control-btn">提交成绩</button>
  `;
  
  // 重新填充玩家选择器
  populateSelect('snake-player-select');
  
  modal.style.display = 'flex';
  
  // 为关闭按钮添加事件处理
  const closeBtn = modalContent.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      console.log("点击关闭按钮");
      modal.style.display = 'none';
      this.reset();
    });
  }
  
  // 获取提交按钮的引用
  const submitBtn = document.getElementById('snake-submit-btn');
  
  // 如果找不到提交按钮，记录错误
  if (!submitBtn) {
    console.error('无法找到 snake-submit-btn 元素');
    return;
  }
  
  // 获取自定义输入框，添加焦点事件
  const customNameInput = document.getElementById('snake-custom-name');
  if (customNameInput) {
    // 当输入框获得焦点时，移除文档级别的键盘事件
    customNameInput.addEventListener('focus', () => {
      document.removeEventListener('keydown', this.keyDownHandler);
    });
    
    // 当输入框失去焦点时，恢复键盘事件
    customNameInput.addEventListener('blur', () => {
      document.addEventListener('keydown', this.keyDownHandler);
    });
  }
  
  submitBtn.onclick = async () => {
    const selectPlayerName = document.getElementById('snake-player-select').value;
    const customPlayerName = document.getElementById('snake-custom-name').value.trim();
    
    // 优先使用自定义名称，如果有的话
    const playerName = customPlayerName || selectPlayerName;
    
    if (playerName) {
      console.log(`提交分数: game=snake, player=${playerName}, score=${this.score}`);
      
      // 禁用按钮，防止重复提交
      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';
      
      try {
        await submitScore("snake", playerName, this.score);
        
        // 关闭模态框并重置游戏
        console.log("关闭 snake-modal");
        modal.style.display = 'none';
        this.reset();
        
        // 确保在提交后不立即重新出现排行榜，而是让用户有选择地点击排行榜按钮
        const leaderboardContent = document.getElementById('snake-leaderboard-content');
        if (leaderboardContent) {
          leaderboardContent.style.display = 'none';
        }
      } catch (error) {
        console.error('提交分数失败:', error);
        alert('提交失败，请重试');
      } finally {
        // 无论成功失败都恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.textContent = '提交成绩';
      }
    } else {
      alert("请选择或输入一个名字");
    }
  };
}
  
    // 修改 move 方法，增加更多防护措施
move() {
  if (this.paused || this.gameOver) {
    console.log('移动被跳过，原因：', this.gameOver ? '游戏结束' : '游戏暂停');
    return;
  }
  
  const head = {x: this.snake[0].x, y: this.snake[0].y};
  this.direction = this.nextDirection;
  
  switch(this.direction) {
    case 'up': head.y--; break;
    case 'down': head.y++; break;
    case 'left': head.x--; break;
    case 'right': head.x++; break;
  }
  
  if (this.checkCollision(head)) {
    console.log('检测到碰撞，游戏结束');
    this.gameOver = true;
    
    // 取消动画循环
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.drawGameOver();
    return;
  }
  
  this.snake.unshift(head);
  if (head.x === this.food.x && head.y === this.food.y) {
    this.score++;
    this.drawScore();
    this.food = this.createFood();
  } else {
    this.snake.pop();
  }
  
  this.draw();
}
  
    checkCollision(head) {
      if (head.x < 0 || head.x >= this.widthInBlocks || head.y < 0 || head.y >= this.heightInBlocks) return true;
      return this.snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y);
    }
  
// 修改 start 方法，优化动画帧处理
start() {
  // 防止多次调用
  if (this.animationFrameId) {
    console.log('游戏已经在运行中，忽略重复启动');
    return;
  }
  
  if (this.gameOver) {
    console.log('游戏已结束，需要重置后才能开始');
    return;
  }
  
  this.paused = false;
  this.isPlaying = true; // 设置游戏正在进行标记
  
  console.log('游戏开始运行');
  
  // 添加时间追踪
  this.lastUpdateTime = Date.now();
  this.updateInterval = 150; // 保持原游戏速度
  
  const gameLoop = () => {
    // 游戏结束或暂停时不再继续动画循环
    if (this.gameOver || this.paused) {
      console.log('游戏循环停止，原因：', this.gameOver ? '游戏结束' : '游戏暂停');
      this.animationFrameId = null; // 确保标志被正确重置
      return;
    }
    
    const now = Date.now();
    if (now - this.lastUpdateTime >= this.updateInterval) {
      this.move();
      this.lastUpdateTime = now;
    }
    
    // 保存动画帧ID，以便后续取消
    this.animationFrameId = requestAnimationFrame(gameLoop);
  };
  
  // 启动游戏循环
  this.animationFrameId = requestAnimationFrame(gameLoop);
}
  
// 修改 SnakeGame 类中的 togglePause 方法
togglePause() {
  if (this.gameOver) return;
  
  this.paused = !this.paused;
  const playPauseIcon = document.getElementById('snake-play-pause-icon');
  
  if (this.paused) {
    // 在暂停时记录当前方向，以便恢复时保持原来的方向
    this.pausedDirection = this.direction;
    this.pausedNextDirection = this.nextDirection;
    
    // 更新按钮图标为开始图标
    if (playPauseIcon) playPauseIcon.src = './image/start.svg';
    
    // 取消动画帧
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // 使用DOM元素显示暂停状态，而不是在Canvas上绘制
    this.showStaticPauseScreen();
    
    console.log('游戏已暂停');
  } else {
    // 恢复原来的方向
    if (this.pausedDirection && this.pausedNextDirection) {
      this.direction = this.pausedDirection;
      this.nextDirection = this.pausedNextDirection;
    }
    
    // 更新按钮图标为暂停图标
    if (playPauseIcon) playPauseIcon.src = './image/pause.svg';
    
    // 移除暂停层
    this.removeStaticPauseScreen();
    
    // 重绘游戏画面
    this.draw();
    
    // 确保不会重复启动动画
    if (!this.animationFrameId) {
      this.start();
    }
    console.log('游戏已继续');
  }
}
  
// 添加专门处理暂停屏幕绘制的方法
drawPauseScreen() {
  // 首先绘制当前游戏状态
  this.draw();
  
  // 添加半透明遮罩
  this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  this.ctx.fillRect(0, 0, this.width, this.height);
  
  // 添加暂停文字
  this.ctx.font = '30px Arial';
  this.ctx.fillStyle = '#333';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('游戏暂停', this.width / 2, this.height / 2);
}
    // 确保 reset 方法正确重置所有状态
reset() {
  console.log('重置游戏');
  
  // 取消可能存在的动画帧
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
  
  this.snake = [{x: 6, y: 10}, {x: 5, y: 10}, {x: 4, y: 10}];
  this.direction = 'right';
  this.nextDirection = 'right';
  this.pausedDirection = null; // 重置暂停方向记录
  this.pausedNextDirection = null; // 重置暂停下一方向记录
  this.food = this.createFood();
  this.score = 0;
  this.gameOver = false;
  this.paused = false;
  
  // 更新界面元素
  const playPauseIcon = document.getElementById('snake-play-pause-icon');
  if (playPauseIcon) playPauseIcon.src = './image/start.svg';
  
  this.drawScore();
  this.draw();
}

  // 修改 destroy 方法，确保清理暂停层
destroy() {
  // 清除游戏循环
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  
  // 取消动画帧
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
  
  // 移除事件监听器
  document.removeEventListener('keydown', this.keyDownHandler);
  
  // 移除控制按钮的事件处理器
  document.getElementById('snake-play-pause-btn')?.removeEventListener('click', this.playPauseBtnHandler);
  
  // 移除方向按钮的事件处理器
  document.getElementById('up-btn')?.removeEventListener('click', this.upBtnHandler);
  document.getElementById('left-btn')?.removeEventListener('click', this.leftBtnHandler);
  document.getElementById('right-btn')?.removeEventListener('click', this.rightBtnHandler);
  document.getElementById('down-btn')?.removeEventListener('click', this.downBtnHandler);
  
  // 移除暂停层
  this.removeStaticPauseScreen();
  
  // 重置游戏状态
  this.gameOver = true;
  this.paused = true;
  
  console.log('贪吃蛇游戏资源已清理');
}

// 更改 saveGameState 方法，确保所有必要状态都被保存
saveGameState() {
  // 确保游戏正在运行才保存状态
  if (this.gameOver || (!this.animationFrameId && !this.paused)) {
    console.log('游戏未在运行中，不保存状态');
    return null;
  }
  
  console.log('保存贪吃蛇游戏状态');
  return {
    snake: JSON.parse(JSON.stringify(this.snake)), // 深拷贝蛇身数组
    direction: this.direction,
    nextDirection: this.nextDirection,
    food: JSON.parse(JSON.stringify(this.food)), // 深拷贝食物对象
    score: this.score,
    highScore: this.highScore,
    gameInProgress: true,
    isPlaying: true // 添加这个关键标记
  };
}

// 修改 restoreGameState 方法，使用DOM元素显示暂停状态
restoreGameState(state) {
  if (!state || !state.gameInProgress) {
    console.log('没有可恢复的游戏状态');
    return false;
  }
  
  console.log('恢复贪吃蛇游戏状态');
  
  // 恢复游戏数据
  this.snake = state.snake;
  this.direction = state.direction;
  this.nextDirection = state.nextDirection;
  this.food = state.food;
  this.score = state.score;
  this.highScore = state.highScore || this.highScore;
  this.gameOver = false;
  this.paused = true; // 恢复时先暂停
  this.isPlaying = true; // 关键：标记游戏已经开始
  
  // 更新分数显示
  this.scoreElement.textContent = this.score;
  this.highScoreElement.textContent = this.highScore;
  
  // 绘制当前状态
  this.draw();
  // 使用DOM元素显示暂停状态，而不是在Canvas上绘制
  this.showStaticPauseScreen();
  
  // 更新暂停按钮图标
  const playPauseIcon = document.getElementById('snake-play-pause-icon');
  if (playPauseIcon) playPauseIcon.src = './image/start.svg';
  
  console.log('贪吃蛇游戏状态已恢复');
  return true;
}
// 修改 SnakeGame 类中的 showStaticPauseScreen 方法
showStaticPauseScreen() {
  // 检查是否已存在暂停层，避免创建多个
  let pauseLayer = document.getElementById('snake-pause-layer');
  if (!pauseLayer) {
    pauseLayer = document.createElement('div');
    pauseLayer.id = 'snake-pause-layer';
    
    // 精确计算画布中心位置
    const canvasRect = this.canvas.getBoundingClientRect();
    const pauseWidth = 120;
    const pauseHeight = 60;
    
    // 将暂停层添加到Canvas的父元素
    const canvasContainer = this.canvas.parentElement;
    
    if (canvasContainer) {
      // 确保父容器支持定位
      if (getComputedStyle(canvasContainer).position === 'static') {
        canvasContainer.style.position = 'relative';
      }
      
      // 插入到Canvas之后
      this.canvas.insertAdjacentElement('afterend', pauseLayer);
      
      // 调整样式，确保绝对居中
      pauseLayer.style.position = 'absolute';
      pauseLayer.style.top = '50%';
      pauseLayer.style.left = '50%';
      pauseLayer.style.transform = 'translate(-50%, -50%)';
      pauseLayer.style.width = pauseWidth + 'px';
      pauseLayer.style.height = pauseHeight + 'px';
      pauseLayer.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      pauseLayer.style.display = 'flex';
      pauseLayer.style.justifyContent = 'center';
      pauseLayer.style.alignItems = 'center';
      pauseLayer.style.zIndex = '100';
      pauseLayer.style.fontFamily = 'Arial, sans-serif';
      pauseLayer.style.fontSize = '24px';
      pauseLayer.style.color = '#333';
      pauseLayer.style.pointerEvents = 'none';
      pauseLayer.style.borderRadius = '10px';
      pauseLayer.textContent = '游戏暂停';
    }
  } else {
    pauseLayer.style.display = 'flex';
  }
}
// 添加移除静态暂停屏幕的方法
removeStaticPauseScreen() {
  const pauseLayer = document.getElementById('snake-pause-layer');
  if (pauseLayer) {
    // 先隐藏
    pauseLayer.style.display = 'none';
    
    // 完全移除元素
    setTimeout(() => {
      if (pauseLayer.parentNode) {
        pauseLayer.parentNode.removeChild(pauseLayer);
      }
    }, 50);
  }
}
  }