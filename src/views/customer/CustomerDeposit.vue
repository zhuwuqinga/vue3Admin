<!--
 * @Author: linfudong
 * @Date: 2021-10-09 16:00:10
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:41:28
 * @Description: 商户押金查询
-->
<template>
  <el-card class="customer-deposit">
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
          <el-form-item label="直属代理商编号" prop="agentNo">
            <el-input
              v-model="queryParam.agentNo"
              placeholder="请输入直属代理商编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="终端SN" prop="terminalSN">
            <el-input
              v-model="queryParam.terminalSN"
              placeholder="请输入终端SN"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="模式类型" prop="policyType">
            <el-select
              v-model="queryParam.policyType"
              placeholder="请选择模式类型"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in policyTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="活动名称" prop="activityName">
            <el-select
              v-model="queryParam.activityName"
              placeholder="请选择活动名称"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in activityNameList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="机具类型" prop="posType">
            <el-select
              v-model="queryParam.posType"
              placeholder="请选择机具类型"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in posTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="扣款时间" prop="date">
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
          <el-form-item label="绑定时间" prop="datePast">
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
          <el-form-item label="机器SN" prop="machineSN">
            <el-input
              v-model="queryParam.machineSN"
              placeholder="请输入机器SN"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="激活状态" prop="status">
            <el-select v-model="queryParam.status" placeholder="请选择激活状态">
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
          <DownLoad :routeName="'customerDeposit'"></DownLoad>
        </el-col>
      </el-row>
    </el-form>
    <el-alert
      class="not-first-row"
      :title="
        '总计：' + totalCount + '人，' + '总激活交易金额：' + totalAmount + '元'
      "
      type="success"
      :closable="false"
    >
    </el-alert>
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
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref, watch } from 'vue'
import api from '@/server/api/system'
import moment from 'moment'
export default defineComponent({
  name: 'CustomerDeposit',
  components: {},
  setup() {
    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        customerNo: '', // 商户编号
        agentNo: '', // 直属代理商编号
        terminalSN: '', // 终端SN
        policyType: '', // 模式类型
        activityName: '', // 活动名称
        isIncludeChild: '0', // 是否包含子代
        posType: '', // 机具类型
        date: [], // 扣款时间
        startDate: '', // 扣款时间-开始时间
        endDate: '', // 扣款时间-结束时间
        datePast: [
          moment(new Date().setDate(new Date().getDate() - 6)).format(
            'YYYY-MM-DD'
          ),
          moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD'),
        ], // 绑定时间
        startDatePast: '', // 绑定时间-开始时间
        endDatePast: '', // 绑定时间-结束时间
        machineSN: '', // 机器SN
        status: '', // 激活状态
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [{ customerNo: '87291039507' }],
      columns: [
        { key: 'customerNo', label: '交易流水号', width: '120' },
        { key: 'agentNo', label: '商户编号', width: '100' },
        { key: 'policyType', label: '终端SN', width: '100' },
        { key: 'description', label: '机具类型', width: '100' },
        { key: 'reason', label: '模式类型	', width: '100' },
        { key: 'description', label: '代理商编号', width: '120' },
        { key: 'description', label: '活动名称', width: '160' },
        { key: 'description', label: '绑定时间', width: '160' },
        { key: 'description', label: '扣款时间', width: '100' },
        { key: 'description', label: '押金金额', width: '100' },
        { key: 'description', label: '返现金额（元）', width: '160' },
        { key: 'description', label: '激活状态', width: '120' },
      ],
      totalCount: 0, // 总计
      totalAmount: 0, // 总激活交易金额
      // 枚举
      activityNameList: [
        // 活动名称
        { value: '1', label: '活动一' },
        { value: '0', label: '活动二' },
      ],
      // 激活状态
      statusList: [
        { value: '1', label: '未激活' },
        { value: '0', label: '已激活' },
      ],
      // 模式类型
      policyTypeList: [
        { value: '1', label: '传统模式' },
        { value: '0', label: '2.0模式' },
        { value: '2', label: '大pos模式' },
      ],
      // 机具类型
      posTypeList: [
        { value: '1', label: '手刷' },
        { value: '0', label: 'MPOS' },
        { value: '2', label: '电签' },
        { value: '3', label: '大pos定制机' },
        { value: '4', label: '大pos自备机' },
      ],
    })

    // 监听扣款时间
    watch(
      () => state.queryParam.date,
      (newValue, oldValue) => {
        state.queryParam.startDate = newValue[0] || ''
        state.queryParam.endDate = newValue[1] || ''
      }
    )
    // 监听绑定时间
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

    return {
      formRef,
      ...toRefs(state),
      pageChange,
      getList,
      query,
      reset,
    }
  },
})
</script>

<style lang="scss" scoped></style>
