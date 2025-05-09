// 废土求生：殉道者结局路径

const martyrScenes = {
  'martyr': {
    title: '殉道者',
    description: '你做出了最终的牺牲，使用"最强兵器"摧毁了天庭的"天梯"防护网。随着系统崩溃，天庭的统治终于结束，废土的人们有了新的希望。尽管你无法亲眼见证这一切，但你的名字将被铭记。',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '重新开始', nextScene: 'start' }
    ]
  },
  
  'martyrPath1': {
    title: '最终抉择',
    description: '你站在控制室前，手里握着"圣杯"——一种能够摧毁天庭防护系统的超级病毒。启动它意味着你将无法逃离爆炸范围。',
    options: [
      { text: '毫不犹豫地启动系统', nextScene: 'martyr' },
      { text: '寻找另一种方式', nextScene: 'martyrPath2' }
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