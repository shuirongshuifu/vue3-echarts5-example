<template>
  <div class="boxWrap">
    <ContextMenu :menus="menus">
      <div class="box">
        我是box
      </div>
    </ContextMenu>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ContextMenu from "./ContextMenu.vue";

const menus = ref([
  {
    label: '新增',
    icon: 'Plus',
    onClick: (menu, e) => {
      console.log('新增', menu)
      console.log('新增', e)
    }
  },
  {
    label: '编辑',
    icon: 'Edit',
    onClick: (menu, e) => {
      console.log('编辑', menu)
      console.log('编辑', e)
    },
  },
  {
    label: '删除',
    icon: 'Delete',
    onClick: (menu, e) => {
      console.log('删除', menu)
      console.log('删除', e)
    },
    disabled: true
  }
])

onMounted(() => {
});
</script>

<style scoped>
.box {
  width: 100%;
  height: 120vh;
  background-color: #baf;
  position: relative;
}
</style>