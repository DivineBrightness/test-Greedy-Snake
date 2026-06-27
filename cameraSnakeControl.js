// cameraSnakeControl.js
// 摄像头头部方向控制贪吃蛇。
// 第一版使用 MediaPipe Face Landmarker，在浏览器本地推理，不上传视频帧。

(() => {
  const MEDIAPIPE_VERSION = '0.10.20';

    const CONFIG = {
    wasmUrl: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`,
    bundleUrl: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/vision_bundle.mjs`,

    modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',

    predictIntervalMs: 120,
    mobilePredictIntervalMs: 180,
    repeatIntervalMs: 220,

    // yaw 现在用人脸矩阵，单位近似是弧度。0.18 约等于 10 度。
    yawThreshold: 0.18,

    // pitch 仍然沿用鼻尖/额头/下巴的相对位置。
    pitchThreshold: 0.06,
    mobilePitchThreshold: 0.22,
    desktopVerticalDominance: 1.15,
    mobileVerticalDominance: 1.8,

    swapLeftRight: true,

    // 校准需要稳定正脸，不再第一帧就完成。
    calibrationDurationMs: 800,
    calibrationMaxDurationMs: 3000,
    calibrationMinSamples: 5,

    // 校准阶段只要求头部稳定，不再用绝对角度卡死手机前摄的自然俯仰偏差。
    calibrationMaxYawDrift: 0.22,
    calibrationMaxPitchDrift: 0.14
    };

  let faceLandmarker = null;
  let loadingPromise = null;

  let enabled = false;
  let stream = null;
  let rafId = null;
  let video = null;
  let starting = false;

let lastPredictTime = 0;
let lastSendTime = 0;
let lastDirection = null;
let baseline = null;
let lastFaceSeenTime = 0;
let missingFaceSince = 0;

let calibrationStartTime = 0;
let calibrationAttemptStartTime = 0;
let calibrationSamples = [];
let lastDebugSignalTime = 0;

const DEBUG_STORAGE_KEY = 'snakeCameraDebug';
const debugLines = [];
let debugForceOff = false;
let debugPaused = false;
let debugAutoScroll = true;

  function getGame() {
    return window.currentSnakeGame || null;
  }

  function setStatus(text) {
    const status = document.getElementById('snake-camera-status');
    if (status) status.textContent = text;
  }

  function setDirectionText(text) {
    const el = document.getElementById('snake-camera-direction');
    if (el) el.textContent = text;

    updateStickmanState(text);
  }

  function updateStickmanState(text) {
    const stickman = document.getElementById('snake-stickman');
    if (!stickman) return;

    const states = [
      'stickman-center',
      'stickman-left',
      'stickman-right',
      'stickman-up',
      'stickman-down',
      'stickman-calibrating',
      'stickman-no-face'
    ];

    stickman.classList.remove(...states);

    const value = String(text || '');
    let state = 'stickman-center';

    if (value.includes('无人脸') || value.includes('转回')) {
      state = 'stickman-no-face';
    } else if (value.includes('左')) {
      state = 'stickman-left';
    } else if (value.includes('右')) {
      state = 'stickman-right';
    } else if (value.includes('上')) {
      state = 'stickman-up';
    } else if (value.includes('下')) {
      state = 'stickman-down';
    } else if (value.includes('校准')) {
      state = 'stickman-calibrating';
    } else {
      state = 'stickman-center';
    }

    stickman.classList.add(state);
    stickman.setAttribute('aria-label', `火柴人方向：${value || '居中'}`);
  }

  function setButtonText(text) {
    const btn = document.getElementById('snake-camera-toggle');
    if (btn) btn.textContent = text;
  }

  function safeStorageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      // Some mobile privacy modes can block localStorage.
    }
  }

  function safeStorageRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      // Ignore storage failures; debugging still works for this session.
    }
  }

  function isDebugEnabled() {
    if (debugForceOff) return false;

    const params = new URLSearchParams(window.location.search);
    return params.has('cameraDebug') || safeStorageGet(DEBUG_STORAGE_KEY) === '1';
  }

  function formatError(err) {
    if (!err) return 'unknown error';

    const parts = [];
    if (err.name) parts.push(err.name);
    if (err.message) parts.push(err.message);

    return parts.length ? parts.join(': ') : String(err);
  }

  function ensureDebugPanel() {
    let panel = document.getElementById('snake-camera-debug-panel');
    if (panel) return panel;

    panel = document.createElement('div');
    panel.id = 'snake-camera-debug-panel';
    panel.className = 'snake-camera-debug-panel';
    panel.innerHTML = `
      <div class="snake-camera-debug-header">
        <strong>摄像头调试</strong>
        <div>
          <button type="button" id="snake-camera-debug-copy">复制</button>
          <button type="button" id="snake-camera-debug-pause">暂停</button>
          <button type="button" id="snake-camera-debug-clear">清空</button>
          <button type="button" id="snake-camera-debug-close">关闭</button>
        </div>
      </div>
      <pre id="snake-camera-debug-log"></pre>
    `;

    document.body.appendChild(panel);

    panel.querySelector('#snake-camera-debug-copy')?.addEventListener('click', async () => {
      const text = debugLines.join('\n') || '没有调试日志';

      try {
        await navigator.clipboard.writeText(text);
        setDebugCopyState('已复制');
      } catch (err) {
        const log = panel.querySelector('#snake-camera-debug-log');
        if (log) {
          const range = document.createRange();
          range.selectNodeContents(log);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
        setDebugCopyState('请长按复制');
      }
    });

    panel.querySelector('#snake-camera-debug-pause')?.addEventListener('click', () => {
      debugPaused = !debugPaused;
      const btn = panel.querySelector('#snake-camera-debug-pause');
      if (btn) btn.textContent = debugPaused ? '继续' : '暂停';
      renderDebugPanel(true);
    });

    panel.querySelector('#snake-camera-debug-clear')?.addEventListener('click', () => {
      debugLines.length = 0;
      renderDebugPanel(true);
    });

    panel.querySelector('#snake-camera-debug-close')?.addEventListener('click', () => {
      debugForceOff = true;
      safeStorageRemove(DEBUG_STORAGE_KEY);
      panel.classList.remove('active');
    });

    return panel;
  }

  function setDebugCopyState(text) {
    const btn = document.getElementById('snake-camera-debug-copy');
    if (!btn) return;

    const originalText = btn.dataset.originalText || btn.textContent || '复制';
    btn.dataset.originalText = originalText;
    btn.textContent = text;

    window.setTimeout(() => {
      btn.textContent = btn.dataset.originalText || '复制';
    }, 1600);
  }

  function renderDebugPanel(force = false) {
    if (debugPaused && !force) return;

    const panel = ensureDebugPanel();
    const log = panel.querySelector('#snake-camera-debug-log');
    if (log) {
      const nearBottom = log.scrollTop + log.clientHeight >= log.scrollHeight - 12;
      log.textContent = debugLines.join('\n');
      if (debugAutoScroll && nearBottom) {
        log.scrollTop = log.scrollHeight;
      }
    }
  }

  function showDebugPanel() {
    ensureDebugPanel().classList.add('active');
    renderDebugPanel();
  }

  function logDebug(message, data) {
    if (!isDebugEnabled()) return;

    const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });
    let line = `[${time}] ${message}`;

    if (data !== undefined) {
      if (typeof data === 'string') {
        line += ` ${data}`;
      } else {
        try {
          line += ` ${JSON.stringify(data)}`;
        } catch (err) {
          line += ` ${String(data)}`;
        }
      }
    }

    debugLines.push(line);
    while (debugLines.length > 60) debugLines.shift();
    showDebugPanel();
  }

  function logSignal(signal, now, label = 'signal') {
    if (!isDebugEnabled() || now - lastDebugSignalTime < 2500) return;

    lastDebugSignalTime = now;
    logDebug(label, {
      yaw: Number(signal.yaw.toFixed(3)),
      pitch: Number(signal.pitch.toFixed(3)),
      baseline: baseline ? {
        yaw: Number(baseline.yaw.toFixed(3)),
        pitch: Number(baseline.pitch.toFixed(3))
      } : null,
      samples: calibrationSamples.length,
      video: video ? `${video.videoWidth}x${video.videoHeight}` : 'none'
    });
  }

  async function loadModel() {
    if (faceLandmarker) return faceLandmarker;

    if (!loadingPromise) {
      loadingPromise = (async () => {
        const vision = await import(CONFIG.bundleUrl);
        const { FaceLandmarker, FilesetResolver } = vision;

        const filesetResolver = await FilesetResolver.forVisionTasks(CONFIG.wasmUrl);

        try {
          return await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
              modelAssetPath: CONFIG.modelAssetPath,
              delegate: 'GPU'
            },
            runningMode: 'VIDEO',
            numFaces: 1,
            minFaceDetectionConfidence: 0.4,
            minFacePresenceConfidence: 0.4,
            minTrackingConfidence: 0.4,
            outputFacialTransformationMatrixes: true
          });
        } catch (gpuError) {
          console.warn('GPU 模式初始化失败，改用 CPU 模式：', gpuError);
          logDebug('GPU 初始化失败，改用 CPU', formatError(gpuError));

          return await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
              modelAssetPath: CONFIG.modelAssetPath,
              delegate: 'CPU'
            },
            runningMode: 'VIDEO',
            numFaces: 1,
            minFaceDetectionConfidence: 0.4,
            minFacePresenceConfidence: 0.4,
            minTrackingConfidence: 0.4,
            outputFacialTransformationMatrixes: true
          });
        }
      })();

      loadingPromise
        .then((model) => {
          faceLandmarker = model;
        })
        .catch((err) => {
          loadingPromise = null;
          console.error('人脸识别模型加载失败：', err);
        });
    }

    return loadingPromise;
  }

  function isMobileLike() {
    return window.matchMedia?.('(pointer: coarse)')?.matches ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }

  function getPredictIntervalMs() {
    return isMobileLike() ? CONFIG.mobilePredictIntervalMs : CONFIG.predictIntervalMs;
  }

  function getPitchThreshold() {
    return isMobileLike() ? CONFIG.mobilePitchThreshold : CONFIG.pitchThreshold;
  }

  function getVerticalDominance() {
    return isMobileLike() ? CONFIG.mobileVerticalDominance : CONFIG.desktopVerticalDominance;
  }

  function getCameraConstraints() {
    const mobile = isMobileLike();

    return {
      video: {
        width: { ideal: mobile ? 320 : 640 },
        height: { ideal: mobile ? 240 : 480 },
        facingMode: 'user'
      },
      audio: false
    };
  }

  async function openCameraStream() {
    try {
      return await navigator.mediaDevices.getUserMedia(getCameraConstraints());
    } catch (err) {
      logDebug('按理想参数打开摄像头失败，尝试默认参数', formatError(err));

      if (err.name === 'OverconstrainedError' || err.name === 'NotFoundError') {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      throw err;
    }
  }

  async function start() {
    const game = getGame();

    if (!game) {
      setStatus('请先进入贪吃蛇游戏');
      return;
    }

    if (enabled || starting) {
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('当前浏览器不支持摄像头 API');
      return;
    }

    starting = true;

    try {
      logDebug('开始启动', {
        secure: window.isSecureContext,
        mobile: isMobileLike(),
        userAgent: navigator.userAgent
      });

      setButtonText('启动中...');
      setStatus('正在请求摄像头权限...');

      video = document.getElementById('snake-camera-video');
      if (!video) {
        throw new Error('找不到摄像头视频元素');
      }

      // 移动端浏览器更依赖用户手势，先打开摄像头和播放视频，再加载模型。
      stream = await openCameraStream();

      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      logDebug('摄像头视频已播放', {
        width: video.videoWidth,
        height: video.videoHeight,
        readyState: video.readyState
      });

      document.getElementById('snake-camera-preview')?.classList.add('active');

      setButtonText('加载中...');
      setStatus('正在加载人脸识别模型...');

      faceLandmarker = await loadModel();
      logDebug('模型加载完成');

      enabled = true;
      starting = false;
      lastPredictTime = 0;
      lastSendTime = 0;

      beginCalibration('请正对摄像头，保持 1 秒完成校准');

      setButtonText('关闭摄像头控制');

      loop(performance.now());
    } catch (err) {
      console.error('摄像头控制启动失败：', err);
      logDebug('启动失败', formatError(err));
      stop();

      if (!window.isSecureContext) {
        setStatus('需要 HTTPS 或 localhost 才能使用摄像头');
      } else if (err.name === 'NotAllowedError') {
        setStatus('摄像头权限被拒绝');
      } else if (err.name === 'NotFoundError') {
        setStatus('没有找到摄像头');
      } else {
        setStatus('摄像头控制启动失败，查看控制台');
      }

      setButtonText('开启摄像头控制');
    } finally {
      starting = false;
    }
  }

  function stop() {
    starting = false;
    enabled = false;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }

    if (video) {
      video.pause();
      video.srcObject = null;
    }

    baseline = null;
    lastDirection = null;

    document.getElementById('snake-camera-preview')?.classList.remove('active');

    setButtonText('开启摄像头控制');
    setStatus('摄像头控制未开启');
    setDirectionText('居中');
  }

