import './index.css'

// 计算距离顶部高度的元素，如el-table就是表格最外层容器元素以class为例
let calcDom = null
// 需要吸顶的元素，如el-table需要吸顶的就是表头元素
let stickDom = null
// 指定吸顶固定定位的样式类名
let className = ''
// 指定默认层级，防止层级太高遮挡住别的层
let zIndex = 1000

export default {
    mounted(el, binding) {
        const { calcDomClass, stickDomClass, fixedName, zInd } = binding.value
        if (!calcDomClass || !stickDomClass || !fixedName) throw Error('need >= 3 params')
        calcDom = document.querySelector(calcDomClass)
        stickDom = document.querySelector(stickDomClass)
        className = fixedName
        zInd ? zIndex = zInd : null
        setFixed()
    },
    unmounted(el, binding) {
        removeFixed()
    }
}

// 绑定监听滚动事件
const setFixed = () => {
    // 这里以挂载元素#app为滚动容器，body或html也是一个意思
    const scrollWrap = document.querySelector('#app')
    scrollWrap?.addEventListener('scroll', handle)
}

// 解绑监听滚动事件
const removeFixed = () => {
    // 这里以挂载元素#app为滚动容器，body或html也是一个意思
    const scrollWrap = document.querySelector('#app')
    scrollWrap?.removeEventListener('scroll', handle)
    calcDom = null
    stickDom = null
    className = ''
    zIndex = 1000
}

const handle = (e) => {
    console.log(147)
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
            stickDom.classList.add(className)
            stickDom.style.zIndex = zIndex // 层级单独处理
        }
    }
}

const remove = (stickDom) => {
    if (stickDom) {
        if (stickDom.classList.contains(className)) {
            stickDom.classList.remove(className)
            stickDom.style.zIndex = 'initial' // 层级单独处理
        }
    }
}