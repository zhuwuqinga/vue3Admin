/* * @Author: zhuwuqing * @Date: 2021-10-09 10:38:05 * @Last Modified by:
zhuwuqing * @Last Modified time: 2021-10-09 11:24:43 */
<template>
  <div>
    <el-card class="role_card">
      <!-- 搜索 -->
      <el-form
        class="search_form"
        ref="searchForm"
        :model="searchQuery"
        label-width="120px"
      >
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="商户编号" prop="customerNo">
              <el-input
                v-model="searchQuery.customerNo"
                placeholder="请输入商户编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="直属代理编号" prop="agentNo">
              <el-input
                v-model="searchQuery.agentNo"
                placeholder="请输入直属代理编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一代编号" prop="plusAgentNo">
              <el-input
                v-model="searchQuery.plusAgentNo"
                placeholder="请输入一代编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="激活时间" prop="daterangeActive">
              <el-date-picker
                v-model="searchQuery.daterangeActive"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="首绑时间" prop="daterangeBind">
              <el-date-picker
                v-model="searchQuery.daterangeBind"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库时间" prop="daterangeStore">
              <el-date-picker
                v-model="searchQuery.daterangeStore"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="模式类型" prop="modelType">
              <el-select
                v-model="searchQuery.modelType"
                placeholder="请选择模式类型"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="传统模式" value="1"></el-option>
                <el-option label="2.0模式" value="2"></el-option>
                <el-option label="大POS模式" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户活动" prop="marktingCode">
              <el-select
                v-model="searchQuery.marktingCode"
                placeholder="请选择商户活动"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="商户活动1" value="1"></el-option>
                <el-option label="商户活动2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统计时间" prop="daterangeStat">
              <el-date-picker
                v-model="searchQuery.daterangeStat"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="补扣编号" prop="frozenOrder">
              <el-input
                v-model="searchQuery.frozenOrder"
                placeholder="请输入补扣编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="终端SN" prop="sn">
              <el-input
                v-model="searchQuery.sn"
                placeholder="请输入终端SN"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" class="flex_x_center">
          <el-button type="primary" icon="el-icon-search" @click="loadList"
            >查询</el-button
          >
          <el-button type="default" @click="reset">重置</el-button>
          <DownLoad :routeName="'customerUnActivation'"></DownLoad>
        </el-row>
      </el-form>
      <!-- 数据统计 -->
      <el-alert
        class="not-first-row"
        :title="`总计：${totalCount} 人， 需补扣金额：${totalAmount} 元`"
        type="success"
        :closable="false"
      >
      </el-alert>
      <!-- 表格 -->
      <el-table class="mt20" v-loading="loading" :data="tableData" border>
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          fixed="left"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data0"
          label="统计时间"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data1"
          label="商户编号"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data2"
          label="商户名称"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data3"
          label="参与政策"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data4"
          label="直属代理编号"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data5"
          label="商户活动"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data6"
          label="首绑时间"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data7"
          label="首绑机入库时间"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data8"
          label="激活时间"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data9"
          label="考核截止时间"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data10"
          label="考核期交易金额（元）"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data11"
          label="需补扣金额（元）"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data12"
          label="补扣编号"
          width="150"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data13"
          label="终端SN"
          width="100"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <PageNation
        :total="total"
        v-model:page.sync="searchQuery.currentPage"
        v-model:limit.sync="searchQuery.pageSize"
        @pagination="pagination"
      ></PageNation>
    </el-card>
  </div>
</template>
UnActivation
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch, onMounted } from 'vue'
export default defineComponent({
  name: 'UnActivation',
  setup() {
    const searchForm = <any>ref(null)
    const data = <any>reactive({
      searchQuery: {
        customerNo: '',
        agentNo: '',
        plusAgentNo: '',
        startActiveTime: '',
        endActiveTime: '',
        startBindTime: '',
        endBindTime: '',
        startStoreTime: '',
        endStoreTime: '',
        modelType: '',
        marktingCode: '',
        startStatTime: '',
        endStatTime: '',
        frozenOrder: '',
        sn: '',
        currentPage: 1,
        pageSize: 10,
        daterangeActive: [],
        daterangeBind: [],
        daterangeStore: [],
        daterangeStat: [],
      },
      tableData: [
        {
          id: 1,
          data0: '2021-09-08 14:49:24',
          data1: '87291638044',
          data2: '测试商户_黄总',
          data3: '测试用政策（勿动）',
          data4: '82391138289',
          data5: '押金-直属',
          data6: '2020-08-03 19:20:49',
          data7: '2020-08-03 10:45:48',
          data8: '2020-08-04 15:42:15',
          data9: '2020-08-08 23:59:59',
          data10: '0.00',
          data11: '10.00',
          data12: 'f8f6116aef564ea98fcfe3734492613f',
          data13: '7130005558',
        },
      ],
      total: 1,
      loading: false,
      totalCount: 0,
      totalAmount: 0,
    })
    const loadList = () => {
      console.log('加载列表数据', data.searchQuery)
    }
    const reset = () => {
      searchForm.value.resetFields()
      console.log('重置查询项', data.searchQuery)
      loadList()
    }
    const pagination = () => {
      loadList()
    }
    const indexMethod = (index: number) => {
      return index + 1
    }
    onMounted(() => {
      loadList()
    })
    watch(
      () => data.searchQuery.daterangeActive,
      (value) => {
        if (value) {
          data.searchQuery.startActiveTime = value[0] || ''
          data.searchQuery.endActiveTime = value[1] || ''
        } else {
          data.searchQuery.startActiveTime = ''
          data.searchQuery.endActiveTime = ''
        }
      }
    )
    watch(
      () => data.searchQuery.daterangeBind,
      (value) => {
        if (value) {
          data.searchQuery.startBindTime = value[0] || ''
          data.searchQuery.endBindTime = value[1] || ''
        } else {
          data.searchQuery.startBindTime = ''
          data.searchQuery.endBindTime = ''
        }
      }
    )
    watch(
      () => data.searchQuery.daterangeStore,
      (value) => {
        if (value) {
          data.searchQuery.startStoreTime = value[0] || ''
          data.searchQuery.endStoreTime = value[1] || ''
        } else {
          data.searchQuery.startStoreTime = ''
          data.searchQuery.endStoreTime = ''
        }
      }
    )
    watch(
      () => data.searchQuery.daterangeStat,
      (value) => {
        if (value) {
          data.searchQuery.startStatTime = value[0] || ''
          data.searchQuery.endStatTime = value[1] || ''
        } else {
          data.searchQuery.startStatTime = ''
          data.searchQuery.endStatTime = ''
        }
      }
    )
    return {
      ...toRefs(data),
      loadList,
      reset,
      pagination,
      indexMethod,
      searchForm,
    }
  },
})
</script>
