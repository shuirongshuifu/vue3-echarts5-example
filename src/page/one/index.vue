<template>
    <div class="tenBox">
        <eCha :options="options" @click="jump" h="600px" />
        <el-button v-show="options.geo3D.map != '340000'" @click="changeMap('340000')" class="btn" type="success"
            size="small">&lt; &lt; 返回</el-button>
    </div>
</template>
  
<script setup>
import * as echarts from "echarts";
import "echarts-gl"; // 使用bar3D组件
import { reactive } from "vue";
import cloneDeep from 'lodash/cloneDeep'
import eCha from "@/components/eCha/index.vue";

import geoJson from "./map/340000.json";
echarts.registerMap('340000', geoJson);

const dict = {
    '安徽省': 340000,
    '合肥市': 340100,
    '芜湖市': 340200,
    '六安市': 341500
    // 等...
}

const options = reactive(
    {
        "renderer": "canvas", // canvas or svg
        "backgroundColor": "#333", // 优先于theme="dark"
        "tooltip": {
            "show": true,
            formatter(params) {
                let [Longitude, latitude, nums] = params.value
                let result =
                    "<div>" +
                    `<span style='font-weight: 700'>${params.seriesName}</span>` + '<br />' +
                    params.marker + '' + params.name + '<br />' +
                    '中心位置经度：' + Longitude + '<br />' +
                    '中心位置纬度：' + latitude + '<br />' +
                    '对应数量：' + nums + '人'
                "</div>"
                return result
            }
        },
        "geo3D": {
            // 注册需要使用的地图
            "map": "340000",
            // 地图每个区域的样式
            "itemStyle": {
                "color": "#007aff",
                "opacity": 0.8,
                "borderWidth": 2.4,
                "borderColor": "#fff"
            },
            // 视觉控制相关
            "viewControl": {
                "autoRotate": false,
                "autoRotateAfterStill": 3,
                "distance": 160,
                "minAlpha": 5,
                "maxAlpha": 90,
                "minBeta": -360,
                "maxBeta": 360000,
                "animation": true,
                "autoRotateSpeed": 3
            },
            // 鼠标悬浮强调相关
            "emphasis": {
                "label": {
                    "show": true,
                    "color": "#000",
                    "fontSize": 18
                },
                "itemStyle": {
                    "color": "#3CABFA"
                }
            },
            // 地图区域标题相关
            "label": {
                "show": true,
                "position": "bottom",
                "color": "#000",
                "fontSize": 14,
                "lineHeight": 18
            },
            // shading值为color时light配置无效
            "shading": "lambert",
            // "shading": "color", // 搭配regions使用
            "light": {
                "main": {
                    "intensity": 1,
                    "shadow": true,
                    "shadowQuality": "medium",
                    "alpha": 120,
                    "beta": 120
                },
                "ambient": {
                    "intensity": 0.6
                },
                "ambientCubemap": {
                    "diffuseIntensity": 66,
                    "specularIntensity": 97
                }
            },
            "top": -54,
            "left": 0,
            // "regions": [
            //     {
            //         "name": "合肥市",
            //         "itemStyle": {
            //             "color": "green"
            //         }
            //     },
            // ]
        },
        "series": [
            {
                "name": "城市人口",
                "type": "bar3D",
                "minHeight": 4.2, // 坑，需要大于0，否则最低的柱状图渲染会出问题
                "coordinateSystem": "geo3D",// 采用geo3D的坐标系统
                "barSize": 2.4, // 柱状图的粗细
                "shading": "lambert", // lambert比color看着更加真实
                "bevelSize": 0.72, // 长方体向圆柱的过渡效果
                "label": {
                    "show": true,
                    "distance": 0.36,
                    "color": "#333",
                    "fontWeight": "bold",
                    formatter(params) {
                        return params.value[2] + '人'
                    }
                },
                "data": [] // bar3D需要的数据
            }
        ],
        // 使用dataRange给Bar3D柱状图按照数值大小区间上颜色
        "dataRange": {
            "x": "left",
            "y": "bottom",
            "textStyle": {
                "color": "#fff"
            },
            "splitList": [
                {
                    "start": 76,
                    "label": "大于76",
                    "color": "#b80909"
                },
                {
                    "start": 51,
                    "end": 75,
                    "label": "51~75",
                    "color": "#e64546"
                },
                {
                    "start": 26,
                    "end": 50,
                    "label": "26~50",
                    "color": "#f57567"
                },
                {
                    "start": 0,
                    "end": 25,
                    "label": "0~25",
                    "color": "#ff9985"
                }
            ],
            "padding": [48, 0, 24, 18]
        }
    }
)

const jump = async (params) => {
    await changeMap(params.data.code, params.name) // 地图编码和地图名称
}

const changeMap = (mapCode, mapName) => {
    return new Promise((resolve, reject) => {
        import(`./map/${mapCode}.json`).then(data => { // echarts.registerMap(mapCode, { geoJSON: data.default, specialAreas: {} })
            echarts.registerMap(mapCode, data)
            options.geo3D.map = mapCode
            options.series[0].data = getBar3DData(data.default)
            resolve(true)
        }).catch((err) => {
            alert(`暂无【 ${mapName} 】地图数据,请自行下载`)
        })
    })
}

setTimeout(() => {
    console.log(options);
}, 1000);

const randomNum = () => Math.random().toFixed(1) * 90 + 10;
const getBar3DData = (mapData) => {
    const bar3DData = mapData.features.map((item) => {
        let centroidList = cloneDeep(item.properties.centroid)
        centroidList.push(randomNum()) // [{'经度坐标','纬度坐标','经纬度坐标定位的点的数值'},...]
        return {
            name: item.properties.name,
            value: centroidList,
            code: String(item.properties.adcode) // 地图编码是字符串类型的
        }
    })
    return bar3DData
}

options.series[0].data = getBar3DData(geoJson)

</script>

<style>
.tenBox {
    width: 100%;
    height: 90vh;
    position: relative;
}

.btn {
    position: absolute;
    top: 12px;
    left: 12px;
}
</style>