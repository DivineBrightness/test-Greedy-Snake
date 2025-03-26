// 德州扑克游戏功能

const cardGame = {
    isOpen: false,
    deckId: null,
    gamePhase: "idle", // idle, preflop, flop, turn, river, showdown
    communityCards: [],
    playerChips: 1000,
    pot: 0,
    currentBet: 0,
    minBet: 20,
    playerHand: [],
    players: [
      { id: 0, name: "你", isPlayer: true, hand: [], chips: 1000, bet: 0, folded: false, allIn: false, handRank: null },
      { id: 1, name: "东方机器人", isPlayer: false, hand: [], chips: 1000, bet: 0, folded: false, allIn: false, handRank: null },
      { id: 2, name: "南方机器人", isPlayer: false, hand: [], chips: 1000, bet: 0, folded: false, allIn: false, handRank: null },
      { id: 3, name: "西方机器人", isPlayer: false, hand: [], chips: 1000, bet: 0, folded: false, allIn: false, handRank: null }
    ],
    activePlayerIndex: 0,
    dealerIndex: 3, // 从庄家右侧第一位开始行动
    smallBlindIndex: 0,
    bigBlindIndex: 1,
    smallBlindAmount: 10,
    bigBlindAmount: 20,
    playersInHand: 4,
    
    // 初始化函数
    init: function() {
      console.log('初始化德州扑克游戏功能');
    },
    
    // 显示德州扑克游戏页面
    show: function() {
        // 如果页面已经打开，不重复操作
        if (this.isOpen) return;
        
        console.log('显示德州扑克游戏页面');
        
        // 创建德州扑克游戏页面元素
        const cardGameElement = document.createElement('div');
        cardGameElement.id = 'card-game-page';
        cardGameElement.className = 'card-game-container';
        
        // 设置页面内容
        cardGameElement.innerHTML = `
        <div class="card-game-content">
            <button class="back-btn" id="card-game-back-btn"></button>
            <div class="card-game-header">
            <h2>德州扑克</h2>
            </div>
            
            <div class="card-game-body">
            <div class="game-info">
                <div class="texas-info">
                <div class="phase-info">当前阶段: <span id="game-phase">未开始</span></div>
                </div>
            </div>
            
            <div class="card-controls">
                <button class="card-btn primary" id="new-game-btn">新游戏</button>
                <button class="card-btn" id="call-btn" disabled>跟注</button>
                <button class="card-btn" id="raise-btn" disabled>加注</button>
                <button class="card-btn secondary" id="check-btn" disabled>让牌</button>
                <button class="card-btn secondary" id="fold-btn" disabled>弃牌</button>
            </div>
            
            <div class="bet-controls" style="display: none;">
                <div class="bet-slider-container">
                <input type="range" id="bet-slider" min="0" max="1000" value="0">
                </div>
                <div class="bet-amount">
                <span>加注金额: </span>
                <input type="number" id="bet-amount" min="0" max="1000" value="0">
                <button id="confirm-bet">确认</button>
                <button id="cancel-bet">取消</button>
                </div>
            </div>
            
            <div class="game-message" id="game-message"></div>
            
            <!-- 圆形牌桌设计 -->
            <div class="card-table-container">
                <div class="table-rim"></div>
                <div class="card-table">
                <!-- 牌桌标识 -->
                <div class="table-logo">
                    <div>德州扑克</div>
                </div>
                
                <!-- 底池区域 -->
                <div class="table-pot">
                    底池: <span id="pot-amount">0</span> 筹码
                </div>
                
                <!-- 公共牌区域 -->
                <div class="community-cards">
                    <h3>公共牌</h3>
                    <div class="cards-area" id="community-cards-area"></div>
                </div>
                
                <!-- 玩家位置 - 玩家在下方，电脑玩家环绕 -->
                <!-- 玩家位置 -->
                <div class="player-position player-position-0">
                    <div class="player-box" id="player-0-box">
                    <div class="player-info">
                        <div class="player-info-left">
                        <div class="player-name">你</div>
                        <div class="player-chips">1000 筹码</div>
                        </div>
                        <div class="player-info-right">
                        <div class="player-bet">下注: 0</div>
                        </div>
                    </div>
                    <div class="player-cards" id="player-cards"></div>
                    </div>
                </div>
                
                <!-- 电脑玩家位置 -->
                <div class="player-position player-position-1">
                    <div class="player-box" id="player-1-box">
                    <div class="player-info">
                        <div class="player-info-left">
                        <div class="player-name">东方机器人</div>
                        <div class="player-chips">1000 筹码</div>
                        </div>
                        <div class="player-info-right">
                        <div class="player-bet">下注: 0</div>
                        </div>
                    </div>
                    <div class="opponent-cards" id="opponent-1-cards"></div>
                    </div>
                </div>
                
                <div class="player-position player-position-2">
                    <div class="player-box" id="player-2-box">
                    <div class="player-info">
                        <div class="player-info-left">
                        <div class="player-name">南方机器人</div>
                        <div class="player-chips">1000 筹码</div>
                        </div>
                        <div class="player-info-right">
                        <div class="player-bet">下注: 0</div>
                        </div>
                    </div>
                    <div class="opponent-cards" id="opponent-2-cards"></div>
                    </div>
                </div>
                
                <div class="player-position player-position-3">
                    <div class="player-box" id="player-3-box">
                    <div class="player-info">
                        <div class="player-info-left">
                        <div class="player-name">西方机器人</div>
                        <div class="player-chips">1000 筹码</div>
                        </div>
                        <div class="player-info-right">
                        <div class="player-bet">下注: 0</div>
                        </div>
                    </div>
                    <div class="opponent-cards" id="opponent-3-cards"></div>
                    </div>
                </div>
                </div>
            </div>
            
            <div class="rules-panel">
                <h3>德州扑克规则</h3>
                <ul>
                <li>每位玩家获得2张底牌，桌面上5张公共牌。</li>
                <li>使用手上的2张牌和桌面上的5张牌中任意选择5张组成最佳牌型。</li>
                <li>游戏分为四个阶段: 翻前、翻牌、转牌、河牌。</li>
                <li>牌型从高到低: 皇家同花顺、同花顺、四条、葫芦、同花、顺子、三条、两对、一对、高牌。</li>
                </ul>
            </div>
            </div>
        </div>
        `;
        
        // 添加到文档
        document.querySelector('.container').appendChild(cardGameElement);
        
        // 设置页面样式
        this.applyStyles();
        
        // 显示页面
        setTimeout(() => {
        cardGameElement.classList.add('open');
        this.isOpen = true;
        
        // 添加返回按钮事件
        document.getElementById('card-game-back-btn').addEventListener('click', () => {
            this.hide();
        });
        
        // 添加游戏相关操作的事件监听
        this.setupEventListeners();
        }, 100);
    },
    
    // 隐藏德州扑克游戏页面
    hide: function() {
      const cardGameElement = document.getElementById('card-game-page');
      if (!cardGameElement) return;
      
      cardGameElement.classList.remove('open');
      
      // 延迟移除元素
      setTimeout(() => {
        cardGameElement.remove();
        this.isOpen = false;
        console.log('关闭德州扑克游戏页面');
        
        // 恢复主页面显示
        document.querySelector('.season-controls').style.display = 'flex';
        document.getElementById('games-btn').style.display = 'inline-block';
        document.getElementById('games-selection').style.display = 'none';
        document.getElementById('snake-game').style.display = 'none';
        document.getElementById('tetris-game').style.display = 'none';
        const pageTitle = document.getElementById('page-title') || document.querySelector('.container h1');
        if (pageTitle) {
          pageTitle.style.display = 'block';
        }
      }, 300);
    },
    
    // 应用德州扑克游戏页面样式
    applyStyles: function() {
      // 如果已经添加过样式则不重复添加
      if (document.getElementById('card-game-styles-link')) return;
      
      // 创建链接元素，加载外部 CSS 文件
      const linkElement = document.createElement('link');
      linkElement.id = 'card-game-styles-link';
      linkElement.rel = 'stylesheet';
      linkElement.href = './cardGame.css?v=' + new Date().getTime(); // 添加时间戳防止缓存
      
      // 添加到文档头部
      document.head.appendChild(linkElement);
    },
    
    // 设置事件监听器
    setupEventListeners: function() {
      // 新游戏按钮
      document.getElementById('new-game-btn').addEventListener('click', () => {
        this.startNewGame();
      });
      
      // 跟注按钮
      document.getElementById('call-btn').addEventListener('click', () => {
        this.playerCall();
      });
      
      // 加注按钮
      document.getElementById('raise-btn').addEventListener('click', () => {
        this.showBetControls();
      });
      
      // 让牌按钮
      document.getElementById('check-btn').addEventListener('click', () => {
        this.playerCheck();
      });
      
      // 弃牌按钮
      document.getElementById('fold-btn').addEventListener('click', () => {
        this.playerFold();
      });
      
      // 确认加注按钮
      document.getElementById('confirm-bet').addEventListener('click', () => {
        this.playerRaise(parseInt(document.getElementById('bet-amount').value));
      });
      
      // 取消加注按钮
      document.getElementById('cancel-bet').addEventListener('click', () => {
        this.hideBetControls();
      });
      
      // 加注滑块事件
      const betSlider = document.getElementById('bet-slider');
      const betAmount = document.getElementById('bet-amount');
      
      betSlider.addEventListener('input', () => {
        betAmount.value = betSlider.value;
      });
      
      betAmount.addEventListener('input', () => {
        betSlider.value = betAmount.value;
      });
    },
    
    // 显示加注控件
    showBetControls: function() {
      const betControls = document.querySelector('.bet-controls');
      betControls.style.display = 'block';
      
      const player = this.players[0]; // 玩家索引为0
      const minRaise = Math.max(this.currentBet * 2, this.minBet);
      const maxRaise = player.chips;
      
      const betSlider = document.getElementById('bet-slider');
      const betAmount = document.getElementById('bet-amount');
      
      betSlider.min = minRaise;
      betSlider.max = maxRaise;
      betSlider.value = minRaise;
      
      betAmount.min = minRaise;
      betAmount.max = maxRaise;
      betAmount.value = minRaise;
    },
    
    // 隐藏加注控件
    hideBetControls: function() {
      const betControls = document.querySelector('.bet-controls');
      betControls.style.display = 'none';
    },
    
    // 开始新游戏
    startNewGame: function() {
      // 重置游戏状态
      this.resetGame();
      
      // 显示开始游戏消息
      this.showMessage('游戏开始！正在洗牌发牌...');
      
      // 创建新牌组
      this.createNewDeck().then(() => {
        // 设置盲注
        this.setBlinds();
        
        // 发底牌
        this.dealHoleCards().then(() => {
          // 开始第一轮下注
          this.startBettingRound();
        });
      }).catch(error => {
        console.error('启动游戏时出错:', error);
        this.showMessage('启动游戏失败: ' + error.message);
      });
    },
    
    // 重置游戏状态
    resetGame: function() {
      this.gamePhase = "idle";
      this.communityCards = [];
      this.pot = 0;
      this.currentBet = 0;
      
      // 重置玩家状态
      this.players.forEach(player => {
        player.hand = [];
        player.bet = 0;
        player.folded = false;
        player.allIn = false;
        player.handRank = null;
      });
      
      // 轮换庄家位置
      this.rotateDealerPosition();
      
      // 清空桌面
      document.getElementById('community-cards-area').innerHTML = '';
      document.getElementById('player-cards').innerHTML = '';
      document.querySelectorAll('.opponent-cards').forEach(elem => {
        elem.innerHTML = '';
      });
      
      // 更新界面显示
      this.updateGameInfo();
      this.updatePhaseDisplay();
    },
    
    // 轮换庄家位置
    rotateDealerPosition: function() {
      this.dealerIndex = (this.dealerIndex + 1) % 4;
      this.smallBlindIndex = (this.dealerIndex + 1) % 4;
      this.bigBlindIndex = (this.dealerIndex + 2) % 4;
      this.activePlayerIndex = (this.dealerIndex + 3) % 4; // 从大盲注后第一个玩家开始行动
    },
    
    // 创建新的牌组
    createNewDeck: function() {
      return new Promise((resolve, reject) => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
          .then(response => {
            if (!response.ok) {
              throw new Error('API 请求失败');
            }
            return response.json();
          })
          .then(data => {
            this.deckId = data.deck_id;
            resolve();
          })
          .catch(error => {
            console.error('创建牌组时出错:', error);
            reject(error);
          });
      });
    },
    
    // 设置盲注
    setBlinds: function() {
      // 小盲注
      const smallBlindPlayer = this.players[this.smallBlindIndex];
      smallBlindPlayer.chips -= this.smallBlindAmount;
      smallBlindPlayer.bet = this.smallBlindAmount;
      
      // 大盲注
      const bigBlindPlayer = this.players[this.bigBlindIndex];
      bigBlindPlayer.chips -= this.bigBlindAmount;
      bigBlindPlayer.bet = this.bigBlindAmount;
      
      // 设置当前最高下注
      this.currentBet = this.bigBlindAmount;
      
      // 更新底池
      this.pot = this.smallBlindAmount + this.bigBlindAmount;
      
      // 更新界面
      this.updatePlayerInfo();
      this.updateGameInfo();
      
      this.showMessage(`${smallBlindPlayer.name} 下小盲注 ${this.smallBlindAmount} 筹码，${bigBlindPlayer.name} 下大盲注 ${this.bigBlindAmount} 筹码`);
    },
    
    // 发底牌
    dealHoleCards: function() {
      return new Promise((resolve, reject) => {
        // 为每位玩家各抽2张牌
        fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=8`)
          .then(response => {
            if (!response.ok) {
              throw new Error('API 请求失败');
            }
            return response.json();
          })
          .then(data => {
            // 分配底牌给各个玩家
            for (let i = 0; i < this.players.length; i++) {
              this.players[i].hand = [
                data.cards[i * 2],
                data.cards[i * 2 + 1]
              ];
            }
            
            // 更新游戏阶段
            this.gamePhase = "preflop";
            this.updatePhaseDisplay();
            
            // 显示玩家的底牌
            this.showPlayerCards();
            
            // 显示AI玩家的底牌背面
            this.showOpponentCardBacks();
            
            resolve();
          })
          .catch(error => {
            console.error('发牌时出错:', error);
            reject(error);
          });
      });
    },
    
    // 显示玩家的底牌
    showPlayerCards: function() {
        const playerCardsElement = document.getElementById('player-cards');
        playerCardsElement.innerHTML = '';
        
        const playerHand = this.players[0].hand;
        
        playerHand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
        playerCardsElement.appendChild(cardElement);
        });
    },
    
    // 显示电脑玩家的牌背
    showOpponentCardBacks: function() {
        for (let i = 1; i <= 3; i++) {
        const opponentCardsElement = document.getElementById(`opponent-${i}-cards`);
        opponentCardsElement.innerHTML = '';
        
        // 每个电脑玩家有两张牌
        for (let j = 0; j < 2; j++) {
            const cardElement = document.createElement('div');
            cardElement.className = 'card face-down';
            opponentCardsElement.appendChild(cardElement);
        }
        }
    },
    
    // 显示电脑玩家的牌面
    showOpponentCards: function() {
        for (let i = 1; i <= 3; i++) {
        if (!this.players[i].folded) {
            const opponentCardsElement = document.getElementById(`opponent-${i}-cards`);
            opponentCardsElement.innerHTML = '';
            
            this.players[i].hand.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
            opponentCardsElement.appendChild(cardElement);
            });
        }
        }
    },
    
    // 开始下注轮
    startBettingRound: function() {
      // 更新下注轮显示
      this.showMessage(`${this.gamePhaseNames[this.gamePhase]}阶段开始`);
      
      // 允许玩家操作
      this.enablePlayerActions();
      
      // 如果当前不是玩家行动，则执行AI的行动
      if (this.activePlayerIndex !== 0) {
        this.processAIAction();
      }
    },
    
    // 处理AI行动
    processAIAction: function() {
      // 禁用玩家操作按钮
      this.disablePlayerActions();
      
      setTimeout(() => {
        const activePlayer = this.players[this.activePlayerIndex];
        
        // 如果玩家已弃牌或者全下，跳过他的行动
        if (activePlayer.folded || activePlayer.allIn) {
          this.nextPlayer();
          return;
        }
        
        // 简单AI逻辑
        const action = this.getAIAction(activePlayer);
        
        switch (action.type) {
          case 'fold':
            activePlayer.folded = true;
            this.playersInHand--;
            this.showMessage(`${activePlayer.name} 弃牌`);
            break;
            
          case 'check':
            this.showMessage(`${activePlayer.name} 让牌`);
            break;
            
          case 'call':
            const callAmount = this.currentBet - activePlayer.bet;
            activePlayer.chips -= callAmount;
            this.pot += callAmount;
            activePlayer.bet = this.currentBet;
            this.showMessage(`${activePlayer.name} 跟注 ${callAmount} 筹码`);
            break;
            
          case 'raise':
            const raiseToAmount = action.amount;
            const raiseAmount = raiseToAmount - activePlayer.bet;
            activePlayer.chips -= raiseAmount;
            this.pot += raiseAmount;
            activePlayer.bet = raiseToAmount;
            this.currentBet = raiseToAmount;
            this.showMessage(`${activePlayer.name} 加注到 ${raiseToAmount} 筹码`);
            break;
        }
        
        // 更新界面
        this.updatePlayerInfo();
        this.updateGameInfo();
        
        // 转到下一个玩家
        this.nextPlayer();
      }, 1000);
    },
    
    // 获取AI行动决策
    getAIAction: function(player) {
      // 实现简单的AI逻辑
      const callAmount = this.currentBet - player.bet;
      
      // 如果可以让牌（没有人下注）
      if (this.currentBet === 0 || player.bet === this.currentBet) {
        // 70%的概率让牌，30%的概率加注
        if (Math.random() < 0.7) {
          return { type: 'check' };
        } else {
          const raiseAmount = Math.min(player.chips, this.minBet * 2);
          return { type: 'raise', amount: this.currentBet + raiseAmount };
        }
      }
      
      // 需要跟注或弃牌的情况
      // 简单起见，根据筹码量和随机因素决定
      const callRatio = callAmount / this.pot;
      
      if (callRatio > 0.5 || Math.random() < 0.3) {
        // 弃牌
        return { type: 'fold' };
      } else if (Math.random() < 0.7) {
        // 跟注
        return { type: 'call' };
      } else {
        // 加注
        const raiseAmount = Math.min(player.chips, callAmount * 2);
        return { type: 'raise', amount: this.currentBet + raiseAmount };
      }
    },
    
    // 玩家跟注
    playerCall: function() {
      const player = this.players[0];
      const callAmount = this.currentBet - player.bet;
      
      if (callAmount > player.chips) {
        // 筹码不够，全下
        this.pot += player.chips;
        player.bet += player.chips;
        player.chips = 0;
        player.allIn = true;
        this.showMessage('你的筹码不足，自动全下');
      } else {
        player.chips -= callAmount;
        this.pot += callAmount;
        player.bet = this.currentBet;
        this.showMessage(`你跟注 ${callAmount} 筹码`);
      }
      
      // 更新界面
      this.updatePlayerInfo();
      this.updateGameInfo();
      
      // 转到下一个玩家
      this.nextPlayer();
    },
    
    // 玩家让牌
    playerCheck: function() {
      this.showMessage('你让牌');
      
      // 转到下一个玩家
      this.nextPlayer();
    },
    
    // 玩家加注
    playerRaise: function(amount) {
      const player = this.players[0];
      const raiseAmount = amount - player.bet;
      
      if (amount < this.currentBet * 2) {
        this.showMessage('加注金额必须至少是当前注码的两倍');
        return;
      }
      
      if (raiseAmount > player.chips) {
        this.showMessage('你的筹码不足');
        return;
      }
      
      player.chips -= raiseAmount;
      this.pot += raiseAmount;
      player.bet = amount;
      this.currentBet = amount;
      
      this.showMessage(`你加注到 ${amount} 筹码`);
      
      // 隐藏加注控件
      this.hideBetControls();
      
      // 更新界面
      this.updatePlayerInfo();
      this.updateGameInfo();
      
      // 转到下一个玩家
      this.nextPlayer();
    },
    
    // 玩家弃牌
    playerFold: function() {
      this.players[0].folded = true;
      this.playersInHand--;
      this.showMessage('你弃牌了');
      
      // 更新界面
      this.updatePlayerInfo();
      
      // 如果只有一名玩家未弃牌，结束游戏
      if (this.playersInHand === 1) {
        this.endHand();
        return;
      }
      
      // 转到下一个玩家
      this.nextPlayer();
    },
    
    // 转到下一个玩家
    nextPlayer: function() {
      let initialActivePlayer = this.activePlayerIndex;
      
      do {
        this.activePlayerIndex = (this.activePlayerIndex + 1) % 4;
        
        // 如果所有玩家都行动过一次，进入下一阶段
        if (this.activePlayerIndex === initialActivePlayer || this.checkRoundComplete()) {
          this.nextGamePhase();
          return;
        }
        
        // 跳过已弃牌或全下的玩家
        if (this.players[this.activePlayerIndex].folded || this.players[this.activePlayerIndex].allIn) {
          continue;
        }
        
        break;
      } while (true);
      
      // 高亮显示当前行动玩家
      this.highlightActivePlayer();
      
      // 如果是玩家行动，启用操作按钮
      if (this.activePlayerIndex === 0) {
        this.enablePlayerActions();
      } else {
        // 如果是AI行动，处理AI行动
        this.processAIAction();
      }
    },
    
    // 检查当前下注轮是否完成
    checkRoundComplete: function() {
      let highestBet = 0;
      let allSameBet = true;
      
      // 找出最高下注
      for (let player of this.players) {
        if (!player.folded && !player.allIn) {
          highestBet = Math.max(highestBet, player.bet);
        }
      }
      
      // 检查所有未弃牌的玩家是否都下了相同的注码
      for (let player of this.players) {
        if (!player.folded && !player.allIn && player.bet !== highestBet) {
          allSameBet = false;
          break;
        }
      }
      
      return allSameBet;
    },
    
    // 进入下一游戏阶段
    nextGamePhase: function() {
      // 重置玩家下注
      this.players.forEach(player => {
        player.bet = 0;
      });
      this.currentBet = 0;
      
      // 根据当前阶段确定下一阶段
      switch (this.gamePhase) {
        case "preflop":
          this.gamePhase = "flop";
          this.dealFlop();
          break;
          
        case "flop":
          this.gamePhase = "turn";
          this.dealTurn();
          break;
          
        case "turn":
          this.gamePhase = "river";
          this.dealRiver();
          break;
          
        case "river":
          this.gamePhase = "showdown";
          this.showdown();
          break;
      }
    },
    
    // 发翻牌
    dealFlop: function() {
      fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=3`)
        .then(response => {
          if (!response.ok) {
            throw new Error('API 请求失败');
          }
          return response.json();
        })
        .then(data => {
          this.communityCards = [...data.cards];
          this.showCommunityCards();
          this.updatePhaseDisplay();
          
          // 开始新一轮下注
          this.activePlayerIndex = this.smallBlindIndex;
          this.startBettingRound();
        })
        .catch(error => {
          console.error('发翻牌时出错:', error);
          this.showMessage('发翻牌失败：' + error.message);
        });
    },
    
    // 发转牌
    dealTurn: function() {
      fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .then(response => {
          if (!response.ok) {
            throw new Error('API 请求失败');
          }
          return response.json();
        })
        .then(data => {
          this.communityCards.push(data.cards[0]);
          this.showCommunityCards();
          this.updatePhaseDisplay();
          
          // 开始新一轮下注
          this.activePlayerIndex = this.smallBlindIndex;
          this.startBettingRound();
        })
        .catch(error => {
          console.error('发转牌时出错:', error);
          this.showMessage('发转牌失败：' + error.message);
        });
    },
    
    // 发河牌
    dealRiver: function() {
      fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
        .then(response => {
          if (!response.ok) {
            throw new Error('API 请求失败');
          }
          return response.json();
        })
        .then(data => {
          this.communityCards.push(data.cards[0]);
          this.showCommunityCards();
          this.updatePhaseDisplay();
          
          // 开始新一轮下注
          this.activePlayerIndex = this.smallBlindIndex;
          this.startBettingRound();
        })
        .catch(error => {
          console.error('发河牌时出错:', error);
          this.showMessage('发河牌失败：' + error.message);
        });
    },
    
    // 摊牌阶段
    showdown: function() {
      this.updatePhaseDisplay();
      this.showMessage('摊牌！');
      
      // 显示所有未弃牌玩家的底牌
      this.showOpponentCards();
      
      // 计算每个未弃牌玩家的最佳牌型
      this.evaluateHands();
      
      // 确定赢家
      this.determineWinner();
    },
    
    // 计算每个玩家的最佳牌型
    evaluateHands: function() {
      // 简化版的牌型评估
      this.players.forEach(player => {
        if (!player.folded) {
          // 在实际游戏中，这里应该实现真正的牌型计算
          // 这里使用随机值模拟牌型强度
          player.handRank = Math.floor(Math.random() * 10);
        }
      });
    },
    
    // 确定赢家
    determineWinner: function() {
      let highestRank = -1;
      let winners = [];
      
      // 找出最高牌型
      this.players.forEach(player => {
        if (!player.folded) {
          if (player.handRank > highestRank) {
            highestRank = player.handRank;
            winners = [player];
          } else if (player.handRank === highestRank) {
            winners.push(player);
          }
        }
      });
      
      // 分配筹码给赢家
      const winAmount = Math.floor(this.pot / winners.length);
      
      winners.forEach(winner => {
        winner.chips += winAmount;
      });
      
      // 显示赢家信息
      if (winners.length === 1) {
        this.showMessage(`${winners[0].name} 赢得了 ${winAmount} 筹码!`);
      } else {
        const winnerNames = winners.map(w => w.name).join(', ');
        this.showMessage(`平局！${winnerNames} 每人赢得 ${winAmount} 筹码!`);
      }
      
      // 更新界面
      this.updatePlayerInfo();
      
      // 提供开始新一轮的选项
      document.getElementById('new-game-btn').disabled = false;
      
      // 检查游戏是否应该结束（玩家没有筹码）
      if (this.players[0].chips <= 0) {
        this.showMessage('你的筹码用完了！游戏结束');
      }
    },
    
    // 结束当前牌局
    endHand: function() {
      // 找出未弃牌的玩家
      let winner = this.players.find(player => !player.folded);
      
      // 给赢家加筹码
      winner.chips += this.pot;
      
      this.showMessage(`所有其他玩家都弃牌了。${winner.name} 赢得 ${this.pot} 筹码!`);
      
      // 更新界面
      this.updatePlayerInfo();
      
      // 提供开始新一轮的选项
      document.getElementById('new-game-btn').disabled = false;
      
      // 摊牌
      if (!winner.isPlayer) {
        // 如果赢家不是玩家，显示他的底牌
        this.showOpponentCards();
      }
    },
    
    // 显示公共牌
    showCommunityCards: function() {
      const communityCardsArea = document.getElementById('community-cards-area');
      communityCardsArea.innerHTML = '';
      
      this.communityCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<img src="${card.image}" alt="${card.value} of ${card.suit}">`;
        communityCardsArea.appendChild(cardElement);
      });
    },
    
    // 高亮显示当前行动玩家
    highlightActivePlayer: function() {
        // 移除所有高亮
        document.querySelectorAll('.player-box').forEach(elem => {
        elem.classList.remove('active');
        });
        
        // 添加高亮给当前玩家
        document.getElementById(`player-${this.activePlayerIndex}-box`).classList.add('active');
    },
    
    // 启用玩家操作按钮
    enablePlayerActions: function() {
      const callBtn = document.getElementById('call-btn');
      const raiseBtn = document.getElementById('raise-btn');
      const checkBtn = document.getElementById('check-btn');
      const foldBtn = document.getElementById('fold-btn');
      
      // 只有当前玩家行动时才启用
      if (this.activePlayerIndex === 0) {
        const player = this.players[0];
        
        // 如果当前没有下注或者玩家已经跟注到最高注码，可以让牌
        if (this.currentBet === 0 || player.bet === this.currentBet) {
          checkBtn.disabled = false;
        } else {
          checkBtn.disabled = true;
        }
        
        // 如果有人下注且和玩家当前注码不同，可以跟注
        if (this.currentBet > 0 && this.currentBet !== player.bet) {
          callBtn.disabled = false;
        } else {
          callBtn.disabled = true;
        }
        
        // 只要玩家有足够的筹码，就可以加注
        raiseBtn.disabled = player.chips <= this.currentBet;
        
        // 始终可以弃牌
        foldBtn.disabled = false;
      } else {
        // 不是玩家行动时，禁用所有操作按钮
        this.disablePlayerActions();
      }
    },
    
    // 禁用玩家操作按钮
    disablePlayerActions: function() {
      document.getElementById('call-btn').disabled = true;
      document.getElementById('raise-btn').disabled = true;
      document.getElementById('check-btn').disabled = true;
      document.getElementById('fold-btn').disabled = true;
    },
    
    // 更新界面上的游戏信息
    updateGameInfo: function() {
      document.getElementById('pot-amount').textContent = this.pot;
    },
    
    // 更新玩家信息
    updatePlayerInfo: function() {
        // 更新玩家信息
        document.querySelector('#player-0-box .player-chips').textContent = `${this.players[0].chips} 筹码`;
        document.querySelector('#player-0-box .player-bet').textContent = `下注: ${this.players[0].bet}`;
        
        // 更新电脑玩家信息
        for (let i = 1; i <= 3; i++) {
        document.querySelector(`#player-${i}-box .player-chips`).textContent = `${this.players[i].chips} 筹码`;
        document.querySelector(`#player-${i}-box .player-bet`).textContent = `下注: ${this.players[i].bet}`;
        
        // 如果玩家已弃牌，添加弃牌标记
        const playerBox = document.getElementById(`player-${i}-box`);
        if (this.players[i].folded) {
            playerBox.classList.add('folded');
        } else {
            playerBox.classList.remove('folded');
        }
        }
        
        // 玩家弃牌显示
        if (this.players[0].folded) {
        document.getElementById('player-0-box').classList.add('folded');
        } else {
        document.getElementById('player-0-box').classList.remove('folded');
        }
        
        // 更新庄家、小盲注和大盲注标记
        this.updatePositionMarkers();
    },

    // 添加一个新函数来更新位置标记
    updatePositionMarkers: function() {
        // 先清除所有标记
        document.querySelectorAll('.player-marker').forEach(marker => marker.remove());
        
        // 添加庄家标记
        const dealerBox = document.getElementById(`player-${this.dealerIndex}-box`);
        const dealerMarker = document.createElement('div');
        dealerMarker.className = 'player-marker dealer-marker';
        dealerMarker.textContent = 'D';
        dealerBox.appendChild(dealerMarker);
        
        // 添加小盲注标记
        const sbBox = document.getElementById(`player-${this.smallBlindIndex}-box`);
        const sbMarker = document.createElement('div');
        sbMarker.className = 'player-marker small-blind-marker';
        sbMarker.textContent = 'SB';
        sbBox.appendChild(sbMarker);
        
        // 添加大盲注标记
        const bbBox = document.getElementById(`player-${this.bigBlindIndex}-box`);
        const bbMarker = document.createElement('div');
        bbMarker.className = 'player-marker big-blind-marker';
        bbMarker.textContent = 'BB';
        bbBox.appendChild(bbMarker);
    },
    
    // 更新游戏阶段显示
    updatePhaseDisplay: function() {
      document.getElementById('game-phase').textContent = this.gamePhaseNames[this.gamePhase] || '未开始';
    },
    
    // 显示游戏消息
    showMessage: function(message) {
      const messageElement = document.getElementById('game-message');
      messageElement.textContent = message;
      
      console.log(`游戏消息: ${message}`);
      
      // 自动隐藏消息（可选）
      // setTimeout(() => {
      //   messageElement.textContent = '';
      // }, 5000);
    },
    
    // 游戏阶段名称
    gamePhaseNames: {
      "idle": "未开始",
      "preflop": "翻前",
      "flop": "翻牌",
      "turn": "转牌",
      "river": "河牌",
      "showdown": "摊牌"
    }
  };
  
  // 导出德州扑克游戏对象，供其他模块使用
  window.cardGame = cardGame;
  
  // 初始化德州扑克游戏功能
  document.addEventListener('DOMContentLoaded', () => {
    cardGame.init();
  });