<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Observation bearbeiten</div>
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
import { defineComponent, ref } from 'vue';
import bodySites from '../data/bodySites.json';

export default defineComponent({
  name: 'EditObservationDialog',
  props: ['visible'],
  setup() {
    const bodySite = ref('');
    const bodyTemperature = ref(36.8);
    return {
      bodySite,
      options: bodySites.bodySites,
      bodyTemperature,
      onReset() {
        bodySite.value = '';
        bodyTemperature.value = 36.8;
      },
    };
  },
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
        this.bodySite,
        this.bodyTemperature
      );
      this.show = false
    },
  },
});
</script>

<style lang="sass" scoped>
.fade
    background-image: linear-gradient(to bottom right, #087add, #32c6b6)
</style>
