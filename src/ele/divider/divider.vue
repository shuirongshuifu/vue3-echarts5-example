<template>
  <div
    :class="[ns.b(), ns.m(direction)]"
    :style="dividerStyle"
    role="separator"
  >
    <div
      v-if="$slots.default && direction !== 'vertical'"
      :class="[ns.e('text'), ns.is(contentPosition)]"
      @click="selfClick"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from 'element-plus/es/hooks/use-namespace/index.mjs' // import { useNamespace } from '@element-plus/hooks'
import { dividerProps } from './divider'
import type { CSSProperties } from 'vue'

const selfClick = ()=>{
  alert('自定义一些逻辑')
}

defineOptions({
  name: 'ElDivider',
})
const props = defineProps(dividerProps)
const ns = useNamespace('divider')
const dividerStyle = computed(() => {
  return ns.cssVar({
    'border-style': props.borderStyle,
  }) as CSSProperties
})
</script>

<style>
.kkk {
  color: chocolate !important;
}
</style>
