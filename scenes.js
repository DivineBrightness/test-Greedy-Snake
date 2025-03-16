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
  
  function createPixel(x, y, color) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.backgroundColor = color;
    pixel.style.gridColumn = x + 1;
    pixel.style.gridRow = y + 1;
    return pixel;
  }
  
  function createSpringScene() {
    const grid = document.getElementById('spring-grid');
    if (!grid) return console.error('spring-grid 未找到');
    grid.innerHTML = '';
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const skyColor = y < 20 ? '#c4e0f9' : '#7cbb5e';
        grid.appendChild(createPixel(x, y, skyColor));
      }
    }
    for (let y = 15; y < 25; y++) {
      grid.appendChild(createPixel(15, y, '#8b4513'));
      grid.appendChild(createPixel(16, y, '#8b4513'));
    }
    for (let x = 10; x < 22; x++) {
      if (x !== 15 && x !== 16) grid.appendChild(createPixel(x, 14, '#8b4513'));
    }
    for (let x = 12; x < 20; x++) {
      if (x !== 15 && x !== 16) grid.appendChild(createPixel(x, 13, '#8b4513'));
    }
    const blossomPositions = [
      [8, 12], [9, 11], [10, 12], [11, 11], [12, 12],
      [13, 11], [14, 10], [15, 9], [16, 10], [17, 11],
      [18, 12], [19, 11], [20, 12], [21, 11], [22, 12],
      [23, 13], [8, 13], [9, 14], [22, 14], [23, 15],
      [7, 11], [6, 12], [24, 12], [25, 11]
    ];
    for (const [x, y] of blossomPositions) {
      const pink = Math.random() > 0.5 ? '#ffb7c5' : '#ffc0cb';
      grid.appendChild(createPixel(x, y, pink));
    }
    const fallingPetals = [
      [5, 15], [10, 16], [18, 16], [25, 15],
      [7, 17], [13, 18], [20, 17], [26, 18],
      [9, 19], [22, 19]
    ];
    for (const [x, y] of fallingPetals) {
      grid.appendChild(createPixel(x, y, '#ffb7c5'));
    }
  }
  
  function createSummerScene() {
    const grid = document.getElementById('summer-grid');
    if (!grid) return console.error('summer-grid 未找到');
    grid.innerHTML = '';
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        let color = y < 18 ? '#87ceeb' : y < 20 ? '#f0e68c' : '#1e90ff';
        grid.appendChild(createPixel(x, y, color));
      }
    }
    const sunCenter = [8, 5];
    const sunRadius = 4;
    for (let y = sunCenter[1] - sunRadius; y <= sunCenter[1] + sunRadius; y++) {
      for (let x = sunCenter[0] - sunRadius; x <= sunCenter[0] + sunRadius; x++) {
        if (Math.sqrt(Math.pow(x - sunCenter[0], 2) + Math.pow(y - sunCenter[1], 2)) <= sunRadius) {
          grid.appendChild(createPixel(x, y, '#ffdb58'));
        }
      }
    }
    const rays = [
      [3, 3], [4, 2], [5, 1], [8, 0], [11, 1], [12, 2], [13, 3],
      [2, 5], [1, 5], [0, 5], [14, 5], [15, 5], [16, 5],
      [3, 7], [4, 8], [5, 9], [11, 9], [12, 8], [13, 7]
    ];
    for (const [x, y] of rays) {
      grid.appendChild(createPixel(x, y, '#ffdb58'));
    }
    for (let x = 20; x < 26; x++) grid.appendChild(createPixel(x, 13, '#ff6347'));
    for (let x = 19; x < 27; x++) grid.appendChild(createPixel(x, 14, '#ff6347'));
    for (let y = 15; y < 19; y++) grid.appendChild(createPixel(23, y, '#8b4513'));
    const waves = [
      [3, 21], [7, 21], [11, 21], [15, 21], [19, 21], [23, 21], [27, 21],
      [1, 23], [5, 23], [9, 23], [13, 23], [17, 23], [21, 23], [25, 23], [29, 23],
      [3, 25], [7, 25], [11, 25], [15, 25], [19, 25], [23, 25], [27, 25],
      [1, 27], [5, 27], [9, 27], [13, 27], [17, 27], [21, 27], [25, 27], [29, 27]
    ];
    for (const [x, y] of waves) grid.appendChild(createPixel(x, y, '#4169e1'));
  }
  
  function createAutumnScene() {
    const grid = document.getElementById('autumn-grid');
    if (!grid) return console.error('autumn-grid 未找到');
    grid.innerHTML = '';
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        let color = y < 20 ? '#ffc87c' : y % 2 === 0 ? '#cd853f' : '#d2691e';
        grid.appendChild(createPixel(x, y, color));
      }
    }
    for (let y = 10; y < 20; y++) {
      grid.appendChild(createPixel(15, y, '#8b4513'));
      grid.appendChild(createPixel(16, y, '#8b4513'));
    }
    const treeLeaves = [
      [10, 8], [11, 7], [12, 6], [13, 5], [14, 6], [15, 5], [16, 5],
      [17, 6], [18, 5], [19, 6], [20, 7], [21, 8],
      [9, 9], [10, 10], [21, 9], [22, 10],
      [12, 8], [14, 8], [17, 8], [19, 8]
    ];
    for (const [x, y] of treeLeaves) {
      const color = Math.random() > 0.5 ? '#ff8c00' : '#ff4500';
      grid.appendChild(createPixel(x, y, color));
    }
    const fallingLeaves = [
      [5, 12], [7, 14], [9, 16], [11, 18],
      [22, 12], [25, 14], [27, 16], [24, 18],
      [6, 17], [14, 15], [19, 16], [28, 15],
      [3, 19], [13, 19], [21, 19], [29, 19]
    ];
    for (const [x, y] of fallingLeaves) {
      const color = Math.random() > 0.5 ? '#ff8c00' : '#ff4500';
      grid.appendChild(createPixel(x, y, color));
    }
  }
  
  function createWinterScene() {
    const grid = document.getElementById('winter-grid');
    if (!grid) return console.error('winter-grid 未找到');
    grid.innerHTML = '';
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        let color = y < 20 ? '#b0c4de' : Math.random() > 0.8 ? '#f0f8ff' : '#ffffff';
        grid.appendChild(createPixel(x, y, color));
      }
    }
    const snowmanBase = [16, 22];
    const baseRadius = 5;
    for (let y = snowmanBase[1] - baseRadius; y <= snowmanBase[1] + baseRadius; y++) {
      for (let x = snowmanBase[0] - baseRadius; x <= snowmanBase[0] + baseRadius; x++) {
        if (Math.sqrt(Math.pow(x - snowmanBase[0], 2) + Math.pow(y - snowmanBase[1], 2)) <= baseRadius) {
          grid.appendChild(createPixel(x, y, '#ffffff'));
        }
      }
    }
    const snowmanHead = [16, 14];
    const headRadius = 3;
    for (let y = snowmanHead[1] - headRadius; y <= snowmanHead[1] + headRadius; y++) {
      for (let x = snowmanHead[0] - headRadius; x <= snowmanHead[0] + headRadius; x++) {
        if (Math.sqrt(Math.pow(x - snowmanHead[0], 2) + Math.pow(y - snowmanHead[1], 2)) <= headRadius) {
          grid.appendChild(createPixel(x, y, '#ffffff'));
        }
      }
    }
    grid.appendChild(createPixel(15, 13, '#000000'));
    grid.appendChild(createPixel(17, 13, '#000000'));
    grid.appendChild(createPixel(16, 14, '#ff7f00'));
    grid.appendChild(createPixel(15, 15, '#000000'));
    grid.appendChild(createPixel(16, 15, '#000000'));
    grid.appendChild(createPixel(17, 15, '#000000'));
    const boyPositions = [
      [25, 17, '#0000ff'], [25, 18, '#0000ff'], [25, 19, '#0000ff'],
      [24, 18, '#ffdab9'], [24, 17, '#ffdab9'], [24, 19, '#ffdab9'],
      [23, 18, '#ffdab9'], [23, 17, '#000000'], [23, 19, '#ff0000'],
      [25, 20, '#ff0000'], [25, 21, '#ff0000'], [25, 22, '#ff0000'],
      [24, 20, '#ff0000'], [24, 21, '#ff0000'], [24, 22, '#ff0000'],
      [26, 20, '#ff0000'], [26, 21, '#ff0000'], [23, 21, '#ffdab9'],
      [27, 21, '#ffdab9'], [24, 23, '#0000ff'], [26, 23, '#0000ff'],
      [24, 24, '#0000ff'], [26, 24, '#0000ff'],
      [23, 20, '#000080'], [24, 20, '#000080'], [25, 20, '#000080'],
      [26, 20, '#000080'], [27, 20, '#000080'], [23, 21, '#000080']
    ];
    const girlPositions = [
      [7, 17, '#8b4513'], [7, 18, '#8b4513'], [7, 19, '#8b4513'],
      [8, 18, '#ffdab9'], [8, 17, '#ffdab9'], [8, 19, '#ffdab9'],
      [9, 18, '#ffdab9'], [9, 17, '#000000'], [9, 19, '#ff0000'],
      [7, 20, '#ff69b4'], [7, 21, '#ff69b4'], [7, 22, '#ff69b4'],
      [8, 20, '#ff69b4'], [8, 21, '#ff69b4'], [8, 22, '#ff69b4'],
      [6, 20, '#ff69b4'], [6, 21, '#ff69b4'], [9, 21, '#ffdab9'],
      [5, 21, '#ffdab9'], [7, 23, '#000080'], [9, 23, '#000080'],
      [7, 24, '#000080'], [9, 24, '#000080'],
      [5, 20, '#ffc0cb'], [6, 20, '#ffc0cb'], [7, 20, '#ffc0cb'],
      [8, 20, '#ffc0cb'], [9, 20, '#ffc0cb'], [9, 21, '#ffc0cb']
    ];
    [...boyPositions, ...girlPositions].forEach(([x, y, color]) => grid.appendChild(createPixel(x, y, color)));
    const snowflakes = [
      [3, 3], [7, 5], [12, 7], [19, 4], [25, 6], [29, 3],
      [5, 10], [10, 12], [22, 10], [27, 11],
      [4, 16], [9, 19], [14, 15], [21, 14], [28, 18]
    ];
    snowflakes.forEach(([x, y]) => grid.appendChild(createPixel(x, y, '#ffffff')));
  }
  
  function initializeScenes() {
    console.log('初始化所有场景');
    createSpringScene();
    createSummerScene();
    createAutumnScene();
    createWinterScene();
  }
  
  function changeSeason(season) {
    console.log('切换季节到：', season);
    document.querySelectorAll('.pixel-art').forEach(art => art.classList.remove('active'));
    document.querySelectorAll('.season-btn').forEach(btn => btn.classList.remove('active'));
    const seasonArt = document.getElementById(season);
    const seasonBtn = document.querySelector('.' + season + '-btn');
    if (seasonArt && seasonBtn) {
      seasonArt.classList.add('active');
      seasonBtn.classList.add('active');
      document.body.className = season;
    } else {
      console.error('未找到季节元素或按钮：', season);
    }
  }