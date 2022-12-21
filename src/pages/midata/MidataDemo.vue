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
      <q-toggle
        v-model="expanded"
        label="Resourcen-JSON anzeigen"
        left-label
      />
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

    <PatientResource :flag='flag' :patient-resource='patientResource' :expanded='expanded'></PatientResource>

    <div style="height: 25px" />
    <q-tabs
      v-model="tab"
      narrow-indicator
      dense
      align="justify"
      class="text-primary"
    >
      <q-tab :ripple="false" name="heartRate" icon="monitor_heart" label="Heart Rate" />
      <q-tab :ripple="false" name="bodyTemperature" icon="thermostat" label="Body Temperature" />
    </q-tabs>
    <div style="height: 25px" />
    <MidataBodyTemperature v-if='tab === "bodyTemperature"'
                           :expanded='expanded'
                           :copy-to-clip-board='copyToClipBoard'
                           :format-date='formatDate'
                           :get-current-observation='getCurrentObservation'
                           :get-full-patient-name='getFullPatientName'>
    </MidataBodyTemperature>
    <MidataHeartRate v-if='tab === "heartRate"'
                           :expanded='expanded'
                           :copy-to-clip-board='copyToClipBoard'
                           :format-date='formatDate'
                           :get-current-observation='getCurrentObservation'
                           :get-full-patient-name='getFullPatientName'>
    </MidataHeartRate>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginCard from '../../components/LoginCard.vue';
import { Patient } from '@i4mi/fhir_r4';
import { copyToClipboard, Notify } from 'quasar';
import PatientResource from 'components/midata/PatientResource.vue';
import MidataBodyTemperature from 'pages/midata/MidataBodyTemperature.vue';
import MidataHeartRate from 'pages/midata/MidataHeartRate.vue';

export default defineComponent({
  name: 'MidataDemo',
  components: {
    MidataHeartRate,
    MidataBodyTemperature,
    PatientResource,
    'login-card': LoginCard,
  },
  setup() {

    return {
      expanded: ref(false),
      tab: ref('bodyTemperature'),
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
    setCurrentObservation(id: any) {
      this.$storage.setCurrentObservation(id);
    },
    getCurrentObservation() {
      return this.$storage.getCurrentObservation();
    },
    formatDate(date: any) {
      return this.$moment(date.toString()).format('lll');
    },
    logout() {
      this.$midata.logout();
      location.reload();
    },
    copyToClipBoard(item: any, identifier = 'Resource') {
      copyToClipboard(JSON.stringify(item, null, 2))
        .then(() => {
          Notify.create({
            message: `${identifier} kopiert`,
            color: 'green',
            position: 'top',
            icon: 'announcement',
          })
          })
        .catch(() => {
          Notify.create({
            message: `Kopieren von ${identifier} fehlgeschlagen`,
            color: 'red',
            position: 'top',
            icon: 'announcement',
          })
        })
    }
  },
});
</script>

<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
