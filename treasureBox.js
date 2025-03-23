// treasureBox.js - 隐藏宝箱功能

// 宝箱功能状态
const treasureBox = {
    isOpen: false,
    
    // 显示宝箱页面
    show: function() {
      // 如果宝箱已经打开，不重复操作
      if (this.isOpen) return;
      
      console.log('打开小宝箱！');
      
      // 创建宝箱页面元素
      const treasureBoxElement = document.createElement('div');
      treasureBoxElement.id = 'treasure-box';
      treasureBoxElement.className = 'treasure-box-container';
      
      // 设置宝箱页面内容
      treasureBoxElement.innerHTML = `
        <div class="treasure-box-content">
          <button class="back-btn" id="treasure-back-btn"></button>
          <div class="treasure-header">
            <h2>小宝箱</h2>
            <div class="treasure-shine"></div>
          </div>
          <div class="treasure-body">
            <p>恭喜你发现了隐藏的小宝箱！</p>
            <div class="treasure-image" id="treasure-image"></div>
            <p class="treasure-hint">点击宝箱查看心动瞬间记录</p>
          </div>
        </div>
      `;
      
      // 添加到文档
      document.querySelector('.container').appendChild(treasureBoxElement);
      
      // 设置宝箱页面样式
      this.applyStyles();
      
      // 显示宝箱页面
      setTimeout(() => {
        treasureBoxElement.classList.add('open');
        this.isOpen = true;
        
        // 添加返回按钮事件
        document.getElementById('treasure-back-btn').addEventListener('click', () => {
          this.hide();
        });
        
        // 添加点击宝箱图片事件 - 进入心动瞬间记录页面
        const treasureImage = document.getElementById('treasure-image');
        if (treasureImage) {
          treasureImage.addEventListener('click', () => {
            this.openHeartMoments();
          });
        }
        
        // 播放发现的动画效果
        this.playDiscoveryAnimation();
      }, 100);
    },
    
    // 打开心动瞬间记录 - 添加密钥验证
    openHeartMoments: function() {
      // 创建密钥验证对话框
      this.createKeyVerificationDialog();
    },

    // 隐藏宝箱页面
hide: function() {
    const treasureBox = document.getElementById('treasure-box');
    if (!treasureBox) return;
    
    treasureBox.classList.remove('open');
    
    // 延迟移除元素
    setTimeout(() => {
      treasureBox.remove();
      this.isOpen = false;
      console.log('关闭小宝箱！');
      
      // 不再直接调用 toggleGameView，而是使用更通用的方法返回主页面
      // 通过类名判断当前页面状态并更新显示
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
    
    // 应用宝箱样式
    applyStyles: function() {
      // 如果已经添加过样式则不重复添加
      if (document.getElementById('treasure-box-styles')) return;
      
      const styleElement = document.createElement('style');
      styleElement.id = 'treasure-box-styles';
      styleElement.textContent = `
        .treasure-box-container {
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
        
        .treasure-box-container.open {
          opacity: 1;
        }
        
        .treasure-box-content {
          position: relative;
          background: linear-gradient(145deg, #ffdb8a, #ffc458);
          padding: 30px;
          border-radius: 15px;
          width: 80%;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(255, 200, 0, 0.4), 0 0 50px rgba(255, 215, 0, 0.2);
          text-align: center;
          overflow: hidden;
          border: 2px solid #ffd700;
        }
        
        .treasure-header {
          position: relative;
          margin-bottom: 25px;
        }
        
        .treasure-header h2 {
          color: #8B4513;
          font-size: 28px;
          margin: 0;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }
        
        .treasure-shine {
          position: absolute;
          top: -30px;
          left: 50%;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
          transform: translateX(-50%);
          animation: shine 3s infinite;
        }
        
        .treasure-body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .treasure-body p {
          color: #5D4037;
          font-size: 18px;
          margin-bottom: 20px;
        }
        
        .treasure-image {
          width: 150px;
          height: 150px;
          background-image: url('./image/treasure.svg');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          margin: 20px 0;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .treasure-image:hover {
          transform: scale(1.1);
        }
        
        .treasure-hint {
          font-style: italic;
          font-size: 16px !important;
          color: #8D6E63 !important;
        }
        
        @keyframes shine {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `;
      
      document.head.appendChild(styleElement);
    },
    
    // 播放发现宝箱的动画
    playDiscoveryAnimation: function() {
      console.log('播放宝箱发现动画');
      
      // 添加简单的晃动动画
      const treasureImage = document.getElementById('treasure-image');
      if (treasureImage) {
        treasureImage.style.animation = 'treasure-shake 0.6s ease';
        
        // 添加动画样式
        if (!document.getElementById('treasure-animation-style')) {
          const animationStyle = document.createElement('style');
          animationStyle.id = 'treasure-animation-style';
          animationStyle.textContent = `
            @keyframes treasure-shake {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-5deg); }
              50% { transform: rotate(0deg); }
              75% { transform: rotate(5deg); }
            }
          `;
          document.head.appendChild(animationStyle);
        }
      }
    },

    // 添加新方法：创建密钥验证对话框
    createKeyVerificationDialog: function() {
      // 创建对话框元素
      const dialog = document.createElement('div');
      dialog.className = 'key-verification-dialog';
      dialog.innerHTML = `
        <div class="key-verification-content">
          <h3>请输入宝箱钥匙</h3>
          <input type="password" id="treasure-key-input" placeholder="请输入密钥..." maxlength="20">
          <div class="key-verification-buttons">
            <button id="verify-key-btn">确认</button>
            <button id="cancel-key-btn">取消</button>
          </div>
          <div id="key-error-message" class="key-error" style="display: none;">密钥不正确，请重试</div>
        </div>
      `;
      
      // 添加到文档
      document.body.appendChild(dialog);
      
      // 添加样式
      this.applyKeyVerificationStyles();
      
      // 显示对话框并添加事件监听
      setTimeout(() => {
        dialog.classList.add('open');
        
        // 获取输入框并聚焦
        const input = document.getElementById('treasure-key-input');
        input.focus();
        
        // 确认按钮点击事件
        document.getElementById('verify-key-btn').addEventListener('click', () => {
          this.verifyKey(input.value, dialog);
        });
        
        // 取消按钮点击事件
        document.getElementById('cancel-key-btn').addEventListener('click', () => {
          dialog.classList.remove('open');
          setTimeout(() => {
            dialog.remove();
          }, 300);
        });
        
        // 回车键提交
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            this.verifyKey(input.value, dialog);
          }
        });
      }, 10);
    },

// 修改验证密钥方法，添加尝试次数限制
verifyKey: function(key, dialog) {
  if (!key.trim()) {
    // 显示错误信息
    const errorMsg = document.getElementById('key-error-message');
    errorMsg.textContent = '请输入密钥';
    errorMsg.style.display = 'block';
    return;
  }
  
  // 检查尝试次数
  const MAX_ATTEMPTS = 5; // 最大尝试次数
  const LOCKOUT_TIME = 30 * 60 * 1000; // 锁定时间（30分钟）
  
  // 获取当前尝试信息
  let keyAttempts = sessionStorage.getItem('key_attempts') || 0;
  let lockoutUntil = sessionStorage.getItem('key_lockout_until') || 0;
  
  keyAttempts = parseInt(keyAttempts);
  lockoutUntil = parseInt(lockoutUntil);
  
  const now = Date.now();
  
  // 检查是否在锁定期
  if (lockoutUntil > now) {
    const remainingMinutes = Math.ceil((lockoutUntil - now) / 60000);
    const errorMsg = document.getElementById('key-error-message');
    errorMsg.textContent = `尝试次数过多，请在${remainingMinutes}分钟后再试`;
    errorMsg.style.display = 'block';
    return;
  }
  
  // 超过锁定时间，重置尝试次数
  if (lockoutUntil > 0 && lockoutUntil <= now) {
    keyAttempts = 0;
    sessionStorage.setItem('key_lockout_until', '0');
  }
  
  // 检查是否超过最大尝试次数
  if (keyAttempts >= MAX_ATTEMPTS) {
    // 设置锁定时间
    const lockoutTime = now + LOCKOUT_TIME;
    sessionStorage.setItem('key_lockout_until', lockoutTime.toString());
    
    const errorMsg = document.getElementById('key-error-message');
    errorMsg.textContent = `尝试次数过多，请在30分钟后再试`;
    errorMsg.style.display = 'block';
    return;
  }
  
  // 显示加载状态
  const verifyBtn = document.getElementById('verify-key-btn');
  const originalText = verifyBtn.textContent;
  verifyBtn.textContent = '验证中...';
  verifyBtn.disabled = true;
  
  // 调用API验证密钥
  fetch('https://331600.xyz/verify-treasure-key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: key })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // 密钥正确，重置尝试次数
      sessionStorage.setItem('key_attempts', '0');
      sessionStorage.setItem('key_lockout_until', '0');
      
      // 保存到会话存储中，以便后续使用
      sessionStorage.setItem('verified_treasure_key', key);
      
      // 关闭对话框并打开心动瞬间
      dialog.classList.remove('open');
      setTimeout(() => {
        dialog.remove();
        this.openHeartMomentsAfterVerification();
      }, 300);
    } else {
      // 密钥错误，增加尝试次数
      keyAttempts++;
      sessionStorage.setItem('key_attempts', keyAttempts.toString());
      
      // 显示错误信息
      const errorMsg = document.getElementById('key-error-message');
      errorMsg.textContent = data.message || '密钥不正确，请重试';
      
      // 添加剩余尝试次数提示
      if (MAX_ATTEMPTS - keyAttempts > 0) {
        errorMsg.textContent += `（还剩${MAX_ATTEMPTS - keyAttempts}次尝试机会）`;
      }
      
      errorMsg.style.display = 'block';
      
      // 重置按钮状态
      verifyBtn.textContent = originalText;
      verifyBtn.disabled = false;
    }
  })
  .catch(error => {
    console.error('验证密钥出错:', error);
    // 显示错误信息
    const errorMsg = document.getElementById('key-error-message');
    errorMsg.textContent = '验证过程出错，请稍后再试';
    errorMsg.style.display = 'block';
    
    // 重置按钮状态
    verifyBtn.textContent = originalText;
    verifyBtn.disabled = false;
  });
},

    // 添加新方法：验证成功后打开心动瞬间
