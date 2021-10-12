<!--
 * @Author: linfudong
 * @Date: 2021-09-22 10:37:05
 * @LastEditors: linfudong
 * @LastEditTime: 2021-09-23 10:36:43
 * @Description: 
-->
<!--
 * @Description: 主视图
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }" :key="key">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  name: 'AppMain',
  setup() {
    const store = useStore()
    const route = useRoute()
    // 缓存列表
    const cachedViews = computed(() => {
      return store.state.tagsView.cachedViews
    })
    const key = computed(() => {
      return route.path
    })
    return {
      key,
      cachedViews,
    }
  },
})
</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 135px);
  position: relative;
  overflow: hidden;
  padding: 16px;
  // background: #f2f2f2;
}
// fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

// fade-transform
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
