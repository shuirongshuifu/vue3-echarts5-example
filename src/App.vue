<template>
  <div class="apc">
    <div class="nav" v-show="!isMobile">
      <button :class="{ hl: $route.path == item.path }" v-for="(item, index) in routes" :key="index" @click="
        $router.push({
          path: item.path,
        })
        ">
        {{ item.name }}
      </button>
    </div>
    <div class="rv">
      <router-view></router-view>
      <div class="op" @click="isMobile = !isMobile">
        {{ isMobile ? "显示" : "隐藏" }}菜单
      </div>
      <div class="op2" @click="window.open('https://github.com/shuirongshuifu/vue3-echarts5-example')">
        <img :src="github">
      </div>
    </div>
  </div>
</template>

<script setup>
import { routes } from "./router/index";
import { IsPhone } from "./utils/index";
import { onMounted, ref } from "vue";
import github from "./assets/icon/github.png";

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = IsPhone();
});
</script>

<style scoped lang="less">
.apc {
  height: 100vh;
  width: 100%;
  display: flex;

  .nav {
    width: 260px;
    height: 98vh;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    border-right: 1px solid #e9e9e9;
    flex-direction: column;

    button {
      margin: 4px;
      cursor: pointer;
      padding: 2px;
      width: 120px;
      height: 36px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hl {
      background-color: #baf;
    }
  }

  .rv {
    flex: 1;
    height: 100%;
    padding: 12px;
    position: relative;

    .op {
      position: absolute;
      top: 0;
      right: 0;
      user-select: none;
      cursor: pointer;
      font-size: 13px;
    }

    .op2 {
      position: absolute;
      top: 28px;
      right: 12px;
      user-select: none;
      cursor: pointer;
      font-size: 13px;

      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        box-shadow: 0 0 5px #ccc;
        animation: rotate 60s linear infinite;
        transition: all 0.3s;
      }

      img:hover {
        animation-play-state: paused;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