function recalibrate() {
  if (starting) {
    setStatus('正在启动摄像头，请稍候');
    return;
  }

  if (!enabled) {
    setStatus('先开启摄像头控制');
    setDirectionText('居中');
    return;
  }

  beginCalibration('请正对摄像头，正在重新校准');
}
function beginCalibration(statusText = '请正对摄像头，保持 1 秒完成校准') {
  baseline = null;
  lastDirection = null;
  lastFaceSeenTime = 0;
  missingFaceSince = 0;
  calibrationStartTime = 0;
  calibrationAttemptStartTime = 0;
  calibrationSamples = [];

  setStatus(statusText);
  setDirectionText('校准中');
  logDebug('开始校准');
}

function averageSignals(samples) {
  const total = samples.reduce((acc, item) => {
    acc.yaw += item.yaw;
    acc.pitch += item.pitch;
    return acc;
  }, { yaw: 0, pitch: 0 });

  return {
    yaw: total.yaw / samples.length,
    pitch: total.pitch / samples.length
  };
}

function handleCalibration(signal, now) {
  if (!calibrationAttemptStartTime) {
    calibrationAttemptStartTime = now;
  }

  if (!calibrationStartTime) {
    calibrationStartTime = now;
    calibrationSamples = [signal];
    setStatus('校准中：请保持当前正脸姿势 0%');
    setDirectionText('校准中');
    logSignal(signal, now, 'calibration-start');
    return;
  }

  const firstSample = calibrationSamples[0];
  const yawDrift = Math.abs(signal.yaw - firstSample.yaw);
  const pitchDrift = Math.abs(signal.pitch - firstSample.pitch);
  const drifted = yawDrift > CONFIG.calibrationMaxYawDrift ||
    pitchDrift > CONFIG.calibrationMaxPitchDrift;

  calibrationSamples.push(signal);
  if (calibrationSamples.length > 20) {
    calibrationSamples.shift();
  }

  const elapsed = now - calibrationStartTime;
  const attemptElapsed = now - calibrationAttemptStartTime;
  const progress = Math.min(100, Math.round((elapsed / CONFIG.calibrationDurationMs) * 100));

  if (drifted && attemptElapsed < CONFIG.calibrationMaxDurationMs) {
    setStatus(`校准中：检测到画面抖动，请尽量保持 ${progress}%`);
  } else {
    setStatus(`校准中：请保持当前正脸姿势 ${progress}%`);
  }

  setDirectionText('校准中');
  logSignal(signal, now, drifted ? 'calibration-drift' : 'calibration');

  const canFinish = elapsed >= CONFIG.calibrationDurationMs &&
    calibrationSamples.length >= CONFIG.calibrationMinSamples;
  const mustFinish = attemptElapsed >= CONFIG.calibrationMaxDurationMs &&
    calibrationSamples.length > 0;

  if (canFinish || mustFinish) {
    const fallback = mustFinish && !canFinish;
    const baselineSamples = calibrationSamples.slice(-10);
    baseline = averageSignals(baselineSamples);
    calibrationStartTime = 0;
    calibrationAttemptStartTime = 0;
    calibrationSamples = [];

    setStatus(fallback ? '校准完成：已用手机端容错基线' : '校准完成：转头控制方向');
    setDirectionText('居中');
    logDebug('校准完成', {
      fallback,
      yaw: Number(baseline.yaw.toFixed(3)),
      pitch: Number(baseline.pitch.toFixed(3))
    });
  }
}

  function loop(now) {
    if (!enabled) return;

    rafId = requestAnimationFrame(loop);

    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return;
    }

    if (now - lastPredictTime < getPredictIntervalMs()) {
      return;
    }

    lastPredictTime = now;

    const result = faceLandmarker.detectForVideo(video, now);
    const face = result.faceLandmarks?.[0];
    const matrix = result.facialTransformationMatrixes?.[0];

    if (!face) {
      // 不要清空 baseline。
      // 否则左转时一旦短暂丢脸，下一帧会把左转姿势重新校准成“居中”。
      lastDirection = null;

      if (!missingFaceSince) {
        missingFaceSince = now;
      }

      const missingMs = now - missingFaceSince;

      if (!baseline) {
        setStatus('未检测到人脸，请正对摄像头完成初始校准');
      } else if (missingMs < 800) {
        setStatus('人脸短暂丢失，保持原校准');
      } else {
        setStatus('未检测到人脸，请稍微转回一点');
      }

      setDirectionText(baseline ? '转回一点' : '无人脸');
      return;
    }

    lastFaceSeenTime = now;
    missingFaceSince = 0;

    const signal = readHeadSignal(face, matrix);

    if (!baseline) {
    handleCalibration(signal, now);
    return;
    }

    logSignal(signal, now, 'tracking');

    const direction = chooseDirection(signal, baseline);

    if (!direction) {
      lastDirection = null;
      setDirectionText('居中');
      return;
    }

    sendDirection(direction, now);
  }

