<template>
  <div>
    <button @click="downloadZipAndExtract">下载并提取压缩文件中的内容文件</button>
  </div>
</template>

<script setup>
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import axios from 'axios';

const URL = 'http://ashuai.work/api/getZip'

const downloadZipAndExtract = () => {
  // 发请求，获取zip压缩包
  axios.get(URL, { responseType: 'blob' })
    .then(async response => {
      const blob = response.data;

      // 实例化zip压缩包
      const zip = new JSZip();
      // 加载zip压缩包的内容
      await zip.loadAsync(blob);

      // 遍历zip压缩包中的内容
      zip.forEach((relativePath, file) => {
        // 不读文件夹，读取文件
        if (!file.dir) {
          // 读取文件
          file.async('blob').then(content => {
            // 使用FileReader 读取文件内容
            const reader = new FileReader();
            reader.onload = (e) => {
              console.log('文件内容------>', e.target.result);
            }
            reader.readAsText(content);
            // 保存文件
            saveAs(content, file.name);
          })
        }
      });
    })
    .catch(error => {
      console.error('下载失败', error);
    });
};
</script>