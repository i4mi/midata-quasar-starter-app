<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Blutdruck hinzufügen/bearbeiten</div>
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

<script lang="ts">
import { defineComponent } from 'vue';
import fhirData from '../../../data/fhirData.json'
import { ObservationStatus } from '@i4mi/fhir_r4';
import { ObservationType } from 'src/plugins/midataService';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'EditBloodPressureDialog',
  props: {
    visible: Boolean,
    actionType: String
  },
  data() {
    return {
      systolicPressure: 120,
      diastolicPressure: 90,
      bodySite: '',
      options: fhirData.BLOOD_PRESSURE.map(e => {
        return e.id
      })
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
      this.systolicPressure = 120;
      this.diastolicPressure = 90;
    },
    async updateObservation() {

      if (this.systolicPressure < this.diastolicPressure){
        Notify.create({
          message: 'Der Systolische Blutdruck sollte nicht tiefer als der Diastolische sein',
          color: 'red',
          position: 'top',
          icon: 'announcement',
        });
        return;
      }
      else if (this.actionType == 'edit'){
        await this.$storage.updateObservation(
          this.$storage.getCurrentObservation().id,
          this.bodySite,
          [this.systolicPressure, this.diastolicPressure],
        ObservationType.BLOOD_PRESSURE)
      }
      else if (this.actionType == 'add'){
        await this.$storage.createObservation(
          ObservationStatus.PRELIMINARY,
          this.bodySite,
          [this.systolicPressure, this.diastolicPressure],
          ObservationType.BLOOD_PRESSURE
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
