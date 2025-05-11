// 废土求生：第一章场景 - 废土苏醒

const chapter1Scenes = {
// 初始场景 - 主角醒来
'awakening': {
  title: '废土苏醒',
  description: '剧烈的头痛是你首先感知到的存在。眼前闪过一系列断裂的图像：闪烁的荧光灯、白大褂、冰冷的金属仓体，以及一个重复出现的声音："休眠状态...倒计时开始..."\n\n"喂！别死了！"一个粗哑的声音打断了你的幻象，随之而来的是脸上泼来的难闻液体。你猛地睁开眼睛，咳嗽着坐起身。',
  skipResourceConsumption: true,
  options: [
    { text: '环顾四周', nextScene: 'meetLiuYe' },
    { text: '检查你的净化服', nextScene: 'checkSuit' }
  ]
},

// 检查净化服
'checkSuit': {
  title: '神秘的净化服',
  description: '你低头看向身上穿着的紧身衣服。它材质特殊，似乎能自动调节温度，胸前印有"R-250"的编号。衣服内侧有微弱的光点闪烁，似乎在监测着什么。这件衣服与周围破旧的环境格格不入，像是来自另一个世界的产物。',
  skipResourceConsumption: true,
  endingScores: { tech: 0.2 }, // 对技术表现出兴趣
  options: [
    { text: '抬头看向周围的人', nextScene: 'meetLiuYe' }
  ]
},

// 与刘爷初次对话
'meetLiuYe': {
  title: '陌生的脸孔',
  description: '眼前是一个满脸皱纹的老人，灰白的头发在脑后松散地扎成一束，眼神中透着警惕与好奇。"你总算醒了，我还以为又得挖个坑了。"老人将手中的塑料瓶收回背包，"我是刘爷，你是谁？"',
  skipResourceConsumption: true,
  options: [
    { 
      text: '"我...不知道。"（诚实回答）', 
      nextScene: 'amnesiaConfirmed',
      endingScores: { humanity: 0.2 }  // 诚实显示了人道倾向
    },
    { 
      text: '谨慎地打量对方（不立即回答）', 
      nextScene: 'cautiousResponse',
      endingScores: { survival: 0.2 }  // 谨慎显示了生存倾向
    }
  ]
},

// 失忆确认
'amnesiaConfirmed': {
  title: '身份未知',
  description: '刘爷审视着你，目光停留在你胸前的编号上。"好吧，小R，欢迎来到未来。这里是废旧矿洞，我们的临时营地。你穿的那件东西...不是普通货色，是旧世界的\'净化服\'。能活到现在，算你命大。"\n\n小R（姑且这么称呼自己）环顾四周。这是一个半塌陷的矿洞，几盏简易灯照亮了石壁上的锈迹和斑驳的水痕。角落里堆着一些破旧的物资，几个衣衫褴褛的人影在远处忙碌着。',
  options: [
    { text: '"这是哪里？发生了什么？"', nextScene: 'askAboutWorld' }
  ]
},

// 谨慎回应
'cautiousResponse': {
  title: '保持警惕',
  description: '你沉默地观察着周围环境，没有立即回答老人的问题。刘爷轻哼一声，似乎理解你的谨慎。\n\n"不想说也行。在废土上，保持警惕是活下去的第一课。不过在这里，我们有基本规矩——不欢迎闲人，想留下就得干活。"\n\n他指了指你胸前的编号。"就叫你小R吧，那件净化服不是普通货色，能保住你的小命。"',
  endingScores: { survival: 0.1 }, // 额外的生存倾向
  options: [
    { text: '"这地方是什么？"', nextScene: 'askAboutWorld' },
    { text: '点头，但保持沉默', nextScene: 'silentAgreement', endingScores: { survival: 0.1 } }
  ]
},

// 沉默认可
'silentAgreement': {
  title: '沉默的观察者',
  description: '你点点头，但没有说话。刘爷似乎习惯了这样的反应，递给你一块干硬的面饼和半瓶浑浊的水。\n\n"吃点东西，然后休息一下。等你有力气了，去帮忙修理过滤器。那边角落有个铺位。"\n\n他指了指矿洞深处的一个简陋角落，那里铺着几块破布和一个看起来勉强算是枕头的东西。',
  options: [
    { text: '接受食物，开始观察营地', nextScene: 'observeCamp', endingScores: { survival: 0.1 } }
  ]
},

// 观察营地
'observeCamp': {
  title: '矿洞营地',
  description: '你慢慢咀嚼着干硬的面饼，味道比想象中好一些。趁着进食的时间，你仔细观察起这个临时营地。\n\n矿洞里大约有十几个人，多数是成年人，也有几个孩子。他们都穿着拼凑的衣物，面容憔悴但眼神坚毅。看起来，这里的每个人都有自己的任务——修理设备、清洗物品、整理物资。\n\n突然，一个声音从你身后传来："他醒了吗？真的醒了？"',
  options: [
    { text: '转身查看声音来源', nextScene: 'meetAli' }
  ]
},

// 询问世界情况
'askAboutWorld': {
  title: '破碎的世界',
  description: '刘爷发出一声短促的笑。"你是真不知道还是装傻？外面是灾变后的世界。至于发生了什么，"他耸耸肩，"谁知道呢。气候崩溃，粮食灭绝，剩下的人就这么活着。"\n\n你试图站起来，双腿却像灌了铅一样沉重。刘爷递给你一块干硬的面饼和半瓶浑浊的水。"吃点东西，然后再说。这里不欢迎闲人，想留下就得干活。"',
  options: [
    { text: '接受食物，表示感谢', nextScene: 'acceptFood', endingScores: { humanity: 0.1 } },
    { text: '谨慎检查食物后再吃', nextScene: 'checkFood', endingScores: { survival: 0.1 } }
  ]
},

// 接受食物
'acceptFood': {
  title: '谢意',
  description: '"谢谢你的帮助，"你真诚地说，接过面饼和水。刘爷的表情微微松动，似乎对你的礼貌感到意外。\n\n"礼貌在废土上很少见，"他评论道，"但不会让你活得更久。记住，在这里，资源比命还宝贵。"\n\n正当你开始进食，一个尖细的声音从矿洞深处传来："刘爷，那家伙醒了？"',
  options: [
    { text: '看向声音来源', nextScene: 'meetAli' }
  ]
},

// 检查食物
'checkFood': {
  title: '谨慎为上',
  description: '你接过食物，但在吃之前仔细检查了一下。刘爷注意到你的动作，不置可否地点点头。\n\n"谨慎，不错。在废土上，松懈的人活不长。"他评价道，"不过放心，如果我想害你，不会用这种方式。浪费食物在这里是重罪。"\n\n确认食物没有明显问题后，你开始小口进食。这时，一个尖细的声音从矿洞深处传来："刘爷，那家伙醒了？"',
  options: [
    { text: '看向声音来源', nextScene: 'meetAli' }
  ]
},

// 遇见阿粒
'meetAli': {
  title: '好奇的女孩',
  description: '一个瘦小的身影蹦跳着靠近，是个约莫十二岁的女孩，衣服打满了补丁，脸上蹭着灰尘，但一双眼睛明亮有神。\n\n"阿粒，你不是该去河边捡瓶子吗？"刘爷皱眉道。\n\n"今天锈河涨水了，河边全是泡沫。"女孩阿粒好奇地打量着你，"他真的从C区来的？"',
  options: [
    { text: '"C区是什么地方？"', nextScene: 'askAboutCZone', endingScores: { tech: 0.1 } },
    { text: '保持沉默，观察这个女孩', nextScene: 'observeAli', endingScores: { survival: 0.1 } }
  ]
},

// 询问C区
'askAboutCZone': {
  title: 'C区之谜',
  description: '"C区是什么地方？"你问道，声音因长时间未用而略显嘶哑。\n\n刘爷和阿粒交换了一个眼神。"一个危险的地方，"刘爷含糊地说，"旧世界的遗迹，充满辐射和怪事。我们在那里发现了你，躺在一堆金属废墟中，穿着这身奇怪的衣服。"\n\n阿粒靠近，伸出手指轻轻触碰你的净化服，然后迅速缩回手，像是怕被烫伤。"它会发光！昨晚我看见了，那些小点一闪一闪的。"',
  options: [
    { text: '表示愿意帮助营地工作', nextScene: 'offerHelp', endingScores: { humanity: 0.2 } },
    { text: '询问更多关于自己被发现的情况', nextScene: 'askAboutDiscovery', endingScores: { tech: 0.2 } }
  ]
},

// 观察阿粒
'observeAli': {
  title: '观察女孩',
  description: '你选择不说话，仔细观察这个叫阿粒的女孩。她看起来瘦小但充满活力，眼神中带着孩童少有的警觉和智慧。她似乎对你的净化服特别感兴趣，目光不断在你胸前的编号上流连。\n\n"别管那么多了，"刘爷打断了阿粒的兴奋，"既然他醒了，就该干活。小R，你能走路吗？今天营地的水过滤器出问题了，我们需要人帮忙。"',
  options: [
    { text: '点头表示愿意帮忙', nextScene: 'firstTask', endingScores: { humanity: 0.1 } },
    { text: '先询问更多关于自己的情况', nextScene: 'askMoreQuestions', endingScores: { tech: 0.1 } }
  ]
},

// 提出帮助
'offerHelp': {
  title: '伸出援手',
  description: '"我愿意帮助营地的工作，"你说道，站起身来。刘爷略显惊讶，但满意地点点头。\n\n"很好，先从水过滤器开始。这里的净水是我们最宝贵的资源之一。"\n\n接下来的几天里，你逐渐融入了营地生活。你发现自己对修理和医疗工作有着本能的熟悉，尽管记不起为何会有这些技能。阿粒常常跟在你身后，问各种问题，而你虽然答不上多少，却也渐渐喜欢上了这个聪明机灵的女孩。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '继续帮助营地（三天后）', nextScene: 'campLife', endingScores: { humanity: 0.2 } }
  ]
},

// 询问更多关于自己被发现的情况
'askAboutDiscovery': {
  title: '身世之谜',
  description: '"你们能告诉我更多关于我被发现的情况吗？"你问道，希望能找到一些关于自己身份的线索。\n\n刘爷皱起眉头，似乎在权衡该说多少。"三天前，刘小狗——那是营地的另一个人——在C区外围发现了你。你当时无意识，但净化服还在运行。我们把你带回来，本以为你撑不过第一晚。"\n\n"但你挺过来了！"阿粒插嘴道，眼中闪烁着兴奋，"就像故事里的英雄一样！"',
  options: [
    { text: '表示愿意为营地工作以回报救命之恩', nextScene: 'gratefulWork', endingScores: { humanity: 0.2 } },
    { text: '询问有没有其他像你一样的人被发现', nextScene: 'askAboutOthers', endingScores: { tech: 0.2 } }
  ]
},

// 第一个任务
'firstTask': {
  title: '修理过滤器',
  description: '你点头表示愿意帮忙，刘爷领着你来到营地的一角，那里有一套由塑料桶和各种管道组成的简易过滤系统。\n\n"这是我们的命脉，"刘爷解释道，"锈河的水有毒，需要过滤才能用。但现在系统堵塞了，我们的净水储备只够两天。"\n\n你检查着系统，发现问题所在——几个过滤管被某种锈红色的物质堵塞。奇怪的是，你的手似乎知道该怎么做，仿佛曾经做过无数次类似的修理工作。',
  options: [
    { text: '尝试修复过滤器', nextScene: 'fixFilter', endingScores: { tech: 0.2 } }
  ]
},

// 询问更多问题
'askMoreQuestions': {
  title: '寻求答案',
  description: '"在我帮忙之前，能否告诉我更多关于我自己的事？比如你们在哪里发现我的？"你问道。\n\n刘爷和阿粒交换了一个眼神。"C区，"刘爷最终回答，"一个危险的旧世界遗迹。刘小狗在那里找到你，躺在一堆金属废墟中。你穿着这身奇怪的衣服，昏迷不醒。"\n\n"你身上还有很多管子和线！"阿粒补充道，眼睛瞪得大大的，"刘爷把它们都剪断了，说那些东西是在吸你的血。"',
  options: [
    { text: '表示感谢并提出帮助', nextScene: 'gratefulWork', endingScores: { humanity: 0.2 } },
    { text: '询问净化服的情况', nextScene: 'askAboutSuit', endingScores: { tech: 0.2 } }
  ]
},

