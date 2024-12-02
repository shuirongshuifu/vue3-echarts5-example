<template>
  <div class="canvasWrap">
    <canvas id="myCanvas" />
    <br /><br />
    <button @click="expressionFn">表情切换</button>
    <button @click="mouthFn">嘴型变换</button>
    <button @click="speakFn">人物说话</button>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/cubism4"; // 只需要 Cubism 4

// import audioFile from "@/assets/sounds/jp.wav";
import audioFile from "@/assets/sounds/jp2.wav";
// import audioFile from "@/assets/sounds/xiaosan.mp3";
// import audioFile from "@/assets/sounds/girlSing.mp3";

window.PIXI = PIXI; // 为了pixi-live2d-display内部调用

let app = null; // 为了存储pixi实例
let model = null; // 为了存储live2d实例
let audioContext = null; // 为了存储音频处理实例

onMounted(() => {
  init(); // 初始化
});

const init = async () => {
  // 创建音频处理实例
  audioContext = new AudioContext();
  // 创建PIXI实例
  app = new PIXI.Application({
    // 指定PixiJS渲染器使用的HTML <canvas> 元素
    view: document.querySelector("#myCanvas"),
    // 响应式设计
    resizeTo: document.querySelector("#myCanvas"),
    // 设置渲染器背景的透明度 0（完全透明）到1（完全不透明）
    backgroundAlpha: 0,
  });
  // 引入live2d模型文件
  model = await Live2DModel.from("/live2d/haru2/haru_greeter_t03.model3.json", {
    autoInteract: false, // 关闭眼睛自动跟随功能（默认为true）
    autoUpdate: true, // 开启人物自动变化（默认为true）
  });
  // 调整live2d模型文件缩放比例（文件过大，需要缩小）
  model.scale.set(0.12);
  // 调整x轴和y轴坐标使模型文件居中
  model.y = 0;
  model.x = -24;
  // 把模型添加到舞台上
  app.stage.addChild(model);

  // 点击人物事件，需autoInteract为true才能触发
  model.on("hit", (hitAreaNames) => {
    console.log("hitAreaNames", hitAreaNames);
  });
};

/**
 * model.expression(0); 执行第0个表情，expressions文件夹下的F01.exp3.json
 * model.expression('smile'); 按照名字来执行对应表情
 * model.expression(); 不传递参数就是随机执行表情
 *
 * 上述是简略写法，详细写法：
 * model.internalModel.motionManager.expressionManager.setRandomExpression();
 * */
const expressionFn = () => {
  model.expression();
};

const mouthFn = () => {
  let n = Math.random();
  console.log("随机数0~1控制嘴巴Y轴高度-->", n);
  model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", n);
};

const speakFn = async () => {
  // 请求加载一个音频文件
  const response = await fetch(audioFile);
  // 将音频读取为原始的二进制数据缓冲区（ArrayBuffer）。音频本身是二进制格式，要先将其加载为 ArrayBuffer 才能进一步处理
  const audioData = await response.arrayBuffer();
  // 将 ArrayBuffer 格式的音频数据解码成 AudioBuffer 对象，可以直接用于播放或处理音频数据。
  const audioBuffer = await audioContext.decodeAudioData(audioData);
  // 创建一个音频源节点（AudioBufferSourceNode），该节点用于播放音频数据
  const source = audioContext.createBufferSource();
  // 创建一个音频分析节点。这个节点用于实时分析音频数据，提供诸如频谱分析、波形分析等功能
  const analyser = audioContext.createAnalyser();
  // 将之前解码得到的 audioBuffer（即音频数据）赋值给 source 节点的 buffer 属性。这样就将加载的音频文件与 source 节点绑定，准备播放。
  source.buffer = audioBuffer;
  //  将 音频分析节点 连接到音频上下文的最终目标（即扬声器）
  analyser.connect(audioContext.destination);
  // 音频分析节点 将能够分析通过音频源流动的音频数据，并提供频谱或其他音频信息。
  source.connect(analyser);

  // 监听音频播放完毕
  let requestId = null;
  source.onended = function () {
    cancelAnimationFrame(requestId); // 清除请求动画帧
    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", 0); // 闭上嘴巴
  };
  /**
   * 启动音频源的播放，从头开始（这样的话，页面就能够听到声音了）
   * 接下来需要让人物嘴巴更新动弹，即有声音的同时，且能够说话
   * 即为：updateMouth函数
   * */
  source.start(0);

  /**
   * 这个 updateMouth 函数通过从 analyser 获取音频数据并计算音量，动态地更新一个模型的嘴巴张开程度。它的实现方式是每帧都更新一次，
   * 通过音频的音量强度来决定嘴巴的开合程度，从而实现与音频的实时互动。
   * */
  const updateMouth = () => {
    // analyser.frequencyBinCount 表示音频频谱的 bin（频率段）的数量。它是一个整数，表示从频率数据中可以获取多少个频率段的值
    // 使用 analyser 对象的 getByteFrequencyData 方法填充 dataArray 数组。
    // getByteFrequencyData 将音频的频率数据转化为 0-255 范围内的字节值，并存储在 dataArray 中。这个数据表示了音频信号在不同频率范围内的强度。
    // 该方法会将频谱分析的结果填充到 dataArray 数组中，每个元素代表一个频率段的音量强度。
    // 使用 reduce 方法计算 dataArray 数组的所有值的总和，并通过除以数组长度来求得平均值。这个平均值表示音频信号的总体“强度”或“音量”。
    // 这里的 a + b 累加所有音频频段的强度值，最终计算出一个平均值。
    // dataArray.length 是频率数据的总数，通常它等于 analyser.frequencyBinCount。
    // 将计算出的 volume 除以 50，以缩放它到一个合适的范围，得到一个表示“嘴巴张开程度”的值。volume 越大，mouthOpen 越大。
    // 使用 Math.min(1, volume / 50) 保证 mouthOpen 的值不会超过 1，也就是说嘴巴张开程度的最大值是 1。
    // 这意味着，如果音量足够大，mouthOpen 会接近 1，表示嘴巴完全张开；如果音量较小，mouthOpen 会接近 0，表示嘴巴几乎没张开。
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const mouthOpen = Math.min(1, volume / 50);

    // 通过调用 setParameterValueById 方法，将 mouthOpen 的值传递给 model 的内部模型（控制嘴巴大小张开幅度）
    model.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", mouthOpen);
    requestId = requestAnimationFrame(updateMouth);
  };

  requestId = requestAnimationFrame(updateMouth);
};

onBeforeUnmount(() => {
  model?.destroy();
  model = null;
  app?.destroy();
  app = null;
  audioContext?.close();
  audioContext = null;
});
</script>

<style lang="less" scoped>
#myCanvas {
  width: 240px;
  height: 360px;
}
button {
  margin: 0 12px;
}
</style>
