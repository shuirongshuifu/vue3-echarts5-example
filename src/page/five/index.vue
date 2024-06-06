<template>
    <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @select="selectFn" @select-all="selectAllFn">
        <el-table-column type="selection" width="55" />
        <el-table-column label="Date" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column property="name" label="Name" width="120" />
        <el-table-column property="address" label="Address" show-overflow-tooltip />
    </el-table>
    <button @click="look">查看已勾选的</button>
</template>

<script setup>
import { ref } from 'vue'
import { useShiftQuickSelect } from "@/hook/useShiftQuickSelect.js";

const tableData = ref([
    {
        id: 1,
        date: '2016-05-01',
        name: '111',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        date: '2016-05-02',
        name: '222',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 3,
        date: '2016-05-03',
        name: '333',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 4,
        date: '2016-05-04',
        name: '444',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 5,
        date: '2016-05-05',
        name: '555',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 6,
        date: '2016-05-06',
        name: '666',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 7,
        date: '2016-05-07',
        name: '777',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 8,
        date: '2016-05-08',
        name: '888',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 9,
        date: '2016-05-09',
        name: '999',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 10,
        date: '2016-05-10',
        name: '100',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 11,
        date: '2016-05-11',
        name: '111',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 12,
        date: '2016-05-12',
        name: '122',
        address: 'No. 189, Grove St, Los Angeles',
    },
])

const multipleTableRef = ref()
const multipleSelection = ref([])

const look = () => {
    console.log('multipleSelection', multipleSelection.value);
}

// 全选
const selectAllFn = (selection) => {
    multipleSelection.value = selection
}

// 单选
const { ctr } = useShiftQuickSelect()
const selectFn = (selection, row) => {
    multipleSelection.value = selection
    // hook操作控制函数
    ctr(tableData.value, multipleSelection.value, multipleTableRef.value, row.id)
}

</script>