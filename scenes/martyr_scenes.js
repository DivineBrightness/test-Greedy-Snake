// 废土游戏：殉道者路线关键场景

const martyrScenes = {
  // 第二章：锈河之旅 - 殉道者路线入口
  'martyr_chapter2_start': {
    title: '第二章：锈河之旅',
    description: '你按计划踏上前往轮椅镇的旅程，沿着刘小狗标记的隐蔽路线穿越锈河地带。经过一整天的跋涉，你发现自己被秃鹫帮埋伏包围了。黄昏的废土上，巴特似乎早已预料到你会走这条路...',
    item: '刘小狗的地图',
    options: [
      { 
        text: '寻找战略撤退路线', 
        nextScene: 'martyr_chapter2_ali_appears',
        endingScores: { humanity: 0.2 }
      }
    ]
  },

  // 阿粒出现
  'martyr_chapter2_ali_appears': {
    title: '意外救援',
    description: '危急时刻，一个小身影悄然现身——阿粒竟然一直跟踪你。更令人惊讶的是，她展现出对辐射的奇异免疫力，能徒手接触锈河水而毫发无损。在她的帮助下，你成功甩开了追兵，抵达了轮椅镇。',
    attributeChanges: { health: -1, radiation: 1 }, // 遭遇战斗受伤
    options: [
      { 
        text: '向林哥传达刘爷的口信', 
        nextScene: 'martyr_chapter2_wheelchairTown',
        endingScores: { humanity: 0.3 }
      }
    ]
  },

  // 轮椅镇
  'martyr_chapter2_wheelchairTown': {
    title: '轮椅镇',
    description: '驼背的林哥审视了你很久，最终接受了刘爷的口信。你获准在轮椅镇暂住，条件是协助照顾镇上几个孤儿。令你意外的是，阿粒坚决拒绝返回矿洞，声称她"看到了梦中的路标"，一定要跟随你。\n\n夜晚，当你守在孤儿们的床边时，镇上的老式收音机突然自动启动，播放出一段模糊的旧世界信号，触发了你的第一个强烈记忆碎片——一个实验室和自己曾用的名字：亚当。',
    item: '老式收音机',
    attributeChanges: { sanity: -10 }, // 记忆冲击导致精神波动
    options: [
      { 
        text: '继续前往第三章', 
        nextScene: 'martyr_chapter3_start',
        endingScores: { humanity: 0.5 }
      }
    ]
  },

  // 第三章：记忆的碎片
  'martyr_chapter3_start': {
    title: '第三章：记忆的碎片',
    description: '在轮椅镇的日子里，亚当(你)协助林哥守护孤儿，同时利用镇上的老式收音机系统性捕捉回响信号。阿粒展现出惊人的第六感，能预知信号出现的时间。通过一系列信号和梦境，你逐渐拼凑出自己的身份——曾是一名医学研究员，志愿参与"穿越未来"项目。',
    item: 'C区通行证', // 解锁第三章
    options: [
      { 
        text: '保护镇民抵抗天庭士兵', 
        nextScene: 'martyr_chapter3_battle',
        endingScores: { humanity: 0.5 }
      }
    ]
  },

  // 战斗场景
  'martyr_chapter3_battle': {
    title: '轮椅镇之战',
    description: '轮椅镇突然遭受来自天庭战争派的武装压迫。他们派出经过身体强化的士兵搜寻"古代遗物"，并试图控制当地帮派。当他们发现你的存在后，立即对轮椅镇发动袭击。\n\n面对配备有纳米切割刀和轻型粒子武器的天庭士兵，你意外地展现出战术素养，帮助轮椅镇击退了入侵者。然而，许多平民在战斗中失去了生命，你的内心被愤怒和悲痛充斥。',
    attributeChanges: { health: -2, sanity: -20 }, // 战斗和目睹死亡的影响
    options: [
      { 
        text: '接受林哥的武器和C区地图', 
        nextScene: 'martyr_chapter3_prepare_czone',
        endingScores: { humanity: 0.5 }
      }
    ]
  },

  // 准备前往C区
  'martyr_chapter3_prepare_czone': {
    title: '离别与准备',
    description: '林哥在你准备离开前，给了你一把改装手枪和一张C区详细地图，并透露自己曾是天庭人道派的一员——他选择离开天庭，生活在地面，是为数不多放弃不老不死而选择与废土居民共存的人。\n\n"亚当，"他虚弱地说，"无论你找到什么，记住，真正的不朽不是永生，而是为他人而活。"',
    item: '改装手枪',
    options: [
      { 
        text: '踏上前往C区的旅程', 
        nextScene: 'martyr_chapter4_start',
        endingScores: { humanity: 0.5 }
      }
    ]
  },

  // 第四章：C区真相
  'martyr_chapter4_start': {
    title: '第四章：C区真相',
    description: '你与阿粒踏上返回C区的危险旅程，沿途躲避天庭研究派的无人机监控和电磁暴。净化服在阿粒意外触碰下激活了隐藏功能，指引你们找到C区的隐蔽入口。\n\n在深入地下设施后，你发现了自己曾经被冷冻的仓室，以及数十个仍在休眠的"时间旅行者"。',
    attributeChanges: { radiation: 1 }, // 旅途中受到辐射
    options: [
      { 
        text: '激活损坏的主控终端', 
        nextScene: 'martyr_chapter4_discovery',
        endingScores: { humanity: 0.5, tech: 0.2 }
      }
    ]
  },

  // C区真相揭示
  'martyr_chapter4_discovery': {
    title: '身份揭露',
    description: '通过激活损坏的主控终端，你确认了自己的完整身份：一名志愿加入"穿越未来"项目的医学研究员，原定于2121年苏醒，但实际休眠了接近1800年。\n\n更惊人的是，主控终端记录显示，所谓的"天庭"其实是灾变前建造的备用方舟，原计划在地球环境恢复后返回地面。但方舟被一群早期发现它的人占据，他们断绝了与地面的联系，自称"天庭"，实现了不老不死的技术，放弃了与地面共享科技的原始使命。',
    item: '圣杯病毒', // 获得关键道具
    options: [
      { 
        text: '逃离C区前往老市', 
        nextScene: 'martyr_chapter5_escape',
        endingScores: { humanity: 0.5 }
      }
    ]
  },

  // 逃离C区
  'martyr_chapter5_escape': {
    title: '紧急撤离',
    description: '就在你们准备下载更多数据时，天庭研究派的探测器闯入C区。你与阿粒狭窄脱身，但带走了一个关键信息：方舟核心有一套"基因修复系统"——可以逆转"永恒作物"对生态造成的伤害。\n\n这可能是拯救废土的唯一希望，但你也知道天庭战争派绝不会轻易放弃他们的权力和资源。一场直面天庭的战争已经不可避免。',
    attributeChanges: { health: -1, radiation: 1 }, // 逃离过程中受伤
    options: [
      { 
        text: '直接跳至最终章节', 
        nextScene: 'martyr_final',
        endingScores: { humanity: 1.0 } // 确保走向殉道者结局
      }
    ]
  },

  // 殉道者路线最终章节
  'martyr_final': {
    title: '第八章：殉道者之路',
    description: '经历了老市的阴谋、最高政府的秘密和天庭之路的艰辛，你终于来到了决战时刻。你成功潜入天庭，面对戈登博士展示的"新伊甸计划"和战争派的野心。\n\n在关键时刻，你启动了特殊病毒，阿粒意外现身，两人配合瓦解了天庭防御系统，让地面反抗军得以进入。然而，在最终战役中，为保护阿粒和刚赶到的队友，你不得不作出终极牺牲。',
    attributeChanges: { health: -3 }, // 濒临死亡
    options: [
      { 
        text: '接受你的命运', 
        nextScene: 'martyr',
        endingScores: { humanity: 1.0 } // 锁定殉道者结局
      }
    ]
  }
};

// 导出殉道者场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = martyrScenes;
} else {
  window.martyrScenes = martyrScenes;
}