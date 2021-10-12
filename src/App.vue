<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn.js'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const data = reactive({
      locale: zhCn,
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 100%;
  height: 100%;
}
</style>
