<template>
    <div class="box1">
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

const handleKeyDown = (rowIndex, colIndex, event) => {
    const key = event.key;
    let nextRow = rowIndex;
    let nextCol = colIndex;

    if (key === "ArrowUp") {
        nextRow = Math.max(0, rowIndex - 1);
    } else if (key === "ArrowDown") {
        nextRow = Math.min(tableData.value.length - 1, rowIndex + 1);
    } else if (key === "ArrowLeft") {
        nextCol = Math.max(0, colIndex - 1);
    } else if (key === "ArrowRight") {
        nextCol = Math.min(3, colIndex + 1);
    } else {
        return;
    }

    event.preventDefault();

    // 获取下一个输入框并聚焦和选中文本
    const nextInput = document.querySelectorAll(".box1 .el-input__inner")[nextRow * 4 + nextCol];
    if (nextInput) {
        nextInput.focus();
        nextInput.select();
    }
};
</script>
