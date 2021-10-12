<!--
 * @Author: linfudong
 * @Date: 2021-10-11 11:54:22
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 14:15:03
 * @Description: 更新额度等级
-->
<template>
  <el-card class="update-limit-level">
    <!--查询区域-->
    <el-form :model="form" ref="formRef" label-width="140px">
      <el-row :gutter="24">
        <el-col :md="8" :sm="12">
          <el-form-item label="商户编号" prop="customerNo">
            <el-input
              v-model="form.customerNo"
              placeholder="请输入商户编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xl="6" :lg="7" :md="8" :sm="24">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, ref, getCurrentInstance } from 'vue'
// import api from '@/server/api/system'
export default defineComponent({
  name: 'UpdateLimitLevel',
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
        customerNo: '', // 商户编号
      },
    })

    // 提交
    const submit = () => {
      if (!state.form.customerNo) {
        proxy.$message.warning('请输入商户编号')
        return false
      }
      proxy
        .$confirm('确认更新商户等级吗？', '操作提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
          console.log('更新成功')
        })
        .catch(() => {})
    }

    return {
      formRef,
      ...toRefs(state),
      submit,
    }
  },
})
</script>

<style lang="scss" scoped></style>
