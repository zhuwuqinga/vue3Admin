/* * @Author: zhuwuqing * @Date: 2021-10-09 10:37:52 * @Last Modified by:
zhuwuqing * @Last Modified time: 2021-10-09 14:15:57 */
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
            <el-form-item label="商户编号" prop="userNo">
              <el-input
                v-model="searchQuery.userNo"
                placeholder="请输入商户编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户名称" prop="custName">
              <el-input
                v-model="searchQuery.custName"
                placeholder="请输入商户名称"
              ></el-input>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="提额类型" prop="source">
              <el-select
                v-model="searchQuery.source"
                placeholder="请选择提额类型"
              >
                <el-option label="全部" value=""></el-option>
                <el-option label="商户自主提额" value="1"></el-option>
                <el-option label="服务商后台待提额" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="8">
            <el-form-item label="直属代理商编号" prop="agentNo">
              <el-input
                v-model="searchQuery.agentNo"
                placeholder="请输入直属代理商编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="操作时间" prop="daterange">
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
          label="认证人"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data4"
          label="操作人"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data5"
          label="直属代理商编号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data6"
          label="提额类型"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data7"
          label="提额认证时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data8"
          label="卡号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="data9"
          label="预留手机号"
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
  name: 'MentionForehead',
  setup() {
    const searchForm = <any>ref(null)
    const data = <any>reactive({
      searchQuery: {
        userNo: '',
        custName: '',
        source: '',
        agentNo: '',
        daterange: [],
        createTimeStart: '',
        createTimeEnd: '',
        currentPage: 1,
        pageSize: 10,
      },
      tableData: [
        {
          id: 1,
          data1: '87291039507',
          data2: '测试个人商户01',
          data3: '曾智通',
          data4: '13500000005',
          data5: '82391438057',
          data6: '服务商后台代提额',
          data7: '2021-09-26 21:29:49',
          data8: '622*******974866',
          data9: '131****1165',
        },
        {
          id: 2,
          data1: '87291039505',
          data2: '测试个人商户01',
          data3: '曾智通',
          data4: '13500000005',
          data5: '82391438057',
          data6: '服务商后台代提额',
          data7: '2021-09-26 21:29:49',
          data8: '622*******974866',
          data9: '131****1165',
        },
        {
          id: 3,
          data1: '87291039506',
          data2: '测试个人商户01',
          data3: '曾智通',
          data4: '13500000005',
          data5: '82391438057',
          data6: '服务商后台代提额',
          data7: '2021-09-26 21:29:49',
          data8: '622*******974866',
          data9: '131****1165',
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
          data.searchQuery.createTimeStart = value[0] || ''
          data.searchQuery.createTimeEnd = value[1] || ''
        } else {
          data.searchQuery.createTimeStart = ''
          data.searchQuery.createTimeEnd = ''
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
