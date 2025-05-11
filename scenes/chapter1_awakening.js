// 废土求生：第一章场景 - 废土苏醒

const chapter1Scenes = {
  // 初始场景 - 主角醒来
  'awakening': {
    title: '废土苏醒',
    description: '剧烈的头痛是你首先感知到的存在。眼前闪过一系列断裂的图像：闪烁的荧光灯、白大褂、冰冷的金属仓体，以及一个重复出现的声音："休眠状态...倒计时开始..."\n\n"喂！别死了！"一个粗哑的声音打断了你的幻象，随之而来的是脸上泼来的难闻液体。你猛地睁开眼睛，咳嗽着坐起身。',
    skipResourceConsumption: true,
    options: [
      { text: '环顾四周', nextScene: 'meetLiuYe' },
      { text: '检查你的净化服', nextScene: 'checkSuit' }
    ]
  },

  // 检查净化服
  'checkSuit': {
    title: '神秘的净化服',
    description: '你低头看向身上穿着的紧身衣服。它材质特殊，似乎能自动调节温度，胸前印有"R-250"的编号。衣服内侧有微弱的光点闪烁，似乎在监测着什么。这件衣服与周围破旧的环境格格不入，像是来自另一个世界的产物。',
    skipResourceConsumption: true,
    endingScores: { tech: 0.2 }, // 对技术表现出兴趣
    options: [
      { text: '抬头看向周围的人', nextScene: 'meetLiuYe' }
    ]
  },

  // 与刘爷初次对话
  'meetLiuYe': {
    title: '陌生的脸孔',
    description: '眼前是一个满脸皱纹的老人，灰白的头发在脑后松散地扎成一束，眼神中透着警惕与好奇。"你总算醒了，我还以为又得挖个坑了。"老人将手中的塑料瓶收回背包，"我是刘爷，你是谁？"',
    skipResourceConsumption: true,
    options: [
      { 
        text: '"我...不知道。"（诚实回答）', 
        nextScene: 'amnesiaConfirmed',
        endingScores: { humanity: 0.2 }  // 诚实显示了人道倾向
      },
      { 
        text: '谨慎地打量对方（不立即回答）', 
        nextScene: 'cautiousResponse',
        endingScores: { survival: 0.2 }  // 谨慎显示了生存倾向
      }
    ]
  },

  // 失忆确认
  'amnesiaConfirmed': {
    title: '身份未知',
    description: '刘爷审视着你，目光停留在你胸前的编号上。"好吧，小R，欢迎来到未来。这里是废旧矿洞，我们的临时营地。你穿的那件东西...不是普通货色，是旧世界的\'净化服\'。能活到现在，算你命大。"\n\n小R（姑且这么称呼自己）环顾四周。这是一个半塌陷的矿洞，几盏简易灯照亮了石壁上的锈迹和斑驳的水痕。角落里堆着一些破旧的物资，几个衣衫褴褛的人影在远处忙碌着。',
    options: [
      { text: '"这是哪里？发生了什么？"', nextScene: 'askAboutWorld' }
    ]
  },

  // 谨慎回应
  'cautiousResponse': {
    title: '保持警惕',
    description: '你沉默地观察着周围环境，没有立即回答老人的问题。刘爷轻哼一声，似乎理解你的谨慎。\n\n"不想说也行。在废土上，保持警惕是活下去的第一课。不过在这里，我们有基本规矩——不欢迎闲人，想留下就得干活。"\n\n他指了指你胸前的编号。"就叫你小R吧，那件净化服不是普通货色，能保住你的小命。"',
    endingScores: { survival: 0.1 }, // 额外的生存倾向
    options: [
      { text: '"关键抉择"', nextScene: 'chapter1_key_choice' }
    ]
  },


  // 在文件末尾添加关键选择场景
'chapter1_key_choice': {
    title: '关键抉择',
    description: '你在矿洞营地待了一周，逐渐融入这个临时家园。然而秃鹫的威胁、诡异的回响信号、C区的谜团和天庭的阴影始终笼罩着你。刘爷认为你在这里已经不安全，建议你前往轮椅镇。\n\n面对未知的前路，你必须做出选择。',
    options: [
      { 
        text: '决定保护弱小，即使牺牲自己', 
        nextScene: 'martyr_chapter2_start',
        endingScores: { humanity: 0.5 } // 人道路线
      },
      { 
        text: '寻找修复废土的科技手段', 
        nextScene: 'spark_chapter2_start',
        endingScores: { tech: 0.5 } // 火种路线
      },
      { 
        text: '专注于适应和在废土上生存', 
        nextScene: 'scavenger_chapter2_start',
        endingScores: { survival: 0.5 } // 拾荒者路线
      },
      { 
        text: '寻求与天庭的联系和沟通', 
        nextScene: 'skycity_chapter2_start',
        endingScores: { skycity: 0.5 } // 天庭路线
      }
    ]
  }
}
// 导出章节场景
if (typeof module !== 'undefined' && module.exports) {
    module.exports = chapter1Scenes;
  } else {
    window.chapter1Scenes = chapter1Scenes;
  }