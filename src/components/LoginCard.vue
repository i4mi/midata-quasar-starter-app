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
  </div>
</template>

<script setup lang="ts">
import { midata } from 'boot/plugins';

function connect() {
  midata.authenticate();
}
</script>

<style lang="sass" scoped>
.card
    max-width: 500px

.container
    display: flex
    justify-content: center
    margin-top: 50px
</style>
