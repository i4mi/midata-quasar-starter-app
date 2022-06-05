<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <h3>Übersicht</h3>
        </div>
      </div>
      <!--q-btn round @click="refresh" label="Refresh" /-->

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
        :rows="this.rows"
        :columns="columns"
        row-key="name"
      />
    </div>
  </div>
</template>

<script>
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

export default defineComponent({
  methods: {
    refresh() {
      this.$epd.getVaccinations();
    },
  },
  setup() {
    return {
      patientName: ref(
        loggedInPatient.loggedIn?.name[0].family ?? 'Please Log in'
      ),
      stoffname: 'hello',
      date: ref('2022/01/01'),
      group: ref([]),
      model: ref(null),
      columns,
      visibleColumns: ref([]),
    };
  },
  data() {
    return {
      rowsMidata: vaccinationsMidata,
      rowsEPD: vaccinations,
      rows: ref([].concat(vaccinations, vaccinationsMidata))
    };
  },
});

</script>
