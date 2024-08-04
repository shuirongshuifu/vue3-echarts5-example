<template>
    <div id="xgPlayerWrap"></div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue';
import Player, { Events } from 'xgplayer'; // 引入西瓜视频模块
import 'xgplayer/dist/index.min.css'; // 引入西瓜视频样式

import { conf } from "./conf"; // 配置文件单独拎出来

import { useCtrlDrag } from "@/hook/ctrlDrag";
const { onMonitor, offMonitor } = useCtrlDrag()

// 是否可以拖拽视频
const props = defineProps({
    disabledDrag: {
        type: Boolean,
        default: false
    }
})

watch(() => props.disabledDrag, (newVal) => {
    newVal ? onMonitor() : offMonitor()
})

defineOptions({ name: 'MyVideo' })

onMounted(() => { init() })

let player = null // 实例

console.log('Events', Events);

const init = () => {
    player = new Player({
        ...conf
    });

    props.disabledDrag ? onMonitor() : offMonitor()

    player.on(Events.PLAY, (ev) => {
        console.log('-播放开始-', ev);
    })
    player.on(Events.PAUSE, (ev) => {
        console.log('-播放结束-', ev);
    })
    player.on('loadedmetadata', (ev) => {
        console.log('-媒体数据加载好了-', ev);
    })
    player.on(Events.SEEKED, (ev) => {
        console.log('-跳着播放-', ev);
    })
    // 等各种监听事件
}
</script>

<style scoped>
#xgPlayerWrap {
    flex: auto;
}

#xgPlayerWrap video {
    width: 100%;
}
</style>
