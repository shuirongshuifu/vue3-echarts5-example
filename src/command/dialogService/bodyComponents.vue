<template>
  <div class="dialogBox">
    <div>传递的参数：</div>
    <pre>
        {{ comAttrs }}
      </pre
    >
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  comAttrs: {
    type: Object,
    default: () => {},
  },
});

onMounted(() => {
  console.log("onMounted");
});

onBeforeUnmount(() => {
  console.log("onBeforeUnmount");
});
</script>

<style lang="less" scoped>
pre {
  /* pre宽度不够换行 */
  word-wrap: break-word;
  white-space: pre-wrap;
  /* 加点行高，防止太挤了 */
  line-height: 42px;
}
</style>
