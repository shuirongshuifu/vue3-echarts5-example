import { onMounted, onBeforeUnmount, reactive } from 'vue'
export function useShiftQuickSelect() {

    onMounted(() => {
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
    });

    const onKeyDown = (e) => {
        if (e.key === 'Shift') {
            clickInfo.isShiftPressed = true;
        }
    };

    const onKeyUp = (e) => {
        if (e.key === 'Shift') {
            // Shift抬起重置
            clickInfo.isShiftPressed = false;
            clickInfo.startRowIndex = -1
            clickInfo.endRowIndex = -1
        }
    };

    const clickInfo = reactive({
        startRowIndex: -1,
        endRowIndex: -1,
        isShiftPressed: false
    })

    /**
     * tableData表格数据、multipleSelection勾选数组，multipleTableRef表格实例
     * key用于进行对比的标识字段，一般都是每一行的唯一身份证即id
     * */ 
    const ctr = (tableData, multipleSelection, multipleTableRef, key) => {
        // 获取当前点击的是第几行
        let i = tableData.findIndex((item) => item.id == key)
        // Shift按下逻辑
        if (clickInfo.isShiftPressed) {
            // 初始没勾选，就赋值开始勾选索引
            if (clickInfo.startRowIndex === -1) {
                clickInfo.startRowIndex = i
            } 
            // 初始已经勾选，就说明是shift快速勾选
            else {
                // 索引赋值
                clickInfo.endRowIndex = i
                // 把开始索引和结束索引进行大小对比
                const { startRowIndex, endRowIndex } = clickInfo
                const startIndex = Math.min(startRowIndex, endRowIndex);
                const endIndex = Math.max(startRowIndex, endRowIndex);
                // 遍历操作
                tableData.forEach((rowData, rowIndex) => {
                    // 若是这一项包含在已勾选的数组中去(已勾选)，就忽略之；没勾选就控制其勾选
                    if (!multipleSelection.some((msItem) => msItem.id == rowData.id)) {
                        // 中间段勾选
                        if (rowIndex > startIndex && rowIndex < endIndex) {
                            // 改表格状态并存起来
                            multipleTableRef.toggleRowSelection(rowData, rowIndex > startIndex && rowIndex < endIndex)
                            multipleSelection.push(rowData)
                        }
                    }
                })
            }
        }
    }
    return { ctr }
}