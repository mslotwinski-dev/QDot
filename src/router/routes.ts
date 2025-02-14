import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/pages/Index.vue'),
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/404.vue'),
  },
]

export default routes
