// tetrisGame.js
class TetrisGame {
    constructor() {
      this.canvas = document.getElementById('tetris-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.nextCanvas = document.getElementById('next-piece-canvas');
      this.nextCtx = this.nextCanvas.getContext('2d');
      this.isPlaying = false;
      this.blockSize = 20;
      this.cols = this.canvas.width / this.blockSize;
      this.rows = this.canvas.height / this.blockSize;
      this.score = 0;
      this.level = 1;
      this.highScore = localStorage.getItem('tetrisHighScore') || 0;
      this.gameOver = false;
      this.paused = false;
      this.grid = this.createGrid();
      this.intervalId = null;
      this.shapes = this.initShapes();
      this.currentShape = this.getRandomShape();
      this.nextShape = this.getRandomShape();
      this.currentX = Math.floor(this.cols / 2) - Math.floor(this.currentShape.shape[0].length / 2);
      this.currentY = 0;
      this.scoreElement = document.getElementById('tetris-score');
      this.highScoreElement = document.getElementById('tetris-high-score');
      this.levelElement = document.getElementById('tetris-level');
      this.highScoreElement.textContent = this.highScore;
      this.speed = 1000 - (this.level - 1) * 100;
      if (this.speed < 100) this.speed = 100;
      this.hasDrawnGameOver = false;
      this.isDropping = false; // 添加一键下落状态锁
      this.initEventListeners();
      this.initMobileControls();
      this.draw();
      loadLeaderboard("tetris", "tetris-leaderboard-content");
    }
  
    // 修复触摸控制中的错误（使用了错误的按钮引用）
initMobileControls() {
  // 先移除所有可能的旧按钮引用
  const rotateBtn = document.getElementById('rotate-btn');
  const leftBtn = document.getElementById('tetris-left-btn');
  const rightBtn = document.getElementById('tetris-right-btn');
  const downBtn = document.getElementById('tetris-down-btn');
  const dropBtn = document.getElementById('drop-btn');
  
  if (rotateBtn) rotateBtn.replaceWith(rotateBtn.cloneNode(true));
  if (leftBtn) leftBtn.replaceWith(leftBtn.cloneNode(true));
  if (rightBtn) rightBtn.replaceWith(rightBtn.cloneNode(true));
  if (downBtn) downBtn.replaceWith(downBtn.cloneNode(true));
  if (dropBtn) dropBtn.replaceWith(dropBtn.cloneNode(true));
  
  // 更严格的控制条件判断
  const canControl = () => {
    return this.isPlaying && !this.gameOver && !this.paused && !this.hasDrawnGameOver && !this.isDropping;
  };
  
  let lastTap = 0;
  const debounceTime = 200; // 防抖时间
  
  const handleTap = (action) => (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastTap < debounceTime || !canControl()) return;
    lastTap = now;
    action();
    this.draw();
  };
  
  const handleHold = (action) => {
    let intervalId = null;
    return {
      start: (e) => {
        e.preventDefault();
        if (!canControl()) return;
        action();
        this.draw();
        intervalId = setInterval(() => {
          if (!canControl()) {
            clearInterval(intervalId);
            intervalId = null;
            return;
          }
          action();
          this.draw();
        }, 150); 
      },
      stop: () => { 
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    };
  };
  
  // 重新获取已替换的按钮元素
  const newRotateBtn = document.getElementById('rotate-btn');
  const newLeftBtn = document.getElementById('tetris-left-btn');
  const newRightBtn = document.getElementById('tetris-right-btn');
  const newDownBtn = document.getElementById('tetris-down-btn');
  const newDropBtn = document.getElementById('drop-btn');
  
  // 修复这行 - 使用正确的按钮引用
  if (newRotateBtn) newRotateBtn.addEventListener('touchstart', handleTap(() => this.rotateShape()));
  if (newLeftBtn) newLeftBtn.addEventListener('touchstart', handleTap(() => this.moveLeft()));
  if (newRightBtn) newRightBtn.addEventListener('touchstart', handleTap(() => this.moveRight())); // 修复这里
  
  if (newDownBtn) {
    const downHandler = handleHold(() => this.moveDown());
    newDownBtn.addEventListener('touchstart', downHandler.start);
    newDownBtn.addEventListener('touchend', downHandler.stop);
    newDownBtn.addEventListener('touchcancel', downHandler.stop);
  }
  
  // 一键下落按钮使用增强版防抖
  if (newDropBtn) {
    let canDropAgain = true;
    const dropDebounceTime = 500; 
    
    newDropBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (canDropAgain && !this.isDropping && canControl()) {
        canDropAgain = false;
        this.moveBottom();
        setTimeout(() => { canDropAgain = true; }, dropDebounceTime);
      }
    });
  }
  
