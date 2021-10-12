<template>
  <div class="role_container">
    <el-card class="role_card">
      <!-- 搜索区域 -->
      <el-form ref="form" :model="searchQuery" label-width="80px">
        <el-row :span="24">
          <el-col :span="9">
            <el-form-item label="角色名称">
              <el-input
                v-model="searchQuery.roleName"
                placeholder="请输入角色名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="ml20">
            <el-button type="primary" icon="el-icon-search" @click="loadList"
              >搜索</el-button
            >
            <el-button type="default" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 新增按钮 -->
      <el-button type="primary" @click="addClick"><i class="el-icon-plus"></i> 新增角色</el-button>
      <!-- 角色表格 -->
      <el-table class="mt20" v-loading="loading" :data="tableData" border>
        <el-table-column align="center" type="index" :index="indexMethod"></el-table-column>
        <el-table-column align="center" prop="roleCode" label="角色编码"></el-table-column>
        <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template #default="scope">
            <el-button type="text" @click="handleUser(scope.row)">用户</el-button>
            <el-dropdown style="margin-left: 10px;">
              <span style="color: #409eff" class="aaaaaa">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="authClick(scope.row)">授权</el-dropdown-item>
                  <el-dropdown-item @click="editClick(scope.row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click="delClick(scope.row)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <PageNation
        v-if="total>0"
        :total="total"
        v-model:page.sync="searchQuery.pageNo"
        v-model:limit.sync="searchQuery.pageSize"
        @pagination="pagination"
      ></PageNation>
    </el-card>
    <!-- 子用户表格 -->
    <ChildUser ref="child" v-if="showChild" @childClick="childClick" :childId="childId"></ChildUser>
    <!-- 新增编辑框 -->
    <el-dialog
      v-if="form_visible"
      v-model="form_visible"
      :title="form_tilte"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="40%"
    >
      <EditForm ref="valiForm" :formData="formData" :status="form_status"></EditForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="form_visible = false">关闭</el-button>
          <el-button v-if="form_status === 1" :loading="button_loading" type="primary" @click="handleAdd"
            >确定</el-button
          >
          <el-button v-else :loading="button_loading" type="primary" @click="handleEdit"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 授权框 -->
    <el-drawer
      v-model="form_drawer"
      title="角色权限配置"
      :close-on-click-modal="false"
      size="30%"
      :custom-class="'role_tree'"
    >
      <AuthDrawer ref="auth" :roleId="roleId"></AuthDrawer>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/server/api/role'
import ChildUser from './components/role/childUser.vue'
import EditForm from './components/role/editForm.vue'
import AuthDrawer from './components/role/authDrawer.vue'

export default defineComponent({
  name: 'Role',
  components: {
    ChildUser,
    EditForm,
    AuthDrawer
  },
  setup() {
    // 所有页面数据资源
    const data = reactive({
      searchQuery: {
        roleName: null,
        pageNo: 1,
        pageSize: 10,
        order: 'desc',
        column: 'createTime',
      },
      tableData: [],
      total: 0,
      loading: false,
      showChild: false,
      childId: '',
      form_visible: false,
      form_tilte: '新增',
      form_status: 1,
      button_loading: false,
      formData: <any>{
        roleCode: '',
        roleName: '',
        description: ''
      },
      form_drawer: false,
      roleId: ''
    })
    // 子组件ref
    const valiForm = <any>ref(null)
    const child = <any>ref(null)
    const auth = <any>ref(null)
    // 加载列表数据
    const loadList = () => {
      data.loading = true
      api.list(data.searchQuery).then((res: any) => {
        data.loading = false
        if (res.origin.code === 0) {
          data.tableData = res.origin.result.records
          data.total = res.origin.result.total
        }
      })
    }
    // 重置搜索项
    const reset = () => {
      data.searchQuery.roleName = null
      loadList()
    }
    // 列表序号
    const indexMethod = (index: number) => {
      return index + 1
    }
    // 分页改变
    const pagination = () => {
      loadList()
    }
    // 点击用户显示子用户列表
    const handleUser = (row:any) => {
      data.showChild = true
      data.childId = row.id
      if(child.value){
        child.value.loadList(row.id)
      }
    }
    // 点击关闭子用户列表
    const childClick = ()=> {
      data.showChild = false
    }
    // 点击新增角色按钮
    const addClick = () => {
      data.form_visible = true
      data.form_tilte = '新增'
      data.form_status = 1
      delete data.formData.id
      data.formData.roleCode = ''
      data.formData.roleName = ''
      data.formData.description = ''
    }
    // 点击编辑角色按钮
    const editClick = (row:any) => {
      data.form_visible = true
      data.form_tilte = '编辑'
      data.form_status = 2
      data.formData.roleCode = row.roleCode
      data.formData.roleName = row.roleName
      data.formData.description = row.description
      data.formData.id = row.id
    }
    // 删除角色
    const delClick = (row:any) => {
      console.log(row)
      ElMessageBox({
        title: '提示',
        message: '是否删除该角色？',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
      }).then(() => {
        api.delRole({id: row.id}).then((res: any) => {
          console.log(res)
          if(res.status){
            ElMessage({
              message: '操作成功！',
              type: 'success',
            })
            loadList()
          } else {
            ElMessage({
              message: res.message,
              type: 'error',
            })
          }
        })
      })
    }
    // 确认新增角色
    const handleAdd = () => {
      valiForm.value.form.validate((valid: any) => {
        if (valid) {
          data.button_loading = true
          api.addRole(valiForm.value.formData).then((res:any) => {
            if(res.status){
              ElMessage({
                message: '操作成功！',
                type: 'success',
              })
              data.form_visible = false
              data.button_loading = false
              loadList()
            }else{
              data.button_loading = false
              ElMessage({
                message: res.message,
                type: 'error',
              })
            }
          })
        }
      })
    }
    // 确认编辑角色
    const handleEdit = () => {
      valiForm.value.form.validate((valid: any) => {
        if (valid) {
          data.button_loading = true
          api.eidtRole(valiForm.value.formData).then((res:any) => {
            if(res.status){
              ElMessage({
                message: '操作成功！',
                type: 'success',
              })
              data.form_visible = false
              data.button_loading = false
              loadList()
            }else{
              data.button_loading = false
              ElMessage({
                message: res.message,
                type: 'error',
              })
            }
          })
        }
      })
    }
    const authClick = (row:any) => {
      data.form_drawer = true
      data.roleId = row.id
      if(auth.value){
        auth.value.loadRolePermission(row.id)
      }
    }
    onMounted(() => {
      loadList()
    })
    return {
      ...toRefs(data),
      valiForm,
      child,
      loadList,
      reset,
      pagination,
      indexMethod,
      handleUser,
      childClick,
      addClick,
      editClick,
      handleAdd,
      handleEdit,
      delClick,
      authClick,
      auth
    }
  },
})
</script>
<style lang="scss" scoped>
.role_container{
  display: flex;
  .role_card{
    flex: 1;
  }
}
::v-deep(.role_tree .el-drawer__body){
  overflow-y: scroll;
}

</style>
