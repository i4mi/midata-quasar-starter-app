<template>
  <q-page>
    <div class="text-h3 text-weight-thin">State Management mit Pinia</div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Was ist State management?</div>
      <p>
        State management beschreibt das Verwalten des Zustands eines oder mehreren User-Interfaces (UI) einer Applikation.
        Eine moderne Web-Applikation sollte auf Veränderungen der Daten und Input des Users reagieren und diese Anzeigen können.
        Dabei sollten Veränderungen von irgendeiner Komponente oder Page in allen anderen Teilen der Applikation auch
        angezeigt werden, falls abhängigkeiten existieren. Bei komplexen Projekten mit vielen Pages und Komponenten
        kann State management sehr aufwändig werden. Pinia ist ein State managament Tool, dass diesen Prozess vereinfachen kann.
      </p>
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Was ist Pinia?</div>
      <p>
        Pinia ist ein vom Vue core team entwickelte State management tool. Es ermöglicht das Teilen von einem gemeinsamen
        state über alle Pages und Komponenten einer Applikation. Pinia funktioniert am besten mit Vue3 und der
        Composition-API (diese Applikation wurde ebenfalls damit entwickelt). Pinia kann aber auch mit Vue2 und der
        Options-API funktionieren. Mit Pinia kann man sogenannte "stores" erstellen, die dann thematisch zusammenhängenden
        State beinhalten. Man könnte auch den gesamten state in einem store verwalten, aber bei grösseren Projekten
        liegt es nahe, diesen aufzuteilen. Diese stores können in den Komponenten und Pages genutzt werden. Alle Veränderungen
        dieses stores, werden automatisch in allen anderen Komponenten angezeigt. Wie genau Pinia funktioniert wird
        in der Dokumentation von Pinia erklärt:
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://pinia.vuejs.org/'"
        label="Pinia Dokumentation"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Pinia in dieser Applikation</div>
      <p>
        Pinia wird in dieser Applikation genutzt, um den Zustand rund um die Midata Demo zu verwalten. Alle Observationen
        und die Patienten-Ressource von Midata sind in einem Pinia store gespeichert und werden dort verwaltet.
        Auch Präferenzen des Nutzers wie die ausgewählte Sprache <a href="#/internationalization">
        (Internationalization Seite)</a> und ob die kompletten Observationen sichtbar sein sollten oder nicht,
        werden in dem Pinia store verwaltet. Egal wo auf der Applikation diese Daten angepasst werden, die Veränderungen
        werden unten zu sehen sein.
      </p>
      <q-card
        style="background-color: #eeeeee">
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="left"
          class="text-primary"
        >
          <q-tab name="demo" label="Demo" />
          <q-tab name="code" label="Code" />
        </q-tabs>
        <div v-if='tab === "demo"'
          style="overflow-x: scroll; background-color: #f6f6f6; overflow-y: scroll; height: 300px"
          class="q-px-sm"
        >
          <pre>Ausgewählte Sprache: <b>{{ store.currentLanguage }}</b></pre>
          <pre>Observationen-Filter: <b>{{ store.currentFilter }}</b></pre>
          <pre>Komplette Observationen-Ressource anzeigen: <b>{{ store.observationsExpanded }}</b></pre>
          <pre>Nummer der Observationen: <b>{{ store.numberOfObservations }}</b></pre>
          <pre>Komplette Patienten-Ressource anzeigen: <b>{{ store.patientResourceExpanded }}</b></pre>
          <pre>Patienten-Ressource <b>{{ store.patientResource }}</b></pre>
        </div>
        <highlightjs v-else
          language="javascript"
          code="<template>
<pre>Ausgewählte Sprache: <b>{{ store.currentLanguage }}</b></pre>
<pre>Observationen-Filter: <b>{{ store.currentFilter }}</b></pre>
<pre>Komplette Observationen-Ressource anzeigen: <b>{{ store.observationsExpanded }}</b></pre>
<pre>Nummer der Observationen: <b>{{ store.numberOfObservations }}</b></pre>
<pre>Komplette Patienten-Ressource anzeigen: <b>{{ store.patientResourceExpanded }}</b></pre>
<pre>Patienten-Ressource <b>{{ store.patientResource }}</b></pre>
</template>

<script>
import { useUserStore } from 'stores/user';
const store = useUserStore()
</script>"
        />
      </q-card>

    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Quasar und Pinia</div>
      <p>
        Man kann einen Pinia auch manuell konfigurieren und einen store erstellen. Quasar bietet aber eine einfache
        Möglichkeit einen neuen store zu erstellen. Dabei werden auch gerade alle benötigten Ordner und Dateien erstellt.
        In dieser Applikation wird TypeScript (TS) verwendet, deshalb wird das hier spezifiziert. Es kann aber auch
        weggelassen werden, um nur mit Javascript einen store zu erstellen.
      </p>
      <highlightjs
        language="javascript"
        code="$ quasar new store <store_name> --format ts"
      />
      <p>
        Die Ordnerstruktur sieht wie folgt aus:
      </p>
      <q-tree
        :nodes="simple"
        node-key="label"
        default-expand-all>
        <template v-slot:default-header="prop">
          <div class='text-weight-bold'>
            {{prop.node.label}}
          </div>
          <div class='text-weight-thin'>
            &ensp;{{prop.node.description}}
          </div>
        </template>
      </q-tree>
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Vue Devtools</div>
      <p>
        Vue Devtools ist eine Browser-Erweiterung für Chromium und Firefox, die den Debugging Prozess um einiges
        vereinfacht. Sie zeigt an falls eine Website mit Vue programmiert ist oder nicht und fügt ein neues Fenster
        im Entwickler-Menu des Browsers hinzu. Die einzelnen Vue-Komponenten, die Navigations-routen wie noch vieles
        mehr werden angezeigt. Besonders praktisch ist Vue Devtools in Zusammenarbeit mit Pinia und i18n. Bei Pinia
        wird der gesamte State angezeigt und man kann ihn interaktiv verändern. Bei i18n werden Informationen zur lokalen
        Implementierung angezeigt.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://devtools.vuejs.org/'"
        label="Vue Devtools herunterladen"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>
    <q-img
      src="../../assets/development-basics/Vue_Devtools.png"
      fit="contain"
      class="img-800"
    ></q-img>
    <p class="text-grey">Vue Devtool mit der Pinia Integration</p>

    <div class="q-my-xl text-grey">
      Quellen:
      <ul>
        <li>https://pinia.vuejs.org/</li>
        <li>https://quasar.dev/quasar-cli-vite/state-management-with-pinia</li>
      </ul>
    </div>
  </q-page>
</template>

<script setup>

import { useUserStore } from 'stores/user';
import { ref } from 'vue';

const tab = ref('demo')
const store = useUserStore()

const simple = [
  {
    label: 'src/',
    description: '~ Root-Ordner',
    children: [
      {
        label: 'stores/',
        description: '~ Stores-Ordner',
        children: [
          {
            label: 'index.ts',
            description: '~ Hier geschieht die Initialisierung',
          },
          {
            label: '<store>.ts',
            description: '~ Pinia store',
          },
          {
            label: '<store>.ts',
            description: '~ Pinia store',
          }
        ]
      },
    ]
  }
]

</script>

<style scoped>

</style>
