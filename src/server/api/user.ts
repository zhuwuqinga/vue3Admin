/*
 * @Author: jingbiao
 * @Date: 2021-09-23 09:43:18
 * @Last Modified by: jingbiao
 * @Last Modified time: 2021-09-29 15:10:42
 */

import Abstract from '../request'
import { GetDemo, PostDemo } from '../types'

class Basic extends Abstract {
  list(params?: any) {
    return this.getReq({ url: 'user.list', params })
  }
  queryall(params?: any) {
    return this.getReq({ url: 'user.queryall', params })
  }
  queryTreeList(params?: any) {
    return this.getReq({ url: 'user.queryTreeList', params })
  }
  tenantList(params?: any) {
    return this.getReq({ url: 'user.tenantList', params })
  }
  positionList(params?:any){
    return this.getReq({url:'user.positionList',params})
  }
  // 头像上传
  upload(data?: any) {
    return this.postReq({
      url: 'user.upload',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  
  // 回收站查询
  recycleBin(params?:any){
    return this.getReq({url:'user.recycleBin',params})
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Basic()
  return instance
})()
