// snakeGame.js
class SnakeGame {
    // 修改 SnakeGame 构造函数，在最后添加绘制血量的调用
    constructor() {
        // 添加标志，记录蛇是否已经咬过自己身体
        this.hasEatenBody = false;
      this.isPlaying = false;
      this.canvas = document.getElementById('game-canvas');
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) console.error('Canvas 上下文未初始化');
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.blockSize = 10;
      this.widthInBlocks = this.width / this.blockSize;
      this.heightInBlocks = this.height / this.blockSize;

      // 添加血量系统
      this.maxHealth = 3;
      this.health = this.maxHealth;
      this.isInvincible = false;
      this.invincibleTime = 2000; // 无敌时间3秒
      this.isBlinking = false;
      this.blinkCount = 0;
      this.heartImg = new Image();
      this.heartImg.src = './image/heart.svg';
      this.emptyHeartImg = new Image();
      this.emptyHeartImg.src = './image/heart-empty.svg';
      
      // 添加怪物图像
      this.monsterImg = new Image();
      // this.monsterImg.src = './image/monster.svg';
      // this.monsterImg.src = './image/avatar.svg';
      this.monsterImg.src = './image/rooster.svg'; // 使用新的怪物图像

      // 添加怪物位置和移动属性
      const centerX = Math.floor(this.widthInBlocks / 2);
      const centerY = Math.floor(this.heightInBlocks / 2);
      this.monsterPosition = { x: centerX, y: centerY };
      this.monsterMoveCounter = 0;
      this.monsterMoveInterval = 10; // 每10帧移动一次
      this.monsterDirection = 'right'; // 初始移动方向
      this.monsterMoveOptions = ['up', 'down', 'left', 'right'];
    

      // 添加龙吐火效果相关属性
      this.fireBreathActive = false;
      this.fireBreathTimer = 0;
      this.fireBreathInterval = 3000; // 每3秒喷火一次
      this.fireBreathDuration = 1000; // 火焰持续1秒
      this.fireBreathLastTime = 0;
      this.fireDirection = []; // 火焰方向数组
      
      // 加载火焰图像
      this.fireImg = new Image();
      this.fireImg.src = './image/fire.svg'; // 确保有这个图像资源

      // 添加眩晕状态标志
      this.isStunned = false;
      // 添加加速状态相关属性
      this.isSpeedUp = false;
      this.normalSpeed = 130; // 正常速度间隔
      this.speedUpFactor = 0.5; // 加速因子，速度提高50%
      this.speedUpDuration = 5000; // 加速持续5秒
      this.speedUpStartTime = 0;