openHeartMomentsAfterVerification: function() {
  // 隐藏宝箱界面
  const treasureBox = document.getElementById('treasure-box');
  if (treasureBox) {
    treasureBox.classList.remove('open');
    
    setTimeout(() => {
      treasureBox.remove();
      this.isOpen = false;
      
      // 播放心形动画
      this.playHeartAnimation(() => {
        // 动画播放完成后显示心动瞬间页面
        if (window.heartMoments) {
          window.heartMoments.show();
        } else {
          console.error('心动瞬间模块未加载');
        }
      });
    }, 300);
  }
},

// 添加方法：播放心形动画
playHeartAnimation: function(callback) {
  // 创建动画容器
  const animContainer = document.createElement('div');
  animContainer.id = 'heart-animation-container';
  animContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  // 创建动画元素
  const animElement = document.createElement('div');
  animElement.id = 'heart-animation';
  animElement.style.cssText = `
    width: 80%;
    max-width: 400px;
    height: 400px;
  `;
  
  animContainer.appendChild(animElement);
  document.body.appendChild(animContainer);
  
  // 淡入动画容器
  setTimeout(() => {
    animContainer.style.opacity = '1';
  }, 10);
  
  // 加载Lottie库(如果尚未加载)
  this.loadLottieIfNeeded(() => {
    // 播放动画
    const animation = lottie.loadAnimation({
      container: animElement,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: './image/heart.json' // 使用相对路径
    });
    
    // 设置播放速度为正常速度的50%，使动画更慢
    animation.setSpeed(0.5);
    
    // 动画完成后淡出并移除
    animation.addEventListener('complete', () => {
      animContainer.style.opacity = '0';
      setTimeout(() => {
        animContainer.remove();
        if (callback && typeof callback === 'function') {
          callback();
        }
      }, 300);
    });
  });
},

