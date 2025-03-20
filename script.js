// script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 已加载');
    
    // 随机选择一个季节
    const seasons = ['spring', 'summer', 'autumn', 'winter'];
    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)];
    console.log('随机初始化季节：', randomSeason);
    
    // 应用随机季节
    changeSeason(randomSeason);

    // 初始化飞心动画
    let flyingHeartAnimation = null;
    // 修改飞心动画初始化函数
    const initFlyingHeartAnimation = () => {
        const container = document.getElementById('flying-heart-container');
        
        if (container) {
            // 确保容器尺寸正确
            container.style.width = '150px';
            container.style.height = '150px';
            container.style.overflow = 'hidden';
            
            // 初始化 Lottie 动画，增加明确的尺寸设置
            flyingHeartAnimation = lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: './image/flying-heart.json',
                rendererSettings: {
                    // 限制SVG尺寸
                    preserveAspectRatio: 'xMidYMid meet',
                    // 确保SVG在容器内居中
                    viewBoxSize: '0 0 150 150'
                }
            });
            
            // 添加加载完成后强制设置尺寸的处理
            flyingHeartAnimation.addEventListener('DOMLoaded', () => {
                // 强制设置SVG尺寸
                const svg = container.querySelector('svg');
                if (svg) {
                    svg.setAttribute('width', '150px');
                    svg.setAttribute('height', '150px');
                    svg.style.width = '100%';
                    svg.style.height = '100%';
                }
            });
            
            // 添加点击事件监听器
            container.addEventListener('click', () => {
                console.log('点击了飞心动画');
                // 重新播放动画
                flyingHeartAnimation.goToAndPlay(0, true);
            });
            
            // 添加完成事件监听器
            flyingHeartAnimation.addEventListener('complete', () => {
                console.log('动画播放完成');
                // 可以在这里添加动画完成后的逻辑
            });
            
            // 初始播放一次动画（页面加载时）
            flyingHeartAnimation.goToAndPlay(0, true);
            
            // 添加拖拽功能
            makeDraggable(container);
        }
    };

    // 添加拖拽功能
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let isDragging = false;
        let movedDistance = 0; // 跟踪移动距离
        let startTime = 0; // 开始时间
        
        element.addEventListener('mousedown', dragStart);
        element.addEventListener('touchstart', dragStart, { passive: false });
        
        function dragStart(e) {
            e.preventDefault();
            e.stopPropagation();
            
            startTime = Date.now();
            movedDistance = 0; // 重置移动距离
            
            // 如果是触摸事件，获取第一个触摸点
            if (e.type === 'touchstart') {
                pos3 = e.touches[0].clientX;
                pos4 = e.touches[0].clientY;
                
                document.addEventListener('touchmove', dragMove, { passive: false });
                document.addEventListener('touchend', dragEnd, { passive: false });
            } else {
                pos3 = e.clientX;
                pos4 = e.clientY;
                
                document.addEventListener('mousemove', dragMove);
                document.addEventListener('mouseup', dragEnd);
            }
            
            isDragging = true;
            console.log('开始拖动飞心');
        }
        
        function dragMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            // 计算新位置
            let newX, newY;
            if (e.type === 'touchmove') {
                newX = e.touches[0].clientX;
                newY = e.touches[0].clientY;
                pos1 = pos3 - newX;
                pos2 = pos4 - newY;
                pos3 = newX;
                pos4 = newY;
            } else {
                newX = e.clientX;
                newY = e.clientY;
                pos1 = pos3 - newX;
                pos2 = pos4 - newY;
                pos3 = newX;
                pos4 = newY;
            }
            
            // 计算移动距离
            movedDistance += Math.sqrt(pos1 * pos1 + pos2 * pos2);
            
            // 设置元素的新位置
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function dragEnd(e) {
            // 停止拖动
            isDragging = false;
            
            // 移除事件监听器
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
            document.removeEventListener('touchmove', dragMove);
            document.removeEventListener('touchend', dragEnd);
            
            // 防止拖出视口
            const rect = element.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            if (rect.left < 0) element.style.left = "0px";
            if (rect.top < 0) element.style.top = "0px";
            if (rect.right > windowWidth) element.style.left = (windowWidth - rect.width) + "px";
            if (rect.bottom > windowHeight) element.style.top = (windowHeight - rect.height) + "px";
            
            // 判断是点击还是拖动
            const endTime = Date.now();
            const elapsedTime = endTime - startTime;
            
            // 如果移动距离小于5px，且时间小于200ms，则视为点击
            if (movedDistance < 5 && elapsedTime < 200) {
                console.log('检测到点击飞心');
                
                // 模拟点击事件
                setTimeout(() => {
                    // 重新播放动画
                    if (flyingHeartAnimation) {
                        flyingHeartAnimation.goToAndPlay(0, true);
                        console.log('触发飞心动画');
                    }
                }, 10);
            }
            
            console.log('结束拖动飞心');
        }
    }

    // 调用初始化函数
    initFlyingHeartAnimation();
    
    populateSelect('snake-player-select');
    populateSelect('tetris-player-select');
  
    const seasonButtons = document.querySelectorAll('.season-btn');
    console.log('找到的季节按钮数量：', seasonButtons.length);
    seasonButtons.forEach(button => {
        button.addEventListener('click', () => {
            const season = button.getAttribute('data-season');
            console.log('点击了季节按钮：', season);
            changeSeason(season);
        });
    });
  
    // 保存游戏实例的全局引用
    let currentSnakeGame = null;
    let currentTetrisGame = null;
  
