<!--
 * @Author: linfudong
 * @Date: 2021-10-11 11:36:04
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 11:38:48
 * @Description: 商户流量卡查询-详情
-->
<template>
  <div class="flow-card-details">
    <el-dialog
      title="流量卡购买详情详情"
      v-model="visible"
      width="800px"
      :before-close="handleClose"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
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
  name: 'FlowCardDetails',
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
        { key: 'channelNo', label: '交易金额', width: '100' },
        { key: 'customerName', label: '缴费时间', width: '100' },
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