  // 防止滚动
  [newRotateBtn, newLeftBtn, newRightBtn, newDownBtn, newDropBtn].forEach(btn => {
    if (btn) btn.addEventListener('touchmove', (e) => e.preventDefault());
  });
}
  
    initShapes() {
      return [
        { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], color: '#4CC3D9' },  // 较暗的青色
        { shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]], color: '#3465A4' },  // 较暗的蓝色
        { shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: '#D97E00' },  // 较暗的橙色
        { shape: [[1, 1], [1, 1]], color: '#EDD400' },  // 较暗的黄色
        { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]], color: '#73D216' },  // 较暗的绿色
        { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]], color: '#75507B' },  // 较暗的紫色
        { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]], color: '#CC0000' }   // 较暗的红色
      ];
    }
    
    createGrid() {
      return Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }
  
    getRandomShape() {
      return this.shapes[Math.floor(Math.random() * this.shapes.length)];
    }
  
    rotateShape() {
      if (!this.isPlaying || this.gameOver || this.paused) return;
      let newShape = [];
      const shape = this.currentShape.shape;
      for (let y = 0; y < shape.length; y++) {
        newShape[y] = [];
        for (let x = 0; x < shape[y].length; x++) {
          newShape[y][x] = shape[shape.length - 1 - x][y];
        }
      }
      const originalShape = this.currentShape.shape;
      this.currentShape.shape = newShape;
      if (this.checkCollision()) this.currentShape.shape = originalShape;
      else this.draw();
    }
  
    moveLeft() {
      if (!this.isPlaying || this.gameOver || this.paused) return;
      this.currentX--;
      if (this.checkCollision()) this.currentX++;
      else this.draw();
    }
  
    moveRight() {
      if (!this.isPlaying || this.gameOver || this.paused) return;
      this.currentX++;
      if (this.checkCollision()) this.currentX--;
      else this.draw();
    }
  
    moveDown() {
      if (!this.isPlaying || this.gameOver || this.paused) return;
      this.currentY++;
      if (this.checkCollision()) {
        this.currentY--;
        this.freezeShape();
        if (this.gameOver) {
          this.drawGameOver();
          return;
        }
        this.removeCompleteRows();
        this.newShape();
        if (this.gameOver) {
          this.drawGameOver();
          return;
        }
      }
      if (!this.gameOver) this.draw();
    }
  
// 修改 moveBottom 方法，避免竞态条件
moveBottom() {
  if (!this.isPlaying || this.gameOver || this.paused || this.hasDrawnGameOver) return;
  
  // 标记当前正在执行一键下落，防止重复调用
  if (this.isDropping) return;
  this.isDropping = true;
  
  try {
    let maxSteps = Math.min(this.rows, 20); // 限制最大下落步数
    let hasMoved = false;
    
    while (!this.checkCollision() && maxSteps > 0 && !this.gameOver) {
      this.currentY++;
      hasMoved = true;
      maxSteps--;
    }
    
    if (hasMoved) this.currentY--;
    
    this.freezeShape();
    
    // 如果游戏已经结束，直接返回，不执行后续操作
    if (this.gameOver) return;
    
    this.removeCompleteRows();
    this.newShape();
    
    if (!this.gameOver) {
      this.draw();
    }
  } finally {
    // 确保无论如何都会重置状态锁，防止卡死
    setTimeout(() => {
      this.isDropping = false;
    }, 100);
  }
}
  
    checkCollision() {
      const shape = this.currentShape.shape;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const newX = this.currentX + x;
            const newY = this.currentY + y;
            if (newX < 0 || newX >= this.cols || newY >= this.rows) return true;
            if (newY >= 0 && this.grid[newY][newX]) return true;
          }
        }
      }
      return false;
    }
  
    // 修改 freezeShape 方法，确保游戏结束时彻底清理所有状态
