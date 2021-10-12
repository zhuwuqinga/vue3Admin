/*
 * @Author: linfudong
 * @Date: 2021-09-29 15:55:46
 * @LastEditors: linfudong
 * @LastEditTime: 2021-09-29 16:41:43
 * @Description: 系统管理
 */
import Abstract from '../request'
import { GetDemo, PostDemo } from '../types'

class Basic extends Abstract {
  /**
   * 菜单管理 ======================
   */
  
  /**
   * 菜单管理列表
   */
   menuList(params?: any) {
    return this.getReq({ url: 'menu.menuList', params, dataType: 'FORM' })
  }
  /**
   * 上级菜单
   */
   queryTreeList(params?: any) {
    return this.getReq({ url: 'menu.queryTreeList', params, dataType: 'FORM' })
  }

  /**
   * 数据字典 ======================
   */
  /**
   * 数据字典列表
   */
  dictList(params?: any) {
    return this.getReq({ url: 'dict.dictList', params, dataType: 'FORM' })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Basic()
  return instance
})()
