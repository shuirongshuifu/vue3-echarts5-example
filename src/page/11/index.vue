<template>
    <div class="out">
        <h1>不可拖拽</h1>
        <MyVideo :disabledDrag="disabledDrag" />
        <br>
        <br>
        <el-switch v-model="disabledDrag" size="large" active-text="开启禁止拖拽功能" inactive-text="关闭禁止拖拽功能" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import MyVideo from "../../components/MyVideo/MyVideo.vue";

const disabledDrag = ref(true)

</script>

<style>
.out {
    width: 600px;
}
</style>