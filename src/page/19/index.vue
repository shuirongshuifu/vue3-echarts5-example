<template>
  <div class="boxWrap">
    <div class="left">
      <typeA />
      <typeB />
    </div>
    <div class="right">
      <typeC />
    </div>
  </div>
</template>

<script setup>
import typeA from "./typeA.vue";
import typeB from "./typeB.vue";
import typeC from "./typeC.vue";
</script>

<style lang="less" scoped>
.boxWrap {
  display: flex;
  .left {
    width: 50%;
  }
  .right {
    width: 40%;
  }
}
</style>