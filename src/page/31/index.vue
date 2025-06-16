<template>
  <div class="boxWrap">
    <h3>伪元素方式和伪类方式，实现星号高亮</h3>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item class="manualStar" label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item class="manualStar2" label="⚹ Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  name: '',
  region: '',
  delivery: false,
})
</script>

<style scoped lang="less">
.boxWrap {

  h3 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }

  // 伪元素方式
  :deep(.manualStar) {
    .el-form-item__label::before {
      content: "*";
      color: red;
      margin-right: 2px;
    }
  }

  // 伪类方式
  :deep(.manualStar2) {
    .el-form-item__label {
      display: inline-block;
    }

    .el-form-item__label::first-letter {
      color: red;
    }
  }
}
</style>