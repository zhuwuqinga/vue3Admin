<!--
 * @Author: linfudong
 * @Date: 2021-09-22 16:19:16
 * @LastEditors: linfudong
 * @LastEditTime: 2021-09-29 16:02:51
 * @Description: 菜单管理
-->
<template>
  <div class="menu-manage">
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="addMenu"
        >添加</el-button
      >
      <el-button
        icon="el-icon-delete"
        v-if="multipleSelection.length > 0"
        @click="batchDelete"
        >批量删除</el-button
      >
      <el-alert
        class="not-first-row"
        :title="'已选择' + multipleSelection.length + '项'"
        type="success"
        :closable="false"
      >
        <el-button type="text" @click="clearSelection">清空</el-button>
      </el-alert>
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="(item, index) in columns"
          :key="index"
          :prop="item.key"
          :label="item.label"
          :min-width="item.width"
        >
          <template #default="scope">
            <!-- 菜单类型 -->
            <template v-if="item.key == 'menuType'">
              <span>{{ menuType(scope.row.menuType) }}</span>
            </template>
            <span v-else>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120" align="center">
          <template #default="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-dropdown>
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="details(scope.row)"
                    >详情</el-dropdown-item
                  >
                  <el-dropdown-item @click="addSub(scope.row)"
                    >添加下级</el-dropdown-item
                  >
                  <el-dropdown-item @click="delRow(scope.row)"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增 -->
      <AddMenu
        v-if="addVisible"
        v-model:visible="addVisible"
        :record="record"
      ></AddMenu>
      <!-- 详情 -->
      <MenuDetails
        v-if="detailsVisible"
        v-model:visible="detailsVisible"
        :record="record"
      ></MenuDetails>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  computed,
  ref,
  getCurrentInstance,
} from 'vue'
import api from '@/server/api/system'
import AddMenu from './components/menu/AddMenu.vue' // 新增
import MenuDetails from './components/menu/MenuDetails.vue' // 详情
export default defineComponent({
  name: 'MenuManage',
  components: {
    AddMenu,
    MenuDetails,
  },
  setup() {
    /**
     * @method getCurrentInstance 获取当前组件实例
     */
    const instance = getCurrentInstance()
    const { proxy } = instance as any

    const multipleTableRef = ref(null) // 表格

    const state = reactive({
      // 表头数据
      columns: [
        { key: 'name', label: '菜单名称', width: '160' },
        { key: 'menuType', label: '菜单类型', width: '80' },
        { key: 'icon', label: 'icon', width: '100' },
        { key: 'component', label: '组件', width: '120' },
        { key: 'url', label: '路径', width: '160' },
        { key: 'sortNo', label: '排序', width: '80' },
      ],
      tableData: [],
      multipleSelection: [], // 选中
      addVisible: false, // 新增
      detailsVisible: false, // 详情
      record: {}, // 选中行
    })

    //计算属性(菜单类型)
    const menuType = computed(() => {
      return (state: number) => {
        switch (state) {
          case 0:
          case 1:
            return '菜单'
          case 2:
            return '按钮/权限'
        }
      }
    })

    onMounted(() => {
      getMenuList()
    })

    /**
     * Methods
     */
    // 菜单管理列表
    const getMenuList = () => {
      api.menuList('').then((res: any) => {
        if (res.origin.success) {
          state.tableData = res.origin.result
        }
      })
    }
    // 选中
    const handleSelectionChange = (val: never[]) => {
      state.multipleSelection = val
    }
    // 清空
    const clearSelection = () => {
      ;(multipleTableRef.value as any).clearSelection()
    }
    // 批量删除
    const batchDelete = () => {
      proxy
        .$confirm('是否删除选中数据?', '确认删除', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
          console.log('删除成功')
        })
        .catch(() => {})
    }
    // 单个删除
    const delRow = (row: any) => {
      proxy
        .$confirm('确定删除当前数据吗?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning',
        })
        .then(() => {
          console.log('删除成功')
        })
        .catch(() => {})
    }
    // 添加
    const addMenu = () => {
      state.addVisible = true
      state.record = {}
    }
    // 编辑
    const edit = (row: any) => {
      state.addVisible = true
      state.record = JSON.parse(JSON.stringify(row))
      console.log(row, 'row')
    }
    // 添加下级
    const addSub = (row: any) => {
      state.addVisible = true
      let menuType: number
      if (row.menuType === 0) {
        menuType = 1
      } else {
        menuType = row.menuType
      }
      state.record = { menuType: menuType, parentId: row.key, sub: true }
      console.log(state.record, 'state.record')
    }
    // 详情
    const details = (row: any) => {
      state.detailsVisible = true
      state.record = row
    }
    return {
      multipleTableRef,
      ...toRefs(state),
      menuType,
      handleSelectionChange,
      clearSelection,
      batchDelete,
      delRow,
      addMenu,
      edit,
      addSub,
      details,
    }
  },
})
</script>
<style lang="scss">
.menu-manage {
  .el-alert {
    padding: 0;
    padding-left: 16px;
    margin-bottom: 16px;
    .el-alert__description {
      display: inline-block;
      margin-left: 20px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    margin-left: 10px;
  }
}
</style>
