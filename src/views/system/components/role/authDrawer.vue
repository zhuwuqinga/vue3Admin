<template>
  <div>
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="key"
      :expand-on-click-node="false"
      :check-on-click-node="true"
      :default-expanded-keys="default_expanded_keys"
      :default-checked-keys="default_checked_keys"
      :props="defaultProps"
    />
    <div class="btn_list">
      <el-row>
        <el-col>
          <el-button type="primary">保存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import api from '@/server/api/role'

export default defineComponent({
  name: 'AuthDrawer',
  props: {
    roleId: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    // 全部数据资源
    const data = reactive({
      treeData: [],
      default_expanded_keys: [],
      default_checked_keys: [],
      defaultProps: {
        children: 'children',
        label: 'slotTitle',
      }
    })
    // 获取所有页面树
    const loadData = () => {
      api.queryTreeList().then((res:any) => {
        if(res.origin.code === 0){
          data.treeData = res.origin.result.treeList
          data.default_expanded_keys = res.origin.result.ids
        }
      })
    }
    // 获取当前用户权限ids
    const loadRolePermission = async (id:String) => {
      await loadData()
      api.queryRolePermission({roleId: id}).then((res:any) => {
        if(res.origin.code === 0){
          data.default_checked_keys = res.origin.result
        }
      })
    }
    onMounted(()=>{
      loadRolePermission(props.roleId)
    })
    return {
      ...toRefs(data),
      loadData,
      loadRolePermission
    }
  },
})
</script>
<style lang="scss" scoped>
.btn_list{
  width: 30%;
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 9999;
}
</style>
