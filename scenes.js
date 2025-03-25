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
// 添加新的"春秋夏冬春秋"序列
const cqSequence = ['spring', 'autumn', 'summer', 'winter', 'spring', 'autumn'];
// 添加新的"春夏秋冬"序列
const dailySequence = ['spring', 'summer', 'autumn', 'winter'];
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
// 修改 checkSecretSequence 函数，添加对每日一话序列的检测
function checkSecretSequence(season) {
  // 清除之前的定时器
  if (sequenceTimer) {
    clearTimeout(sequenceTimer);
  }
  
  // 添加当前季节到序列
  currentSequence.push(season);
  
  // 如果序列长度超过最长序列，删除最老的点击
  const maxLength = Math.max(secretSequence.length, cqSequence.length, dailySequence.length);
  if (currentSequence.length > maxLength) {
    currentSequence.shift();
  }
  
  // 检查是否匹配宝箱秘密序列
  if (currentSequence.length >= secretSequence.length) {
    // 获取与宝箱序列长度匹配的最近点击
    const treasureCheck = currentSequence.slice(-secretSequence.length);
    
    let treasureMatch = true;
    for (let i = 0; i < secretSequence.length; i++) {
      if (secretSequence[i] !== treasureCheck[i]) {
        treasureMatch = false;
        break;
      }
    }
    
    // 如果匹配成功，打开宝箱
    if (treasureMatch && window.treasureBox) {
      console.log('宝箱秘密序列匹配成功！');
      window.treasureBox.show();
      
      // 重置序列
      currentSequence = [];
      return; // 提前返回，避免同时触发多个效果
    }
  }
  
  // 检查是否匹配春秋秘密序列
  if (currentSequence.length >= cqSequence.length) {
    // 获取与春秋序列长度匹配的最近点击
    const cqCheck = currentSequence.slice(-cqSequence.length);
    
    let cqMatch = true;
    for (let i = 0; i < cqSequence.length; i++) {
      if (cqSequence[i] !== cqCheck[i]) {
        cqMatch = false;
        break;
      }
    }
    
    // 如果匹配成功，显示春秋页面
    if (cqMatch && window.cq) {
      console.log('春秋秘密序列匹配成功！');
      
      // 隐藏主页面元素
      document.querySelector('.season-controls').style.display = 'none';
      document.getElementById('games-btn').style.display = 'none';
      const pageTitle = document.getElementById('page-title') || document.querySelector('.container h1');
      if (pageTitle) {
        pageTitle.style.display = 'none';
      }
      
      // 显示春秋页面
      window.cq.show();
      
      // 重置序列
      currentSequence = [];
      return;
    }
  }
  
  // 检查是否匹配每日一话序列
  if (currentSequence.length >= dailySequence.length) {
    // 获取与每日一话序列长度匹配的最近点击
    const dailyCheck = currentSequence.slice(-dailySequence.length);
    
    let dailyMatch = true;
    for (let i = 0; i < dailySequence.length; i++) {
      if (dailySequence[i] !== dailyCheck[i]) {
        dailyMatch = false;
        break;
      }
    }
    
    // 如果匹配成功，显示每日一话页面
    if (dailyMatch && window.daily) {
      console.log('每日一话序列匹配成功！');
      
      // 隐藏主页面元素
      document.querySelector('.season-controls').style.display = 'none';
      document.getElementById('games-btn').style.display = 'none';
      const pageTitle = document.getElementById('page-title') || document.querySelector('.container h1');
      if (pageTitle) {
        pageTitle.style.display = 'none';
      }
      
      // 显示每日一话页面
      window.daily.show();
      
      // 重置序列
      currentSequence = [];
      return;
    }
  }
  
  // 设置超时重置序列（5秒内需要完成）
  sequenceTimer = setTimeout(() => {
    currentSequence = [];
    console.log('序列已重置');
  }, 5000);
}