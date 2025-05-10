<template>
    <div class="box3">
        <el-table :data="tableData" border style="width: 400px">
            <el-table-column width="72px" prop="time" label="时间" align="center">
            </el-table-column>
            <el-table-column prop="dazhong" label="大众">
                <template #default="scope">
                    <el-input @keydown="handleKeyDown(scope.$index, 0, $event)"
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')" maxlength="3"
                        v-model.trim="scope.row.dazhong" />
                </template>
            </el-table-column>
            <el-table-column prop="tongyong" label="通用">
                <template #default="scope">
                    <el-input @keydown="handleKeyDown(scope.$index, 1, $event)"
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')" maxlength="3"
                        v-model.trim="scope.row.tongyong" />
                </template>
            </el-table-column>
            <el-table-column prop="jipu" label="吉普">
                <template #default="scope">
                    <el-input @keydown="handleKeyDown(scope.$index, 2, $event)"
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')" maxlength="3" v-model.trim="scope.row.jipu" />
                </template>
            </el-table-column>
            <el-table-column prop="fengtian" label="丰田">
                <template #default="scope">
                    <el-input @keydown="handleKeyDown(scope.$index, 3, $event)"
                        oninput="value=value.replace(/^\.+|[^\d.]/g,'')" maxlength="3"
                        v-model.trim="scope.row.fengtian" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref } from "vue";

const tableData = ref([
    {
        time: "第一组",
        dazhong: 1,
        tongyong: 2,
        jipu: 3,
        fengtian: 4,
    },
    {
        time: "第二组",
        dazhong: 5,
        tongyong: 6,
        jipu: 7,
        fengtian: 8,
    },
    {
        time: "第三组",
        dazhong: 9,
        tongyong: 10,
        jipu: 11,
        fengtian: 12,
    },
    {
        time: "第四组",
        dazhong: 13,
        tongyong: 14,
        jipu: 15,
        fengtian: 16,
    },
]);

const columnCount = 4;

const handleKeyDown = (rowIndex, colIndex, event) => {
    const key = event.key;
    let nextRow = rowIndex;
    let nextCol = colIndex;

    if (key === "ArrowUp") {
        if (rowIndex === 0) {
            nextRow = tableData.value.length - 1;
        } else {
            nextRow = rowIndex - 1;
        }
    } else if (key === "ArrowDown") {
        if (rowIndex === tableData.value.length - 1) {
            nextRow = 0;
        } else {
            nextRow = rowIndex + 1;
        }
    } else if (key === "ArrowLeft") {
        if (colIndex === 0) {
            nextRow = rowIndex === 0 ? tableData.value.length - 1 : rowIndex - 1;
            nextCol = columnCount - 1;
        } else {
            nextCol = colIndex - 1;
        }
    } else if (key === "ArrowRight") {
        if (colIndex === columnCount - 1) {
            nextRow = rowIndex === tableData.value.length - 1 ? 0 : rowIndex + 1;
            nextCol = 0;
        } else {
            nextCol = colIndex + 1;
        }
    } else {
        return;
    }

    event.preventDefault();

    const nextInput = document.querySelectorAll(".box3 .el-input__inner")[
        nextRow * columnCount + nextCol
    ];
    if (nextInput) {
        nextInput.focus();
        nextInput.select();
    }
};
</script>