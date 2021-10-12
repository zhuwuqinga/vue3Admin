<!--
 * @Author: linfudong
 * @Date: 2021-10-08 16:32:12
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:41:43
 * @Description: 商户VIP查询
-->
<template>
  <el-card class="customer-vip">
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
          <el-form-item label="商户名称" prop="customerName">
            <el-input
              v-model="queryParam.customerName"
              placeholder="请输入商户名称"
            ></el-input>
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
          <el-form-item label="VIP状态" prop="status">
            <el-select v-model="queryParam.status" placeholder="请选择VIP状态">
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
          <el-form-item label="生效时间" prop="date">
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
          <el-form-item label="失效时间" prop="datePast">
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
          <el-form-item label="购买方式" prop="bindWay">
            <el-select
              v-model="queryParam.bindWay"
              placeholder="请选择购买方式"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in bindWayList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
    <el-alert
      class="not-first-row"
      :title="'总交易笔数：' + totalCount + '，' + '总交易金额：' + totalAmount"
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
export default defineComponent({
  name: 'CustomerVip',
  components: {},
  setup() {
    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        customerNo: '', // 商户编号
        customerName: '', // 商户名称
        agentNo: '', // 服务商编号
        status: '', // VIP状态
        date: [], // 生效时间
        startDate: '', // 生效时间-开始时间
        endDate: '', // 生效时间-结束时间
        datePast: [], // 失效时间
        startDatePast: '', // 失效时间-开始时间
        endDatePast: '', // 失效时间-结束时间
        bindWay: '', // 购买方式
        notORG: '', // 服务商维度
        policyType: '', // 模式类型
        posType: '', // 机具类型
        isIncludeChild: '0', // 是否包含子代
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [],
      columns: [
        { key: 'customerNo', label: '商户编号', width: '120' },
        { key: 'agentNo', label: '代理商编号', width: '100' },
        { key: 'policyType', label: '模式类型', width: '100' },
        { key: 'description', label: 'VIP套餐', width: '100' },
        { key: 'bindWay', label: '购买方式', width: '100' },
        { key: 'description', label: '终端SN', width: '120' },
        { key: 'description', label: 'VIP状态', width: '100' },
        { key: 'description', label: '购买价格', width: '100' },
        { key: 'description', label: '机具类型', width: '100' },
        { key: 'description', label: '生效时间', width: '160' },
        { key: 'description', label: '失效时间', width: '160' },
      ],
      totalCount: 0, // 总交易笔数
      totalAmount: 0, // 总交易金额
      // 枚举
      statusList: [
        // VIP状态
        { value: '1', label: '生效中' },
        { value: '0', label: '失效' },
      ],
      // 购买方式
      bindWayList: [
        { value: '1', label: '捆绑购买' },
        { value: '0', label: '单独购买' },
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
        { value: '3', label: '大pos' },
      ],
      // 是否包含子代
      isIncludeChildList: [
        { value: '0', label: '是' },
        { value: '1', label: '否' },
      ],
    })

    // 监听生效时间
    watch(
      () => state.queryParam.date,
      (newValue, oldValue) => {
        state.queryParam.startDate = newValue[0] || ''
        state.queryParam.endDate = newValue[1] || ''
      }
    )
    // 监听失效时间
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
