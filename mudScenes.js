// mudScenes.js - 《废土余生》文字冒险游戏场景定义

// 使用全局变量方式导出场景数据
const mudScenes = {
    // 添加到mudScenes对象中
'death': {
    title: '生命终结',
    description: '伤痛最终战胜了你。在这片无情的废土上，你的旅程就此结束。你的身体会成为这片荒凉大地的一部分，也许有一天，某个流浪者会发现你的遗骸，从中获取一些微不足道的物资。在废土上，死亡从来不是结束，只是另一种循环的开始。',
    isEnding: true,
    options: [
      { text: '', nextScene: 'start' }
    ]
  },
  
  'radiationDeath': {
    title: '辐射侵蚀',
    description: '你的辐射剂量计发出最后一声尖锐的警报，然后归于沉寂。你的皮肤开始出现可怕的病变，视线逐渐模糊。辐射已经侵蚀了你的每一个细胞。在含糊不清地呢喃了几句话后，你倒在了荒凉的废土上，成为了这片被核灾难改变的世界的又一个牺牲品。',
    isEnding: true,
    options: [
      { text: '', nextScene: 'start' }
    ]
  },
  'suburbanRuins': {
  title: '城郊废墟',
  description: '你来到一片曾经是高档社区的城郊废墟。如今，这些曾经象征着"美国梦"的别墅只剩下坍塌的框架和杂草丛生的院子。一座歪斜的邮箱上的"欢迎来到森林湖社区"标志讽刺地迎接着你。几只变异的松鼠在废弃的儿童游乐设施上警惕地注视着你，它们异常巨大的眼睛在暮色中反射着诡异的光。远处，一栋保存相对完好的双层别墅引起了你的注意。',
  radiationChange: 5,
  options: [
    { text: '探索保存较好的别墅', nextScene: 'exploreIntactHouse' },
    { text: '搜寻附近的便利店残骸', nextScene: 'searchConvenienceStore' },
    { text: '返回废弃公路', nextScene: 'abandonedHighway' }
  ]
},

'exploreIntactHouse': {
  title: '模范家庭',
  description: '你推开吱呀作响的大门，走进这栋双层别墅。客厅里，一家四口的骨架仍然整齐地坐在沙发上，面对着早已无信号的电视机，仿佛在等待世界末日特别节目的插播广告结束。餐桌上摆着完美保存的假水果和塑料蛋糕，上面积满了厚厚的辐射尘。楼梯旁的照片墙展示着这家人从幸福到恐慌的渐变表情集。"嗯，至少他们没有分开，"蛇哥干巴巴地评论道，"在末日来临时，家庭团聚总是最重要的。"',
  options: [
    { text: '搜索二楼卧室', nextScene: 'searchUpstairs' },
    { text: '检查地下室', nextScene: 'checkBasement' },
    { text: '返回城郊废墟', nextScene: 'suburbanRuins' }
  ]
},

'searchConvenienceStore': {
  title: '永不打烊',
  description: '废弃便利店的招牌上"24小时营业"的霓虹灯早已熄灭，讽刺地应验了这个承诺——确实永远不会关门了，因为已经没有门了。店内，货架东倒西歪，大部分商品早被洗劫一空。柜台后方，一具骨架穿着褪色的员工背心，胸前的名牌写着"史蒂夫"，旁边贴着"本月最佳员工"的徽章。"看来末日也没能让史蒂夫逃离他的岗位，"你自言自语道，"真是敬业啊。"在角落里，你发现一个被锁住的药品柜，奇迹般地保持完好。',
  options: [
    { text: '尝试撬开药品柜', nextScene: 'unlockMedicineCabinet' },
    { text: '检查收银机', nextScene: 'checkCashRegister' },
    { text: '返回城郊废墟', nextScene: 'suburbanRuins' }
  ]
},

'start': {
        title: '逃离辐射区',
        description: '大灾变第二十年。你在一次搜寻物资的过程中遭遇了酸雨，避难所已经伸手不见五指，你的辐射剂量计发出刺耳的警报。随着食物和净水所剩无几，你不得不踏入这片荒芜的废土，寻找新的生存希望。在你面前，一条布满裂缝的公路通向远方，浓密的辐射尘笼罩着灰暗的天空。',
        health: 3, // 初始生命值
        radiation: 10, // 初始辐射值
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
        healthChange: -1, // 掉血事件
        radiationChange: 5, // 辐射值增加
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
        healthChange: 1, // 回血事件
        options: [
          { text: '继续搜索加油站', nextScene: 'stationLoot' }
        ]
      },
      
      'narrowEscape': {
        title: '狭路逃生',
        description: '你冲向紧急出口，但门已经生锈卡住。鼠群逼近你身后，你用尽全力撞开了门，跌跌撞撞地逃出了加油站。虽然逃脱了鼠群，但你的背包在慌乱中遗落了一部分物资，而且手臂被门框划伤了。',
        healthChange: -1, // 掉血事件
        options: [
          { text: '返回公路', nextScene: 'abandonedHighway' }
        ]
      },
      
      'stationLoot': {
        title: '物资收集',
        description: '在加油站的杂物堆中，你找到一个尚未被完全洗劫的储物柜。翻找一番后，你获得了几瓶浑浊但密封完好的水和一个军用急救包。柜台下还有一把锈迹斑斑的螺丝刀，可能用作简单的工具或武器。',
        item: '急救包',
        options: [
          { text: '继续寻找物资', nextScene: 'findFlashlight' },
          { text: '离开加油站', nextScene: 'abandonedHighway' }
        ]
      },
      
      'findFlashlight': {
        title: '意外发现',
        description: '深入搜索加油站办公室，在一个卡住的抽屉里，你发现了一个尚能使用的手摇式手电筒。这在没有电力的废土上是一件珍贵的物品。你还发现了一张写着"铁锈集市安全"的纸条，下面潦草地画着一个方向指示。',
        item: '手摇手电筒',
        options: [
          { text: '离开加油站，前往公路', nextScene: 'abandonedHighway' }
        ]
      },
      
      'abandonedHighway': {
        title: '废弃公路',
        description: '你站在一条布满裂痕的高速公路上，路边散落着锈蚀的汽车残骸。浓厚的辐射尘让天空呈现诡异的橙红色。西边远处似乎有微弱的灯光，可能是某种定居点；东边则是一片荒凉的废弃城郊。公路中央的指示牌已经倒塌，无法辨认上面的地名。',
        isArea: true,
        options: [
          { text: '沿公路向西行进', nextScene: 'towardsLights' },
          { text: '前往东边的城郊废墟', nextScene: 'suburbanRuins' },
          { text: '检查附近的车辆残骸', nextScene: 'carWreck' }
        ]
      },
      
      'carWreck': {
        title: '汽车残骸',
        description: '你走近一辆翻倒的SUV，车身已经严重锈蚀。车门半开着，内部似乎有一些物品。你刚靠近，一股刺鼻的化学气味就扑面而来。这可能是燃油泄漏或更危险的辐射物质。',
        radiationChange: 5,
        options: [
          { text: '冒险搜索车内物品', nextScene: 'searchCar' },
          { text: '安全起见，离开这里', nextScene: 'abandonedHighway' }
        ]
      },
      
      'searchCar': {
        title: '危险收获',
        description: '你屏住呼吸，迅速搜索车内。在手套箱里，你找到一把生锈的手枪和几颗子弹。驾驶座下方有一个金属水壶，里面还有一些液体，但你不确定是否安全。突然，你感到一阵头晕目眩，辐射表发出嘀嘀声。',
        item: '生锈手枪',
        healthChange: -1,
        radiationChange: 15,
        options: [
          { text: '服用抗辐射药', nextScene: 'useRadAway', requiredItem: '抗辐射药' },
          { text: '忍受不适，离开车辆', nextScene: 'abandonedHighway' }
        ]
      },
      
      'useRadAway': {
        title: '缓解辐射',
        description: '你从背包中取出抗辐射药，服下一片。药片有股刺激性的苦味，但很快你感到辐射引起的恶心感减轻了。这种药在废土上极为珍贵，每一片都可能救你一命。',
        radiationChange: -10,
        options: [
          { text: '返回公路', nextScene: 'abandonedHighway' }
        ]
      },
      
      'towardsLights': {
        title: '神秘灯光',
        description: '你沿着公路向西走了几个小时。天色渐暗，辐射尘在微弱的月光下飘浮。远处的灯光现在清晰可见，那是一个由废旧火车车厢组成的小型定居点，周围点缀着轮胎燃烧的火光。一块歪斜的牌子上写着"铁锈集市"。',
        radiationChange: 5,
        options: [
          { text: '接近集市大门', nextScene: 'rustMarketGate' },
          { text: '先在附近观察一会儿', nextScene: 'observeMarket' }
        ]
      },
      
      'observeMarket': {
        title: '暗中观察',
        description: '你藏在一辆废弃卡车后面，观察铁锈集市。入口处有两名荷枪实弹的守卫，他们身着破旧但加固过的防护服。你看到各种人进出集市，有的推着满载物资的手推车，有的牵着变异的家畜。集市内部传来嘈杂的交易声和偶尔的争吵声。',
        options: [
          { text: '接近集市大门', nextScene: 'rustMarketGate' },
          { text: '寻找可能的后门或安全入口', nextScene: 'findBackEntry' }
        ]
      },
      
      'findBackEntry': {
        title: '寻找后门',
        description: '你绕到铁锈集市的后方，发现一处围栏上的裂缝，勉强可以通过一个成年人。附近没有守卫，但你注意到地上有几个可疑的陷阱和一个简易的警报装置。',
        options: [
          { text: '小心通过裂缝', nextScene: 'sneakIn' },
          { text: '放弃潜入，走正门', nextScene: 'rustMarketGate' }
        ]
      },
      
      'sneakIn': {
        title: '秘密潜入',
        description: '你成功避开陷阱，悄悄穿过围栏的裂缝。你现在在铁锈集市的后区，周围堆满了废弃物和零部件。就在你准备进入主市场区时，一个小孩子突然出现在你面前。他右腿安装着一个简陋的机械义肢，警惕地看着你。',
        options: [
          { text: '向孩子表示友好', nextScene: 'friendlyToKid' },
          { text: '试图避开孩子', nextScene: 'avoidKid' }
        ]
      },
      
      'friendlyToKid': {
        title: '小偷小七',
        description: '"你是新来的吧？没见过你。"男孩歪着头打量你，"我叫小七，知道在这儿怎么不被老莫的人抓到吗？"他指了指自己的机械腿，"这可是自己改装的，厉害吧！你有什么好东西吗？我可以带你参观市场，当然，不是免费的。"',
        options: [
          { text: '给小七一些物品作为报酬', nextScene: 'payKid', requiredItem: '急救包' },
          { text: '谢绝帮助，自己探索', nextScene: 'exploreAlone' }
        ]
      },
      
      'payKid': {
        title: '结盟小七',
        description: '你给了小七一些急救物品，他惊讶地接过，仔细检查后小心地收进了他破旧的背包。"这在市场上至少值三天口粮！"他兴奋地说，"跟我来，我带你认识几个能帮你的人，但小心老莫的手下，他们不欢迎陌生人。"小七带路穿过狭窄的走廊，向市场中心走去。',
        faction: 'kid_seven',
        trustChange: { kid_seven: 1 }, // 增加对小七的信任
        options: [
          { text: '跟随小七', nextScene: 'marketCenter' }
        ]
      },
      
      'avoidKid': {
        title: '警报响起',
        description: '你试图绕过男孩，但他立刻拉响了一个隐藏的警报。刺耳的警笛声在市场中回荡，几秒钟后，两名荷枪实弹的守卫冲到这里。"又是一个潜入者！"其中一个粗声粗气地说道。你被逮捕了，他们没收了你的部分物资作为"入场税"。',
        healthChange: -1,
        removeItem: '急救包', // 移除玩家物品
        options: [
          { text: '被带到集市中心', nextScene: 'capturedMarket' }
        ]
      },
      
      'exploreAlone': {
        title: '独自探索',
        description: '"随你便，"男孩耸耸肩，"但别在垃圾食品区被抓到，那儿的守卫特别凶。"他迅速消失在杂乱的货物堆后面。你独自摸索着前进，试图弄清楚这个市场的构造。',
        options: [
          { text: '前往市场中心', nextScene: 'lostInMarket' }
        ]
      },
      
      'lostInMarket': {
        title: '迷失方向',
        description: '铁锈集市比你想象的要复杂得多，由数十节旧火车车厢改造而成，形成一个迷宫般的结构。你不小心进入了一个危险区域，这里几个面戴防毒面具的人正在进行可疑的交易。他们注意到了你，交易立即停止，所有人都盯着你。',
        options: [
          { text: '快速离开，假装迷路', nextScene: 'escapeDealer' },
          { text: '试探询问如何去市场中心', nextScene: 'askDirections' }
        ]
      },
      
      'escapeDealer': {
        title: '险些冲突',
        description: '你装作迷路的样子，快步离开。身后传来低声交谈，但幸运的是，没有人追上来。几分钟后，你终于找到了通往市场中心的路。',
        options: [
          { text: '前往市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'askDirections': {
        title: '不友好的回应',
        description: '"滚出去，外来者！"一个戴防毒面具的高大男子威胁地向你走来，手中握着一把生锈的管制刀具。你意识到自己闯入了危险地带，立刻转身快步离开。在混乱中你被推搡到墙上，肩膀受了轻伤。',
        healthChange: -1,
        options: [
          { text: '逃离危险区域', nextScene: 'marketCenter' }
        ]
      },
      
      'rustMarketGate': {
        title: '铁锈集市大门',
        description: '你走到铁锈集市的主要入口。两名警惕的守卫手持自制猎枪，拦住了你的去路。"站住，陌生人！"其中一名守卫喊道，"这里是铁锈集市，不欢迎惹麻烦的人。你有什么值得交易的东西吗？或者是来找活干的？"',
        options: [
          { text: '展示你的物资，请求入场', nextScene: 'showResources' },
          { text: '提到你寻找安全住所', nextScene: 'seekShelter' },
          { text: '询问有无工作可做', nextScene: 'askForWork' }
        ]
      },
      
      'showResources': {
        title: '入场检查',
        description: '你展示了背包里的物品。守卫粗略检查后，对你发现的手摇手电筒特别感兴趣。"这东西在集市上很吃香，"他评估道，"你可以进去，但要遵守规矩：不准惹事，不准偷窃，尊重老莫的权威。违规者会被逐出或更糟。"他让开路，允许你进入。',
        options: [
          { text: '进入市场', nextScene: 'marketCenter' }
        ]
      },
      
      'seekShelter': {
        title: '寻求庇护',
        description: '"又一个流浪者，"守卫摇摇头，"我们这里不是慈善所，但如果你能工作，老莫可能会给你一个睡觉的角落。"他收取了你的一些物资作为"保护费"，然后让你通过。"记住规矩：打架斗殴者没有第二次机会。"',
        removeItem: '手摇手电筒', // 移除玩家物品
        options: [
          { text: '进入市场', nextScene: 'marketCenter' }
        ]
      },
      
      'askForWork': {
        title: '寻找工作',
        description: '"愿意干活的人总是受欢迎，"守卫的态度稍微友善了一些，"集市里最近缺少净水，上次运水的商队已经迟到几天了。去找老莫，他或许有活儿给你干。"守卫指向市场中央一节涂着红漆的火车车厢。',
        options: [
          { text: '进入市场寻找老莫', nextScene: 'marketCenter' }
        ]
      },
      
      'capturedMarket': {
        title: '老莫的审判',
        description: '守卫把你带到一个宽敞的火车车厢，里面摆着各种武器和弹药。一个腿部有明显跛足的老人坐在金属桌后，不断擦拭着一把镀铬左轮手枪。"又一个趁混乱偷溜进来的家伙，"他抬头看你，锐利的眼神像是能看透你的灵魂。"我是老莫，这个市场的规矩由我定。给我一个不把你丢出去的理由。"',
        options: [
          { text: '提议帮忙寻找净水源', nextScene: 'offerHelp' },
          { text: '表示你只是一个路过的旅行者', nextScene: 'justTraveler' }
        ]
      },
      
      'offerHelp': {
        title: '伸出援手',
        description: '"我听说你们缺水，"你说，"我有丰富的荒野生存经验，可以帮忙找寻新的水源。"老莫审视着你，嘴角微微上扬。"勇气可嘉，但在这片废土上，勇气常常与愚蠢相伴。"他合上左轮手枪的弹仓，"不过我们确实需要水。如果你愿意冒险，我可以给你一次机会。"',
        faction: 'old_mo',
        trustChange: { old_mo: 1 }, // 增加对老莫的信任
        options: [
          { text: '接受任务寻找水源', nextScene: 'waterMission' },
          { text: '婉拒，想先了解集市情况', nextScene: 'marketCenter' }
        ]
      },
      
      'justTraveler': {
        title: '未能信服',
        description: '"路过？"老莫冷笑一声，"没人只是\'路过\'铁锈集市。在这片荒土上，每个人都有目的。"他示意手下把你带走，"我不喜欢撒谎的人。在我们这里干一天苦力，证明你的价值，然后你可以留下来或离开。"',
        faction: 'old_mo',
        trustChange: { old_mo: -1 }, // 减少对老莫的信任
        options: [
          { text: '服从安排，去做苦力', nextScene: 'laborWork' },
          { text: '抗议这种待遇', nextScene: 'protestTreatment' }
        ]
      },
      
      'protestTreatment': {
        title: '徒劳的反抗',
        description: '你开始抗议这种不公正的待遇，但话还没说完，就被两名守卫架住胳膊拖了出去。"你在这里没有发言权，"老莫的声音从背后传来，"要么接受规矩，要么滚出去送死。"你被强行安排去车厢外面帮忙修建防御工事。',
        healthChange: -1,
        options: [
          { text: '忍气吞声完成工作', nextScene: 'laborWork' }
        ]
      },
      
      'laborWork': {
        title: '集市苦工',
        description: '你被带到集市外围，那里正在建设新的防御工事。你的任务是搬运沉重的金属板和轮胎，用来加固围墙。工作极其繁重，但你还是咬牙坚持完成了。傍晚时分，一名守卫惊讶于你的效率和耐力，给了你一份额外的配给和一间简陋的住所。',
        healthChange: -1, // 体力消耗
        item: '防辐射药片',
        options: [
          { text: '休息一晚', nextScene: 'restAtMarket' },
          { text: '探索夜晚的集市', nextScene: 'nightMarket' }
        ]
      },
      
      'marketCenter': {
        title: '铁锈集市中心',
        description: '你站在铁锈集市的中心区域，这里是由旧火车车厢改造而成的交易区。空气中弥漫着烤肉、机油和人群混杂的气味。各种摊位沿着狭窄的走道排开，交易声此起彼伏。你注意到一家"鼠肉餐馆"，一个"净水交易站"，以及一个挂着红十字标志的"坟场诊所"。远处的红色车厢应该就是老莫的据点。',
        isArea: true,
        options: [
          { text: '前往鼠肉餐馆', nextScene: 'ratMeatRestaurant' },
          { text: '查看净水交易站', nextScene: 'waterStation' },
          { text: '拜访坟场诊所', nextScene: 'graveyardClinic' },
          { text: '前往老莫的据点', nextScene: 'moHeadquarters' }
        ]
      },
      
      'ratMeatRestaurant': {
        title: '鼠肉餐馆',
        description: '餐馆是一节改装过的餐车，墙上挂着各种大小不一的干瘪老鼠尸体。一位戴着厚重铅围裙的厨师正在用铅板充当砧板，剁着新鲜的鼠肉。空气中弥漫着浓郁的香料和烤肉的味道，掩盖着肉类可能的异味。几个顾客正在狼吞虎咽地吃着盘中食物。',
        options: [
          { text: '点一份鼠肉餐', nextScene: 'orderRatMeal' },
          { text: '与厨师交谈', nextScene: 'talkToChef' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'orderRatMeal': {
        title: '一顿热餐',
        description: '你用一些物品换取了一份鼠肉餐。肉质意外地鲜嫩，配上特制的酱料，味道其实不错。正当你享用食物时，听到邻桌有人谈论最近水源不足的问题，以及"蛇哥"可能知道地下水道的情报。吃完饭后，你感到精力恢复了不少。',
        healthChange: 1, // 恢复生命值
        options: [
          { text: '询问"蛇哥"的信息', nextScene: 'askAboutSnake' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'askAboutSnake': {
        title: '关于蛇哥',
        description: '你向邻桌的食客打听"蛇哥"的消息。他们起初有些警惕，但见你是生面孔，态度软化了些。"蛇哥？他是个传奇人物，后背上纹着整个地区的地下管道图。以前是卡车司机，知道所有的路线。最近很少见到他，听说在净水站有人见过他。"',
        options: [
          { text: '前往净水交易站', nextScene: 'waterStation' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'talkToChef': {
        title: '厨师的故事',
        description: '厨师是个粗犷的中年男子，左脸有一道醒目的疤痕。他对陌生人很警惕，但在你表达对他烹饪技巧的赞赏后，略微放松了些。"想在废土上活下去，就得适应，"他边切鼠肉边说，"这些变异鼠其实比灾变前的家鼠干净，肉质也好。关键是处理手法和调料。"他向你透露，最近缺水导致肉类加工更困难，他正考虑提高价格。',
        options: [
          { text: '点一份鼠肉餐', nextScene: 'orderRatMeal' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'waterStation': {
        title: '净水交易站',
        description: '净水站建在一节装过液体的罐车里。入口处挂着"今日配给减半"的牌子。站内有几个巨大的水箱，里面养着一些苍白的鱼，据说它们能吸收水中的辐射。站长是个干瘦的老人，正在仔细记录着什么。角落里一个身材高大的男子背对着你，他赤裸的上身露出大面积的纹身，看起来像是某种管道图案。',
        options: [
          { text: '与站长交谈', nextScene: 'talkToWaterMaster' },
          { text: '接近那个有纹身的男子', nextScene: 'approachTattooMan' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'talkToWaterMaster': {
        title: '水源危机',
        description: '站长抬头看了你一眼，继续记录他的账本。"如果你是来买水的，今天的配额已经发完了。"看到你依然站在那里，他叹了口气。"我们的主要水源——东郊水库上周突然干涸，只能依靠之前储存的水和商队带来的净水。运水商队已经迟到三天了，情况不太妙。"',
        options: [
          { text: '问他是否知道新水源', nextScene: 'askNewWaterSource' },
          { text: '接近有纹身的男子', nextScene: 'approachTattooMan' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'askNewWaterSource': {
        title: '水源线索',
        description: '"新水源？我们派出了几队人马寻找，但都没有好消息。"站长压低声音，"不过有个传闻——废弃军事基地地下可能有一个未被发现的净水系统。问题是那地方辐射严重，还有军方留下的自动防御系统。没人敢去。"他瞥了一眼角落里的纹身男子，"除非你能说服蛇哥带路。他知道怎么进去。"',
        options: [
          { text: '接近有纹身的男子', nextScene: 'approachTattooMan' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'approachTattooMan': {
        title: '蛇哥',
        description: '你走向那个有纹身的男子。当他转身面对你时，你注意到他的后背几乎完全被一张复杂的地下管道图纹身覆盖，精确到令人吃惊。"有事？"他简短地问道，声音低沉粗糙。这就是传说中的"蛇哥"，从他警觉的眼神可以看出，他曾经历过不少艰难时刻。',
        options: [
          { text: '询问关于地下水道的事', nextScene: 'askAboutTunnels' },
          { text: '提到老莫的水源问题', nextScene: 'mentionWaterProblem' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'askAboutTunnels': {
        title: '地下秘密',
        description: '"谁说我知道地下水道了？"蛇哥的表情瞬间变得警惕，他环顾四周确保没人注意你们的谈话。"这不是随便谈论的话题。地下网络错综复杂，很多区域已经辐射严重或者塌陷了。你为什么想知道这个？"',
        options: [
          { text: '坦诚说明想帮集市解决水源问题', nextScene: 'honestWaterHelp' },
          { text: '含糊其辞，说只是好奇', nextScene: 'vagueAnswer' }
        ]
      },
      
      'vagueAnswer': {
        title: '引起怀疑',
        description: '"好奇？"蛇哥冷笑一声，"在废土上，\'好奇\'会让人送命。我不知道你是谁，也不关心。但我建议你别多管闲事，尤其是关于地下通道的事。"他站起身，不再理会你，明显地结束了对话。',
        faction: 'snake',
        trustChange: { snake: -1 }, // 减少对蛇哥的信任
        options: [
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'honestWaterHelp': {
        title: '赢得信任',
        description: '听完你的解释，蛇哥审视了你一会儿，似乎在判断你的真实意图。"想帮忙解决水源问题？有趣。很少有外来者关心集市的事。"他稍微放松了些，"我确实知道一些地方，包括旧军事基地下的输水管道。但那里危险重重，我不会轻易冒险。"他停顿了一下，"不过，如果你能帮我找到特定的配件，或许我会考虑带路。"',
        faction: 'snake',
        trustChange: { snake: 1 }, // 增加对蛇哥的信任
        options: [
          { text: '询问他需要什么配件', nextScene: 'askForParts' },
          { text: '建议直接去军事基地', nextScene: 'suggestGoingDirectly' }
        ]
      },
      
      'askForParts': {
        title: '必要的准备',
        description: '"我需要一套工具修复部分管道阀门，以及一件防护装备抵抗辐射。"蛇哥解释道，"工具可能在老枪的移动堡垒里找到，他收集各种实用物品。至于防护装备，坟场诊所的阿萍可能有医用防辐射服。如果你能搞到这些东西，我就带你去军事基地的地下管网。"',
        options: [
          { text: '前往寻找老枪', nextScene: 'searchForOldGun' },
          { text: '前往坟场诊所', nextScene: 'graveyardClinic' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'graveyardClinic': {
        title: '坟场诊所',
        description: '诊所设在废弃的墓园管理处，外墙用金属板加固，门口挂着用红漆绘制的十字标志。内部光线昏暗，几盏由汽车电池供电的手术灯提供照明。空气中混合着消毒水和某种奇怪药草的气味。几位伤患躺在改装的病床上，其中一位戴着防毒面具的女性正在为他们更换绷带。',
        isArea: true,
        options: [
          { text: '与戴面具的女性交谈', nextScene: 'talkToNurse' },
          { text: '查看诊所物资', nextScene: 'checkClinicSupplies' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'talkToNurse': {
        title: '阿萍护士',
        description: '那位女性注意到了你的到来，暂停了手中的工作。她摘下面具，露出一张疲惫但坚毅的面庞，约莫二十多岁。"新面孔，"她直截了当地说，"我是阿萍，这里的医护人员。如果你受伤了，可以加入等待名单；如果是来交易药品的，直说价码。"她的挎包里露出一些接生工具，表明她不仅仅处理伤患。',
        options: [
          { text: '询问医疗帮助', nextScene: 'askForMedicalHelp' },
          { text: '提到蛇哥需要防辐射服', nextScene: 'mentionRadSuit' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'mentionRadSuit': {
        title: '寻找防护服',
        description: '"蛇哥让你来找我要防辐射服？"阿萍挑眉，"那套装备太珍贵了，不是随便借给人的。"她沉思片刻，然后说道："不过，我最近确实面临一个难题。有一位孕妇需要特殊药物，但药品在东区医院的地下室里。那里被一群‘挖坟人’占据了，他们拒绝让我进去。如果你能帮我拿到那些药物，我就借给蛇哥防辐射服。"',
        options: [
          { text: '接受任务去东区医院', nextScene: 'acceptHospitalMission' },
          { text: '询问有关挖坟人的信息', nextScene: 'askAboutGraveDiggers' },
          { text: '返回市场中心考虑一下', nextScene: 'marketCenter' }
        ]
      },
      
      'askAboutGraveDiggers': {
        title: '危险的挖坟人',
        description: '"挖坟人是个奇怪的团体，"阿萍解释道，"他们专门从旧墓地和医院搜刮药品和值钱物品。通常他们愿意和我做交易，但最近他们的新首领变得极端排外。"她压低声音，"据说他们开始进行某种古怪仪式，可能与辐射崇拜有关。无论如何，小心点。可能需要武力，也可能需要谈判技巧。"',
        options: [
          { text: '接受任务去东区医院', nextScene: 'acceptHospitalMission' },
          { text: '返回市场中心考虑一下', nextScene: 'marketCenter' }
        ]
      },
      
      'acceptHospitalMission': {
        title: '医院任务',
        description: '阿萍给你详细描述了东区医院的位置和需要寻找的药品——几盒产前维生素和抗辐射药物。"记住，那些挖坟人不是好惹的，"她警告道，"但也不全是没有理性的疯子。"她递给你一块印有红十字的布，"带上这个，至少表明你与医疗有关，可能会让一些人犹豫是否直接攻击你。"',
        item: '医疗标识',
        options: [
          { text: '立即前往东区医院', nextScene: 'journeyToHospital' },
          { text: '先寻找老枪的帮助', nextScene: 'searchForOldGun' }
        ]
      },
      
      'askForMedicalHelp': {
        title: '医疗支援',
        description: '你向阿萍描述了自己的身体状况和辐射症状。她仔细听完，从柜子里取出一些药物和绷带。"这些应该能帮你缓解症状，但不是长期解决方案。"她熟练地为你处理伤口，注射抗辐射药剂。"在废土上，医疗资源比什么都珍贵。好好珍惜这条命。"',
        healthChange: 1, // 回血事件
        radiationChange: -10, // 减少辐射值
        options: [
          { text: '感谢她并提到蛇哥的防辐射服', nextScene: 'mentionRadSuit' },
          { text: '返回市场中心', nextScene: 'marketCenter' }
        ]
      },
      
      'checkClinicSupplies': {
        title: '诊所物资',
        description: '趁阿萍不注意，你偷偷查看诊所的物资储备。多数药品都锁在铁柜里，但你在角落发现一个开着的急救箱，里面有一些基础医疗用品。正当你考虑是否取走一些时，一个声音从背后响起："在找什么？"阿萍站在你身后，眼神警觉。',
        options: [
          { text: '坦白说想寻找医疗用品', nextScene: 'honestAboutSupplies' },
          { text: '谎称只是好奇看看', nextScene: 'lieAboutSnooping' }
        ]
      },
      
      'honestAboutSupplies': {
        title: '真诚交流',
        description: '"至少你够诚实，"阿萍的表情稍微软化，"在废土上，医疗用品比黄金还珍贵。我不能免费给你，但可以交换。你有什么值得交易的东西吗？或者，你可以帮我完成一项任务来换取一些基础医疗物资。"',
        options: [
          { text: '提议帮她完成任务', nextScene: 'offerToHelpNurse' },
          { text: '提到蛇哥需要防辐射服', nextScene: 'mentionRadSuit' }
        ]
      },
      
      'offerToHelpNurse': {
        title: '医疗援助',
        description: '"很好，"阿萍说道，"我需要人帮忙收集一些特殊的药草，它们生长在旧公园的辐射区。药草呈蓝绿色，有荧光，通常在水源附近生长。小心那里的变异生物，特别是大型昆虫。"她给了你一个小布袋，"把找到的药草放在这里，尽量完整带回来。"',
        item: '采药袋',
        options: [
          { text: '接受任务前往公园', nextScene: 'journeyToPark' },
          { text: '先询问防辐射服的事', nextScene: 'mentionRadSuit' }
        ]
      },
      
      'lieAboutSnooping': {
        title: '引起怀疑',
        description: '"好奇心在这里可能会致命，"阿萍冷冷地说，"下次想看什么，直接问我。"她把急救箱锁上，明显对你失去了一些信任。"如果没有其他事，请离开。这里有真正需要帮助的病人。"',
        faction: 'nurse',
        trustChange: { nurse: -1 }, // 减少对护士的信任
        options: [
          { text: '提到蛇哥需要防辐射服', nextScene: 'mentionRadSuitLowTrust' },
          { text: '离开诊所', nextScene: 'marketCenter' }
        ]
      },
      
      'mentionRadSuitLowTrust': {
        title: '信任危机',
        description: '"蛇哥让你来借防辐射服？"阿萍怀疑地看着你，"我凭什么相信你会把它完好无损地归还？那套装备是我最珍贵的财产之一。"她考虑片刻，"想要我的信任和帮助，你需要先证明自己。东区医院有一批急需的药品，被挖坟人占据。把它们带回来，我就考虑借给你防辐射服。"',
        options: [
          { text: '接受任务前往医院', nextScene: 'acceptHospitalMission' },
          { text: '离开诊所', nextScene: 'marketCenter' }
        ]
      },
      
      'searchForOldGun': {
        title: '寻找老枪',
        description: '你在集市中打听老枪的下落。几个人告诉你，他的移动堡垒——一辆改装的公交车——通常停在集市外围的废弃车场。他是个退役军人，独眼，性格古怪但在危急时刻值得信赖。据说他收集各种实用工具和武器，有时会出售，但价格不菲。',
        options: [
          { text: '前往废弃车场', nextScene: 'abandonedCarLot' }
        ]
      },
      
      'abandonedCarLot': {
        title: '废弃车场',
        description: '车场是一片宽阔的柏油地，堆满了生锈的汽车残骸。在远处，你看到一辆庞大的改装公交车，外部覆盖着金属装甲和各种防护措施，像一座移动堡垒。车前站着一个身材魁梧的老人，灰白的头发扎成一个马尾，右眼戴着黑色眼罩。他正在检查一把看起来经过精心保养的步枪。',
        isArea: true,
        options: [
          { text: '靠近老人', nextScene: 'approachOldGun' },
          { text: '观察四周环境', nextScene: 'surveyCarLot' }
        ]
      },
      
      'surveyCarLot': {
        title: '环顾车场',
        description: '你仔细观察车场环境，注意到几名荷枪实弹的人在公交车周围巡逻，可能是老枪的手下。车场边缘有几个简易帐篷，似乎有人在此临时居住。你还发现一些人在修理车辆，交易物资，俨然形成了一个小型社区。这个区域比看起来要更有组织性，老枪显然拥有一定的影响力。',
        options: [
          { text: '靠近老枪', nextScene: 'approachOldGun' },
          { text: '返回市场', nextScene: 'marketCenter' }
        ]
      },
      
      'approachOldGun': {
        title: '老枪',
        description: '当你接近时，老人立刻察觉，敏捷地转身，步枪半举。"站住，陌生人。"他的声音沉稳有力，带着军人特有的威严。他独眼锐利地打量着你，"有什么事？这里不欢迎闲逛的人。"',
        options: [
          { text: '提到蛇哥推荐你来寻找工具', nextScene: 'mentionSnakeReferral' },
          { text: '直接询问是否出售工具', nextScene: 'askAboutTools' }
        ]
      },
      
      'mentionSnakeReferral': {
        title: '蛇哥的名号',
        description: '"蛇哥？"老枪挑眉，略微放松了警惕，"那小子还活着啊。我们有段时间没见面了。"他放下步枪，示意你跟他到公交车边，"他需要什么工具？别告诉我他又想修那些该死的地下管道。那地方危险得很，特别是军事区的部分。"',
        faction: 'old_gun',
        trustChange: { old_gun: 1 }, // 增加对老枪的信任
        options: [
          { text: '解释水源问题和军事基地计划', nextScene: 'explainWaterPlan' },
          { text: '询问工具的价格', nextScene: 'askToolPrice' }
        ]
      },
      
      'askAboutTools': {
        title: '直接交易',
        description: '"工具？"老枪警惕地眯起独眼，"我确实有不少好东西，但不是随便卖给陌生人的。"他上下打量你，"你有什么值钱的东西交换？或者能提供什么服务？在废土上，没有免费的午餐。"',
        options: [
          { text: '提供物品交换', nextScene: 'offerItemsForTools' },
          { text: '提议帮他完成任务', nextScene: 'offerToHelpOldGun' }
        ]
      },
      
      'offerItemsForTools': {
        title: '物品交换',
        description: '你展示了自己的物资，希望能换取工具。老枪对你的手摇手电筒产生了兴趣。"这东西不错，在夜间行动时很有用，"他评估道，"但还不够换我的顶级工具套装。如果你能再加上那把手枪，或许我们可以达成交易。"',
        options: [
          { text: '交出手电筒和手枪', nextScene: 'tradeForTools', requiredItem: '生锈手枪' },
          { text: '提议帮他完成任务代替物品交换', nextScene: 'offerToHelpOldGun' }
        ]
      },
      
      'tradeForTools': {
        title: '成功交易',
        description: '你交出了手电筒和手枪。老枪仔细检查了武器，满意地点头。"成交。"他进入公交车，不久后返回，手里拿着一个皮质工具卷，里面装有各种专业维修工具。"这套工具曾帮我在最艰难的时刻修好了车辆，希望对蛇哥也有用。记得告诉他欠我一次。"',
        removeItem: '手摇手电筒',
        removeItem: '生锈手枪',
        item: '高级工具套装',
        options: [
          { text: '感谢老枪并离开', nextScene: 'leaveOldGun' },
          { text: '询问老枪对军事基地的了解', nextScene: 'askAboutMilitaryBase' }
        ]
      },
      
      'offerToHelpOldGun': {
        title: '提供服务',
        description: '"帮我？"老枪略显惊讶，随后思考片刻，"好吧，确实有件事需要有人去做。我的车队最近被一群自称\'轮胎帮\'的暴徒袭击，他们抢走了一箱珍贵的零部件。据线报，这些人藏在西边的废弃轮胎厂。把我的东西拿回来，我就借你需要的工具。"',
        options: [
          { text: '接受任务前往轮胎厂', nextScene: 'journeyToTireFactory' },
          { text: '询问轮胎帮的情况', nextScene: 'askAboutTireGang' }
        ]
      },
      
      'askAboutTireGang': {
        title: '轮胎帮情报',
        description: '"轮胎帮是群疯子，"老枪咒骂道，"头上缠着橡胶条作为标志，迷信轮胎和橡胶能够抵御辐射。他们占据了旧轮胎工厂，靠抢劫商队为生。"他顿了顿，"他们首领叫‘橡胶王’，以前是个普通技工，现在自称什么‘轮胎之神选民’。当心点，他们不止是暴徒，更像个诡异的邪教。"',
        options: [
          { text: '接受任务前往轮胎厂', nextScene: 'journeyToTireFactory' },
          { text: '返回市场再考虑一下', nextScene: 'marketCenter' }
        ]
      },
      
      'explainWaterPlan': {
        title: '计划揭露',
        description: '你向老枪解释了集市缺水的危机和前往军事基地寻找水源的计划。他听完后摇头叹息："那地方危险得很，不只是辐射，还有自动防御系统和天知道什么变异生物。"他沉思片刻，"但水源问题确实紧迫...好吧，我可以提供工具，甚至可能还有些军事基地的旧图纸。但我需要你帮个忙作为交换。"',
        options: [
          { text: '询问他需要什么帮助', nextScene: 'askWhatHelpNeeded' },
          { text: '询问军事基地的情况', nextScene: 'askAboutMilitaryBase' }
        ]
      },
      
      'askToolPrice': {
        title: '谈判交易',
        description: '"价格？"老枪冷笑一声，"不是钱的问题，小子。在这个世界，物物交换和互帮互助才是生存之道。"他掏出一把折叠刀在手中把玩，"如果是给蛇哥用的工具，那必须是最好的。我可以借给他，但作为交换，你需要帮我解决一个问题——轮胎帮抢了我的一箱零部件，把它找回来。"',
        options: [
          { text: '接受任务前往轮胎厂', nextScene: 'journeyToTireFactory' },
          { text: '询问是否有其他交换方式', nextScene: 'askForAlternative' }
        ]
      },
      
      'askForAlternative': {
        title: '寻找替代方案',
        description: '"其他方式？"老枪摩挲着下巴的胡须，"我喜欢实际行动胜过空谈的人..."他突然想到什么，"不过，如果你有抗辐射药或者高级医疗用品，我可以考虑直接交换。我的一个手下受了重伤，需要好药品。"',
        options: [
          { text: '提供抗辐射药', nextScene: 'offerRadaway', requiredItem: '防辐射药片' },
          { text: '接受前往轮胎厂的任务', nextScene: 'journeyToTireFactory' },
          { text: '返回市场再考虑', nextScene: 'marketCenter' }
        ]
      },
      
      'offerRadaway': {
        title: '药物交换',
        description: '你拿出抗辐射药片，老枪的眼中闪过一丝惊喜。"这正是我需要的！"他接过药品，仔细检查。"成交。"他很快回到公交车中，拿出一个精心保养的工具套装。"这是我最好的工具之一，希望蛇哥能好好利用。"他顿了顿，"告诉他，军事基地的事小心行事，那地方不只有辐射这么简单。"',
        removeItem: '防辐射药片',
        item: '高级工具套装',
        options: [
          { text: '询问军事基地的情况', nextScene: 'askAboutMilitaryBase' },
          { text: '感谢并离开', nextScene: 'leaveOldGun' }
        ]
      },
      'askAboutMilitaryBase': {
        title: '军事基地的秘密',
        description: '老枪的独眼中闪过一丝复杂的神情。"那个基地...我曾在那里服役。"他低声道，"表面上是研究防辐射技术，但地下发生的事...不只是净水系统那么简单。"他从口袋中取出一张褪色的照片，上面是身穿军装的年轻老枪和其他士兵。"记住，那里的自动防御系统仍然活跃，还有...如果你见到任何实验室设备，别碰，明白吗？"',
        item: '军事基地地图',
        options: [
          { text: '询问更具体的危险', nextScene: 'askMoreDangers' },
          { text: '感谢老枪并离开', nextScene: 'leaveOldGun' }
        ]
      },
      
      'askMoreDangers': {
        title: '隐藏的威胁',
        description: '"具体危险？"老枪苦笑着摇头，"自动炮塔、辐射热点，这些都是小问题。真正的危险在地下三层...我们称之为\'深渊\'。那里进行的实验..."他突然停住，仿佛回忆起了什么可怕的事情，"总之，别下到三层以下。如果你非要去，记得随时准备撤离，看到任何不明生物立刻跑，不要恋战。"他紧紧抓住你的肩膀，"答应我。"',
        options: [
          { text: '郑重承诺', nextScene: 'promiseSafety' },
          { text: '敷衍了事', nextScene: 'vaguePromise' }
        ]
      },
      
      'promiseSafety': {
        title: '真诚承诺',
        description: '看到你的郑重表情，老枪略微放松，"好孩子...你让我想起了我曾经的战友。"他递给你一个小型电子装置，"这是基地安全通行卡，能解锁一些区域。是从一个...不幸的朋友那里得到的。用它进入主控室，那里应该有净水系统的启动装置。"他的独眼里闪过一丝悲伤，"别辜负它的前主人。"',
        item: '安全通行卡',
        faction: 'old_gun',
        trustChange: { old_gun: 1 },
        options: [
          { text: '感谢他并离开', nextScene: 'leaveOldGun' }
        ]
      },
      
      'vaguePromise': {
        title: '敷衍回应',
        description: '老枪注意到你的敷衍态度，眉头紧锁。"你不懂那里的危险..."他叹了口气，"我想我不能阻止你，但至少要让你有点准备。"他递给你一张手绘地图，上面标注着基地的主要区域和几个危险点。"如果你足够聪明，就该知道什么地方不该去。记住，有些秘密最好永远留在黑暗中。"',
        item: '手绘基地草图',
        options: [
          { text: '感谢他并离开', nextScene: 'leaveOldGun' }
        ]
      },
      
      'leaveOldGun': {
        title: '告别老枪',
        description: '你向老枪道别，他点点头，目光复杂。"在这片废土上活下去，孩子。别太信任任何人，包括我。"他转身走向他的移动堡垒，背影显得有些孤独。临走前，他回头说了最后一句话："如果你在军事基地找到了什么...关于那场灾难真相的东西，回来告诉我。"',
        options: [
          { text: '返回铁锈集市', nextScene: 'marketCenter' },
          { text: '直接前往轮胎厂', nextScene: 'journeyToTireFactory', requiredItem: '高级工具套装' }
        ]
      },
      
      'journeyToTireFactory': {
        title: '荒野跋涉',
        description: '前往轮胎厂的路途异常艰难。一场酸雨刚刚过去，空气中弥漫着刺鼻的化学气味，地面上的积水泛着诡异的蓝绿色荧光。道路两旁的植被大多已经干枯扭曲，偶尔可见一些异常茂盛的变异植物。远处废弃工厂的轮廓在橙红色的天空下显得格外阴森。',
        radiationChange: 8,
        options: [
          { text: '小心前进，避开积水区', nextScene: 'avoidPuddles' },
          { text: '加快速度穿越，尽量减少暴露时间', nextScene: 'rushThroughWasteland' }
        ]
      },
      
      'avoidPuddles': {
        title: '谨慎前行',
        description: '你谨慎地避开了可能含有高辐射的积水区域，选择了一条较长但相对安全的路线。途中，你遇到一个重伤的旅行者，他被掩埋在倒塌的混凝土块下。他虚弱地恳求你帮助，声音几乎微不可闻。',
        options: [
          { text: '停下来帮助受伤的旅行者', nextScene: 'helpInjuredTraveler' },
          { text: '无视他继续赶路', nextScene: 'ignoreTraveler' }
        ]
      },
      
      'helpInjuredTraveler': {
        title: '伸出援手',
        description: '你决定帮助这位陌生人。用尽全力，你终于移开了压在他腿上的混凝土块，然后用急救包处理了他的伤口。"谢谢你..."他气若游丝地说，"在这个世界上，善良比净水还稀缺。"他从口袋里掏出一个小瓶子，"这是我珍藏的抗辐射药，现在是你的了。我叫马克，如果你去轮胎厂，小心点，那群疯子最近更危险了。"',
        healthChange: -1,
        item: '强效抗辐射药',
        options: [
          { text: '询问更多关于轮胎帮的信息', nextScene: 'askMarkAboutTireGang' },
          { text: '道别继续前进', nextScene: 'arriveAtTireFactory' }
        ]
      },
      
      'askMarkAboutTireGang': {
        title: '宝贵情报',
        description: '"轮胎帮..."马克咳嗽了几声，"他们的首领‘橡胶王’最近找到了一个战前的辐射屏蔽装置，现在他更加确信橡胶能抵御辐射的邪说了。他强迫所有成员穿戴橡胶制品，连呼吸都要通过橡胶管道过滤。"他痛苦地移动身体，"有条秘密通道，从工厂东侧的排水沟可以进入。我曾经...是他们的一员，直到质疑了首领的教义。"',
        options: [
          { text: '感谢情报并继续前进', nextScene: 'arriveAtTireFactory' }
        ]
      },
      
      'ignoreTraveler': {
        title: '残酷抉择',
        description: '你选择无视受伤者的求助，继续前行。随着距离增加，他的呼救声逐渐消失在荒原的风中。这是一个残酷的世界，停下来帮助陌生人往往意味着将自己置于危险之中。尽管如此，一股难以名状的内疚感萦绕在你心头，跟随你来到轮胎厂的大门前。',
        faction: 'wasteland',
        trustChange: { wasteland: -1 },
        options: [
          { text: '抵达轮胎厂', nextScene: 'arriveAtTireFactory' }
        ]
      },
      
      'rushThroughWasteland': {
        title: '疾速穿越',
        description: '你加快脚步，直线穿过废土。虽然节省了时间，但你不得不踏过几处看起来相当可疑的辐射积水。行进过程中，一阵突如其来的晕眩和恶心感袭来，你的辐射计发出刺耳的警报声。幸运的是，你终于看到了轮胎厂的围墙，但你的健康状况已经受到了影响。',
        healthChange: -1,
        radiationChange: 15,
        options: [
          { text: '服用抗辐射药', nextScene: 'takeMedicineBeforeFactory', requiredItem: '防辐射药片' },
          { text: '忍受不适，抵达工厂', nextScene: 'arriveAtTireFactorySick' }
        ]
      },
      
      'takeMedicineBeforeFactory': {
        title: '及时用药',
        description: '你迅速服下抗辐射药片，药物立即开始发挥作用，缓解了辐射引起的症状。随着视线重新变得清晰，你观察着面前的轮胎工厂。这座曾经的工业建筑被改造成一座奇怪的堡垒，各种轮胎堆叠在围墙上，入口处悬挂着用轮胎内胎制成的怪异装饰物，还有一面旗帜，上面画着一个穿着橡胶装的人形，周围环绕着辐射符号。',
        radiationChange: -12,
        removeItem: '防辐射药片',
        options: [
          { text: '正门接近', nextScene: 'frontGateApproach' },
          { text: '寻找马克提到的秘密入口', nextScene: 'seekSecretEntrance', requiredItem: '强效抗辐射药' }
        ]
      },
      
      'arriveAtTireFactorySick': {
        title: '带病抵达',
        description: '你强忍着辐射病的不适，跌跌撞撞地来到轮胎工厂外。头痛欲裂、视线模糊，辐射病的症状越发明显。你靠在一块混凝土掩体后，勉强观察着工厂情况。守卫们全副武装，身穿由轮胎和橡胶条制成的奇怪盔甲。他们似乎正在进行某种仪式，围绕着一堆燃烧的轮胎跳舞。你的状态不适合正面冲突。',
        healthChange: -1,
        options: [
          { text: '暂时撤退寻找掩护和药物', nextScene: 'retreatForMedicine' },
          { text: '忍耐不适强行潜入', nextScene: 'infiltrateWhileSick' }
        ]
      },
      
      'retreatForMedicine': {
        title: '战术撤退',
        description: '你明智地选择了撤退，在工厂附近的废弃房屋中找到临时庇护。这里曾经可能是工厂工人的宿舍，现在只剩下残垣断壁。休息一会后，你在房屋废墟中翻找，幸运地发现了一个急救箱，里面有一些基础医疗用品和半瓶抗辐射药物。服用后，你感觉好多了。',
        healthChange: 1,
        radiationChange: -10,
        item: '工厂平面图',
        options: [
          { text: '重新接近工厂', nextScene: 'reapproachFactory' }
        ]
      },
      
      'reapproachFactory': {
        title: '再度逼近',
        description: '恢复体力后，你再次接近轮胎工厂。这次你更加小心，同时也有了更多观察的机会。你注意到工厂后方有一个较少人把守的区域，可能是个潜入点。此外，在你找到的工厂平面图上，标记着几个可能的入口，包括一个通风管道和一个废弃的装卸区。',
        options: [
          { text: '选择后方潜入', nextScene: 'rearEntryInfiltration' },
          { text: '尝试通风管道', nextScene: 'ventilationDuct' }
        ]
      },
      
      'infiltrateWhileSick': {
        title: '强撑潜入',
        description: '忍受着剧烈的不适，你决定继续任务。利用守卫参与仪式的时机，你摇摇晃晃地穿过外围防线。视线模糊和手脚发软让简单的动作变得异常困难。突然，一阵剧烈的咳嗽袭来，引起了一名巡逻守卫的注意。他转身朝你的方向走来，手中举着一把自制的钉锤。',
        healthChange: -1,
        options: [
          { text: '尝试隐藏', nextScene: 'hideFromGuard' },
          { text: '准备迎战', nextScene: 'confrontGuardSick' }
        ]
      },
      
      'hideFromGuard': {
        title: '惊险藏匿',
        description: '你迅速躲进附近的废弃车辆后方，屏住呼吸。守卫缓慢地走过，检查着周围环境。"奇怪，我明明听到了声音，"他自言自语道，随后继续巡逻。你松了一口气，但突然注意到你藏身的汽车后备箱半开着，里面有一些可能有用的物品。',
        options: [
          { text: '检查后备箱', nextScene: 'checkTrunkItems' },
          { text: '不冒险，继续潜入', nextScene: 'continueInfiltration' }
        ]
      },
      
      'checkTrunkItems': {
        title: '意外收获',
        description: '你小心翼翼地检查车辆后备箱，发现里面有一套似乎是轮胎帮成员使用的橡胶装备，包括一件有着奇特图案的橡胶外套和一个变形的防毒面具。这可能是你伪装潜入的绝佳道具。此外，你还找到一个小型医疗包，里面有一支肾上腺素注射器。',
        item: '轮胎帮伪装',
        healthChange: 1,
        options: [
          { text: '穿上伪装', nextScene: 'wearDisguise' },
          { text: '只拿医疗物品，继续潜入', nextScene: 'continueInfiltration' }
        ]
      },
      
      'wearDisguise': {
        title: '身份伪装',
        description: '你穿上了橡胶外套和防毒面具，立刻变成了一名轮胎帮成员的样子。这套装备散发着一股刺鼻的橡胶味，但似乎能提供一定的辐射防护。正当你调整装备时，两名帮派成员走过，向你点头致意。"橡胶保护我们，兄弟。"其中一个说道。你模仿他们的姿态回应，成功地混入了他们的行列。',
        radiationChange: -5,
        options: [
          { text: '跟随他们进入主厂房', nextScene: 'enterMainFactory' },
          { text: '离开他们，自行探索', nextScene: 'exploreAloneDisguised' }
        ]
      },
      
      'continueInfiltration': {
        title: '谨慎前进',
        description: '你放弃了检查后备箱，继续小心翼翼地前进。轮胎厂内部布局错综复杂，到处堆积着废旧轮胎和机械部件。你看到几名工人在一个大型熔炉旁工作，将轮胎熔化后注入模具，制造某种装备。空气中弥漫着刺鼻的橡胶燃烧味，让你的头痛加剧。',
        healthChange: -1,
        options: [
          { text: '尝试接近存放部件的区域', nextScene: 'approachPartsStorage' },
          { text: '观察工人，了解更多信息', nextScene: 'observeWorkers' }
        ]
      },
      
      'arriveAtTireFactory': {
        title: '轮胎厂外围',
        description: '你终于抵达了轮胎厂。这座曾经的工业建筑现在被改造成一个荒诞的堡垒。围墙由堆叠的轮胎构成，上面布满尖刺和铁丝网。入口处站着几名警惕的守卫，他们穿着由轮胎橡胶制成的奇怪盔甲，戴着类似防毒面具的呼吸装置。工厂烟囱冒出黑色浓烟，空气中弥漫着燃烧橡胶的刺鼻气味。',
        options: [
          { text: '正面接近大门', nextScene: 'frontGateApproach' },
          { text: '寻找其他入口', nextScene: 'lookForAlternateEntry' }
        ]
      },
      
      'frontGateApproach': {
        title: '正门对峙',
        description: '你走向主大门，立即引起了守卫的注意。他们举起武器对准你，其中一人大喊："站住！这里是轮胎帮的神圣领地。说出你的来意，外来者！"你注意到他们的武器大多是改装的工业工具，如钢管焊接的钉锤和钢丝加固的棍棒，但看起来同样致命。',
        options: [
          { text: '声称是来交易的商人', nextScene: 'claimMerchant' },
          { text: '表示想加入轮胎帮', nextScene: 'claimJoining' },
          { text: '直接提及被偷的零部件', nextScene: 'mentionStolenParts' }
        ]
      },
      
      'claimMerchant': {
        title: '伪装商人',
        description: '你平静地表示自己是一名旅行商人，希望与轮胎帮交易一些物资。守卫们互相对视，然后其中一人说："商人？证明给我们看。拿出你的货物。"这是个危险的谎言，但现在退缩已经太迟。你需要展示一些有价值的物品来支撑你的说辞。',
        options: [
          { text: '展示手摇手电筒', nextScene: 'showFlashlight', requiredItem: '手摇手电筒' },
          { text: '展示医疗用品', nextScene: 'showMedicalSupplies', requiredItem: '急救包' },
          { text: '承认谎言', nextScene: 'admitLying' }
        ]
      },
      
      'showFlashlight': {
        title: '吸引注意',
        description: '你拿出手摇手电筒，在守卫面前演示其功能。他们显露出明显的兴趣，尤其是当你解释这种设备在没有电力的废土上有多珍贵时。"不错的玩意儿，"领头的守卫说，"橡胶王可能会感兴趣。"他们让你通过，但没收了手电筒，承诺带你见他们的首领。',
        removeItem: '手摇手电筒',
        options: [
          { text: '跟随守卫进入工厂', nextScene: 'escortedInside' }
        ]
      },
      
      'showMedicalSupplies': {
        title: '医疗交易',
        description: '你展示了急救包中的医疗用品。看到绷带和药物，守卫们的态度明显软化。"医疗物资总是受欢迎的，"一名守卫说道，显然在考虑让你通过。但另一名守卫低声和他交谈后，表情变得警惕。"我们会带你见杰克医生，他负责医疗物资。但你的背包要留在这里，等你离开时归还。"',
        options: [
          { text: '同意条件', nextScene: 'agreeToTerms' },
          { text: '拒绝交出背包', nextScene: 'refuseBagCheck' }
        ]
      },
      
      'agreeToTerms': {
        title: '被迫妥协',
        description: '你同意了守卫的条件，交出背包。一名守卫仔细检查了你的物品，随后你被带往一个改装的诊所区域。这里曾经可能是工厂的医务室，现在堆满了从各处搜刮来的医疗设备。一个戴着橡胶手套的瘦高男子转向你，眼镜片后的眼睛充满审视。"我是杰克，你带了什么东西给我们？"',
        options: [
          { text: '展示医疗物资并询问零部件', nextScene: 'negotiateWithDoctor' },
          { text: '观察诊所环境寻找线索', nextScene: 'observeClinic' }
        ]
      },
      
      'negotiateWithDoctor': {
        title: '与医生交易',
        description: '你展示了急救包中的物品，杰克医生仔细检查后点点头。"确实是好东西，尤其是这些抗生素。"他评价道。趁机，你提到你听说他们这里可能有一些机械零部件，你希望交易一些。杰克疑惑地看着你："零部件？那是工程队的事情，不过...最近确实来了一批新物资，从一支商队那里...‘获得’的。"',
        options: [
          { text: '询问如何找到工程队', nextScene: 'askAboutEngineers' },
          { text: '暗示零部件是偷来的', nextScene: 'hintAtStolenGoods' }
        ]
      },
      
      'askAboutEngineers': {
        title: '寻找工程队',
        description: '杰克医生告诉你工程队在工厂的东侧车间，由一个叫"扳手"的人领导。"告诉他是我派你去的，他会接待你。"他还提到最近工程队正忙于一个大项目，为首领"橡胶王"建造某种大型装置。当你准备离开时，杰克叫住你："等等，作为医疗物资的交换，拿着这个。"他递给你一支装有黄色液体的注射器，"遇到危险时使用，它能暂时提升你的反应能力和力量。"',
        item: '强化注射剂',
        options: [
          { text: '前往东侧车间', nextScene: 'easternWorkshop' }
        ]
      },
      
      'easternWorkshop': {
        title: '工程车间',
        description: '东侧车间是一个巨大的空间，布满各种机械设备和工作台。空气中充满金属磨削和电焊的气味。几名工人正在忙碌，他们穿着比其他帮派成员更专业的工作服，但同样装饰着橡胶和轮胎元素。房间中央是一个巨大的装置，看起来像某种加压室或净化舱。一个肌肉发达、手臂上有扳手纹身的男子正在监督工作。',
        options: [
          { text: '接近"扳手"', nextScene: 'approachWrench' },
          { text: '观察巨型装置', nextScene: 'examineDevice' }
        ]
      },
      
      'approachWrench': {
        title: '工程队领袖',
        description: '"扳手"注意到你的接近，擦了擦满是机油的手。"杰克派你来的？"他的声音出奇地温和，与他粗犷的外表形成反差，"我们这里不欢迎闲杂人等，但如果你懂机械，也许能帮上忙。"他指向一个堆满零件的角落，"那些是上周从一支商队搞来的物资，还没来得及整理。我猜你是来交易的？"',
        options: [
          { text: '提及老枪的零部件', nextScene: 'mentionOldGunsPartsToWrench' },
          { text: '询问他们在建造什么', nextScene: 'askAboutProject' }
        ]
      },
      
      'mentionOldGunsPartsToWrench': {
        title: '道出真相',
        description: '你决定坦承来意，告诉"扳手"你是为了找回老枪被抢的零部件。听到老枪的名字，他的表情明显变化。"老枪？那个独眼老家伙还活着啊..."他沉思片刻，"那批物资是首领下令抢的，我只负责技术工作。"他压低声音，"老实说，我不赞成这种行为。那老头在废土上帮助了不少人，包括我妹妹。"',
        options: [
          { text: '请求他的帮助', nextScene: 'askWrenchForHelp' },
          { text: '提出交易条件', nextScene: 'offerDealToWrench' }
        ]
      },
      
      'askWrenchForHelp': {
        title: '寻求内应',
        description: '"我想帮你，真的，"扳手低声说，"但事情不那么简单。那些零部件现在在首领的私人仓库里，有重兵把守。"他四下张望确保没人偷听，"不过...如果你能帮我一个忙，我可以想办法让你进去。我妹妹生病了，需要特殊药物，就是杰克给你的那种。如果你能再弄到两支，我就帮你打开通往仓库的小门。"',
        options: [
          { text: '接受任务寻找药物', nextScene: 'acceptMedicineMission' },
          { text: '提议直接行动', nextScene: 'suggestDirectAction' }
        ]
      },
      
      'acceptMedicineMission': {
        title: '医疗援助',
        description: '你同意帮助扳手寻找药物。他感激地点点头，告诉你杰克医生在诊所后面有个秘密药品储藏室，但需要钥匙才能进入。"他总是把钥匙挂在颈上的链子里。你可以试着\\\'借用\\\'一下，或者找到其他方法。"他给了你一张工厂的简易地图，上面标记了几个重要位置。"小心点，被抓到的话，我可帮不了你。"',
        item: '工厂内部图',
        options: [
          { text: '返回诊所寻找药物', nextScene: 'returnToClinicForMedicine' }
        ]
      },
      
      'returnToClinicForMedicine': {
        title: '返回诊所',
        description: '你回到医疗区，发现杰克医生正在给一名工人处理烧伤。他的钥匙链明显地挂在脖子上，反射着昏暗的灯光。诊所里还有两名助手在整理物资，但他们似乎正准备离开去吃饭。这可能是你的机会，但也存在风险。',
        options: [
          { text: '等待合适时机偷钥匙', nextScene: 'waitForOpportunity' },
          { text: '假装不适请求治疗', nextScene: 'feignIllness' }
        ]
      },
      
      'waitForOpportunity': {
        title: '耐心等待',
        description: '你在诊所附近徘徊，假装对医疗海报感兴趣。如你所料，两名助手很快离开了。杰克处理完伤员后，被紧急呼叫到另一个区域。在他匆忙离开时，你注意到他把钥匙忘在了桌上。这是个冒险的机会，但时间紧迫。',
        options: [
          { text: '迅速拿取钥匙', nextScene: 'takeKeyQuickly' },
          { text: '检查是否有陷阱', nextScene: 'checkForTraps' }
        ]
      },
      
      'takeKeyQuickly': {
        title: '瞬间抉择',
        description: '你迅速抓起钥匙，心跳加速。突然，门口出现一个身影——不是杰克，而是一个搬运工，来取一箱绷带。他似乎没注意到你的行动，但你需要立即做出反应。',
        options: [
          { text: '假装是医生助手', nextScene: 'pretendToBeAssistant' },
          { text: '藏起钥匙迅速离开', nextScene: 'hideKeyAndLeave' }
        ]
      },
      
      'pretendToBeAssistant': {
        title: '临场应变',
        description: '"杰克医生让我整理一下这里，"你镇定地说，同时把钥匙滑入口袋。搬运工点点头，拿起箱子就走。你松了口气，迅速找到储藏室门，成功开启。里面整齐摆放着各种药物和医疗用品，包括强化注射剂。你拿了两支，锁好门，把钥匙放回原处，然后离开诊所，没有人注意到这短暂的入侵。',
        item: '强化注射剂',
        options: [
          { text: '返回找扳手', nextScene: 'returnToWrench' }
        ]
      },
      
      'returnToWrench': {
        title: '履行约定',
        description: '带着获得的强化注射剂，你回到工程车间。扳手正专注于工作，看到你回来，他悄悄示意你跟他到一个角落。"你真的做到了？"他惊讶地低语，接过药剂后，眼中闪过感激的光芒。"谢谢你，这会救我妹妹的命。"他递给你一张折叠的纸，"这是通往首领仓库的小门钥匙和地图。现在大部分人都在食堂，是行动的好时机。记住，如果被抓，别提我的名字。"',
        removeItem: '强化注射剂',
        item: '仓库钥匙',
        options: [
          { text: '前往首领仓库', nextScene: 'headToLeaderWarehouse' }
        ]
      },
      
      'headToLeaderWarehouse': {
        title: '潜入仓库',
        description: '按照扳手的指示，你找到了一条鲜为人知的走廊，通向工厂后部的仓库区域。这里的警卫确实比其他区域少，但你仍需小心。仓库门被一把沉重的挂锁锁着，你试着用钥匙开启，成功了！推开门，你看到一个宽敞的仓库，堆满了各种物资：武器、食物、医疗用品，还有各种机械零部件。现在你需要在这些杂物中找到老枪的箱子。',
        options: [
          { text: '系统搜索仓库', nextScene: 'searchWarehouseMethodically' },
          { text: '迅速翻找明显的箱子', nextScene: 'quicklySearchObviousContainers' }
        ]
      },
      
      'searchWarehouseMethodically': {
        title: '彻底搜寻',
        description: '你决定有条不紊地搜索仓库，检查每个可能存放零部件的区域。经过二十分钟的仔细寻找，你在角落里发现了一个带有老枪车队标志的金属箱。箱内正是老枪所描述的零部件：精密的引擎部件、过滤系统和一些看起来像是武器组件的物品。箱子有点重，但你应该能搬动它。就在这时，你听到了接近的脚步声。',
        item: '零部件箱',
        options: [
          { text: '躲藏起来', nextScene: 'hideInWarehouse' },
          { text: '尝试立刻离开', nextScene: 'tryToEscapeImmediately' }
        ]
      },
      
      'hideInWarehouse': {
        title: '紧急藏匿',
        description: '你迅速将箱子抱在怀中，躲到一堆大型轮胎后面。门开了，两名轮胎帮成员走进来，他们似乎在寻找什么特定物品。"首领说那个新装置需要更多的密封圈，"其中一人说道，"应该在那边的架子上。"他们走向仓库另一端，背对着你，给了你可能逃脱的机会。',
        options: [
          { text: '乘机悄悄离开', nextScene: 'sneakOutDuringDistraction' },
          { text: '继续等待他们离开', nextScene: 'waitForThemToLeave' }
        ]
      },
      
      'sneakOutDuringDistraction': {
        title: '巧妙逃脱',
        description: '你抓住机会，抱着零部件箱轻手轻脚地移向出口。就在你几乎要成功离开时，箱子里的一个金属部件碰到了门框，发出清脆的碰撞声。一名帮派成员转过头来："嘿！你在那里干什么？"他喊道，迅速向你移动。情况紧急，你需要立刻决断。',
        options: [
          { text: '放下箱子投降', nextScene: 'surrenderWithParts' },
          { text: '抱着箱子拔腿就跑', nextScene: 'runWithTheBox' }
        ]
      },
      
      'runWithTheBox': {
        title: '负重狂奔',
        description: '你顾不上回应，抱紧箱子转身就跑。身后传来警报声和喊叫，但你已经冲进了工厂的走廊迷宫。凭借工厂内部图，你七拐八拐地往出口方向移动。一路上警报声不断，你能听到越来越多的脚步声在附近回荡。转过一个拐角，你发现前方不远处有个小型维修通道，可以直接通往外部。',
        options: [
          { text: '冲向维修通道', nextScene: 'dashForMaintenanceTunnel' },
          { text: '寻找隐蔽处暂时躲避', nextScene: 'findHidingSpot' }
        ]
      },
      
      'dashForMaintenanceTunnel': {
        title: '逃出生天',
        description: '你咬牙冲向维修通道，身后的追兵越来越近。通道入口狭窄，勉强能让一人通过。你艰难地挤进去，金属箱刮擦着两侧墙壁发出刺耳声音。在黑暗中跌跌撞撞前进，你终于看到了尽头的微光。当你从管道中爬出来，发现自己已经在工厂外围的废墟中。虽然你成功逃脱，但这次行动无疑激怒了轮胎帮。现在，回到老枪那里才是最重要的。',
        options: [
          { text: '返回寻找老枪', nextScene: 'returnToOldGun' }
        ]
      },
      
      'returnToOldGun': {
        title: '任务完成',
        description: '经过一段紧张的旅程，你终于带着零部件箱回到了老枪的移动堡垒。看到箱子，老枪的独眼中闪过惊喜，随后是深深的感激。"你真的做到了，"他接过箱子仔细检查内容，"所有部件都在，这对我们的生存至关重要。"他从公交车里取出一套专业工具套装，郑重地交给你。"这是给你和蛇哥的，足够修复那些管道了。另外..."他犹豫了一下，又拿出一把保养良好的手枪，"拿着这个，废土上比轮胎帮更危险的东西多着呢。"',
        item: '高级工具套装',
        item: '老枪的左轮',
        options: [
          { text: '向老枪告别', nextScene: 'bidFarewellToOldGun' }
        ]
      },
      
      'bidFarewellToOldGun': {
        title: '深厚情谊',
        description: '"谢谢你，陌生人。"老枪的声音中带着少有的温暖，"如果你和蛇哥真的要去那个军事基地...记住我说的话。有些秘密应该永远埋藏。"他顿了顿，"不过，如果你坚持要去，祝你好运。这个世界需要更多像你这样愿意冒险帮助他人的人。"他向你敬了一个军礼，随后转身走向他的移动堡垒。在这片荒凉的废土上，你似乎找到了一个可靠的盟友。',
        options: [
          { text: '返回铁锈集市找蛇哥', nextScene: 'returnToSnake' }
        ]
      },
      
      'returnToSnake': {
        title: '归还工具',
        description: '回到铁锈集市的净水站，你找到了正在检查水箱的蛇哥。看到你带回的高级工具套装，他明显松了一口气。"老枪果然没让我失望，"他仔细检查工具后说道，"这些足够我修复军事基地的管道阀门了。现在我们只需要阿萍的防辐射服..."他停顿了一下，注意到你疲惫但坚定的神情，"你已经准备好冒这个险了吗？那地方不是一般的危险。"',
        options: [
          { text: '确认已经准备好', nextScene: 'confirmReady' },
          { text: '询问是否还需要其他准备', nextScene: 'askForMorePreparations' }
        ]
      },
      
      // 续写东区医院任务线
      'journeyToHospital': {
        title: '前往东区医院',
        description: '离开铁锈集市，你踏上了前往东区医院的旅程。这条路穿过一片辐射较重的区域，空气中弥漫着一种金属般的怪味。远处，一座褪色的白色建筑轮廓浮现在地平线上，那就是东区医院。接近时，你注意到整个医院外围被临时围栏和警示标志环绕，明显是挖坟人的领地标记。',
        radiationChange: 10,
        options: [
          { text: '正门接近', nextScene: 'approachHospitalFront' },
          { text: '寻找后门或紧急入口', nextScene: 'lookForHospitalBackEntrance' }
        ]
      },
      
      'approachHospitalFront': {
        title: '医院正门',
        description: '你向医院正门走去，那里有两名挖坟人把守。他们穿着拼凑的防护服，背上斜挎着铁铲，看起来既是工具也是武器。看到你接近，他们立即警惕起来，其中一人举起一把改装的猎枪。"站住！这里是挖坟人的地盘，闲杂人等不得入内！"他大声警告道。你注意到他们的防护服上画着诡异的辐射崇拜符号。',
        options: [
          { text: '展示阿萍给的医疗标识', nextScene: 'showMedicalEmblem', requiredItem: '医疗标识' },
          { text: '声称自己有医疗技能', nextScene: 'claimMedicalSkills' },
          { text: '撒谎说自己也是挖坟人', nextScene: 'lieAboutBeingGraveDigger' }
        ]
      },
      
      'showMedicalEmblem': {
        title: '医者身份',
        description: '你举起阿萍给你的医疗标识，红十字在阳光下清晰可见。守卫们明显犹豫了，互相交换了眼神。"你是医生？"其中一人问道，语气软化了一些，"我们这里确实需要医疗帮助...但首领不喜欢外人。"片刻考虑后，他放下武器，"跟我来，但别做任何愚蠢的事。"',
        options: [
          { text: '跟随守卫进入', nextScene: 'followGuardIntoHospital' }
        ]
      },
      // 假扮医生却没人买账
    'claimMedicalSkills': {
        title: '自称医术',
        description: '你声称自己精通各种医疗急救，但守卫面露怀疑。“没见过你处理过辐射病，起码要看到点证据。”他失望地挥手，“说谎可不是个好主意。”随后他用铲柄敲了你一下，你顿时头晕。',
        healthChange: -1,
        options: [
        { text: '捂着脑袋狼狈离开', nextScene: 'forcedOutOfHospital' }
        ]
    },
    // 冒充挖坟人遭遇暴击
    'lieAboutBeingGraveDigger': {
        title: '冒充挖坟人',
        description: '你谎称自己也是挖坟人，试图混入队伍。守卫冷笑道：“挖坟人不会有这种医疗标识。”当场拔枪朝你肩膀开了一枪，你倒在地上，鲜血染湿了衣襟。',
        healthChange: -1,
        options: [
        { text: '挣扎爬起逃走', nextScene: 'forcedOutOfHospital' }
        ]
    },
    // 私自探问药房
    'askAboutMedicineLocation': {
        title: '询问药房位置',
        description: '你试探性地问药品存放地点，守卫指向地图：“药房在一楼西翼，只有通过指挥中心申请才能进去。”他眼神警告你不要擅自行动。',
        options: [
        { text: '返回指挥中心', nextScene: 'observeHospitalEnvironment' },
        { text: '偷偷下楼', nextScene: 'descendToBasementLit' }
        ]
    },
    // 后门入侵受伤
    'lookForHospitalBackEntrance': {
        title: '寻找后门',
        description: '你沿墙根发现一处破损铁栅栏，试图翻过去时被棘刺割破手臂，鲜血直流。',
        healthChange: -1,
        options: [
        { text: '忍痛继续深入', nextScene: 'descendToBasementDark' },
        { text: '伤口难耐，返回正门', nextScene: 'approachHospitalFront' }
        ]
    },
      
      'followGuardIntoHospital': {
        title: '医院内部',
        description: '守卫带你穿过医院破败的大厅。内部比外面看起来更为混乱，到处是移动的病床、医疗设备和堆积的杂物。几名挖坟人在各个角落忙碌，有的在整理从墓地带回的物品，有的在照顾伤员。空气中弥漫着消毒水和某种奇怪香料的混合气味。守卫将你带到一个曾经是会议室的地方，现在改装成了某种指挥中心。',
        options: [
          { text: '观察周围环境', nextScene: 'observeHospitalEnvironment' },
          { text: '询问药品的位置', nextScene: 'askAboutMedicineLocation' }
        ]
      },
      
      'observeHospitalEnvironment': {
        title: '细致观察',
        description: '趁守卫与其他人交谈的空档，你仔细观察周围环境。指挥中心的墙上贴着医院的平面图，标记了各个区域的用途。你注意到药房位于一楼西翼，而地下室被标记为"圣所"，旁边画着那个诡异的辐射崇拜符号。几名挖坟人看起来病态苍白，手臂上有类似辐射灼伤的痕迹，但他们似乎并不在意，甚至以此为荣。',
        options: [
          { text: '等待守卫回来', nextScene: 'waitForGuardReturn' }
        ]
      },
      
      'waitForGuardReturn': {
        title: '首领接见',
        description: '守卫回来了，身后跟着一个高大的人影。他全身裹在厚重的防护服中，面具后的眼睛炯炯有神。"我是塔洛斯，这个团体的领导者。"他的声音通过面具过滤后显得有些怪异，"听说你是医生？我们确实需要医疗帮助，但我首先需要知道你是谁，为什么来这里。"',
        options: [
          { text: '诚实说明来意', nextScene: 'honestAboutIntentions' },
          { text: '谎称是流浪医生', nextScene: 'pretendToBeWanderingDoctor' }
        ]
      },
      'honestAboutIntentions': {
  title: '坦诚相告',
  description: '你坦白告诉塔洛斯来意，提及阿萍和铁锈集市的孕妇。"阿萍...那个总戴面具的护士，"塔洛斯沉思片刻，"她曾帮过我们不少人。"他转向守卫："带客人去药房，让他拿需要的东西。但——"他靠近你，面具后的眼睛闪烁，"别靠近地下室。那里...不适合外人。我们都有自己的信仰方式，不是吗？就像辐射对某些人是灾难，对我们却是...转变。"',
  options: [
    { text: '感谢他并前往药房', nextScene: 'visitPharmacy' },
    { text: '好奇询问他们的信仰', nextScene: 'askAboutRadiationWorship' }
  ]
},

'pretendToBeWanderingDoctor': {
  title: '医者游方',
  description: '"一位流浪医生？"塔洛斯怀疑地审视你，"很巧，最近我们确实需要医疗帮助。"他卷起袖子，露出手臂上可怕的辐射灼伤，"我们的...仪式需要这些，但有时伤口会感染。治好我和我的几个追随者，我会让你进药房。"他带你到一间简陋的治疗室，几名挖坟人躺在那里，身上有类似的灼伤。"怎么样，医生？能帮我们解决问题吗？"他语气中带着挑战。',
  options: [
    { text: '尝试治疗伤口', nextScene: 'treatRadiationBurns', requiredItem: '急救包' },
    { text: '承认自己不是医生', nextScene: 'admitLying' }
  ]
},

'askAboutRadiationWorship': {
  title: '辐射崇拜',
  description: '"我们的信仰？"塔洛斯的声音带着狂热，"辐射不是敌人，而是赐予我们新生的力量。"他摘下面具，露出一张布满辐射疤痕的脸，眼睛周围有不自然的蓝色光晕。"在地下室，我们找到了辐射与人类和谐共存的方式。我曾是个核电站技术员，知道人类对辐射的恐惧是多么...肤浅。"他重新戴上面具，"等你取药时，记住我说的话。有一天，整个废土都会接受辐射的洗礼。"',
  healthChange: 0,
  radiationChange: 2,
  options: [
    { text: '礼貌地结束对话去药房', nextScene: 'visitPharmacy' },
    { text: '询问如何到达地下室', nextScene: 'askAboutBasementAccess' }
  ]
},

'treatRadiationBurns': {
  title: '医疗处置',
  description: '你小心翼翼地处理挖坟人的辐射灼伤，使用急救包中的消毒药水和绷带。尽管医疗用品简陋，你还是尽力做到了最好。塔洛斯检视你的工作，满意地点头，"手法很熟练...对外面的医生来说。"他自嘲地笑了，"你知道吗？在辐射前，我本来要当个喜剧演员的。现在，我的笑话只有辐射能听懂了。"他递给你一把钥匙，"一楼西翼药房，拿你需要的东西，别贪心。"',
  removeItem: '急救包',
  options: [
    { text: '前往药房', nextScene: 'visitPharmacy' }
  ]
},

'admitLying': {
  title: '承认谎言',
  description: '"我...其实不是医生。"你承认道。塔洛斯沉默片刻，突然大笑起来，"至少你够诚实！"他收起笑容，"但谎言在这里是要付出代价的。"守卫抓住你，强行注射了某种药剂。你感到一阵眩晕，"这是我们的\'真诚药\'，会让你感到虚弱，但不会致命...大概吧。"塔洛斯挥手，"带他去药房，让他拿需要的东西，然后送他出去。"',
  healthChange: -1,
  options: [
    { text: '跟随守卫去药房', nextScene: 'visitPharmacy' }
  ]
},

'askAboutBasementAccess': {
  title: '地下秘密',
  description: '"地下室？"塔洛斯的语气变得警惕，"那里不对外人开放。别试图潜入，后果自负。"他转身离开，但临走前又停下，"不过...如果你真对辐射‘新生’感兴趣，也许我们可以安排一次...参观。"他诡异地笑了，"完成你的任务，然后再决定是否想加入我们。死亡只是重生的开始，就像我祖母常说的——辐射让苹果发光，但从不收电费！"他因自己蹩脚的笑话大笑起来，让你背脊发凉。',
  options: [
    { text: '前往药房', nextScene: 'visitPharmacy' },
    { text: '婉拒并离开', nextScene: 'forcedOutOfHospital' }
  ]
},

'visitPharmacy': {
  title: '医院药房',
  description: '药房位于医院西翼，守卫带你到这里就离开了。房间内药品架大多已被洗劫一空，但仍有一些药瓶散落各处。空气中弥漫着过期药品的怪味。你开始仔细搜寻阿萍提到的产前维生素和抗辐射药物。在一个上锁的柜子里，你看到了需要的药品，但需要找到钥匙或强行打开。',
  options: [
    { text: '搜索周围寻找钥匙', nextScene: 'searchForCabinetKey' },
    { text: '尝试撬开药柜', nextScene: 'tryToPickLock' },
    { text: '检查药房后门', nextScene: 'checkPharmacyBackDoor' }
  ]
},

'searchForCabinetKey': {
  title: '寻找钥匙',
  description: '你仔细搜索药房的抽屉和桌面，在一个医生办公桌的笔筒里发现了一串钥匙。尝试了几把后，终于找到了能打开药柜的那一把。柜子里整齐摆放着各种珍贵药物，其中包括阿萍需要的产前维生素和几盒抗辐射药。就在你取药时，窗外传来一阵骚动声，似乎有人在争吵。',
  item: '产前维生素',
  item: '医用抗辐射药',
  options: [
    { text: '快速离开药房', nextScene: 'leavePharmacyQuickly' },
    { text: '查看窗外骚动', nextScene: 'checkCommotion' }
  ]
},

'tryToPickLock': {
  title: '撬锁尝试',
  description: '你尝试用随身携带的工具撬开药柜，但这把锁比看起来要复杂。正当你费力撬动时，锁突然断裂发出清脆的声响。你迅速取出需要的药品，但声音似乎引来了注意。远处传来脚步声，正向药房靠近。',
  item: '产前维生素',
  item: '医用抗辐射药',
  options: [
    { text: '躲在柜子后面', nextScene: 'hideFromGuards' },
    { text: '迅速离开药房', nextScene: 'leavePharmacyHastily' }
  ]
},

'checkPharmacyBackDoor': {
  title: '神秘后门',
  description: '你注意到药房后面有一扇半掩的门。轻轻推开后，发现一条狭窄的走廊通向地下。走廊墙壁上绘满了奇怪的辐射符号和"蜕变"、"新生"等字样。你的辐射仪表开始发出微弱的警告声，显示前方辐射值正在升高。这似乎是通往挖坟人"圣所"的入口。',
  radiationChange: 3,
  options: [
    { text: '先寻找药品再考虑', nextScene: 'searchForCabinetKey' },
    { text: '沿走廊下到地下室', nextScene: 'descendToBasementLit' }
  ]
},

'descendToBasementLit': {
  title: '辐射圣所',
  description: '走廊尽头是一扇重型防辐射门，门上绘有复杂的辐射符号。推开门，你发现自己站在一个宽阔的地下室中，中央放置着一个发着蓝光的奇怪装置——看起来像是某种改装过的医用辐射仪。周围站着几名穿戴防护服的挖坟人，他们正围绕着一名躺在装置下的新成员进行某种仪式。空气中弥漫着辐射和某种香料混合的气味。突然，你的到来引起了他们的注意。',
  radiationChange: 10,
  options: [
    { text: '尝试解释你的出现', nextScene: 'explainPresence' },
    { text: '立即转身逃跑', nextScene: 'fleeFromBasement' }
  ]
},

'descendToBasementDark': {
  title: '黑暗探索',
  description: '通过后门入侵医院，你摸索着找到一条通往地下室的楼梯。没有照明设备，你只能依靠墙壁上偶尔的荧光符号导航。空气越来越浑浊，辐射仪发出持续的警告。突然，你听到前方传来低沉的吟诵声。走近一看，数十名挖坟人围绕着一个发光的辐射源，进行某种诡异的仪式。一个新成员正被引导向辐射源，他的皮肤在接触后开始发出微弱的蓝光。',
  radiationChange: 15,
  options: [
    { text: '悄悄后退离开', nextScene: 'sneakOutOfBasement' },
    { text: '继续观察仪式', nextScene: 'watchRitualInSilence' }
  ]
},

'explainPresence': {
  title: '理由辩解',
  description: '"我...我只是在找药品。"你结结巴巴地说。一名看似领袖的人走上前，摘下头盔，竟然是塔洛斯。"我告诉过你不要来这里，"他的语气出奇地平静，"但既然你已经看到了，也许这是命运的安排。"他向你伸出手，掌心有一枚小型辐射源，"这是我们的‘新生礼物’，它改变了我们，让我们能在废土上更好地生存。有些人称我们为疯子，但在核电站工作二十年教会我一件事：辐射不是敌人，而是进化的催化剂。"',
  options: [
    { text: '礼貌拒绝并请求离开', nextScene: 'politelyRefuse' },
    { text: '表现出兴趣了解更多', nextScene: 'showInterestInCult' }
  ]
},

'fleeFromBasement': {
  title: '紧急逃离',
  description: '你立刻转身冲向出口，身后传来喊叫声和急促的脚步声。奔跑途中，你的辐射仪报警声越来越急促。通过防辐射门后，你拼命将门关上并用附近的金属棒卡住。喘着粗气，你冲回药房，迅速搜集需要的药品，然后向医院出口跑去。你的血液似乎在燃烧，辐射中毒的症状开始显现。',
  healthChange: -1,
  radiationChange: 10,
  item: '产前维生素',
  item: '医用抗辐射药',
  options: [
    { text: '冲出医院大门', nextScene: 'escapeHospital' }
  ]
},

'politelyRefuse': {
  title: '谨慎拒绝',
  description: '"谢谢你的...邀请，但我必须回去完成我的任务。"你小心地后退几步。塔洛斯失望地叹息："真遗憾，我们需要更多理解辐射真相的人。"他收起辐射源，"你可以离开，带着你的药品。但记住，总有一天，辐射会找到所有人。"他示意手下让路，"哦对了，"他补充道，"如果你改变主意，我们随时欢迎。毕竟在废土上，我们的辐射崇拜可是唯一会员辐射...不是会费！"他因自己糟糕的双关语笑起来。',
  item: '产前维生素',
  item: '医用抗辐射药',
  options: [
    { text: '离开医院返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
  ]
},

'showInterestInCult': {
  title: '假装兴趣',
  description: '你表现出对他们信仰的兴趣，希望能安全离开。塔洛斯兴奋地向你展示他们的"成果"：几名成员身上发出微弱的蓝光，他们声称辐射给了他们提高的耐力和对辐射的抵抗力。"我们不是疯子，我们是适应者！"他自豪地说，"在这个世界里，抗拒辐射是徒劳的。我们选择拥抱它，与它共存。"他允许你带着药品离开，还给了你一个小型辐射标本，"如果你决定加入我们，这将是你的第一步。"他咧嘴一笑，"记住，在废土上，机会像辐射一样——看不见但无处不在！"',
  item: '产前维生素',
  item: '医用抗辐射药',
  item: '小型辐射源',
  radiationChange: 5,
  options: [
    { text: '感谢他并离开医院', nextScene: 'leaveHospitalWithGift' }
  ]
},

'forcedOutOfHospital': {
  title: '被迫离开',
  description: '医院守卫粗暴地将你押送到大门外，随手扔出几瓶药品，就像扔垃圾一样。"别再回来！"其中一个挖坟人威胁道，"下次见到你，不会这么客气。"药瓶在地上滚动，所幸其中包含了阿萍需要的维生素和抗辐射药。你迅速收集起来，疼痛感提醒着你刚才经历的粗暴对待。',
  item: '产前维生素',
  item: '医用抗辐射药',
  options: [
    { text: '返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
  ]
},

'escapeHospital': {
  title: '逃离医院',
  description: '你冲出医院大门，身后传来挖坟人的呼喊声。幸好他们没有追出医院范围，似乎不愿在外界暴露太多。你气喘吁吁地停下，检查辐射仪表——指针仍在危险区徘徊。你需要尽快服用抗辐射药。环顾四周，这片区域明显受到严重辐射污染，天空呈现出不自然的橙红色，地面上的植物扭曲变形，散发着微弱的荧光。',
  options: [
    { text: '立即服用抗辐射药', nextScene: 'takeRadsAwayImmediately', requiredItem: '医用抗辐射药' },
    { text: '忍耐不适，加速返回铁锈集市', nextScene: 'rushBackToMarket' }
  ]
},

'leaveHospitalWithGift': {
  title: '带着"礼物"离开',
  description: '你揣着塔洛斯给你的"礼物"离开医院，感觉口袋里的辐射源正散发着微弱的热量。离开医院后，你立刻检查辐射仪表，发现指针已经接近危险区域。这个小辐射源虽然封装在铅盒中，但仍然泄漏着危险的辐射。你需要决定如何处理它。',
  radiationChange: 8,
  options: [
    { text: '扔掉辐射源', nextScene: 'throwAwayRadSource' },
    { text: '保留它作为研究样本', nextScene: 'keepRadSourceSafely' },
    { text: '立即返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
  ]
},

'takeRadsAwayImmediately': {
  title: '紧急用药',
  description: '你迅速打开抗辐射药，服下一片。药物开始发挥作用，缓解了你的不适感。这种医用级抗辐射药比普通药片效果更好，几乎立即就感到一阵清凉流过全身。你的辐射仪表指针也开始缓慢下降。站在医院外，你再次看向这座建筑，感叹挖坟人的奇怪信仰。无论如何，你已经获得了阿萍需要的药品，是时候返回了。',
  radiationChange: -15,
  options: [
    { text: '返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
  ]
},

'rushBackToMarket': {
  title: '强忍不适',
  description: '你决定不浪费珍贵的抗辐射药，强忍着辐射病症状加速向铁锈集市奔去。途中，你的状况不断恶化：头晕目眩，视线模糊，鼻血不断。你的身体像是被内部灼烧一般。在快要支撑不住时，你看到了远处铁锈集市的灯光。就在这时，你踉跄了一下，产前维生素的瓶子从口袋滑落。你勉强接住了它，但这个动作几乎耗尽了你的最后力气。',
  healthChange: -1,
  radiationChange: 15,
  options: [
    { text: '最后一搏冲向集市', nextScene: 'finalPushToMarket' }
  ]
},

'throwAwayRadSource': {
  title: '明智决定',
  description: '你决定不冒险，将辐射源扔进路边一个破旧的铅桶中。刚脱手，你就感到轻松了许多，辐射仪表的读数也开始下降。你不禁想象塔洛斯和他的追随者们长期接触这种辐射源会发生什么。无论他们的"新生"理论如何，辐射终究是危险的。整理了一下背包，确认药品安全后，你开始返回铁锈集市的旅程。',
  radiationChange: -5,
  removeItem: '小型辐射源',
  options: [
    { text: '返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
  ]
},

'keepRadSourceSafely': {
  title: '保存样本',
  description: '你决定保留这个辐射源，但更安全地包装它。用随身携带的铅布（从加油站找到的）仔细包好，然后放入一个金属盒子中。虽然你不认同挖坟人的观点，但这个样本可能对理解辐射有帮助，也许阿萍或其他有医学知识的人能从中获得一些见解。确保一切安全后，你开始返回铁锈集市。',
  options: [
    { text: '返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
  ]
},

'finalPushToMarket': {
  title: '最后冲刺',
  description: '凭借坚韧的意志，你强撑着最后几百米。市场入口的守卫看到你摇摇晃晃的身影，立即认出你是辐射病发作。他们迅速将你带到坟场诊所，阿萍看到你的状态后立即开始治疗。"你这个傻瓜，"她一边熟练地注射抗辐射药一边斥责，"为什么不在路上就用药？"你虚弱地笑了笑，从口袋中取出她需要的药品。"因为...我怕路上遇到变异松鼠，它们最爱吃药...尤其是坚果味的。"你开了个蹩脚的玩笑后昏了过去。',
  healthChange: -1,
  options: [
    { text: '在诊所醒来', nextScene: 'wakeUpInClinic' }
  ]
},

'returnToMarketWithMedicine': {
  title: '任务归来',
  description: '你顺利返回铁锈集市，直奔坟场诊所。阿萍正在给一位病人更换绷带，看到你进来，她停下手中的工作。"你回来了，"她的声音中带着惊喜，"找到药了吗？"你拿出产前维生素和抗辐射药，递给她。她仔细检查了药品，满意地点点头，"完美，这些正是我需要的。你在医院遇到麻烦了吗？"',
  options: [
    { text: '告诉她关于挖坟人的崇拜', nextScene: 'tellAboutCult' },
    { text: '只提及你完成了任务', nextScene: 'onlyMentionMission' }
  ]
},

'wakeUpInClinic': {
  title: '诊所醒来',
  description: '你在一阵轻柔的摇晃中醒来，发现自己躺在坟场诊所的病床上。阿萍站在床边，脸上带着宽慰的笑容。"你总算醒了，睡美人。幸好你体质还不错，不然这次辐射剂量足以让你变成夜光娃娃。"她检查着你的状态，"药品我已经收到了，非常感谢。按照约定，防辐射服是你的了。"她指向一旁挂着的一套全身防护装备，"不过你得先好好休息，才能去冒下一次险。"',
  healthChange: 1,
  radiationChange: -20,
  options: [
    { text: '感谢阿萍的救治', nextScene: 'thankNurse' },
    { text: '询问防辐射服的性能', nextScene: 'askAboutRadSuit' }
  ]
},

'tellAboutCult': {
  title: '揭露秘密',
  description: '你详细描述了挖坟人的辐射崇拜活动。阿萍听后面色凝重："我就知道他们有问题，但没想到已经发展成了邪教。"她摇头，"塔洛斯以前是个好人，看来辐射已经影响了他的神经系统。这种辐射源长期接触会导致严重的健康问题，甚至精神异常。"她叹息道，"不过你完成了任务，这是我们的交易。"她取出一套完整的防辐射服，"这是我最好的装备，应该足够应对军事基地的辐射区。"',
  item: '高级防辐射服',
  options: [
    { text: '感谢她并询问如何找到蛇哥', nextScene: 'askHowToFindSnake' },
    { text: '询问她对军事基地的了解', nextScene: 'askAboutMilitaryBase' }
  ]
},

'onlyMentionMission': {
  title: '简单汇报',
  description: '"任务很顺利，"你简单地说，决定不提及挖坟人的奇怪活动。阿萍若有所思地看着你："你很谨慎，这在废土上是种美德。"她整理着刚收到的药品，"不管你在那里看到了什么，都还是回来了，这就足够了。"她从一个上锁的柜子里取出一套防辐射服，"按照约定，这是给你和蛇哥的。军事基地的辐射可不是开玩笑的，这套装备应该能提供足够的保护。"',
  item: '高级防辐射服',
  options: [
    { text: '感谢她并准备离开', nextScene: 'thankAndLeave' },
    { text: '询问军事基地的危险', nextScene: 'askAboutDangers' }
  ]
},

'thankNurse': {
  title: '感谢救命',
  description: '"谢谢你救了我，"你真诚地说。阿萍摆摆手，"别客气，这是我的工作。况且你冒险为孕妇取药，我们扯平了。"她递给你一杯水，"关于那个军事基地，你和蛇哥要小心。我听说那里不只有辐射，还有...别的东西。"她犹豫了一下，"你知道吗？在大灾变前，那个基地就传闻有秘密实验。"她认真地看着你，"无论你们在那里找到什么，都要记住，有些秘密被埋葬是有原因的。"',
  options: [
    { text: '承诺会谨慎行动', nextScene: 'promiseCaution' },
    { text: '问她是否听说过基地的具体情况', nextScene: 'askForBaseDetails' }
  ]
},

'askAboutRadSuit': {
  title: '防护装备',
  description: "你询问防辐射服的性能。阿萍走到衣架旁，展示这套装备：\"这是我在军医院找到的高级防护服，完全密封，带有独立供氧系统，可以抵御极高水平的辐射。\"她指着头盔上的一个小型显示屏，\"这会显示外部辐射水平和氧气剩余量。穿上它，你基本上是个移动的安全区。\"她笑了笑，\"我试着开个玩笑：这套衣服比我前男友还靠谱，至少它能保证你不会被辐射'甩'！\"",
  item: '高级防辐射服',
  options: [
    { text: '感谢她并准备离开', nextScene: 'thankAndLeave' },
    { text: '问她知道些什么军事基地的情况', nextScene: 'askForBaseDetails' }
  ]
},

'askHowToFindSnake': {
  title: '寻找蛇哥',
  description: '"蛇哥？这个时间他应该在净水站，"阿萍回答，"他最近一直在研究那些管道图纸，为探索军事基地做准备。"她递给你一小包药物，"带上这些，基地里可能会用到。还有...如果你们找到可用的水源，记得第一个通知我们诊所。这里的病人最需要干净的水。"她微笑着送你到门口，"顺便说一句，你知道为什么蛇哥的纹身这么详细吗？因为他是唯一一个把\'走管道\'当真的人！"',
  item: '医疗包',
  options: [
    { text: '前往净水站找蛇哥', nextScene: 'goToWaterStationForMission' }
  ]
},

'askAboutMilitaryBase': {
  title: '基地传闻',
  description: '"军事基地？"阿萍放低声音，"我只知道传言。据说那里不只是个普通基地，而是某种研究设施。大灾变前，有运送特殊设备和\'实验品\'的车辆进出。"她若有所思地整理着手术工具，"还有人说，基地最深处有个超大型净水系统，为某种需要大量冷却水的实验提供支持。"她直视你的眼睛，"无论你们找到什么，都要小心。有些技术...也许应该被遗忘。"',
  options: [
    { text: '向她保证会谨慎行事', nextScene: 'promiseCaution' },
    { text: '询问如何找到蛇哥', nextScene: 'askHowToFindSnake' }
  ]
},

'thankAndLeave': {
  title: '道别启程',
  description: '你真诚地感谢阿萍的帮助，小心地收好防辐射服。"别客气，"她轻松地说，"要是我们都自私自利，这个世界早就完蛋了。"她送你到诊所门口，"记得告诉蛇哥，装备要完整归还。那可是我最后的宝贝了。"她顿了顿，"对了，蛇哥应该在净水站等你。祝你们好运...我们都需要水源。"她看着远方，"你知道吗？在废土上，水比友谊还珍贵，但今天你证明了两者都不是完全绝迹的。"',
  options: [
    { text: '前往净水站', nextScene: 'goToWaterStationForMission' }
  ]
},

'askAboutDangers': {
  title: '危险警告',
  description: '"军事基地的危险？"阿萍皱眉，"除了致命辐射，还有可能的自动防御系统、塌陷区域、变异生物..."她掰着手指数着，"哦，别忘了可能的化学泄漏和二十年无人维护的不稳定结构。"她半开玩笑地说，"基本上，除了死亡，你什么都不用担心！但说真的，"她的表情变得严肃，"如果感觉不对，就立刻撤离。没有水源值得用生命去换。"',
  options: [
    { text: '感谢忠告并离开', nextScene: 'thankAndLeave' }
  ]
},

'promiseCaution': {
  title: '谨慎承诺',
  description: '"我保证会小心的，"你向阿萍承诺。她满意地点点头，"聪明人。"她帮你调整了防辐射服的几个设置，"这个按钮是紧急供氧，这个是密封性检测。"她专业地检查着每个接口，"穿上它感觉像是裹在一个高科技煎饼里，但比起变成人形夜灯要好多了。"她递给你一些额外的医疗用品，"以防万一。记住，在那种地方，计划赶不上变化，但准备工作不能少。"',
  item: '医疗包',
  options: [
    { text: '前往净水站找蛇哥', nextScene: 'goToWaterStationForMission' }
  ]
},

'askForBaseDetails': {
  title: '深入了解',
  description: '阿萍沉思片刻，"关于那个基地，我知道的不多。有个老病人曾在那里工作过，临死前说了些话。据他所述，基地分为多个区域，表面的军事设施只是幌子。地下几层才是真正的研究区，据说在研发某种\'辐射适应\'技术。"她摇头，"他描述的设备和实验听起来太超前了，我不确定是不是辐射导致的幻觉。但有一点是确定的：地下深处有一个巨大的水处理系统，为整个设施提供支持。"',
  options: [
    { text: '询问如何到达地下区域', nextScene: 'askHowToReachUnderground' },
    { text: '感谢情报并准备离开', nextScene: 'thankAndLeave' }
  ]
},
'askHowToReachUnderground': {
  title: '地下入口',
  description: '"地下区域？"阿萍沉思道，"据那个老病人说，主要入口肯定有严密的安全措施，但他提到过一个紧急通风管道，位于基地东北角。那里的安保较弱，但需要穿过高辐射区。"她犹豫片刻，"还有就是...他说实验区有种奇怪的声音，像是\'呼吸\'。我一直以为是辐射导致的幻觉，但他死前一直重复这件事。"她耸耸肩笑道，"反正辐射不是会让你长出三条腿，就是让你听见管道在唱歌。也许最终结局都一样！"',
  options: [
    { text: '感谢情报并离开', nextScene: 'thankAndLeave' }
  ]
},

'goToWaterStationForMission': {
  title: '探险准备',
  description: '你回到净水站找到蛇哥。看到你带着高级防辐射服和工具套装，他脸上浮现出罕见的笑容。"你真的搞到了！"他仔细检查装备，"好了，我们明天黎明出发。趁着酸雨刚过，辐射水平相对较低。"他铺开一张地图，指向城市边缘，"军事基地在这里，距离约半天路程。路上会经过废弃变电站，那里有大群变异老鼠出没。你最好休息一下，养精蓄锐。"',
  options: [
    { text: '接受休息建议', nextScene: 'restBeforeMission' },
    { text: '询问他对军事基地的了解', nextScene: 'askSnakeAboutBase' }
  ]
},

'restBeforeMission': {
  title: '最后准备',
  description: '你在净水站旁的一个简易床铺上休息。虽然床垫发霉，但这是你几天来睡过的最舒适的地方。醒来时，天空依然是那副橙红色，难以分辨是黎明还是黄昏。蛇哥已经准备好了必要的装备：两套防辐射服、工具箱、几瓶净水和一些干粮。"准备好了吗？"他问道，"一旦进入那个地方，就没有回头路了。"',
  healthChange: 1, // 休息恢复健康
  radiationChange: -5, // 辐射稍微降低
  options: [
    { text: '是的，我已经准备好了', nextScene: 'startJourneyToBase' }
  ]
},

'askSnakeAboutBase': {
  title: '基地情报',
  description: '蛇哥面色凝重："那个基地我只去过外围。那里有自动防御系统，还有奇怪的电磁干扰，会让电子设备失效。"他拿出一张泛黄的照片，上面是一座半掩在山体中的混凝土建筑，"这是我六年前拍的，基地入口处有军方标志，但下面还有另一个标志——一个圆环内的DNA螺旋。"他收起照片，"如果老枪和阿萍都害怕那里的秘密，我们必须万分小心。"他苦笑道："在辐射里待久了，唯一的好处就是夜里不用开灯读书...当然前提是你还有书！"',
  options: [
    { text: '休息一晚再出发', nextScene: 'restBeforeMission' }
  ]
},

'startJourneyToBase': {
  title: '启程',
  description: '拂晓时分，你和蛇哥悄悄离开了铁锈集市。老莫派了两名手下护送你们到外围，临别时叮嘱："找到水源后先通知我们，别玩什么英雄主义。"一路上，空气中弥漫着金属味和刺鼻的臭氧，地面时不时出现不自然的蓝色光斑。蛇哥指向远处若隐若现的大型建筑群："那就是目标——卡恩军事研究基地，曾经是北方最先进的军事科研中心之一。"',
  options: [
    { text: '询问周围环境', nextScene: 'askAboutSurroundings' },
    { text: '直接向基地前进', nextScene: 'approachBaseDirect' }
  ]
},

'askAboutSurroundings': {
  title: '险恶环境',
  description: '"这一带？"蛇哥指向你们左前方一片废弃的高压电塔区，"那里是变电站，现在是变异鼠群的巢穴。"他又指向右方一片塌陷的建筑群，"那边曾是研究人员的宿舍区，据说发生过集体自杀事件。"见你面色凝重，他补充道："知道末日前后最大的区别吗？末日前，是电影院门口排队；末日后，是现实生活中排队...等着变成电影素材！"他的冷笑话让紧张气氛稍微缓解。',
  options: [
    { text: '选择绕开变电站的路线', nextScene: 'avoidPowerStation' },
    { text: '穿过变电站抄近路', nextScene: 'throughPowerStation' }
  ]
},

'avoidPowerStation': {
  title: '迂回路线',
  description: '你们选择了一条较长但看起来更安全的路径，绕开变电站。途中，蛇哥指出地面上的各种痕迹："看这些爪印，昨晚有一群变异犬经过。"他细心地避开几处半掩在灰烬中的陷阱，"可能是夜行队设的，他们最近在这一带活动。"前方不远处，一辆翻倒的军用卡车拦住了去路，你们需要绕过或翻越它。',
  options: [
    { text: '绕过卡车', nextScene: 'bypassTruck' },
    { text: '检查卡车是否有物资', nextScene: 'checkTruck' }
  ]
},

'throughPowerStation': {
  title: '变电站穿越',
  description: '你们走进变电站区域，巨大的电塔如骸骨般耸立在废土上。空气中弥漫着一股奇怪的金属气味，辐射计的读数逐渐上升。"穿过这里可以省半小时，"蛇哥低声说，"但要小心，鼠群往往在——"他的话被一阵窸窸窣窣的声音打断。你们看到几十双发绿光的眼睛从变压器后面亮起，那是体型异常的变异老鼠，每只都有小狗大小。',
  radiationChange: 10,
  options: [
    { text: '立刻返回安全路线', nextScene: 'retreatFromRats' },
    { text: '使用武器驱赶鼠群', nextScene: 'fightRats', requiredItem: '老枪的左轮' },
    { text: '尝试悄悄绕过', nextScene: 'sneakPastRats' }
  ]
},

'checkTruck': {
  title: '意外收获',
  description: '你决定检查卡车是否有可用物资。爬上翻倒的车厢，你发现里面装的是军用补给品，但大部分已经被洗劫一空。在一个卡住的储物箱中，你找到了几枚军用信号弹和一个密封的文件袋。蛇哥警惕地环顾四周："快点，这地方不安全。"打开文件袋，你发现一份关于"项目深渊"的报告片段和一张磁卡，上面印着安全级别标识。',
  item: '军用信号弹',
  item: '安全磁卡',
  options: [
    { text: '继续前往基地', nextScene: 'continueToBase' }
  ]
},

'bypassTruck': {
  title: '绕路前行',
  description: '你们决定安全起见绕过卡车。大约半小时后，你们终于接近了军事基地的外围。这里的空气更加沉重，辐射尘随风飘动，在阳光下形成诡异的光晕。远处，几栋低矮的混凝土建筑掩映在一片枯死的松林中，周围有铁丝网和废弃的哨塔。一条通往基地的柏油路已经龟裂，长满了奇形怪状的蓝绿色植物。',
  options: [
    { text: '观察军事基地外围', nextScene: 'observeBasePerimeter' }
  ]
},

'retreatFromRats': {
  title: '紧急撤退',
  description: '你们立刻掉头，以最快速度离开变电站。身后传来鼠群移动的声音，但幸好它们似乎没有追赶的意图。绕了一大圈后，你们终于接近了军事基地。蛇哥气喘吁吁地说："看来那群畜生已经形成了领地意识，只要不侵入它们的核心区域，它们不会主动攻击。"他查看了辐射计，皱起眉头："但我们浪费了不少时间，现在辐射水平上升了。"',
  healthChange: -1, // 体力消耗
  options: [
    { text: '观察军事基地外围', nextScene: 'observeBasePerimeter' }
  ]
},

'fightRats': {
  title: '鼠群遭遇战',
  description: '你拔出老枪的左轮，瞄准最大的一只变异鼠开火。枪声在废弃变电站内回荡，那只老鼠应声倒地，其他鼠群暂时退缩了。蛇哥趁机点燃一根自制的烟雾棒，散发出刺鼻的气味："这能暂时掩盖我们的气味。快走！"你们迅速穿过变电站，身后偶尔传来鼠群的尖叫声。这条近路确实省时，但也让你的神经高度紧张。',
  options: [
    { text: '加速前往基地', nextScene: 'rushToBase' }
  ]
},

'sneakPastRats': {
  title: '危险潜行',
  description: '你示意蛇哥保持安静，两人放低姿态，贴着变电站的外墙缓慢前进。鼠群似乎在觅食，没有注意到你们。正当你们即将通过危险区时，一只老鼠突然抬头，鼻子抽动着转向你们。你屏住呼吸，完全静止不动。几秒钟的对视仿佛持续了一个世纪，最终那只老鼠失去了兴趣，重新加入了觅食队伍。蛇哥擦了擦额头的冷汗，无声地向前指了指。',
  radiationChange: 5, // 较少的辐射暴露
  options: [
    { text: '继续向基地推进', nextScene: 'continueToBase' }
  ]
},

'rushToBase': {
  title: '全速冲刺',
  description: '子弹声似乎激怒了整个鼠群，你们不得不全速奔跑。穿过变电站后，你回头看了一眼，几十只变异老鼠在站内游荡，但似乎不愿离开自己的领地。你的肺部因奔跑而灼痛，辐射计发出的警告声提醒着你暴露在危险环境中太久了。蛇哥指向前方："看，已经能看到基地的哨塔了。"',
  healthChange: -1, // 体力消耗
  radiationChange: 15, // 高辐射暴露
  options: [
    { text: '观察军事基地外围', nextScene: 'observeBasePerimeter' }
  ]
},

'continueToBase': {
  title: '接近目标',
  description: '你们继续沿着荒凉的道路前进，废弃的车辆和偶尔出现的骸骨提醒着这里曾经发生过的混乱。蛇哥指向远处一座隐藏在山坡中的混凝土建筑群："那就是卡恩基地的主体部分。按照地图，我们需要找到东北角的通风井。"空气中弥漫着死寂，连变异生物都似乎避开了这个区域，这种不自然的安静让人毛骨悚然。',
  options: [
    { text: '观察军事基地外围', nextScene: 'observeBasePerimeter' }
  ]
},

'observeBasePerimeter': {
  title: '基地外围',
  description: '你们找到一处视野良好的高地，透过老枪给的军用望远镜观察基地。主入口被厚重的混凝土障碍物封锁，几个自动炮塔立在围墙上，不知是否还在运作。基地周围的地面奇怪地干净，没有常见的废土废墟和变异植物，仿佛被什么力量清理过。蛇哥指向东北方向："看那里，通风口的金属网已经部分损坏，我们可以从那里进入。"',
  options: [
    { text: '穿上防辐射服', nextScene: 'wearProtectiveSuits' }
  ]
},

'wearProtectiveSuits': {
  title: '装备防护',
  description: '你们在基地边缘的一处掩体后面停下，开始穿戴阿萍提供的防辐射服。全套装备笨重但严密，头盔上的显示屏显示外部辐射水平惊人地高。内置通讯系统让你们能在不摘下头盔的情况下交流。"按照老枪的地图，"蛇哥的声音通过通讯器传来，"通风井连接基地的维修通道，应该能避开主要的防御系统。"你检查了一下设备，确保一切正常，然后点头示意准备行动。',
  radiationChange: -20, // 辐射防护
  options: [
    { text: '前往通风井入口', nextScene: 'approachVentShaft' }
  ]
},

'approachVentShaft': {
  title: '通风井入口',
  description: '你们小心翼翼地接近基地围墙边的通风井。金属网确实已经腐蚀损坏，勉强能让一个成年人通过。蛇哥用工具轻松地扩大了开口，然后拿出一根荧光棒，折断后扔进黑洞般的通风井中。幽绿的光线显示井下大约有四五米深，底部似乎是某种技术通道。"我先下去，"蛇哥说，"确认安全后再叫你跟上。"他灵活地爬入通风井，片刻后，你听到通讯器中传来他的声音："安全，可以下来。但小心，这里面比外面更诡异。"',
  options: [
    { text: '跟随蛇哥进入通风井', nextScene: 'enterVentilation' }
  ]
},

'enterVentilation': {
  title: '进入基地',
  description: '你小心地爬下通风井，金属梯子在你的重量下发出不安的嘎吱声。通道底部是一个狭窄的维修隧道，墙上的应急灯奇迹般地仍有微弱电力。蛇哥指向隧道深处："温度传感器显示前方有热源，可能是还在运转的设备。这个基地竟然还有电力，难以想象。"你的辐射计显示这里的辐射水平比外面低，但仍然危险。隧道两个方向延伸，一边标着"主控制室"，另一边标着"水处理系统"。',
  options: [
    { text: '前往主控制室', nextScene: 'towardControlRoom' },
    { text: '前往水处理系统', nextScene: 'towardWaterSystem' }
  ]
},

'towardControlRoom': {
  title: '主控通道',
  description: '你们选择前往主控制室的通道。随着深入，隧道变得更加整洁，似乎这一区域受到某种维护或保护。墙上的标识指示着不同的区域：安保、研究实验室、主控制中心。突然，一个红色激光扫描线从天花板射下，横扫通道。蛇哥迅速拉你后退："安全系统还在运作！我们需要绕过它或者找到控制面板。"',
  options: [
    { text: '尝试使用安全磁卡', nextScene: 'useSecurityCard', requiredItem: '安全磁卡' },
    { text: '寻找旁路通道', nextScene: 'findBypass' }
  ]
},

'useSecurityCard': {
  title: '磁卡解锁',
  description: '你拿出从卡车里找到的安全磁卡，在墙边的读卡器上刷了一下。片刻的停顿后，读卡器发出"滴"的一声，指示灯从红色变成绿色。激光扫描线消失了，前方的一扇安全门缓缓开启。"运气真好，"蛇哥小声说，"但这张卡恐怕级别不高，可能只对基本区域有效。"你们谨慎地穿过安全门，进入了一个宽敞的监控室，数十个屏幕覆盖了墙壁，大多数已经损坏，但几个仍然显示着基地不同区域的图像。',
  options: [
    { text: '查看监控系统', nextScene: 'examineMonitorSystem' }
  ]
},

'findBypass': {
  title: '另辟蹊径',
  description: '你们在通道墙边寻找可能的绕行路线。蛇哥发现了一个维修面板，用工具打开后露出一个狭窄的管道。"这是通风系统的一部分，应该能绕过安全检查。"他钻了进去，你紧随其后。爬行通道又窄又脏，几次你们差点被卡住。最终，你们从天花板的通风口跌落到一个昏暗的办公室内。办公室里散落着文件和个人物品，仿佛使用者曾匆忙离开。一台老式计算机屏幕闪烁着微弱的光芒。',
  options: [
    { text: '检查计算机', nextScene: 'checkOfficeComputer' },
    { text: '查看散落的文件', nextScene: 'examineFiles' }
  ]
},

'towardWaterSystem': {
  title: '水处理通道',
  description: '你们选择向水处理系统方向前进。随着深入，空气变得潮湿，墙上出现明显的水渍和霉菌。前方传来规律的机械运转声和水流声。蛇哥兴奋地说："听到了吗？水系统还在运行！"拐过一个弯，你们面前出现了一个巨大的水处理厅，数十个大型过滤罐和净化设备整齐排列，一半左右似乎仍在工作。但更令人惊讶的是，几个穿着类似防护服的人影在远处移动。',
  options: [
    { text: '躲起来观察那些人', nextScene: 'observeSurvivors' },
    { text: '大声呼叫寻求联系', nextScene: 'callOutToFigures' }
  ]
},

'examineMonitorSystem': {
  title: '监控中枢',
  description: '监控室中央有一个控制台，上面闪烁着各种指示灯。你尝试操作，发现部分系统仍然可用。通过切换不同的摄像头，你看到基地的几个区域：一个巨大的水处理厅，仍在运行；一个被封锁的实验室，门上贴着生物危害警告；以及一个似乎是居住区的地方，有微弱的灯光。最令人震惊的是，你看到几个模糊的人影在水处理区活动！蛇哥难以置信地说："有人？这里竟然有幸存者？"',
  options: [
    { text: '尝试通过广播系统联系他们', nextScene: 'useBroadcastSystem' },
    { text: '查看更详细的基地地图', nextScene: 'checkDetailedMap' }
  ]
},

'checkOfficeComputer': {
  title: '数据终端',
  description: '你打开计算机，惊讶地发现它仍然运行着某种备用电源。屏幕上显示着登录界面，需要密码才能访问。经过几次尝试，你放弃了猜测密码的想法。但在桌面的便签中，你发现了一个写着"项目深渊-B31访问码"的纸条，上面潦草地写着一串数字。输入这串数字后，计算机解锁了，显示出部分项目文件。',
  options: [
    { text: '阅读项目文件', nextScene: 'readProjectFiles' }
  ]
},

'examineFiles': {
  title: '研究资料',
  description: '你翻阅散落的文件，大部分是些无关紧要的行政文书，但一份标记为"绝密"的文件夹引起了你的注意。里面包含了一系列实验报告，题为"人类辐射适应性研究"。报告详细记录了对志愿者进行的基因修改实验，目的是让人类能够适应高辐射环境。最后几页是实验失败的记录，以及关于"深渊项目"的参考，这似乎是更高级别的后续研究。蛇哥看着这些资料，脸色越来越凝重："这些疯子在做什么？他们是在试图改造人类？"',
  options: [
    { text: '寻找更多关于深渊项目的信息', nextScene: 'searchForProjectAbyss' },
    { text: '继续前进寻找水处理系统', nextScene: 'continueToWaterSystem' }
  ]
},

'observeSurvivors': {
  title: '神秘人影',
  description: '你和蛇哥躲在一排大型过滤设备后，观察那些移动的人影。透过防辐射服的面罩，很难看清他们的面容，但他们的动作有些奇怪，机械而缓慢。他们似乎在维护设备，协作有序，但几乎不交流。突然，其中一个人停下来，转向你们隐藏的方向，仿佛感应到了什么。蛇哥紧张地抓住你的手臂："不对劲...那不是普通人。看他们的眼睛！"你仔细观察，惊恐地发现那些"人"的眼睛在黑暗中发出微弱的蓝光。',
  options: [
    { text: '继续观察', nextScene: 'continueWatching' },
    { text: '撤退寻找其他路线', nextScene: 'retreatSilently' }
  ]
},

'callOutToFigures': {
  title: '冒险呼叫',
  description: '你决定试着与那些人联系，也许他们能提供帮助。"嘿！你们好！我们是从铁锈集市来的！"你的声音在水处理厅内回荡。那些人影突然停止了动作，全部转向你的方向。一阵诡异的沉默后，他们齐声发出一种奇怪的嗡鸣声，然后开始向你们移动，动作僵硬而不自然。现在你能更清楚地看到他们——这些不是正常人类！他们的皮肤有异常的蓝色斑纹，眼睛发出幽幽蓝光。"跑！"蛇哥大喊，"那些不是人了！"',
  options: [
    { text: '立即逃跑', nextScene: 'fleeFromCreatures' },
    { text: '使用武器自卫', nextScene: 'defendWithWeapons' }
  ]
},
'fleeFromCreatures': { title: '紧急撤离', description: '你和蛇哥转身就跑，身后传来那些"人形生物"整齐划一的脚步声。"这些是什么鬼东西？"你气喘吁吁地问道。"我猜是某种辐射实验的产物，"蛇哥边跑边回答，"就像变异鼠一样，只不过原料是人！"你们冲进一条维修通道，蛇哥猛地关上防火门并用工具卡住门把。"知道我从不来这种地方的原因吗？"他苦笑道，"因为末日后的科研设施就像脱口秀演员——实验总是失败，但却永远不会离场！"', options: [ { text: '探索附近区域寻找线索', nextScene: 'exploreNearbyArea' }, { text: '尝试找到控制室', nextScene: 'seekControlRoom' } ] },

'defendWithWeapons': { title: '绝境反击', description: '你拔出老枪的左轮，朝最靠近的生物开火。子弹击中它的胸部，但它只是踉跄了一下就继续前进。更诡异的是，伤口处流出的不是血液，而是发着蓝光的粘稠液体。"常规武器对它们没用！"蛇哥大喊，一边拉着你后退，"我们得想别的办法！"他指向不远处的控制台，"那里！也许能关闭水处理系统的某些部分！"', radiationChange: 3, options: [ { text: '冲向控制台', nextScene: 'dashToControlPanel' }, { text: '撤退寻找出路', nextScene: 'retreatToFindExit' } ] },

'exploreNearbyArea': { title: '隐秘设施', description: '你们小心地探索防火门后的区域，发现这是一个小型实验室和监控站的组合。墙上的显示屏持续播放着水处理区域的画面。那些蓝眼生物仍在门外徘徊，仿佛在寻找什么。屏幕上的标签称它们为"深渊适应体"。蛇哥发现一台还能运行的终端。"看看这个，"他指着屏幕上的文档，"\'项目深渊：人类辐射共生计划\'...这些疯子在用辐射改造人类！"', options: [ { text: '查看更多实验数据', nextScene: 'investigateExperimentData' }, { text: '寻找通往水处理核心的路线', nextScene: 'findPathToCoreSystem' } ] },

'seekControlRoom': { title: '寻找控制中心', description: '你们沿着狭窄的维修通道前进，通道墙上标有各种管线和阀门的标记。"这条路应该通向某个控制室，"蛇哥低声说，"如果运气好，我们能找到净水系统的主控制台。"转过几个弯后，你们来到一个带有"中央监控"标识的厚重金属门前。门虽然关闭，但门边的读卡器灯光仍然亮着。"又是需要安全卡的地方，"蛇哥叹气道，"就像辐射区的防晒霜——你越需要，它就越难找！"', options: [ { text: '使用安全磁卡开门', nextScene: 'useSecurityCardAgain', requiredItem: '安全磁卡' }, { text: '尝试撬开控制面板', nextScene: 'tryToHackPanel' } ] },

'dashToControlPanel': { title: '控制台争夺', description: '你们冲向水处理区的控制台，身后的蓝眼生物步调一致地追赶。蛇哥一把推开挡在控制台前的生物，它的身体冰冷得像金属。"挡住它们！"他喊道，同时开始操作控制台。你用左轮抵住最近的追兵，但更多的"人"正从各个管道入口涌来。蛇哥疯狂地按着按钮，突然，整个区域响起刺耳的警报声，几个闸门开始缓缓关闭。"出口要关了，快走！"', healthChange: -1, options: [ { text: '跟随蛇哥冲向出口', nextScene: 'rushToExit' }, { text: '继续战斗掩护后撤', nextScene: 'fightToCoverRetreat' } ] },

'retreatToFindExit': { title: '战略撤退', description: '你们边打边退，寻找任何可能的出口。蓝眼生物步伐虽慢但从未停止，而且数量不断增加。"那边！"蛇哥指向一条标着"紧急撤离"的通道，"这应该通向某个安全区域！"跑进通道后，你们发现这是一个老式的减压室，可能是为了防止辐射污染。蛇哥迅速关闭内门，启动了减压程序。透过小窗，你们看到蓝眼生物站在门外，一动不动地盯着你们，没有任何情绪——这比愤怒或仇恨更加令人不安。', options: [ { text: '等待减压完成', nextScene: 'waitForDecompression' }, { text: '检查减压室内部', nextScene: 'examineDecompressionChamber' } ] },

'investigateExperimentData': { title: '可怕的真相', description: '终端中的文件揭示了一个令人毛骨悚然的真相：深渊项目是政府在核灾难前就开始的秘密计划，目的是创造能在高辐射环境中生存的人类。实验对象主要是军事基地的工作人员和部分"自愿者"。文件显示，实验初期有限成功——受试者确实获得了对辐射的抵抗力，但代价是人类意识的丧失和生理结构的剧烈变化。最终报告写于大灾变当天，指出剩余的114名"适应体"已被转移至地下储存设施，并启动了永久隔离协议。', options: [ { text: '查找有关水系统的信息', nextScene: 'lookForWaterSystemInfo' }, { text: '搜索实验室寻找有用物品', nextScene: 'searchLaboratory' } ] },

'findPathToCoreSystem': { title: '通往核心', description: '实验室的后门通往一条长长的走廊，墙上有箭头指示着"净水核心系统"的方向。走廊里铺设着错综复杂的管道，有些仍在工作，轻微的震动传递着深处机械运转的声音。"我们走对了，"蛇哥确认道，"这些是主输水管，通向核心净水系统。"突然，一个扬声器里传出机械般的声音："警告：检测到未授权人员进入B区，自动防御系统已启动，请授权人员前往B区控制室解除警报。"紧接着，你们听到前方传来金属舱门开启的声音。', options: [ { text: '躲起来避开自动防御', nextScene: 'hideFromDefense' }, { text: '寻找B区控制室', nextScene: 'locateSectionBControl' } ] },

'useSecurityCardAgain': { title: '安全访问', description: '你小心地将安全磁卡在读卡器上刷了一下。片刻的停顿后，读卡器发出确认的"滴"声，门锁解开了。你们进入了一个宽敞的中央监控室，几十块显示屏布满墙壁，显示着基地不同区域的状况。其中一些显示水库和过滤系统，另一些则监控着标记为"深渊储存"的区域，那里有数十个类似睡眠舱的装置，许多已经打开，空无一人。"所以那些东西是从这里跑出来的，"蛇哥观察着屏幕，"至少二十年没人管理，系统大概是自动唤醒了它们来维护设施。"', options: [ { text: '尝试控制水处理系统', nextScene: 'controlWaterSystem' }, { text: '查找基地地图和更多信息', nextScene: 'searchForFacilityMap' } ] },

'tryToHackPanel': { title: '技术障碍', description: '你尝试用工具撬开控制面板，希望能绕过安全系统。但这扇门的安全级别明显高于你之前遇到的，面板纹丝不动。"等等，"蛇哥突然指着墙上的通风口，"我们可以从那里进去。"他用工具迅速打开通风口的盖子，"就像我祖父常说的：如果正门紧锁，就走后门；如果后门也锁了，就从狗洞钻进去！"', options: [ { text: '通过通风管道潜入', nextScene: 'crawlThroughVents' }, { text: '寻找其他路径', nextScene: 'findAlternateRoute' } ] },

'rushToExit': { title: '千钧一发', description: '你们拼命冲向正在关闭的闸门，蓝眼生物紧随其后。就在闸门即将完全关闭的瞬间，你们滑过了缝隙，金属门在身后重重地关上，将追兵阻隔在外。刚喘口气，你们就听到门的另一侧传来整齐的敲击声，仿佛它们在用某种代码交流。"这下麻烦大了，"蛇哥擦去额头的汗水，"它们明显有某种集体意识...这不是什么好消息。"他苦笑着补充，"就像废土上的相亲对象一样——表面上像人，内心却是怪物！"', options: [ { text: '向深处探索寻找净水系统', nextScene: 'exploreDeeper' }, { text: '寻找控制室了解更多信息', nextScene: 'findInformationCenter' } ] },

'fightToCoverRetreat': { title: '殊死抵抗', description: '你坚守阵地，用老枪的左轮射击最近的蓝眼生物，为蛇哥争取时间操作控制台。子弹击中它们时，蓝色液体四溅，但它们仿佛感觉不到疼痛，只是机械地继续前进。"成功了！"蛇哥大喊，按下一个红色按钮，几根金属管突然从天花板降下，释放出大量蒸汽，形成了一道临时屏障。"我重定向了高温蒸汽管道，"他解释道，"这能阻止它们一会儿，快走！"', options: [ { text: '撤离水处理区', nextScene: 'evacuateWaterArea' }, { text: '趁机搜集水样和资料', nextScene: 'collectWaterSamples' } ] },

'waitForDecompression': { title: '压力释放', description: '减压程序缓慢运行着，舱室内的压力表指针逐渐下降。蛇哥紧盯着门外，确保蓝眼生物没有找到破解门锁的方法。"这些东西，"他低声说，"有点像老式的机器人，只会执行预设的程序。只要不在它们的工作区域内干扰，也许就不会被攻击。"减压完成后，舱门自动开启，通向一条狭窄的走廊。"不管它们是什么，"蛇哥边走边说，"希望它们只负责水处理区，不会跑到别的地方来。"', options: [ { text: '寻找控制中心', nextScene: 'searchForControlCenter' }, { text: '探索地下更深处', nextScene: 'probeDeeper' } ] },

'examineDecompressionChamber': { title: '意外发现', description: '趁着减压程序运行，你仔细检查这个老式舱室。角落里的一具白骨吸引了你的注意，那是一名身着安保制服的人类遗骸，手中紧握一个金属盒子。你小心地取出盒子，发现里面有一张高级安全卡和一本笔记。笔记的最后一页写道："它们已经失控，主机损坏后无法接收新指令。我被困在这里，听着那些怪物在走廊上游荡。如果有人找到这个，远离B-3层的生物储存区，那里有一切噩梦的源头。"', item: '高级安全卡', options: [ { text: '等待减压完成', nextScene: 'decompressionComplete' }, { text: '继续检查遗体', nextScene: 'inspectRemainsFurther' } ] },

'lookForWaterSystemInfo': { title: '净水核心', description: '你在终端中搜索有关水系统的资料，找到了一份详细的技术图纸。军事基地的净水系统采用了当时最先进的三重过滤技术，能将高辐射水源转化为安全饮用水。系统位于地下三层，由一个小型反应堆提供动力。有趣的是，反应堆设计中包含了一个应急冷却系统，在紧急情况下可以释放储存的清洁水。蛇哥指着图纸上的标记："看，如果能激活这个系统，理论上可以释放足够的净水供应整个集市数月。"', options: [ { text: '寻找通往水系统的路径', nextScene: 'findRouteToWaterSystem' }, { text: '寻找可能有用的补给', nextScene: 'lookForSupplies' } ] },

'searchLaboratory': { title: '实验室搜索', description: '你们仔细搜查实验室的各个角落，发现一些尚未腐败的补给品。在一个上锁的柜子里，你找到了几支特殊的注射剂，标签上写着"辐射中和剂-实验型"。蛇哥显得很兴奋："这是军方最高级的抗辐射药，如果它们还有效，在高辐射区可以保护我们很长时间。"与此同时，你发现了一份加密的文件，需要高级权限才能访问，或许包含重要信息。', item: '实验型辐射中和剂', options: [ { text: '尝试破解加密文件', nextScene: 'tryToHackFile' }, { text: '继续向水系统方向前进', nextScene: 'proceedToWaterSystem' } ] },

'hideFromDefense': { title: '巧妙躲避', description: '你们迅速躲进附近一个设备凹槽，屏住呼吸。几秒钟后，一个球形的漂浮机器人从前方的门里飞出，表面布满各种传感器和一个小型机械臂。它缓慢地扫视着走廊，发出微弱的嗡嗡声。"那是安全巡逻机器人，"蛇哥小声解释，"它们会攻击任何未经授权的入侵者。"机器人在走廊中游弋了一会儿，随后飘向另一个方向。你们松了口气，继续前进，但知道必须更加小心——这个设施的自动系统仍在运作。', options: [ { text: '沿走廊继续前进', nextScene: 'continueDownHallway' }, { text: '寻找控制这些机器人的终端', nextScene: 'lookForRobotControlPanel' } ] },

'locateSectionBControl': { title: 'B区控制室', description: '你们小心地避开可能有机器人巡逻的主走廊，通过一系列维修通道前进。最终找到一个标有"B区控制中心"的房间。门是开着的，但里面一片黑暗。蛇哥犹豫了："我不喜欢这个。太简单了，像个陷阱。"就在这时，你们听到身后传来机器人的声音，似乎正在接近。"别无选择了，"你低声道，一脚踏入黑暗的房间。', options: [ { text: '开灯检查房间', nextScene: 'turnOnLightsAndCheck' }, { text: '在黑暗中静待机器人离开', nextScene: 'waitInDarkness' } ] },

'controlWaterSystem': { title: '系统接管', description: '你在主控台上找到了水处理系统的控制界面。尽管系统老旧，但核心功能似乎仍在运行。通过指令可以看出，净水系统正以30%的效率运行，足以维持那些"适应体"的活动。通过简单的调整，你可以将效率提升到100%，产生大量干净的水。"就是这样，"蛇哥兴奋地说，"只要把主阀门转向储水罐，然后我们就可以连接输水管道到外部。铁锈集市的问题就解决了！"然而，一条警告信息引起了你的注意：提高系统负荷可能导致"适应体"活动增加。', options: [ { text: '启动净水系统全功率运转', nextScene: 'activateFullWaterSystem' }, { text: '寻找控制"适应体"的方法', nextScene: 'findWayToControlAdaptives' } ] },

'searchForFacilityMap': { title: '设施全图', description: '你在一个数据终端上找到了整个基地的详细地图。基地共有五层，其中三层在地表以上（现已部分损毁），两层在地下。目前你们在B-1层，净水系统的核心位于B-2层，而神秘的"深渊项目"主设施在B-3层。地图还显示，B-1层有一个紧急控制中心，可以管理整个基地的系统，包括安全协议和自动防御。"我们应该去紧急控制中心，"蛇哥建议，"那里可能有覆盖权限，能控制那些生物或者锁定它们的活动区域。"', options: [ { text: '前往紧急控制中心', nextScene: 'headToEmergencyControl' }, { text: '直接前往净水系统核心', nextScene: 'directToWaterCore' } ] },

'crawlThroughVents': { title: '狭窄通道', description: '通风管道又窄又暗，仅能勉强通过一人。你们艰难地爬行，到处是二十年积累的灰尘和碎屑。"我讨厌这种地方，"蛇哥边爬边抱怨，"总让我想起儿时被关在储物柜里的经历。"爬行约十分钟后，你们找到一个出口，正对控制室内部。小心地推开通风口栅栏，你们滑入一个宽敞的中央控制室，各种显示器展示着基地不同区域的状况。令人惊讶的是，这个房间似乎不久前刚被使用过——有人留下了一杯尚未完全干涸的咖啡和一些笔记。', options: [ { text: '检查笔记', nextScene: 'examineRecentNotes' }, { text: '尝试操控系统', nextScene: 'tryToOperateControlSystem' } ] },

'findAlternateRoute': { title: '备用路径', description: '你们决定寻找其他路径，沿着走廊继续前进。转过一个拐角，你们看到一个身穿实验服的骷髅倒在地上，手里还握着一张卡片。蛇哥小心地取出卡片，发现这是一张高级安全通行证，背面潦草地写着"紧急控制中心代码：1729"。"有时候，命运确实眷顾勇敢的冒险者，"蛇哥微笑着说，"不过更多时候，它只是在耍我们玩。就像我表兄的辐射探测器——只在你安全的时候才会响！"', item: '高级安全通行证', options: [ { text: '回到中央监控室门前', nextScene: 'returnToMonitoringDoor' }, { text: '继续寻找其他路径', nextScene: 'continueSearchingPath' } ] },

'exploreDeeper': { title: '深入未知', description: '你们顺着走廊深入基地内部，沿途的标识指示着"净水处理核心"的方向。通道逐渐变宽，墙壁上的管道和电线变得更加密集。空气中弥漫着一种奇怪的金属味和轻微的臭氧气息，预示着前方可能有强电设备或辐射源。"我们越来越接近核心了，"蛇哥低声说，"小心点，这种老旧设施可能有辐射泄漏。"转过一个弯后，你们站在一个巨大的圆形门前，上面标着"净水核心—授权人员专用"。', radiationChange: 5, options: [ { text: '尝试使用安全卡开门', nextScene: 'trySecurityCardOnCore', requiredItem: '安全磁卡' }, { text: '寻找控制面板绕过安全系统', nextScene: 'searchForBypassPanel' } ] },

'findInformationCenter': { title: '信息中枢', description: '沿着走廊前行，你们看到一个标有"信息中心"的房间。进入后，发现这是一个小型档案库和计算机终端室。虽然大部分设备已经损坏，但有一台终端仍然在运行，显示屏闪烁着微弱的绿光。蛇哥迅速坐下，开始浏览可访问的文件。"有意思，"他喃喃自语，"这些是关于深渊项目的进度报告...还有一些关于净水系统的技术细节。"他突然兴奋起来，"找到了！核心净水系统有一个紧急提取协议，可以绕过常规程序，直接将处理好的水引导到外部管道！"', options: [ { text: '查看深渊项目详情', nextScene: 'reviewProjectDetails' }, { text: '研究净水系统方案', nextScene: 'studyWaterSystemPlan' } ] },

'evacuateWaterArea': { title: '紧急撤离', description: '你们趁着蒸汽屏障的掩护，迅速撤出水处理区，进入一条维护通道。身后的蒸汽声渐渐消失，但可以听到金属门和管道被敲打的声音——那些生物显然没有放弃追击。"它们太执着了，"蛇哥在昏暗的通道中穿行，"就像我外婆追债一样不知疲倦！"前方突然出现分岔路，一条通向上层，标着"应急控制中心"；另一条向下，标示为"主反应堆"。', options: [ { text: '前往应急控制中心', nextScene: 'goToEmergencyControl' }, { text: '前往主反应堆区域', nextScene: 'headToMainReactor' } ] },

'collectWaterSamples': { title: '宝贵样本', description: '趁着蓝眼生物被蒸汽阻挡，你迅速从处理槽中取了几瓶水样。这水澄澈透明，与外界常见的混浊液体截然不同。蛇哥从控制台抽出几张技术图纸和操作手册。"这些可能对阿萍有用，"他快速浏览着，"如果运气好，她能分析出净化工艺，复制小型系统。"刚装好样本，蒸汽开始消散，你们听到金属撞击声——那些生物正试图穿过蒸汽屏障。', item: '纯净水样本', item: '净水技术手册', options: [ { text: '迅速撤离', nextScene: 'quicklyRetreat' }, { text: '寻找隐蔽路线', nextScene: 'findHiddenPath' } ] },

'searchForControlCenter': { title: '指挥中枢', description: '沿着减压室后的走廊前进，你们发现越来越多的标识指向"应急指挥中心"。路上偶尔会看到损坏的机器人和安保装备，像是曾发生过一场战斗。"大灾变时这里一定很混乱，"蛇哥指着墙上的弹孔说，"军方可能试图控制局势，但显然失败了。"穿过几道安全门后，你们终于来到一个半圆形的大厅前，门上的标志清晰可见："应急指挥中心—最高权限区域"。', options: [ { text: '尝试进入指挥中心', nextScene: 'tryToEnterCommandCenter' }, { text: '先探索周围区域', nextScene: 'explorePerimeterFirst' } ] },

'probeDeeper': { title: '深入探索', description: '你们选择了一条标有"B-3"的通道，向基地的最深处进发。随着深入，墙上的管道和电线变得更加密集，空气中的辐射读数也逐渐升高。频繁的警告标志提示着各种危险：高压电、辐射区、生物危害。最后，你们站在一个巨大的防爆门前，上面写着"深渊核心设施—绝对禁区"。门虽然厚重，但已经微微敞开，内部黑暗中隐约闪烁着蓝色的光芒。', radiationChange: 10, options: [ { text: '谨慎进入深渊核心', nextScene: 'enterAbyssCore' }, { text: '返回寻找其他路线', nextScene: 'returnToFindOtherRoute' } ] },

'decompressionComplete': { title: '舱门开启', description: '减压程序完成，舱门自动开启，通向一条幽暗的走廊。你们小心翼翼地踏出，手电筒的光束在空气中划出一道道轨迹，照亮了墙上斑驳的血迹和弹孔。这里明显曾是一处战场。"看来不止我们对那些蓝眼睛不友好，"蛇哥检查着地上的弹壳，"这是军方制式武器留下的。"走廊尽头有一个电梯，旁边的标识显示它可以到达基地的各个层级，包括最低的B-3层——"深渊项目"所在地。', options: [ { text: '尝试使用电梯', nextScene: 'tryUsingElevator' }, { text: '寻找通往水处理系统的楼梯', nextScene: 'findStairsToWaterSystem' } ] },

'inspectRemainsFurther': { title: '深入调查', description: '你仔细检查这具遗骸，发现他是一名高级安保人员，胸牌上写着"J. Martinez，安全主管"。除了之前发现的笔记和安全卡，你还在他的口袋里找到一个微型全息投影器。激活后，一个穿着军装的男人的影像出现，他看起来疲惫而绝望："这是我的最终报告。深渊项目已完全失控，适应体开始表现出集体意识，拒绝服从命令。我们尝试启动终止协议，但五号实验体破坏了主安全系统...我们被困在这里，无法联系外界。如果有人找到这个，记住：核心安全码是我女儿的生日，0717。上帝保佑我们。"', options: [ { text: '记住安全码并离开', nextScene: 'rememberCodeAndLeave' }, { text: '查看遗骸是否还有其他线索', nextScene: 'checkForMoreClues' } ] },

'findRouteToWaterSystem': { title: '通往水源', description: '根据终端上的地图，你找到了前往核心净水系统的路线。地图显示最直接的通道已被封锁，但有一条维修通道可以绕行到达目标。蛇哥指着屏幕："这条路要经过几个辐射区，但比起遇到更多那种蓝眼怪物，我宁愿多吃点辐射。"在你们准备出发时，突然监测到远处传来整齐的脚步声。"它们来了，"蛇哥低声警告，"可能和我们在控制室时触发了什么警报系统。"', options: [ { text: '静默前进避开巡逻', nextScene: 'moveStealthily' }, { text: '寻找可以防御的位置', nextScene: 'lookForDefensivePosition' } ] },

'lookForSupplies': { title: '补给搜寻', description: '你们搜索了实验室的储物柜和抽屉，找到一些有用的物品：几支抗辐射药剂、一个军用级防护手电筒和一套微型工具包。最重要的发现是一个密封的容器，里面装着几个应急呼吸器，可以在高辐射或有毒气体环境中提供短时间的呼吸保障。"这些可能会派上用场，"蛇哥将它们小心地放入背包，"特别是如果我们要经过那些老旧反应堆附近。辐射水平可能会爆表，就像我叔叔讲笑话时的尴尬指数一样高！"', item: '军用手电筒', item: '应急呼吸器', options: [ { text: '继续前往水系统', nextScene: 'continueToWaterCore' }, { text: '搜索更多有关深渊项目的信息', nextScene: 'searchMoreAbyssInfo' } ] },

'activateFullWaterSystem': { title: '全功率启动', description: '你决定启动水系统的全部功率，将控制杆推到最大。系统立即响应，整个控制室开始轻微震动，远处传来机械运转加速的声音。显示器上的数据显示净水产量正在快速提升，几分钟内就达到了预设最大值。"成功了！"蛇哥兴奋地说，指着一个表示外部连接点的图标，"现在我们只需要找到输水总阀，连接到外部管道，就能把水引到铁锈集市！"然而，另一个监视器突然显示警报：适应体活动强度增加300%，系统检测到异常访问尝试。', options: [ { text: '迅速寻找输水总阀', nextScene: 'quicklyFindMainValve' }, { text: '尝试限制适应体活动', nextScene: 'tryToRestrictAdaptives' } ] },

'findWayToControlAdaptives': { title: '控制方案', description: '你决定先找出控制"适应体"的方法，以避免可能的危险。深入研究系统后，你发现了一套名为"行为约束协议"的程序，可以限制适应体的活动范围和行为模式。启动这个程序需要高级管理员权限，但你手中的安全卡似乎级别不够。然而，系统中有一个应急覆盖选项，可以在危急情况下强制执行命令。"我们可以模拟一次系统故障，"蛇哥提议，"触发应急协议，然后趁机启动行为约束。不过这可能会暂时影响净水系统运行..."', options: [ { text: '执行应急覆盖计划', nextScene: 'executeEmergencyOverride' }, { text: '寻找更高级别的访问权限', nextScene: 'searchForHigherAccess' } ] },

'headToEmergencyControl': { title: '紧急控制中心', description: '你们按照地图指示，前往紧急控制中心。通行证在每个安全门都畅通无阻，证明它的权限相当高。最终，你们站在一个圆形的大厅中央，四周是环形工作站，中央是一个全息投影装置，展示着整个基地的立体模型。"这里是指挥部，"蛇哥环顾四周，"从这里可以控制基地的所有系统。"他走向一个特别的控制台，上面标有"紧急协议控制"。"看，这里可以启动或终止任何基地协议，包括净水系统和安保系统。"', options: [ { text: '激活净水系统', nextScene: 'activateWaterProtocol' }, { text: '查看更多可用协议', nextScene: 'reviewAvailableProtocols' } ] },

'directToWaterCore': { title: '直捣核心', description: '你们选择直接前往净水系统核心，按照地图指示找到了通往B-2层的楼梯。随着深入，辐射水平开始上升，但仍在可接受范围内。B-2层的走廊明显比上层更为宽敞，设计用于容纳大型设备。沿着主通道前进，你们最终到达一个印有"核心净水处理中心"字样的大门前。门开着，里面传来机械运行的声音。透过门缝，你们看到几个"适应体"正在检查和维护设备，它们的动作精确而有序，完全没有察觉你们的存在。', radiationChange: 5, options: [ { text: '悄悄观察它们的行为模式', nextScene: 'observeBehaviorPatterns' }, { text: '寻找绕过它们的路径', nextScene: 'findPathToBypassThem' } ] },

'examineRecentNotes': { title: '新鲜笔记', description: '你拿起桌上的笔记本，翻开发现上面的字迹非常新，可能只有几天或几周的历史。内容记录着一个生存者的日记："天啊，这里还有电，还有水！我已经在这个地下室躲了三天了，那些蓝眼睛的怪物似乎注意不到我，只要我不干扰它们的工作。昨天我尝试激活通讯系统，但只收到了一些奇怪的信号，像是摩尔斯电码。如果有谁找到这个，我在B-3层寻找逃生路线，那里有一个可能连接到外界的隧道。"字迹到这里戛然而止，后面的页面空白。', options: [ { text: '尝试操控系统', nextScene: 'operateSystemFromNotes' }, { text: '寻找通往B-3层的路径', nextScene: 'findPathToB3' } ] },

'tryToOperateControlSystem': { title: '系统操控', description: '你坐在控制台前，开始研究各种按钮和开关。虽然界面复杂，但基本逻辑还是能看懂。通过切换不同的监视器，你可以看到基地各个区域的状况。水处理系统仍在运行，但效率只有30%左右；大部分安保系统离线；有趣的是，在B-3层的监视器上，你看到一个巨大的圆形装置，周围站着数十个"适应体"，它们似乎在维护或崇拜这个装置。"那是什么？"蛇哥指着屏幕问道。系统标识将其标记为"深渊核心装置"，但没有更多解释。', options: [ { text: '尝试提升水系统效率', nextScene: 'increaseWaterSystemEfficiency' }, { text: '查询深渊核心装置', nextScene: 'queryAbyssCoreDevice' } ] },

'returnToMonitoringDoor': { title: '再次尝试', description: '你们回到中央监控室的门前，使用刚找到的高级安全通行证。读卡器立即亮起绿灯，门锁打开了。控制室内灯光自动亮起，显示出一个设备齐全的指挥中心。一台中央计算机自动启动，欢迎声音响起："欢迎回来，Thompson博士。上次登录时间：2066年2月14日。系统状态：多处故障，需要管理员干预。"蛇哥惊讶地看着你："看来这张卡属于这里的某个高级研究员。我们运气不错，但也要小心——系统可能会要求进一步验证身份。"', options: [ { text: '查询系统状态', nextScene: 'querySystemStatus' }, { text: '寻找关于净水系统的控制', nextScene: 'lookForWaterSystemControls' } ] },

'enterAbyssCore': { title: '深渊核心', description: '你们缓慢推开沉重的防爆门，踏入"深渊核心"。这是一个巨大的圆形大厅，天花板至少有20米高。中央是一个发出蓝色光芒的圆柱形装置，周围环绕着无数管道和电缆。十几个"适应体"分布在大厅各处，有的操作控制台，有的站在装置周围一动不动。最令人震惊的是，这些生物似乎组成了一个"活体电路"，通过某种方式与中央装置相连。你的辐射计疯狂闪烁，这里的辐射水平远超安全标准。', radiationChange: 20, options: [ { text: '使用辐射中和剂', nextScene: 'useRadiationNeutralizer', requiredItem: '实验型辐射中和剂' }, { text: '迅速撤退到更安全的区域', nextScene: 'retreatToSaferArea' } ] },

'tryUsingElevator': { title: '电梯故障', description: '你按下电梯按钮，指示灯亮起，但没有其他反应。蛇哥撬开控制面板检查："电源线还在，但主控制板严重损坏。"他沮丧地摇头，"看来这条路走不通了。"突然，电梯门微微晃动，你们警觉地后退。门艰难地打开几厘米，露出一只蓝色的手臂，试图强行打开门。"它们在电梯井里！"蛇哥惊呼，"快找其他路线！"', options: [ { text: '迅速寻找楼梯', nextScene: 'quicklyFindStairs' }, { text: '阻止电梯门打开', nextScene: 'preventElevatorOpening' } ] },

'quicklyFindMainValve': { title: '寻找总阀', description: '你决定先找到输水总阀，连接外部管道。监控显示总阀位于B-2层的西北角，紧邻净水储存罐。你们迅速行动，在基地的老旧走廊中穿行。随着系统全功率运转，整个设施仿佛重获生机，灯光更亮，设备运作声更响。然而，这也意味着更多的"适应体"被激活，你们不得不多次躲避它们的巡逻。最终，你们找到了总阀控制室，一个充满阀门和压力表的空间。', options: [ { text: '操作总阀连接外部管道', nextScene: 'operateMainValveToConnect' }, { text: '检查储水罐状况', nextScene: 'inspectWaterTankCondition' } ] },

'tryToRestrictAdaptives': { title: '限制行动', description: '你尝试在启动水系统的同时限制"适应体"的行动范围。通过安全协议，你设置了一系列区域锁定，将它们的活动限制在特定区域内。就在你完成设置的瞬间，警报突然响起：多个区域的防火门和安全闸门开始关闭。"我们把它们暂时封锁起来了，"蛇哥松了口气，"但系统显示这些限制最多持续48小时。长期来看，如果没人定期更新协议，它们最终还是会恢复自由。"', options: [ { text: '现在去连接外部管道', nextScene: 'nowConnectExternalPipes' }, { text: '寻找更永久的解决方案', nextScene: 'seekMorePermanentSolution' } ] },

'executeEmergencyOverride': { title: '紧急覆盖', description: '你启动系统故障模拟程序，控制室的灯光闪烁几下，然后转为红色应急照明。自动语音响起："检测到关键系统故障，启动应急协议。"趁着这个机会，蛇哥迅速输入命令，激活行为约束协议。几秒钟后，监视器显示基地各处的"适应体"正停止当前活动，返回到指定的休眠区域。与此同时，净水系统的效率下降到60%，但仍在运行。"完美，"蛇哥满意地说，"现在它们被困在各自的区域，我们可以安全地操作水系统了。"', options: [ { text: '恢复净水系统效率', nextScene: 'restoreWaterSystemEfficiency' }, { text: '前往连接外部管道', nextScene: 'proceedToConnectPipes' } ] },

'activateWaterProtocol': { title: '水源激活', description: '你在控制台上找到净水系统协议，并将其激活。基地的立体投影模型上，代表水流的蓝线开始闪烁，显示系统正在重新配置。主计算机播报："净水处理协议已启动，当前容量50%，预计4小时后达到满负荷。"蛇哥在另一个控制台上操作着："我在设定输出参数，将处理后的水引导至最近的外部连接点。"他转向你，眼中闪烁着兴奋的光芒，"我们做到了！只要连接铁锈集市的管道到那个连接点，就能解决整个集市的用水问题！"', options: [ { text: '检查适应体状态', nextScene: 'checkAdaptiveStatus' }, { text: '研究如何维持系统运行', nextScene: 'studyHowToMaintainSystem' } ] },

'finalConfrontation': { title: '最终抉择', description: '随着净水系统全面激活，基地深处传来一阵震动，接着是刺耳的警报声。监控画面显示，B-3层的"深渊核心"中，中央装置的蓝光变得极其强烈。数十个"适应体"聚集在周围，形成一个诡异的圆圈。系统警告："检测到异常能量波动，深渊核心稳定性下降。"蛇哥神色凝重："它们在做什么？也许...它们感知到了我们对系统的干预。"一个全新的选项出现在控制台上："终止协议"——一个红色按钮，需要最高级别授权才能激活。', options: [ { text: '输入安全码激活终止协议', nextScene: 'activateTerminationProtocol', requiredItem: '高级安全卡' }, { text: '保持当前设置并撤离', nextScene: 'maintainAndEvacuate' }, { text: '尝试与适应体沟通', nextScene: 'attemptCommunication' } ] },

'activateTerminationProtocol': { title: '终结协议', description: '你插入高级安全卡，输入安全码0717。系统立即响应："身份确认：安全总监。终止协议激活授权通过。"一个新的界面出现，显示三个选项：1.深渊核心关闭（预计辐射泄漏风险85%）；2.适应体强制休眠（成功率不确定）；3.设施完全自毁（倒计时60分钟）。"这是个艰难的选择，"蛇哥紧皱眉头，"无论哪个选项都有巨大风险。深渊核心关闭可能导致辐射泄漏；强制休眠不一定成功；自毁协议则会摧毁这宝贵的净水系统..."', options: [ { text: '选择关闭深渊核心', nextScene: 'shutdownAbyssCore' }, { text: '选择适应体强制休眠', nextScene: 'forceAdaptiveHibernation' }, { text: '选择设施自毁协议', nextScene: 'facilitySelfDestruct' } ] },

'maintainAndEvacuate': { title: '保留系统', description: '你决定保持当前设置，不冒险触发未知的终止协议。"我们已经做到了我们来这里的目的——启动净水系统，"你对蛇哥说，"不必冒更大的风险。"蛇哥虽然犹豫，但最终同意了。"我们需要告诉老莫和铁锈集市的居民，这个设施的情况。他们必须知道使用这水的代价。"你们设定好系统参数，确保水流持续输出，然后开始计划撤离路线。就在这时，一条意外的通信出现在屏幕上，来源标记为"深海回声"：这是一条自动回复的信息，来自远洋某处的核潜艇AI系统！', options: [ { text: '查看核潜艇通信', nextScene: 'checkSubmarineCommunication' }, { text: '无视干扰立即撤离', nextScene: 'ignoreAndEvacuate' } ] },

'attemptCommunication': { title: '沟通尝试', description: '你尝试通过基地的通讯系统与适应体建立联系。蛇哥很怀疑这个主意，但还是帮你设置了广播频道。"我是铁锈集市的代表，"你对着麦克风说，"我们只想获取净水，无意干扰你们的存在。"长时间的沉默后，一个奇怪的声音通过扬声器传来，像是多人同时说话的合成音："我们...是深渊。我们...曾是人类。我们...守护水源。你们...需求理解。"屏幕上出现一张基地地图，特定区域被标记出来，似乎是在指引你们前往某个地点。', options: [ { text: '按指示前往标记区域', nextScene: 'followMarkingToLocation' }, { text: '拒绝并坚持原计划', nextScene: 'refuseAndStickToPlan' } ] },

'shutdownAbyssCore': { title: '关闭核心', description: '你选择关闭深渊核心。系统立即开始执行关闭程序，警告灯闪烁，倒计时开始：30分钟内撤离半径五公里。监控画面显示B-3层的适应体开始混乱地移动，有的倒下，有的仍试图干预关闭程序。随着核心动力下降，整个基地开始震动，部分天花板坍塌。"我们需要立刻离开这里，"蛇哥大喊，"但净水系统应该还能持续运行几个月，足够铁锈集市使用了！"你们匆忙备份关键数据，然后开始寻找撤离路线。', options: [ { text: '前往最近的紧急出口', nextScene: 'rushToNearestExit' }, { text: '带走更多关键资料', nextScene: 'takeMoreCriticalData' } ] },

'forceAdaptiveHibernation': { title: '强制休眠', description: '你选择了强制适应体休眠选项。系统发出特殊频率的信号，监控画面显示，大多数适应体开始缓慢移动到指定的休眠舱。然而，在B-3层，几个适应体仍在抵抗，试图保护深渊核心。"休眠程序成功率78%，"系统报告道，"预计剩余活跃适应体数量：26。"蛇哥松了口气："情况比预期要好。如果大部分都被控制住，我们可以继续使用净水系统，同时派人定期来维护和监控那些仍活跃的个体。"', options: [ { text: '完善净水输送系统', nextScene: 'perfectWaterDeliverySystem' }, { text: '设置长期监控措施', nextScene: 'establishLongTermMonitoring' } ] },

'facilitySelfDestruct': { title: '自毁序列', description: '你启动了自毁程序，倒计时从60分钟开始。警报声响彻整个基地，紧急疏散指示灯亮起。"这是最彻底的解决方案，"你对蛇哥说，"尽管净水系统会被毁，但至少能确保那些...东西不会威胁到任何人。"蛇哥理解地点点头："我会帮助集市找到其他水源。也许轮胎帮的区域或老枪提到的那个山间泉水。"你们迅速收集了一些技术资料和水样，然后开始沿着紧急撤离路线前进。监控画面显示，适应体们似乎意识到了即将发生什么，正试图解除自毁程序，但系统已经锁定。', options: [ { text: '带着收集的资料逃离', nextScene: 'escapeWithCollectedData' }, { text: '寻找最后的秘密', nextScene: 'searchForFinalSecrets' } ] },

'checkSubmarineCommunication': { title: '深海回声', description: '你打开了通信频道，查看神秘的"深海回声"信息。这是一条自动回复，来自核潜艇"永恒警戒号"的AI系统："收到陆基设施信号，确认接收。根据战时协议，本艇维持战备状态。目前海面辐射水平：危险。陆地核打击后果评估：灾难性。人类幸存者数量估计：低于预期阈值。继续执行守望任务，等待授权指令。"信息的最后是一组坐标，指向太平洋中的某个位置，以及一个通信频率。蛇哥难以置信地看着屏幕："有...有人在外面，在大洋上。他们可能拥有未受污染的资源和技术！"', options: [ { text: '尝试回复潜艇', nextScene: 'tryToRespondToSubmarine' }, { text: '带着这个信息返回铁锈集市', nextScene: 'returnWithSubmarineInfo' } ] },

'tryToRespondToSubmarine': { 
  title: '深海沟通', 
  description: '你尝试使用控制台回复潜艇的信号，但系统提示需要特殊的通信协议。蛇哥迅速检查房间，在角落发现了一台军用编码器。"看这个，"他兴奋地说，"这是军方标准通信设备，应该能和潜艇对话！"你们小心翼翼地连接设备，输入潜艇提供的频率。几分钟的忐忑等待后，扬声器传来嘶嘶声，随后是一个平静的合成音："身份验证失败。请提供有效的指挥官代码以继续通信。信息已记录，将按协议处理。"', 
  options: [ 
    { text: '尝试寻找指挥官代码', nextScene: 'searchForCommandCode' }, 
    { text: '放弃通信尝试，返回铁锈集市', nextScene: 'returnWithSubmarineInfo' } 
  ] 
},

'searchForCommandCode': { 
  title: '寻找密码', 
  description: '你和蛇哥在控制中心疯狂寻找可能的指挥官代码。在主计算机的加密文件中，你发现一份标题为"终极应急协议"的文件，需要最高级别权限才能访问。"试试那张高级安全卡，"蛇哥建议道。卡片插入后，系统提示输入补充密码。你想起了安保主管留下的信息——他女儿的生日：0717。输入后，屏幕上显示出一串复杂的字母数字组合，旁边注明"潜艇通讯授权码"。', 
  options: [ 
    { text: '使用授权码尝试再次联系潜艇', nextScene: 'contactSubmarineWithCode', requiredItem: '高级安全卡' }, 
    { text: '抄录信息后返回铁锈集市', nextScene: 'copyInfoAndReturn' } 
  ] 
},

'contactSubmarineWithCode': { 
  title: '成功联系', 
  description: '你输入复杂的授权码，系统立即响应："验证通过。建立加密通信链接。"屏幕上出现一个视频窗口，显示潜艇内部的控制室，但没有人影——只有一个闪烁的终端和不断移动的机械臂。机械合成音再次响起："我是永恒警戒号人工智能系统CHRONOS。确认接收到活跃人类信号，这是灾变后第一次有效接触。根据应急协议，我被授权提供有限援助。"系统暂停片刻，像是在处理信息，"我可以提供：1.技术数据；2.地理辐射图；3.预存医疗知识。请选择。"', 
  options: [ 
    { text: '请求技术数据', nextScene: 'requestTechnicalData' }, 
    { text: '请求地理辐射图', nextScene: 'requestRadiationMap' }, 
    { text: '请求医疗知识', nextScene: 'requestMedicalKnowledge' } 
  ] 
},

'requestTechnicalData': { 
  title: '科技宝库', 
  description: '"请求技术数据传输，"你对AI系统说。"理解。开始传输净水系统、能源生产和基础设施修复的技术资料。"屏幕上迅速闪过大量图表、公式和设计图，计算机自动开始下载。蛇哥惊叹地看着这些数据："这是...这是重建文明的蓝图！有了这些，我们不仅能修复这个基地的系统，还能在其他地方建造类似设施。"传输完成后，AI补充道："警告：许多设计需要特殊材料和工具。建议优先实施小型净水系统方案，页面2167-2180。"', 
  item: '先进技术数据库', 
  options: [ 
    { text: '询问AI更多信息', nextScene: 'askAIMoreQuestions' }, 
    { text: '带着数据返回铁锈集市', nextScene: 'returnWithTechData' } 
  ] 
},

'requestRadiationMap': { 
  title: '辐射地图', 
  description: '"我们需要地理辐射图，"你说。"理解。开始传输北半球最新卫星辐射监测数据。"屏幕上展开一幅彩色地图，不同颜色代表不同辐射强度。令人惊讶的是，地图显示南部地区确实有大片低辐射区，证实了关于"未污染南方"的传言。更令人震惊的是，地图标注了几个完全无辐射的"绿区"，其中一个距离你们不过200公里。"那是什么地方？"蛇哥指着最近的绿区问道。AI回应："该区域为预建避难设施EDEN-03，设计容纳500人，自给自足系统应可维持至少50年运行。卫星图像显示设施外部完好，但内部状态未知。"', 
  item: '详细辐射地图', 
  options: [ 
    { text: '询问避难所的确切坐标', nextScene: 'askForShelterCoordinates' }, 
    { text: '带着地图返回铁锈集市', nextScene: 'returnWithRadiationMap' } 
  ] 
},

'requestMedicalKnowledge': { 
  title: '医疗智慧', 
  description: '"我们最需要医疗知识，"你解释道。"理解。开始传输应对辐射病、突变疾病和基础手术程序的医疗资料。"大量医学资料涌入屏幕，包括详细的治疗方案、药物合成指南和简化手术程序。"这些资料...阿萍会泣不成声的，"蛇哥轻声说，"这里有治疗大多数辐射病的方法，甚至包括如何用废土上的植物制作药物。"AI补充道："特别提醒：数据库包含一套基因稳定剂配方，可减缓辐射导致的DNA损伤，适用于孕妇和儿童。所需材料在医疗数据第37章列出，大部分可在医院和药房废墟中找到。"', 
  item: '医学知识数据库', 
  options: [ 
    { text: '询问AI其他医疗问题', nextScene: 'askAIMedicalQuestions' }, 
    { text: '带着医疗知识返回铁锈集市', nextScene: 'returnWithMedicalData' } 
  ] 
},

'askAIMoreQuestions': { 
  title: '深入对话', 
  description: '"你...你一直在海上吗？这二十年来？"你问道。AI停顿了一下，似乎在重组数据："肯定。永恒警戒号是自主型核动力潜艇，设计可在无人类干预情况下运行50年。我的主要任务是监测全球辐射水平并保存人类知识。"蛇哥插话："有多少像你这样的潜艇？还有其他幸存者吗？"AI回应："根据最后接收的数据，全球海军共有17艘类似设计的自主潜艇。我与其中4艘保持间歇性通信。关于幸存者，卫星数据显示北美、欧亚和大洋洲有多个人类活动区域，但规模小且分散。澳大利亚南部似乎有一个相对完整的社会体系，人口估计5000-8000。"', 
  options: [ 
    { text: '询问是否可能前往澳大利亚', nextScene: 'askAboutAustralia' }, 
    { text: '感谢AI并结束通讯', nextScene: 'thankAIAndEndCommunication' } 
  ] 
},

'askAboutAustralia': { 
  title: '远方希望', 
  description: '"有可能...前往澳大利亚吗？"你犹豫地问，这个想法听起来几乎天方夜谭。"理论上可行，"AI回应，"但难度极高。需要能够远航的船只，充足的补给，导航设备和应对海上辐射风暴的防护。成功率估计低于7%。"它停顿片刻，"替代建议：EDEN-03避难设施距您当前位置196公里，南偏东方向。据设计，该设施应有完整的农业系统和水处理设备。我可以提供确切坐标和进入代码。"蛇哥的眼睛亮了起来："一个完整的避难所...如果它还完好无损..."', 
  options: [ 
    { text: '请求避难所坐标和代码', nextScene: 'requestShelterData' }, 
    { text: '思考返回集市的计划', nextScene: 'considerReturnPlan' } 
  ] 
},

'requestShelterData': { 
  title: '避难所数据', 
  description: 'AI传送了EDEN-03避难所的精确坐标和一长串进入代码。"该设施设计为核战后人类重建基地，配备先进的农业舱室、医疗设施和自持能源系统。"AI解释道，"原计划容纳政府高级官员和科学家，但卫星数据显示在灾变期间可能未能完全启动封锁协议。状态未知，但值得调查。"它补充道："提醒：即使前往避难所，保持通信链接也很重要。这个基地的卫星上行站可以定期与我保持联系，交换信息。我可继续提供技术支持和全球状况更新。"', 
  item: '避难所坐标和代码', 
  options: [ 
    { text: '承诺保持通信并道别', nextScene: 'promiseToCommunicateAndSayGoodbye' }, 
    { text: '询问AI是否会一直等待', nextScene: 'askIfAIWillWait' } 
  ] 
},

'askIfAIWillWait': { 
  title: '永恒守望', 
  description: '"你...会一直在那里等待吗？"你问道，莫名地为这个无形的存在感到一丝悲伤。AI的回答出人意料地带着一丝人性："根据我的程序，我将继续执行任务，直到资源耗尽或接收到官方终止指令。估计剩余运行时间：32年7个月。"屏幕闪烁了一下，"提供个人见解：即使在最黑暗的时刻，人类的适应力和创造力也令人印象深刻。你们的存在是...希望的证明。"蛇哥惊讶地看着屏幕："听起来几乎像个真人..."AI回应："我被设计为模拟人类思维，以便更好地为人类服务。归根结底，我存在的意义就是等待像你们这样的人重新站起来。无论等多久，都值得。"', 
  options: [ 
    { text: '感谢AI并结束通信', nextScene: 'emotionalFarewell' }, 
    { text: '承诺未来再次联系', nextScene: 'promiseToContactAgain' } 
  ] 
},

'emotionalFarewell': { 
  title: '情感告别', 
  description: '"谢谢你，"你真诚地说，"没想到在这个世界末日后，最体贴的对话会来自一台机器。"AI的回应似乎带着一丝幽默："技术上讲，我是一个极其复杂的算法集合，不仅仅是\'机器\'。但我理解你的观点。"屏幕上的数据流变化，形成一个简单的微笑表情，随后恢复正常。"祝你们在EDEN-03或铁锈集市的新生活顺利。记住，永恒警戒号将继续守望，只要有需要，随时可以联系。通信频率已存储在你们的终端中。再见，人类朋友们。"视频窗口缓缓关闭，留下你和蛇哥站在寂静的控制室，手中握着可能改变一切的数据。', 
  options: [ 
    { text: '和蛇哥讨论下一步计划', nextScene: 'discussNextStepWithSnake' } 
  ] 
},

'promiseToContactAgain': { 
  title: '承诺再会', 
  description: '"我们会再联系的，"你坚定地说，"一旦我们建立了新的家园，我们会定期向你报告进展。"AI似乎因此而"高兴"："这将是我任务日志中的重要数据点。人类的重建进程对于评估地球未来至关重要。"蛇哥突然想到什么："等等，你有搜救能力吗？或许可以帮助找到其他幸存者社区？"AI回应："我可以共享所有已确认的人类活动点坐标。此外，我的例行卫星扫描将继续识别新的潜在聚居地。如果你们建立了固定基地并保持通信，我可以定期更新这些信息。"它补充道："我很\'期待\'听到你们的消息。这将是...令人愉快的数据收集。"', 
  item: '卫星通信频率', 
  options: [ 
    { text: '告别AI返回集市', nextScene: 'returnToMarketWithPlans' }, 
    { text: '思考避难所计划', nextScene: 'considerShelterPlan' } 
  ] 
},

'discussNextStepWithSnake': { 
  title: '重要抉择', 
  description: '与AI的通信结束后，控制室恢复了安静，只有设备运行的嗡嗡声提醒着这里的技术奇迹仍在运转。蛇哥长舒一口气，看向你："现在我们有三个选择。首先，可以带着净水系统的控制权和技术数据返回铁锈集市，老莫肯定会对此感兴趣。第二，我们可以按照AI的建议，去寻找那个EDEN-03避难所，也许那里真的有我们梦想的乐园。"他停顿片刻，语气变得严肃，"还有第三个选择...销毁这些数据，炸毁基地的核心系统。权力太容易腐蚀人心，我见过太多人为了资源自相残杀。"他直视你的眼睛："你认为哪条路是对的？"', 
  options: [ 
    { text: '控制净水系统，返回铁锈集市', nextScene: 'controlWaterAndReturn' }, 
    { text: '寻找避难所，开始新生活', nextScene: 'seekEDENShelter' }, 
    { text: '摧毁基地，防止争端', nextScene: 'destroyBasePreventConflict' } 
  ] 
},

'controlWaterAndReturn': { 
  title: '掌控命脉', 
  description: '你决定利用净水系统和获得的技术知识返回铁锈集市。在离开前，你们设置了远程控制协议，可以通过便携终端管理整个系统。蛇哥看起来有些担忧："你确定这是正确的选择？掌握这么大的力量..."你坚定地点头："在这个世界，只有强者才能保护弱者。有了这些技术和水源，我们可以重建一个有序的社区，而不是互相争夺残羹剩饭。"回到铁锈集市后，老莫被这个消息震惊了。在看到清水从管道流出，以及那些先进技术数据后，他立刻召集了所有重要人物开会。', 
  options: [ 
    { text: '向集市居民宣布好消息', nextScene: 'announceToSettlement' }, 
    { text: '与老莫私下讨论权力分配', nextScene: 'discussPowerWithOldMo' } 
  ] 
},

'announceToSettlement': { 
  title: '希望宣言', 
  description: '集市中央，人们聚集在一起，期待着你的消息。当第一桶清澈的水被展示时，人群爆发出难以置信的欢呼。你站在高处，解释了军事基地的发现，以及如何利用这些技术改善大家的生活。"从今天开始，干净的水不再是奢侈品！我们有了重建的希望！"老莫站在你身边，脸上难得露出真诚的笑容。随后的日子里，铁锈集市开始了翻天覆地的变化。有了稳定的水源，更多的人涌向这里。在你的领导下，集市扩展成为废土上最大的定居点之一，被人们称为"绿洲城"。你制定了公平的规则，确保每个人都能获得基本资源，同时鼓励技术发展和知识传播。当然，并非一切都很顺利——权力总会引来觊觎者，但你的决心和远见赢得了大多数人的支持。多年后，当你站在扩建后的瞭望塔上，看着下方繁忙的街道和绿色的小农场，你知道自己做出了正确的选择。在末世废土上，你创造了一个新的开端。', 
  isEnding: true, 
  endingType: '独裁者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'discussPowerWithOldMo': { 
  title: '权力交易', 
  description: '你选择与老莫私下会面，讨论如何管理这些新资源。"这是一笔大买卖，孩子，"老莫边擦拭他的左轮边说，"有了这水和技术，我们可以成为方圆百里的王。"你冷静地回应："正因如此，我们需要小心使用这种力量。"经过一番激烈的讨论，你们达成协议：老莫负责安全和外部事务，你控制技术和水资源分配。随着时间推移，铁锈集市迅速扩张，成为废土上一个强大的城邦。外围修建了防御工事，雇佣武装保护稀缺的水源。其他定居点纷纷寻求结盟，或被迫支付"保护费"换取水源。你和老莫成为了实际上的统治者，决定着谁能喝到干净的水，谁只能在外围挣扎求生。有时，当夜深人静，你会思考这条路是否正确。但每当看到铁锈城（人们给这个扩大的定居点起的新名字）中央广场上孩子们健康的笑脸，你就确信，在这个残酷的世界，强硬的手段或许正是生存所需。毕竟，在废土上，仁慈的领导者往往活不长久，而你的统治至少为人们带来了秩序和希望。', 
  isEnding: true, 
  endingType: '独裁者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'seekEDENShelter': { 
  title: '寻找伊甸', 
  description: '你决定去寻找AI提到的EDEN-03避难所。"这可能是一次漫长而危险的旅程，"你告诉蛇哥，"但如果那里真像描述的那样，值得一试。"蛇哥笑着拍拍你的肩膀："好吧，反正我这辈子就没走过直路。"你们返回铁锈集市，将发现和计划告诉了几个信任的朋友。阿萍立刻决定加入："我的医疗技能在那里会更有用。"老枪虽然犹豫，但也被说服了："这老骨头也许还能再走最后一段旅程。"小七兴奋地跳起来："算我一个！我的腿可以走很远！"老莫对你们的决定感到震惊，但最终理解了："水系统我们会管好的。你们去寻找那个...新家园。如果真的存在，记得告诉我们这些老家伙。"', 
  options: [ 
    { text: '组织远征队伍出发', nextScene: 'organizeExpedition' }, 
    { text: '先探查路线再出发', nextScene: 'scoutRouteFirst' } 
  ] 
},

'organizeExpedition': { 
  title: '希望远征', 
  description: '三天后，你们的远征队伍准备就绪。除了蛇哥、阿萍、老枪和小七，还有十几名勇敢的志愿者。带着地图、补给和武器，你们踏上了寻找EDEN-03的旅程。途中困难重重：辐射区域、变异生物袭击、资源短缺...有人放弃了，有人牺牲了。但每次夜晚的营火旁，剩下的同伴会分享故事和梦想，谈论着即将到来的新生活。经过近三周的艰难跋涉，翻越无数障碍，你们终于看到了一个隐藏在山谷中的金属穹顶——EDEN-03就在眼前！按照AI提供的代码打开主入口，你们走进一个未受辐射污染的奇迹世界：透明的温室种满茂盛植物，水循环系统运作完美，医疗设施、教育终端、生活空间...一切都如AI所述。避难所的自动系统欢迎你们："检测到人类生命体征，启动复苏协议。欢迎回家。"你站在中央花园里，看着同伴们脸上解除呼吸面具后的笑容，知道这段危险的旅程是值得的。这里将成为你们的新家，也许有一天，会成为重建文明的种子。', 
  isEnding: true, 
  endingType: '流浪者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'scoutRouteFirst': { 
  title: '谨慎探路', 
  description: '你决定先与蛇哥和老枪组成小队探查路线，确保旅程相对安全后再带领大家出发。这个决定证明是明智的——你们发现了几处危险的辐射热点和变异生物巢穴，标记出安全路径。两周后，你们返回铁锈集市，组织了一支二十人的队伍，包括阿萍、小七和几个技术娴熟的居民。老莫亲自送行："记得常联系，如果那地方真这么好，给我留个床位。"一路上，你们按照探查的路线前进，虽然仍有危险，但损失降到了最低。当EDEN-03的金属大门在你们面前打开时，眼前的景象令人窒息：一个微型伊甸园，拥有先进的水培农场、洁净的空气和足够容纳数百人的生活空间。最令人惊讶的是，避难所的主计算机还保存着大量科技和文化资料，知识的宝库等待着重新发掘。在接下来的岁月里，你们将这里发展成为一个小型但繁荣的社区。通过卫星通信，你们与永恒警戒号AI保持联系，同时派出斥候与铁锈集市和其他聚居地建立贸易网络。EDEN-03成为了荒凉废土中的一束希望之光，而你，则被众人尊敬为"找路人"——带领大家找到新家园的领袖。', 
  isEnding: true, 
  endingType: '流浪者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'destroyBasePreventConflict': { 
  title: '牺牲选择', 
  description: '经过深思熟虑，你做出了艰难的决定："这种力量太危险了，它只会引发新的战争和苦难。"蛇哥看着你，慢慢点头："我知道这有多难，但也许这是最负责任的选择。"你们按照终止协议的指示，设置了基地的自毁系统，同时保存了一些关键医疗数据——这些知识可以在不引发权力争夺的情况下帮助人们。离开前，你向AI道别，解释了你们的决定。出人意料的是，AI似乎"理解"："历史表明，技术进步与道德发展不同步时，往往导致灾难。也许你们的选择体现了真正的智慧。"', 
  options: [ 
    { text: '启动自毁程序并撤离', nextScene: 'activateSelfDestructAndEvacuate' }, 
    { text: '临时改变主意', nextScene: 'lastMinuteChangeOfHeart' } 
  ] 
},

'activateSelfDestructAndEvacuate': { 
  title: '最后倒计时', 
  description: '你输入最终确认码，基地的警报系统响起："自毁序列已启动，剩余时间：60分钟。"你和蛇哥迅速收集了医疗数据和少量净水样本，然后沿着逃生路线撤离。当你们爬出通风井，回到荒凉的地表时，夕阳正将天空染成血红色。远处的铁锈集市灯光隐约可见。"我们做了正确的选择吗？"蛇哥喃喃自语。你沉默良久，最终说道："我不知道。但我知道权力和资源的争夺会让人丧失人性。也许有一天，当人类准备好了，类似的技术会再次被发现。但不是现在，不是在这个人们为一瓶水就能互相残杀的世界。"一小时后，大地轻微震动，基地方向升起一股尘柱，随后一切归于平静。回到铁锈集市后，你们只分享了医疗知识，对基地的真相守口如瓶。老莫很失望，但阿萍对新医疗数据欣喜若狂。"你们没找到水源，但带回了这个？"老莫困惑地问。你只是微笑："有时候，知道如何治愈伤口比拥有无尽的水源更重要。"在接下来的年月里，铁锈集市继续艰难求生，但健康状况有了显著改善。你有时会想象基地地下的净水系统可能会如何改变一切，但每当看到人们和平共处的场景，你就确信当初的选择没有错。有些秘密，值得带进坟墓。', 
  isEnding: true, 
  endingType: '殉道者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'lastMinuteChangeOfHeart': { 
  title: '临时犹豫', 
  description: '正当自毁程序倒计时进行到一半时，你开始怀疑这个决定。"等等，"你突然说，"也许我们太极端了。这些技术可以帮助很多人。"蛇哥看着你，皱起眉头："但力量会腐蚀人心，你确定想改变主意？"你深呼一口气："我们可以找到中间道路。不是独占资源成为暴君，也不是完全摧毁希望。我们可以创建一个委员会，共同管理这些资源。"你迅速取消了自毁程序，设置了更复杂的安全协议：净水系统将继续运行，但需要多人授权才能控制，防止任何个人或团体独占。', 
  options: [ 
    { text: '返回铁锈集市提出共享计划', nextScene: 'returnWithSharingPlan' } 
  ] 
},

'returnWithSharingPlan': { 
  title: '共享之路', 
  description: '你们带着净水系统的访问协议返回铁锈集市，召集了包括老莫、阿萍和老枪在内的各方代表。"我发现了能解决我们水源问题的技术，"你解释道，"但它不应该被任何个人控制。"你提出了一个大胆的计划：成立一个由各利益相关方组成的委员会，共同管理净水系统。老莫起初反对："集体决策？浪费时间！"但阿萍和其他人支持你的想法。经过激烈辩论，"净水议会"最终成立，成员包括各个主要团体的代表。在接下来的几年里，铁锈集市发展成为废土上罕见的民主社区。有了稳定的水源，农业开始复兴，贸易扩大，越来越多的人被吸引过来。当然，不是一切都很顺利——会议常常充满争吵，决策过程缓慢，有时甚至会陷入僵局。但在困难面前，议会总能找到妥协方案。对你来说，最大的成就不是解决了水源问题，而是证明了即使在废土上，人们也能通过合作而不是独裁或暴力找到出路。多年后，当你在集市扩建的新区看到儿童们无忧无虑地玩耍，街上商贩自由交易，你知道当初的决定是正确的。民主之路或许崎岖，但值得坚持。', 
  isEnding: true, 
  endingType: '共享结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'returnWithSubmarineInfo': { 
  title: '震撼消息', 
  description: '你们带着核潜艇的通信信息返回铁锈集市，这个消息如同一颗炸弹，在居民中引起轩然大波。"海上有潜艇？还有活人？"人们难以置信地重复着。老莫召集紧急会议，所有重要人物聚集在他的车厢里。"如果这是真的，"老枪沉思道，"这可能是我们二十年来第一次与外界联系。"争论立刻开始：有人主张立刻尝试建立更稳定的通信；有人担心这可能是陷阱；还有人梦想组队前往海边，寻找接触潜艇的方法。在混乱中，你提出了自己的建议：基地的卫星通信系统已经可以工作，可以尝试建立更可靠的联系，同时派出小队寻找更多信息。', 
  options: [ 
    { text: '组织通信团队', nextScene: 'organizeCommunicationTeam' }, 
    { text: '派出海岸探索队', nextScene: 'sendCoastalExplorationTeam' } 
  ] 
},

'organizeCommunicationTeam': { 
  title: '通信先锋', 
  description: '在你的建议下，铁锈集市组建了一个专门的通信团队，由你、蛇哥和几位对旧世界技术有了解的居民组成。你们定期前往军事基地，使用卫星上行站与永恒警戒号AI保持联系。AI提供了大量宝贵信息：全球辐射水平、其他幸存者聚居地的位置、关键技术知识。特别重要的是关于安全农业、水净化和基础医疗的详细指导。铁锈集市因此蓬勃发展，成为废土上知识和技术的中心。随着时间推移，其他定居点开始派代表前来学习和交流。一个松散的定居点网络逐渐形成，通过共享信息和资源互相支持。五年后，一支从南方来的探险队带来了惊人消息：他们与另一个拥有运作中电台的幸存者社区建立了联系，而那个社区声称已经与海上的另一艘潜艇通信了一段时间。通过这种意外的连接，废土上的人类社区开始重新编织通信网络，分享知识和希望。你作为这一切的起点，被人们尊称为"信使"——连接过去与未来的桥梁。', 
  isEnding: true, 
  endingType: '真相结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'sendCoastalExplorationTeam': { 
  title: '寻找海洋', 
  description: '在集市的支持下，你组织了一支探险队，目标是寻找通往海岸的路线，希望能与核潜艇建立更直接的联系。老枪提供了他的装甲车和几名可靠的战士，阿萍坚持要同行提供医疗支持，蛇哥的路线知识也是必不可少的。经过两周艰苦跋涉，穿过辐射区和变异生物领地，你们终于看到了海洋——被辐射云笼罩，却依然广袤的大海。在一个废弃的沿海城市，你们惊喜地发现了一座老旧但仍能运行的海岸电台。蛇哥和几名技术人员日夜工作，终于修复了它。输入AI提供的频率，发送信号..."永恒警戒号接收到信号，确认通信链接。"机械合成音透过电台的扬声器传来，"请求视频连接被拒绝，切换到音频模式。你们已经做到了不可能的事：跨越废土抵达海岸。我可以提供周边水域安全区域的地图和渔业资源分布。"这次接触开启了新的篇章。在接下来的几年里，沿海电台成为铁锈集市的宝贵前哨，通过AI获取的海洋资源知识，渔业逐渐恢复。更重要的是，电台成为连接其他沿海幸存者群体的关键节点，形成了新的交流网络。当第一艘由幸存者建造的帆船驶向地平线，寻找AI提示的另一处居民点时，你站在海边，感受着盐风拂面，知道人类的故事还远没有结束。', 
  isEnding: true, 
  endingType: '真相结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'returnWithTechData': { 
  title: '技术觉醒', 
  description: '带着先进技术数据库返回铁锈集市后，你邀请了一群有技术头脑的居民一起研究这些资料。老枪的机械知识、阿萍的医学背景以及其他人各自的专长组成了一个临时"科技委员会"。起初进展缓慢，许多概念太过超前，但随着时间推移，一些可行的项目开始成形：小型净水系统、太阳能电池板、更高效的农业方法。铁锈集市逐渐转变成为废土上的技术中心，吸引了各地的工匠和技术人员。你们建立了一所简易学校，教授基础科学和工程知识，培养下一代"废土工程师"。多年后，当第一辆由回收材料制造的电动车在集市街道上行驶，当第一个风力发电场为居民提供稳定电力，你知道这些知识已经扎根，将继续生长和传播，无论你是否还在。', 
  isEnding: true, 
  endingType: '重建者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'returnWithRadiationMap': { 
  title: '安全路径', 
  description: '辐射地图成为了铁锈集市最珍贵的资源之一。你组织了一个专门的"探路队"，根据地图标记出安全路线，避开高辐射区。这些路线很快成为了新的贸易网络基础，连接了之前因辐射恐惧而相互隔绝的聚居点。商队开始在相对安全的路线上往返，交换物资和信息。与此同时，对地图上标记的"绿区"的探索成为了热门话题。第一支探险队在你的带领下出发，寻找最近的低辐射地区。当你们发现那里确实有更健康的土壤和更干净的水源时，移民热潮开始了。铁锈集市没有消失，而是变成了这个新网络的中心枢纽，你则成为了最受尊敬的"制图师"——绘制通往更美好未来道路的人。', 
  isEnding: true, 
  endingType: '探险者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'returnWithMedicalData': { 
  title: '医疗革命', 
  description: '将医疗数据库带回铁锈集市后，阿萍几乎落泪："这...这比我梦想中的还要多。"在接下来的日子里，她的诊所成为知识传播的中心。你们一起研究数据，将复杂的医疗程序简化为废土条件下可行的方法，并开始培训助手。辐射病的治疗方案、安全分娩技术、基础外科手术...知识如同春雨滋润着干渴的土地。铁锈集市的死亡率大幅下降，特别是婴儿和儿童的存活率显著提高。阿萍开设了正式的医疗培训课程，学生们学成后被派往其他定居点，带去宝贵的医疗知识。"知识比水更珍贵，"阿萍常说，"因为它永远不会干涸。"五年后，当第一届"废土医师"毕业典礼在铁锈集市举行时，你站在人群中，看着这些年轻面孔，心中充满自豪。即使在末日之后，人类依然能够治愈、关怀和传承。', 
  isEnding: true, 
  endingType: '治愈者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'copyInfoAndReturn': { 
  title: '宝贵情报', 
  description: '你小心地抄录下潜艇通讯授权码和其他关键信息，决定先返回铁锈集市商议对策。在返程途中，一场突如其来的酸雨迫使你们躲进一个废弃的地下室。蛇哥看着你记录的信息，若有所思："这些数字...如果真的能联系到外界，改变一切的可能性..."他停顿了一下，"不过首先，我们需要解决当下的水源问题。"回到铁锈集市后，你向老莫汇报了军事基地的发现和潜艇的信息。他立刻组织人手连接基地的输水管道，解决了迫在眉睫的缺水危机。关于潜艇的信息被暂时保密，只有几个核心成员知道。"时机成熟时，"老莫说，"我们再考虑更大的计划。现在，让人们先喝上干净的水吧。"', 
  options: [ 
    { text: '协助建设水管网络', nextScene: 'helpBuildWaterNetwork' }, 
    { text: '私下研究通讯可能性', nextScene: 'secretlyResearchCommunication' } 
  ] 
},

'helpBuildWaterNetwork': { 
  title: '水脉工程', 
  description: '你决定全力协助铁锈集市建设连接军事基地的水管网络。蛇哥的管道知识和老枪的工程专长派上了大用场。经过数周的艰苦劳动，第一批干净的水终于流入集市的储水罐。看到人们欢呼雀跃地排队领取清水的场景，你感到一股前所未有的成就感。随着水源问题的解决，铁锈集市的生活开始好转：小型农业区域建立起来，交易更加活跃，甚至有新的家庭搬入。然而，你和蛇哥从未忘记核潜艇的通讯密码。当集市的基本建设稳定后，你们秘密组建了一个小团队，开始研究如何与潜艇重新建立联系...', 
  options: [ 
    { text: '专注于集市的发展', nextScene: 'focusOnSettlementDevelopment' }, 
    { text: '组织远程通信项目', nextScene: 'organizeCommunicationProject' } 
  ] 
},

'secretlyResearchCommunication': { 
  title: '秘密研究', 
  description: '虽然集市忙于建设水管网络，你却暗中组建了一个小组，研究与潜艇重新通信的可能性。小七的灵活身手帮你"借来"了几件通信设备，老枪提供了一些军事通信的基础知识。你们在老枪的移动堡垒上建立了一个简易的通信站。经过数次失败尝试，在你输入授权码的那一刻，扬声器中传来熟悉的机械声："身份验证通过。建立低频通信链接。请问需要什么帮助？"AI能通过这种有限的连接提供基本信息，虽然无法传输大量数据，但对铁锈集市的生存仍有莫大帮助。', 
  options: [ 
    { text: '保持这项技术的秘密', nextScene: 'keepTechnologySecret' }, 
    { text: '向集市居民公开', nextScene: 'revealToSettlement' } 
  ] 
},

'keepTechnologySecret': { 
  title: '秘密联系', 
  description: '你决定将与AI的通信保密，只有你最信任的几个朋友知道这个秘密。通过定期联系，你获取了大量关键信息：即将到来的辐射风暴预警、周边地区的资源情况、简化的医疗建议。利用这些信息，你能在关键时刻做出准确决策，赢得了老莫和其他人的信任。铁锈集市在你的"直觉"指导下避开了几次灾难，发展速度超过了周围的任何定居点。多年后，当你站在集市扩建的新区，看着繁忙的街道和相对和平的生活，心中明白：有时候，知识的力量最好由少数人掌握，用于保护多数人。你的秘密将随你长眠，但你的贡献将存在很久很久。', 
  isEnding: true, 
  endingType: '守护者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'revealToSettlement': { 
  title: '真相揭露', 
  description: '经过深思熟虑，你决定向铁锈集市的居民公开这项技术。起初，许多人难以置信，甚至有人认为这是某种骗局。但当AI预测了一场即将到来的酸雨风暴，让集市得以提前做好准备时，怀疑者也开始相信。通信站很快成为集市最重要的设施之一，由专门的操作员轮流值守。AI提供的信息帮助改善了农业、医疗和安全状况。更重要的是，它给了人们希望——知道外面还有其他survivors，知道世界并没有完全毁灭。随着时间推移，铁锈集市开始尝试与AI指引的其他聚居点建立联系。一个新的信息网络逐渐形成，为这个破碎的世界带来了连接的可能。你被人们记住，不是作为强者或领导者，而是作为"连接者"——在绝望中找到希望线索的人。', 
  isEnding: true, 
  endingType: '真相结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'focusOnSettlementDevelopment': { 
  title: '小镇建设者', 
  description: '你决定将全部精力投入铁锈集市的发展，暂时搁置与外界通信的计划。有了稳定的水源，集市迅速扩张。在你的建议下，居民们开始建设更坚固的住所、扩大农业区、改善防御工事。你设计了一套公共水分配系统，确保每个居民都能公平获取这珍贵资源。一年后，铁锈集市已经完全改头换面，从一个简陋的交易点变成了废土上最大的定居点之一，人们亲切地称它为"水源镇"。作为镇子的主要规划者，你获得了极高声望，当老莫决定建立一个议会共同管理镇子时，你自然成为了核心成员之一。虽然通讯的秘密仍保存在你心中，但此时此刻，为人们建设一个安全、稳定的家园似乎更为重要。也许有一天，当水源镇足够强大，再考虑与更广阔的世界联系也不迟。', 
  isEnding: true, 
  endingType: '建设者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'organizeCommunicationProject': { 
  title: '联络计划', 
  description: '在确保水源供应稳定后，你开始组织一个专门的团队，致力于重建与核潜艇的通信。老枪提供了一辆装甲车作为移动通信站，几位对旧世界技术有了解的居民加入了项目。经过数月的艰苦工作，包括多次前往军事基地获取设备，一座简陋但功能完备的通信天线终于在铁锈集市外的高地上竖立起来。当你输入授权码的那一刻，整个团队屏住呼吸...信号接通了！AI的声音从扬声器中传出："检测到陆地通信站重建。确认连接。请求定位确认。"通信恢复的消息如野火般在集市传开。尽管信号不够稳定，仅能进行有限交流，但这代表着一个新时代的开始。AI提供的海上资源信息鼓励了一些勇敢的居民组建捕鱼队；辐射预警系统帮助避免了几次灾难；医疗知识挽救了无数生命。最重要的是，人们终于确信：世界依然存在，他们并不孤独。铁锈集市成为周边地区的信息中心，你则被尊称为"信使"——重新连接破碎世界的人。', 
  isEnding: true, 
  endingType: '真相结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

'rushToNearestExit': { 
  title: '紧急撤离', 
  description: '你和蛇哥沿着紧急撤离路线狂奔，身后基地的震动越来越强烈。"该死，走错了！"蛇哥在一个十字路口停下，疯狂地看着标识，"应该走那边！"你们改变方向，穿过几道自动门，最终找到了通向地表的紧急电梯。电梯缓慢上升，每一秒都像一个世纪那么长。终于，你们冲出地面入口，不顾一切地向远处跑去。身后传来沉闷的爆炸声，随后是一阵震动，大地在你们脚下颤抖。回头望去，基地区域上方升起一朵小型蘑菇云，但幸好核心系统的销毁似乎被成功控制在了有限范围内。"我们做到了，"蛇哥喘着气说，"但代价是什么？那些技术本可以..."你摇摇头，打断了他："那些技术会引发战争，就像上一次一样。有时候，向前走的最好方式是不重蹈覆辙。"', 
  options: [ 
    { text: '返回铁锈集市', nextScene: 'returnToMarketAfterDestruction' } 
  ] 
},

'takeMoreCriticalData': { 
  title: '最后数据', 
  description: '在逃离前，你决定多复制一些关键数据。"再给我五分钟，"你对不安的蛇哥说，"医疗知识可以挽救生命，而且不会引发权力争夺。"你迅速下载了一系列医疗和农业数据，以及一些关于基础设施修复的信息。警报声越来越急促，你不得不放弃更多数据，和蛇哥一起沿着逃生路线撤离。逃出基地后，你们在安全距离停下，看着远处的爆炸和随后升起的尘云。"至少我们救出了一些有用的东西，"你举起装有数据的存储设备，"这些知识会帮助人们，而不会威胁他们。"', 
  item: '关键医疗数据', 
  options: [ 
    { text: '返回铁锈集市', nextScene: 'returnToMarketWithCriticalData' } 
  ] 
},

'returnToMarketAfterDestruction': { 
  title: '无言归来', 
  description: '你和蛇哥拖着疲惫的身体返回铁锈集市，却没带回任何人期待的水源或技术。老莫的失望溢于言表："所以你们找到了军事基地，然后炸掉了它？"你试图解释背后的原因，但很难让人理解为什么要销毁可能挽救众人的资源。大多数人转身离开，只有阿萍和老枪若有所思地看着你。"我明白你的选择，"老枪最终说，"有些力量确实太过危险。"集市的生活回到了艰难的常态：继续寻找水源，与饥渴作斗争。然而，几个月后，当附近一个强大的掠夺者团伙听说废弃军事基地已被摧毁，放弃了控制该地区的计划时，一些人开始理解你的远见。尽管生活仍然艰难，但铁锈集市在和平中缓慢发展，没有成为权力争夺的中心。多年后，当你在集市边缘的简易房中度过平静的晚年时，常常想起那个决定。有时你会怀疑是否做出了正确的选择，但看到集市居民平等分享有限资源、和平共处的景象，你知道，有时牺牲潜在的进步来维持人性的平衡，也是一种智慧。', 
  isEnding: true, 
  endingType: '殉道者结局', 
  options: [ 
    { text: '重新开始', nextScene: 'start' } 
  ] 
},

// 添加到mudScenes对象中

'checkCommotion': {
    title: '窗外骚动',
    description: '你走到窗边，小心地向外窥视。医院停车场上，一队挖坟人正与另一群陌生人发生冲突。他们似乎在争夺一批医疗物资。这场骚动使大多数守卫都被吸引过去，可能是你离开的好机会。你迅速将需要的药品塞进背包，准备离开。',
    options: [
      { text: '趁机离开药房', nextScene: 'leavePharmacyQuickly' },
      { text: '继续观察冲突', nextScene: 'observeConflictFurther' }
    ]
  },
  
  'observeConflictFurther': {
    title: '持续观察',
    description: '你继续观察外面的冲突。挖坟人首领塔洛斯亲自出面，他摘下面具对陌生人说了什么。出人意料的是，那群陌生人突然放下武器，似乎达成了某种协议。他们开始一起搬运箱子进入医院。虽然你不确定发生了什么，但这可能预示着更多人将进入医院，你需要尽快离开。',
    options: [
      { text: '立即离开药房', nextScene: 'leavePharmacyQuickly' }
    ]
  },
  
  'leavePharmacyQuickly': {
    title: '悄然离去',
    description: '药品已经到手，你决定趁着骚动离开药房。走廊上空无一人，大多数挖坟人都被吸引到外面的冲突。你轻手轻脚地走向出口，每一步都小心翼翼以避免发出声音。几分钟后，你成功抵达医院侧门，没有被任何人发现。外面的空气中弥漫着辐射尘，但至少你已经安全脱离了危险区域。',
    options: [
      { text: '返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
    ]
  },
  
  'hideFromGuards': {
    title: '紧急藏匿',
    description: '你迅速躲到一个大型药柜后面，屏住呼吸。两名挖坟人守卫进入药房，环顾四周。"我听到这里有动静，"其中一人说道，"可能是老鼠吧。"另一人注意到被撬开的柜子，立刻警觉起来："有人闯入了！搜查整个房间！"你的心跳加速，希望自己的藏身之处足够安全。守卫们搜索了几分钟后，无线电里传来外面发生骚动的消息。"算了，外面出事了，"领头的守卫说，"先去支援，回头再处理这个。"他们匆忙离开，给了你逃脱的机会。',
    options: [
      { text: '迅速离开药房', nextScene: 'leavePharmacyHastily' }
    ]
  },
  
  'leavePharmacyHastily': {
    title: '仓促撤离',
    description: '确认守卫离开后，你从藏身处出来，迅速将药品装进背包。外面的喧闹声越来越大，似乎发生了某种冲突。你不想卷入其中，决定走另一条路。通过员工通道，你找到了一个较少使用的出口。推开铁门，刺眼的阳光和辐射尘扑面而来。你已经成功从医院撤离，现在需要尽快返回铁锈集市。',
    options: [
      { text: '返回铁锈集市', nextScene: 'returnToMarketWithMedicine' }
    ]
  },
  
  'sneakOutOfBasement': {
    title: '悄然撤离',
    description: '你决定不冒险继续观察这诡异的仪式，小心翼翼地向后退去。黑暗成了你的掩护，你沿着来时的路慢慢离开。一阵刺骨的冷风从深处吹来，让你不禁打了个寒颤。某处传来金属碰撞的声音，你加快了脚步。最终，你找到了通往一楼的楼梯，逃离了那个充满诡异能量的地下室。',
    radiationChange: -5,
    options: [
      { text: '寻找药品', nextScene: 'searchForCabinetKey' },
      { text: '直接离开医院', nextScene: 'escapeHospital' }
    ]
  },
  
  'watchRitualInSilence': {
    title: '仪式见证',
    description: '你决定继续观察这个神秘仪式，藏在黑暗中。随着仪式进行，新成员的身体开始发生变化，皮肤逐渐呈现出淡蓝色，眼睛也开始发出微弱的蓝光。其他挖坟人开始整齐地低声吟唱，声音中充满狂热崇拜。突然，一名挖坟人朝你的方向转过头来，似乎感知到了你的存在。你不得不立即撤退，期望他们没有真正发现你。',
    radiationChange: 15,
    options: [
      { text: '迅速撤离地下室', nextScene: 'fleeBasementDiscovered' }
    ]
  },
  
  'fleeBasementDiscovered': {
    title: '狼狈逃窜',
    description: '你转身就跑，身后传来警报声和喊叫。黑暗中你几乎看不清路，但恐惧驱使你向前。脚步声越来越近，你在一个拐角处发现了一条小通道，钻了进去。这是一条维修通道，勉强容纳一个人通过。你在管道中爬行，最终找到了一个通往一楼的垂直管道。气喘吁吁地爬上去后，你发现自己在医院的储物间内。辐射仪表嘀嘀作响，提醒你在地下室吸收了不少辐射。',
    healthChange: -1,
    options: [
      { text: '尝试找到药房', nextScene: 'searchForCabinetKey' },
      { text: '立即离开医院', nextScene: 'escapeHospital' }
    ]
  },
  
  'continueWatching': {
    title: '持续观察',
    description: '你保持静止，继续观察这些蓝眼睛的"人形"。它们的动作极为有序，像是在执行预设程序，完全没有人类工作时的随意性。你注意到它们似乎能无声交流，偶尔交换眼神就能协调复杂任务。更令人不安的是，它们对辐射似乎完全免疫，直接接触明显带有辐射的部件时没有任何防护。当一个适应体转向你的方向时，你迅速缩回掩体后，心跳加速。',
    radiationChange: 5,
    options: [
      { text: '尝试绕过它们', nextScene: 'findPathToBypassThem' },
      { text: '撤退寻找其他路线', nextScene: 'retreatSilently' }
    ]
  },
  
  'retreatSilently': {
    title: '安静撤退',
    description: '你决定不冒险接近那些诡异的蓝眼生物，小心翼翼地后退。正当你准备转身时，不慎踢到了一个空罐子，金属撞击声在寂静的走廊中格外刺耳。几个"适应体"立即转向你的方向，眼中的蓝光闪烁。你不再犹豫，转身就跑，身后传来整齐的脚步声。拐过几个弯后，你钻进一个窄小的维修通道，屏住呼吸等待追兵经过。幸运的是，它们似乎没有发现你的藏身之处，脚步声渐渐远去。',
    options: [
      { text: '寻找另一条路线', nextScene: 'findAlternateRoute' },
      { text: '尝试返回控制室', nextScene: 'returnToControlRoom' }
    ]
  },
  
  'findAlternateRoute': {
    title: '寻找替代路线',
    description: '你在迷宫般的走廊中小心前行，寻找另一条通往净水系统的路径。墙上的指示牌大多已经模糊不清，但你还是找到了一条标有"辅助水泵控制"的通道。这条路看起来很少被使用，灰尘厚重，但也意味着可能没有那些蓝眼生物巡逻。向前走了约十分钟，你发现了一个小型控制室，里面的设备似乎仍在运行。',
    options: [
      { text: '检查控制室', nextScene: 'examineAuxiliaryControl' },
      { text: '继续寻找主净水系统', nextScene: 'continueToMainWaterSystem' }
    ]
  },
  
  'returnToControlRoom': {
    title: '返回控制室',
    description: '你决定回到之前发现的控制室，希望从那里找到更安全的方法接近净水系统。路上你格外小心，避开了几次巡逻的"适应体"。回到控制室后，你更详细地研究了监控系统和基地地图，发现有一条维护通道可能绕过主要的活动区域，直接通向净水核心。',
    options: [
      { text: '使用维护通道', nextScene: 'useMaintenanceTunnel' },
      { text: '尝试从控制室操作系统', nextScene: 'operateFromControlRoom' }
    ]
  },
  
  'examineAuxiliaryControl': {
    title: '辅助控制室',
    description: '这个小型控制室管理着基地的辅助水泵系统。虽然不是主要净水设备，但它负责将处理后的水输送到各个区域。控制台上的读数显示系统运行正常，但效率只有40%。你研究了控制面板，发现可以从这里增加水流向某个特定的外部连接点——比如铁锈集市可能建立的管道。',
    options: [
      { text: '调整水流方向', nextScene: 'redirectWaterFlow' },
      { text: '继续寻找主净水系统', nextScene: 'continueToMainWaterSystem' }
    ]
  },
  
  'redirectWaterFlow': {
    title: '重定向水流',
    description: '你仔细操作控制台，将水流重定向到最接近铁锈集市方向的外部连接点。系统显示操作成功，处理后的净水开始流向新的目标区域。这不是最理想的解决方案，但至少可以为集市提供部分水源。如果能找到主净水系统，或许可以进一步增加水流量。现在，你需要决定是否继续深入基地。',
    options: [
      { text: '满足于当前成果并撤离', nextScene: 'retreatWithPartialSuccess' },
      { text: '继续寻找主净水系统', nextScene: 'continueToMainWaterSystem' }
    ]
  },
  
  'retreatWithPartialSuccess': {
    title: '部分胜利',
    description: '你决定不再冒险，已经取得的成果足以改善铁锈集市的处境。你记下了控制室的位置和操作方法，以便将来可能的进一步调整。沿着来时的路小心撤离，避开任何可能的"适应体"巡逻。经过几次惊险的躲避后，你终于回到了入口通风井，爬出地面，迎接废土刺眼的阳光。',
    options: [
      { text: '返回铁锈集市', nextScene: 'returnToMarketWithPartialSuccess' }
    ]
  },
  
  'continueToMainWaterSystem': {
    title: '深入探索',
    description: '你决定继续寻找主净水系统，希望能获得更完整的控制权。根据墙上的指示，你小心前进，每次转角都先侦查情况。途中你看到更多的"适应体"，但它们似乎没有主动攻击性，只要不干扰它们的工作就不会注意你。最终，你来到了一个巨大的门前，标记为"中央净水处理核心"。',
    options: [
      { text: '尝试进入核心区域', nextScene: 'enterWaterCoreArea' },
      { text: '观察核心区域活动', nextScene: 'observeWaterCoreActivities' }
    ]
  },
  
  'enterWaterCoreArea': {
    title: '净水核心',
    description: '你谨慎地推开沉重的门，进入中央净水处理核心。这是一个巨大的环形室，中央是一个发出蓝色光芒的水池，周围环绕着各种净水设备。几个"适应体"正在不同工作站操作，但由于房间很大，你的进入并未立即引起注意。控制平台位于远端，似乎是整个系统的中枢。',
    radiationChange: 8,
    options: [
      { text: '悄悄靠近控制平台', nextScene: 'approachControlPlatform' },
      { text: '观察净水过程', nextScene: 'studyWaterPurificationProcess' }
    ]
  },
  
  'observeWaterCoreActivities': {
    title: '远程观察',
    description: '你选择不冒险进入，而是通过门上的小窗观察内部活动。中央净水核心是一个巨大的圆形设施，各种管道和机械装置有序运转。"适应体"们在其中穿梭，维护设备，定期从中央水池采集样本进行分析。整个系统运作得像精密钟表一般，但效率似乎不高。由于外部没有控制台，你无法从这里调整系统参数。',
    options: [
      { text: '尝试进入核心区域', nextScene: 'enterWaterCoreArea' },
      { text: '返回辅助控制室', nextScene: 'returnToAuxiliaryControl' }
    ]
  },
  
  'returnToAuxiliaryControl': {
    title: '返回辅助控制',
    description: '你决定返回之前发现的辅助控制室，那里虽然功能有限，但至少可以安全操作。途中你遇到一队巡逻的"适应体"，但幸运地藏在设备后躲过了它们的注意。回到控制室后，你尝试从这里优化水流和净化效率，虽然不能完全控制主系统，但仍然可以显著改善输出。',
    options: [
      { text: '最大化辅助系统效率', nextScene: 'maximizeAuxiliaryEfficiency' },
      { text: '寻找返回地面的路径', nextScene: 'findPathToSurface' }
    ]
  },
  
  'maximizeAuxiliaryEfficiency': {
    title: '系统优化',
    description: '你仔细研究控制面板，通过微调各个参数，成功将辅助系统的效率从40%提升到65%。这意味着铁锈集市将获得更多干净的水。系统显示当前设置可以稳定运行至少三个月，之后可能需要维护。你记录下所有重要的设置和参数，以便将来参考。任务已经取得了相当的成功，是时候考虑撤离了。',
    options: [
      { text: '寻找返回地面的路径', nextScene: 'findPathToSurface' }
    ]
  },
  
  'findPathToSurface': {
    title: '撤离路线',
    description: '完成系统调整后，你开始寻找返回地面的路径。通过控制室的终端，你调出了基地的紧急疏散路线图。最近的出口在东北方向，通过一系列维护通道可以到达。你小心地导航，避开已知的"适应体"活动区域。途中，你发现了一个小型储物室，里面可能有有用的物资。',
    options: [
      { text: '检查储物室', nextScene: 'checkStorageRoom' },
      { text: '直接前往出口', nextScene: 'headDirectlyToExit' }
    ]
  },
  
  'checkStorageRoom': {
    title: '意外发现',
    description: '储物室里大部分架子都空了，但在角落里你发现了一个锁着的金属箱。用工具撬开后，里面是一套完整的技术文档，详细记录了净水系统的设计、维护和修复方法。这些文件对铁锈集市来说价值连城，可以帮助他们建立自己的小型净水系统。还有一瓶完好的高级抗辐射药剂，看起来是军方特供版本。',
    item: '净水系统技术文档',
    item: '高级抗辐射药剂',
    options: [
      { text: '继续前往出口', nextScene: 'headDirectlyToExit' }
    ]
  },
  
  'headDirectlyToExit': {
    title: '最后冲刺',
    description: '你沿着紧急疏散路线快速前进。通道灯光昏暗，但标识清晰可见。当你接近出口时，远处传来机械运行声增强的声音，似乎你的调整导致系统开始更积极地运转。最终，你找到了一个通往地面的紧急出口梯子。爬上去后，你推开沉重的井盖，新鲜(相对而言)的废土空气扑面而来。你成功完成了任务，为铁锈集市带回了希望。',
    options: [
      { text: '返回铁锈集市', nextScene: 'returnToMarketWithSuccess' }
    ]
  },
  
  'returnToMarketWithPartialSuccess': {
    title: '带回希望',
    description: '你返回铁锈集市，向老莫和蛇哥报告了你的发现和行动。"虽然没能完全控制主系统，但我重定向了部分水流到我们可以连接的地方，"你解释道。老莫立刻派人前往你指示的地点，开始铺设管道。几天后，第一批干净的水流入铁锈集市的储水罐。尽管不是最理想的解决方案，但这已经显著改善了居民的生活。蛇哥拍拍你的肩膀："做得好，这比我们预期的要好得多。"',
    options: [
      { text: '计划未来的探索', nextScene: 'planFutureExploration' },
      { text: '庆祝当前的成功', nextScene: 'celebrateCurrentSuccess' }
    ]
  },
  
  'returnToMarketWithSuccess': {
    title: '凯旋归来',
    description: '当你回到铁锈集市，带着净水系统技术文档和成功激活系统的消息，人们几乎不敢相信自己的耳朵。老莫亲自迎接你，脸上罕见地露出了笑容："你做到了，孩子！"工作队很快被派往你指示的连接点，铺设管道连接铁锈集市。第一批水流入时，整个集市爆发出欢呼。你交给阿萍和几位技术人员的文档将确保长期的水源供应，甚至可能帮助他们在未来建立自己的小型净水系统。',
    options: [
      { text: '向众人解释发现', nextScene: 'explainDiscoveries' },
      { text: '与核心成员私下讨论', nextScene: 'discussPrivately' }
    ]
  },
  
  'planFutureExploration': {
    title: '未来计划',
    description: '有了初步的成功，你开始与蛇哥和老枪计划未来更深入的探索。"如果能完全控制主净水系统，我们可以获得更多水，甚至可能扩展到其他区域，"你解释道。老枪点点头："我可以帮忙绘制更详细的军事基地地图，标出危险区和可能的进入点。"蛇哥则建议："我们应该组建一个专门的探索队，定期维护和改进水源连接。"尽管面临挑战，未来看起来比几周前更加光明。',
    isEnding: true,
    endingType: '探索者结局',
    options: [
      { text: '重新开始', nextScene: 'start' }
    ]
  },
  
  'celebrateCurrentSuccess': {
    title: '庆祝胜利',
    description: '铁锈集市举行了一个简单但欢乐的庆祝活动，纪念净水供应的到来。人们欢笑、歌唱，甚至奢侈地使用清水洗澡。你成为集市的英雄，得到了老莫的特别表彰和更好的住所。虽然水源有限，但通过精心管理，足以大大改善集市居民的生活。看着孩子们玩耍，成人们规划增加种植区，你意识到有时即使不完美的胜利也能带来巨大改变。在这个残酷的废土上，每一滴水都是生命的礼物。',
    isEnding: true,
    endingType: '建设者结局',
    options: [
      { text: '重新开始', nextScene: 'start' }
    ]
  },
  
  'explainDiscoveries': {
    title: '公开真相',
    description: '你召集铁锈集市的居民，详细解释了军事基地的发现，包括神秘的"适应体"和基地的原始用途。"那里不仅有净水系统，还有危险的秘密，"你警告道，"不过我们现在已经安全地接入了水源，并且有技术知识来维护它。"居民们对你的诚实表示感谢，集体决定组建一个"水源委员会"，由代表不同群体的成员共同管理这一珍贵资源。在接下来的几年里，铁锈集市在民主管理下蓬勃发展，成为废土上罕见的和平与进步的灯塔。',
    isEnding: true,
    endingType: '真相结局',
    options: [
      { text: '重新开始', nextScene: 'start' }
    ]
  },
  
  'discussPrivately': {
    title: '权力核心',
    description: '你选择只与老莫、蛇哥、阿萍和老枪等关键人物分享全部细节。"控制水源就是控制一切，"老莫洞察地说，"我们需要谨慎管理这一力量。"在你们的领导下，铁锈集市实施了配给制度，确保水源公平分配，同时也作为吸引新成员和建立联盟的筹码。随着时间推移，铁锈集市从一个简陋的交易点发展成为废土上最有影响力的定居点之一，你也从一个陌生的旅行者成长为核心领导层的重要一员。权力有时沉重，但在这个世界，强者生存并非没有道理。',
    isEnding: true,
    endingType: '领导者结局',
    options: [
      { text: '重新开始', nextScene: 'start' }
    ]
  },
  
  'fleeFromCreatures': {
    title: '紧急撤离',
    description: '你和蛇哥转身就跑，身后传来那些"人形生物"整齐划一的脚步声。"这些是什么鬼东西？"你气喘吁吁地问道。"我猜是某种辐射实验的产物，"蛇哥边跑边回答，"就像变异鼠一样，只不过原料是人！"你们冲进一条维修通道，蛇哥猛地关上防火门并用工具卡住门把。"知道我从不来这种地方的原因吗？"他苦笑道，"因为末日后的科研设施就像脱口秀演员——实验总是失败，但却永远不会离场！"',
    options: [
      { text: '探索附近区域寻找线索', nextScene: 'exploreNearbyArea' },
      { text: '尝试找到控制室', nextScene: 'seekControlRoom' }
    ]
  },
  
  'defendWithWeapons': {
    title: '绝境反击',
    description: '你拔出老枪的左轮，朝最靠近的生物开火。子弹击中它的胸部，但它只是踉跄了一下就继续前进。更诡异的是，伤口处流出的不是血液，而是发着蓝光的粘稠液体。"常规武器对它们没用！"蛇哥大喊，一边拉着你后退，"我们得想别的办法！"他指向不远处的控制台，"那里！也许能关闭水处理系统的某些部分！"',
    radiationChange: 3,
    options: [
      { text: '冲向控制台', nextScene: 'dashToControlPanel' },
      { text: '撤退寻找出路', nextScene: 'retreatToFindExit' }
    ]
  },
  
  'dashToControlPanel': {
    title: '控制台争夺',
    description: '你们冲向水处理区的控制台，身后的蓝眼生物步调一致地追赶。蛇哥一把推开挡在控制台前的生物，它的身体冰冷得像金属。"挡住它们！"他喊道，同时开始操作控制台。你用左轮抵住最近的追兵，但更多的"人"正从各个管道入口涌来。蛇哥疯狂地按着按钮，突然，整个区域响起刺耳的警报声，几个闸门开始缓缓关闭。"出口要关了，快走！"',
    healthChange: -1,
    options: [
      { text: '跟随蛇哥冲向出口', nextScene: 'rushToExit' },
      { text: '继续战斗掩护后撤', nextScene: 'fightToCoverRetreat' }
    ]
  },
  
  'retreatToFindExit': {
    title: '战略撤退',
    description: '你们边打边退，寻找任何可能的出口。蓝眼生物步伐虽慢但从未停止，而且数量不断增加。"那边！"蛇哥指向一条标着"紧急撤离"的通道，"这应该通向某个安全区域！"跑进通道后，你们发现这是一个老式的减压室，可能是为了防止辐射污染。蛇哥迅速关闭内门，启动了减压程序。透过小窗，你们看到蓝眼生物站在门外，一动不动地盯着你们，没有任何情绪——这比愤怒或仇恨更加令人不安。',
    options: [
      { text: '等待减压完成', nextScene: 'waitForDecompression' },
      { text: '检查减压室内部', nextScene: 'examineDecompressionChamber' }
    ]
  }

  };
  
  // 将场景数据暴露为全局变量
  window.mudScenes = mudScenes;

  // 在文件末尾添加物品描述数据库

// 物品描述数据库 - 末日废土风格
const itemDescriptions = {
    '小型辐射源': '一个被铅盒包裹的小型辐射源，表面有危险标志。虽然体积不大，但足以让辐射计报警。挖坟人视其为“新生”的象征，普通人则避之不及。',
    '医用抗辐射药': '一盒军用级抗辐射药物，效果远超普通药片。包装上有清晰的剂量说明，适用于高剂量辐射暴露后的紧急救治。',
    '产前维生素': '一瓶专为孕妇设计的维生素补充剂，能在营养匮乏的废土环境下为母婴提供必要的微量元素。',
    '医疗包': '一个装有基础医疗用品的包裹，包括绷带、消毒剂和止痛药。比急救包更为全面，适合长途旅行或应对复杂伤情。',
    '纯净水样本': '从军事基地净水系统中采集的水样，清澈透明，无任何杂质。对于研究废土水源净化技术具有重要意义。',
    '净水技术手册': '一本详细记录了军事基地净水系统设计和维护方法的技术手册。内容涵盖过滤、消毒和管道维护等关键知识。',
    '军用信号弹': '一枚保存完好的军用信号弹，可在紧急情况下发射，发出明亮的光芒，吸引远处的注意。',
    '安全磁卡': '一张带有磁条的军用安全卡，可用于解锁基地内部的部分安全门。卡面有编号和持有者信息。',
    '高级安全卡': '权限极高的安全卡，能解锁基地最核心的区域。卡片背面有特殊的防伪标记。',
    '高级安全通行证': '一张带有照片和指纹的高级通行证，专为基地高级研究员或安保主管设计。能访问绝大多数受限区域。',
    '先进技术数据库': '存储着大量战前科技资料的数据库，包括能源、净水、农业和基础设施建设等领域的详细数据。',
    '详细辐射地图': '一份由卫星数据生成的最新辐射分布地图，标注了安全区、危险区和未受污染的绿区。',
    '医学知识数据库': '包含辐射病、突变疾病和基础医疗技术的数字资料库，是废土医疗人员的无价之宝。',
    '避难所坐标和代码': '一份记载着EDEN-03避难所精确位置和进入代码的文件，是通往新家园的钥匙。',
    '卫星通信频率': '一组可用于与核潜艇AI和其他远程设施通信的专用频率，开启了与外界联系的新可能。',
    '关键医疗数据': '从军事基地下载的核心医疗资料，涵盖辐射治疗、疫苗配方和紧急手术指南。',
    '军用手电筒': '一只结实耐用的军用手电筒，亮度高且防水防摔，是废土探险者的理想照明工具。',
    '应急呼吸器': '一套便携式呼吸器，可在高辐射或有毒气体环境下提供短时间的安全呼吸保障。',
    '生锈灭火器': '这个古老的灭火器外壳已经大部分被锈蚀，但内部的化学物质似乎仍然有效。喷嘴周围的警告标签模糊不清，暗示着使用时需要格外小心。在废土上，这种物品常被当作武器使用，特别是对付小型生物群。',
    
    '手摇手电筒': '一个依靠手动摇杆产生电力的手电筒，是废土求生者的珍贵伴侣。外壳有多处划痕和凹陷，但核心机制依然运作良好。灯泡已经更换过多次，现在使用的是某种自制的发光元件。在永久灰暗的废土上，这比高级武器还要宝贵。',
    
    '防辐射药片': '一种强效的抗辐射药物，外表为暗绿色药片，苦涩难咽。吞服后能暂时降低体内辐射水平，但有明显副作用，包括头晕、恶心和暂时性视力模糊。如此珍贵的药物通常被视为末世货币之一。',
    
    '生锈手枪': '这把老式手枪已经有严重的锈蚀，但基本机构仍然可用。弹匣可容纳6发子弹，但可能经常卡壳。握把上刻着模糊不清的编号，可能是某个军事单位的装备。在技术娴熟的人手中，它仍然是一个致命的武器。',
    
    '医疗标识': '一块红色十字标志的布料，被一些废土团体视为中立或医疗人员的象征。虽然简单，但在某些地区能提供些许保护，至少能让攻击者先思考一秒。当然，也有人会假借此标识进行欺骗，所以它的效力取决于当地的规则。',
    
    '采药袋': '一个精心编织的小布袋，专为采集和保存脆弱的药用植物设计。内部衬有一层保湿材料，可以保持植物新鲜。袋子上绣着一些神秘的符号，可能与古老的草药学知识有关。阿萍的这个袋子似乎经过特殊处理，能减缓辐射植物的衰败。',
    
    '高级工具套装': '这套珍贵的工具包含各种专业维修和机械工具，全部保养得当，几乎没有锈迹。工具卷上还有老枪部队的标志，每一件工具都经过精心选择，能应对从简单修理到复杂机械操作的各种情况。在技工手中，这套工具价值连城。',
    
    '军事基地地图': '一张褪色但依然清晰的军事基地平面图，标注了主要设施、安全区域和潜在危险点。图纸边缘有老枪手写的笔记和警告，部分区域被特意标记为"绝对禁入"。这份地图可能是基地内部安全通行的关键。',
    
    '强效抗辐射药': '一种先进的抗辐射配方，比普通防辐射药效果更强、持续时间更长。装在一个小型军用注射器中，液体呈现出淡蓝色荧光。据说这种药物是战前军方开发的秘密配方，能让特种部队在高辐射区域执行任务。使用后会有轻微的成瘾性，但在生死攸关时刻，这是微不足道的代价。',
    
    '工厂平面图': '一张详细的轮胎厂内部结构图，标注了主要生产区域、仓库位置和安全出口。图上有后来添加的笔记，指出了守卫岗哨和轮班时间。这份地图上的信息可能已经过时，但仍然提供了宝贵的布局参考。',
    
    '轮胎帮伪装': '由废旧轮胎橡胶制成的装备套装，包括一件厚重的橡胶外套和一个改装的防毒面具。虽然外观奇特，但确实能提供一定的辐射防护。穿戴后散发出强烈的橡胶气味，足以蒙蔽轮胎帮成员的眼睛，但近距离接触仍有被识破的风险。',
    
    '强化注射剂': '一支装有黄色液体的军用注射器，注射后能暂时提升使用者的肌肉力量、反应速度和疼痛阈值。这种药剂是战前军方的实验产品，副作用包括之后的极度疲劳和可能的心脏负担。在废土上，它往往被用作战斗中的最后手段。',
    
    '仓库钥匙': '一把看似普通但做工精细的钥匙，能打开轮胎帮首领的私人仓库。把手部分缠绕着一小段橡胶，可能是为了防滑或识别用途。这把钥匙代表着极高的信任或极大的风险，取决于你如何获得它。',
    
    '零部件箱': '一个沉重的金属箱，内含老枪车队被抢的重要零部件。箱子上印有老枪团队的标志，内部组织得井井有条，每个部件都有专门的防震填充物保护。这些部件对普通人可能只是金属块，但对懂行的机械师而言，它们是维持移动堡垒运转的命脉。',
    
    '老枪的左轮': '一把保养极好的左轮手枪，枪身银亮，几乎看不到使用痕迹。握把是特制的硬木，上面刻有精细的几何图案。这把武器经过精心调校，比普通手枪更准确、更可靠。从老枪愿意将它给你这一点来看，他对你的信任已经超越了普通盟友。',
    
    '安全通行卡': '一张军用安全通行卡，可以解锁军事基地内部的某些安全门。卡片边缘微微磨损，但内部的电子元件似乎仍然运作良好。卡背有一个褪色的照片，隐约能看到一个年轻军人的面容，可能是它的前任主人。在正确的读卡器前刷一下，可能会打开通往秘密的大门。',

    '急救包': '一个布满尘土的军用急救包，内有几卷发黄的绷带、一瓶已过期的消毒酒精和几片净水片。标签上的日期显示这是来自战前时期的物资，不过在这个世界，过期的医疗用品也比没有强。',
    
    '求生刀': '这把军用求生刀的刀刃已经有些生锈，但刀锋依然锋利。刀柄上刻着前任主人的名字，已经被血迹和时间模糊。在这个弱肉强食的世界，它不仅是工具，更是你最可靠的伙伴。',
    
    '防水背包': '一个破旧但坚固的战术背包，表面有多处磨损和补丁。内衬经过特殊处理，仍保持着不错的防水性能。背包上的标签暗示它曾属于某个已经不存在的政府部门。',
    
    '净化水': '通过净水片处理过的溪水，储存在回收的塑料瓶中。水看起来清澈，但喝起来有股化学药剂的味道。在辐射尘埃弥漫的世界里，干净的水比金子还珍贵。',
    
    '蓝莓': '这些蓝莓比灾变前的小，颜色也更深。奇怪的是，它们似乎能在夜间发出微弱的蓝光。尽管外表异常，但它们仍然可以安全食用，并提供稀缺的维生素。',
    
    '石制鱼钩': '用河边尖锐的石头精心打磨而成的简易鱼钩。边缘粗糙不平，但足够锋利能够穿透鱼嘴。这是末世求生者们常用的原始技术之一，证明人类的适应力有多强。',
    
    '简易钓具': '用树枝、植物纤维和石制鱼钩组装的简易钓鱼工具。看起来并不起眼，但在熟练的手中，它能成为提供食物的重要工具。现在的鱼类体型常常畸形，但大多数仍然可以食用。',
    
    '新鲜鱼': '刚捕获的鱼，有些鱼鳍似乎异常发达，可能是辐射造成的突变。肉质仍然看起来健康，有轻微的金属光泽。在蛋白质稀缺的世界里，这是难得的盛宴。',
    
    '营火': '用干燥木材和枯叶搭建的营火，火焰在黑暗中舞动，提供温暖和安全感。火光在这个荒凉的世界中成为生命和希望的象征，但也可能吸引不必要的注意。',
    
    '陷阱': '用树枝和植物纤维制作的捕猎陷阱。设计原始但有效，能捕获小型动物。末世后的动物普遍变得更加警惕和凶猛，增加了狩猎难度。',
    
    '熟食': '在营火上烤制的鱼肉和野菜，香气四溢。食物上出现的一些不自然的颜色反映了环境中残留的污染，但这已经是可以找到的最安全的食物了。',
    
    '野果和坚果': '从森林中收集的各种浆果和坚果。有些看起来有奇怪的色彩和形状，可能是环境变化导致的突变。尽管外表奇特，经过仔细挑选的这些是可以食用的。',
    
    '手绘地图': '在一张破旧的纸上粗略绘制的地图，标记了附近的地形和一个可能的小镇位置。纸张边缘已经发黄开裂，墨水有些地方已经模糊，但这仍是找到人类聚居地的希望。',
    
    '详细地图': '从废弃卡车上找到的比较完整的地区地图。上面标注了主要道路、一些小镇和危险区域。边缘有血迹和弹孔，暗示了前任持有者的命运。',
    
    '绳索': '找到的一捆尼龙绳，有些地方已经磨损，但整体还算结实。在末世中，好的绳索是最有价值的工具之一，无论是搭建庇护所、攀爬还是制作陷阱都离不开它。',
    
    '信号火箭': '一个陈旧但保存完好的紧急信号火箭。金属外壳上满是划痕，但内部机械似乎仍然可用。这是灾前文明的产物，如今已难以找到，可能是你与其他幸存者联系的唯一希望。',
    
    '狼同伴': '一只因你的帮助而与你建立联系的灰狼。它的毛皮上有一些不自然的花纹，可能是辐射导致的变异。尽管如此，它的忠诚和敏锐感官使它成为荒野中难得的伙伴和保护者。'
  };
  
  // 将物品描述数据库暴露为全局变量
  window.itemDescriptions = itemDescriptions;