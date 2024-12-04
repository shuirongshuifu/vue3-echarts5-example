<template>
  <div>
    <h1>live2d-render</h1>
    <button @click="ccc">表情切换</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import * as live2d from "live2d-render"; // 引入插件

onMounted(() => {
  init();
});

const init = async () => {
  await live2d.initializeLive2D({
    // live2d 所在区域的背景颜色
    BackgroundRGBA: [0.0, 0.0, 0.0, 0.0],

    // live2d 的 model3.json 文件的相对 根目录 的路径
    // ResourcesPath: "/live2d/Haru/Haru.model3.json", // 成熟御姐
    // ResourcesPath: "/live2d/Hiyori/Hiyori.model3.json", // 可爱萝莉
    ResourcesPath: "/live2d/Mao/Mao.model3.json", // 魔法女巫
    // ResourcesPath: "/live2d/Mark/Mark.model3.json", // 大眼睛呆萌男孩
    // ResourcesPath: "/live2d/Natori/Natori.model3.json", // 高挑帅气西装男
    // ResourcesPath: "/live2d/Rice/Rice.model3.json", // 白裙水手服女
    // ResourcesPath: "/live2d/Wanko/Wanko.model3.json", // 碗里面有小狗

    // live2d 的大小
    CanvasSize: {
      height: 600,
      width: 400,
    },

    // 展示工具箱（可以控制 live2d 的展出隐藏，使用特定表情）
    ShowToolBox: false,

    // 是否使用 indexDB 进行缓存优化，这样下一次载入就不会再发起网络请求了
    LoadFromCache: true,
  });
};

const ccc = () => {
  live2d.setRandomExpression();
};
</script>
