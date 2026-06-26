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
    repeatIntervalMs: 220,

    // yaw 现在用人脸矩阵，单位近似是弧度。0.18 约等于 10 度。
    yawThreshold: 0.18,

    // pitch 仍然沿用鼻尖/额头/下巴的相对位置。
    pitchThreshold: 0.06,

    swapLeftRight: true,

    // 校准需要稳定正脸，不再第一帧就完成。
    calibrationDurationMs: 800,
    calibrationMinSamples: 5,

    // 校准阶段允许的“偏头范围”。太小会难校准，太大又会把偏头当正脸。
    calibrationMaxYaw: 0.35,
    calibrationMaxPitch: 0.16
    };

  let faceLandmarker = null;
  let loadingPromise = null;

  let enabled = false;
  let stream = null;
  let rafId = null;
  let video = null;

let lastPredictTime = 0;
let lastSendTime = 0;
let lastDirection = null;
let baseline = null;
let lastFaceSeenTime = 0;
let missingFaceSince = 0;

let calibrationStartTime = 0;
let calibrationSamples = [];

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
  }

  function setButtonText(text) {
    const btn = document.getElementById('snake-camera-toggle');
    if (btn) btn.textContent = text;
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
          throw err;
        });
    }

    return loadingPromise;
  }

  async function start() {
    const game = getGame();

    if (!game) {
      setStatus('请先进入贪吃蛇游戏');
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('当前浏览器不支持摄像头 API');
      return;
    }

    try {
      setButtonText('加载中...');
      setStatus('正在加载人脸识别模型...');

      faceLandmarker = await loadModel();

      setStatus('正在请求摄像头权限...');

      video = document.getElementById('snake-camera-video');

      stream = await navigator.mediaDevices.getUserMedia({
        video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: 'user'
        },
        audio: false
      });

      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();

        enabled = true;
        lastPredictTime = 0;
        lastSendTime = 0;

        beginCalibration('请正对摄像头，保持 1 秒完成校准');

      document.getElementById('snake-camera-preview')?.classList.add('active');

      setButtonText('关闭摄像头控制');

      loop(performance.now());
    } catch (err) {
      console.error('摄像头控制启动失败：', err);
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
    }
  }

  function stop() {
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
  if (!enabled) {
    setStatus('先开启摄像头控制');
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
  calibrationSamples = [];

  setStatus(statusText);
  setDirectionText('校准中');
}

function getCalibrationHint(signal) {
  const yawAbs = Math.abs(signal.yaw);
  const pitchAbs = Math.abs(signal.pitch);

  if (yawAbs <= CONFIG.calibrationMaxYaw && pitchAbs <= CONFIG.calibrationMaxPitch) {
    return {
      centered: true,
      label: '正脸'
    };
  }

  if (yawAbs > pitchAbs * 1.15) {
    if (signal.yaw > 0) {
      return {
        centered: false,
        label: CONFIG.swapLeftRight ? '左' : '右'
      };
    }

    return {
      centered: false,
      label: CONFIG.swapLeftRight ? '右' : '左'
    };
  }

  return {
    centered: false,
    label: signal.pitch > 0 ? '下' : '上'
  };
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
  const hint = getCalibrationHint(signal);

  if (!hint.centered) {
    calibrationStartTime = 0;
    calibrationSamples = [];

    setStatus(`请回正后保持，当前偏${hint.label}`);
    setDirectionText(`偏${hint.label}`);
    return;
  }

  if (!calibrationStartTime) {
    calibrationStartTime = now;
    calibrationSamples = [];
  }

  calibrationSamples.push(signal);

  const elapsed = now - calibrationStartTime;
  const progress = Math.min(100, Math.round((elapsed / CONFIG.calibrationDurationMs) * 100));

  setStatus(`校准中：请保持正脸 ${progress}%`);
  setDirectionText('正脸');

  if (elapsed >= CONFIG.calibrationDurationMs && calibrationSamples.length >= CONFIG.calibrationMinSamples) {
    baseline = averageSignals(calibrationSamples);
    calibrationStartTime = 0;
    calibrationSamples = [];

    setStatus('校准完成：转头控制方向');
    setDirectionText('居中');
  }
}

  function loop(now) {
    if (!enabled) return;

    rafId = requestAnimationFrame(loop);

    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return;
    }

    if (now - lastPredictTime < CONFIG.predictIntervalMs) {
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
  const pitchScore = Math.abs(pitchDelta) / CONFIG.pitchThreshold;

  if (yawScore < 1 && pitchScore < 1) {
    return null;
  }

  if (yawScore > pitchScore * 1.15) {
    if (yawDelta > 0) {
      return CONFIG.swapLeftRight ? 'left' : 'right';
    }
    return CONFIG.swapLeftRight ? 'right' : 'left';
  }

  return pitchDelta > 0 ? 'down' : 'up';
}

  function sendDirection(direction, now) {
    const game = getGame();

    if (!game?.setDirection) {
      setStatus('当前贪吃蛇实例不可用');
      return;
    }

    if (direction === lastDirection && now - lastSendTime < CONFIG.repeatIntervalMs) {
      return;
    }

    const changed = game.setDirection(direction, 'camera');

    if (changed) {
      lastDirection = direction;
      lastSendTime = now;

      const label = {
        up: '上',
        down: '下',
        left: '左',
        right: '右'
      }[direction];

      setDirectionText(label);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('snake-camera-toggle');
    const calibrateBtn = document.getElementById('snake-camera-calibrate');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (enabled) stop();
        else start();
      });
    }

    if (calibrateBtn) {
      calibrateBtn.addEventListener('click', recalibrate);
    }
  });

  window.snakeCameraControl = {
    start,
    stop,
    recalibrate
  };
})();