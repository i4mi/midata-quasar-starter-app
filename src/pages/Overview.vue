<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <h3>Übersicht</h3>
        </div>
      </div>
      <q-btn round @click="test" label="Refresh" />

      <div></div>


      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 self-center">
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="max-width: 500px">
              <q-input
                v-model="patientName"
                readonly
                label="Patient / geimpfte Person"
              ></q-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Historie"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top="props">
          <div v-if="$q.screen.gt.xs" class="col">
            <q-toggle v-model="visibleColumns" val="epd" label="EPD" />
            <q-toggle v-model="visibleColumns" val="midata" label="Midata" />
          </div>
          <q-select
            v-else
            v-model="visibleColumns"
            multiple
            borderless
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            style="min-width: 150px"
          />

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import { midata, storage } from 'src/boot/plugins';
import { vaccinationsMidata, currentPatient } from 'src/plugins/midataService';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { loggedInPatient, vaccinations } from '../plugins/epdService.ts';
import { Patient } from '@i4mi/fhir_r4';



const columns = [
  {
    name: 'name',
    required: true,
    label: 'Impfstoffname',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'platform',
    align: 'center',
    label: 'Hochgeladen auf',
    field: 'platform',
  },
  {
    name: 'producer',
    align: 'center',
    label: 'Lot Nummer',
    field: 'lotNo',
    sortable: true,
  },
  { name: 'protection', label: 'Schutz', field: 'protection', sortable: true },
  { name: 'dosageno', label: 'Dosisnummer', field: 'dosageno' },
  {
    name: 'vaccinationdate',
    label: 'Verabreichungsdatum',
    field: 'vaccinationdate',
    sortable: true,
  },
  { name: 'practicioner', label: 'Behandelnder Arzt', field: 'practicioner' },
];


const rowsMidata = vaccinationsMidata;
const rowsEPD = vaccinations;



let rows = [];

if (rowsEPD && rowsMidata) rows.concat(rowsEPD, rowsMidata);
if (rowsEPD) rows = rowsEPD;
//if (rowsMidata) rows = rowsMidata;

console.log(
  'rows EPD exist: ',rowsEPD,
  '\nrows Midata exist: ',rowsMidata,
  '\nRows count', rows.length,
  '\nvaccinations', vaccinations.length);

export default defineComponent({


  methods: {
    test() {
      this.$epd.getVaccinations()
      // this.patientResource = this.$storage.getPatient();
      // console.log(this.patientResource.name[0].given.toString() + ' ' + this.patientResource.name[0].family);


    },


    //  getFullPatientName() {
    //   let name = this.$storage.getPatient().name;
    //   return name[0].given.toString() + ' ' + name[0].family;
    // },

  },
  setup() {
    const selected = ref([]);
    return {
      patientName: ref(loggedInPatient.loggedIn?.name[0].family ?? 'Please Log in'), //Works for EPD not midata.

      // this.$storage.getPatient()[0].given.toString() + ' ' + this.$storage.getPatient().family),

      stoffname: 'hello',
      date: ref('2022/01/01'),
      group: ref([]),
      model: ref(null),
      columns,
      rows,
      selected,
      visibleColumns: ref([]),
      getSelectedString() {
        return selected.value.length === 0
          ? ''
          : `${selected.value.length} record${
              selected.value.length > 1 ? 's' : ''
            } selected of ${rows.length}`;
      },
    };
  },
  data() {
  return {};
  },
});

 function getNameFinally() {

   return new Promise((resolve,reject)=>{
     if (this.getFullPatientName() !== undefined){
      name: this.getFullPatientName()}
      else {
        resolve (
          'Unresolved'
        )

      }
   })


 }

</script>
