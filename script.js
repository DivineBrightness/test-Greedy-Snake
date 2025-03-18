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

  document.getElementById('snake-game-btn').addEventListener('click', () => {
      console.log('进入贪吃蛇游戏');
      toggleGameView('snake-game', true);
      const game = new SnakeGame();
      const leaderboardBtn = document.getElementById('snake-leaderboard-btn');
      const leaderboardContent = document.getElementById('snake-leaderboard-content');

      // 点击按钮显示/隐藏排行榜
      leaderboardBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // 阻止事件冒泡
          leaderboardContent.style.display = leaderboardContent.style.display === 'block' ? 'none' : 'block';
      });

      // 点击页面其他地方隐藏排行榜
      document.addEventListener('click', (e) => {
          if (!leaderboardContent.contains(e.target) && e.target !== leaderboardBtn) {
              leaderboardContent.style.display = 'none';
          }
      });

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
      document.getElementById('tetris-back-btn').addEventListener('click', () => {
          if (game.intervalId) clearInterval(game.intervalId);
          console.log('返回风景页面');
          toggleGameView('tetris-game', false);
      }, { once: true });
  });
});