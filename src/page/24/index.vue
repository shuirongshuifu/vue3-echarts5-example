<template>
  <div>
    <h3>区分穿梭框的新增和删除逻辑</h3>
    <br />
    <el-transfer v-model="rightValue" :data="data" @change="change" :render-content="renderContent">
    </el-transfer>
  </div>
</template>

<script setup>
import { ref } from "vue";

// data是总数据，rightValue是选中的数据，会被自动分配到右侧的穿梭框中去
const data = ref([
  {
    key: "孙悟空",
    label: "孙悟空",
    disabled: false,
  },
  {
    key: "猪八戒",
    label: "猪八戒",
    disabled: false,
  },
  {
    key: "沙和尚",
    label: "沙和尚",
    disabled: false,
  },
  {
    key: "唐僧",
    label: "唐僧",
    disabled: false,
  },
  {
    key: "白龙马",
    label: "白龙马",
    disabled: false,
  },
]);
const rightValue = ref(['猪八戒', '唐僧']);

const change = (vvv, direction, movedKeys) => {
  if (direction === "right") {
    console.log("左往右穿梭——新增逻辑——穿梭过去的数据为：", vvv);
  } else {
    console.log("右往左穿梭——删除逻辑——穿梭过来的数据为：", movedKeys);
  }
  setTimeout(() => {
    rightValue.value = ['猪八戒', '唐僧']
  }, 1500);
};

const renderContent = (h, option) => {
  return h("span", null, `${option.key} -*_*-  ${option.label}`);
};
</script>
