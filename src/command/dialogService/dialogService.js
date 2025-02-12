import { ref, h, createVNode, render } from 'vue';
import { ElDialog } from 'element-plus';
import bodyComponents from './bodyComponents.vue';
import footerComponents from './footerComponents.vue';

// 布尔值变量
const dialogVisible = ref(false);
// 弹框挂载的dom
let container;

const openDialog = (comAttrs, dialogAttrs) => {
    dialogVisible.value = true;
    if (!container) {
        // 创建一个容器dom，并丢进去
        container = document.createElement('div');
        document.body.appendChild(container);
        // 创建虚拟dom节点，并render
        const vnode = createVNode(ElDialog, {
            title: '我是标题',
            width: 800,
            // 合并传递进来的el-dialog的属性参数
            ...dialogAttrs,
            modelValue: dialogVisible.value,
        }, {
            default: () => h(bodyComponents, { comAttrs }),
            // 可拓展footer
            footer: () => h(footerComponents),
        });
        render(vnode, container);
    }
};

const closeDialog = () => {
    dialogVisible.value = false;
    if (container) {
        render(null, container); // 清除渲染的内容
        container.remove();
        container = null;
    }
};

export { openDialog, closeDialog };