// 营地生活
'campLife': {
  title: '简单的日子',
  description: '三天过去，你已经开始适应矿洞营地的简单生活。你帮助修理过滤器，用旧世界的塑料瓶和布条制成简易的净水装置。工作中，你发现自己对工程和修理似乎有种本能的熟悉，尽管想不起为什么会有这些技能。\n\n营地里的人对你保持着距离，只有阿粒经常跟在你身后，问各种问题。\n\n"你真的什么都不记得了？连自己叫什么都不知道？"阿粒坐在石头上，晃荡着双腿问道。',
  options: [
    { text: '尝试回忆起什么', nextScene: 'tryToRemember', endingScores: { tech: 0.1 } },
    { text: '和阿粒聊天，了解更多废土知识', nextScene: 'chatWithAli', endingScores: { survival: 0.1 } }
  ]
},

// 感激工作
'gratefulWork': {
  title: '回报恩情',
  description: '"谢谢你们救了我，"你诚恳地说，"我愿意为营地工作，回报你们的恩情。"\n\n刘爷似乎对你的态度感到满意："好吧，先从水过滤器开始。在这里，能干活的手永远不嫌多。"\n\n接下来的日子里，你逐渐融入了营地生活。第四天，你开始协助刘爷处理营地伤员。一个年轻男子被锈河边的活化藤蔓缠伤，腿上的伤口已经化脓。当刘爷拿出仅剩的一小瓶消毒药水时，你的身体仿佛有了自己的记忆...',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '本能地帮助处理伤口', nextScene: 'medicalSkill', endingScores: { humanity: 0.2 } }
  ]
},

// 询问他人
'askAboutOthers': {
  title: '寻找同伴',
  description: '"你们有没有发现其他像我这样的人？也许穿着类似的衣服？"你问道，希望能找到一些线索。\n\n刘爷摇头："没有。C区很危险，我们很少去那里。刘小狗是个例外——他喜欢冒险，总是带回一些稀奇古怪的东西。这一次，他带回了你。"\n\n阿粒突然插话："小马说你的衣服很特别！他想看看能不能修好它！"',
  options: [
    { text: '询问小马是谁', nextScene: 'askAboutMa', endingScores: { tech: 0.1 } },
    { text: '开始帮助营地工作', nextScene: 'startWorking', endingScores: { humanity: 0.1 } }
  ]
},

// 修复过滤器
'fixFilter': {
  title: '本能修复',
  description: '你开始清理堵塞的过滤管，手法熟练得连你自己都感到惊讶。刘爷站在旁边，惊异地看着你轻松解决了困扰他们多日的问题。\n\n"你以前是工程师？"他问道。\n\n你摇摇头："我不知道。感觉像是...身体记得该怎么做，但我的脑子不记得了。"\n\n修复完成后，清澈的水开始从系统流出。营地的人们逐渐聚集过来，好奇地打量着你。其中一个瘦弱的十六岁男孩特别关注你的净化服，眼中闪烁着科学家才有的兴奋光芒。',
  options: [
    { text: '询问那个对净化服感兴趣的男孩', nextScene: 'meetMa', endingScores: { tech: 0.2 } },
    { text: '继续帮助营地其他工作', nextScene: 'continueWork', endingScores: { humanity: 0.1 } }
  ]
},

// 询问净化服
'askAboutSuit': {
  title: '神秘装备',
  description: '"我的...净化服，你们是这么称呼它的吧？它有什么特别之处？"你问道，低头看着那件与环境格格不入的服装。\n\n"这不是普通货色，"刘爷解释道，"材料比我见过的任何旧世界遗物都结实。而且它还在工作——那些灯在闪烁，似乎在监测什么。小马对它很着迷，一直想研究它。"\n\n"小马是谁？"你问道。\n\n"我们的\'科学家\'，"刘爷微笑着做了个引号手势，"一个聪明的小鬼，总是摆弄各种旧世界的设备。"',
  options: [
    { text: '要求见小马', nextScene: 'requestMeetMa', endingScores: { tech: 0.2 } },
    { text: '先帮助营地工作', nextScene: 'workFirst', endingScores: { humanity: 0.1 } }
  ]
},

// 尝试回忆
'tryToRemember': {
  title: '迷失的记忆',
  description: '你闭上眼睛，试图抓住那些飘忽不定的记忆碎片。有些模糊的图像闪过——白色的墙壁，闪烁的设备，冰冷的金属，还有...倒计时？\n\n"只记得醒来前那些模糊的画面，"你最终说道，睁开眼睛，"闪光，冰冷，还有...倒计时。"\n\n"也许你是空投下来的补给！"阿粒兴奋地说，"像故事里那样，从天上掉下来的礼物。"\n\n"阿粒，别胡说，"路过的刘爷训斥道，但语气里带着宠溺，"去帮小马收集废电池，别烦小R了。"',
  options: [
    { text: '询问小马是谁', nextScene: 'whoIsMa', endingScores: { tech: 0.1 } },
    { text: '继续营地工作', nextScene: 'continueWork', endingScores: { humanity: 0.1 } }
  ]
},

// 与阿粒聊天
'chatWithAli': {
  title: '废土见闻',
  description: '"我确实不记得什么了，"你回答阿粒，"也许你能告诉我更多关于这里的事？"\n\n阿粒眼睛一亮，显然很高兴有人愿意听她讲话："这里是矿洞营地，刘爷和其他人在三年前建的。外面有\'锈河\'，水里有毒，会让皮肤烂掉。还有\'火众\'和\'秃鹫\'，他们是坏人，会抢东西。哦，天上有\'天庭\'，那里的人永远不会死，但从不下来帮我们。"\n\n她的描述天真但生动，展现了一个残酷而奇特的世界。',
  options: [
    { text: '询问更多关于天庭的事', nextScene: 'askAboutSkycity', endingScores: { skycity: 0.2 } },
    { text: '询问营地的生存方式', nextScene: 'askSurvivalMethods', endingScores: { survival: 0.2 } }
  ]
},

// 医疗技能
'medicalSkill': {
  title: '医者本能',
  description: '看着伤口，一种陌生却熟悉的冲动涌现。你拿过药水和纱布，熟练地清理伤口并包扎。整个过程中，你的动作精准而专业，仿佛曾经做过无数次。\n\n"你是医生？"刘爷惊讶地问。\n\n"我...不知道，"你看着自己的双手，"感觉像是身体自己记得该怎么做。"\n\n当晚，小马来找你。他是个瘦弱的十六岁男孩，自称"科学家"，总是摆弄着几块旧世界的芯片和电路板。他对你的净化服充满好奇。',
  options: [
    { text: '允许小马检查净化服', nextScene: 'allowInspection', endingScores: { tech: 0.2 } },
    { text: '礼貌拒绝，保持谨慎', nextScene: 'refuseInspection', endingScores: { survival: 0.2 } }
  ]
},

// 询问小马
'askAboutMa': {
  title: '营地天才',
  description: '"小马是谁？"你好奇地问道。\n\n"我们的天才，"刘爷略带自豪地说，"一个十六岁的孩子，却懂得比我们所有人加起来还多的旧世界技术。他可以修好大多数电子设备，尽管有时候他的发明会引起小爆炸。"\n\n阿粒插嘴："他住在矿洞最深处，那里全是他收集的旧世界零件。他说你的衣服特别有趣，想知道它是怎么运作的。"',
  options: [
    { text: '表示想见小马', nextScene: 'wantToMeetMa', endingScores: { tech: 0.2 } },
    { text: '先熟悉营地环境', nextScene: 'exploreCamp', endingScores: { survival: 0.1 } }
  ]
},

// 开始工作
'startWorking': {
  title: '融入营地',
  description: '你决定先帮助营地工作，了解这个暂时收留你的地方。刘爷分配你去修理水过滤系统，这是营地最重要的设备之一。\n\n接下来的几天里，你发现自己拥有许多实用技能——修理、简单医疗、甚至是基础工程知识。尽管你不记得自己为何掌握这些，但它们让你很快在营地中获得了一定地位。\n\n第四天，一个伤员被带来，腿部有严重感染。当刘爷拿出仅剩的消毒药水时，你的身体仿佛有了自己的记忆...',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '接手治疗伤员', nextScene: 'healingWounded', endingScores: { humanity: 0.2 } }
  ]
},

// 遇见小马
'meetMa': {
  title: '科技怪才',
  description: '你走向那个瘦弱的男孩："你似乎对我的衣服很感兴趣？"\n\n男孩推了推鼻梁上破旧的眼镜，眼中闪烁着兴奋："我是小马！你衣服上的那些光点...那是某种监测系统，对吧？我从未见过如此精密的技术！"\n\n他的热情让你不禁微笑："恐怕我也不记得它是做什么的了。"\n\n"我有个设备，也许能读取上面的数据，"小马兴奋地说，"如果你允许，我可以试着扫描它。"',
  options: [
    { text: '同意让小马检查净化服', nextScene: 'agreeToScan', endingScores: { tech: 0.3 } },
    { text: '婉拒，表示需要先了解更多', nextScene: 'declineScan', endingScores: { survival: 0.2 } }
  ]
},

// 继续工作
'continueWork': {
  title: '忙碌的日子',
  description: '你决定专注于帮助营地，希望通过工作找到归属感。接下来的几天，你协助修理各种设备，帮助分发食物和水，甚至在一次紧急情况中展示了出色的医疗技能。\n\n第七天清晨，营地爆发了一场激烈争吵。你赶到时，看见一个身材瘦小但口齿伶俐的男子——刘小狗——正与几个营地成员争执。\n\n"我告诉你们，我在C区外围亲眼见到天庭的观察者！"刘小狗激动地说，"他们在寻找什么，而且带着武器！"',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '上前询问详情', nextScene: 'askAboutObservers', endingScores: { skycity: 0.2 } },
    { text: '保持距离，暗中观察', nextScene: 'listenToArgument', endingScores: { survival: 0.2 } }
  ]
},

// 要求见小马
'requestMeetMa': {
  title: '寻求技术解答',
  description: '"我想见见这位小马，"你说道，"也许他能告诉我更多关于这件净化服的事。"\n\n刘爷点点头："合理的请求。不过小马可能会兴奋过度，他总是对这类技术着迷。"\n\n他带你穿过矿洞的几个转角，来到一个被布帘隔开的小空间。掀开布帘，你看到一个令人惊讶的景象——各种电子设备、电路板和工具整齐地摆放在自制的架子上，几盏改装LED灯提供了充足的光线。中间坐着一个瘦弱的男孩，全神贯注地修理着什么。',
  options: [
    { text: '轻声打招呼', nextScene: 'greetMa', endingScores: { tech: 0.1 } }
  ]
},

// 先工作
'workFirst': {
  title: '先尽一份力',
  description: '"在打扰你们的\'科学家\'之前，也许我应该先帮助营地一些工作，"你提议。\n\n刘爷赞许地点头："正确的态度。在废土上，每个人都要贡献自己的力量才有资格分享资源。"\n\n接下来的几天，你帮助修理设备、处理伤员、清理水源。你发现自己拥有许多实用技能，尤其在医疗方面展现出非凡的直觉。\n\n第七天清晨，当你正在检查过滤器时，突然听到营地中心传来争执声。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '去查看发生了什么', nextScene: 'checkArgument', endingScores: { survival: 0.1 } }
  ]
},

// 询问小马
'whoIsMa': {
  title: '关于小马',
  description: '"这个小马是谁？"你在阿粒离开后问刘爷。\n\n刘爷微笑着说："我们的小天才。十六岁，却懂得比我们所有人加起来还多的旧世界技术。他可以修好大多数电子设备，还能制造一些简单的工具。"\n\n"他对我的净化服感兴趣？"你猜测道。\n\n"非常感兴趣。事实上，他已经请求几次想检查它了，但我告诉他要等你醒来并同意。"',
  options: [
    { text: '表示愿意见小马', nextScene: 'agreeToMeetMa', endingScores: { tech: 0.2 } },
    { text: '继续营地工作', nextScene: 'continueWorkingCamp', endingScores: { humanity: 0.1 } }
  ]
},

// 询问天庭
'askAboutSkycity': {
  title: '天空之城',
  description: '"能告诉我更多关于天庭的事吗？"你问道，对这个"不会死的人们"的地方感到好奇。\n\n阿粒的眼睛亮了起来："天庭在很高很高的天上，像一座漂浮的城市！刘小狗说过，那里的人有奇怪的武器，可以发射光束。他们从不下来，但会派\'观察者\'收集地面的东西。"\n\n"有人见过他们吗？"\n\n"刘小狗说他见过！"阿粒兴奋地说，"他说他们穿着和你的衣服有点像的东西，但更精致。他们有时会带走一些废土居民，那些人就再也没有回来过。"',
  options: [
    { text: '询问刘小狗在哪里', nextScene: 'askWhereIsLiuDog', endingScores: { skycity: 0.2 } },
    { text: '询问地面居民的生存方式', nextScene: 'askGroundSurvival', endingScores: { survival: 0.2 } }
  ]
},

