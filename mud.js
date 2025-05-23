// 废土余生：60秒风格文字冒险游戏
const wastelandGame = {
    // 保留原有属性
    inventory: [],
    inventoryMap: {},
    isOpen: false,
    currentScene: 'start',
    visitedAreas: [],
    endingReached: null,
    round: 1,
    maxRounds: 60,
    
    // 修改生存属性，移除饥饿和口渴
    attributes: {
        health: 5,
        radiation: 1,
        sanity: 100
    },
    
    // 添加结局评分系统
    endingScores: {
        humanity: 0,  // 人道指标
        tech: 0,      // 技术指标
        survival: 0,  // 生存指标
        skycity: 0    // 天庭指标
    },
    
    // 添加章节系统
    currentChapter: 1,
    maxChapter: 4,
    chapterKeyItems: {
        1: "老式收音机",    // 第一章关键道具
        2: "C区通行证",     // 第二章关键道具
        3: "圣杯病毒",  // 第三章关键道具
        4: null            // 第四章无需额外钥匙
    },
    
    // 原有属性
    humanityPoints: 0,
    isTransitioning: false,
    
  // 修改场景获取方法
  get scenes() {
    // 如果场景尚未加载，则尝试加载
    if (!window.wastelandScenes) {
      console.warn('场景数据尚未加载，尝试加载...');
      if (typeof loadAllScenes === 'function') {
        loadAllScenes();
      }
    }
    return window.wastelandScenes || {};
  },
    
// 在init函数中添加地图按钮初始化
init: function() {
    // 保留原有代码
    if (!document.getElementById('wasteland-game')) {
      console.log('创建废土游戏基本结构');
      this.createBasicStructure();
    }
    
    if (!document.querySelector('.wasteland-content')) {
      console.log('创建内容容器');
      const game = document.getElementById('wasteland-game');
      if (game) {
        const content = document.createElement('div');
        content.className = 'wasteland-content';
        game.appendChild(content);
      }
    }
    
    this.setupEventListeners();
    this.setupItemClickListeners();
    this.addInventoryButton(); // 添加物品栏按钮
    this.addMapButton(); // 添加地图按钮
  },

  addMapButton: function() {
    // 检查按钮是否已存在
    if (document.querySelector('.wasteland-map-toggle')) {
        console.log("地图按钮已存在");
        return;
    }
    
    console.log("创建地图按钮");
    
    // 创建按钮
    const btnEl = document.createElement('button');
    btnEl.className = 'wasteland-map-toggle';
    btnEl.innerHTML = '🗺️'; // 使用地图表情符号
    
    // 添加到游戏界面
    const gameContainer = document.getElementById('wasteland-game');
    if (gameContainer) {
        gameContainer.appendChild(btnEl);
        console.log("地图按钮已添加到游戏容器");
    } else {
        console.error("找不到游戏容器");
    }
    
    // 初始化地图
    if (window.wastelandMap) {
        try {
            window.wastelandMap.init();
            // 根据当前场景立即更新位置
            window.wastelandMap.updatePosition(this.currentScene);
            console.log("地图初始化成功");
        } catch (e) {
            console.error("地图初始化失败", e);
        }
    } else {
        console.error("找不到wastelandMap对象");
    }
    
    // 绑定点击事件
    btnEl.addEventListener('click', () => {
        console.log("点击地图按钮");
        if (window.wastelandMap) {
            window.wastelandMap.toggleMap();
        }
    });
},
  // 创建基本结构
  createBasicStructure: function() {
    const container = document.createElement('div');
    container.id = 'wasteland-game';
    container.style.display = 'none';
    
    container.innerHTML = `
      <button id="wasteland-back-btn" class="back-btn">&larr;</button>
      <button id="wasteland-leaderboard-btn">排行榜</button>
      <h2>末世废土</h2>
      <div class="wasteland-content">
        <!-- 场景内容将由JavaScript动态渲染 -->
      </div>
      
      <!-- 排行榜面板 -->
      <div id="wasteland-leaderboard" style="display: none;">
        <h3>废土编年史</h3>
        <button class="wasteland-leaderboard-close-btn">×</button>
        <div id="wasteland-leaderboard-content"></div>
      </div>
    `;
    
    document.body.appendChild(container);
  },
    
    // 1. 修复物品点击监听器 - 替换整个函数
    setupItemClickListeners: function() {
        document.addEventListener('click', (e) => {
            // 使用事件代理处理物品点击
            const itemElement = e.target.closest('.wasteland-inventory-item');
            if (itemElement) {
                // 使用 data-item 属性获取纯物品名称，而不是包含数量的文本内容
                const itemName = itemElement.getAttribute('data-item');
                this.showItemDescription(itemName);
            }
            
            // 点击非物品描述区域时隐藏描述
            if (!e.target.closest('.wasteland-inventory-item') && 
                !e.target.closest('.wasteland-item-description')) {
                this.hideItemDescription();
            }
        });
    },
    
// 显示物品描述
showItemDescription: function(itemName) {
    this.hideItemDescription();
    
    console.log('请求显示物品:', itemName);
    console.log('物品描述数据库是否存在:', typeof window.itemDescriptions !== 'undefined');
    console.log('该物品是否有描述:', window.itemDescriptions && itemName in window.itemDescriptions);
    
    // 如果物品描述数据库不存在，创建一个应急的基本描述
    if (!window.itemDescriptions) {
        console.warn('物品描述数据库未加载!');
        window.itemDescriptions = {
            '镇静丸': '一种能恢复精神的小药丸。',
            '急救包': '用于恢复生命值的医疗包。',
            '滤毒面罩': '可以过滤有害气体的面罩。',
            '绳索': '结实的绳子，可用于攀爬或固定物体。'
        };
    }
    
    const description = window.itemDescriptions[itemName] || '一个神秘的物品，没人知道它的来历和用途。';
    
    const descriptionEl = document.createElement('div');
    descriptionEl.className = 'wasteland-item-description';
    descriptionEl.innerHTML = `
        <h4>${itemName}</h4>
        <p>${description}</p>
        <button class="use-item-btn">使用物品</button>
        <div class="close-btn">×</div>
    `;
        
        const gameContainer = document.getElementById('wasteland-game');
        gameContainer.appendChild(descriptionEl);
        
        // 添加关闭按钮事件
        const closeBtn = descriptionEl.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideItemDescription());
        }
        
        // 添加使用物品按钮事件
        const useItemBtn = descriptionEl.querySelector('.use-item-btn');
        if (useItemBtn) {
            useItemBtn.addEventListener('click', () => this.useItem(itemName));
        }
        
        // 显示动画
        setTimeout(() => {
            descriptionEl.classList.add('show');
        }, 10);
    },
    
    // 隐藏物品描述
    hideItemDescription: function() {
        const descriptionEl = document.querySelector('.wasteland-item-description');
        if (descriptionEl) {
            descriptionEl.classList.remove('show');
            setTimeout(() => {
                descriptionEl.remove();
            }, 300);
        }
    },
    
    // 物品使用函数
    useItem: function(itemName) {
        // 检查物品是否存在
        if (!this.inventoryMap[itemName] || this.inventoryMap[itemName] <= 0) {
            this.showMessage('你没有这个物品');
            return;
        }
        
        // 根据物品类型应用效果
        switch(itemName) {
            case '罐头食物':
                this.attributes.hunger = Math.min(5, this.attributes.hunger + 2);
                this.showMessage('你吃了罐头食物，饥饿感减轻了。');
                break;
            case '净水罐':
                this.attributes.thirst = Math.min(5, this.attributes.thirst + 2);
                this.showMessage('你喝了净水，口渴感减轻了。');
                break;
            case '草药团':
                this.attributes.radiation = Math.max(0, this.attributes.radiation - 2);
                this.showMessage('你使用了草药，体内辐射减少了。');
                break;
            case '镇静丸':
                this.attributes.sanity = Math.min(100, this.attributes.sanity + 10);
                this.showMessage('你服用了镇静丸，感到更加镇定。');
                break;
            case '急救包':
                this.attributes.health = Math.min(5, this.attributes.health + 2);
                this.showMessage('你使用了急救包，伤口得到了处理。');
                break;
            default:
                this.showMessage('这个物品现在无法使用。');
                return;
        }
        
        // 减少物品数量
        this.inventoryMap[itemName]--;
        if (this.inventoryMap[itemName] <= 0) {
            delete this.inventoryMap[itemName];
        }
        
        // 更新物品数组
        this.updateInventoryArray();
        
        // 隐藏物品描述
        this.hideItemDescription();
        
        // 更新游戏界面
        this.renderCurrentScene();
    },
    
    // 显示消息
    showMessage: function(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'wasteland-message';
        messageEl.textContent = message;
        
        const gameContainer = document.getElementById('wasteland-game');
        gameContainer.appendChild(messageEl);
        
        // 显示动画
        setTimeout(() => {
            messageEl.classList.add('show');
        }, 10);
        
        // 自动消失
        setTimeout(() => {
            messageEl.classList.remove('show');
            setTimeout(() => {
                messageEl.remove();
            }, 300);
        }, 3000);
    },
    
    // 设置事件监听
    setupEventListeners: function() {
        const gameContainer = document.getElementById('wasteland-game');
        if (gameContainer) {
            // 使用事件委托机制监听选项点击
            gameContainer.addEventListener('click', (e) => {
                if (this.isTransitioning) return;
                
                console.log('点击事件触发, 目标元素:', e.target);
                
                if (e.target.classList.contains('wasteland-option')) {
                    const nextScene = e.target.getAttribute('data-scene');
                    console.log('选择了选项,下一场景:', nextScene);
                    if (nextScene) this.goToScene(nextScene);
                }
            });
        }
        
        const restartBtn = document.getElementById('wasteland-restart-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                if (!this.isTransitioning) this.restart();
            });
        }
        
        const backBtn = document.getElementById('wasteland-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (!this.isTransitioning) this.hide();
            });
        }
        
        // 添加排行榜按钮
        const leaderboardBtn = document.getElementById('wasteland-leaderboard-btn');
        if (leaderboardBtn) {
            leaderboardBtn.addEventListener('click', () => {
                this.toggleLeaderboard();
            });
        }
        
        // 添加排行榜关闭按钮
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('wasteland-leaderboard-close-btn')) {
                document.getElementById('wasteland-leaderboard').style.display = 'none';
            }
        });
    },
    
