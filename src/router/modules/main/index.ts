import { RouteRecordRaw } from 'vue-router';

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/main/analysis/dashboard',
    name: 'dashboard',
    component: () => import('@/views/main/analysis/dashboard/index.vue'),
    children: [],
  },
  {
    path: '/main/analysis/overview',
    name: 'overview',
    component: () => import('@/views/main/analysis/overview/index.vue'),
    children: [],
  },
  {
    path: '/main/product/category',
    name: 'category',
    component: () => import('@/views/main/product/category/index.vue'),
    children: [],
  },
  {
    path: '/main/product/goods',
    name: 'goods',
    component: () => import('@/views/main/product/goods/index.vue'),
    children: [],
  },
  {
    path: '/main/story/chat',
    name: 'chat',
    component: () => import('@/views/main/story/chat/index.vue'),
    children: [],
  },
  {
    path: '/main/story/list',
    name: 'list',
    component: () => import('@/views/main/story/list/index.vue'),
    children: [],
  },
  {
    path: '/main/system/department',
    name: 'department',
    component: () => import('@/views/main/system/department/index.vue'),
    children: [],
  },
  {
    path: '/main/system/menu',
    name: 'menu',
    component: () => import('@/views/main/system/menu/index.vue'),
    children: [],
  },
  {
    path: '/main/system/role',
    name: 'role',
    component: () => import('@/views/main/system/role/index.vue'),
    children: [],
  },
  {
    path: '/main/system/user',
    name: 'user',
    component: () => import('@/views/main/system/user/index.vue'),
    children: [],
  },
];
