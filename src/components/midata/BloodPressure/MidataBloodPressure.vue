<template>
  <q-card>
    <q-card-section>
      <q-item-label header
      >Alle Blutdruck Observationen von
        {{ store.fullPatientName }}</q-item-label
      >
      <q-virtual-scroll
        :items="store.filteredList"
        bordered
        padding
        class="rounded-borders"
        style="max-height: 300px"
      >
        <template v-slot="{ item, index }">
          <q-item clickable dense v-ripple :key="index">
            <q-item-section avatar>
              <q-avatar
                icon="bloodtype"
                text-color="white"
                class="midata-fade"
              >
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                lines="1"
              >
                Blutdruck
              </q-item-label>
              <q-item-label caption>
                Wert: {{ item.component[0].valueQuantity.value }} / {{ item.component[1].valueQuantity.value }}
                {{ item.component[0].valueQuantity.unit }} ({{
                  item.bodySite.coding[0].display
                }})
              </q-item-label>
              <q-item-label caption>
                Datum:
                {{ store.formatDate(item.issued) }} ({{$moment(item.issued).fromNow()}})
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
          <q-item v-if='store.observationsExpanded' :key='index + "_codeblock"' >
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
        label="Blutdruck Observation hinzufügen"
      />
      <q-space></q-space>
      <q-toggle
        v-model="store.observationsExpanded"
        label="Vollständige Ressourcen anzeigen"
        left-label
      />
    </q-card-actions>
  </q-card>
  <div style="height: 25px"></div>

  <DoubleValueObservationChart
    :data='store.filteredList'
    :observation-type='"Blutdruck"'
    :unit='"mmHg"'
    :min='20'
    :max='220'
  >
  </DoubleValueObservationChart>

  <edit-blood-pressure-dialog
    :visible="showEditDialog"
    :actionType='"edit"'
    @close="onEdit()"
  ></edit-blood-pressure-dialog>
  <edit-blood-pressure-dialog
    :actionType='"add"'
    :visible="showAddDialog"
    @close="onEdit()"
  ></edit-blood-pressure-dialog>
  <delete-observation-dialog
    :visible="showDeleteDialog"
    :observation-type='observationType'
    @close="onEdit()"
  ></delete-observation-dialog>
</template>

<script setup lang='ts'>
import DeleteObservationDialog from 'components/midata/DeleteObservationDialog.vue';
import { ref } from 'vue';
import { ObservationType } from 'src/plugins/midataService';
import EditBloodPressureDialog from 'components/midata/BloodPressure/EditBloodPressureDialog.vue';
import DoubleValueObservationChart from 'components/midata/Charts/DoubleValueObservationChart.vue';
import { useUserStore } from 'stores/user';

const store = useUserStore()
store.currentFilter = '85354-9'

const showAddDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const observationType = ref<ObservationType>(ObservationType.BLOOD_PRESSURE)

function onEdit() {
  showEditDialog.value = false;
  showAddDialog.value = false;
  showDeleteDialog.value = false;
}
</script>
