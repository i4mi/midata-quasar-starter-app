<template>

  <login-card v-if="!$midata.isLoggedIn()"></login-card>
  <q-page v-if="$midata.isLoggedIn()">

    <div class="q-mb-xl">
      <div class="text-h3 text-weight-thin">Daten generieren lassen</div>
      <q-separator spaced class="midata-fade"></q-separator>
    </div>
    <p>
      Um einen ersten Überblick über die Möglichkeiten von Midata zu erhalten,
      können sie hier ein paar Daten generieren lassen. Diese folgen einem Trend,
      sind aber sonst zufällig generiert. Vom ausgewählten Datum an, werden 48
      zufällige Observationen generiert. Das Aktualisieren der Daten kann manchmal
      einige Sekunden länger dauern als angezeigt.
    </p>
    <p>
      Im Moment haben sie <b>{{store.observations.length}}</b> Observationen
      in Midata gespeichert.
    </p>
    <q-btn
      @click="updateRandomData"
      flat
      text-color="white"
      class="q-mb-sm midata-fade"
    >
      <q-icon left name="description"></q-icon>
      Daten generieren
    </q-btn>
    <div class="q-gutter-md row items-start">
      <q-date v-model="date" mask="YYYY-MM-DDTHH:mm:ss.sssZ" color="blue" today-btn
              :options='dateOptions'/>
      <q-time v-model="date" format24h mask="YYYY-MM-DDTHH:mm:ss.sssZ" color="blue"/>
    </div>
  </q-page>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { Loading, Notify } from 'quasar';
import LoginCard from 'components/LoginCard.vue';
import { midata } from 'boot/plugins';
import { useUserStore } from 'stores/user';

const date = ref('')
const store = useUserStore()

async function updateRandomData() {
  if (date.value.length !== 0){
    Loading.show({
      message: '48 Observationen werden erstellt...'
    })
    await midata.generateRandomData(date.value)
    Loading.hide()
  }
  else {
    Notify.create({
      message: 'Bitte wählen sie das Datum und die Uhrzeit aus',
      color: 'red',
      position: 'top',
      icon: 'announcement'
    });
  }
}

function dateOptions (date: string) {
  return date <= new Date()
    .toISOString().split('T')[0]
    .replace(new RegExp('-', 'g'), '/')
}

</script>

<style scoped>

</style>
