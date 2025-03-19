// leaderboard.js
const API_URL = "https://331600.xyz";

async function submitScore(game, playerName, score) {
  const leaderboardElement = document.getElementById(game + "-leaderboard-content");
  const submitBtn = document.getElementById(game + "-submit-btn");
  submitBtn.disabled = true;
  leaderboardElement.innerHTML = "<p>提交中...</p>";
  try {
    const response = await fetch(`${API_URL}/submit-score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game, player_name: playerName, score })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "提交失败");
    leaderboardElement.innerHTML = "<p>提交成功！</p>";
    await loadLeaderboard(game, game + "-leaderboard-content");
  } catch (e) {
    leaderboardElement.innerHTML = `<p>提交失败：${e.message}</p>`;
  } finally {
    submitBtn.disabled = false;
  }
}

// 修正 loadLeaderboard 函数中的API调用路径，使其与后端API路径匹配
async function loadLeaderboard(game, elementId) {
  const leaderboardElement = document.getElementById(elementId);
  if (!leaderboardElement) {
    console.error(`未找到ID为 ${elementId} 的元素`);
    return;
  }
  
  try {
    // 显示加载提示
    const leaderboardBody = leaderboardElement.querySelector('.leaderboard-body');
    if (leaderboardBody) {
      leaderboardBody.innerHTML = '<div class="loading">加载中...</div>';
    } else {
      // 如果没有找到.leaderboard-body元素，则直接在整个容器中显示加载信息
      leaderboardElement.innerHTML = '<div class="loading">加载中...</div>';
    }
    
    // 修改API路径，使用正确的路径 - /leaderboard?game=${game}
    const response = await fetch(`${API_URL}/leaderboard?game=${game}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const scores = await response.json();
    return processScores(scores, game, leaderboardElement, leaderboardBody);
    
  } catch (error) {
    console.error('获取排行榜数据失败:', error);
    
    // 适应两种可能的DOM结构
    const leaderboardBody = leaderboardElement.querySelector('.leaderboard-body');
    if (leaderboardBody) {
      leaderboardBody.innerHTML = `<div class="error">获取排行榜数据失败: ${error.message}</div>`;
    } else {
      leaderboardElement.innerHTML = `<div class="error">获取排行榜数据失败: ${error.message}<br>请检查API是否可用</div>`;
    }
    
    // 模拟数据，确保界面依然可用
    const mockScores = [
      { player_name: "玩家1", score: 100 },
      { player_name: "玩家2", score: 80 },
      { player_name: "玩家3", score: 60 }
    ];
    
    // 如果API失败则使用模拟数据
    setTimeout(() => {
      processScores(mockScores, game, leaderboardElement, leaderboardBody);
      
      // 添加提示说明这是模拟数据
      if (leaderboardBody) {
        leaderboardBody.insertAdjacentHTML('afterbegin', '<div class="mock-data-notice">使用模拟数据 (API连接失败)</div>');
      } else {
        leaderboardElement.insertAdjacentHTML('afterbegin', '<div class="mock-data-notice">使用模拟数据 (API连接失败)</div>');
      }
    }, 1000);
  }
}

// 更新 processScores 函数以处理没有日期字段的数据
function processScores(scores, game, leaderboardElement, leaderboardBody) {
  // 检查是否返回了有效数据
  if (!scores || !Array.isArray(scores) || scores.length === 0) {
    if (leaderboardBody) {
      leaderboardBody.innerHTML = '<div class="no-data">暂无排行数据</div>';
    } else {
      leaderboardElement.innerHTML = '<div class="no-data">暂无排行数据</div>';
    }
    return;
  }
  
  // 如果返回了旧格式的数据，进行转换处理
  if (leaderboardBody) {
    // 使用新的美化HTML结构
    let html = '';
    scores.forEach((score, index) => {
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
  } else {
    // 兼容旧格式 - 直接在容器中生成内容
    let html = '<h3>' + (game === 'snake' ? '贪吃蛇' : '俄罗斯方块') + ' - 排行榜</h3>';
    html += '<table class="leaderboard-table-legacy">';
    html += '<tr><th>排名</th><th>玩家</th><th>分数</th></tr>';
    
    scores.forEach((score, index) => {
      html += `<tr>
        <td>${index + 1}</td>
        <td>${score.player_name || score.player || '未知玩家'}</td>
        <td>${score.score}</td>
      </tr>`;
    });
    
    html += '</table>';
    leaderboardElement.innerHTML = html;
  }
  
  // 添加关闭按钮功能
  const closeBtn = leaderboardElement.querySelector('.leaderboard-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      leaderboardElement.style.display = 'none';
    });
  }
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