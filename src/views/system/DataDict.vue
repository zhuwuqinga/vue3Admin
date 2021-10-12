<!--
 * @Author: linfudong
 * @Date: 2021-09-29 15:38:55
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:42:51
 * @Description: 数据字典
-->
<template>
  <el-card>
    <!--查询区域-->
    <el-form :model="queryParam" ref="formRef">
      <el-row :gutter="24">
        <el-col :md="6" :sm="12">
          <el-form-item label="字典名称" prop="dictName">
            <el-input
              v-model="queryParam.dictName"
              placeholder="请输入字典名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="6" :sm="8">
          <el-form-item label="字典编号" prop="dictCode">
            <el-input
              v-model="queryParam.dictCode"
              placeholder="请输入字典编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <!--查询重置-->
        <el-col :xl="6" :lg="7" :md="8" :sm="24">
          <el-button type="primary" icon="el-icon-search" @click="query"
            >查询</el-button
          >
          <el-button type="primary" icon="el-icon-refresh-right" @click="reset"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <!--table区域-->
    <div>
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
        <el-table-column label="操作" fixed="right" width="120" align="center">
          <template #default="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <PageNation
        :total="total"
        v-model:page.sync="queryParam.pageNo"
        v-model:limit.sync="queryParam.pageSize"
        @pagination="pageChange"
      />
    </div>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref } from 'vue'
import api from '@/server/api/system'
export default defineComponent({
  name: 'DataDict',
  components: {},
  setup() {
    const formRef = ref(null) // form表单

    const state = reactive({
      // 查询入参
      queryParam: {
        dictName: '', // 字典名称
        dictCode: '', // 字典编号
        column: 'createTime', // 根据创建时间降序
        order: 'desc',
        pageNo: 1,
        pageSize: 10,
      },
      // 表格数据
      total: 0,
      tableData: [],
      columns: [
        { key: 'dictName', label: '字典名称', width: '120' },
        { key: 'dictCode', label: '字典编号', width: '100' },
        { key: 'description', label: '描述', width: '120' },
      ],
    })

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
