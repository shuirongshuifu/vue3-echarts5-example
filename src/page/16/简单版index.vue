<template>
  <div class="canvasWrap">
    <canvas id="myCanvas" />
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/cubism4"; // 只需要 Cubism 4

window.PIXI = PIXI; // 为了pixi-live2d-display内部调用

let app; // 为了存储pixi实例
let model; // 为了存储live2d实例

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  app = null;
  model = null;
});

const init = async () => {
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
  model = await Live2DModel.from("/live2d/Haru/Haru.model3.json", {
    autoInteract: false, // 关闭眼睛自动跟随功能
  });
  // 调整live2d模型文件缩放比例（文件过大，需要缩小）
  model.scale.set(0.12);
  // 调整x轴和y轴坐标使模型文件居中
  model.y = 0;
  model.x = -24;
  // 把模型添加到舞台上
  app.stage.addChild(model);
};
</script>

<style lang="less" scoped>
#myCanvas {
  width: 240px;
  height: 360px;
}
</style>
