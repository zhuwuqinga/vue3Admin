<template>
  <div>
    <el-table class="mt20" :data="tableData" border>
      <el-table-column
        align="center"
        type="index"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="data1"
        label="交易时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="data2"
        label="交易流水编号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="data3"
        label="交易类型"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="data4"
        label="使用金额"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'CouponConsumpRecord',
  props: {
    id: {
      required: true
    }
  },
  setup(props) {
    const data = reactive({
      tableData: [
        {id: 1, data1: '2021-09-23 10:31:32', data2: '21092310313698461281', data3: '刷卡', data4: '3.0'},
        {id: 2, data1: '2021-09-23 10:17:25', data2: '21092310173081546835', data3: '刷卡', data4: '3.0'}
      ]
    })
    const loadList = () => {
      console.log(props.id)
    }
    const indexMethod = (index: number) => {
      return index + 1
    }
    return {
      ...toRefs(data),
      loadList,
      indexMethod
    }
  },
})
</script>
