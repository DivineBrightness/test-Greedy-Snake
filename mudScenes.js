// mudScenes.js - 荒野求生游戏场景定义

// 使用全局变量方式导出场景数据
const mudScenes = {
'start': {
          title: '飞机失事',
          description: '你在一场突如其来的风暴中乘坐的小型飞机坠毁了。当你从昏迷中苏醒，发现自己是唯一的幸存者，被困在一片陌生的荒野中。飞机残骸在你身后冒着烟，四周是茂密的森林。天色渐暗，你需要尽快做出决定。',
          options: [
            { text: '检查飞机残骸寻找有用物品', nextScene: 'planeWreckage' },
            { text: '寻找开阔地作为临时营地', nextScene: 'clearing' }
          ]
        },
        'planeWreckage': {
          title: '飞机残骸',
          description: '你小心翼翼地靠近仍在冒烟的飞机残骸。在翻找过程中，你发现了一个急救包、一些零食和一瓶水。机舱的一部分看起来可以作为临时庇护所，但待在这里可能不安全，燃料随时可能引发爆炸。',
          item: '急救包',
          isArea: true,
          options: [
            { text: '继续搜寻更多物资', nextScene: 'searchMoreSupplies' },
            { text: '离开残骸寻找更安全的地方', nextScene: 'clearing' }
          ]
        },
        'searchMoreSupplies': {
          title: '深入搜寻',
          description: '你决定冒险深入残骸搜寻更多物资。在驾驶舱内，你找到了一把求生刀和一张地区地图。就在你即将离开时，听到燃料箱发出危险的嘶嘶声。',
          item: '求生刀',
          options: [
            { text: '迅速离开飞机残骸', nextScene: 'clearing' },
            { text: '冒险再检查一次货舱', nextScene: 'cargoCheck' }
          ]
        },
        'cargoCheck': {
          title: '货舱检查',
          description: '你迅速翻找货舱，发现一个防水背包和一些罐头食品。突然，残骸发出一声巨响，部分机身开始倒塌！',
          item: '防水背包',
          options: [
            { text: '立即逃离', nextScene: 'escapeExplosion' }
          ]
        },
        'escapeExplosion': {
          title: '紧急逃离',
          description: '你抓起背包，拼命朝远处跑去。身后传来一声震耳欲聋的爆炸声，热浪推着你向前。你勉强躲到一棵大树后，逃过一劫。现在必须寻找一个安全的营地了。',
          options: [
            { text: '寻找开阔地', nextScene: 'clearing' }
          ]
        },
        'clearing': {
          title: '森林空地',
          description: '你找到一块开阔的空地，周围有高大的树木提供一些掩护。这里可以看到远处的山脉和一条小溪。天色越来越暗，你需要准备过夜了。',
          isArea: true,
          options: [
            { text: '收集材料搭建庇护所', nextScene: 'buildShelter' },
            { text: '先去勘察附近的小溪', nextScene: 'creek' },
            { text: '尝试生火', nextScene: 'makeFire' }
          ]
        },
        'buildShelter': {
          title: '搭建庇护所',
          description: '你收集附近的树枝、树叶和草，搭建了一个简易的庇护所。虽然简陋，但足以抵御风雨和保持体温。现在需要解决水和食物问题了。',
          isArea: true,
          options: [
            { text: '去小溪获取水源', nextScene: 'creek' },
            { text: '尝试生火', nextScene: 'makeFire' },
            { text: '寻找食物', nextScene: 'findFood' }
          ]
        },
        'makeFire': {
          title: '生火',
          description: '你收集了一些干燥的树枝、树皮和枯叶作为引火物。但没有打火机或火柴，生火变得很困难。',
          options: [
            { text: '用求生刀和石头生火', nextScene: 'fireSuccess', requiredItem: '求生刀' },
            { text: '放弃生火，先搭建庇护所', nextScene: 'buildShelter' },
            { text: '去小溪获取水源', nextScene: 'creek' }
          ]
        },
        'fireSuccess': {
          title: '成功生火',
          description: '通过使用求生刀和石头产生火花，你成功点燃了干燥的引火物。火焰渐渐变大，提供了温暖和安全感。有了火，你可以烧水、烹饪食物，并吓跑野生动物。',
          item: '营火',
          options: [
            { text: '去小溪获取水源', nextScene: 'creek' },
            { text: '寻找食物', nextScene: 'findFood' },
            { text: '加固庇护所', nextScene: 'improveShelter', requiredItem: '防水背包' }
          ]
        },
        'improveShelter': {
          title: '加固庇护所',
          description: '你使用防水背包的材料加固了庇护所，使其能够更好地抵御风雨。现在你的临时家更加安全舒适了。',
          options: [
            { text: '去小溪获取水源', nextScene: 'creek' },
            { text: '寻找食物', nextScene: 'findFood' }
          ]
        },
        'creek': {
          title: '小溪',
          description: '你来到一条清澈的小溪边。水流不快，看起来相对干净，但直接饮用可能不安全。周围有一些浆果灌木，远处似乎有动物活动的痕迹。',
          isArea: true,
          options: [
            { text: '收集水并尝试净化', nextScene: 'purifyWater', requiredItem: '急救包' },
            { text: '采摘浆果', nextScene: 'berries' },
            { text: '顺着溪流探索', nextScene: 'followCreek' },
            { text: '返回营地', nextScene: 'clearing' }
          ]
        },
        'purifyWater': {
          title: '净化水源',
          description: '你用急救包中的净水片处理了溪水，现在有了安全的饮用水。补充水分后，你感觉好多了。',
          item: '净化水',
          options: [
            { text: '采摘浆果', nextScene: 'berries' },
            { text: '顺着溪流探索', nextScene: 'followCreek' },
            { text: '返回营地', nextScene: 'clearing' }
          ]
        },
        'berries': {
          title: '浆果丛',
          description: '你仔细观察浆果的特征，回忆求生知识。有些看起来可以食用，但也有些可能有毒。你需要谨慎选择。',
          options: [
            { text: '采集蓝色浆果', nextScene: 'blueberries' },
            { text: '采集红色浆果', nextScene: 'poisonBerries' },
            { text: '放弃采集浆果', nextScene: 'creek' }
          ]
        },
        'blueberries': {
          title: '蓝莓',
          description: '你采集了一些看起来像蓝莓的浆果。尝了一小口后，确认它们确实是可食用的蓝莓。这提供了一些急需的糖分和维生素。',
          item: '蓝莓',
          options: [
            { text: '顺着溪流探索', nextScene: 'followCreek' },
            { text: '返回营地', nextScene: 'clearing' }
          ]
        },
        'poisonBerries': {
          title: '有毒浆果',
          description: '你尝了一小口红色浆果，立即感到味道不对。幸运的是，你立即吐出来，但仍然感到轻微的头晕和恶心。这些浆果有毒！',
          options: [
            { text: '用净化水冲洗口腔', nextScene: 'recoverFromPoison', requiredItem: '净化水' },
            { text: '返回营地休息', nextScene: 'clearing' }
          ]
        },
        'recoverFromPoison': {
          title: '处理中毒',
          description: '你用净化水彻底冲洗口腔，并喝了一些水稀释可能摄入的毒素。一段时间后，不适感减轻了。这是一次宝贵的教训。',
          options: [
            { text: '顺着溪流探索', nextScene: 'followCreek' },
            { text: '返回营地', nextScene: 'clearing' }
          ]
        },
        'followCreek': {
          title: '溪流探索',
          description: '你决定顺着溪流往下游走。经过约一小时的跋涉，你发现溪流汇入一条较大的河流。远处有山脉，而河边有一些动物足迹。',
          isArea: true,
          options: [
            { text: '观察动物足迹', nextScene: 'animalTracks' },
            { text: '沿河继续前进', nextScene: 'followRiver' },
            { text: '返回营地', nextScene: 'clearing' }
          ]
        },
        'animalTracks': {
          title: '动物足迹',
          description: '你仔细观察地上的足迹，它们看起来像是鹿的蹄印。这表明附近可能有猎物，但也意味着可能有掠食者。你还发现了一些可以用作鱼钩的尖锐石头。',
          item: '石制鱼钩',
          options: [
            { text: '尝试制作简易钓鱼工具', nextScene: 'makeFishingTool', requiredItem: '求生刀' },
            { text: '沿河继续前进', nextScene: 'followRiver' },
            { text: '返回营地', nextScene: 'clearing' }
          ]
        },
        'makeFishingTool': {
          title: '制作钓鱼工具',
          description: '利用求生刀，你削了一段合适的树枝作为钓竿，用植物纤维做线，石制鱼钩完成了一个简易的钓具。这将有助于获取蛋白质来源。',
          item: '简易钓具',
          options: [
            { text: '尝试钓鱼', nextScene: 'fishing' },
            { text: '沿河继续前进', nextScene: 'followRiver' },
            { text: '返回营地', nextScene: 'clearing' }
          ]
        },
        'fishing': {
          title: '河边垂钓',
          description: '你耐心在河边垂钓，经过一段时间的等待，成功钓到了两条中等大小的鱼。这是一个很棒的食物来源。',
          item: '新鲜鱼',
          options: [
            { text: '沿河继续前进', nextScene: 'followRiver' },
            { text: '带着战利品返回营地', nextScene: 'backToCamp' }
          ]
        },
        'backToCamp': {
          title: '返回营地',
          description: '你带着收获的食物返回营地。有了火，庇护所和食物，你的生存状况大大改善。但长期来看，你需要制定更完善的生存计划。',
          options: [
            { text: '烹饪收集的食物', nextScene: 'cookFood', requiredItem: '营火' },
            { text: '观察周围环境制定计划', nextScene: 'planNextMove' }
          ]
        },
        'cookFood': {
          title: '烹饪食物',
          description: '你利用营火烹饪了鱼和一些找到的可食用植物。热腾腾的食物极大地提升了你的体力和精神状态。食物的香味可能会吸引动物，但现在你感觉强壮多了。',
          item: '熟食',
          options: [
            { text: '制定下一步计划', nextScene: 'planNextMove' }
          ]
        },
        'planNextMove': {
          title: '制定计划',
          description: '在基本生存需求得到满足后，你开始考虑长期计划。你可以选择在此地建立更永久的营地，或者尝试寻找回到文明的路。',
          options: [
            { text: '建立更永久的营地', nextScene: 'permanentCamp' },
            { text: '尝试找到回到文明的路', nextScene: 'findCivilization' }
          ]
        },
        'followRiver': {
          title: '沿河前进',
          description: '你决定沿着河流继续前进。河流渐渐变宽，水流更加湍急。远处似乎有烟雾升起，可能是营火或住所的迹象。',
          isArea: true,
          options: [
            { text: '调查烟雾来源', nextScene: 'investigateSmoke' },
            { text: '继续沿河前进', nextScene: 'bridgeDiscovery' }
          ]
        },
        'investigateSmoke': {
          title: '烟雾调查',
          description: '你谨慎地向烟雾方向前进。穿过一片树林后，你发现一个小型猎人的营地，但似乎已经被遗弃一段时间了。这里有一些可以利用的工具和物资。',
          isArea: true,
          options: [
            { text: '搜寻营地', nextScene: 'searchCamp' },
            { text: '返回河边', nextScene: 'followRiver' }
          ]
        },
        'searchCamp': {
          title: '搜寻猎人营地',
          description: '在营地里，你发现了一个生锈的铁罐、一些绳索和一把旧斧头。这些工具将对你的生存大有帮助。营地里还有一张手绘地图，标注了通往附近小镇的路线。',
          item: '手绘地图',
          options: [
            { text: '尝试按地图指引寻找小镇', nextScene: 'followMap' },
            { text: '带着工具返回自己的营地', nextScene: 'backToCamp' }
          ]
        },
        'followMap': {
          title: '跟随地图',
          description: '你按照手绘地图上的指示前进。地图显示需要穿过一条危险的峡谷，然后翻越一座小山，才能到达最近的小镇。',
          options: [
            { text: '穿越峡谷', nextScene: 'crossCanyon' },
            { text: '先返回营地做更充分的准备', nextScene: 'backToCamp' }
          ]
        },
        'crossCanyon': {
          title: '峡谷穿越',
          description: '峡谷陡峭而危险，你小心翼翼地前进。途中遇到一处塌方区域，需要想办法通过。',
          options: [
            { text: '使用绳索通过塌方区域', nextScene: 'ropeClimbing', requiredItem: '绳索' },
            { text: '寻找其他路径', nextScene: 'alternatePath' }
          ]
        },
        'alternatePath': {
          title: '寻找替代路径',
          description: '你花了几小时寻找替代路径，最终发现一条绕行的小路。虽然路程增加了，但这条路更安全。',
          options: [
            { text: '继续前进', nextScene: 'mountainApproach' }
          ]
        },
        'ropeClimbing': {
          title: '绳索攀爬',
          description: '利用找到的绳索，你成功通过了峡谷中的塌方区域。这既节省了时间，又展示了你的求生技能。',
          options: [
            { text: '继续前进', nextScene: 'mountainApproach' }
          ]
        },
        'mountainApproach': {
          title: '接近山脉',
          description: '通过峡谷后，你来到山脚下。按照地图指示，翻过这座山后不远处就是小镇。山上可能有危险，但这是最短的路线。',
          options: [
            { text: '开始攀登', nextScene: 'climbMountain' },
            { text: '寻找绕行的路', nextScene: 'findPathAround' }
          ]
        },
        'findPathAround': {
          title: '寻找绕行路线',
          description: '你决定寻找一条绕过山的路。虽然可能需要更长时间，但安全性更高。经过半天的跋涉，你发现一条穿过山谷的小路。',
          options: [
            { text: '沿着山谷前进', nextScene: 'valleyPath' }
          ]
        },
        'valleyPath': {
          title: '山谷小路',
          description: '沿着山谷的小路前进，你发现这里曾经是一条采矿的运输路线。道路相对平坦，但被多年的植被覆盖。傍晚时分，你看到了远处小镇的灯光。',
          options: [
            { text: '继续前进到达小镇', nextScene: 'reachTown' }
          ]
        },
        'climbMountain': {
          title: '攀登山峰',
          description: '你开始艰难地爬山。地形崎岖，途中几次差点滑落。到达半山腰时，天气突变，开始下起大雨。',
          options: [
            { text: '寻找庇护所等待雨停', nextScene: 'mountainShelter' },
            { text: '冒雨继续攀登', nextScene: 'dangerousClimb' }
          ]
        },
        'dangerousClimb': {
          title: '危险攀登',
          description: '你决定冒雨继续攀登。这是个糟糕的决定，湿滑的岩石使得攀登变得极其危险。你不慎滑倒，从山坡上滚下来，受了伤。',
          options: [
            { text: '使用急救包处理伤口', nextScene: 'treatInjury', requiredItem: '急救包' },
            { text: '忍痛继续前进', nextScene: 'painfulJourney' }
          ]
        },
        'treatInjury': {
          title: '处理伤口',
          description: '你使用急救包处理了伤口，避免了感染的风险。休息一会后，你感觉好多了，可以继续前进。现在你选择了一条更安全的路线下山。',
          options: [
            { text: '小心前进', nextScene: 'carefulDescent' }
          ]
        },
        'carefulDescent': {
          title: '谨慎下山',
          description: '你选择了更安全的路线缓慢下山。雨逐渐停了，你看到山下不远处有小镇的灯光。希望就在眼前！',
          options: [
            { text: '前往小镇', nextScene: 'reachTown' }
          ]
        },
        'painfulJourney': {
          title: '忍痛前行',
          description: '没有适当处理伤口，你强忍着疼痛继续前进。路途异常艰难，但你的坚持最终得到回报——远处的山下出现了小镇的轮廓。',
          options: [
            { text: '前往小镇', nextScene: 'reachTown' }
          ]
        },
        'mountainShelter': {
          title: '山中避雨',
          description: '你找到一个山洞暂时避雨。洞内干燥安全，你决定在此休息等待雨停。在洞内深处，你发现了一些旧的登山装备和一个信号火箭。',
          item: '信号火箭',
          options: [
            { text: '雨停后继续前进', nextScene: 'afterRain' }
          ]
        },
        'afterRain': {
          title: '雨后前行',
          description: '雨过天晴，你继续下山。空气清新，视野变得更好。不久，你看到了山脚下的小镇。',
          options: [
            { text: '前往小镇', nextScene: 'reachTown' }
          ]
        },
        'reachTown': {
          title: '抵达小镇',
          description: '经过数天的荒野求生，你终于到达了小镇。当地居民对你的出现感到惊讶，他们告诉你这里是多么偏远。你成功生存并找到了回到文明的路，这是一次难忘的经历。',
          isEnding: true,
          endingType: 'good'
        },
        'bridgeDiscovery': {
          title: '发现吊桥',
          description: '沿河前进，你发现了一座老旧的吊桥横跨河流。桥看起来年久失修，但可能是通往安全地带的捷径。',
          options: [
            { text: '冒险穿过吊桥', nextScene: 'crossBridge' },
            { text: '寻找其他方式过河', nextScene: 'findAlternativeCrossing' }
          ]
        },
        'crossBridge': {
          title: '穿越吊桥',
          description: '你小心翼翼地踏上吊桥。木板吱呀作响，绳索似乎随时可能断裂。中途，一块木板突然断裂，你差点掉下去，但最终成功到达对岸。',
          options: [
            { text: '探索桥对岸', nextScene: 'otherSide' }
          ]
        },
        'findAlternativeCrossing': {
          title: '寻找替代渡河点',
          description: '你决定不冒险走那座危险的吊桥，沿岸寻找其他过河方式。经过几小时搜索，你发现一处河流较窄且水流较缓的地方。',
          options: [
            { text: '尝试涉水过河', nextScene: 'fordeRiver' }
          ]
        },
        'fordeRiver': {
          title: '涉水过河',
          description: '你小心地试探水深，确认可以安全涉水。水流相对较缓，但仍有一定风险。你成功到达对岸，只是衣服全湿了。',
          options: [
            { text: '探索河对岸', nextScene: 'otherSide' }
          ]
        },
        'otherSide': {
          title: '河对岸',
          description: '到达河对岸后，你发现这里的植被更加茂密。远处有一个山坡，爬上去或许能看到更远的景象，帮助你定位。',
          isArea: true,
          options: [
            { text: '爬上山坡观察', nextScene: 'hillTop' },
            { text: '探索河岸边的森林', nextScene: 'denseForest' }
          ]
        },
        'hillTop': {
          title: '山坡顶部',
          description: '从山坡顶部，你能看到远处有一条公路和一些人造建筑的迹象。这是回到文明的希望！但路途看起来还很遥远。',
          options: [
            { text: '使用信号火箭求救', nextScene: 'useFlare', requiredItem: '信号火箭' },
            { text: '制定前往公路的计划', nextScene: 'planToRoad' }
          ]
        },
        'useFlare': {
          title: '发射信号火箭',
          description: '你点燃了信号火箭，它在天空中划出一道明亮的轨迹。过了一会儿，你听到远处传来直升机的声音！你的信号被看到了！',
          options: [
            { text: '继续等待救援', nextScene: 'helicopterRescue' }
          ]
        },
        'helicopterRescue': {
          title: '直升机救援',
          description: '直升机盘旋在你的上方，最终找到合适的地点降落。救援人员告诉你，他们一直在搜寻飞机失事的幸存者。你终于获救了！',
          isEnding: true,
          endingType: 'best'
        },
        'planToRoad': {
          title: '前往公路计划',
          description: '你估算了到达公路的距离和所需时间，规划了一条路线。这将是一段艰难的旅程，但你已经证明了自己的生存能力。',
          options: [
            { text: '开始前往公路', nextScene: 'journeyToRoad' }
          ]
        },
        'journeyToRoad': {
          title: '前往公路的旅程',
          description: '你踏上了前往公路的旅程。路途遥远，充满挑战，但你的求生技能不断提升。几天后，你终于到达了公路，一辆卡车司机好心地停下来搭载了你。',
          isEnding: true,
          endingType: 'good'
        },
        'denseForest': {
          title: '茂密森林',
          description: '你决定探索河岸边的茂密森林。树木高大，阳光难以穿透。在探索过程中，你突然听到不远处有动物的声音。',
          options: [
            { text: '悄悄接近查看', nextScene: 'approachAnimal' },
            { text: '避开可能的危险', nextScene: 'avoidDanger' }
          ]
        },
        'approachAnimal': {
          title: '接近动物',
          description: '你小心翼翼地接近声音来源。透过树丛，你看到一只受伤的狼被陷阱困住了。它看起来既害怕又危险。',
          options: [
            { text: '尝试帮助受伤的狼', nextScene: 'helpWolf' },
            { text: '悄悄离开', nextScene: 'leaveWolf' }
          ]
        },
        'helpWolf': {
          title: '援助野狼',
          description: '冒着风险，你决定帮助受伤的狼。它起初对你充满敌意，但慢慢接受了你的帮助。你解开了陷阱，并用急救包处理了它的伤口。狼没有立即离开，而是跟着你。',
          options: [
            { text: '尝试与狼建立友谊', nextScene: 'befriendWolf', requiredItem: '急救包' },
            { text: '送走狼，继续前进', nextScene: 'continueJourneyAlone' }
          ]
        },
        'befriendWolf': {
          title: '野狼同伴',
          description: '经过一段时间的相处，狼似乎对你产生了信任。它成为了你忠实的伙伴，在危险的荒野中为你提供保护和陪伴。有了这个意外的盟友，你的生存几率大大增加。',
          item: '狼同伴',
          options: [
            { text: '与狼同伴一起探索', nextScene: 'exploreWithWolf' }
          ]
        },
        'exploreWithWolf': {
          title: '与狼共同探索',
          description: '有了狼的帮助，你能更安全地探索荒野。它的敏锐感官帮你发现了食物来源和潜在危险。在它的引导下，你找到了一条通往山谷的小路。',
          options: [
            { text: '跟随狼的指引', nextScene: 'wolfGuide' }
          ]
        },
        'wolfGuide': {
          title: '狼的引导',
          description: '狼带领你穿过森林，来到一个隐蔽的山谷。这里有一个废弃的猎人小屋，可以提供临时庇护。从这里，你能看到远处的道路和一座小镇的轮廓。',
          options: [
            { text: '与狼一起前往小镇', nextScene: 'wolfCompanionEnding' }
          ]
        },
        'wolfCompanionEnding': {
          title: '与狼同行',
          description: '你和你的狼同伴一起走向小镇。当接近文明时，狼变得犹豫。你理解它属于野性，与它告别。狼最后看了你一眼，消失在森林中。你走进小镇，带着这段非凡的友谊记忆，结束了自己的荒野求生之旅。',
          isEnding: true,
          endingType: 'special'
        },
        'leaveWolf': {
          title: '离开受伤的狼',
          description: '你决定不冒险，悄悄离开了受伤的狼。虽然感到一丝愧疚，但在荒野中，安全第一。你继续前进，寻找回到文明的路。',
          options: [
            { text: '爬上山坡观察', nextScene: 'hillTop' }
          ]
        },
        'avoidDanger': {
          title: '避开危险',
          description: '你选择避开潜在的危险，改变路线。这是明智的决定，因为不久后你听到远处传来狼群的嚎叫。你找到一条安全的路，继续向前。',
          options: [
            { text: '爬上山坡观察', nextScene: 'hillTop' }
          ]
        },
        'continueJourneyAlone': {
          title: '独自前行',
          description: '你决定不带着野狼同行，送它回到了森林。独自一人，你继续前进，依靠自己的智慧和技能在荒野中生存。',
          options: [
            { text: '爬上山坡观察', nextScene: 'hillTop' }
          ]
        },
        'findFood': {
          title: '寻找食物',
          description: '你开始在森林中寻找食物。一些可食用的浆果、坚果和蘑菇引起了你的注意，但你需要小心识别，避免食用有毒的品种。',
          options: [
            { text: '采集浆果和坚果', nextScene: 'gatherBerries' },
            { text: '寻找更多食物来源', nextScene: 'searchMoreFood' }
          ]
        },
        'searchMoreFood': {
          title: '扩大搜寻',
          description: '你扩大了搜寻范围，发现了一些蘑菇和可能有营养的植物根茎。你还注意到附近有动物活动的痕迹，可能可以尝试简单的狩猎。',
          options: [
            { text: '尝试制作简易陷阱', nextScene: 'makeTrap', requiredItem: '求生刀' },
            { text: '返回营地', nextScene: 'backToCamp' }
          ]
        },
        'makeTrap': {
          title: '制作陷阱',
          description: '利用求生刀和森林中的材料，你制作了几个简易陷阱。如果成功，这些陷阱可以捕获小型动物，提供宝贵的蛋白质。',
          item: '陷阱',
          options: [
            { text: '埋设陷阱后返回营地', nextScene: 'backToCamp' }
          ]
        },
        'gatherBerries': {
          title: '采集浆果',
          description: '你仔细辨别后，采集了一些安全的浆果和坚果。这些将为你提供一些能量和营养，但你需要更多的食物来源以维持长期生存。',
          item: '野果和坚果',
          options: [
            { text: '返回营地', nextScene: 'backToCamp' }
          ]
        },
        'findCivilization': {
          title: '寻找文明',
          description: '你决定尝试找回文明世界。根据目前的情况，你有几种可能的选择。',
          options: [
            { text: '顺着河流前进', nextScene: 'followRiver' },
            { text: '爬上高处寻找方向', nextScene: 'climbForView' }
          ]
        },
        'climbForView': {
          title: '登高观察',
          description: '你爬上附近的一座小山，希望能看到更远的地方。从这个高度，你可以看到河流的走向，远处似乎有一条小路和一些可能是人类活动的迹象。',
          options: [
            { text: '沿着发现的小路前进', nextScene: 'followPath' }
          ]
        },
        'followPath': {
          title: '沿路前进',
          description: '你沿着发现的小路前进。这条路看起来很少使用，但确实是人为开辟的。经过一天的行走，你遇到了一个伐木营地，但似乎已经废弃了一段时间。',
          isArea: true,
          options: [
            { text: '搜索伐木营地', nextScene: 'searchLoggingCamp' }
          ]
        },
        'searchLoggingCamp': {
          title: '搜索伐木营地',
          description: '在伐木营地，你发现了一些有用的工具和一辆损坏的卡车。虽然不能开动，但车上的地图显示了附近区域的信息，包括最近的公路和小镇的位置。',
          item: '详细地图',
          options: [
            { text: '按照地图指示前进', nextScene: 'followMapToTown' }
          ]
        },
        'followMapToTown': {
          title: '按图寻找小镇',
          description: '根据地图，你朝最近的公路前进。路途遥远，但有明确的方向让你充满希望。几天后，你终于到达了公路，不久就被一辆过路的卡车搭载，抵达了小镇。',
          isEnding: true,
          endingType: 'good'
        },
        'permanentCamp': {
          title: '建立永久营地',
          description: '你决定在目前的位置建立更永久的营地。这里靠近水源，有树木遮蔽，并且已经有了初步的庇护所和火堆。',
          options: [
            { text: '加固庇护所', nextScene: 'improveBasecamp' },
            { text: '开发食物来源', nextScene: 'developFoodSource' }
          ]
        },
        'improveBasecamp': {
          title: '营地升级',
          description: '你花了几天时间大幅改善营地。加固了庇护所，建立了储存食物的架子，甚至挖掘了一个简易的火炉。现在的营地更加舒适和安全。',
          options: [
            { text: '建立长期食物来源', nextScene: 'developFoodSource' }
          ]
        },
        'developFoodSource': {
          title: '发展食物来源',
          description: '为了长期生存，你开始开发更可靠的食物来源。你改进了钓鱼技术，设置了多个动物陷阱，甚至尝试在附近营地周围种植一些可食用的植物。',
          options: [
            { text: '在营地生活一段时间', nextScene: 'survivalLife' }
          ]
        },
        'survivalLife': {
          title: '荒野生存',
          description: '随着时间推移，你适应了荒野生活。你的技能不断提升，营地越来越完善。虽然偶尔也想念现代生活的便利，但这种自给自足的生活也有其独特魅力。',
          options: [
            { text: '听到远处的引擎声', nextScene: 'hearEngine' }
          ]
        },
        'hearEngine': {
          title: '引擎声响',
          description: '一天早晨，你听到远处传来引擎的声音。这是几周来第一次听到人类科技的声音。你需要决定是否要前去查看。',
          options: [
            { text: '跟随声音寻找来源', nextScene: 'followEngineSound' },
            { text: '保持谨慎，留在营地', nextScene: 'stayAtCamp' }
          ]
        },
        'stayAtCamp': {
          title: '留守营地',
          description: '你决定不冒险，留在营地。引擎的声音最终消失了。你继续你的荒野生存，逐渐适应并享受这种与世隔绝的生活。几个月后，你已经完全适应了这种生活方式。',
          isEnding: true,
          endingType: 'survival'
        },
        'followEngineSound': {
          title: '寻找声音来源',
          description: '你决定追寻引擎的声音。经过几小时的跋涉，你看到一辆林业工作车。工人们正在进行例行巡查。他们惊讶于在这么偏远的地方发现一个生还者。',
          options: [
            { text: '请求帮助返回文明', nextScene: 'returnToCivilization' },
            { text: '告知情况但选择留在森林', nextScene: 'chooseToStay' }
          ]
        },
        'returnToCivilization': {
          title: '返回文明',
          description: '林业工人带你回到了最近的小镇。你的荒野求生冒险告一段落，但这段经历永远改变了你对生活的态度和价值观。',
          isEnding: true,
          endingType: 'good'
        },
        'chooseToStay': {
          title: '选择留下',
          description: '令林业工人惊讶的是，你告诉他们你选择留在森林中。你已经找到了自己的生活方式，并享受这种与自然和谐相处的生活。他们尊重你的决定，临走前给了你一些补给和一个无线电，以便在紧急情况下联系外界。',
          isEnding: true,
          endingType: 'alternate'
        }
  };
  
  // 将场景数据暴露为全局变量
  window.mudScenes = mudScenes;