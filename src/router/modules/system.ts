/*
 * @Author: zhuwuqing
 * @Date: 2021-09-22 10:39:28
 * @Last Modified by: zhuwuqing
 * @Last Modified time: 2021-10-08 15:39:13
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const systemRouter: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'el-icon-folder-opened',
    },
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/system/user.vue'),
        meta: { title: '用户管理' },
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('@/views/system/role.vue'),
        meta: { title: '角色管理' },
      },
      {
        path: '/menuManage',
        name: 'MenuManage',
        component: () => import('@/views/system/MenuManage.vue'),
        meta: { title: '菜单管理' },
      },
      {
        path: '/dataDict',
        name: 'DataDict',
        component: () => import('@/views/system/DataDict.vue'),
        meta: { title: '数据字典' },
      },
    ],
  },
]

export default systemRouter
