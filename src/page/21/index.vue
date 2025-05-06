<template>
  <div>
    <button ref="target" style="zoom: 3;">内部区域</button>
  </div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from "vue";

const target = ref(null)

onClickOutside(target, (event) => {
  console.log('点击外部区域', event)
})
</script>