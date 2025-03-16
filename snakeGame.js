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
      this.initEventListeners();
      loadLeaderboard("snake", "snake-leaderboard-content");
    }
  
    initEventListeners() {
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.getElementById('start-btn').addEventListener('click', () => {
        if (this.gameOver) this.reset();
        this.start();
      });
      document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
      const upBtn = document.getElementById('up-btn');
      const leftBtn = document.getElementById('left-btn');
      const rightBtn = document.getElementById('right-btn');
      const downBtn = document.getElementById('down-btn');
      if (upBtn) upBtn.addEventListener('click', () => { if (this.direction !== 'down') this.nextDirection = 'up'; });
      if (leftBtn) leftBtn.addEventListener('click', () => { if (this.direction !== 'right') this.nextDirection = 'left'; });
      if (rightBtn) rightBtn.addEventListener('click', () => { if (this.direction !== 'left') this.nextDirection = 'right'; });
      if (downBtn) downBtn.addEventListener('click', () => { if (this.direction !== 'up') this.nextDirection = 'down'; });
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
  
    drawGameOver() {
      this.ctx.font = '30px Arial';
      this.ctx.fillStyle = '#333';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('游戏结束!', this.width / 2, this.height / 2 - 15);
      this.ctx.fillText(`最终得分: ${this.score}`, this.width / 2, this.height / 2 + 15);
      this.ctx.fillText('按开始游戏重新开始', this.width / 2, this.height / 2 + 45);
      const modal = document.getElementById('snake-modal');
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
      if (this.intervalId) return;
      this.paused = false;
      document.getElementById('pause-btn').textContent = '暂停';
      this.intervalId = setInterval(() => this.move(), 150);
    }
  
    togglePause() {
      if (this.gameOver) return;
      this.paused = !this.paused;
      if (this.paused) {
        document.getElementById('pause-btn').textContent = '继续';
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
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
  }