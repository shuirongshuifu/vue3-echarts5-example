<template>
  <div class="apc">
    <div class="nav" v-show="!isMobile">
      <button
        :class="{ hl: $route.path == item.path }"
        v-for="(item, index) in routes"
        :key="index"
        @click="
          $router.push({
            path: item.path,
          })
        "
      >
        {{ item.name }}
      </button>
    </div>
    <div class="rv">
      <router-view></router-view>
      <div class="op" @click="isMobile = !isMobile">
        {{ isMobile ? "显示" : "隐藏" }}菜单
      </div>
    </div>
  </div>
</template>

<script setup>
import { routes } from "./router/index";
import { IsPhone } from "./utils/index";
import { onMounted, ref } from "vue";

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
    width: 150px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e9e9e9;

    button {
      margin: 6px;
      cursor: pointer;
      padding: 2px;
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
  }
}
</style>
