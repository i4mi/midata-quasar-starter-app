<template>
  <div class="container">
    <q-card class="card">
      <q-card-section>
        <div class="text-h4 text-weight-thin">MIDATA Login</div>
        <div class="text-body1">
          Damit sie MIDATA verwenden können, müssen Sie sich zuerst
          einloggen/registrieren.
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions>
        <q-btn
          flat
          @click="connect()"
          class="midata-fade full-width"
          color="white"
          >Mit MIDATA verbinden</q-btn
        >
      </q-card-actions>
    </q-card>
    <q-card class="card">
      <q-card-section>
        <div class="text-h4 text-weight-thin">EPD Login</div>
        <div class="text-body1">
          Damit sie EPD verwenden können, müssen Sie sich zuerst einloggen.
        </div>

      </q-card-section>
      <q-separator inset />
      <q-card-actions>
        <q-btn
          @click="connectEPD"
          :disabled="connectedEpd == true"
          flat
          class="epd-fade full-width"
          color="white"
        > {{labelEPD}}</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { connected } from 'process';
import { defineComponent } from 'vue';

export default defineComponent({
  data: function () {
    return {
      connectedEpd: false, labelEPD: 'Mit dem EPD verbinden',
    }
  },
  name: 'LoginCard',

  methods: {
    connect() {
      this.$midata.authenticate();
    },
    connectEPD: function() {
      this.connectedEpd = true;
      this.labelEPD = 'Sie sind mit EPD verbunden';
      return this.labelEPD;
    },
  },
});
</script>

<style lang="sass" scoped>
.card
  max-width: 500px

.container
  display: flex
  justify-content: center
  margin-top: 50px
</style>
