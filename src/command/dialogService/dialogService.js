import { ref, h, createVNode, render } from 'vue';
import { ElDialog } from 'element-plus';
import dialogCom from './dialogCom.vue';

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
            modelValue: dialogVisible.value,
            title: '我是标题',
            width: 800,
            // onClosed: () => closeDialog(),
            // onClose: () => closeDialog(),
            // 合并传递进来的el-dialog的属性参数
            ...dialogAttrs
        }, {
            default: () => h(dialogCom, { comAttrs }),
        });
        render(vnode, container);
    }
};

const closeDialog = () => {
    dialogVisible.value = false;
    if (container) {
        document.querySelector("#myBgAudio")?.play();
        render(null, container); // 清除渲染的内容
        container.remove();
        container = null;
    }
};

export { openDialog, closeDialog };