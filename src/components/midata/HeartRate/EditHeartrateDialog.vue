<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Puls hinzufügen/bearbeiten</div>
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
            Schläge pro Minute: {{ heartRate }}
          </q-badge>

          <q-slider
            v-model="heartRate"
            :min="20"
            :max="200"
            :step="5"
            style="max-width: 90%"
          />
          <div>
            <q-btn
              label="Puls speichern"
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
import { ObservationStatus } from '@i4mi/fhir_r4';
import fhirData from 'src/data/fhirData.json';
import { ObservationType } from 'src/plugins/midataService';

export default defineComponent({
  name: 'EditHeartrateDialog',
  props: {
    visible: Boolean,
    actionType: String
  },
  data() {
    return {
      heartRate: 70,
      bodySite: '',
      options: fhirData.HEART_RATE.map(e => {
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
      this.heartRate = 70;
    },
    async updateObservation() {
      if (this.actionType == 'edit'){
        await this.$storage.updateObservation(
          this.$storage.getCurrentObservation().id,
          this.bodySite,
          [this.heartRate],
        ObservationType.HEART_RATE)
      }
      else if (this.actionType == 'add'){
        await this.$storage.createObservation(
          ObservationStatus.PRELIMINARY,
          this.bodySite,
          [this.heartRate],
          ObservationType.HEART_RATE
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
