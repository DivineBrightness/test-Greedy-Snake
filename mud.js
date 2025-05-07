// mud.js - 废土余生文字冒险游戏
const mudGame = {
    isOpen: false,
    currentScene: 'start',
    inventory: [],
    visitedAreas: [],
    endingReached: null,
    // 添加血量系统
    maxHealth: 3,
    health: 3,
    radiation: 0, // 辐射值
    trust: {}, // 派系信任度
    
    get scenes() {
        return window.mudScenes;
    },

    // 游戏初始化
    init: function() {
        this.setupEventListeners();
        this.setupItemClickListeners();
    },
    
    // 设置物品点击监听
    setupItemClickListeners: function() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('mud-inventory-item')) {
                const itemName = e.target.textContent;
                this.showItemDescription(itemName);
            }
            
            // 点击其他区域关闭物品描述
            if (!e.target.classList.contains('mud-inventory-item') && 
                !e.target.closest('.mud-item-description')) {
                this.hideItemDescription();
            }
        });
    },
    
    // 显示物品描述
    showItemDescription: function(itemName) {
        // 隐藏任何已存在的物品描述
        this.hideItemDescription();
        
        // 获取物品描述
        const description = window.itemDescriptions[itemName] || '一个神秘的物品，没人知道它的来历和用途。';
        
        // 创建物品描述元素
        const descriptionEl = document.createElement('div');
        descriptionEl.className = 'mud-item-description';
        descriptionEl.innerHTML = `
            <h4>${itemName}</h4>
            <p>${description}</p>
            <div class="close-btn">×</div>
        `;
        
        // 添加到游戏容器
        const gameContainer = document.getElementById('mud-game');
        gameContainer.appendChild(descriptionEl);
        
        // 添加关闭按钮事件
        const closeBtn = descriptionEl.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideItemDescription());
        }
        
        // 显示动画
        setTimeout(() => {
            descriptionEl.classList.add('show');
        }, 10);
    },
    
    // 隐藏物品描述
    hideItemDescription: function() {
        const descriptionEl = document.querySelector('.mud-item-description');
        if (descriptionEl) {
            descriptionEl.classList.remove('show');
            setTimeout(() => {
                descriptionEl.remove();
            }, 300); // 等待动画完成再移除
        }
    },
    
    // 设置事件监听器
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
    
    show: function() {
        const gameContainer = document.getElementById('mud-game');
        if (gameContainer) {
            gameContainer.style.display = 'block';
            document.body.classList.add('mud-active');
            this.isOpen = true;
            
            // 如果是新游戏，重置状态
            if (this.currentScene === 'start' && this.visitedAreas.length === 0) {
                this.restart();
            } else {
                this.renderCurrentScene();
            }
        }
    },
    
    hide: function() {
        const gameContainer = document.getElementById('mud-game');
        if (gameContainer) {
            gameContainer.style.display = 'none';
            document.body.classList.remove('mud-active');
            this.isOpen = false;
            document.getElementById('games-selection').style.display = 'block';
        }
    },
    
    restart: function() {
        this.currentScene = 'start';
        this.inventory = [];
        this.visitedAreas = [];
        this.endingReached = null;
        this.health = this.maxHealth;
        this.radiation = 0;
        this.trust = {};
        this.renderCurrentScene();
    },
    
    // 修改前往场景方法，添加血量和辐射处理
    goToScene: function(sceneId) {
        const scene = this.scenes[sceneId];
        
        // 保存血量和辐射旧值，用于之后比较变化
        const oldHealth = this.health;
        const oldRadiation = this.radiation;
        let shouldGoToDeath = false; // 标记是否应该跳转到死亡场景
        let shouldGoToRadiationDeath = false; // 标记是否应该跳转到辐射死亡场景
        
        // 记录访问过的区域
        if (scene.isArea && !this.visitedAreas.includes(sceneId)) {
            this.visitedAreas.push(sceneId);
        }
        
        // 处理物品拾取
        if (scene.item && !this.inventory.includes(scene.item)) {
            this.inventory.push(scene.item);
        }
        
        // 处理物品移除
        if (scene.removeItem && this.inventory.includes(scene.removeItem)) {
            this.inventory = this.inventory.filter(item => item !== scene.removeItem);
        }
        
        // 处理血量变化 - 存储变化类型用于动画
        if (scene.healthChange) {
            // 记录是加血还是掉血
            this.healthChangeType = scene.healthChange > 0 ? 'healing' : 'damaged';
            
            this.health = Math.max(0, this.health + scene.healthChange);
            if (this.health <= 0) {
                // 如果血量为0，标记需要前往死亡场景
                shouldGoToDeath = true;
            }
            // 确保不超过最大血量
            this.health = Math.min(this.maxHealth, this.health);
        } else {
            this.healthChangeType = null;
        }
        
        // 处理辐射值变化
        if (scene.radiationChange) {
            // 记录辐射是否变化
            this.radiationChanged = true;
            
            this.radiation = Math.max(0, this.radiation + scene.radiationChange);
            if (this.radiation >= 100) {
                // 辐射值过高，标记需要前往辐射死亡场景
                shouldGoToRadiationDeath = true;
            }
        } else {
            this.radiationChanged = false;
        }
        
        // 处理派系信任度
        if (scene.trustChange) {
            for (const faction in scene.trustChange) {
                if (!this.trust[faction]) {
                    this.trust[faction] = 0;
                }
                this.trust[faction] += scene.trustChange[faction];
            }
        }
        
        // 检查结局
        if (scene.isEnding) {
            this.endingReached = sceneId;
        }
        
        // 如果有血量或辐射变化，先显示动画再切换场景
        if (this.healthChangeType || this.radiationChanged) {
            this.animateHealthChanges(oldHealth, oldRadiation, () => {
                // 动画结束后检查是否应该前往死亡场景
                if (shouldGoToDeath) {
                    this.currentScene = 'death';
                } else if (shouldGoToRadiationDeath) {
                    this.currentScene = 'radiationDeath';
                } else {
                    this.currentScene = sceneId;
                }
                this.renderCurrentScene();
            });
        } else {
            // 没有变化，直接切换场景
            if (shouldGoToDeath) {
                this.currentScene = 'death';
            } else if (shouldGoToRadiationDeath) {
                this.currentScene = 'radiationDeath';
            } else {
                this.currentScene = sceneId;
            }
            this.renderCurrentScene();
        }
    },

    // 添加新方法：血量变化动画
    animateHealthChanges: function(oldHealth, oldRadiation, callback) {
        // 获取当前显示的血量区域
        const healthDisplay = document.querySelector('.mud-health');
        if (!healthDisplay) {
            // 如果找不到健康显示区域，直接执行回调
            callback();
            return;
        }
        
        // 渲染带动画的血量
        let healthHTML = '';
        for (let i = 1; i <= this.maxHealth; i++) {
            if (i <= this.health) {
                // 如果是变化的那个血量，添加动画类
                if (this.healthChangeType === 'healing' && i > oldHealth && i <= this.health) {
                    healthHTML += '<span class="heart full healing">❤️</span>';
                } else if (this.healthChangeType === 'damaged' && i === this.health) {
                    healthHTML += '<span class="heart full damaged">❤️</span>';
                } else {
                    healthHTML += '<span class="heart full">❤️</span>';
                }
            } else {
                healthHTML += '<span class="heart empty">🖤</span>';
            }
        }
        
        // 添加辐射值显示
        let radiationClass = 'radiation';
        
        // 根据辐射级别添加颜色类
        if (this.radiation < 25) {
            radiationClass += ' low';
        } else if (this.radiation < 50) {
            radiationClass += ' medium';
        } else if (this.radiation < 75) {
            radiationClass += ' high';
        } else {
            radiationClass += ' critical';
        }
        
        // 如果辐射值变化了，添加动画类
        if (this.radiationChanged) {
            radiationClass += ' changing';
        }
        
        healthHTML += `<span class="${radiationClass}">☢️ ${this.radiation}%</span>`;
        
        // 更新血量显示
        healthDisplay.innerHTML = healthHTML;
        
        // 等待动画播放结束后执行回调
        setTimeout(callback, 1500);
    },

    // 渲染血量方法
    renderHealth: function() {
        let healthHTML = '<div class="mud-health">';
        for (let i = 1; i <= this.maxHealth; i++) {
            if (i <= this.health) {
                healthHTML += '<span class="heart full">❤️</span>';
            } else {
                healthHTML += '<span class="heart empty">🖤</span>';
            }
        }
        
        // 添加辐射值显示，并根据辐射级别添加颜色
        let radiationClass = 'radiation';
        if (this.radiation < 25) {
            radiationClass += ' low';
        } else if (this.radiation < 50) {
            radiationClass += ' medium';
        } else if (this.radiation < 75) {
            radiationClass += ' high';
        } else {
            radiationClass += ' critical';
        }
        
        healthHTML += `<span class="${radiationClass}">☢️ ${this.radiation}%</span>`;
        healthHTML += '</div>';
        
        return healthHTML;
    },
    
    // 修改渲染当前场景的方法，添加血量显示
    renderCurrentScene: function() {
        const scene = this.scenes[this.currentScene];
        const container = document.querySelector('.mud-content');
        
        if (!container) return;
        
        // 创建新场景元素
        const newScene = document.createElement('div');
        newScene.className = 'mud-scene new-scene';
        
        // 创建场景文本
        let html = `
            <h3>${scene.title}</h3>
            ${this.renderHealth()}
            <p>${scene.description}</p>`;
        
        // 如果有物品栏，显示物品
        if (this.inventory.length > 0) {
            html += `<div class="mud-inventory">
                <h4>物品栏:</h4>
                <ul>
                    ${this.inventory.map(item => `<li class="mud-inventory-item">${item}</li>`).join('')}
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
                
                // 检查选项是否需要特定信任度
                if (option.requiredTrust) {
                    for (const faction in option.requiredTrust) {
                        if (!this.trust[faction] || this.trust[faction] < option.requiredTrust[faction]) {
                            isDisabled = true;
                            disabledReason = `(需要更多${faction}信任)`;
                        }
                    }
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
            }, 200); // 200毫秒等待淡出完成
        } else {
            // 如果不存在当前场景（首次加载），直接添加新场景
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