// daily.js - 每日一话功能

const daily = {
  isOpen: false,
  quotes: [
    { text: "不积跬步，无以至千里；不积小流，无以成江海。", source: "《荀子·劝学》" },
    { text: "业精于勤，荒于嬉；行成于思，毁于随。", source: "韩愈" },
    { text: "天行健，君子以自强不息。", source: "《周易》" },
    { text: "路漫漫其修远兮，吾将上下而求索。", source: "屈原《离骚》" },
    { text: "敏而好学，不耻下问。", source: "《论语》" },
    { text: "知之者不如好之者，好之者不如乐之者。", source: "《论语》" },
    { text: "博学之，审问之，慎思之，明辨之，笃行之。", source: "《中庸》" },
    { text: "学而不思则罔，思而不学则殆。", source: "《论语》" },
    { text: "三人行，必有我师焉。择其善者而从之，其不善者而改之。", source: "《论语·述而》" },
    { text: "玉不琢，不成器；人不学，不知道。", source: "《礼记·学记》" },
    { text: "纸上得来终觉浅，绝知此事要躬行。", source: "陆游《冬夜读书示子聿》" },
    { text: "问渠那得清如许？为有源头活水来。", source: "朱熹《观书有感》" },
    { text: "非淡泊无以明志，非宁静无以致远。", source: "诸葛亮《诫子书》" },
    { text: "操千曲而后晓声，观千剑而后识器。", source: "刘勰《文心雕龙》" },
    { text: "吾生也有涯，而知也无涯。", source: "《庄子·养生主》" },
    { text: "锲而舍之，朽木不折；锲而不舍，金石可镂。", source: "《荀子·劝学》" },
    { text: "不登高山，不知天之高也；不临深溪，不知地之厚也。", source: "《荀子·劝学》" },
    { text: "志不强者智不达，言不信者行不果。", source: "《墨子·修身》" },
    { text: "明日复明日，明日何其多。我生待明日，万事成蹉跎。", source: "钱福《明日歌》" },
    { text: "合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。", source: "《道德经》" },
    { text: "博观而约取，厚积而薄发。", source: "苏轼《稼说送张琥》" },
    { text: "风声雨声读书声声声入耳，家事国事天下事事事关心。", source: "顾宪成" },
    { text: "君子食无求饱，居无求安，敏于事而慎于言，就有道而正焉。", source: "《论语·学而》" },
    { text: "不飞则已，一飞冲天；不鸣则已，一鸣惊人。", source: "《史记·滑稽列传》" }
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



    // 获取宝可梦名称的中文名称
    const getPokemonChineseName = (name) => {
      const lowerCaseName = name.toLowerCase();
      const pokemonNameMap = {
        "bulbasaur": "妙蛙种子", "ivysaur": "妙蛙草", "venusaur": "妙蛙花", "charmander": "小火龙", "charmeleon": "火恐龙", "charizard": "喷火龙",
        "squirtle": "杰尼龟", "wartortle": "卡咪龟", "blastoise": "水箭龟", "caterpie": "绿毛虫", "metapod": "铁甲蛹", "butterfree": "巴大蝶",
        "weedle": "独角虫", "kakuna": "铁壳蛹", "beedrill": "大针蜂", "pidgey": "波波", "pidgeotto": "比比鸟", "pidgeot": "大比鸟",
        "rattata": "小拉达", "raticate": "拉达", "spearow": "烈雀", "fearow": "大嘴雀", "ekans": "阿柏蛇", "arbok": "阿柏怪",
        "pikachu": "皮卡丘", "raichu": "雷丘", "sandshrew": "穿山鼠", "sandslash": "穿山王", "nidoran-f": "尼多兰", "nidorina": "尼多娜",
        "nidoqueen": "尼多后", "nidoran-m": "尼多朗", "nidorino": "尼多力诺", "nidoking": "尼多王", "clefairy": "皮皮", "clefable": "皮可西",
        "vulpix": "六尾", "ninetales": "九尾", "jigglypuff": "胖丁", "wigglytuff": "胖可丁", "zubat": "超音蝠", "golbat": "大嘴蝠",
        "oddish": "走路草", "gloom": "臭臭花", "vileplume": "霸王花", "paras": "派拉斯", "parasect": "派拉斯特", "venonat": "毛球",
        "venomoth": "摩鲁蛾", "diglett": "地鼠", "dugtrio": "三地鼠", "meowth": "喵喵", "persian": "猫老大", "psyduck": "可达鸭",
        "golduck": "哥达鸭", "mankey": "猴怪", "primeape": "火暴猴", "growlithe": "卡蒂狗", "arcanine": "风速狗", "poliwag": "蚊香蝌蚪",
        "poliwhirl": "蚊香君", "poliwrath": "蚊香泳士", "abra": "凯西", "kadabra": "勇基拉", "alakazam": "胡地", "machop": "腕力",
        "machoke": "豪力", "machamp": "怪力", "bellsprout": "喇叭芽", "weepinbell": "口呆花", "victreebel": "大食花", "tentacool": "玛瑙水母",
        "tentacruel": "毒刺水母", "geodude": "小拳石", "graveler": "隆隆石", "golem": "隆隆岩", "ponyta": "小火马", "rapidash": "烈焰马",
        "slowpoke": "呆呆兽", "slowbro": "呆壳兽", "magnemite": "小磁怪", "magneton": "三合一磁怪", "farfetch'd": "大葱鸭", "doduo": "嘟嘟",
        "dodrio": "嘟嘟利", "seel": "小海狮", "dewgong": "白海狮", "grimer": "臭泥", "muk": "臭臭泥", "shellder": "大舌贝", "cloyster": "刺甲贝",
        "gastly": "鬼斯", "haunter": "鬼斯通", "gengar": "耿鬼", "onix": "大岩蛇", "drowzee": "催眠貘", "hypno": "引梦貘人", "krabby": "大钳蟹",
        "kingler": "巨钳蟹", "voltorb": "霹雳电球", "electrode": "顽皮雷弹", "exeggcute": "蛋蛋", "exeggutor": "椰蛋树", "cubone": "卡拉卡拉",
        "marowak": "嘎啦嘎啦", "hitmonlee": "飞腿郎", "hitmonchan": "快拳郎", "lickitung": "大舌头", "koffing": "瓦斯弹", "weezing": "双弹瓦斯",
        "rhyhorn": "独角犀牛", "rhydon": "钻角犀兽", "chansey": "吉利蛋", "tangela": "蔓藤怪", "kangaskhan": "袋兽", "horsea": "墨海马",
        "seadra": "海刺龙", "goldeen": "角金鱼", "seaking": "金鱼王", "staryu": "海星星", "starmie": "宝石海星", "mr. mime": "魔墙人偶",
        "scyther": "飞天螳螂", "jynx": "迷唇姐", "electabuzz": "电击兽", "magmar": "鸭嘴火兽", "pinsir": "凯罗斯", "tauros": "肯泰罗",
        "magikarp": "鲤鱼王", "gyarados": "暴鲤龙", "lapras": "拉普拉斯", "ditto": "百变怪", "eevee": "伊布", "vaporeon": "水伊布",
        "jolteon": "雷伊布", "flareon": "火伊布", "porygon": "多边兽", "omanyte": "菊石兽", "omastar": "多刺菊石兽", "kabuto": "化石盔",
        "kabutops": "镰刀盔", "aerodactyl": "化石翼龙", "snorlax": "卡比兽", "articuno": "急冻鸟", "zapdos": "闪电鸟", "moltres": "火焰鸟",
        "dratini": "迷你龙", "dragonair": "哈克龙", "dragonite": "快龙", "mewtwo": "超梦", "mew": "梦幻", "chikorita": "菊草叶",
        "bayleef": "月桂叶", "meganium": "大竺葵", "cyndaquil": "火球鼠", "quilava": "火岩鼠", "typhlosion": "火暴兽", "totodile": "小锯鳄",
        "croconaw": "蓝鳄", "feraligatr": "大力鳄", "sentret": "尾立", "furret": "大尾立", "hoothoot": "咕咕", "noctowl": "猫头夜鹰",
        "ledyba": "芭瓢虫", "ledian": "安瓢虫", "spinarak": "圆丝蛛", "ariados": "阿利多斯", "crobat": "叉字蝠", "chinchou": "灯笼鱼",
        "lanturn": "电灯怪", "pichu": "皮丘", "cleffa": "皮宝宝", "igglybuff": "宝宝丁", "togepi": "波克比", "togetic": "波克基古",
        "natu": "天然雀", "xatu": "天然鸟", "mareep": "咩利羊", "flaaffy": "茸茸羊", "ampharos": "电龙", "bellossom": "美丽花",
        "marill": "玛力露", "azumarill": "玛力露丽", "sudowoodo": "树才怪", "politoed": "蚊香蛙皇", "hoppip": "毽子草", "skiploom": "毽子花",
        "jumpluff": "毽子棉", "aipom": "长尾怪手", "sunkern": "向日种子", "sunflora": "向日花怪", "yanma": "蜻蜻蜓", "wooper": "乌波",
        "quagsire": "沼王", "espeon": "太阳伊布", "umbreon": "月亮伊布", "murkrow": "黑暗鸦", "slowking": "呆呆王", "misdreavus": "梦妖",
        "unown": "未知图腾", "wobbuffet": "果然翁", "girafarig": "麒麟奇", "pineco": "榛果球", "forretress": "佛烈托斯", "dunsparce": "土龙弟弟",
        "gligar": "天蝎", "steelix": "大钢蛇", "snubbull": "布鲁", "granbull": "布鲁皇", "qwilfish": "千针鱼", "scizor": "巨钳螳螂",
        "shuckle": "壶壶", "heracross": "赫拉克罗斯", "sneasel": "狃拉", "teddiursa": "熊宝宝", "ursaring": "圈圈熊", "slugma": "熔岩虫",
        "magcargo": "熔岩蜗牛", "swinub": "小山猪", "piloswine": "长毛猪", "corsola": "太阳珊瑚", "remoraid": "铁炮鱼", "octillery": "章鱼桶",
        "delibird": "信使鸟", "mantine": "巨翅飞鱼", "skarmory": "盔甲鸟", "houndour": "戴鲁比", "houndoom": "黑鲁加", "kingdra": "刺龙王",
        "phanpy": "小小象", "donphan": "顿甲", "porygon2": "多边兽Ⅱ", "stantler": "惊角鹿", "smeargle": "图图犬", "tyrogue": "无畏小子",
        "hitmontop": "战舞郎", "smoochum": "迷唇娃", "elekid": "电击怪", "magby": "鸭嘴宝宝", "miltank": "大奶罐", "blissey": "幸福蛋",
        "raikou": "雷公", "entei": "炎帝", "suicune": "水君", "larvitar": "幼基拉斯", "pupitar": "沙基拉斯", "tyranitar": "班基拉斯",
        "lugia": "洛奇亚", "ho-oh": "凤王", "celebi": "时拉比", "treecko": "木守宫", "grovyle": "森林蜥蜴", "sceptile": "蜥蜴王",
        "torchic": "火稚鸡", "combusken": "力壮鸡", "blaziken": "火焰鸡", "mudkip": "水跃鱼", "marshtomp": "沼跃鱼", "swampert": "巨沼怪",
        "poochyena": "土狼犬", "mightyena": "大狼犬", "zigzagoon": "蛇纹熊", "linoone": "直冲熊", "wurmple": "刺尾虫", "silcoon": "甲壳茧",
        "beautifly": "狩猎凤蝶", "cascoon": "盾甲茧", "dustox": "毒粉蛾", "lotad": "莲叶童子", "lombre": "莲帽小童", "ludicolo": "乐天河童",
        "seedot": "橡实果", "nuzleaf": "长鼻叶", "shiftry": "狡猾天狗", "taillow": "傲骨燕", "swellow": "大王燕", "wingull": "长翅鸥",
        "pelipper": "大嘴鸥", "ralts": "拉鲁拉丝", "kirlia": "奇鲁莉安", "gardevoir": "沙奈朵", "surskit": "溜溜糖球", "masquerain": "雨翅蛾",
        "shroomish": "蘑蘑菇", "breloom": "斗笠菇", "slakoth": "懒人獭", "vigoroth": "过动猿", "slaking": "请假王", "nincada": "土居忍士",
        "ninjask": "铁面忍者", "shedinja": "脱壳忍者", "whismur": "咕妞妞", "loudred": "吼爆弹", "exploud": "爆音怪", "makuhita": "幕下力士",
        "hariyama": "铁掌力士", "azurill": "露力丽", "nosepass": "朝北鼻", "skitty": "向尾喵", "delcatty": "优雅猫", "sableye": "勾魂眼",
        "mawile": "大嘴娃", "aron": "可可多拉", "lairon": "可多拉", "aggron": "波士可多拉", "meditite": "玛沙那", "medicham": "恰雷姆",
        "electrike": "落雷兽", "manectric": "雷电兽", "plusle": "正电拍拍", "minun": "负电拍拍", "volbeat": "电萤虫", "illumise": "甜甜萤",
        "roselia": "毒蔷薇", "gulpin": "溶食兽", "swalot": "吞食兽", "carvanha": "利牙鱼", "sharpedo": "巨牙鲨", "wailmer": "吼吼鲸",
        "wailord": "吼鲸王", "numel": "呆火驼", "camerupt": "喷火驼", "torkoal": "煤炭龟", "spoink": "跳跳猪", "grumpig": "噗噗猪",
        "spinda": "晃晃斑", "trapinch": "大颚蚁", "vibrava": "超音波幼虫", "flygon": "沙漠蜻蜓", "cacnea": "刺球仙人掌", "cacturne": "梦歌仙人掌",
        "swablu": "青绵鸟", "altaria": "七夕青鸟", "zangoose": "猫鼬斩", "seviper": "饭匙蛇", "lunatone": "月石", "solrock": "太阳岩",
        "barboach": "泥泥鳅", "whiscash": "鲶鱼王", "corphish": "龙虾小兵", "crawdaunt": "铁螯龙虾", "baltoy": "天秤偶", "claydol": "念力土偶",
        "lileep": "触手百合", "cradily": "摇篮百合", "anorith": "太古羽虫", "armaldo": "太古盔甲", "feebas": "丑丑鱼", "milotic": "美纳斯",
        "castform": "飘浮泡泡", "kecleon": "变隐龙", "shuppet": "怨影娃娃", "banette": "诅咒娃娃", "duskull": "夜巡灵", "dusclops": "彷徨夜灵",
        "tropius": "热带龙", "chimecho": "风铃铃", "absol": "阿勃梭鲁", "wynaut": "小果然", "snorunt": "雪童子", "glalie": "冰鬼护",
        "spheal": "海豹球", "sealeo": "海魔狮", "walrein": "帝牙海狮", "clamperl": "珍珠贝", "huntail": "猎斑鱼", "gorebyss": "樱花鱼",
        "relicanth": "古空棘鱼", "luvdisc": "爱心鱼", "bagon": "宝贝龙", "shelgon": "甲壳龙", "salamence": "暴飞龙", "beldum": "铁哑铃",
        "metang": "金属怪", "metagross": "巨金怪", "regirock": "雷吉洛克", "regice": "雷吉艾斯", "registeel": "雷吉斯奇鲁", "latias": "拉帝亚斯",
        "latios": "拉帝欧斯", "kyogre": "盖欧卡", "groudon": "固拉多", "rayquaza": "烈空坐", "jirachi": "基拉祈", "deoxys": "代欧奇希斯",
        "turtwig": "草苗龟", "grotle": "树林龟", "torterra": "土台龟", "chimchar": "小火焰猴", "monferno": "猛火猴", "infernape": "烈焰猴",
        "piplup": "波加曼", "prinplup": "波皇子", "empoleon": "帝王拿波", "starly": "姆克儿", "staravia": "姆克鸟", "staraptor": "姆克鹰",
        "bidoof": "大牙狸", "bibarel": "大尾狸", "kricketot": "圆法师", "kricketune": "音箱蟀", "shinx": "小猫怪", "luxio": "勒克猫",
        "luxray": "伦琴猫", "budew": "含羞苞", "roserade": "罗丝雷朵", "cranidos": "头盖龙", "rampardos": "战槌龙", "shieldon": "盾甲龙",
        "bastiodon": "护城龙", "burmy": "结草儿", "wormadam": "结草贵妇", "mothim": "绅士蛾", "combee": "三蜜蜂", "vespiquen": "蜂女王",
        "pachirisu": "帕奇利兹", "buizel": "泳圈鼬", "floatzel": "浮潜鼬", "cherubi": "樱花宝", "cherrim": "樱花儿", "shellos": "无壳海兔",
        "gastrodon": "海兔兽", "ambipom": "双尾怪手", "drifloon": "飘飘球", "drifblim": "随风球", "buneary": "卷卷耳", "lopunny": "长耳兔",
        "mismagius": "梦妖魔", "honchkrow": "乌鸦头头", "glameow": "魅力喵", "purugly": "东施喵", "chingling": "铃铛响", "stunky": "臭鼬噗",
        "skuntank": "坦克臭鼬", "bronzor": "铜镜怪", "bronzong": "青铜钟", "bonsly": "盆才怪", "mime jr.": "魔尼尼", "happiny": "小福蛋",
        "chatot": "聒噪鸟", "spiritomb": "花岩怪", "gible": "圆陆鲨", "gabite": "尖牙陆鲨", "garchomp": "烈咬陆鲨", "munchlax": "小卡比兽",
        "riolu": "利欧路", "lucario": "路卡利欧", "hippopotas": "沙河马", "hippowdon": "河马兽", "skorupi": "钳尾蝎", "drapion": "龙王蝎",
        "croagunk": "不良蛙", "toxicroak": "毒骷蛙", "carnivine": "尖牙笼", "finneon": "荧光鱼", "lumineon": "霓虹鱼", "mantyke": "小球飞鱼",
        "snover": "雪笠怪", "abomasnow": "暴雪王", "weavile": "玛狃拉", "magnezone": "自爆磁怪", "lickilicky": "大舌舔", "rhyperior": "超甲狂犀",
        "tangrowth": "巨蔓藤", "electivire": "电击魔兽", "magmortar": "鸭嘴炎兽", "togekiss": "波克基斯", "yanmega": "远古巨蜓",
        "leafeon": "叶伊布", "glaceon": "冰伊布", "gliscor": "天蝎王", "mamoswine": "象牙猪", "porygon-z": "多边兽Ｚ", "gallade": "艾路雷朵",
        "probopass": "大朝北鼻", "dusknoir": "黑夜魔灵", "froslass": "雪妖女", "rotom": "洛托姆", "uxie": "由克希", "mesprit": "艾姆利多",
        "azelf": "亚克诺姆", "dialga": "帝牙卢卡", "palkia": "帕路奇亚", "heatran": "席多蓝恩", "regigigas": "雷吉奇卡斯", "giratina": "骑拉帝纳",
        "cresselia": "克雷色利亚", "phione": "霏欧纳", "manaphy": "玛纳霏", "darkrai": "达克莱伊", "shaymin": "谢米", "arceus": "阿尔宙斯",
        "victini": "比克提尼", "snivy": "藤藤蛇", "servine": "青藤蛇", "serperior": "君主蛇", "tepig": "暖暖猪", "pignite": "炒炒猪",
        "emboar": "炎武王", "oshawott": "水水獭", "dewott": "双刃丸", "samurott": "大剑鬼", "patrat": "探探鼠", "watchog": "步哨鼠",
        "lillipup": "小约克", "herdier": "哈约克", "stoutland": "长毛狗", "purrloin": "扒手猫", "liepard": "酷豹", "pansage": "花椰猴",
        "simisage": "花椰猿", "pansear": "爆香猴", "simisear": "爆香猿", "panpour": "冷水猴", "simipour": "冷水猿", "munna": "食梦梦",
        "musharna": "梦梦蚀", "pidove": "豆豆鸽", "tranquill": "咕咕鸽", "unfezant": "高傲雉鸡", "blitzle": "斑斑马", "zebstrika": "雷电斑马",
        "roggenrola": "石丸子", "boldore": "地幔岩", "gigalith": "庞岩怪", "woobat": "滚滚蝙蝠", "swoobat": "心蝙蝠", "drilbur": "螺钉地鼠",
        "excadrill": "龙头地鼠", "audino": "差不多娃娃", "timburr": "搬运小匠", "gurdurr": "铁骨土人", "conkeldurr": "修建老匠", "tympole": "圆蝌蚪",
        "palpitoad": "蓝蟾蜍", "seismitoad": "蟾蜍王", "throh": "投摔鬼", "sawk": "打击鬼", "sewaddle": "虫宝包", "swadloon": "宝包茧",
        "leavanny": "保姆虫", "venipede": "百足蜈蚣", "whirlipede": "车轮球", "scolipede": "蜈蚣王", "cottonee": "木棉球", "whimsicott": "风妖精",
        "petilil": "百合根娃娃", "lilligant": "裙儿小姐", "basculin": "野蛮鲈鱼", "sandile": "黑眼鳄", "krokorok": "混混鳄", "krookodile": "流氓鳄",
        "darumaka": "火红不倒翁", "darmanitan": "达摩狒狒", "maractus": "沙铃仙人掌", "dwebble": "石居蟹", "crustle": "岩殿居蟹", "scraggy": "滑滑小子",
        "scrafty": "头巾混混", "sigilyph": "象征鸟", "yamask": "哭哭面具", "cofagrigus": "死神棺", "tirtouga": "原盖海龟", "carracosta": "肋骨海龟",
        "archen": "始祖小鸟", "archeops": "始祖大鸟", "trubbish": "破破袋", "garbodor": "灰尘山", "zorua": "索罗亚", "zoroark": "索罗亚克",
        "minccino": "泡沫栗鼠", "cinccino": "奇诺栗鼠", "gothita": "哥德宝宝", "gothorita": "哥德小童", "gothitelle": "哥德小姐",
        "solosis": "单卵细胞球", "duosion": "双卵细胞球", "reuniclus": "人造细胞卵", "ducklett": "鸭宝宝", "swanna": "舞天鹅", "vanillite": "迷你冰",
        "vanillish": "多多冰", "vanilluxe": "双倍多多冰", "deerling": "四季鹿", "sawsbuck": "萌芽鹿", "emolga": "电飞鼠", "karrablast": "盖盖虫",
        "escavalier": "骑士蜗牛", "foongus": "哎呀球菇", "amoonguss": "败露球菇", "frillish": "轻飘飘", "jellicent": "胖嘟嘟", "alomomola": "保姆曼波",
        "joltik": "电电虫", "galvantula": "电蜘蛛", "ferroseed": "种子铁球", "ferrothorn": "坚果哑铃", "klink": "齿轮儿", "klang": "齿轮组",
        "klinklang": "齿轮怪", "tynamo": "麻麻小鱼", "eelektrik": "麻麻鳗", "eelektross": "麻麻鳗鱼王", "elgyem": "小灰怪", "beheeyem": "大宇怪",
        "litwick": "烛光灵", "lampent": "灯火幽灵", "chandelure": "水晶灯火灵", "axew": "牙牙", "fraxure": "斧牙龙", "haxorus": "双斧战龙",
        "cubchoo": "喷嚏熊", "beartic": "冻原熊", "cryogonal": "几何雪花", "shelmet": "小嘴蜗", "accelgor": "敏捷虫", "stunfisk": "泥巴鱼",
        "mienfoo": "功夫鼬", "mienshao": "师父鼬", "druddigon": "赤面龙", "golett": "泥偶小人", "golurk": "泥偶巨人", "pawniard": "驹刀小兵",
        "bisharp": "劈斩司令", "bouffalant": "爆炸头水牛", "rufflet": "毛头小鹰", "braviary": "勇士雄鹰", "vullaby": "秃鹰丫头", "mandibuzz": "秃鹰娜",
        "heatmor": "熔蚁兽", "durant": "铁蚁", "deino": "单首龙", "zweilous": "双首暴龙", "hydreigon": "三首恶龙", "larvesta": "燃烧虫",
        "volcarona": "火神蛾", "cobalion": "勾帕路翁", "terrakion": "代拉基翁", "virizion": "毕力吉翁", "tornadus": "龙卷云", "thundurus": "雷电云",
        "reshiram": "莱希拉姆", "zekrom": "捷克罗姆", "landorus": "土地云", "kyurem": "酋雷姆", "keldeo": "凯路迪欧", "meloetta": "美洛耶塔",
        "genesect": "盖诺赛克特", "chespin": "哈力栗", "quilladin": "胖胖哈力", "chesnaught": "布里卡隆", "fennekin": "火狐狸", "braixen": "长尾火狐",
        "delphox": "妖火红狐", "froakie": "呱呱泡蛙", "frogadier": "呱头蛙", "greninja": "甲贺忍蛙", "bunnelby": "掘掘兔", "diggersby": "掘地兔",
        "fletchling": "小箭雀", "fletchinder": "火箭雀", "talonflame": "烈箭鹰", "scatterbug": "粉蝶虫", "spewpa": "粉蝶蛹",
        "vivillon": "彩粉蝶", "litleo": "小狮狮", "pyroar": "火炎狮", "flabébé": "花蓓蓓", "floette": "花叶蒂", "florges": "花洁夫人",
        "skiddo": "坐骑小羊", "gogoat": "坐骑山羊", "pancham": "顽皮熊猫", "pangoro": "霸道熊猫", "furfrou": "多丽米亚", "espurr": "妙喵",
        "meowstic": "超能妙喵", "honedge": "独剑鞘", "doublade": "双剑鞘", "aegislash": "坚盾剑怪", "spritzee": "粉香香", "aromatisse": "芳香精",
        "swirlix": "绵绵泡芙", "slurpuff": "胖甜妮", "inkay": "好啦鱿", "malamar": "乌贼王", "binacle": "龟脚脚", "barbaracle": "龟足巨铠",
        "skrelp": "垃垃藻", "dragalge": "毒藻龙", "clauncher": "铁臂枪虾", "clawitzer": "钢炮臂虾", "helioptile": "伞电蜥", "heliolisk": "光电伞蜥",
        "tyrunt": "宝宝暴龙", "tyrantrum": "怪颚龙", "amaura": "冰雪龙", "aurorus": "冰雪巨龙", "sylveon": "仙子伊布", "hawlucha": "摔角鹰人",
        "dedenne": "咚咚鼠", "carbink": "小碎钻", "goomy": "黏黏宝", "sliggoo": "黏美儿", "goodra": "黏美龙", "klefki": "钥圈儿",
        "phantump": "小木灵", "trevenant": "朽木妖", "pumpkaboo": "南瓜精", "gourgeist": "南瓜怪人", "bergmite": "冰宝", "avalugg": "冰岩怪",
        "noibat": "嗡蝠", "noivern": "音波龙", "xerneas": "哲尔尼亚斯", "yveltal": "伊裴尔塔尔", "zygarde": "基格尔德", "diancie": "蒂安希",
        "hoopa": "胡帕", "volcanion": "波尔凯尼恩", "rowlet": "木木枭", "dartrix": "投羽枭", "decidueye": "狙射树枭", "litten": "火斑喵",
        "torracat": "炎热喵", "incineroar": "炽焰咆哮虎", "popplio": "球球海狮", "brionne": "花漾海狮", "primarina": "西狮海壬", "pikipek": "小笃儿",
        "trumbeak": "喇叭啄鸟", "toucannon": "铳嘴大鸟", "yungoos": "猫鼬少", "gumshoos": "猫鼬探长", "grubbin": "强颚鸡母虫", "charjabug": "虫电宝",
        "vikavolt": "锹农炮虫", "crabrawler": "好胜蟹", "crabominable": "好胜毛蟹", "oricorio": "花舞鸟", "cutiefly": "萌虻",
        "ribombee": "蝶结萌虻", "rockruff": "岩狗狗", "lycanroc": "鬃岩狼人", "wishiwashi": "弱丁鱼", "mareanie": "好坏星", "toxapex": "超坏星",
        "mudbray": "泥驴仔", "mudsdale": "重泥挽马", "dewpider": "滴蛛", "araquanid": "滴蛛霸", "fomantis": "伪螳草", "lurantis": "兰螳花",
        "morelull": "睡睡菇", "shiinotic": "灯罩夜菇", "salandit": "夜盗火蜥", "salazzle": "焰后蜥", "stufful": "童偶熊", "bewear": "穿着熊",
        "bounsweet": "甜竹竹", "steenee": "甜舞妮", "tsareena": "甜冷美后", "comfey": "花疗环环", "oranguru": "智挥猩", "passimian": "投掷猴",
        "wimpod": "胆小虫", "golisopod": "具甲武者", "sandygast": "沙丘娃", "palossand": "噬沙堡爷", "pyukumuku": "拳海参", "type: null": "属性：空",
        "silvally": "银伴战兽", "minior": "小陨星", "komala": "树枕尾熊", "turtonator": "爆焰龟兽", "togedemaru": "托戈德玛尔", "mimikyu": "谜拟Ｑ",
        "bruxish": "磨牙彩皮鱼", "drampa": "老翁龙", "dhelmise": "破破舵轮", "jangmo-o": "心鳞宝", "hakamo-o": "鳞甲龙", "kommo-o": "杖尾鳞甲龙",
        "tapu koko": "卡璞・鸣鸣", "tapu lele": "卡璞・蝶蝶", "tapu bulu": "卡璞・哞哞", "tapu fini": "卡璞・鳍鳍", "cosmog": "科斯莫古",
        "cosmoem": "科斯莫姆", "solgaleo": "索尔迦雷欧", "lunala": "露奈雅拉", "nihilego": "虚吾伊德", "buzzwole": "爆肌蚊", "pheromosa": "费洛美螂",
        "xurkitree": "电束木", "celesteela": "铁火辉夜", "kartana": "纸御剑", "guzzlord": "恶食大王", "necrozma": "奈克洛兹玛", "magearna": "玛机雅娜",
        "marshadow": "玛夏多", "poipole": "毒贝比", "naganadel": "四颚针龙", "stakataka": "垒磊石", "blacephalon": "砰头小丑",
        "zeraora": "捷拉奥拉", "meltan": "美录坦", "melmetal": "美录梅塔", "grookey": "敲音猴", "thwackey": "啪咚猴", "rillaboom": "轰擂金刚猩",
        "scorbunny": "炎兔儿", "raboot": "腾蹴小将", "cinderace": "闪焰王牌", "sobble": "泪眼蜥", "drizzile": "变涩蜥", "inteleon": "千面避役",
        "skwovet": "贪心栗鼠", "greedent": "藏饱栗鼠", "rookidee": "稚山雀", "corvisquire": "蓝鸦", "corviknight": "钢铠鸦", "blipbug": "索侦虫",
        "dottler": "天罩虫", "orbeetle": "以欧路普", "nickit": "狡小狐", "thievul": "猾大狐", "gossifleur": "幼棉棉", "eldegoss": "白蓬蓬",
        "wooloo": "毛辫羊", "dubwool": "毛毛角羊", "chewtle": "咬咬龟", "drednaw": "暴噬龟", "yamper": "来电汪", "boltund": "逐电犬",
        "rolycoly": "小炭仔", "carkol": "大炭车", "coalossal": "巨炭山", "applin": "啃果虫", "flapple": "苹裹龙", "appletun": "丰蜜龙",
        "silicobra": "沙包蛇", "sandaconda": "沙螺蟒", "cramorant": "古月鸟", "arrokuda": "刺梭鱼", "barraskewda": "戽斗尖梭",
        "toxel": "毒电婴", "toxtricity": "颤弦蝾螈", "sizzlipede": "烧火蚣", "centiskorch": "焚焰蚣", "clobbopus": "拳拳蛸", "grapploct": "八爪武师",
        "sinistea": "来悲茶", "polteageist": "怖思壶", "hatenna": "迷布莉姆", "hattrem": "提布莉姆", "hatterene": "布莉姆温", "impidimp": "捣蛋小妖",
        "morgrem": "诈唬魔", "grimmsnarl": "长毛巨魔", "obstagoon": "堵拦熊", "perrserker": "喵头目", "cursola": "魔灵珊瑚", "sirfetch’d": "葱游兵",
        "mr. rime": "踏冰人偶", "runerigus": "死神板", "milcery": "小仙奶", "alcremie": "霜奶仙", "falinks": "列阵兵", "pincurchin": "啪嚓海胆",
        "snom": "雪吞虫", "frosmoth": "雪绒蛾", "stonjourner": "巨石丁", "eiscue": "冰砌鹅", "indeedee": "爱管侍", "morpeko": "莫鲁贝可",
        "cufant": "铜象", "copperajah": "大王铜象", "dracozolt": "雷鸟龙", "arctozolt": "雷鸟海兽", "dracovish": "鳃鱼龙", "arctovish": "鳃鱼海兽",
        "duraludon": "铝钢龙", "dreepy": "多龙梅西亚", "drakloak": "多龙奇", "dragapult": "多龙巴鲁托", "zacian": "苍响", "zamazenta": "藏玛然特",
        "eternatus": "无极汰那", "kubfu": "熊徒弟", "urshifu": "武道熊师", "zarude": "萨戮德", "regieleki": "雷吉艾勒奇", "regidrago": "雷吉铎拉戈",
        "glastrier": "雪暴马", "spectrier": "灵幽马", "calyrex": "蕾冠王", "wyrdeer": "诡角鹿", "kleavor": "劈斧螳螂", "ursaluna": "月月熊",
        "basculegion": "幽尾玄鱼", "sneasler": "大狃拉", "overqwil": "万针鱼", "enamorus": "眷恋云", "sprigatito": "新叶喵", "floragato": "蒂蕾喵",
        "meowscarada": "魔幻假面喵", "fuecoco": "呆火鳄", "crocalor": "炙烫鳄", "skeledirge": "骨纹巨声鳄", "quaxly": "润水鸭", "quaxwell": "涌跃鸭",
        "quaquaval": "狂欢浪舞鸭", "lechonk": "爱吃豚", "oinkologne": "飘香豚", "tarountula": "团珠蛛", "spidops": "操陷蛛", "nymble": "豆蟋蟀",
        "lokix": "烈腿蝗", "pawmi": "布拨", "pawmo": "布土拨", "pawmot": "巴布土拨", "tandemaus": "一对鼠", "maushold": "一家鼠",
        "fidough": "狗仔包", "dachsbun": "麻花犬", "smoliv": "迷你芙", "dolliv": "奥利纽", "arboliva": "奥利瓦", "squawkabilly": "怒鹦哥",
        "nacli": "盐石宝", "naclstack": "盐石垒", "garganacl": "盐石巨灵", "charcadet": "炭小侍", "armarouge": "红莲铠骑", "ceruledge": "苍炎刃鬼",
        "tadbulb": "光蚪仔", "bellibolt": "电肚蛙", "wattrel": "电海燕", "kilowattrel": "大电海燕", "maschiff": "偶叫獒", "mabosstiff": "獒教父",
        "shroodle": "滋汁鼹", "grafaiai": "涂标客", "bramblin": "纳噬草", "brambleghast": "怖纳噬草", "toedscool": "原野水母",
        "toedscruel": "陆地水母", "klawf": "毛崖蟹", "capsakid": "热辣娃", "scovillain": "狠辣椒", "rellor": "虫滚泥", "rabsca": "虫甲圣",
        "flittle": "飘飘雏", "espathra": "超能艳鸵", "tinkatink": "小锻匠", "tinkatuff": "巧锻匠", "tinkaton": "巨锻匠", "wiglett": "海地鼠",
        "wugtrio": "三海地鼠", "bombirdier": "下石鸟", "finizen": "波普海豚", "palafin": "海豚侠", "varoom": "噗隆隆", "revavroom": "普隆隆姆",
        "cyclizar": "摩托蜥", "orthworm": "拖拖蚓", "glimmet": "晶光芽", "glimmora": "晶光花", "greavard": "墓仔狗", "houndstone": "墓扬犬",
        "flamigo": "缠红鹤", "cetoddle": "走鲸", "cetitan": "浩大鲸", "veluza": "轻身鳕", "dondozo": "吃吼霸", "tatsugiri": "米立龙",
        "annihilape": "弃世猴", "clodsire": "土王", "farigiraf": "奇麒麟", "dudunsparce": "土龙节节", "kingambit": "仆斩将军",
        "great tusk": "雄伟牙", "scream tail": "吼叫尾", "brute bonnet": "猛恶菇", "flutter mane": "振翼发", "slither wing": "爬地翅",
        "sandy shocks": "沙铁皮", "iron treads": "铁辙迹", "iron bundle": "铁包袱", "iron hands": "铁臂膀", "iron jugulis": "铁脖颈",
        "iron moth": "铁毒蛾", "iron thorns": "铁荆棘", "frigibax": "凉脊龙", "arctibax": "冻脊龙", "baxcalibur": "戟脊龙", "gimmighoul": "索财灵",
        "gholdengo": "赛富豪", "wo-chien": "古简蜗", "chien-pao": "古剑豹", "ting-lu": "古鼎鹿", "chi-yu": "古玉鱼", "roaring moon": "轰鸣月",
        "iron valiant": "铁武者", "koraidon": "故勒顿", "miraidon": "密勒顿", "walking wake": "波荡水", "iron leaves": "铁斑叶",
        "dipplin": "裹蜜虫", "poltchageist": "斯魔茶", "sinistcha": "来悲粗茶", "okidogi": "够赞狗", "munkidori": "愿增猿", "fezandipiti": "吉雉鸡",
        "ogerpon": "厄诡椪", "archaludon": "铝钢桥龙", "hydrapple": "蜜集大蛇", "gouging fire": "破空焰", "raging bolt": "猛雷鼓",
        "iron boulder": "铁磐岩", "iron crown": "铁头壳", "terapagos": "太乐巴戈斯", "pecharunt": "桃歹郎", 
      };      
      // 从映射表获取中文名称
      const chineseName = pokemonNameMap[lowerCaseName];
      
      // 如果找到了中文名称则返回，否则返回英文名称的首字母大写形式
      if (chineseName) {
        return chineseName;
      } else {
        // 将英文名称首字母大写
        return name.charAt(0).toUpperCase() + name.slice(1);
      }
    };




    // 获取宝可梦能力的中文名称
    const getAbilityChineseName = (ability) => {
      // 这里只是一个简单的示例，实际上可能需要更多的映射
      const abilityMap = {
        "stench": "恶臭",
        "drizzle": "降雨",
        "speed-boost": "加速",
        "battle-armor": "战斗盔甲",
        "sturdy": "结实",
        "damp": "湿气",
        "limber": "柔软",
        "sand-veil": "沙隐",
        "static": "静电",
        "volt-absorb": "蓄电",
        "water-absorb": "储水",
        "oblivious": "迟钝",
        "cloud-nine": "无关天气",
        "compound-eyes": "复眼",
        "insomnia": "不眠",
        "color-change": "变色",
        "immunity": "免疫",
        "flash-fire": "引火",
        "shield-dust": "鳞粉",
        "own-tempo": "我行我素",
        "suction-cups": "吸盘",
        "intimidate": "威吓",
        "shadow-tag": "踩影",
        "rough-skin": "粗糙皮肤",
        "wonder-guard": "神奇守护",
        "levitate": "飘浮",
        "effect-spore": "孢子",
        "synchronize": "同步",
        "clear-body": "恒净之躯",
        "natural-cure": "自然回复",
        "lightning-rod": "避雷针",
        "serene-grace": "天恩",
        "swift-swim": "悠游自如",
        "chlorophyll": "叶绿素",
        "illuminate": "发光",
        "trace": "复制",
        "huge-power": "大力士",
        "poison-point": "毒刺",
        "inner-focus": "精神力",
        "magma-armor": "熔岩铠甲",
        "water-veil": "水幕",
        "magnet-pull": "磁力",
        "soundproof": "隔音",
        "rain-dish": "雨盘",
        "sand-stream": "扬沙",
        "pressure": "压迫感",
        "thick-fat": "厚脂肪",
        "early-bird": "早起",
        "flame-body": "火焰之躯",
        "run-away": "逃跑",
        "keen-eye": "锐利目光",
        "hyper-cutter": "怪力钳",
        "pickup": "捡拾",
        "truant": "懒惰",
        "hustle": "活力",
        "cute-charm": "迷人之躯",
        "plus": "正电",
        "minus": "负电",
        "forecast": "阴晴不定",
        "sticky-hold": "黏着",
        "shed-skin": "蜕皮",
        "guts": "毅力",
        "marvel-scale": "神奇鳞片",
        "liquid-ooze": "污泥浆",
        "overgrow": "茂盛",
        "blaze": "猛火",
        "torrent": "激流",
        "swarm": "虫之预感",
        "rock-head": "坚硬脑袋",
        "drought": "日照",
        "arena-trap": "沙穴",
        "vital-spirit": "干劲",
        "white-smoke": "白色烟雾",
        "pure-power": "瑜伽之力",
        "shell-armor": "硬壳盔甲",
        "cacophony": "杂音",
        "air-lock": "气闸",
        "tangled-feet": "蹒跚",
        "motor-drive": "电气引擎",
        "rivalry": "斗争心",
        "steadfast": "不屈之心",
        "snow-cloak": "雪隐",
        "gluttony": "贪吃鬼",
        "anger-point": "愤怒穴位",
        "unburden": "轻装",
        "heatproof": "耐热",
        "simple": "单纯",
        "dry-skin": "干燥皮肤",
        "download": "下载",
        "iron-fist": "铁拳",
        "poison-heal": "毒疗",
        "adaptability": "适应力",
        "skill-link": "连续攻击",
        "hydration": "湿润之躯",
        "solar-power": "太阳之力",
        "quick-feet": "飞毛腿",
        "normalize": "一般皮肤",
        "sniper": "狙击手",
        "magic-guard": "魔法防守",
        "no-guard": "无防守",
        "stall": "慢出",
        "technician": "技术高手",
        "leaf-guard": "叶子防守",
        "klutz": "笨拙",
        "mold-breaker": "破格",
        "super-luck": "超幸运",
        "aftermath": "引爆",
        "anticipation": "危险预知",
        "forewarn": "预知梦",
        "unaware": "纯朴",
        "tinted-lens": "有色眼镜",
        "filter": "过滤",
        "slow-start": "慢启动",
        "scrappy": "胆量",
        "storm-drain": "引水",
        "ice-body": "冰冻之躯",
        "solid-rock": "坚硬岩石",
        "snow-warning": "降雪",
        "honey-gather": "采蜜",
        "frisk": "察觉",
        "reckless": "舍身",
        "multitype": "多属性",
        "flower-gift": "花之礼",
        "bad-dreams": "梦魇",
        "pickpocket": "顺手牵羊",
        "sheer-force": "强行",
        "contrary": "唱反调",
        "unnerve": "紧张感",
        "defiant": "不服输",
        "defeatist": "软弱",
        "cursed-body": "咒术之躯",
        "healer": "治愈之心",
        "friend-guard": "友情防守",
        "weak-armor": "碎裂铠甲",
        "heavy-metal": "重金属",
        "light-metal": "轻金属",
        "multiscale": "多重鳞片",
        "toxic-boost": "中毒激升",
        "flare-boost": "受热激升",
        "harvest": "收获",
        "telepathy": "心灵感应",
        "moody": "心情不定",
        "overcoat": "防尘",
        "poison-touch": "毒手",
        "regenerator": "再生力",
        "big-pecks": "健壮胸肌",
        "sand-rush": "拨沙",
        "wonder-skin": "奇迹皮肤",
        "analytic": "分析",
        "illusion": "幻觉",
        "imposter": "变身者",
        "infiltrator": "穿透",
        "mummy": "木乃伊",
        "moxie": "自信过度",
        "justified": "正义之心",
        "rattled": "胆怯",
        "magic-bounce": "魔法镜",
        "sap-sipper": "食草",
        "prankster": "恶作剧之心",
        "sand-force": "沙之力",
        "iron-barbs": "铁刺",
        "zen-mode": "达摩模式",
        "victory-star": "胜利之星",
        "turboblaze": "涡轮火焰",
        "teravolt": "兆级电压",
        "aroma-veil": "芳香幕",
        "flower-veil": "花幕",
        "cheek-pouch": "颊囊",
        "protean": "变幻自如",
        "fur-coat": "毛皮大衣",
        "magician": "魔术师",
        "bulletproof": "防弹",
        "competitive": "好胜",
        "strong-jaw": "强壮之颚",
        "refrigerate": "冰冻皮肤",
        "sweet-veil": "甜幕",
        "stance-change": "战斗切换",
        "gale-wings": "疾风之翼",
        "mega-launcher": "超级发射器",
        "grass-pelt": "草之毛皮",
        "symbiosis": "共生",
        "tough-claws": "硬爪",
        "pixilate": "妖精皮肤",
        "gooey": "黏滑",
        "aerilate": "飞行皮肤",
        "parental-bond": "亲子爱",
        "dark-aura": "暗黑气场",
        "fairy-aura": "妖精气场",
        "aura-break": "气场破坏",
        "primordial-sea": "始源之海",
        "desolate-land": "终结之地",
        "delta-stream": "德尔塔气流",
        "stamina": "持久力",
        "wimp-out": "跃跃欲逃",
        "emergency-exit": "危险回避",
        "water-compaction": "遇水凝固",
        "merciless": "不仁不义",
        "shields-down": "界限盾壳",
        "stakeout": "蹲守",
        "water-bubble": "水泡",
        "steelworker": "钢能力者",
        "berserk": "怒火冲天",
        "slush-rush": "拨雪",
        "long-reach": "远隔",
        "liquid-voice": "湿润之声",
        "triage": "先行治疗",
        "galvanize": "电气皮肤",
        "surge-surfer": "冲浪之尾",
        "schooling": "鱼群",
        "disguise": "画皮",
        "battle-bond": "牵绊变身",
        "power-construct": "群聚变形",
        "corrosion": "腐蚀",
        "comatose": "绝对睡眠",
        "queenly-majesty": "女王的威严",
        "innards-out": "飞出的内在物",
        "dancer": "舞者",
        "battery": "蓄电池",
        "fluffy": "毛茸茸",
        "dazzling": "鲜艳之躯",
        "soul-heart": "魂心",
        "tangling-hair": "卷发",
        "receiver": "接球手",
        "power-of-alchemy": "化学之力",
        "beast-boost": "异兽提升",
        "rks-system": "ＡＲ系统",
        "electric-surge": "电气制造者",
        "psychic-surge": "精神制造者",
        "misty-surge": "薄雾制造者",
        "grassy-surge": "青草制造者",
        "full-metal-body": "金属防护",
        "shadow-shield": "幻影防守",
        "prism-armor": "棱镜装甲",
        "neuroforce": "脑核之力",
        "intrepid-sword": "不挠之剑",
        "dauntless-shield": "不屈之盾",
        "libero": "自由者",
        "ball-fetch": "捡球",
        "cotton-down": "棉絮",
        "propeller-tail": "螺旋尾鳍",
        "mirror-armor": "镜甲",
        "gulp-missile": "一口导弹",
        "stalwart": "坚毅",
        "steam-engine": "蒸汽机",
        "punk-rock": "庞克摇滚",
        "sand-spit": "吐沙",
        "ice-scales": "冰鳞粉",
        "ripen": "熟成",
        "ice-face": "结冻头",
        "power-spot": "能量点",
        "mimicry": "拟态",
        "screen-cleaner": "除障",
        "steely-spirit": "钢之意志",
        "perish-body": "灭亡之躯",
        "wandering-spirit": "游魂",
        "gorilla-tactics": "一猩一意",
        "neutralizing-gas": "化学变化气体",
        "pastel-veil": "粉彩护幕",
        "hunger-switch": "饱了又饿",
        "quick-draw": "速击",
        "unseen-fist": "无形拳",
        "curious-medicine": "怪药",
        "transistor": "电晶体",
        "dragon’s-maw": "龙颚",
        "chilling-neigh": "苍白嘶鸣",
        "grim-neigh": "漆黑嘶鸣",
        "as-one": "人马一体",
        "lingering-aroma": "甩不掉的气味",
        "seed-sower": "掉出种子",
        "thermal-exchange": "热交换",
        "anger-shell": "愤怒甲壳",
        "purifying-salt": "洁净之盐",
        "well-baked-body": "焦香之躯",
        "wind-rider": "乘风",
        "guard-dog": "看门犬",
        "rocky-payload": "搬岩",
        "wind-power": "风力发电",
        "zero-to-hero": "全能变身",
        "commander": "发号施令",
        "electromorphosis": "电力转换",
        "protosynthesis": "古代活性",
        "quark-drive": "夸克充能",
        "good-as-gold": "黄金之躯",
        "vessel-of-ruin": "灾祸之鼎",
        "sword-of-ruin": "灾祸之剑",
        "tablets-of-ruin": "灾祸之简",
        "beads-of-ruin": "灾祸之玉",
        "orichalcum-pulse": "绯红脉动",
        "hadron-engine": "强子引擎",
        "opportunist": "跟风",
        "cud-chew": "反刍",
        "sharpness": "锋锐",
        "supreme-overlord": "大将",
        "costar": "同台共演",
        "toxic-debris": "毒满地",
        "armor-tail": "尾甲",
        "earth-eater": "食土",
        "mycelium-might": "菌丝之力",
        "hospitality": "款待",
        "mind’s-eye": "心眼",
        "embody-aspect": "面影辉映",
        "toxic-chain": "毒锁链",
        "supersweet-syrup": "甘露之蜜",
        "tera-shift": "太晶变形",
        "tera-shell": "太晶甲壳",
        "teraform-zero": "归零化境",
        "poison-puppeteer": "毒傀儡"
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
          <h3>#${this.pokemon.id} ${getPokemonChineseName(this.pokemon.name)}</h3>
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