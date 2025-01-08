<template>
  <div class="boxB">
    <h3>音频播放字幕同步出现——累计出现</h3>
    <audio ref="myAudioRef" @timeupdate="timeupdate" controls :src="mp3"></audio>
    <!-- 循环出字幕内容 -->
    <div v-if="displayedSubtitles.length">
      <p v-for="(subtitle, index) in displayedSubtitles" :key="index">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import mp3 from "./1.mp3";

const myAudioRef = ref();
const currentTime = ref();
const subtitles = ref(); // 所有字幕数据
const displayedSubtitles = ref([]); // 当前显示的所有字幕项

onMounted(() => {
  getVvtData();
});

const getVvtData = async () => {
  // 获取当前字幕文件的路径
  const vvtUrl = new URL("/subtitles/1.vvt", import.meta.url).href;
  // 使用fetch请求，此路径下的字幕文件
  const response = await fetch(vvtUrl);
  // 状态判断
  if (!response.ok) throw new Error("网络错误或文件不存在");
  // 拿到字幕数据转成的文本
  const vvtData = await response.text();
  // 使用正则将字幕文件加工成JSON格式
  subtitles.value = parseVvtData(vvtData);
};

// 解析字幕文件并将其转换为 JSON
const parseVvtData = (data) => {
  const subtitlePattern = /(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\s*([\s\S]+?)(?=\n\d{2}:\d{2}:\d{2}\.\d{3}|$)/g;
  let matches;
  const parsedSubtitles = [];
  while ((matches = subtitlePattern.exec(data)) !== null) {
    const start = convertTimeToSeconds(matches[1]);
    const end = convertTimeToSeconds(matches[2]);
    const text = matches[3].trim();
    parsedSubtitles.push({
      start,
      end,
      text,
    });
  }
  return parsedSubtitles;
};

// 将字幕时间从字符串"00:00:05.000" 格式转换为秒数数字
const convertTimeToSeconds = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(":");
  const [sec, ms] = seconds.split(".");
  return (
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(sec) + parseInt(ms) / 1000
  );
};

const timeupdate = (e) => {
  currentTime.value = e.target.currentTime;
  updateSubtitle(currentTime.value);
};

// 根据当前时间戳更新显示的字幕
const updateSubtitle = (curTime) => {
  // 找到当前时间点应该显示的字幕
  const newSubtitles = subtitles.value.filter(
    (sub) => curTime >= sub.start && curTime <= sub.end
  );
  // 找到了，就将其添加到displayedSubtitles数组中
  if (newSubtitles.length > 0) {
    // 但是因为timeupdate触发频繁，所以追加前，要看看这条字幕是否存在过
    newSubtitles.forEach((subtitle) => {
      // 不存在，才去往里面追加
      if (!displayedSubtitles.value.includes(subtitle.text)) {
        displayedSubtitles.value.push(subtitle.text);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.boxB {
  height: 540px;
  p {
    margin: 5px 0;
  }
}
</style>
