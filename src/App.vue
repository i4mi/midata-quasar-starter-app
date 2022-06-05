<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Impfconnect',
  methods: {
    setLanguage(_lang: string): void {
      this.$i18n.locale = _lang;
      this.$moment.locale(_lang === 'de' ? 'de-ch' : 'fr-ch');
      this.$storage.setCurrentLanguage(_lang);
    },
    logout(): void {
      if (this.$midata.isLoggedIn()) {
        this.$midata.logout();
      }
    },
  },
  mounted() {
    this.$i18n.locale = this.$storage.getCurrentLanguage();
    this.setLanguage(this.$i18n.locale);
    this.$midata
      .handleAuthResponse()
      .then((response: any) => {
        if (response && this.$midata.isLoggedIn()) {
          Promise.all([
            this.$storage.restoreFromMidata(),
            this.$midata.getPatientResource(),
          ])
            .then((results) => {
              const preferredCom = results[1].communication.find((coms) => {
                return coms.preferred;
              });
              if (preferredCom) {
                const lang = preferredCom.language.coding[0].code;
                if (lang) {
                  this.setLanguage(lang);
                }
              }
              this.$router.push('/login');
            })
            .catch();
        } else if (this.$midata.isLoggedIn()) {
          this.$storage.restoreFromMidata();
        }
      })
      .catch();
  },
});
</script>
