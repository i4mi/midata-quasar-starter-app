<template>
  <login-card v-if="!$midata.isLoggedIn()"></login-card>
  <q-page v-if="$midata.isLoggedIn()">
    <div class="q-mb-xl">
      <div class="text-h3 text-weight-thin">Midata Demo</div>
      <q-separator spaced class="midata-fade"></q-separator>
    </div>

    <div v-if='!this.$storage.getObservations().length'>
      Sie haben noch keine Daten. Wollen sie randomisierte Daten erstellen lassen?
      <br>
      <q-btn @click='updateRandomData()' color="red"> Dummy Daten generieren </q-btn>
      <div style="height: 25px"></div>
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
      <q-tab :ripple="false" name="heartRate" icon="monitor_heart" label="Heart Rate" @click='this.$router.push("/midata/demo/heartrate")'/>
      <q-tab :ripple="false" name="bodyTemperature" icon="thermostat" label="Body Temperature" @click='this.$router.push("/midata/demo/bodytemperature")'/>
    </q-tabs>
    <div style="height: 25px" />

    <RouterView :expanded='expanded' />
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
      expanded: ref(false),
      tab: ref(),
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
    },
    updateRandomData(){
      this.$midata.generateRandomData().then(() => {
        console.log('done')
      })
    },
  },
});
</script>

<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