// 修改切换视图函数，调整季节装饰在游戏界面中的透明度
const toggleGameView = (showGameId, hideElements) => {
    // 如果正在离开游戏视图，清理游戏资源
    if (document.getElementById('snake-game').style.display === 'block' && showGameId !== 'snake-game') {
        if (currentSnakeGame) {
            currentSnakeGame.destroy();
            currentSnakeGame = null;
        }
    }
    
    if (document.getElementById('tetris-game').style.display === 'block' && showGameId !== 'tetris-game') {
        if (currentTetrisGame) {
            // 假设TetrisGame也有类似的destroy方法
            if (currentTetrisGame.intervalId) {
                clearInterval(currentTetrisGame.intervalId);
            }
            currentTetrisGame = null;
        }
    }

    document.querySelector('.season-controls').style.display = hideElements ? 'none' : 'flex';
    document.getElementById('games-btn').style.display = hideElements ? 'none' : 'inline-block';
    document.getElementById('games-selection').style.display = (showGameId === 'games-selection') ? 'block' : 'none';
    document.getElementById('snake-game').style.display = (showGameId === 'snake-game') ? 'block' : 'none';
    document.getElementById('tetris-game').style.display = (showGameId === 'tetris-game') ? 'block' : 'none';
    const pageTitle = document.getElementById('page-title') || document.querySelector('.container h1');
    pageTitle.style.display = hideElements ? 'none' : 'block';
    
    // 调整季节装饰的透明度
    const decoration = document.querySelector('.seasonal-decoration');
    if (decoration) {
        // 如果是在游戏界面，降低透明度；如果在选择界面或主页，保持原有透明度
        if (showGameId === 'snake-game' || showGameId === 'tetris-game') {
            decoration.style.opacity = '0.4'; // 在游戏界面中透明度降低为40%
        } else if (showGameId === 'games-selection') {
            decoration.style.opacity = '0.6'; // 在游戏选择界面中透明度为60%
        } else {
            decoration.style.opacity = '0.8'; // 在主页中保持原有透明度80%
        }
    }
};
  
    // 添加防抖功能
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // 使用防抖函数包装视图切换
    const debouncedToggleGameView = debounce(toggleGameView, 100);

    // 保存事件处理函数的引用，以便后续移除
    let snakeLeaderboardClickHandler;
    let snakeDocumentClickHandler;
    // 保存俄罗斯方块排行榜点击处理函数的引用
    let tetrisLeaderboardClickHandler;
  
    // 点击"小游戏"按钮显示游戏选择页面
    document.getElementById('games-btn').addEventListener('click', () => {
        console.log('进入游戏选择页面');
        toggleGameView('games-selection', true);
    });
  
    // 游戏选择页面的返回按钮
    document.getElementById('games-back-btn').addEventListener('click', () => {
        console.log('返回季节页面');
        toggleGameView(null, false);
    });
  
    // 修改进入贪吃蛇游戏的代码
    document.getElementById('snake-select-btn').addEventListener('click', () => {
        console.log('进入贪吃蛇游戏');
        toggleGameView('snake-game', true);
        
        // 确保销毁任何之前的游戏实例
        if (currentSnakeGame) {
            currentSnakeGame.destroy();
            currentSnakeGame = null;
        }
        
        // 创建新的游戏实例并保存引用 - 只创建一个实例
        currentSnakeGame = new SnakeGame();
        
        const leaderboardBtn = document.getElementById('snake-leaderboard-btn');
        const leaderboardContent = document.getElementById('snake-leaderboard-content');
  
        // 移除旧的事件监听器（如果存在）
        if (snakeLeaderboardClickHandler) {
            leaderboardBtn.removeEventListener('click', snakeLeaderboardClickHandler);
        }
        if (snakeDocumentClickHandler) {
            document.removeEventListener('click', snakeDocumentClickHandler);
        }
  
        // 定义新的事件处理函数并保存引用
        snakeLeaderboardClickHandler = (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            leaderboardContent.style.display = leaderboardContent.style.display === 'block' ? 'none' : 'block';
        };
  
        snakeDocumentClickHandler = (e) => {
            if (!leaderboardContent.contains(e.target) && e.target !== leaderboardBtn) {
                leaderboardContent.style.display = 'none';
            }
        };
  
        // 添加新的事件监听器
        leaderboardBtn.addEventListener('click', snakeLeaderboardClickHandler);
        document.addEventListener('click', snakeDocumentClickHandler);
  
        document.getElementById('back-btn').addEventListener('click', () => {
            if (currentSnakeGame) {
                currentSnakeGame.destroy();
                currentSnakeGame = null;
            }
            console.log('返回游戏选择页面');
            debouncedToggleGameView('games-selection', true);
        }, { once: true });
    });
  
    // 修复俄罗斯方块游戏实例重复创建问题
    document.getElementById('tetris-select-btn').addEventListener('click', () => {
        console.log('进入俄罗斯方块游戏');
        toggleGameView('tetris-game', true);
        
        // 确保销毁任何之前的游戏实例
        if (currentTetrisGame) {
            if (currentTetrisGame.intervalId) {
                clearInterval(currentTetrisGame.intervalId);
            }
            currentTetrisGame = null;
        }
        
        // 只创建一个实例
        currentTetrisGame = new TetrisGame();
        
        // 为俄罗斯方块添加排行榜切换功能
        const tetrisLeaderboardBtn = document.getElementById('tetris-leaderboard-btn');
        const tetrisLeaderboardContent = document.getElementById('tetris-leaderboard-content');
        
        // 移除之前的事件监听器（如果存在）
        if (tetrisLeaderboardClickHandler) {
            tetrisLeaderboardBtn.removeEventListener('click', tetrisLeaderboardClickHandler);
        }
        
        // 定义新的事件处理函数并保存引用 - 修复这里，添加事件参数e并阻止冒泡
        tetrisLeaderboardClickHandler = (e) => {
            e.stopPropagation(); // 阻止事件冒泡，防止文档点击事件关闭排行榜
            console.log("点击了俄罗斯方块排行榜按钮");
            tetrisLeaderboardContent.style.display = 
                tetrisLeaderboardContent.style.display === 'block' ? 'none' : 'block';
            
            // 如果打开了排行榜，加载最新数据
            if (tetrisLeaderboardContent.style.display === 'block') {
                loadLeaderboard("tetris", "tetris-leaderboard-content");
            }
        };
        
        // 添加新的事件监听器
        tetrisLeaderboardBtn.addEventListener('click', tetrisLeaderboardClickHandler);
        
        // 确保排行榜初始状态为隐藏
        tetrisLeaderboardContent.style.display = 'none';
        
        // 添加文档点击事件处理，点击排行榜外部时关闭排行榜
        const tetrisDocumentClickHandler = (e) => {
            if (tetrisLeaderboardContent.style.display === 'block' && 
                !tetrisLeaderboardContent.contains(e.target) && 
                e.target !== tetrisLeaderboardBtn) {
                tetrisLeaderboardContent.style.display = 'none';
            }
        };
        
        // 绑定文档点击事件
        document.addEventListener('click', tetrisDocumentClickHandler);
        
        document.getElementById('tetris-back-btn').addEventListener('click', () => {
            // 使用currentTetrisGame而不是局部变量game
            if (currentTetrisGame && currentTetrisGame.intervalId) clearInterval(currentTetrisGame.intervalId);
            
            // 移除文档点击事件监听器，避免内存泄漏
            document.removeEventListener('click', tetrisDocumentClickHandler);
            
            console.log('返回游戏选择页面');
            toggleGameView('games-selection', true);
        }, { once: true });
    });

    // 游戏说明按钮点击事件
    const instructionBtn = document.getElementById('games-instruction-btn');
    const instructionModal = document.getElementById('instruction-modal');
    
    if (instructionBtn && instructionModal) {
        instructionBtn.addEventListener('click', () => {
            instructionModal.style.display = 'flex';
        });
        
        // 为说明弹窗添加关闭按钮事件
        const closeBtn = instructionModal.querySelector('.modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                instructionModal.style.display = 'none';
            });
        }
        
        // 点击弹窗背景关闭弹窗
        instructionModal.addEventListener('click', (e) => {
            if (e.target === instructionModal) {
                instructionModal.style.display = 'none';
            }
        });
    }
  });