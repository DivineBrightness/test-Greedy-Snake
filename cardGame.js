const bombGame = {
  isOpen: false,
  deckId: null,
  gamePhase: "idle", // idle, betting, showdown
  playerChips: 1000,
  pot: 0,
  currentBet: 0,
  minBet: 20,
  players: [
      { id: 0, name: "你", isPlayer: true, hand: [], chips: 1000, bet: 0, folded: false, looked: false },
      { id: 1, name: "南宫问天", isPlayer: false, hand: [], chips: 1000, bet: 0, folded: false, looked: false },
      { id: 2, name: "喜羊羊", isPlayer: false, hand: [], chips: 1000, bet: 0, folded: false, looked: false }
  ],
  activePlayerIndex: 0,
  playersInHand: 3,
  
  // 核心函数
  init: function() {
    // 创建游戏界面
    this.createGameInterface();
    // 应用样式
    this.applyStyles();
    // 设置事件监听器
    this.setupEventListeners();
    // 初始化游戏状态
    this.resetGame();
    
    console.log('炸金花游戏已初始化');
  },
  
  show: function() {
    const container = document.querySelector('.bomb-game-container');
    if (container) {
      container.style.display = 'block';
      this.isOpen = true;
      
      if (this.gamePhase === "idle") {
        this.startNewGame();
      }
    }
  },
  
  hide: function() {
    const container = document.querySelector('.bomb-game-container');
    if (container) {
      container.style.display = 'none';
      this.isOpen = false;
    }
  },
  
  applyStyles: function() {
    // 在这里可以动态应用样式
    // 例如根据屏幕尺寸调整元素大小
    const gameContainer = document.querySelector('.bomb-game-container');
    if (!gameContainer) return;
    
    gameContainer.style.position = 'fixed';
    gameContainer.style.top = '0';
    gameContainer.style.left = '0';
    gameContainer.style.width = '100%';
    gameContainer.style.height = '100%';
    gameContainer.style.backgroundColor = 'rgba(0, 32, 63, 0.95)';
    gameContainer.style.zIndex = '1000';
    gameContainer.style.display = 'none'; // 初始隐藏
  },
  
  setupEventListeners: function() {
    // 设置游戏按钮的事件监听器
    const lookBtn = document.getElementById('look-btn');
    const followBtn = document.getElementById('follow-btn');
    const raiseBtn = document.getElementById('raise-btn');
    const foldBtn = document.getElementById('fold-btn');
    const betSlider = document.getElementById('bet-slider');
    
    if (lookBtn) lookBtn.addEventListener('click', () => this.playerLook());
    if (followBtn) followBtn.addEventListener('click', () => this.playerFollow());
    if (raiseBtn) raiseBtn.addEventListener('click', () => this.playerRaise());
    if (foldBtn) foldBtn.addEventListener('click', () => this.playerFold());
    
    if (betSlider) {
      betSlider.addEventListener('input', (e) => {
        const betAmount = document.getElementById('bet-amount');
        if (betAmount) {
          betAmount.textContent = e.target.value;
        }
      });
    }
    
      // 修改ESC键处理
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.hide();
          if (typeof window.backFromCardGame === 'function') {
            window.backFromCardGame();
          }
        }
      });
  },
  
  // 创建游戏界面
  createGameInterface: function() {
    // 检查是否已存在游戏容器
    if (document.querySelector('.bomb-game-container')) return;
    
    // 创建主容器
    const container = document.createElement('div');
    container.className = 'bomb-game-container';
    
    // 创建游戏内容
    container.innerHTML = `
      <div class="bomb-game-content">
      <!-- 添加返回按钮 -->
      <button class="back-btn" id="bomb-game-back-btn"></button>
        <div class="bomb-game-header">
          <h2>炸金花</h2>
          <div class="game-info">
            <span>底注: ${this.minBet}</span> | 
            <span>彩池: <span id="pot-amount">0</span></span>
          </div>
        </div>
        <div class="bomb-game-body">
          <div class="bomb-table-container">
            <div class="bomb-table">
              <div class="bomb-table-rim"></div>
              <div class="table-pot" id="table-pot"></div>
            </div>
          </div>
          
          <!-- 玩家位置 -->
          <div class="player-position player-position-0" id="player-position-0">
            <div class="player-box" id="player-0">
              <div class="player-info">
                <div class="player-name">${this.players[0].name}</div>
                <div class="player-chips">${this.players[0].chips}</div>
                <div class="player-bet">下注: 0</div>
              </div>
              <div class="player-cards" id="player-cards-0"></div>
            </div>
          </div>
          
          <div class="player-position player-position-1" id="player-position-1">
            <div class="player-box" id="player-1">
              <div class="player-info">
                <div class="player-name">${this.players[1].name}</div>
                <div class="player-chips">${this.players[1].chips}</div>
                <div class="player-bet">下注: 0</div>
              </div>
              <div class="player-cards" id="player-cards-1"></div>
            </div>
          </div>
          
          <div class="player-position player-position-2" id="player-position-2">
            <div class="player-box" id="player-2">
              <div class="player-info">
                <div class="player-name">${this.players[2].name}</div>
                <div class="player-chips">${this.players[2].chips}</div>
                <div class="player-bet">下注: 0</div>
              </div>
              <div class="player-cards" id="player-cards-2"></div>
            </div>
          </div>
          
          <!-- 控制面板 -->
          <div class="control-panel">
            <div class="bomb-controls">
              <button id="look-btn" class="bomb-btn secondary">看牌</button>
              <button id="follow-btn" class="bomb-btn secondary">跟注</button>
              <button id="raise-btn" class="bomb-btn primary">加注</button>
              <button id="fold-btn" class="bomb-btn secondary">弃牌</button>
              <div class="bet-controls">
                <input type="range" id="bet-slider" min="${this.minBet}" max="1000" step="10" value="${this.minBet}">
                <div class="bet-amount" id="bet-amount">${this.minBet}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
  
    // 添加返回按钮事件（直接使用全局函数）
    const backBtn = document.getElementById('bomb-game-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        bombGame.hide();
        if (typeof window.backFromCardGame === 'function') {
          window.backFromCardGame();
        }
      });
    }
  
  // 添加新游戏按钮
  this.addNewGameButton();
},

  // 游戏逻辑
  startNewGame: function() {
    console.log('开始新游戏');
    this.resetGame();
    
    // 创建新的牌组并发牌
    this.createNewDeck()
      .then(() => {
        this.dealCards()
          .then(() => {
            // 游戏开始后进入下注阶段
            this.gamePhase = "betting";
            this.updateGameInfo();
            
            // 设置第一个行动的玩家
            this.activePlayerIndex = 0;
            this.highlightActivePlayer();
            this.enablePlayerActions();
            
            // 每个玩家下最小注
            this.players.forEach(player => {
              player.chips -= this.minBet;
              player.bet = this.minBet;
              this.pot += this.minBet;
            });
            
            this.currentBet = this.minBet;
            this.updatePlayerInfo();
            this.updateGameInfo();
          });
      });
  },
  
  resetGame: function() {
    console.log('重置游戏');
    
    // 重置游戏状态
    this.gamePhase = "idle";
    this.pot = 0;
    this.currentBet = 0;
    
    // 重置玩家状态
    this.players.forEach(player => {
      player.hand = [];
      player.bet = 0;
      player.folded = false;
      player.looked = false;
      // 如果玩家筹码耗尽，补充筹码
      if (player.chips <= 0) {
        player.chips = 1000;
      }
    });
    
    // 重置UI
    this.players.forEach(player => {
      const playerBox = document.getElementById(`player-${player.id}`);
      if (playerBox) {
        playerBox.classList.remove('active', 'folded', 'looked');
      }
      
      const cardsContainer = document.getElementById(`player-cards-${player.id}`);
      if (cardsContainer) {
        cardsContainer.innerHTML = '';
      }
    });
    
    this.playersInHand = this.players.length;
    this.updatePlayerInfo();
    this.updateGameInfo();
    
    // 重置下注滑块
    const betSlider = document.getElementById('bet-slider');
    const betAmount = document.getElementById('bet-amount');
    if (betSlider && betAmount) {
      betSlider.value = this.minBet;
      betSlider.min = this.minBet;
      betAmount.textContent = this.minBet;
    }
  },
  
  createNewDeck: function() {
    console.log('创建新牌组');
    
    // 这里可以使用真实的API创建牌组，例如 deckofcardsapi.com
    // 为了简化，我们直接使用本地模拟
    return new Promise((resolve) => {
      this.deckId = 'local_deck_' + Date.now();
      setTimeout(resolve, 500); // 模拟网络延迟
    });
  },
  
  dealCards: function() {
    console.log('发牌');
    
    return new Promise((resolve) => {
      // 生成牌
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const deck = [];
      
      // 创建一副完整的牌
      for (let suit of suits) {
        for (let value of values) {
          deck.push({suit, value});
        }
      }
      
      // 洗牌
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      
      // 给每个玩家发3张牌
      this.players.forEach(player => {
        player.hand = deck.splice(0, 3);
      });
      
      // 更新UI，显示牌
      this.players.forEach(player => {
        if (player.isPlayer) {
          this.showPlayerCards(player.id);
        } else {
          this.showOpponentCardBacks(player.id);
        }
      });
      
      setTimeout(resolve, 1000); // 模拟发牌动画时间
    });
  },
  
  // 玩家操作
  playerLook: function() {
    console.log('玩家看牌');
    
    // 确保是玩家的回合
    if (this.activePlayerIndex !== 0 || this.gamePhase !== "betting") return;
    
    const player = this.players[0]; // 玩家总是索引0
    
    // 如果已经看过牌，不能再次看牌
    if (player.looked) {
      this.showMessage("您已经看过牌了");
      return;
    }
    
    // 标记玩家已看牌
    player.looked = true;
    const playerBox = document.getElementById(`player-${player.id}`);
    if (playerBox) {
      playerBox.classList.add('looked');
    }
    
    // 显示玩家的牌面（实际上玩家已经能看到自己的牌）
    this.showPlayerCards(player.id);
    
    // 继续游戏，轮到下一个玩家
    this.nextPlayer();
  },
  
  playerFollow: function() {
    console.log('玩家跟注');
    
    // 确保是玩家的回合
    if (this.activePlayerIndex !== 0 || this.gamePhase !== "betting") return;
    
    const player = this.players[0];
    const betDifference = this.currentBet - player.bet;
    
    // 检查玩家是否有足够的筹码
    if (betDifference > player.chips) {
      this.showMessage("您的筹码不足以跟注");
      return;
    }
    
    // 更新玩家筹码和下注
    player.chips -= betDifference;
    player.bet = this.currentBet;
    this.pot += betDifference;
    
    // 更新UI
    this.updatePlayerInfo();
    this.updateGameInfo();
    
    // 继续游戏，轮到下一个玩家
    this.nextPlayer();
  },
  
  playerRaise: function() {
    console.log('玩家加注');
    
    // 确保是玩家的回合
    if (this.activePlayerIndex !== 0 || this.gamePhase !== "betting") return;
    
    const player = this.players[0];
    
    // 获取加注金额
    const raiseAmount = parseInt(document.getElementById('bet-slider').value);
    
    // 检查加注金额是否有效
    if (raiseAmount <= this.currentBet) {
      this.showMessage("加注金额必须大于当前注码");
      return;
    }
    
    // 计算需要增加的筹码
    const chipsDifference = raiseAmount - player.bet;
    
    // 检查玩家是否有足够的筹码
    if (chipsDifference > player.chips) {
      this.showMessage("您的筹码不足以加这么多注");
      return;
    }
    
    // 更新玩家筹码和下注
    player.chips -= chipsDifference;
    player.bet = raiseAmount;
    this.pot += chipsDifference;
    this.currentBet = raiseAmount;
    
    // 更新UI
    this.updatePlayerInfo();
    this.updateGameInfo();
    
    // 继续游戏，轮到下一个玩家
    this.nextPlayer();
  },
  
  playerFold: function() {
    console.log('玩家弃牌');
    
    // 确保是玩家的回合
    if (this.activePlayerIndex !== 0 || this.gamePhase !== "betting") return;
    
    const player = this.players[0];
    
    // 标记玩家已弃牌
    player.folded = true;
    this.playersInHand--;
    
    const playerBox = document.getElementById(`player-${player.id}`);
    if (playerBox) {
      playerBox.classList.add('folded');
    }
    
    // 检查是否只剩一名玩家未弃牌
    if (this.playersInHand === 1) {
      // 游戏结束，确定赢家
      this.determineWinner();
      return;
    }
    
    // 继续游戏，轮到下一个玩家
    this.nextPlayer();
  },
  // AI决策
processAIAction: function() {
  console.log('AI开始行动');
  
  // 禁用玩家控制
  this.disablePlayerActions();
  
  // 获取当前AI玩家
  const aiPlayer = this.players[this.activePlayerIndex];
  
  // 显示AI玩家正在思考
  this.showMessage(`${aiPlayer.name}正在思考...`);
  
  // 延迟执行，模拟思考过程
  setTimeout(() => {
    // 获取AI决策
    const action = this.getAIAction(aiPlayer);
    
    // 执行AI决策
    switch (action.type) {
      case 'look':
        this.aiLook(aiPlayer);
        break;
      case 'follow':
        this.aiFollow(aiPlayer);
        break;
      case 'raise':
        this.aiRaise(aiPlayer, action.amount);
        break;
      case 'fold':
        this.aiFold(aiPlayer);
        break;
    }
    
    // 检查游戏状态
    if (this.gamePhase === "betting") {
      // 继续下一玩家
      this.nextPlayer();
    }
  }, 1500);
},

getAIAction: function(aiPlayer) {
  console.log(`获取${aiPlayer.name}的决策`);
  
  // 50%随机决策的简单AI
  // 在实际游戏中，这里可以添加更复杂的策略逻辑
  
  const randomValue = Math.random();
  
  // 如果AI还未看牌，有30%概率看牌
  if (!aiPlayer.looked && randomValue < 0.3) {
    return { type: 'look' };
  }
  
  // 处理各种情况
  if (this.currentBet > aiPlayer.bet) {
    // 需要跟注或弃牌
    // 如果差距太大，有30%概率弃牌
    const betDifference = this.currentBet - aiPlayer.bet;
    if (betDifference > aiPlayer.chips * 0.3 && randomValue < 0.3) {
      return { type: 'fold' };
    }
    
    // 60%概率跟注，10%概率加注
    if (randomValue < 0.6) {
      return { type: 'follow' };
    } else {
      // 加注，金额为当前注码的1.5到2.5倍之间
      const multiplier = 1.5 + Math.random();
      const raiseAmount = Math.min(
        Math.floor(this.currentBet * multiplier),
        aiPlayer.chips + aiPlayer.bet
      );
      return { type: 'raise', amount: raiseAmount };
    }
  } else {
    // 可以让牌(check)或加注
    if (randomValue < 0.5) {
      return { type: 'follow' }; // 在炸金花中相当于让牌
    } else {
      // 加注，金额为当前最小注的1.5到3倍之间
      const multiplier = 1.5 + Math.random() * 1.5;
      const raiseAmount = Math.min(
        Math.floor(this.minBet * multiplier),
        aiPlayer.chips + aiPlayer.bet
      );
      return { type: 'raise', amount: raiseAmount };
    }
  }
},

// AI动作实现
aiLook: function(aiPlayer) {
  console.log(`${aiPlayer.name}看牌`);
  
  aiPlayer.looked = true;
  
  const playerBox = document.getElementById(`player-${aiPlayer.id}`);
  if (playerBox) {
    playerBox.classList.add('looked');
  }
  
  this.showMessage(`${aiPlayer.name}看了自己的牌`);
},

aiFollow: function(aiPlayer) {
  console.log(`${aiPlayer.name}跟注`);
  
  const betDifference = this.currentBet - aiPlayer.bet;
  
  // 更新玩家筹码和下注
  aiPlayer.chips -= betDifference;
  aiPlayer.bet = this.currentBet;
  this.pot += betDifference;
  
  // 更新UI
  this.updatePlayerInfo();
  this.updateGameInfo();
  
  this.showMessage(`${aiPlayer.name}跟注 ${betDifference} 筹码`);
},

aiRaise: function(aiPlayer, raiseAmount) {
  console.log(`${aiPlayer.name}加注`);
  
  // 计算需要增加的筹码
  const chipsDifference = raiseAmount - aiPlayer.bet;
  
  // 更新玩家筹码和下注
  aiPlayer.chips -= chipsDifference;
  aiPlayer.bet = raiseAmount;
  this.pot += chipsDifference;
  this.currentBet = raiseAmount;
  
  // 更新UI
  this.updatePlayerInfo();
  this.updateGameInfo();
  
  this.showMessage(`${aiPlayer.name}加注到 ${raiseAmount} 筹码`);
},

aiFold: function(aiPlayer) {
  console.log(`${aiPlayer.name}弃牌`);
  
  // 标记玩家已弃牌
  aiPlayer.folded = true;
  this.playersInHand--;
  
  const playerBox = document.getElementById(`player-${aiPlayer.id}`);
  if (playerBox) {
    playerBox.classList.add('folded');
  }
  
  this.showMessage(`${aiPlayer.name}弃牌了`);
  
  // 检查是否只剩一名玩家未弃牌
  if (this.playersInHand === 1) {
    // 游戏结束，确定赢家
    this.determineWinner();
  }
},

// 修改nextPlayer函数中的回合结束检查
nextPlayer: function() {
  console.log('轮到下一个玩家');
  
  // 查找下一个未弃牌的玩家
  let nextPlayerIndex = this.activePlayerIndex;
  do {
    nextPlayerIndex = (nextPlayerIndex + 1) % this.players.length;
  } while (this.players[nextPlayerIndex].folded && nextPlayerIndex !== this.activePlayerIndex);
  
  // 更新当前玩家索引
  this.activePlayerIndex = nextPlayerIndex;
  
  // 如果所有玩家都下过注了，且注码相同，则一轮结束
  if (this.checkRoundComplete()) {
    this.showdown();
    return;
  }
  
  // 高亮显示当前玩家
  this.highlightActivePlayer();
  
  // 如果是玩家的回合，启用控制按钮
  if (nextPlayerIndex === 0) {
    this.enablePlayerActions();
  } else {
    // AI玩家的回合，处理AI行动
    this.processAIAction();
  }
},

checkRoundComplete: function() {
  console.log('检查当前回合是否完成');
  
  // 获取所有未弃牌的玩家
  const activePlayers = this.players.filter(player => !player.folded);
  
  // 如果只有一个活跃玩家，回合完成
  if (activePlayers.length === 1) {
    return true;
  }
  
  // 检查所有未弃牌的玩家是否下注相同
  const firstPlayerBet = activePlayers[0].bet;
  
  // 如果回合已经过了一轮（每个玩家都有机会操作）并且所有人下注相同
  let allBetsEqual = true;
  let passedFullRound = false;
  
  // 判断是否已经过了完整的一轮
  if (this.activePlayerIndex === 0 || this.activePlayerIndex >= activePlayers.length - 1) {
    passedFullRound = true;
  }
  
  // 判断所有玩家下注是否相同
  for (const player of activePlayers) {
    if (player.bet !== firstPlayerBet) {
      allBetsEqual = false;
      break;
    }
  }
  
  return passedFullRound && allBetsEqual;
},

// 修改showdown函数
showdown: function() {
  console.log('摊牌阶段');
  
  this.gamePhase = "showdown";
  this.disablePlayerActions();
  
  // 显示所有未弃牌玩家的牌
  this.players.forEach(player => {
    if (!player.folded) {
      this.showOpponentCards(player.id); // 使用showOpponentCards确保所有玩家的牌都显示
    }
  });
  
  // 计算牌型大小并确定赢家
  setTimeout(() => {
    this.evaluateHands();
    this.determineWinner();
  }, 2000);
},
// 添加新的游戏控制函数
addNewGameButton: function() {
  // 创建新游戏按钮，允许玩家随时开始新一局
  const controlPanel = document.querySelector('.bomb-controls');
  if (!controlPanel) return;
  
  // 检查是否已存在新游戏按钮
  if (document.getElementById('new-game-btn')) return;
  
  const newGameBtn = document.createElement('button');
  newGameBtn.id = 'new-game-btn';
  newGameBtn.className = 'bomb-btn primary';
  newGameBtn.textContent = '新游戏';
  newGameBtn.addEventListener('click', () => this.resetForNextHand());
  
  // 添加到控制面板的开始位置
  controlPanel.insertBefore(newGameBtn, controlPanel.firstChild);
},
// 牌型评估
evaluateHands: function() {
  console.log('评估牌型');
  
  // 牌型值从大到小: 豹子(6) > 同花顺(5) > 同花(4) > 顺子(3) > 对子(2) > 单牌(1)
  this.players.forEach(player => {
    if (player.folded) {
      player.handRank = { type: 0, value: 0 }; // 弃牌玩家
      return;
    }
    
    // 复制手牌以便排序
    const cards = [...player.hand];
    
    // 按照牌面值排序（A最大）
    const valueOrder = {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':11, 'Q':12, 'K':13, 'A':14};
    cards.sort((a, b) => valueOrder[b.value] - valueOrder[a.value]);
    
    // 检查是否有豹子（三张相同点数）
    const isTrips = cards[0].value === cards[1].value && cards[1].value === cards[2].value;
    if (isTrips) {
      player.handRank = { type: 6, value: valueOrder[cards[0].value] };
      player.handName = "豹子";
      return;
    }
    
    // 检查是否同花（三张同一花色）
    const isFlush = cards[0].suit === cards[1].suit && cards[1].suit === cards[2].suit;
    
    // 检查是否顺子（三张连续牌）
    const isStraight = 
      valueOrder[cards[0].value] === valueOrder[cards[1].value] + 1 && 
      valueOrder[cards[1].value] === valueOrder[cards[2].value] + 1;
    
    // 特殊情况：A-2-3 顺子
    const isA23Straight = 
      valueOrder[cards[0].value] === 14 && // A
      valueOrder[cards[1].value] === 3 &&  // 3
      valueOrder[cards[2].value] === 2;    // 2
    
    // 同花顺
    if ((isStraight || isA23Straight) && isFlush) {
      player.handRank = { type: 5, value: isStraight ? valueOrder[cards[0].value] : 3 };
      player.handName = "同花顺";
      return;
    }
    
    // 同花
    if (isFlush) {
      player.handRank = { 
        type: 4, 
        value: valueOrder[cards[0].value] * 10000 + valueOrder[cards[1].value] * 100 + valueOrder[cards[2].value]
      };
      player.handName = "同花";
      return;
    }
    
    // 顺子
    if (isStraight || isA23Straight) {
      player.handRank = { type: 3, value: isStraight ? valueOrder[cards[0].value] : 3 };
      player.handName = "顺子";
      return;
    }
    
    // 检查是否对子
    const isPair1 = cards[0].value === cards[1].value;
    const isPair2 = cards[1].value === cards[2].value;
    
    if (isPair1 || isPair2) {
      const pairValue = isPair1 ? valueOrder[cards[0].value] : valueOrder[cards[1].value];
      const kickerValue = isPair1 ? valueOrder[cards[2].value] : valueOrder[cards[0].value];
      player.handRank = { type: 2, value: pairValue * 100 + kickerValue };
      player.handName = "对子";
      return;
    }
    
    // 单牌
    player.handRank = { 
      type: 1, 
      value: valueOrder[cards[0].value] * 10000 + valueOrder[cards[1].value] * 100 + valueOrder[cards[2].value]
    };
    player.handName = "高牌";
  });
},

determineWinner: function() {
  console.log('确定赢家');
  
  // 筛选出未弃牌的玩家
  const activePlayers = this.players.filter(player => !player.folded);
  
  // 如果只有一个活跃玩家，他就是赢家
  if (activePlayers.length === 1) {
    const winner = activePlayers[0];
    
    // 将底池加入赢家筹码
    winner.chips += this.pot;
    
    // 更新UI
    this.updatePlayerInfo();
    
    // 显示赢家信息
    this.showMessage(`${winner.name} 获胜，赢得 ${this.pot} 筹码！`);
    
    // 在短暂延迟后重置游戏
    setTimeout(() => {
      this.resetForNextHand();
    }, 3000);
    
    return;
  }
  
  // 按照牌型大小排序玩家
  activePlayers.sort((a, b) => {
    // 先比较牌型类型
    if (a.handRank.type !== b.handRank.type) {
      return b.handRank.type - a.handRank.type;
    }
    // 同一牌型，比较牌值
    return b.handRank.value - a.handRank.value;
  });
  
  // 第一个玩家就是赢家
  const winner = activePlayers[0];
  
  // 将底池加入赢家筹码
  winner.chips += this.pot;
  
  // 更新UI
  this.updatePlayerInfo();
  
  // 显示赢家信息和牌型
  this.showMessage(`${winner.name} 以 ${winner.handName} 获胜，赢得 ${this.pot} 筹码！`);
  
  // 延迟后重置游戏
  setTimeout(() => {
    this.resetForNextHand();
  }, 3000);
},

resetForNextHand: function() {
  // 准备下一轮游戏
  this.gamePhase = "idle";
  this.startNewGame();
},

// UI更新
showPlayerCards: function(playerId) {
  console.log(`显示玩家${playerId}的牌`);
  
  const player = this.players.find(p => p.id === playerId);
  if (!player || player.hand.length === 0) return;
  
  const cardsContainer = document.getElementById(`player-cards-${playerId}`);
  if (!cardsContainer) return;
  
  // 清空容器
  cardsContainer.innerHTML = '';
  
  // 创建并添加牌元素
  player.hand.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = `card ${card.suit}`;
    
    const valueElement = document.createElement('div');
    valueElement.className = 'value';
    valueElement.textContent = card.value;
    
    const suitElement = document.createElement('div');
    suitElement.className = 'suit';
    // 根据花色添加符号
    switch (card.suit) {
      case 'hearts': suitElement.textContent = '♥'; break;
      case 'diamonds': suitElement.textContent = '♦'; break;
      case 'clubs': suitElement.textContent = '♣'; break;
      case 'spades': suitElement.textContent = '♠'; break;
    }
    
    cardElement.appendChild(valueElement);
    cardElement.appendChild(suitElement);
    cardsContainer.appendChild(cardElement);
  });
},

showOpponentCardBacks: function(playerId) {
  console.log(`显示玩家${playerId}的牌背`);
  
  const player = this.players.find(p => p.id === playerId);
  if (!player || player.hand.length === 0) return;
  
  const cardsContainer = document.getElementById(`player-cards-${playerId}`);
  if (!cardsContainer) return;
  
  // 清空容器
  cardsContainer.innerHTML = '';
  
  // 创建并添加牌背元素
  for (let i = 0; i < player.hand.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card back';
    cardsContainer.appendChild(cardElement);
  }
},

showOpponentCards: function(playerId) {
  // 与showPlayerCards相同，但是用于显示AI玩家的牌
  this.showPlayerCards(playerId);
},

updatePlayerInfo: function() {
  console.log('更新玩家信息');
  
  this.players.forEach(player => {
    const playerBox = document.getElementById(`player-${player.id}`);
    if (!playerBox) return;
    
    const chipsElement = playerBox.querySelector('.player-chips');
    const betElement = playerBox.querySelector('.player-bet');
    
    if (chipsElement) {
      chipsElement.textContent = `${player.chips} 筹码`;
    }
    
    if (betElement) {
      betElement.textContent = `下注: ${player.bet}`;
    }
  });
},

updateGameInfo: function() {
  console.log('更新游戏信息');
  
  const potAmount = document.getElementById('pot-amount');
  if (potAmount) {
    potAmount.textContent = this.pot;
  }
  
  const tablePot = document.getElementById('table-pot');
  if (tablePot) {
    tablePot.textContent = `彩池: ${this.pot}`;
  }
},

highlightActivePlayer: function() {
  console.log('高亮当前行动玩家');
  
  // 首先移除所有玩家的高亮
  this.players.forEach(player => {
    const playerBox = document.getElementById(`player-${player.id}`);
    if (playerBox) {
      playerBox.classList.remove('active');
    }
  });
  
  // 高亮当前玩家
  const activePlayer = this.players[this.activePlayerIndex];
  const playerBox = document.getElementById(`player-${activePlayer.id}`);
  if (playerBox) {
    playerBox.classList.add('active');
  }
},

enablePlayerActions: function() {
  console.log('启用玩家操作按钮');
  
  const player = this.players[0]; // 玩家总是索引0
  const lookBtn = document.getElementById('look-btn');
  const followBtn = document.getElementById('follow-btn');
  const raiseBtn = document.getElementById('raise-btn');
  const foldBtn = document.getElementById('fold-btn');
  
  // 看牌按钮：只有未看牌时可用
  if (lookBtn) {
    lookBtn.disabled = player.looked;
  }
  
  // 跟注按钮：任何时候都可用
  if (followBtn) {
    followBtn.disabled = false;
  }
  
  // 加注按钮：如果有足够筹码可用
  if (raiseBtn) {
    raiseBtn.disabled = player.chips <= 0;
  }
  
  // 弃牌按钮：任何时候都可用
  if (foldBtn) {
    foldBtn.disabled = false;
  }
},

disablePlayerActions: function() {
  console.log('禁用玩家操作按钮');
  
  const lookBtn = document.getElementById('look-btn');
  const followBtn = document.getElementById('follow-btn');
  const raiseBtn = document.getElementById('raise-btn');
  const foldBtn = document.getElementById('fold-btn');
  
  if (lookBtn) lookBtn.disabled = true;
  if (followBtn) followBtn.disabled = true;
  if (raiseBtn) raiseBtn.disabled = true;
  if (foldBtn) foldBtn.disabled = true;
},

showMessage: function(message, duration = 2000) {
  console.log('显示消息:', message);
  
  // 查找或创建消息元素
  let messageElement = document.getElementById('game-message');
  
  if (!messageElement) {
    messageElement = document.createElement('div');
    messageElement.id = 'game-message';
    messageElement.className = 'game-message';
    document.querySelector('.bomb-game-body').appendChild(messageElement);
  }
  
  // 设置消息内容并显示
  messageElement.textContent = message;
  messageElement.classList.add('show');
  
  // 设置计时器，自动隐藏消息
  setTimeout(() => {
    messageElement.classList.remove('show');
  }, duration);
}
};

// 添加此行，将bombGame对象作为全局cardGame对象导出
window.cardGame = bombGame;

// 确保DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
  // 初始化游戏，但不立即显示
  bombGame.init();
  console.log('炸金花游戏已初始化并准备就绪');
});