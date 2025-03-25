// daily.js - 每日一话功能

const daily = {
  isOpen: false,
  quotes: [
    { text: "不积跬步，无以至千里；不积小流，无以成江海。", source: "《荀子·劝学》" },
    { text: "读书破万卷，下笔如有神。", source: "杜甫" },
    { text: "书山有路勤为径，学海无涯苦作舟。", source: "韩愈" },
    { text: "业精于勤，荒于嬉；行成于思，毁于随。", source: "韩愈" },
    { text: "天行健，君子以自强不息。", source: "《周易》" },
    { text: "路漫漫其修远兮，吾将上下而求索。", source: "屈原《离骚》" },
    { text: "敏而好学，不耻下问。", source: "《论语》" },
    { text: "知之者不如好之者，好之者不如乐之者。", source: "《论语》" },
    { text: "博学之，审问之，慎思之，明辨之，笃行之。", source: "《中庸》" },
    { text: "学而不思则罔，思而不学则殆。", source: "《论语》" }
  ],
  joke: null, // 用于存储获取的笑话
  
  // 初始化函数
  init: function() {
    console.log('初始化每日一话功能');
  },
  
  // 获取笑话
  fetchJoke: async function() {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
      if (!response.ok) {
        throw new Error('获取笑话失败');
      }
      
      const jokeData = await response.json();
      // 保存笑话内容
      if (jokeData.type === 'single') {
        this.joke = {
          text: jokeData.joke,
          type: 'single'
        };
      } else {
        this.joke = {
          setup: jokeData.setup,
          delivery: jokeData.delivery,
          type: 'twopart'
        };
      }
      
      // 如果页面已经显示，更新笑话内容
      this.updateJokeDisplay();
      
    } catch (error) {
      console.error('获取笑话失败:', error);
      this.joke = {
        text: "为什么程序员总是分不清万圣节和圣诞节？因为 Oct 31 = Dec 25",
        type: 'single'
      };
    }
  },
  
  // 更新笑话显示
  updateJokeDisplay: function() {
    const jokeContainer = document.querySelector('.daily-joke-content');
    if (!jokeContainer || !this.joke) return;
    
    if (this.joke.type === 'single') {
      jokeContainer.innerHTML = `<p>${this.joke.text}</p>`;
    } else {
      jokeContainer.innerHTML = `
        <p class="joke-setup">${this.joke.setup}</p>
        <p class="joke-delivery">${this.joke.delivery}</p>
      `;
    }
  },
  
  // 显示每日一话页面
  show: function() {
    // 如果页面已经打开，不重复操作
    if (this.isOpen) return;
    
    console.log('显示每日一话页面');
    
    // 获取笑话
    this.fetchJoke();
    
    // 获取今天的日期作为随机种子
    const today = new Date();
    const dateString = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    const randomSeed = parseInt(dateString);
    
    // 使用日期作为种子生成伪随机数，使每天显示固定的一句话
    const randomIndex = randomSeed % this.quotes.length;
    const todayQuote = this.quotes[randomIndex];
    
    // 创建每日一话页面元素
    const dailyElement = document.createElement('div');
    dailyElement.id = 'daily-page';
    dailyElement.className = 'daily-container';
    
    // 设置页面内容 - 简化版，只保留格言和笑话
    dailyElement.innerHTML = `
      <div class="daily-content">
        <button class="back-btn" id="daily-back-btn"></button>
        <div class="daily-header">
          <h2>每日一话</h2>
          <div class="daily-shine"></div>
        </div>
        
        <div class="daily-body">
          <div class="daily-date">
            ${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日
          </div>
          
          <div class="daily-flex-container">
            <div class="daily-quote-container">
              <div class="daily-quote">
                <p class="quote-text">${todayQuote.text}</p>
                <p class="quote-source">${todayQuote.source}</p>
              </div>
            </div>
            
            <div class="daily-joke">
              <h3>今日一笑</h3>
              <div class="joke-container">
                <div class="daily-joke-content">
                  <p>正在加载笑话...</p>
                </div>
                <button class="refresh-joke-btn">换一个</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 添加到文档
    document.querySelector('.container').appendChild(dailyElement);
    
    // 设置页面样式
    this.applyStyles();
    
    // 显示页面
    setTimeout(() => {
      dailyElement.classList.add('open');
      this.isOpen = true;
      
      // 添加返回按钮事件
      document.getElementById('daily-back-btn').addEventListener('click', () => {
        this.hide();
      });
      
      // 添加刷新笑话按钮事件
      const refreshJokeBtn = document.querySelector('.refresh-joke-btn');
      if (refreshJokeBtn) {
        refreshJokeBtn.addEventListener('click', () => {
          refreshJokeBtn.textContent = '加载中...';
          refreshJokeBtn.disabled = true;
          this.fetchJoke().then(() => {
            refreshJokeBtn.textContent = '换一个';
            refreshJokeBtn.disabled = false;
          });
        });
      }
      
      // 添加页面出现动画
      this.playEntranceAnimation();
    }, 100);
  },
  
  // 隐藏每日一话页面
  hide: function() {
    const dailyElement = document.getElementById('daily-page');
    if (!dailyElement) return;
    
    dailyElement.classList.remove('open');
    
    // 延迟移除元素
    setTimeout(() => {
      dailyElement.remove();
      this.isOpen = false;
      console.log('关闭每日一话页面！');
      
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
  
  // 应用每日一话页面样式
  applyStyles: function() {
    // 如果已经添加过样式则不重复添加
    if (document.getElementById('daily-styles-link')) return;
    
    // 创建链接元素，加载外部 CSS 文件
    const linkElement = document.createElement('link');
    linkElement.id = 'daily-styles-link';
    linkElement.rel = 'stylesheet';
    linkElement.href = './daily.css?v=' + new Date().getTime(); // 添加时间戳防止缓存
    
    // 添加到文档头部
    document.head.appendChild(linkElement);
  },
  
  // 播放入场动画
  playEntranceAnimation: function() {
    console.log('播放每日一话页面入场动画');
    
    // 为各个元素添加依次进入的动画，删除了不再存在的元素
    const elements = document.querySelectorAll('.daily-date, .daily-quote-container, .daily-joke');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animated');
      }, 300 * index);
    });
  }
};

// 导出每日一话对象，供其他模块使用
window.daily = daily;

// 初始化每日一话功能
document.addEventListener('DOMContentLoaded', () => {
  daily.init();
});