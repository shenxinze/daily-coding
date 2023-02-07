import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    redirect: '/chatGPT',
    children: [
      {
        path: '/chatGPT',
        name: 'chatGPT',
        component: () => import('@/views/chatGPT.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router