<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { midata } from 'boot/plugins';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

const router = useRouter();
const store = useUserStore();

onMounted(() => {
  midata
    .handleAuthResponse()
    .then((response: any) => {
      if (response && midata.isLoggedIn()) {
        Promise.all([store.restoreFromMidata(), midata.getPatientResource()])
          .then((results) => {
            console.log('Patient loaded: ', results);
            router.push('/midata/demo');
          })
          .catch();
      } else if (midata.isLoggedIn()) {
        store.restoreFromMidata();
      }
    })
    .catch();
});
</script>
