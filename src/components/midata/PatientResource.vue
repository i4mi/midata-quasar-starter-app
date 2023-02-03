<template>
  <q-card v-if="flag">
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
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
            class="gt-xs"
          >Vollständige Ressource anzeigen</q-btn
          >
          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
            class="lt-sm"
          ></q-btn>
        </q-card-actions>
        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section
              class="innerCardScroll"
              clickable
              @click='storage.copyToClipBoard
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

import { ref } from 'vue';
import { storage } from 'boot/plugins';

defineProps(['flag', 'patientResource'])
const expanded = ref(false)

function isEmpty(obj: any) {
  return JSON.stringify(obj) === '{}';
}

</script>
<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
