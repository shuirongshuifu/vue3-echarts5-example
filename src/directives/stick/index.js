// 计算距离顶部高度的元素，如el-table就是表格最外层容器元素以class为例
let calcDom = null
// 需要吸顶的元素，如el-table需要吸顶的就是表头元素
let stickDom = null

// 这里以挂载元素#app为滚动容器，body或html也是一个意思
const scrollWrap = document.querySelector('#app')

export default {
    mounted(el, binding) {
        const { calcDomClass, stickDomClass } = binding.value
        if (!calcDomClass || !stickDomClass) throw Error('need calcDomClass stickDomClass!')
        calcDom = document.querySelector(calcDomClass)
        stickDom = document.querySelector(stickDomClass)
        setFixed()
    },
    unmounted(el, binding) {
        removeFixed()
    }
}

// 绑定监听滚动事件
const setFixed = () => {
    scrollWrap?.addEventListener('scroll', handle)
}

// 解绑监听滚动事件
const removeFixed = () => {
    scrollWrap?.removeEventListener('scroll', handle)
    calcDom = null
    stickDom = null
}

const handle = (e) => {
    let topDistance = calcDom?.getBoundingClientRect().top || 0
    // 距离小于等于0，不在可视区域内时，添加固定定位吸顶
    if (topDistance <= 0) {
        add(stickDom)
    }
    // 距离大于0，在可视区域内时，取消固定定位吸顶
    else {
        remove(stickDom)
    }
}

const add = (stickDom) => {
    if (stickDom) {
        if (stickDom.style.position != 'fixed') {
            stickDom.style.position = 'fixed'
            stickDom.style.top = 0
            stickDom.style.zIndex = 2023
        }
    }
}

const remove = (stickDom) => {
    if (stickDom) {
        if (stickDom.style.position == 'fixed') {
            stickDom.style.position = 'initial'
            stickDom.style.top = 'initial'
            stickDom.style.zIndex = 'initial'
        }
    }
}