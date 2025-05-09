// 废土求生：共享基础场景

const commonScenes = {
  'start': {
    title: '废土求生',
    description: '你在一场剧烈的头痛中醒来，发现自己身处一个废弃的矿洞中。你穿着一件老旧的"净化服"，胸口编号"R-250"，除此之外你不记得关于自己的任何事情。矿洞外，是一片荒芜的废土世界，辐射与危险无处不在，而你必须在这里求生。',
    skipResourceConsumption: true, // 不消耗资源，因为这是开始场景
    options: [
        { text: '离开矿洞，探索周围', nextScene: 'rustRiver' },
        { text: '检查你的净化服', nextScene: 'checkSuit' },
        { text: '【测试】直接前往殉道者结局', nextScene: 'martyrSacrifice' } // 添加此选项用于测试
      ]
  },
  
  'checkSuit': {
    title: '检查净化服',
    description: '你仔细检查身上穿着的净化服。这套衣物看起来至少有几十年的历史了，但材质依然坚韧，内部系统似乎仍在运作。胸前的标识显示"R-250"，一个小型控制面板显示基本生命体征正常。这套装备可能是你能在废土上生存的关键。',
    skipResourceConsumption: true, // 不消耗资源
    options: [
      { text: '离开矿洞，开始你的旅程', nextScene: 'rustRiver' }
    ]
  },

  'rustRiver': {
    title: '锈河',
    description: '干涸的河床上覆盖着一层红色锈蚀泥浆，散发着刺鼻的化学气味。夜晚，河面会泛起不自然的蓝光，那是辐射反应的迹象。河岸两侧生长着一种奇怪的藤蔓，它们会缓慢移动，试图缠绕靠近的物体。',
    isArea: true,
    options: [
      { text: '收集变异水藻', nextScene: 'collectAlgae', item: '变异水藻燃料' },
      { text: '采集藤蔓纤维', nextScene: 'harvestVines', item: '绳索' },
      { text: '搜索沉没的运输车', nextScene: 'searchTruck', item: '防辐射药' },
      { text: '返回废弃公路', nextScene: 'abandonedHighway' }
    ]
  },
  
  // 添加其他共享场景...
};

// 导出共享场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = commonScenes;
} else {
  window.commonScenes = commonScenes;
}