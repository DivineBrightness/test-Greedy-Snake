// 废土余生：场景数据

const wastelandScenes = {
  'start': {
    title: '废土求生',
    description: '你在一场剧烈的头痛中醒来，发现自己身处一个废弃的矿洞中。你穿着一件老旧的"净化服"，胸口编号"R-250"，除此之外你不记得关于自己的任何事情。矿洞外，是一片荒芜的废土世界，辐射与危险无处不在，而你必须在这里求生。',
    skipResourceConsumption: true, // 不消耗资源，因为这是开始场景
    options: [
      { text: '离开矿洞，探索周围', nextScene: 'rustRiver' },
      { text: '检查你的净化服', nextScene: 'checkSuit' }
    ]
  },
  
  'checkSuit': {
    title: '检查净化服',
    description: '你仔细检查身上穿着的净化服。这套衣物看起来至少有几十年的历史了，但材质依然坚韧，内部系统似乎仍在运作。胸前的标识显示"R-250"，一个小型控制面板显示基本生命体征正常。这套装备可能是你能在废土上生存的关键。',
    skipResourceConsumption: true, // 不消耗资源
    options: [
      { text: '离开矿洞，开始你的旅程', nextScene: 'rustRiver' }
    ]
  },

  'rustRiver': {
    title: '锈河',
    description: '干涸的河床上覆盖着一层红色锈蚀泥浆，散发着刺鼻的化学气味。夜晚，河面会泛起不自然的蓝光，那是辐射反应的迹象。河岸两侧生长着一种奇怪的藤蔓，它们会缓慢移动，试图缠绕靠近的物体。',
    isArea: true,
    options: [
      { text: '收集变异水藻', nextScene: 'collectAlgae', item: '变异水藻燃料' },
      { text: '采集藤蔓纤维', nextScene: 'harvestVines', item: '绳索' },
      { text: '搜索沉没的运输车', nextScene: 'searchTruck', item: '防辐射药' },
      { text: '返回废弃公路', nextScene: 'abandonedHighway' }
    ]
  },
  
  'abandonedMine': {
    title: '废弃矿井',
    description: '矿井的入口已经部分塌陷，生锈的轨道和矿车散落在周围。空气中弥漫着灰尘和潮湿的气味，洞穴深处不时传来奇怪的回声。这里是废旧矿洞区域最危险的部分，但据说也藏有未被发现的资源。',
    attributeChanges: {
      radiation: 1
    },
    options: [
      { text: '深入探索', nextScene: 'deepMine', item: '矿灯' },
      { text: '搜查废弃矿车', nextScene: 'searchCart', item: '手动发电机' },
      { text: '检查控制室', nextScene: 'controlRoom', item: '旧世界芯片' },
      { text: '撤离矿井', nextScene: 'wastemine' }
    ]
  },
  
  'cAreaLab': {
    title: 'C区实验室',
    description: '你进入了一个尘封已久的地下实验室。荧光灯闪烁着微弱的光芒，墙上挂着褪色的安全规程和研究图表。几台老旧的电脑终端和实验设备排列在房间中央，这里似乎是进行过某种重要研究的地方。',
    attributeChanges: {
      radiation: 2
    },
    options: [
      { text: '访问主控终端', nextScene: 'accessTerminal' },
      { text: '搜索储物柜', nextScene: 'searchLockers', item: '净化服升级模块' },
      { text: '检查冷冻舱', nextScene: 'checkCryoPod', item: '记忆触媒' },
      { text: '离开实验室', nextScene: 'cArea' }
    ]
  },
  
  'wheelchairTown': {
    title: '轮椅镇',
    description: '这座小镇建在一处低矮的山丘上，由混凝土建筑和简易棚屋组成，周围有一圈生锈的铁丝网。几个身体残疾的哨兵警惕地注视着每一位进入的陌生人，他们腿部有伤但手臂格外强壮。一面破旧的旗帜在镇中心随风飘扬，上面画着一个轮椅的图案。',
    isArea: true,
    options: [
      { text: '拜访医疗站', nextScene: 'visitMedic', item: '基础医疗包' },
      { text: '与守卫交谈', nextScene: 'talkToGuard', item: '滤毒面罩' },
      { text: '查看交易市场', nextScene: 'wheelchairMarket', item: '净水' },
      { text: '离开轮椅镇', nextScene: 'abandonedHighway' }
    ]
  },
  
  'oldMarket': {
    title: '老市',
    description: '你来到了一个建在旧城废墟中的露天市场。各种临时搭建的摊位排列在狭窄的街道两侧，空气中弥漫着烹饪、香料和人群的混合气味。摊贩们大声吆喝着，试图吸引顾客。几盏昏暗的霓虹灯给这个地方增添了一丝奇怪的活力，与外面荒芜的废土形成鲜明对比。',
    isArea: true,
    options: [
      { text: '寻找医药摊位', nextScene: 'medicineBooth', item: '植物药剂' },
      { text: '拜访技术商人', nextScene: 'techMerchant', item: '老式收音机' },
      { text: '探访情报贩子', nextScene: 'infoDealer', item: '旧世界地图碎片' },
      { text: '离开市场', nextScene: 'abandonedHighway' }
    ]
  },
  
  'supremeGovtRuins': {
    title: '最高政府遗迹',
    description: '一座雄伟但已经破败的建筑群耸立在深邃的裂谷中，周围弥漫着浓厚的毒雾。这里曾是旧世界政府的要地，现在只剩下破碎的墙壁和倒塌的柱子。谷底散落着各种金属残骸，偶尔能看到一棵奇怪的发光植物——"活化树"，它的根系深入地下，叶片呈现出不自然的蓝绿色。',
    attributeChanges: {
      health: -1
    },
    options: [
      { text: '搜索档案室', nextScene: 'archiveRoom', item: '旧世界芯片' },
      { text: '收集活化树汁', nextScene: 'harvestTreeSap', item: '活化树汁' },
      { text: '探索地下设施', nextScene: 'undergroundFacility', item: '氧气瓶' },
      { text: '撤离裂谷', nextScene: 'abandonedHighway' }
    ]
  },
  
  'hangingFactory': {
    title: '倒悬工厂',
    description: '这座巨型工厂建在断崖边缘，部分结构已经倾斜，看起来随时可能坠入深渊。工厂内部是一片混乱，错位的传送带和扭曲的机械臂静止在半空中，像被定格的噩梦。锈迹和灰尘覆盖了大部分设备，但有些机器似乎仍在运转，发出不祥的嗡嗡声。',
    isArea: true,
    options: [
      { text: '探索维修区', nextScene: 'maintenanceArea', item: '螺丝锤' },
      { text: '搜查仓储区', nextScene: 'storageArea', item: '铁板盾' },
      { text: '检查控制室', nextScene: 'factoryControl', item: '滤芯' },
      { text: '离开工厂', nextScene: 'abandonedHighway' }
    ]
  },
  
  'grainStation': {
    title: '五号粮站',
    description: '五号粮站是一组混凝土堡垒般的建筑群，曾是旧世界的军用储备设施。高墙和铁丝网已经部分倒塌，但仍能看出其曾经的防御性质。地面上散布着弹壳和装备残骸，暗示这里曾发生过激烈的冲突。入口附近有几个涂着火焰标志的守卫，他们身上有意为之的烧伤疤痕——火众教徒的标志。',
    options: [
      { text: '潜入地下仓库', nextScene: 'undergroundStorage', item: '罐头食品' },
      { text: '检查军用设施', nextScene: 'militaryFacility', item: '氧气瓶' },
      { text: '与火众交涉', nextScene: 'negotiateWithFire' },
      { text: '返回公路', nextScene: 'abandonedHighway' }
    ]
  },
  
  'skyCityGate': {
    title: '天庭浮空城入口',
    description: '你站在一个被科技和神秘感包围的区域。头顶上，天庭浮空城漂浮在云层中，偶尔透出微光。地面上建有一座复杂的升降平台，由旧世界的尖端技术驱动，四周有自动防御系统和扫描装置。这里的空气出奇地清新，与废土的其他地方截然不同。',
    attributeChanges: {
      radiation: -1,
      sanity: 10
    },
    options: [
      { text: '尝试激活升降平台', nextScene: 'activatePlatform' },
      { text: '搜索控制终端', nextScene: 'accessSkyTerminal' },
      { text: '观察防御系统', nextScene: 'studyDefenses', item: '旧世界芯片' },
      { text: '离开此地', nextScene: 'abandonedHighway' }
    ]
  },
  
  'fireRiver': {
    title: '火河沟',
    description: '这条河流已经完全干涸，但河床上覆盖着一层红色物质，远看如同流动的火焰。接近后你发现那是一种特殊的氧化物，与废土中独有的矿物质反应产生的。河岸两侧生长着一些奇怪的植物，它们的叶片呈现不自然的红色，根部深入有毒的土壤。',
    attributeChanges: {
      radiation: 1
    },
    options: [
      { text: '采集异变植物', nextScene: 'harvestMutatedPlants', item: '草药团' },
      { text: '寻找矿物样本', nextScene: 'searchForMinerals' },
      { text: '探索河床', nextScene: 'exploreRiverbed', item: '防辐射药' },
      { text: '返回公路', nextScene: 'abandonedHighway' }
    ]
  }
};


 // 将场景数据暴露为全局变量
 window.wastelandScenes = wastelandScenes; 

 // 在文件末尾添加物品描述数据库

