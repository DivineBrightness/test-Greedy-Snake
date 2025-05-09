// 废土求生：场景加载器

// 合并所有场景
function loadAllScenes() {
  // 创建合并对象
  const wastelandScenes = {};
  
  // 合并基础场景
  Object.assign(wastelandScenes, window.commonScenes || {});
  
  // 合并结局场景
  Object.assign(wastelandScenes, window.scavengerScenes || {});
  Object.assign(wastelandScenes, window.martyrScenes || {});
  Object.assign(wastelandScenes, window.sparkScenes || {});
  Object.assign(wastelandScenes, window.skycityScenes || {});
  
  // 导出到全局
  window.wastelandScenes = wastelandScenes;
  console.log(`已加载 ${Object.keys(wastelandScenes).length} 个场景`);
  
  return wastelandScenes;
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

// 导出模块（如果在Node.js环境中）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadAllScenes, loadItemDescriptions };
}