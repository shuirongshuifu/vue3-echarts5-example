<template>
    <div id="xgPlayerWrap"></div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import Player, { Events } from 'xgplayer'; // 引入西瓜视频模块
import 'xgplayer/dist/index.min.css'; // 引入西瓜视频样式

import { conf } from "./conf"; // 配置文件单独拎出来

defineOptions({ name: 'MyVideo' })

onMounted(() => { init() })

let player = null // 实例

console.log('Events', Events);

const init = () => {
    player = new Player({
        ...conf
    });
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