// 物品描述数据库 - 废土风格
const itemDescriptions = {
  // 基本物品
  '净水': '装在回收塑料瓶中的过滤水，珍贵且稀少。液体清澈无色，没有异味，每一滴都是废土中的财富。饮用后可立即缓解口渴状态，防止脱水。',
  '罐头食品': '金属罐中的预制食物，大多产于灾变前。虽然标签褪色，内容物也不那么美味，但仍能提供必要的热量和营养。某些收藏家会专门收集包装完好的特殊品种。',
  '防辐射药': '蓝色的液态药剂，味道极苦。服用后能临时减轻体内辐射积累，但过量使用会造成呕吐、头晕和视力模糊等副作用。药效持续时间有限，难以彻底清除高剂量辐射。',
  '基础医疗包': '帆布包装的简易医疗套件，内含绷带、消毒药水、止血粉和几片止痛药。能处理擦伤、小型割伤和轻微感染，但对严重伤害作用有限。',
  '绳索': '用藤蔓纤维或回收布料编织而成的粗糙绳索。虽然不如旧世界的尼龙绳坚固，但足以支撑体重，用于攀爬或固定物体。经常潮湿会导致其强度下降。',
  
  // 必要物品
  '滤毒面罩': '由硅胶、过滤材料和金属框架组成的面部装备。能过滤空气中的有害粒子和毒气，在高污染区域是生存必需品。滤芯需定期更换，否则效果会大幅降低。',
  '氧气瓶': '金属制高压容器，内含压缩氧气。体积小但相对沉重，配有简易呼吸面罩。用于在缺氧环境中提供短时间的呼吸支持，如地下设施或高辐射区域。',
  '老式收音机': '由塑料和金属构成的手持设备，表面有多个旋钮和一个小型天线。能接收"回响信号"——废土中神秘的无线电波，偶尔播放灾变前的声音片段。使用时需手动发电或电池供电。',
  '矿灯': '可佩戴在头部的小型照明装置，由回收零件组装而成。光线不算强但足以照明黑暗区域，为探索地下空间提供必要视野。使用时会消耗能源，同时可能吸引危险生物。',
  '手动发电机': '由废弃自行车零件和铜线改造的简易发电设备。转动手柄可产生少量电流，为小型电子设备充电。使用时会发出明显噪音，在安全地带使用较为明智。',
  '旧世界地图碎片': '破损的纸质地图或数据板，记录着灾变前的地标和路线。虽然不完整且多处标记已与现实不符，但仍能提供宝贵的导航参考，特别是寻找旧设施时。',
  '滤芯': '圆柱形过滤装置，内部填充特殊材料，能吸附空气中的污染物。用于更换滤毒面罩的核心组件，使用一段时间后会变色，提示需要更换。在高污染区域使用寿命更短。',
  '铁板盾': '由汽车门板或金属屏障改造的防御装备。边缘粗糙但坚固耐用，能有效抵挡近战攻击、小型变异动物的袭击，以及部分弹射物。体积较大，使用时会影响机动性。',
  '螺丝锤': '一端是锤头，另一端是螺丝刀的多功能工具。握柄缠绕布条增加舒适度。既可用于维修或拆解机械，又能在紧急情况下作为武器使用。金属部分有轻微锈蚀但不影响使用。',
  '旧世界芯片': '指甲盖大小的电路板，表面有复杂的金色图案。来自灾变前的高科技设备，用于修复特定电子设备或解锁旧世界系统。极其稀有，常被视为废土中的硬通货。',
  '净化服升级模块': '设计精良的小型装置，可安装在特殊的"净化服"接口上。根据型号不同，可提供额外的辐射防护、环境适应或身体强化功能。非通用设计，专为特定型号服装制造。',
  '记忆触媒': '装在密封玻璃瓶中的半透明蓝色物质。据信与旧世界的脑科学技术有关，接触后可能引发强烈的记忆闪回或幻觉。使用方法不明，可能存在心理依赖风险。',
  '活化树汁': '从稀有的"活化树"中提取的绿色粘稠液体。具有惊人的净化能力，滴入污水中能迅速分解有害物质。同时有轻微的伤口愈合促进作用。味道苦涩但不难以接受。',
  '变异水藻燃料': '由锈河中的特殊藻类处理提炼而成的褐色胶状物质。干燥后能持续稳定燃烧，几乎不产生烟雾。同时可为手动发电机提供更持久的能源，但受潮后效果大减。',
  '植物药剂': '由废土中特殊植物提炼的药液，装在回收的玻璃瓶中。根据配方不同，可治疗特定疾病如辐射病、感染或寄生虫。每种药剂有独特的颜色和气味，使用前需正确识别。'
};
 
 // 将物品描述数据库暴露为全局变量
 window.itemDescriptions = itemDescriptions;