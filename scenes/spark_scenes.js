// 废土游戏：火种路线关键场景

const sparkScenes = {
  // 第二章：锈河黑途
  'spark_chapter2_start': {
    title: '第二章：锈河黑途',
    description: '你冒险踏上前往轮椅镇的旅程，沿着刘小狗标记的路线穿越有毒的锈河地带。途中你遭遇秃鹫埋伏，惨烈交火中三名同行的矿洞居民被杀，你身负重伤。垂死之际，阿粒意外出现，展现惊人的辐射免疫力，用锈河水冲走追兵。',
    attributeChanges: { health: -2, radiation: 1 }, // 战斗受伤
    options: [
      { 
        text: '抵达轮椅镇，寻求治疗', 
        nextScene: 'spark_chapter2_arrival',
        endingScores: { tech: 0.3 }
      }
    ]
  },

  // 到达轮椅镇
  'spark_chapter2_arrival': {
    title: '轮椅镇',
    description: '伤痕累累的你被驼背的林哥接纳，条件是照顾战争中失去父母的孤儿们。夜里，辐射烧灼伤口的疼痛让你彻夜难眠，却在老式收音机的噪声中捕捉到一段关于"生命保存种子库"的模糊信息，以及自己的真名：亚当。',
    item: '老式收音机',
    options: [
      { 
        text: '进入第三章', 
        nextScene: 'spark_chapter3_start',
        endingScores: { tech: 0.5 }
      }
    ]
  },

  // 第三章：破碎真相
  'spark_chapter3_start': {
    title: '第三章：破碎真相',
    description: '在轮椅镇的日子充满艰辛与挣扎。你白天照顾孤儿，夜晚则忍受辐射烧灼和噩梦折磨。阿粒成为你的眼睛和耳朵，敏锐地感知危险，预知回响信号的出现。\n\n某天，轮椅镇遭遇天庭无人机的无差别攻击，多名居民被杀。你在混乱中保护了孩子们，却眼睁睁看着一个年长者被粒子武器击中化为灰烬。',
    item: 'C区通行证', // 解锁第三章
    options: [
      { 
        text: '击落无人机并寻找情报', 
        nextScene: 'spark_chapter3_battle',
        endingScores: { tech: 0.5 }
      }
    ]
  },

  // 击落无人机
  'spark_chapter3_battle': {
    title: '反击与发现',
    description: '暴怒中，你展现出非凡的战术能力，成功击落一架无人机。在废墟中，你发现了不完整的档案，揭示自己曾是参与"穿越未来"项目的医学研究员，以及C区的某个"种子库"。\n\n当轮椅帮遭受火众的残酷围攻时，林哥在临死前将一把改装手枪和C区地图交给你，用最后的气息透露："回去...找到种子...这是唯一的希望..."',
    item: '改装手枪',
    attributeChanges: { health: -1, sanity: -10 }, // 战斗伤害和目睹死亡
    options: [
      { 
        text: '前往第四章', 
        nextScene: 'spark_chapter4_start',
        endingScores: { tech: 0.5 }
      }
    ]
  },

  // 第四章：C区禁地
  'spark_chapter4_start': {
    title: '第四章：C区禁地',
    description: '带着幸存的三名孤儿和阿粒，你踏上了返回C区的危险之路。一路上，你们目睹了废土的极端残酷——干枯的尸骸、被弃的营地、辐射暴风的无情摧毁。两名孤儿在途中因污染水源而病亡，你强忍悲痛，只身前行。',
    attributeChanges: { sanity: -10, radiation: 1 }, // 精神打击和辐射暴露
    options: [
      { 
        text: '深入C区设施', 
        nextScene: 'spark_chapter4_facility',
        endingScores: { tech: 0.5, humanity: -0.2 } // 牺牲跟随者继续前进
      }
    ]
  },

  // C区设施探索
  'spark_chapter4_facility': {
    title: 'C区内部',
    description: '在C区外围，秃鹫的伏击让最后一名孤儿为保护阿粒而牺牲。进入设施后，你发现了自己的冷冻仓和数十个仍在休眠的"时间旅行者"。主控终端残破不堪，但仍显示这里曾是"生物多样性保存计划"的核心，保存着灾变前最后的种子样本。',
    item: '圣杯病毒', // 获得关键道具
    options: [
      { 
        text: '逃离C区，带着种子和受伤的阿粒', 
        nextScene: 'spark_chapter5_escape',
        endingScores: { tech: 0.5 }
      }
    ]
  },

  // 逃离C区
  'spark_chapter5_escape': {
    title: '险象环生',
    description: '就在你找到密封的种子保存舱时，天庭武装部队突袭C区。阿粒在掩护你撤退时被击中，但她诡异地吸收了能量攻击，暂时阻断了追兵。你带着仅存的几颗"修复种子"和重伤的阿粒艰难撤离，心中的痛苦与决心同时燃烧。',
    attributeChanges: { health: -1, radiation: 1 }, // 逃离过程中受伤
    options: [
      { 
        text: '直接跳至最终章节', 
        nextScene: 'spark_final',
        endingScores: { tech: 1.0 } // 确保走向火种结局
      }
    ]
  },

  // 火种路线最终章节
  'spark_final': {
    title: '绝望边缘',
    description: '经历了废土流浪、最后庇护所的陷落和绝望边缘的挣扎，你最终来到了一片被称为"灰烬平原"的荒地。在这里，你遇到了逃脱天庭的刘爷，但他已经苍老不堪。\n\n在一个隐蔽的洞穴中，你们决定做最后一搏：用阿粒的血液激活种子，尝试在这片毒土上培育出第一批植物。然而，过程中阿粒的状况急剧恶化，刘爷为获取必要设备独自前往附近危险废墟，再也没有回来。',
    attributeChanges: { health: -1, radiation: 1, sanity: -20 }, // 身体和精神双重极限
    options: [
      { 
        text: '独自完成种子培育的最终工作', 
        nextScene: 'spark',
        endingScores: { tech: 1.0 } // 锁定火种结局
      }
    ]
  }
};

// 导出火种场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sparkScenes;
} else {
  window.sparkScenes = sparkScenes;
}