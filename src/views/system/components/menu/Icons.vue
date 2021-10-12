<!--
 * @Author: linfudong
 * @Date: 2021-09-23 15:21:16
 * @LastEditors: linfudong
 * @LastEditTime: 2021-09-26 10:41:06
 * @Description: 菜单图标
-->
<template>
  <div class="icons-container">
    <el-dialog
      title=""
      v-model="visible"
      width="900px"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="方向性图标" name="1">
          <ul>
            <li
              v-for="icon in icons.directionIcons"
              :key="icon"
              :class="{ active: activeIndex === icon }"
              @click="chooseIcon(icon)"
            >
              <el-icon :class="icon" />
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="指示性图标" name="2">
          <ul>
            <li
              v-for="icon in icons.suggestionIcons"
              :key="icon"
              :class="{ active: activeIndex === icon }"
              @click="chooseIcon(icon)"
            >
              <el-icon :class="icon" />
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
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
  name: 'Icons',
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
      activeName: '1',
      activeIndex: '', // 选中
      icons: {
        // 方向性图标
        directionIcons: [
          'el-icon-bottom-left',
          'el-icon-bottom-right',
          'el-icon-back',
          'el-icon-right',
          'el-icon-caret-left',
          'el-icon-caret-right',
          'el-icon-caret-bottom',
          'el-icon-caret-top',
          'el-icon-d-arrow-left',
          'el-icon-d-arrow-right',
        ],
        // 指示性图标
        suggestionIcons: [
          'el-icon-warning',
          'el-icon-warning-outline',
          'el-icon-question',
          'el-icon-info',
          'el-icon-remove',
          'el-icon-circle-plus',
          'el-icon-success',
          'el-icon-error',
        ],
      },
    })
    /**
     * Methods
     */
    // 选中
    const chooseIcon = (icon: string) => {
      state.activeIndex = icon
      proxy.$message.success(`选中 ${icon}`)
    }
    // 提交
    const confirm = () => {
      if (!state.activeIndex) {
        proxy.$message.warning(`请选择图标`)
        return false
      }
      context.emit('choose', state.activeIndex)
      handleClose()
    }

    // 关闭弹框
    const handleClose = () => {
      context.emit('update:visible', false)
    }

    return {
      ...toRefs(state),
      chooseIcon,
      confirm,
      handleClose,
    }
  },
})
</script>
<style lang="scss">
.icons-container {
  ul {
    li {
      cursor: pointer;
      font-size: 24px;
      border: 1px solid #f1f1f1;
      padding: 3px;
      display: inline-block;
      margin-right: 10px;
      &.active {
        background: #4a4a48;
        color: #fff;
      }
    }
  }
}
</style>
