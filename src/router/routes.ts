import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/midata/introduction',
  },
  {
    path: '/midata/introduction',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataIntroduction.vue'),
      },
    ],
  },
  {
    path: '/midata/myFirstApp',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataMyFirstApp.vue'),
      },
    ],
  },
  {
    path: '/midata/demo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/MidataDemo.vue'),
        children: [],
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorPage.vue'),
  },
];

export default routes;
