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

async function loadLeaderboard(game, elementId) {
  const leaderboardElement = document.getElementById(elementId);
  leaderboardElement.innerHTML = "<p>加载中...</p>";
  try {
    const url = `${API_URL}/leaderboard?game=${game}`;
    console.log("请求 URL:", url);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    console.log("响应状态:", response.status);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const leaderboard = await response.json();
    console.log("响应数据:", leaderboard);
    if (Array.isArray(leaderboard)) {
      leaderboardElement.innerHTML = leaderboard.length > 0
        ? leaderboard.map((entry, index) => `<p>${index + 1}. ${entry.player_name} - ${entry.score}</p>`).join("")
        : "<p>暂无排行榜数据</p>";
    } else {
      throw new Error("返回数据不是数组");
    }
  } catch (e) {
    leaderboardElement.innerHTML = `<p>加载失败：${e.message}</p>`;
    console.error("加载失败详情:", e);
  }
}