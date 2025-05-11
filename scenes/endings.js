// 废土游戏：结局场景

const endingScenes = {
  // 殉道者结局
  'martyr': {
    title: '殉道者结局',
    description: '亚当为保护阿粒和刚赶到的小队成员，身受致命伤。临死前，他看到小马成功获取了基因修复技术的控制权，而刘爷已开始唤醒其他时间旅行者。几周后，随着三派势力平衡被打破，人道派在巴特和小马的领导下得到更多话语权，方舟开始缓慢下降，准备与地面建立新的联系。废土上，阿粒站在矿洞营地外，手捧一株在锈河边采集的绿芽——第一批被修复的植物，亚当的牺牲为废土带来了新生的希望。',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '结束旅程', nextScene: 'restart' }
    ]
  },

  // 火种结局
  'spark': {
    title: '火种结局',
    description: '搜寻队在洞穴中发现了亚当的尸体，他紧握着一本手记和一袋种子，脸上带着平静的表情。手记的最后一页写道："我来自过去，却无法回归。我失去了所有人，却找到了比记忆更重要的东西。这些种子是我能留给这个世界的唯一礼物。它们会缓慢地、但不可阻挡地修复这片废土。"\n\n几年后，从太空俯视地球，可以清晰地看到一小片绿色正从曾经的洞穴位置向四周扩散，像一团微小但坚韧的火焰，在灰黑色的废土上顽强燃烧。',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '结束旅程', nextScene: 'restart' }
    ]
  },

  // 拾荒者结局
  'scavenger': {
    title: '拾荒者结局',
    description: '铁丘已发展成为废土上一个小型但充满活力的社区。阿粒不再是那个瘦小的女孩，而成长为铁丘的"植物守护者"，负责照料营地周围逐渐扩大的绿地。在一个特别的日子里，亚当和刘爷带领营地的孩子们，在锈河附近的一片净化土地上种下了第一片农田。\n\n那天晚上，篝火旁，亚当望着远方天空若隐若现的天庭浮空城，不再感到困惑或渴望。他的记忆或许永远不会完全恢复，但他发现自己不再在意。在废土上，他找到了比过去更有价值的东西——一个能称之为家的地方，和一群愿意共同创造未来的人。',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '结束旅程', nextScene: 'restart' }
    ]
  },

  // 天庭结局
  'skycity': {
    title: '天庭结局',
    description: '亚当成为了连接天地的使者，开启了天梯计划，让第一批废土居民参观天庭，同时派遣天庭技术队伍修复地面环境。阿粒被发现是早期实验的产物，体内携带着适应未来地球的关键基因，成为天地基因融合计划的核心。刘爷在铁丘建立了第一所天地共管学校，小马则带领团队研发新型环境修复设备。\n\n亚当站在天庭与地面之间的"天梯"中央平台上，一边是天庭的科技奇迹，一边是渐显绿意的废土。他微笑着看着小马和天庭科学家们合作研发新技术，看着阿粒教导天庭孩童如何在废土中辨别可食用植物，看着刘爷和刘小狗记录着这个新时代的故事。',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '结束旅程', nextScene: 'restart' }
    ]
  },

  // 通用死亡结局
  'death': {
    title: '死亡结局',
    description: '你的生命值降至零。在废土的残酷环境中，没有医疗设备，没有急救站，你的旅程就此终结。又一个无名的灵魂消逝在这片荒芜之地...',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '重新开始', nextScene: 'restart' }
    ]
  },

  // 通用绝望结局
  'despair': {
    title: '绝望结局',
    description: '随着精神状态不断恶化，你逐渐失去了对现实的感知。幻觉与噩梦交织，废土的残酷与内心的折磨最终击垮了你。在一个风雨交加的夜晚，你独自离开了营地，走向无人区域，再也没有回来...',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '重新开始', nextScene: 'restart' }
    ]
  },
  
  'restart': {
    title: '重新开始',
    description: '你的旅程已经结束。是否要重新开始？',
    skipResourceConsumption: true,
    options: [
      { text: '重新开始', nextScene: 'awakening' }
    ]
  }
};

// 导出结局场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = endingScenes;
} else {
  window.endingScenes = endingScenes;
}