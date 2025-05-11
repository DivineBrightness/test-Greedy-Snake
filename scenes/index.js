// 废土游戏场景加载器

// 全局场景对象
window.wastelandScenes = {};

// 加载所有场景
function loadAllScenes() {
  try {
    // 清空现有场景
    window.wastelandScenes = {};

    // 加载共享基础场景
    if (window.commonScenes) {
      Object.assign(window.wastelandScenes, window.commonScenes);
    }

    // 加载各章节场景
    if (window.chapter1Scenes) {
      Object.assign(window.wastelandScenes, window.chapter1Scenes);
    }
    if (window.chapter2Scenes) {
      Object.assign(window.wastelandScenes, window.chapter2Scenes);
    }
    if (window.chapter3Scenes) {
      Object.assign(window.wastelandScenes, window.chapter3Scenes);
    }
    if (window.chapter4Scenes) {
      Object.assign(window.wastelandScenes, window.chapter4Scenes);
    }

    // 加载结局场景
    if (window.endingScenes) {
      Object.assign(window.wastelandScenes, window.endingScenes);
    }

    // 加载分支剧情场景
    if (window.martyrScenes) {
      Object.assign(window.wastelandScenes, window.martyrScenes);
    }
    if (window.scavengerScenes) {
      Object.assign(window.wastelandScenes, window.scavengerScenes);
    }
    if (window.skycityScenes) {
      Object.assign(window.wastelandScenes, window.skycityScenes);
    }
    if (window.sparkScenes) {
      Object.assign(window.wastelandScenes, window.sparkScenes);
    }

    console.log('所有场景加载完成:', Object.keys(window.wastelandScenes).length);
    return window.wastelandScenes;
  } catch (error) {
    console.error('加载场景时出错:', error);
    return {};
  }
}

// 加载物品描述数据
function loadItemDescriptions() {
  // 物品描述数据库也可以拆分到单独的文件中
  window.itemDescriptions = window.itemDescriptions || {
    // 保留既有物品描述
  };
}

// 初始化加载
document.addEventListener('DOMContentLoaded', () => {
  loadAllScenes();
  loadItemDescriptions();
  console.log('废土场景数据加载完成');
});

// 导出加载函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadAllScenes };
} else {
  window.loadAllScenes = loadAllScenes;
}