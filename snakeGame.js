// snakeGame.js
class SnakeGame {
    // 修改 SnakeGame 构造函数，在最后添加绘制血量的调用
    constructor() {
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
      this.invincibleTime = 3000; // 无敌时间3秒
      this.isBlinking = false;
      this.blinkCount = 0;
      this.heartImg = new Image();
      this.heartImg.src = './image/heart.svg';
      this.emptyHeartImg = new Image();
      this.emptyHeartImg.src = './image/heart-empty.svg';
      
      // 添加怪物图像
      this.monsterImg = new Image();
      this.monsterImg.src = './image/monster.svg';
      // 添加眩晕状态标志
      this.isStunned = false;

      // 添加水果系统
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
      this.snake = [{x: 12, y: 20}, {x: 11, y: 20}, {x: 10, y: 20}, {x: 9, y: 20}, {x: 8, y: 20}];
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
  
// 在 draw 方法中添加绘制怪物的代码
draw() {
  this.ctx.clearRect(0, 0, this.width, this.height);
  this.drawGrid();
  
  // 绘制怪物和边界
  const centerX = Math.floor(this.widthInBlocks / 2);
  const centerY = Math.floor(this.heightInBlocks / 2);
  
  // 先绘制怪物边界区域
  const monsterLeft = centerX - 1;
  const monsterRight = centerX + 2;
  const monsterTop = centerY - 1;
  const monsterBottom = centerY + 2;
  
  // 以半透明红色绘制怪物边界
  this.ctx.strokeStyle = 'rgba(255, 50, 50, 0.5)';
  this.ctx.lineWidth = 2;
  this.ctx.setLineDash([3, 3]); // 设置虚线样式
  this.ctx.strokeRect(
    monsterLeft * this.blockSize,
    monsterTop * this.blockSize,
    (monsterRight - monsterLeft) * this.blockSize,
    (monsterBottom - monsterTop) * this.blockSize
  );
  this.ctx.setLineDash([]); // 重置线条样式

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
  
  // 更新子弹位置
  this.updateBullets();
  
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

// 更新子弹位置和碰撞检测
updateBullets() {
  // 更新子弹位置
  for (let i = 0; i < this.bullets.length; i++) {
    const bullet = this.bullets[i];
    bullet.x += bullet.dirX * this.bulletSpeed;
    bullet.y += bullet.dirY * this.bulletSpeed;
    
    // 检查是否击中怪物
    const centerX = Math.floor(this.widthInBlocks / 2);
    const centerY = Math.floor(this.heightInBlocks / 2);
    const monsterLeft = centerX - 1;
    const monsterRight = centerX + 2;
    const monsterTop = centerY - 1;
    const monsterBottom = centerY + 2;
    
    const bulletBlockX = Math.floor(bullet.x / this.blockSize);
    const bulletBlockY = Math.floor(bullet.y / this.blockSize);
    
    if (bulletBlockX >= monsterLeft && bulletBlockX < monsterRight && 
        bulletBlockY >= monsterTop && bulletBlockY < monsterBottom) {
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
// 修改 checkCollision 方法，添加无敌状态检查
checkCollision(head) {
  // 无敌状态下不检测碰撞
  if (this.isInvincible) {
    return false;
  }
  
  // 检查是否撞墙
  if (head.x < 0 || head.x >= this.widthInBlocks || head.y < 0 || head.y >= this.heightInBlocks) 
    return true;
    
  // 检查是否撞到自己
  if (this.snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y))
    return true;
    
  // 检查是否撞到怪物
  const centerX = Math.floor(this.widthInBlocks / 2);
  const centerY = Math.floor(this.heightInBlocks / 2);
  
  // 怪物占据的区域是中心点周围的4x4方块
  const monsterLeft = centerX - 1;
  const monsterRight = centerX + 2;
  const monsterTop = centerY - 1;
  const monsterBottom = centerY + 2;
  
  // 判断蛇头是否在怪物区域内
  if (head.x >= monsterLeft && head.x < monsterRight && 
      head.y >= monsterTop && head.y < monsterBottom) {
    return true;
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
  this.updateInterval = 130;
  
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
  
  this.snake = [{x: 12, y: 20}, {x: 11, y: 20}, {x: 10, y: 20}, {x: 9, y: 20}, {x: 8, y: 20}];
  this.direction = 'right';
  this.nextDirection = 'right';
  this.pausedDirection = null;
  this.pausedNextDirection = null;
  this.food = this.createFood();
  this.score = 0;
  this.gameOver = false;
  this.paused = false;
  
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
    isPlaying: true
  };
}

// 修改 restoreGameState 方法，使用DOM元素显示暂停状态
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
  
  this.scoreElement.textContent = this.score;
  this.highScoreElement.textContent = this.highScore;
  
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
}