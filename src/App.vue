<template>
  <div class="apc">
    <div class="nav" v-show="!isMobile">
      <el-select class="mySelect" filterable v-model="vvv" placeholder="请选择" @change="changeRoute(vvv)">
        <el-option v-for="item in routes" :key="item.path" :label="item.name" :value="item.path" />
      </el-select>
      <div class="line"></div>
      <button :class="{ hl: $route.path == item.path }" v-for="(item, index) in routes" :key="index"
        @click="changeRoute(item.path)">
        {{ item.name }}
      </button>
    </div>
    <div class="rv">
      <router-view></router-view>
      <div class="op" @click="isMobile = !isMobile">
        {{ isMobile ? "显示" : "隐藏" }}菜单
      </div>
      <div class="op2" @click="jumpToGithub">
        <img :src="github" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { routes } from "./router/index";
import { IsPhone } from "./utils/index";
import { onMounted, ref } from "vue";
import github from "./assets/icon/github.png";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const vvv = ref("");
const route = useRoute();

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = IsPhone();
  vvv.value = route.path;
});

const jumpToGithub = () => {
  window.open("https://github.com/shuirongshuifu/vue3-echarts5-example");
};

const changeRoute = (path) => {
  router.push({
    path: path,
  });
  vvv.value = path;
};
</script>

<style scoped lang="less">
.apc {
  height: 100vh;
  width: 100%;
  display: flex;

  .nav {
    width: 180px;
    height: 98vh;
    box-sizing: border-box;
    border-right: 1px solid #e9e9e9;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .mySelect {
      position: fixed;
      top: 0;
      left: 0;
      width: 160px;
    }

    .line {
      width: 100%;
      height: 1px;
      background-color: #e9e9e9;
      margin-top: 36px;
    }

    button {
      margin: 3px 0;
      cursor: pointer;
      padding: 2px 1px;
      width: 150px;
      height: 36px;
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
    min-width: 720px;
    overflow-y: auto;

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
