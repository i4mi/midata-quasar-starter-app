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
            const preferredCom = results[1].communication.find((coms) => {
              return coms.preferred;
            });
            if (preferredCom) {
              const lang = preferredCom.language.coding[0].code;
              if (lang) {
                store.changeLanguage(lang);
              }
            }
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
