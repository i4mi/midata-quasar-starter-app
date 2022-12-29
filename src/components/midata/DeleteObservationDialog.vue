<template>
  <q-dialog v-model="show">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Observation löschen?</div>
        <br/>
        <div class="text-subtitle1">Dieser Vorgang kann nicht rückgängig gemacht werden</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Abbrechen" text-color="blue-grey-9" outline @click.stop="show = false"/>
        <q-btn label="Observation Löschen" color="red"
        @click='updateObservation()'/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ObservationStatus } from '@i4mi/fhir_r4';

export default defineComponent({
  name: 'DeleteObservationDialog',
  props: ['visible'],
  data: () => ({}),
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value: any) {
        if (!value) {
          this.$emit('close');
        }
      },
    },
  },
  methods: {
    async updateObservation() {
      await this.$storage.updateObservation(
        this.$storage.getCurrentObservation().id,
        this.$storage.getCurrentObservation().bodySite.coding[0].display,
        this.$storage.getCurrentObservation().valueInteger,
        ObservationStatus.ENTERED_IN_ERROR
      );
      this.show = false
    },
  },
});
</script>

<style lang="sass" scoped>
</style>
