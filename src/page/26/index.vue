<template>
  <div class="wrap">
    <!-- 组件容器 -->
    <div class="comBox">
      <div class="box">
        <!-- <img class="boxItem" :draggable="false" v-for="item in pics" :key="item.name" :src="item.src" :alt="item.name"> -->
      </div>
      <img class="xCar" :draggable="false" :src="xCar" alt="xCar">
      <img class="xCar2" :draggable="false" :src="xCar2" alt="xCar2">
    </div>
  </div>
</template>

<script setup>
import xCar from './pics/xCar.png'
import xCar2 from './pics/xCar2.png'
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  padding: 72px;

  .comBox {
    width: 80%;
    height: 320px;
    position: relative;
    z-index: 1;

    .xCar {
      top: 0;
      left: 0;
      position: absolute;
      z-index: 8;
      width: 45px;
      height: 45px;
      animation: moveAround 20s linear infinite;
      transform-origin: center;
    }

    .xCar2 {
      top: calc(100% - 45px);
      left: calc(100% - 45px);
      position: absolute;
      z-index: 8;
      width: 45px;
      height: 45px;
      animation: moveAroundReverse 20s linear infinite;
      transform-origin: center;
    }

    .box {
      height: 320px;
      width: 100%;
      background: url('./pics/road.png');
      background-size: 100% 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      padding: 16px;
      position: relative;
      z-index: 2;

      .boxItem {
        width: 120px;
        height: 120px;
        object-fit: contain;
        position: relative;
        z-index: 9;

        &:nth-child(1) {
          margin: -40px 0 0 -40px;
          justify-self: start;
          align-self: start;
        }

        &:nth-child(2) {
          grid-column: 2;
          margin-top: -40px;
          justify-self: center;
          align-self: start;
        }

        &:nth-child(3) {
          grid-column: 3;
          margin: -40px -40px 0 0;
          justify-self: end;
          align-self: start;
        }

        &:nth-child(4) {
          grid-row: 2;
          grid-column: 1;
          margin: 0 0 -40px -40px;
          justify-self: start;
          align-self: end;
        }

        &:nth-child(5) {
          grid-row: 2;
          grid-column: 2;
          margin-bottom: -40px;
          justify-self: center;
          align-self: end;
        }

        &:nth-child(6) {
          grid-row: 2;
          grid-column: 3;
          margin: 0 -40px -40px 0;
          justify-self: end;
          align-self: end;
        }
      }
    }
  }
}

@keyframes moveAround {
  0% {
    top: 0;
    left: 0;
  }

  /* 接近右上角 */
  23% {
    top: 0;
    left: calc(100% - 72px);
  }

  /* 完成右上角转弯 */
  25% {
    top: 0;
    left: calc(100% - 72px);
  }

  /* 接近右下角 */
  48% {
    top: calc(100% - 72px);
    left: calc(100% - 72px);
  }

  /* 完成右下角转弯 */
  50% {
    top: calc(100% - 72px);
    left: calc(100% - 72px);
  }

  /* 接近左下角 */
  73% {
    top: calc(100% - 72px);
    left: 0;
  }

  /* 完成左下角转弯 */
  75% {
    top: calc(100% - 72px);
    left: 0;
  }

  /* 接近左上角 */
  98% {
    top: 0;
    left: 0;
  }

  /* 完成左上角转弯 */
  100% {
    top: 0;
    left: 0;
  }
}

@keyframes moveAroundReverse {
  0% {
    top: calc(100% - 45px);
    left: calc(100% - 45px);
  }

  /* 接近右上角 */
  23% {
    top: 0;
    left: calc(100% - 45px);
  }

  /* 完成右上角转弯 */
  25% {
    top: 0;
    left: calc(100% - 45px);
  }

  /* 接近左上角 */
  48% {
    top: 0;
    left: 0;
  }

  /* 完成左上角转弯 */
  50% {
    top: 0;
    left: 0;
  }

  /* 接近左下角 */
  73% {
    top: calc(100% - 45px);
    left: 0;
  }

  /* 完成左下角转弯 */
  75% {
    top: calc(100% - 45px);
    left: 0;
  }

  /* 接近右下角 */
  98% {
    top: calc(100% - 45px);
    left: calc(100% - 45px);
  }

  /* 完成右下角转弯 */
  100% {
    top: calc(100% - 45px);
    left: calc(100% - 45px);
  }
}
</style>