function getMatrixData(matrix) {
  if (!matrix) return null;

  // 不同版本里 matrix 可能是对象，也可能直接接近数组结构。
  if (Array.isArray(matrix)) return matrix;
  if (matrix.data) return Array.from(matrix.data);

  return null;
}

function readHeadSignal(face, matrix) {
  // pitch 继续用原来的方式，因为你说上下问题不大。
  const nose = face[4];
  const leftCheek = face[234];
  const rightCheek = face[454];
  const forehead = face[10];
  const chin = face[152];

  const faceWidth = Math.max(0.001, Math.abs(rightCheek.x - leftCheek.x));
  const faceHeight = Math.max(0.001, Math.abs(chin.y - forehead.y));

  const centerX = (leftCheek.x + rightCheek.x) / 2;
  const centerY = (forehead.y + chin.y) / 2;

  // fallback：如果矩阵不可用，仍然用旧的鼻尖偏移。
  let yaw = (nose.x - centerX) / faceWidth;

  const matrixData = getMatrixData(matrix);
  if (matrixData && matrixData.length >= 16) {
    // MediaPipe 的 4x4 matrix 在底层通常按 column-major 表示。
    // 这里取 Y 轴旋转的近似 yaw。
    yaw = Math.atan2(matrixData[8], matrixData[10]);
  }

  return {
    yaw,
    pitch: (nose.y - centerY) / faceHeight
  };
}

