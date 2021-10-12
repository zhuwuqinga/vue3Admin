/*
 * @Author: zhuwuqing
 * @Date: 2021-10-08 15:03:47
 * @Last Modified by: zhuwuqing
 * @Last Modified time: 2021-10-08 17:52:37
 */
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const customerRouter: Array<RouteRecordRaw> = [
  {
    path: '/customer',
    component: Layout,
    name: 'Customer',
    meta: {
      title: '商户管理',
      icon: 'el-icon-s-custom',
    },
    children: [
      {
        path: '/customerList',
        name: 'CustomerList',
        component: () => import('@/views/customer/CustomerList.vue'),
        meta: { title: '商户查询' },
      },
      {
        path: '/customerActivation',
        name: 'CustomerActivation',
        component: () => import('@/views/customer/CustomerActivation.vue'),
        meta: { title: '商户激活查询' },
      },
      {
        path: '/customerDeposit',
        name: 'CustomerDeposit',
        component: () => import('@/views/customer/CustomerDeposit.vue'),
        meta: { title: '商户押金查询' },
      },
      {
        path: '/settlementChange',
        name: 'SettlementChange',
        component: () => import('@/views/customer/SettlementChange.vue'),
        meta: { title: '结算变更查询' },
      },
      {
        path: '/customerRate',
        name: 'CustomerRate',
        component: () => import('@/views/customer/CustomerRate.vue'),
        meta: { title: '费率变更查询' },
      },
      {
        path: '/customerApply',
        name: 'CustomerApply',
        component: () => import('@/views/customer/CustomerApply.vue'),
        meta: { title: '商户入网修改' },
      },
      {
        path: '/customerVip',
        name: 'CustomerVip',
        component: () => import('@/views/customer/CustomerVip.vue'),
        meta: { title: '商户VIP查询' },
      },
      {
        path: '/customerFlowCard',
        name: 'CustomerFlowCard',
        component: () => import('@/views/customer/CustomerFlowCard.vue'),
        meta: { title: '商户流量卡查询' },
      },
      {
        path: '/updateLimitLevel',
        name: 'UpdateLimitLevel',
        component: () => import('@/views/customer/UpdateLimitLevel.vue'),
        meta: { title: '更新额度等级' },
      },
      {
        path: '/updateMcc',
        name: 'UpdateMcc',
        component: () => import('@/views/customer/UpdateMcc.vue'),
        meta: { title: '修改商户Mcc' },
      },
      {
        path: '/customerSettlement',
        name: 'CustomerSettlement',
        component: () => import('@/views/customer/CustomerSettlement.vue'),
        meta: { title: '商户结算变更' },
      },
      {
        path: '/mentionForehead',
        name: 'MentionForehead',
        component: () => import('@/views/customer/mentionForehead.vue'),
        meta: { title: '商户提额查询' },
      },
      {
        path: '/unActivation',
        name: 'UnActivation',
        component: () => import('@/views/customer/unActivation.vue'),
        meta: { title: '商户伪激活查询' },
      },
      {
        path: '/coupon',
        name: 'Coupon',
        component: () => import('@/views/customer/coupon.vue'),
        meta: { title: '商户优惠券查询' },
      },
      {
        path: '/manageChange',
        name: 'ManageChange',
        component: () => import('@/views/customer/manageChange.vue'),
        meta: { title: '商户管理变更查询' },
      },
    ],
  },
]

export default customerRouter
