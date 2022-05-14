<template>
  <div id="q-app" style="min-height: 100vh">
    <h3>Impfung Erfassen</h3>
    <div>
      <div class="q-pa-md">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8 self-center">
            <div class="q-pa-md">
              <div class="q-gutter-y-md column" style="max-width: 500px">
                <q-input
                  v-model="patientName"
                  readonly
                  label="Name des Patients"
                >
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
import { JSOnFhir } from '@i4mi/js-on-fhir';
import { v4 as uuid } from 'uuid';
import { loggedInPatient, immunizations } from '../plugins/epdService.ts';


export default {
  setup() {
    let eprSpid = '';
    function uploadToEpd() {
      console.log('Upload to EPD pressed');
    }
    function uploadToMidata() {
      console.log('Upload to Midata pressed');
    }

    return {
      name: ref(''),
      dosisName: ref(''),
      lotNumber: ref(''),
      patientName: ref(loggedInPatient.loggedIn?.name[0].family ?? 'Bitte Patient erfassen'),
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
      model: ref(null),
      optionsImpf: ['FSME-Immun CC', 'Encepur N', 'Inflexal V', 'Poliorix'],
      uploadToEpd,
      uploadToMidata,
    };
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