      // 添加水果系统
  this.fruitImages = [
    './image/fruit/avocado.svg',
    './image/fruit/cherry.svg',
    './image/fruit/lemon.svg',
    './image/fruit/radish.svg',
    './image/fruit/watermelon.svg',
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
  
  // 预加载水果图片
  this.fruitImagesLoaded = this.fruitImages.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });
  
  this.foodEatenCount = 0;     // 记录已吃的普通食物数量
  this.specialFruit = null;    // 特殊水果对象
  this.specialFruitScore = 5;  // 特殊水果的分数

  // 添加子弹系统
  this.bullets = [];
  this.bulletSpeed = 5; // 子弹移动速度
  this.bulletSize = this.blockSize / 2; // 子弹大小
  this.monsterHit = false; // 记录怪物是否被击中
  this.monsterHitTime = 0; // 怪物被击中的时间
  this.monsterHitDuration = 500; // 怪物被击中闪烁时间(毫秒)

      
      this.score = 0;
      this.highScore = localStorage.getItem('snakeHighScore') || 0;
      this.gameOver = false;
      this.paused = false;
      this.intervalId = null;
      this.snake = [ {x: 9, y: 20}, {x: 8, y: 20}];
      this.direction = 'right';
      this.nextDirection = 'right';
      this.pausedDirection = null;
      this.pausedNextDirection = null;
      this.food = this.createFood();
      this.scoreElement = document.getElementById('score');
      this.highScoreElement = document.getElementById('high-score');
      this.highScoreElement.textContent = this.highScore;
      this.keyDownHandler = this.handleKeyDown.bind(this);
      this.initEventListeners();
      loadLeaderboard("snake", "snake-leaderboard-content");
      
      // 在构造函数最后添加：初始化绘制血量
      this.drawHealth();
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
      let attempts = 0;
      const maxAttempts = 50;
      do {
        attempts++;
        newFood = {
          x: Math.floor(Math.random() * this.widthInBlocks),
          y: Math.floor(Math.random() * this.heightInBlocks)
        };
        const minDistance = 2;
        const tooClose = this.snake.some(segment => {
          return Math.abs(segment.x - newFood.x) < minDistance && 
                 Math.abs(segment.y - newFood.y) < minDistance;
        });
        if (!tooClose) break;
      } while (attempts < maxAttempts && this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
      return newFood;
    }
  
    drawBlock(x, y, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
      this.ctx.lineWidth = 0.5;
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
  
    // 修改 draw 方法中的怪物绘制，可以选择性地标记出有碰撞的区域
    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawGrid();
      
      // 使用怪物位置绘制怪物和边界
      const monsterSize = 3; // 怪物占用的方块数（长宽）
      
      // 计算怪物边界
      const monsterLeft = this.monsterPosition.x - Math.floor(monsterSize / 2);
      const monsterRight = monsterLeft + monsterSize;
      const monsterTop = this.monsterPosition.y - Math.floor(monsterSize / 2);
      const monsterBottom = monsterTop + monsterSize;

      // 检查怪物是否被击中，如果是，绘制黄色闪烁效果
      if (this.monsterHit && Date.now() - this.monsterHitTime < this.monsterHitDuration) {
        // 创建黄色闪烁的怪物图像
        this.ctx.globalAlpha = 0.8;
        this.ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
        this.ctx.fillRect(
          monsterLeft * this.blockSize,
          monsterTop * this.blockSize,
          (monsterRight - monsterLeft) * this.blockSize,
          (monsterBottom - monsterTop) * this.blockSize
        );
        this.ctx.globalAlpha = 1.0;
      }
      
      // 绘制怪物图像
      if (this.monsterImg.complete) {
        this.ctx.drawImage(
          this.monsterImg, 
          monsterLeft * this.blockSize,
          monsterTop * this.blockSize,
          (monsterRight - monsterLeft) * this.blockSize,
          (monsterBottom - monsterTop) * this.blockSize
        );
      }
    // 绘制龙的火焰效果 - 确保火焰视觉效果与碰撞检测匹配
    if (this.fireBreathActive && this.fireImg.complete) {
      // 龙头位置 (左上角)
      const dragonHeadX = monsterLeft;
      const dragonHeadY = monsterTop;
      
      // 火焰起点 (龙头左侧) - 确保与碰撞检测中的坐标计算一致
      const fireOriginX = (dragonHeadX - 1) * this.blockSize;
      const fireOriginY = dragonHeadY * this.blockSize + this.blockSize;
      
      // 可选：标记火焰起点，帮助调试
      /*
      this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      this.ctx.beginPath();
      this.ctx.arc(fireOriginX, fireOriginY, 3, 0, Math.PI * 2);
      this.ctx.fill();
      */
      
      // 为每个火焰方向绘制火焰
      for (const direction of this.fireDirection) {
        // 计算火焰终点 (距离为2个方块) - 与碰撞检测保持一致
        const fireEndX = fireOriginX + direction.x * this.blockSize * 2;
        const fireEndY = fireOriginY + direction.y * this.blockSize * 2;
        
        // 绘制火焰线
        this.ctx.beginPath();
        this.ctx.moveTo(fireOriginX, fireOriginY);
        this.ctx.lineTo(fireEndX, fireEndY);
        
        // 创建渐变色火焰
        const gradient = this.ctx.createLinearGradient(fireOriginX, fireOriginY, fireEndX, fireEndY);
        gradient.addColorStop(0, 'rgba(255, 100, 0, 0.9)');
        gradient.addColorStop(0.6, 'rgba(255, 50, 0, 0.7)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.3)');
        
        // 增加线宽使火焰更容易被触碰
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = this.blockSize / 1.5; // 稍微增加火焰宽度
        this.ctx.stroke();
        
        // 在火焰终点绘制火花效果
        this.ctx.beginPath();
        this.ctx.arc(fireEndX, fireEndY, this.blockSize / 3, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 200, 0, 0.5)';
        this.ctx.fill();
      }
    }
      // 绘制子弹
      this.ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
      for (const bullet of this.bullets) {
        this.ctx.beginPath();
        this.ctx.arc(bullet.x, bullet.y, this.bulletSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      // 绘制特殊水果 (如果存在)
      if (this.specialFruit) {
        const img = this.fruitImagesLoaded[this.specialFruit.imageIndex];
        if (img.complete) {
          this.ctx.drawImage(
            img,
            this.specialFruit.x * this.blockSize,
            this.specialFruit.y * this.blockSize,
            this.blockSize,
            this.blockSize
          );
          
          // 添加闪烁特效
          const time = Date.now() / 200;
          const alpha = 0.5 + 0.5 * Math.sin(time);
          
          this.ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
          this.ctx.lineWidth = 2;
          this.ctx.strokeRect(
            this.specialFruit.x * this.blockSize - 2,
            this.specialFruit.y * this.blockSize - 2,
            this.blockSize + 4,
            this.blockSize + 4
          );
        }
      }
      
      // 更明显的无敌状态效果
      if (this.isInvincible) {
        // 添加无敌状态提示
        this.ctx.font = '16px Arial';
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
        this.ctx.textAlign = 'center';
        
        // 修改提示文字
        const statusText = this.isStunned ? '眩晕状态' : '无敌状态';
        this.ctx.fillText(statusText, this.width / 2, 20);
      }
      
      // 根据闪烁状态决定是否绘制蛇
      if (!this.isBlinking || this.blinkCount % 2 === 0) {

        if (this.isSpeedUp && this.drawSpeedLines) {
          const head = this.snake[0];
          const headX = head.x * this.blockSize + this.blockSize / 2;
          const headY = head.y * this.blockSize + this.blockSize / 2;
          
          // 根据移动方向绘制速度线
          this.ctx.strokeStyle = 'rgba(255, 165, 0, 0.6)';
          this.ctx.lineWidth = 1;
          
          const lineLength = this.blockSize * 1.5;
          const numLines = 5;
          
          for (let i = 0; i < numLines; i++) {
            this.ctx.beginPath();
            
            // 根据方向确定速度线的起点和终点
            let startX, startY, endX, endY;
            
            switch(this.direction) {
              case 'up':
                startX = headX - this.blockSize/2 + (this.blockSize * i / (numLines - 1));
                startY = headY + this.blockSize/2;
                endX = startX;
                endY = startY + lineLength;
                break;
              case 'down':
                startX = headX - this.blockSize/2 + (this.blockSize * i / (numLines - 1));
                startY = headY - this.blockSize/2;
                endX = startX;
                endY = startY - lineLength;
                break;
              case 'left':
                startX = headX + this.blockSize/2;
                startY = headY - this.blockSize/2 + (this.blockSize * i / (numLines - 1));
                endX = startX + lineLength;
                endY = startY;
                break;
              case 'right':
                startX = headX - this.blockSize/2;
                startY = headY - this.blockSize/2 + (this.blockSize * i / (numLines - 1));
                endX = startX - lineLength;
                endY = startY;
                break;
            }
            
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
          }
        }
        // 绘制蛇，添加无敌状态的更明显效果
        this.snake.forEach((segment, index) => {
          const ratio = index / this.snake.length;
          const green = Math.floor(140 - ratio * 40);
          
          let color;
          if (this.isInvincible) {
            // 无敌状态下使用闪光金色
            color = index === 0 
              ? 'rgba(255, 215, 0, 0.8)' // 头部金色
              : `rgba(255, ${215 - ratio * 50}, 0, 0.7)`; // 身体渐变金色
          } else {
            // 正常状态下的颜色
            color = index === 0 
              ? '#4CAF50' 
              : `rgb(76, ${green + 55}, 80)`;
          }
          
          this.drawBlock(segment.x, segment.y, color);
          if (index === 0) {
            this.drawSnakeEyes(segment);
          }
        });
      }
      
      this.drawBlock(this.food.x, this.food.y, '#FF5722');
    }
  

// 在 SnakeGame 类中添加 drawGrid 方法
drawGrid() {
  // 使用非常淡的颜色绘制网格线
  this.ctx.strokeStyle = 'rgba(200, 200, 200, 0.1)';
  this.ctx.lineWidth = 0.2;
  
  // 绘制垂直线
  for (let x = 0; x <= this.width; x += this.blockSize) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, this.height);
    this.ctx.stroke();
  }
  
  // 绘制水平线
  for (let y = 0; y <= this.height; y += this.blockSize) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, y);
    this.ctx.lineTo(this.width, y);
    this.ctx.stroke();
  }
}

