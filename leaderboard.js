// leaderboard.js
const API_URL = "https://331600.xyz";

// 更新 submitScore 函数，保持HTML结构不变
async function submitScore(game, playerName, score) {
  const leaderboardElement = document.getElementById(game + "-leaderboard-content");
  const submitBtn = document.getElementById(game + "-submit-btn");
  submitBtn.disabled = true;
  
  // 显示提交状态，但不修改HTML结构
  const statusElement = document.createElement('div');
  statusElement.className = 'submit-status';
  statusElement.textContent = "提交中...";
  
  // 找到模态框内容区域
  const modalContent = submitBtn.closest('div');
  if (modalContent) {
    // 添加状态元素到模态框
    modalContent.appendChild(statusElement);
  }
  
  try {
    const response = await fetch(`${API_URL}/submit-score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game, player_name: playerName, score })
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "提交失败");
    
    // 更新状态信息
    statusElement.textContent = "提交成功！";
    statusElement.style.color = "green";
    
    // 重新加载排行榜数据
    await loadLeaderboard(game, game + "-leaderboard-content");
    
    // 3秒后关闭模态框
    setTimeout(() => {
      const modal = document.getElementById(game + "-modal");
      if (modal) modal.style.display = 'none';
      
      // 移除状态信息
      if (statusElement.parentNode) {
        statusElement.parentNode.removeChild(statusElement);
      }
    }, 3000);
    
  } catch (e) {
    // 显示错误但不改变HTML结构
    statusElement.textContent = `提交失败：${e.message}`;
    statusElement.style.color = "red";
  } finally {
    submitBtn.disabled = false;
  }
}

// 更新 loadLeaderboard 函数确保HTML结构一致
async function loadLeaderboard(game, elementId) {
  const leaderboardElement = document.getElementById(elementId);
  if (!leaderboardElement) {
    console.error(`未找到ID为 ${elementId} 的元素`);
    return;
  }
  
  try {
    // 首先确保排行榜元素具有正确的HTML结构
    if (!leaderboardElement.querySelector('.leaderboard-body')) {
      // 创建美化的HTML结构
      leaderboardElement.innerHTML = `
        <div class="leaderboard-header">
          <h3>${game === 'snake' ? '贪吃蛇' : '俄罗斯方块'} - 排行榜</h3>
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
            <div class="loading">加载中...</div>
          </div>
        </div>
      `;
      
      // 重新添加关闭按钮事件
      const closeBtn = leaderboardElement.querySelector('.leaderboard-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          leaderboardElement.style.display = 'none';
        });
      }
    } else {
      // 如果已经有正确结构，只更新加载中提示
      const leaderboardBody = leaderboardElement.querySelector('.leaderboard-body');
      leaderboardBody.innerHTML = '<div class="loading">加载中...</div>';
    }
    
    // 获取数据
    const response = await fetch(`${API_URL}/leaderboard?game=${game}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const scores = await response.json();
    const leaderboardBody = leaderboardElement.querySelector('.leaderboard-body');
    
    // 使用统一的处理函数
    renderScores(scores, game, leaderboardBody);
    
  } catch (error) {
    console.error('获取排行榜数据失败:', error);
    
    const leaderboardBody = leaderboardElement.querySelector('.leaderboard-body');
    if (leaderboardBody) {
      leaderboardBody.innerHTML = `<div class="error">获取排行榜数据失败: ${error.message}</div>`;
      
      // 模拟数据，确保界面依然可用
      const mockScores = [
        { player_name: "玩家1", score: 100 },
        { player_name: "玩家2", score: 80 },
        { player_name: "玩家3", score: 60 }
      ];
      
      // 如果API失败则使用模拟数据
      setTimeout(() => {
        renderScores(mockScores, game, leaderboardBody);
        leaderboardBody.insertAdjacentHTML('afterbegin', '<div class="mock-data-notice">使用模拟数据 (API连接失败)</div>');
      }, 1000);
    }
  }
}

// 修改 renderScores 函数
function renderScores(scores, game, leaderboardBody) {
  // 检查是否返回了有效数据
  if (!scores || !Array.isArray(scores) || scores.length === 0) {
    leaderboardBody.innerHTML = '<div class="no-data">暂无排行数据</div>';
    return;
  }
  
  // 处理重复玩家，只保留每个玩家的最高分
  const uniqueScores = [];
  const playerMap = new Map();
  
  scores.forEach(score => {
    const playerName = score.player_name || score.player || '未知玩家';
    // 如果玩家已存在且当前分数更高，则替换
    if (playerMap.has(playerName)) {
      const existingScore = playerMap.get(playerName);
      if (score.score > existingScore.score) {
        playerMap.set(playerName, score);
      }
    } else {
      // 新玩家，直接添加
      playerMap.set(playerName, score);
    }
  });
  
  // 将唯一玩家数据添加到数组
  playerMap.forEach(score => {
    uniqueScores.push(score);
  });
  
  // 重新按分数排序
  uniqueScores.sort((a, b) => b.score - a.score);
  
  // 渲染排行榜内容
  let html = '';
  uniqueScores.forEach((score, index) => {
    // 添加排名样式
    let rankClass = '';
    if (index === 0) rankClass = 'rank-1';
    else if (index === 1) rankClass = 'rank-2';
    else if (index === 2) rankClass = 'rank-3';
    
    html += `
      <div class="leaderboard-row">
        <div class="rank ${rankClass}">${index + 1}</div>
        <div class="player">${score.player_name || score.player || '未知玩家'}</div>
        <div class="score">${score.score}</div>
        <div class="date">${new Date().toLocaleDateString('zh-CN')}</div>
      </div>
    `;
  });
  
  leaderboardBody.innerHTML = html;
}

// 移除 DOMContentLoaded 中的重复事件绑定，避免冲突
document.addEventListener('DOMContentLoaded', () => {
  // 仅在游戏选择页面初始化时添加基本事件监听
  const tetrisLeaderboardBtn = document.getElementById('tetris-leaderboard-btn');
  const tetrisLeaderboardContent = document.getElementById('tetris-leaderboard-content');
  const snakeLeaderboardBtn = document.getElementById('snake-leaderboard-btn');
  const snakeLeaderboardContent = document.getElementById('snake-leaderboard-content');
  
  // 初始化关闭按钮功能
  const initCloseButtons = () => {
      const closeBtns = document.querySelectorAll('.leaderboard-close-btn');
      closeBtns.forEach(btn => {
          btn.addEventListener('click', () => {
              const panel = btn.closest('.leaderboard-panel');
              if (panel) panel.style.display = 'none';
          });
      });
  };
  
  // 执行初始化
  initCloseButtons();
  
  // 移除重复的点击事件绑定，这些将由 script.js 处理
  // 仅保留关闭按钮的功能
});