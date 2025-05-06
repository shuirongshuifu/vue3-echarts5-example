<template>
  <h2>
    <button @click="count = count + 10">点击按钮增加数字</button>
    <p>{{ Math.round(output) }}</p>
  </h2>
</template>

<script setup>
import { ref } from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";

const count = ref(0);
const output = useTransition(count, {
  duration: 1000,
  transition: TransitionPresets.easeOutExpo,
});

count.value = 50;
</script>
