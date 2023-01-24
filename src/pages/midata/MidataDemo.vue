<template>
  <login-card v-if="!$midata.isLoggedIn()"></login-card>
  <q-page v-if="$midata.isLoggedIn()">
    <div class="q-mb-xl">
      <div class="text-h3 text-weight-thin">Midata Demo</div>
      <q-separator spaced class="midata-fade"></q-separator>
    </div>

    <div class="row justify-end">
      <q-btn
        @click="
          getPatient();
          flag = true;
        "
        flat
        text-color="white"
        class="gt-xs midata-fade"
      >
        <q-icon left name="person"></q-icon>
        Patientenresource von MIDATA abfragen
      </q-btn>
      <q-btn
        @click="
          getPatient();
          flag = true;
        "
        flat
        icon="person"
        text-color="white"
        class="lt-sm midata-fade"
        label="Patienten Ressource abfragen"
      >
      </q-btn>
      <q-space />
      <q-btn
        color="black"
        label="Logout"
        icon="logout"
        rounded
        outline
        @click="logout()"
        class="gt-xs"
      />
      <q-btn
        color="black"
        icon="logout"
        round
        outline
        @click="logout()"
        class="lt-sm"
      />
    </div>
    <div style="height: 25px"></div>

    <PatientResource :flag='flag' :patient-resource='patientResource'></PatientResource>

    <div style="height: 25px" />
    <q-tabs
      narrow-indicator
      dense
      align="justify"
      class="text-primary"
    >
      <q-route-tab
        icon="monitor_heart"
        to="/midata/demo/heartrate"
        label='Heart Rate'
        exact
      />
      <q-route-tab
        icon="thermostat"
        to="/midata/demo/bodytemperature"
        label='Body Temperature'
        exact
      />
      <q-route-tab
        icon="bloodtype"
        to="/midata/demo/bloodpressure"
        label='Blood Pressure'
        exact
      />
    </q-tabs>
    <div style="height: 25px" />

    <RouterView/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginCard from '../../components/LoginCard.vue';
import { Patient } from '@i4mi/fhir_r4';
import PatientResource from 'components/midata/PatientResource.vue';

export default defineComponent({
  name: 'MidataDemo',
  components: {
    PatientResource,
    'login-card': LoginCard,
  },
  setup() {
    return {
      listExpanded: ref(false),
      obsType: ref(),
    };
  },
  data: () => ({
    patientResource: {} as Patient,
    flag: false,
  }),
  computed: {},
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
    formatDate(date: any) {
      return this.$moment(date.toString()).format('lll');
    },
    logout() {
      this.$midata.logout();
      location.reload();
    }
  },
});
</script>

<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
