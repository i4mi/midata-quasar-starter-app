<template>
  <div id="q-app" style="min-height: 100vh">
    <h3>Impfung Erfassen</h3>
    <q-input
        v-model="patientMPI"
        label="MPI des Patients"
        hint="Bitte tragen Sie die MPI-Nummer des Patienten ein"
      >
        <template v-slot:append>
          <q-icon
            v-if="patientMPI !== ''"
            name="close"
            @click="patientMPI = ''"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:after>
          <q-btn
            v-if="patientMPI !== ''"
            round
            dense
            flat
            icon="send"
            @click="getPatient(patientMPI)"
          />
        </template>
      </q-input>
    <div  v-show="visible">
      <div class="q-pa-md">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8 self-center">
            <div class="q-pa-md">
              <div class="q-gutter-y-md column" style="max-width: 500px">
                <q-input v-model="patientName" readonly label="Name des Patients">
                </q-input>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-3">
            <!-- https://fhir.ch/ig/ch-vacd/ValueSet-ch-vacd-vaccines-vs.html-->
            <div class="q-pa-md" style="max-width: 500px">
              <div class="q-gutter-md">
                <q-select
                  v-model="model"
                  :options="optionsImpf"
                  label="Impfstoffname"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-3">
            <div class="q-pa-md" style="max-width: 500px">
              <q-select
                filled
                v-model="multiple"
                multiple
                :options="options"
                label="Schutz"
                
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-3 self-center">
            <div class="q-pa-md">
              <div class="q-gutter-y-md column" style="max-width: 300px">
                <q-input
                  v-model="dosisName"
                  label="Dosisnummer"
                  placeholder
                  hint
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2"></div>
          <div class="col-3 self-center">
            <div class="q-pa-md">
              <div class="q-gutter-y-md column" style="max-width: 300px">
                <q-input v-model="lotNumber" label="Lot-Nr." placeholder hint />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2 self-center"></div>
          <div class="col-5 self-center">
            <div class="q-pa-md" style="max-width: 300px">
              <q-input filled v-model="date">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date" mask="DD MMM YYYY HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="date"
                        mask="DD MMM YYYY HH:mm"
                        format24h
                        :minute-options="minuteOptionsTime1"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-2 self-centers"></div>
          <div class="col-5 self-center">
            <div class="q-pa-md">
              <div class="q-gutter-y-md column" style="max-width: 300px">
                <q-input
                  v-model="healthProfessional"
                  label="Behandelnder Arzt"
                  placeholder
                  hint
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center">
          <div class="col-7">
            <div class="q-pa-md q-gutter-sm">
              <q-btn
                color="white"
                text-color="black"
                label="Impfung in Midata erfassen"
                style="width: 180px"
                @click="uploadToMidata"
              />
              <q-btn
                color="white"
                text-color="black"
                label="Impfung im EPD erfassen"
                style="width: 180px"
                @click="uploadToEpd"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Patient } from '@i4mi/fhir_r4';
import { JSOnFhir } from '@i4mi/js-on-fhir';
import { v4 as uuid } from 'uuid';
import {
  getIdBySystemOID,
  convertToBase64,
  EPR_SPID_OID,
  HOEHEWEG_OID,
} from '/home/lukas/Documents/VS/Impfconnect/lc2_Argoa1_Loosl1_Impfconnect/src/plugins/helpers.ts';

export default {
  setup() {
    const fhir = new JSOnFhir(
      'https://test.ahdis.ch/mag-bfh',
      'irrelevant',
      'irr🐘',
      true
    );

    let eprSpid = '';
    function uploadToEpd() {
      console.log('Upload to EPD pressed');
    }
    function uploadToMidata() {
      console.log('Upload to Midata pressed');
    }
    const patientMPI = ref('PAT.9779.8008');
    let patientName = ref('');
    const patient = '';
    return {
      name: ref(''),
      dosisName: ref(''),
      lotNumber: ref(''),
      patientName,
      patientMPI,
      healthProfessional: ref(''),
      minuteOptionsTime1: [0, 15, 30, 45],
      date: ref(new Date().toLocaleString('de-CH')),
      group: ref([]),
      multiple: ref(null),
      options: [
        { label: 'Windpocken', value: 'Windpocken' },
        { label: 'Masern', value: 'Masern' },
        { label: 'Mumps', value: 'Mumps' },
        { label: 'Röteln', value: 'Roeteln' },
        { label: 'Virale hepatitis, Typ A', value: 'hepA' },
        { label: 'Virale hepatitis, Typ B', value: 'hepB' },
        { label: 'Frühsommer-Miningoenzephalithis (FSME)', value: 'FSME' },
        { label: 'Gelbfieber', value: 'gelb' },
        { label: 'Starrkrampf', value: 'skrampf' },
      ],
      visible: ref(),
      eprSpid,
      patient,
      fhir,
      model: ref(null),
      optionsImpf: ['FSME-Immun CC', 'Encepur N', 'Inflexal V', 'Poliorix'],
      uploadToEpd,
      uploadToMidata,
    };
  },
  methods: {
    async searchSpid(id) {
      let eprSPID = ' ';
      // We search for the patients EPR-SPID as registered on the EPD Playground
      // by using the local ID (which is also registered in the EPD Playground)

      const SEARCH_PARAMS = {
        // sourceIdentifier is the ID we know (local ID from Klinik Höheweg)
        sourceIdentifier: HOEHEWEG_OID + '|' + id,
        // target system is the ID we want
        targetSystem: EPR_SPID_OID,
      };

      await this.fhir
        .performOperation('ihe-pix', {}, 'GET', SEARCH_PARAMS, 'Patient')
        .then((result) => {
          console.log('Server answer', result);
          if (
            result.body &&
            result.body.parameter &&
            result.body.parameter[0].valueIdentifier
          ) {
            eprSPID = result.body.parameter[0].valueIdentifier.value;
            console.log('1', eprSPID);
          } else {
            eprSPID = 'nicht gefunden';
          }
        })
        .catch((err) => {
          eprSPID = 'nicht gefunden';
          console.log(err);
        });
      console.log('2', eprSPID);
      return eprSPID;
    },

    async loadPatientBySPID(spid) {
      const SEARCH_PARAMS = {
        identifier: EPR_SPID_OID + '|' + spid,
      };
      await this.fhir
        .search('Patient', SEARCH_PARAMS)
        .then((result) => {
          if (result.entry && result.entry[0] && result.entry[0].resource) {
            this.patient = result.entry[0].resource;
            this.localId = getIdBySystemOID(HOEHEWEG_OID, this.patient);
          }
          console.log('Search result', result);
        })
        .catch((err) => {
          this.display = 'Oops. Something went wrong.';
          console.log(err);
        });
    },
    async getPatient(patientName) {
      console.log('getPatient pressed. ID des Patients: ' + patientName);
      const id = patientName;
      console.log('KIS-ID', id);
      this.eprSpid = await this.searchSpid(id);
      console.log('spid: ', this.eprSpid);
      await this.loadPatientBySPID(this.eprSpid);
      console.log('patient: ', this.patient);
      let name =
      this.patient.name[0].family + ' ' + this.patient.name[0].given[0];
      this.patientName = ref(name);
      console.log(this.patientName);
      this.visible=true;
    },
  },
};
</script>

<style scoped>
.header-protection {
  font-size: medium;
  color: rgb(85, 83, 83);
}
.protection {
  padding-left: 50px;
}
</style>