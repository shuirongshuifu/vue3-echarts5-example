<template>
    <h2 v-for="i in 10" :key="i">吸顶效果{{ i }}</h2>
    <div class="useForCalc">
        <h1 class="useForStick" v-stick="{
            calcDomClass: '.useForCalc',
            stickDomClass: '.useForStick',
            fixedName: 'fixedH1Dom',
            zInd: 10000
        }">--------吸顶元素-------- <button @click="showLevel">吸顶时点击</button> </h1>
    </div>
    <h2 v-for="i in 40" :key="i">吸顶效果{{ i }}</h2>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const showLevel = () => {
    ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
        offset: 28
    })
}

</script>

<style>
h1 {
    width: 480px;
    background-color: #999;
    display: flex;
}
button {
    padding: 6px 12px;
}
</style>