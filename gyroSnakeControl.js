// gyroSnakeControl.js
// 手机端通过设备方向传感器控制贪吃蛇。不开启摄像头，不采集图像。

(() => {
  const CONFIG = {
    tiltThreshold: 12,
    axisDominance: 1.15,
    repeatIntervalMs: 220,
    sensorWaitMs: 1600
  };

  let enabled = false;
  let starting = false;
  let baseline = null;
  let latestAngles = null;
  let lastDirection = null;
  let lastSendTime = 0;
  let sensorWaitTimer = null;

  function isMobileLike() {
    return window.matchMedia?.('(pointer: coarse)')?.matches ||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  }

  function getGame() {
    return window.currentSnakeGame || null;
  }

  function setStatus(text) {
    const status = document.getElementById('snake-gyro-status');
    if (status) status.textContent = text;
  }

  function setButtonText(text) {
    const btn = document.getElementById('snake-gyro-toggle');
    if (btn) btn.textContent = text;
  }

  function getAngles(event) {
    if (typeof event.beta !== 'number' || typeof event.gamma !== 'number') {
      return null;
    }

    return {
      pitch: event.beta,
      roll: event.gamma
    };
  }

  async function requestMotionPermission() {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      const result = await DeviceOrientationEvent.requestPermission();
      if (result !== 'granted') {
        throw new Error('陀螺仪权限被拒绝');
      }
    }
  }

  async function start() {
    if (!isMobileLike()) {
      setStatus('陀螺仪控制仅用于手机端');
      return;
    }

    if (enabled || starting) {
      return;
    }

    if (!window.DeviceOrientationEvent) {
      setStatus('当前浏览器不支持陀螺仪');
      return;
    }

    starting = true;
    setButtonText('启动中...');
    setStatus('正在请求陀螺仪权限...');

    try {
      await requestMotionPermission();

      enabled = true;
      starting = false;
      baseline = null;
      latestAngles = null;
      lastDirection = null;
      lastSendTime = 0;

      window.addEventListener('deviceorientation', handleOrientation, true);

      setButtonText('关闭陀螺仪控制');
      setStatus('等待传感器数据，请保持手机自然握持');

      clearTimeout(sensorWaitTimer);
      sensorWaitTimer = window.setTimeout(() => {
        if (enabled && !latestAngles) {
          setStatus('未收到陀螺仪数据，请检查浏览器权限');
        }
      }, CONFIG.sensorWaitMs);
    } catch (err) {
      console.error('陀螺仪控制启动失败：', err);
      enabled = false;
      starting = false;
      setButtonText('开启陀螺仪控制');
      setStatus(err.message || '陀螺仪控制启动失败');
    }
  }

  function stop() {
    enabled = false;
    starting = false;
    baseline = null;
    latestAngles = null;
    lastDirection = null;

    clearTimeout(sensorWaitTimer);
    window.removeEventListener('deviceorientation', handleOrientation, true);

    setButtonText('开启陀螺仪控制');
    setStatus('陀螺仪控制未开启');
  }

  function recalibrate() {
    if (!enabled) {
      setStatus('先开启陀螺仪控制');
      return;
    }

    if (!latestAngles) {
      baseline = null;
      setStatus('等待传感器数据后自动校准');
      return;
    }

    baseline = { ...latestAngles };
    lastDirection = null;
    setStatus('已重新校准：当前姿势为居中');
  }

  function chooseDirection(angles) {
    if (!baseline) return null;

    const rollDelta = angles.roll - baseline.roll;
    const pitchDelta = angles.pitch - baseline.pitch;
    const absRoll = Math.abs(rollDelta);
    const absPitch = Math.abs(pitchDelta);

    if (absRoll < CONFIG.tiltThreshold && absPitch < CONFIG.tiltThreshold) {
      return null;
    }

    if (absRoll > absPitch * CONFIG.axisDominance) {
      return rollDelta > 0 ? 'right' : 'left';
    }

    return pitchDelta > 0 ? 'down' : 'up';
  }

  function handleOrientation(event) {
    if (!enabled) return;

    const angles = getAngles(event);
    if (!angles) return;

    latestAngles = angles;

    if (!baseline) {
      baseline = { ...angles };
      setStatus('已校准：倾斜手机控制方向');
      return;
    }

    const direction = chooseDirection(angles);
    if (!direction) {
      lastDirection = null;
      setStatus('方向：居中');
      return;
    }

    sendDirection(direction, performance.now());
  }

  function sendDirection(direction, now) {
    const labels = {
      up: '上',
      down: '下',
      left: '左',
      right: '右'
    };

    setStatus(`方向：${labels[direction]}`);

    if (direction === lastDirection && now - lastSendTime < CONFIG.repeatIntervalMs) {
      return;
    }

    const game = getGame();
    if (game?.setDirection) {
      game.setDirection(direction, 'gyro');
    }

    lastDirection = direction;
    lastSendTime = now;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const control = document.querySelector('.snake-gyro-control');

    if (!isMobileLike()) {
      if (control) control.style.display = 'none';
      return;
    }

    const toggleBtn = document.getElementById('snake-gyro-toggle');
    const calibrateBtn = document.getElementById('snake-gyro-calibrate');

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

  window.snakeGyroControl = {
    start,
    stop,
    recalibrate
  };
})();
