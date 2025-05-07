// mud.js - 荒野求生文字冒险游戏
const mudGame = {
    isOpen: false,
    currentScene: 'start',
    inventory: [],
    visitedAreas: [], // 改为 visitedAreas 表示探索过的区域
    endingReached: null,
    
    get scenes() {
        return window.mudScenes;
      },
      
    // 游戏初始化
    init: function() {
      this.setupEventListeners();
    },
    
    // 设置事件监听器保持不变
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
    
    // 显示、隐藏和重启游戏的方法保持不变
    show: function() {
      const gameContainer = document.getElementById('mud-game');
      if (gameContainer) {
        gameContainer.style.display = 'block';
        document.body.classList.add('mud-active'); // 防止页面滚动
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
      this.renderCurrentScene();
    },
    
    // 前往场景
    goToScene: function(sceneId) {
      // 记录访问过的区域
      if (this.scenes[sceneId].isArea && !this.visitedAreas.includes(sceneId)) {
        this.visitedAreas.push(sceneId);
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
    
    // 渲染当前场景方法保持不变
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
        <p>${scene.description}</p>`;
      
      // 如果有物品栏，显示物品
      if (this.inventory.length > 0) {
        html += `<div class="mud-inventory">
          <h4>背包:</h4>
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
      
      // 如果是结局，可以保存玩家数据
      if (scene.isEnding && typeof window.submitScore === 'function') {
        // 可以在这里实现结局统计和排行榜提交
      }
    },
    

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