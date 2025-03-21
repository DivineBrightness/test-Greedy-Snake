// scenes.js
const tianGangCharacters = [
  "宋江", "卢俊义", "吴用", "公孙胜", "关胜", "林冲", "秦明", "呼延灼", "花荣", "柴进",
  "李应", "朱仝", "鲁智深", "武松", "董平", "张清", "杨志", "徐宁", "索超", "戴宗",
  "刘唐", "李逵", "史进", "穆弘", "雷横", "李俊", "阮小二", "张横", "阮小五", "张顺",
  "阮小七", "杨雄", "石秀", "解珍", "解宝", "燕青"
];

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
        // 根据当前页面状态设置适当的透明度
        if (document.getElementById('snake-game').style.display === 'block' ||
            document.getElementById('tetris-game').style.display === 'block') {
            // 冬季在游戏页面中使用更低的透明度
            if (season === 'winter') {
                decoration.style.opacity = 0.2; // 冬季使用20%不透明度
            } else {
                decoration.style.opacity = 0.3; // 其他季节保持30%不透明度
            }
        } else if (document.getElementById('games-selection').style.display === 'block') {
            // 冬季在选择页面中使用更低的透明度
            if (season === 'winter') {
                decoration.style.opacity = 0.5; // 冬季使用50%不透明度
            } else {
                decoration.style.opacity = 0.6; // 其他季节保持60%不透明度
            }
        } else {
            // 冬季在主页面中使用更低的透明度
            if (season === 'winter') {
                decoration.style.opacity = 0.8; // 冬季使用80%不透明度
            } else {
                decoration.style.opacity = 0.9; // 其他季节保持90%不透明度
            }
        }
      }, 300);
  } else {
      console.error('未找到季节按钮：', season);
  }
}