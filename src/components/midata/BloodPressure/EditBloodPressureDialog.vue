<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Blutdruck {{ actionTypeLabel }}</div>
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
            Systolischer Blutdruck: {{ systolicPressure }} mmHg
          </q-badge>
          <q-slider
            v-model="systolicPressure"
            :min="20"
            :max="220"
            :step="5"
            style="max-width: 90%"
          />

          <q-badge class="midata-fade">
            Diastolischer Blutdruck: {{ diastolicPressure }} mmHg
          </q-badge>
          <q-slider
            v-model="diastolicPressure"
            :min="20"
            :max="220"
            :step="5"
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
import { computed, ref, onBeforeUpdate } from 'vue';
import fhirData from '../../../data/fhirData.json';
import { ObservationStatus } from '@i4mi/fhir_r4';
import { ObservationType } from 'src/plugins/midataService';
import { Notify } from 'quasar';
import { useUserStore } from 'stores/user';

const props = defineProps({
  visible: Boolean,
  actionType: String,
});
const emit = defineEmits(['close']);
const store = useUserStore();

const systolicPressure = ref(120);
const diastolicPressure = ref(90);
const bodySite = ref('');

onBeforeUpdate(() => {
  if (props.actionType === 'edit') {
    bodySite.value = store.currentObservation.bodySite.coding[0].display;
    systolicPressure.value =
      store.currentObservation.component[0].valueQuantity.value;
    diastolicPressure.value =
      store.currentObservation.component[1].valueQuantity.value;
  }
});

const options = computed(() => {
  return fhirData.BLOOD_PRESSURE.map((e) => {
    return e.id;
  });
});
const show = computed({
  get: () => props.visible,
  set: (value: any) => {
    if (!value) {
      emit('close');
    }
  },
});
const actionTypeLabel = computed(() =>
  props.actionType === 'edit' ? 'bearbeiten' : 'hinzufügen'
);

function onReset() {
  bodySite.value = '';
  systolicPressure.value = 120;
  diastolicPressure.value = 90;
}
async function updateObservation() {
  if (systolicPressure.value < diastolicPressure.value) {
    Notify.create({
      message:
        'Der Systolische Blutdruck sollte nicht tiefer als der Diastolische sein',
      color: 'red',
      position: 'top',
      icon: 'announcement',
    });
    return;
  } else if (props.actionType === 'edit') {
    await store.updateObservation(
      store.currentObservation.id,
      bodySite.value,
      [systolicPressure.value, diastolicPressure.value],
      ObservationType.BLOOD_PRESSURE
    );
  } else if (props.actionType == 'add') {
    await store.createObservation(
      ObservationStatus.PRELIMINARY,
      bodySite.value,
      [systolicPressure.value, diastolicPressure.value],
      ObservationType.BLOOD_PRESSURE
    );
  } else {
    throw new Error('No correct type found');
  }
  show.value = false;
}
</script>

<style lang="sass" scoped>
.fade
    background-image: linear-gradient(to bottom right, #087add, #32c6b6)
</style>
