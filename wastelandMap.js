// 废土求生：地图系统
const wastelandMap = {
    // 地图数据，基于AI_地图.md的9个主要区域
    regions: [
        { id: 'wastemine', name: '废旧矿洞', x: 20, y: 50, desc: '崎岖的山地，废弃矿井和塌方坑道' },
        { id: 'rustriver', name: '锈河', x: 40, y: 60, desc: '干涸河床，红色锈蚀泥浆，夜晚泛蓝光' },
        { id: 'grainstation', name: '粮站', x: 60, y: 45, desc: '混凝土堡垒，迷宫般的仓库地道' },
        { id: 'wheelchairtown', name: '轮椅镇', x: 35, y: 35, desc: '山丘上的混凝土小镇，铁墙与棚屋' },
        { id: 'carea', name: 'C区', x: 70, y: 70, desc: '沙漠中巨型圆形高墙，地下设施' },
        { id: 'oldmarket', name: '老市', x: 50, y: 20, desc: '旧城废墟中的露天集市，摊位与霓虹' },
        { id: 'supremegovt', name: '最高政府', x: 80, y: 30, desc: '深邃裂谷，谷底金属残骸' },
        { id: 'hangingfactory', name: '倒悬工厂', x: 15, y: 15, desc: '倾斜巨型工厂，断崖边缘' },
        { id: 'skycity', name: '天庭浮空城', x: 65, y: 10, desc: '漂浮高空平台，光洁金属建筑' }
    ],
    
    // 当前位置
    currentRegion: null,
    
// 修改初始化地图函数
init: function() {
    console.log("初始化废土地图...");
    
    // 检查地图是否已经初始化
    if (document.querySelector('.wasteland-map')) {
        console.log("地图已存在，不重复初始化");
        return;
    }
    
    // 获取游戏容器
    const gameContainer = document.getElementById('wasteland-game');
    if (!gameContainer) {
        console.error("找不到游戏容器，无法初始化地图");
        return;
    }
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'wasteland-map';
    mapContainer.innerHTML = `
        <div class="map-header">废土地图</div>
        <div class="map-canvas">
            <!-- 地图背景将在这里显示 -->
        </div>
        <div class="map-info">未知区域</div>
        <div class="map-close">×</div>
    `;
    
    // 渲染地图标记
    const mapCanvas = mapContainer.querySelector('.map-canvas');
    mapCanvas.style.backgroundColor = "#1a2a1a";
    mapCanvas.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect fill=\"none\" stroke=\"%23333\" stroke-width=\"0.5\" x=\"0\" y=\"0\" width=\"100\" height=\"100\"/></svg>')";
    
    this.regions.forEach(region => {
        const marker = document.createElement('div');
        marker.className = 'map-marker';
        marker.dataset.region = region.id;
        marker.style.left = `${region.x}%`;
        marker.style.top = `${region.y}%`;
        marker.title = region.name;
        
        // 添加区域名称标签
        const label = document.createElement('div');
        label.className = 'region-label';
        label.textContent = region.name;
        marker.appendChild(label);
        
        mapCanvas.appendChild(marker);
    });
    
    // 创建玩家位置标记
    const playerMarker = document.createElement('div');
    playerMarker.className = 'player-marker';
    playerMarker.id = 'player-position';
    mapCanvas.appendChild(playerMarker);
    
    // 绑定关闭按钮事件
    const closeBtn = mapContainer.querySelector('.map-close');
    closeBtn.addEventListener('click', () => {
        this.hideMap();
    });
    
    // 将地图添加到游戏容器而不是document.body
    gameContainer.appendChild(mapContainer);
    console.log("地图初始化完成");
},
    
    // 根据场景ID更新位置
    updatePosition: function(sceneId) {
        // 场景ID到地图区域ID的映射
        const sceneToRegion = {
            'start': 'wastemine',
            'nearbyRuins': 'wastemine',
            'stationRats': 'wastemine',
            'ratsDefeated': 'wastemine',
            'treatWound': 'wastemine',
            'narrowEscape': 'wastemine',
            'stationLoot': 'wastemine',
            'hiddenCompartment': 'wastemine',
            'ironHill': 'wastemine',
            'meetLiuYe': 'wastemine',
            
            'abandonedHighway': 'rustriver',
            'fireRiver': 'rustriver',
            
            'grainStation': 'grainstation',
            
            // 可以根据实际场景继续添加映射
        };
        
        // 找出对应的区域
        const regionId = sceneToRegion[sceneId] || 'wastemine';
        this.currentRegion = regionId;
        
        const region = this.regions.find(r => r.id === regionId);
        if (!region) return;
        
        // 更新玩家标记位置
        const playerMarker = document.getElementById('player-position');
        if (playerMarker) {
            playerMarker.style.left = `${region.x}%`;
            playerMarker.style.top = `${region.y}%`;
        }
        
        // 更新区域信息
        const mapInfo = document.querySelector('.wasteland-map .map-info');
        if (mapInfo) {
            mapInfo.textContent = `${region.name}: ${region.desc}`;
        }
        
        // 更新标记样式
        document.querySelectorAll('.map-marker').forEach(marker => {
            marker.classList.remove('current');
            if (marker.dataset.region === regionId) {
                marker.classList.add('current');
            }
        });
    },
    
// 修改显示地图函数
showMap: function() {
    console.log("显示地图");
    const map = document.querySelector('.wasteland-map');
    if (map) {
        map.classList.add('active');
    } else {
        console.error("找不到地图元素");
        // 如果地图元素不存在，重新初始化
        this.init();
        setTimeout(() => {
            const newMap = document.querySelector('.wasteland-map');
            if (newMap) newMap.classList.add('active');
        }, 100);
    }
},
    
    // 隐藏地图
    hideMap: function() {
        const map = document.querySelector('.wasteland-map');
        if (map) map.classList.remove('active');
    },
    
    // 切换地图显示状态
    toggleMap: function() {
        const map = document.querySelector('.wasteland-map');
        if (map) {
            map.classList.toggle('active');
        }
    }
};

// 暴露为全局变量，以便mud.js调用
window.wastelandMap = wastelandMap;