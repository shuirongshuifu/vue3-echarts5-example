// 控制是否禁用xgplayer拖动
export function useCtrlDrag() {

    const dom = '#xgPlayerWrap xg-controls xg-inner-controls xg-center-grid xg-progress'
    let ob = null
    let isFirstRun = true;

    // 不能拖拽
    const notDrag = () => {
        const progressDom = document.querySelector(dom) // as HTMLElement
        if (progressDom) {
            progressDom.style.pointerEvents = "none"
        }
    }

    // 能拖拽
    const canDrag = () => {
        const progressDom = document.querySelector(dom) // as HTMLElement
        if (progressDom) {
            progressDom.style.pointerEvents = "auto"
        }
    }

    // 添加监控不允许拖动
    const onMonitor = () => {
        offMonitor()
        notDrag()
        ob = new MutationObserver((records) => {
            // 初始执行不监控
            if (isFirstRun) {
                isFirstRun = false;
                return;
            }
            for (const record of records) {
                // 删除不用管，只监控修改
                if (record.target instanceof HTMLElement && record.target.tagName === "XG-PROGRESS") {
                    console.log('修改了');
                    notDrag()
                }
            }
        });
        const progressDom = document.querySelector(dom) // as HTMLElement
        ob.observe(progressDom, {
            childList: true, // 监控所有子元素
            attributes: true, // 监控属性是否发生变化
            subtree: false, // 子树监控
        });
    }

    // 移除监控，允许拖动
    const offMonitor = () => {
        if (ob) {
            ob.disconnect()
            ob = null
        }
        canDrag()
    }

    return { onMonitor, offMonitor }
}