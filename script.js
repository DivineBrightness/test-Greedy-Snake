// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 已加载');
    initializeScenes();
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
      document.querySelector('.season-container').style.display = hideElements ? 'none' : 'block';
      document.querySelector('.season-controls').style.display = hideElements ? 'none' : 'flex';
      document.getElementById('snake-game-btn').style.display = hideElements ? 'none' : 'block';
      document.getElementById('tetris-game-btn').style.display = hideElements ? 'none' : 'block';
      document.getElementById(showGameId).style.display = hideElements ? 'block' : 'none';
    };
  
    document.getElementById('snake-game-btn').addEventListener('click', () => {
      console.log('进入贪吃蛇游戏');
      toggleGameView('snake-game', true);
      const game = new SnakeGame();
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