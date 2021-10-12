<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="formData.roleCode" :disabled="status === 2" placeholder="请输入角色编码"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="formData.roleName" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="formData.description" placeholder="请输入角色描述"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import api from '@/server/api/role'

export default defineComponent({
  name: 'EditForm',
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    status: {
      type: Number,
      default: 1
    }
  },
  setup(props, ctx) {
    // 所有页面数据资源
    const form = <any>ref(null)
    const validateRoleCode = (rule:any, value:any, callback:any) => {
      if(/[\u4E00-\u9FA5]/g.test(value)){
          callback("角色编码不可输入汉字!");
        }else{
          let params = {
            tableName: "sys_role",
            fieldName: "role_code",
            fieldVal: value,
            dataId: props.formData.id,
          };
          api.duplicateCheck(params).then((res:any)=>{
            if(res.status){
              callback();
            }else{
              callback(res.message);
            }
          });
        }
    }
    const data = reactive({
      rules: {
        roleCode: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          { min: 0, max: 64, message: '长度不超过 64 个字符', trigger: 'blur' },
          { validator: validateRoleCode}
        ],
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        description: [
          { min: 0, max: 126, message: '长度不超过 126 个字符', trigger: 'blur' }
        ]
      }
    })
    return {
      validateRoleCode,
      ...toRefs(data),
      form
    }
  },
})
</script>
<style lang="scss" scoped>
</style>
