// cq.js - 春秋页面功能

const cq = {
  isOpen: false,

  // 初始化函数
  init: function () {
    console.log('初始化春秋页面功能');
    // 在这里可以加载任何需要的数据或设置
  },

  // 显示春秋页面
  show: function () {
    // 如果页面已经打开，不重复操作
    if (this.isOpen) return;

    console.log('显示春秋页面');

    // 创建春秋页面元素
    const cqElement = document.createElement('div');
    cqElement.id = 'cq-page';
    cqElement.className = 'cq-container';

    // 设置页面内容
    cqElement.innerHTML = `
      <div class="cq-content">
        <button class="back-btn" id="cq-back-btn"></button>
        <div class="cq-header">
          <h2>葬送的芙莉莲</h2>
          <div class="cq-shine"></div>
        </div>

        <div class="cq-body">
          <div class="cq-intro">
            <p>
              《葬送的芙莉莲》（日语：葬送のフリーレン，赫本：Sōsō no Furīren）是由山田钟人编剧、阿部司绘画的日本漫画。
            </p>
            <p>
              故事讲述了精灵魔法使芙莉莲在结束了与同伴欣梅尔、艾泽和海塔的十年冒险之旅后，再次踏上旅程的故事。
            </p>
          </div>

          <!-- 添加GIF视频区域 -->
          <div class="cq-video-container">
            <div class="cq-video-placeholder" id="cq-video-placeholder">
              <div class="cq-play-button"></div>
            </div>
          </div>

          <div class="cq-quote-container">
            <div class="cq-quote">
              <p class="quote-text">
                “对我来说，这才是稍微值得高兴的事。下次再一起去吧。再稍微认真地探索一下。”
              </p>
              <p class="quote-source">—— 芙莉莲</p>
            </div>
          </div>

          <div class="cq-history">
            <h3>故事梗概</h3>
            <div class="history-timeline">
              <div class="timeline-item">
                <div class="year">冒险的开始</div>
                <div class="event">
                  芙莉莲与欣梅尔一行人完成了长达十年的冒险，击败了魔王。
                </div>
              </div>
              <div class="timeline-item">
                <div class="year">英雄的逝去</div>
                <div class="event">
                  欣梅尔去世，芙莉莲开始重新审视自己的人生。
                </div>
              </div>
              <div class="timeline-item">
                <div class="year">新的旅程</div>
                <div class="event">
                  芙莉莲为了“理解人类”而再次踏上旅程，与新的伙伴相遇。
                </div>
              </div>
            </div>
          </div>

          <div class="cq-wisdom">
            <h3>角色介绍</h3>
            <div class="wisdom-cards">
              <div class="wisdom-card">
                <h4>芙莉莲</h4>
                <p>精灵魔法使</p>
              </div>
              <div class="wisdom-card">
                <h4>欣梅尔</h4>
                <p>已故的勇者</p>
              </div>
              <div class="wisdom-card">
                <h4>费伦</h4>
                <p>芙莉莲的弟子</p>
              </div>
              <div class="wisdom-card">
                <h4>修塔尔克</h4>
                <p>艾泽的弟子</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // 添加到文档
    document.querySelector('.container').appendChild(cqElement);

    // 设置页面样式
    this.applyStyles();

    // 显示页面
    setTimeout(() => {
      cqElement.classList.add('open');
      this.isOpen = true;

      // 添加返回按钮事件
      document.getElementById('cq-back-btn').addEventListener('click', () => {
        this.hide();
      });

      // 添加播放GIF的事件处理
      this.setupGifPlayer();

      // 添加页面出现动画
      this.playEntranceAnimation();
    }, 100);
  },

// 设置GIF播放器功能 - 修改为使用MP4视频
setupGifPlayer: function () {
  const placeholder = document.getElementById('cq-video-placeholder');
  
  if (placeholder) {
    placeholder.addEventListener('click', function () {
      const container = document.querySelector('.cq-video-container');
      container.innerHTML = '';
      
      // 使用视频元素替代GIF图片
      const videoElement = document.createElement('video');
      videoElement.autoplay = true;
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.playsInline = true; // 在iOS上也能自动播放
      videoElement.controls = false; // 隐藏控制栏
      videoElement.style.width = '100%';
      videoElement.style.height = 'auto';
      videoElement.style.display = 'block';
      
      // 添加MP4视频源
      const sourceMP4 = document.createElement('source');
      sourceMP4.src = './image/视频/fulilian.mp4';
      sourceMP4.type = 'video/mp4';
      
      // 添加后备提示文本
      const fallbackText = document.createTextNode('您的浏览器不支持HTML5视频');
      
      // 组装视频元素
      videoElement.appendChild(sourceMP4);
      videoElement.appendChild(fallbackText);
      container.appendChild(videoElement);
      
      // 确保视频能播放（解决某些移动浏览器的自动播放限制）
      videoElement.play().catch(e => {
        console.log('自动播放失败:', e);
        
        // 创建点击播放覆盖层
        const playOverlay = document.createElement('div');
        playOverlay.className = 'cq-video-overlay';
        playOverlay.innerHTML = '<span>点击播放</span>';
        playOverlay.style.position = 'absolute';
        playOverlay.style.top = '0';
        playOverlay.style.left = '0';
        playOverlay.style.width = '100%';
        playOverlay.style.height = '100%';
        playOverlay.style.display = 'flex';
        playOverlay.style.alignItems = 'center';
        playOverlay.style.justifyContent = 'center';
        playOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        playOverlay.style.cursor = 'pointer';
        playOverlay.style.zIndex = '1';
        
        const playText = document.createElement('span');
        playText.textContent = '点击播放';
        playText.style.color = 'white';
        playText.style.fontSize = '1.2rem';
        playText.style.padding = '10px 20px';
        playText.style.backgroundColor = 'rgba(139, 69, 19, 0.8)';
        playText.style.borderRadius = '20px';
        
        playOverlay.appendChild(playText);
        container.style.position = 'relative';
        container.appendChild(playOverlay);
        
        // 添加点击事件处理
        playOverlay.addEventListener('click', function() {
          videoElement.play();
          playOverlay.remove();
        });
      });
    });
  }
},

  // 隐藏春秋页面
  hide: function () {
    const cqElement = document.getElementById('cq-page');
    if (!cqElement) return;

    cqElement.classList.remove('open');

    // 延迟移除元素
    setTimeout(() => {
      cqElement.remove();
      this.isOpen = false;
      console.log('关闭春秋页面！');

      // 恢复主页面显示
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

  // 应用春秋页面样式
  applyStyles: function () {
    // 如果已经添加过样式则不重复添加
    if (document.getElementById('cq-styles-link')) return;

    // 创建链接元素，加载外部 CSS 文件
    const linkElement = document.createElement('link');
    linkElement.id = 'cq-styles-link';
    linkElement.rel = 'stylesheet';
    linkElement.href = './cq.css?v=' + new Date().getTime(); // 添加时间戳防止缓存

    // 添加到文档头部
    document.head.appendChild(linkElement);
  },

  // 播放入场动画
  playEntranceAnimation: function () {
    console.log('播放春秋页面入场动画');

    // 为各个元素添加依次进入的动画
    const elements = document.querySelectorAll(
      '.cq-intro, .cq-quote-container, .cq-history, .cq-wisdom'
    );

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated');
      }, 300 * index);
    });
  },
};

// 导出春秋对象，供其他模块使用
window.cq = cq;

// 初始化春秋页面功能
document.addEventListener('DOMContentLoaded', () => {
  cq.init();
});