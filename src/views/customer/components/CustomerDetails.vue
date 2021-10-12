<!--
 * @Author: linfudong
 * @Date: 2021-10-09 09:15:01
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:42:32
 * @Description: 商户详情
-->
<template>
  <div class="customer-details">
    <el-dialog
      title="详情"
      v-model="visible"
      width="1000px"
      :before-close="handleClose"
    >
      <el-tabs>
        <el-tab-pane label="基本信息">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
              <div class="info-table-row">
                <div class="info-table-item">商户编号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">商户名称</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">法人姓名</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">身份证号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">登陆账号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">所属地区</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">营业地址</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">商户性质</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">手机号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="受益人信息" name="2"
              ><div class="info-table-row">
                <div class="info-table-item">受益人姓名</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">详细地址</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">证件类型</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">证件有效期</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">所在地</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">证件号码</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="结算信息">
          <div class="info-table-row">
            <div class="info-table-item">账户类型</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">开户名</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">开户银行</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">开户所在地</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">开户网点</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">开户账号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">身份证号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">银行预留手机号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="费率额度">
          <el-collapse v-model="activeRate">
            <el-collapse-item title="费率" name="1">
              <el-table border :data="record.rateData" style="width: 100%">
                <el-table-column align="center" label="费率">
                  <el-table-column
                    prop="brandCode"
                    align="center"
                    label="业务类型"
                  >
                    <template #default="scope">
                      <div>{{ scope.row.brandCode }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="t0" align="center" label="T0" />
                  <el-table-column prop="t1" align="center" label="T1" />
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="额度" name="2">
              <el-table border :data="record.limitData" style="width: 100%">
                <el-table-column align="center" label="额度">
                  <el-table-column align="center" label="业务类型">
                    <template #default="scope">
                      <div>{{ scope.row.brandCode }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="single" label="单笔" />
                  <el-table-column align="center" prop="days" label="单日" />
                  <el-table-column align="center" prop="month" label="单月" />
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="业务状态">
          <div class="info-table-row">
            <div class="info-table-item">申请时间</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">商户编号</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">商户等级</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">直属代理商</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">首绑时间</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">已绑定终端台数</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">已绑定终端</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">绑定时间</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">商户类型</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">商户活动</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">提额状态</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">提额时间</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">MCC码</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">MCC名称</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">是否发放优惠券</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
            <div class="info-table-item">流量卡费用</div>
            <div class="info-table-item">{{ record.customerNo }}（元）</div>
            <div class="info-table-item">优惠费率有效期截止时间</div>
            <div class="info-table-item">{{ record.customerNo }}</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="资质信息">
          <div class="info-table-row">
            <div class="info-table-item">法人身份证（正面）</div>
            <div class="info-table-item">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              />
            </div>
            <div class="info-table-item">法人身份证（反面）</div>
            <div class="info-table-item">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              />
            </div>
            <div class="info-table-item">手持身份证正面</div>
            <div class="info-table-item">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              />
            </div>
            <div class="info-table-item">银行卡</div>
            <div class="info-table-item">
              <el-image
                style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审核日志">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              align="center"
              v-for="(item, index) in columns"
              :key="index"
              :prop="item.key"
              :label="item.label"
              :min-width="item.width"
            >
              <template #default="scope">
                <span>{{ scope.row[item.key] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <PageNation
            :total="total"
            v-model:page.sync="queryParam.pageNo"
            v-model:limit.sync="queryParam.pageSize"
            @pagination="pageChange"
          />
        </el-tab-pane>
      </el-tabs>
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
  name: 'CustomerDetails',
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
      activeRate: ['1', '2'], // 费率额度
      url: 'https://pic.bcasmw.cn/group1/M00/00/B2/rBAAKWEwKHaAEQ_pAAJx97PVE7s668.png', // 资质信息
      srcList: [
        'https://pic.bcasmw.cn/group1/M00/00/B2/rBAAKWEwKHaAEQ_pAAJx97PVE7s668.png',
      ], // 资质信息-图片列表
      // 审核日志表格信息
      columns: [
        // 表头
        { key: 'customerNo', label: '审核状态', width: '100' },
        { key: 'channelNo', label: '审核意见', width: '100' },
        { key: 'customerName', label: '审核时间', width: '100' },
        { key: 'customerGrade', label: '审核人', width: '100' },
      ],
      total: 0,
      tableData: [],
      queryParam: {
        // 分页
        pageNo: 1,
        pageSize: 10,
      },
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
<style lang="scss" scoped></style>
