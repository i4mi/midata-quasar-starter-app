<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="impfconnect-fade">
        <!-- <q-btn
          flat
          dense
          round
          icon="search"
          aria-label="Search"
          @click="toggleLeftDrawer"
        /> -->
        <q-toolbar-title> <q-img
          src="../assets/overview/logo_transparent.png"
          
          style="height: 120px; max-width: 280px"
        /> </q-toolbar-title>
        <PageLinks v-for="link in pageLinks" :key="link.title" v-bind="link" />
        <PageLinks
            v-for="link in midataPageLinks"
            :key="link.title"
            v-bind="link"
          />
      </q-toolbar>
    </q-header>

    <!-- <q-drawer v-model="drawerExpanded" show-if-above bordered>
      <q-list>
        <q-item-label header> All entries </q-item-label>
        
        
      </q-list>
    </q-drawer> -->

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
    {
    title: 'Impfung erfassen',
    icon: 'vaccines',
    link: '/vaccination',
  },
];

const midataLinksList = [
  {
    title: 'Login',
    icon: 'person',
    link: '/midata/demo',
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

/*      drawerExpanded,
       toggleLeftDrawer() {
        drawerExpanded.value = !drawerExpanded.value;
      }, */
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
