<template>
  <q-card>
    <q-card-section>
      <q-item-label header
      >Alle Puls Observationen von
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

  <edit-observation-dialog
    :visible="showEditDialog"
    @close="showEditDialog = false"
  ></edit-observation-dialog>
  <add-observation-dialog
    :visible="showAddDialog"
    @close="showAddDialog = false"
  ></add-observation-dialog>
  <delete-observation-dialog
    :visible="showDeleteDialog"
    @close="showDeleteDialog = false"
  ></delete-observation-dialog>
</template>

<script lang='ts'>
import DeleteObservationDialog from 'components/midata/DeleteObservationDialog.vue';
import AddObservationDialog from 'components/midata/AddObservationDialog.vue';
import EditObservationDialog from 'components/midata/EditObservationDialog.vue';
import { defineComponent, ref } from 'vue';
import bodySites from 'src/data/bodySites.json';
import { storage } from 'boot/plugins';
import { Observation } from '@i4mi/fhir_r4';

export default defineComponent({
  name: 'MidataHeartRate',
  components: {
    DeleteObservationDialog,
    AddObservationDialog,
    EditObservationDialog
  },
  props: ['expanded', 'getFullPatientName', 'getCurrentObservation', 'formatDate', 'copyToClipBoard'],
  setup() {
    return {
      refData: storage.getObservations(),
      showAddDialog: ref(false),
      showEditDialog: ref(false),
      showDeleteDialog: ref(false),
      options: bodySites.bodySitesHr
    }
  },
  //todo herausfinden wieso hier method funktioniert aber computed nicht
  methods: {
    setCurrentObservation(id: any) {
      this.$storage.setCurrentObservation(id);
    },
    filteredList() {
      return this.refData.filter((obs: Observation) => {
        return obs.code.coding[0].code === '8867-4'
      })
    }
  },
  computed: {},
});
</script>

<style scoped>

</style>
