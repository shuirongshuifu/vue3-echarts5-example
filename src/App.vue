<template>
  <div class="apc">
    <div class="nav">
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
    </div>
  </div>
</template>

<script setup>
import { routes } from "./router/index";
</script>

<style scoped lang="less">
.apc {
  height: 100vh;
  width: 100%;
  display: flex;

  .nav {
    width: 72px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #e9e9e9;

    button {
      margin: 12px;
      cursor: pointer;
    }

    .hl {
      background-color: #baf;
    }
  }

  .rv {
    width: calc(100% - 72px);
    height: 100%;
    padding: 12px;
  }
}
</style>
