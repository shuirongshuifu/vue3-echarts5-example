<template>
  <div class="boxWrap">
    <div class="main">
      <div class="down">
        <div class="leftTable" ref="dragBoxWrap">
          <div class="t1">
            <el-table :data="tableData1" border style="width: 100%">
              <el-table-column prop="type" label="类型" width="74" align="center" />
            </el-table>
          </div>
          <div class="t2">
            <el-table height="400" :data="tableData2" border style="width: 100%">
              <el-table-column prop="way" label="对应策略管理办法" align="center" />
            </el-table>
          </div>
          <div class="t3">
            <el-table :data="tableData3" border style="width: 100%; margin-left: 24px;">
              <el-table-column prop="way" label="可选策略" align="center" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";

const dragBoxWrap = ref(null); // 总拖拽dom

const tableData1 = ref([
  { type: 'A类' },
  { type: 'A类' },
  { type: 'A类' },
  { type: 'A类' },
  { type: 'B类' },
  { type: 'B类' },
  { type: 'B类' },
  { type: 'C类' },
  { type: 'C类' },
])

const tableData2 = ref([
  { way: '', },
  { way: '', },
  { way: '', },
  { way: '', },
  { way: '', },
  { way: '', },
  { way: '', },
  { way: '', },
  { way: '', },
])

const tableData3 = ref([
  { way: '投入更多时间' },
  { way: '投入更多金钱' },
  { way: '想办法提升效率' },
  { way: '想办法扩张规模' },
  { way: '招聘更加优秀的人才' },
  { way: '团队优化' },
  { way: '寻求咨询公司的指导建议' },
  { way: '求神问佛' },
  { way: '躺平摆烂' },
])

onMounted(() => {
  setTimeout(() => {
    initDarg();
  }, 500);
})

const curTd = ref(null); // 当前拖拽的td   

const initDarg = () => {
  // 允许t3的单元格被拖拽
  document.querySelectorAll('.t3 tbody tr').forEach((tr, index) => {
    tr.children[0].draggable = true;
    tr.children[0].dataset.index = index;
    tr.children[0].style.cursor = 'move';
  })
  // 允许t2的单元格被放置上去
  document.querySelectorAll('.t2 tbody tr').forEach((tr, index) => {
    tr.children[0].classList.add('flag');
    tr.children[0].dataset.index = index;
  })
  // 拖拽开始事件
  dragBoxWrap.value.ondragstart = (e) => {
    if (!e.target.innerText) {
      return;
    }
    // 改变样式
    e.dataTransfer.effectAllowed = "move";
    // 存一份
    curTd.value = e.target;
  }
  dragBoxWrap.value.ondragover = (e) => {
    // 允许元素被拖拽放上去
    if (
      e.target.classList.contains("flag")
    ) {
      e.preventDefault();
    }
  };
  dragBoxWrap.value.ondrop = (e) => {
    if (!curTd.value.innerText) {
      return;
    }
    // t2赋值
    tableData2.value[e.target.dataset.index].way = curTd.value.innerText;
    // t3清空值
    tableData3.value[curTd.value.dataset.index].way = null;
  }
}   
</script>

<style scoped lang="less">
.boxWrap {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;

  .star {
    position: absolute;
    writing-mode: vertical-lr;
    font-weight: 700;
    color: #2c5896;
    letter-spacing: 12px;
    font-size: 20px;
    left: 85px;
    top: 0;
    user-select: none;
  }

  .main {
    width: 850px;
    height: 558px;
    background-color: #fff;
    margin-left: 120px;
    text-align: center;
    padding: 0 15px;
    padding-top: 12px;

    .title {
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 24px;
      background-color: #589fd7;
      margin-bottom: 6px;
    }

    .up {
      text-align: left;
      font-size: 14px;

    }

    .down {
      display: flex;
      align-items: center;
      margin-top: 8px;
      width: 100%;

      .leftTable {
        width: 100%;
        display: flex;

        .t1 {
          width: 9%;
          position: relative;
          right: -6px;
          z-index: 111;
        }

        .t2 {
          width: 40%;
        }

        .t3 {
          width: 40%;
          margin-left: 36px;
        }
      }

      :deep(.el-table) {
        font-size: 13px;
        font-weight: 600;

        .el-table__header th {
          background-color: #3874c8 !important;
          color: #fff;
          font-size: 13px;
        }

        .el-table__header th:last-child {
          background-color: #3874c8 !important;
          color: #fff;
          font-size: 13px;
        }

        thead {
          font-size: 16px;
        }

        tr {
          height: 40px;
        }
      }
    }
  }
}
</style>