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
    this.colors = this.initColors(); // 添加颜色数组
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

  // 添加颜色初始化方法
initColors() {
  return [
    '#4CC3D9',  // 较暗的青色
    '#3465A4',  // 较暗的蓝色
    '#D97E00',  // 较暗的橙色
    '#EDD400',  // 较暗的黄色
    '#73D216',  // 较暗的绿色
    '#75507B',  // 较暗的紫色
    '#CC0000'   // 较暗的红色
  ];
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
  
  // 设置不同的时间间隔参数，提供更好的手机触摸体验
  const initialDelay = 100; // 首次触摸到开始重复的延迟
  const repeatInterval = 120; // 重复的间隔时间，比键盘略慢一些，更适合触摸
  
  // 单击处理函数
  const handleTap = (action) => (e) => {
    e.preventDefault();
    if (!canControl()) return;
    action();
    this.draw();
  };
  
  // 长按处理函数，支持连续操作
  const handleHold = (action) => {
    let intervalId = null;
    return {
      start: (e) => {
        e.preventDefault();
        if (!canControl()) return;
        
        // 立即执行一次动作
        action();
        this.draw();
        
        // 设置重复执行
        intervalId = setTimeout(() => {
          // 开始连续重复执行
          intervalId = setInterval(() => {
            if (!canControl()) {
              clearInterval(intervalId);
              intervalId = null;
              return;
            }
            action();
            this.draw();
          }, repeatInterval);
        }, initialDelay);
      },
      stop: () => { 
        // 清理定时器
        if (intervalId) {
          clearTimeout(intervalId);
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
  
  // 旋转按钮只需单击
  if (newRotateBtn) newRotateBtn.addEventListener('touchstart', handleTap(() => this.rotateShape()));
  
  // 左移按钮支持长按快速移动
  if (newLeftBtn) {
    const leftHandler = handleHold(() => this.moveLeft());
    newLeftBtn.addEventListener('touchstart', leftHandler.start);
    newLeftBtn.addEventListener('touchend', leftHandler.stop);
    newLeftBtn.addEventListener('touchcancel', leftHandler.stop);
  }
  
  // 右移按钮支持长按快速移动
  if (newRightBtn) {
    const rightHandler = handleHold(() => this.moveRight());
    newRightBtn.addEventListener('touchstart', rightHandler.start);
    newRightBtn.addEventListener('touchend', rightHandler.stop);
    newRightBtn.addEventListener('touchcancel', rightHandler.stop);
  }
  
  // 下移按钮支持长按快速移动
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
  
// 修改形状初始化方法，移除颜色信息
initShapes() {
  return [
    { shape: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]] },
    { shape: [[1, 0, 0], [1, 1, 1], [0, 0, 0]] },
    { shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]] },
    { shape: [[1, 1], [1, 1]] },
    { shape: [[0, 1, 1], [1, 1, 0], [0, 0, 0]] },
    { shape: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] },
    { shape: [[1, 1, 0], [0, 1, 1], [0, 0, 0]] }
  ];
}
    
    createGrid() {
      return Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }
  
    // 修改获取随机形状的方法，为形状随机分配颜色
getRandomShape() {
  // 获取随机形状的索引
  const randomIndex = Math.floor(Math.random() * this.shapes.length);
  // 获取随机颜色的索引
  const randomColorIndex = Math.floor(Math.random() * this.colors.length);
  const originalShape = this.shapes[randomIndex];
  
  // 创建深拷贝并分配随机颜色
  return {
    shape: JSON.parse(JSON.stringify(originalShape.shape)),
    color: this.colors[randomColorIndex]
  };
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
    // 在 removeCompleteRows 方法中修改以下代码段
    if (Math.floor(this.score / 1000) > this.level - 1) {
      this.level = Math.floor(this.score / 1000) + 1;
      this.levelElement.textContent = this.level;
      
      // 保持之前的速度计算逻辑
      if (this.level <= 5) {
        this.speed = 1000 - (this.level - 1) * 100;
      } else if (this.level <= 10) {
        this.speed = 500 - (this.level - 5) * 30;
      } else if (this.level <= 15) {
        this.speed = 350 - (this.level - 10) * 20;
      } else if (this.level <= 20) {
        this.speed = 250 - (this.level - 15) * 10;
      } else {
        this.speed = 200;
      }
      
      if (this.speed < 200) this.speed = 200;
      
      // 移除这段代码，不再使用 setInterval 重置游戏循环
      // if (this.intervalId) {
      //   clearInterval(this.intervalId);
      //   this.intervalId = setInterval(() => this.moveDown(), this.speed);
      // }
      
      // 只需更新速度变量，让 requestAnimationFrame 循环使用新速度即可
      console.log(`升级到 ${this.level} 级，速度更新为 ${this.speed}ms`);
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
  
    // 修改 draw 方法，避免在暂停状态下重复绘制
draw() {
  // 如果处于暂停状态且不是强制绘制，则不更新画面
  if (this.paused && arguments.length === 0) return;
  
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.strokeStyle = '#e0e0e0';
  this.ctx.lineWidth = 0.5;
  
  // 绘制网格
  for (let x = 0; x < this.cols; x++) {
    for (let y = 0; y < this.rows; y++) {
      this.ctx.strokeRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
    }
  }
  
  // 绘制已固定的方块
  for (let y = 0; y < this.rows; y++) {
    for (let x = 0; x < this.cols; x++) {
      if (this.grid[y][x]) this.drawBlock(x, y, this.grid[y][x]);
    }
  }
  
  // 绘制当前活动方块
  if (this.isPlaying && !this.gameOver && this.currentShape) {
    const shape = this.currentShape.shape;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] && this.currentY + y >= 0) {
          this.drawBlock(this.currentX + x, this.currentY + y, this.currentShape.color);
        }
      }
    }
  }
  
  // 绘制下一个方块预览
  this.drawNextShape();
}
  
