<template>
  <div class="add_user">
    <el-drawer
      :title="title"
      :model-value="drawer"
      direction="rtl"
      size="600px"
      :before-close="handleClose"
    >
      <el-form :model="model" class="apply-form" :rules="rules" label-width="150px">
        <!--用户账号-->
        <el-form-item label="用户账号" prop="username">
          <el-input v-model="model.username" placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <!--用户密码-->
        <el-form-item label="登录密码" prop="password">
          <el-input
            v-model="model.password"
            placeholder="请输入登录密码"
            type="password"
          ></el-input>
        </el-form-item>
        <!--确认密码-->
        <el-form-item label="登录密码" prop="confirmpassword">
          <el-input
            v-model="model.confirmpassword"
            placeholder="请重新输入登录密码"
            type="password"
          ></el-input>
        </el-form-item>
        <!--用户姓名-->
        <el-form-item label="用户姓名" prop="realname">
          <el-input v-model="model.realname" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <!--工号-->
        <el-form-item label="工号" prop="workNo">
          <el-input v-model="model.workNo" placeholder="请输入工号"></el-input>
        </el-form-item>
        <!--职务-->
        <el-form-item label="职务">
          <el-input
            v-model="model.post"
            placeholder="请选择职务"
            :disabled="disabled"
          ></el-input>
          <el-button type="primary" size="mini" @click="selectDuty">选择</el-button>
        </el-form-item>
        <!--角色分配-->
        <el-form-item label="角色分配">
          <el-checkbox-group
            v-model="model.checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(item, index) in cities"
              :label="item"
              :key="index"
              v-model="checked"
              >{{ item.description }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <!--部门分配-->
        <el-form-item label="部门分配" @click="departWarpe">
          <el-input
            v-model="model.selecteddeparts"
            placeholder="点击选择部门"
            prefix-icon="el-icon-cpu"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <!--租户分配-->
        <el-form-item label="租户分配">
          <el-checkbox-group
            v-model="model.checkedLesee"
            @change="handleCheckedleseeChange"
          >
            <el-checkbox
              v-for="(item, index) in lesee"
              :label="item"
              :key="index"
              v-model="checked_lesee"
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <!--身份-->
        <el-form-item label="身份">
          <el-radio-group v-model="model.userIdentity">
            <el-radio label="1">普通用户</el-radio>
            <el-radio label="2">上级</el-radio>
          </el-radio-group>
        </el-form-item>

        <!--头像-->
        <el-form-item label="头像">
          <el-upload
            ref="upload"
            class="upload-demo"
            action=""
            list-type="picture-card"
            :on-remove="handleRemove"
            :limit="limit"
            :http-request="uploadavatar"
          >
            <template #default>
              <i class="el-icon-plus"></i>
            </template>
            <template #file="{ file }">
              <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <!--生日-->
        <el-form-item label="生日">
          <el-date-picker
            v-model="model.birthday"
            type="datetime"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            placeholder="请选择生日"
            @change="changeBirthday"
          >
          </el-date-picker>
        </el-form-item>
        <!--性别-->
        <el-form-item label="性别">
          <el-radio-group v-model="model.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--邮箱-->
        <el-form-item label="邮箱">
          <el-input v-model="model.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <!--手机号码-->
        <el-form-item label="手机号码">
          <el-input v-model="model.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <!--座机-->
        <el-form-item label="座机">
          <el-input v-model="model.telephone" placeholder="请输入座机"></el-input>
        </el-form-item>
        <!--工作流引擎-->
        <el-form-item label="">
          <el-radio-group v-model="model.activitiSync">
            <el-radio label="1">同步</el-radio>
            <el-radio label="0">不同步</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
       <div class="drawer-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-drawer>
    <!--弹出框(选择部门)-->
    <el-dialog title="选择部门" v-model="dialogVisible" width="30%">
      <el-input v-model="filterText" placeholder="请输入部门名称" />
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        :filter-node-method="filterNode"
      >
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="suredepartWarpe">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--弹出框(职务)-->
    <el-dialog title="职务选择" v-model="disabledDuty" width="60%">
      <!--查询区域-->
      <el-form :model="queryParam">
        <el-row :gutter="24">
          <!--职务名称-->
          <el-col :md="8" :sm="12">
            <el-form-item label="职务名称">
              <el-input v-model="queryParam.name" placeholder="请输入职务名称"></el-input>
            </el-form-item>
          </el-col>
          <!--查询重置-->
          <el-col :xl="6" :lg="7" :md="8" :sm="24">
            <el-button type="primary" icon="el-icon-search" @click="search"
              >查询</el-button
            >
            <el-button type="primary" icon="el-icon-refresh-right" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <!--table区域-->
      <div>
        <el-row :gutter="24">
          <el-col :md="15" :sm="12">
            <el-table :data="tableData">
              <el-table-column>
                <template #default="scope">
                  <el-radio
                    :label="scope.row.id"
                    v-model="selectradio"
                    @change="changeRadio(scope.row)"
                    >&nbsp;</el-radio
                  >
                </template>
              </el-table-column>
              <el-table-column
                v-for="(item, index) in columns"
                :key="index"
                align="center"
                header-align="center"
                :prop="item.key"
                :label="item.label"
                :min-width="item.width"
              ></el-table-column>
            </el-table>
            <PageNation
              :total="total"
              v-model:page.sync="queryParam.pageNo"
              v-model:limit.sync="queryParam.pageSize"
              @pagination="pageChange"
            />
          </el-col>
          <el-col :md="9" :sm="12">
            <el-table :data="selectData">
              <el-table-column
                v-for="(item, index) in selectColums"
                :key="index"
                align="center"
                header-align="center"
                :prop="item.key"
                :label="item.label"
                :min-width="item.width"
              >
                <template #default="scope">
                  <!--操作-->
                  <template v-if="item.key == 'action'">
                    <span>
                      <a @click="delSelect(scope.row)">删除</a>
                    </span>
                  </template>
                  <span v-else>{{ scope.row[item.key] }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="disabledDuty = false">取 消</el-button>
          <el-button type="primary" @click="dutyConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref, watch } from "vue";
import api from "../../../server/api/user";
interface DataProps {
  title: string;
  children: Array<any>;
}
export default defineComponent({
  emits: ["handleClose"],
  props: {
    title: {
      type: String,
      required: false,
      default: () => {
        return "添加";
      },
    },
    drawer: {
      type: Boolean,
      required: false,
      default: () => {
        return false;
      },
    },
  },
  setup(props: any, context: any) {
    const tree = ref(null);
    const upload = ref(null);
    onMounted(() => {
      queryall();
      queryTreeList();
      tenantList();
      positionList();
    });

    const data = reactive({
      model: {
        username: "",
        password: "",
        confirmpassword: "", // 确认密码
        realname: "", // 真实姓名
        workNo: "", // 工号
        userIdentity: "1", // 身份
        sex: "1", // 性别
        email: "", // 邮箱
        phone: "", // 手机
        telephone: "", // 座机
        activitiSync: "1", // 工作流引擎
        checkedCities: [], // 角色分配（选中）
        selecteddeparts: "", // 部分分配
        checkedLesee: [], // 租户部门(选中)
        avatar: "", // 头像
        birthday: "", // 生日
        post: "", // 职务
      },
      cities: [],
      lesee: [], // 租户部门
      checked: false,
      checked_lesee: false,
      disabled: true,
      dialogVisible: false, // 部门弹出框
      treeData: [], // 部门分配展示
      defaultProps: {
        children: "children",
        label: "title",
      },
      filterText: "", // 部门过滤条件
      departList: [] as DataProps[], // 部分分配集合
      limit: 1,
      disabledDuty: false, // 职务弹出框
      queryParam: {
        name: "", // 职务名称
        pageNo: 1,
        pageSize: 10,
      },
      tableData: [], // 职务列表
      columns: [
        { key: "name", label: "职务名称", width: "120" },
        { key: "code", label: "职务编码", width: "100" },
        { key: "rank_dictText", label: "职级", width: "100" },
      ],
      total: 0,
      selectradio: "", // 职务列表选中的值 id
      selectName: "", // 职务列表选中的值 name
      selectData: [] as DataProps[], // 选中职务列表
      selectColums: [
        { key: "name", label: "职务名称", width: "120" },
        { key: "action", label: "操作", width: "120" },
      ],
    });

    watch(
      () => data.filterText,
      (newQuestion, oldQuestion) => {
        (tree.value as any).filter(newQuestion);
      }
    );

    watch(
      () => data.selectName,
      (newQuestion, oldQuestion) => {
        data.model.post = newQuestion;
      }
    );

    // 选择生日
    const changeBirthday = (date: any) => {
      data.model.birthday = date;
    };

    // 勾选角色分配
    const handleCheckedCitiesChange = (val: any) => {
      data.model.checkedCities = val;
    };

    // 勾选租户分配
    const handleCheckedleseeChange = (val: any) => {
      data.model.checkedLesee = val;
    };

    // 查询角色分配
    const queryall = () => {
      api.queryall().then((res) => {
        data.cities = res.origin.result;
      });
    };

    // 点击部分分配
    const departWarpe = () => {
      data.dialogVisible = true;
      data.model.selecteddeparts = "";
    };

    // 查询部门
    const queryTreeList = () => {
      api.queryTreeList().then((res) => {
        data.treeData = res.origin.result;
      });
    };

    // 过滤
    const filterNode = (value: any, data: any) => {
      if (!value) {
        return true;
      } else {
        return data.departName.indexOf(value) !== -1;
      }
    };

    // 确定部门
    const suredepartWarpe = () => {
      data.departList = (tree.value as any).getCheckedNodes();
      for (var i = 0; i < data.departList.length; i++) {
        data.model.selecteddeparts += data.departList[i].title + ",";
        if (data.departList[i].children) {
          for (var j = 0; j < data.departList[i].children[j].lenght; j++) {
            data.model.selecteddeparts += data.departList[i].children[j].title + ",";
          }
        }
      }
      data.model.selecteddeparts = data.model.selecteddeparts.substring(
        0,
        data.model.selecteddeparts.length - 1
      );
      data.dialogVisible = false;
    };

    // 查询租户分配
    const tenantList = () => {
      api.tenantList().then((res) => {
        data.lesee = res.origin.result;
      });
    };

    // 移除头像
    const handleRemove = (file: any) => {
      (upload.value as any).clearFiles();
      data.model.avatar = "";
    };

    // 上传头像
    const uploadavatar = (param: any) => {
      const file = param.file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const formData = new FormData();
        formData.append("biz", "temp");
        formData.append("file", file);
        api.upload(formData).then(
          (res: any) => {
            data.model.avatar = res.origin.message;
            console.log("data", data);
          },
          (err: any) => {
            param.onError(err);
          }
        );
      };
    };

    // 弹出职务
    const selectDuty = () => {
      data.disabledDuty = true;
    };

    // 确定职务
    const dutyConfirm = () => {
      data.disabledDuty = false;
    };

    // 选择职务
    const changeRadio = (row: any) => {
      data.selectradio = row.id;
      data.selectName = row.name;
      data.selectData = [];
      data.selectData.push(row);
    };

    // 删除选中的职务
    const delSelect = () => {
      data.selectData = [];
      data.selectradio = "";
      data.selectName = "";
    };

    // 查询职务列表
    const search = () => {
      positionList();
    };

    // 职务列表重置
    const reset = () => {
      data.queryParam.name = "";
      data.queryParam.pageNo = 1;
      data.queryParam.pageSize = 10;
      positionList();
    };

    // 职务列表
    const positionList = () => {
      api.positionList(data.queryParam).then((res) => {
        data.tableData = res.origin.result.records;
        data.total = res.origin.result.total;
      });
    };

    // 职务列表分页
    const pageChange = () => {
      positionList();
    };

    // 关闭侧边栏
    const handleClose = () => {
      context.emit("handleClose");
    };
    // 正则
    const rules = {
      username: [{ required: true, message: "请输入用户账号", trigger: "blur" }],
      password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
      confirmpassword: [
        { required: true, message: "请重新输入登录密码", trigger: "blur" },
      ],
      realname: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
      workNo: [{ required: true, message: "请输入工号", trigger: "blur" }],
    };

    // 确定
    const confirm = () =>{}
    return {
      tree,
      ...toRefs(data),
      handleClose,
      rules,
      handleCheckedCitiesChange,
      queryall,
      departWarpe,
      queryTreeList,
      suredepartWarpe,
      handleCheckedleseeChange,
      uploadavatar,
      handleRemove,
      changeBirthday,
      upload,
      filterNode,
      selectDuty,
      dutyConfirm,
      positionList,
      changeRadio,
      delSelect,
      pageChange,
      search,
      reset,
      confirm
    };
  },
});
</script>

<style lang="scss">
.add_user {
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

  .apply-form {
    width: 400px;
  }

  .el-drawer__body {
    overflow: scroll;
  }

  .upload-demo {
    height: 150px;
    overflow: hidden;
  }
}
</style>
