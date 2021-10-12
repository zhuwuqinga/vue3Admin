<!--
 * @Author: linfudong
 * @Date: 2021-10-11 09:18:10
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 16:53:56
 * @Description: 费率变更查询-批量修改费率
-->
<template>
  <div class="batch-rate-change">
    <el-dialog
      title="批量修改费率"
      v-model="visible"
      width="800px"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="formRef" label-width="140px">
        <el-row :gutter="24">
          <el-col :md="24" :sm="12">
            <el-form-item label="上传文件">
              <FileUpload
                @uploadFile="uploadFile"
                :uploadBtn="false"
              ></FileUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :md="12" :sm="12">
            <el-form-item label="政策类型" prop="policyType">
              <el-select v-model="form.policyType" placeholder="请选择政策类型">
                <el-option
                  v-for="item in policyTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12">
            <el-form-item label="政策名称" prop="policyName">
              <el-select v-model="form.policyName" placeholder="请选择政策名称">
                <el-option
                  v-for="item in policyNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        border
        :data="tableData"
        style="width: 100%"
        class="table-container"
      >
        <el-table-column align="center" label="交易类型">
          <template #default="scope">
            <div>{{ scope.row.type }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="费率设置（%）">
          <template #default="scope">
            <span>{{ scope.row.skT0RateMin }}≤ </span>
            <el-input
              v-model="scope.row.skT0Rate"
              placeholder="请输入费率"
              @blur="
                onBlur(
                  $event,
                  scope.$index,
                  'skT0Rate',
                  scope.row.skT0RateMin,
                  scope.row.skT0RateMax
                )
              "
              oninput="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3').replace(/[^\d\.]/g,'')"
            ></el-input>
            <span> ≤{{ scope.row.skT0RateMax }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="days" label="T0提现费（元）">
          <template #default="scope">
            <span>{{ scope.row.skT0EstreatMin }}≤ </span>
            <el-input
              v-model="scope.row.skT0Estreat"
              placeholder="请输入提现费"
              @blur="
                onBlur(
                  $event,
                  scope.$index,
                  'skT0Estreat',
                  scope.row.skT0EstreatMin,
                  scope.row.skT0EstreatMax
                )
              "
              oninput="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3').replace(/[^\d\.]/g,'')"
            ></el-input>
            <span> ≤{{ scope.row.skT0EstreatMax }}</span>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
import FileUpload from 'components/fileUpload/FileUpload.vue'
export default defineComponent({
  name: 'BatchRateChange',
  components: {
    FileUpload,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    /**
     * @method getCurrentInstance 获取当前组件实例
     */
    const instance = getCurrentInstance()
    const { proxy } = instance as any

    const state = reactive({
      form: {
        policyType: '', // 政策类型
        policyName: '', // 政策名称
        path: '', // 文件路径
      },
      tableData: [
        {
          type: '刷卡T0/T1',
          skT0Rate: 0.52,
          skT0RateMin: 0.52,
          skT0RateMax: 0.65,
          skT0Estreat: 1,
          skT0EstreatMin: 1,
          skT0EstreatMax: 3,
        },
      ] as any,
      // 政策类型
      policyTypeList: [
        { value: '1', label: '传统模式' },
        { value: '2', label: '大POS模式' },
      ],
      // 政策名称
      policyNameList: [
        { value: '1', label: '卡乐宝' },
        { value: '0', label: '卡乐宝pro' },
        { value: '2', label: '卡乐宝卡客版' },
      ],
    })
    /**
     * Methods
     */

    // 上传文件
    const uploadFile = (path: any) => {
      state.form.path = path
    }

    /**
     * 初始化值
     * @param index 下标
     * @param key 需要修改的字段
     * @param min 最小值
     * @param max 最大值
     */
    const onBlur = (
      event: any,
      index: number,
      key: string,
      min: number,
      max: number
    ) => {
      if (event.target.value < min) {
        state.tableData[index][key] = min
        return false
      }
      if (event.target.value > max) {
        state.tableData[index][key] = max
        return false
      }
    }

    // 确定
    const confirm = () => {
      proxy
        .$confirm('确认提交该信息吗?', '操作提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
          console.log('提交成功')
        })
        .catch(() => {})
    }

    // 关闭弹框
    const handleClose = () => {
      context.emit('update:visible', false)
    }

    return {
      ...toRefs(state),
      handleClose,
      onBlur,
      confirm,
      uploadFile,
    }
  },
})
</script>
<style lang="scss" scoped>
.batch-rate-change {
  .table-container {
    .el-input {
      width: 60%;
    }
  }
}
</style>
