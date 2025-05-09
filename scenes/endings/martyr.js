// 废土求生：殉道者结局路径

const martyrScenes = {
  // 1. 锈河的邂逅 - 与阿粒的关键相遇
  'martyrPath1': {
    title: '锈河的邂逅',
    description: '你沿着锈河岸边行走，突然看见一个瘦小的身影——一个大约12岁的女孩正在河边收集塑料瓶。她看起来疲惫不堪，但眼神中透露着坚韧。当她注意到你时，立即警惕地后退几步。\n\n"你是谁？"女孩盯着你的净化服问道，"你是天庭的人吗？"',
    attributeChanges: {
      thirst: -1
    },
    options: [
      { text: '分享你的净水给她（获得人性点数）', nextScene: 'martyrPath1_share', humanityChange: 1 },
      { text: '保持距离，询问关于天庭的信息', nextScene: 'martyrPath1_ask' },
      { text: '离开，继续你的旅程', nextScene: 'wasteLands' }
    ]
  },
  
  'martyrPath1_share': {
    title: '善意的分享',
    description: '"给，喝点水吧。"你递出一瓶净水。女孩犹豫了一下，接过水瓶小心地喝了几口，然后立刻还给你。\n\n"谢谢，我叫阿粒。"她的表情柔和了一些，"你不是天庭的人，他们从不下来。你穿的衣服很奇怪，但你看起来不坏。"\n\n阿粒告诉你，如果想知道更多关于这个世界的事，应该去轮椅镇找林哥。林哥是个好人，尽管他有点耳聋。',
    options: [
      { text: '向轮椅镇出发', nextScene: 'martyrPath2' },
      { text: '询问更多关于天庭的信息', nextScene: 'martyrPath1_askMore' }
    ]
  },
  
  'martyrPath1_ask': {
    title: '谨慎的询问',
    description: '"我不是天庭的人，"你回答，"事实上，我刚醒来，对这个世界了解很少。"女孩怀疑地看着你的净化服，但似乎决定你说的是实话。\n\n"我叫阿粒。天庭是...那些住在天上的人，他们有旧世界的科技，但从不关心我们。"她指向天空，但你只看到灰蒙蒙的云层。\n\n"如果你真的是新来的，最好去轮椅镇找林哥，他会告诉你更多。但当心秃鹫，他们专找落单的旅行者下手。"',
    options: [
      { text: '前往轮椅镇', nextScene: 'martyrPath2' },
      { text: '分享你的净水（获得人性点数）', nextScene: 'martyrPath1_lateShare', humanityChange: 1 }
    ]
  },
  
  'martyrPath1_askMore': {
    title: '关于天庭',
    description: '"天庭？"阿粒看向灰蒙蒙的天空，声音变得低沉，"他们住在浮空城里，拥有我们无法想象的技术。偶尔会派无人机下来收集东西，但从不帮助我们。"\n\n她的眼中闪过一丝愤怒，"刘爷说，灾变前，所有人都生活在地面上。是天庭抛弃了我们，让我们在废土中挣扎。"\n\n阿粒建议你去轮椅镇，那里的林哥知道更多关于天庭的事。',
    options: [
      { text: '向轮椅镇出发', nextScene: 'martyrPath2' }
    ]
  },
  
  'martyrPath1_lateShare': {
    title: '迟来的善意',
    description: '你从背包中取出一瓶净水，递给阿粒。她惊讶地看着你，然后小心接过，喝了几口后立即还给你。\n\n"谢谢，在废土上，善意很少见。"她微笑着说，眼中闪烁着感激，"如果你要去轮椅镇，走这条路会安全些。小心那些挂着头骨的标记，那是秃鹫的领地。"',
    options: [
      { text: '按阿粒指引的路径前往轮椅镇', nextScene: 'martyrPath2' }
    ]
  },
  
  // 2. 轮椅镇的盟友
  'martyrPath2': {
    title: '轮椅镇的盟友',
    description: '轮椅镇建在一处低矮的山丘上，围墙由废弃车辆和金属板拼凑而成。入口处，两名身体残疾但手臂格外强壮的守卫警惕地注视着你。\n\n"站住！报上名来！"一名守卫喊道，同时抬起了一把拼装步枪。',
    options: [
      { text: '解释你是阿粒介绍来的，想找林哥', nextScene: 'martyrPath2_mention' },
      { text: '举起双手表示和平，请求进入', nextScene: 'martyrPath2_peaceful' },
      { text: '展示你的净化服，希望博得信任', nextScene: 'martyrPath2_suit' }
    ]
  },
  
  'martyrPath2_mention': {
    title: '提及阿粒',
    description: '"阿粒告诉我可以来这里找林哥，"你解释道，"我是个旅行者，对这个世界了解很少。"\n\n守卫们交换了一个眼神。"阿粒，那个小收集者？"一个守卫说，"她虽小，但眼光不错。林哥在医疗站，但别指望他能听见你——他耳朵不好使。"',
    options: [
      { text: '前往医疗站寻找林哥', nextScene: 'martyrPath2_LinGe' }
    ]
  },
  
  'martyrPath2_peaceful': {
    title: '和平姿态',
    description: '你举起双手表示没有敌意。守卫仍然警惕，但武器稍微放低了一些。\n\n"我是一名旅行者，希望能在镇上休息并获取一些信息。"\n\n"又一个拾荒者，"其中一名守卫嘟囔着，"进去吧，但记住轮椅镇的规矩：不偷窃，不惹事。违规者会被永久驱逐。"',
    options: [
      { text: '进入镇内，询问林哥的下落', nextScene: 'martyrPath2_askAround' }
    ]
  },
  
  'martyrPath2_suit': {
    title: '展示净化服',
    description: '你指向胸前的"R-250"标识，希望这能证明你的身份。守卫们立刻变得警惕起来。\n\n"C区的制服？"一个守卫厉声说道，"你是实验体还是研究员？"\n\n在你能解释之前，另一个声音打断了谈话。"让他进来。"一个驼背男子走近，他的腿部有明显畸形，但上身强壮。"我是林哥。R-250，有趣...跟我来。"',
    options: [
      { text: '跟随林哥进入镇内', nextScene: 'martyrPath2_LinGe' }
    ]
  },
  
  'martyrPath2_askAround': {
    title: '寻找林哥',
    description: '你在轮椅镇内询问林哥的下落。几个镇民指向一栋用集装箱改造的建筑，说那是医疗站，林哥通常在那里。\n\n当你靠近时，看见一个驼背男子正在照顾几个瘦弱的孩子。他似乎没注意到你的存在，直到你站在他面前。',
    options: [
      { text: '打招呼并自我介绍', nextScene: 'martyrPath2_LinGe' }
    ]
  },
  
  'martyrPath2_LinGe': {
    title: '与林哥会面',
    description: '"别管他们的警惕，"林哥一边收拾医疗用品一边说，声音比必要的大许多，"在废土上，信任是奢侈品。"\n\n他转向你，仔细观察着你的净化服。"C区的制服，我见过几次。那些从C区出来的人，要么是疯子，要么带着秘密。你是哪一种？"\n\n当你试图解释你失忆的情况时，林哥点点头，似乎不感到意外。"失忆？有可能。辐射、创伤或C区的实验都能造成这种情况。你想知道真相？去粮站，那里有线索...但要当心火众，他们控制着粮站。"',
    options: [
      { text: '询问前往粮站的路线', nextScene: 'martyrPath3', item: '基础医疗包' },
      { text: '询问更多关于C区的信息', nextScene: 'martyrPath2_askCArea' }
    ]
  },
  
  'martyrPath2_askCArea': {
    title: 'C区的秘密',
    description: '"C区？"林哥压低声音，尽管医疗站内只有你们两人，"那是旧世界的实验基地，围着个巨大的圆墙。灾变前用来做人体实验，听说和\'时间旅行\'有关系。"\n\n他递给你一个小包，里面装着简易医疗用品。"拿着，路上会用到。去粮站吧，那里有个叫小马的家伙，痴迷于旧世界科技，他能帮你找到更多关于C区的信息。但要小心火众教徒，他们控制着粮站，对陌生人不友好。"',
    options: [
      { text: '谢过林哥，准备前往粮站', nextScene: 'martyrPath3', item: '基础医疗包' }
    ]
  },
  'martyrSacrifice': {
    title: '殉道者的牺牲',
    description: '你站在天庭浮空城的核心控制室中央，手中握着"圣杯"——那个能摧毁天庭防护系统的超级病毒装置。四周是闪烁的全息屏幕，显示着废土各区域的监控画面。\n\n"你真的要这么做吗？"天庭观察者的机械声音在房间内回响，"你知道启动它意味着什么。你将无法离开这里。"\n\n透过控制室的巨大窗户，你可以看到远处锈河、轮椅镇和所有你经过的地方。那里的人们——阿粒、林哥、小马和其他许多人——还在挣扎求生，不知道他们的命运即将因你的决定而改变。\n\n你的记忆碎片已经拼凑完整。你曾是灾变前的志愿者，选择冷冻自己去往未来。但天庭背叛了最初的理想，将地面居民抛弃在废土中。',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '毫不犹豫地激活"圣杯"，牺牲自己', nextScene: 'martyrEnding' },
      { text: '放弃计划，寻找其他解决方案', nextScene: 'martyrFail' }
    ]
  },
  
  'martyrEnding': {
    title: '殉道者结局',
    description: '你果断地按下装置上的激活按钮。"圣杯"发出柔和的蓝光，随后在你手中展开，释放出无数数据流，开始侵蚀天庭的防护系统。\n\n"为什么？"天庭观察者的声音开始失真，"我们本可以一起统治这个世界..."\n\n警报声响起，控制室的天花板开始坍塌。通过监控画面，你看到天庭的无人机和防御系统纷纷失效，从天空坠落。浮空城开始缓慢下降，但没有崩溃——它将安全着陆，成为废土居民新的希望。\n\n你知道自己无法离开。病毒装置与你的净化服连接，需要你的生命维持系统提供能量。随着系统崩溃，你的视线开始模糊。\n\n你想起阿粒的笑容，林哥递给你的医疗包，小马对科技的热情...一种平静的满足感笼罩了你。你可能永远不会知道自己的牺牲将如何改变废土，但你相信你做出了正确的选择。\n\n废土将迎来新的开始，而你的名字将被铭记。',
    endingId: 'martyr',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '返回开始画面', nextScene: 'start', restart: true }
    ]
  },
  
  'martyrFail': {
    title: '迟疑的代价',
    description: '你的手在"圣杯"上方犹豫不决。这个决定太重大了，牺牲自己真的是唯一的出路吗？\n\n就在你思考的片刻，警报声突然响起。"入侵者警报！核心区域安全受到威胁！"一个冰冷的机械声音宣布。\n\n数个天庭守卫者涌入控制室，你被迅速制服。"圣杯"从你手中滑落，被天庭观察者小心地捡起。\n\n"一个有趣的选择，R-250。"观察者冰冷地说，"你本可以成为英雄，但现在只能成为我们的另一个实验体。"\n\n当你被拖向实验室时，透过窗户，你最后看了一眼下方的废土。你知道你失去了唯一的机会，而天庭将继续它的统治。\n\n有时，犹豫就是最大的错误。',
    endingId: 'captured',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '返回开始画面', nextScene: 'start', restart: true }
    ]
  },
  
  // 添加更多殉道者结局路径场景...
};

// 导出殉道者结局场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = martyrScenes;
} else {
  window.martyrScenes = martyrScenes;
}