// 询问生存方法
'askSurvivalMethods': {
  title: '废土生存法则',
  description: '"营地是怎么在这样的环境中生存的？"你问道，对这个残酷世界的适应方式感兴趣。\n\n阿粒认真地解释："刘爷说，生存有三条规则：第一，资源至上，不浪费任何可用的东西；第二，互相依靠，一个人在废土上活不长；第三，保持谨慎，永远不要完全信任陌生人。"\n\n她的声音变得更加严肃："最重要的是找到净水源。锈河的水会让皮肤溃烂，但我们有过滤系统。然后是食物——我们种一些能在辐射中生长的特殊植物，也会捕捉小动物。"',
  options: [
    { text: '询问关于辐射的防护措施', nextScene: 'askAboutRadiation', endingScores: { survival: 0.2 } },
    { text: '询问不同的废土帮派', nextScene: 'askAboutFactions', endingScores: { survival: 0.2 } }
  ]
},

// 允许检查净化服
'allowInspection': {
  title: '科技探索',
  description: '"能让我扫描一下吗？"小马兴奋地问，眼睛发亮，"我改造了这个旧世界的设备，它能读取电子信号。你的衣服有我从未见过的技术！"\n\n你犹豫地同意了。小马的设备发出嘟嘟声，一些数字和符号在小屏幕上闪烁。\n\n"太神奇了！"小马喃喃自语，"这不仅是防护服，它还在监测你的生命体征。看这些读数——体温、心率、脑电波...等等，这里有一些加密数据，我看不懂。"',
  options: [
    { text: '"这些数据告诉了你什么？"', nextScene: 'askAboutSuitData', endingScores: { tech: 0.3 } },
    { text: '感谢小马并决定休息', nextScene: 'thankMaAndRest', endingScores: { humanity: 0.1 } }
  ]
},

// 拒绝检查净化服
'refuseInspection': {
  title: '谨慎决定',
  description: '"对不起，小马，"你礼貌但坚定地说，"我现在还不太舒服让别人检查这件衣服。它可能是了解我身份的唯一线索。"\n\n小马看起来有些失望，但很快振作起来："我理解。如果你改变主意，随时可以找我。我真的很想了解它的工作原理。"\n\n他离开后，刘爷走过来，赞许地点点头："谨慎是个好品质，尤其在废土上。不是所有人都值得信任，即使是在这个营地里。"',
  options: [
    { text: '询问营地面临的威胁', nextScene: 'askAboutThreats', endingScores: { survival: 0.2 } },
    { text: '继续帮助营地工作', nextScene: 'continueWorkingDays', endingScores: { humanity: 0.2 } }
  ]
},

// 想见小马
'wantToMeetMa': {
  title: '技术好奇',
  description: '"我很想见见这位小马，"你说，"也许他能帮我了解更多关于这件净化服的事。"\n\n刘爷点点头："他的\'实验室\'在矿洞深处。不过我得警告你，一旦他开始讲解技术，很难让他停下来。"\n\n他带你穿过几个转角，来到一个被布帘隔开的区域。掀开布帘，你看到一个令人惊讶的场景——各种电子设备、工具和零件整齐地摆放在自制的工作台上，一个瘦弱的男孩正全神贯注地摆弄着某个装置。',
  options: [
    { text: '打招呼并请求帮助', nextScene: 'greetAndRequestHelp', endingScores: { tech: 0.2 } }
  ]
},

// 探索营地
'exploreCamp': {
  title: '熟悉环境',
  description: '你决定先了解这个收留你的营地，观察人们的日常生活和规则。矿洞营地虽然简陋，但组织得井井有条——每个人都有自己的任务，资源分配有明确的标准，甚至还有简单的防御系统抵御外部威胁。\n\n第七天早晨，当你正在帮助清理水箱时，营地中心突然爆发了一场争吵。你看到一个瘦小的男子——后来得知是刘小狗——正在激动地与几个营地成员争论什么。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '靠近听听争论内容', nextScene: 'approachArgument', endingScores: { survival: 0.1 } }
  ]
},

// 治疗伤员
'healingWounded': {
  title: '医者仁心',
  description: '面对伤员的痛苦呻吟，你毫不犹豫地接手了治疗工作。你的手指像有自己的记忆，熟练地清理伤口、应用药物、包扎固定。\n\n"太不可思议了，"刘爷看着你的工作，惊叹道，"你肯定是个医生，或者至少受过专业训练。"\n\n"也许吧，"你轻声回答，不确定这些技能究竟从何而来。\n\n伤员的情况稳定后，刘爷把你拉到一边："小马一直想检查你的净化服。现在我们知道了你的医疗技能，也许让他看看不是坏事？他可能帮你发现更多关于自己的线索。"',
  options: [
    { text: '同意见小马', nextScene: 'meetMaAfterHealing', endingScores: { tech: 0.2 } },
    { text: '先休息一下', nextScene: 'restAfterHealing', endingScores: { survival: 0.1 } }
  ]
},

// 同意扫描
'agreeToScan': {
  title: '技术揭秘',
  description: '"好吧，"你同意道，"看看你能发现什么。"\n\n小马欣喜若狂，立即跑去取他的设备。回来时，他手里拿着一个由各种零件拼凑而成的奇怪装置。\n\n"这是我改造的旧世界扫描仪，"他自豪地解释，"它能读取多种电子信号和数据流。"\n\n设备工作时发出轻微的嗡嗡声，小屏幕上闪烁着数字和符号。小马的眼睛越瞪越大："这太...太先进了！不仅是防护服，它还在监测你的全部生命体征，甚至有某种远程通讯功能！"',
  options: [
    { text: '询问更多细节', nextScene: 'askForMoreDetails', endingScores: { tech: 0.3 } },
    { text: '询问小马对你身份的猜测', nextScene: 'askMaGuess', endingScores: { tech: 0.2 } }
  ]
},

// 拒绝扫描
'declineScan': {
  title: '保持警惕',
  description: '"我不确定现在是检查它的好时机，"你委婉地拒绝，"也许等我更了解这里后再说？"\n\n小马的热情稍减，但他理解地点点头："当然，我理解。不过如果你改变主意，我随时可以帮忙。这件净化服可能包含了关于你身份的重要信息。"\n\n他离开后，你继续帮助营地的日常工作。几天过去，你逐渐赢得了人们的信任，尤其是在你展示出医疗技能后。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '参加晚间的营地会议', nextScene: 'eveningMeeting', endingScores: { humanity: 0.1 } }
  ]
},

// 询问天庭观察者
'askAboutObservers': {
  title: '天庭的观察者',
  description: '你上前询问："这些观察者，他们长什么样？使用什么武器？"\n\n刘小狗惊讶地看着你，似乎没想到你会对此感兴趣。"他们...穿着像你的净化服，但更加精致，带着某种头盔。武器是我从未见过的，像光线一样，能瞬间击穿金属。"\n\n争吵的人群安静下来，所有人都看着你，似乎突然意识到你与他们口中的"天庭"可能有某种联系。',
  options: [
    { 
      text: '考虑接下来的行动', 
      nextScene: 'chapter1_key_choice'
    }
  ]
},

// 暗中观察争论
'listenToArgument': {
  title: '暗中观察',
  description: '你选择不引人注目，但仔细倾听争论。刘小狗详细描述了他所见的"观察者"——他们穿着类似你的净化服，但更加先进的装备，手持能发射光线的武器。更令人不安的是，他声称听到他们在谈论"找回丢失的资产"和"R计划的遗留问题"。\n\n你意识到，这些"观察者"很可能是在寻找你。',
  options: [
    { 
      text: '思考接下来该怎么办', 
      nextScene: 'chapter1_key_choice'
    }
  ]
},

// 打招呼
'greetMa': {
  title: '与天才相遇',
  description: '"你好，"你轻声说道，不想吓到专注工作的男孩。\n\n小马猛地抬头，当他看到你时，眼睛瞬间亮了起来："哇！你就是那个穿着净化服的人！"他从工作台前跳起来，兴奋地绕着你走了一圈，"我是小马！能让我看看你的装备吗？那种闪光的显示屏...我从未见过这么先进的技术！"',
  options: [
    { text: '允许他检查净化服', nextScene: 'allowMaExamine', endingScores: { tech: 0.2 } },
    { text: '先询问他的工作', nextScene: 'askMaWork', endingScores: { tech: 0.1 } }
  ]
},

// 检查争论
'checkArgument': {
  title: '紧张的气氛',
  description: '你赶到营地中心，发现一场激烈的争吵正在进行。一个身材瘦小的男子——刘小狗——正在向其他人描述他在C区外围看到的情景。\n\n"我告诉你们，我在C区外围亲眼见到天庭的观察者！"他激动地说，"他们在寻找什么，而且带着武器！"\n\n"又编故事了是吧？"一个高大的男人嘲讽道，"上次你还说见到了会说话的活化树，结果呢？"\n\n刘小狗注意到了你，眼神突然变得复杂："他们...他们在找一些特别的东西。可能和R-250有关。"',
  options: [
    { text: '上前询问更多细节', nextScene: 'approachForDetails', endingScores: { skycity: 0.2 } },
    { text: '保持距离但仔细听', nextScene: 'keepDistanceAndListen', endingScores: { survival: 0.2 } }
  ]
},

// 同意见小马
'agreeToMeetMa': {
  title: '技术探索',
  description: '"我很想见见这位小马，"你说，"也许他能帮我了解更多关于这件衣服的事。"\n\n刘爷带你来到矿洞深处，那里有一个被临时隔断的区域，堆满了各种电子设备和零件。一个瘦弱的男孩正埋头工作，当听到脚步声时抬起头，眼睛立刻亮了起来。\n\n"R-250！"他兴奋地喊道，"我等你醒来已经好几天了！那件净化服...它还在工作对吧？我看到显示屏在闪烁！"',
  options: [
    { text: '允许小马检查净化服', nextScene: 'letMaInspect', endingScores: { tech: 0.3 } }
  ]
},

// 继续在营地工作
'continueWorkingCamp': {
  title: '日常劳作',
  description: '你决定继续帮助营地的日常工作，逐渐熟悉这里的生活节奏。每个人都有自己的责任，资源分配有严格的规则，而你的医疗和修理技能让你成为了有价值的成员。\n\n第七天早晨，当你正在帮助修理一处漏水的管道时，营地突然爆发了一阵争吵。你走近一看，是刘小狗——一个瘦小但口齿伶俐的探索者——正在激动地向其他人描述他在C区见到的情景。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '上前询问情况', nextScene: 'goForwardAndAsk', endingScores: { skycity: 0.1 } },
    { text: '保持距离观察', nextScene: 'observeFromDistance', endingScores: { survival: 0.2 } }
  ]
},

// 询问刘小狗位置
'askWhereIsLiuDog': {
  title: '寻找探索者',
  description: '"这个刘小狗现在在哪里？我很想听听他的亲身经历，"你问道。\n\n阿粒指向矿洞的一个出口："他大部分时间都在外面探索。刘爷说他是个冒险家，总是在收集旧世界的东西。他经常带回有趣的物品交换食物和水。"\n\n"他也是发现你的人！"阿粒突然想起来，"在C区的外围，你昏迷不醒地躺在那里。刘小狗和刘爷把你带了回来。"',
  options: [
    { text: '询问更多关于C区的情况', nextScene: 'askMoreAboutCZone', endingScores: { tech: 0.2 } },
    { text: '等待刘小狗返回', nextScene: 'waitForLiuDog', endingScores: { skycity: 0.1 } }
  ]
},

// 询问地面生存
'askGroundSurvival': {
  title: '废土生存策略',
  description: '"在这样艰难的环境里，人们是怎么生存下来的？"你问阿粒。\n\n"每个营地都有自己的方法，"阿粒认真地说，"我们有过滤系统和种植区。刘爷说我们是靠互助生存的。但外面还有秃鹫和火众——他们是强盗，靠抢夺别人的资源生存。"\n\n"锈河也是个大问题，"她补充道，"河水有毒，但我们不得不用它，所以才需要过滤系统。"',
  options: [
    { text: '询问自己是如何被发现的', nextScene: 'askHowFound', endingScores: { tech: 0.1 } },
    { text: '询问营地面临的威胁', nextScene: 'askCampThreats', endingScores: { survival: 0.2 } }
  ]
},