// 修改排行榜显示切换函数
toggleLeaderboard: function() {
    const leaderboard = document.getElementById('wasteland-leaderboard');
    const currentDisplay = leaderboard.style.display;
    
    if (currentDisplay === 'none') {
        // 显示排行榜前先清空内容
        const content = document.getElementById('wasteland-leaderboard-content');
        if (content) {
            content.innerHTML = '<div class="wasteland-loading">刷新中...</div>';
        }
        
        leaderboard.style.display = 'block';
        console.log('打开排行榜并刷新数据');
        // 始终刷新数据
        this.loadLeaderboard();
    } else {
        leaderboard.style.display = 'none';
        console.log('关闭排行榜');
    }
},
    
// 修改排行榜加载函数
loadLeaderboard: function() {
    const leaderboardContent = document.getElementById('wasteland-leaderboard-content');
    leaderboardContent.innerHTML = '<div class="wasteland-loading">加载中...</div>';
    
    // 添加时间戳防止缓存
    const timestamp = new Date().getTime();
    fetch(`https://331600.xyz/leaderboard?game=wasteland&t=${timestamp}`)
        .then(response => {
            console.log('排行榜响应状态:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('获取到排行榜数据:', data);
            let html = '';
            if (data && data.length > 0) {
                data.forEach((item, index) => {
                    // 确保结局名称不为空
                    const endingName = item.ending || '未知结局';
                    console.log(`排行榜项 #${index}: ${item.player_name}, 结局: ${endingName}`);
                    
                    html += `
                        <div class="wasteland-leaderboard-row ${index < 3 ? 'top-rank' : ''}">
                            <div class="rank">${index < 3 ? '' : index + 1}</div>
                            <div class="player">${item.player_name}</div>
                            <div class="ending">${endingName}</div>
                        </div>
                    `;
                });
            } else {
                html = '<div class="wasteland-no-data">暂无排行数据</div>';
            }
            leaderboardContent.innerHTML = html;
        })
        .catch(error => {
            console.error('获取排行榜数据失败:', error);
            leaderboardContent.innerHTML = '<div class="wasteland-error">加载失败，请稍后再试</div>';
        });
},
    
    showEndingModal: function(ending) {
        console.log('showEndingModal接收到结局ID:', ending);
    
        // 直接硬编码映射主要结局ID到标准名称
        let endingTitle;
        switch(ending) {
            case 'martyr': 
                endingTitle = '殉道者结局';
                break;
            case 'spark': 
                endingTitle = '火种结局';
                break;
            case 'scavenger': 
                endingTitle = '拾荒者结局';
                break;
            case 'skycity': 
                endingTitle = '天庭结局';
                break;
            case 'death': 
                endingTitle = '死亡结局';
                break;
            case 'despair': 
                endingTitle = '绝望结局';
                break;
            default:
                endingTitle = '神秘结局';
        }
        
        console.log('确定的结局名称:', endingTitle);

        // 标准化结局ID
        let standardEnding = ending;
        if (ending.includes('_')) {
            standardEnding = ending.split('_')[0];
        }
        
        // 如果是支线结局最终场景，转换为标准结局ID
        if (standardEnding === 'martyr_final') standardEnding = 'martyr';
        if (standardEnding === 'spark_final') standardEnding = 'spark';
        if (standardEnding === 'scavenger_final') standardEnding = 'scavenger';
        if (standardEnding === 'skycity_final') standardEnding = 'skycity';
        
        const endingName = this.getEndingName(standardEnding);

        
        const modalEl = document.createElement('div');
        modalEl.className = 'wasteland-ending-modal';
        modalEl.innerHTML = `
            <div class="wasteland-ending-content">
                <h3>你达成了结局：${endingName}</h3>
                <p>你要将此结局记录在废土编年史中吗？</p>
                <input type="text" id="wasteland-player-name" placeholder="输入你的名字" maxlength="20">
                <div class="wasteland-modal-buttons">
                    <button id="wasteland-submit-ending">记录结局</button>
                    <button id="wasteland-close-modal">关闭</button>
                </div>
            </div>
        `;
        
        const gameContainer = document.getElementById('wasteland-game');
        gameContainer.appendChild(modalEl);
        
        // 显示动画
        setTimeout(() => {
            modalEl.classList.add('show');
        }, 10);
        
        // 添加事件监听
        const submitBtn = document.getElementById('wasteland-submit-ending');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const playerName = document.getElementById('wasteland-player-name').value.trim();
                if (playerName) {
                    this.submitEnding(playerName, ending);
                    this.closeEndingModal();
                } else {
                    alert('请输入你的名字');
                }
            });
        }
        
        const closeBtn = document.getElementById('wasteland-close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeEndingModal();
            });
        }
    },
    
    // 关闭结局弹窗
    closeEndingModal: function() {
        const modalEl = document.querySelector('.wasteland-ending-modal');
        if (modalEl) {
            modalEl.classList.remove('show');
            setTimeout(() => {
                modalEl.remove();
            }, 300);
        }
    },
    