// 添加蛇眼睛的绘制函数
drawSnakeEyes(head) {
  const eyeSize = this.blockSize / 4;
  const eyeOffset = this.blockSize / 3;
  
  // 绘制白色眼球
  this.ctx.fillStyle = 'white';
  
  switch(this.direction) {
    case 'up':
      // 向上移动时的眼睛位置
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset, head.y * this.blockSize + eyeOffset, eyeSize, eyeSize);
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize, head.y * this.blockSize + eyeOffset, eyeSize, eyeSize);
      break;
    case 'down':
      // 向下移动时的眼睛位置
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize, eyeSize, eyeSize);
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize, eyeSize, eyeSize);
      break;
    case 'left':
      // 向左移动时的眼睛位置
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset, head.y * this.blockSize + eyeOffset, eyeSize, eyeSize);
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize, eyeSize, eyeSize);
      break;
    case 'right':
      // 向右移动时的眼睛位置
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize, head.y * this.blockSize + eyeOffset, eyeSize, eyeSize);
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize, eyeSize, eyeSize);
      break;
  }
  
  // 添加黑色瞳孔
  this.ctx.fillStyle = 'black';
  const pupilSize = eyeSize / 2;
  
  switch(this.direction) {
    case 'up':
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset + eyeSize/4, head.y * this.blockSize + eyeOffset, pupilSize, pupilSize);
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize + eyeSize/4, head.y * this.blockSize + eyeOffset, pupilSize, pupilSize);
      break;
    case 'down':
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset + eyeSize/4, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize, pupilSize, pupilSize);
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize + eyeSize/4, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize, pupilSize, pupilSize);
      break;
    case 'left':
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset, head.y * this.blockSize + eyeOffset + eyeSize/4, pupilSize, pupilSize);
      this.ctx.fillRect(head.x * this.blockSize + eyeOffset, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize + eyeSize/4, pupilSize, pupilSize);
      break;
    case 'right':
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize, head.y * this.blockSize + eyeOffset + eyeSize/4, pupilSize, pupilSize);
      this.ctx.fillRect(head.x * this.blockSize + this.blockSize - eyeOffset - eyeSize, head.y * this.blockSize + this.blockSize - eyeOffset - eyeSize + eyeSize/4, pupilSize, pupilSize);
      break;
  }
}
// 修改 drawGameOver 方法，在显示模态框时禁用键盘事件

