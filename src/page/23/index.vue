<template>
  <div class="box">
    <div class="fishWrap">
      <div class="bone" v-for="(info, index) in infoList" :style="info">
        <el-tag class="tag" effect="plain" size="small" type="primary" :style="info.childInfo.pos">{{
          info.childInfo.nodeName }}</el-tag>
        <div class="textList" :style="info.childInfo.pos2">
          <div class="text" :style="calStyle(index, ind)" @click="handleClick(info, index, txt, ind)" v-for="(txt, ind) in info.childInfo.txtArr">
            {{ txt.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const handleClick = (info, index, txt, ind) => {
  console.log("点击了", info, index, txt, ind);
};

const calStyle = (index, ind) => {
  if (index === 0 || index === 2) {
    return { paddingLeft: 24 * (ind + 1) + "px" };
  }
  if (index === 1 || index === 3) {
    return { textAlign: "right", paddingRight: 24 * (ind + 1) + "px" };
  }
};

const infoList = [
  {
    top: "49%",
    right: "0%",
    rotate: "225deg",
    childInfo: {
      pos: {
        right: "-20px",
        top: "-4px",
        rotate: "135deg",
      },
      pos2: {
        right: "8px",
        top: "8px",
        rotate: "135deg",
      },
      nodeName: "西游",
      txtArr: [
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
      ],
    },
  },
  {
    top: "49%",
    right: "20%",
    rotate: "135deg",
    childInfo: {
      pos: {
        right: "-20px",
        top: "-16px",
        rotate: "225deg",
      },
      pos2: {
        right: "-16px",
        top: "-75px",
        rotate: "225deg",
      },
      nodeName: "水浒",
      txtArr: [
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
      ],
    },
  },
  {
    top: "49%",
    right: "38%",
    rotate: "225deg",
    childInfo: {
      pos: {
        right: "-20px",
        top: "-4px",
        rotate: "135deg",
      },
      pos2: {
        right: "8px",
        top: "8px",
        rotate: "135deg",
      },
      nodeName: "三国",
      txtArr: [
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
      ],
    },
  },
  {
    top: "49%",
    right: "54%",
    rotate: "135deg",
    childInfo: {
      pos: {
        right: "-24px",
        top: "-12px",
        rotate: "225deg",
      },
      pos2: {
        right: "-16px",
        top: "-75px",
        rotate: "225deg",
      },
      nodeName: "红楼",
      txtArr: [
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
        {
          label: "点击选择亮点",
          value: "",
        },
      ],
    },
  },
];
</script>

<style lang="less" scoped>
.box {
  padding: 54px;
}

.fishWrap {
  position: relative;
  width: 600px;
  height: 240px;
  background-image: url("./assets/fish.png");
  background-repeat: no-repeat;
  // 背景图宽度为容器宽度，高度自适应
  background-size: 100% auto;
  // 背景图垂直和水平居中
  background-position: center;
  font-size: 13px;

  .bone {
    width: 160px;
    height: 1.5px;
    background-color: #409eff;
    position: absolute;
    /* 将旋转中心点设置为元素的最左侧中间位置 */
    transform-origin: left center;

    .tag {
      position: absolute;
    }

    .textList {
      width: 240px;
      position: absolute;
      top: 0;

      .text {
        text-decoration: underline;
        cursor: pointer;
        color: #f56c6c;
        margin-bottom: 4px;
      }

      .text:hover {
        color: #c66363;
      }
    }
  }
}
</style>
