// 诊断脚本 - 记录关键DOM元素的状态和样式
(function() {
  function logElementStatus() {
    console.log('=== 元素状态诊断 ===');
    
    // 检查飞心容器
    const heartContainer = document.getElementById('flying-heart-container');
    if (heartContainer) {
      console.log('飞心容器存在');
      console.log('飞心容器样式:', {
        display: getComputedStyle(heartContainer).display,
        position: getComputedStyle(heartContainer).position,
        width: getComputedStyle(heartContainer).width,
        height: getComputedStyle(heartContainer).height,
        zIndex: getComputedStyle(heartContainer).zIndex
      });
    } else {
      console.error('飞心容器不存在!');
    }
    
    // 检查指令模态框
    const instructionModal = document.getElementById('instruction-modal');
    if (instructionModal) {
      console.log('指令模态框存在');
      console.log('指令模态框样式:', {
        display: getComputedStyle(instructionModal).display,
        position: getComputedStyle(instructionModal).position,
        top: getComputedStyle(instructionModal).top,
        left: getComputedStyle(instructionModal).left,
        width: getComputedStyle(instructionModal).width,
        height: getComputedStyle(instructionModal).height,
        zIndex: getComputedStyle(instructionModal).zIndex
      });
      
      // 检查内部div
      const innerDiv = instructionModal.querySelector('div');
      if (innerDiv) {
        console.log('指令模态框内部div样式:', {
          position: getComputedStyle(innerDiv).position,
          top: getComputedStyle(innerDiv).top,
          left: getComputedStyle(innerDiv).left,
          transform: getComputedStyle(innerDiv).transform
        });
      }
    } else {
      console.error('指令模态框不存在!');
    }
  }
  
  // 页面加载后执行检查
  window.addEventListener('load', logElementStatus);
  
  // 暴露全局函数以便在控制台手动调用
  window.debugElements = logElementStatus;
})();