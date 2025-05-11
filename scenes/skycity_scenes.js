// 废土游戏：天庭路线关键场景

const skycityScenes = {
  // 第二章：锈河交锋 - 天庭路线入口
  'skycity_chapter2_start': {
    title: '第二章：锈河交锋',
    description: '你踏上前往轮椅镇的旅程，沿刘小狗标记的隐蔽路线穿越锈河地带。途中遭遇秃鹫伏击，陷入绝境。危急时刻，你展示出异常的战术意识，利用锈河湍急的水流和毒性迷雾，巧妙转危为安。',
    attributeChanges: { health: -1 }, // 战斗轻伤
    options: [
      { 
        text: '缴获天庭通讯器', 
        nextScene: 'skycity_chapter2_device',
        endingScores: { skycity: 0.3 }
      }
    ]
  },

  // 获得通讯器
  'skycity_chapter2_device': {
    title: '神秘装置',
    description: '在混战中，阿粒不顾危险跟随而来。在她帮助下，你不仅击退追兵，还缴获了一个天庭通讯器。抵达轮椅镇后，你被驼背的林哥接纳，条件是维修镇上陈旧的防御系统。夜晚，你在接触老式收音机时，触发了一段关键记忆：自己名为亚当·麦尔斯，曾是一名军方合作的科技专家，参与了"穿越未来"计划的核心设计。',
    item: '老式收音机',
    options: [
      { 
        text: '进入第三章', 
        nextScene: 'skycity_chapter3_start',
        endingScores: { skycity: 0.5 }
      }
    ]
  },

  // 第三章：潜藏天才
  'skycity_chapter3_start': {
    title: '第三章：潜藏天才',
    description: '在轮椅镇，你迅速展露才华，重新编程了防御系统，使其性能提升三倍。林哥震惊于你对古代技术的理解深度，透露自己曾是天庭人道派成员，放弃了永生选择了地面。\n\n与此同时，你通过收集回响信号，系统性地恢复记忆，发现自己不仅是医学研究员，还精通网络安全与系统入侵。',
    item: 'C区通行证',
    options: [
      { 
        text: '面对天庭袭击', 
        nextScene: 'skycity_chapter3_attack',
        endingScores: { skycity: 0.5 }
      }
    ]
  },

  // 天庭袭击
  'skycity_chapter3_attack': {
    title: '展现才能',
    description: '某天，天庭战争派突袭轮椅镇，你凭借惊人的反应力和对天庭武器的了解，不仅保护了镇民，还黑进了一台无人战甲的系统，反控它攻击其他入侵者。林哥意识到你可能是打开天庭大门的关键，给了你一把特殊钥匙和通往C区的详细路线，嘱咐你找回自己全部的记忆。',
    attributeChanges: { sanity: -5 }, // 战斗造成精神压力
    options: [
      { 
        text: '前往C区寻找更多答案', 
        nextScene: 'skycity_chapter4_start',
        endingScores: { skycity: 0.5, tech: 0.2 }
      }
    ]
  },

  // 第四章：C区觉醒
  'skycity_chapter4_start': {
    title: '第四章：C区觉醒',
    description: '你与阿粒潜入C区，展示出非凡的入侵技能，轻松绕过安保系统。在地下设施深处，你们发现了数十个未醒的"时间旅行者"，以及完整的主控终端。',
    options: [
      { 
        text: '接入系统，恢复全部记忆', 
        nextScene: 'skycity_chapter4_memory',
        endingScores: { skycity: 0.5, tech: 0.2 }
      }
    ]
  },

  // 记忆恢复
  'skycity_chapter4_memory': {
    title: '身份揭示',
    description: '你迅速接入系统，恢复了全部记忆——你实际是"穿越未来"计划的首席安全官，负责设计整个系统的防御协议。通过终端，你获取了震惊的信息：天上的"诺亚方舟"是人类最后的希望，内含可以完全修复地球生态的技术，而你手中的净化服实际上是登入方舟核心系统的唯一钥匙。',
    item: '圣杯病毒',
    options: [
      { 
        text: '面对天庭追兵', 
        nextScene: 'skycity_chapter4_escape',
        endingScores: { skycity: 0.5 }
      }
    ]
  },

  // 逃离C区
  'skycity_chapter4_escape': {
    title: '巧妙脱身',
    description: '就在下载完所有资料的瞬间，天庭研究派部队突袭。你不慌不忙，启动了自己埋设的后门程序，让整个设施陷入锁定，为你和阿粒制造了完美脱身机会。你们带着关键信息成功逃离，准备制定进入天庭的计划。',
    options: [
      { 
        text: '直接跳至最终章', 
        nextScene: 'skycity_final',
        endingScores: { skycity: 1.0 } // 确保天庭结局
      }
    ]
  },

  // 天庭路线最终章
  'skycity_final': {
    title: '天地融合',
    description: '经历了战略布局、最高棋局和飞天行动，你终于成功潜入天庭核心，目睹了这座辉煌而冰冷的空中城邦。这里的人们拥有不老不死的身体，却失去了生活的激情和创造力。\n\n在三派会议上，你展示了从C区带来的完整数据，揭示了一个所有人都不知道的真相：诺亚方舟实际上是设计来与地面互补的，没有地面的资源和人类的多样性，方舟最终将走向退化和灭亡。\n\n你没有选择毁灭任何一方，而是创造性地提出了天地融合计划：利用诺亚方舟的技术逐步修复地面生态，同时让天庭与地面建立永久连接，互通有无，共同进化。',
    options: [
      { 
        text: '见证天地融合', 
        nextScene: 'skycity',
        endingScores: { skycity: 1.0 } // 锁定天庭结局
      }
    ]
  }
};

// 导出天庭场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = skycityScenes;
} else {
  window.skycityScenes = skycityScenes;
}