drawGameOver() {
  // 清除Canvas
  this.ctx.clearRect(0, 0, this.width, this.height);
  
  // 显示模态框并更新其内容
  const modal = document.getElementById('snake-modal');
  const modalContent = modal.querySelector('div');
  
// 修改贪吃蛇游戏中的模态框HTML

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
  <!-- 修改自定义输入框，限制13个字符 -->
  <div class="custom-name-container">
    <span>或者</span>
    <input type="text" id="snake-custom-name" placeholder="输入自定义名字(最多12个字)" maxlength="13">
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
  
  // 修改贪吃蛇提交按钮逻辑

submitBtn.onclick = async () => {
  const selectPlayerName = document.getElementById('snake-player-select').value;
  const customPlayerName = document.getElementById('snake-custom-name').value.trim();
  
  // 优先使用自定义名称，如果有的话
  const playerName = customPlayerName || selectPlayerName;
  
  if (playerName) {
    // 验证名称长度
    if (playerName.length > 13) {
      alert("名字最多只能包含13个字符");
      return;
    }
    
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
  
// 修改 move 方法，添加碰撞检测和处理
move() {
  if (this.paused || this.gameOver || this.isStunned) {
    if (this.isStunned) {
      this.draw();
    }
    return;
  }
  // 更新龙的喷火效果
  this.updateDragonFireBreath();
  // 更新怪物位置
  this.updateMonsterPosition();
  // 更新子弹位置
  this.updateBullets();
  // 更新速度状态
  this.updateSpeedState();
  
  // 保存旧的头部位置，以便在碰撞时回退
  const oldHead = {...this.snake[0]};
  
  // 计算新的头部位置
  const head = {x: oldHead.x, y: oldHead.y};
  this.direction = this.nextDirection;
  
  switch(this.direction) {
    case 'up': head.y--; break;
    case 'down': head.y++; break;
    case 'left': head.x--; break;
    case 'right': head.x++; break;
  }
  // 咬尾巴的特殊处理：防止连续咬尾巴
  const tail = this.snake[this.snake.length - 1];
  const isBitingTail = head.x === tail.x && head.y === tail.y;
  
  // 如果咬到尾巴且蛇长度过短，不允许继续咬
  const minLength = 3; // 设置最小长度
  if (isBitingTail && this.snake.length <= minLength) {
    // 这里可以添加一个视觉提示"蛇太短了!"
    // 但仍然允许正常移动，只是不处理咬尾巴逻辑
  } else {
      // 检查碰撞
      if (this.checkCollision(head)) {
        // 发生碰撞时减少生命值
        this.health--;
        this.drawHealth();
        
        // 判断是否游戏结束
        if (this.health <= 0) {
          this.gameOver = true;
          this.drawGameOver();
          return;
        }
        
        // 蛇反弹：根据当前方向后退一格
        let backupHead = {...oldHead}; 
        // 注意：保持在原位，不进入碰撞区域
        
        // 更新蛇头为后退位置
        this.snake[0] = backupHead;
        
        // 触发闪烁和眩晕效果
        this.startBlinking();
        this.startInvincibility();
        
        // 绘制当前状态
        this.draw();
        return;
      }
  }

  
  // 正常移动逻辑：只有在没有碰撞的情况下执行
  this.snake.unshift(head);
  
  // 检查是否吃到普通食物
  if (head.x === this.food.x && head.y === this.food.y) {
    this.score++;
    this.foodEatenCount++;
    this.drawScore();
    
    // 每吃5个普通方块，生成一个特殊水果
    if (this.foodEatenCount % 5 === 0) {
      this.createSpecialFruit();
    }
    
    this.food = this.createFood();
  } 
  // 检查是否吃到特殊水果
  else if (this.specialFruit && head.x === this.specialFruit.x && head.y === this.specialFruit.y) {
    // 吃到特殊水果加更多分数
    this.score += this.specialFruitScore;
    this.drawScore();
    
    // 发射子弹攻击怪物
    this.fireBullet();
    
    // 移除特殊水果
    this.specialFruit = null;
  } 
  else {
    this.snake.pop();
  }
  
  this.draw();
}
// 添加创建特殊水果的方法
createSpecialFruit() {
  let newFruit;
  let attempts = 0;
  const maxAttempts = 50;
  
  do {
    attempts++;
    newFruit = {
      x: Math.floor(Math.random() * this.widthInBlocks),
      y: Math.floor(Math.random() * this.heightInBlocks),
      imageIndex: Math.floor(Math.random() * this.fruitImages.length)
    };
    
    // 确保特殊水果不会出现在蛇身上、普通食物上或怪物上
    const centerX = Math.floor(this.widthInBlocks / 2);
    const centerY = Math.floor(this.heightInBlocks / 2);
    const monsterLeft = centerX - 1;
    const monsterRight = centerX + 2;
    const monsterTop = centerY - 1;
    const monsterBottom = centerY + 2;
    
    const onSnake = this.snake.some(segment => 
      segment.x === newFruit.x && segment.y === newFruit.y
    );
    
    const onFood = (this.food.x === newFruit.x && this.food.y === newFruit.y);
    
    const onMonster = (
      newFruit.x >= monsterLeft && newFruit.x < monsterRight && 
      newFruit.y >= monsterTop && newFruit.y < monsterBottom
    );
    
    if (!onSnake && !onFood && !onMonster) break;
    
  } while (attempts < maxAttempts);
  
  // 设置特殊水果
  this.specialFruit = newFruit;
  
  // 10秒后水果消失
  setTimeout(() => {
    if (this.specialFruit === newFruit) {
      this.specialFruit = null;
    }
  }, 10000);
}

// 添加子弹发射方法
fireBullet() {
  const head = this.snake[0];
  const centerX = Math.floor(this.widthInBlocks / 2);
  const centerY = Math.floor(this.heightInBlocks / 2);
  
  // 计算蛇头到怪物中心的方向向量
  const dirX = centerX - head.x;
  const dirY = centerY - head.y;
  
  // 归一化方向向量
  const length = Math.sqrt(dirX * dirX + dirY * dirY);
  const normalizedDirX = dirX / length;
  const normalizedDirY = dirY / length;
  
  // 从蛇头发射子弹
  this.bullets.push({
    x: head.x * this.blockSize + this.blockSize / 2,
    y: head.y * this.blockSize + this.blockSize / 2,
    dirX: normalizedDirX,
    dirY: normalizedDirY
  });
}

// 同样需要修改 updateBullets 方法中的碰撞检测
updateBullets() {
    // 更新子弹位置
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.x += bullet.dirX * this.bulletSpeed;
      bullet.y += bullet.dirY * this.bulletSpeed;
      
      // 检查是否击中怪物
      const monsterSize = 3; // 怪物占用的方块数（长宽）
      
      // 计算怪物边界
      const monsterLeft = this.monsterPosition.x - Math.floor(monsterSize / 2);
      const monsterRight = monsterLeft + monsterSize;
      const monsterTop = this.monsterPosition.y - Math.floor(monsterSize / 2);
      const monsterBottom = monsterTop + monsterSize;
      
      const bulletBlockX = Math.floor(bullet.x / this.blockSize);
      const bulletBlockY = Math.floor(bullet.y / this.blockSize);
      
      if (bulletBlockX >= monsterLeft && bulletBlockX < monsterRight && 
          bulletBlockY >= monsterTop && bulletBlockY < monsterBottom) {
        
        // 进行更精确的碰撞检测，跳过左下角和右下角的区域
        const relativeX = bulletBlockX - monsterLeft; // 0, 1, 2
        const relativeY = bulletBlockY - monsterTop;  // 0, 1, 2
        
        // 排除左下角(0,2)和右下角(2,2)位置
        if ((relativeX === 0 && relativeY === 2) || // 左下角
            (relativeX === 2 && relativeY === 2)) { // 右下角
          continue; // 这些位置不计算碰撞，继续移动子弹
        }
        
        // 子弹击中怪物
        this.monsterHit = true;
        this.monsterHitTime = Date.now();
        
        // 移除击中的子弹
        this.bullets.splice(i, 1);
        i--;
        continue;
      }
      
      // 检查子弹是否超出边界
      if (bullet.x < 0 || bullet.x > this.width || bullet.y < 0 || bullet.y > this.height) {
        // 移除超出边界的子弹
        this.bullets.splice(i, 1);
        i--;
      }
    }
}


// 改进闪烁效果，确保蛇始终可见
startBlinking() {
  if (this.isBlinking) return;
  
  this.isBlinking = true;
  this.blinkCount = 0;
  
  const doBlink = () => {
    if (this.blinkCount >= 6 || this.gameOver) {
      this.isBlinking = false;
      // 确保结束闪烁后重新绘制蛇
      this.draw();
      return;
    }
    
    this.blinkCount++;
    // 每次闪烁后强制重绘
    this.draw();
    setTimeout(doBlink, 150); // 增加闪烁时间间隔以更明显
  };
  
  doBlink();
}

// 修改 startInvincibility 方法，添加眩晕效果
startInvincibility() {
  this.isInvincible = true;
  this.isStunned = true; // 设置眩晕状态
  
  // 在无敌状态提示上显示更明确的信息
  const stunText = document.createElement('div');
  stunText.id = 'stun-text';
  stunText.style.position = 'absolute';
  stunText.style.top = '30px';
  stunText.style.left = '50%';
  stunText.style.transform = 'translateX(-50%)';
  stunText.style.color = 'red';
  stunText.style.fontWeight = 'bold';
  stunText.textContent = '眩晕中...';
  this.canvas.parentNode.appendChild(stunText);
  
  // 无敌时间结束后恢复正常
  setTimeout(() => {
    this.isInvincible = false;
    this.isStunned = false; // 眩晕结束
    
    // 移除眩晕提示
    const stunText = document.getElementById('stun-text');
    if (stunText) stunText.remove();
  }, this.invincibleTime);
}

// 添加绘制血量的方法
drawHealth() {
  const healthDisplay = document.querySelector('.health-display');
  if (!healthDisplay) return;
  
  // 清空现有内容
  healthDisplay.innerHTML = '';
  
  // 添加心形图标
  for (let i = 0; i < this.maxHealth; i++) {
    const heartImg = document.createElement('img');
    heartImg.src = i < this.health ? './image/heart.svg' : './image/heart-empty.svg';
    heartImg.alt = '生命值';
    healthDisplay.appendChild(heartImg);
  }
}
// 修改 checkCollision 方法中检测与怪物碰撞的部分
checkCollision(head) {
  // 无敌状态下不检测碰撞
  if (this.isInvincible) {
    return false;
  }
  
  // 检查是否撞墙
  if (head.x < 0 || head.x >= this.widthInBlocks || head.y < 0 || head.y >= this.heightInBlocks) 
    return true;
    
  // 检查是否撞到自己的任何部分
  for (let i = 1; i < this.snake.length; i++) {
    const segment = this.snake[i];
    if (segment.x === head.x && segment.y === head.y) {
      // 如果已经咬过身体，则当作普通碰撞处理
      if (this.hasEatenBody) {
        return true; // 返回true，触发普通的碰撞处理（减少生命值）
      } else {
        // 第一次咬身体，用特殊方式处理
        this.handleBodyBite(i);
        return false; // 不算作普通碰撞，由专门的方法处理
      }
    }
  }
    
  // 检查是否撞到怪物
  const monsterSize = 3; // 怪物占用的方块数（长宽）
  
  // 计算怪物边界
  const monsterLeft = this.monsterPosition.x - Math.floor(monsterSize / 2);
  const monsterRight = monsterLeft + monsterSize;
  const monsterTop = this.monsterPosition.y - Math.floor(monsterSize / 2);
  const monsterBottom = monsterTop + monsterSize;
  
  // 判断蛇头是否在怪物区域内
  if (head.x >= monsterLeft && head.x < monsterRight && 
      head.y >= monsterTop && head.y < monsterBottom) {
    
    // 进行更精确的碰撞检测，跳过左下角(3,6,9)的区域
    const relativeX = head.x - monsterLeft; // 0, 1, 2
    const relativeY = head.y - monsterTop;  // 0, 1, 2
    
    // 排除左下角(0,2)和右下角(2,2)位置
    if ((relativeX === 0 && relativeY === 2) || // 左下角
        (relativeX === 2 && relativeY === 2)) { // 右下角
      return false; // 这些位置不计算碰撞
    }
    
    return true; // 其他位置计算碰撞
  }
  
  // =============================================
  // 火焰碰撞检测 - 使用光线投射法检查火焰路径上的每个点
  // =============================================
  if (this.fireBreathActive) {
    // 获取龙头位置
    const dragonHeadX = monsterLeft;
    const dragonHeadY = monsterTop;
    
    // 火焰起点 (龙头左侧)，与绘制方法保持一致
    const fireOriginX = dragonHeadX - 1;
    const fireOriginY = dragonHeadY + 1;
    
    // 检查蛇头是否在任何火焰线上
    for (const direction of this.fireDirection) {
      // 使用布雷森汉姆算法检查火焰线上的每个点
      // 火焰长度为2个方块
      const fireLength = 2;
      
      // 计算火焰终点坐标
      const fireEndX = fireOriginX + direction.x * fireLength;
      const fireEndY = fireOriginY + direction.y * fireLength;
      
      // 调试信息
      // console.log(`检查火焰线 - 起点: (${fireOriginX}, ${fireOriginY}), 终点: (${fireEndX}, ${fireEndY})`);
      
      // 线段上的每个点进行检查 (使用光线投射算法)
      // 先计算两点之间的差值
      let dx = Math.abs(fireEndX - fireOriginX);
      let dy = Math.abs(fireEndY - fireOriginY);
      
      // 确定x和y的增长方向
      const sx = fireOriginX < fireEndX ? 1 : -1;
      const sy = fireOriginY < fireEndY ? 1 : -1;
      
      // 初始化误差值
      let err = dx - dy;
      
      // 当前点坐标
      let currentX = fireOriginX;
      let currentY = fireOriginY;
      
      // 在每个点上检查蛇头是否存在
      // 由于我们使用整数坐标，需要放宽检测范围
      const tolerance = 0.5;
      
      while (true) {
        // 如果当前点与蛇头足够接近，认为碰撞发生
        if (Math.abs(head.x - currentX) <= tolerance && 
            Math.abs(head.y - currentY) <= tolerance) {
          console.log(`火焰碰撞检测: 蛇头(${head.x},${head.y}) 接触到火焰点(${currentX},${currentY})`);
          this.startSpeedUp();
          return false; // 触发加速效果但不算作碰撞
        }
        
        // 如果到达终点，结束循环
        if (Math.abs(currentX - fireEndX) < tolerance && 
            Math.abs(currentY - fireEndY) < tolerance) {
          break;
        }
        
        // 保存当前误差值用于比较
        let e2 = 2 * err;
        
        // 根据误差值决定下一步移动方向
        if (e2 > -dy) {
          err -= dy;
          currentX += sx;
        }
        
        if (e2 < dx) {
          err += dx;
          currentY += sy;
        }
      }
    }
  }
  
  return false;
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
  this.isPlaying = true;
  // 确保开始游戏时显示正确的血量
  this.drawHealth();
  
  console.log('游戏开始运行');
  
  this.lastUpdateTime = Date.now();
  this.updateInterval = this.normalSpeed; // 使用正常速度

  this.updateInterval = 140;
  
  const gameLoop = () => {
    if (this.gameOver || this.paused) {
      console.log('游戏循环停止，原因：', this.gameOver ? '游戏结束' : '游戏暂停');
      this.animationFrameId = null;
      return;
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
  
// 修改 SnakeGame 类中的 togglePause 方法
togglePause() {
  if (this.gameOver) return;
  
  this.paused = !this.paused;
  const playPauseIcon = document.getElementById('snake-play-pause-icon');
  
  if (this.paused) {
    this.pausedDirection = this.direction;
    this.pausedNextDirection = this.nextDirection;
    
    if (playPauseIcon) playPauseIcon.src = './image/start.svg';
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    this.showStaticPauseScreen();
    
    console.log('游戏已暂停');
  } else {
    if (this.pausedDirection && this.pausedNextDirection) {
      this.direction = this.pausedDirection;
      this.nextDirection = this.pausedNextDirection;
    }
    
    if (playPauseIcon) playPauseIcon.src = './image/pause.svg';
    
    this.removeStaticPauseScreen();
    
    this.draw();
    
    if (!this.animationFrameId) {
      this.start();
    }
    console.log('游戏已继续');
  }
}
  
// 添加专门处理暂停屏幕绘制的方法
drawPauseScreen() {
  this.draw();
  
  this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  this.ctx.fillRect(0, 0, this.width, this.height);
  
  this.ctx.font = '30px Arial';
  this.ctx.fillStyle = '#333';
  this.ctx.textAlign = 'center';
  this.ctx.fillText('游戏暂停', this.width / 2, this.height / 2);
}
// 修改 reset 方法，重置血量
reset() {
  console.log('重置游戏');
  
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
  
  this.snake = [{x: 9, y: 20}, {x: 8, y: 20}];
  this.direction = 'right';
  this.nextDirection = 'right';
  this.pausedDirection = null;
  this.pausedNextDirection = null;
  this.food = this.createFood();
  this.score = 0;
  this.gameOver = false;
  this.paused = false;
    // 重置咬身体标志
    this.hasEatenBody = false;
  // 重置血量相关属性
  this.health = this.maxHealth;
  this.isInvincible = false;
  this.isBlinking = false;
  this.blinkCount = 0;
  this.drawHealth();
  
  const playPauseIcon = document.getElementById('snake-play-pause-icon');
  if (playPauseIcon) playPauseIcon.src = './image/start.svg';
  
    // 重置子弹系统
    this.bullets = [];
    this.foodEatenCount = 0;
    this.specialFruit = null;
    this.monsterHit = false;

      // 重置加速状态
  this.isSpeedUp = false;
  this.updateInterval = this.normalSpeed;
  this.drawSpeedLines = false;
  
  // 移除可能存在的加速指示器
  const speedIndicator = document.getElementById('speed-up-indicator');
  if (speedIndicator && speedIndicator.parentNode) {
    speedIndicator.parentNode.removeChild(speedIndicator);
  }
  this.drawScore();
  this.draw();
}

  // 修改 destroy 方法，确保清理暂停层
destroy() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  
  if (this.animationFrameId) {
    cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }
  
  document.removeEventListener('keydown', this.keyDownHandler);
  
  document.getElementById('snake-play-pause-btn')?.removeEventListener('click', this.playPauseBtnHandler);
  
  document.getElementById('up-btn')?.removeEventListener('click', this.upBtnHandler);
  document.getElementById('left-btn')?.removeEventListener('click', this.leftBtnHandler);
  document.getElementById('right-btn')?.removeEventListener('click', this.rightBtnHandler);
  document.getElementById('down-btn')?.removeEventListener('click', this.downBtnHandler);
  
  this.removeStaticPauseScreen();
  
  this.gameOver = true;
  this.paused = true;
  
  console.log('贪吃蛇游戏资源已清理');
}

// 更改 saveGameState 方法，确保所有必要状态都被保存
saveGameState() {
  if (this.gameOver || (!this.animationFrameId && !this.paused)) {
    console.log('游戏未在运行中，不保存状态');
    return null;
  }
  
  console.log('保存贪吃蛇游戏状态');
  return {
    snake: JSON.parse(JSON.stringify(this.snake)),
    direction: this.direction,
    nextDirection: this.nextDirection,
    food: JSON.parse(JSON.stringify(this.food)),
    score: this.score,
    highScore: this.highScore,
    gameInProgress: true,
    isPlaying: true,
    // 添加血量保存
    health: this.health,
    maxHealth: this.maxHealth,
    // 添加特殊水果状态
    specialFruit: this.specialFruit ? JSON.parse(JSON.stringify(this.specialFruit)) : null,
    foodEatenCount: this.foodEatenCount
  };
}

// 修改 restoreGameState 方法，恢复完整游戏状态
restoreGameState(state) {
  if (!state || !state.gameInProgress) {
    console.log('没有可恢复的游戏状态');
    return false;
  }
  
  console.log('恢复贪吃蛇游戏状态');
  
  this.snake = state.snake;
  this.direction = state.direction;
  this.nextDirection = state.nextDirection;
  this.food = state.food;
  this.score = state.score;
  this.highScore = state.highScore || this.highScore;
  this.gameOver = false;
  this.paused = true;
  this.isPlaying = true;
  
  // 恢复血量状态
  if (typeof state.health === 'number') {
    this.health = state.health;
  }
  
  // 恢复特殊水果
  this.specialFruit = state.specialFruit;
  this.foodEatenCount = state.foodEatenCount || 0;
  
  this.scoreElement.textContent = this.score;
  this.highScoreElement.textContent = this.highScore;
  
  // 重新绘制血量显示
  this.drawHealth();
  
  this.draw();
  this.showStaticPauseScreen();
  
  const playPauseIcon = document.getElementById('snake-play-pause-icon');
  if (playPauseIcon) playPauseIcon.src = './image/start.svg';
  
  console.log('贪吃蛇游戏状态已恢复');
  return true;
}
// 修改 SnakeGame 类中的 showStaticPauseScreen 方法
showStaticPauseScreen() {
  let pauseLayer = document.getElementById('snake-pause-layer');
  if (!pauseLayer) {
    pauseLayer = document.createElement('div');
    pauseLayer.id = 'snake-pause-layer';
    
    const canvasRect = this.canvas.getBoundingClientRect();
    const pauseWidth = 120;
    const pauseHeight = 60;
    
    const canvasContainer = this.canvas.parentElement;
    
    if (canvasContainer) {
      if (getComputedStyle(canvasContainer).position === 'static') {
        canvasContainer.style.position = 'relative';
      }
      
      this.canvas.insertAdjacentElement('afterend', pauseLayer);
      
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
    pauseLayer.style.display = 'none';
    
    setTimeout(() => {
      if (pauseLayer.parentNode) {
        pauseLayer.parentNode.removeChild(pauseLayer);
      }
    }, 50);
  }
}

// 添加更新怪物位置的方法
updateMonsterPosition() {
  // 如果怪物被击中，暂时不移动
  if (this.monsterHit && Date.now() - this.monsterHitTime < this.monsterHitDuration) {
    return;
  }
  
  // 每隔一定帧数移动怪物
  this.monsterMoveCounter++;
  if (this.monsterMoveCounter < this.monsterMoveInterval) {
    return;
  }
  
  // 重置计数器
  this.monsterMoveCounter = 0;
  
  // 获取地图中心位置
  const centerX = Math.floor(this.widthInBlocks / 2);
  const centerY = Math.floor(this.heightInBlocks / 2);
  
  // 计算怪物可移动的范围（保持在地图中心区域附近）
  const moveRange = 5; // 怪物可以在中心点周围5格范围内移动
  const minX = centerX - moveRange;
  const maxX = centerX + moveRange;
  const minY = centerY - moveRange;
  const maxY = centerY + moveRange;
  
  // 有20%的几率改变方向
  if (Math.random() < 0.2) {
    this.monsterDirection = this.monsterMoveOptions[Math.floor(Math.random() * this.monsterMoveOptions.length)];
  }
  
  // 根据当前方向移动怪物
  let newX = this.monsterPosition.x;
  let newY = this.monsterPosition.y;
  
  switch(this.monsterDirection) {
    case 'up': newY -= 1; break;
    case 'down': newY += 1; break;
    case 'left': newX -= 1; break;
    case 'right': newX += 1; break;
  }
  
  // 如果新位置超出范围，改变方向
  if (newX < minX || newX > maxX || newY < minY || newY > maxY) {
    // 选择一个新的、不会导致越界的方向
    let validDirections = this.monsterMoveOptions.filter(dir => {
      let testX = this.monsterPosition.x;
      let testY = this.monsterPosition.y;
      
      switch(dir) {
        case 'up': testY -= 1; break;
        case 'down': testY += 1; break;
        case 'left': testX -= 1; break;
        case 'right': testX += 1; break;
      }
      
      return testX >= minX && testX <= maxX && testY >= minY && testY <= maxY;
    });
    
    if (validDirections.length > 0) {
      this.monsterDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
      
      // 根据新方向再次计算位置
      switch(this.monsterDirection) {
        case 'up': newY = this.monsterPosition.y - 1; break;
        case 'down': newY = this.monsterPosition.y + 1; break;
        case 'left': newX = this.monsterPosition.x - 1; break;
        case 'right': newX = this.monsterPosition.x + 1; break;
      }
    } else {
      // 如果没有有效方向，保持原位置
      newX = this.monsterPosition.x;
      newY = this.monsterPosition.y;
    }
  }
  
  // 更新怪物位置
  this.monsterPosition.x = newX;
  this.monsterPosition.y = newY;
}

// 添加龙吐火的方法
updateDragonFireBreath() {
  const now = Date.now();
  
  // 检查是否应该开始喷火
  if (!this.fireBreathActive && now - this.fireBreathLastTime > this.fireBreathInterval) {
    this.startFireBreath();
    this.fireBreathLastTime = now;
  }
  
  // 检查是否应该停止喷火
  if (this.fireBreathActive && now - this.fireBreathLastTime > this.fireBreathDuration) {
    this.fireBreathActive = false;
  }
}

// 开始喷火效果
startFireBreath() {
  this.fireBreathActive = true;
  
  // 生成放射状的火焰方向 - 增加火焰数量使火焰覆盖更广
  this.fireDirection = [];
  const numDirections = 6; // 增加到6个方向的火焰
  
  for (let i = 0; i < numDirections; i++) {
    // 生成不同角度的方向，覆盖约150度范围
    const angle = (Math.PI / 2.5) * (i - (numDirections - 1) / 2);
    
    // 根据龙的位置确定火焰基准方向
    const baseX = -1;
    const baseY = 0;
    
    // 计算火焰方向
    this.fireDirection.push({
      x: Math.cos(angle) + baseX,
      y: Math.sin(angle) + baseY,
      angle: angle
    });
  }
  
  console.log('龙喷火开始！火焰方向数:', this.fireDirection.length);
}

// 添加日志到 startSpeedUp 方法，帮助调试
startSpeedUp() {
  // 如果已经处于加速状态，只重置持续时间
  if (this.isSpeedUp) {
    this.speedUpStartTime = Date.now();
    console.log('加速效果重置！继续持续5秒');
    return;
  }
  
  this.isSpeedUp = true;
  this.speedUpStartTime = Date.now();
  
  // 记住原来的速度
  if (!this.priorInterval) {
    this.priorInterval = this.updateInterval;
  }
  
  // 更新速度间隔
  this.updateInterval = this.normalSpeed * this.speedUpFactor;
  
  // 添加视觉提示
  this.showSpeedUpEffect();
  
  console.log('加速效果激活！速度提高50%，持续5秒');
  console.log('当前速度间隔：', this.updateInterval);
}
// 添加处理加速状态的方法
updateSpeedState() {
  if (this.isSpeedUp) {
    const now = Date.now();
    
    // 如果加速状态已经超过持续时间，则恢复正常速度
    if (now - this.speedUpStartTime > this.speedUpDuration) {
      this.isSpeedUp = false;
      this.updateInterval = this.normalSpeed;
      
      // 移除视觉提示
      this.removeSpeedUpEffect();
      
      console.log('加速效果结束，恢复正常速度');
    }
  }
}

// 添加加速视觉提示
showSpeedUpEffect() {
  // 创建加速效果指示器
  let speedIndicator = document.getElementById('speed-up-indicator');
  if (!speedIndicator) {
    speedIndicator = document.createElement('div');
    speedIndicator.id = 'speed-up-indicator';
    
    const canvasContainer = this.canvas.parentElement;
    
    if (canvasContainer) {
      speedIndicator.style.position = 'absolute';
      speedIndicator.style.top = '40px';
      speedIndicator.style.left = '50%';
      speedIndicator.style.transform = 'translateX(-50%)';
      speedIndicator.style.backgroundColor = 'rgba(255, 165, 0, 0.7)';
      speedIndicator.style.color = 'white';
      speedIndicator.style.padding = '5px 10px';
      speedIndicator.style.borderRadius = '15px';
      speedIndicator.style.fontWeight = 'bold';
      speedIndicator.style.zIndex = '100';
      speedIndicator.style.boxShadow = '0 0 10px rgba(255, 165, 0, 0.7)';
      speedIndicator.style.animation = 'pulsate 1s infinite';
      speedIndicator.textContent = '加速模式!';
      
      // 添加脉动动画样式
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulsate {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `;
      document.head.appendChild(style);
      
      canvasContainer.appendChild(speedIndicator);
    }
  } else {
    speedIndicator.style.display = 'block';
  }
  
  // 在蛇头周围添加速度线效果
  this.drawSpeedLines = true;
}

// 移除加速视觉提示
removeSpeedUpEffect() {
  const speedIndicator = document.getElementById('speed-up-indicator');
  if (speedIndicator) {
    speedIndicator.style.display = 'none';
    
    // 可选：移除元素
    setTimeout(() => {
      if (speedIndicator.parentNode) {
        speedIndicator.parentNode.removeChild(speedIndicator);
      }
    }, 300);
  }
  
  // 移除蛇头周围的速度线效果
  this.drawSpeedLines = false;
}
// 添加处理咬尾巴的方法
handleTailBite() {
  // 蛇变短(移除尾巴)
  this.snake.pop();
  
  // 扣分逻辑
  const pointsLost = 2; // 每次咬尾巴扣2分
  this.score = Math.max(0, this.score - pointsLost); // 防止分数为负
  this.drawScore();
  
  // 添加视觉反馈
  this.showTailBiteEffect();
}
// 添加咬尾巴的视觉反馈
showTailBiteEffect() {
  // 创建临时提示
  let biteIndicator = document.createElement('div');
  biteIndicator.textContent = '-2';
  biteIndicator.style.position = 'absolute';
  biteIndicator.style.color = 'red';
  biteIndicator.style.fontWeight = 'bold';
  biteIndicator.style.fontSize = '24px';
  
  // 放置在canvas附近
  const canvasContainer = this.canvas.parentElement;
  if (canvasContainer) {
    biteIndicator.style.top = '70px';
    biteIndicator.style.left = '50%';
    biteIndicator.style.transform = 'translateX(-50%)';
    biteIndicator.style.zIndex = '101';
    
    // 添加动画
    biteIndicator.style.animation = 'fadeUp 1s forwards';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeUp {
        0% { opacity: 1; transform: translate(-50%, 0); }
        100% { opacity: 0; transform: translate(-50%, -20px); }
      }
    `;
    document.head.appendChild(style);
    
    canvasContainer.appendChild(biteIndicator);
    
    // 动画结束后移除
    setTimeout(() => {
      if (biteIndicator.parentNode) {
        biteIndicator.parentNode.removeChild(biteIndicator);
      }
    }, 1000);
  }
}
handleBodyBite(biteIndex) {
  // 设置标志，表示已经咬过身体
  this.hasEatenBody = true;
  
  // 计算要减掉的分数 - 与切断的长度成正比
  const segmentsRemoved = this.snake.length - biteIndex;
  const pointsLost = Math.min(segmentsRemoved, 10); // 最多扣10分
  
  // 修改蛇的长度 - 从被咬的位置截断
  this.snake = this.snake.slice(0, biteIndex);
  
  // 扣分
  this.score = Math.max(0, this.score - pointsLost); // 防止分数为负
  this.drawScore();
  
  // 添加视觉反馈
  this.showBodyBiteEffect(pointsLost);
  
  // 如果蛇长度太短，可以触发游戏结束
  const minLength = 2; // 最小长度
  if (this.snake.length < minLength) {
    this.health--; // 减少生命值
    this.drawHealth();
    
    if (this.health <= 0) {
      this.gameOver = true;
      this.drawGameOver();
      return;
    }
    
    // 重新增长蛇的长度到安全长度
    while (this.snake.length < minLength) {
      const tail = this.snake[this.snake.length - 1];
      this.snake.push({...tail});
    }
  }
}
// 添加咬身体的视觉反馈
showBodyBiteEffect(pointsLost) {
  // 创建临时提示
  let biteIndicator = document.createElement('div');
  biteIndicator.textContent = `-${pointsLost}`;
  biteIndicator.style.position = 'absolute';
  biteIndicator.style.color = 'red';
  biteIndicator.style.fontWeight = 'bold';
  biteIndicator.style.fontSize = '24px';
  
  // 放置在canvas附近
  const canvasContainer = this.canvas.parentElement;
  if (canvasContainer) {
    biteIndicator.style.top = '70px';
    biteIndicator.style.left = '50%';
    biteIndicator.style.transform = 'translateX(-50%)';
    biteIndicator.style.zIndex = '101';
    
    // 添加震动动画效果
    biteIndicator.style.animation = 'shakeAndFade 1.2s forwards';
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shakeAndFade {
        0% { opacity: 1; transform: translate(-50%, 0); }
        10%, 30%, 50% { transform: translate(-53%, 0); }
        20%, 40%, 60% { transform: translate(-47%, 0); }
        70% { transform: translate(-50%, 0); opacity: 1; }
        100% { transform: translate(-50%, -25px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    canvasContainer.appendChild(biteIndicator);
    
    // 动画结束后移除
    setTimeout(() => {
      if (biteIndicator.parentNode) {
        biteIndicator.parentNode.removeChild(biteIndicator);
      }
    }, 1200);
  }
  
  // 添加闪烁效果
  this.startBlinking();
}
}