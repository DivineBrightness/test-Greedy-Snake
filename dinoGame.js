class DinoGame {
  constructor() {
    // 角色选择相关属性
    this.characters = [
      { id: "result_l", name: "小恐龙", path: "./image/dino/character/result_l.svg" },
      { id: "squirtle", name: "杰尼龟", path: "./image/dino/character/squirtle.svg" },
    ];
    // 从localStorage加载选择的角色或使用默认角色
    this.selectedCharacter = localStorage.getItem('dinoCharacter') || "squirtle";

    // 添加水果相关属性
    this.fruits = [];
    this.fruitType = {
      type: 'apple',
      width: 50,
      height: 50,
      probability: 0.1
    };
    this.fruitInterval = 20000; // 每20秒可能出现一个水果
    this.lastFruitTime = 0;

    // 添加无敌相关属性 - 但暂时不初始化依赖于dino的属性
    this.isInvincible = false;
    this.invincibleTimer = 0;
    this.invincibleDuration = 10000; // 无敌持续10秒
        // 添加拖影效果属性
        this.dinoPositions = [];  // 存储恐龙最近几个位置
        this.maxTrailLength = 5;  // 拖影长度
        

    this.canvas = document.getElementById('dino-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.scoreElement = document.getElementById('dino-score');
    this.highScoreElement = document.getElementById('dino-high-score');
    this.highScore = localStorage.getItem('dinoHighScore') || 0;
    this.highScoreElement.textContent = this.highScore;
    this.gameOver = false;
    this.paused = false;
    this.isPlaying = false;
    this.animationFrameId = null;
    
    // 游戏尺寸和速度
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.groundHeight = 60; // 地面高度
    this.speed = 5; // 初始速度
    this.maxSpeed = 36; // 最大速度
    this.acceleration = 0.01; // 加速度
    
    // 放大恐龙尺寸
    this.dino = {
      x: 80,
      y: this.height - this.groundHeight - 120, // 调整位置适应更大尺寸
      width: 120, // 增大到120 (原来是80)
      height: 120, // 增大到120 (原来是80)
      jumping: false,
      jumpVelocity: 0,
      jumpStrength: -25, // 增加跳跃力度 (原来是-16)
      gravity: 0.8, // 增加重力 (原来是0.7)
      crouching: false
    };
    
    // 初始化依赖于dino的属性 - 移到dino创建之后
    this.originalDinoSize = {
      width: this.dino.width,
      height: this.dino.height
    };
    
    // 放大障碍物尺寸
    this.obstacles = [];
    this.obstacleTypes = [
      { type: 'cactus', width: 90, height: 180, probability: 0.7 }, // 放大仙人掌(原来是60x120)
      { type: 'bird', width: 120, height: 80, probability: 0.3, yOffset: -40 } // 放大鸟类(原来是90x60)
    ];
    this.minObstacleDistance = 600; // 增加障碍物之间的最小距离 (原来是400)
    this.lastObstacleTime = 0; // 上次生成障碍物的时间
    this.obstacleInterval = 1500; // 初始障碍物生成间隔
    
    // 游戏状态
    this.score = 0;
    this.distance = 0;
    this.isNight = false; // 日/夜模式
    this.nightTimer = 0;
    this.nightInterval = 30000; // 30秒切换一次日/夜
    
    // 云朵和地面装饰
    this.clouds = [];
    this.grounds = this.initGrounds();
    
    // 加载图像资源
    this.loadImages();
    
    // 初始化事件监听器
    this.initEventListeners();
    
    // 绘制初始画面
    this.draw();
    
    // 加载排行榜
    loadLeaderboard("dino", "dino-leaderboard-content");
  }
  
  loadImages() {
    // 获取当前选择的角色路径
    const characterPath = this.getCharacterPath(this.selectedCharacter);
    
    // 简化版图片加载 - 修改为使用选择的角色
    this.images = {
      dino: {
        run1: this.loadImage(characterPath),
        run2: this.loadImage(characterPath),
        jump: this.loadImage(characterPath),
        // run2: characterPath === "./image/dino/character/111.png"
        //   ? this.loadImage("./image/dino/character/222.png")
        //   : this.loadImage(characterPath),
        // jump: characterPath === "./image/dino/character/111.png"
        // ? this.loadImage("./image/dino/character/3333.png")
        // : this.loadImage(characterPath),
      },
      obstacles: {
        cactus1: this.loadImage('./image/dino/cactus.svg'),
        bird: this.loadImage('./image/dino/chicken.svg'), 
      },
      // 添加水果图像
      fruits: {
        apple: this.loadImage('./image/fruit/apple1.svg')
      }
    };
    
    // 简化图片加载计数
    this.imagesLoaded = 0;
    this.totalImages = 4;
    
    // 添加图像加载完成事件
    if (this.images.dino.run1) {
      this.images.dino.run1.onload = () => this.imageLoaded();
      this.images.dino.run1.onerror = () => this.imageLoaded();
    }
    
    if (this.images.dino.run2) {
      this.images.dino.run2.onload = () => this.imageLoaded();
      this.images.dino.run2.onerror = () => this.imageLoaded();
    }
    
    if (this.images.obstacles.cactus1) {
      this.images.obstacles.cactus1.onload = () => this.imageLoaded();
      this.images.obstacles.cactus1.onerror = () => this.imageLoaded();
    }
        // 添加鸟类图片的加载事件
        if (this.images.obstacles.bird) {
          this.images.obstacles.bird.onload = () => this.imageLoaded();
          this.images.obstacles.bird.onerror = () => this.imageLoaded();
        }
    // 设置超时，即使图片未全部加载也启动游戏
    setTimeout(() => {
      if (!this.gameOver && !this.isPlaying) {
        console.log('图片加载超时，使用备用图形');
        this.draw();
      }
    }, 1000);
    
    // 当前恐龙动画帧
    this.dinoFrame = 0;
    this.dinoAnimationSpeed = 10; // 每10帧切换一次动画
    this.frameCount = 0;
    
    // 鸟的动画帧
    this.birdFrame = 0;
    this.birdAnimationSpeed = 15; // 每15帧切换一次动画
  }
  
  imageLoaded() {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.totalImages) {
      console.log('所有恐龙游戏图像已加载完成');
      // 可以在这里添加加载完成后的操作
      this.draw(); // 重新绘制，使用加载完的图像
    }
  }
  
  loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }
  
  initGrounds() {
    const groundWidth = 600; // 地面纹理的宽度
    const numGrounds = Math.ceil(this.width / groundWidth) + 1;
    
    return Array(numGrounds).fill().map((_, i) => ({
      x: i * groundWidth,
      width: groundWidth
    }));
  }
  
  initEventListeners() {
    // 添加角色选择按钮
    const characterBtn = document.getElementById('dino-character-btn');
    if (characterBtn) {
      characterBtn.addEventListener('click', () => {
        this.showCharacterSelectionModal();
      });
    }
    // 空格键、上箭头或点击用于跳跃
    this.keyDownHandler = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownHandler);
    
    // 点击或触摸屏幕跳跃
    this.canvas.addEventListener('click', () => this.jump());
    
    // 改进触摸事件处理，添加移动设备支持
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      // 获取触摸点坐标
      const touch = e.touches[0];
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      
      // 获取canvas位置
      const rect = this.canvas.getBoundingClientRect();
      
      if (this.isInvincible) {
        // 无敌状态下，触摸屏幕位置决定恐龙的Y位置
        const canvasY = touchY - rect.top;
        const canvasRatio = this.height / rect.height;
        this.dino.y = canvasY * canvasRatio - this.dino.height / 2;
      } else {
        // 普通状态，触摸下半部分蹲下，上半部分跳跃
        if (touchY - rect.top > this.height / 2) {
          this.dino.crouching = true;
        } else {
          this.jump();
        }
      }
    });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      // 结束蹲下状态
      this.dino.crouching = false;
    });
    
    // 按键释放事件
    this.keyUpHandler = this.handleKeyUp.bind(this);
    document.addEventListener('keyup', this.keyUpHandler);
    
    // 开始/暂停按钮
    const playPauseBtn = document.getElementById('dino-play-pause-btn');
    const playPauseIcon = document.getElementById('dino-play-pause-icon');
    
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
      playPauseBtn.addEventListener('click', this.playPauseBtnHandler);
    }
    
    // 修改移动端控制按钮
    const jumpBtn = document.getElementById('dino-jump-btn');
    if (jumpBtn) {
      jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (this.isInvincible) {
          // 无敌状态下向上移动
          this.dino.y -= 40;
        } else {
          this.jump();
        }
      });
      
      // 添加持续按住向上移动的效果
      let upInterval;
      jumpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (this.isInvincible) {
          upInterval = setInterval(() => {
            this.dino.y -= 20;
          }, 30);
        }
      });
      
      jumpBtn.addEventListener('touchend', () => {
        if (upInterval) {
          clearInterval(upInterval);
          upInterval = null;
        }
      });
    }
    
    const crouchBtn = document.getElementById('dino-crouch-btn');
    if (crouchBtn) {
      crouchBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (this.isInvincible) {
          // 无敌状态下向下移动
          this.dino.y += 40;
        } else {
          this.dino.crouching = true;
        }
      });
      
      // 添加持续按住向下移动的效果
      let downInterval;
      crouchBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (this.isInvincible) {
          downInterval = setInterval(() => {
            this.dino.y += 20;
          }, 30);
        }
      });
      
      crouchBtn.addEventListener('touchend', () => {
        if (this.isInvincible) {
          if (downInterval) {
            clearInterval(downInterval);
            downInterval = null;
          }
        } else {
          this.dino.crouching = false;
        }
      });
    }
    
    // 排行榜按钮
    const leaderboardBtn = document.getElementById('dino-leaderboard-btn');
    const leaderboardContent = document.getElementById('dino-leaderboard-content');
    
    if (leaderboardBtn && leaderboardContent) {
      this.leaderboardClickHandler = (e) => {
        e.stopPropagation();
        leaderboardContent.style.display = 
          leaderboardContent.style.display === 'block' ? 'none' : 'block';
        
        // 加载排行榜数据
        if (leaderboardContent.style.display === 'block') {
          loadLeaderboard("dino", "dino-leaderboard-content");
        }
      };
      
      leaderboardBtn.addEventListener('click', this.leaderboardClickHandler);
      
      // 点击排行榜外部关闭
      this.documentClickHandler = (e) => {
        if (!leaderboardContent.contains(e.target) && e.target !== leaderboardBtn) {
          leaderboardContent.style.display = 'none';
        }
      };
      
      document.addEventListener('click', this.documentClickHandler);
      
      // 关闭按钮
      const closeBtn = leaderboardContent.querySelector('.leaderboard-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          leaderboardContent.style.display = 'none';
        });
      }
    }
    
    // 添加后退按钮事件处理
    const backBtn = document.getElementById('dino-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        // 保存游戏状态
        if (!this.gameOver && (this.isPlaying || this.paused)) {
          const gameState = this.saveGameState();
          if (gameState) {
            localStorage.setItem('dinoGameState', JSON.stringify(gameState));
            console.log('恐龙游戏状态已保存');
          }
        }
        
        // 销毁游戏实例
        this.destroy();
        
        // 返回游戏选择页面
        document.getElementById('dino-game').style.display = 'none';
        document.getElementById('games-selection').style.display = 'block';
      });
    }
  }
  
  // 修改键盘控制，添加无敌状态下的上下移动
  handleKeyDown(e) {
    if (this.gameOver || this.paused) return;
    
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      if (this.isInvincible) {
        // 无敌状态下，上键向上移动
        this.dino.y -= 40;
      } else {
        // 普通状态下，跳跃
        this.jump();
      }
    } else if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      if (this.isInvincible) {
        // 无敌状态下，下键向下移动
        this.dino.y += 40;
      } else {
        // 普通状态下，蹲下
        this.dino.crouching = true;
      }
    } else if (e.code === 'KeyP') {
      this.togglePause();
    }
  }
  
  handleKeyUp(e) {
    if (e.code === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      this.dino.crouching = false;
    }
  }
  
  jump() {
    if (!this.dino.jumping && !this.gameOver && !this.paused) {
      this.dino.jumping = true;
      this.dino.jumpVelocity = this.dino.jumpStrength;
    }
  }
  
  togglePause() {
    if (this.gameOver) return;
    
    this.paused = !this.paused;
    const playPauseIcon = document.getElementById('dino-play-pause-icon');
    
    if (this.paused) {
      if (playPauseIcon) playPauseIcon.src = './image/start.svg';
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      this.showPauseScreen();
    } else {
      if (playPauseIcon) playPauseIcon.src = './image/pause.svg';
      this.removePauseScreen();
      this.gameLoop();
    }
  }
  
  showPauseScreen() {
    let pauseLayer = document.getElementById('dino-pause-layer');
    if (!pauseLayer) {
      pauseLayer = document.createElement('div');
      pauseLayer.id = 'dino-pause-layer';
      
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
  
  removePauseScreen() {
    const pauseLayer = document.getElementById('dino-pause-layer');
    if (pauseLayer) {
      pauseLayer.style.display = 'none';
      
      setTimeout(() => {
        if (pauseLayer.parentNode) {
          pauseLayer.parentNode.removeChild(pauseLayer);
        }
      }, 50);
    }
  }
  
  start() {
    if (this.animationFrameId) {
      console.log('游戏已经在运行中，忽略重复启动');
      return;
    }
    
    // 强制绘制一次，确保有内容显示
    this.draw();
    
    this.paused = false;
    this.isPlaying = true;
    this.gameOver = false;
    
    // 初始化游戏
    this.score = 0;
    this.distance = 0;
    this.speed = 5;
    this.obstacles = [];
    this.lastObstacleTime = 0;
    
    // 重置恐龙状态 - 修复位置计算
    this.dino.y = this.height - this.groundHeight - this.dino.height;
    this.dino.jumping = false;
    this.dino.jumpVelocity = 0;
    this.dino.crouching = false;
    
    // 重置日/夜状态
    this.isNight = false;
    this.nightTimer = 0;
    
    // 启动游戏循环
    this.gameLoop();
  }
  
  gameLoop() {
    if (this.gameOver || this.paused) return;
    
    this.update();
    this.draw();
    
    // 继续游戏循环
    this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
  }
  
  update() {
    // 增加分数和距离
    this.distance += this.speed;
    // this.score = Math.floor(this.distance / 10);
    // 检查是否有障碍物被跳过
    for (const obstacle of this.obstacles) {
      // 判断恐龙是否已经越过障碍物的右边界(障碍物完全在恐龙左侧)
      if (!obstacle.passed && obstacle.x + obstacle.width < this.dino.x) {
        // 标记为已通过，并增加得分
        obstacle.passed = true;
        this.score += 1;
        this.scoreElement.textContent = this.score;
        
        // 可以添加跳过障碍物的得分动画或音效
        console.log('跳过障碍物得分！当前分数：', this.score);
      }
    }
    // 【添加此段代码】更新无敌状态计时器
    if (this.isInvincible) {
      this.invincibleTimer += 16; // 假设16ms为一帧
      
      // 无敌状态下保持飞行状态
      this.dino.isFlying = true;
      
      // 无敌结束时恢复正常
      if (this.invincibleTimer > this.invincibleDuration) {
        this.isInvincible = false;
        this.invincibleTimer = 0;
        this.dino.isFlying = false;
        
        // 恢复恐龙原始大小
        this.dino.width = this.originalDinoSize.width;
        this.dino.height = this.originalDinoSize.height;
        this.dino.y = this.height - this.groundHeight - this.dino.height;
      }
    }
    // 增加速度
    if (this.speed < this.maxSpeed) {
      this.speed += this.acceleration;
    }
    
    // 更新恐龙位置
    if (this.dino.jumping) {
      this.dino.y += this.dino.jumpVelocity;
      this.dino.jumpVelocity += this.dino.gravity;
      
      // 检查是否着地
      if (this.dino.y >= this.height - this.groundHeight - (this.dino.crouching ? this.dino.height / 2 : this.dino.height)) {
        this.dino.y = this.height - this.groundHeight - (this.dino.crouching ? this.dino.height / 2 : this.dino.height);
        this.dino.jumping = false;
        this.dino.jumpVelocity = 0;
      }
    }
    
    // 更新动画帧
    this.frameCount++;
    if (this.frameCount % this.dinoAnimationSpeed === 0) {
      this.dinoFrame = 1 - this.dinoFrame; // 在0和1之间切换
    }
    
    if (this.frameCount % this.birdAnimationSpeed === 0) {
      this.birdFrame = 1 - this.birdFrame; // 在0和1之间切换
    }
    
    // 更新地面位置
    for (let i = 0; i < this.grounds.length; i++) {
      this.grounds[i].x -= this.speed;
      
      // 如果地面完全移出屏幕，将其移到右侧
      if (this.grounds[i].x + this.grounds[i].width < 0) {
        const lastGround = this.grounds[(i - 1 + this.grounds.length) % this.grounds.length];
        this.grounds[i].x = lastGround.x + lastGround.width;
      }
    }
    
    // 更新云朵位置
    for (let i = 0; i < this.clouds.length; i++) {
      this.clouds[i].x -= this.speed * 0.5; // 云朵移动速度为游戏速度的一半
      
      // 如果云朵移出屏幕，将其删除
      if (this.clouds[i].x + this.clouds[i].width < 0) {
        this.clouds.splice(i, 1);
        i--;
      }
    }
    
    // 随机生成新的云朵 - 进一步放大
    if (Math.random() < 0.005) {
      this.clouds.push({
        x: this.width,
        y: Math.random() * (this.height / 2 - 120),
        width: 180, // 原来是120
        height: 90  // 原来是60
      });
    }
    
    // 更新障碍物位置
    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].x -= this.speed;
      
      // 如果障碍物移出屏幕，将其删除
      if (this.obstacles[i].x + this.obstacles[i].width < 0) {
        this.obstacles.splice(i, 1);
        i--;
      }
    }
    
    
    // 生成新的障碍物
    const now = Date.now();
    if (now - this.lastObstacleTime > this.obstacleInterval) {
      // 确保至少有一个障碍物的距离
      if (this.obstacles.length === 0 || 
          this.width - (this.obstacles[this.obstacles.length - 1].x + this.obstacles[this.obstacles.length - 1].width) > this.minObstacleDistance) {
        this.generateObstacle();
        this.lastObstacleTime = now;
        
        // 随着游戏进行，减少障碍物生成间隔
        this.obstacleInterval = Math.max(800, 1500 - this.score / 10);
      }
    }


    // 修改保存恐龙位置的方式 - 创建向后的拖影效果
    if (this.frameCount % 2 === 0) { // 每2帧记录一次，增加拖影密度
      // 清除之前的位置数组
      if (this.isInvincible) {
        // 计算向后的拖影位置，而不是记录当前位置
        for (let i = 0; i < this.maxTrailLength; i++) {
          const offset = (i + 1) * 15; // 每个拖影间隔15像素
          this.dinoPositions[i] = {
            x: this.dino.x - offset, // 向后偏移
            y: this.dino.y + Math.sin(Date.now()/200 + i*0.5) * 5, // 添加微小的上下波动
            width: this.dino.width * (1 - i/this.maxTrailLength * 0.3), // 逐渐缩小
            height: this.dino.height * (1 - i/this.maxTrailLength * 0.3), // 逐渐缩小
            isFlying: this.dino.isFlying || this.isInvincible
          };
        }
      } else {
        // 非无敌状态下不显示拖影
        this.dinoPositions = [];
      }
    }
        // 更新水果位置
        for (let i = 0; i < this.fruits.length; i++) {
          this.fruits[i].x -= this.speed;
          
          // 如果水果移出屏幕，将其删除
          if (this.fruits[i].x + this.fruits[i].width < 0) {
            this.fruits.splice(i, 1);
            i--;
          }
        }
    // 生成新的水果
    if (now - this.lastFruitTime > this.fruitInterval) {
      if (Math.random() < this.fruitType.probability) {
        this.generateFruit();
        this.lastFruitTime = now;
      }
    }
    // 检测恐龙与水果的碰撞
    this.checkFruitCollisions();
    // 检测碰撞
    this.checkCollisions();
    
    // 更新日/夜状态
    this.nightTimer += 16; // 假设16ms为一帧
    if (this.nightTimer > this.nightInterval) {
      this.isNight = !this.isNight;
      this.nightTimer = 0;
    }
  }
  
  generateObstacle() {
    // 随机选择障碍物类型
    const rand = Math.random();
    let cumulativeProbability = 0;
    let selectedType;
    
    for (const type of this.obstacleTypes) {
      cumulativeProbability += type.probability;
      if (rand < cumulativeProbability) {
        selectedType = type;
        break;
      }
    }
    
    // 创建障碍物
    const obstacle = {
      x: this.width,
      y: this.height - this.groundHeight - selectedType.height + (selectedType.yOffset || 0),
      width: selectedType.width,
      height: selectedType.height,
      type: selectedType.type,
      passed: false // 添加标记，用于判断是否已经越过该障碍物
    };
    
    // 创建障碍物时，如果是鸟类，调整高度选择
    if (obstacle.type === 'bird') {
      // 有三种高度: 地面, 中间, 高处 - 调整为更大的间隔
      const heightLevels = [
        this.height - this.groundHeight - obstacle.height, // 地面
        this.height - this.groundHeight - obstacle.height - 110, // 中间 (增加高度)
        this.height - this.groundHeight - obstacle.height - 220  // 高处 (增加高度)
      ];
      obstacle.y = heightLevels[Math.floor(Math.random() * heightLevels.length)];
    }
    
    // 添加到障碍物列表中
    this.obstacles.push(obstacle);
  }
  
  checkCollisions() {
    // 获取恐龙碰撞盒
    const dinoBox = this.getCollisionBox(this.dino);
    
    // 对每个障碍物进行碰撞检测
    for (const obstacle of this.obstacles) {
      const obstacleBox = this.getCollisionBox(obstacle);
      
      // 如果发生碰撞
      if (this.isColliding(dinoBox, obstacleBox)) {
        this.gameOver = true;
        this.isPlaying = false;
        
        // 更新最高分
        if (this.score > this.highScore) {
          this.highScore = this.score;
          this.highScoreElement.textContent = this.highScore;
          localStorage.setItem('dinoHighScore', this.highScore);
        }
        
        // 停止游戏循环
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
        
        // 绘制游戏结束画面
        this.drawGameOver();
        return;
      }
    }
  }
  
  getCollisionBox(entity) {
    // 缩小碰撞盒以使游戏更加宽松
    const padding = 5;
    
    // 如果是恐龙且正在蹲下，调整碰撞盒高度
    if (entity === this.dino && this.dino.crouching) {
      return {
        x: entity.x + padding,
        y: entity.y + padding * 2,
        width: entity.width - padding * 2,
        height: entity.height / 2 - padding * 2 // 蹲下时高度减半
      };
    }
    
    return {
      x: entity.x + padding,
      y: entity.y + padding,
      width: entity.width - padding * 2,
      height: entity.height - padding * 2
    };
  }
  
  isColliding(box1, box2) {
    return box1.x < box2.x + box2.width &&
           box1.x + box1.width > box2.x &&
           box1.y < box2.y + box2.height &&
           box1.y + box1.height > box2.y;
  }
  
  draw() {
    // 清除画布
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // 设置颜色基于日/夜模式
    const backgroundColor = this.isNight ? '#292927' : '#f7f7f7';
    const groundColor = this.isNight ? '#4a4a4a' : '#bcbcbc';
    const textColor = this.isNight ? '#f7f7f7' : '#535353';
    
    // 绘制背景
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // 绘制云朵 - 放大云朵
    for (const cloud of this.clouds) {
      // 放大云朵尺寸
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(cloud.x + cloud.width/3, cloud.y + cloud.height/2, cloud.height/1.5, 0, Math.PI * 2);
      this.ctx.arc(cloud.x + cloud.width*2/3, cloud.y + cloud.height/2, cloud.height/1.5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  
    // 绘制地面
    this.ctx.fillStyle = groundColor;
    this.ctx.fillRect(0, this.height - this.groundHeight, this.width, this.groundHeight);
    
    // 绘制障碍物
    for (const obstacle of this.obstacles) {
        if (obstacle.type === 'cactus') {
        // 尝试使用仙人掌图像
        const cactusImage = this.images.obstacles.cactus1;
        
        if (cactusImage && cactusImage.complete && cactusImage.naturalWidth > 0) {
            this.ctx.drawImage(
            cactusImage,
            obstacle.x, obstacle.y,
            obstacle.width, obstacle.height
            );
        } else {
            // 备用绘制 - 使用绿色矩形代表仙人掌
            this.ctx.fillStyle = '#0d9e21';
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            // 添加一些细节让它看起来更像仙人掌
            this.ctx.fillStyle = '#0b8a1c';
            this.ctx.fillRect(obstacle.x + obstacle.width/4, obstacle.y - obstacle.height/4, obstacle.width/6, obstacle.height/4);
            this.ctx.fillRect(obstacle.x + obstacle.width*2/3, obstacle.y - obstacle.height/6, obstacle.width/6, obstacle.height/3);
        }
        } else if (obstacle.type === 'bird') {
          // 使用鸟类图像
        const birdImage = this.images.obstacles.bird;

        if (birdImage && birdImage.complete && birdImage.naturalWidth > 0) {
              this.ctx.drawImage(
              birdImage,
              obstacle.x, obstacle.y,
              obstacle.width, obstacle.height
              );
          } else {
              // 备用绘制 - 使用简单形状表示鸟类
              this.ctx.fillStyle = '#d05e3a';
              this.ctx.beginPath();
              this.ctx.ellipse(
                  obstacle.x + obstacle.width/2, 
                  obstacle.y + obstacle.height/2,
                  obstacle.width/2, obstacle.height/2, 
                  0, 0, Math.PI * 2
              );
              this.ctx.fill();
              
              // 添加翅膀
              const wingOffset = this.birdFrame === 0 ? -5 : 5;
              this.ctx.beginPath();
              this.ctx.ellipse(
                  obstacle.x + obstacle.width/2, 
                  obstacle.y + obstacle.height/2 + wingOffset,
                  obstacle.width/3, obstacle.height/4, 
                  0, 0, Math.PI * 2
              );
              this.ctx.fill();
          }
        }
    }
    // 绘制水果
    for (const fruit of this.fruits) {
      const fruitImage = this.images.fruits.apple;
      
      if (fruitImage && fruitImage.complete && fruitImage.naturalWidth > 0) {
        this.ctx.drawImage(
          fruitImage,
          fruit.x, fruit.y,
          fruit.width, fruit.height
        );
      } else {
        // 备用绘制
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(
          fruit.x + fruit.width/2,
          fruit.y + fruit.height/2,
          fruit.width/2,
          0, Math.PI * 2
        );
        this.ctx.fill();
      }
    }
    // 优化拖影绘制效果
    if (this.dinoPositions.length > 0 && this.isInvincible) {
      const dinoImage = this.dinoFrame === 0 ? this.images.dino.run1 : this.images.dino.run2;
      
      // 从后向前绘制拖影，使后面的层不会覆盖前面的
      for (let i = this.dinoPositions.length - 1; i >= 0; i--) {
        const pos = this.dinoPositions[i];
        // 使用指数降低透明度，使效果更加顺滑
        const alpha = Math.pow(0.8, i); 
        
        if (dinoImage && dinoImage.complete && dinoImage.naturalWidth > 0) {
          this.ctx.save();
          this.ctx.globalAlpha = alpha * 0.7; // 降低整体透明度
          
          // 绘制金色光晕
          const glowAlpha = alpha * 0.5;
          this.ctx.fillStyle = `rgba(255, 215, 0, ${glowAlpha})`;
          this.ctx.beginPath();
          this.ctx.ellipse(
            pos.x + pos.width/2,
            pos.y + pos.height/2,
            pos.width/2 + 5,
            pos.height/2 + 5,
            0, 0, Math.PI * 2
          );
          this.ctx.fill();
          
          // 绘制恐龙图像
          this.ctx.drawImage(dinoImage, pos.x, pos.y, pos.width, pos.height);
          this.ctx.restore();
        }
      }
    }
    // 绘制恐龙 (无敌状态的代码保持不变)
    let dinoImage;
    if (this.gameOver) {
      dinoImage = this.images.dino.run1;
    } else if (this.dino.jumping || this.dino.isFlying) {
      dinoImage = this.images.dino.jump;
      if (!dinoImage || !dinoImage.complete) {
        dinoImage = this.images.dino.run1;
      }
    } else {
      dinoImage = this.dinoFrame === 0 ? this.images.dino.run1 : this.images.dino.run2;
    }
    
    // 绘制恐龙
    if (dinoImage && dinoImage.complete && dinoImage.naturalWidth > 0) {
      this.ctx.save();
      
// 计算保持宽高比的尺寸
const imgRatio = dinoImage.naturalWidth / dinoImage.naturalHeight;
let drawWidth = this.dino.width;
let drawHeight = this.dino.height;

// 根据图像原始宽高比调整绘制尺寸
if (imgRatio > 1) { // 图像较宽
  drawHeight = this.dino.width / imgRatio;
} else { // 图像较高
  drawWidth = this.dino.height * imgRatio;
}

// 居中绘制
const offsetX = (this.dino.width - drawWidth) / 2;
const offsetY = (this.dino.height - drawHeight) / 2;

// 绘制恐龙图像时保持比例
this.ctx.drawImage(
  dinoImage,
  this.dino.x + offsetX, 
  this.dino.y + offsetY,
  drawWidth, 
  drawHeight
);

this.ctx.restore();
    } else {
      // 备用绘制 - 绘制一个灰色恐龙形状
      this.ctx.fillStyle = '#535353';
      
      // 主体
      this.ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height);
      
      // 头部
      this.ctx.fillRect(
          this.dino.x + this.dino.width - this.dino.width/3, 
          this.dino.y - this.dino.height/4, 
          this.dino.width/3, 
          this.dino.height/3
      );
      
      // 眼睛
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(
          this.dino.x + this.dino.width - this.dino.width/6, 
          this.dino.y - this.dino.height/6, 
          this.dino.width/12, 
          this.dino.width/12
      );
      
      // 腿部
      if (this.dinoFrame === 0) {
          this.ctx.fillStyle = '#333';
          this.ctx.fillRect(
          this.dino.x + this.dino.width/4, 
          this.dino.y + this.dino.height*0.8,
          this.dino.width/6, 
          this.dino.height*0.4
          );
          this.ctx.fillRect(
          this.dino.x + this.dino.width*0.6, 
          this.dino.y + this.dino.height*0.7,
          this.dino.width/6, 
          this.dino.height*0.5
          );
      } else {
          this.ctx.fillStyle = '#333';
          this.ctx.fillRect(
          this.dino.x + this.dino.width*0.6, 
          this.dino.y + this.dino.height*0.8,
          this.dino.width/6, 
          this.dino.height*0.4
          );
          this.ctx.fillRect(
          this.dino.x + this.dino.width/4, 
          this.dino.y + this.dino.height*0.7,
          this.dino.width/6, 
          this.dino.height*0.5
          );
      }
    }
    // 如果处于无敌状态，显示倒计时
    if (this.isInvincible) {
      const secondsLeft = Math.ceil((this.invincibleDuration - this.invincibleTimer) / 1000);
      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = '#FFD700'; // 金色字体
      this.ctx.textAlign = 'left';
      this.ctx.fillText(`无敌: ${secondsLeft}秒`, 20, 50);
    }
    // 用于调试的碰撞盒绘制
    if (false) { // 设置为true可以显示碰撞盒
      const box = this.getCollisionBox(this.dino);
      this.ctx.strokeStyle = 'blue';
      this.ctx.strokeRect(box.x, box.y, box.width, box.height);
    }
    
    // 绘制分数
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = textColor;
    this.ctx.textAlign = 'right';
    // this.ctx.fillText(`${this.score.toString().padStart(5, '0')}`, this.width - 20, 30);
  }
  
  drawGameOver() {
    // 绘制游戏结束状态
    this.draw();
    
    // 显示游戏结束信息
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = this.isNight ? '#f7f7f7' : '#535353';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('游戏结束', this.width / 2, this.height / 2 - 20);
    
    // 绘制重新开始按钮
    this.ctx.fillStyle = '#4CAF50';
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2 + 20, 15, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 绘制三角形作为重新开始符号
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2 - 5, this.height / 2 + 15);
    this.ctx.lineTo(this.width / 2 - 5, this.height / 2 + 25);
    this.ctx.lineTo(this.width / 2 + 7, this.height / 2 + 20);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 显示模态框
    this.showGameOverModal();
  }
  
  showGameOverModal() {
    const modal = document.getElementById('dino-modal');
    if (!modal) return;
    
    // 获取模态框内容容器
    const modalContent = modal.querySelector('div');
    
    // 动态设置模态框内容，参考贪吃蛇游戏的实现
    modalContent.innerHTML = `
      <button class="modal-close-btn"><img src="./image/x-circle.svg" alt="关闭" class="close-icon"></button>
      <div class="modal-header">
        <h2 style="color:rgb(3, 93, 61); margin-bottom: 15px; font-size: 24px;">游戏结束!</h2>
      </div>
      <p style="font-size: 20px; margin-bottom: 20px;">最终得分: <strong>${this.score}</strong></p>
      <p style="margin-bottom: 15px;">选择你的名字提交成绩:</p>
      <select id="dino-player-select">
        <option value="">请选择</option>
      </select>
      <!-- 修改自定义输入框，限制13个字符 -->
      <div class="custom-name-container">
        <span>或者</span>
        <input type="text" id="dino-custom-name" placeholder="输入自定义名字(最多12个字)" maxlength="13">
      </div>
      <button id="dino-submit-btn" class="control-btn">提交成绩</button>
    `;
    
    // 填充玩家选择器
    populateSelect('dino-player-select');
    
    modal.style.display = 'flex';
    
    // 为关闭按钮添加事件处理
    const closeBtn = modalContent.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        this.reset();
      }, { once: true });
    }
    
    // 提交分数按钮
    const submitBtn = document.getElementById('dino-submit-btn');
    if (submitBtn) {
      submitBtn.onclick = async () => {
        const selectPlayerName = document.getElementById('dino-player-select').value;
        const customPlayerName = document.getElementById('dino-custom-name').value.trim();
        
        // 优先使用自定义名称
        const playerName = customPlayerName || selectPlayerName;
        
        if (playerName) {
          // 验证名称长度
          if (playerName.length > 13) {
            alert("名字最多只能包含13个字符");
            return;
          }
          
          console.log(`提交分数: game=dino, player=${playerName}, score=${this.score}`);
          
          // 禁用按钮，防止重复提交
          submitBtn.disabled = true;
          submitBtn.textContent = '提交中...';
          
          try {
            await submitScore("dino", playerName, this.score);
            
            // 关闭模态框并重置游戏
            console.log("关闭 dino-modal");
            modal.style.display = 'none';
            this.reset();
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
  }
  
  reset() {
    // 重置游戏状态
    this.gameOver = false;
    this.paused = false;
    this.isPlaying = false;
    this.score = 0;
    this.distance = 0;
    // 重置无敌相关状态
    this.isInvincible = false;
    this.invincibleTimer = 0;
    this.fruits = [];
    this.lastFruitTime = 0;
    this.dino.width = this.originalDinoSize.width;
    this.dino.height = this.originalDinoSize.height;
    this.dino.isFlying = false; // 重置飞行状态
    this.dinoPositions = []; // 清空拖影位置
 

    // 清除动画帧
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // 重置恐龙位置 - 修复位置计算
    this.dino.y = this.height - this.groundHeight - this.dino.height;
    this.dino.jumping = false;
    this.dino.jumpVelocity = 0;
    this.dino.crouching = false;
    
    // 清空障碍物
    this.obstacles = [];
    this.lastObstacleTime = 0;
    
    // 更新按钮图标
    const playPauseIcon = document.getElementById('dino-play-pause-icon');
    if (playPauseIcon) playPauseIcon.src = './image/start.svg';
    
    // 绘制重置后的画面
    this.draw();
  }
  
  destroy() {
    // 清理资源
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // 移除事件监听器
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('click', this.documentClickHandler);
    
    const playPauseBtn = document.getElementById('dino-play-pause-btn');
    if (playPauseBtn && this.playPauseBtnHandler) {
      playPauseBtn.removeEventListener('click', this.playPauseBtnHandler);
    }
    
    const leaderboardBtn = document.getElementById('dino-leaderboard-btn');
    if (leaderboardBtn && this.leaderboardClickHandler) {
      leaderboardBtn.removeEventListener('click', this.leaderboardClickHandler);
    }
    
    // 移除可能存在的暂停层
    this.removePauseScreen();
    
    // 重置状态
    this.gameOver = true;
    this.paused = true;
    this.isPlaying = false;
    
    console.log('恐龙游戏资源已清理');
  }
  
  saveGameState() {
    if (this.gameOver || (!this.animationFrameId && !this.paused)) {
      console.log('游戏未在运行中，不保存状态');
      return null;
    }
    
    console.log('保存恐龙游戏状态');
    return {
      score: this.score,
      distance: this.distance,
      speed: this.speed,
      dino: {...this.dino},
      obstacles: JSON.parse(JSON.stringify(this.obstacles)),
      clouds: JSON.parse(JSON.stringify(this.clouds)),
      grounds: JSON.parse(JSON.stringify(this.grounds)),
      isNight: this.isNight,
      nightTimer: this.nightTimer,
      highScore: this.highScore,
      gameInProgress: true
    };
  }
  
  restoreGameState(state) {
    if (!state || !state.gameInProgress) {
      console.log('没有可恢复的游戏状态');
      return false;
    }
    
    console.log('恢复恐龙游戏状态');
    
    this.score = state.score;
    this.distance = state.distance;
    this.speed = state.speed;
    this.dino = {...state.dino};
    this.obstacles = JSON.parse(JSON.stringify(state.obstacles));
    this.clouds = JSON.parse(JSON.stringify(state.clouds));
    this.grounds = JSON.parse(JSON.stringify(state.grounds));
    this.isNight = state.isNight;
    this.nightTimer = state.nightTimer;
    this.highScore = state.highScore || this.highScore;
    this.gameOver = false;
    this.paused = true;
    this.isPlaying = true;
    
    this.scoreElement.textContent = this.score;
    this.highScoreElement.textContent = this.highScore;
    
    // 绘制恢复后的状态
    this.draw();
    this.showPauseScreen();
    
    const playPauseIcon = document.getElementById('dino-play-pause-icon');
    if (playPauseIcon) playPauseIcon.src = './image/start.svg';
    
    console.log('恐龙游戏状态已恢复');
    return true;
  }
  generateFruit() {
    // 创建水果 - 修改高度计算，使水果位置更高
    const fruit = {
      x: this.width,
      // 固定在高处，使玩家需要跳到最高点才能吃到
      y: this.height - this.groundHeight - this.fruitType.height - 300, // 原来是随机0-200，现在固定在300
      width: this.fruitType.width,
      height: this.fruitType.height,
      type: this.fruitType.type
    };
    
    // 确保水果不会与现有障碍物重叠
    let shouldCreate = true;
    for (const obstacle of this.obstacles) {
      if (Math.abs(fruit.x - obstacle.x) < 150) {
        shouldCreate = false;
        break;
      }
    }
    
    if (shouldCreate) {
      this.fruits.push(fruit);
    }
  }

  checkFruitCollisions() {
    const dinoBox = this.getCollisionBox(this.dino);
    
    for (let i = 0; i < this.fruits.length; i++) {
      const fruitBox = {
        x: this.fruits[i].x,
        y: this.fruits[i].y,
        width: this.fruits[i].width,
        height: this.fruits[i].height
      };
      
      if (this.isColliding(dinoBox, fruitBox)) {
        // 恐龙吃到水果，获得无敌状态
        this.isInvincible = true;
        this.invincibleTimer = 0;
        
        // 恐龙变大2倍
        this.dino.width = this.originalDinoSize.width * 2;
        this.dino.height = this.originalDinoSize.height * 2;
        
        // 让恐龙自动飞行起来 - 无需跳跃即可漂浮在空中
        this.dino.y = this.height - this.groundHeight - this.dino.height - 120; // 飞行高度
        this.dino.jumping = false; // 不是跳跃状态
        this.dino.isFlying = true; // 标记为飞行状态
        
        // 移除水果
        this.fruits.splice(i, 1);
        i--;
        
        console.log('吃到苹果！进入无敌状态10秒');
      }
    }
  }
  
  checkCollisions() {
    // 获取恐龙碰撞盒
    const dinoBox = this.getCollisionBox(this.dino);
    
    // 对每个障碍物进行碰撞检测
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      const obstacleBox = this.getCollisionBox(obstacle);
      
      // 如果发生碰撞
      if (this.isColliding(dinoBox, obstacleBox)) {
        if (this.isInvincible) {
          // 无敌状态下，撞飞障碍物
          obstacle.x = -obstacle.width; // 直接移出屏幕
          this.score += 1; // 额外加分
          this.scoreElement.textContent = this.score;
          continue;
        }
        
        // 非无敌状态下，游戏结束
        this.gameOver = true;
        this.isPlaying = false;
        
        // 更新最高分
        if (this.score > this.highScore) {
          this.highScore = this.score;
          this.highScoreElement.textContent = this.highScore;
          localStorage.setItem('dinoHighScore', this.highScore);
        }
        
        // 停止游戏循环
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
        }
        
        // 绘制游戏结束画面
        this.drawGameOver();
        return;
      }
    }
  }
  // 获取角色图片路径的辅助方法
  getCharacterPath(characterId) {
    const character = this.characters.find(char => char.id === characterId);
    return character ? character.path : this.characters[0].path; // 默认返回第一个角色
  }
  // 显示角色选择模态框
  showCharacterSelectionModal() {
    // 如果游戏正在进行中，暂停游戏
    const wasPlaying = this.isPlaying && !this.paused;
    if (wasPlaying) {
      this.togglePause();
    }
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.id = 'dino-character-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';
    
    // 创建模态框内容
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '30px';
    modalContent.style.borderRadius = '15px';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '90%';
    modalContent.style.maxHeight = '80vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.position = 'relative';
    
    // 添加标题
    const title = document.createElement('h2');
    title.textContent = '选择角色';
    title.style.marginBottom = '20px';
    title.style.color = 'rgb(3, 93, 61)';
    
    // 添加关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<img src="./image/x-circle.svg" alt="关闭" style="width: 24px; height: 24px;">';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '12px';
    closeBtn.style.width = '45px';
    closeBtn.style.height = '45px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.display = 'flex';
    closeBtn.style.justifyContent = 'center';
    closeBtn.style.alignItems = 'center';
    
    // 添加角色选择容器
    const charactersContainer = document.createElement('div');
    charactersContainer.style.display = 'grid';
    charactersContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    charactersContainer.style.gap = '20px';
    charactersContainer.style.marginTop = '20px';
    
    // 添加角色选择卡片
    this.characters.forEach(character => {
      const characterCard = document.createElement('div');
      characterCard.style.padding = '15px';
      characterCard.style.border = `2px solid ${this.selectedCharacter === character.id ? '#4CAF50' : '#ddd'}`;
      characterCard.style.borderRadius = '10px';
      characterCard.style.cursor = 'pointer';
      characterCard.style.textAlign = 'center';
      characterCard.style.transition = 'all 0.3s ease';
      
      // 添加角色图像
      const characterImg = document.createElement('img');
      characterImg.src = character.path;
      characterImg.alt = character.name;
      characterImg.style.width = '120px';
      characterImg.style.height = '120px';
      characterImg.style.marginBottom = '10px';
      
      // 添加角色名称
      const characterName = document.createElement('p');
      characterName.textContent = character.name;
      characterName.style.margin = '0';
      characterName.style.fontSize = '16px';
      characterName.style.fontWeight = 'bold';
      
      // 单击卡片选择角色
      characterCard.addEventListener('click', () => {
        // 更新选定的角色
        this.selectedCharacter = character.id;
        localStorage.setItem('dinoCharacter', character.id);
        
        // 更新所有卡片的边框颜色
        const allCards = charactersContainer.querySelectorAll('div');
        allCards.forEach(card => {
          card.style.border = '2px solid #ddd';
        });
        
        // 高亮显示选中的卡片
        characterCard.style.border = '2px solid #4CAF50';
        
        // 重新加载角色图像
        this.loadImages();
      });
      
      // 将元素添加到卡片
      characterCard.appendChild(characterImg);
      characterCard.appendChild(characterName);
      
      // 将卡片添加到容器
      charactersContainer.appendChild(characterCard);
    });
    
    // 添加确认按钮
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = '确认';
    confirmBtn.style.backgroundColor = '#4CAF50';
    confirmBtn.style.color = 'white';
    confirmBtn.style.border = 'none';
    confirmBtn.style.padding = '10px 20px';
    confirmBtn.style.borderRadius = '25px';
    confirmBtn.style.marginTop = '20px';
    confirmBtn.style.cursor = 'pointer';
    confirmBtn.style.fontSize = '16px';
    confirmBtn.style.width = '140px';
    
    // 确认按钮点击事件
    confirmBtn.addEventListener('click', () => {
      // 关闭模态框
      document.body.removeChild(modal);
      
      // 如果之前正在游戏，恢复游戏
      if (wasPlaying) {
        this.togglePause();
      }
    });
    
    // 关闭按钮点击事件
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
      
      // 如果之前正在游戏，恢复游戏
      if (wasPlaying) {
        this.togglePause();
      }
    });
    
    // 将所有元素添加到模态框内容
    modalContent.appendChild(title);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(charactersContainer);
    modalContent.appendChild(confirmBtn);
    
    // 将内容添加到模态框
    modal.appendChild(modalContent);
    
    // 将模态框添加到页面
    document.body.appendChild(modal);
  }
}

