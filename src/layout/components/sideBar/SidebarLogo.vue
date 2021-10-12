<!--
 * @Author: linfudong
 * @Date: 2021-09-22 10:37:05
 * @LastEditors: linfudong
 * @LastEditTime: 2021-09-29 18:01:08
 * @Description: 
-->
<template>
  <div class="sidebar-logo-container">
    <!-- 图片插槽 -->
    <slot name="img"></slot>
    <!-- 文本插槽 -->
    <slot name="text"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarLogo',
  setup() {},
})
</script>
<style scoped lang="scss">
.sidebar-logo-container {
  width: 100%;
  height: 50px;
  display:flex;
  align-items:center;
  justify-content:center;
  // background:#f4ad61;
}
</style>
