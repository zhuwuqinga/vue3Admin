<!--
 * @Author: linfudong
 * @Date: 2021-09-23 10:46:55
 * @LastEditors: linfudong
 * @LastEditTime: 2021-09-29 16:02:55
 * @Description: 新增菜单
-->
<template>
  <div class="add-menu">
    <el-drawer
      v-model="visible"
      :title="record.id ? '编辑' : '新增'"
      direction="rtl"
      size="700px"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="160px">
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="form.menuType" @change="onChangeMenuType">
            <el-radio :label="0">一级菜单</el-radio>
            <el-radio :label="1">子菜单</el-radio>
            <el-radio :label="2">按钮/权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="form.menuType != 2 ? '菜单名称' : '按钮/权限'"
          prop="name"
        >
          <el-input placeholder="请输入菜单名称" v-model="form.name" />
        </el-form-item>
        <el-form-item
          label="上级菜单"
          prop="parentId"
          v-if="form.menuType != 0"
        >
          <el-select class="form-input" v-model="parentIdLabel" ref="selectRef">
            <el-option style="height: auto" :value="parentIdLabel">
              <el-tree
                :data="treeList"
                node-key="key"
                :default-expanded-keys="defaultExpandedKey"
                @check-change="handleParentIdCheck"
                @node-click="handleParentIdNode"
                :props="props"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮/权限 start -->
        <template v-if="form.menuType == 2">
          <el-form-item label="菜单路径">
            <el-input placeholder="请输入菜单路径" v-model="form.url" />
          </el-form-item>
          <el-form-item label="授权标识">
            <el-input
              placeholder="请输入授权标识, 如: user:list"
              v-model="form.perms"
            />
          </el-form-item>
          <el-form-item label="授权策略">
            <el-radio-group v-model="form.permsType">
              <div>
                <el-radio label="1">可见/可访问(授权后可见/可访问)</el-radio>
              </div>
              <el-radio label="2">可编辑(未授权时禁用)</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio label="0">无效</el-radio>
              <el-radio label="1">有效</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
        <!-- 按钮/权限 end -->
        <template v-if="form.menuType != 2">
          <el-form-item label="菜单路径" prop="url">
            <el-input placeholder="请输入菜单路径" v-model="form.url" />
          </el-form-item>
          <el-form-item label="前端组件" prop="component">
            <el-input placeholder="请输入前端组件" v-model="form.component" />
          </el-form-item>
          <el-form-item label="默认跳转地址" v-if="form.menuType == 0">
            <el-input
              placeholder="请输入路由参数 redirect"
              v-model="form.redirect"
            />
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input placeholder="点击选择图标" v-model="form.icon">
              <template #suffix>
                <i class="el-icon-setting" @click="iconVisible = true"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input placeholder="请输入菜单排序" v-model="form.sortNo" />
          </el-form-item>
          <el-form-item label="是否路由菜单">
            <el-switch v-model="form.route" active-text="是" inactive-text="否">
            </el-switch>
          </el-form-item>
          <el-form-item label="隐藏路由">
            <el-switch
              v-model="form.hidden"
              active-text="是"
              inactive-text="否"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="是否缓存路由">
            <el-switch
              v-model="form.keepAlive"
              active-text="是"
              inactive-text="否"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="聚合路由">
            <el-switch
              v-model="form.alwaysShow"
              active-text="是"
              inactive-text="否"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="打开方式">
            <el-switch
              v-model="form.internalOrExternal"
              active-text="外部"
              inactive-text="内部"
            >
            </el-switch>
          </el-form-item>
        </template>
      </el-form>
      <div class="drawer-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-drawer>
    <!-- 选择图标 -->
    <Icons
      v-if="iconVisible"
      v-model:visible="iconVisible"
      @choose="handleIconChoose"
    ></Icons>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
import api from '@/server/api/system'
import Icons from './Icons.vue'
export default defineComponent({
  name: 'AddMenu',
  components: {
    Icons,
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
    const state = reactive({
      iconVisible: false, // 图标
      props: {
        children: 'children',
        label: 'label',
        value: 'key',
      },
      treeList: [], // 上级菜单
      parentIdLabel: '',
      defaultExpandedKey: [] as string[], // 上级菜单-默认展开
    })

    const formRef = ref(null) // form表单
    const selectRef = ref(null) // 上级菜单

    let form: any = reactive({
      menuType: 0, // 菜单类型
      name: '', // 菜单名称
      parentId: '', // 上级菜单
      url: '', // 菜单路径
      component: '', // 前端组件
      redirect: '', // 默认跳转地址
      icon: '', // 菜单图标
      sortNo: '', // 排序
      route: true, // 是否路由菜单
      hidden: false, // 隐藏路由
      keepAlive: false, // 是否缓存路由
      alwaysShow: false, // 聚合路由
      internalOrExternal: false, // 打开方式
      perms: '', // 授权标识
      permsType: '1', // 授权策略
      status: '1', // 状态
    })

    // 编辑详情回显
    if (props.record.id) {
      form = props.record
      state.defaultExpandedKey = [form.parentId]
    }
    // 添加下级详情回显
    if (props.record.sub) {
      const { menuType, parentId } = props.record
      form.menuType = menuType
      form.parentId = parentId
      state.defaultExpandedKey = [parentId]
    }
    // 定义校验规则
    const rules = {
      // 菜单名称
      name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
      // 上级菜单
      parentId: [
        { required: true, message: '请选择上级菜单', trigger: 'change' },
      ],
      // 菜单路径
      url: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
      // 前端组件
      component: [
        { required: true, message: '请输入前端组件', trigger: 'blur' },
      ],
    }

    onMounted(() => {
      getTreeList()
    })

    /**
     * Methods
     */
    // 上级菜单
    const getTreeList = () => {
      api.queryTreeList('').then((res: any) => {
        if (res.origin.success) {
          state.treeList = res.origin.result.treeList
          // 上级菜单名称
          state.parentIdLabel = recursion(state.treeList, form.parentId) || ''
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
    // 切换菜单类型
    const onChangeMenuType = (val: number) => {
      console.log(val)
    }
    // 选择上级菜单-节点选中状态变化
    const handleParentIdCheck = (data: any, checked: boolean) => {
      console.log(data, 'data')
      console.log(checked, 'checked')
    }
    // 选择上级菜单-点击节点
    const handleParentIdNode = (data: any) => {
      state.parentIdLabel = data[state.props.label]
      form.parentId = data[state.props.value]
      // 选中后关闭下拉框
      setTimeout(() => {
        ;(selectRef.value as any).blur()
      }, 50)
      console.log(data, 'data')
    }
    // 选择图标
    const handleIconChoose = (icon: string) => {
      form.icon = icon
    }
    // 提交
    const confirm = () => {
      ;(formRef.value as any).validate((valid: any) => {
        console.log(valid)
        if (valid) {
          console.log(form, 'form')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    // 关闭弹框
    const handleClose = () => {
      context.emit('update:visible', false)
    }

    return {
      ...toRefs(state),
      formRef,
      selectRef,
      form,
      rules,
      onChangeMenuType,
      handleIconChoose,
      handleClose,
      handleParentIdCheck,
      handleParentIdNode,
      confirm,
    }
  },
})
</script>
<style lang="scss">
.add-menu {
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
  .el-input {
    width: 400px;
  }
  .el-input__suffix {
    right: 0;
    cursor: pointer;
    .el-input__suffix-inner {
      padding: 10px;
      font-size: 18px;
    }
  }
  .el-drawer__body {
    padding-bottom: 81px;
    overflow-x: scroll;
  }
}
</style>
