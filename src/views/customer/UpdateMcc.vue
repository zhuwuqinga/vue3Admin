<!--
 * @Author: linfudong
 * @Date: 2021-10-11 15:46:17
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 15:52:12
 * @Description: 修改商户Mcc
-->
<template>
  <el-card class="update-mcc">
    <!--查询区域-->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="180px">
      <el-row :gutter="24">
        <el-col :md="9" :sm="12">
          <el-form-item label="商户编号" prop="customerNo">
            <el-input
              v-model="form.customerNo"
              placeholder="请输入商户编号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="商户名称">
        <span>{{ form.customerName }}</span>
      </el-form-item>
      <el-form-item label="商户当前Mcc码">
        <span>{{ form.mcc }}</span>
      </el-form-item>
      <el-row :gutter="24">
        <el-col :md="9" :sm="12">
          <el-form-item label="修改Mcc码" prop="updateMcc">
            <el-input
              v-model="form.updateMcc"
              placeholder="若不输入则执行智能账单规则"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :md="9" :sm="12">
          <el-form-item label="修改Mcc名称">
            <el-input
              v-model="form.updateMccTxt"
              placeholder="请输入修改Mcc名称"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, ref, getCurrentInstance } from 'vue'
// import api from '@/server/api/system'
export default defineComponent({
  name: 'UpdateMcc',
  components: {},
  setup() {
    /**
     * @method getCurrentInstance 获取当前组件实例
     */
    const instance = getCurrentInstance()
    const { proxy } = instance as any

    const formRef = ref(null) // form表单

    const state = reactive({
      form: {
        customerNo: '1000022', // 商户编号
        customerName: '测试个人商户01', // 商户名称
        mcc: '0780', // 商户当前Mcc码
        mccTxt: '景观美化及园艺服务', // 商户当前Mcc名称
        updateMcc: '', // 修改Mcc码
        updateMccTxt: '', // 修改Mcc名称
      },
    })
    // 定义校验规则
    const rules = {
      // 商户编号
      customerNo: [
        { required: true, message: '请输入商户编号', trigger: 'blur' },
      ],
      // 修改Mcc码
      updateMcc: [
        { required: true, message: '请输入修改Mcc码', trigger: 'blur' },
      ],
    }

    // 提交
    const submit = () => {
      ;(formRef.value as any).validate((valid: any) => {
        console.log(valid)
        if (valid) {
          proxy
            .$confirm('确认修改商户Mcc吗？', '操作提示', {
              confirmButtonText: '确 定',
              cancelButtonText: '取 消',
              type: 'warning',
            })
            .then(() => {
              console.log('修改成功')
            })
            .catch(() => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    return {
      formRef,
      ...toRefs(state),
      rules,
      submit,
    }
  },
})
</script>

<style lang="scss" scoped></style>