// 优化结局提交函数
submitEnding: function(playerName, ending) {
    // 直接硬编码映射结局名称
    let endingName;
    switch(ending) {
        case 'martyr': 
            endingName = '殉道者结局';
            break;
        case 'spark': 
            endingName = '火种结局';
            break;
        case 'scavenger': 
            endingName = '拾荒者结局';
            break;
        case 'skycity': 
            endingName = '天庭结局';
            break;
        case 'death': 
            endingName = '死亡结局';
            break;
        case 'despair': 
            endingName = '绝望结局';
            break;
        default:
            endingName = '神秘之旅';
    }
    
    console.log('提交结局:', ending, '结局名称:', endingName);
    
    // 构造特定格式的请求数据
    const requestData = {
        game: 'wasteland',
        player_name: playerName,
        score: 0,
        ending: endingName  // 使用硬编码的名称
    };
    
    console.log('发送结局数据:', JSON.stringify(requestData));
    
    fetch('https://331600.xyz/submit-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        console.log('提交响应状态:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('结局提交成功:', data);
        this.showMessage('你的结局已被记录在废土编年史中');
        
        // 延迟后自动显示排行榜，确保服务器数据已更新
        setTimeout(() => {
            this.toggleLeaderboard();
        }, 1000);
    })
    .catch(error => {
        console.error('结局提交失败:', error);
        this.showMessage('结局记录失败，可能是辐射干扰了信号');
    });
},
    
