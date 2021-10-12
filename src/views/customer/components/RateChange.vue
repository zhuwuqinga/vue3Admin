<!--
 * @Author: linfudong
 * @Date: 2021-10-09 17:17:58
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 16:53:09
 * @Description: 费率变更查询-费率变更
-->
<template>
  <div class="rate-change">
    <el-dialog
      title="费率变更"
      v-model="visible"
      width="800px"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="formRef" label-width="140px">
        <el-row :gutter="24">
          <el-col :md="12" :sm="12">
            <el-form-item label="商户编号" prop="customerNo">
              <el-input
                v-model="form.customerNo"
                placeholder="请输入商户编号"
              ></el-input>
            </el-form-item>
            <el-form-item label="商户名称" prop="customerNo">
              <span>{{ form.customerName }}</span>
            </el-form-item>
          </el-col>
          <!--查询-->
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-button type="primary" @click="query">查询</el-button>
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
export default defineComponent({
  name: 'RateChange',
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
        customerNo: '', // 商户编号
        customerName: '测试商户tiantian', // 商户名称
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
    })
    /**
     * Methods
     */
    // 查询
    const query = () => {}

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
      console.log(state.tableData, 'tableData')
      console.log('提交成功')
      proxy
        .$confirm('确认提交该信息吗?', '操作提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
          console.log(state.tableData, 'tableData')
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
      query,
      onBlur,
      confirm,
    }
  },
})
</script>
<style lang="scss" scoped>
.rate-change {
  .table-container {
    .el-input {
      width: 60%;
    }
  }
}
</style>