// 询问辐射防护
'askAboutRadiation': {
  title: '辐射与防护',
  description: '"辐射是怎么回事？人们如何保护自己？"你问道，意识到这可能是废土上的主要威胁之一。\n\n"辐射在很多地方都有，"阿粒解释道，"尤其是C区和锈河附近。刘爷说它会让人生病，长时间接触甚至会死亡。"\n\n她指向营地的一个角落："那边有辐射计数器，小马修好的。当数值升高时，我们就会戴防护面罩和手套，有些地方我们根本不去，太危险了。"',
  options: [
    { text: '询问哪些地方特别危险', nextScene: 'askDangerousPlaces', endingScores: { survival: 0.3 } }
  ]
},

// 询问派系
'askAboutFactions': {
  title: '废土帮派',
  description: '"你提到过\'火众\'和\'秃鹫\'，还有其他帮派吗？"你问道，试图了解这个世界的社会结构。\n\n"有\'轮椅帮\'，"阿粒解释，"他们控制着东边的一座小镇，领袖是个驼背的老人，叫林哥。他们不像秃鹫那么凶残，有时还和我们交易药物。"\n\n"还有\'老街兄弟会\'，他们在南方的旧城里，掌控着废土上最大的市场。他们搜集信息和旧世界的物品，据说什么都知道。"',
  options: [
    { text: '询问与这些帮派的关系', nextScene: 'askFactionRelations', endingScores: { survival: 0.2 } }
  ]
},

// 询问净化服数据
'askAboutSuitData': {
  title: '数据解读',
  description: '"这些数据告诉了你什么？"你好奇地问。\n\n小马推了推鼻梁上破旧的眼镜："只能确定这是非常先进的技术，至少比我见过的所有旧世界遗物都要先进。而且，"他压低声音，"如果我没猜错，你衣服上的R-250不是名字，是编号。意味着可能还有R-249，R-251...你可能是某个大型计划的一部分。"',
  options: [
    { text: '询问关于"计划"的猜测', nextScene: 'askAboutProject', endingScores: { tech: 0.3 } }
  ]
},

// 感谢小马并休息
'thankMaAndRest': {
  title: '休息时刻',
  description: '你感谢小马的帮助，但表示需要休息一下，消化这些信息。小马虽然明显还想继续研究，但理解地点点头。\n\n"随时来找我，"他说，"我会继续分析这些数据，看能否解码更多信息。"\n\n回到分配给你的简陋铺位，你躺下思考着今天的发现。不久，你陷入了一个不安的梦境——白色的墙壁，闪烁的屏幕，以及一个反复出现的倒计时。突然，梦境被打断，你惊醒过来，听到营地中传来激烈的争吵声。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '去查看情况', nextScene: 'campArgument', endingScores: { survival: 0.1 } }
  ]
},

// 询问威胁
'askAboutThreats': {
  title: '潜在危险',
  description: '"营地面临哪些威胁？"你问刘爷，希望更好地了解局势。\n\n"主要是三类，"刘爷严肃地说，"首先是自然环境——辐射、污染的水源、极端天气。然后是人为威胁——秃鹫帮会定期洗劫小型聚落，火众则控制着南部的水源。"\n\n他顿了顿，声音低沉："最后是天庭。他们几乎不干涉地面事务，但偶尔会派观察者下来。那些人带走的东西和人...从不归还。"',
  options: [
    { text: '询问更多关于天庭的信息', nextScene: 'askMoreAboutSkycity', endingScores: { skycity: 0.2 } },
    { text: '继续营地工作，获取更多信任', nextScene: 'workAndGainTrust', endingScores: { humanity: 0.2 } }
  ]
},

// 继续工作数日
'continueWorkingDays': {
  title: '日复一日',
  description: '接下来的几天里，你投入到营地的各项工作中——修理设备、帮助伤员、甚至参与巡逻。你的技能和可靠性为你赢得了营地居民的信任，尤其是在你成功修复了一个重要的净水装置后。\n\n第七天的清晨，营地中心突然爆发了争执声。你赶到时，看见刘小狗——据说是发现你的人——正在激动地描述他在C区外围的所见所闻。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '上前参与讨论', nextScene: 'joinDiscussion', endingScores: { skycity: 0.1 } }
  ]
},

// 打招呼并请求帮助
'greetAndRequestHelp': {
  title: '寻求技术帮助',
  description: '"你好，"你轻声说，不想惊扰专注工作的男孩，"我是...人们叫我小R。"\n\n男孩猛地抬头，眼睛因兴奋而发亮："R-250！我等你醒来已经好几天了！那件净化服...简直太神奇了！"\n\n他匆忙站起来，绕着你走了一圈："我是小马。你的衣服上那些闪烁的光点是在监测什么？它是如何工作的？能让我扫描一下吗？"',
  options: [
    { text: '允许小马检查净化服', nextScene: 'letMaScan', endingScores: { tech: 0.2 } },
    { text: '先了解小马的背景', nextScene: 'askMaBackground', endingScores: { humanity: 0.1 } }
  ]
},

// 接近争论
'approachArgument': {
  title: '紧张的交流',
  description: '你走近争论中心，听到刘小狗正在激动地说："我发誓！那些天庭的观察者在C区外围！他们配备了全新的武器，而且...而且他们提到了\'找回丢失的资产\'！"\n\n"又在讲故事了？"一个高大的男人嘲讽道，"上次你还说看到了会发光的鹿呢！"\n\n刘小狗看到你，突然停下来，目光在你的净化服上停留片刻："我想...他们可能是在找你，R-250。"',
  options: [
    { text: '询问详细情况', nextScene: 'askForDetails', endingScores: { skycity: 0.2 } },
    { text: '保持沉默，继续观察', nextScene: 'silentlyObserve', endingScores: { survival: 0.2 } }
  ]
},

// 治疗后见小马
'meetMaAfterHealing': {
  title: '科技求援',
  description: '你决定见见这位小马，希望能了解更多关于净化服的信息。刘爷带你穿过矿洞，来到一个被布帘隔开的小空间。里面布满了各种电子设备、零件和工具，一个瘦弱的男孩正在摆弄一个看起来像是改装过的设备。\n\n"小马，"刘爷叫道，"带来你期待已久的客人了。"\n\n男孩转过身，眼睛因兴奋而发亮："R-250！终于！我有太多问题想问你了！那件净化服...能让我看看吗？"',
  options: [
    { text: '同意让小马检查净化服', nextScene: 'agreeToSuitCheck', endingScores: { tech: 0.3 } },
    { text: '先询问他能提供什么帮助', nextScene: 'askWhatHelp', endingScores: { survival: 0.1 } }
  ]
},

// 治疗后休息
'restAfterHealing': {
  title: '短暂休憩',
  description: '"也许明天吧，"你疲惫地说，"现在我需要休息一下。"\n\n刘爷理解地点点头："当然，医生。你已经做得很好了。"\n\n这个称呼——"医生"——在你心中引起一丝共鸣，似乎确实符合你的某种身份。你回到分配给你的铺位，很快陷入梦乡。梦中，你看到白色的墙壁，听到机器的嗡鸣，还有一个反复出现的声音："R-250，状态稳定，进入第二阶段..."\n\n第二天清晨，你被营地中的争执声惊醒。',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '起身查看情况', nextScene: 'morningDispute', endingScores: { survival: 0.1 } }
  ]
},

// 询问更多细节
'askForMoreDetails': {
  title: '技术深入',
  description: '"能告诉我更多吗？"你问小马，"这些数据意味着什么？"\n\n小马兴奋地解释："我认为这不仅是防护服，而是一个完整的生物监测系统。它在记录你的所有生理数据，可能还有脑电波活动。还有一个我不理解的功能——似乎在尝试与某个远程系统通信。"\n\n他指向屏幕上的一组闪烁数字："看这个循环模式，像是在寻找接收信号。你...你可能是某个大型项目的实验对象，R-250可能就是你的代号。"',
  options: [
    { text: '询问可能的通信对象', nextScene: 'askCommunicationTarget', endingScores: { tech: 0.2 } },
    { text: '问小马是否可以追踪信号', nextScene: 'askAboutSignalTracing', endingScores: { tech: 0.2 } }
  ]
},

// 询问小马猜测
'askMaGuess': {
  title: '身份揣测',
  description: '"基于这些信息，你对我的身份有什么猜测？"你问道。\n\n小马沉思片刻："你可能是某个旧世界大型项目的参与者——也许是实验对象。R-250这个编号暗示着一个系列，而不是单一个体。这件净化服的技术水平...我敢说比任何我见过的旧世界科技都要先进。"\n\n他犹豫了一下，压低声音："有种可能性...你可能与天庭有关。那些传说中的人，住在天空城市里，拥有最先进的技术。"',
  options: [
    { text: '询问更多关于天庭的信息', nextScene: 'askMoreSkycity', endingScores: { skycity: 0.3 } },
    { text: '询问如何找回记忆', nextScene: 'askMemoryRecovery', endingScores: { tech: 0.2 } }
  ]
},

// 晚间会议
'eveningMeeting': {
  title: '营地集会',
  description: '随着夜幕降临，营地居民聚集在中央区域，围着一个简易的火堆。刘爷站在中心位置，神情严肃。\n\n"秃鹫帮最近在东边活动频繁，"他宣布道，"刘小狗今天带回消息，说他们可能计划袭击我们的水源。我们需要加强防御，也许还要考虑临时撤离。"\n\n就在讨论激烈进行时，刘小狗突然闯入圈子："还有更糟的消息！我在C区外围看到了天庭的观察者，他们似乎在寻找什么...或者某人。"他的目光转向你和你的净化服。',
  options: [
    { text: '询问这些"观察者"', nextScene: 'askAboutWatchers', endingScores: { skycity: 0.2 } },
    { text: '提议帮助加强营地防御', nextScene: 'offerDefenseHelp', endingScores: { humanity: 0.2 } }
  ]
},

// 上前询问
'goForwardAndAsk': {
  title: '直面问题',
  description: '你走向争论中心："发生了什么事？"\n\n刘小狗，一个瘦小但眼神锐利的男子，看向你："我在C区外围看到了天庭的观察者。他们装备精良，在寻找什么...或者说，寻找某人。"\n\n他的目光落在你的净化服上："他们提到了\'R计划\'和\'回收资产\'。我觉得...他们可能是来找你的。"',
  options: [
    { text: '询问更多关于这些观察者的信息', nextScene: 'inquireAboutObservers', endingScores: { skycity: 0.2 } },
    { text: '问刘爷建议如何应对', nextScene: 'askLiuYeAdvice', endingScores: { survival: 0.1 } }
  ]
},

// 远距离观察
'observeFromDistance': {
  title: '谨慎观察',
  description: '你选择保持距离，但仔细聆听争论的内容。刘小狗激动地描述着他在C区外围看到的场景——穿着先进装备的"天庭观察者"正在系统地搜索区域，手持能发射光线的武器。\n\n"他们在谈论\'找回丢失的R-250资产\'，"刘小狗说，目光转向你的方向，尽管他可能没看到你，"我想他们是来找你的，小R。"',
  options: [
    { text: '靠近了解更多', nextScene: 'moveCloserToLearn', endingScores: { skycity: 0.1 } },
    { text: '悄悄离开，思考对策', nextScene: 'quietlyRetreat', endingScores: { survival: 0.2 } }
  ]
},

// 询问C区详情
'askMoreAboutCZone': {
  title: 'C区之谜',
  description: '"能告诉我更多关于C区的情况吗？"你问道，希望了解自己被发现的地方。\n\n"C区是个危险的地方，"阿粒严肃地说，"刘爷不让我们去那里。那里有高辐射，还有奇怪的金属建筑，都已经倒塌了。有些地方会发出怪声，而且..."\n\n她压低声音："有传言说那里有活化植物，能够移动甚至攻击人。但刘小狗还是经常去那里探索，他说那里有最值钱的旧世界遗物。"',
  options: [
    { text: '询问C区与天庭的关系', nextScene: 'askCZoneSkycity', endingScores: { skycity: 0.2 } },
    { text: '表示想亲自去看看C区', nextScene: 'wantToSeeCZone', endingScores: { tech: 0.2 } }
  ]
},

