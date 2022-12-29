<template>
  <q-card>
    <q-card-section>
      <q-item-label header
      >Alle Körpertemperatur Observationen von
        {{ getFullPatientName() }}</q-item-label
      >
      <q-virtual-scroll
        :items="filteredList()"
        bordered
        padding
        class="rounded-borders"
        style="max-height: 300px"
      >
        <template v-slot="{ item, index }">
          <q-item clickable dense v-ripple :key="index">
            <q-item-section avatar>
              <q-avatar
                icon="thermostat"
                text-color="white"
                class="midata-fade"
              >
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label
                lines="1"
              >
                Körpertemperatur
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
              @mouseover="setCurrentObservation(item.id)"
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
              @mouseover="setCurrentObservation(item.id)"
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
              @mouseover="setCurrentObservation(item.id)"
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
              @mouseover="setCurrentObservation(item.id)"
              @click.stop="showDeleteDialog = true"
              icon="delete"
              class="lt-sm"
            >
            </q-btn>
          </q-item>
          <q-item v-if='expanded' :key='index + "_codeblock"' >
            <q-item-section clickable @click='copyToClipBoard(item, "Observation Resource")'>
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
        label="Körpertemperatur Observation hinzufügen"
      />
    </q-card-actions>
  </q-card>

  <edit-body-temperature-dialog
    :visible="showEditDialog"
    :type='"edit"'
    @close="onEdit()"
  ></edit-body-temperature-dialog>
  <edit-body-temperature-dialog
    :type='"add"'
    :visible="showAddDialog"
    @close="onEdit()"
  ></edit-body-temperature-dialog>
  <delete-observation-dialog
    :visible="showDeleteDialog"
    @close="onEdit()"
  ></delete-observation-dialog>
</template>

<script lang='ts'>
import DeleteObservationDialog from 'components/midata/DeleteObservationDialog.vue';
import EditBodyTemperatureDialog from 'components/midata/BodyTemperature/EditBodyTemperatureDialog.vue';
import { defineComponent } from 'vue';
import bodySites from 'src/data/bodySites.json';
import { Observation } from '@i4mi/fhir_r4';

export default defineComponent({
  name: 'MidataBodyTemperature',
  components: {
    DeleteObservationDialog,
    EditBodyTemperatureDialog
  },
  props: ['expanded', 'getFullPatientName', 'getCurrentObservation', 'formatDate', 'copyToClipBoard'],
  data() {
    return {
      observations: this.$storage.getObservations(),
      showAddDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      options: bodySites.bodySitesBt,
    }
  },
  computed: {},
  methods: {
    setCurrentObservation(id: any) {
      this.$storage.setCurrentObservation(id);
    },
    filteredList() {
      return this.observations.filter((obs: Observation) => {
        return obs.code.coding[0].code === '8310-5'
      })
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

<style scoped>
</style>
