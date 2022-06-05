import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Overview.vue') }],
  },
  {
    path: '/overview',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Overview.vue') }],
  },
  {
    path: '/vaccination',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Vaccination.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