// 等待刘小狗
'waitForLiuDog': {
  title: '等待探险者',
  description: '你决定等待刘小狗返回，希望从他那里获得更多关于天庭和你被发现情况的信息。几天后，一个瘦小但肌肉结实的男子回到了营地，背着一个装满旧世界物品的大包。\n\n当刘爷向他介绍你时，他的眼睛睁大了："就是你！我在C区外围找到的那个人！你知道吗？我去检查你的时候，以为你已经死了。但那件衣服...它在发光，好像在保护你。"',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '询问被发现的具体情况', nextScene: 'askDiscoveryDetails', endingScores: { tech: 0.1 } },
    { text: '询问C区的特殊之处', nextScene: 'askCZoneSpecial', endingScores: { tech: 0.2 } }
  ]
},

// 询问自己如何被发现
'askHowFound': {
  title: '发现之谜',
  description: '"我是怎么被发现的？"你询问阿粒。\n\n"刘小狗在C区外围找到你的，"阿粒解释道，"那天他去寻找可用的金属零件。他说你躺在一堆金属废墟中，身上连着一些古怪的管子和线。你似乎已经失去意识很久了，但那件神奇的衣服一直在工作，发出微弱的光。"\n\n"刘爷说你能活下来是个奇迹，"她补充道，"大家都以为你会死。但第三天你开始有反应，第五天就醒了。"',
  options: [
    { text: '询问净化服的作用', nextScene: 'askAboutSuitFunction', endingScores: { tech: 0.2 } },
    { text: '了解更多关于C区的信息', nextScene: 'learnMoreAboutCZone', endingScores: { tech: 0.1 } }
  ]
},

// 询问营地威胁
'askCampThreats': {
  title: '潜在危险',
  description: '"营地面临哪些主要威胁？"你问道。\n\n阿粒的表情变得严肃："最近的威胁是秃鹫帮，他们是一群强盗，专门袭击小型聚落。还有南边的火众，他们控制着那里的净水源。"\n\n"但最可怕的是天庭的观察者，"她压低声音补充道，"他们很少出现，但每次出现都会带走人和物品。有人说，他们进行可怕的实验。"',
  options: [
    { text: '询问如何防御这些威胁', nextScene: 'askDefenseMethods', endingScores: { survival: 0.2 } }
  ]
},

// 询问危险区域
'askDangerousPlaces': {
  title: '禁区图谱',
  description: '"哪些地方特别危险，需要避开？"你问道，试图绘制一幅精神地图。\n\n"最危险的是C区中心，"阿粒认真地回答，"辐射计数器会疯狂响个不停。然后是锈河下游，那里的水会让皮肤立刻起泡。还有黑林，那里的树木会动，有人说它们会吃人。"\n\n"还有一个地方，"她声音降低，"所有人都避开的地方——\'沉默之地\'。那里什么声音都没有，进去的人都没有回来过。"',
  options: [
    { text: '询问有没有安全的聚落', nextScene: 'askSafeSettlements', endingScores: { survival: 0.2 } },
    { text: '表示想去探索这些地方', nextScene: 'wantToExplore', endingScores: { tech: 0.2 } }
  ]
},

// 询问派系关系
'askFactionRelations': {
  title: '废土政治',
  description: '"你们与这些帮派是什么关系？"你问道，想了解这个复杂世界的社会结构。\n\n"复杂，"阿粒学着刘爷的口气说，逗得你微笑，"我们尽量与秃鹫和火众保持距离，他们都很危险。轮椅帮偶尔会来交易药物和金属零件，我们提供食物和过滤后的水。"\n\n"老街兄弟会是最好的交易伙伴，"她继续道，"他们不欺骗人，也有规矩。但他们会收集关于所有人的信息。刘爷说这让他们很危险，但也很有价值。"',
  options: [
    { text: '询问去往老街的路线', nextScene: 'askRouteToOldStreet', endingScores: { survival: 0.2 } },
    { text: '询问关于天庭的态度', nextScene: 'askAttitudeTowardsSkycity', endingScores: { skycity: 0.2 } }
  ]
},

// 询问计划猜测
'askAboutProject': {
  title: '神秘计划',
  description: '"你对这个计划有什么猜测？"你问道，试图拼凑自己的过去。\n\n小马推了推眼镜："基于这些数据和你的净化服技术水平，我猜测这可能是某种人体实验或生物适应性项目。R可能代表\'Resilience\'（韧性）或\'Radiation\'（辐射），250可能是你的实验编号。"\n\n他犹豫了一下："还有一种可能...这可能与天庭有关。营地里没人真正了解天庭，但他们拥有最先进的技术。你可能是...来自那里的。"',
  options: [
    { text: '询问如何确认这些猜测', nextScene: 'askHowToConfirm', endingScores: { tech: 0.2 } },
    { text: '问能否改进净化服功能', nextScene: 'askAboutSuitUpgrade', endingScores: { tech: 0.2 } }
  ]
},

// 营地争论
'campArgument': {
  title: '紧张局势',
  description: '你赶到营地中央，看到一场激烈的争论正在进行。刘小狗——那个据说发现了你的探险者——正在激动地向众人描述他在C区外围看到的情景。\n\n"天庭的观察者！"他坚持道，"穿着与小R类似但更先进的装备，带着能发射光线的武器。他们在寻找什么...或者说某人。"\n\n他的目光转向你："他们提到了\'R计划\'和\'丢失资产\'。我觉得...他们是来找你的。"',
  options: [
    { text: '询问更多详情', nextScene: 'askMoreArgument', endingScores: { skycity: 0.2 } },
    { text: '询问刘爷建议', nextScene: 'askLiuYeAdvice', endingScores: { survival: 0.1 } }
  ]
},

// 询问天庭
'askMoreAboutSkycity': {
  title: '神秘天空之城',
  description: '"关于天庭，你们知道多少？"你问道。\n\n刘爷的表情变得复杂："不多。没人确切知道它在哪里——有人说是在高空的城市，有人说是轨道空间站，还有人认为是山顶的要塞。"\n\n"他们拥有旧世界最先进的技术，甚至可能更先进，"他继续道，"偶尔会派\'观察者\'下来收集样本和信息。大多数废土居民终生都不会见到他们，这也许是件好事。"',
  options: [
    { text: '询问观察者的外表和装备', nextScene: 'askAboutObserversAppearance', endingScores: { skycity: 0.2 } },
    { text: '询问他们带走了什么', nextScene: 'askWhatTheyTake', endingScores: { skycity: 0.1 } }
  ]
},

// 工作获取信任
'workAndGainTrust': {
  title: '互助合作',
  description: '接下来的几天，你全身心投入到营地工作中——修理设备、处理伤员、甚至教阿粒一些简单的医学知识。你的技能和奉献精神为你赢得了居民们的尊重和信任。\n\n第七天早晨，一阵喧哗打破了营地的平静。刘小狗从外面跑进来，神情紧张："秃鹫帮要来了！他们至少有二十人，全副武装！他们知道我们的净水系统！"',
  skipResourceConsumption: true,
  timeSkip: true,
  options: [
    { text: '提议组织防御', nextScene: 'organizeDefense', endingScores: { humanity: 0.3 } },
    { text: '建议临时撤离', nextScene: 'suggestEvacuation', endingScores: { survival: 0.3 } }
  ]
},

// 参与讨论
'joinDiscussion': {
  title: '加入争论',
  description: '你走向争论的人群："发生了什么？"\n\n"刘小狗又在讲天庭故事了，"一个高大男人嘲讽地说，"下次该说他看见了会飞的猪了。"\n\n刘小狗，一个精瘦的男子，看到你后神情变得复杂："不是故事！我亲眼所见！天庭的观察者在C区外围，穿着与他类似的装备。"他指着你的净化服，"他们在寻找什么...或者说某人。提到了\'R-250资产\'。"',
  options: [
    { text: '询问这些观察者的详情', nextScene: 'inquireObserverDetails', endingScores: { skycity: 0.2 } },
    { text: '问刘爷怎么看这件事', nextScene: 'askLiuYeOpinion', endingScores: { survival: 0.1 } }
  ]
},

// 让小马检查净化服
'letMaScan': {
  title: '技术检查',
  description: '你同意让小马检查你的净化服。他兴奋地取出一个由各种零件拼凑而成的装置："这是我改造的旧世界扫描仪，应该能读取一些基本数据。"\n\n设备工作时发出微弱的嗡嗡声，小屏幕上显示出一系列数字和符号。小马的眼睛越来越亮："这太不可思议了！你的净化服不只是防护设备，它还在持续监测你的生命体征，甚至可能记录着你的脑电波活动！"\n\n他抬头看着你："这是我见过的最先进的技术，一定是来自...天庭。"',
  options: [
    { text: '询问关于天庭的信息', nextScene: 'askAboutSkyCity', endingScores: { skycity: 0.3 } },
    { text: '询问净化服的其他功能', nextScene: 'askAboutSuitFeatures', endingScores: { tech: 0.3 } }
  ]
},

// 询问小马背景
'askMaBackground': {
  title: '科技天才',
  description: '"在讨论我的事之前，我想了解一下你，"你友好地说，"你是怎么学会这些技术知识的？"\n\n小马的眼睛亮了起来："我从小就喜欢拆解东西看它们如何工作。六岁时，我修好了刘爷的旧收音机；十岁时，改装了一个太阳能电池板；现在，我正在尝试建造一个能探测辐射的机器人！"\n\n他的热情感染了你："在废土上，很多人只关心生存，但我想知道为什么。知识就是力量，对吧？"',
  options: [
    { text: '同意并让他检查净化服', nextScene: 'agreeAndAllowCheck', endingScores: { tech: 0.2 } },
    { text: '询问他对天庭的看法', nextScene: 'askViewOnSkycity', endingScores: { skycity: 0.2 } }
  ]
},

// 询问详细情况
'askForDetails': {
  title: '寻求真相',
  description: '"这些天庭的观察者，你能详细描述一下吗？"你问道，感到一丝不安。\n\n刘小狗看着你的净化服："他们穿着类似的装备，但更加精致，全身覆盖，头盔能完全密封。手中的武器像短杆，能发射光束。他们在系统地搜索C区外围，使用某种扫描设备。"\n\n他压低声音："我听到他们谈论\'R计划\'和\'回收250号资产\'。我想...他们是来找你的。"',
  options: [
    { text: '询问刘爷的建议', nextScene: 'askYeAdvice', endingScores: { survival: 0.1 } },
    { text: '考虑要不要与观察者接触', nextScene: 'considerContactingObservers', endingScores: { skycity: 0.3 } }
  ]
},

// 安静观察
'silentlyObserve': {
  title: '冷静旁观',
  description: '你选择不发言，而是仔细观察争论的发展。刘爷最终打断了争吵："够了！无论真假，我们都需要谨慎。如果天庭真派人来了，我们最好保持低调。"\n\n散会后，刘爷来到你身边："小R，我不想吓到你，但如果刘小狗所言非虚，你可能已经不安全了。你的那件净化服...太显眼了。我们需要考虑下一步行动。"',
  options: [
    { text: '询问他有何建议', nextScene: 'askLiuYeSuggestions', endingScores: { survival: 0.2 } },
    { text: '表示愿意离开以保护营地', nextScene: 'offerToLeave', endingScores: { humanity: 0.3 } }
  ]
},

// 允许小马检查净化服
'allowMaExamine': {
  title: '科技解密',
  description: '"好吧，你可以检查它，"你同意道，好奇他能发现什么。\n\n小马如获至宝，立即拿出一个自制的扫描设备。当他的设备运行时，表情从兴奋逐渐变为震惊："这...这不可能！这种技术水平...太先进了！"\n\n他指着读数："这不仅是防护服，它还在监测你的全身生理状态，甚至可能在记录脑电波活动。而且...它似乎在尝试与某个远程系统通信。"',
  options: [
    { text: '询问通信的可能对象', nextScene: 'askPossibleCommunicationTargets', endingScores: { tech: 0.2 } },
    { text: '询问他对你身份的猜测', nextScene: 'askMaIdentityGuess', endingScores: { tech: 0.2 } }
  ]
},

// 询问小马的工作
'askMaWork': {
  title: '天才的工坊',
  description: '"你在做什么项目？"你指着他混乱但有序的工作台问道。\n\n小马的眼睛因热情而发亮："太多了！我正在改装一个辐射探测器，希望能让它更便携；还有一个净水过滤系统的升级方案；哦，还有我最爱的项目——尝试解码从C区接收到的奇怪信号！"\n\n"信号？"你好奇地问。\n\n"是的，很微弱，但确实存在。像某种循环广播，或许是旧世界的自动系统。如果能解码，也许能找到有用的信息或资源。"',
  options: [
    { text: '提议帮助解码信号', nextScene: 'offerToHelpDecoding', endingScores: { tech: 0.3 } },
    { text: '现在允许他检查净化服', nextScene: 'nowAllowExamination', endingScores: { tech: 0.2 } }
  ]
},

