// cq.js - 春秋页面功能

const cq = {
  isOpen: false,
  
  // 角色图片数据
  characterImages: {
    'frieren': ['./image/cq/fu1.jpg?v=' + new Date().getTime(), './image/cq/fu2.jpg?v=' + new Date().getTime(), './image/cq/fu3.jpg?v=' + new Date().getTime(), './image/cq/fu4.jpg?v=' + new Date().getTime(), './image/cq/fu5.jpg?v=' + new Date().getTime(), './image/cq/fu6.jpg?v=' + new Date().getTime(), './image/cq/fu7.jpg?v=' + new Date().getTime()],
    'himmel': ['./image/cq/xin1.jpg?v=' + new Date().getTime(), './image/cq/xin2.jpg?v=' + new Date().getTime(), './image/cq/xin3.jpg?v=' + new Date().getTime(), './image/cq/xin4.jpg?v=' + new Date().getTime()],
    'fern': ['./image/cq/fei1.jpg?v=' + new Date().getTime(), './image/cq/fei2.jpg?v=' + new Date().getTime(), './image/cq/fei3.jpg?v=' + new Date().getTime(), './image/cq/fei4.jpg?v=' + new Date().getTime()],
    'stark': ['./image/cq/xiu1.jpg?v=' + new Date().getTime(), './image/cq/xiu2.jpg?v=' + new Date().getTime(), './image/cq/xiu3.jpg?v=' + new Date().getTime()],
  },
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
            《葬送的芙莉莲》（日语：葬送のフリーレン）
          </p>
          <p>
            讲述了精灵魔法使芙莉莲在结束了与同伴欣梅尔、艾泽和海塔的十年冒险之旅后，再次踏上旅程的故事。
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
              那等下次，五十年后，我知道一个地方，流星雨看起来会更美，我带你们去。"
            </p>
            <p class="quote-source">—— 芙莉莲</p>
          </div>
        </div>


        <div class="cq-wisdom">
          <h3>角色介绍</h3>
          <div class="wisdom-cards">
            <div class="wisdom-card" data-character="frieren">
              <h4>芙莉莲</h4>
              <p>精灵魔法使</p>
            </div>
            <div class="wisdom-card" data-character="himmel">
              <h4>欣梅尔</h4>
              <p>已故的勇者</p>
            </div>
            <div class="wisdom-card" data-character="fern">
              <h4>费伦</h4>
              <p>芙莉莲的弟子</p>
            </div>
            <div class="wisdom-card" data-character="stark">
              <h4>修塔尔克</h4>
              <p>艾泽的弟子</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 角色图片弹窗 -->
    <div class="character-modal" id="character-modal">
      <div class="character-modal-close" id="modal-close"></div>
      <div class="character-modal-content">
        <div class="character-image-container" id="image-container">
          <!-- 图片将通过JS动态添加 -->
        </div>
        <div class="character-modal-nav" id="modal-nav" style="display: none;">
          <div class="modal-nav-btn modal-prev" id="modal-prev"></div>
          <div class="modal-nav-btn modal-next" id="modal-next"></div>
        </div>
        <div class="modal-counter" id="modal-counter" style="display: none;"></div>
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
    
    // 添加角色卡片点击事件
    this.setupCharacterCards();

    // 添加页面出现动画
    this.playEntranceAnimation();

    // 创建花瓣飘落效果
    this.createPetalsFall();
  }, 100);
},

