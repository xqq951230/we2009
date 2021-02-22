// import Layout from '@/layout'
module.exports = [
    {
        path: '/material',
        component: ()=> import('@/layout'),
        redirect: '/material/home',
        children: [
            {
                path: 'home',
                component: ()=> import('@/views/material/Home'),
                meta: {
                    title: '首页'
                },
            }
        ]
      }




]