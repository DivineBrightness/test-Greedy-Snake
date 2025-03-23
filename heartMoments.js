// heartMoments.js - 心动瞬间记录功能

const heartMoments = {
  // 存储心动瞬间的数组
  moments: [],
  
  // 初始化函数
  init: function() {
    console.log('初始化心动瞬间功能');
    // 从本地存储加载已保存的心动瞬间
    this.loadFromLocalStorage();
  },
  
  // 显示心动瞬间页面
  show: function() {
    console.log('显示心动瞬间页面');
    
    // 创建心动瞬间页面元素
    const heartMomentsElement = document.createElement('div');
    heartMomentsElement.id = 'heart-moments';
    heartMomentsElement.className = 'heart-moments-container';
    
    // 设置心动瞬间页面内容
    heartMomentsElement.innerHTML = `
      <div class="heart-moments-content">
        <button class="back-btn" id="heart-moments-back-btn"></button>
        <div class="heart-moments-header">
          <h2>心动瞬间</h2>
          <div class="heart-shine"></div>
        </div>
        
        <div class="heart-moments-form">
          <textarea id="new-moment" placeholder="记录一个心动瞬间..." maxlength="200"></textarea>
          <button id="save-moment-btn">保存</button>
        </div>
        
        <div class="heart-moments-list">
          <h3>我的心动记录</h3>
          <div id="moments-container">
            ${this.renderMoments()}
          </div>
        </div>
      </div>
    `;
    
    // 添加到文档
    document.querySelector('.container').appendChild(heartMomentsElement);
    
    // 设置心动瞬间页面样式
    this.applyStyles();
    
    // 显示心动瞬间页面
    setTimeout(() => {
      heartMomentsElement.classList.add('open');
      
      // 添加事件监听器
      this.attachEventListeners();
    }, 100);
  },
  
  // 隐藏心动瞬间页面
hide: function() {
    const heartMomentsElement = document.getElementById('heart-moments');
    if (!heartMomentsElement) return;
    
    heartMomentsElement.classList.remove('open');
    
    // 延迟移除元素
    setTimeout(() => {
      heartMomentsElement.remove();
      console.log('关闭心动瞬间页面！');
      
      // 不再返回宝箱页面，而是直接返回首页
      document.querySelector('.season-controls').style.display = 'flex';
      document.getElementById('games-btn').style.display = 'inline-block';
      document.getElementById('games-selection').style.display = 'none';
      document.getElementById('snake-game').style.display = 'none';
      document.getElementById('tetris-game').style.display = 'none';
      const pageTitle = document.getElementById('page-title') || document.querySelector('.container h1');
      if (pageTitle) {
        pageTitle.style.display = 'block';
      }
    }, 300);
  },
  
  // 渲染所有心动瞬间
  renderMoments: function() {
    if (this.moments.length === 0) {
      return '<div class="empty-moments">暂无记录，开始记录你的心动瞬间吧！</div>';
    }
    
    return this.moments.map((moment, index) => `
      <div class="moment-item" data-index="${index}">
        <div class="moment-content">${this.escapeHTML(moment.content)}</div>
        <div class="moment-time">${moment.time}</div>
        <button class="delete-moment-btn" data-index="${index}">删除</button>
      </div>
    `).join('');
  },
  
  // 添加新的心动瞬间
  addMoment: function(content) {
    if (!content.trim()) return;
    
    // 创建新的心动瞬间对象
    const newMoment = {
      content: content.trim(),
      time: new Date().toLocaleString('zh-CN')
    };
    
    // 添加到数组
    this.moments.unshift(newMoment);
    
    // 保存到本地存储
    this.saveToLocalStorage();
    
    // 更新显示
    const momentsContainer = document.getElementById('moments-container');
    if (momentsContainer) {
      momentsContainer.innerHTML = this.renderMoments();
      this.attachDeleteListeners();
    }
  },
  
  // 删除心动瞬间
  deleteMoment: function(index) {
    if (index < 0 || index >= this.moments.length) return;
    
    // 删除指定索引的心动瞬间
    this.moments.splice(index, 1);
    
    // 保存到本地存储
    this.saveToLocalStorage();
    
    // 更新显示
    const momentsContainer = document.getElementById('moments-container');
    if (momentsContainer) {
      momentsContainer.innerHTML = this.renderMoments();
      this.attachDeleteListeners();
    }
  },
  
  // 附加事件监听器
  attachEventListeners: function() {
    // 添加返回按钮事件
    const backBtn = document.getElementById('heart-moments-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.hide());
    }
    
    // 添加保存按钮事件
    const saveBtn = document.getElementById('save-moment-btn');
    const textarea = document.getElementById('new-moment');
    
    if (saveBtn && textarea) {
      saveBtn.addEventListener('click', () => {
        this.addMoment(textarea.value);
        textarea.value = '';
      });
      
      // 添加回车键提交
      textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          saveBtn.click();
        }
      });
    }
    
    // 添加删除按钮事件
    this.attachDeleteListeners();
  },
  
  // 附加删除按钮事件
  attachDeleteListeners: function() {
    const deleteButtons = document.querySelectorAll('.delete-moment-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        this.deleteMoment(index);
      });
    });
  },
  
  // 从本地存储加载数据
  loadFromLocalStorage: function() {
    try {
      const savedMoments = localStorage.getItem('heartMoments');
      if (savedMoments) {
        this.moments = JSON.parse(savedMoments);
      }
    } catch (error) {
      console.error('加载心动瞬间失败:', error);
      this.moments = [];
    }
  },
  
  // 保存数据到本地存储
  saveToLocalStorage: function() {
    try {
      localStorage.setItem('heartMoments', JSON.stringify(this.moments));
    } catch (error) {
      console.error('保存心动瞬间失败:', error);
    }
  },
  
  // HTML转义函数，防止XSS攻击
  escapeHTML: function(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },
  
  // 应用样式
  applyStyles: function() {
    // 如果已经添加过样式则不重复添加
    if (document.getElementById('heart-moments-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'heart-moments-styles';
    styleElement.textContent = `
      .heart-moments-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .heart-moments-container.open {
        opacity: 1;
      }
      
      .heart-moments-content {
        position: relative;
        background: linear-gradient(145deg, #ffecef, #ffd1d7);
        padding: 30px;
        border-radius: 15px;
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3), 0 0 50px rgba(255, 182, 193, 0.2);
        text-align: center;
        overflow-y: auto;
        border: 2px solid #ff6b8b;
      }
      
      .heart-moments-header {
        position: relative;
        margin-bottom: 25px;
      }
      
      .heart-moments-header h2 {
        color: #e75480;
        font-size: 28px;
        margin: 0;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .heart-shine {
        position: absolute;
        top: -10px;
        left: 50%;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(255,105,180,0.7) 0%, rgba(255,105,180,0) 70%);
        transform: translateX(-50%);
        animation: pulse 2s infinite;
      }
      
      .heart-moments-form {
        margin-bottom: 30px;
      }
      
      #new-moment {
        width: 100%;
        height: 80px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ffb6c1;
        resize: none;
        font-size: 16px;
        margin-bottom: 10px;
        background-color: rgba(255, 255, 255, 0.9);
      }
      
      #save-moment-btn {
        background: linear-gradient(to right, #ff758c, #ff7eb3);
        border: none;
        color: white;
        padding: 8px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease;
      }
      
      #save-moment-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
      }
      
      .heart-moments-list {
        text-align: left;
      }
      
      .heart-moments-list h3 {
        color: #e75480;
        margin-bottom: 15px;
        text-align: center;
        font-size: 20px;
      }
      
      .moment-item {
        background-color: rgba(255, 255, 255, 0.9);
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 15px;
        position: relative;
        border-left: 4px solid #ff6b8b;
      }
      
      .moment-content {
        margin-bottom: 8px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .moment-time {
        font-size: 12px;
        color: #888;
        text-align: right;
      }
      
      .delete-moment-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: #ff5c8d;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.6;
        transition: opacity 0.2s;
      }
      
      .delete-moment-btn:hover {
        opacity: 1;
      }
      
      .empty-moments {
        text-align: center;
        color: #888;
        font-style: italic;
        padding: 20px;
      }
      
      @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); opacity: 0.5; }
        50% { transform: translateX(-50%) scale(1.2); opacity: 0.7; }
        100% { transform: translateX(-50%) scale(1); opacity: 0.5; }
      }
    `;
    
    document.head.appendChild(styleElement);
  }
};

// 导出心动瞬间对象，供其他模块使用
window.heartMoments = heartMoments;

// 初始化心动瞬间功能
document.addEventListener('DOMContentLoaded', () => {
  heartMoments.init();
});