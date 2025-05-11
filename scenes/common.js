// 废土求生：共享基础场景
// 废土求生：共享基础场景
const commonScenes = {
  'start': {
    title: '废土求生',
    description: '你在一场剧烈的头痛中醒来，发现自己身处一个废弃的矿洞中。你穿着一件老旧的"净化服"，胸口编号"R-250"，除此之外你不记得关于自己的任何事情。矿洞外，是一片荒芜的废土世界，辐射与危险无处不在。',
    skipResourceConsumption: true,
    options: [
      { text: '离开矿洞，探索周围', nextScene: 'wasteLands' },
      { text: '检查你的净化服', nextScene: 'checkSuit' },
      // 为了测试，添加直接进入不同章节的选项
      { text: '【测试】直接进入第二章', nextScene: 'chapter2Start' },
      { text: '【测试】直接进入第三章', nextScene: 'chapter3Start' },
      { text: '【测试】直接进入第四章', nextScene: 'chapter4Start' }
    ]
  },

  // 典型的三选一分支示例（针对结局评分系统）
  'criticalChoice1': {
    title: '岔路口',
    description: '你来到一个三岔路口。左边通往一个被困的小孩，中间是废弃实验室，右边是一个可以获取物资的营地。你只能选择一条路。',
    options: [
      { 
        text: '去救被困的小孩', 
        nextScene: 'rescueChild',
        endingScores: { humanity: 1, survival: -1 } // 增加人道分数
      },
      { 
        text: '探索废弃实验室', 
        nextScene: 'exploreLabiratory',
        endingScores: { tech: 1, skycity: 0.5 } // 增加技术和天庭分数
      },
      { 
        text: '前往资源丰富的营地', 
        nextScene: 'resourceCamp',
        endingScores: { survival: 1, humanity: -0.5 } // 增加生存分数
      }
    ]
  },
  
  // 章节开始示例
  'chapter2Start': {
    title: '第二章：信号寻踪',
    description: '你成功修复了老式收音机，捕捉到了一段神秘的信号。信号来源于废土的更深处，或许那里有关于你身世的线索。前路危机重重，但真相正在召唤你。',
    skipResourceConsumption: true,
    item: 'C区通行证', // 直接给予下一章关键道具（仅用于测试）
    options: [
      { text: '继续探索', nextScene: 'chapter2_scene1' }
    ]
  },
  
  'chapter3Start': {
    title: '第三章：真相揭示',
    description: '你终于获得了进入C区的权限。这个被高墙围绕的神秘区域可能隐藏着关于天庭与废土的关系的秘密。',
    skipResourceConsumption: true,
    item: '圣杯病毒', // 直接给予下一章关键道具（仅用于测试）
    options: [
      { text: '继续探索', nextScene: 'chapter3_scene1' }
    ]
  },
  
  'chapter4Start': {
    title: '第四章：终极抉择',
    description: '你手中握着"圣杯"，这个强大的病毒可以摧毁天庭的系统。现在，你必须决定废土的未来。',
    skipResourceConsumption: true,
    options: [
      { text: '继续最后的旅程', nextScene: 'chapter4_scene1' }
    ]
  }
};

// 导出共享场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = commonScenes;
} else {
  window.commonScenes = commonScenes;
}