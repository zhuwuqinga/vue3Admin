<template>
  <div class="user_all">
    <el-card>
      <!--查询区域-->
      <el-form :model="queryParam">
        <el-row :gutter="24">
          <!--账号-->
          <el-col :md="6" :sm="12">
            <el-form-item label="账号">
              <el-input
                v-model="queryParam.username"
                placeholder="输入账号模糊查询"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--性别-->
          <el-col :md="6" :sm="8">
            <el-form-item label="性别">
              <el-select v-model="queryParam.sex" placeholder="请选择性别">
                <el-option label="请选择" value=""></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="冻结" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--真实名字-->
          <el-col :md="6" :sm="8">
            <el-form-item label="真实名字">
              <el-input
                v-model="queryParam.realname"
                placeholder="请输入真实的名字"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--手机号码-->
          <el-col :md="6" :sm="8">
            <el-form-item label="手机号码">
              <el-input
                v-model="queryParam.phone"
                placeholder="请输入手机号码查询"
              ></el-input>
            </el-form-item>
          </el-col>
          <!--用户状态-->
          <el-col :md="6" :sm="8">
            <el-form-item label="用户状态">
              <el-select v-model="queryParam.status" placeholder="请选择">
                <el-option label="请选择" value=""></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="冻结" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--查询重置-->
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-button type="primary" icon="el-icon-search" @click="getList"
              >查询</el-button
            >
            <el-button type="primary" icon="el-icon-refresh-right" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <!--按钮操作-->
      <div style="border-top: 5px">
        <el-button type="primary" icon="el-icon-plus" @click="addUser">添加</el-button>
        <el-button type="primary" icon="el-icon-school" @click="recycleDialog = true"
          >回收站</el-button
        >
        <el-dropdown style="margin-left: 10px">
          <el-button>批量操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item>冻结</el-dropdown-item>
              <el-dropdown-item>解冻</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!--table区域-->
      <div>
        <div class="ant-alert ant-alert-info" style="margin-top: 16px">
          已选择&nbsp;<a style="font-weight: 600">{{ selectLength }}</a
          >项&nbsp;&nbsp;

          <el-popconfirm
            title="确定清空吗?"
            v-if="selectLength > 0"
            @confirm="onClearSelected"
          >
            <template #reference>
              <a style="margin-left: 24px"> 清空</a>
            </template>
          </el-popconfirm>
        </div>

        <el-table :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            v-for="(item, index) in columns"
            :key="index"
            align="center"
            header-align="center"
            :prop="item.key"
            :label="item.label"
            :min-width="item.width"
          >
            <template #default="scope">
              <!--头像-->
              <template v-if="item.key == 'avatar'">
                <el-avatar shape="square" :size="40" :src="scope.row.avatar"> </el-avatar>
              </template>
              <!--操作-->
              <template v-else-if="item.key == 'action'">
                <span>
                  <a>编辑</a>
                  <el-divider direction="vertical"></el-divider>
                  <el-dropdown>
                    <a>更多<i class="el-icon-arrow-down el-icon--right"></i></a>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>详情</el-dropdown-item>
                        <el-dropdown-item>密码</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                        <el-dropdown-item>冻结</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </span>
              </template>
              <span v-else>{{ scope.row[item.key] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <PageNation
          :total="total"
          v-model:page.sync="queryParam.pageNo"
          v-model:limit.sync="queryParam.pageSize"
          @pagination="pageChange"
        />
        <user-modal
          :title="title"
          :drawer="drawer"
          @handleClose="handleClose"
        ></user-modal>
      </div>
    </el-card>
    <!--弹出框(回收站)-->
    <el-dialog title="用户回收站" v-model="recycleDialog" width="65%">
      <div class="ant-alert ant-alert-info">
        已选择&nbsp;<a style="font-weight: 600">{{ selectLengthRecycle }}</a
        >项
        <el-divider direction="vertical" v-if="selectLengthRecycle > 0"></el-divider>
        <el-popconfirm title="确定清空吗" v-if="selectLengthRecycle > 0">
          <template #reference>
            <a>清空选择</a>
          </template>
        </el-popconfirm>
        <el-divider direction="vertical" v-if="selectLengthRecycle > 0"></el-divider>
        <el-popconfirm title="批量还原" v-if="selectLengthRecycle > 0">
          <template #reference>
            <a>批量还原</a>
          </template>
        </el-popconfirm>
        <el-divider direction="vertical" v-if="selectLengthRecycle > 0"></el-divider>
        <el-popconfirm title="批量删除" v-if="selectLengthRecycle > 0">
          <template #reference>
            <a>批量删除</a>
          </template>
        </el-popconfirm>
      </div>
      <el-table :data="cecycleTable" @selection-change="handleSelelctionCycle">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="#" />
        <el-table-column
          v-for="(item, index) in recycleColums"
          :key="index"
          align="center"
          header-align="center"
          :prop="item.key"
          :label="item.label"
          :min-width="item.width"
        >
          <template #default="scope">
            <!--头像-->
            <template v-if="item.key == 'avatar'">
              <el-avatar shape="square" :size="40" :src="scope.row.avatar"></el-avatar>
            </template>
            <!--操作-->
            <template v-else-if="item.key == 'action'">
              <span>
                <el-popconfirm title="您确定要恢复这 1 个用户吗？">
                  <template #reference>
                    <a>还原用户</a>
                  </template>
                </el-popconfirm>
                <el-divider direction="vertical"></el-divider>
                <el-popconfirm title="您确定要彻底删除这 1 个用户吗？">
                  <template #reference>
                    <a>测定删除</a>
                  </template>
                </el-popconfirm>
              </span>
            </template>
            <span v-else>{{ scope.row[item.key] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
           <span class="dialog-footer">
              <el-button @click="recycleDialog=false">取消</el-button>
           </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted } from "vue";
import api from "../../server/api/user";
import PageNation from "@/components/pageNation/Index.vue"; // 分页组件
import UserModal from "./components/userModal.vue";
export default defineComponent({
  name: "User",
  components: {
    PageNation,
    UserModal,
  },
  setup() {
    const data = reactive({
      queryParam: {
        username: "", // 账号
        sex: "", // 性别
        realname: "", // 真实姓名
        phone: "", // 手机号码
        pageNo: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [],
      columns: [
        { key: "username", label: "用户账号", width: "120" },
        { key: "realname", label: "用户姓名", width: "100" },
        { key: "avatar", label: "头像", width: "120" },
        { key: "sex_dictText", label: "性别", width: "80" },
        { key: "birthday", label: "生日", width: "100" },
        { key: "phone", label: "手机号码", width: "100" },
        { key: "orgCodeTxt", label: "部门", width: "180" },
        { key: "departIds_dictText", label: "负责部门", width: "180" },
        { key: "status_dictText", label: "状态", width: "80" },
        { key: "action", label: "操作", width: "170" },
      ],
      title: "添加",
      drawer: false, // 控制添加侧边栏弹出框
      selectradio: "",
      selectLength: 0, // 选择的数量
      recycleDialog: false, // 回收站弹出框
      selectLengthRecycle: 0, // 选择的数量
      recycleColums: [
        { key: "username", label: "账号", width: "120" },
        { key: "realname", label: "姓名", width: "120" },
        { key: "avatar", label: "头像", width: "120" },
        { key: "orgCode", label: "部门", width: "120" },
        { key: "action", label: "操作", width: "170" },
      ],
      cecycleTable: [],
    });

    const handleSelectionChange = (val: any[]) => {
      data.selectLength = val.length;
    };

    // 分页
    const pageChange = () => {
      getList();
    };

    // 重置
    const reset = () => {
      data.queryParam.username = "";
      data.queryParam.sex = "";
      data.queryParam.realname = "";
      data.queryParam.phone = "";
      data.queryParam.pageNo = 1;
      data.queryParam.pageSize = 10;
      getList();
    };

    onMounted(() => {
      getList();
      recycleBin();
    });

    const getList = async () => {
      await api.list(data.queryParam).then((res: any) => {
        data.tableData = res.origin.result.records;
        data.total = res.origin.result.total;
      });
    };

    // 添加
    const addUser = () => {
      data.drawer = true;
    };

    // 关闭侧边栏
    const handleClose = () => {
      data.drawer = false;
    };

    // 清空
    const onClearSelected = () => {
      console.log("清空了");
    };

    // 回收站查询
    const recycleBin = () => {
      api.recycleBin().then((res) => {
        console.log("res", res);
        data.cecycleTable = res.origin.result;
        console.log("data", data);
      });
    };

    // 选择回收站
    const handleSelelctionCycle = (val: any[]) => {
      data.selectLengthRecycle = val.length;
    };

    return {
      ...toRefs(data),
      handleSelectionChange,
      pageChange,
      getList,
      reset,
      addUser,
      handleClose,
      onClearSelected,
      recycleBin,
      handleSelelctionCycle,
    };
  },
});
</script>

<style lang="scss" scoped>
.user_all {
  .ant-alert {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: relative;
    padding: 8px 15px 8px 37px;
    word-wrap: break-word;
    border-radius: 4px;
  }

  .ant-alert-info {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
  }

  .anty-img-wrap {
    height: 50px;
    position: relative;
  }
}
</style>
