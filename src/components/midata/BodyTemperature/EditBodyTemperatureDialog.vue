<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Körpertemperatur hinzufügen/bearbeiten</div>
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
            Körpertemperatur: {{ bodyTemperature }} °C
          </q-badge>

          <q-slider
            v-model="bodyTemperature"
            :min="34"
            :max="42"
            :step="0.1"
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

<script lang="ts">
import { defineComponent } from 'vue';
import fhirData from '../../../data/fhirData.json'
import { ObservationStatus } from '@i4mi/fhir_r4';
import { ObservationType } from 'src/plugins/midataService';

export default defineComponent({
  name: 'EditBodyTemperatureDialog',
  props: {
    visible: Boolean,
    actionType: String
  },
  data() {
    return {
      bodyTemperature: 36.8,
      bodySite: '',
      options: fhirData.BODY_TEMPERATURE.map(e => {
        return e.id
      }),
    };
  },
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
    onReset() {
      this.bodySite = '';
      this.bodyTemperature = 36.8;
    },
    async updateObservation() {
      if (this.actionType == 'edit'){
        await this.$storage.updateObservation(
          this.$storage.getCurrentObservation().id,
          this.bodySite,
          [this.bodyTemperature],
        ObservationType.BODY_TEMPERATURE)
      }
      else if (this.actionType == 'add'){
        await this.$storage.createObservation(
          ObservationStatus.PRELIMINARY,
          this.bodySite,
          [this.bodyTemperature],
          ObservationType.BODY_TEMPERATURE
        );
      }
      else {
        throw new Error('No correct type found')
      }
      this.show = false
    },
  },
});
</script>

<style lang="sass" scoped>
.fade
    background-image: linear-gradient(to bottom right, #087add, #32c6b6)
</style>
