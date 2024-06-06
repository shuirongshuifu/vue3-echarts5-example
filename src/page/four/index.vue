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
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'

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

/**
 * 需求：按住shift能够快速多勾选
 *      还要保留原来勾选的
 * */
const clickInfo = reactive({
    // 开始勾选的索引，初始没勾选为-1
    startRowIndex: -1,
    // 结束勾选的索引， 初始没勾选为-1
    endRowIndex: -1,
    // 是否按下shift键，初始没有摁下
    isShiftPressed: false
})

// 全选
const selectAllFn = (selection) => {
    multipleSelection.value = selection
}

// 单选
const selectFn = (selection, row) => {
    multipleSelection.value = selection
    // 获取当前点击的是第几行
    let i = tableData.value.findIndex((item) => item.id == row.id)
    // Shift按下逻辑
    if (clickInfo.isShiftPressed) {
        // 初始没勾选，就赋值开始勾选索引
        if (clickInfo.startRowIndex === -1) {
            clickInfo.startRowIndex = i
        }
        // 初始勾选了，说明是第二次勾选
        else {
            // 赋值索引
            clickInfo.endRowIndex = i
            // 执行把中间段的表格勾选上逻辑
            selectTable(clickInfo.startRowIndex, clickInfo.endRowIndex)
        }
    }
}

// 执行勾选逻辑
const selectTable = (startRowIndex, endRowIndex) => {
    // 第一次勾选后，紧接着再次勾选，有可能往前勾选，也有可能往后勾选，所以要做一个大小区分
    const startIndex = Math.min(startRowIndex, endRowIndex);
    const endIndex = Math.max(startRowIndex, endRowIndex);
    // 遍历去把中间段的勾选上
    tableData.value.forEach((rowData, rowIndex) => {
        // 若是中间项包含在已勾选的数组中去，就忽略之（这里我们用id为标识做区分）
        if (multipleSelection.value.some((msItem) => msItem.id == rowData.id)) { }
        // 若是不在勾选的数组中，在去看看要不勾选
        else {
            // 因为起始勾选和再次勾选的数据，已经保存到勾选数组中去了，所以不用管
            if (rowIndex > startIndex && rowIndex < endIndex) {
                // 只需把中间段的状态置为勾选，并丢到勾选数组中去就行了
                multipleTableRef.value.toggleRowSelection(rowData, rowIndex > startIndex && rowIndex < endIndex)
                multipleSelection.value.push(rowData)
            }
        }
    })
}

const onKeyDown = (e) => {
    if (e.key === 'Shift') {
        clickInfo.isShiftPressed = true;
    }
};

const onKeyUp = (e) => {
    if (e.key === 'Shift') {
        // 鼠标抬起，重置初始状态
        clickInfo.isShiftPressed = false;
        clickInfo.startRowIndex = -1
        clickInfo.endRowIndex = -1
    }
};

onMounted(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
});
</script>