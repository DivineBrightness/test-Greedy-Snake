// script.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM 已加载');
  changeSeason('spring');
  populateSelect('snake-player-select');
  populateSelect('tetris-player-select');

  const seasonButtons = document.querySelectorAll('.season-btn');
  console.log('找到的季节按钮数量：', seasonButtons.length);
  seasonButtons.forEach(button => {
      button.addEventListener('click', () => {
          const season = button.getAttribute('data-season');
          console.log('点击了季节按钮：', season);
          changeSeason(season);
      });
  });

  const toggleGameView = (showGameId, hideElements) => {
      document.querySelector('.season-controls').style.display = hideElements ? 'none' : 'flex';
      document.getElementById('snake-game-btn').style.display = hideElements ? 'none' : 'inline-block';
      document.getElementById('tetris-game-btn').style.display = hideElements ? 'none' : 'inline-block';
      document.getElementById(showGameId).style.display = hideElements ? 'block' : 'none';
      const pageTitle = document.getElementById('page-title') || document.querySelector('.container h1');
      pageTitle.style.display = hideElements ? 'none' : 'block';
  };

  // 保存事件处理函数的引用，以便后续移除
  let snakeLeaderboardClickHandler;
  let snakeDocumentClickHandler;
  // 保存俄罗斯方块排行榜点击处理函数的引用
  let tetrisLeaderboardClickHandler;

  document.getElementById('snake-game-btn').addEventListener('click', () => {
      console.log('进入贪吃蛇游戏');
      toggleGameView('snake-game', true);
      const game = new SnakeGame();
      const leaderboardBtn = document.getElementById('snake-leaderboard-btn');
      const leaderboardContent = document.getElementById('snake-leaderboard-content');

      // 移除旧的事件监听器（如果存在）
      if (snakeLeaderboardClickHandler) {
          leaderboardBtn.removeEventListener('click', snakeLeaderboardClickHandler);
      }
      if (snakeDocumentClickHandler) {
          document.removeEventListener('click', snakeDocumentClickHandler);
      }

      // 定义新的事件处理函数并保存引用
      snakeLeaderboardClickHandler = (e) => {
          e.stopPropagation(); // 阻止事件冒泡
          leaderboardContent.style.display = leaderboardContent.style.display === 'block' ? 'none' : 'block';
      };

      snakeDocumentClickHandler = (e) => {
          if (!leaderboardContent.contains(e.target) && e.target !== leaderboardBtn) {
              leaderboardContent.style.display = 'none';
          }
      };

      // 添加新的事件监听器
      leaderboardBtn.addEventListener('click', snakeLeaderboardClickHandler);
      document.addEventListener('click', snakeDocumentClickHandler);

      document.getElementById('back-btn').addEventListener('click', () => {
          if (game.intervalId) clearInterval(game.intervalId);
          console.log('返回风景页面');
          toggleGameView('snake-game', false);
      }, { once: true });
  });

  document.getElementById('tetris-game-btn').addEventListener('click', () => {
      console.log('进入俄罗斯方块游戏');
      toggleGameView('tetris-game', true);
      const game = new TetrisGame();
      
      // 为俄罗斯方块添加排行榜切换功能
      const tetrisLeaderboardBtn = document.getElementById('tetris-leaderboard-btn');
      const tetrisLeaderboardContent = document.getElementById('tetris-leaderboard-content');
      
      // 移除之前的事件监听器（如果存在）
      if (tetrisLeaderboardClickHandler) {
          tetrisLeaderboardBtn.removeEventListener('click', tetrisLeaderboardClickHandler);
      }
      
      // 定义新的事件处理函数并保存引用
      tetrisLeaderboardClickHandler = () => {
          console.log("点击了俄罗斯方块排行榜按钮");
          tetrisLeaderboardContent.style.display = 
              tetrisLeaderboardContent.style.display === 'block' ? 'none' : 'block';
      };
      
      // 添加新的事件监听器
      tetrisLeaderboardBtn.addEventListener('click', tetrisLeaderboardClickHandler);
      
      // 确保排行榜初始状态为隐藏
      tetrisLeaderboardContent.style.display = 'none';
      
      // 确保加载最新的排行榜数据
      loadLeaderboard("tetris", "tetris-leaderboard-content");
      
      document.getElementById('tetris-back-btn').addEventListener('click', () => {
          if (game.intervalId) clearInterval(game.intervalId);
          console.log('返回风景页面');
          toggleGameView('tetris-game', false);
      }, { once: true });
  });
});