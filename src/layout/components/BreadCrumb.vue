<template>
  <el-breadcrumb class="bread-crumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
        <span
          v-if="item.meta.redirect == 'redirect'"
          class="redirect"
          @click.prevent="handleLink(item)"
          >{{ item.meta.title }}</span
        >
        <span v-else class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
export default defineComponent({
  name: 'BreadCrumb',
  setup() {
    const currentRoute = useRoute()
    const router = useRouter()
    const state = reactive({
      breadcrumbs: [] as Array<RouteLocationMatched>,
      getBreadcrumb: () => {
        /**
         * @matched 一个数组，包含当前路由的所有嵌套路径片段的路由记录
         */
        let matched = currentRoute.matched.filter(
          (item) => item.meta && item.meta.title
        )
        // 父路由
        const frist = matched[0]
        // 父路由不是首页Dashboard情况下，面包屑列表新增首页
        if (!state.isDashboard(frist)) {
          /**
           * @param redirect 面包屑是否可以点击跳转
           */
          matched = [
            {
              path: '/dashboard',
              meta: { title: '首页', redirect: 'redirect' },
            } as any,
          ].concat(matched)
        }
        /**
         * @breadcrumb 是否在面包屑显示，默认为true
         * 过滤掉不在面包屑显示的路由
         */
        state.breadcrumbs = matched.filter((item) => {
          return item.meta && item.meta.title && item.meta.breadcrumb !== false
        })
      },
      isDashboard(route: RouteLocationMatched) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return (
          name.toString().trim().toLocaleLowerCase() ===
          'Dashboard'.toLocaleLowerCase()
        )
      },
      // 跳转指定路由
      handleLink(item: any) {
        const redirect = item.meta.redirect
        const path = item.path
        if (redirect) {
          router.push({ path: path }).catch((err) => {
            console.warn(err)
          })
          return
        }
      },
    })
    // 监听路由的变化
    watch(
      () => currentRoute.path,
      (path) => {
        /**
         * @method startsWith 用于检测字符串是否以指定的子字符串开始
         */
        if (path.startsWith('/redirect/')) {
          return
        }
        state.getBreadcrumb()
      }
    )
    // 首次加载
    onBeforeMount(() => {
      state.getBreadcrumb()
    })
    return {
      ...toRefs(state),
    }
  },
})
</script>
<style scoped lang="scss">
.bread-crumb {
  display: inline-block;
}
.redirect {
  cursor: pointer;
  color: #fff !important;
}
.no-redirect {
  color: #fff;
}
</style>
