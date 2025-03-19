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
    
    setTimeout(() => {
      decoration.style.opacity = 0.8;
    }, 300);
  } else {
    console.error('未找到季节按钮：', season);
  }
}