// 上前询问详情
'approachForDetails': {
  title: '真相探索',
  description: '"能说得更详细些吗？"你走向刘小狗，问道。\n\n众人的目光都转向你们。刘小狗深吸一口气："我在C区外围看到了三个天庭的观察者。他们穿着全封闭装备，手持先进武器，在系统地搜索区域。他们使用某种扫描设备，还提到了\'R计划\'和\'回收250号资产\'。"\n\n房间陷入沉默，所有人都意识到这个数字与你胸前的编号相符。刘爷打破沉默："小R，恐怕你已经不安全了。"',
  options: [
    { text: '询问刘爷有何建议', nextScene: 'askLiuYeRecommendation', endingScores: { survival: 0.2 } },
    { text: '考虑要不要主动接触观察者', nextScene: 'considerMeetingObservers', endingScores: { skycity: 0.3 } }
  ]
},

// 保持距离但仔细听
'keepDistanceAndListen': {
  title: '谨慎聆听',
  description: '你选择不引人注目，但仔细倾听争论内容。刘小狗描述了他在C区外围看到的"天庭观察者"——穿着先进装备的人员，使用扫描设备搜索区域，谈论"R计划"和"回收250号资产"。\n\n众人有些将信将疑，但刘爷的态度很认真："无论真假，我们都需要小心。如果天庭真派人来了，那情况比秃鹫帮更危险。"',
  options: [
    { text: '在会议结束后私下找刘爷', nextScene: 'privatelyMeetLiuYe', endingScores: { survival: 0.2 } },
    { text: '找刘小狗了解更多细节', nextScene: 'consultLiuDog', endingScores: { skycity: 0.2 } }
  ]
},

// 允许小马研究净化服
'letMaInspect': {
  title: '科技揭秘',
  description: '"可以，"你同意道，"也许你能帮我了解这件衣服...和我自己。"\n\n小马欣喜若狂，立即拿出一个由各种零件拼凑而成的设备。当他的扫描仪运行时，他的表情从兴奋变为震惊："这...这不可能！这种技术水平...完全超出了我见过的任何旧世界遗物！"\n\n他指着读数："这不仅是防护服，它在持续监测你的所有生理指标，甚至可能记录着脑电波活动。而且...它似乎在尝试与某个远程系统通信。"',
  options: [
    { text: '询问他对通信对象的猜测', nextScene: 'askComTarget', endingScores: { tech: 0.2 } },
    { text: '询问净化服的其他功能', nextScene: 'askOtherFunctions', endingScores: { tech: 0.2 } }
  ]
},

// 通信目标
'askComTarget': {
  title: '神秘来源',
  description: '"你觉得这件衣服在尝试与谁通信？"你问道，感到既好奇又不安。\n\n小马犹豫了一下："最可能的...是天庭。传说中他们拥有旧世界最先进的技术，能在高空监视整个废土。如果你真的与他们有关系..."\n\n他没有说完，但担忧的表情已经说明了一切。就在这时，营地外传来一阵骚动声，接着是刘小狗急促的呼喊："秃鹫帮！他们向营地来了！"',
  options: [
    { text: '立刻去查看情况', nextScene: 'checkVultureSituation', endingScores: { survival: 0.1 } }
  ]
},

// 询问其他功能
'askOtherFunctions': {
  title: '未知功能',
  description: '"这件衣服还有什么其他功能吗？"你问道。\n\n小马仔细研究着读数："难以确定全部功能，但它绝对不仅仅是防辐射。它可能具有医疗功能——能检测生理异常并可能采取措施。还有..."\n\n他突然指向一组特殊的读数："这很奇怪。看起来像某种记忆存储系统。也许它不仅监测你的身体，还在记录你的经历或思维活动。"\n\n正当你思考这一发现的含义时，营地外传来一阵骚动声。',
  options: [
    { text: '去查看外面的骚动', nextScene: 'investigateCommotion', endingScores: { survival: 0.1 } }
  ]
},

// 检查秃鹫情况
'checkVultureSituation': {
  title: '紧急威胁',
  description: '你和小马迅速赶往营地入口。那里一片混乱——居民们急忙收集物资，刘爷正在组织防御。远处，一群约二十人的武装团伙正朝营地方向前进。\n\n"秃鹫帮，"刘爷简短地解释，"不知为何他们发现了我们的营地。我们没有足够武器对抗他们。必须立即撤离，前往轮椅镇寻求庇护。"\n\n他看向你："小R，你的处境比我们更危险。不仅是秃鹫帮，天庭的观察者也可能在找你。"',
  options: [
    { text: '提出帮助营地居民撤离', nextScene: 'chapter1_key_choice', endingScores: { humanity: 0.3 } },
    { text: '询问最安全的撤离路线', nextScene: 'chapter1_key_choice', endingScores: { survival: 0.3 } }
  ]
},

// 调查骚动
'investigateCommotion': {
  title: '外部威胁',
  description: '你和小马走出他的工作区，看到营地一片混乱。刘小狗正向众人大喊："秃鹫帮！至少二十人，全副武装！他们已经突破了外围警报！"\n\n刘爷冷静地指挥着："收集必要物资，准备撤离。老路线不安全，我们走矿井通道。"\n\n看到你，他面色凝重："小R，现在你面临双重危险——秃鹫帮和可能的天庭观察者。我们必须立即离开，前往轮椅镇寻求庇护。"',
  options: [
    { text: '提议帮助保护撤离的人群', nextScene: 'chapter1_key_choice', endingScores: { humanity: 0.3 } },
    { text: '建议分头行动以减少风险', nextScene: 'chapter1_key_choice', endingScores: { survival: 0.3 } }
  ]
},
// 补充缺失场景

// 1. askHowToConfirm
'askHowToConfirm': {
  title: '如何确认',
  description: `"如何才能确认这套装甲的真实来源？"你问道，手指轻轻敲击着胸前的金属外壳。
  
  马沉思片刻："如果能接入通讯网络，我可以用我的终端解析更多数据。但风险在于，一旦连接，可能会暴露你的位置。你想尝试吗？"`,
  options: [
    { text: '同意尝试连接', nextScene: 'chapter1_key_choice' },
    { text: '先了解装甲其他功能', nextScene: 'askAboutSuitUpgrade' }
  ]
},

// 2. nowAllowExamination
'nowAllowExamination': {
  title: '同意检查',
  description: `你思考片刻，决定信任马的专业知识："好吧，你可以检查我的装甲。"
  
  马点点头，拿出一台小型终端设备："很明智的选择。这不会花太长时间，但可能会发现一些关于你身份的线索。"`,
  options: [
    { text: '询问可能的通讯对象', nextScene: 'askPossibleCommunicationTargets' },
    { text: '询问马对你身份的猜测', nextScene: 'askMaIdentityGuess' }
  ]
},

// 3. askAboutSuitFeatures
'askAboutSuitFeatures': {
  title: '装甲功能',
  description: `"这套装甲还有什么特殊功能吗？"你好奇地询问。
  
  马的眼睛闪烁着专业的光芒："据我观察，这是高级生存装甲，具备环境适应、伤口处理和数据存储功能。最令人惊讶的是自修复系统，但它似乎处于低能量状态。"`,
  options: [
    { text: '询问天空城的情况', nextScene: 'askAboutSkyCity' },
    { text: '询问如何激活更多功能', nextScene: 'chapter1_key_choice' }
  ]
},

// 4. askCZoneSpecial
'askCZoneSpecial': {
  title: 'C区特别之处',
  description: `"C区有什么特别之处？"你问道。
  
  刘狗迟疑了片刻："C区是禁区边缘，辐射较低，但有古老的军事设施。我们在那里发现了异常的能量信号，与你身上的装甲频率相似。如果你来自那里，可能会有线索。"`,
  options: [
    { text: '表示想去C区看看', nextScene: 'wantToSeeCZone' },
    { text: '询问天空城与C区的关系', nextScene: 'askCZoneSkycity' }
  ]
},

// 5. askWhatHelp
'askWhatHelp': {
  title: '能提供什么帮助',
  description: `"我能为营地做些什么？"你问道，感觉有义务回报他们的善意。
  
  马眼中闪过一丝惊讶："你的医疗技能相当出色，似乎是专业训练的结果。最近观察者活动增加，我们需要有人协助防御计划。另外，你对通讯设备的熟悉度也很高。"`,
  options: [
    { text: '同意检查装甲系统', nextScene: 'agreeToSuitCheck' },
    { text: '询问营地争端的情况', nextScene: 'morningDispute' }
  ]
},

// 6. askMoreSkycity
'askMoreSkycity': {
  title: '更多关于天空城',
  description: `"能告诉我更多关于天空城的事吗？"你问道。
  
  马的表情变得复杂："天空城是最后的高科技庇护所之一，拥有先进技术和资源。他们派观察者收集地面情报和技术。有传言说他们在寻找特殊的'项目遗物'，可能与你的装甲有关。"`,
  options: [
    { text: '询问如何恢复记忆', nextScene: 'askMemoryRecovery' },
    { text: '考虑接触观察者', nextScene: 'chapter1_key_choice' }
  ]
},

// 7. consultLiuDog
'consultLiuDog': {
  title: '咨询刘狗',
  description: `你决定寻找刘狗谈谈，他正在检查营地边缘的陷阱。
  
  "观察者不是普通的掠夺者，"刘狗低声说，"他们有组织、有纪律，而且装备精良。如果他们真的对你感兴趣，要么你非常有价值，要么非常危险。"`,
  options: [
    { text: '询问天空城的意图', nextScene: 'chapter1_key_choice' },
    { text: '讨论如何应对观察者', nextScene: 'chapter1_key_choice' }
  ]
},

// 8. askAboutSuitFunction
'askAboutSuitFunction': {
  title: '装甲功能',
  description: `"我的装甲有哪些特殊功能？"你问道。
  
  阿里仔细观察着你："据我所知，这类高级装甲通常具备环境适应系统、生命维持功能和数据存储。但你的这套似乎有额外的通讯模块，可能还有我们不了解的其他功能。"`,
  options: [
    { text: '了解更多关于C区的信息', nextScene: 'learnMoreAboutCZone' },
    { text: '尝试激活装甲的通讯功能', nextScene: 'chapter1_key_choice' }
  ]
},

// 9. askAboutSuitUpgrade
'askAboutSuitUpgrade': {
  title: '装甲升级',
  description: `"这套装甲能升级或修复吗？"你询问马。
  
  她若有所思地点头："理论上可以。我们营地的资源有限，但如果找到合适的材料和工具，我可以帮你激活一些被锁定的功能。C区可能有我们需要的组件。"`,
  options: [
    { text: '讨论前往C区的可能性', nextScene: 'chapter1_key_choice' },
    { text: '询问天空城的科技水平', nextScene: 'chapter1_key_choice' }
  ]
},

// 10. considerMeetingObservers
'considerMeetingObservers': {
  title: '考虑接触观察者',
  description: `"如果观察者真的在寻找我，也许我应该主动接触他们？"你思考着说。
  
  刘叶的表情变得严肃："风险很大。观察者服务于天空城的利益，不一定关心你的安危。但如果他们掌握着关于你身份的信息，这可能是值得的冒险。"`,
  options: [
    { text: '同意尝试接触观察者', nextScene: 'chapter1_key_choice' },
    { text: '暂时观望，收集更多信息', nextScene: 'chapter1_key_choice' }
  ]
},

// 11. askMoreArgument
'askMoreArgument': {
  title: '争论详情',
  description: `"能详细说说这场争论吗？"你问道。
  
  刘叶叹了口气："马想研究信号来源，认为对营地安全至关重要。但刘狗担心这会吸引更多观察者，甚至引来天空城的直接干预。大家都紧张，都怕做错决定。"`,
  options: [
    { text: '询问刘叶的建议', nextScene: 'askLiuYeAdvice' },
    { text: '考虑是否帮助马研究信号', nextScene: 'chapter1_key_choice' }
  ]
},

