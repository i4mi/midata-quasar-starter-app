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
import { storage } from 'src/boot/plugins';
import { vaccinationsMidata } from 'src/plugins/midataService';
import { ref } from 'vue';
import { defineComponent } from 'vue';
import { loggedInPatient, vaccinations } from '../plugins/epdService.ts';



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

// const rowsMidata = storage.getImmunizations();
const rowsMidata = vaccinationsMidata;
const rowsEPD = vaccinations;

let rows = [];

//if (rowsEPD && rowsMidata) rows.concat(rowsEPD, rowsMidata);
//if (rowsEPD) rows = rowsEPD;
if (rowsMidata) rows = rowsMidata;

console.log(
  'rows EPD exist: ',rowsEPD,
  '\nrows Midata exist: ',rowsMidata,
  '\nRows count', rows.length,
  '\nvaccinations', vaccinations.length);

export default defineComponent({
  data() {
    return {};
  },
  methods: {
    test() {
      this.$epd.getVaccinations();
    },
  },
  setup() {
    const selected = ref([]);
    return {
      patientName: ref(
        loggedInPatient.loggedIn?.name[0].family ?? 'Bitte Patient erfassen'
      ),
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
});
</script>
