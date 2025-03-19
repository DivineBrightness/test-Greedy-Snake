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
  
    // 修改 drawGameOver 方法
drawGameOver() {
  // 清除Canvas
  this.ctx.clearRect(0, 0, this.width, this.height);
  
  // 显示模态框并更新其内容
  const modal = document.getElementById('snake-modal');
  const modalContent = modal.querySelector('div');
  
  // 更新模态框内容
  modalContent.innerHTML = `
    <h2 style="color:rgb(3, 93, 61); margin-bottom: 15px; font-size: 24px;">游戏结束!</h2>
    <p style="font-size: 20px; margin-bottom: 20px;">最终得分: <strong>${this.score}</strong></p>
    <p style="margin-bottom: 15px;">选择你的名字提交成绩:</p>
    <select id="snake-player-select"></select>
    <button id="snake-submit-btn" class="control-btn">提交成绩</button>
  `;
  
  // 重新填充玩家选择器
  populateSelect('snake-player-select');
  
  modal.style.display = 'flex';
  
  document.getElementById('snake-submit-btn').onclick = async () => {
    const playerName = document.getElementById('snake-player-select').value;
    if (playerName) {
      await submitScore("snake", playerName, this.score);
      await loadLeaderboard("snake", "snake-leaderboard-content");
      modal.style.display = 'none';
    } else {
      alert("请选择一个名字");
    }
  };
}
  
    move() {
      if (this.paused || this.gameOver) return;
      const head = {x: this.snake[0].x, y: this.snake[0].y};
      this.direction = this.nextDirection;
      switch(this.direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
      }
      if (this.checkCollision(head)) {
        this.gameOver = true;
        this.drawGameOver();
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
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
  
    start() {
      if (this.animationFrameId) return; // 防止多次调用
      this.paused = false;
      document.getElementById('pause-btn').textContent = '暂停';
      
      // 添加时间追踪
      this.lastUpdateTime = Date.now();
      this.updateInterval = 150; // 保持原游戏速度
      
      const gameLoop = () => {
          if (this.gameOver || this.paused) {
              return; // 游戏结束或暂停时不再继续动画循环
          }
          
          const now = Date.now();
          if (now - this.lastUpdateTime >= this.updateInterval) {
              this.move();
              this.lastUpdateTime = now;
          }
          
          this.animationFrameId = requestAnimationFrame(gameLoop);
      };
      
      this.animationFrameId = requestAnimationFrame(gameLoop);
  }
  
  togglePause() {
      if (this.gameOver) return;
      this.paused = !this.paused;
      if (this.paused) {
          document.getElementById('pause-btn').textContent = '继续';
          // 取消动画帧
          if (this.animationFrameId) {
              cancelAnimationFrame(this.animationFrameId);
              this.animationFrameId = null;
          }
          this.ctx.font = '30px Arial';
          this.ctx.fillStyle = '#333';
          this.ctx.textAlign = 'center';
          this.ctx.fillText('游戏暂停', this.width / 2, this.height / 2);
      } else {
          document.getElementById('pause-btn').textContent = '暂停';
          this.start();
      }
  }
  
    reset() {
      this.snake = [{x: 6, y: 10}, {x: 5, y: 10}, {x: 4, y: 10}];
      this.direction = 'right';
      this.nextDirection = 'right';
      this.food = this.createFood();
      this.score = 0;
      this.gameOver = false;
      this.paused = false;
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