freezeShape() {
  const shape = this.currentShape.shape;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newY = this.currentY + y;
        if (newY < 0) {
          // 游戏结束处理
          this.gameOver = true;
          this.isPlaying = false;
          
          // 清除所有定时器
          if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
          }
          
          // 移除移动设备上所有活动的触摸事件状态
          document.querySelectorAll('.direction-btn').forEach(btn => {
            btn.dispatchEvent(new Event('touchend'));
          });
          
          // 立即绘制游戏结束界面
          this.drawGameOver();
          return;
        }
        if (newY >= 0) this.grid[newY][this.currentX + x] = this.currentShape.color;
      }
    }
  }
}
  
    removeCompleteRows() {
      let rowsCleared = 0;
      for (let y = this.rows - 1; y >= 0; y--) {
        if (this.grid[y].every(cell => cell)) {
          rowsCleared++;
          this.grid.splice(y, 1);
          this.grid.unshift(Array(this.cols).fill(0));
          y++;
        }
      }
      if (rowsCleared > 0) {
        const points = [0, 100, 300, 500, 800];
        this.score += points[rowsCleared] * this.level;
        this.scoreElement.textContent = this.score;
        if (this.score > this.highScore) {
          this.highScore = this.score;
          this.highScoreElement.textContent = this.highScore;
          localStorage.setItem('tetrisHighScore', this.highScore);
        }
        if (Math.floor(this.score / 1000) > this.level - 1) {
          this.level = Math.floor(this.score / 1000) + 1;
          this.levelElement.textContent = this.level;
          this.speed = Math.max(100, 1000 - (this.level - 1) * 100);
          if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = setInterval(() => this.moveDown(), this.speed);
          }
        }
      }
    }
  
    newShape() {
      this.currentShape = this.nextShape;
      this.nextShape = this.getRandomShape();
      this.currentX = Math.floor(this.cols / 2) - Math.floor(this.currentShape.shape[0].length / 2);
      this.currentY = 0;
      if (this.checkCollision()) {
        this.gameOver = true;
        this.isPlaying = false;
        if (this.intervalId) clearInterval(this.intervalId);
        this.intervalId = null;
        console.log("游戏结束 - newShape 调用 drawGameOver");
        this.drawGameOver();
      } else {
        this.draw();
      }
    }
  
    drawBlock(x, y, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
      this.ctx.strokeStyle = '#FFF';
      this.ctx.strokeRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }
  
    drawNextShape() {
      this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
      const shape = this.nextShape.shape;
      const blockSize = this.nextCanvas.width / 6;
      const offsetX = (this.nextCanvas.width - shape[0].length * blockSize) / 2;
      const offsetY = (this.nextCanvas.height - shape.length * blockSize) / 2;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            this.nextCtx.fillStyle = this.nextShape.color;
            this.nextCtx.fillRect(offsetX + x * blockSize, offsetY + y * blockSize, blockSize, blockSize);
            this.nextCtx.strokeStyle = '#FFF';
            this.nextCtx.strokeRect(offsetX + x * blockSize, offsetY + y * blockSize, blockSize, blockSize);
          }
        }
      }
    }
  
    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.strokeStyle = '#e0e0e0';
      this.ctx.lineWidth = 0.5;
      for (let x = 0; x < this.cols; x++) {
        for (let y = 0; y < this.rows; y++) {
          this.ctx.strokeRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
        }
      }
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (this.grid[y][x]) this.drawBlock(x, y, this.grid[y][x]);
        }
      }
      if (this.isPlaying && !this.gameOver && !this.paused && this.currentShape) {
        const shape = this.currentShape.shape;
        for (let y = 0; y < shape.length; y++) {
          for (let x = 0; x < shape[y].length; x++) {
            if (shape[y][x] && this.currentY + y >= 0) {
              this.drawBlock(this.currentX + x, this.currentY + y, this.currentShape.color);
            }
          }
        }
      }
      this.drawNextShape();
    }
  