// 修复结局名称映射函数
getEndingName: function(endingId) {
    const endings = {
        'death': '死亡结局',
        'radiationDeath': '辐射死亡',
        'despair': '绝望结局',
        'scavenger': '拾荒者结局',
        'martyr': '殉道者结局',
        'spark': '火种结局',
        'skycity': '天庭结局'  // 添加这一行
    };
    return endings[endingId] || '神秘结局';
},

    // 在show方法开头添加调试输出
    show: function() {
        const gameContainer = document.getElementById('wasteland-game');
        if (gameContainer) {
            console.log('显示游戏容器');
            console.log('当前场景ID:', this.currentScene);
            console.log('当前场景数据:', this.scenes[this.currentScene]);
            
            gameContainer.style.display = 'block';
            document.body.classList.add('wasteland-active');
            this.isOpen = true;
            
            console.log('准备渲染初始场景');
            if (this.currentScene === 'start' && this.visitedAreas.length === 0) {
                console.log('重新开始游戏');
                this.restart();
            } else {
                console.log('渲染当前场景:', this.currentScene);
                this.renderCurrentScene();
            }
        } else {
            console.error('找不到游戏容器元素!');
        }
    },
    
    // 隐藏游戏
    hide: function() {
        const gameContainer = document.getElementById('wasteland-game');
        if (gameContainer) {
            // 先隐藏地图
            if (window.wastelandMap) {
                window.wastelandMap.hideMap();
            }
            
            gameContainer.style.display = 'none';
            document.body.classList.remove('wasteland-active');
            this.isOpen = false;
            document.getElementById('games-selection').style.display = 'block';
        }
    },
    
