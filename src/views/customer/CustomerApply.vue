<!--
 * @Author: linfudong
 * @Date: 2021-10-11 10:27:40
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 10:39:40
 * @Description: 商户入网修改
-->
<template>
  <el-card class="customer-apply">
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
        <el-col :md="8" :sm="8">
          <el-form-item label="代理商编号" prop="agentNo">
            <el-input
              v-model="queryParam.agentNo"
              placeholder="请输入代理商编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="处理类型" prop="type">
            <el-select v-model="queryParam.type" placeholder="请选择处理类型">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="申请时间" prop="date">
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
        <el-col :md="8" :sm="8">
          <el-form-item label="处理时间" prop="datePast">
            <el-date-picker
              v-model="queryParam.datePast"
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
        <el-col :md="8" :sm="8">
          <el-form-item label="审核状态" prop="status">
            <el-select v-model="queryParam.status" placeholder="请选择审核状态">
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
      <el-table-column label="操作" fixed="right" width="80" align="center">
        <template #default="scope">
          <el-button type="text" @click="details(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <PageNation
      :total="total"
      v-model:page.sync="queryParam.pageNo"
      v-model:limit.sync="queryParam.pageSize"
      @pagination="pageChange"
    />
    <!-- 查看详情 -->
    <ApplyDetails
      v-if="detailsVisible"
      v-model:visible="detailsVisible"
      :record="record"
    ></ApplyDetails>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref, watch } from 'vue'
import api from '@/server/api/system'
import { ApplyDetails } from './components'
export default defineComponent({
  name: 'CustomerApply',
  components: {
    ApplyDetails,
  },
  setup() {
    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        customerNo: '', // 商户编号
        agentNo: '', // 代理商编号
        type: '', // 处理类型
        date: [], // 申请时间
        startDate: '', // 申请时间-开始时间
        endDate: '', // 申请时间-结束时间
        datePast: [], // 处理时间
        startDatePast: '', // 处理时间-开始时间
        endDatePast: '', // 处理时间-结束时间
        status: '', // 审核状态
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [{ agentNo: '87291039507' }],
      columns: [
        { key: 'customerNo', label: '创建时间', width: '120' },
        { key: 'agentNo', label: '商户编号', width: '100' },
        { key: 'policyType', label: '商户名称', width: '100' },
        { key: 'description', label: '直属代理编号', width: '100' },
        { key: 'reason', label: '异常次数	', width: '160' },
        { key: 'description', label: '处理类型', width: '100' },
        { key: 'description', label: '处理时间', width: '160' },
        { key: 'description', label: '处理状态', width: '100' },
        { key: 'description', label: '操作账号', width: '100' },
      ],
      // 审核状态
      statusList: [
        { value: '1', label: '待处理' },
        { value: '0', label: '审核拒绝' },
        { value: '2', label: '审核通过' },
      ],
      // 处理类型
      typeList: [{ value: '1', label: '人脸识别' }],
      record: {}, // 选中行
      detailsVisible: false, // 查看详情
    })

    // 监听申请时间
    watch(
      () => state.queryParam.date,
      (newValue, oldValue) => {
        state.queryParam.startDate = newValue[0] || ''
        state.queryParam.endDate = newValue[1] || ''
      }
    )
    // 监听处理时间
    watch(
      () => state.queryParam.datePast,
      (newValue, oldValue) => {
        state.queryParam.startDatePast = newValue[0] || ''
        state.queryParam.endDatePast = newValue[1] || ''
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
    // 查看详情
    const details = (row: any) => {
      state.detailsVisible = true
      state.record = row
    }

    return {
      formRef,
      ...toRefs(state),
      pageChange,
      getList,
      query,
      reset,
      details,
    }
  },
})
</script>

<style lang="scss" scoped></style>
