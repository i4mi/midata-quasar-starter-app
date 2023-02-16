<template>
  <q-card v-if="visible">
    <q-card-section v-if="!isEmpty(patientResource)">
      <q-card flat bordered>
        <q-card-section>
          <q-img src="../../assets/midata/demo/masks.png" height="200px">
          </q-img>

          <div class="text-h6">Steckbrief</div>
          <div class="text-subtitle">
            {{
              patientResource.name[0].given +
              ' ' +
              patientResource.name[0].family
            }}
          </div>
          <div class="text-body text-grey">
            {{ 'Geschlecht: ' + patientResource.gender }} <br />
            {{ 'Patienten id: ' + patientResource.id }} <br />
            {{ 'E-Mail: ' + patientResource.telecom[0].value }}
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
              (patientResource, "Patienten Resource")'>
              <highlightjs
                lang="json"
                :code="JSON.stringify(patientResource, null, 2)"
              ></highlightjs>
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup lang='ts'>

import { PropType } from 'vue';
import { Patient } from '@i4mi/fhir_r4';
import { useUserStore } from 'stores/user';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  patientResource: {
    type: Object as PropType<Patient>,
    required: false
  }
})

const store = useUserStore()

function isEmpty(obj: any) {
  return JSON.stringify(obj) === '{}';
}

</script>
<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
