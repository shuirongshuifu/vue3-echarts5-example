<template>
  <div class="boxWrap">
    <h3>tab标签刷新页面，保留当前tab停留的状态页</h3>
    <br>
    <el-tabs v-model="activeName" @tab-change="tabChange">
      <el-tab-pane label="first" name="first">first</el-tab-pane>
      <el-tab-pane label="second" name="second">second</el-tab-pane>
      <el-tab-pane label="third" name="third">third</el-tab-pane>
      <el-tab-pane label="fourth" name="fourth">fourth</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const query = route.query;

// 默认第一个tab页
const activeName = ref("first");

onMounted(() => {
  /**
   * 页面加载时，检查query参数中的tab值，如果有，则设置activeName为该值
   * */
  if (query.tab) {
    activeName.value = query.tab;
  }
});

const tabChange = (tabName) => {
  /**
   * 保留原本的query参数同时，再拼接tab参数，这样刷新页面后，仍然可以保持在当前tab页
   * */
  router.replace({ query: { ...query, tab: tabName } });
};
</script>