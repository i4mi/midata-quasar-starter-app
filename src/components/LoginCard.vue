<template>
  <div class="container">
    <q-card class="card">
      <q-card-section>
        <div class="text-h4 text-weight-thin">MIDATA Login</div>
        <div class="text-body1">
          Damit sie MIDATA verwenden können, müssen Sie sich zuerst
          einloggen/registrieren.
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions>
        <q-btn
          flat
          @click="connect()"
          class="midata-fade full-width"
          color="white"
          >Mit MIDATA verbinden</q-btn
        >
      </q-card-actions>
    </q-card>
    <q-card class="card">
      <q-card-section>
        <div class="text-h4 text-weight-thin">EPD Login</div>
        <div class="text-body1">
          Damit sie EPD verwenden können, müssen Sie sich zuerst einloggen.
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions>
        <q-btn
          @click="
            () => {
              prompt();
            }
          "
          v-model="connectedEpd"
          :disabled="connectedEpd == true"
          flat
          class="epd-fade full-width"
          color="white"
        >
          {{ labelEPD }}</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { JSOnFhir } from '@i4mi/js-on-fhir';
import {
  getIdBySystemOID,
  EPR_SPID_OID,
  HOEHEWEG_OID,
} from '../plugins/helpers';
import { loggedInPatient } from '../plugins/epdService.ts';
import { storage } from 'src/boot/plugins';

export default defineComponent({
  data: function () {
    return {
      $q: useQuasar(),
      connectedEpd: false,
      fhir: new JSOnFhir(
        'https://test.ahdis.ch/mag-bfh',
        'irrelevant',
        'irr🐘',
        true
      ),
      labelEPD: ref('Mit dem EPD verbinden'),
    };
  },
  name: 'LoginCard',

  methods: {
    connect() {
      this.$midata.authenticate();
    },
    prompt() {
      this.$epd.loggedIn = true;

      this.$q
        .dialog({
          title: 'MPI des Patients',
          message: 'Bitte tragen Sie die MPI-Nummer des Patienten ein',
          prompt: {
            model: '761337619779800896',
            isValid: (val) => val.length > 2,
            type: 'text',
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
           this.$epd.getPatientResource('761337619779800896')
          this.labelEPD = 'Connected'
        });
    },
  },
});
</script>

<style lang="sass" scoped>
.card
  max-width: 500px

.container
  display: flex
  justify-content: center
  margin-top: 50px
</style>

