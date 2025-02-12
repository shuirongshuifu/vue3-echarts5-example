<template>
  <div class="canvasWrap">
    <button @click="open">打开弹框</button>
  </div>
</template>

<script setup>
import { useDialog } from "@/command/dialogService/useDialog.js";
import { ElMessageBox } from "element-plus";

const { openDialog, closeDialog } = useDialog();

const open = () => {
  const comAttrs = {
    name: "孙悟空",
    age: 500,
    home: "花果山",
  };
  const dialogAttrs = {
    title: "弹框的title",
    width: 320,
    showClose: true,
    draggable: true,
    overflow: true,
    closeOnClickModal: false,
    beforeClose(done) {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
          closeDialog()
        })
        .catch(() => {
          // catch error
        });
    },
  };
  openDialog(comAttrs, dialogAttrs);
};
</script>

<style lang="less" scoped></style>
