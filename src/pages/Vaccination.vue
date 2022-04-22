<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <h3>Impfung Erfassen</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 self-center">
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="max-width: 500px">
              <q-input v-model="ph" label="Patient / geimpfte Person" />
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-2"></div>
        <div class="col-3">
          <!-- https://fhir.ch/ig/ch-vacd/ValueSet-ch-vacd-vaccines-vs.html-->
          <div class="q-pa-md" style="max-width: 400px">
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
        <div class="col-1"></div>
        <div class="col-4 protection">
          <div class="q-pa-md">
            <h5 class="header-protection">Schutz</h5>
            <q-option-group
              :options="options"
              type="checkbox"
              v-model="group"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-2 self-center"></div>
        <div class="col-3 self-center">
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="max-width: 300px">
              <q-input v-model="ph" label="Dosisnummer" placeholder hint />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-3 self-center">
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="max-width: 300px">
              <q-input v-model="ph" label="Lot-Nr." placeholder hint />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2 self-center"></div>
        <div class="col-5 self-center">
          <div class="q-pa-md" style="max-width: 300px">
            <q-input filled v-model="date" mask="date">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" label="Impfdatum">
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
                v-model="ph"
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
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    function uploadToEpd() {
      console.log('Upload to EPD pressed')
    }
    function uploadToMidata() {
      console.log('Upload to Midata pressed')
    }
    return {
      ph: ' ',
      stoffname: 'hello',
      date: ref('2022/01/01'),
      group: ref([]),
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
  padding-left: 70px;
}
</style>
