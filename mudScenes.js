// 废土余生：场景数据

const wastelandScenes = {
  'start': {
      title: '逃离辐射区',
      description: '大灾变第二十年。你在一次搜寻物资的过程中遭遇了酸雨，避难所已经伸手不见五指，你的辐射剂量计发出刺耳的警报。随着食物和净水所剩无几，你不得不踏入这片荒芜的废土，寻找新的生存希望。在你面前，一条布满裂缝的公路通向远方，浓密的辐射尘笼罩着灰暗的天空。\n\n记忆并不完整，但你隐约记得自己的编号：R7-41，身上穿着一件特殊的"净化服"。',
      skipResourceConsumption: true,
      options: [
          { text: '前往废弃公路', nextScene: 'abandonedHighway' },
          { text: '搜寻附近的建筑', nextScene: 'nearbyRuins' }
      ]
  },
  
  'nearbyRuins': {
      title: '废弃加油站',
      description: '你来到一个被风沙侵蚀的加油站，加油机已经锈迹斑斑，站内商店的玻璃碎了一地。这里似乎被其他幸存者光顾过，但可能还有一些遗漏的物资。突然，你听到后面货架传来窸窸窣窣的声音。',
      isArea: true,
      options: [
          { text: '调查声音来源', nextScene: 'stationRats' },
          { text: '快速搜刮物资', nextScene: 'stationLoot' },
          { text: '离开加油站', nextScene: 'abandonedHighway' }
      ]
  },
  
  'stationRats': {
      title: '变异鼠群',
      description: '你小心地靠近货架，突然，三只体型异常巨大的老鼠从阴影中窜出！它们的眼睛在黑暗中发出不自然的绿光，尖锐的牙齿闪着寒光。你被逼到角落，不得不应对这场突如其来的危险。',
      attributeChanges: {
          health: -1,
          radiation: 1
      },
      options: [
          { text: '用货架上的灭火器喷射鼠群', nextScene: 'ratsDefeated' },
          { text: '尝试从紧急出口逃离', nextScene: 'narrowEscape' }
      ]
  },
  
  'ratsDefeated': {
      title: '击退鼠群',
      description: '你抓起生锈的灭火器，对准鼠群猛烈喷射。白色的粉末在空中弥散，鼠群被化学物质激怒和灼伤，发出刺耳的尖叫声后逃走了。战斗虽然胜利但你也不好受，其中一只老鼠在混乱中咬伤了你的小腿。检查伤口，你发现皮肤周围已经开始发红发热。',
      item: '生锈灭火器',
      options: [
          { text: '用急救包处理伤口', nextScene: 'treatWound', requiredItem: '急救包' },
          { text: '忍痛继续搜索加油站', nextScene: 'stationLoot' }
      ]
  },
  
  'treatWound': {
      title: '处理伤口',
      description: '你从背包中取出急救包，仔细清洗和包扎被老鼠咬伤的伤口。虽然医疗用品已经过期，但总比不处理好。消毒酒精接触伤口的刺痛让你倒吸一口冷气，但至少暂时控制了感染风险。',
      attributeChanges: {
          health: 1
      },
      removeItem: '急救包',
      options: [
          { text: '继续搜索加油站', nextScene: 'stationLoot' }
      ]
  },
  
  'narrowEscape': {
      title: '狭路逃生',
      description: '你冲向紧急出口，但门已经生锈卡住。鼠群逼近你身后，你用尽全力撞开了门，跌跌撞撞地逃出了加油站。虽然逃脱了鼠群，但你的背包在慌乱中遗落了一部分物资，而且手臂被门框划伤了。',
      attributeChanges: {
          health: -1,
          sanity: -1
      },
      options: [
          { text: '返回公路', nextScene: 'abandonedHighway' }
      ]
  },
  
  'stationLoot': {
      title: '物资收集',
      description: '在加油站的杂物堆中，你找到一个尚未被完全洗劫的储物柜。翻找一番后，你获得了几瓶浑浊但密封完好的水。柜台下还有一把锈迹斑斑的螺丝刀，可能用作简单的工具或武器。',
      item: '净水罐',
      options: [
          { text: '继续搜寻', nextScene: 'hiddenCompartment' },
          { text: '离开加油站', nextScene: 'abandonedHighway' }
      ]
  },
  
  'hiddenCompartment': {
      title: '隐秘格间',
      description: '你注意到收银台后面有一个半掩着的储藏室门。小心翼翼地推开门，你发现这是一个员工休息室。在角落的小冰箱里，令人惊讶地发现了一个完好的罐头食品。虽然标签已经褪色，但密封良好，应该还能食用。',
      item: '罐头食物',
      options: [
          { text: '离开加油站', nextScene: 'abandonedHighway' }
      ]
  },
  
  'abandonedHighway': {
      title: '废弃公路',
      description: '你站在一条荒废已久的高速公路上，两旁尽是被砂砾覆盖的残破车辆，它们如同史前生物的骸骨般嵌在沙土中。远处，一片模糊的建筑群影影绰绰，那应该就是铁丘营地。另一边，一条小路通往山谷中隐约可见的河流，虽然现在可能更像是一条有毒的沟渠。道路前方还有一个巨大的标牌，上面写着"五号粮站 - 3公里"。',
      isArea: true,
      options: [
          { text: '前往铁丘营地', nextScene: 'ironHill' },
          { text: '去查看火河沟', nextScene: 'fireRiver' },
          { text: '前往五号粮站', nextScene: 'grainStation' }
      ]
  },
  
  'ironHill': {
      title: '铁丘营地',
      description: '铁丘营地建在一座废弃矿山上，由各种金属板材和废旧集装箱搭建而成，形成一个小型聚居地。营地中央是一个简陋的市集，几个幸存者在那里交换物资。你注意到一群孩子围绕着一位老人，他似乎正在讲述着什么故事。另一边，几个人正在修补营地的防御设施。这里看起来比外面要安全一些，至少暂时如此。',
      isArea: true,
      options: [
          { text: '接近讲故事的老人', nextScene: 'meetLiuYe' },
          { text: '在市集寻找交易机会', nextScene: 'ironHillMarket' },
          { text: '帮助修补防御设施', nextScene: 'repairDefense' },
          { text: '离开铁丘', nextScene: 'abandonedHighway' }
      ]
  },
  
  'meetLiuYe': {
      title: '遇见刘爷',
      description: '你走近那位被孩子们环绕的老人。他有着沧桑的面容，但眼神却异常明亮。他正在讲述灾变前的世界，描述着高楼、汽车和互联网。孩子们听得入迷。当他注意到你时，停下了讲述。\n\n"新面孔啊，"他友善地说，"我是刘爷，前教师。现在只教些没人在意的历史了。"\n\n他认真打量了你一会，目光停留在你的净化服上，"那件服装...很特别。"',
      options: [
          { text: '询问关于净化服的信息', nextScene: 'askAboutSuit' },
          { text: '询问关于营地的情况', nextScene: 'askAboutCamp' },
          { text: '离开，不打扰他教学', nextScene: 'ironHill' }
      ]
  },
  
  'askAboutSuit': {
      title: '净化服的秘密',
      description: '刘爷皱着眉头仔细观察你的服装，"这不是普通的辐射服，材质太特殊了。那个编号，R7-41...让我想起战前的一些项目。"\n\n他压低了声音，"铁丘东边有个叫\'净场\'的地方，墙上就刻着类似的编号。没人敢靠近那里...但说不定，那里与你的身份有关。"\n\n他又看了看四周，"如果你想了解更多，找\'三狗子\'谈谈，他经常在营地外面徘徊，知道很多秘密路线。"',
      humanityChange: 1,
      options: [
          { text: '感谢刘爷的信息', nextScene: 'ironHill' }
      ]
  },
  
  'askAboutCamp': {
      title: '营地现状',
      description: '刘爷叹了口气，"铁丘是难得的和平地带，但处境越来越艰难。水源被污染，食物短缺，最近还有传言说\'秃鹰客\'在附近徘徊。"\n\n他指了指远处的几个人，"那几个在修补墙壁的，都是好人。如果你能帮忙，他们会记得这份情的。"\n\n他又低声说，"这里还算安全，但如果你打算在外面探索，小心\'火皮众\'...他们对陌生人不太友善。"',
      options: [
          { text: '问问\'秃鹰客\'是谁', nextScene: 'askAboutVultures' },
          { text: '询问\'火皮众\'的情况', nextScene: 'askAboutFireSkins' },
          { text: '回到营地中心', nextScene: 'ironHill' }
      ]
  },
  
  'askAboutVultures': {
      title: '秃鹰客的传闻',
      description: '"那些家伙..."刘爷的表情变得严肃，"他们是一群掘墓者，专门找寻旧世界的遗骸和科技。有人说他们从尸体上取下芯片和装置来交易，甚至不惜挖掘新鲜的墓地。"\n\n他停顿了一下，"虽然令人不快，但他们有时确实能找到有用的东西。如果你需要特殊物品，他们可能是唯一的来源...只是做好付出高昂代价的准备。"',
      options: [
          { text: '回到营地中心', nextScene: 'ironHill' }
      ]
  },
  
  'askAboutFireSkins': {
      title: '火皮众的危险',
      description: '"火皮众？"刘爷皱起眉头，"他们是一群疯狂的教徒，相信火焰能净化一切。用烙铁在身上留下烧伤标记，自称\'燃者\'。"\n\n他的声音变得更加低沉，"最糟的是，他们控制着区域内唯一一套完整的净水设备。许多人不得不以危险的任务换取干净水源。"\n\n他看着你的眼睛，"如果遇到他们，千万别提及旧世界的事物，他们视那些为\'污染\'，会变得...极度危险。"',
      options: [
          { text: '回到营地中心', nextScene: 'ironHill' }
      ]
  },
  
  'ironHillMarket': {
      title: '铁丘市集',
      description: '市集非常简陋，几个摊位用破旧的帐篷和木板搭建而成。人们在这里交换物资而非使用货币——在这个世界，实用物品才是真正的财富。\n\n一位满脸皱纹的女人向你招手，她的摊位上摆着一些草药和简易医疗用品。另一边，一个戴着护目镜的男人在修理各种破损的电子设备。还有一个黝黑的男孩，看起来不过十二三岁，却独自经营着一个小摊，出售一些奇怪的小物件。',
      options: [
          { text: '与草药女人交谈', nextScene: 'herbWoman' },
          { text: '接近修理工', nextScene: 'repairMan' },
          { text: '查看男孩的摊位', nextScene: 'strangeBoothBoy' },
          { text: '离开市集', nextScene: 'ironHill' }
      ]
  },
  
  'herbWoman': {
      title: '草药医者',
      description: '那位女人面容沧桑但眼神坚定。"我是老街的玛莎，"她自我介绍道，"我用草药帮助人们对抗辐射病和伤口感染。"\n\n她指了指摊位上的几束干燥植物，"这些是\'辐射草\'，磨成粉末后可以减轻轻度辐射中毒。我可以用一束换你的..."\n\n她打量着你，似乎在评估你有什么值得交换的东西。',
      options: [
          { text: '用净水罐交换草药团', nextScene: 'tradeWaterForHerbs', requiredItem: '净水罐' },
          { text: '询问关于老街兄弟会的事', nextScene: 'askAboutBrotherhood' },
          { text: '婉拒离开', nextScene: 'ironHillMarket' }
      ]
  },
  
  'tradeWaterForHerbs': {
      title: '水换草药',
      description: '"干净的水！"玛莎惊讶地睁大眼睛，小心翼翼地接过水罐，"这在老街可是稀罕物，谢谢你的慷慨。"\n\n她递给你一个用布包着的小包，"这是我特制的草药团，比普通的更有效。有辐射不适时嚼一点，会有帮助。记得，遇到老街兄弟会的人，提我的名字，他们会对你友善一些。"',
      item: '草药团',
      removeItem: '净水罐',
      trustChanges: {
          oldStreetBrotherhood: 1
      },
      options: [
          { text: '返回市集', nextScene: 'ironHillMarket' }
      ]
  },
  
  'askAboutBrotherhood': {
      title: '老街兄弟会的秘密',
      description: '玛莎警惕地环顾四周，然后压低声音说："老街兄弟会是一群原本生活在东城区的幸存者，现在藏身于废弃的地下通道系统。他们擅长制药和信息交换，掌握着许多隐秘通道的情报。"\n\n她犹豫了一下，继续说："如果你真的想找他们，去火河沟边的旧地铁入口，敲三下长两下短，报我的名字。但要小心，他们对陌生人很警惕，尤其是穿着...奇怪装备的人。"',
      options: [
          { text: '返回市集', nextScene: 'ironHillMarket' }
      ]
  },
  
  'repairMan': {
      title: '老旧技师',
      description: '那个戴护目镜的男人抬头看了你一眼，继续低头修理手中的一个小型电子设备。他的工作台上摆满了各种工具和零件，都是从废墟中拯救出来的宝贝。\n\n"想要修什么？"他简短地问，声音粗哑，"我不收破烂，只修有用的东西。"\n\n你注意到他的工作台角落有一个看起来像是通讯设备的装置，上面的指示灯偶尔闪烁一下。',
      options: [
          { text: '询问他是否能修理净化服', nextScene: 'askAboutSuitRepair' },
          { text: '询问通讯装置的事', nextScene: 'askAboutCommunicator' },
          { text: '离开，回到市集', nextScene: 'ironHillMarket' }
      ]
  },
  
  'askAboutSuitRepair': {
      title: '净化服的维护',
      description: '技师仔细打量了你的服装，眉头越皱越深。"这不是普通的防护服，"他最终说道，"材料和工艺都超出了我见过的任何东西，比战前的高级军用装备还要先进。"\n\n他指了指你胸前的编号，"R7-41...我以前在某个研究日志里见过类似的编号系统。这看起来像是某种生物容器的内衬，而不是普通的防护服。"\n\n他无奈地摇摇头，"我没法修理这个，没有工具，也没有知识。但是，五号粮站的深处据说有战前的研究资料，也许那里会有相关信息。"',
      options: [
          { text: '返回市集', nextScene: 'ironHillMarket' }
      ]
  },
  
  'askAboutCommunicator': {
      title: '神秘的通讯装置',
      description: '技师看了看那个闪烁的设备，然后警惕地看向你。"只是个收音机，"他快速回答，但你感觉他在撒谎。\n\n沉默几秒后，他叹了口气，压低声音说："好吧，这不是普通收音机。我在尝试接收\'灯塔\'的信号。"\n\n见你疑惑的表情，他解释道："有传言说，北方的山区有个地方叫\'灯塔\'，那里有幸存的科学家在尝试恢复某些通讯系统。时不时会发送密码信息...我在尝试破解它们。"\n\n他迅速切断了对话："别告诉任何人，特别是那些\'火皮众\'，他们恨透了这类旧世界的技术。"',
      humanityChange: 1,
      options: [
          { text: '返回市集', nextScene: 'ironHillMarket' }
      ]
  },
  
};

 // 将场景数据暴露为全局变量
 window.wastelandScenes = wastelandScenes; 

 // 在文件末尾添加物品描述数据库

// 物品描述数据库 - 末日废土风格
const itemDescriptions = {
  '罐头食物': '一罐勉强可以辨认出标签的食物，已经过期很久，但密封良好。应急时能缓解饥饿。',
  '净水罐': '一个装有过滤水的金属容器，水质尚且清澈，比外面的脏水安全得多。',
  '草药团': '由荒野中采集的特殊植物混合制成的药团，有助于缓解辐射毒素。嚼起来味道苦涩，但效果显著。',
  '镇静丸': '一小瓶战前生产的镇静药物，可帮助控制情绪波动和改善睡眠。药片已经变色，但似乎仍然有效。',
  '急救包': '包含简易绷带、消毒剂和几片止痛药的小型医疗包，可以处理轻微外伤。',
  '生锈灭火器': '一个老旧的灭火器，虽然外壳生锈，但内部压力似乎还在。在紧急情况下可以作为武器使用。',
  '记忆碎片': '一个小型数据存储设备，闪烁着微弱的蓝光。似乎包含某种加密信息，可能与你的身份有关。'
 };
 
 // 将物品描述数据库暴露为全局变量
 window.itemDescriptions = itemDescriptions;