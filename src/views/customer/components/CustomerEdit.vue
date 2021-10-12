<!--
 * @Author: linfudong
 * @Date: 2021-10-09 11:45:22
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 14:46:33
 * @Description: 商户编辑
-->
<template>
  <div class="customer-edit">
    <el-dialog
      title="编辑"
      v-model="visible"
      width="1000px"
      :before-close="handleClose"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <div class="info-table-row">
            <div class="info-table-item">商户编号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">商户名称</div>
            <div class="info-table-item">
              <el-input
                v-model="record.customerName"
                placeholder="请输入商户名称"
              ></el-input>
            </div>
            <div class="info-table-item">法人姓名</div>
            <div class="info-table-item">
              <el-input
                v-model="record.customerName"
                placeholder="请输入法人姓名"
              ></el-input>
            </div>
            <div class="info-table-item">身份证号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">登陆账号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">所属地区</div>
            <div class="info-table-item">
              <AreaLink
                @onChange="changeArea($event)"
                :araeSelectData="araeSelectData"
              ></AreaLink>
            </div>
            <div class="info-table-item">营业地址</div>
            <div class="info-table-item">
              <el-input
                v-model="record.customerName"
                placeholder="请输入营业地址"
              ></el-input>
            </div>
            <div class="info-table-item">商户性质</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">手机号</div>
            <div class="info-table-item">
              <el-input
                v-model="record.customerName"
                placeholder="请输入手机号"
              ></el-input>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="受益人信息" name="2"
          ><div class="info-table-row">
            <div class="info-table-item">受益人姓名</div>
            <div class="info-table-item">
              <el-input
                v-model="record.customerName"
                placeholder="请输入受益人姓名"
              ></el-input>
            </div>
            <div class="info-table-item">详细地址</div>
            <div class="info-table-item">
              <el-input
                v-model="record.customerName"
                placeholder="请输入详细地址"
              ></el-input>
            </div>
            <div class="info-table-item">证件类型</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">证件有效期</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">所在地</div>
            <div class="info-table-item">
              <AreaLink
                @onChange="changeLocation($event)"
                :araeSelectData="locationSelectData"
              ></AreaLink>
            </div>
            <div class="info-table-item">证件号码</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
          </div>
        </el-collapse-item>
      </el-collapse>
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
import AreaLink from 'components/areaLink/Index.vue'
export default defineComponent({
  name: 'CustomerEdit',
  components: {
    AreaLink,
  },
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
      activeNames: ['1', '2'], // 基本信息
      form: {
        areaCode: '', // 基本信息-所属地区
        locationCode: '', // 受益人信息-所在地
      },
      araeSelectData: {
        // 基本信息-所属地区回显
        provinceCode: '',
        cityCode: '',
        areaCode: '',
      },
      locationSelectData: {
        // 受益人信息-所在地回显
        provinceCode: '',
        cityCode: '',
        areaCode: '',
      },
    })
    /**
     * Methods
     */
    // 所属地区
    const changeArea = ($event: { areaCode: string }) => {
      state.form.areaCode = $event.areaCode
    }
    // 所在地
    const changeLocation = ($event: { areaCode: string }) => {
      state.form.locationCode = $event.areaCode
    }

    // 提交
    const confirm = () => {
      console.log('提交')
      handleClose()
    }

    // 关闭弹框
    const handleClose = () => {
      context.emit('update:visible', false)
    }

    return {
      ...toRefs(state),
      handleClose,
      changeArea,
      changeLocation,
      confirm,
    }
  },
})
</script>
<style lang="scss" scoped>
.customer-edit {
  .info-table-item {
    width: calc(1 / 3 * 100%);
    &:nth-child(2n-1) {
      width: calc(1 / 6 * 100%);
    }
  }
}
</style>
