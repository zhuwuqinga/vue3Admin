/* * @Author: zhuwuqing * @Date: 2021-10-09 10:38:14 * @Last Modified by:
zhuwuqing * @Last Modified time: 2021-10-09 11:08:15 */
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
            <el-form-item label="商户名称" prop="customerName">
              <el-input
                v-model="searchQuery.customerName"
                placeholder="请输入商户名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作人" prop="operator">
              <el-input
                v-model="searchQuery.operator"
                placeholder="请输入操作人"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="创建时间" prop="daterange">
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
        </el-row>
        <el-row :span="24" class="flex_x_center">
          <el-button type="primary" icon="el-icon-search" @click="loadList"
            >查询</el-button
          >
          <el-button type="default" @click="reset">重置</el-button>
          <DownLoad :routeName="'customerManageChange'"></DownLoad>
        </el-row>
      </el-form>
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
          label="商户名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data3"
          label="变更前"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data4"
          label="变更后"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data5"
          label="操作时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data6"
          label="操作人"
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

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch, onMounted } from 'vue'
export default defineComponent({
  name: 'ManageChange',
  setup() {
    const searchForm = <any>ref(null)
    const data = <any>reactive({
      searchQuery: {
        customerNo: '',
        customerName: '',
        operator: '',
        startTime: '',
        endTime: '',
        daterange: [],
        currentPage: 1,
        pageSize: 10,
      },
      tableData: [
        {
          id: 1,
          data1: '87291039507',
          data2: '测试个人商户01',
          data3: '关闭',
          data4: '关闭',
          data5: '2021-09-27 17:31:21',
          data6: 'system',
        },
        {
          id: 2,
          data1: '87291039507',
          data2: '测试个人商户01',
          data3: '关闭',
          data4: '关闭',
          data5: '2021-09-27 17:31:21',
          data6: 'system',
        },
        {
          id: 3,
          data1: '87291039507',
          data2: '测试个人商户01',
          data3: '关闭',
          data4: '关闭',
          data5: '2021-09-27 17:31:21',
          data6: 'system',
        },
      ],
      total: 3,
      loading: false,
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
      () => data.searchQuery.daterange,
      (value) => {
        if (value) {
          data.searchQuery.startTime = value[0] || ''
          data.searchQuery.endTime = value[1] || ''
        } else {
          data.searchQuery.startTime = ''
          data.searchQuery.endTime = ''
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
