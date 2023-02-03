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

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { ObservationStatus } from '@i4mi/fhir_r4';
import { ObservationType } from 'src/plugins/midataService';
import { storage } from 'boot/plugins';

const emit = defineEmits(['close'])

const props = defineProps({
  visible: Boolean,
  observationType: String as PropType<ObservationType>
})

const show = computed({
  get: () => props.visible,
  set: (value: any) => {
    if (!value) {
      emit('close');
    }
  }
})

async function updateObservation() {
  await storage.updateObservation(
    storage.getCurrentObservation().id,
    storage.getCurrentObservation().bodySite.coding[0].display,
    [storage.getCurrentObservation().valueInteger],
    props.observationType,
    ObservationStatus.ENTERED_IN_ERROR
  );
  show.value = false
}
</script>

<style lang="sass" scoped>
</style>
