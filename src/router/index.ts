import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// import Layout from '@/layout/index.vue';
import localCache from '@/utils/local-cache';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  // {
  //   path: '/1',
  //   component: Layout,
  //   redirect: '/main',
  //   children: [
  //     {
  //       path: 'main',
  //       component: () => import('@/views/main/index.vue'),
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.get('token');
    if (!token) {
      return '/login';
    }
  }
});

export default router;
