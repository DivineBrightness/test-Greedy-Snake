// mud.js - 鬼屋探索文字冒险游戏
const mudGame = {
  isOpen: false,
  currentScene: 'start',
  inventory: [],
  visitedRooms: [],
  endingReached: null,
  
  // 游戏初始化
  init: function() {
    this.setupEventListeners();
  },
  
  // 设置事件监听
  setupEventListeners: function() {
    // 选项点击事件代理
    const gameContainer = document.getElementById('mud-game');
    if (gameContainer) {
      gameContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('mud-option')) {
          const nextScene = e.target.getAttribute('data-scene');
          if (nextScene) this.goToScene(nextScene);
        }
      });
    }
    
    // 重新开始按钮
    const restartBtn = document.getElementById('mud-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.restart());
    }
    
    // 返回按钮
    const backBtn = document.getElementById('mud-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.hide());
    }
  },
  
  // 显示游戏
  show: function() {
    const gameContainer = document.getElementById('mud-game');
    if (gameContainer) {
      gameContainer.style.display = 'block';
      this.isOpen = true;
      
      // 如果是新游戏，重置状态
      if (this.currentScene === 'start' && this.visitedRooms.length === 0) {
        this.restart();
      } else {
        this.renderCurrentScene();
      }
    }
  },
  
  // 隐藏游戏
  hide: function() {
    const gameContainer = document.getElementById('mud-game');
    if (gameContainer) {
      gameContainer.style.display = 'none';
      this.isOpen = false;
      document.getElementById('games-selection').style.display = 'block';
    }
  },
  
  // 重新开始游戏
  restart: function() {
    this.currentScene = 'start';
    this.inventory = [];
    this.visitedRooms = [];
    this.endingReached = null;
    this.renderCurrentScene();
  },
  
  // 前往场景
  goToScene: function(sceneId) {
    // 记录访问过的房间
    if (this.scenes[sceneId].isRoom && !this.visitedRooms.includes(sceneId)) {
      this.visitedRooms.push(sceneId);
    }
    
    // 处理物品拾取
    if (this.scenes[sceneId].item && !this.inventory.includes(this.scenes[sceneId].item)) {
      this.inventory.push(this.scenes[sceneId].item);
    }
    
    // 检查结局
    if (this.scenes[sceneId].isEnding) {
      this.endingReached = sceneId;
    }
    
    this.currentScene = sceneId;
    this.renderCurrentScene();
  },
  
  // 渲染当前场景
  renderCurrentScene: function() {
    const scene = this.scenes[this.currentScene];
    const container = document.querySelector('.mud-content');
    
    if (!container) return;
    
    // 创建场景文本
    let html = `<div class="mud-scene">
      <h3>${scene.title}</h3>
      <p>${scene.description}</p>`;
    
    // 如果有物品栏，显示物品
    if (this.inventory.length > 0) {
      html += `<div class="mud-inventory">
        <h4>物品栏:</h4>
        <ul>
          ${this.inventory.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>`;
    }
    
    // 添加选项
    if (scene.options && scene.options.length > 0) {
      html += `<div class="mud-options">`;
      
      scene.options.forEach(option => {
        // 检查选项是否需要特定物品
        let isDisabled = false;
        let disabledReason = '';
        
        if (option.requiredItem && !this.inventory.includes(option.requiredItem)) {
          isDisabled = true;
          disabledReason = `(需要: ${option.requiredItem})`;
        }
        
        html += `<button class="mud-option ${isDisabled ? 'disabled' : ''}" 
                 data-scene="${option.nextScene}" 
                 ${isDisabled ? 'disabled' : ''}>
                 ${option.text} ${disabledReason}
                 </button>`;
      });
      
      html += `</div>`;
    }
    
    // 如果是结局，显示重新开始按钮
    if (scene.isEnding) {
      html += `<button id="mud-restart-btn" class="mud-restart">重新开始</button>`;
    }
    
    html += `</div>`;
    
    // 渲染到容器
    container.innerHTML = html;
    
    // 如果是结局，可以保存玩家数据
    if (scene.isEnding && typeof window.submitScore === 'function') {
      // 可以在这里实现结局统计和排行榜提交
    }
  },
  
  // 游戏场景定义
  scenes: {
    'start': {
      title: '古老鬼屋',
      description: '你站在一座废弃多年的鬼屋前。传说这里曾发生过诡异事件，许多进入的人再也没有出来。入口处的门微微敞开，仿佛在邀请你进入。',
      options: [
        { text: '推开门进入', nextScene: 'entrance' },
        { text: '环绕鬼屋一周', nextScene: 'around' }
      ]
    },
    'around': {
      title: '鬼屋外围',
      description: '你绕着鬼屋走了一圈，在后院发现一个小窗户，似乎可以翻进去。不远处还有一个地下室的入口，已经被铁链锁住了。',
      options: [
        { text: '从窗户翻进去', nextScene: 'livingRoom' },
        { text: '返回正门', nextScene: 'start' },
        { text: '检查地下室入口', nextScene: 'basementOutside' }
      ]
    },
    'entrance': {
      title: '入口大厅',
      description: '你走进阴暗的大厅，空气中弥漫着灰尘和霉味。墙上挂着几幅古老的肖像画，似乎眼睛在跟随你的移动。左边是客厅，右边是一条走廊。',
      isRoom: true,
      options: [
        { text: '进入客厅', nextScene: 'livingRoom' },
        { text: '走向走廊', nextScene: 'hallway' },
        { text: '检查肖像画', nextScene: 'portraits' }
      ]
    },
    'portraits': {
      title: '诡异的肖像画',
      description: '仔细观察这些画，你发现它们描绘的是同一个家庭，但年代跨越了近百年。在最新的一幅画下方，你发现了一把生锈的钥匙。',
      item: '生锈的钥匙',
      options: [
        { text: '进入客厅', nextScene: 'livingRoom' },
        { text: '走向走廊', nextScene: 'hallway' },
        { text: '返回大门', nextScene: 'start' }
      ]
    },
    // 添加更多场景...
    'basementOutside': {
      title: '地下室入口',
      description: '地下室入口被一条生锈的铁链和大锁牢牢锁住。如果有钥匙的话，也许可以打开它。',
      options: [
        { text: '用钥匙开锁', nextScene: 'basement', requiredItem: '生锈的钥匙' },
        { text: '返回鬼屋外围', nextScene: 'around' }
      ]
    },
    'basement': {
      title: '阴森的地下室',
      description: '你成功打开了锁，走进了阴暗潮湿的地下室。这里堆满了古老的物品和书籍。在角落里，你看到一本奇怪的日记本。',
      isRoom: true,
      options: [
        { text: '翻阅日记本', nextScene: 'diary' },
        { text: '查看其他物品', nextScene: 'basementItems' },
        { text: '离开地下室', nextScene: 'around' }
      ]
    },
    'diary': {
      title: '神秘日记',
      description: '日记记载了这栋房子的主人如何发现了一个通往另一个维度的通道，以及他们如何最终被困在那个维度中。最后一页写着："唯有纯洁的灵魂才能逃脱诅咒。"',
      item: '神秘日记',
      options: [
        { text: '继续探索地下室', nextScene: 'basementItems' },
        { text: '离开地下室', nextScene: 'around' }
      ]
    },
    // 更多场景...
    'trueEnding': {
      title: '真相大白',
      description: '当你解开所有谜题、收集全部线索后，你终于明白了房子的真相。你成功打破了诅咒，灵魂得以安息。当你走出房子时，世界似乎焕然一新。',
      isEnding: true,
      endingType: 'good'
    },
    'badEnding': {
      title: '永恒困境',
      description: '你被困在了房子里，成为了下一个徘徊的幽魂。也许未来的某一天，会有人来解救你...',
      isEnding: true,
      endingType: 'bad'
    }
  }
};

// 确保DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
  mudGame.init();
  
  // 添加游戏选择按钮事件
  const mudButton = document.getElementById('mud-select-btn');
  if (mudButton) {
    mudButton.addEventListener('click', () => {
      document.getElementById('games-selection').style.display = 'none';
      mudGame.show();
    });
  }
});