// 修改 drawGameOver 方法，确保重置相关状态
drawGameOver() {
  if (this.hasDrawnGameOver) return;
  this.hasDrawnGameOver = true;
  
  // 确保所有游戏循环停止
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  
  this.isPlaying = false;
  this.gameOver = true;
  this.isDropping = false; // 重置下落状态锁
  
  // 清空按键状态
  document.querySelectorAll('.direction-btn').forEach(btn => {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
    }
    btn.disabled = true;
  });
  
  // 不再在Canvas上绘制文字
  this.draw(); // 最后一次绘制当前状态
  
  // 显示模态框并更新其内容
  const modal = document.getElementById('tetris-modal');
  if (!modal) return console.error("未找到 tetris-modal 元素");
  
  // 更新模态框内容
  const modalContent = modal.querySelector('div');
  modalContent.innerHTML = `
    <h2 style="color: rgb(3, 93, 61); margin-bottom: 15px; font-size: 24px;">游戏结束!</h2>
    <p style="font-size: 20px; margin-bottom: 20px;">最终得分: <strong>${this.score}</strong></p>
    <p style="margin-bottom: 15px;">选择你的名字提交成绩:</p>
    <select id="tetris-player-select"></select>
    <button id="tetris-submit-btn" class="control-btn">提交成绩</button>
  `;
  
  // 重新填充玩家选择器
  populateSelect('tetris-player-select');
  
  console.log("显示 tetris-modal");
  modal.style.display = 'flex';
  
  // 设置提交按钮事件
  const submitBtn = document.getElementById('tetris-submit-btn');
  if (!submitBtn) return console.error("未找到 tetris-submit-btn 元素");
  
  submitBtn.onclick = async () => {
    const playerName = document.getElementById('tetris-player-select').value;
    if (playerName) {
      console.log(`提交分数: game=tetris, player=${playerName}, score=${this.score}`);
      await submitScore("tetris", playerName, this.score);
      await loadLeaderboard("tetris", "tetris-leaderboard-content");
      
      // 关闭模态框
      console.log("关闭 tetris-modal");
      modal.style.display = 'none';
      
      // 完全重置游戏
      this.fullReset();
      
      // 启用所有控制按钮
      document.querySelectorAll('.direction-btn').forEach(btn => {
        btn.disabled = false;
      });
    } else {
      alert("请选择一个名字");
    }
  };
}
  
