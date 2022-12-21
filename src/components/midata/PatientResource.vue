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
        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="innerCardScroll" clickable @click='copyToClipBoard(patientResource, "Patienten Resource")'>
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

<script lang='ts'>

import { defineComponent } from 'vue';
import { copyToClipboard, Notify } from 'quasar';

export default defineComponent({

  name: 'PatientResource',
  props: ['flag', 'patientResource', 'expanded'],
  methods: {
    copyToClipBoard(item: any, identifier = 'Resource') {
      copyToClipboard(JSON.stringify(item, null, 2))
        .then(() => {
          Notify.create({
            message: `${identifier} kopiert`,
            color: 'green',
            position: 'top',
            icon: 'announcement',
          })
        }).catch(() => {
      Notify.create({
        message: `Kopieren von ${identifier} fehlgeschlagen`,
        color: 'red',
        position: 'top',
        icon: 'announcement',
      })
    })
    },
    isEmpty(obj: any) {
      return JSON.stringify(obj) === '{}';
    }
  }
});

</script>
<style scoped>
</style>
