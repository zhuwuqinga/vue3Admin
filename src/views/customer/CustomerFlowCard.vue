<!--
 * @Author: linfudong
 * @Date: 2021-10-11 11:23:31
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 11:37:00
 * @Description: 商户流量卡查询
-->
<template>
  <el-card class="customer-flow-card">
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
          <el-form-item label="流量卡状态" prop="status">
            <el-select
              v-model="queryParam.status"
              placeholder="请选择流量卡状态"
            >
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
        <el-col :md="8" :sm="8">
          <el-form-item label="服务商编号" prop="agentNo">
            <el-input
              v-model="queryParam.agentNo"
              placeholder="请输入服务商编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="是否包含子代" prop="isIncludeChild">
            <el-select
              v-model="queryParam.isIncludeChild"
              placeholder="请选择是否包含子代"
            >
              <el-option
                v-for="item in isIncludeChildList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="缴费时间" prop="date">
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
          <el-form-item label="服务商维度" prop="notORG">
            <el-select
              v-model="queryParam.notORG"
              placeholder="请选择服务商维度"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in notORGList"
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
          <DownLoad :routeName="'customerFlowCard'"></DownLoad>
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
    <FlowCardDetails
      v-if="detailsVisible"
      v-model:visible="detailsVisible"
      :record="record"
    ></FlowCardDetails>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref, watch } from 'vue'
import api from '@/server/api/system'
import { FlowCardDetails } from './components'
export default defineComponent({
  name: 'CustomerActivation',
  components: {
    FlowCardDetails,
  },
  setup() {
    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        customerNo: '', // 商户编号
        status: '', // 流量卡状态
        agentNo: '', // 服务商编号
        isIncludeChild: '0', // 是否包含子代
        date: [], // 缴费时间
        startDate: '', // 缴费时间-开始时间
        endDate: '', // 缴费时间-结束时间
        notORG: '', // 服务商维度
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [{ customerNo: '87291039507' }],
      columns: [
        { key: 'customerNo', label: '商户编号', width: '120' },
        { key: 'agentNo', label: '商户名称', width: '100' },
        { key: 'policyType', label: '代理商编号', width: '100' },
        { key: 'description', label: '流量卡状态', width: '100' },
        { key: 'reason', label: '终端SN', width: '100' },
        { key: 'description', label: '机器SN', width: '120' },
        { key: 'description', label: '机具类型', width: '100' },
        { key: 'description', label: '缴费金额', width: '100' },
        { key: 'description', label: '缴费时间', width: '160' },
        { key: 'description', label: '续费时间', width: '160' },
        { key: 'description', label: '购买次数', width: '160' },
      ],
      // 枚举
      // 流量卡状态
      statusList: [
        { value: '1', label: '已缴费' },
        { value: '0', label: '待缴费' },
      ],
      // 服务商维度
      notORGList: [
        { value: '1', label: '代理商' },
        { value: '0', label: '机构' },
      ],
      // 是否包含子代
      isIncludeChildList: [
        { value: '0', label: '是' },
        { value: '1', label: '否' },
      ],
      record: {}, // 选中行
      detailsVisible: false, // 查看详情
    })

    // 监听缴费时间
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
