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
                  :rules="[(val) => !!val || 'Field is required']"
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
                  v-model="immunizationName"
                  :options="optionsImpf"
                  label="Impfstoffname"
                  :rules="[(val) => !!val || 'Field is required']"
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
                v-model="protections"
                multiple
                :options="options"
                label="Schutz"

                :rules="[(val) => !!val || 'Field is required']"

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
                  :rules="[(val) => !!val || 'Field is required']"
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
                <q-input
                  v-model="lotNumber"
                  label="Lot-Nr."
                  placeholder
                  hint
                  :rules="[(val) => !!val || 'Field is required']"
                />
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
                  :rules="[(val) => !!val || 'Field is required']"
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
import { midata } from 'src/boot/plugins';
import { ref } from 'vue';

import { loggedInPatient } from '../plugins/epdService.ts';


export default {
  setup() {


    return {
      name: ref(''),
      dosisName: ref(''),
      lotNumber: ref(''),
      patientName: ref(

        'Bitte Patient erfassen'),
      healthProfessional: ref(''),
      minuteOptionsTime1: [0, 15, 30, 45],
      date: ref(new Date().toLocaleString('de-CH')),
      group: ref([]),
      protections: ref(null),
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
      immunizationName: ref(null),
      optionsImpf: ['FSME-Immun CC', 'Encepur N', 'Inflexal V', 'Poliorix'],
    };
  },


  methods: {
    uploadToEpd() {

        const illnessArray = !this?.protections?[]:Object.keys(this?.protections)?.map((index) => {
        let illness = this?.protections[index];
        return illness.label;
      })
      console.log(
        'Upload to EPD pressed',
        '\nImpfstoffname',
        this?.immunizationName,
        '\nSchutz vor',
        illnessArray?.join(', '),
        '\nDosisnummer',
        this?.dosisName,
        '\nLot-Nr.',
        this?.lotNumber,
        '\nDatum',
        this?.date,
        '\nBehandelnder Arzt',
        this?.healthProfessional
      );
      this.$epd.setVACDRecordBundle(this.immunizationName,illnessArray,this.dosisName,this.lotNumber,this.date)
      this.$epd.setProvideBundle()
    },
    uploadToMidata() {


      const newImmunization = midata.newImmunization(this.immunizationName, this.protections, this.dosisName, this.lotNumber, this.date, this.healthProfessional)

      console.log(newImmunization.protocolApplied[0].targetDisease[0].coding[0].display)

      midata.createImmunization(newImmunization)
    },

    getPatient() {
          this.patientResource = this.$storage.getPatient();
          console.log(this.patientResource);
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




