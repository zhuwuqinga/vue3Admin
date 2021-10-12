<!-- 文件上传 -->
<template>
  <div class="file-upload">
    <el-button size="small" class="download" @click="downloadFile"
      ><i class="el-icon-download" style="font-size: 14px" />模板下载</el-button
    >
    <el-upload
      ref="upload"
      :multiple="false"
      accept=".xls,.xlsx"
      action="#"
      :before-upload="beforeUpload"
      :on-change="handleUploadChange"
      :http-request="uploadHttpRequest"
      :on-remove="fileRemove"
      :on-exceed="exceedFile"
      :file-list="fileList"
      :limit="1"
      :auto-upload="false"
      class="choice_file"
    >
      <el-button size="small" type="primary">选择文件</el-button>
    </el-upload>
    <el-button
      v-if="uploadBtn"
      size="small"
      type="primary"
      :disabled="uploadDisabled"
      @click="submitUpload"
      class="upload"
      >点击上传</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { ElMessage } from 'element-plus'
import api from '@/server/api/system'
export default defineComponent({
  name: 'FileUpload',
  props: {
    uploadBtn: { // 是否显示上传按钮
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const data = reactive({
      uploadDisabled: true,
      fileList: <any>[],
    })
    const upload = <any>ref({})
    // 下载模板文件
    const downloadFile = () => {
      let url =
        'https://t-bcasapi.bcasmw.cn/agent-gateway/terminal/pos/downExcel'
      // window.location.href = process.env.VUE_APP_BASE_API + url
      window.location.href = url
    }
    // 上传文件之前的钩子：判断上传文件格式、大小等，若返回false则停止上传
    const beforeUpload = (file: any) => {
      const isType = file.type === 'application/vnd.ms-excel'
      const isTypeComputer =
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const fileType = isType || isTypeComputer
      if (!fileType) {
        ElMessage.warning('上传文件只能是xls/xlsx格式！')
      }
      // 文件大小限制为10M
      const fileLimit = file.size / 1024 / 1024 < 10
      if (!fileLimit) {
        ElMessage.warning('上传文件大小不超过10M！')
      }
      return fileType && fileLimit
    }
    // 自定义上传方法，param是默认参数
    const uploadHttpRequest = (param: any) => {
      const formData = new FormData() // FormData对象，添加参数只能通过append('key', value)的形式添加
      formData.append('file', param.file) // 添加文件对象
      /**
       * @param batchType customer 来源商户查询
       */
      let methods = api.uploadFileToFtp
      api.uploadFileToFtp(formData).then((res: any) => {
        if (res.origin.code === 200) {
          ElMessage.success('上传成功')
          const { fileUrl } = res.origin.object
          ctx.emit('uploadFile', fileUrl)
          param.onSuccess() // 上传成功的文件显示绿色的对勾
        } else {
          param.onError() // 上传失败的文件会从文件列表中删除
        }
      })
    }
    // 文件发生改变
    const handleUploadChange = (file: any, fileList: any) => {
      if (fileList.length > 0) {
        data.uploadDisabled = false
        data.fileList = fileList
      }
    }
    // 点击上传：手动上传到服务器，此时会触发组件的http-request
    const submitUpload = () => {
      upload.value.submit()
    }
    // 移除选择的文件
    const fileRemove = (file: any, fileList: any) => {
      if (fileList.length < 1) {
        data.uploadDisabled = true // 未选择文件则禁用上传按钮
      }
    }
    // 文件超出个数时的钩子
    const exceedFile = (files: any, fileList: any) => {
      ElMessage.warning('只能选择1个文件！')
    }
    return {
      ...toRefs(data),
      downloadFile,
      beforeUpload,
      uploadHttpRequest,
      handleUploadChange,
      submitUpload,
      fileRemove,
      exceedFile,
      upload,
    }
  },
})
</script>
<style lang="scss">
.file-upload {
  min-height: 70px;
  position: relative;
  .download {
    margin-left:10px;
    position: absolute;
    // top: 5px;
    // height: 32px;
  }
  .choice_file {
    position: absolute;
    // top: 0;
    left: 114px;
  }
  .upload {
    position: absolute;
    // top: 5px;
    left: 204px;
  }
}
</style>
