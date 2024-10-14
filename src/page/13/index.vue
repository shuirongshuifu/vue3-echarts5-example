<template>
  <div class="treeWrap">
    <div class="tree1">
      <!-- js修改方式 -->
      <el-tree
        class="myTree1"
        style="max-width: 600px"
        :data="data"
        :props="defaultProps"
        @node-expand="expand"
        @node-collapse="collapse"
      />
    </div>
    <div class="tree2">
      <!-- css隐藏+伪元素 -->
      <el-tree
        class="myTree2"
        style="max-width: 600px"
        :data="data"
        :props="defaultProps"
      />
    </div>
    <div class="tree3">
      <!-- css隐藏+背景图 -->
      <el-tree
        class="myTree3"
        style="max-width: 600px"
        :data="data"
        :props="defaultProps"
      />
    </div>
    <div class="tree4">
      <!-- 官方api icon字符串时值为饿了么图标的组件里面的图标名 -->
      <el-tree
        icon="DArrowRight"
        class="myTree4"
        style="max-width: 600px"
        :data="data"
        :props="defaultProps"
      />
    </div>
    <!-- 官方api 组件方式更加可拓展-->
    <el-tree
      :icon="arrow"
      class="myTree5"
      style="max-width: 600px"
      :data="data"
      :props="defaultProps"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from "vue";
import arrow from "./arrow.vue";

onMounted(() => {
  changeTreeIcon();
});

const changeTreeIcon = () => {
  nextTick(() => {
    let treeIcons = document.querySelectorAll(".tree1 .el-tree-node__expand-icon");
    treeIcons.forEach((icon) => {
      icon.innerHTML = "➡️";
    });
  });
};

const expand = () => {
  changeTreeIcon();
};
const collapse = () => {
  changeTreeIcon();
};

const data = [
  {
    label: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        children: [
          {
            label: "Level three 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        children: [
          {
            label: "Level three 2-1-1",
          },
        ],
      },
      {
        label: "Level two 2-2",
        children: [
          {
            label: "Level three 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        children: [
          {
            label: "Level three 3-1-1",
          },
        ],
      },
      {
        label: "Level two 3-2",
        children: [
          {
            label: "Level three 3-2-1",
          },
        ],
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};
</script>

<style scoped lang="less">
.treeWrap {
  width: 600px;
  zoom: 1.5;
}
:deep(.myTree2) {
  .el-tree-node__expand-icon svg {
    display: none;
  }
  .el-tree-node__expand-icon {
    position: relative;
  }
  .el-tree-node__expand-icon::before {
    content: ">>";
    color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
:deep(.myTree3) {
  .el-tree-node__expand-icon svg {
    display: none;
  }
  .el-tree-node__expand-icon {
    background-image: url("./arrow.png");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
