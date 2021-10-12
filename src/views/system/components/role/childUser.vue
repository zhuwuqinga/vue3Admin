<template>
  <el-card class="role_card">
    <i class="el-icon-circle-close child_close" @click="childClick"></i>
    <!-- 搜索区域 -->
    <el-form ref="form" :model="searchQuery" label-width="80px">
      <el-row :span="24">
        <el-col :span="9">
          <el-form-item label="用户账号">
            <el-input
              v-model="searchQuery.username"
              placeholder="请输入用户账号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="ml20">
          <el-button type="primary" icon="el-icon-search" @click="loadList(childId)"
            >搜索</el-button
          >
          <el-button type="default" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col>
        <el-button type="primary" @click="addClick"><i class="el-icon-plus"></i> 新增用户</el-button>
        <el-button type="primary" ><i class="el-icon-plus"></i> 已有用户</el-button>
        <el-button @click="delClick"><i class="el-icon-delete"></i> 批量删除</el-button>
      </el-col>
    </el-row>
    <el-table class="mt20" v-loading="loading" :data="tableData" border>
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" prop="username" label="用户账号"></el-table-column>
      <el-table-column align="center" prop="realname" label="用户名称"></el-table-column>
      <el-table-column align="center" prop="status_dictText" label="状态"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template #default="scope">
            <el-button type="text" @click="editClick(scope.row)">编辑</el-button>
            <el-button type="text" @click="delClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <PageNation
      v-if="total>0"
      :total="total"
      v-model:page.sync="searchQuery.pageNo"
      v-model:limit.sync="searchQuery.pageSize"
      @pagination="pagination"
    ></PageNation>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import api from '@/server/api/role'

export default defineComponent({
  name: 'Role',
  emits: ['childClick'],
  props: {
    childId: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    // 所有页面数据资源
    const data = reactive({
      searchQuery: <any>{
        username: null,
        pageNo: 1,
        pageSize: 10,
        order: 'desc',
        column: 'createTime',
      },
      tableData: [],
      total: 0,
      loading: false
    })
    // 加载列表数据
    const loadList = (id:String) => {
      data.loading = true
      const params = data.searchQuery
      params.roleId = id
      api.userRoleList(params).then((res: any) => {
        data.loading = false
        if (res.origin.code == 0) {
          data.tableData = res.origin.result.records
          data.total = res.origin.result.total
        }
      })
    }
    // 重置搜索项
    const reset = () => {
      data.searchQuery.username = null
      console.log(props.childId)
      loadList(props.childId)
    }
    // 新增
    const addClick = (row:any) => {
      console.log('编辑', row)
    }
    // 编辑
    const editClick = (row:any) => {
      console.log('编辑', row)
    }
    // 删除
    const delClick = (row:any) => {
      console.log('删除', row)
    }
    // 分页改变
    const pagination = () => {
      loadList(props.childId)
    }
    const childClick = () => {
      ctx.emit('childClick')
    }
    onMounted(() => {
      loadList(props.childId)
    })
    return {
      ...toRefs(data),
      loadList,
      reset,
      pagination,
      addClick,
      editClick,
      delClick,
      childClick
    }
  },
})
</script>
<style lang="scss" scoped>
.role_card{
  margin-left: 10px;
  position: relative;
}
.child_close{
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 999;
  cursor: pointer;
}
</style>