// 修改 drawGameOver 方法，确保关闭按钮使用SVG图标并位于正确位置
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
  
  // 更新模态框内容 - 将关闭按钮单独放在右上角
  const modalContent = modal.querySelector('div');
  
  // 完全重写HTML内容，确保按钮在正确位置
  modalContent.innerHTML = `
    <button class="modal-close-btn"><img src="./image/x-circle.svg" alt="关闭" class="close-icon"></button>
    <div class="modal-header">
      <h2 style="color: rgb(3, 93, 61); margin-bottom: 15px; font-size: 24px;">游戏结束!</h2>
    </div>
    <p style="font-size: 20px; margin-bottom: 20px;">最终得分: <strong>${this.score}</strong></p>
    <p style="margin-bottom: 15px;">选择你的名字提交成绩:</p>
    <select id="tetris-player-select"></select>
    <button id="tetris-submit-btn" class="control-btn">提交成绩</button>
  `;
  
  // 重新填充玩家选择器
  populateSelect('tetris-player-select');
  
  console.log("显示 tetris-modal");
  modal.style.display = 'flex';
  
  // 为关闭按钮添加事件处理
  const closeBtn = modalContent.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      console.log("点击关闭按钮");
      modal.style.display = 'none';
      this.fullReset();
      
      // 启用所有控制按钮
      document.querySelectorAll('.direction-btn').forEach(btn => {
        btn.disabled = false;
      });
    });
  }
  
  // 设置提交按钮事件
  const submitBtn = document.getElementById('tetris-submit-btn');
  if (!submitBtn) return console.error("未找到 tetris-submit-btn 元素");
  
  submitBtn.onclick = async () => {
    const playerName = document.getElementById('tetris-player-select').value;
    if (playerName) {
      console.log(`提交分数: game=tetris, player=${playerName}, score=${this.score}`);
      await submitScore("tetris", playerName, this.score);
      
      // 关闭模态框并重置游戏
      console.log("关闭 tetris-modal");
      modal.style.display = 'none';
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
  
// 修改键盘处理事件，确保空格键不导致页面滚动
initEventListeners() {
  // 先移除旧的事件监听器
  if (this.keyDownHandler) {
    document.removeEventListener('keydown', this.keyDownHandler);
  }
  if (this.keyUpHandler) {
    document.removeEventListener('keyup', this.keyUpHandler);
  }
  
  // 为快速下落添加更强的防抖控制
  let canDropAgain = true;
  const dropDebounceTime = 500; 
  
  // 添加按键状态追踪
  this.keyState = {
    left: false,
    right: false,
    down: false
  };
  
  // 添加重复按键的间隔控制
  this.keyInterval = {
    left: null,
    right: null,
    down: null
  };
  
  // 设置重复间隔 - 初始延迟和后续重复的间隔
  const initialDelay = 200; // 首次按下到开始重复的延迟
  const repeatInterval = 80; // 重复的间隔时间
  
  // 处理按键按下事件
  this.keyDownHandler = (e) => {
    // 对所有游戏控制键始终阻止默认行为，即使游戏暂停或结束
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' ', 'p', 'P'].includes(e.key)) {
      e.preventDefault(); // 阻止默认行为，防止空格键滚动页面
    }
    
    // 允许P键在任何状态下都能触发暂停/继续，只要游戏没有结束
    if (e.key === 'p' || e.key === 'P') {
      if (!this.gameOver && !this.hasDrawnGameOver) {
        this.togglePause();
      }
      return;
    }
    
    // 如果游戏未开始或已暂停或已结束，不响应其他控制键
    if (!this.isPlaying || this.gameOver || this.paused || this.hasDrawnGameOver) return;
    
    // 长按空格键（一键下落）使用防抖控制
    if (e.key === ' ') {
      if (canDropAgain && !this.isDropping) {
        canDropAgain = false;
        this.moveBottom();
        setTimeout(() => { canDropAgain = true; }, dropDebounceTime);
      }
      return;
    }
    
    // 响应其他按键 - 保持不变
    switch (e.key) {
      case 'ArrowUp': case 'w': case 'W': 
        this.rotateShape(); 
        break;
        
      case 'ArrowLeft': case 'a': case 'A': 
        // 首次按下立即执行一次
        if (!this.keyState.left) {
          this.moveLeft();
          this.keyState.left = true;
          
          // 设置延迟后开始重复执行
          this.keyInterval.left = setTimeout(() => {
            this.keyInterval.left = setInterval(() => {
              this.moveLeft();
            }, repeatInterval);
          }, initialDelay);
        }
        break;
        
      case 'ArrowRight': case 'd': case 'D': 
        // 首次按下立即执行一次
        if (!this.keyState.right) {
          this.moveRight();
          this.keyState.right = true;
          
          // 设置延迟后开始重复执行
          this.keyInterval.right = setTimeout(() => {
            this.keyInterval.right = setInterval(() => {
              this.moveRight();
            }, repeatInterval);
          }, initialDelay);
        }
        break;
        
      case 'ArrowDown': case 's': case 'S': 
        // 首次按下立即执行一次
        if (!this.keyState.down) {
          this.moveDown();
          this.keyState.down = true;
          
          // 设置延迟后开始重复执行
          this.keyInterval.down = setTimeout(() => {
            this.keyInterval.down = setInterval(() => {
              this.moveDown();
            }, repeatInterval);
          }, initialDelay);
        }
        break;
    }
  };
  
  // 处理按键释放事件 - 保持不变
  this.keyUpHandler = (e) => {
    const key = e.key;
    
    switch (key) {
      case 'ArrowLeft': case 'a': case 'A':
        this.keyState.left = false;
        if (this.keyInterval.left) {
          clearTimeout(this.keyInterval.left);
          clearInterval(this.keyInterval.left);
          this.keyInterval.left = null;
        }
        break;
        
      case 'ArrowRight': case 'd': case 'D':
        this.keyState.right = false;
        if (this.keyInterval.right) {
          clearTimeout(this.keyInterval.right);
          clearInterval(this.keyInterval.right);
          this.keyInterval.right = null;
        }
        break;
        
      case 'ArrowDown': case 's': case 'S':
        this.keyState.down = false;
        if (this.keyInterval.down) {
          clearTimeout(this.keyInterval.down);
          clearInterval(this.keyInterval.down);
          this.keyInterval.down = null;
        }
        break;
    }
  };
  
  // 注册按键事件
  document.addEventListener('keydown', this.keyDownHandler);
  document.addEventListener('keyup', this.keyUpHandler);
  
  // 替换合并后的开始/暂停按钮
  const playPauseBtn = document.getElementById('tetris-play-pause-btn');
  const playPauseIcon = document.getElementById('tetris-play-pause-icon');
  
  if (playPauseBtn) {
    // 移除可能已存在的旧事件处理器
    if (this.playPauseBtnHandler) {
      playPauseBtn.removeEventListener('click', this.playPauseBtnHandler);
    }
    
    this.playPauseBtnHandler = () => {
      console.log("点击开始/暂停按钮，当前状态:", 
                  this.gameOver ? "游戏结束" : 
                  this.paused ? "已暂停" : 
                  this.isPlaying ? "游戏中" : "未开始");
                  
      if (this.gameOver) {
        // 重置游戏
        this.fullReset();
        this.start();
        playPauseIcon.src = './image/pause.svg';
      } else if (this.paused) {
        // 继续游戏
        this.togglePause();
        playPauseIcon.src = './image/pause.svg';
      } else if (!this.isPlaying) {
        // 开始新游戏
        this.start();
        playPauseIcon.src = './image/pause.svg';
      } else {
        // 暂停游戏
        this.togglePause();
        playPauseIcon.src = './image/start.svg';
      }
    };
    
    // 添加新的事件处理器
    playPauseBtn.addEventListener('click', this.playPauseBtnHandler);
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
  
// 5. 修改 start 方法，使用 requestAnimationFrame 实现更平滑的动画
start() {
  if (this.intervalId) {
    console.log('游戏已经在运行中，忽略重复启动');
    return;
  }
  
  this.paused = false;
  this.isPlaying = true;
  
  // 更新按钮图标为暂停图标
  const playPauseIcon = document.getElementById('tetris-play-pause-icon');
  if (playPauseIcon) playPauseIcon.src = './image/pause.svg';
  
  // 移除可能存在的暂停层
  this.removeStaticPauseScreen();
  
  // 使用 requestAnimationFrame 替代 setInterval
  let lastUpdateTime = Date.now();
  let animationFrameHandler = null;
  
  const gameLoop = () => {
    if (this.gameOver || this.paused) {
      console.log('游戏循环停止，原因:', this.gameOver ? '游戏结束' : '游戏暂停');
      this.intervalId = null;
      return;
    }
    
    const now = Date.now();
    if (now - lastUpdateTime >= this.speed) {
      this.moveDown();
      lastUpdateTime = now;
    }
    
    // 继续游戏循环
    this.intervalId = requestAnimationFrame(gameLoop);
  };
  
  // 启动游戏循环
  this.intervalId = requestAnimationFrame(gameLoop);
  console.log('游戏循环已启动，使用requestAnimationFrame');
}
  
// 修改 togglePause 方法，确保在取消暂停时彻底移除暂停层
togglePause() {
  if (this.gameOver) return;
  
  // 添加防抖，防止短时间内多次调用
  if (this._togglePauseTimeout) {
    console.log('忽略快速连续的暂停请求');
    return;
  }
  
  this._togglePauseTimeout = setTimeout(() => {
    this._togglePauseTimeout = null;
  }, 300);
  
  // 切换暂停状态
  this.paused = !this.paused;
  console.log(`游戏${this.paused ? '暂停' : '继续'}`);
  
  const playPauseIcon = document.getElementById('tetris-play-pause-icon');
  
  if (this.paused) {
    // 更新按钮图标为开始图标
    if (playPauseIcon) playPauseIcon.src = './image/start.svg';
    
    // 取消所有定时器，确保不再发生绘制
    if (this.intervalId) {
      if (typeof this.intervalId === 'number') {
        cancelAnimationFrame(this.intervalId);
      } else {
        clearInterval(this.intervalId);
      }
      this.intervalId = null;
    }
    
    // 清理所有按键状态
    this.clearAllKeyStates();
    
    // 绘制暂停画面
    this.drawStaticPauseScreen();
  } else {
    // 更新按钮图标为暂停图标
    if (playPauseIcon) playPauseIcon.src = './image/pause.svg';
    
    // 彻底移除暂停画面层
    this.removeStaticPauseScreen();
    
    // 重新绘制游戏画面并启动游戏循环
    this.draw();
    
    // 确保游戏重新启动前有一小段延迟，让暂停层完全移除
    setTimeout(() => {
      if (!this.gameOver && !this.paused) {
        this.start();
      }
    }, 50);
  }
}
  
// 修复 fullReset 方法，确保事件监听器正确初始化
fullReset() {
  console.log("执行完全重置");
  
  // 首先清除所有事件监听器和定时器
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  
  // 清除按键状态和间隔
  if (this.keyInterval) {
    if (this.keyInterval.left) {
      clearTimeout(this.keyInterval.left);
      clearInterval(this.keyInterval.left);
      this.keyInterval.left = null;
    }
    if (this.keyInterval.right) {
      clearTimeout(this.keyInterval.right);
      clearInterval(this.keyInterval.right);
      this.keyInterval.right = null;
    }
    if (this.keyInterval.down) {
      clearTimeout(this.keyInterval.down);
      clearInterval(this.keyInterval.down);
      this.keyInterval.down = null;
    }
  }
  
  // 重置按键状态
  if (this.keyState) {
    this.keyState.left = false;
    this.keyState.right = false;
    this.keyState.down = false;
  }
  
  // 防止重复删除同一个事件监听器
  if (this.keyDownHandler) {
    document.removeEventListener('keydown', this.keyDownHandler);
    this.keyDownHandler = null;
  }
  
  if (this.keyUpHandler) {
    document.removeEventListener('keyup', this.keyUpHandler);
    this.keyUpHandler = null;
  }
  
  // 移除暂停按钮事件监听器
  const playPauseBtn = document.getElementById('tetris-play-pause-btn');
  if (playPauseBtn && this.playPauseBtnHandler) {
    playPauseBtn.removeEventListener('click', this.playPauseBtnHandler);
    this.playPauseBtnHandler = null;
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
  
  // 更新按钮图标为开始图标
  const playPauseIcon = document.getElementById('tetris-play-pause-icon');
  if (playPauseIcon) playPauseIcon.src = './image/start.svg';
  
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
      
      // 清除按键状态和间隔
      if (this.keyInterval) {
        if (this.keyInterval.left) {
          clearTimeout(this.keyInterval.left);
          clearInterval(this.keyInterval.left);
        }
        if (this.keyInterval.right) {
          clearTimeout(this.keyInterval.right);
          clearInterval(this.keyInterval.right);
        }
        if (this.keyInterval.down) {
          clearTimeout(this.keyInterval.down);
          clearInterval(this.keyInterval.down);
        }
      }
      
      // 移除事件监听器
      document.removeEventListener('keydown', this.keyDownHandler);
      document.removeEventListener('keyup', this.keyUpHandler);
      
      // 移除合并按钮的事件监听器
      document.getElementById('tetris-play-pause-btn')?.removeEventListener('click', this.playPauseBtnHandler);
      
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
    // 添加到 TetrisGame 类中
saveGameState() {
  return {
      grid: this.grid,
      score: this.score,
      level: this.level,
      currentShape: this.currentShape,
      nextShape: this.nextShape,
      currentX: this.currentX,
      currentY: this.currentY,
      gameInProgress: true
  };
}

restoreGameState(state) {
  if (!state || !state.gameInProgress) return false;
  
  this.grid = state.grid;
  this.score = state.score;
  this.level = state.level;
  this.currentShape = state.currentShape;
  this.nextShape = state.nextShape;
  this.currentX = state.currentX;
  this.currentY = state.currentY;
  this.gameOver = false;
  this.paused = true; // 恢复时先暂停
  this.isPlaying = true;
  this.hasDrawnGameOver = false;
  
  // 更新分数和等级显示
  this.scoreElement.textContent = this.score;
  this.levelElement.textContent = this.level;
  
  // 更新游戏速度
  this.speed = Math.max(200, 1000 - (this.level - 1) * 100);
  
  // 绘制当前状态
  this.draw();
  this.drawStaticPauseScreen();
  
  // 更新暂停按钮图标
  const playPauseIcon = document.getElementById('tetris-play-pause-icon');
  if (playPauseIcon) playPauseIcon.src = './image/start.svg';
  
  return true;
}
// 修改 TetrisGame 类中的 drawStaticPauseScreen 方法
drawStaticPauseScreen() {
  // 检查是否已存在暂停层，避免创建多个
  let pauseLayer = document.getElementById('tetris-pause-layer');
  if (!pauseLayer) {
    pauseLayer = document.createElement('div');
    pauseLayer.id = 'tetris-pause-layer';
    
    // 将暂停层添加到canvas的直接父元素
    const canvasContainer = this.canvas.parentElement;
    
    if (canvasContainer) {
      // 确保父容器支持定位
      if (getComputedStyle(canvasContainer).position === 'static') {
        canvasContainer.style.position = 'relative';
      }
      
      // 插入到canvas之后
      this.canvas.insertAdjacentElement('afterend', pauseLayer);
      
      // 使用绝对定位 + transform 实现完美居中
      pauseLayer.style.position = 'absolute';
      pauseLayer.style.top = '50%';
      pauseLayer.style.left = '50%';
      pauseLayer.style.transform = 'translate(-50%, -50%)';
      pauseLayer.style.width = '120px';
      pauseLayer.style.height = '60px';
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
// 修改 removeStaticPauseScreen 方法，彻底移除暂停层
removeStaticPauseScreen() {
  const pauseLayer = document.getElementById('tetris-pause-layer');
  if (pauseLayer) {
    // 先将元素隐藏
    pauseLayer.style.display = 'none';
    
    // 然后完全移除元素
    setTimeout(() => {
      if (pauseLayer.parentNode) {
        pauseLayer.parentNode.removeChild(pauseLayer);
      }
    }, 50);
  }
}
// 4. 清理所有按键状态的辅助方法
clearAllKeyStates() {
  if (this.keyState) {
    this.keyState.left = false;
    this.keyState.right = false;
    this.keyState.down = false;
  }
  
  if (this.keyInterval) {
    Object.keys(this.keyInterval).forEach(key => {
      if (this.keyInterval[key]) {
        clearTimeout(this.keyInterval[key]);
        clearInterval(this.keyInterval[key]);
        this.keyInterval[key] = null;
      }
    });
  }
}
  }