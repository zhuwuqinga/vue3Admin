<!--
 * @Author: zhuwuqing
 * @Date: 2021-10-09 10:37:58
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 11:30:52
 * @Description: 下载
-->
<template>
  <el-button
    type="primary"
    icon="el-icon-download"
    class="ml10"
    @click="downLoad(checkRouteForUrl(routeName))"
    >下载</el-button
  >
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  name: 'DownLoad',
  props: {
    routeName: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const downLoad = (url: String) => {
      console.log('下载', url)
      ElMessageBox.confirm('确定下载？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '下载成功，请稍后到下载中心查看结果',
          })
        })
        .catch(() => {})
    }
    const checkRouteForUrl = computed(() => {
      return (param: String) => {
        switch (param) {
          case 'customerUnActivation':
            return '/customerUnActivation' // 商户管理 -- 伪激活查询
          case 'customerManageChange':
            return '/customerManageChange' // 商户管理 -- 商户管理变更查询
          case 'customerActivation':
            return '/customerActivation' // 商户管理 -- 商户激活查询
          case 'customerDeposit':
            return '/customerDeposit' // 商户管理 -- 商户押金查询
          case 'customerFlowCard':
            return '/customerFlowCard' // 商户管理 -- 商户流量卡查询
        }
      }
    })
    return {
      downLoad,
      checkRouteForUrl,
    }
  },
})
</script>
