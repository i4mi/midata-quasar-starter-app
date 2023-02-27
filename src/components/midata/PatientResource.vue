<template>
  <q-card v-if="visible">
    <q-card-section v-if="store.patientResource !== undefined">
      <q-card flat bordered>
        <q-card-section>
          <q-img src="../../assets/midata/demo/masks.png" height="200px">
          </q-img>

          <div class="text-h6">Steckbrief</div>
          <div class="text-subtitle">
            {{
              store.patientResource.name[0].given +
              ' ' +
              store.patientResource.name[0].family
            }}
          </div>
          <div class="text-body text-grey">
            {{ 'Geschlecht: ' + store.patientResource.gender }} <br />
            {{ 'Patienten id: ' + store.patientResource.id }} <br />
            {{ 'E-Mail: ' + store.patientResource.telecom[0].value }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-space></q-space>
          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="store.patientResourceExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="store.patientResourceExpanded = !store.patientResourceExpanded"
            class="gt-xs"
          >Vollständige Ressource anzeigen</q-btn
          >
          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="store.patientResourceExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="store.patientResourceExpanded = !store.patientResourceExpanded"
            class="lt-sm"
          ></q-btn>
        </q-card-actions>
        <q-slide-transition>
          <div v-show="store.patientResourceExpanded">
            <q-separator />
            <q-card-section
              class="innerCardScroll"
              clickable
              @click='store.copyToClipBoard
              (store.patientResource, "Patienten Resource")'>
              <highlightjs
                lang="json"
                :code="JSON.stringify(store.patientResource, null, 2)"
              ></highlightjs>
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>
import { useUserStore } from 'stores/user';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  }
})

const store = useUserStore()

</script>
<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
