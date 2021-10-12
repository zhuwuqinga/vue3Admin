<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      v-if="total > 0"
      :total="total"
      v-model:current-page.sync="currentPage"
      :page-sizes="pageSizes"
      v-model:page-size.sync="pageSize"
      :layout="layout"
      :background="background"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'

export default defineComponent({
  name: 'PageNation',
  props: {
    // 总条目数 -- 必传
    total: {
      required: true,
      type: Number,
    },
    // 当前页数
    page: {
      type: Number,
      default: 1,
    },
    // 每页显示条目个数
    limit: {
      type: Number,
      default: 10,
    },
    // 每页显示个数选择器
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30]
      },
    },
    // 组件布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    // 是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: true,
    },
    // 是否使用小型分页样式
    small: {
      type: Boolean,
      default: false,
    },
    // 是否显示组件
    hidden: {
      type: Boolean,
      default: false,
    },
    // autoScroll: {
    //   type: Boolean,
    //   default: true,
    // },
  },

  setup(props: { page: number; limit: number }, ctx) {
    // 页码
    const currentPage = computed({
      get() {
        return props.page
      },
      set(val) {
        ctx.emit('update:page', val)
      },
    })
    // 页数
    const pageSize = computed({
      get() {
        return props.limit
      },
      set(val) {
        ctx.emit('update:limit', val)
      },
    })

    // pageSize 改变时会触发
    const handleSizeChange = (val: number) => {
      setTimeout(() => {
        ctx.emit('pagination', { page: currentPage, limit: val })
      }, 0)
    }
    // currentPage  改变时会触发
    const handleCurrentChange = (val: number) => {
      ctx.emit('pagination', { page: val, limit: pageSize })
    }

    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>
<style scoped>
.pagination-container {
  background: #fff;
  padding: 20px 16px 0;
  text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>
