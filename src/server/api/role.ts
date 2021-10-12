/*
 * @Author: zhuwuqing
 * @Date: 2021-09-22 14:15:48
 * @Last Modified by: zhuwuqing
 * @Last Modified time: 2021-09-26 16:46:16
 */
import Abstract from '../request'
import { GetDemo, PostDemo } from '../types'

class Basic extends Abstract {
  // 列表
  list(params?: any) {
    return this.getReq({ url: 'role.list', params })
  }

  // 新增角色
  addRole(data?: any) {
    return this.postReq({
      url: 'role.addRole',
      data,
      dataType: 'JSON',
    })
  }

  // 编辑角色
  eidtRole(data?: any) {
    return this.putReq({
      url: 'role.eidtRole',
      data,
      dataType: 'JSON',
    })
  }

  // 删除角色
  delRole(params?: any) {
    return this.deleteReq({
      url: 'role.delRole',
      params
    })
  }

  // 检查角色是否可用
  duplicateCheck(params?: any) {
    return this.getReq({
      url: 'role.duplicateCheck',
      params
    })
  }
  
  // 查询授权列表
  queryTreeList(params?: any) {
    return this.getReq({ url: 'role.queryTreeList', params })
  }

  // 查询当前角色已授权ids
  queryRolePermission(params?: any) {
    return this.getReq({ url: 'role.queryRolePermission', params })
  }

  // 角色子用户列表
  userRoleList(params?: any) {
    return this.getReq({ url: 'role.userRoleList', params })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Basic()
  return instance
})()
