<template>
  <q-card>
    <q-card-section>
      <q-item-label header
      >Alle Blutdruck Observationen von
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
                {{ formatDate(item.issued) }}
              </q-item-label>
            </q-item-section>
            <q-btn
              color="primary"
              outlined
              flat
              @mouseover="this.$storage.setCurrentObservation(item.id)"
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
              @mouseover="this.$storage.setCurrentObservation(item.id)"
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
              @mouseover="this.$storage.setCurrentObservation(item.id)"
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
              @mouseover="this.$storage.setCurrentObservation(item.id)"
              @click.stop="showDeleteDialog = true"
              icon="delete"
              class="lt-sm"
            >
            </q-btn>
          </q-item>
          <q-item v-if='expanded' :key='index + "_codeblock"' >
            <q-item-section clickable @click='this.$storage.copyToClipBoard(item, "Observation Resource")'>
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
        v-model="expanded"
        label="Vollständige Ressourcen anzeigen"
        left-label
      />
    </q-card-actions>
  </q-card>
  <div style="height: 25px"></div>

  <DoubleValueObservationChart
    :data='filteredList'
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

<script lang='ts'>
import DeleteObservationDialog from 'components/midata/DeleteObservationDialog.vue';
import { defineComponent } from 'vue';
import { Observation } from '@i4mi/fhir_r4';
import { ObservationType } from 'src/plugins/midataService';
import EditBloodPressureDialog from 'components/midata/BloodPressure/EditBloodPressureDialog.vue';
import DoubleValueObservationChart from 'components/midata/Charts/DoubleValueObservationChart.vue';

export default defineComponent({
  name: 'MidataBloodPressure',
  components: {
    DoubleValueObservationChart,
    DeleteObservationDialog,
    EditBloodPressureDialog
  },
  data() {
    return {
      observations: this.$storage.getObservations(),
      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      expanded: false,
      observationType: ObservationType.BLOOD_PRESSURE
    }
  },
  computed: {
    ObservationType() {
      return ObservationType.BODY_TEMPERATURE
    },
    filteredList(): Observation[] {
      return this.observations
        .filter((obs: Observation) => {
          return obs.code.coding[0].code === '85354-9'
        })
        .sort((a: Observation, b: Observation) => {
          return new Date(a.issued).getTime() - new Date(b.issued).getTime();
        });
    }
  },
  methods: {
    formatDate(date: any) {
      return this.$moment(date.toString()).format('lll');
    },
    getFullPatientName() {
      let name = this.$storage.getPatient().name;
      return name[0].given.toString() + ' ' + name[0].family;
    },
    onEdit() {
      this.showEditDialog = false;
      this.showAddDialog = false;
      this.showDeleteDialog = false;
      this.observations = this.$storage.getObservations();
    }
  },
});
</script>
