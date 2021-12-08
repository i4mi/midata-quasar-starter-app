<template>
  <q-page>
    <div class="q-mb-xl">
      <div class="text-h3 text-weight-thin">Einführung in MIDATA</div>
      <q-separator spaced class="midata-fade"></q-separator>
    </div>

    <div class="q-qb-sm text-h5">MIDATA auf einen Blick</div>

    <q-img
      src="../../assets/midata/introduction/MIDATA_Scheme_DE_opt.png"
      fit="contain"
      class="img-800"
    ></q-img>
    <p class="text-grey">Bildquelle: https://www.midata.coop/</p>

    <div class="q-qb-sm q-mt-xl text-h5">Mission</div>
    <p>
      MIDATA zeigt den Weg, wie Daten für das Gemeinwohl genutzt und
      gleichzeitig die Ansprüche der Bürgerinnen und Bürger auf Kontrolle über
      ihre personenbezogenen Daten gewahrt werden können.
    </p>
    <p>
      Das MIDATA-Modell ist ausgelegt auf internationale Anwendung: MIDATA
      Schweiz unterstützt die Gründung von nationalen/regionalen MIDATA
      Genossenschaften, die sich die Datenplattform-Infrastruktur teilen.
    </p>
    <p>
      Inhabende eines Datenkontos bei MIDATA können zur medizinischen Forschung
      und klinischen Studien aktiv beitragen, indem sie selektiven Zugriff auf
      ihre persönlichen Daten gewähren. Sie können Genossenschaftsmitglieder
      werden und als solche die Genossenschaft kontrollieren.
    </p>
    <div class="q-my-xl text-grey">Quelle: https://api-doc.midata.coop/</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MidataIntroduction',
});
</script>

<style lang="sass" scoped>
.img-800
  max-width: 800px
</style>
