import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'


const whiteList = ['/login']

router.beforeEach((to, from, next)=>{
    NProgress.start();

    // 设置页面的title
    document.title = getPageTitle(to.meta.title)
    const hasLogin = localStorage.getItem('hasLogin')
    if(hasLogin){
        next()
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }

})


router.afterEach((to, from)=>{
    NProgress.done()
})