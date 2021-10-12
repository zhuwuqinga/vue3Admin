<!--
 * @Author: linfudong
 * @Date: 2021-10-09 15:02:43
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:41:21
 * @Description: 商户激活查询
-->
<template>
  <el-card class="customer-activation">
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
          <el-form-item label="终端SN" prop="terminalSN">
            <el-input
              v-model="queryParam.terminalSN"
              placeholder="请输入终端SN"
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
          <el-form-item label="首绑时间" prop="date">
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
          <el-form-item label="激活时间" prop="datePast">
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
        <el-col :md="8" :sm="8">
          <el-form-item label="机器SN" prop="machineSN">
            <el-input
              v-model="queryParam.machineSN"
              placeholder="请输入机器SN"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="未激活原因	" prop="reason">
            <el-select
              v-model="queryParam.reason"
              placeholder="请选择未激活原因	"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in reasonList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="激活交易卡号" prop="cardNo">
            <el-input
              v-model="queryParam.cardNo"
              placeholder="请输入激活交易卡号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="激活身份证号" prop="idNo">
            <el-input
              v-model="queryParam.idNo"
              placeholder="请输入激活身份证号"
            ></el-input>
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
          <el-form-item label="激活手机号" prop="phone">
            <el-input
              v-model="queryParam.phone"
              placeholder="请输入激活手机号"
            ></el-input>
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
          <DownLoad :routeName="'customerActivation'"></DownLoad>
        </el-col>
      </el-row>
    </el-form>
    <el-alert
      class="not-first-row"
      :title="
        '总计：' + totalCount + '人，' + '总返现金额：' + totalAmount + '元'
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
    <ActivationDetails
      v-if="detailsVisible"
      v-model:visible="detailsVisible"
      :record="record"
    ></ActivationDetails>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref, watch } from 'vue'
import api from '@/server/api/system'
import { ActivationDetails } from './components'
import moment from 'moment'
export default defineComponent({
  name: 'CustomerActivation',
  components: {
    ActivationDetails,
  },
  setup() {
    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        customerNo: '', // 商户编号
        agentNo: '', // 代理商编号
        terminalSN: '', // 终端SN
        isIncludeChild: '0', // 是否包含子代
        posType: '', // 机具类型
        date: [
          moment(new Date().setDate(new Date().getDate() - 6)).format(
            'YYYY-MM-DD'
          ),
          moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD'),
        ], // 首绑时间
        startDate: '', // 首绑时间-开始时间
        endDate: '', // 首绑时间-结束时间
        activityName: '', // 活动名称
        datePast: [], // 激活时间
        startDatePast: '', // 激活时间-开始时间
        endDatePast: '', // 激活时间-结束时间
        status: '', // 激活状态
        machineSN: '', // 机器SN
        reason: '', // 未激活原因
        cardNo: '', // 激活交易卡号
        idNo: '', // 激活身份证号
        notORG: '', // 服务商维度
        policyType: '', // 模式类型
        phone: '', // 激活手机号
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [{ customerNo: '87291039507' }],
      columns: [
        { key: 'customerNo', label: '商户编号', width: '120' },
        { key: 'agentNo', label: '终端SN', width: '100' },
        { key: 'policyType', label: '模式类型', width: '100' },
        { key: 'description', label: '机具类型', width: '100' },
        { key: 'reason', label: '代理商编号	', width: '100' },
        { key: 'description', label: '活动名称', width: '120' },
        { key: 'description', label: '首绑时间', width: '160' },
        { key: 'description', label: '激活时间', width: '160' },
        { key: 'description', label: '激活状态', width: '100' },
        { key: 'description', label: '返现金额', width: '100' },
        { key: 'description', label: '未激活原因', width: '160' },
        { key: 'description', label: '身份证号', width: '120' },
      ],
      totalCount: 0, // 总计
      totalAmount: 0, // 总返现金额
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
      // 未激活原因
      reasonList: [
        { value: '1', label: '激活已超时' },
        { value: '0', label: '交易未达标' },
        { value: '2', label: '银行卡曾激活' },
        { value: '3', label: '手机号曾激活' },
        { value: '4', label: '身份证号曾激活' },
        { value: '5', label: 'sn曾激活' },
        { value: '6', label: '其他' },
      ],
      // 服务商维度
      notORGList: [
        { value: '1', label: '代理商' },
        { value: '0', label: '机构' },
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
      // 是否包含子代
      isIncludeChildList: [
        { value: '0', label: '是' },
        { value: '1', label: '否' },
      ],
      record: {}, // 选中行
      detailsVisible: false, // 查看详情
    })

    // 监听首绑时间
    watch(
      () => state.queryParam.date,
      (newValue, oldValue) => {
        state.queryParam.startDate = newValue[0] || ''
        state.queryParam.endDate = newValue[1] || ''
      }
    )
    // 监听激活时间
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
