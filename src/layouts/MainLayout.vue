<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="midata-fade">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Demo App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerExpanded" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>
        <PageLinks v-for="link in pageLinks" :key="link.title" v-bind="link" />

        <q-expansion-item
          clickable
          default-opened
          icon="code"
          label="Webentwicklung"
          :content-inset-level="0.5"
        >
          <PageLinks
            v-for="link in developmentLinks"
            :key="link.title"
            v-bind="link"
          ></PageLinks>
        </q-expansion-item>

        <q-expansion-item
          clickable
          default-opened
          icon="person"
          label="Midata"
          :content-inset-level="0.5"
        >
          <PageLinks
            v-for="link in midataPageLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="my-div">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import PageLinks from 'components/PageLinks.vue';

const linksList = [
  {
    title: 'Übersicht',
    icon: 'dashboard',
    link: '/overview',
  },
];

const midataLinksList = [
  {
    title: 'Einführung in MIDATA',
    icon: 'rocket',
    link: '/midata/introduction',
  },
  {
    title: 'Meine erste MIDATA App',
    icon: 'terminal',
    link: '/midata/myFirstApp',
  },
  {
    title: 'Midata Demo',
    icon: 'auto_fix_high',
    link: '/midata/demo',
  },
  {
    title: 'Daten generieren',
    icon: 'description',
    link: '/midata/generate',
  },
];

const deveelopmentLinksList = [
  {
    title: 'Basics',
    icon: 'keyboard_arrow_right',
    link: '/developmentBasics',
  },
  {
    title: 'Quasar Framework',
    icon: 'favorite',
    link: '/quasar',
  },
  {
    title: 'Versionskontrolle und GitHub',
    icon: 'upload',
    link: '/github',
  },
  {
    title: 'Internationalisierung mit Vue-i18n und Moment.js',
    icon: 'language',
    link: '/internationalization',
  },
];

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    PageLinks,
  },

  setup() {
    const drawerExpanded = ref(false);

    return {
      pageLinks: linksList,
      midataPageLinks: midataLinksList,
      developmentLinks: deveelopmentLinksList,

      drawerExpanded,
      toggleLeftDrawer() {
        drawerExpanded.value = !drawerExpanded.value;
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.my-div
  body.screen--xl &
    margin: 5% 10% 5% 10%

  body.screen--lg &
    margin: 5% 10% 5% 10%

  body.screen--md &
    margin: 5% 10% 5% 10%

  body.screen--sm &
    margin: 5% 5% 5% 5%

  body.screen--xs &
    margin: 5% 5% 5% 5%
</style>
