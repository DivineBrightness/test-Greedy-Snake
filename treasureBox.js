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
    
    // 打开心动瞬间记录
    openHeartMoments: function() {
      // 隐藏宝箱界面
      const treasureBox = document.getElementById('treasure-box');
      if (treasureBox) {
        treasureBox.classList.remove('open');
        
        setTimeout(() => {
          treasureBox.remove();
          this.isOpen = false;
          
          // 显示心动瞬间页面
          if (window.heartMoments) {
            window.heartMoments.show();
          } else {
            console.error('心动瞬间模块未加载');
          }
        }, 300);
      }
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
    }
  };
  
  // 导出宝箱对象，供其他模块使用
  window.treasureBox = treasureBox;