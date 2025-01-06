import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    // redirect: '/home',
    // redirect: '/news/head/头条',
    // name: 'home',
    // component: () => import('../views/Home/index.vue'),
    component: () => import('../views/HomeView.vue'),

  },
  {
    path: '/home',
    name: 'Home',
    meta: { keepAlive: true },
    // component: () => import('../views/Home/index.vue'),
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/news',
    name: 'myNews',
    component: () => import('../views/news/News.vue'),
    children: [
      {
        path: 'head/:type',
        component: () => import('../views/news/NewsList.vue'),
        props: (route) => ({ query: route.query.key })
      },
      {
        path: 'city',
        name: 'myNews-city',
        components: {
          // CityList: CityList,
        }
      },
      {
        path: 'picture/:type',
        name: 'myNews-picture',
        components: {
          // PictureList: () => import('@/components/news/PictureList'),
        }
      },
      {
        path: 'text/:type',
        name: 'myNews-dz',
        components: {
          // TextList: () => import('@/components/news/TextList'),
        }
      },
      {
        path: 'more',
        components: {
          // NewsList4: () => import('@/components/news/NewsList4'),
        }
      }

    ]
  },
  {
    path: '/video/',
    name: 'myVideo',
    // component: () => import('@/components/videos/Video'),
    children: [
      {
        path: 'videoList/:type',
        components: {
          // VideoList: () => import('@/components/videos/VideoList'),
        },
      }

    ]
  },
  {
    path: '/live/',
    name: 'myLive',
    // component: () => import('@/components/live/Live')
  },
  {
    path: '/mine/',
    name: 'myHome',
    // component: () => import('@/components/mine/Mine')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // if (to.meta.keepAlive) {
  //   $bus.$emit('student-affairs-cached', to.name)
  // }
  // if (to.fullPath.includes('/basis-process-center') || to.fullPath.includes('/basis-office-affairs')) {
  //   next()
  // } else {
  //   next('/basis-process-center' + to.fullPath)
  // }
})

export default router