// 在restart函数中更新初始物品和设置
restart: function() {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    // 修改这行，使用chapter1中的awakening场景作为起点
    this.currentScene = 'awakening';
 
    // 重置物品栏为初始状态
    this.inventoryMap = {
        '镇静丸': 10,
        '急救包': 10,
        '滤毒面罩': 1,
        '绳索': 10
    };
    
    // 重置相关属性
    this.updateInventoryArray();
    this.visitedAreas = [];
    this.endingReached = null;
    this.round = 1;
    this.humanityPoints = 0;
    
    // 重置生存属性，移除饥饿和口渴
    this.attributes = {
        health: 5,
        radiation: 1,
        sanity: 100
    };
    
    // 重置章节和结局评分
    this.currentChapter = 1;
    this.endingScores = {
        humanity: 0,
        tech: 0, 
        survival: 0,
        skycity: 0
    };
    
    this.renderCurrentScene();
    
    setTimeout(() => {
        this.isTransitioning = false;
    }, 300);
},
// 添加检查章节解锁的函数
checkChapterProgress: function() {
    // 检查是否有章节解锁的关键道具
    const nextChapter = this.currentChapter + 1;
    if (nextChapter <= this.maxChapter) {
        const requiredItem = this.chapterKeyItems[this.currentChapter];
        
        // 如果有必要的关键道具，解锁下一章节
        if (requiredItem && this.inventoryMap[requiredItem]) {
            this.currentChapter = nextChapter;
            this.showMessage(`已解锁第${nextChapter}章！`);
            return true;
        }
    }
    return false;
},
    // 添加更新结局评分的函数
updateEndingScore: function(type, value) {
    if (this.endingScores.hasOwnProperty(type)) {
        this.endingScores[type] += value;
        console.log(`结局评分变更: ${type} +${value}`);
    }
},
    // 新增：更新物品数组方法（用于兼容旧代码）
    updateInventoryArray: function() {
        this.inventory = [];
        for (const itemName in this.inventoryMap) {
            const count = this.inventoryMap[itemName];
            if (count > 0) {
                // 只添加一个引用到数组中，不再添加多个重复项
                this.inventory.push(itemName);
            }
        }
    },

