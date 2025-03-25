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
// 修改同步到云端的方法，使用已验证的密钥
syncWithCloud: function() {
  // 检查是否需要同步
  if (!this.moments || this.moments.length === 0) return;
  
  console.log('同步心动瞬间到云端...');
  
  // 获取本地记录但未云同步的记录
  const unsyncedMoments = this.moments.filter(moment => !moment.synced);
  
  if (unsyncedMoments.length === 0) {
    console.log('没有需要同步的记录');
    return;
  }
  
  // 获取之前验证过的密钥
  const verifiedKey = sessionStorage.getItem('verified_treasure_key');
  
  // 如果没有验证过的密钥，则不进行同步
  if (!verifiedKey) {
    console.error('无法同步：未找到有效的已验证密钥');
    return;
  }
  
  // 对于每条未同步的记录进行同步
  unsyncedMoments.forEach((moment, index) => {
    // 发送到服务器，使用已验证的密钥
    fetch('https://331600.xyz/heart-moments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: moment.content,
        key: verifiedKey, // 使用已验证的密钥
        user_name: localStorage.getItem('preferred_name') || 'anonymous'
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // 标记为已同步
        this.moments[this.moments.indexOf(moment)].synced = true;
        this.saveToLocalStorage();
        console.log(`已同步记录 ${index + 1}/${unsyncedMoments.length}`);
      } else {
        console.error('同步失败:', data.error);
      }
    })
    .catch(error => {
      console.error('同步错误:', error);
    });
  });
},
  // 显示心动瞬间页面
  show: function() {
    console.log('显示心动瞬间页面');
    
    // 创建心动瞬间页面元素
    const heartMomentsElement = document.createElement('div');
    heartMomentsElement.id = 'heart-moments';
    heartMomentsElement.className = 'heart-moments-container';
    
    // 修改 show 函数的 HTML 内容，将"加载中..."替换为加载按钮
    heartMomentsElement.innerHTML = `
    <div class="heart-moments-content">
      <button class="back-btn" id="heart-moments-back-btn"></button>
      <div class="heart-moments-header">
        <h2>Heart Moments</h2>
        <div class="heart-shine"></div>
      </div>
      
      <div class="heart-moments-form">
        <textarea id="new-moment" placeholder="记录一个moment..." maxlength="200"></textarea>
        <button id="save-moment-btn">保存</button>
      </div>
      
      <div class="heart-moments-list">
        <h3>我的记录</h3>
        <div id="moments-container">
          ${this.renderMoments()}
        </div>
      </div>
      
      <div class="cloud-moments-list">
        <h3>云端</h3>
        <div id="cloud-moments-container">
          <button id="load-cloud-moments-btn" class="load-cloud-btn">加载云端记录</button>
        </div>
      </div>
    </div>
    `;
    
    // 添加到文档
    document.querySelector('.container').appendChild(heartMomentsElement);
    
    // 设置心动瞬间页面样式
    this.applyStyles();
    
    // 修改 show 函数中的 setTimeout 回调
    setTimeout(() => {
      heartMomentsElement.classList.add('open');
      
      // 添加事件监听器
      this.attachEventListeners();
      // 尝试同步到云端
      this.syncWithCloud();
      // 移除这里的自动加载 - this.fetchCloudMoments();
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
      return '<div class="empty-moments">暂无记录，开始记录吧！</div>';
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
    // 添加同步标志
  newMoment.synced = false;
    // 更新显示
    const momentsContainer = document.getElementById('moments-container');
    if (momentsContainer) {
      momentsContainer.innerHTML = this.renderMoments();
      this.attachDeleteListeners();
    }
    // 尝试同步到云端
  this.syncWithCloud();
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
  
  // 修改 attachEventListeners 函数，添加加载云端按钮事件
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
    
    // 添加加载云端记录按钮事件
    const loadCloudBtn = document.getElementById('load-cloud-moments-btn');
    if (loadCloudBtn) {
      loadCloudBtn.addEventListener('click', () => {
        // 显示加载中状态
        const cloudContainer = document.getElementById('cloud-moments-container');
        if (cloudContainer) {
          cloudContainer.innerHTML = '<div class="loading-moments">正在加载云端记录...</div>';
        }
        // 加载云端记录
        this.fetchCloudMoments();
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
  attachCloudDeleteListeners: function() {
    const deleteButtons = document.querySelectorAll('.delete-cloud-moment-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // 简化确认信息
        if (confirm('确定要删除这条记录吗？')) {
          const id = e.target.getAttribute('data-id');
          this.deleteCloudMoment(id);
        }
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
  // 修改 fetchCloudMoments 函数，添加删除按钮事件监听
  fetchCloudMoments: function() {
    console.log('正在获取云端记录...');
    
    // 获取已验证的密钥
    const verifiedKey = sessionStorage.getItem('verified_treasure_key');
    
    // 如果没有验证过的密钥，则不获取云端数据
    if (!verifiedKey) {
      console.error('无法获取云端记录：未找到有效的已验证密钥');
      const cloudContainer = document.getElementById('cloud-moments-container');
      if (cloudContainer) {
        cloudContainer.innerHTML = '<div class="empty-moments">无法获取云端记录：未验证</div>';
      }
      return;
    }
    
    // 创建云端记录容器
    const cloudContainer = document.getElementById('cloud-moments-container');
    if (!cloudContainer) return;
    
    // 显示加载状态
    cloudContainer.innerHTML = '<div class="loading-moments">正在加载云端记录...</div>';
    
    // 发送请求获取云端记录 - 使用GET方法和/heart-moments端点
    fetch('https://331600.xyz/heart-moments?key=' + encodeURIComponent(verifiedKey), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + verifiedKey // 添加授权头
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('服务器返回状态码: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.success && data.moments && data.moments.length > 0) {
        // 渲染云端记录
        cloudContainer.innerHTML = this.renderCloudMoments(data.moments);
        // 添加这一行：为云端记录添加删除按钮事件
        this.attachCloudDeleteListeners();
      } else {
        // 显示无记录信息
        cloudContainer.innerHTML = '<div class="empty-moments">云端暂无记录</div>';
      }
    })
    .catch(error => {
      console.error('获取云端记录失败:', error);
      cloudContainer.innerHTML = '<div class="empty-moments">获取云端记录失败，请稍后再试</div>';
    });
  },
  
  // 修改 renderCloudMoments 函数，为所有记录添加删除按钮
  renderCloudMoments: function(cloudMoments) {
    if (!cloudMoments || cloudMoments.length === 0) {
      return '<div class="empty-moments">云端暂无记录</div>';
    }
    
    return cloudMoments.map(moment => `
      <div class="moment-item cloud-moment" data-id="${moment.id}">
        <div class="moment-content">${this.escapeHTML(moment.content)}</div>
        <div class="moment-meta">
          <span class="moment-user">${this.escapeHTML(moment.user_name || 'anonymous')}</span>
          <span class="moment-time">${moment.created_at || '未知时间'}</span>
        </div>
        <button class="delete-cloud-moment-btn" data-id="${moment.id}">删除</button>
      </div>
    `).join('');
  },
 // 修改 deleteCloudMoment 函数，使用POST请求
deleteCloudMoment: function(id) {
  if (!id) {
    console.error('无法删除：记录ID为空');
    alert('删除失败：记录ID无效');
    return;
  }
  
  console.log('正在删除云端记录:', id);
  
  // 获取已验证的密钥
  const verifiedKey = sessionStorage.getItem('verified_treasure_key');
  
  // 如果没有验证过的密钥，则无法删除
  if (!verifiedKey) {
    console.error('无法删除云端记录：未找到有效的已验证密钥');
    return;
  }
  
  // 使用POST请求，但在请求体中指明是删除操作
  fetch('https://331600.xyz/heart-moments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + verifiedKey
    },
    body: JSON.stringify({
      action: 'delete',  // 添加action字段标识这是删除操作
      id: id,
      key: verifiedKey
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('服务器返回状态码: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      console.log('云端记录删除成功');
      
      // 移除已删除的记录元素
      const recordElement = document.querySelector(`.cloud-moment[data-id="${id}"]`);
      if (recordElement) {
        recordElement.remove();
      }
      
      // 检查是否所有记录都已删除
      const cloudContainer = document.getElementById('cloud-moments-container');
      if (cloudContainer && !cloudContainer.querySelector('.cloud-moment')) {
        cloudContainer.innerHTML = '<div class="empty-moments">云端暂无记录</div>';
      }
    } else {
      console.error('删除云端记录失败:', data.error);
      alert('删除失败: ' + data.error);
    }
  })
  .catch(error => {
    console.error('删除云端记录出错:', error);
    alert('删除出错: ' + error.message);
  });
},
  applyStyles: function() {
    // 如果已经添加过样式则不重复添加
    if (document.getElementById('heart-moments-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'heart-moments-styles';
    styleElement.textContent = `
      .load-cloud-btn {
        background: linear-gradient(to right, #8bb3ff, #a3c2ff);
        border: none;
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        margin: 15px auto;
        display: block;
        transition: all 0.3s ease;
      }

      .load-cloud-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(139, 179, 255, 0.3);
      }
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
        background: linear-gradient(145deg, #fff5f7, #ffeaee);
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        text-align: center;
      }
      
      .heart-moments-header {
        position: relative;
        margin: 30px 0 25px;
      }
      
      .heart-moments-header h2 {
        color: #e78599;
        font-size: 28px;
        margin: 0;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
      }
      
      .heart-shine {
        position: absolute;
        top: -10px;
        left: 50%;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(255,150,180,0.4) 0%, rgba(255,150,180,0) 70%);
        transform: translateX(-50%);
        animation: pulse 2s infinite;
      }
      
      .heart-moments-form {
        margin: 0 auto 30px;
        width: 90%;
        max-width: 600px;
      }
      
      #new-moment {
        width: 100%;
        height: 80px;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #ffd0d8;
        resize: none;
        font-size: 16px;
        margin-bottom: 10px;
        background-color: rgba(255, 255, 255, 0.95);
      }
      
      #save-moment-btn {
        background: linear-gradient(to right, #ff9bac, #ffaec2);
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
        box-shadow: 0 5px 15px rgba(255, 155, 180, 0.3);
      }
      
      .heart-moments-list {
        text-align: left;
        margin: 0 auto;
        width: 90%;
        max-width: 600px;
        flex: 1;
        padding-bottom: 50px;
      }
      
      .heart-moments-list h3 {
        color: #e78599;
        margin-bottom: 15px;
        text-align: center;
        font-size: 20px;
      }
      
      .moment-item {
        background-color: rgba(255, 255, 255, 0.95);
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 15px;
        position: relative;
        border-left: 4px solid #ffb5c5;
      }
      
      .moment-content {
        margin-bottom: 8px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      
      .moment-time {
        font-size: 12px;
        color: #aaa;
        text-align: right;
      }
      
      .delete-moment-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: #ffaab9;
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
        color: #aaa;
        font-style: italic;
        padding: 20px;
      }
      .cloud-moments-list {
    text-align: left;
    margin: 20px auto 0;
    width: 90%;
    max-width: 600px;
    padding-bottom: 50px;
  }
  
  .cloud-moments-list h3 {
    color: #e78599;
    margin-bottom: 15px;
    text-align: center;
    font-size: 20px;
  }
  
  .cloud-moment {
    border-left: 4px solid #b5c5ff;
  }
  
  .moment-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
  }
  
  .moment-user {
    font-style: italic;
  }
  
  .loading-moments {
    text-align: center;
    color: #aaa;
    padding: 15px;
    font-style: italic;
  }
      @keyframes pulse {
        0% { transform: translateX(-50%) scale(1); opacity: 0.3; }
        50% { transform: translateX(-50%) scale(1.2); opacity: 0.5; }
        100% { transform: translateX(-50%) scale(1); opacity: 0.3; }
      }
      
      /* 修复返回按钮样式，移除背景图像 */
      #heart-moments .back-btn {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        background-image: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
        z-index: 10;
      }
      
      #heart-moments .back-btn:hover {
        opacity: 1;
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