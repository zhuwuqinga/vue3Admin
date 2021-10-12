import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Index.vue'
import systemRouter from './modules/system'
import customerRouter from './modules/customer'

const routes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () =>
          import(
            /* webpackChunkName: "redirect" */ '@/views/redirect/Index.vue'
          ),
      },
    ],
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "redirect" */ '@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      icon: 'el-icon-s-home',
    },
    children: [
      {
        path: '/dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          affix: true,
        },
      },
    ],
  },
  ...systemRouter,
  ...customerRouter
]

export const constantRoutes: Array<RouteRecordRaw> = [...routes]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
