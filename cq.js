// cq.js - 春秋页面功能

const cq = {
  isOpen: false,
  
  // 初始化函数
  init: function() {
    console.log('初始化春秋页面功能');
    // 在这里可以加载任何需要的数据或设置
  },
  
  // 显示春秋页面
  show: function() {
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
          <h2>春秋</h2>
          <div class="cq-shine"></div>
        </div>
        
        <div class="cq-body">
          <div class="cq-intro">
            <p>春秋，中国历史上的重要时期，也是《春秋》这部史书记载的年代。</p>
            <p>这里记录着历史的痕迹与智慧的结晶。</p>
          </div>
          
          <div class="cq-quote-container">
            <div class="cq-quote">
              <p class="quote-text">子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"</p>
              <p class="quote-source">—— 《论语》</p>
            </div>
          </div>
          
          <div class="cq-history">
            <h3>历史长河</h3>
            <div class="history-timeline">
              <div class="timeline-item">
                <div class="year">公元前770年</div>
                <div class="event">春秋时期开始</div>
              </div>
              <div class="timeline-item">
                <div class="year">公元前551年</div>
                <div class="event">孔子诞生</div>
              </div>
              <div class="timeline-item">
                <div class="year">公元前476年</div>
                <div class="event">春秋时期结束</div>
              </div>
            </div>
          </div>
          
          <div class="cq-wisdom">
            <h3>古人智慧</h3>
            <div class="wisdom-cards">
              <div class="wisdom-card">
                <h4>仁</h4>
                <p>仁者爱人</p>
              </div>
              <div class="wisdom-card">
                <h4>义</h4>
                <p>义者循理</p>
              </div>
              <div class="wisdom-card">
                <h4>礼</h4>
                <p>礼者敬人</p>
              </div>
              <div class="wisdom-card">
                <h4>智</h4>
                <p>智者明理</p>
              </div>
              <div class="wisdom-card">
                <h4>信</h4>
                <p>信者守诺</p>
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
      
      // 添加页面出现动画
      this.playEntranceAnimation();
    }, 100);
  },
  
  // 隐藏春秋页面
  hide: function() {
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
  applyStyles: function() {
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
  playEntranceAnimation: function() {
    console.log('播放春秋页面入场动画');
    
    // 为各个元素添加依次进入的动画
    const elements = document.querySelectorAll('.cq-intro, .cq-quote-container, .cq-history, .cq-wisdom');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated');
      }, 300 * index);
    });
  }
};

// 导出春秋对象，供其他模块使用
window.cq = cq;

// 初始化春秋页面功能
document.addEventListener('DOMContentLoaded', () => {
  cq.init();
});