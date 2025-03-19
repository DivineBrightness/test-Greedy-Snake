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
        document.getElementById('games-btn').style.display = hideElements ? 'none' : 'inline-block';
        document.getElementById('games-selection').style.display = (showGameId === 'games-selection') ? 'block' : 'none';
        document.getElementById('snake-game').style.display = (showGameId === 'snake-game') ? 'block' : 'none';
        document.getElementById('tetris-game').style.display = (showGameId === 'tetris-game') ? 'block' : 'none';
        const pageTitle = document.getElementById('page-title') || document.querySelector('.container h1');
        pageTitle.style.display = hideElements ? 'none' : 'block';
        
        // 根据是否显示游戏来决定是否显示季节装饰
        const decoration = document.querySelector('.seasonal-decoration');
        if (decoration) {
            decoration.style.display = hideElements ? (showGameId === 'games-selection' ? 'block' : 'none') : 'block';
        }
    };
  
    // 保存事件处理函数的引用，以便后续移除
    let snakeLeaderboardClickHandler;
    let snakeDocumentClickHandler;
    // 保存俄罗斯方块排行榜点击处理函数的引用
    let tetrisLeaderboardClickHandler;
  
    // 点击"小游戏"按钮显示游戏选择页面
    document.getElementById('games-btn').addEventListener('click', () => {
        console.log('进入游戏选择页面');
        toggleGameView('games-selection', true);
    });
  
    // 游戏选择页面的返回按钮
    document.getElementById('games-back-btn').addEventListener('click', () => {
        console.log('返回季节页面');
        toggleGameView(null, false);
    });
  
    // 从游戏选择页面进入贪吃蛇游戏
    document.getElementById('snake-select-btn').addEventListener('click', () => {
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
            console.log('返回游戏选择页面');
            toggleGameView('games-selection', true);
        }, { once: true });
    });
  
    // 从游戏选择页面进入俄罗斯方块游戏
    document.getElementById('tetris-select-btn').addEventListener('click', () => {
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
            console.log('返回游戏选择页面');
            toggleGameView('games-selection', true);
        }, { once: true });
    });
  });