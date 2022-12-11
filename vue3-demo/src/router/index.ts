import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/chatGPT',
    name: 'chatGPT',
    component: () => import('@/views/chatGPT.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router