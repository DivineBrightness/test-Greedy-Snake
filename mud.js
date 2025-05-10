// 废土余生：60秒风格文字冒险游戏
const wastelandGame = {
    // 修改物品存储结构从数组改为对象
    inventory: [],      // 保持原有属性名，但改变内部实现
    inventoryMap: {},   // 新增物品计数映射
    
    // 其他属性保持不变
    isOpen: false,
    currentScene: 'start',
    visitedAreas: [],
    endingReached: null,
    round: 1,
    maxRounds: 60,
    
    // 生存属性
    attributes: {
        health: 5,
        hunger: 5,
        thirst: 5,
        radiation: 1,
        sanity: 100
    },
    
    // 人性点数
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
    
    // 切换排行榜显示
    toggleLeaderboard: function() {
        const leaderboard = document.getElementById('wasteland-leaderboard');
        if (leaderboard.style.display === 'none') {
            leaderboard.style.display = 'block';
            this.loadLeaderboard();
        } else {
            leaderboard.style.display = 'none';
        }
    },
    
    // 加载排行榜数据
    loadLeaderboard: function() {
        const leaderboardContent = document.getElementById('wasteland-leaderboard-content');
        leaderboardContent.innerHTML = '<div class="wasteland-loading">加载中...</div>';
        
        fetch('https://331600.xyz/leaderboard?game=wasteland')
            .then(response => response.json())
            .then(data => {
                let html = '';
                if (data && data.length > 0) {
                    data.forEach((item, index) => {
                        html += `
                            <div class="wasteland-leaderboard-row ${index < 3 ? 'top-rank' : ''}">
                                <div class="rank">${index + 1}</div>
                                <div class="player">${item.player_name}</div>
                                <div class="ending">${item.ending || '未知结局'}</div>
                                <div class="date">${new Date(item.timestamp).toLocaleDateString()}</div>
                            </div>
                        `;
                    });
                } else {
                    html = '<div class="wasteland-no-data">暂无排行数据</div>';
                }
                leaderboardContent.innerHTML = html;
            })
            .catch(error => {
                leaderboardContent.innerHTML = '<div class="wasteland-error">加载失败，请稍后再试</div>';
                console.error('获取排行榜数据失败:', error);
            });
    },
    
    // 显示游戏结束与排行榜提交弹窗
    showEndingModal: function(ending) {
        const endingName = this.getEndingName(ending);
        
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
    
    // 提交结局到排行榜
    submitEnding: function(playerName, ending) {
        fetch('https://331600.xyz/submit-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                game: 'wasteland',
                player_name: playerName,
                score: 0,
                ending: this.getEndingName(ending)
            })
        })
        .then(response => response.json())
        .then(data => {
            this.showMessage('你的结局已被记录在废土编年史中');
        })
        .catch(error => {
            this.showMessage('结局记录失败，可能是辐射干扰了信号');
            console.error('提交结局失败:', error);
        });
    },
    
    // 获取结局名称
    getEndingName: function(endingId) {
        const endings = {
            'death': '死亡结局',
            'radiationDeath': '辐射死亡',
            'despair': '绝望结局',
            'scavenger': '拾荒者结局',
            'martyr': '殉道者结局',
            'spark': '火种结局'
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
    
    // 重置函数，初始化物品栏
    restart: function() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentScene = 'start';
        
        // 重置物品栏为空映射对象
        this.inventoryMap = {
            '罐头食物': 100,
            '净水罐': 100,
            '镇静丸': 10,
            '急救包': 10
        };
        
        // 更新物品总数数组（兼容性）
        this.updateInventoryArray();
        
        this.visitedAreas = [];
        this.endingReached = null;
        this.round = 1;
        this.humanityPoints = 0;
        
        // 重置生存属性
        this.attributes = {
            health: 5,
            hunger: 5,
            thirst: 5,
            radiation: 1,
            sanity: 100
        };
        
        this.renderCurrentScene();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
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

    // 修改场景切换函数，处理属性范围
    goToScene: function(sceneId) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        const scene = this.scenes[sceneId];
        if (!scene) {
            console.error(`场景 "${sceneId}" 不存在!`);
            this.isTransitioning = false;
            return;
        }
        
        // 保存当前属性值
        const oldAttributes = {...this.attributes};
        
        // 查找用于执行此场景转换的选项，以检查是否有物品
        const optionWithItem = this.findOptionWithItem(this.currentScene, sceneId);
        const itemToAdd = optionWithItem ? optionWithItem.item : scene.item;
        
        // 处理资源消耗（除非场景设置了skipResourceConsumption）
        if (!scene.skipResourceConsumption) {
            this.attributes.hunger = Math.max(0, this.attributes.hunger - 1);
            this.attributes.thirst = Math.max(0, this.attributes.thirst - 1);
            this.round += 1;
        }
        
        // 检查饥饿和口渴状态
        if (this.attributes.hunger === 0) {
            this.attributes.health = Math.max(0, this.attributes.health - 1);
        }
        
        if (this.attributes.thirst === 0) {
            this.attributes.health = Math.max(0, this.attributes.health - 1);
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
            // 初始化物品计数
            if (!this.inventoryMap[itemToAdd]) {
                this.inventoryMap[itemToAdd] = 0;
            }
            
            // 增加物品计数
            this.inventoryMap[itemToAdd]++;
            this.showMessage(`获得了物品: ${itemToAdd}`);
            
            // 更新物品数组
            this.updateInventoryArray();
        }
        
        // 处理物品移除
        if (scene.removeItem && this.inventoryMap[scene.removeItem] && this.inventoryMap[scene.removeItem] > 0) {
            this.inventoryMap[scene.removeItem]--;
            
            if (this.inventoryMap[scene.removeItem] <= 0) {
                delete this.inventoryMap[scene.removeItem];
            }
            
            // 更新物品数组
            this.updateInventoryArray();
        }
        
        // 处理属性变化
        if (scene.attributeChanges) {
            for (const attr in scene.attributeChanges) {
                if (this.attributes.hasOwnProperty(attr)) {
                    this.attributes[attr] += scene.attributeChanges[attr];
                    
                    // 确保属性值在合法范围内
                    if (attr === 'sanity') {
                        this.attributes[attr] = Math.min(100, Math.max(0, this.attributes[attr])); // 修改为0-100
                    } else {
                        this.attributes[attr] = Math.min(5, Math.max(0, this.attributes[attr]));
                    }
                }
            }
        }
        
        // 处理人性点数变化
        if (scene.humanityChange) {
            this.humanityPoints += scene.humanityChange;
        }
        
        // 移除派系信任度处理
        
        // 检查是否达成结局
        if (scene.isEnding) {
            this.endingReached = sceneId;
            
            // 显示结局提交弹窗
            setTimeout(() => {
                this.showEndingModal(sceneId);
            }, 1000);
        }
        
        // 检查游戏结束条件
        let redirectScene = null;
        
        if (this.attributes.health <= 0) {
            redirectScene = 'death';
        } else if (this.attributes.sanity <= 0) { // 精神值为0时触发绝望结局
            redirectScene = 'despair';
        } else if (this.round >= this.maxRounds) {
            // 根据人性点数决定结局
            if (this.humanityPoints >= 3) {
                redirectScene = 'spark';
            } else {
                redirectScene = 'scavenger';
            }
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


    // 添加一个辅助函数，查找具有特定nextScene和item的选项
    findOptionWithItem: function(currentSceneId, targetSceneId) {
        const currentScene = this.scenes[currentSceneId];
        if (!currentScene || !currentScene.options) return null;
        
        return currentScene.options.find(option => 
            option.nextScene === targetSceneId && option.item
        );
    },
    
    // 修改属性渲染函数，适应新的属性范围
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
        
        // 饥饿值
        html += '<div class="attribute-item hunger">';
        for (let i = 0; i < 5; i++) {
            if (i < this.attributes.hunger) {
                html += '<span class="food full">🍗</span>';
            } else {
                html += '<span class="food empty">⚪</span>';
            }
        }
        html += '</div>';
        
        // 口渴值
        html += '<div class="attribute-item thirst">';
        for (let i = 0; i < 5; i++) {
            if (i < this.attributes.thirst) {
                html += '<span class="water full">💧</span>';
            } else {
                html += '<span class="water empty">⚪</span>';
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
        
        // 精神状态 - 满值100为健康状态
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