// 使游戏全局可访问
window.dinoGame = null;

// DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
  // 创建和初始化游戏的逻辑从script.js移到这里
  const dinoSelectBtn = document.getElementById('dino-select-btn');
  if (dinoSelectBtn) {
    dinoSelectBtn.addEventListener('click', () => {
      console.log('进入恐龙游戏');
      
      // 隐藏其他视图
      document.querySelector('.season-controls').style.display = 'none';
      document.getElementById('games-btn').style.display = 'none';
      document.getElementById('games-selection').style.display = 'none';
      document.getElementById('page-title').style.display = 'none';
      
      // 显示恐龙游戏
      document.getElementById('dino-game').style.display = 'block';
      
      // 确保销毁之前的实例
      if (window.dinoGame) {
        window.dinoGame.destroy();
        window.dinoGame = null;
      }
      
      // 创建新实例
      window.dinoGame = new DinoGame();
      
      // 检查是否有保存的游戏状态
      const savedState = JSON.parse(localStorage.getItem('dinoGameState') || 'null');
      if (savedState && savedState.gameInProgress) {
        if (confirm('是否恢复上次未完成的游戏？')) {
          const restored = window.dinoGame.restoreGameState(savedState);
          if (restored) {
            console.log('成功恢复恐龙游戏状态');
            localStorage.removeItem('dinoGameState');
          } else {
            console.warn('恢复游戏状态失败，开始新游戏');
          }
        } else {
          localStorage.removeItem('dinoGameState');
          console.log('用户选择不恢复游戏，清除保存的状态');
        }
      } else {
        console.log('无保存的游戏状态，准备开始新游戏');
      }
      
      // 自动聚焦到画布
      window.dinoGame.canvas.focus();
    });
  } else {
    console.warn('找不到恐龙游戏选择按钮');
  }
});
