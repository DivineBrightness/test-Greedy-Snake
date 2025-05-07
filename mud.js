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
    
    // 创建新场景元素
    const newScene = document.createElement('div');
    newScene.className = 'mud-scene new-scene'; // 添加一个新类用于过渡效果
    
    // 创建场景文本
    let html = `
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
    
    // 设置新场景内容
    newScene.innerHTML = html;
    
    // 获取当前场景元素
    const oldScene = container.querySelector('.mud-scene');
    
    if (oldScene) {
      // 如果存在当前场景，添加淡出效果
      oldScene.classList.add('fade-out');
      
      // 等待淡出动画完成后替换场景
      setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(newScene);
        
        // 给新场景添加淡入效果
        setTimeout(() => {
          newScene.classList.add('fade-in');
        }, 10);
        
        // 绑定重新开始按钮事件
        const restartBtn = document.getElementById('mud-restart-btn');
        if (restartBtn) {
          restartBtn.addEventListener('click', () => this.restart());
        }
      }, 300); // 200毫秒等待淡出完成
    } else {
      // 如果不存在当前场景（首次加载），直接添加新场景
      container.innerHTML = '';
      container.appendChild(newScene);
      
      // 给新场景添加淡入效果
      setTimeout(() => {
        newScene.classList.add('fade-in');
      }, 100);
      
      // 绑定重新开始按钮事件
      const restartBtn = document.getElementById('mud-restart-btn');
      if (restartBtn) {
        restartBtn.addEventListener('click', () => this.restart());
      }
    }
    
    // 如果是结局，可以保存玩家数据
    if (scene.isEnding && typeof window.submitScore === 'function') {
      // 可以在这里实现结局统计和排行榜提交
    }
  },
  
  // 游戏场景定义
  scenes: {
    'start': {
      title: '古老鬼屋',
      description: '你站在一座废弃多年的鬼屋前，月光惨淡地洒在斑驳的墙壁上。传说这里曾发生过诡异事件，许多进入的人再也没有出来。入口处的门微微敞开，阴冷的风从中吹出，仿佛在邀请你进入。',
      options: [
        { text: '推开门进入', nextScene: 'entrance' },
        { text: '环绕鬼屋一周，寻找其他入口', nextScene: 'around' }
      ]
    },
    'around': {
      title: '鬼屋外围',
      description: '你小心翼翼地绕着鬼屋走了一圈。后院杂草丛生，你发现一个破旧的小窗户，似乎可以勉强挤进去。不远处还有一个通往地下室的入口，被粗大的铁链和一把古老的铜锁封死。',
      options: [
        { text: '尝试从窗户翻进去', nextScene: 'kitchen' }, // 改为进入厨房
        { text: '返回正门', nextScene: 'start' },
        { text: '仔细检查地下室入口的锁', nextScene: 'basementOutside' }
      ]
    },
    'entrance': {
      title: '入口大厅',
      description: '你推开沉重的木门，走进阴暗的大厅。空气中弥漫着浓重的灰尘和腐朽木头的霉味。墙上挂着几幅褪色的古老肖像画，画中人物的眼神似乎在无声地跟随你的移动。左边通往客厅，右边是一条幽暗的走廊。地上散落着一些碎纸片。',
      isRoom: true,
      options: [
        { text: '进入左边的客厅', nextScene: 'livingRoom' },
        { text: '走向右边的走廊', nextScene: 'hallway' },
        { text: '检查地上的碎纸片', nextScene: 'floorScraps' },
        { text: '仔细观察墙上的肖像画', nextScene: 'portraits' }
      ]
    },
    'floorScraps': {
      title: '散落的纸片',
      description: '你蹲下身捡起几片较大的纸片，上面似乎用褪色的墨水写着一些断断续续的字句：“……实验……失控……钥匙藏在……画的背后……”。',
      item: '神秘纸条碎片',
      options: [
        { text: '进入左边的客厅', nextScene: 'livingRoom' },
        { text: '走向右边的走廊', nextScene: 'hallway' },
        { text: '仔细观察墙上的肖像画', nextScene: 'portraits' }
      ]
    },
    'portraits': {
      title: '诡异的肖像画',
      description: '这些肖像画描绘的是同一个家族不同年代的成员，他们的表情都异常严肃。其中一幅画着一位面容憔悴的女士，她的眼睛似乎格外深邃。你注意到这幅画的边缘有些松动。',
      options: [
        { text: '尝试移动女士肖像画', nextScene: 'portraitSecret' },
        { text: '进入左边的客厅', nextScene: 'livingRoom' },
        { text: '走向右边的走廊', nextScene: 'hallway' }
      ]
    },
    'portraitSecret': {
      title: '画后的秘密',
      description: '你轻轻推动女士肖像画，它向一侧滑开，露出了墙壁上的一个小暗格。暗格里放着一把小巧而生锈的铜钥匙。',
      item: '生锈的铜钥匙',
      options: [
        { text: '拿走钥匙，进入客厅', nextScene: 'livingRoom' },
        { text: '拿走钥匙，走向走廊', nextScene: 'hallway' }
      ]
    },
    'livingRoom': {
      title: '荒废的客厅',
      description: '客厅里布满了蛛网，家具上盖着厚厚的白布。壁炉里积满了灰烬，壁炉架上放着一个精致的音乐盒，但看起来已经损坏。空气中有一股淡淡的、奇怪的甜香。',
      isRoom: true,
      options: [
        { text: '检查壁炉', nextScene: 'fireplace' },
        { text: '查看音乐盒', nextScene: 'musicBox' },
        { text: '返回大厅', nextScene: 'entrance' }
      ]
    },
    'fireplace': {
      title: '冰冷的壁炉',
      description: '壁炉里除了灰烬什么也没有，但你注意到壁炉深处似乎有一块松动的砖头。',
      options: [
        { text: '尝试撬动砖头', nextScene: 'looseBrick' },
        { text: '查看音乐盒', nextScene: 'musicBox' },
        { text: '返回大厅', nextScene: 'entrance' }
      ]
    },
    'looseBrick': {
      title: '松动的砖块',
      description: '你用力撬动砖块，它应声而落，露出了一个小洞。洞里藏着一张羊皮纸卷轴，上面用古怪的符号写着一些文字。',
      item: '神秘符号卷轴',
      options: [
        { text: '收好卷轴，查看音乐盒', nextScene: 'musicBox' },
        { text: '返回大厅', nextScene: 'entrance' }
      ]
    },
    'musicBox': {
      title: '损坏的音乐盒',
      description: '音乐盒的盖子紧闭，上面有一个小孔，似乎需要什么东西才能打开。你尝试摇晃它，但听不到任何声音。',
      options: [
        { text: '用铜钥匙尝试打开音乐盒', nextScene: 'openMusicBox', requiredItem: '生锈的铜钥匙' },
        { text: '检查壁炉', nextScene: 'fireplace' },
        { text: '返回大厅', nextScene: 'entrance' }
      ]
    },
    'openMusicBox': {
      title: '开启的音乐盒',
      description: '铜钥匙正好能插入音乐盒的小孔。你轻轻转动，盒盖弹开，里面并没有音乐装置，而是一枚雕刻着奇特花纹的银戒指。',
      item: '雕花银戒指',
      options: [
        { text: '戴上戒指，检查壁炉', nextScene: 'fireplace' },
        { text: '返回大厅', nextScene: 'entrance' }
      ]
    },
    'hallway': {
      title: '幽暗的走廊',
      description: '走廊狭窄而幽长，光线昏暗。两旁的墙壁上挂着一些风景画，但都已模糊不清。走廊尽头有两扇门，左边的门上刻着一个太阳图案，右边的门上刻着一个月亮图案。',
      isRoom: true,
      options: [
        { text: '进入太阳图案的门（书房）', nextScene: 'study' },
        { text: '进入月亮图案的门（卧室）', nextScene: 'bedroom' },
        { text: '返回大厅', nextScene: 'entrance' }
      ]
    },
    'study': {
      title: '尘封的书房',
      description: '书房里堆满了书籍，空气中弥漫着旧纸张的味道。一张巨大的书桌占据了房间中央，桌上放着一本摊开的厚重书籍，旁边还有一盏熄灭的油灯和一个空墨水瓶。',
      isRoom: true,
      options: [
        { text: '阅读桌上的书', nextScene: 'openBook' },
        { text: '检查书架', nextScene: 'bookshelves' },
        { text: '返回走廊', nextScene: 'hallway' }
      ]
    },
    'openBook': {
      title: '摊开的书籍',
      description: '这本书似乎是一本炼金术手记，里面记载了各种奇怪的实验和符号。其中一页提到了“月光下的仪式”和“纯洁灵魂的献祭”。你感到一阵寒意。',
      options: [
        { text: '检查书架', nextScene: 'bookshelves' },
        { text: '返回走廊', nextScene: 'hallway' }
      ]
    },
    'bookshelves': {
      title: '古老的书架',
      description: '书架上摆满了各种古籍，大部分都已腐朽不堪。在一个不起眼的角落，你发现一本皮革封面的日记本，看起来比较新。',
      options: [
        { text: '阅读日记本', nextScene: 'diary' },
        { text: '返回书桌', nextScene: 'study' }
      ]
    },
    'bedroom': {
      title: '荒凉的卧室',
      description: '卧室里只有一张蒙着灰尘的大床和一个破旧的梳妆台。窗户被木板钉死，房间里异常安静，只有你的呼吸声。梳妆台的抽屉半开着。',
      isRoom: true,
      options: [
        { text: '检查梳妆台抽屉', nextScene: 'dresserDrawer' },
        { text: '查看床铺', nextScene: 'bed' },
        { text: '返回走廊', nextScene: 'hallway' }
      ]
    },
    'dresserDrawer': {
      title: '梳妆台抽屉',
      description: '抽屉里放着一些女性用品，都已经腐坏。在一个角落，你找到一个小巧的银质十字架项链，上面沾着些许暗红色的污渍。',
      item: '银十字架项链',
      options: [
        { text: '查看床铺', nextScene: 'bed' },
        { text: '返回走廊', nextScene: 'hallway' }
      ]
    },
    'bed': {
      title: '蒙尘的床铺',
      description: '床上的被褥凌乱不堪，枕头下似乎有什么东西。你掀开枕头，发现了一张泛黄的旧照片，照片上是一个幸福的家庭，但其中一个孩子的脸被划掉了。',
      item: '家庭旧照片',
      options: [
        { text: '检查梳妆台抽屉', nextScene: 'dresserDrawer' },
        { text: '返回走廊', nextScene: 'hallway' }
      ]
    },
    'kitchen': { // 从窗户进入的场景
      title: '废弃的厨房',
      description: '你从窗户艰难地爬进了厨房。这里一片狼藉，厨具散落一地，灶台上还放着发霉的食物。一股刺鼻的怪味扑面而来。角落里有一个通往地下室的暗门，但被木板钉死了。',
      isRoom: true,
      options: [
        { text: '检查灶台', nextScene: 'stove' },
        { text: '尝试打开通往地下室的暗门', nextScene: 'kitchenBasementDoor' },
        { text: '寻找离开厨房的路', nextScene: 'kitchenExitChoice' }
      ]
    },
    'stove': {
      title: '肮脏的灶台',
      description: '灶台上除了发霉的食物，你还发现了一把锈迹斑斑的菜刀，看起来很锋利。',
      item: '生锈的菜刀',
      options: [
        { text: '尝试打开通往地下室的暗门', nextScene: 'kitchenBasementDoor' },
        { text: '寻找离开厨房的路', nextScene: 'kitchenExitChoice' }
      ]
    },
    'kitchenBasementDoor': {
      title: '钉死的暗门',
      description: '暗门被几块厚木板牢牢钉死。徒手无法打开。',
      options: [
        { text: '用菜刀撬开木板', nextScene: 'openKitchenBasementDoor', requiredItem: '生锈的菜刀' },
        { text: '检查灶台', nextScene: 'stove' },
        { text: '寻找离开厨房的路', nextScene: 'kitchenExitChoice' }
      ]
    },
    'openKitchenBasementDoor': {
      title: '打开的暗门',
      description: '你用菜刀费力地撬开了木板，露出了一个通往下方黑暗的楼梯。一股阴冷潮湿的气息扑面而来。',
      options: [
        { text: '进入地下室', nextScene: 'basement' },
        { text: '寻找离开厨房的路', nextScene: 'kitchenExitChoice' }
      ]
    },
    'kitchenExitChoice': {
        title: '离开厨房',
        description: '你发现厨房的另一扇门通往入口大厅。',
        options: [
            { text: '前往入口大厅', nextScene: 'entrance' },
            { text: '返回检查灶台', nextScene: 'stove' }
        ]
    },
    'basementOutside': {
      title: '地下室入口（外部）',
      description: '地下室入口被一条粗大的铁链和一把古老的铜锁牢牢锁住。锁孔看起来很特殊。',
      options: [
        { text: '用铜钥匙尝试开锁', nextScene: 'unlockBasement', requiredItem: '生锈的铜钥匙' },
        { text: '返回鬼屋外围', nextScene: 'around' }
      ]
    },
    'unlockBasement': {
      title: '打开的地下室大门',
      description: '铜钥匙插入锁孔，咔哒一声，锁开了！你拉开沉重的铁链，一股浓烈的霉味和腐臭味从下方涌出。',
      options: [
        { text: '进入地下室', nextScene: 'basement' },
        { text: '返回鬼屋外围', nextScene: 'around' }
      ]
    },
    'basement': {
      title: '阴森的地下室',
      description: '地下室阴暗潮湿，空气中弥漫着难以名状的恶臭。这里堆满了各种废弃的杂物和一些看起来像是实验器材的东西。在房间中央，有一个用石头砌成的祭坛。',
      isRoom: true,
      options: [
        { text: '检查祭坛', nextScene: 'altar' },
        { text: '搜寻杂物', nextScene: 'basementClutter' },
        { text: '寻找离开地下室的路', nextScene: 'basementExitChoice' }
      ]
    },
    'basementExitChoice': {
        title: '离开地下室',
        description: '你发现一条楼梯通往上方，似乎是厨房的方向。另一条路是之前从外部打开的大门。',
        options: [
            { text: '通过楼梯前往厨房', nextScene: 'kitchen' },
            { text: '通过大门返回鬼屋外围', nextScene: 'around' }
        ]
    },
    'altar': {
      title: '石制祭坛',
      description: '祭坛上刻满了诡异的符号，与你在卷轴上看到的类似。祭坛中央有一个凹槽，形状似乎与你找到的雕花银戒指吻合。祭坛边缘有一些干涸的暗红色痕迹。',
      options: [
        { text: '将雕花银戒指放入凹槽', nextScene: 'placeRingOnAltar', requiredItem: '雕花银戒指' },
        { text: '解读祭坛上的符号', nextScene: 'decipherAltarSymbols', requiredItem: '神秘符号卷轴' },
        { text: '搜寻杂物', nextScene: 'basementClutter' }
      ]
    },
    'decipherAltarSymbols': {
        title: '解读符号',
        description: '对照卷轴，你艰难地解读出祭坛上的符号大意：“当月影笼罩，以血为引，奉上纯洁之魂，方可开启彼界之门，换取永生……或永恒的诅咒。”',
        options: [
            { text: '将雕花银戒指放入凹槽', nextScene: 'placeRingOnAltar', requiredItem: '雕花银戒指' },
            { text: '搜寻杂物', nextScene: 'basementClutter' }
        ]
    },
    'placeRingOnAltar': {
        title: '启动祭坛',
        description: '你将雕花银戒指放入祭坛的凹槽，它完美地契合了。祭坛突然发出一阵低沉的嗡鸣声，周围的空气开始震动，一道幽暗的光芒从祭坛中央升起！',
        options: [
            { text: '献祭银十字架项链（结局A）', nextScene: 'endingA', requiredItem: '银十字架项链' },
            { text: '什么也不做，观察变化（结局B）', nextScene: 'endingB' },
            { text: '尝试逃离地下室（结局C）', nextScene: 'endingC' }
        ]
    },
    'basementClutter': {
      title: '地下室杂物',
      description: '你在杂物堆里翻找，发现了一个破旧的木箱。箱子里有一些腐烂的布料和一本几乎完全被水浸泡过的日记。',
      options: [
        { text: '尝试阅读浸水的日记', nextScene: 'wetDiary' },
        { text: '检查祭坛', nextScene: 'altar' }
      ]
    },
    'wetDiary': {
      title: '浸水的日记',
      description: '日记的字迹大多已经模糊不清，但你勉强能辨认出一些片段：“……实验成功了……但也失败了……她变得不再是她……我必须阻止这一切……”，最后一页用鲜血写着一个词：“净化”。',
      item: '浸水的日记残片',
      options: [
        { text: '检查祭坛', nextScene: 'altar' }
      ]
    },
    'diary': { // 书房找到的日记
      title: '皮革封面日记',
      description: '这本日记属于房子的男主人。他详细记录了自己对长生不老的研究，以及如何发现了一个古老的仪式，声称可以连接到另一个充满力量的维度。日记的后半部分充满了恐惧和绝望，描述了他的妻子在仪式后变得越来越古怪和残暴，最终他决定将她封印在地下室，并藏起了仪式的关键物品。最后一页写着：“唯有纯洁的灵魂和神圣的象征才能打破这邪恶的循环。”',
      item: '男主人的日记',
      options: [
        { text: '返回书架', nextScene: 'bookshelves' },
        { text: '返回书桌', nextScene: 'study' }
      ]
    },
    'endingA': {
      title: '结局A：净化与安息',
      description: '你将银十字架项链放在了祭坛的光芒之中。十字架发出耀眼的圣光，与祭坛的幽暗光芒相互抗衡。一声凄厉的尖叫从地下深处传来，随后一切归于平静。鬼屋中的阴冷气息消散了，阳光似乎穿透了乌云。你感到一种前所未有的轻松。当你走出鬼屋时，发现它已经变成了一片普通的废墟，诅咒被解除了。',
      isEnding: true,
      endingType: 'good'
    },
    'endingB': {
      title: '结局B：彼界凝视',
      description: '你站在原地，看着祭坛的光芒越来越强盛，形成了一个旋转的漩涡。漩涡中浮现出一双巨大的、充满恶意的眼睛，它们冷冷地注视着你。你感到自己的灵魂仿佛要被吸走，身体无法动弹。渐渐地，你的意识模糊了……你成为了鬼屋新的守护者，永远困在了这里。',
      isEnding: true,
      endingType: 'bad'
    },
    'endingC': {
      title: '结局C：仓皇逃窜',
      description: '你被眼前恐怖的景象吓坏了，不顾一切地转身逃跑。祭坛发出的力量追逐着你，整个鬼屋都在震动。你拼尽全力跑出了鬼屋，身后传来一声巨响，鬼屋坍塌了。你虽然活了下来，但那双眼睛的凝视将永远成为你的噩梦。',
      isEnding: true,
      endingType: 'neutral'
    },
    'trueEnding': { // 这个可以作为收集所有关键物品后的特殊好结局
      title: '真相大白与救赎',
      description: '当你集齐了所有关键线索（男主人的日记，神秘纸条碎片，家庭旧照片，浸水的日记残片）并理解了整个悲剧后，你带着银十字架项链来到祭坛。你没有直接献祭，而是念出了日记中关于“净化”和“神圣象征”的段落。祭坛的光芒变得柔和，一个悲伤的女性幽魂出现，她向你表达了感谢，然后化作光点消散。鬼屋恢复了宁静，阳光洒满每一个角落。你不仅解除了诅咒，还救赎了被困的灵魂。',
      isEnding: true,
      endingType: 'best'
    },
    'badEnding': { // 通用坏结局，比如在没有关键物品时触发某些危险选项
      title: '永恒困境',
      description: '你做出了错误的选择，触动了鬼屋深处的邪恶力量。黑暗吞噬了你，你成为了下一个徘徊在鬼屋中的幽魂，永远重复着绝望的探索。',
      isEnding: true,
      endingType: 'very_bad'
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