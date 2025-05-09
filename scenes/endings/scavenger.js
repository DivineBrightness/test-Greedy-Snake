// 废土求生：拾荒者结局路径

const scavengerScenes = {
  'scavenger': {
    title: '拾荒者',
    description: '你选择了融入废土生活，接受自己失忆的现实。铁丘营地成了你的新家，与阿粒和刘爷一起，你开始重建这个小小的社区。',
    isEnding: true,
    skipResourceConsumption: true,
    options: [
      { text: '重新开始', nextScene: 'start' }
    ]
  },
  
  'scavengerPath1': {
    title: '新的开始',
    description: '你和阿粒一起在营地边缘开辟了一小块土地，尝试种植一些抗辐射作物。尽管收成微薄，但这是希望的象征。',
    options: [
      { text: '继续尝试', nextScene: 'scavengerPath2' },
      { text: '协助刘爷整理历史记录', nextScene: 'scavengerPath3' }
    ]
  },
  
  // 添加更多拾荒者结局路径场景...
};

// 导出拾荒者结局场景
if (typeof module !== 'undefined' && module.exports) {
  module.exports = scavengerScenes;
} else {
  window.scavengerScenes = scavengerScenes;
}