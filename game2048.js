
const game2048 = {
    isOpen: false,
    isPlaying: false,
    score: 0,
    highScore: 0,
    board: [],
    size: 4,
    lastMove: null,
    canUndo: false,
    hasMoved: false,
    hasWon: false,
    
    // 初始化游戏
    init: function() {
      // 加载本地存储的高分
      this.highScore = localStorage.getItem('game2048HighScore') || 0;
      
      // 设置游戏板大小
      const grid = document.getElementById('game-grid');
      if (grid) {
        grid.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        
        // 创建初始单元格
        grid.innerHTML = '';
        for (let i = 0; i < this.size * this.size; i++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          cell.id = `cell-${Math.floor(i / this.size)}-${i % this.size}`;
          grid.appendChild(cell);
        }
      }
      
      // 更新高分显示
      const highScoreElement = document.getElementById('game-2048-high-score');
      if (highScoreElement) {
        highScoreElement.textContent = this.highScore;
      }
      
      // 设置事件监听
      this.setupEventListeners();
    },
    
    // 设置事件监听
    setupEventListeners: function() {
      // 按键事件
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen || !this.isPlaying) return;
        
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            e.preventDefault();
            this.move('up');
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            e.preventDefault();
            this.move('down');
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            e.preventDefault();
            this.move('left');
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            e.preventDefault();
            this.move('right');
            break;
          case 'p':
          case 'P':
            e.preventDefault();
            this.togglePause();
            break;
        }
      });
      
      // 触摸事件
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;
      
      const gameBoard = document.querySelector('.game-2048-board');
      if (gameBoard) {
        gameBoard.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        gameBoard.addEventListener('touchend', (e) => {
          if (!this.isOpen || !this.isPlaying) return;
          
          touchEndX = e.changedTouches[0].screenX;
          touchEndY = e.changedTouches[0].screenY;
          
          const diffX = touchEndX - touchStartX;
          const diffY = touchEndY - touchStartY;
          
          // 判断手势方向
          if (Math.abs(diffX) > Math.abs(diffY)) {
            // 横向滑动
            if (diffX > 20) {
              this.move('right');
            } else if (diffX < -20) {
              this.move('left');
            }
          } else {
            // 纵向滑动
            if (diffY > 20) {
              this.move('down');
            } else if (diffY < -20) {
              this.move('up');
            }
          }
        }, { passive: true });
      }
      
      // 按钮事件
      const newGameBtn = document.getElementById('game-2048-new-btn');
      if (newGameBtn) {
        newGameBtn.addEventListener('click', () => this.startNewGame());
      }
      
      const resetBtn = document.getElementById('game-2048-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.resetGame());
      }
      
    // 修改backBtn的事件处理
    const backBtn = document.getElementById('game-2048-back-btn');
    if (backBtn) {
    backBtn.addEventListener('click', () => {
        this.hide();
        // 使用可靠的方式显示游戏选择界面
        const gamesSelection = document.getElementById('games-selection');
        if (gamesSelection) {
        gamesSelection.style.display = 'block';
        }
    });
    }
      
      const pauseBtn = document.getElementById('game-2048-pause-btn');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', () => this.togglePause());
      }
      
