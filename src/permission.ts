import router from './router'
import Cookies from 'js-cookie'
import NProgress from 'nprogress'
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('token')
  NProgress.start()
  if (token) {
    // console.log('如果有token', 111)
    if (to.path === '/login') {
      // console.log('如果有token且路径为登录页--跳转到首页', 222)
      next({ path: '/' })
      NProgress.done()
    } else {
      // console.log('如果有token且路径不是登录页--跳转到目标页', 333)
      next()
      NProgress.done()
    }
  } else {
    /* has no token*/
    // console.log('如果没有token', 444)
    if (whiteList.indexOf(to.path) !== -1) {
      // console.log(555)
      next()
      NProgress.done()
    } else {
      // console.log(666)
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
