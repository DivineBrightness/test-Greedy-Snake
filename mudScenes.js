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

  
};

 // 将场景数据暴露为全局变量
 window.wastelandScenes = wastelandScenes; 

 // 在文件末尾添加物品描述数据库

// 物品描述数据库 - 末日废土风格
const itemDescriptions = {
  '罐头食物': '一罐勉强可以辨认出标签的食物，已经过期很久，但密封良好。应急时能缓解饥饿。',
  '净水罐': '一个装有过滤水的金属容器，水质尚且清澈，比外面的脏水安全得多。',
  '草药团': '由荒野中采集的特殊植物混合制成的药团，有助于缓解辐射毒素。嚼起来味道苦涩，但效果显著。',
  '镇静丸': '一小瓶旧世界生产的镇静药物，可帮助控制情绪波动和改善睡眠。药片已经变色，但似乎仍然有效。',
  '急救包': '包含简易绷带、消毒剂和几片止痛药的小型医疗包，可以处理轻微外伤。',
  '生锈灭火器': '一个老旧的灭火器，虽然外壳生锈，但内部压力似乎还在。在紧急情况下可以作为武器使用。',
  '记忆碎片': '一个小型数据存储设备，闪烁着微弱的蓝光。似乎包含某种加密信息，可能与你的身份有关。'
 };
 
 // 将物品描述数据库暴露为全局变量
 window.itemDescriptions = itemDescriptions;