// 12. organizeDefense
'organizeDefense': {
  title: '组织防御',
  description: `"我可以帮忙组织营地防御，"你提议，"我对战术似乎有些直觉。"
  
  阿里惊讶地挑眉："这再次证明你不是普通人。好吧，我们需要加固东边的屏障，设置监控点，并准备紧急撤离路线。你有什么具体建议？"`,
  options: [
    { text: '建议设置陷阱和警报系统', nextScene: 'chapter1_key_choice' },
    { text: '提出分组巡逻和信号系统', nextScene: 'chapter1_key_choice' }
  ]
},

// 13. inquireObserverDetails
'inquireObserverDetails': {
  title: '观察者的详细情况',
  description: `"这些观察者到底是什么人？他们想要什么？"你直接问道。
  
  争论的人群安静下来，几个人交换了眼神。一位年长者开口："他们是天空城派来的特工，收集技术和情报。最近他们对C区特别感兴趣，而自从你出现后，他们的活动更频繁了。"`,
  options: [
    { text: '询问刘叶的看法', nextScene: 'askLiuYeOpinion' },
    { text: '建议主动接触观察者', nextScene: 'chapter1_key_choice' }
  ]
},

// 14. offerDefenseHelp
'offerDefenseHelp': {
  title: '提供防御帮助',
  description: `"我可以帮助加强营地防御，"你说，"也许我的装甲系统可以用来改进你们的防御设施。"
  
  几位营地成员交换了惊讶的眼神。马立即表现出兴趣："这套装甲的技术确实远超我们现有的。如果你愿意，我们可以一起研究如何应用。"`,
  options: [
    { text: '讨论观察者的威胁', nextScene: 'askAboutWatchers' },
    { text: '同意与马共同研究装甲', nextScene: 'chapter1_key_choice' }
  ]
},

// 15. considerContactingObservers
'considerContactingObservers': {
  title: '考虑联系观察者',
  description: `"也许我们应该考虑直接与观察者接触？"你提议，"如果他们对我感兴趣，可以谈条件。"
  
  刘叶警惕地看着你："那风险太大。观察者不讲条件，他们拿走他们想要的，很少给予回报。除非...你知道什么我们不知道的事？"`,
  options: [
    { text: '寻求刘叶的建议', nextScene: 'askYeAdvice' },
    { text: '表示愿意冒险一试', nextScene: 'chapter1_key_choice' }
  ]
},

// 16. askAboutSkyCity
'askAboutSkyCity': {
  title: '关于天空城',
  description: `"天空城到底是个什么样的地方？"你问道。
  
  马的表情变得复杂："一座悬浮在云端的科技奇迹，最后的人类高级文明据点。那里有清洁的水、空气和无限的能源。但进入极其困难，他们只接纳有价值的人或技术。"`,
  options: [
    { text: '询问装甲的特殊功能', nextScene: 'askAboutSuitFeatures' },
    { text: '问自己是否来自天空城', nextScene: 'chapter1_key_choice' }
  ]
},

// 17. moveCloserToLearn
'moveCloserToLearn': {
  title: '靠近了解',
  description: `你小心翼翼地靠近争论的人群，希望听清他们的谈话内容。
  
  "信号变强了！"马坚持道，"这绝不是巧合。自从有人发现他，观察者就开始在C区周围活动。"
  
  "那更应该谨慎！"刘狗反驳，"如果观察者是冲着他来的，我们就不该介入。"`,
  options: [
    { text: '询问关于观察者的情况', nextScene: 'inquireAboutObservers' },
    { text: '安静地撤退', nextScene: 'quietlyRetreat' }
  ]
},

// 18. askLiuYeSuggestions
'askLiuYeSuggestions': {
  title: '刘叶的建议',
  description: `你走向刘叶："对于这场争论，你有什么建议吗？"
  
  刘叶沉思片刻："跟着你的直觉走。如果你想了解自己的过去，马可能会有帮助。但请记住，知识有时伴随着危险。观察者不会无缘无故对一个废土流浪者感兴趣。"`,
  options: [
    { text: '决定帮助马研究信号', nextScene: 'chapter1_key_choice' },
    { text: '提出离开营地', nextScene: 'offerToLeave' }
  ]
},

// 19. wantToExplore
'wantToExplore': {
  title: '探索意愿',
  description: `"我想亲自探索这片废土，"你说，"也许那会帮助我恢复记忆。"
  
  阿里担忧地看着你："单独探索非常危险。如果你坚持，至少需要补给和地图。也许可以先从安全区开始，比如旧街区，那里有交易站。"`,
  options: [
    { text: '询问安全的定居点', nextScene: 'askSafeSettlements' },
    { text: '询问前往旧街区的路线', nextScene: 'askRouteToOldStreet' }
  ]
},

// 20. learnMoreAboutCZone
'learnMoreAboutCZone': {
  title: '了解更多C区',
  description: `"能告诉我更多关于C区的情况吗？"你问道。
  
  阿里点点头："C区是旧世界军事设施的遗迹，辐射较低，但有古老的防御系统仍在运行。最近观察者频繁出入，我们探索小队发现了奇怪的能量信号，与你装甲发出的非常相似。"`,
  options: [
    { text: '表达想去C区的意愿', nextScene: 'wantToSeeCZone' },
    { text: '询问C区与天空城的关系', nextScene: 'askCZoneSkycity' }
  ]
},

// 21. askDefenseMethods
'askDefenseMethods': {
  title: '防御方法',
  description: `"你们如何防御这些威胁？"你问道，指着营地周围的简易屏障。
  
  阿里微微一笑："结合了旧世界和新技术。陷阱、警报系统、巡逻，以及我们最大的资产——团队合作。每个人都有职责，包括你在内。你的医疗技能对我们很有价值。"`,
  options: [
    { text: '提出帮助改进防御系统', nextScene: 'chapter1_key_choice' },
    { text: '询问危险地区', nextScene: 'askDangerousPlaces' }
  ]
},

// 22. askAboutObserversAppearance
'askAboutObserversAppearance': {
  title: '观察者的外表',
  description: `"这些观察者长什么样？我该如何辨认他们？"你问道。
  
  "他们穿着黑色贴身装甲，带有蓝色能量线条，"马解释道，"头盔完全封闭，装备先进的光学系统。他们移动迅速无声，通常单独行动或三人小组。如果你看到这样的人，保持距离。"`,
  options: [
    { text: '询问他们带走什么', nextScene: 'askWhatTheyTake' },
    { text: '讨论如何应对观察者威胁', nextScene: 'chapter1_key_choice' }
  ]
},

// 23. wantToSeeCZone
'wantToSeeCZone': {
  title: '想看看C区',
  description: `"我想亲自去C区看看，"你坚定地说，"如果那里有关于我身份的线索..."
  
  阿里和刘狗交换了眼神。"很危险，"刘狗说，"但如果你坚持，我可以带队。不过需要准备充分，观察者最近在那里活动频繁。"`,
  options: [
    { text: '准备前往C区探索', nextScene: 'chapter1_key_choice' },
    { text: '询问C区与天空城的联系', nextScene: 'askCZoneSkycity' }
  ]
},

// 24. askYeAdvice
'askYeAdvice': {
  title: '求助刘叶',
  description: `你转向刘叶："在这种情况下，你认为我该怎么做？"
  
  刘叶沉思片刻："信任你的直觉。观察者对你有兴趣非同寻常，说明你可能比自己意识到的更重要。无论选择什么，都要记住，在废土上，信息和忠诚一样珍贵。"`,
  options: [
    { text: '决定帮助马研究信号', nextScene: 'chapter1_key_choice' },
    { text: '选择保持低调，继续在营地工作', nextScene: 'chapter1_key_choice' }
  ]
},

// 25. askWhatTheyTake
'askWhatTheyTake': {
  title: '他们带走什么',
  description: `"观察者通常会带走什么？"你好奇地问。
  
  马严肃地回答："技术组件、数据存储设备，有时是特殊的矿物或材料。但最令人担忧的是，有时他们会带走人——那些有特殊技能或知识的人，从未返回。这就是为什么你的情况令人担忧。"`,
  options: [
    { text: '决定主动接触观察者', nextScene: 'chapter1_key_choice' },
    { text: '选择与营地一起组织防御', nextScene: 'chapter1_key_choice' }
  ]
},

// 26. privatelyMeetLiuYe
'privatelyMeetLiuYe': {
  title: '私下会见刘叶',
  description: `你找到一个安静的时刻，私下接近刘叶。
  
  "你看起来心事重重，"她观察道，"关于那场争论，我认为马和刘狗都有道理。信号确实值得研究，但也可能引来危险。你的出现改变了营地的平衡，无论你做什么决定，都会有影响。"`,
  options: [
    { text: '询问更多关于观察者的信息', nextScene: 'chapter1_key_choice' },
    { text: '讨论可能的行动计划', nextScene: 'chapter1_key_choice' }
  ]
},

// 27. agreeAndAllowCheck
'agreeAndAllowCheck': {
  title: '同意检查',
  description: `"我同意让你检查装甲系统，"你决定道，"如果能找到关于我身份的线索，值得一试。"
  
  马点点头，拿出一台小型设备："我会尽可能小心，不触发任何防御机制。这套装甲的技术远超我们现有水平，但我能识别基础功能和通讯协议。"`,
  options: [
    { text: '询问马对天空城的看法', nextScene: 'askViewOnSkycity' },
    { text: '专注于了解装甲功能', nextScene: 'chapter1_key_choice' }
  ]
},

// 28. askAboutWatchers
'askAboutWatchers': {
  title: '关于观察者',
  description: `"这些观察者到底是什么人？他们为什么对营地感兴趣？"你直接问道。
  
  "他们是天空城的探员，"一位年长者解释，"收集技术、资源和情报。通常他们不会直接干预地面事务，除非发现特别有价值的东西。自从你出现，他们的活动明显增加。"`,
  options: [
    { text: '提出帮助营地防御', nextScene: 'offerDefenseHelp' },
    { text: '建议尝试与观察者沟通', nextScene: 'chapter1_key_choice' }
  ]
},

// 29. askDiscoveryDetails
'askDiscoveryDetails': {
  title: '发现的细节',
  description: `"能详细说说你在C区的发现吗？"你问刘狗。
  
  他点点头："我们发现了一个半掩埋的设施入口，周围有能量痕迹。最令人惊讶的是，当我们靠近时，你的装甲似乎有反应——微弱的光和声音。这不可能是巧合。"`,
  options: [
    { text: '询问C区有什么特别之处', nextScene: 'askCZoneSpecial' },
    { text: '表达想亲自去看看的意愿', nextScene: 'wantToSeeCZone' }
  ]
},

// 30. askCZoneSkycity
'askCZoneSkycity': {
  title: 'C区与天空城',
  description: `"C区与天空城有什么关系？"你问道。
  
  "根据我们的观察，"阿里解释，"天空城对C区特别感兴趣。观察者经常在那里活动，似乎在寻找什么。有传言说，C区是旧世界与天空城建立者有关的设施，可能包含重要技术。"`,
  options: [
    { text: '提议前往C区探索', nextScene: 'chapter1_key_choice' },
    { text: '询问如果去C区会有什么风险', nextScene: 'chapter1_key_choice' }
  ]
},

// 31. askPossibleCommunicationTargets
'askPossibleCommunicationTargets': {
  title: '可能的通讯目标',
  description: `"如果我的装甲在尝试通讯，可能的目标是什么？"你问道。
  
  马思考着："根据信号特征，可能是另一个类似系统，或某种中央网络。天空城有最先进的通讯阵列，但也可能是旧世界遗留的某个自动系统。最令人担忧的是，这可能会暴露你的位置。"`,
  options: [
    { text: '询问马对你身份的猜测', nextScene: 'askMaIdentityGuess' },
    { text: '决定尝试激活通讯功能', nextScene: 'chapter1_key_choice' }
  ]
},

// 32. askLiuYeOpinion
'askLiuYeOpinion': {
  title: '刘叶的观点',
  description: `你转向一直安静观察的刘叶："你对这件事怎么看？"
  
  刘叶平静地说："观察者的兴趣意味着你比看起来更重要。我们应该谨慎，但不要错过机会。也许你的出现不是偶然，而是某种命运。无论你选择什么，我都会支持。"`,
  options: [
    { text: '决定帮助研究信号源', nextScene: 'chapter1_key_choice' },
    { text: '提议前往C区探索', nextScene: 'chapter1_key_choice' }
  ]
},

// 33. askCommunicationTarget
'askCommunicationTarget': {
  title: '通讯目标',
  description: `"装甲试图与谁通讯？"你直接问道。
  
  马摇头："无法确定。信号很复杂，采用高级加密。可能是某个中央系统，或同类装甲。令人担忧的是，如果信号被截获，可能会引来不必要的注意，特别是观察者。"`,
  options: [
    { text: '询问信号追踪的可能性', nextScene: 'askAboutSignalTracing' },
    { text: '决定冒险尝试连接', nextScene: 'chapter1_key_choice' }
  ]
},

