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
              connectedEpd = true;
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
import { patient } from '../plugins/storage';

export default defineComponent({


  data: function () {
    return {
      patient,
      connectedEpd: false,
    };
  },
  name: 'LoginCard',

  methods: {
    connect() {
      this.$midata.authenticate();
    },
  },
  setup() {
    const fhir = new JSOnFhir(
      'https://test.ahdis.ch/mag-bfh',
      'irrelevant',
      'irr🐘',
      true
    );

    let labelEPD = ref('Mit dem EPD verbinden');
    const $q = useQuasar();

    async function getPatient(patientId) {
      const id = patientId;
      console.log('KIS-ID', id);
      patient.spid = await searchSpid(id);

      let patientResource = await loadPatientBySPID(patient.spid);

      console.log('patientResource: ', patientResource);

      patient.name =
        patientResource.name[0].family + ' ' + patientResource.name[0].given[0];
      patient.gender = patientResource.gender;
      patient.birthDate = patientResource.birthDate;

      console.log('Patient Name: ', patient.name);
      labelEPD.value = patient.name
    }

    async function searchSpid(id) {
      let eprSPID = ' ';
      // We search for the patients EPR-SPID as registered on the EPD Playground
      // by using the local ID (which is also registered in the EPD Playground)

      const SEARCH_PARAMS = {
        // sourceIdentifier is the ID we know (local ID from Klinik Höheweg)
        sourceIdentifier: HOEHEWEG_OID + '|' + id,
        // target system is the ID we want
        targetSystem: EPR_SPID_OID,
      };

      await fhir
        .performOperation('ihe-pix', {}, 'GET', SEARCH_PARAMS, 'Patient')
        .then((result) => {
          console.log('Server answer', result);
          if (
            result.body &&
            result.body.parameter &&
            result.body.parameter[0].valueIdentifier
          ) {
            eprSPID = result.body.parameter[0].valueIdentifier.value;
          } else {
            eprSPID = 'nicht gefunden';
          }
        })
        .catch((err) => {
          eprSPID = 'nicht gefunden';
          console.log(err);
        });
      return eprSPID;
    }

    async function loadPatientBySPID(spid) {
      const SEARCH_PARAMS = {
        identifier: EPR_SPID_OID + '|' + spid,
      };
      let patientResource = {};
      let localId = {};
      await fhir
        .search('Patient', SEARCH_PARAMS)
        .then((result) => {
          if (result.entry && result.entry[0] && result.entry[0].resource) {
            patientResource = result.entry[0].resource;
            patient.kisid = getIdBySystemOID(HOEHEWEG_OID, patientResource);
          }
        })
        .catch((err) => {
          //this.display = 'Oops. Something went wrong.';
          console.log(err);
        });
      return patientResource;
    }

    return {
      prompt() {
        $q.dialog({
          title: 'MPI des Patients',
          message: 'Bitte tragen Sie die MPI-Nummer des Patienten ein',
          prompt: {
            model: 'PAT.9779.8008',
            isValid: (val) => val.length > 2,
            type: 'text',
          },
          cancel: true,
          persistent: true,
        }).onOk((data) => {
          getPatient(data);
        });
      },
      fhir, labelEPD
    };
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
