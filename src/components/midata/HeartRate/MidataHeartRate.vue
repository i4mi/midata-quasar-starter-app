<template>
  <q-card>
    <q-card-section>
      <q-item-label header
      >Alle Puls Observationen von
        {{ getFullPatientName() }}</q-item-label
      >
      <q-virtual-scroll
        :items="filteredList"
        bordered
        padding
        class="rounded-borders"
        style="max-height: 300px"
      >
        <template v-slot="{ item, index }">
          <q-item clickable dense v-ripple :key="index">
            <q-item-section avatar>
              <q-avatar
                icon="monitor_heart"
                text-color="white"
                class="midata-fade"
              >
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                lines="1"
              >
                Puls
              </q-item-label>
              <q-item-label caption>
                Wert: {{ item.valueQuantity.value }}
                {{ item.valueQuantity.unit }} ({{
                  item.bodySite.coding[0].display
                }})
              </q-item-label>
              <q-item-label caption>
                Datum:
                {{ formatDate(item.issued) }}
              </q-item-label>
            </q-item-section>
            <q-btn
              color="primary"
              outlined
              flat
              @mouseover="store.setCurrentObservation(item.id)"
              @click.stop="showEditDialog = true"
              icon="edit"
              class="gt-xs"
            >
              Bearbeiten
            </q-btn>
            <q-btn
              color="red"
              outlined
              flat
              @mouseover="store.setCurrentObservation(item.id)"
              @click.stop="showDeleteDialog = true"
              icon="delete"
              class="gt-xs"
            >
              Löschen
            </q-btn>
            <q-btn
              color="primary"
              outlined
              round
              flat
              @mouseover="store.setCurrentObservation(item.id)"
              @click.stop="showEditDialog = true"
              icon="edit"
              class="lt-sm"
            >
            </q-btn>
            <q-btn
              color="red"
              outlined
              round
              flat
              @mouseover="store.setCurrentObservation(item.id)"
              @click.stop="showDeleteDialog = true"
              icon="delete"
              class="lt-sm"
            >
            </q-btn>
          </q-item>
          <q-item v-if='expanded' :key='index + "_codeblock"' >
            <q-item-section clickable @click='store.copyToClipBoard(item, "Observation Resource")'>
              <highlightjs
                lang="json"
                :code="JSON.stringify(item, null, 2)"
              ></highlightjs>
            </q-item-section>
          </q-item>
          <q-separator inset spaced />
        </template>
      </q-virtual-scroll>
    </q-card-section>
    <q-card-actions>
      <q-btn
        color="primary"
        outlined
        flat
        icon="add"
        @click.stop="showAddDialog = true"
        label="Puls Observation hinzufügen"
      />
      <q-space></q-space>
      <q-toggle
        v-model="expanded"
        label="Vollständige Ressourcen anzeigen"
        left-label
      />
    </q-card-actions>
  </q-card>
  <div style="height: 25px"></div>

  <SingleValueObservationChart
    :data='filteredList'
    :observation-type='"Puls"'
    :unit='"beats/min"'>
  </SingleValueObservationChart>

  <edit-single-value-dialog
    :visible="showEditDialog"
    :actionType='"edit"'
    :observation-type='observationType'
    :label='"Puls"'
    :unit='"bpm"'
    :options='options'
    :min='20'
    :max='200'
    :step='5'
    :default-value='75'
    @close="onEdit()"
  ></edit-single-value-dialog>
  <edit-single-value-dialog
    :visible="showAddDialog"
    :actionType='"add"'
    :observation-type='observationType'
    :label='"Puls"'
    :unit='"bpm"'
    :options='options'
    :min='20'
    :max='200'
    :step='5'
    :default-value='75'
    @close="onEdit()"
  ></edit-single-value-dialog>
  <delete-observation-dialog
    :visible="showDeleteDialog"
    :observation-type='observationType'
    @close="onEdit()"
  ></delete-observation-dialog>
</template>

<script setup lang='ts'>
import DeleteObservationDialog from 'components/midata/DeleteObservationDialog.vue';
import { ref, computed } from 'vue';
import { Observation } from '@i4mi/fhir_r4';
import SingleValueObservationChart from 'components/midata/Charts/SingleValueObservationChart.vue';
import { ObservationType } from 'src/plugins/midataService';
import EditSingleValueDialog from 'components/midata/EditSingleValueDialog.vue';
import fhirData from 'src/data/fhirData.json';
import { moment } from 'boot/plugins';
import { useUserStore } from 'stores/user';

const store = useUserStore()

const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const expanded = ref(false)
const observationType = ref(ObservationType.HEART_RATE)

const options = computed(() => {
  return fhirData.HEART_RATE.map(e => {
    return e.id
  })
})
const filteredList = computed(() => {
  return store.observations
    .filter((obs: Observation) => {
      return obs.code.coding[0].code === '8867-4'
    })
    .sort((a: Observation, b: Observation) => {
      return new Date(a.issued).getTime() - new Date(b.issued).getTime();
    });
})

function formatDate(date: any) {
  return moment(date.toString()).format('lll');
}
function getFullPatientName() {
  let name = store.patientResource.name;
  return name[0].given.toString() + ' ' + name[0].family;
}
function onEdit() {
  showEditDialog.value = false;
  showAddDialog.value = false;
  showDeleteDialog.value = false;
}
</script>
