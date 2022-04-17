<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-2"></div>
        <div class="col">
          <h3>Übersicht</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 self-center">
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="max-width: 500px">
              <q-input
                v-model="ph"
                readonly
                label="Patient / geimpfte Person"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <q-table title="Historie" :rows="rows" :columns="columns" row-key="name" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

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
    name: 'producer',
    align: 'center',
    label: 'Hersteller',
    field: 'producer',
    sortable: true,
  },
  { name: 'protection', label: 'Schutz', field: 'protection', sortable: true },
  { name: 'dosageno', label: 'Dosisnummer', field: 'dosageno' },
  {
    name: 'vaccinationdate',
    label: 'Verabreichungsdatum',
    field: 'vaccinationdate',
  },
  { name: 'practicioner', label: 'Behandelnder Arzt', field: 'practicioner' },
];

const rows = [
  {
    name: 'Frozen Yogurt',
    producer: 'Moderna',
    protection: 'Röteln',
    dosageno: 26164,
    vaccinationdate: '02/06/2021',
    practicioner: 'Cornelia Corona',
  },
  {
    name: 'Ice cream sandwich',
    producer: 'Coop',
    protection: 'Virale hepatitis, Typ B',
    dosageno: 37525,
    vaccinationdate: '02/06/2011',
    practicioner: 'Apotheker Alain',
  },
  {
    name: 'Eclair',
    producer: 'Migros',
    protection: 'Röteln',
    dosageno: 23442,
    vaccinationdate: '02/06/2014',
    practicioner: 'Pfleger Paul',
  },
  {
    name: 'Cupcake',
    producer: 'Migros',
    protection: 'Gelbfieber',
    dosageno: 64247,
    vaccinationdate: '02/06/2011',
    practicioner: 'Ingo Impft',
  },
  {
    name: 'Gingerbread',
    producer: 'Nestle',
    protection: 'Röteln',
    dosageno: 49224,
    vaccinationdate: '02/06/2021',
    practicioner: 'Sandra Sticht',
  },
  {
    name: 'Jelly bean',
    producer: 'Moderna',
    protection: 'Windpocken',
    dosageno: 94424,
    vaccinationdate: '02/06/2021',
    practicioner: 'Lebkuchemann',
  },
  {
    name: 'Donut',
    producer: 'Pfizer',
    protection: 'Gelbfieber',
    dosageno: 55101,
    vaccinationdate: '02/06/2021',
    practicioner: 'Apotheker Alain',
  },
  {
    name: 'KitKat',
    producer: 'Moderna',
    protection: 'Röteln',
    dosageno: 60065,
    vaccinationdate: '02/06/2001',
    practicioner: 'Doktor Daniela',
  },
];

export default {
  setup() {
    return {
      ph: ' ',
      stoffname: 'hello',
      date: ref('2022/01/01'),
      group: ref([]),
      model: ref(null),
      columns,
      rows,
    };
  },
};
</script>