<template>
    <div ref="eChaDom" :style="{ height: h }" />
</template>
  
<script setup>
import { watch, onMounted, onBeforeUnmount, shallowRef, defineEmits } from "vue";
import * as echarts from "echarts";
import debounce from 'lodash/debounce'

// [@vue/compiler-sfc] `defineEmits` is a compiler macro and no longer needs to be imported.
const emit = defineEmits(["click"])

const props = defineProps({
    h: {
        type: String,
        default: '360px'
    },
    options: {
        type: Object,
        default: () => ({})
    },
    theme: {
        type: String,
        default: 'dark'
    }
})
const eChaDom = shallowRef(null);
const chart = shallowRef(null)
const init = () => {
    chart.value = echarts.init(eChaDom.value, props.theme)
    chart.value.setOption(props.options);
    chart.value.on('click', function (params) {
        emit("click", params)
    });
    window.addEventListener('resize', debounce(resizeFn, 360))
}
const resizeFn = () => {
    chart.value.resize()
}

onMounted(() => {
    init()
})

watch(
    () => props.options,
    (newOptions) => {
        chart.value.clear()
        chart.value.setOption(newOptions);
    },
    { deep: true }
)

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeFn)
})
</script>