// 添加方法：按需加载Lottie库
loadLottieIfNeeded: function(callback) {
  if (window.lottie) {
    callback();
    return;
  }
  
  console.log('加载Lottie动画库...');
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js';
  script.onload = () => {
    console.log('Lottie动画库加载完成');
    callback();
  };
  script.onerror = () => {
    console.error('加载Lottie动画库失败');
    // 加载失败也调用回调，确保流程继续
    callback();
  };
  document.head.appendChild(script);
},

    // 添加新方法：应用密钥验证样式
    applyKeyVerificationStyles: function() {
      // 如果已经添加过样式则不重复添加
      if (document.getElementById('key-verification-styles')) return;
      
      const styleElement = document.createElement('style');
      styleElement.id = 'key-verification-styles';
      styleElement.textContent = `
        .key-verification-dialog {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 10000;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .key-verification-dialog.open {
          opacity: 1;
        }
        
        .key-verification-content {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          text-align: center;
        }
        
        .key-verification-content h3 {
          color: #8B4513;
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 22px;
        }
        
        #treasure-key-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          margin-bottom: 20px;
          box-sizing: border-box;
        }
        
        .key-verification-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        
        .key-verification-buttons button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        #verify-key-btn {
          background: linear-gradient(145deg, #ffc458, #ffd700);
          color: #8B4513;
          font-weight: bold;
        }
        
        #cancel-key-btn {
          background: #f1f1f1;
          color: #666;
        }
        
        #verify-key-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 3px 8px rgba(255, 200, 0, 0.3);
        }
        
        #cancel-key-btn:hover {
          background: #e5e5e5;
        }
        
        .key-error {
          color: #e53935;
          margin-top: 15px;
          font-size: 14px;
        }
      `;
      
      document.head.appendChild(styleElement);
    }
  };
  
  // 导出宝箱对象，供其他模块使用
  window.treasureBox = treasureBox;