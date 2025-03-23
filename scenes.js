// scenes.js
const tianGangCharacters = [
  "光头强", "熊大", "熊二", "海绵宝宝", "派大星", "章鱼哥", "蟹老板", 
  "喜羊羊", "灰太狼", "美羊羊", "懒羊羊", "沸羊羊", "暖羊羊", "慢羊羊", 
  "红太狼", "小灰灰", "菠萝吹雪", "陆小果", "橙留香", "迪迦", 
  "孙悟空", "猪八戒", "沙悟净", "唐僧", "哪吒", "葫芦娃", 
  "图图", "牛爷爷", "刷子", "小猪佩奇", "蜡笔小新", 
  "樱桃小丸子", "哆啦A梦", "南宫问天", "东方铁心",
  "米奇妙妙屋", "唐老鸭"
];

// 添加序列检测功能
const secretSequence = ['summer', 'winter', 'spring', 'autumn', 'summer', 'winter'];
let currentSequence = [];
let sequenceTimer = null;

function populateSelect(selectId) {
  const select = document.getElementById(selectId);
  tianGangCharacters.forEach(character => {
    const option = document.createElement('option');
    option.value = option.textContent = character;
    select.appendChild(option);
  });
}

function changeSeason(season) {
  console.log('切换季节到：', season);
  document.querySelectorAll('.season-btn').forEach(btn => btn.classList.remove('active'));
  const seasonBtn = document.querySelector('.' + season + '-btn');
  if (seasonBtn) {
      seasonBtn.classList.add('active');
      document.body.className = season;
      
      // 添加动画效果，让图标淡出后淡入
      const decoration = document.querySelector('.seasonal-decoration');
      decoration.style.opacity = 0;
      
      // 在 scenes.js 的 changeSeason 函数中添加冬季特殊处理
      setTimeout(() => {
        // 在scenes.js的changeSeason函数中修改透明度设置
        if (document.getElementById('snake-game').style.display === 'block' ||
        document.getElementById('tetris-game').style.display === 'block') {
        // 游戏页面使用稍高的不透明度
        if (season === 'winter') {
            decoration.style.opacity = 0.60; // 从0.08增加到0.15
        } else {
            decoration.style.opacity = 0.65; // 从0.1增加到0.18
        }
        } else if (document.getElementById('games-selection').style.display === 'block') {
        if (season === 'winter') {
            decoration.style.opacity = 0.60; // 从0.12增加到0.20
        } else {
            decoration.style.opacity = 0.65; // 从0.15增加到0.25
        }
        } else {
        if (season === 'winter') {
            decoration.style.opacity = 0.85; // 从0.15增加到0.25
        } else {
            decoration.style.opacity = 0.80; // 从0.2增加到0.30
        }
        }
      }, 300);
  } else {
      console.error('未找到季节按钮：', season);
  }
  
  // 添加序列检测逻辑
  checkSecretSequence(season);
}

// 检测秘密序列
function checkSecretSequence(season) {
  // 清除之前的定时器
  if (sequenceTimer) {
    clearTimeout(sequenceTimer);
  }
  
  // 添加当前季节到序列
  currentSequence.push(season);
  
  // 如果序列长度超过秘密序列，删除最老的点击
  if (currentSequence.length > secretSequence.length) {
    currentSequence.shift();
  }
  
  // 检查是否匹配秘密序列
  if (currentSequence.length === secretSequence.length) {
    let match = true;
    for (let i = 0; i < secretSequence.length; i++) {
      if (secretSequence[i] !== currentSequence[i]) {
        match = false;
        break;
      }
    }
    
    // 如果匹配成功，打开宝箱
    if (match && window.treasureBox) {
      console.log('秘密序列匹配成功！');
      window.treasureBox.show();
      
      // 重置序列
      currentSequence = [];
    }
  }
  
  // 设置超时重置序列（5秒内需要完成）
  sequenceTimer = setTimeout(() => {
    currentSequence = [];
    console.log('序列已重置');
  }, 5000);
}