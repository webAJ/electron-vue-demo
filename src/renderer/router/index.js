import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
		  path: '*',
		  redirect: '/fpp'
    },
		{
		  path: '/fpp',
		  name: 'fpp',
		  components: {
		    footer:() => import('@/components/footer'),
		    default: () => import('@/components/fpp/index'),
		  }
		},
    //首页
    {
      path: '/home',
      name: 'home',
      components: {
        footer:() => import('@/components/footer'),
        default: () => import('@/components/home/index'),
      }
    },
    // 详情
    {
      path: '/detail',
      name: 'detail',
      components: {
        header:() => import('@/components/header'),
        default: () => import('@/components/detail/index'),
      }
    },
    // 文章
    {
      path: '/Article',
      name: 'Article',
      components: {
        default: () => import('@/components/Article/index'),
      }
    },
    // 章节
    {
      path: '/chapter',
      name: 'chapter',
      components: {
        default: () => import('@/components/chapter/index'),
      }
    },
    // 分类
    {
      path: '/class',
      name: 'class',
      components: {
        footer:() => import('@/components/footer'),
        default: () => import('@/components/class/index'),
      }
    },
    // 排行榜
    {
      path: '/Ranking',
      name: 'Ranking',
      components: {
        footer:() => import('@/components/footer'),
        default: () => import('@/components/Ranking/index'),
      }
    },
    
  ]
})