// 修改场景切换函数，添加结局评分处理
goToScene: function(sceneId) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    const scene = this.scenes[sceneId];
    if (!scene) {
        console.error(`场景 "${sceneId}" 不存在!`);
        this.isTransitioning = false;
        return;
    }
    
    // 查找用于执行此场景转换的选项
    const optionWithItem = this.findOptionWithItem(this.currentScene, sceneId);
    const itemToAdd = optionWithItem ? optionWithItem.item : scene.item;
    
    // 处理资源消耗（除非场景设置了skipResourceConsumption）
    if (!scene.skipResourceConsumption) {
        // 移除饥饿和口渴相关代码，只增加回合计数
        this.round += 1;
    }
    
    // 检查辐射状态
    if (this.attributes.radiation >= 5) {
        this.attributes.health = Math.max(0, this.attributes.health - 1);
    }
    
    // 记录访问区域
    if (scene.isArea && !this.visitedAreas.includes(sceneId)) {
        this.visitedAreas.push(sceneId);
    }
    
    // 处理物品拾取
    if (itemToAdd) {
        if (!this.inventoryMap[itemToAdd]) {
            this.inventoryMap[itemToAdd] = 0;
        }
        this.inventoryMap[itemToAdd]++;
        this.showMessage(`获得了物品: ${itemToAdd}`);
        this.updateInventoryArray();
        
        // 检查是否解锁新章节
        this.checkChapterProgress();
    }
    
    // 处理物品移除
    if (scene.removeItem && this.inventoryMap[scene.removeItem] && this.inventoryMap[scene.removeItem] > 0) {
        this.inventoryMap[scene.removeItem]--;
        if (this.inventoryMap[scene.removeItem] <= 0) {
            delete this.inventoryMap[scene.removeItem];
        }
        this.updateInventoryArray();
    }
    
    // 处理属性变化
    if (scene.attributeChanges) {
        for (const attr in scene.attributeChanges) {
            if (this.attributes.hasOwnProperty(attr)) {
                this.attributes[attr] += scene.attributeChanges[attr];
                
                // 确保属性值在合法范围内
                if (attr === 'sanity') {
                    this.attributes[attr] = Math.min(100, Math.max(0, this.attributes[attr]));
                } else {
                    this.attributes[attr] = Math.min(5, Math.max(0, this.attributes[attr]));
                }
            }
        }
    }
    
    // 处理结局评分变化
    if (scene.endingScores) {
        for (const scoreType in scene.endingScores) {
            this.updateEndingScore(scoreType, scene.endingScores[scoreType]);
        }
    }
    
    // 处理人性点数变化（可以考虑移除或整合到结局评分系统）
    if (scene.humanityChange) {
        this.humanityPoints += scene.humanityChange;
    }
    
    // 修复结局处理逻辑
    // 检查是否达成结局，添加更多调试信息
    if (scene.isEnding) {
        console.log('检测到结局场景:', sceneId);
        console.log('场景数据:', scene);
        
        // 记录当前结局ID
        this.endingReached = sceneId;
        
        // 将具体场景ID映射为标准结局ID
        let standardEndingId = sceneId;
        if (sceneId.includes('_')) {
            standardEndingId = sceneId.split('_')[0];
        }
        console.log('标准化后的结局ID:', standardEndingId);
        
        // 显示结局提交弹窗，使用标准结局ID
        setTimeout(() => {
            this.showEndingModal(standardEndingId);
        }, 1000);
    }
    
    // 检查游戏结束条件
    let redirectScene = null;
    
    if (this.attributes.health <= 0) {
        redirectScene = 'death';
    } else if (this.attributes.sanity <= 0) {
        redirectScene = 'despair';
    } else if (this.round >= this.maxRounds) {
        // 根据结局评分决定最终结局
        redirectScene = this.determineEnding();
    }
    
    // 在场景切换完成后更新地图位置
    setTimeout(() => {
        if (redirectScene) {
            this.currentScene = redirectScene;
        } else {
            this.currentScene = sceneId;
        }
        
        // 更新地图位置
        if (window.wastelandMap) {
            window.wastelandMap.updatePosition(this.currentScene);
        }
        
        this.renderCurrentScene();
        this.isTransitioning = false;
    }, 500);
},
// 添加根据评分确定结局的函数
determineEnding: function() {
    const scores = this.endingScores;
    
    // 找出最高分值
    let maxScore = -1;
    let maxType = null;
    let isBalanced = true;
    
    for (const type in scores) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            maxType = type;
        }
    }
    
    // 检查是否均衡（最高分不超过其他分数的50%）
    for (const type in scores) {
        if (type !== maxType && maxScore > scores[type] * 1.5) {
            isBalanced = false;
            break;
        }
    }
    
    // 决定结局类型
    if (isBalanced || maxType === 'skycity') {
        return 'skycity'; // 天庭结局（均衡或天庭分数最高）
    } else if (maxType === 'humanity') {
        return 'martyr';  // 殉道者结局（人道分数最高）
    } else if (maxType === 'tech') {
        return 'spark';   // 火种结局（技术分数最高）
    } else if (maxType === 'survival') {
        return 'scavenger'; // 拾荒者结局（生存分数最高）
    }
    
    // 默认结局
    return 'scavenger';
},

    // 添加一个辅助函数，查找具有特定nextScene和item的选项
    findOptionWithItem: function(currentSceneId, targetSceneId) {
        const currentScene = this.scenes[currentSceneId];
        if (!currentScene || !currentScene.options) return null;
        
        return currentScene.options.find(option => 
            option.nextScene === targetSceneId && option.item
        );
    },
    
// 修改属性渲染函数，移除饥饿和口渴
renderAttributes: function() {
    let html = '<div class="wasteland-attributes">';
    
    // 生命值
    html += '<div class="attribute-item health">';
    for (let i = 0; i < 5; i++) {
        if (i < this.attributes.health) {
            html += '<span class="heart full">❤️</span>';
        } else {
            html += '<span class="heart empty">🖤</span>';
        }
    }
    html += '</div>';
    
    // 辐射值
    let radiationClass = '';
    if (this.attributes.radiation < 2) radiationClass = 'low';
    else if (this.attributes.radiation < 4) radiationClass = 'medium';
    else radiationClass = 'high';
    
    html += `<div class="attribute-item radiation ${radiationClass}">`;
    html += `☢️ ${this.attributes.radiation}/5`;
    html += '</div>';
    
    // 精神状态
    let sanityClass = '';
    if (this.attributes.sanity > 60) sanityClass = 'positive';
    else if (this.attributes.sanity < 30) sanityClass = 'negative';

    html += `<div class="attribute-item sanity ${sanityClass}">`;
    html += `🧠 ${this.attributes.sanity}/100`;
    html += '</div>';
    
    // 回合计数
    html += `<div class="attribute-item round">`;
    html += `⏱️ ${this.round}/${this.maxRounds}`;
    html += '</div>';
    
    // 添加当前章节显示
    html += `<div class="attribute-item chapter">`;
    html += `📖 第${this.currentChapter}章`;
    html += '</div>';
    
    html += '</div>';
    
    return html;
},

