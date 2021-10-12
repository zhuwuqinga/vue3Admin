<!--
 * @Author: linfudong
 * @Date: 2021-10-09 09:15:01
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:41:32
 * @Description: 商户查询
-->
<template>
  <el-card class="customer-list">
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
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="queryParam.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="直属代理编号" prop="agentNo">
            <el-input
              v-model="queryParam.agentNo"
              placeholder="请输入直属代理编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="直属代理名称" prop="agentName">
            <el-input
              v-model="queryParam.agentName"
              placeholder="请输入直属代理名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="身份证号" prop="idCard">
            <el-input
              v-model="queryParam.idCard"
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="一级编号" prop="primaryNo">
            <el-input
              v-model="queryParam.primaryNo"
              placeholder="请输入一级编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="商户等级" prop="customerGrade">
            <el-select
              v-model="queryParam.customerGrade"
              placeholder="请选择商户等级"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in customerGradeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="商户来源" prop="customerSource">
            <el-select
              v-model="queryParam.customerSource"
              placeholder="请选择商户来源"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in customerSourceList"
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
          <el-form-item label="终端SN" prop="terminalSN">
            <el-input
              v-model="queryParam.terminalSN"
              placeholder="请输入终端SN"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="渠道商编" prop="channelNo">
            <el-input
              v-model="queryParam.channelNo"
              placeholder="请输入渠道商编"
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
          <el-form-item label="机器SN" prop="machineSN">
            <el-input
              v-model="queryParam.machineSN"
              placeholder="请输入机器SN"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="商户类型" prop="customerType">
            <el-select
              v-model="queryParam.customerType"
              placeholder="请选择商户类型"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in customerTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        <el-col :md="8" :sm="8">
          <el-form-item label="商户资质" prop="qualification">
            <el-select
              v-model="queryParam.qualification"
              placeholder="请选择商户资质"
            >
              <el-option value="" label="全部"></el-option>
              <el-option
                v-for="item in qualificationList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="8" :sm="8">
          <el-form-item label="登陆账号" prop="account">
            <el-input
              v-model="queryParam.account"
              placeholder="请输入登陆账号"
            ></el-input>
          </el-form-item>
        </el-col>
        <!--查询重置-->
        <el-col :xl="6" :lg="7" :md="8" :sm="24">
          <el-form-item label-width="0px">
            <el-button type="primary" icon="el-icon-search" @click="query"
              >查询</el-button
            >
            <el-button icon="el-icon-refresh-right" @click="reset"
              >重置</el-button
            >
          </el-form-item>
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
      <el-table-column label="操作" fixed="right" width="180" align="center">
        <template #default="scope">
          <el-button type="text" @click="details(scope.row)">查看</el-button>
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="resetPw(scope.row)"
            >重置密码</el-button
          >
          <el-button type="text" @click="disablePw(scope.row)">禁用</el-button>
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
    <CustomerDetails
      v-if="detailsVisible"
      v-model:visible="detailsVisible"
      :record="record"
    ></CustomerDetails>
    <!-- 编辑 -->
    <CustomerEdit
      v-if="editVisible"
      v-model:visible="editVisible"
      :record="record"
    ></CustomerEdit>
  </el-card>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  ref,
  watch,
  getCurrentInstance,
} from 'vue'
import api from '@/server/api/system'
import { CustomerDetails, CustomerEdit } from './components'
export default defineComponent({
  name: 'CustomerList',
  components: {
    CustomerDetails,
    CustomerEdit,
  },
  setup() {
    /**
     * @method getCurrentInstance 获取当前组件实例
     */
    const instance = getCurrentInstance()
    const { proxy } = instance as any

    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        customerNo: '', // 商户编号
        customerName: '', // 商户名称
        phone: '', // 手机号
        agentNo: '', // 直属代理编号
        agentName: '', // 直属代理名称
        idCard: '', // 身份证号
        primaryNo: '', // 一级编号
        customerGrade: '', // 商户等级
        customerSource: '', // 商户来源
        date: [], // 申请时间
        startDate: '', // 申请时间-开始时间
        endDate: '', // 申请时间-结束时间
        terminalSN: '', // 终端SN
        channelNo: '', // 渠道商编
        policyType: '', // 模式类型
        machineSN: '', // 机器SN
        customerType: '', // 商户类型
        status: '', // 审核状态
        qualification: '', // 商户资质
        account: '', // 登录账号
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [{ customerNo: '87291039507' }],
      columns: [
        { key: 'customerNo', label: '商户编号', width: '120' },
        { key: 'channelNo', label: '渠道商编', width: '100' },
        { key: 'customerName', label: '商户名称', width: '100' },
        { key: 'customerGrade', label: '商户等级', width: '100' },
        { key: 'agentNo', label: '直属代理编号', width: '100' },
        { key: 'agentName', label: '直属代理名称', width: '120' },
        { key: 'primaryNo', label: '一级编号', width: '100' },
        { key: 'status', label: '审核状态', width: '100' },
        { key: 'customerSource', label: '商户来源', width: '100' },
        { key: 'policyType', label: '模式类型', width: '100' },
        { key: 'qualification', label: '商户资质', width: '100' },
        { key: 'date', label: '创建时间', width: '160' },
      ],
      // 枚举
      customerGradeList: [
        // 商户等级
        { value: '1', label: '商户APP' },
        { value: '0', label: '服务商APP' },
        { value: '2', label: '认证商户' },
      ],
      // 商户来源
      customerSourceList: [
        { value: '1', label: '注册商户' },
        { value: '0', label: '基础商户' },
        { value: '2', label: '服务商后台' },
        { value: '3', label: '商户二维码邀请' },
        { value: '4', label: '服务商二维码邀请' },
        { value: '5', label: '服务商接口进件商户' },
      ],
      statusList: [
        // 审核状态
        { value: '1', label: '审核通过' },
        { value: '0', label: '审核拒绝' },
        { value: '2', label: '审核中' },
        { value: '3', label: '待提审' },
        { value: '4', label: '已注销' },
      ],
      // 商户资质
      qualificationList: [
        { value: '1', label: '企业' },
        { value: '0', label: '个人' },
      ],
      // 模式类型
      policyTypeList: [
        { value: '1', label: '传统模式' },
        { value: '0', label: '2.0模式' },
        { value: '2', label: '大pos模式' },
      ],
      // 机具类型
      customerTypeList: [
        { value: '1', label: '电签商户' },
        { value: '0', label: 'MPOS/手刷商户' },
        { value: '2', label: '大pos商户' },
        { value: '3', label: '无' },
      ],
      record: {}, // 选中行
      detailsVisible: false, // 查看详情
      editVisible: false, // 编辑
    })

    // 监听申请时间
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
    // 编辑
    const edit = (row: any) => {
      state.editVisible = true
      state.record = row
    }
    // 重置密码
    const resetPw = () => {
      proxy
        .$confirm('确定要重置密码吗？', '操作提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
          console.log('重置成功')
        })
        .catch(() => {})
    }
    // 禁用
    const disablePw = () => {
      proxy
        .$confirm('确定要禁用该商户吗？', '操作提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
          console.log('禁用成功')
        })
        .catch(() => {})
    }
    return {
      formRef,
      ...toRefs(state),
      pageChange,
      getList,
      query,
      reset,
      details,
      edit,
      resetPw,
      disablePw,
    }
  },
})
</script>

<style lang="scss" scoped></style>
