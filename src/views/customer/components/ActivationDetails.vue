<!--
 * @Author: linfudong
 * @Date: 2021-10-09 15:33:43
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:41:55
 * @Description: 商户激活查询详情
-->
<template>
  <div class="customer-details">
    <el-dialog
      title="激活交易详情"
      v-model="visible"
      width="800px"
      :before-close="handleClose"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          align="center"
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.key"
          :label="item.label"
          :min-width="item.width"
        >
          <template #default="scope">
            <span>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'CustomerDetails',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // 选中行
    record: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    /**
     * @method getCurrentInstance 获取当前组件实例
     */
    const instance = getCurrentInstance()
    const { proxy } = instance as any

    const state = reactive({
      columns: [
        // 表头
        { key: 'customerNo', label: '交易流水编号', width: '100' },
        { key: 'channelNo', label: '交易卡号', width: '100' },
        { key: 'customerName', label: '银行', width: '100' },
        { key: 'customerGrade', label: '卡类型', width: '100' },
        { key: 'customerGrade', label: '交易金额', width: '100' },
      ],
      tableData: [],
    })
    /**
     * Methods
     */
    // 分页
    const pageChange = () => {}

    // 关闭弹框
    const handleClose = () => {
      context.emit('update:visible', false)
    }

    return {
      ...toRefs(state),
      handleClose,
      pageChange,
    }
  },
})
</script>
<style lang="scss" scoped></style>