function chooseDirection(signal, base) {
  const yawDelta = signal.yaw - base.yaw;
  const pitchDelta = signal.pitch - base.pitch;

  const yawScore = Math.abs(yawDelta) / CONFIG.yawThreshold;
  const pitchScore = Math.abs(pitchDelta) / getPitchThreshold();
  const verticalDominance = getVerticalDominance();

  if (yawScore < 1 && pitchScore < 1) {
    return null;
  }

  if (yawScore >= 1 && yawScore * verticalDominance >= pitchScore) {
    if (yawDelta > 0) {
      return CONFIG.swapLeftRight ? 'left' : 'right';
    }
    return CONFIG.swapLeftRight ? 'right' : 'left';
  }

  if (pitchScore < 1 || pitchScore < yawScore * verticalDominance) {
    return null;
  }

  return pitchDelta > 0 ? 'down' : 'up';
}

  function sendDirection(direction, now) {
    const game = getGame();
    const label = {
      up: '上',
      down: '下',
      left: '左',
      right: '右'
    }[direction];

    // 火柴人显示的是识别结果，不应该受蛇是否接受这次移动影响。
    setDirectionText(label);

    if (!game?.setDirection) {
      setStatus('当前贪吃蛇实例不可用');
      return;
    }

    if (direction === lastDirection && now - lastSendTime < CONFIG.repeatIntervalMs) {
      return;
    }

    const changed = game.setDirection(direction, 'camera');
    lastDirection = direction;
    lastSendTime = now;

    if (changed) {
      setDirectionText(label);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('snake-camera-toggle');
    const calibrateBtn = document.getElementById('snake-camera-calibrate');

    if (calibrateBtn && !document.getElementById('snake-camera-debug-toggle')) {
      const debugBtn = document.createElement('button');
      debugBtn.className = 'control-btn';
      debugBtn.id = 'snake-camera-debug-toggle';
      debugBtn.type = 'button';
      debugBtn.textContent = '调试';
      calibrateBtn.insertAdjacentElement('afterend', debugBtn);

      debugBtn.addEventListener('click', () => {
        const panel = ensureDebugPanel();
        const shouldOpen = !panel.classList.contains('active');

        debugForceOff = false;

        if (shouldOpen) {
          safeStorageSet(DEBUG_STORAGE_KEY, '1');
          logDebug('手动打开调试面板', {
            secure: window.isSecureContext,
            mobile: isMobileLike(),
            href: window.location.href
          });
          showDebugPanel();
        } else {
          safeStorageRemove(DEBUG_STORAGE_KEY);
          panel.classList.remove('active');
        }
      });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (enabled) stop();
        else start();
      });
    }

    if (calibrateBtn) {
      calibrateBtn.addEventListener('click', recalibrate);
    }

    if (isDebugEnabled()) {
      logDebug('页面加载', {
        secure: window.isSecureContext,
        mobile: isMobileLike(),
        userAgent: navigator.userAgent
      });
      showDebugPanel();
    }

    window.addEventListener('error', (event) => {
      logDebug('window error', event.message || formatError(event.error));
    });

    window.addEventListener('unhandledrejection', (event) => {
      logDebug('unhandled rejection', formatError(event.reason));
    });
  });

  window.snakeCameraControl = {
    start,
    stop,
    recalibrate
  };
})();
