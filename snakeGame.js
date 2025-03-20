// snakeGame.js
class SnakeGame {
    constructor() {
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
      this.food = this.createFood();
      this.scoreElement = document.getElementById('score');
      this.highScoreElement = document.getElementById('high-score');
      this.highScoreElement.textContent = this.highScore;
      this.keyDownHandler = this.handleKeyDown.bind(this); // 保存引用以便后续移除
      this.initEventListeners();
      loadLeaderboard("snake", "snake-leaderboard-content");
    }
  
    initEventListeners() {
      // 添加键盘事件监听器
      document.addEventListener('keydown', this.keyDownHandler);
      
      // 保存事件处理器引用
      this.startBtnHandler = () => {
        if (this.gameOver) this.reset();
        this.start();
      };
      this.pauseBtnHandler = () => this.togglePause();
      
      document.getElementById('start-btn').addEventListener('click', this.startBtnHandler);
      document.getElementById('pause-btn').addEventListener('click', this.pauseBtnHandler);
      
      // 方向按钮处理
      const upBtn = document.getElementById('up-btn');
      const leftBtn = document.getElementById('left-btn');
      const rightBtn = document.getElementById('right-btn');
      const downBtn = document.getElementById('down-btn');
      
      this.upBtnHandler = () => { if (this.direction !== 'down') this.nextDirection = 'up'; };
      this.leftBtnHandler = () => { if (this.direction !== 'right') this.nextDirection = 'left'; };
      this.rightBtnHandler = () => { if (this.direction !== 'left') this.nextDirection = 'right'; };
      this.downBtnHandler = () => { if (this.direction !== 'up') this.nextDirection = 'down'; };
      
      if (upBtn) upBtn.addEventListener('click', this.upBtnHandler);
      if (leftBtn) leftBtn.addEventListener('click', this.leftBtnHandler);
      if (rightBtn) rightBtn.addEventListener('click', this.rightBtnHandler);
      if (downBtn) downBtn.addEventListener('click', this.downBtnHandler);
    }
  
    handleKeyDown(e) {
      const key = e.key;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) e.preventDefault();
      if (this.gameOver) return;
      switch(key) {
        case 'ArrowUp': case 'w': case 'W': if (this.direction !== 'down') this.nextDirection = 'up'; break;
        case 'ArrowDown': case 's': case 'S': if (this.direction !== 'up') this.nextDirection = 'down'; break;
        case 'ArrowLeft': case 'a': case 'A': if (this.direction !== 'right') this.nextDirection = 'left'; break;
        case 'ArrowRight': case 'd': case 'D': if (this.direction !== 'left') this.nextDirection = 'right'; break;
        case ' ': this.togglePause(); break;
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
  
// 修改 drawGameOver 方法中的模态框 HTML 结构
drawGameOver() {
  // 清除Canvas
  this.ctx.clearRect(0, 0, this.width, this.height);
  
  // 显示模态框并更新其内容
  const modal = document.getElementById('snake-modal');
  const modalContent = modal.querySelector('div');
  
  // 更新模态框内容 - 将关闭按钮移到外层
  modalContent.innerHTML = `
    <button class="modal-close-btn">&times;</button>
    <div class="modal-header">
      <h2 style="color:rgb(3, 93, 61); margin-bottom: 15px; font-size: 24px;">游戏结束!</h2>
    </div>
    <p style="font-size: 20px; margin-bottom: 20px;">最终得分: <strong>${this.score}</strong></p>
    <p style="margin-bottom: 15px;">选择你的名字提交成绩:</p>
    <select id="snake-player-select"></select>
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
  
  // 为提交按钮添加点击事件
  submitBtn.onclick = async () => {
    const playerName = document.getElementById('snake-player-select').value;
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
      alert("请选择一个名字");
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
  
    // 修改 start 方法，确保正确处理动画帧
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
  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) pauseBtn.textContent = '暂停';
  
  console.log('游戏开始运行');
  
  // 添加时间追踪
  this.lastUpdateTime = Date.now();
  this.updateInterval = 150; // 保持原游戏速度
  
  const gameLoop = () => {
    // 游戏结束或暂停时不再继续动画循环
    if (this.gameOver || this.paused) {
      console.log('游戏循环停止，原因：', this.gameOver ? '游戏结束' : '游戏暂停');
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
  
// 修复 togglePause 方法，确保正确处理暂停状态
togglePause() {
  if (this.gameOver) return;
  
  this.paused = !this.paused;
  const pauseBtn = document.getElementById('pause-btn');
  
  if (this.paused) {
    pauseBtn.textContent = '继续';
    // 取消动画帧
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // 显示暂停文字
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = '#333';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('游戏暂停', this.width / 2, this.height / 2);
    
    console.log('游戏已暂停');
  } else {
    pauseBtn.textContent = '暂停';
    // 确保不会重复启动动画
    if (!this.animationFrameId) {
      this.start();
    }
    console.log('游戏已继续');
  }
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
  this.food = this.createFood();
  this.score = 0;
  this.gameOver = false;
  this.paused = false;
  
  // 更新界面元素
  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) pauseBtn.textContent = '暂停';
  
  this.drawScore();
  this.draw();
}

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
      document.getElementById('start-btn')?.removeEventListener('click', this.startBtnHandler);
      document.getElementById('pause-btn')?.removeEventListener('click', this.pauseBtnHandler);
      
      // 移除方向按钮的事件处理器
      document.getElementById('up-btn')?.removeEventListener('click', this.upBtnHandler);
      document.getElementById('left-btn')?.removeEventListener('click', this.leftBtnHandler);
      document.getElementById('right-btn')?.removeEventListener('click', this.rightBtnHandler);
      document.getElementById('down-btn')?.removeEventListener('click', this.downBtnHandler);
      
      // 重置游戏状态
      this.gameOver = true;
      this.paused = true;
      
      console.log('贪吃蛇游戏资源已清理');
    }
  }