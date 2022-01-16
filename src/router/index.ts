import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import localCache from '@/utils/local-cache';
import { firstMenu } from '@/utils/map-menus';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: Layout,
    redirect: '/main',
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import('@/views/main/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/error-page/404.vue'),
  },
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

  if (to.path === '/main') {
    return firstMenu.url;
  }
});

export default router;