// filepath: [game2048.js](http://_vscodecontentref_/0)
// 修改submitBtn的事件处理，添加本地排行榜支持
const submitBtn = document.getElementById('game-2048-submit-btn');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    try {
      const select = document.getElementById('game-2048-player-select');
      const customInput = document.getElementById('game-2048-custom-name');
      let playerName = '';
      
      if (customInput && customInput.value.trim()) {
        playerName = customInput.value.trim();
      } else if (select && select.value) {
        playerName = select.value;
      } else {
        this.showMessage('请选择或输入玩家名称', 2000);
        return;
      }
      
      // 禁用按钮防止重复提交，但不依赖submitScore函数处理按钮状态
      submitBtn.disabled = true;
      submitBtn.textContent = '提交中...';
      
      // 创建本地存储记录
      const saveLocalScore = () => {
        try {
          // 保存玩家名到playerList
          let playerList = JSON.parse(localStorage.getItem('playerList') || '[]');
          if (!playerList.includes(playerName)) {
            playerList.push(playerName);
            // 限制玩家列表数量
            if (playerList.length > 20) {
              playerList = playerList.slice(-20);
            }
            localStorage.setItem('playerList', JSON.stringify(playerList));
          }
          
          // 保存分数到本地排行榜
          const localScore = {
            playerName: playerName,
            score: this.score,
            date: new Date().toISOString()
          };
          
          let localLeaderboard = JSON.parse(localStorage.getItem('game2048Leaderboard') || '[]');
          localLeaderboard.push(localScore);
          localLeaderboard.sort((a, b) => b.score - a.score);
          
          if (localLeaderboard.length > 10) {
            localLeaderboard = localLeaderboard.slice(0, 10);
          }
          
          localStorage.setItem('game2048Leaderboard', JSON.stringify(localLeaderboard));
          return true;
        } catch (localError) {
          console.error('保存本地分数失败:', localError);
          return false;
        }
      };

      // 保存本地分数（无论API是否成功）
      saveLocalScore();
      
      // 参考cardGame.js的实现，直接调用API
      fetch(`${API_URL || 'https://331600.xyz'}/submit-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          game: 'game2048', 
          player_name: playerName, 
          score: this.score 
        })
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // 成功提交到服务器
        alert("成绩提交成功!");
        document.getElementById('game-2048-modal').style.display = 'none';
      })
      .catch(e => {
        console.error('远程提交分数失败:', e);
        // 远程提交失败但本地已保存
        alert(`服务器连接失败，但成绩已保存在本地！${playerName}: ${this.score}`);
        document.getElementById('game-2048-modal').style.display = 'none';
      })
      .finally(() => {
        // 恢复按钮状态
        submitBtn.disabled = false;
        submitBtn.textContent = '提交成绩';
      });
    } catch (e) {
      console.error('处理提交按钮时出错:', e);
      // 恢复按钮状态
      submitBtn.disabled = false;
      submitBtn.textContent = '提交成绩';
    }
  });
}
      
// 排行榜按钮
const leaderboardBtn = document.getElementById('game-2048-leaderboard-btn');
if (leaderboardBtn) {
  leaderboardBtn.addEventListener('click', () => {
    const leaderboardContent = document.getElementById('game-2048-leaderboard-content');
    if (leaderboardContent) {
      // 切换显示状态
      if (leaderboardContent.style.display === 'none') {
        // 检查全局loadLeaderboard函数是否可用
        if (typeof window.loadLeaderboard === 'function') {
          window.loadLeaderboard('game2048', 'game-2048-leaderboard-content');
        } else {
          // 使用本地数据渲染排行榜
          try {
            const localLeaderboard = JSON.parse(localStorage.getItem('game2048Leaderboard') || '[]');
            this.renderLocalLeaderboard(localLeaderboard, leaderboardContent);
          } catch (e) {
            console.error('加载本地排行榜失败:', e);
            leaderboardContent.innerHTML = '<div style="padding:20px;text-align:center;color:#fff;">加载排行榜失败</div>';
          }
        }
        leaderboardContent.style.display = 'block';
      } else {
        leaderboardContent.style.display = 'none';
      }
    }
  });
}
      
      // 移动端控制按钮
      const upBtn = document.getElementById('game-2048-up-btn');
      if (upBtn) {
        upBtn.addEventListener('click', () => this.move('up'));
      }
      
      const downBtn = document.getElementById('game-2048-down-btn');
      if (downBtn) {
        downBtn.addEventListener('click', () => this.move('down'));
      }
      
      const leftBtn = document.getElementById('game-2048-left-btn');
      if (leftBtn) {
        leftBtn.addEventListener('click', () => this.move('left'));
      }
      
      const rightBtn = document.getElementById('game-2048-right-btn');
      if (rightBtn) {
        rightBtn.addEventListener('click', () => this.move('right'));
      }
      
      // 模态框关闭按钮
      const closeModalBtn = document.querySelector('#game-2048-modal .modal-close-btn');
      if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
          document.getElementById('game-2048-modal').style.display = 'none';
        });
      }
    },
    
    // 显示游戏界面
    show: function() {
      const gameContainer = document.getElementById('game-2048');
      if (gameContainer) {
        gameContainer.style.display = 'block';
        this.isOpen = true;
        
        // 每次显示游戏时重置游戏
        this.resetGame();
        
        // 加载玩家选择
        this.populatePlayerSelect();
      }
    },
    
    // 隐藏游戏界面
    hide: function() {
      const gameContainer = document.getElementById('game-2048');
      if (gameContainer) {
        gameContainer.style.display = 'none';
        this.isOpen = false;
        this.isPlaying = false;
      }
    },
    
    // 开始新游戏
    startNewGame: function() {
      this.score = 0;
      this.board = [];
      this.hasWon = false;
      this.isPlaying = true;
      
      // 初始化游戏板
      this.initializeBoard();
      
      // 添加两个初始方块
      this.addRandomTile();
      this.addRandomTile();
      
      // 更新显示
      this.updateBoard();
      this.updateScore(0);
      
      // 更新暂停按钮
      const pauseIcon = document.getElementById('game-2048-pause-icon');
      if (pauseIcon) {
        pauseIcon.src = './image/pause.svg';
      }
      
      this.showMessage('游戏开始！', 1500);
    },
    
    // 重置游戏
    resetGame: function() {
      this.startNewGame();
    },
    
    // 初始化游戏板
    initializeBoard: function() {
      this.board = [];
      for (let i = 0; i < this.size; i++) {
        this.board.push(Array(this.size).fill(0));
      }
    },
    
    // 更新游戏板显示
    updateBoard: function() {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          const value = this.board[i][j];
          const cell = document.getElementById(`cell-${i}-${j}`);
          
          // 清除单元格内容
          while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
          }
          
          // 如果有值，添加方块
          if (value > 0) {
            const tile = document.createElement('div');
            tile.className = `tile tile-${value}`;
            tile.textContent = value;
            cell.appendChild(tile);
          }
        }
      }
    },
    
    // 添加随机方块
    addRandomTile: function() {
      // 获取所有空单元格
      const emptyCells = [];
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.board[i][j] === 0) {
            emptyCells.push({row: i, col: j});
          }
        }
      }
      
      // 如果有空单元格，随机选一个添加新方块
      if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        // 90%几率生成2，10%几率生成4
        this.board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
        return true;
      }
      
      return false;
    },
    
    // 移动方块
    move: function(direction) {
      if (!this.isPlaying) return;
      
      // 保存移动前的板状态，用于检测是否有移动
      const prevBoard = JSON.stringify(this.board);
      
      // 根据方向进行移动
      switch (direction) {
        case 'up':
          this.moveUp();
          break;
        case 'down':
          this.moveDown();
          break;
        case 'left':
          this.moveLeft();
          break;
        case 'right':
          this.moveRight();
          break;
      }
      
      // 检查是否有移动
      const currBoard = JSON.stringify(this.board);
      if (prevBoard !== currBoard) {
        // 有移动，添加新方块
        this.addRandomTile();
        this.updateBoard();
        
        // 检查游戏状态
        if (this.checkWin()) {
          this.showMessage('恭喜！你得到了2048！', 3000);
          this.hasWon = true;
        } else if (!this.canMove()) {
          this.gameOver();
        }
      }
    },
    
    // 向上移动
    moveUp: function() {
      for (let j = 0; j < this.size; j++) {
        let column = [];
        // 提取列
        for (let i = 0; i < this.size; i++) {
          if (this.board[i][j] !== 0) {
            column.push(this.board[i][j]);
          }
        }
        
        // 合并相同的方块
        column = this.mergeTiles(column);
        
        // 填充剩余位置
        while (column.length < this.size) {
          column.push(0);
        }
        
        // 更新列
        for (let i = 0; i < this.size; i++) {
          this.board[i][j] = column[i];
        }
      }
    },
    
    // 向下移动
    moveDown: function() {
      for (let j = 0; j < this.size; j++) {
        let column = [];
        // 提取列（从下往上）
        for (let i = this.size - 1; i >= 0; i--) {
          if (this.board[i][j] !== 0) {
            column.push(this.board[i][j]);
          }
        }
        
        // 合并相同的方块
        column = this.mergeTiles(column);
        
        // 填充剩余位置
        while (column.length < this.size) {
          column.push(0);
        }
        
        // 更新列（从下往上）
        for (let i = 0; i < this.size; i++) {
          this.board[this.size - 1 - i][j] = column[i];
        }
      }
    },
    
    // 向左移动
    moveLeft: function() {
      for (let i = 0; i < this.size; i++) {
        let row = [];
        // 提取行
        for (let j = 0; j < this.size; j++) {
          if (this.board[i][j] !== 0) {
            row.push(this.board[i][j]);
          }
        }
        
        // 合并相同的方块
        row = this.mergeTiles(row);
        
        // 填充剩余位置
        while (row.length < this.size) {
          row.push(0);
        }
        
        // 更新行
        for (let j = 0; j < this.size; j++) {
          this.board[i][j] = row[j];
        }
      }
    },
    
    // 向右移动
    moveRight: function() {
      for (let i = 0; i < this.size; i++) {
        let row = [];
        // 提取行（从右往左）
        for (let j = this.size - 1; j >= 0; j--) {
          if (this.board[i][j] !== 0) {
            row.push(this.board[i][j]);
          }
        }
        
        // 合并相同的方块
        row = this.mergeTiles(row);
        
        // 填充剩余位置
        while (row.length < this.size) {
          row.push(0);
        }
        
        // 更新行（从右往左）
        for (let j = 0; j < this.size; j++) {
          this.board[i][this.size - 1 - j] = row[j];
        }
      }
    },
    
    // 合并相同的方块
    mergeTiles: function(tiles) {
      // 合并相邻且相同的方块
      for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] === tiles[i + 1]) {
          tiles[i] *= 2;
          tiles.splice(i + 1, 1);
          
          // 更新分数
          this.updateScore(tiles[i]);
        }
      }
      
      return tiles;
    },
    
    // 更新分数
    updateScore: function(addedScore) {
      this.score += addedScore;
      
      // 更新分数显示
      const scoreElement = document.getElementById('game-2048-score');
      if (scoreElement) {
        scoreElement.textContent = this.score;
      }
      
      // 更新最高分
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('game2048HighScore', this.highScore);
        
        const highScoreElement = document.getElementById('game-2048-high-score');
        if (highScoreElement) {
          highScoreElement.textContent = this.highScore;
        }
      }
    },
    
    // 检查是否还能移动
    canMove: function() {
      // 检查是否有空单元格
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.board[i][j] === 0) {
            return true;
          }
        }
      }
      
      // 检查相邻单元格是否有相同的方块
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          // 检查右侧
          if (j < this.size - 1 && this.board[i][j] === this.board[i][j + 1]) {
            return true;
          }
          // 检查下方
          if (i < this.size - 1 && this.board[i][j] === this.board[i + 1][j]) {
            return true;
          }
        }
      }
      
      return false;
    },
    
    // 检查是否获胜
    checkWin: function() {
      if (this.hasWon) return false; // 已经赢了，不再检查
      
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.board[i][j] === 2048) {
            return true;
          }
        }
      }
      
      return false;
    },
    
    // 游戏结束
    gameOver: function() {
      this.isPlaying = false;
      
      // 更新暂停按钮
      const pauseIcon = document.getElementById('game-2048-pause-icon');
      if (pauseIcon) {
        pauseIcon.src = './image/start.svg';
      }
      
      this.showMessage('游戏结束！', 2000);
      setTimeout(() => {
        this.showGameOverModal();
      }, 1000);
    },
    
    // 显示游戏结束模态框
    showGameOverModal: function() {
      const modal = document.getElementById('game-2048-modal');
      const finalScore = document.getElementById('game-2048-final-score');
      
      if (modal && finalScore) {
        finalScore.textContent = this.score;
        modal.style.display = 'flex';
      }
    },
    
    // 切换暂停/继续游戏
    togglePause: function() {
      if (!this.isPlaying) {
        // 当前是暂停状态，继续游戏
        this.isPlaying = true;
        const pauseIcon = document.getElementById('game-2048-pause-icon');
        if (pauseIcon) {
          pauseIcon.src = './image/pause.svg';
        }
        this.showMessage('游戏继续', 1000);
      } else {
        // 当前是进行状态，暂停游戏
        this.isPlaying = false;
        const pauseIcon = document.getElementById('game-2048-pause-icon');
        if (pauseIcon) {
          pauseIcon.src = './image/start.svg';
        }
        this.showMessage('游戏暂停', 1000);
      }
    },
    
// 填充玩家选择器
populatePlayerSelect: function() {
    const playerSelect = document.getElementById('game-2048-player-select');
    if (!playerSelect) return;
    
    // 清空现有选项
    playerSelect.innerHTML = '<option value="">请选择</option>';
    
    // 优先使用scenes.js中的通用函数
    if (typeof window.populateSelect === 'function') {
      window.populateSelect('game-2048-player-select');
    } else if (typeof tianGangCharacters !== 'undefined' && Array.isArray(tianGangCharacters)) {
      // 直接使用tianGangCharacters变量
      tianGangCharacters.forEach(character => {
        const option = document.createElement('option');
        option.value = character;
        option.textContent = character;
        playerSelect.appendChild(option);
      });
    } else {
      // 如果以上方法都不可用，使用本地存储的玩家列表
      try {
        const playerList = JSON.parse(localStorage.getItem('playerList') || '[]');
        playerList.forEach(player => {
          const option = document.createElement('option');
          option.value = player;
          option.textContent = player;
          playerSelect.appendChild(option);
        });
      } catch (e) {
        console.error('解析玩家列表失败:', e);
      }
    }
  },

    
    // 显示提示信息
    showMessage: function(message, duration = 2000) {
      // 先检查是否已存在消息元素
      let messageElement = document.querySelector('.game-2048-message');
      
      if (!messageElement) {
        // 创建消息元素
        messageElement = document.createElement('div');
        messageElement.className = 'game-2048-message';
        messageElement.style.position = 'fixed';
        messageElement.style.bottom = '50px';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translateX(-50%)';
        messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        messageElement.style.color = 'white';
        messageElement.style.padding = '10px 20px';
        messageElement.style.borderRadius = '20px';
        messageElement.style.fontWeight = 'bold';
        messageElement.style.zIndex = '1000';
        messageElement.style.opacity = '0';
        messageElement.style.transition = 'opacity 0.3s';
        document.body.appendChild(messageElement);
      }
      
      // 设置消息内容
      messageElement.textContent = message;
      
      // 显示消息
      setTimeout(() => {
        messageElement.style.opacity = '1';
      }, 10);
      
      // 设置定时器隐藏消息
      setTimeout(() => {
        messageElement.style.opacity = '0';
      }, duration);
    },
    // 添加到game2048对象中的新方法
renderLocalLeaderboard: function(scores, leaderboardElement) {
    if (!scores.length) {
      leaderboardElement.innerHTML = '<div style="text-align:center;padding:20px;color:#fff;">暂无2048方块排行数据</div>';
      return;
    }
  
    // 创建表格
    let html = `
      <div class="leaderboard-header">2048方块排行榜 (本地)</div>
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>玩家</th>
            <th>得分</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    // 填充数据
    scores.slice(0, 10).forEach((score, index) => {
      const date = new Date(score.date);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      
      html += `
        <tr class="${index < 3 ? 'top-rank' : ''}">
          <td>${index + 1}</td>
          <td>${score.playerName}</td>
          <td>${score.score}</td>
          <td>${formattedDate}</td>
        </tr>
      `;
    });
  
    html += '</tbody></table>';
    
    // 添加本地数据提示
    html += '<div style="text-align:center;margin-top:10px;font-size:12px;color:#aaa;">* 数据仅保存在本地</div>';
    
    leaderboardElement.innerHTML = html;
  },

  };
  
  // 确保DOM加载完成后初始化游戏
  document.addEventListener('DOMContentLoaded', () => {
    game2048.init();
    
    // 添加游戏选择按钮事件
    const game2048Button = document.getElementById('g2048-select-btn');
    if (game2048Button) {
      game2048Button.addEventListener('click', () => {
        document.getElementById('games-selection').style.display = 'none';
        game2048.show();
      });
    }
  });