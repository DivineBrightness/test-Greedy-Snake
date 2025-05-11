// 废土游戏：拾荒者路线关键场景

const scavengerScenes = {
  // 第二章：锈河之旅 - 拾荒者路线入口
  'scavenger_chapter2_start': {
    title: '第二章：锈河之旅',
    description: '你按计划踏上前往轮椅镇的旅程，沿着刘小狗标记的隐蔽路线穿越锈河地带。途中，你遭遇秃鹫的埋伏，巴特似乎早已预料到你的路线。危急时刻，阿粒意外现身相助，展现出对辐射的奇异免疫力。',
    options: [
      { 
        text: '抵达轮椅镇', 
        nextScene: 'scavenger_chapter2_town',
        endingScores: { survival: 0.3 }
      }
    ]
  },

  // 轮椅镇
  'scavenger_chapter2_town': {
    title: '轮椅镇',
    description: '到达轮椅镇后，你向林哥传达刘爷的口信，获准暂住并协助照顾镇上孤儿。夜晚，一段回响信号触发了你的第一个记忆碎片——实验室和名字：亚当。但对于你来说，这些记忆似乎只是过去的幻影，并不比当下的生活更重要。',
    item: '老式收音机',
    options: [
      { 
        text: '开始在轮椅镇建立新生活', 
        nextScene: 'scavenger_chapter3_start',
        endingScores: { survival: 0.5 }
      }
    ]
  },

  // 第三章：安居之所
  'scavenger_chapter3_start': {
    title: '第三章：安居之所',
    description: '在轮椅镇的日子平静而充实，你帮助照顾孤儿们，修缮破损的设施，用你那不知从何而来的医学知识治疗伤病。阿粒成了你的小助手，两人之间建立起深厚的信任。\n\n随着时间推移，你发现自己越来越少地沉迷于过去，反而珍视眼前的每一刻。林哥观察到这一变化，向你讲述了自己选择简单生活的故事："有时候，小R，过去不重要，重要的是你现在做的事情。"',
    item: 'C区通行证', // 解锁第三章但选择不去
    options: [
      { 
        text: '得知矿洞营地遭遇袭击', 
        nextScene: 'scavenger_chapter3_news',
        endingScores: { survival: 0.5 }
      }
    ]
  },

  // 矿洞遇袭的消息
  'scavenger_chapter3_news': {
    title: '不幸的消息',
    description: '当消息传来秃鹫和火众联手袭击了刘爷的矿洞营地时，你决定回去帮助老友。离开前，林哥给了你一张铁丘地区的地图，说那里可能会是更安全的栖身之所。',
    options: [
      { 
        text: '启程返回矿洞', 
        nextScene: 'scavenger_chapter4_start',
        endingScores: { survival: 0.5, humanity: 0.2 }
      }
    ]
  },

  // 第四章：归途与选择
  'scavenger_chapter4_start': {
    title: '第四章：归途与选择',
    description: '你和阿粒启程返回矿洞，途中借助阿粒的特异能力躲过天庭的巡逻无人机。抵达矿洞后，你们发现营地被严重破坏，但大多数居民在刘爷的带领下撤退到了安全地带。\n\n重聚后，刘爷告诉你，小马在秃鹫的突袭中截获了一个天庭的通讯器，捕捉到了关于"时间旅行者"和C区的片段信息。',
    attributeChanges: { health: -1, radiation: 1 }, // 旅途中受伤
    options: [
      { 
        text: '面对深入C区的诱惑', 
        nextScene: 'scavenger_chapter4_decision',
        endingScores: { survival: 0.5 }
      }
    ]
  },

  // 重要抉择
  'scavenger_chapter4_decision': {
    title: '人生抉择',
    description: '面对深入C区寻找真相的诱惑，你陷入了沉思。那晚，看到疲惫但仍坚强照顾伤者的刘爷，以及依偎在火堆旁讲故事安慰孩子们的阿粒，你做出了选择——这里的人需要你，比起追寻可能永远无法完整的过去，帮助这些人生存下去更有意义。',
    options: [
      { 
        text: '决定放弃C区，带领大家前往铁丘', 
        nextScene: 'scavenger_chapter5_start',
        endingScores: { survival: 0.8 } // 明确选择生存路线
      }
    ]
  },

  // 第五章：铁丘新家
  'scavenger_chapter5_start': {
    title: '第五章：铁丘新家',
    description: '放弃探索C区的计划后，你、刘爷和营地的幸存者们决定迁往铁丘——锈河支流附近的一座小山丘，因山体中丰富的铁矿石而被称为"铁丘"。\n\n在那里，你发挥自己的医学和工程技能，帮助建立起一个新的小型聚居地。小马利用从秃鹫那里夺来的零件，在你的净化服上做了改装，将其变成可拆卸的便携式医疗设备。',
    options: [
      { 
        text: '直接跳至最终章', 
        nextScene: 'scavenger_final',
        endingScores: { survival: 1.0 } // 确保拾荒者结局
      }
    ]
  },

  // 拾荒者路线最终章
  'scavenger_final': {
    title: '拾荒者的春天',
    description: '两年后，铁丘已发展成为废土上一个小型但充满活力的社区。阿粒不再是那个瘦小的女孩，而成长为铁丘的"植物守护者"，负责照料营地周围逐渐扩大的绿地。\n\n在一个特别的日子里，你和刘爷带领营地的孩子们，在锈河附近的一片净化土地上种下了第一片农田。当绿芽从土壤中钻出时，阿粒兴奋地喊着所有人来看。刘爷感慨道："或许这就是你真正的使命，小R。不是穿越时间寻找答案，而是让这片土地再次充满生机。"',
    options: [
      { 
        text: '接受你的新身份和家园', 
        nextScene: 'scavenger',
        endingScores: { survival: 1.0 } // 锁定拾荒者结局
      }
    ]
  }
};

// 导出拾荒者场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = scavengerScenes;
} else {
  window.scavengerScenes = scavengerScenes;
}