// 设置角色卡片点击事件
setupCharacterCards: function() {
  const cards = document.querySelectorAll('.wisdom-card');
  const modal = document.getElementById('character-modal');
  const closeBtn = document.getElementById('modal-close');
  const imageContainer = document.getElementById('image-container');
  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');
  const counter = document.getElementById('modal-counter');
  const modalNav = document.getElementById('modal-nav');
  
  let currentCharacter = '';
  let currentImageIndex = 0;
  
  // 添加卡片点击事件
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const character = card.getAttribute('data-character');
      currentCharacter = character;
      currentImageIndex = 0;
      this.showCharacterModal(character, currentImageIndex);
    });
  });
  
  // 添加关闭按钮事件
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });
  
  // 添加点击模态框背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
  
  // 添加前后导航按钮事件
  prevBtn.addEventListener('click', () => {
    const images = this.characterImages[currentCharacter];
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    this.changeImage(currentCharacter, currentImageIndex);
  });
  
  nextBtn.addEventListener('click', () => {
    const images = this.characterImages[currentCharacter];
    currentImageIndex = (currentImageIndex + 1) % images.length;
    this.changeImage(currentCharacter, currentImageIndex);
  });
  
  // 添加键盘导航
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      modal.classList.remove('active');
    } else if (e.key === 'ArrowLeft') {
      const images = this.characterImages[currentCharacter];
      if (images.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        this.changeImage(currentCharacter, currentImageIndex);
      }
    } else if (e.key === 'ArrowRight') {
      const images = this.characterImages[currentCharacter];
      if (images.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        this.changeImage(currentCharacter, currentImageIndex);
      }
    }
  });
  
  // 添加触摸滑动支持
  let touchStartX = 0;
  let touchEndX = 0;
  
  imageContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  imageContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // 向左滑 -> 下一张
      const images = cq.characterImages[currentCharacter];
      if (images.length > 1) {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        cq.changeImage(currentCharacter, currentImageIndex);
      }
    }
    
    if (touchEndX > touchStartX + 50) {
      // 向右滑 -> 上一张
      const images = cq.characterImages[currentCharacter];
      if (images.length > 1) {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        cq.changeImage(currentCharacter, currentImageIndex);
      }
    }
  }
},

// 显示角色图片弹窗
showCharacterModal: function(character, imageIndex) {
  const modal = document.getElementById('character-modal');
  const imageContainer = document.getElementById('image-container');
  const modalNav = document.getElementById('modal-nav');
  const counter = document.getElementById('modal-counter');
  
  // 清空现有内容
  imageContainer.innerHTML = '';
  
  // 获取角色图片
  const images = this.characterImages[character];
  
  // 创建和添加图片
  const img = document.createElement('img');
  img.src = images[imageIndex];
  img.alt = character;
  img.className = 'character-image';
  imageContainer.appendChild(img);
  
  // 更新计数器
  if (images.length > 1) {
    counter.textContent = `${imageIndex + 1} / ${images.length}`;
    counter.style.display = 'block';
    modalNav.style.display = 'flex';
  } else {
    counter.style.display = 'none';
    modalNav.style.display = 'none';
  }
  
  // 显示弹窗
  modal.classList.add('active');
},

