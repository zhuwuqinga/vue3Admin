<!--
 * @Author: linfudong
 * @Date: 2021-10-11 10:38:17
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-11 11:20:03
 * @Description: 商户入网修改-详情
-->
<template>
  <div class="apply-details">
    <el-dialog
      title="详情"
      v-model="visible"
      width="1000px"
      :before-close="handleClose"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="商户信息详情" name="1">
          <div class="info-table-row">
            <div class="info-table-item">商户编号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">商户名称</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">法人姓名</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">身份证号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">商户等级</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">身份证人脸照</div>
            <div class="info-table-item">
              <el-image
                style="width: 50px; height: 25px"
                :src="url"
                :preview-src-list="srcList"
              />
            </div>
            <div class="info-table-item">人脸识别照片</div>
            <div class="info-table-item">
              <el-image
                style="width: 50px; height: 25px"
                :src="url"
                :preview-src-list="srcList"
              />
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="具体处理内容" name="2">
          <div class="info-table-row">
            <div class="info-table-item">异常状态</div>
            <div class="info-table-item abnormal-content">
              {{ record.customerNo }}
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="具体处理内容" name="3">
          <div class="info-table-row">
            <div class="info-table-item">处理前</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">处理后</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'ApplyDetails',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    // 选中行
    record: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    /**
     * @method getCurrentInstance 获取当前组件实例
     */
    const instance = getCurrentInstance()
    const { proxy } = instance as any

    const state = reactive({
      activeNames: ['1', '2', '3'], // 基本信息
      url: 'https://pic.bcasmw.cn/group1/M00/00/B2/rBAAKWEwKHaAEQ_pAAJx97PVE7s668.png', // 身份证人脸照
      srcList: [
        'https://pic.bcasmw.cn/group1/M00/00/B2/rBAAKWEwKHaAEQ_pAAJx97PVE7s668.png',
      ], // 身份证人脸照-图片列表
    })
    /**
     * Methods
     */
    // 分页
    const pageChange = () => {}

    // 关闭弹框
    const handleClose = () => {
      context.emit('update:visible', false)
    }

    return {
      ...toRefs(state),
      handleClose,
      pageChange,
    }
  },
})
</script>
<style lang="scss" scoped>
.apply-details {
  .abnormal-content {
    width: 75%;
  }
}
</style>