// 添加一个调试函数，显示当前评分状态（可根据需要使用）
renderEndingScores: function() {
    let html = '<div class="wasteland-ending-scores">';
    html += '<h4>结局评分（调试用）</h4>';
    
    for (const type in this.endingScores) {
        let label = '';
        switch(type) {
            case 'humanity': label = '人道'; break;
            case 'tech': label = '技术'; break;
            case 'survival': label = '生存'; break;
            case 'skycity': label = '天庭'; break;
        }
        
        html += `<div class="score-item">${label}: ${this.endingScores[type]}</div>`;
    }
    
    html += '</div>';
    return html;
},
    
    // 修改renderCurrentScene函数，将选项区域放在固定容器中
    renderCurrentScene: function() {
        const scene = this.scenes[this.currentScene];
        if (!scene) {
            console.error('找不到场景:', this.currentScene);
            return;
        }
        
        const container = document.querySelector('.wasteland-content');
        if (!container) {
            console.error('找不到内容容器元素!');
            return;
        }
        
        console.log('渲染场景:', this.currentScene);
        console.log('场景选项数量:', scene.options ? scene.options.length : 0);

        const newScene = document.createElement('div');
        newScene.className = 'wasteland-scene new-scene';
        
        let html = `
            <h3>${scene.title}</h3>
            ${this.renderAttributes()}
            <p>${scene.description}</p>`;
        
        // 不在场景内容中添加物品栏和选项，只保留基本描述
        newScene.innerHTML = html;
        
        const oldScene = container.querySelector('.wasteland-scene');
        
        // 创建一个单独的选项容器
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'wasteland-options-container';
        
        let optionsHtml = '';
        
        // 选项
        if (scene.options && scene.options.length > 0) {
            optionsHtml += `<div class="wasteland-options">`;
            
            scene.options.forEach(option => {
                let isDisabled = false;
                let disabledReason = '';
                
                // 检查物品需求
                if (option.requiredItem && !this.inventory.includes(option.requiredItem)) {
                    isDisabled = true;
                    disabledReason = `(需要: ${option.requiredItem})`;
                }
                
                // 检查派系信任需求
                if (option.requiredTrust) {
                    for (const faction in option.requiredTrust) {
                        if (this.factionTrust[faction] < option.requiredTrust[faction]) {
                            isDisabled = true;
                            let factionName = this.getFactionName(faction);
                            disabledReason = `(需要更高的${factionName}信任)`;
                        }
                    }
                }
                
                // 检查属性需求
                if (option.requiredAttributes) {
                    for (const attr in option.requiredAttributes) {
                        if (this.attributes[attr] < option.requiredAttributes[attr]) {
                            isDisabled = true;
                            disabledReason = `(需要更高的${this.getAttributeName(attr)})`;
                        }
                    }
                }
                
                optionsHtml += `<button class="wasteland-option ${isDisabled ? 'disabled' : ''}" 
                        data-scene="${option.nextScene}" 
                        ${isDisabled ? 'disabled' : ''}>
                        ${option.text} ${disabledReason}
                        </button>`;
            });
            
            optionsHtml += `</div>`;
        }
        
        // 结局重新开始按钮
        if (scene.isEnding) {
            optionsHtml += `<button id="wasteland-restart-btn" class="wasteland-restart">重新开始</button>`;
        }
        
        optionsContainer.innerHTML = optionsHtml;
        
        // 更新DOM
        if (oldScene) {
            oldScene.classList.add('fade-out');
            
            setTimeout(() => {
                container.innerHTML = '';
                container.appendChild(newScene);
                
                // 更新选项容器
                const oldOptionsContainer = document.querySelector('.wasteland-options-container');
                if (oldOptionsContainer) {
                    oldOptionsContainer.remove();
                }
                const gameElement = document.getElementById('wasteland-game');
                gameElement.appendChild(optionsContainer);
                
                setTimeout(() => {
                    newScene.classList.add('fade-in');
                }, 10);
                
                // 绑定选项点击事件
                this.bindOptionEvents(optionsContainer);
            }, 200);
        } else {
            container.innerHTML = '';
            container.appendChild(newScene);
            
            // 更新选项容器
            const oldOptionsContainer = document.querySelector('.wasteland-options-container');
            if (oldOptionsContainer) {
                oldOptionsContainer.remove();
            }
            const gameElement = document.getElementById('wasteland-game');
            gameElement.appendChild(optionsContainer);
            
            setTimeout(() => {
                newScene.classList.add('fade-in');
            }, 10);
            
            // 绑定选项点击事件
            this.bindOptionEvents(optionsContainer);
        }

        // 更新物品栏按钮
        this.updateInventoryButton();
    },
    
    // 获取派系名称
    getFactionName: function(faction) {
        const factionNames = {
            wheelchairGang: '轮椅帮',
            vultureClients: '秃鹰客',
            fireSkinners: '火皮众',
            oldStreetBrotherhood: '老街兄弟会'
        };
        return factionNames[faction] || faction;
    },
    
    // 获取属性名称
    getAttributeName: function(attr) {
        const attrNames = {
            health: '生命',
            hunger: '饱食度',
            thirst: '水分',
            radiation: '辐射抵抗',
            sanity: '精神状态'
        };
        return attrNames[attr] || attr;
    },
