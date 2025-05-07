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
      }
  };
  
  // 将场景数据暴露为全局变量
  window.mudScenes = mudScenes;

  // 在文件末尾添加物品描述数据库

// 物品描述数据库 - 末日废土风格
const itemDescriptions = {
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