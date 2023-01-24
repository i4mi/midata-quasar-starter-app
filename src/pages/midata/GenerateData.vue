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
      Im Moment haben sie <b>{{this.$storage.getObservations().length}}</b> Observationen
      in Midata gespeichert.
      {{model}}
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
      <q-date v-model="model" mask="YYYY-MM-DD HH:mm" color="blue" today-btn
              :options='dateOptions'/>
      <q-time v-model="model" format24h mask="YYYY-MM-DD HH:mm" color="blue"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { Notify, Loading } from 'quasar';
import LoginCard from 'components/LoginCard.vue';

export default defineComponent({
  name: 'RandomData',
  components: { LoginCard },
  data() {
    return {
      loading: false,
      model: ''
    };
  },
  computed: {},
  methods: {
    updateRandomData(){
      if (this.model.length !== 0){
        Loading.show({
          message: '48 Observationen werden erstellt...'
        })
        this.$midata.generateRandomData(this.model).then(() => {
          Loading.hide()
        })
      }
      else {
          Notify.create({
            message: 'Bitte das Datum und die Uhrzeit auswählen',
            color: 'red',
            position: 'top',
            icon: 'announcement'
          });
      }
    },
    dateOptions (date) {
      return date <= this.$moment().format('YYYY/MM/DD')
    }
  },
});
</script>

<style scoped>

</style>
