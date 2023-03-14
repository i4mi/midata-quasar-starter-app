<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{label}} {{actionTypeLabel}}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form
          @submit="updateObservation()"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-select
            v-model="bodySite"
            :options="options"
            label="Körperregion der Messung"
            :rules="[
              (val:String) =>
                (val !== null && val !== '') ||
                'Bitte wählen sie eine Körperregion aus.',
            ]"
          />
          <q-badge class="midata-fade">
            {{label}}: {{ value }} {{unit}}
          </q-badge>

          <q-slider
            v-model="value"
            :min="min"
            :max="max"
            :step="step"
            style="max-width: 90%"
          />
          <div>
            <q-btn
              label="Observation speichern"
              type="submit"
              color="primary"
              class="q-ml-sm"
            />
            <q-btn
              label="Zurücksetzen"
              type="reset"
              color="red"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-space />
        <q-btn flat label="Schliessen" @click.stop="show = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { PropType, ref, computed, onBeforeUpdate } from 'vue';
import { ObservationStatus } from '@i4mi/fhir_r4';
import { ObservationType } from 'src/plugins/midataService';
import { useUserStore } from 'stores/user';

const props = defineProps({
  visible: Boolean,
  actionType: String,
  observationType: String as PropType<ObservationType>,
  label: String,
  unit: String,
  options: Array,
  min: Number,
  max: Number,
  step: Number,
  defaultValue: Number
})
const emit = defineEmits(['close'])
const store = useUserStore()

const bodySite = ref('')
const value = ref(props.defaultValue)

onBeforeUpdate(() => {
  if(props.actionType === 'edit') {
    bodySite.value = store.currentObservation.bodySite.coding[0].display;
    value.value = value.value = store.currentObservation.valueQuantity.value;
  }
})

const show = computed({
  get: () => {
    return props.visible
  },
  set: (value: any) => {
    if (!value) {
      emit('close');
    }
  }
})

const actionTypeLabel = computed(() => props.actionType === 'edit' ?
  'Bearbeiten' : 'Hinzufügen')

function onReset() {
  bodySite.value = '';
  value.value = props.defaultValue;
}
async function updateObservation() {
  if (props.actionType == 'edit'){
    await store.updateObservation(
      store.currentObservation.id,
      bodySite.value,
      [value.value],
      props.observationType);
  }
  else if (props.actionType == 'add'){
    await store.createObservation(
      ObservationStatus.PRELIMINARY,
      bodySite.value,
      [value.value],
      props.observationType);
  }
  else {
    throw new Error('No correct type found')
  }
  show.value = false
}
</script>

<style lang="sass" scoped>
.fade
    background-image: linear-gradient(to bottom right, #087add, #32c6b6)
</style>