// 34. askViewOnSkycity
'askViewOnSkycity': {
  title: '对天空城的看法',
  description: `"你对天空城有什么看法？"你询问马。
  
  她的表情变得复杂："天空城代表着人类最后的科技高峰，但他们与地面的关系充满张力。他们有资源和知识拯救废土，却选择隔离。观察者收集资源，却很少给予回报。我既钦佩又警惕他们。"`,
  options: [
    { text: '询问是否可能与天空城接触', nextScene: 'chapter1_key_choice' },
    { text: '请马继续检查装甲系统', nextScene: 'chapter1_key_choice' }
  ]
},

// 35. morningDispute
'morningDispute': {
  title: '晨间争端',
  description: `清晨，你被激烈的讨论声惊醒。马和刘狗正在争论关于信号和观察者的事。
  
  "信号变强了！"马坚持道，"我们需要调查。"
  
  "那会引来更多观察者！"刘狗反驳，"他们已经太接近营地了。"
  
  其他营地成员看起来也很紧张，分成了不同意见的小组。`,
  options: [
    { text: '介入争论，了解情况', nextScene: 'chapter1_key_choice' },
    { text: '先观察情况，不急着表态', nextScene: 'chapter1_key_choice' }
  ]
},

// 36. agreeToSuitCheck
'agreeToSuitCheck': {
  title: '同意装甲检查',
  description: `"如果检查我的装甲能帮助找到答案，我同意。"你说道。
  
  马露出感激的笑容："谢谢你的信任。我会非常小心，主要是分析通讯模块和数据存储。也许能找到关于你身份的线索，甚至恢复一些记忆。"`,
  options: [
    { text: '询问天空城是否与此相关', nextScene: 'chapter1_key_choice' },
    { text: '讨论装甲可能的特殊功能', nextScene: 'chapter1_key_choice' }
  ]
},

// 37. askAboutSignalTracing
'askAboutSignalTracing': {
  title: '信号追踪',
  description: `"如果我的装甲发出信号，是否能被追踪？"你担忧地问。
  
  马严肃地点头："绝对可以。任何足够先进的系统都能锁定信号源，特别是天空城的技术。这就是为什么观察者活动增加，他们可能已经注意到了异常信号，正在寻找源头。"`,
  options: [
    { text: '询问如何屏蔽信号', nextScene: 'chapter1_key_choice' },
    { text: '考虑主动与观察者接触', nextScene: 'chapter1_key_choice' }
  ]
},

// 38. quietlyRetreat
'quietlyRetreat': {
  title: '悄悄撤退',
  description: `你决定不引人注目，悄悄离开争论现场。回到自己的临时住处，你思考着听到的信息。
  
  争论的核心似乎是关于一个信号——可能与你的装甲有关，以及观察者的活动增加。无论发生什么，你都成了这场风暴的中心。`,
  options: [
    { text: '寻找刘叶商量对策', nextScene: 'chapter1_key_choice' },
    { text: '尝试自行激活装甲系统', nextScene: 'chapter1_key_choice' }
  ]
},

// 39. askLiuYeAdvice
'askLiuYeAdvice': {
  title: '寻求刘叶建议',
  description: `你找到一个安静的时刻，私下向刘叶寻求建议："在这种情况下，你认为我该怎么做？"
  
  刘叶沉思片刻："两边都有道理。探索信号来源可能揭示你的身份，但也会带来风险。无论选择什么，记住，在废土上，知识和生存同样重要。"`,
  options: [
    { text: '决定支持马的研究', nextScene: 'chapter1_key_choice' },
    { text: '采纳刘狗的谨慎态度', nextScene: 'chapter1_key_choice' }
  ]
},

// 40. inquireAboutObservers
'inquireAboutObservers': {
  title: '询问观察者',
  description: `你大步走向争论的人群："能告诉我更多关于这些观察者的事吗？"
  
  房间安静下来，所有目光转向你。马首先开口："他们是天空城派来的特工，收集技术和情报。最近几天，他们特别关注C区，而且自从你出现，他们的活动变得更频繁了。"`,
  options: [
    { text: '询问刘叶的建议', nextScene: 'askLiuYeAdvice' },
    { text: '提议前往C区调查', nextScene: 'chapter1_key_choice' }
  ]
},

// 41. askMaIdentityGuess
'askMaIdentityGuess': {
  title: '马的身份猜测',
  description: `"你认为我可能是谁？"你直接问马。
  
  她犹豫了片刻："根据装甲的技术水平和你展现的技能，你可能是高级研究人员或特种作战单位。装甲的设计模式与天空城有相似之处，但又有独特元素。你可能与某个特殊项目有关。"`,
  options: [
    { text: '询问能否通过装甲恢复记忆', nextScene: 'chapter1_key_choice' },
    { text: '讨论装甲的通讯功能', nextScene: 'chapter1_key_choice' }
  ]
},

// 42. askAttitudeTowardsSkycity
'askAttitudeTowardsSkycity': {
  title: '对天空城的态度',
  description: `"废土居民对天空城有什么看法？"你问道。
  
  阿里耸耸肩："复杂。有人视他们为救世主，等待他们带来技术和解决方案。其他人则视他们为掠夺者，只取不予。真相可能介于两者之间。他们有资源帮助我们，但似乎更关心自己的议程。"`,
  options: [
    { text: '询问如何与天空城接触', nextScene: 'chapter1_key_choice' },
    { text: '问是否有人成功进入天空城', nextScene: 'chapter1_key_choice' }
  ]
},

// 43. offerToHelpDecoding
'offerToHelpDecoding': {
  title: '帮助解码',
  description: `"我愿意帮助解码装甲信号，"你提议，"也许我能想起一些有用的信息。"
  
  马眼中闪过一丝惊喜："真的吗？太好了！我有一些设备可以接入基本诊断系统，但需要小心，不要触发任何防御机制或警报。"`,
  options: [
    { text: '同意让马检查装甲', nextScene: 'nowAllowExamination' },
    { text: '询问可能的通讯目标', nextScene: 'askPossibleCommunicationTargets' }
  ]
},

// 44. suggestEvacuation
'suggestEvacuation': {
  title: '建议撤离',
  description: `"如果观察者真的对我感兴趣，也许我应该离开，不让营地面临危险，"你严肃地说。
  
  阿里摇头："单独在废土上生存几乎不可能，特别是对失忆的人。而且，观察者已经知道这个位置。分散风险更好的方法是组织防御，做好准备。"`,
  options: [
    { text: '同意留下并帮助组织防御', nextScene: 'organizeDefense' },
    { text: '坚持独自离开营地', nextScene: 'chapter1_key_choice' }
  ]
},

// 45. offerToLeave
'offerToLeave': {
  title: '提出离开',
  description: `"也许我应该离开，"你说，"我的存在似乎给营地带来了危险。"
  
  刘叶摇头："在废土上独自生存几乎不可能，特别是在你的情况下。而且，如果观察者真的对你感兴趣，他们会继续追踪。留下来，我们一起面对这个问题。"`,
  options: [
    { text: '同意留下并帮助营地', nextScene: 'chapter1_key_choice' },
    { text: '坚持想要独自面对危险', nextScene: 'chapter1_key_choice' }
  ]
},

// 46. askSafeSettlements
'askSafeSettlements': {
  title: '安全定居点',
  description: `"有哪些相对安全的定居点？"你询问。
  
  阿里点头："旧街区是最大的贸易中心，有基本的秩序。工厂区有劳工营地，条件艰苦但稳定。还有河滨聚落，他们与外界交流较少，但对待陌生人还算友善。不过所有地方都有自己的风险。"`,
  options: [
    { text: '询问前往旧街区的路线', nextScene: 'askRouteToOldStreet' },
    { text: '讨论探索废土的危险', nextScene: 'chapter1_key_choice' }
  ]
},

// 47. askLiuYeRecommendation
'askLiuYeRecommendation': {
  title: '刘叶的建议',
  description: `你接近刘叶："在这种情况下，你认为我应该怎么做？"
  
  刘叶平静地看着你："观察者的兴趣表明你可能比自己想象的更重要。你的选择将影响许多人，不仅是你自己。如果你选择接触观察者，要谨慎；如果选择探索C区，要做好准备。"`,
  options: [
    { text: '决定尝试接触观察者', nextScene: 'chapter1_key_choice' },
    { text: '准备前往C区探索', nextScene: 'chapter1_key_choice' }
  ]
},

// 48. askMemoryRecovery
'askMemoryRecovery': {
  title: '恢复记忆',
  description: `"你认为我能恢复记忆吗？"你问马。
  
  她思考片刻："理论上，如果记忆丧失是由创伤或休眠引起，而不是永久性损伤，有恢复的可能。装甲可能存储了部分记忆或身份数据。另一种可能是寻找与你过去相关的环境触发物，比如C区的设施。"`,
  options: [
    { text: '同意让马尝试提取装甲数据', nextScene: 'chapter1_key_choice' },
    { text: '决定前往C区寻找线索', nextScene: 'chapter1_key_choice' }
  ]
},

// 49. askRouteToOldStreet
'askRouteToOldStreet': {
  title: '前往旧街区',
  description: `"去旧街区的路线是什么？"你询问。
  
  阿里拿出一张粗糙的地图："向东穿过废弃工厂区，沿着干涸的河床走大约一天。旧街区有守卫，交易需要物资或技能。对陌生人警惕，但不算敌对。我可以给你一封介绍信。"`,
  options: [
    { text: '询问天空城与旧街区的关系', nextScene: 'askAttitudeTowardsSkycity' },
    { text: '决定暂时留在营地', nextScene: 'chapter1_key_choice' }
  ]
},
// 第一章关键选择
'chapter1_key_choice': {
  title: '十字路口',
  description: '废土营地陷入危机——秃鹫帮的威胁迫在眉睫，而天庭的观察者似乎也在寻找你。刘爷已经决定带领居民们撤离前往轮椅镇。\n\n此刻，你站在十字路口，必须决定自己的方向。你对这个破碎世界有了初步了解，也隐约感觉到自己与之有着不寻常的联系。\n\n面对未知的前路，你内心的指引是什么？',
  options: [
    { 
      text: '保护营地居民，即使冒险也在所不惜', 
      nextScene: 'martyr_chapter2_start',
      endingScores: { humanity: 0.5 } // 人道路线
    },
    { 
      text: '寻找旧世界的技术，尝试修复这个破碎的世界', 
      nextScene: 'spark_chapter2_start',
      endingScores: { tech: 0.5 } // 火种路线
    },
    { 
      text: '专注于适应环境，在废土上生存并变得强大', 
      nextScene: 'scavenger_chapter2_start',
      endingScores: { survival: 0.5 } // 拾荒者路线
    },
    { 
      text: '探寻天庭的真相，了解你与它的联系', 
      nextScene: 'skycity_chapter2_start',
      endingScores: { skycity: 0.5 } // 天庭路线
    }
  ]
}




//   // 在文件末尾添加关键选择场景
// 'chapter1_key_choice': {
//     title: '关键抉择',
//     description: '你在矿洞营地待了一周，逐渐融入这个临时家园。然而秃鹫的威胁、诡异的回响信号、C区的谜团和天庭的阴影始终笼罩着你。刘爷认为你在这里已经不安全，建议你前往轮椅镇。\n\n面对未知的前路，你必须做出选择。',
//     options: [
//       { 
//         text: '决定保护弱小，即使牺牲自己', 
//         nextScene: 'martyr_chapter2_start',
//         endingScores: { humanity: 0.5 } // 人道路线
//       },
//       { 
//         text: '寻找修复废土的科技手段', 
//         nextScene: 'spark_chapter2_start',
//         endingScores: { tech: 0.5 } // 火种路线
//       },
//       { 
//         text: '专注于适应和在废土上生存', 
//         nextScene: 'scavenger_chapter2_start',
//         endingScores: { survival: 0.5 } // 拾荒者路线
//       },
//       { 
//         text: '寻求与天庭的联系和沟通', 
//         nextScene: 'skycity_chapter2_start',
//         endingScores: { skycity: 0.5 } // 天庭路线
//       }
//     ]
//   }
}
// 导出章节场景
if (typeof module !== 'undefined' && module.exports) {
    module.exports = chapter1Scenes;
  } else {
    window.chapter1Scenes = chapter1Scenes;
  }