// 切换图片
changeImage: function(character, imageIndex) {
  const imageContainer = document.getElementById('image-container');
  const counter = document.getElementById('modal-counter');
  const images = this.characterImages[character];
  
  // 更新图片
  const currentImg = imageContainer.querySelector('.character-image');
  
  // 创建新图片并添加过渡效果
  currentImg.classList.add('fade-out');
  
  setTimeout(() => {
    // 更新图片源
    currentImg.src = images[imageIndex];
    currentImg.classList.remove('fade-out');
    currentImg.classList.add('fade-in');
    
    // 短暂延迟后移除过渡类
    setTimeout(() => {
      currentImg.classList.remove('fade-in');
    }, 300);
    
    // 更新计数器
    counter.textContent = `${imageIndex + 1} / ${images.length}`;
  }, 300);
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
      sourceMP4.src = './image/视频/fulilian_1.mp4';
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

// 创建连续蓝色花瓣飘落效果
createPetalsFall: function() {
  // 创建花瓣容器
  const petalsContainer = document.createElement('div');
  petalsContainer.className = 'blue-petals-container';
  document.getElementById('cq-page').appendChild(petalsContainer);
  
  // 基础花瓣数量 - 根据屏幕大小调整
  const petalCount = window.innerWidth < 768 ? 30 : 60;
  
  // 生成花瓣元素 - 分批创建确保连续性
  this.generatePetals(petalsContainer, petalCount, 0);
  
  // 每秒检查并维持花瓣数量
  this.petalInterval = setInterval(() => {
    // 如果页面已关闭则停止生成
    if (!document.getElementById('cq-page')) {
      clearInterval(this.petalInterval);
      return;
    }
    
    // 计算当前剩余的花瓣数量
    const currentPetals = petalsContainer.querySelectorAll('.blue-petal').length;
    const targetPetals = window.innerWidth < 768 ? 30 : 60;
    
    // 如果花瓣数量不足，则补充新花瓣
    if (currentPetals < targetPetals * 0.7) {
      const needToAdd = Math.floor((targetPetals - currentPetals) / 2);
      this.generatePetals(petalsContainer, needToAdd, currentPetals);
    }
  }, 2000);
  
  // 添加星星背景
  this.addStars(petalsContainer);
},

// 生成单批花瓣
generatePetals: function(container, count, startIndex) {
  for (let i = 0; i < count; i++) {
    // 创建花瓣
    const petal = document.createElement('div');
    
    // 随机花瓣类型 - 增加到4种
    const petalType = Math.floor(Math.random() * 4) + 1;
    petal.className = `blue-petal blue-petal-${petalType}`;
    
    // 随机起始位置 - 水平均匀分布
    const horizontalSegment = 100 / count;
    const startPosition = (i * horizontalSegment) + (Math.random() * horizontalSegment);
    petal.style.left = `${startPosition}%`;
    
    // 随机初始高度 - 让花瓣起始位置更分散
    const startHeight = Math.random() * -100;
    petal.style.top = `${startHeight}%`;
    
    // 随机大小变化 (80%-120%) - 更自然的尺寸变化
    const scale = 0.8 + Math.random() * 0.4;
    
    // 随机旋转角度 - 初始旋转更自然
    const rotation = Math.random() * 360;
    petal.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    
    // 随机动画持续时间 - 更多变化
    const duration = 10 + Math.random() * 15;
    petal.style.animationDuration = `${duration}s`;
    
    // 随机动画延迟 - 错开开始时间，更连续
    const delay = Math.random() * 10;
    petal.style.animationDelay = `${delay}s`;
    
    // 为花瓣添加ID以便可能的后续清理
    petal.id = `petal-${startIndex + i}`;
    
    // 添加花瓣清理功能 - 动画结束后可能清除DOM
    petal.addEventListener('animationiteration', () => {
      // 10%概率在动画重新开始时移除元素
      // 这有助于防止页面中花瓣元素堆积
      if (Math.random() < 0.1) {
        setTimeout(() => {
          petal.remove();
        }, 100);
      }
    });
    
    // 添加到容器
    container.appendChild(petal);
  }
},

// 添加闪烁星星
addStars: function(container) {
  // 星星数量
  const starCount = window.innerWidth < 768 ? 20 : 40;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // 随机位置
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // 随机大小
    const size = 1 + Math.random() * 1.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // 随机闪烁时间和延迟
    const duration = 3 + Math.random() * 5;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${Math.random() * 6}s`;
    
    // 偶尔添加一个大亮星
    if (Math.random() < 0.15) {
      star.classList.add('star-large');
    }
    
    container.appendChild(star);
  }
},

// 在页面隐藏时清理资源
hide: function() {
  // 清除花瓣生成间隔
  if (this.petalInterval) {
    clearInterval(this.petalInterval);
    this.petalInterval = null;
  }
  
  // 原有的hide函数内容
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
};

// 导出春秋对象，供其他模块使用
window.cq = cq;

// 初始化春秋页面功能
document.addEventListener('DOMContentLoaded', () => {
  cq.init();
});