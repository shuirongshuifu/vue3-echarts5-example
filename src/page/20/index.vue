<template>
  <div>
    <el-table
      class="myTable"
      ref="singleTableRef"
      :data="tableData"
      row-key="id"
      style="width: 100%"
      @select="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="Date" width="120">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="Name" width="120" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const singleTableRef = ref(null);

const selectChange = (selection) => {
  if (selection.length > 1) {
    // 1. 拿到选中数组中前一项的行数据
    const preRow = selection[0];
    // 2. 再把选中数组中的第一项（前一项）删除
    selection.splice(0, 1);
    // 3. 再根据前一项的数据去表格中取消选中对应的那一行
    singleTableRef.value.toggleRowSelection(preRow, false);
  }
  console.log("selection", selection[0]?.date);
};

const tableData = [
  {
    id: 1,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 5,
    date: "2016-05-05",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style lang="less" scoped>
::v-deep(.myTable) {
  thead {
    th:nth-child(1) {
      .cell {
        display: none;
      }
    }
  }
}
</style>
