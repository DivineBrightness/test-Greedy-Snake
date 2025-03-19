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
      this.initEventListeners();
      this.initMobileControls();
      this.draw();
      loadLeaderboard("tetris", "tetris-leaderboard-content");
    }
  
    initMobileControls() {
      const rotateBtn = document.getElementById('rotate-btn');
      const leftBtn = document.getElementById('tetris-left-btn');
      const rightBtn = document.getElementById('tetris-right-btn');
      const downBtn = document.getElementById('tetris-down-btn');
      const dropBtn = document.getElementById('drop-btn');
      // 更严格的控制条件判断
      const canControl = () => {
        return this.isPlaying && !this.gameOver && !this.paused && !this.hasDrawnGameOver;
      };
      let lastTap = 0;
      const debounceTime = 150;
  
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
                return;
              }
              action();
              this.draw();
            }, 100);
          },
          stop: () => { if (intervalId) clearInterval(intervalId); }
        };
      };
  
      if (rotateBtn) rotateBtn.addEventListener('touchstart', handleTap(() => this.rotateShape()));
      if (leftBtn) leftBtn.addEventListener('touchstart', handleTap(() => this.moveLeft()));
      if (rightBtn) rightBtn.addEventListener('touchstart', handleTap(() => this.moveRight()));
      if (downBtn) {
        const downHandler = handleHold(() => this.moveDown());
        downBtn.addEventListener('touchstart', downHandler.start);
        downBtn.addEventListener('touchend', downHandler.stop);
        downBtn.addEventListener('touchcancel', downHandler.stop);
      }
      if (dropBtn) dropBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (canControl()) this.moveBottom();
      });
      [rotateBtn, leftBtn, rightBtn, downBtn, dropBtn].forEach(btn => {
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
  
   // 修改 moveBottom 方法，确保正确处理游戏结束状态
  moveBottom() {
  if (this.gameOver || this.paused) return;
  
  let maxSteps = this.rows;
  while (!this.checkCollision() && maxSteps > 0) {
    this.currentY++;
    maxSteps--;
  }
  this.currentY--;
  this.freezeShape();
  
  // 如果游戏已经结束，直接返回，不执行后续操作
  if (this.gameOver) {
    return;
  }
  
  this.removeCompleteRows();
  this.newShape();
  this.draw();
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
  
// 修改 drawGameOver 方法，确保只执行一次并彻底停止游戏
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
  
  // 不再在Canvas上绘制文字
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  // 重新绘制网格和已冻结的方块，但不绘制活动方块
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
      console.log("关闭 tetris-modal");
      modal.style.display = 'none';
    } else {
      alert("请选择一个名字");
    }
  };
  
  // 禁用所有控制按钮，确保游戏彻底停止
  document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.disabled = true;
  });
}
  
    initEventListeners() {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.getElementById('tetris-start-btn').addEventListener('click', () => {
        if (this.gameOver) this.reset();
        this.start();
      });
      document.getElementById('tetris-pause-btn').addEventListener('click', () => this.togglePause());
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
      this.scoreElement.textContent = '0';
      this.levelElement.textContent = '1';
      this.initEventListeners();
      this.initMobileControls();
      this.draw();
    }
  }