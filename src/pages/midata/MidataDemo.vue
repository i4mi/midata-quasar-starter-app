<template>
  <login-card v-if="!$midata.isLoggedIn()"></login-card>
  <q-page v-if="$midata.isLoggedIn()">
    <div class="q-mb-xl">
      <div class="text-h3 text-weight-thin">Midata Demo</div>
      <q-separator spaced class="midata-fade"></q-separator>
    </div>

    <div class="row justify-end">
      <q-btn
        @click="flag = true;"
        flat
        text-color="white"
        class="gt-xs midata-fade"
      >
        <q-icon left name="person"></q-icon>
        Patientenresource von MIDATA abfragen
      </q-btn>
      <q-btn
        @click="flag = true;"
        flat
        icon="person"
        text-color="white"
        class="lt-sm midata-fade"
        label="Patienten Ressource abfragen"
      >
      </q-btn>
      <q-space />
      <q-btn
        color="black"
        label="Logout"
        icon="logout"
        rounded
        outline
        @click="logout()"
        class="gt-xs"
      />
      <q-btn
        color="black"
        icon="logout"
        round
        outline
        @click="logout()"
        class="lt-sm"
      />
    </div>
    <div style="height: 25px"></div>

    <PatientResource :visible='flag'></PatientResource>

    <div style="height: 25px" />
    <q-tabs
      narrow-indicator
      dense
      align="justify"
      class="text-primary"
    >
      <q-route-tab
        icon="monitor_heart"
        to="/midata/demo/heartrate"
        label='Heart Rate'
        exact
      />
      <q-route-tab
        icon="thermostat"
        to="/midata/demo/bodytemperature"
        label='Body Temperature'
        exact
      />
      <q-route-tab
        icon="bloodtype"
        to="/midata/demo/bloodpressure"
        label='Blood Pressure'
        exact
      />
    </q-tabs>
    <div style="height: 25px" />

    <RouterView/>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginCard from '../../components/LoginCard.vue';
import PatientResource from 'components/midata/PatientResource.vue';
import { midata } from 'boot/plugins';
import { useUserStore } from 'stores/user';

const flag = ref(false)
const store = useUserStore()

function logout() {
  flag.value = false;
  midata.logout();
  store.deleteDataInStore();
  location.reload();
}
</script>

<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
