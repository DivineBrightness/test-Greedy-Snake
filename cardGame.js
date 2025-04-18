const dragonGame = {
  // 现有属性保持不变
  isOpen: false,
  deckId: null,
  gamePhase: "idle", // idle, playing, finished
    // 添加无敌模式标志
    godMode: false,
  players: [
    { id: 0, name: "你", isPlayer: true, hand: [], collected: 0, score: 0, isEliminated: false },
    { id: 1, name: "图图", isPlayer: false, hand: [], collected: 0, score: 0, isEliminated: false },
    { id: 2, name: "壮壮", isPlayer: false, hand: [], collected: 0, score: 0, isEliminated: false }
  ],
  activePlayerIndex: 0,
  river: [], // 中间牌河
  playersInGame: 3,
  
  // 添加分数相关属性
  score: 0,
  highScore: 0,
  
  // 初始化方法 - 添加加载高分和排行榜功能
  init: function() {
    // 加载本地存储的高分
    this.highScore = localStorage.getItem('dragonHighScore') || 0;
    
    // 创建游戏界面
    this.createGameInterface();
    
    // 设置事件监听器
    this.setupEventListeners();
    
    // 加载排行榜
    this.loadLeaderboard();
        
    // 设置无敌模式双击监听
    this.setupGodModeListener();
  },
  
  // 创建游戏界面
  createGameInterface: function() {
    // 创建游戏容器
    const gameContainer = document.createElement('div');
    gameContainer.className = 'dragon-game-container';
    gameContainer.id = 'dragon-game-container';
    
  // 添加游戏内容
  gameContainer.innerHTML = `
    <div class="dragon-game-content">
      <div class="dragon-game-header">
        <button class="back-btn" id="dragon-back-btn"></button>
        <h2>翻斗扑克</h2>
        <div class="game-info">
          <div class="game-score">得分: <span id="dragon-score">0</span></div>
          <div class="game-high-score">最高分: <span id="dragon-high-score">${this.highScore}</span></div>
          <div class="dragon-leaderboard">
            <button class="leaderboard-btn" id="dragon-leaderboard-btn">排行榜</button>
            <div class="leaderboard-panel" id="dragon-leaderboard-content" style="display: none;">
              <!-- 排行榜内容将由JavaScript动态生成 -->
            </div>
          </div>
        </div>
      </div>
        
        <div class="dragon-game-body">
          <div class="dragon-table-container">
            <div class="dragon-table">
              <div class="dragon-card-river"></div>
              
              <!-- 玩家位置 -->
              <div class="player-position player-position-0">
                <div class="player-box" id="player-box-0">
                  <div class="player-info">
                    <div class="player-name">你</div>
                    <div class="player-cards-count">手牌: <span>0</span></div>
                    <div class="player-collected">已收集: <span>0</span></div>
                  </div>
                  <div class="player-hand">
                    <div class="hand-container" id="player-hand-0"></div>
                  </div>
                </div>
              </div>
              
              <div class="player-position player-position-1">
                <div class="player-box" id="player-box-1">
                  <div class="player-info">
                    <div class="player-name">图图</div>
                    <div class="player-cards-count">手牌: <span>0</span></div>
                    <div class="player-collected">得分: <span>0</span></div>
                  </div>
                  <div class="player-hand">
                    <div class="hand-container" id="player-hand-1"></div>
                  </div>
                </div>
              </div>
              
              <div class="player-position player-position-2">
                <div class="player-box" id="player-box-2">
                  <div class="player-info">
                    <div class="player-name">壮壮</div>
                    <div class="player-cards-count">手牌: <span>0</span></div>
                    <div class="player-collected">得分: <span>0</span></div>
                  </div>
                  <div class="player-hand">
                    <div class="hand-container" id="player-hand-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="control-panel">
          <div class="dragon-controls">
            <button class="dragon-btn primary" id="dragon-start-btn">开始游戏</button>
            <button class="dragon-btn secondary" id="dragon-reset-btn" disabled>重置</button>
          </div>
        </div>
        
        <div class="game-message" id="dragon-message"></div>
      </div>
    `;
    
    // 添加游戏结束模态框
    const modal = document.createElement('div');
    modal.id = 'dragon-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div>
        <button class="modal-close-btn"><img src="./image/x-circle.svg" alt="关闭" class="close-icon"></button>
        <div class="modal-header">
          <h2 style="color: rgb(3, 93, 61); margin-bottom: 15px; font-size: 24px;">游戏结束!</h2>
        </div>
        <p style="font-size: 20px; margin-bottom: 20px;">最终得分: <strong id="dragon-final-score">0</strong></p>
        <p style="margin-bottom: 15px;">选择你的名字提交成绩:</p>
        <select id="dragon-player-select">
          <option value="">请选择</option>
        </select>
        <div class="custom-name-container">
          <span>或者</span>
          <input type="text" id="dragon-custom-name" placeholder="输入自定义名字" maxlength="20">
        </div>
        <button id="dragon-submit-btn">提交成绩</button>
      </div>
    `;
    
    // 将游戏容器和模态框添加到页面
    document.body.appendChild(gameContainer);
    document.body.appendChild(modal);
  },
  
  // 设置事件监听器
  setupEventListeners: function() {
    // 后退按钮
    const backBtn = document.getElementById('dragon-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.hide();
        if (typeof window.backFromCardGame === 'function') {
          window.backFromCardGame();
        }
      });
    }
    
    // 开始游戏按钮
    const startBtn = document.getElementById('dragon-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.startNewGame();
      });
    }
    
    // 重置按钮
    const resetBtn = document.getElementById('dragon-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetGame();
      });
    }
    
    // ESC键返回
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.hide();
        if (typeof window.backFromCardGame === 'function') {
          window.backFromCardGame();
        }
      }
    });
    
    // 排行榜按钮 - 修复事件绑定
    const leaderboardBtn = document.getElementById('dragon-leaderboard-btn');
    const leaderboardContent = document.getElementById('dragon-leaderboard-content');
    
    if (leaderboardBtn && leaderboardContent) {
      // 使用一个明确的点击处理函数
      leaderboardBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        
        // 切换排行榜面板显示状态
        if (leaderboardContent.style.display === 'block') {
          leaderboardContent.style.display = 'none';
        } else {
          leaderboardContent.style.display = 'block';
          // 加载排行榜数据
          this.loadLeaderboard();
        }
      });
      
      // 点击排行榜外部关闭
      document.addEventListener('click', (e) => {
        if (leaderboardContent.style.display === 'block' && 
            !leaderboardContent.contains(e.target) && 
            e.target !== leaderboardBtn) {
          leaderboardContent.style.display = 'none';
        }
      });
      
      // 确保排行榜关闭按钮也能工作
      const closeBtn = leaderboardContent.querySelector('.leaderboard-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          leaderboardContent.style.display = 'none';
        });
      }
    }
    
    // 游戏结束模态框关闭按钮
    const modalCloseBtn = document.querySelector('#dragon-modal .modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        document.getElementById('dragon-modal').style.display = 'none';
      });
    }
    
    // 提交分数按钮
    const submitBtn = document.getElementById('dragon-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        // 获取玩家名称
        const selectElement = document.getElementById('dragon-player-select');
        const customNameElement = document.getElementById('dragon-custom-name');
        let playerName = customNameElement.value.trim() || selectElement.value;
        
        // 调用简化的提交函数
        this.submitScore(playerName, this.score);
      });
    }
  },
  // 添加无敌模式监听器
  setupGodModeListener: function() {
    const heartContainer = document.getElementById('flying-heart-container');
    if (heartContainer) {
      // 跟踪点击次数和时间
      let clickCount = 0;
      let lastClickTime = 0;
      
      heartContainer.addEventListener('click', () => {
        const currentTime = new Date().getTime();
        
        // 如果是300ms内的两次点击，视为双击
        if (currentTime - lastClickTime < 300) {
          clickCount++;
          
          // 双击激活/关闭无敌模式
          if (clickCount >= 2 && this.gamePhase === "playing") {
            this.toggleGodMode();
            clickCount = 0;
          }
        } else {
          clickCount = 1;
        }
        
        lastClickTime = currentTime;
      });
    }
  },
// 修改toggleGodMode函数使其更明显
toggleGodMode: function() {
  this.godMode = !this.godMode;
  
  // 显示明显的无敌模式状态
  if (this.godMode) {
    // 创建一个固定在屏幕上方的指示器
    const indicator = document.createElement('div');
    indicator.id = 'god-mode-indicator';
    indicator.style.position = 'fixed';
    indicator.style.top = '10px';
    indicator.style.left = '50%';
    indicator.style.transform = 'translateX(-50%)';
    indicator.style.background = 'rgba(143, 218, 239, 0.8)';
    indicator.style.color = 'white';
    indicator.style.padding = '5px 10px';
    indicator.style.borderRadius = '5px';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '10000';
    indicator.style.boxShadow = '0 0 10px gold';
    // indicator.textContent = '🎮 无敌模式已开启';
    document.body.appendChild(indicator);
    
    this.showMessage("🎮 无敌模式已开启! 图图和壮壮变笨了~", 3000);
    
    // 添加视觉效果到AI玩家
    document.querySelectorAll('#player-box-1, #player-box-2').forEach(box => {
      // 添加"变笨了"标记
      const dumbLabel = document.createElement('div');
      dumbLabel.className = 'dumb-label';
      dumbLabel.textContent = '变笨了';
      dumbLabel.style.position = 'absolute';
      dumbLabel.style.top = '5px';
      dumbLabel.style.right = '5px';
      dumbLabel.style.background = 'rgba(137, 228, 146, 0.7)';
      dumbLabel.style.color = 'white';
      dumbLabel.style.padding = '2px 5px';
      dumbLabel.style.borderRadius = '3px';
      dumbLabel.style.fontSize = '12px';
      dumbLabel.style.zIndex = '100';
      box.appendChild(dumbLabel);
    });
  } else {
    // 移除指示器
    const indicator = document.getElementById('god-mode-indicator');
    if (indicator) document.body.removeChild(indicator);
    
    this.showMessage("无敌模式已关闭! 图图和壮壮恢复聪明~", 3000);
    
    // 移除视觉效果
    document.querySelectorAll('#player-box-1, #player-box-2').forEach(box => {
      box.style.boxShadow = "";
      const dumbLabel = box.querySelector('.dumb-label');
      if (dumbLabel) {
        box.removeChild(dumbLabel);
      }
    });
  }
},
  // 修改show函数，添加背景设置
  show: function() {
    const gameContainer = document.getElementById('dragon-game-container');
    if (gameContainer) {
      gameContainer.style.display = 'block';
      this.isOpen = true;
      
      // 加载排行榜
      this.loadLeaderboard();
      
      // 设置随机角色背景
      this.setRandomCharacterBackgrounds();
    }
  },
  
  // 隐藏游戏界面
  hide: function() {
    const gameContainer = document.getElementById('dragon-game-container');
    if (gameContainer) {
      gameContainer.style.display = 'none';
      this.isOpen = false;
    }
  },
  
  // 开始新游戏
  startNewGame: function() {
    // 重置游戏状态
    this.resetGame();
    
    // 更新游戏阶段
    this.gamePhase = "playing";
    
    // 启用/禁用按钮
    document.getElementById('dragon-start-btn').disabled = true;
    document.getElementById('dragon-reset-btn').disabled = false;
    
    // 创建新牌组
    this.createNewDeck();
    
    // 发牌
    this.dealCards();
    
    // 高亮当前玩家
    this.highlightActivePlayer();
    
    // 启用玩家操作
    if (this.activePlayerIndex === 0) {
      this.enablePlayerActions();
    } else {
      this.processAIAction();
    }
  },
  
  // 重置游戏状态
  resetGame: function() {
    // 重置分数
    this.score = 0;
    document.getElementById('dragon-score').textContent = '0';
    
    // 重置玩家状态
    this.players.forEach(player => {
      player.hand = [];
      player.collected = 0;
      player.isEliminated = false;
    });
        // 额外关闭无敌模式
        if (this.godMode) {
          this.toggleGodMode();
        }
    // 清空牌河
    this.river = [];
    
    // 重置玩家数量
    this.playersInGame = 3;
    
    // 重置活动玩家
    this.activePlayerIndex = 0;
    
    // 重置游戏阶段
    this.gamePhase = "idle";
    
    // 更新UI
    this.updateRiver();
    this.players.forEach(player => {
      this.updatePlayerHand(player.id);
      this.updatePlayerInfo();
    });
    this.highlightActivePlayer();
    
    // 禁用玩家操作
    this.disablePlayerActions();
    
    // 启用/禁用按钮
    document.getElementById('dragon-start-btn').disabled = false;
    document.getElementById('dragon-reset-btn').disabled = true;
  },
  
// 修改创建新牌组函数，添加塑料瓶牌和麻袋牌
createNewDeck: function() {
  // 创建标准52张牌
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({
        suit: suit,
        value: value,
        numericValue: this.getCardNumericValue(value)
      });
    }
  }
  
  // 添加大王和小王
  deck.push({
    suit: 'joker',
    value: 'BJ', // 大王
    numericValue: 30
  });
  
  deck.push({
    suit: 'joker',
    value: 'SJ', // 小王
    numericValue: 20
  });
  
  // 添加四张塑料瓶牌
  for (let i = 1; i <= 4; i++) {
    deck.push({
      suit: 'garbage',
      value: `PB${i}`, // 塑料瓶
      displayName: '塑料瓶', // 显示的中文名称
      numericValue: 0
    });
  }
  
  // 添加一张麻袋牌
  deck.push({
    suit: 'garbage',
    value: 'BAG', // 麻袋/垃圾袋
    displayName: '麻袋',
    numericValue: 0
  });
  
  // 洗牌
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
},
  
// 修改获取牌的数值函数，调整垃圾牌的分值
getCardNumericValue: function(value) {
  if (value === 'A') return 1;
  if (value === 'J') return 11;
  if (value === 'Q') return 12;
  if (value === 'K') return 13;
  if (value === 'BJ') return 30; // 大王30分
  if (value === 'SJ') return 20; // 小王20分
  if (value.startsWith('PB') || value === 'BAG') return -10; // 垃圾牌-10分
  return parseInt(value);
},
  
  
  // 发牌
  dealCards: function() {
    const deck = this.createNewDeck();
    
    // 均分牌给所有玩家
    const cardsPerPlayer = Math.floor(deck.length / this.players.length);
    
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].hand = deck.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer);
    }
    
    // 更新玩家手牌显示
    this.players.forEach(player => {
      this.updatePlayerHand(player.id);
    });
    
    // 更新玩家信息
    this.updatePlayerInfo();
  },
  
// 在playerPlayCard函数中添加垃圾回收检测
playerPlayCard: function(cardIndex) {
  if (this.gamePhase !== "playing" || this.activePlayerIndex !== 0) return;
  
  const player = this.players[0];
  if (cardIndex >= player.hand.length) return;
  
  // 从玩家手牌中取出一张牌
  const card = player.hand.splice(cardIndex, 1)[0];
  
  // 添加到牌河
  this.river.push({
    card: card,
    playerId: player.id,
    playerName: player.name // 记录玩家名字，用于后续判断
  });
  
  // 更新牌河显示
  this.updateRiver();
  
  // 更新玩家手牌显示
  this.updatePlayerHand(player.id);
  
  // 如果玩家是牛爷爷且打出的是垃圾袋牌，检查是否触发垃圾回收效果
  if (player.name === "牛爷爷" && card.suit === 'garbage' && card.value === 'BAG') {
    const garbageCheck = this.checkGarbageCollectionCombo();
    if (garbageCheck.triggered) {
      // 触发垃圾回收效果
      this.triggerGarbageCollectionEffect();
      return; // 不再进行其他匹配检测
    }
  }
  
  // 检查是否触发霸王龙小分队效果
  const dinoSquadCheck = this.checkDinoSquadCombo();
  if (dinoSquadCheck.triggered) {
    // 触发霸王龙小分队效果
    this.triggerDinoSquadEffect(dinoSquadCheck.lastPlayerName);
    return; // 不再进行普通匹配检测
  }
  
    // 常规匹配检测代码
    const matchIndex = this.checkMatch(card);
  
    if (matchIndex !== -1) {
      // 修改分数计算，匹配牌不算分
      const collectedCards = this.river.slice(matchIndex);
      const cardsCount = collectedCards.length;
      
      // 计算除匹配牌外的其他牌的点数总和
      let totalCardPoints = 0;
      for (let i = 0; i < collectedCards.length; i++) {
        // 跳过匹配牌(第一张)和最后打出的牌
        if (i !== 0 && i !== collectedCards.length - 1) {
          totalCardPoints += collectedCards[i].card.numericValue;
        }
      }
      
      // 总分 = 收集的牌数 + 中间牌的点数总和
      const totalScore = cardsCount + totalCardPoints;
      
      this.collectCards(player.id, matchIndex);
      this.addScore(totalScore);
      
      // 显示更详细的分数信息
      if (totalCardPoints < 0) {
        this.showMessage(`匹配成功! 收集${cardsCount}张牌，但有垃圾牌 ${totalCardPoints}分，总得分：${totalScore}分`, 2500);
      } else {
        this.showMessage(`匹配成功! 收集${cardsCount}张牌，中间牌得分：${totalCardPoints}，总得分：${totalScore}分`, 2500);
      }
    } else {
      // 没有匹配，轮到下一个玩家
      this.nextPlayer();
    }
    
    // 检查游戏是否结束
    this.checkGameOver();
  },
  
// 修改AI出牌函数中的分数计算逻辑
aiPlayCard: function(aiPlayer) {
  if (this.gamePhase !== "playing") return;
  
  // 简单AI策略：随机出牌
  const cardIndex = Math.floor(Math.random() * aiPlayer.hand.length);
  const card = aiPlayer.hand.splice(cardIndex, 1)[0];
  
  // 添加到牌河并记录玩家名字
  this.river.push({
    card: card,
    playerId: aiPlayer.id,
    playerName: aiPlayer.name // 记录玩家名字
  });
  
  // 更新牌河显示
  this.updateRiver();
  
  // 更新AI手牌显示
  this.updatePlayerHand(aiPlayer.id);
  
  // 检查是否触发霸王龙小分队效果
  const dinoSquadCheck = this.checkDinoSquadCombo();
  if (dinoSquadCheck.triggered) {
    // 触发霸王龙小分队效果
    this.triggerDinoSquadEffect(dinoSquadCheck.lastPlayerName);
    return; // 不再进行普通匹配检测
  }
  
  // 原有的AI出牌逻辑
  let matchIndex = this.checkMatch(card);
  
  // 在无敌模式下的逻辑
  if (this.godMode && matchIndex !== -1 && Math.random() < 0.3) {
    matchIndex = -1;
    this.showMessage(`${aiPlayer.name} 没看到匹配机会，错过了得分!`, 1500);
  }
  
  // 后续原有的匹配和计分逻辑
  if (matchIndex !== -1) {
    // 修改分数计算，匹配牌不算分
    const collectedCards = this.river.slice(matchIndex);
    const cardsCount = collectedCards.length;
    
    // 计算除匹配牌外的其他牌的点数总和
    let totalCardPoints = 0;
    for (let i = 0; i < collectedCards.length; i++) {
      // 跳过匹配牌(第一张)和最后打出的牌
      if (i !== 0 && i !== collectedCards.length - 1) {
        totalCardPoints += collectedCards[i].card.numericValue;
      }
    }
    
    // 总分 = 收集的牌数 + 中间牌的点数总和
    const totalScore = cardsCount + totalCardPoints;
    
    aiPlayer.score += totalScore;
    this.collectCards(aiPlayer.id, matchIndex);
    
    // 显示更详细的分数信息
    if (totalCardPoints < 0) {
      this.showMessage(`${aiPlayer.name} 匹配成功! 收集${cardsCount}张牌，但有垃圾牌 ${totalCardPoints}分，总得分：${totalScore}分`, 2500);
    } else {
      this.showMessage(`${aiPlayer.name} 匹配成功! 收集${cardsCount}张牌，中间牌得分：${totalCardPoints}，总得分：${totalScore}分`, 2500);
    }
  } else {
    this.nextPlayer();
  }
  
  this.checkGameOver();
},
    
  // 处理AI行动
  processAIAction: function() {
    if (this.gamePhase !== "playing") return;
    
    const aiPlayer = this.players[this.activePlayerIndex];
    
    // 添加延迟，使AI行动更自然
    setTimeout(() => {
      this.aiPlayCard(aiPlayer);
    }, 1000);
  },
  
  // 轮到下一个玩家
  nextPlayer: function() {
    if (this.gamePhase !== "playing") return;
    
    do {
      this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    } while (this.players[this.activePlayerIndex].isEliminated);
    
    // 高亮当前玩家
    this.highlightActivePlayer();
    
    // 如果是玩家，启用操作；如果是AI，处理AI行动
    if (this.activePlayerIndex === 0) {
      this.enablePlayerActions();
    } else {
      this.processAIAction();
    }
  },
  
// 修改检查匹配的函数，调整垃圾牌特殊处理规则
checkMatch: function(playedCard) {
  if (this.river.length <= 1) return -1;
  
  // 如果当前打出的是塑料瓶牌，无论谁出都不匹配
  if (playedCard.suit === 'garbage' && playedCard.value.startsWith('PB')) {
    return -1; // 塑料瓶牌不能匹配任何牌
  }
  
  // 如果当前打出的是麻袋牌
  if (playedCard.suit === 'garbage' && playedCard.value === 'BAG') {
    // 只有牛爷爷可以用麻袋牌匹配塑料瓶
    if (this.players[this.activePlayerIndex].name === "牛爷爷") {
      // 检查牌河中是否有塑料瓶牌
      for (let i = 0; i < this.river.length - 1; i++) {
        if (this.river[i].card.suit === 'garbage' && 
            this.river[i].card.value.startsWith('PB')) {
          return i; // 麻袋可以匹配塑料瓶
        }
      }
    }
    // 其他玩家的麻袋牌或者没找到塑料瓶，不能匹配
    return -1;
  }
  
  // 普通牌的匹配逻辑不变
  for (let i = 0; i < this.river.length - 1; i++) {
    // 如果是垃圾牌，则跳过不匹配
    if (this.river[i].card.suit === 'garbage') {
      continue;
    }
    
    // 常规匹配检查
    if (this.river[i].card.numericValue === playedCard.numericValue) {
      return i;
    }
  }
  
  return -1;
},
  
// 收集牌
collectCards: function(playerIndex, matchIndex) {
  const player = this.players.find(p => p.id === playerIndex);
  if (!player) return;
  
  // 计算收集范围：从匹配牌到最后一张牌
  const collectedCount = this.river.length - matchIndex;
  
  // 只收集匹配牌到最后一张牌
  const collectedCards = this.river.splice(matchIndex, collectedCount);
  
  // 增加玩家收集的牌数
  player.collected += collectedCards.length;
  
  // 检查是否触发特殊效果：连续收集10张以上的牌
  if (collectedCount >= 10) {
    this.triggerSpecialReward(player);
  }
  
  // 更新玩家信息
  this.updatePlayerInfo();
  
  // 更新牌河显示
  this.updateRiver();
  
  // 播放收集动画
  this.showAnimation('collect', collectedCards);
  
  // 显示匹配消息
  this.showMessage(`${player.name} 匹配成功，收集了 ${collectedCards.length} 张牌!`, 2000);
  
  // 轮到该玩家继续行动
  this.activePlayerIndex = playerIndex;
  this.highlightActivePlayer();
  
  // 如果是玩家，启用操作；如果是AI，处理AI行动
  if (this.activePlayerIndex === 0) {
    this.enablePlayerActions();
  } else {
    this.processAIAction();
  }
},
// 修改triggerSpecialReward函数，添加飞牌动画
triggerSpecialReward: function(player) {
  // 创建两张红心K
  const heartK1 = {
    suit: 'hearts',
    value: 'K',
    numericValue: 13
  };
  
  const heartK2 = {
    suit: 'hearts',
    value: 'K',
    numericValue: 13
  };
  
  // 显示特殊奖励消息
  let message = player.isPlayer ? 
    "超强连击！连续收集10张以上的牌，奖励两张红心K！" :
    `${player.name} 连续收集10张以上的牌，获得了两张红心K！`;
  
  this.showMessage(message, 3000);
  
  // 播放特效动画 - 两张K飞向玩家
  this.showFlyingCardEffect(player.id, [heartK1, heartK2]);
  
  // 添加到玩家手牌 (延迟添加，等动画播放完)
  setTimeout(() => {
    player.hand.push(heartK1, heartK2);
    // 更新玩家手牌显示
    this.updatePlayerHand(player.id);
  }, 3000);
},

// 新增函数：显示飞行牌特效
showFlyingCardEffect: function(playerId, cards) {
  const playerBox = document.getElementById(`player-box-${playerId}`);
  const handElement = document.getElementById(`player-hand-${playerId}`);
  if (!playerBox || !handElement) return;
  
  // 添加CSS动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes flyingCard {
      0% {
        transform: translate(-50%, -50%) scale(1.5) rotate(0deg);
        opacity: 0;
        top: 50%;
        left: 50%;
      }
      20% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.5) rotate(5deg);
        top: 50%;
        left: 50%;
      }
      100% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
        top: ${handElement.offsetTop + 20}px;
        left: ${handElement.offsetLeft + handElement.offsetWidth/2}px;
      }
    }
    
    .flying-card {
      position: fixed;
      z-index: 9999;
      box-shadow: 0 0 20px gold, 0 0 40px gold;
      animation: flyingCard 2s ease-in-out forwards;
    }
    
    .flying-card:nth-child(2) {
      animation-delay: 0.3s;
    }
  `;
  document.head.appendChild(style);
  
  // 创建动画容器
  const animContainer = document.createElement('div');
  animContainer.className = 'flying-card-container';
  animContainer.style.position = 'absolute';
  animContainer.style.top = '0';
  animContainer.style.left = '0';
  animContainer.style.width = '100%';
  animContainer.style.height = '100%';
  animContainer.style.pointerEvents = 'none';
  animContainer.style.zIndex = '10000';
  document.body.appendChild(animContainer);
  
  // 为每张牌创建飞行动画元素
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${card.suit} flying-card`;
    
    // 添加牌面内容
    cardElement.innerHTML = `
      <div class="card-value">${card.value}</div>
      <div class="card-suit"></div>
      <div class="card-value-bottom">${card.value}</div>
    `;
    
    // 设置初始位置和延迟
    cardElement.style.animationDelay = `${index * 0.3}s`;
    
    // 添加到动画容器
    animContainer.appendChild(cardElement);
    
    // 播放音效（如果有）
    if (typeof playSound === 'function') {
      setTimeout(() => playSound('card_flip'), index * 300);
    }
  });
  
  // 移除动画元素
  setTimeout(() => {
    if (document.body.contains(animContainer)) {
      document.body.removeChild(animContainer);
    }
  }, 4000);
  
  // 为玩家区域添加金色闪烁效果
  playerBox.style.boxShadow = '0 0 20px gold';
  setTimeout(() => {
    playerBox.style.boxShadow = '';
  }, 4000);
},  

// 修改检查游戏是否结束的函数
checkGameOver: function() {
  // 记录是否有新的玩家出局
  let newEliminationOccurred = false;
  let eliminatedPlayerId = -1;
  
  // 检查是否有玩家没有牌了
  for (let i = 0; i < this.players.length; i++) {
    if (this.players[i].hand.length === 0 && !this.players[i].isEliminated) {
      // 检查是否是第一个出局的玩家
      const isFirstToEliminate = this.players.every(p => p.id === this.players[i].id || !p.isEliminated);
      
      // 标记玩家为已出局
      this.players[i].isEliminated = true;
      this.playersInGame--;
      eliminatedPlayerId = this.players[i].id;
      newEliminationOccurred = true;
      
      // 更新玩家UI
      const playerBox = document.getElementById(`player-box-${this.players[i].id}`);
      if (playerBox) {
        playerBox.classList.add('eliminated');
      }
      
      // 显示出局消息
      this.showMessage(`${this.players[i].name} 率先出完牌!`, 2000);
      
      // 如果是玩家(id为0)且是第一个出局的，给予额外奖励
      if (this.players[i].id === 0 && isFirstToEliminate) {
        // 玩家是最快出完牌的，奖励10分
        this.addScore(10);
        this.showMessage(`恭喜! 你最快出完牌，奖励10分!`, 2500);
      }
    }
  }
  
  // 如果当前玩家出局了，需要调整activePlayerIndex
  if (newEliminationOccurred && this.activePlayerIndex === eliminatedPlayerId) {
    // 轮到下一个未出局的玩家
    this.nextPlayer();
  }
  
  // 判断游戏是否结束的条件修改为：
  // 1. 所有AI玩家都出局了，或者
  // 2. 玩家出局且至少一个AI玩家出局，或者
  // 3. 所有玩家都出局了
  
  const humanPlayer = this.players[0];
  const aiPlayers = this.players.filter(p => !p.isPlayer);
  const allAIEliminated = aiPlayers.every(p => p.isEliminated);
  const humanEliminated = humanPlayer.isEliminated;
  const anyAIEliminated = aiPlayers.some(p => p.isEliminated);
  
  if (allAIEliminated || (humanEliminated && anyAIEliminated) || this.playersInGame === 0) {
    this.gamePhase = "finished";
    
    // 找出胜利者
    const winner = this.determineWinner();
    
    // 显示游戏结束消息
    this.showMessage(`游戏结束! ${winner.name} 获胜!`, 3000);
    
    // 如果玩家获胜，增加奖励分数
    if (winner.isPlayer) {
      // 增加胜利奖励
      this.addScore(50);
      // 添加一个明确的消息提示玩家获得了额外奖励
      this.showMessage(`恭喜！你获胜了，获得额外奖励50分！`, 3500);
    }
    
    // 显示游戏结束模态框，让玩家提交成绩
    this.showGameOverModal();
    
    // 启用/禁用按钮
    document.getElementById('dragon-start-btn').disabled = false;
    document.getElementById('dragon-reset-btn').disabled = false;
  }
},
  
  // 确定胜利者
  determineWinner: function() {
    // 找出未出局的玩家
    const remainingPlayers = this.players.filter(p => !p.isEliminated);
    
    // 如果只剩下一个玩家，先比较得分
    if (remainingPlayers.length === 1) {
      const humanPlayer = this.players[0];
      // 如果是人类玩家
      if (remainingPlayers[0].isPlayer) {
        return remainingPlayers[0];
      }
      // 如果是AI玩家，但人类得分更高
      else if (this.score > remainingPlayers[0].score) {
        return humanPlayer;
      }
      // 否则AI玩家胜利
      return remainingPlayers[0];
    }
    
    // 如果都出局了，比较得分
    // 对于人类玩家，使用游戏总分；对于AI玩家，使用其score属性
    let highestScore = -1;
    let winner = null;
    
    for (const player of this.players) {
      const playerScore = player.isPlayer ? this.score : player.score;
      if (playerScore > highestScore) {
        highestScore = playerScore;
        winner = player;
      }
    }
    
    return winner;
  },
  
  // 增加分数
  addScore: function(points) {
    this.score += points;
    document.getElementById('dragon-score').textContent = this.score;
    
    // 更新最高分
    if (this.score > this.highScore) {
      this.highScore = this.score;
      document.getElementById('dragon-high-score').textContent = this.highScore;
      localStorage.setItem('dragonHighScore', this.highScore);
    }
  },
  
  // 显示游戏结束模态框
  showGameOverModal: function() {
    const modal = document.getElementById('dragon-modal');
    if (!modal) return;
    
    // 设置最终分数
    document.getElementById('dragon-final-score').textContent = this.score;
    
    // 填充玩家选择器
    this.populatePlayerSelect();
    
    // 显示模态框
    modal.style.display = 'flex';
  },
  
// 使用scenes.js中的通用populateSelect函数
populatePlayerSelect: function() {
  // 如果scenes.js中的通用函数可用，则直接调用
  if (typeof window.populateSelect === 'function') {
    window.populateSelect('dragon-player-select');
  } else {
    // 否则使用上面的备用实现
    const playerSelect = document.getElementById('dragon-player-select');
    if (!playerSelect) return;
    
    // 清空现有选项
    playerSelect.innerHTML = '<option value="">请选择</option>';
    
    // 使用scenes.js中的预设角色列表
    const tianGangCharacters = [
      // 角色列表同上
    ];
    
    tianGangCharacters.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      playerSelect.appendChild(option);
    });
  }
},
  
// 简化的提交分数函数 - 参考恐龙游戏的实现
submitScore: async function(playerName, score) {
  const submitBtn = document.getElementById('dragon-submit-btn');
  if (!submitBtn) return;
  
  // 输入验证
  if (!playerName) {
    alert("请选择或输入一个名字");
    return;
  }
  
  // 禁用按钮，防止重复提交
  submitBtn.disabled = true;
  submitBtn.textContent = '提交中...';
  
  try {
    // 直接使用window.submitScore函数
    await window.submitScore('dragon', playerName, score);
    
    // 重新加载排行榜 (不包含任何状态消息创建)
    if (typeof window.loadLeaderboard === 'function') {
      window.loadLeaderboard('dragon', 'dragon-leaderboard-content');
    }
    
    // 简单提示并关闭模态框
    alert("提交成功！");
    document.getElementById('dragon-modal').style.display = 'none';
  } catch (error) {
    console.error('提交分数失败:', error);
    alert('提交失败，请重试');
  } finally {
    // 无论成功失败都恢复按钮状态
    submitBtn.disabled = false;
    submitBtn.textContent = '提交成绩';
  }
},
  
  // 加载排行榜
  loadLeaderboard: function() {
    const leaderboardContent = document.getElementById('dragon-leaderboard-content');
    if (!leaderboardContent) return;
    
    // 使用leaderboard.js中的loadLeaderboard函数
    if (typeof window.loadLeaderboard === 'function') {
      window.loadLeaderboard('dragon', 'dragon-leaderboard-content');
    } else {
      // 如果loadLeaderboard函数不存在，显示错误信息
      leaderboardContent.innerHTML = `
        <div class="leaderboard-header">
          <h3>翻斗扑克 - 排行榜</h3>
          <button class="leaderboard-close-btn">&times;</button>
        </div>
        <div class="leaderboard-table">
          <div class="leaderboard-row header">
            <div class="rank">排名</div>
            <div class="player">玩家</div>
            <div class="score">分数</div>
            <div class="date">日期</div>
          </div>
          <div class="leaderboard-body">
            <div class="error">排行榜功能不可用</div>
          </div>
        </div>
      `;
      
      // 添加关闭按钮事件
      const closeBtn = leaderboardContent.querySelector('.leaderboard-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          leaderboardContent.style.display = 'none';
        });
      }
    }
  },
  
  updateRiver: function() {
    const riverElement = document.querySelector('.dragon-card-river');
    if (!riverElement) return;
    
    riverElement.innerHTML = '';
    
    // 显示牌河中的牌 - 最多显示最新的12张牌
    const visibleCards = this.river.slice(-12);
    
    visibleCards.forEach((item, index) => {
      const cardElement = document.createElement('div');
      
      // 为大王小王添加特殊样式
      if (item.card.suit === 'joker') {
        cardElement.className = `card joker ${item.card.value === 'BJ' ? 'big-joker' : 'small-joker'}`;
        // 添加自定义样式
        if (item.card.value === 'BJ') {
          cardElement.style.backgroundColor = '#f8d8e0'; // 大王背景色
          cardElement.style.color = '#e91e63';
        } else {
          cardElement.style.backgroundColor = '#d8e8f8'; // 小王背景色
          cardElement.style.color = '#2196f3';
        }
      } else {
        cardElement.className = `card ${item.card.suit}`;
      }
      
      // 添加牌面内容
      if (item.card.suit === 'joker') {
        cardElement.innerHTML = `
          <div class="card-value">${item.card.value === 'BJ' ? '大王' : '小王'}</div>
          //
        `;
      } else if (item.card.suit === 'garbage') {
        cardElement.innerHTML = `
          <div class="card-value">${item.card.value.startsWith('PB') ? '塑料瓶' : '麻袋'}</div>
          <div class="card-value-bottom">-10</div>
        `;
        
        // 为垃圾牌添加特殊样式
        if (item.card.value === 'BAG') {
          cardElement.style.backgroundColor = '#a5d6a7'; // 麻袋背景色
          cardElement.style.color = '#2e7d32';
        } else {
          cardElement.style.backgroundColor = '#90caf9'; // 塑料瓶背景色
          cardElement.style.color = '#1565c0';
        }
      } else {
        cardElement.innerHTML = `
          <div class="card-value">${item.card.value}</div>
          <div class="card-suit"></div>
          <div class="card-value-bottom">${item.card.value}</div>
        `;
      }
      
      // 为超出预设位置的牌设置自定义属性
      if (index >= 7) {
        const extraIndex = index - 7;
        cardElement.style.setProperty('--rot', `${(extraIndex * 2)}deg`);
        cardElement.style.setProperty('--x', `${extraIndex * 5}px`);
        cardElement.style.setProperty('--z', extraIndex);
      }
      
      // 添加到牌河
      riverElement.appendChild(cardElement);
    });
    
    // 如果牌河中有很多牌，添加牌数指示器
    if (this.river.length > 12) {
      const countIndicator = document.createElement('div');
      countIndicator.className = 'river-count';
      countIndicator.textContent = `共 ${this.river.length} 张牌`;
      countIndicator.style.position = 'absolute';
      countIndicator.style.top = '5px';
      countIndicator.style.right = '5px';
      countIndicator.style.background = 'rgba(0,0,0,0.6)';
      countIndicator.style.color = 'white';
      countIndicator.style.padding = '2px 8px';
      countIndicator.style.borderRadius = '10px';
      countIndicator.style.fontSize = '12px';
      countIndicator.style.zIndex = '100';
      riverElement.appendChild(countIndicator);
    }
  },
  
  // 在updatePlayerHand方法中修改，确保大王和小王正确显示
  updatePlayerHand: function(playerId) {
    const player = this.players.find(p => p.id === playerId);
    if (!player) return;
    
    const handElement = document.getElementById(`player-hand-${playerId}`);
    if (!handElement) return;
    
    handElement.innerHTML = '';
    
    if (player.isPlayer) {
      // 如果是玩家自己，显示详细的牌面，采用直线排列
      player.hand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        
        // 为大王小王添加特殊样式
        if (card.suit === 'joker') {
          cardElement.className = `card joker ${card.value === 'BJ' ? 'big-joker' : 'small-joker'}`;
          // 添加自定义样式
          if (card.value === 'BJ') {
            cardElement.style.backgroundColor = '#f8d8e0'; // 大王背景色
            cardElement.style.color = '#e91e63';
          } else {
            cardElement.style.backgroundColor = '#d8e8f8'; // 小王背景色
            cardElement.style.color = '#2196f3';
          }
        } else {
          cardElement.className = `card ${card.suit}`;
        }
        
        // 添加牌面内容
        if (card.suit === 'joker') {
          cardElement.innerHTML = `
            <div class="card-value">${card.value === 'BJ' ? '大王' : '小王'}</div>
            // 
          `;
        }else if (card.suit === 'garbage') {
          cardElement.innerHTML = `
            <div class="card-value">${card.value.startsWith('PB') ? '塑料瓶' : '麻袋'}</div>
            <div class="card-value-bottom">-10</div>
          `;
          
          // 为垃圾牌添加特殊样式
          if (card.value === 'BAG') {
            cardElement.style.backgroundColor = '#a5d6a7'; // 麻袋背景色
            cardElement.style.color = '#2e7d32';
          } else {
            cardElement.style.backgroundColor = '#90caf9'; // 塑料瓶背景色
            cardElement.style.color = '#1565c0';
          }
        } else {
          cardElement.innerHTML = `
            <div class="card-value">${card.value}</div>
            <div class="card-suit"></div>
            <div class="card-value-bottom">${card.value}</div>
          `;
        }
        
        // 添加点击事件
        cardElement.addEventListener('click', () => {
          this.playerPlayCard(index);
        });
        
        // 添加到手牌区域
        handElement.appendChild(cardElement);
        
        // 设置层叠顺序，确保从左到右正确显示
        cardElement.style.zIndex = index + 1;
      });
    } else {
      // AI玩家展示代码保持不变
      if (player.hand.length > 0) {
        // 创建卡牌堆容器
        const cardStackElement = document.createElement('div');
        cardStackElement.className = 'card-stack';
        
        // 添加底层卡牌指示器
        const stackIndicator = document.createElement('div');
        stackIndicator.className = 'stack-indicator';
        cardStackElement.appendChild(stackIndicator);
        
        // 添加主卡牌背面
        const cardElement = document.createElement('div');
        cardElement.className = 'card back';
        cardStackElement.appendChild(cardElement);
        
        // 添加卡牌数量指示器
        if (player.hand.length > 1) {
          const countIndicator = document.createElement('div');
          countIndicator.className = 'cards-count-indicator';
          countIndicator.textContent = player.hand.length;
          cardStackElement.appendChild(countIndicator);
        }
        
        // 添加到手牌区域
        handElement.appendChild(cardStackElement);
      } else {
        // 没有牌时显示空状态
        const emptyElement = document.createElement('div');
        emptyElement.className = 'empty-hand';
        emptyElement.textContent = '无牌';
        emptyElement.style.color = '#999';
        emptyElement.style.fontSize = '12px';
        handElement.appendChild(emptyElement);
      }
    }
  },

  // 添加 updatePlayerInfo 函数，它在代码中被调用但未定义
  updatePlayerInfo: function() {
    this.players.forEach(player => {
      const playerBox = document.getElementById(`player-box-${player.id}`);
      if (!playerBox) return;
      
      // 更新手牌数
      const cardsCountElement = playerBox.querySelector('.player-cards-count span');
      if (cardsCountElement) {
        cardsCountElement.textContent = player.hand.length;
      }
      
      // 更新收集数/得分 - 为AI玩家显示得分，为人类玩家显示收集数
      const collectedElement = playerBox.querySelector('.player-collected span');
      if (collectedElement) {
        if (player.isPlayer) {
          // 人类玩家显示收集数
          collectedElement.textContent = player.collected;
        } else {
          // AI玩家显示得分
          collectedElement.textContent = player.score;
        }
      }
      
      // 更新已出局状态
      if (player.isEliminated) {
        playerBox.classList.add('eliminated');
      } else {
        playerBox.classList.remove('eliminated');
      }
    });
  },
  
  highlightActivePlayer: function() {
    // 移除所有高亮
    this.players.forEach(player => {
      const playerBox = document.getElementById(`player-box-${player.id}`);
      if (playerBox) {
        playerBox.classList.remove('active');
      }
    });
    
    // 高亮当前玩家
    const activePlayerBox = document.getElementById(`player-box-${this.activePlayerIndex}`);
    if (activePlayerBox) {
      activePlayerBox.classList.add('active');
    }
  },
  
  enablePlayerActions: function() {
    // 只有轮到玩家时才启用操作
    if (this.activePlayerIndex === 0 && this.gamePhase === "playing") {
      const playerHandElement = document.getElementById('player-hand-0');
      if (playerHandElement) {
        const cards = playerHandElement.querySelectorAll('.card');
        cards.forEach(card => {
          card.style.cursor = 'pointer';
          card.classList.add('enabled');
        });
      }
    }
  },
  
  disablePlayerActions: function() {
    const playerHandElement = document.getElementById('player-hand-0');
    if (playerHandElement) {
      const cards = playerHandElement.querySelectorAll('.card');
      cards.forEach(card => {
        card.style.cursor = 'default';
        card.classList.remove('enabled');
      });
    }
  },
  
  showMessage: function(message, duration = 2000) {
    const messageElement = document.getElementById('dragon-message');
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.classList.add('show');
    
    // 设置定时器，自动隐藏消息
    setTimeout(() => {
      messageElement.classList.remove('show');
    }, duration);
  },
  
// 修复动画函数，确保只对被收集的牌应用动画效果
showAnimation: function(type, collectedCards) {
  if (type === 'collect') {
    // 获取被收集牌的唯一标识
    const collectedIdentifiers = collectedCards.map(item => 
      `${item.card.suit}-${item.card.value}`
    );
    
    // 收集牌的动画效果
    const riverElement = document.querySelector('.dragon-card-river');
    if (!riverElement) return;
    
    // 记录当前牌河中的牌
    const cardElements = Array.from(riverElement.querySelectorAll('.card'));
    if (!cardElements.length) return;
    
    // 立即先更新一次牌河，确保剩余的牌显示正确
    this.updateRiver();
    
    // 设置一个标志，表示动画已经完成
    let animationCompleted = false;
    
    // 设置一个定时器，确保无论动画如何，最终都会更新牌河
    setTimeout(() => {
      if (!animationCompleted) {
        this.updateRiver();
        animationCompleted = true;
      }
    }, 800);
    
    // 双重确保牌河显示正确
    requestAnimationFrame(() => {
      this.updateRiver();
    });
  }
},

// 修改setRandomCharacterBackgrounds函数，调整玩家0框内只显示名字
setRandomCharacterBackgrounds: function() {
  // 定义可用的角色背景图片列表
  const characterImages = [
    './image/poke/character/牛爷爷.webp',
    './image/poke/character/刷子.jpg'
    // 可以根据实际情况添加更多角色图片
  ];
  
  // 如果没有可用的图片，直接返回
  if (characterImages.length === 0) {
    console.log('没有可用的角色图片');
    return;
  }
  
  // 尝试预加载图片，如果失败使用备用方案
  try {
    // 为主玩家随机选择一张图片
    const randomIndex = Math.floor(Math.random() * characterImages.length);
    const randomPlayerImage = characterImages[randomIndex];
    
    // 从文件路径中提取角色名称（不含扩展名）
    const characterName = randomPlayerImage.split('/').pop().split('.')[0];
    
    // 更新玩家名称
    this.players[0].name = characterName;
    
    // 获取主玩家框元素
    const playerBox = document.getElementById('player-box-0');
    if (playerBox) {
      // 更新显示的名称
      const playerNameElement = playerBox.querySelector('.player-name');
      if (playerNameElement) {
        playerNameElement.textContent = characterName;
      }
      
      // 设置背景图片
      playerBox.style.backgroundImage = `url('${randomPlayerImage}')`;
      playerBox.style.backgroundSize = 'cover';
      playerBox.style.backgroundPosition = 'center';
      playerBox.style.position = 'relative';
      
      // 检查并添加半透明覆盖层
      let overlay = playerBox.querySelector('.player-box-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'player-box-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '20%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // 半透明黑色覆盖
        overlay.style.borderRadius = '10px';
        overlay.style.zIndex = '1';
        playerBox.prepend(overlay);
      }
      
      // 获取玩家信息元素
      const playerInfo = playerBox.querySelector('.player-info');
      if (playerInfo) {
        // 隐藏手牌和已收集的信息文本，只保留数字
        const cardsCount = playerInfo.querySelector('.player-cards-count');
        const collected = playerInfo.querySelector('.player-collected');
        
        if (cardsCount) {
          // 获取手牌数值并调整样式
          const cardsCountValue = cardsCount.querySelector('span');
          cardsCount.innerHTML = '';
          if (cardsCountValue) {
            cardsCount.appendChild(cardsCountValue);
            cardsCount.style.position = 'absolute';
            cardsCount.style.right = '10px';
            cardsCount.style.top = '5px';
            cardsCount.style.background = 'rgba(255,255,255,0.7)';
            cardsCount.style.borderRadius = '50%';
            cardsCount.style.width = '24px';
            cardsCount.style.height = '24px';
            cardsCount.style.display = 'flex';
            cardsCount.style.justifyContent = 'center';
            cardsCount.style.alignItems = 'center';
            cardsCount.style.fontSize = '14px';
            cardsCount.style.fontWeight = 'bold';
          }
        }
        
        if (collected) {
          // 获取已收集数值并调整样式
          const collectedValue = collected.querySelector('span');
          collected.innerHTML = '';
          if (collectedValue) {
            collected.appendChild(collectedValue);
            collected.style.position = 'absolute';
            collected.style.right = '10px';
            collected.style.top = '35px';
            collected.style.background = 'rgba(255,220,100,0.7)';
            collected.style.borderRadius = '50%';
            collected.style.width = '24px';
            collected.style.height = '24px';
            collected.style.display = 'flex';
            collected.style.justifyContent = 'center';
            collected.style.alignItems = 'center';
            collected.style.fontSize = '14px';
            collected.style.fontWeight = 'bold';
          }
        }
        
        // 调整玩家名称样式
        const playerName = playerInfo.querySelector('.player-name');
        if (playerName) {
          playerName.style.fontSize = '18px';
          playerName.style.fontWeight = 'bold';
          playerName.style.textShadow = '1px 1px 3px rgba(0,0,0,0.7)';
          playerName.style.color = 'white';
          playerName.style.position = 'relative';
          playerName.style.zIndex = '2';
        }
      }
      
      // 确保手牌区域正确显示
      const playerHand = playerBox.querySelector('.player-hand');
      if (playerHand) {
        playerHand.style.position = 'relative';
        playerHand.style.zIndex = '2';
        playerHand.style.marginTop = '10px';
      }
    }
  } catch (error) {
    console.error('设置角色背景出错:', error);
  }
},
// 添加霸王龙小分队检查函数 - 基于名字检查
checkDinoSquadCombo: function() {
  // 查找场上是否有刷子和图图出的王牌
  let shuaziJoker = null; // 刷子出的王牌
  let tutuJoker = null;   // 图图出的王牌
  
  // 检查牌河中的所有牌
  for (let i = 0; i < this.river.length; i++) {
    const item = this.river[i];
    
    // 检查是否是王牌（大王或小王）
    if (item.card.suit === 'joker') {
      // 根据玩家名字判断
      if (item.playerName === "刷子") {
        shuaziJoker = { index: i, item: item };
      } else if (item.playerName === "图图") {
        tutuJoker = { index: i, item: item };
      }
    }
  }
  
  // 如果同时找到刷子和图图出的王牌
  if (shuaziJoker && tutuJoker) {
    console.log("检测到霸王龙小分队条件满足!");
    
    // 确定谁后出的王牌
    const lastPlayerName = (shuaziJoker.index > tutuJoker.index) ? "刷子" : "图图";
    
    return {
      triggered: true,
      lastPlayerName: lastPlayerName,
      shuaziJoker: shuaziJoker,
      tutuJoker: tutuJoker
    };
  }
  
  return { triggered: false };
},

// 修改霸王龙小分队效果函数，添加清晰的总分提示
triggerDinoSquadEffect: function(playerName) {
  // 显示霸王龙小分队图片
  this.showDinoSquadImage();
  
  // 记录原始分数，用于计算增量
  const initialScore = this.score;
  
  // 收集所有牌给该玩家
  const collectedCards = [...this.river];
  const collectedCount = collectedCards.length;
  
  // 给玩家增加收集的牌数
  const player = this.players.find(p => p.name === playerName);
  if (player) {
    player.collected += collectedCount;
  }
  
  // 清空牌河
  this.river = [];
  
  // 更新玩家信息和牌河显示
  this.updatePlayerInfo();
  this.updateRiver();
  
  // 在动画结束后执行剩余操作
  setTimeout(() => {
    // 特殊奖励：图图和刷子各加50分
    let totalBonus = 0;
    
    // 找到图图和给他加50分
    const tutu = this.players.find(p => p.name === "图图");
    if (tutu) {
      tutu.score += 50;
      this.showMessage(`霸王龙小分队奖励！图图获得50分！`, 2500);
    }
    
    // 如果玩家是刷子，给他加50分
    const shuazi = this.players.find(p => p.name === "刷子");
    if (shuazi) {
      if (shuazi.isPlayer) {
        // 玩家0是刷子，使用addScore方法增加分数
        this.addScore(50);
        totalBonus = 50;
      } else {
        // AI玩家是刷子，直接增加分数
        shuazi.score += 50;
      }
    }
    
    // 给图图和刷子分别发两张K
    this.giveKingsToPlayers();
    
    // 最后显示总分数增加的明确提示
    if (player && player.isPlayer) {
      const pointsGained = collectedCount + totalBonus;
      this.displayScoreChange(`霸王龙小分队效果！收集${collectedCount}张牌 + ${totalBonus}奖励分 = +${pointsGained}分！`, this.score);
    }
    
    // 轮到该玩家继续行动
    if (player) {
      this.activePlayerIndex = player.id;
      this.highlightActivePlayer();
      
      // 如果是玩家，启用操作；如果是AI，处理AI行动
      if (this.activePlayerIndex === 0) {
        this.enablePlayerActions();
      } else {
        setTimeout(() => {
          this.processAIAction();
        }, 1000);
      }
    }
  }, 5500); // 在动画播放后执行
},

// 霸王龙小分队图片展示
showDinoSquadImage: function() {
  // 创建全屏遮罩
  const overlay = document.createElement('div');
  overlay.className = 'dino-squad-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column'; // 改为纵向排列
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';
  
  // 创建图片元素
  const image = document.createElement('img');
  image.src = './image/poke/霸王龙小分队.jpg';
  image.alt = '霸王龙小分队';
  image.style.maxWidth = '80%';
  image.style.maxHeight = '70%'; // 减小高度，给文字留空间
  image.style.border = '5px solid gold';
  image.style.borderRadius = '10px';
  image.style.boxShadow = '0 0 30px gold';
  image.style.animation = 'dinoSquadPulse 1.5s infinite';
  
  // 添加口号文字
  const actionText = document.createElement('div');
  actionText.textContent = '霸王龙小分队，行动！！';
  actionText.style.color = '#FFD700'; // 金色文字
  actionText.style.fontSize = '36px';
  actionText.style.fontWeight = 'bold';
  actionText.style.marginTop = '20px';
  actionText.style.textShadow = '2px 2px 4px #ff0000, -2px -2px 4px #ff0000'; // 红色描边
  actionText.style.fontFamily = "'黑体', Arial, sans-serif";
  actionText.style.letterSpacing = '3px';
  actionText.style.animation = 'textFlash 1s infinite';
  actionText.style.textAlign = 'center'; // 确保文字居中
  actionText.style.width = '100%'; // 让元素占满整行，确保居中效果
  
  // 图片加载失败时的处理
  image.onerror = () => {
    console.error('霸王龙小分队图片加载失败');
    image.src = ''; // 清除错误的src
    
    // 显示文字替代
    const errorText = document.createElement('div');
    errorText.textContent = '霸王龙小分队集结！';
    errorText.style.color = 'white';
    errorText.style.fontSize = '36px';
    errorText.style.fontWeight = 'bold';
    errorText.style.textShadow = '0 0 10px gold';
    overlay.appendChild(errorText);
  };
  
  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes dinoSquadPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes textFlash {
      0% { opacity: 1; }
      50% { opacity: 0.7; transform: scale(1.05); }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // 添加图片和文字到遮罩
  overlay.appendChild(image);
  overlay.appendChild(actionText);
  document.body.appendChild(overlay);
  
  // 点击关闭特效
  overlay.addEventListener('click', () => {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  });
  
  // 自动3秒后关闭
  setTimeout(() => {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }, 5000);
},

// 给图图和刷子分别发K牌
giveKingsToPlayers: function() {
  // 创建K牌
  const kingHearts = { suit: 'hearts', value: 'K', numericValue: 13 };
  const kingDiamonds = { suit: 'diamonds', value: 'K', numericValue: 13 };
  const kingClubs = { suit: 'clubs', value: 'K', numericValue: 13 };
  const kingSpades = { suit: 'spades', value: 'K', numericValue: 13 };
  
  // 给图图两张K
  const tutu = this.players.find(p => p.name === "图图");
  if (tutu && !tutu.isEliminated) {
    tutu.hand.push(kingHearts, kingDiamonds);
    this.updatePlayerHand(tutu.id);
    this.showFlyingCardEffect(tutu.id, [kingHearts, kingDiamonds]);
    this.showMessage(`图图获得了两张K！`, 2000);
  }
  
  // 给刷子两张K
  const shuazi = this.players.find(p => p.name === "刷子");
  if (shuazi && !shuazi.isEliminated) {
    setTimeout(() => {
      shuazi.hand.push(kingClubs, kingSpades);
      this.updatePlayerHand(shuazi.id);
      this.showFlyingCardEffect(shuazi.id, [kingClubs, kingSpades]);
      this.showMessage(`刷子获得了两张K！`, 2000);
    }, 1500); // 延迟执行，避免消息重叠
  }
},
// 添加垃圾回收检查函数 - 牛爷爷专属
checkGarbageCollectionCombo: function() {
  // 检查最后一张出的牌是不是牛爷爷出的垃圾袋牌
  const lastCard = this.river[this.river.length - 1];
  if (!lastCard || 
      lastCard.playerName !== "牛爷爷" || 
      lastCard.card.suit !== 'garbage' || 
      lastCard.card.value !== 'BAG') {
    return { triggered: false };
  }
  
  // 检查牌河中是否有塑料瓶牌
  const bottleIndices = [];
  for (let i = 0; i < this.river.length - 1; i++) { // 不包括最后一张(垃圾袋牌)
    const item = this.river[i];
    if (item.card.suit === 'garbage' && item.card.value.startsWith('PB')) {
      bottleIndices.push(i);
    }
  }
  
  // 如果找到了塑料瓶牌，触发效果
  if (bottleIndices.length > 0) {
    return {
      triggered: true,
      bottleIndices: bottleIndices
    };
  }
  
  return { triggered: false };
},

// 修改垃圾回收效果函数，添加清晰的总分提示
triggerGarbageCollectionEffect: function() {
  // 显示垃圾回收特效图片
  this.showGarbageCollectionImage();
  
  // 显示特效消息
  this.showMessage(`垃圾分类，人人有责！牛爷爷收走所有垃圾！`, 3000);
  
  // 记录特效前的分数
  const initialScore = this.score;
  
  // 收集所有牌给牛爷爷
  const collectedCards = [...this.river];
  
  // 计算收集的分数
  const collectedCount = collectedCards.length;
  let cardsSum = 0;
  
  // 计算所有牌的点数总和
  for (let i = 0; i < collectedCards.length; i++) {
    cardsSum += collectedCards[i].card.numericValue;
  }
  
  // 给牛爷爷增加收集的牌数
  this.players[0].collected += collectedCount;
  
  // 清空牌河
  this.river = [];
  
  // 更新玩家信息和牌河显示
  this.updatePlayerInfo();
  this.updateRiver();
  
  // 在动画结束后执行剩余操作
  setTimeout(() => {
    // 环保奖励：收集牌数 + 中间牌点数 + 10分基础奖励
    const baseBonus = 10;
    const totalScore = collectedCount + cardsSum + baseBonus;
    this.addScore(totalScore);
    
    // 显示详细的得分明细
    this.displayScoreChange(`环保奖励！收集${collectedCount}张牌(${cardsSum}点) + ${baseBonus}环保奖励 = ${totalScore}分！`, this.score);
    
    // 轮到牛爷爷继续行动
    this.activePlayerIndex = 0;
    this.highlightActivePlayer();
    this.enablePlayerActions();
  }, 3500); // 在动画播放后执行
},
// 牛爷爷垃圾回收图片展示
showGarbageCollectionImage: function() {
  // 创建全屏遮罩
  const overlay = document.createElement('div');
  overlay.className = 'garbage-collection-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';
  
  // 创建图片元素
  const image = document.createElement('img');
  image.src = './image/poke/图图，随牛爷爷出征！.webp';
  image.alt = '图图，随牛爷爷出征！';
  image.style.maxWidth = '80%';
  image.style.maxHeight = '70%';
  image.style.border = '5px solid #4caf50'; // 绿色边框表示环保
  image.style.borderRadius = '10px';
  image.style.boxShadow = '0 0 30px #4caf50';
  image.style.animation = 'garbagePulse 1.5s infinite';
  
  // 添加口号文字
  const actionText = document.createElement('div');
  actionText.textContent = '图图，随牛爷爷出征！';
  actionText.style.color = '#4caf50'; // 绿色文字表示环保
  actionText.style.fontSize = '36px';
  actionText.style.fontWeight = 'bold';
  actionText.style.marginTop = '20px';
  actionText.style.textShadow = '2px 2px 4px #000, -2px -2px 4px #000';
  actionText.style.fontFamily = "'黑体', Arial, sans-serif";
  actionText.style.letterSpacing = '3px';
  actionText.style.animation = 'garbageTextFlash 1s infinite';
  actionText.style.textAlign = 'center';
  actionText.style.width = '100%';
  
  // 添加副标题
  const subText = document.createElement('div');
  subText.textContent = '垃圾分类，保护环境！';
  subText.style.color = '#fff';
  subText.style.fontSize = '24px';
  subText.style.marginTop = '10px';
  subText.style.fontFamily = "'宋体', Arial, sans-serif";
  subText.style.textAlign = 'center';
  subText.style.width = '100%';
  
  // 图片加载失败时的处理
  image.onerror = () => {
    console.error('牛爷爷环保图片加载失败');
    image.src = ''; // 清除错误的src
    
    // 显示文字替代
    const errorText = document.createElement('div');
    errorText.textContent = '图图，随牛爷爷出征！';
    errorText.style.color = 'white';
    errorText.style.fontSize = '36px';
    errorText.style.fontWeight = 'bold';
    errorText.style.textShadow = '0 0 10px #4caf50';
    overlay.appendChild(errorText);
  };
  
  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes garbagePulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes garbageTextFlash {
      0% { opacity: 1; }
      50% { opacity: 0.7; transform: scale(1.05); }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // 添加图片和文字到遮罩
  overlay.appendChild(image);
  overlay.appendChild(actionText);
  overlay.appendChild(subText);
  document.body.appendChild(overlay);
  
  // 点击关闭特效
  overlay.addEventListener('click', () => {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  });
  
  // 自动4秒后关闭
  setTimeout(() => {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }, 3000);
},
// 改进显示分数变化的函数，添加详细的计分公式
displayScoreChange: function(message, newScore, formulaDetails = null) {
  // 创建一个特殊的分数变化提示框
  const scoreAlert = document.createElement('div');
  scoreAlert.className = 'score-change-alert';
  scoreAlert.style.position = 'fixed';
  scoreAlert.style.top = '50%';
  scoreAlert.style.left = '50%';
  scoreAlert.style.transform = 'translate(-50%, -50%)';
  scoreAlert.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  scoreAlert.style.color = '#FFD700';
  scoreAlert.style.padding = '20px';
  scoreAlert.style.borderRadius = '10px';
  scoreAlert.style.fontSize = '24px';
  scoreAlert.style.fontWeight = 'bold';
  scoreAlert.style.textAlign = 'center';
  scoreAlert.style.boxShadow = '0 0 20px gold';
  scoreAlert.style.zIndex = '10000';
  scoreAlert.style.animation = 'fadeInOut 4s';
  scoreAlert.style.width = '80%';
  scoreAlert.style.maxWidth = '500px';
  
  // 添加消息和当前总分
  let htmlContent = `${message}<br>`;
  
  // 添加详细的计分公式
  if (formulaDetails) {
    htmlContent += `
      <div style="margin-top: 15px; background-color: rgba(255,255,255,0.1); padding: 10px; border-radius: 5px; text-align: left;">
        <div style="font-size: 20px; margin-bottom: 8px;">计分公式:</div>
        ${formulaDetails}
      </div>
    `;
  }
  
  htmlContent += `
    <div style="margin-top: 15px; font-size: 28px;">
      当前总分: <span style="color: #FFA500; font-size: 32px;">${newScore}</span>
    </div>
  `;
  
  scoreAlert.innerHTML = htmlContent;
  
  // 添加关闭按钮
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✓ 确定';
  closeBtn.style.marginTop = '15px';
  closeBtn.style.padding = '5px 15px';
  closeBtn.style.backgroundColor = '#4CAF50';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '5px';
  closeBtn.style.color = 'white';
  closeBtn.style.fontSize = '18px';
  closeBtn.style.cursor = 'pointer';
  
  closeBtn.onclick = function() {
    if (document.body.contains(scoreAlert)) {
      document.body.removeChild(scoreAlert);
    }
  };
  
  scoreAlert.appendChild(closeBtn);
  
  // 添加到页面
  document.body.appendChild(scoreAlert);
  
  // 自动关闭
  setTimeout(() => {
    if (document.body.contains(scoreAlert)) {
      document.body.removeChild(scoreAlert);
    }
  }, 10000);
}
};

// 确保游戏对象可以从全局访问
window.cardGame = dragonGame;

// 确保DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
  dragonGame.init();
});