// 改进 initEventListeners 方法，确保单次事件注册
initEventListeners() {
  // 先移除旧的事件监听器
  if (this.keyDownHandler) {
    document.removeEventListener('keydown', this.keyDownHandler);
  }
  
  // 为快速下落添加更强的防抖控制
  let canDropAgain = true;
  const dropDebounceTime = 500; 
  
  this.keyDownHandler = (e) => {
    if (!this.isPlaying || this.gameOver || this.paused || this.hasDrawnGameOver) return;
    
    const key = e.key;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(key)) {
      e.preventDefault();
    }
    
    // 使用防抖控制空格键（一键下落）
    if (key === ' ') {
      if (canDropAgain && !this.isDropping) {
        canDropAgain = false;
        this.moveBottom();
        setTimeout(() => { canDropAgain = true; }, dropDebounceTime);
      }
      return;
    }
    
    // 其他按键正常响应
    switch (key) {
      case 'ArrowUp': case 'w': case 'W': this.rotateShape(); break;
      case 'ArrowDown': case 's': case 'S': this.moveDown(); break;
      case 'ArrowLeft': case 'a': case 'A': this.moveLeft(); break;
      case 'ArrowRight': case 'd': case 'D': this.moveRight(); break;
      case 'p': case 'P': this.togglePause(); break;
    }
  };
  
  document.addEventListener('keydown', this.keyDownHandler);
  
  // 游戏控制按钮 - 使用箭头函数以正确绑定this
  const startBtn = document.getElementById('tetris-start-btn');
  const pauseBtn = document.getElementById('tetris-pause-btn');
  
  if (startBtn) {
    startBtn.replaceWith(startBtn.cloneNode(true));
    const newStartBtn = document.getElementById('tetris-start-btn');
    newStartBtn.addEventListener('click', () => {
      console.log("点击开始按钮");
      if (this.gameOver || !this.isPlaying) {
        if (this.gameOver) {
          console.log("游戏已结束，重置游戏");
          this.fullReset();
        }
        console.log("开始游戏");
        this.start();
      }
    });
  }
  
  if (pauseBtn) {
    pauseBtn.replaceWith(pauseBtn.cloneNode(true));
    const newPauseBtn = document.getElementById('tetris-pause-btn');
    newPauseBtn.addEventListener('click', () => {
      console.log("点击暂停按钮");
      this.togglePause();
    });
  }
}
  
    handleKeyDown(e) {
      if (!this.isPlaying || this.paused) return;
      const key = e.key;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(key)) e.preventDefault();
      switch (key) {
        case 'ArrowUp': case 'w': case 'W': this.rotateShape(); break;
        case 'ArrowDown': case 's': case 'S': this.moveDown(); break;
        case 'ArrowLeft': case 'a': case 'A': this.moveLeft(); break;
        case 'ArrowRight': case 'd': case 'D': this.moveRight(); break;
        case ' ': this.moveBottom(); break;
        case 'p': case 'P': this.togglePause(); break;
      }
    }
  
    start() {
      if (this.intervalId) return;
      this.paused = false;
      this.isPlaying = true;
      document.getElementById('tetris-pause-btn').textContent = '暂停';
      this.intervalId = setInterval(() => this.moveDown(), this.speed);
    }
  
    togglePause() {
      if (this.gameOver) return;
      this.paused = !this.paused;
      if (this.paused) {
        document.getElementById('tetris-pause-btn').textContent = '继续';
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = '#333';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('游戏暂停', this.canvas.width / 2, this.canvas.height / 2);
      } else {
        document.getElementById('tetris-pause-btn').textContent = '暂停';
        this.start();
      }
    }
  
    reset() {
      this.fullReset();
    }
// 修改 fullReset 方法，确保干净重置
fullReset() {
  console.log("执行完全重置");
  
  // 首先清除所有事件监听器和定时器
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  
  if (this.keyDownHandler) {
    document.removeEventListener('keydown', this.keyDownHandler);
    this.keyDownHandler = null;
  }
  
  // 重置游戏状态
  this.grid = this.createGrid();
  this.score = 0;
  this.level = 1;
  this.speed = 1000;
  this.currentShape = this.getRandomShape();
  this.nextShape = this.getRandomShape();
  this.currentX = Math.floor(this.cols / 2) - Math.floor(this.currentShape.shape[0].length / 2);
  this.currentY = 0;
  this.gameOver = false;
  this.paused = false;
  this.isPlaying = false;
  this.hasDrawnGameOver = false;
  this.isDropping = false;
  
  // 更新UI
  if (this.scoreElement) this.scoreElement.textContent = '0';
  if (this.levelElement) this.levelElement.textContent = '1';
  
  // 启用所有控制按钮
  document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.disabled = false;
  });
  
  // 重新初始化事件监听器
  this.initEventListeners();
  this.initMobileControls();
  
  // 重绘游戏区域
  this.draw();
  
  console.log("游戏状态已完全重置");
}
    // 添加 destroy 方法以清理资源
    destroy() {
      // 清除游戏循环
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
      
      // 移除事件监听器
      document.removeEventListener('keydown', this.keyDownHandler);
      
      // 重置游戏状态
      this.gameOver = true;
      this.paused = true;
      this.isPlaying = false;
      
      // 清理触摸事件的活动状态
      document.querySelectorAll('.direction-btn').forEach(btn => {
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
        }
        btn.disabled = false;
      });
      
      console.log('俄罗斯方块游戏资源已清理');
    }
  }