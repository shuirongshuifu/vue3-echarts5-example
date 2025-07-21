<template>
    <div class="contextMenu" ref="menuRef">
        <slot></slot>
        <teleport to="body">
            <transition name="fade">
                <div class="menuWrap" v-if="state.showMenu" ref="menuElementRef"
                    :style="{ left: state.menuX + 'px', top: state.menuY + 'px' }">
                    <div class="menuItem" v-for="menu in menus" :key="menu.label"
                        @click.stop="handleItemClick(menu, $event)" :class="{ disabled: menu.disabled }"
                        :aria-disabled="menu.disabled">
                        <div class="menuItemIcon" v-if="menu.icon">
                            <el-icon>
                                <component :is="menu.icon" />
                            </el-icon>
                        </div>
                        <div class="menuItemLabel" v-if="menu.label">
                            {{ menu.label }}
                        </div>
                    </div>
                </div>
            </transition>
        </teleport>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
    menus: {
        type: Array,
        default: () => []
    }
})

const menuRef = ref(null);
const menuElementRef = ref(null);

const state = reactive({
    showMenu: false,
    menuX: 0,
    menuY: 0,
    menuWidth: 0,
    menuHeight: 0
})

const menuSize = {
    margin: 12
}

// 阻止默认事件，计算菜单尺寸位置，并更新菜单状态
const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    state.showMenu = true;

    nextTick(() => {
        if (menuElementRef.value) {
            // 获取菜单实际尺寸
            const rect = menuElementRef.value.getBoundingClientRect();
            state.menuWidth = rect.width;
            state.menuHeight = rect.height;

            // 计算菜单位置
            let x = e.clientX;
            let y = e.clientY;

            // 边界判断
            if (x + state.menuWidth + menuSize.margin > window.innerWidth) {
                x = window.innerWidth - state.menuWidth - menuSize.margin;
            }

            if (y + state.menuHeight + menuSize.margin > window.innerHeight) {
                y = window.innerHeight - state.menuHeight - menuSize.margin;
            }

            x = Math.max(menuSize.margin, x);
            y = Math.max(menuSize.margin, y);

            state.menuX = x;
            state.menuY = y;
        }
    })
}

// 关闭菜单区的时候，区分点击菜单内部和外部
const closeMenu = (e) => {
    if (menuElementRef.value && menuElementRef.value.contains(e.target)) {
        return;
    }
    state.showMenu = false;
}

// 菜单项点击处理关闭菜单
const handleItemClick = (menu, e) => {
    if (menu.disabled) return;
    menu.onClick?.(menu, e);
    state.showMenu = false;
}

onMounted(() => {
    menuRef.value?.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', closeMenu);
    window.addEventListener('contextmenu', closeMenu);
})

onUnmounted(() => {
    menuRef.value?.removeEventListener('contextmenu', handleContextMenu);
    window.removeEventListener('click', closeMenu);
    window.removeEventListener('contextmenu', closeMenu);
})
</script>

<style scoped>
.menuWrap {
    position: fixed;
    z-index: 99999;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 5px 20px 5px rgba(0, 0, 0, 0.12);
    padding: 6px 0;
    color: #222;
    font-size: 14px;
    opacity: 1;
    min-width: 120px;
}

.menuWrap .menuItem {
    padding: 6px 16px;
    cursor: pointer;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
    outline: none;
}

.menuWrap .menuItem .menuItemIcon {
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menuWrap .menuItem:last-child {
    border-bottom: none;
}

.menuWrap .menuItem.disabled {
    color: #999;
    cursor: not-allowed;
    user-select: none;
}

.menuWrap .menuItem:not(.disabled):hover {
    background-color: #F1F1F1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>