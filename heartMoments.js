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
        <textarea id="new-moment" placeholder="记录一个moment..." maxlength="2000"></textarea>
        <button id="save-moment-btn">保存</button>
      </div>
      
      <div class="heart-moments-list">
        <h3>我的记录</h3>
        <div id="moments-container">
          ${this.renderMoments()}
        </div>
      </div>
      
      <div class="cloud-moments-list">
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
// 修改 fetchCloudMoments 函数，使其加载数据后显示弹窗
fetchCloudMoments: function() {
  console.log('正在获取云端记录...');
  
  // 获取已验证的密钥
  const verifiedKey = sessionStorage.getItem('verified_treasure_key');
  
  // 如果没有验证过的密钥，则不获取云端数据
  if (!verifiedKey) {
    console.error('无法获取云端记录：未找到有效的已验证密钥');
    alert('无法获取云端记录：未验证');
    return;
  }
  
  // 显示加载状态
  const loadCloudBtn = document.getElementById('load-cloud-moments-btn');
  if (loadCloudBtn) {
    loadCloudBtn.textContent = '加载中...';
    loadCloudBtn.disabled = true;
  }
  
  // 发送请求获取云端记录
  fetch('https://331600.xyz/heart-moments?key=' + encodeURIComponent(verifiedKey), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + verifiedKey
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('服务器返回状态码: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    // 恢复按钮状态
    if (loadCloudBtn) {
      loadCloudBtn.textContent = '加载云端记录';
      loadCloudBtn.disabled = false;
    }
    
    if (data.success && data.moments && data.moments.length > 0) {
      // 显示弹窗展示云端记录
      this.showCloudMomentsModal(data.moments);
    } else {
      // 显示无记录信息
      alert('云端暂无记录');
    }
  })
  .catch(error => {
    console.error('获取云端记录失败:', error);
    alert('获取云端记录失败，请稍后再试');
    
    // 恢复按钮状态
    if (loadCloudBtn) {
      loadCloudBtn.textContent = '加载云端记录';
      loadCloudBtn.disabled = false;
    }
  });
},

// 修改 showCloudMomentsModal 函数，在弹窗关闭时恢复加载按钮

showCloudMomentsModal: function(cloudMoments) {
  // 创建弹窗元素
  const modalElement = document.createElement('div');
  modalElement.id = 'cloud-moments-modal';
  modalElement.className = 'moments-modal';
  
  // 弹窗内容
  modalElement.innerHTML = `
    <div class="moments-modal-content">
      <button class="modal-close-btn"><img src="./image/x-circle.svg" alt="关闭" class="close-icon"></button>
      <div class="modal-header">
        <h2>云~</h2>
      </div>
      <div class="modal-body">
        ${this.renderCloudMoments(cloudMoments)}
      </div>
    </div>
  `;
  
  // 添加到文档
  document.body.appendChild(modalElement);
  
  // 添加事件监听 - 修改这部分，在关闭弹窗时恢复加载按钮
  const closeBtn = modalElement.querySelector('.modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalElement.classList.add('closing');
      
      // 在关闭弹窗时恢复"加载云端记录"按钮
      const cloudContainer = document.getElementById('cloud-moments-container');
      if (cloudContainer) {
        cloudContainer.innerHTML = '<button id="load-cloud-moments-btn" class="load-cloud-btn">加载云端记录</button>';
        // 重新绑定按钮事件
        const newLoadBtn = document.getElementById('load-cloud-moments-btn');
        if (newLoadBtn) {
          newLoadBtn.addEventListener('click', () => {
            cloudContainer.innerHTML = '<div class="loading-moments">正在加载云端记录...</div>';
            this.fetchCloudMoments();
          });
        }
      }
      
      setTimeout(() => {
        if (modalElement.parentNode) {
          modalElement.parentNode.removeChild(modalElement);
        }
      }, 300);
    });
  }
  
  // 添加云端记录删除按钮事件
  this.attachCloudDeleteListeners();
  // 添加云端记录编辑按钮事件
  this.attachCloudEditListeners();
  // 添加弹窗出现动画
  setTimeout(() => {
    modalElement.classList.add('open');
  }, 10);
},

// 新增 showEditModal 和 updateCloudMoment 函数

