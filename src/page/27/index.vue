<template>
  <div>
    <div
      :class="['item', 'item' + index, activeClass[index]]"
      @click="clc(item, index)"
      v-for="(item, index) in arr"
      :key="index"
    >
      {{ item.name }} - {{ item.age }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const arr = ref([
  { name: "Tom", age: 18 },
  { name: "Jerry", age: 20 },
  { name: "Jack", age: 22 },
]);

// 用来存储每个 item 的动画状态
const activeClass = ref([]);

setTimeout(() => {
  console.log("activeClass", activeClass.value);
}, 1000);

const clc = (item, index) => {
  document.querySelector(".item" + index).addEventListener(
    "animationend",
    () => {
      activeClass.value = activeClass.value.map(() => "");
    },
    { once: true }
  );

  // 清空所有元素的动画状态
  activeClass.value = activeClass.value.map(() => "");

  // 给点击的元素添加动画状态
  activeClass.value[index] = "animate";
};
</script>

<style lang="less" scoped>
.item {
  border: 1px solid #f00;
  width: 100px;
  margin: 36px;
  cursor: pointer;
}

/* 动画类，触发动画 */
.animate {
  animation: donghua 2s 1;
}

@keyframes donghua {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 #589fd7;
  }

  100% {
    transform: scale(1.2);
    box-shadow: 0 0 0 12px rgba(204, 73, 152, 0%);
  }
}
</style>
