<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { midata, moment, storage } from 'boot/plugins';
import { useRouter } from 'vue-router';

const i18n = useI18n()
const router = useRouter()

onMounted(() => {
  i18n.locale.value = storage.getCurrentLanguage();
  setLanguage(i18n.locale.value);
  midata
    .handleAuthResponse()
    .then((response: any) => {
      if (response && midata.isLoggedIn()) {
        Promise.all([
          storage.restoreFromMidata(),
          midata.getPatientResource(),
        ])
          .then((results) => {
            const preferredCom = results[1].communication.find((coms) => {
              return coms.preferred;
            });
            if (preferredCom) {
              const lang = preferredCom.language.coding[0].code;
              if (lang) {
                setLanguage(lang);
              }
            }
            router.push('/midata/demo');
          })
          .catch();
      } else if (midata.isLoggedIn()) {
        storage.restoreFromMidata();
      }
    })
    .catch();
})

function setLanguage(_lang: string): void {
  i18n.locale.value = _lang;
  moment.locale(_lang === 'de' ? 'de-ch' : 'fr-ch');
  storage.setCurrentLanguage(_lang);
}
</script>