showEditModal: function(id, content) {
  // 创建编辑弹窗
  const editModalElement = document.createElement('div');
  editModalElement.id = 'edit-moment-modal';
  editModalElement.className = 'moments-modal edit-modal';
  
  // 弹窗内容
  editModalElement.innerHTML = `
    <div class="moments-modal-content">
      <button class="modal-close-btn"><img src="./image/x-circle.svg" alt="关闭" class="close-icon"></button>
      <div class="modal-header">
        <h2>编辑记录</h2>
      </div>
      <div class="modal-body">
        <textarea id="edit-moment-content" maxlength="2000">${content}</textarea>
        <div class="modal-actions">
          <button id="update-moment-btn" data-id="${id}">保存</button>
          <button id="cancel-edit-btn">取消</button>
        </div>
      </div>
    </div>
  `;
  
  // 添加到文档
  document.body.appendChild(editModalElement);
  
  // 添加关闭按钮事件
  const closeBtn = editModalElement.querySelector('.modal-close-btn');
  const cancelBtn = editModalElement.querySelector('#cancel-edit-btn');
  
  const closeModal = () => {
    editModalElement.classList.add('closing');
    setTimeout(() => {
      if (editModalElement.parentNode) {
        editModalElement.parentNode.removeChild(editModalElement);
      }
    }, 300);
  };
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', closeModal);
  }
  
  // 添加保存按钮事件
  const updateBtn = editModalElement.querySelector('#update-moment-btn');
  if (updateBtn) {
    updateBtn.addEventListener('click', () => {
      const newContent = document.getElementById('edit-moment-content').value;
      this.updateCloudMoment(id, newContent, closeModal);
    });
  }
  
  // 添加弹窗出现动画
  setTimeout(() => {
    editModalElement.classList.add('open');
    // 聚焦到文本框
    document.getElementById('edit-moment-content').focus();
  }, 10);
},

updateCloudMoment: function(id, content, callback) {
  if (!id || !content.trim()) {
    alert('内容不能为空');
    return;
  }
  
  console.log('正在更新云端记录:', id);
  
  // 获取已验证的密钥
  const verifiedKey = sessionStorage.getItem('verified_treasure_key');
  
  // 如果没有验证过的密钥，则无法更新
  if (!verifiedKey) {
    console.error('无法更新云端记录：未找到有效的已验证密钥');
    return;
  }
  
  // 使用POST请求，但在请求体中指明是更新操作
  fetch('https://331600.xyz/heart-moments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + verifiedKey
    },
    body: JSON.stringify({
      action: 'update',  // 标识这是更新操作
      id: id,
      content: content.trim(),
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
      console.log('云端记录更新成功');
      
      // 更新页面上的记录内容
      const recordElement = document.querySelector(`.cloud-moment[data-id="${id}"] .moment-content`);
      if (recordElement) {
        recordElement.textContent = content.trim();
      }
      
      // 更新按钮的data-content属性，以便下次编辑
      const editBtn = document.querySelector(`.edit-cloud-moment-btn[data-id="${id}"]`);
      if (editBtn) {
        editBtn.setAttribute('data-content', content.trim());
      }
      
      // 关闭编辑弹窗
      if (callback) callback();
      
      // 显示成功提示
      alert('记录已更新');
    } else {
      console.error('更新云端记录失败:', data.error);
      alert('更新失败: ' + data.error);
    }
  })
  .catch(error => {
    console.error('更新云端记录出错:', error);
    alert('更新出错: ' + error.message);
  });
},
// 修改 renderCloudMoments 函数，添加编辑按钮

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
      <div class="moment-actions">
        <button class="edit-cloud-moment-btn" data-id="${moment.id}" data-content="${this.escapeHTML(moment.content)}">编辑</button>
        <button class="delete-cloud-moment-btn" data-id="${moment.id}">删除</button>
      </div>
    </div>
  `).join('');
},
// 新增 attachCloudEditListeners 函数

attachCloudEditListeners: function() {
  const editButtons = document.querySelectorAll('.edit-cloud-moment-btn');
  editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const content = e.target.getAttribute('data-content');
      this.showEditModal(id, content);
    });
  });
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
    // 如果已经添加过样式链接则不重复添加
    if (document.getElementById('heart-moments-styles-link')) return;
    
    // 创建链接元素，加载外部 CSS 文件
    const linkElement = document.createElement('link');
    linkElement.id = 'heart-moments-styles-link';
    linkElement.rel = 'stylesheet';
    linkElement.href = './heartMoments.css?v=' + new Date().getTime(); // 添加时间戳防止缓存
    
    // 添加到文档头部
    document.head.appendChild(linkElement);
  }
};

// 导出心动瞬间对象，供其他模块使用
window.heartMoments = heartMoments;

// 初始化心动瞬间功能
document.addEventListener('DOMContentLoaded', () => {
  heartMoments.init();
});