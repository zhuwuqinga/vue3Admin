<!--
 * @Author: linfudong
 * @Date: 2021-10-09 16:31:38
 * @LastEditors: linfudong
 * @LastEditTime: 2021-10-09 17:42:40
 * @Description: 结算变更查询详情
-->
<template>
  <div class="settlement-details">
    <el-dialog
      title="结算变更详情"
      v-model="visible"
      width="1000px"
      :before-close="handleClose"
    >
      <el-tabs>
        <el-tab-pane label="账号信息">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="变更详情前账号信息" name="1">
              <div class="info-table-row">
                <div class="info-table-item">商户编号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">商户名称</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">账户类型</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户行</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户支行</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户名</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户账号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户行地址</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">预留手机号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">身份证号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">授权函</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">银行卡照片</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">非法人身份证照片正面</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">非法人身份证照片反面</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">非法人身份证有效期</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item title="变更详情后账号信息" name="2">
              <div class="info-table-row">
                <div class="info-table-item">商户编号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">商户名称</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">账户类型</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户行</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户支行</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户名</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户账号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">开户行地址</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">预留手机号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">身份证号</div>
                <div class="info-table-item">{{ record.customerNo }}</div>
                <div class="info-table-item">授权函</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">银行卡照片</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">非法人身份证照片正面</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">非法人身份证照片反面</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
                <div class="info-table-item">非法人身份证有效期</div>
                <div class="info-table-item">
                  <el-image
                    style="width: 50px; height: 25px"
                    :src="url"
                    :preview-src-list="srcList"
                  />
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
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
  name: 'SettlementDetails',
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
        { key: 'channelNo', label: '审核人', width: '100' },
        { key: 'customerName', label: '审核说明', width: '100' },
        { key: 'customerGrade', label: '审核时间', width: '100' },
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
