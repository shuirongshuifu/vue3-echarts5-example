<template>
    <div class="boxWrap">
        <h3>分割线</h3>
        <Divider></Divider>
        <Divider content-position="left" border-style="dashed">分割线内容</Divider>
        <Divider content-position="right" border-style="dotted">分割线内容</Divider>
        <Divider border-style="inset">分割线内容</Divider>
        <Divider border-style="groove">分割线内容</Divider>
        <Divider border-style="ridge">分割线内容</Divider>
        <div>
            <span>Rain</span>
            <Divider direction="vertical" />
            <span>Home</span>
            <Divider direction="vertical" border-style="dashed" />
            <span>Grass</span>
        </div>
    </div>
</template>

<script setup>
// 使用自己移植过来的 divider 组件
import Divider from "../../ele/divider/divider.vue";
</script>

<style scoped>
.boxWrap {
    zoom: 2.4;
}
</style>