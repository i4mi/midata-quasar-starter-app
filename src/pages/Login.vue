<template>
  <login-card></login-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginCard from '../components/LoginCard.vue';
import { Patient } from '@i4mi/fhir_r4';

export default defineComponent({
  name: 'MidataDemo',
  components: {
    'login-card': LoginCard,
  },

  data: () => ({
    patientResource: {} as Patient,
    flag: false,
  }),
  methods: {
    getFullPatientName() {
      let name = this.$storage.getPatient().name;
      return name[0].given.toString() + ' ' + name[0].family;
    },
    isEmpty(obj: any) {
      return JSON.stringify(obj) === '{}';
    },
    getPatient() {
      this.patientResource = this.$storage.getPatient();
      console.log(this.patientResource);
    },
    getImmunizations() {
      return this.$storage.getImmunizations();
    },
    formatDate(date: any) {
      return this.$moment(date.toString()).format('lll');
    },
  },
});
</script>
