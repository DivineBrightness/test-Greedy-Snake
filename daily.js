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
  pokemon: null, // 用于存储获取的宝可梦数据
  catFact: null, // 用于存储获取的猫咪事实

  // 初始化函数
  init: function() {
    console.log('初始化每日一话功能');
  },

  // 1. 添加翻译方法
  translateText: async function(text) {
    try {
      const encodedText = encodeURIComponent(text);
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|zh-CN`);
      
      if (!response.ok) {
        throw new Error('翻译请求失败');
      }
      
      const data = await response.json();
      if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        throw new Error('无法获取翻译结果');
      }
    } catch (error) {
      console.error('翻译失败:', error);
      return null;
    }
  },
  // 2. 修改获取猫咪事实方法，增加翻译功能
  fetchCatFact: async function() {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('获取猫咪事实失败');
      }
      
      const data = await response.json();
      this.catFact = {
        original: data.fact,
        translated: null
      };
      
      // 获取翻译
      const translation = await this.translateText(data.fact);
      if (translation) {
        this.catFact.translated = translation;
      }
      
      console.log('获取到猫咪事实:', this.catFact);
      return this.catFact;
      
    } catch (error) {
      console.error('获取猫咪事实失败:', error);
      this.catFact = {
        original: "猫咪每天大约要睡16-18小时。",
        translated: "猫每天睡16-18个小时。"
      };
      return this.catFact;
    }
  },

  // 3. 修改显示猫咪事实弹窗方法，同时显示原文和译文
  showCatFactModal: async function() {
    // 如果没有事先加载猫咪事实，先获取一个
    if (!this.catFact) {
      await this.fetchCatFact();
    }
    
    // 创建弹窗元素
    const modalElement = document.createElement('div');
    modalElement.id = 'cat-fact-modal';
    modalElement.className = 'cat-fact-modal';
    
    // 设置弹窗内容 - 添加原文和译文
    modalElement.innerHTML = `
      <div class="cat-fact-modal-content">
        <button class="modal-close-btn"><span>×</span></button>
        <div class="cat-fact-header">
          <h3>猫咪说</h3>
        </div>
        <div class="cat-fact-image">
          <img src="./image/cat.svg" alt="猫咪" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><path d=%22M30,20 C35,10 45,10 50,15 C55,10 65,10 70,20 C80,30 90,40 90,60 C90,70 80,80 60,85 L60,90 L40,90 L40,85 C20,80 10,70 10,60 C10,40 20,30 30,20 Z M40,75 C40,85 60,85 60,75%22 fill=%22%23444%22 stroke=%22%23222%22 stroke-width=%222%22/><circle cx=%2235%22 cy=%2240%22 r=%225%22 fill=%22%23fff%22/><circle cx=%2265%22 cy=%2240%22 r=%225%22 fill=%22%23fff%22/></svg>'">
        </div>
        <div class="cat-fact-content">
          <p class="fact-text original-text">"${this.catFact.original}"</p>
          ${this.catFact.translated ? `<p class="fact-text translated-text">『${this.catFact.translated}』</p>` : ''}
        </div>
        <button class="get-another-fact-btn">再来一条</button>
      </div>
    `;
    
    // 添加到文档
    document.body.appendChild(modalElement);
    
    // 添加弹窗出现动画
    setTimeout(() => {
      modalElement.classList.add('open');
    }, 10);
    
    // 添加关闭按钮事件
    const closeBtn = modalElement.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalElement.classList.remove('open');
        setTimeout(() => {
          modalElement.remove();
        }, 300);
      });
    }
    
    // 添加再来一条按钮事件
    const getAnotherBtn = modalElement.querySelector('.get-another-fact-btn');
    if (getAnotherBtn) {
      getAnotherBtn.addEventListener('click', async () => {
        getAnotherBtn.textContent = '加载中...';
        getAnotherBtn.disabled = true;
        
        await this.fetchCatFact();
        
        const originalTextElem = modalElement.querySelector('.original-text');
        let translatedTextElem = modalElement.querySelector('.translated-text');
        
        if (originalTextElem) {
          originalTextElem.textContent = `"${this.catFact.original}"`;
          originalTextElem.classList.add('fact-refresh');
          setTimeout(() => {
            originalTextElem.classList.remove('fact-refresh');
          }, 500);
        }
        
        if (this.catFact.translated) {
          if (translatedTextElem) {
            translatedTextElem.textContent = `『${this.catFact.translated}』`;
            translatedTextElem.classList.add('fact-refresh');
            setTimeout(() => {
              translatedTextElem.classList.remove('fact-refresh');
            }, 500);
          } else {
            // 如果之前没有翻译元素，创建一个
            const factContent = modalElement.querySelector('.cat-fact-content');
            if (factContent) {
              translatedTextElem = document.createElement('p');
              translatedTextElem.className = 'fact-text translated-text fact-refresh';
              translatedTextElem.textContent = `『${this.catFact.translated}』`;
              factContent.appendChild(translatedTextElem);
              
              setTimeout(() => {
                translatedTextElem.classList.remove('fact-refresh');
              }, 500);
            }
          }
        }
        
        getAnotherBtn.textContent = '再来一条';
        getAnotherBtn.disabled = false;
      });
    }
  },
  // 获取随机宝可梦
  fetchPokemon: async function() {
    try {
      // 生成1-898之间的随机ID (全国图鉴编号范围)
      const randomId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      
      if (!response.ok) {
        throw new Error('获取宝可梦数据失败');
      }
      
      const pokemonData = await response.json();
      
      // 处理并保存宝可梦数据
      this.pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        // 使用官方图片
        image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
        types: pokemonData.types.map(type => type.type.name),
        height: pokemonData.height / 10, // 转换为米
        weight: pokemonData.weight / 10, // 转换为千克
        abilities: pokemonData.abilities.map(ability => ability.ability.name),
        stats: pokemonData.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      };
      
      console.log('获取到宝可梦数据:', this.pokemon);
      
    } catch (error) {
      console.error('获取宝可梦失败:', error);
      this.pokemon = null;
    }
  },
  // 显示宝可梦信息弹窗
  showPokemonModal: function() {
    if (!this.pokemon) {
      alert('宝可梦数据加载中，请稍后再试');
      return;
    }
    
    // 创建弹窗元素
    const modalElement = document.createElement('div');
    modalElement.id = 'pokemon-modal';
    modalElement.className = 'pokemon-modal';
    
    // 获取宝可梦类型的中文名称
    const getTypeChineseName = (type) => {
      const typeMap = {
        normal: '一般', fire: '火', water: '水', electric: '电', grass: '草',
        ice: '冰', fighting: '格斗', poison: '毒', ground: '地面', flying: '飞行',
        psychic: '超能力', bug: '虫', rock: '岩石', ghost: '幽灵', dragon: '龙',
        dark: '恶', steel: '钢', fairy: '妖精'
      };
      return typeMap[type] || type;
    };
    
    // 获取宝可梦能力的中文名称
    const getAbilityChineseName = (ability) => {
      // 这里只是一个简单的示例，实际上可能需要更多的映射
      const abilityMap = {
        overgrow: '茂盛', blaze: '猛火', torrent: '激流', 
        shield_dust: '鳞粉', 'sand-veil': '沙隐', 'static': '静电',
        'lightning-rod': '避雷针', 'storm-drain': '引水',
        'water-absorb': '吸水', 'flash-fire': '引火',
        'flame-body': '火焰之躯', 'wonder-skin': '神奇皮肤'
      };
      return abilityMap[ability] || ability;
    };
    
    // 获取能力值的中文名称
    const getStatChineseName = (stat) => {
      const statMap = {
        hp: '生命值', attack: '攻击', defense: '防御',
        'special-attack': '特攻', 'special-defense': '特防', speed: '速度'
      };
      return statMap[stat] || stat;
    };
    
    // 大写首字母
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    
    // 设置弹窗内容
    modalElement.innerHTML = `
      <div class="pokemon-modal-content">
        <button class="modal-close-btn"><span>×</span></button>
        <div class="pokemon-header">
          <h3>#${this.pokemon.id} ${capitalize(this.pokemon.name)}</h3>
        </div>
        <div class="pokemon-image">
          <img src="${this.pokemon.image}" alt="${this.pokemon.name}">
        </div>
        <div class="pokemon-types">
          ${this.pokemon.types.map(type => 
            `<span class="pokemon-type ${type}">${getTypeChineseName(type)}</span>`
          ).join('')}
        </div>
        <div class="pokemon-info">
          <div class="info-item">
            <span class="info-label">身高:</span>
            <span>${this.pokemon.height} m</span>
          </div>
          <div class="info-item">
            <span class="info-label">体重:</span>
            <span>${this.pokemon.weight} kg</span>
          </div>
        </div>
        <div class="pokemon-abilities">
          <h4>特性</h4>
          <div class="abilities-list">
            ${this.pokemon.abilities.map(ability => 
              `<span class="pokemon-ability">${getAbilityChineseName(ability)}</span>`
            ).join('')}
          </div>
        </div>
        <div class="pokemon-stats">
          <h4>能力值</h4>
          ${this.pokemon.stats.map(stat => `
            <div class="stat-item">
              <span class="stat-name">${getStatChineseName(stat.name)}</span>
              <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${Math.min(stat.value, 100)}%"></div>
              </div>
              <span class="stat-value">${stat.value}</span>
            </div>
          `).join('')}
        </div>
        <button class="catch-another-btn">捕捉另一个</button>
      </div>
    `;
    
    // 添加到文档
    document.querySelector('.daily-content').appendChild(modalElement);
    
    // 添加弹窗出现动画
    setTimeout(() => {
      modalElement.classList.add('open');
    }, 10);
    
    // 添加关闭按钮事件
    const closeBtn = modalElement.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalElement.classList.remove('open');
        setTimeout(() => {
          modalElement.remove();
        }, 300);
      });
    }
    
    // 添加捕捉另一个按钮事件
    const catchAnotherBtn = modalElement.querySelector('.catch-another-btn');
    if (catchAnotherBtn) {
      catchAnotherBtn.addEventListener('click', async () => {
        modalElement.classList.remove('open');
        setTimeout(() => {
          modalElement.remove();
          this.fetchPokemon().then(() => {
            this.showPokemonModal();
          });
        }, 300);
      });
    }
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
  
  // 修改 show 方法，添加猫咪按钮
  show: function() {
    // 如果页面已经打开，不重复操作
    if (this.isOpen) return;
    
    console.log('显示每日一话页面');
    
    // 隐藏浮动水果和水果篮
    if (window.floatingFruits) {
      window.floatingFruits.hide();
      console.log('已隐藏水果篮');
    }
    
    // 获取笑话
    this.fetchJoke();
    
    // 预加载宝可梦数据
    this.fetchPokemon();
    
    // 预加载猫咪事实
    this.fetchCatFact();
    
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
    
    // 设置页面内容 - 添加宝可梦按钮和猫咪按钮
    dailyElement.innerHTML = `
      <div class="daily-content">
        <button class="back-btn" id="daily-back-btn"></button>
        <div class="daily-buttons">
          <button class="pokemon-btn" id="pokemon-catch-btn">
            <img src="./image/精灵球.svg" alt="精灵球">
          </button>
          <button class="cat-btn" id="cat-fact-btn">
            <img src="./image/cat.svg" alt="猫咪">
          </button>
        </div>
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
      
      // 添加宝可梦按钮事件
      const pokemonBtn = document.getElementById('pokemon-catch-btn');
      if (pokemonBtn) {
        pokemonBtn.addEventListener('click', () => {
          this.showPokemonModal();
        });
      }
      
      // 添加猫咪按钮事件
      const catBtn = document.getElementById('cat-fact-btn');
      if (catBtn) {
        catBtn.addEventListener('click', () => {
          this.showCatFactModal();
        });
      }
      
      // 添加页面出现动画
      this.playEntranceAnimation();
    }, 100);
  },
    
  // 隐藏每日一话页面
  // 修改 hide 方法，添加显示水果篮的代码
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
      
      // 恢复显示浮动水果和水果篮
      // 使用延迟确保先完成其他UI恢复，再显示水果
      setTimeout(() => {
        // 检查是否在主页 - 只有在返回主页时才重新显示水果
        const isHomePage = 
          document.getElementById('games-selection').style.display === 'none' && 
          document.getElementById('snake-game').style.display === 'none' && 
          document.getElementById('tetris-game').style.display === 'none';
        
        if (isHomePage && window.floatingFruits) {
          window.floatingFruits.show();
          console.log('已恢复显示水果篮');
        }
      }, 200);
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