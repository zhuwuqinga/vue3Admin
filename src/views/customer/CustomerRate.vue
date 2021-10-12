<!--
 * @Author: linfudong
 * @Date: 2021-10-09 17:06:39
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 09:35:09
 * @Description: 费率变更查询
-->
<template>
  <el-card class="customer-rate">
    <!--查询区域-->
    <el-form :model="queryParam" ref="formRef" label-width="140px">
      <el-row :gutter="24">
        <el-col :md="8" :sm="12">
          <el-form-item label="商户编号" prop="customerNo">
            <el-input
              v-model="queryParam.customerNo"
              placeholder="请输入商户编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="12">
          <el-form-item label="商户名称" prop="customerName">
            <el-input
              v-model="queryParam.customerName"
              placeholder="请输入商户名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="操作时间" prop="date">
            <el-date-picker
              v-model="queryParam.date"
              type="daterange"
              :clearable="false"
              unlink-panels
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <!--查询重置-->
        <el-col :xl="6" :lg="7" :md="8" :sm="24">
          <el-button type="primary" icon="el-icon-search" @click="query"
            >查询</el-button
          >
          <el-button icon="el-icon-refresh-right" @click="reset"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <div class="operation">
      <el-button type="primary" @click="rateChange">费率变更</el-button>
      <el-button type="primary" @click="batchRateChange"
        >批量修改费率</el-button
      >
    </div>
    <!--table区域-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center">
      </el-table-column>
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
    <PageNation
      :total="total"
      v-model:page.sync="queryParam.pageNo"
      v-model:limit.sync="queryParam.pageSize"
      @pagination="pageChange"
    />
    <!-- 费率变更 -->
    <RateChange v-if="rateVisible" v-model:visible="rateVisible"></RateChange>
    <!-- 批量修改费率 -->
    <BatchRateChange
      v-if="batchVisible"
      v-model:visible="batchVisible"
    ></BatchRateChange>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref, watch } from 'vue'
import api from '@/server/api/system'
import { RateChange, BatchRateChange } from './components'
export default defineComponent({
  name: 'CustomerRate',
  components: {
    RateChange,
    BatchRateChange,
  },
  setup() {
    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        customerNo: '', // 商户编号
        customerName: '', // 商户名称
        date: [], // 操作时间
        startDate: '', // 操作时间-开始时间
        endDate: '', // 操作时间-结束时间
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [{ customerNo: '87291039507' }],
      columns: [
        { key: 'customerNo', label: '商户编号', width: '120' },
        { key: 'agentNo', label: '商户名称', width: '100' },
        { key: 'policyType', label: '操作人', width: '100' },
        { key: 'description', label: '修改前费率', width: '120' },
        { key: 'reason', label: '修改后费率	', width: '120' },
        { key: 'description', label: '费率有效期', width: '160' },
        { key: 'description', label: '失效后执行费率', width: '130' },
        { key: 'description', label: '修改时间', width: '160' },
        { key: 'description', label: '备注', width: '100' },
      ],
      rateVisible: false, // 费率变更
      batchVisible: false, // 批量修改费率
    })

    // 监听操作时间
    watch(
      () => state.queryParam.date,
      (newValue, oldValue) => {
        state.queryParam.startDate = newValue[0] || ''
        state.queryParam.endDate = newValue[1] || ''
      }
    )

    // 分页
    const pageChange = () => {
      getList()
    }

    // 查询
    const query = () => {
      state.queryParam.pageNo = 1
      getList()
    }

    // 重置
    const reset = () => {
      ;(formRef.value as any).resetFields()
      getList()
    }

    onMounted(() => {
      getList()
    })

    // 获取列表
    const getList = () => {
      api.dictList(state.queryParam).then((res: any) => {
        if (res.origin.success) {
          state.tableData = res.origin.result.records
          state.total = res.origin.result.total
        }
      })
    }
    // 费率变更
    const rateChange = () => {
      state.rateVisible = true
    }
    // 批量修改费率
    const batchRateChange = () => {
      state.batchVisible = true
    }

    return {
      formRef,
      ...toRefs(state),
      pageChange,
      getList,
      query,
      reset,
      rateChange,
      batchRateChange,
    }
  },
})
</script>

<style lang="scss" scoped>
.customer-rate {
  .operation {
    margin-top: 20px;
  }
}
</style>
