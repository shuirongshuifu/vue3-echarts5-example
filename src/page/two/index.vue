<template>
    <h2 v-for="i in 10" :key="i">吸顶效果</h2>
    <el-table v-stick="{
        calcDomClass: '.el-table',
        stickDomClass: '.el-table__header-wrapper',
        fixedName: 'fixedElTable'
    }" :data="tableData" border style="width: 100%" :header-cell-style="{ background: '#999', color: '#000' }">
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="age" label="年龄" width="180" />
        <el-table-column prop="home" label="家乡" />
    </el-table>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

interface row {
    name: String,
    age: Number,
    home: String
}
const tableData = ref([] as row[])

const initData = () => {
    for (let i = 0; i < 50; i++) {
        tableData.value.push({
            name: '孙悟空' + i,
            age: 500 + i,
            home: '花果山' + i
        })
    }
}
initData()

</script>

<style>
.kkk {
    width: calc();
}
</style>