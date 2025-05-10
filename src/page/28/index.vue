<template>
  <div class="tenBox" ref="dragBoxWrap">
    <h3>拖拽元素示例</h3>
    <div class="emojiList">
      <div class="emojiItem" v-for="item in emojiList" :key="item.name">
        <div class="emojiItem-content">
          <div class="emojiItem-content-name">{{ item.name }}</div>
          <!-- draggable="true"开启元素可以拖拽，必须要加 -->
          <div class="emojiItem-content-emoji" draggable="true">{{ item.emoji }}</div>
        </div>
      </div>
    </div>
    <!-- 四个摆放盒子 -->
    <div class="boxList">
      <div class="boxItem" v-for="item in boxList" :key="item.name">
        <!-- 名字绝对定位 -->
        <div class="boxItem-content-name">{{ item.name }}</div>
        <div class="boxItem-content" :data-emoji="item.name" :draggable="item.emoji ? true : false">{{
          item.emoji }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emojiList = ref([
  {
    name: '微笑',
    emoji: '😊'
  },
  {
    name: '惊讶',
    emoji: '😲'
  },
  {
    name: '生气',
    emoji: '🤬'
  },
  {
    name: '尴尬',
    emoji: '😢'
  },
])

const boxList = ref([
  {
    name: '1',
    emoji: ''
  },
  {
    name: '2',
    emoji: ''
  },
  {
    name: '3',
    emoji: ''
  },
  {
    name: '4',
    emoji: ''
  }
])

const dragBoxWrap = ref(null)
const curDragEmoji = ref(null)

onMounted(() => {
  initDrag()
})

const initDrag = () => {

  dragBoxWrap.value.ondragstart = (e) => {
    // 获取当前拖拽的元素
    curDragEmoji.value = e.target
    // 设置拖拽效果
    e.dataTransfer.effectAllowed = "move";
  }

  dragBoxWrap.value.ondragover = (e) => {
    // 阻止默认行为，允许drop
    if (e.target.className === 'boxItem-content') {
      e.preventDefault()
    }
    // console.log(e.target.dataset.emoji)

    // let whichBox = Number(e.target?.dataset?.emoji)
    // if (whichBox) {
    //     if (boxList.value[whichBox - 1].emoji) {
    //         e.preventDefault()
    //         e.target.style.backgroundColor = 'red'
    //         return
    //     }
    // }
  }

  dragBoxWrap.value.ondrop = (e) => {
    // 下方添加的时候，首先判断是否有值，有值不允许添加 
    let whichBox = Number(e.target.dataset.emoji)
    if (boxList.value[whichBox - 1].emoji) {
      alert('已被占用')
      return
    }
    boxList.value[whichBox - 1].emoji = curDragEmoji.value.textContent

    // 上方删除
    // 方式一（不太建议）
    // curDragEmoji.value.textContent = ''
    // 方式二（不太建议）
    // curDragEmoji.value.remove()
    // 方式三（不太建议）
    // curDragEmoji.value.style.display = 'none'

    // 方式四（建议）
    let curDragEmojiContent = curDragEmoji.value.textContent
    let curDragEmojiIndex = emojiList.value.findIndex(item => item.emoji === curDragEmojiContent)
    emojiList.value[curDragEmojiIndex].emoji = ''
  }
}

</script>

<style>
.tenBox {
  width: 100%;
  height: 90vh;
  position: relative;
}

.emojiList {
  display: flex;
  flex-wrap: wrap;
}

.emojiItem {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emojiItem-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.emojiItem-content-name {
  font-size: 12px;
  color: #333;
}

.emojiItem-content-emoji {
  font-size: 36px;
  color: #333;
  cursor: move;
  user-select: none;
}

.boxList {
  display: flex;
  flex-wrap: wrap;
  margin-top: 54px;
}

.boxItem {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.boxItem-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.boxItem-content-name {
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>