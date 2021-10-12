/* * @Author: zhuwuqing * @Date: 2021-10-09 10:37:37 * @Last Modified by:
zhuwuqing * @Last Modified time: 2021-10-09 11:52:25 */
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
            <el-form-item label="生效时间" prop="daterange">
              <el-date-picker
                v-model="searchQuery.daterange"
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
            <el-form-item label="失效时间" prop="daterangePast">
              <el-date-picker
                v-model="searchQuery.daterangePast"
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
            <el-form-item label="商户编号" prop="customerNo">
              <el-input
                v-model="searchQuery.customerNo"
                placeholder="请输入商户编号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="服务商编号" prop="agentNo">
              <el-input
                v-model="searchQuery.agentNo"
                placeholder="请输入服务商编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否包含子代" prop="isIncludeChild">
              <el-select
                v-model="searchQuery.isIncludeChild"
                placeholder="请选择是否包含子代"
              >
                <el-option label="是" :value="0"></el-option>
                <el-option label="否" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务商维度" prop="notORG">
              <el-select
                v-model="searchQuery.notORG"
                placeholder="请选择服务商维度"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="代理商" value="1"></el-option>
                <el-option label="机构" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="优惠劵状态" prop="status">
              <el-select
                v-model="searchQuery.status"
                placeholder="请选择优惠劵状态"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="生效中" value="1"></el-option>
                <el-option label="失效" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" class="flex_x_center">
          <el-button type="primary" icon="el-icon-search" @click="loadList"
            >查询</el-button
          >
          <el-button type="default" @click="reset">重置</el-button>
        </el-row>
      </el-form>
      <!-- 数据统计 -->
      <el-alert
        class="not-first-row"
        :title="`优惠劵总金额：${totalCouponAmount} 元， 已使用金额：${totalUseAmount} 元， 优惠券余额：${totalNotUseAmount} 元`"
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
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data1"
          label="商户编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data2"
          label="直属编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data3"
          label="一级编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data4"
          label="优惠券金额（元）"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data5"
          label="已使用金额（元）"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data6"
          label="优惠券余额（元）"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data7"
          label="优惠券状态"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data8"
          label="生效时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data9"
          label="失效时间"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button type="text" size="small" @click="itemClick(scope.row)"
              >消费记录</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <PageNation
        :total="total"
        v-model:page.sync="searchQuery.currentPage"
        v-model:limit.sync="searchQuery.pageSize"
        @pagination="pagination"
      ></PageNation>
    </el-card>
    <el-dialog v-model="visible" :title="'消费记录'">
      <CouponConsumpRecord :id="rowId"></CouponConsumpRecord>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch, onMounted } from 'vue'
import { CouponConsumpRecord } from './components'

export default defineComponent({
  name: 'Coupon',
  components: {
    CouponConsumpRecord,
  },
  setup() {
    const searchForm = <any>ref(null)
    const data = <any>reactive({
      searchQuery: {
        startDate: '',
        endDate: '',
        startDatePast: '',
        endDatePast: '',
        customerNo: '',
        agentNo: '',
        isIncludeChild: 0,
        notORG: '',
        status: '',
        currentPage: 1,
        pageSize: 10,
        daterange: [],
        daterangePast: [],
      },
      tableData: [
        {
          id: 1,
          data1: '87291039598',
          data2: '82391438048',
          data3: '82391438047	',
          data4: '230.00	',
          data5: '6.00',
          data6: '224.00',
          data7: '失效',
          data8: '2021-09-23 10:16:01',
          data9: '2021-10-03 10:16:01',
        },
        {
          id: 2,
          data1: '87291039598',
          data2: '82391438048',
          data3: '82391438047	',
          data4: '230.00	',
          data5: '6.00',
          data6: '224.00',
          data7: '失效',
          data8: '2021-09-23 10:16:01',
          data9: '2021-10-03 10:16:01',
        },
      ],
      total: 1,
      loading: false,
      totalCouponAmount: 11074.62,
      totalUseAmount: 314.62,
      totalNotUseAmount: 10760.0,
      visible: false,
      rowId: '',
    })
    const loadList = () => {
      console.log('加载列表数据', data.searchQuery)
    }
    const reset = () => {
      searchForm.value.resetFields()
      console.log('重置查询项', data.searchQuery)
      loadList()
    }
    const itemClick = (row: any) => {
      data.visible = true
      data.rowId = row.id
      console.log('消费记录', row)
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
      () => data.searchQuery.daterange,
      (value) => {
        if (value) {
          data.searchQuery.startDate = value[0] || ''
          data.searchQuery.endDate = value[1] || ''
        } else {
          data.searchQuery.startDate = ''
          data.searchQuery.endDate = ''
        }
      }
    )
    watch(
      () => data.searchQuery.daterangePast,
      (value) => {
        if (value) {
          data.searchQuery.startDatePast = value[0] || ''
          data.searchQuery.endDatePast = value[1] || ''
        } else {
          data.searchQuery.startDatePast = ''
          data.searchQuery.endDatePast = ''
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
      itemClick,
    }
  },
})
</script>