// 绑定选项事件的辅助函数
bindOptionEvents: function(container) {
    const options = container.querySelectorAll('.wasteland-option');
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            if (this.isTransitioning) return;
            
            const nextScene = e.target.getAttribute('data-scene');
            if (nextScene) this.goToScene(nextScene);
        });
    });
    
    const restartBtn = container.querySelector('#wasteland-restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            if (!this.isTransitioning) this.restart();
        });
    }
},
// 添加物品栏按钮
addInventoryButton: function() {
    // 检查按钮是否已存在
    if (document.querySelector('.wasteland-inventory-toggle')) {
        return;
    }
    
    // 创建按钮
    const btnEl = document.createElement('button');
    btnEl.className = 'wasteland-inventory-toggle';
    btnEl.innerHTML = `背包 <span class="badge">0</span>`;
    
    // 添加到游戏界面
    const gameContainer = document.getElementById('wasteland-game');
    if (gameContainer) {
        gameContainer.appendChild(btnEl);
    }
    
    // 创建物品栏弹窗容器
    const popupEl = document.createElement('div');
    popupEl.className = 'wasteland-inventory-popup';
    gameContainer.appendChild(popupEl);
    
    // 绑定点击事件
    btnEl.addEventListener('click', () => {
        this.toggleInventoryPopup();
    });
    
    // 更新物品数量
    this.updateInventoryButton();
},

    // 更新物品栏按钮
    updateInventoryButton: function() {
        // 确保物品栏按钮存在
        let btnEl = document.querySelector('.wasteland-inventory-toggle');
        if (!btnEl) {
            this.addInventoryButton();
        } else {
            // 更新物品数量
            const badge = btnEl.querySelector('.badge');
            if (badge) {
                badge.textContent = this.inventory.length;
            }
        }
    },

    // 物品栏弹窗
    toggleInventoryPopup: function() {
        const popupEl = document.querySelector('.wasteland-inventory-popup');
        
        if (popupEl.classList.contains('active')) {
            // 隐藏弹窗
            popupEl.classList.remove('active');
        } else {
            // 计算物品总数
            let totalItems = 0;
            for (const item in this.inventoryMap) {
                totalItems += this.inventoryMap[item];
            }
            
            // 显示弹窗并更新内容
            if (totalItems > 0) {
                let itemsHtml = '';
                for (const itemName in this.inventoryMap) {
                    const count = this.inventoryMap[itemName];
                    itemsHtml += `<li class="wasteland-inventory-item" data-item="${itemName}">${itemName} <span class="item-count">x${count}</span></li>`;
                }
                
                popupEl.innerHTML = `
                    <h4>物品栏 (${totalItems}/1000)</h4>
                    <div class="inventory-scroll">
                        <ul class="inventory-list">
                            ${itemsHtml}
                        </ul>
                    </div>
                    <button class="inventory-close-btn">关闭</button>
                `;
            } else {
                popupEl.innerHTML = `
                    <h4>物品栏 (0/1000)</h4>
                    <p class="empty-inventory">空空如也</p>
                    <button class="inventory-close-btn">关闭</button>
                `;
            }
            
            // 绑定关闭按钮事件
            const closeBtn = popupEl.querySelector('.inventory-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    popupEl.classList.remove('active');
                });
            }
            
            // 绑定物品点击事件
            const items = popupEl.querySelectorAll('.wasteland-inventory-item');
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    const clickedElement = e.target.closest('.wasteland-inventory-item');
                    const itemName = clickedElement.getAttribute('data-item');
                    this.showItemDescription(itemName);
                    popupEl.classList.remove('active');
                });
            });
            
            popupEl.classList.add('active');
        }
    }


};

// DOM加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    wastelandGame.init();
    
    const wastelandButton = document.getElementById('wasteland-select-btn');
    if (wastelandButton) {
        wastelandButton.addEventListener('click', () => {
            document.getElementById('games-selection').style.display = 'none';
            wastelandGame.show();
        });
    }
});