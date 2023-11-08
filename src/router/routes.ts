import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DevOverview.vue') }],
  },
  {
    path: '/overview',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/DevOverview.vue') }],
  },
  {
    path: '/developmentBasics',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/development/DevelopmentBasics.vue') },
    ],
  },
  {
    path: '/quasar',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/development/QuasarIntro.vue') }],
  },
  {
    path: '/github',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/development/GithubIntro.vue') }],
  },
  {
    path: '/pinia',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/development/PiniaAndDevtools.vue') }],
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
        children: [
          {
            path: '', redirect: '/midata/demo/bodytemperature'
          },
          {
            path: 'bodytemperature', component: () => import('components/midata/BodyTemperature/MidataBodyTemperature.vue')
          },
          {
            path: 'heartrate', component: () => import('components/midata/HeartRate/MidataHeartRate.vue')
          },
          {
            path: 'bloodpressure', component: () => import('components/midata/BloodPressure/MidataBloodPressure.vue')
          },
        ],
      },
    ],
  },
  {
    path: '/midata/generate',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/midata/GenerateData.vue'),
      },
    ],
  },
  {
    path: '/internationalization',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/development/InternationalizationIntro.vue') },
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
