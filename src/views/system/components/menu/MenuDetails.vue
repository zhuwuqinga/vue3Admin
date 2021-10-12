<!--
 * @Author: linfudong
 * @Date: 2021-09-24 15:28:00
 * @LastEditors: linfudong
 * @LastEditTime: 2021-09-29 16:02:59
 * @Description: 菜单详情
-->
<template>
  <div class="menu-details">
    <el-drawer
      v-model="visible"
      title="详情"
      direction="rtl"
      size="700px"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="160px">
        <el-form-item label="菜单类型" prop="menuType">
          <span v-if="form.menuType == 0">一级菜单</span>
          <span v-if="form.menuType == 1">子菜单</span>
          <span v-if="form.menuType == 2">按钮/权限</span>
        </el-form-item>
        <el-form-item
          :label="form.menuType != 2 ? '菜单名称' : '按钮/权限'"
          prop="name"
        >
          <span>{{ form.name }}</span>
        </el-form-item>
        <el-form-item
          label="上级菜单"
          prop="parentId"
          v-if="form.menuType != 0"
        >
          <span>{{ form.parentName }}</span>
        </el-form-item>
        <el-form-item label="菜单路径" prop="url" v-if="form.url">
          <span>{{ form.url }}</span>
        </el-form-item>
        <!-- 按钮/权限 start -->
        <template v-if="form.menuType == 2">
          <el-form-item label="授权标识">
            <span>{{ form.perms }}</span>
          </el-form-item>
          <el-form-item label="授权策略">
            <span v-if="form.permsType == '1'"
              >可见/可访问(授权后可见/可访问)</span
            >
            <span v-else>可编辑(未授权时禁用)</span>
          </el-form-item>
          <el-form-item label="状态">
            <span v-if="form.status == '0'">无效</span>
            <span v-else>有效</span>
          </el-form-item>
        </template>
        <!-- 按钮/权限 end -->
        <template v-if="form.menuType != 2">
          <el-form-item label="前端组件" prop="component">
            <span>{{ form.component }}</span>
          </el-form-item>
          <el-form-item
            label="默认跳转地址"
            v-if="form.menuType == 0 && form.redirect"
          >
            <span>{{ form.redirect }}</span>
          </el-form-item>
          <el-form-item label="菜单图标" v-if="form.icon">
            <span>{{ form.icon }}</span>
          </el-form-item>
          <el-form-item label="排序">
            <span>{{ form.sortNo }}</span>
          </el-form-item>
          <el-form-item label="是否路由菜单">
            <span>{{ form.route ? '是' : '否' }}</span>
          </el-form-item>
          <el-form-item label="隐藏路由">
            <span>{{ form.hidden ? '是' : '否' }}</span>
          </el-form-item>
          <el-form-item label="是否缓存路由">
            <span>{{ form.keepAlive ? '是' : '否' }}</span>
          </el-form-item>
          <el-form-item label="聚合路由">
            <span>{{ form.alwaysShow ? '是' : '否' }}</span>
          </el-form-item>
          <el-form-item label="打开方式">
            <span>{{ form.internalOrExternal ? '外部' : '内部' }}</span>
          </el-form-item>
        </template>
      </el-form>
      <div class="drawer-footer">
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import api from '@/server/api/system'
export default defineComponent({
  name: 'MenuDetails',
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
    const state = reactive({
      iconVisible: false, // 图标
    })

    // 详情回显
    let form = props.record
    console.log(form, 'form')

    onMounted(() => {
      if (form.parentId) {
        getTreeList()
      }
    })

    /**
     * Methods
     */
    // 上级菜单
    const getTreeList = () => {
      api.queryTreeList('').then((res: any) => {
        if (res.origin.success) {
          let treeList = res.origin.result.treeList
          // 上级菜单名称
          form.parentName = recursion(treeList, form.parentId)
        }
      })
    }
    // 递归
    const recursion = (list: any[], parentId: string) => {
      if (list === null) return null
      for (let item of list) {
        if (item.key === parentId) {
          return item.label
        }
        let parentName: string = recursion(item.children, parentId)
        if (parentName) {
          return parentName
        }
      }
    }

    // 关闭弹框
    const handleClose = () => {
      context.emit('update:visible', false)
    }

    return {
      ...toRefs(state),
      form,
      handleClose,
    }
  },
})
</script>
<style lang="scss">
.menu-details {
  .drawer-footer {
    width: 100%;
    border-top: 1px solid #e8e8e8;
    position: absolute;
    text-align: right;
    bottom: 0;
    padding: 0px 20px 20px 0;
    background: #fff;
    .el-button {
      margin-top: 20px;
    }
  }
  .el-drawer__body {
    padding-bottom: 81px;
    overflow-x: scroll;
  }
}
</style>
