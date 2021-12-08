<template>
  <q-page>
    <div class="text-h3 text-weight-thin">Quasar Framework</div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Was ist Quasar?</div>
      <p>
        Quasar Framework (allgemein als Quasar bezeichnet; ausgesprochen
        /ˈkweɪ.zɑːr/) ist ein auf Vue.JS basierendes Open-Source-Framework für
        die Erstellung von Apps mit einer einzigen Codebasis und deren
        Bereitstellung im Web als SPA, PWA, SSR, als mobile App mit Cordova für
        iOS und Android und als Desktop-App mit Electron für Mac, Windows und
        Linux.
      </p>
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Motto</div>
      <p>
        Das Motto von Quasar ist: Hochwertige VueJS-Benutzeroberflächen in
        Rekordzeit erstellen. Dies ist möglich, weil Sie nur eine einzige
        massgebliche Codequelle für alle Plattformen schreiben müssen: responsive
        Desktop-/Mobile-Websites (SPA, SSR + SPA-Clientübernahme, SSR +
        PWA-Clientübernahme), PWAs (Progressive Web Apps), mobile Apps (die
        nativ aussehen) und Multiplattform-Desktop-Apps (über Electron) sowie
        Browser-Erweiterungen.
      </p>
      <p>
        In Quasar gibt es eine Komponente für fast jeden Webentwicklungsbedarf.
        Quasar wurde mit Blick auf Leistung und Reaktionsfähigkeit entwickelt,
        daher ist der Overhead bei der Verwendung von Quasar kaum spürbar.
      </p>
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Features</div>
      <div class="text-h6">Komponenten</div>
      <p>
        Quasar-Anwendungen werden mit Vue und dem *.vue Single File Component
        System erstellt, das mehrere Abschnitte enthält: Template (HTML), Skript
        (Javascript) und Style (CSS/Stylus/SASS/SCSS/Less) - alles in derselben
        Datei. Das folgende Code-Snippet enthält ein Beispiel für eine
        Quasar-Komponente. Die Komponente stellt eine Login Card dar:
      </p>
      <highlightjs
        language="javascript"
        code="<template>
  <div class='container'>
    <q-card class='card'>
      <q-card-section>
        <div class='text-h4 text-weight-thin'>MIDATA Login</div>
        <div class='text-body1'>
          Damit sie MIDATA verwenden können, müssen Sie sich zuerst
          einloggen/registrieren.
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-actions>
        <q-btn
          flat
          @click='connect()'
          class='midata-fade full-width'
          color='white'
          >Mit MIDATA verbinden
          </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginCard',
  methods: {
    connect() {
      this.$midata.authenticate();
    },
  },
});
</script>

<style lang='sass' scoped>
.card
    max-width: 500px

.container
    display: flex
    justify-content: center
    margin-top: 50px
</style>
"
      />
    </div>

    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">QUASAR CLI Installation</div>
      <p>
        Stellen Sie sicher, dass Sie Node >=12.22.1 und NPM >=6.14.12 auf Ihrem
        Rechner installiert haben.
      </p>
      <highlightjs
        language="javascript"
        code="# Node.js >=12.22.1 is required.

$ yarn global add @quasar/cli
# or
$ npm install -g @quasar/cli"
      />

      <p>Dann erstellen wir einen Projektordner mit Quasar CLI:</p>

      <highlightjs
        language="javascript"
        code="## Quasar UI v2
$ quasar create <folder_name>"
      />

      <p>
        Beispiel für das Aufsetzten eines Projekts mit Typescript, Vue-i18n,
        ESlint, SASS etc.
      </p>
      <highlightjs
        language="javascript"
        code="$ sudo quasar create quasartestapp       

⠙  Downloading Quasar starter kit
? Project name (internal usage for dev) quasartestapp
? Project product name (must start with letter if building mobile apps) Quasar App
? Project description A Quasar Framework app
? Author ... ... <...@bfh.ch>
? Pick your CSS preprocessor: Sass
? Check the features needed for your project: ESLint (recommended), TypeScript, Vue-i18n
? Pick a component style: Composition
? Pick an ESLint preset: Prettier
? Continue to install project dependencies after the project has been created? (recommended) yarn

  Quasar CLI · Generated 'quasartestapp'."
      />

      <div class="q-my-xl">
        <div class="q-qb-sm text-h5">Offizielle Werkzeuge</div>
        <p>
          Quasar CLI setzt sich aus zwei Paketen zusammen: @quasar/cli und
          @quasar/app. Das erste Paket ist optional und ermöglicht es Ihnen nur,
          einen Projektordner zu erstellen und Quasar-Befehle global
          auszuführen. Das zweite Paket ist das Herzstück und wird in jedem
          Quasar-Projektordner installiert.
        </p>
        <p>
          Sobald ein Projektordner erstellt wurde, hilft Quasar CLI nur dabei,
          die Befehle von @quasar/app global auszuführen. Sie brauchen es zu
          diesem Zeitpunkt für nichts anderes. Um vollständige Unabhängigkeit
          von Quasar CLI zu gewährleisten, können Sie npm-Skripte (in Ihrer
          package.json) schreiben, um Quasar-Befehle auszuführen. Es ist
          @quasar/app (das für jedes Projekt spezifisch ist), das alle
          CLI-Befehle ausführen wird.
        </p>
        <p>
          Beispiel für das Hinzufügen einiger npm-Skripte in Ihre package.json:
        </p>

        <highlightjs
          language="json"
          code="// package.json
'scripts': {
  'dev': 'quasar dev',
  'build': 'quasar build',
  'build:pwa': 'quasar build -m pwa'
}"
        />

        <p>
          Auf diese Weise können Sie $ yarn dev oder $ yarn build ausführen,
          ohne ein global installiertes @quasar/cli zu benötigen, falls Sie dies
          wünschen.
        </p>
        <p>
          Alternativ können Sie auch npx verwenden, um Quasar-Befehle
          auszuführen, ohne dass ein global installiertes @quasar/cli
          erforderlich ist.
        </p>

        <highlightjs language="javascript" code="$ npx quasar dev" />
      </div>
    </div>

    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Globale Eigenschaften</div>
      <p>
        Ein häufiger Anwendungsfall für Quasar-Anwendungen ist es, Code
        auszuführen, bevor die Root-Vue-App-Instanz instanziiert wird, wie z.B.
        das Injizieren und Initialisieren von eigenen Abhängigkeiten (Beispiele:
        Vue-Komponenten, Bibliotheken...) oder einfach das Konfigurieren von
        Startup-Code der Anwendung.
      </p>
      <p>
        Mit Boot-Dateien ist es möglich, jede Ihrer Abhängigkeiten in
        eigenständige, leicht zu verwaltende Dateien aufzuteilen. Es ist auch
        trivial, jede der Boot-Dateien zu deaktivieren oder sogar
        kontextabhängig zu bestimmen, welche der Boot-Dateien durch die
        quasar.conf.js-Konfiguration in den Build gelangen.
      </p>
      <p>
        Im Verzeichnis (src/boot/) können Sie beispielsweise eine Boot-Datei
        plugins.ts erstellen. Für die MIDATA Demo wurden beispielsweise die
        Module (MidataService und Storage) sowie das npm Paket Moment.js als
        globale Properties deklariert. Dafür wurde eine Boot-Datei mit dem Namen
        plugins.ts erstellt.
      </p>
      <highlightjs
        language="javascript"
        code="// src/boot/plugins.ts
import { boot } from 'quasar/wrappers';

import Storage from 'src/plugins/storage';
import MidataService from 'src/plugins/midataService';
import moment from 'moment';

const midata = new MidataService();
const storage = new Storage(midata);


declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $midata: typeof midata;
    $storage: typeof storage;
    $moment: typeof moment;
  }
}

export default boot(({ app }) => {
  app.config.globalProperties.$midata = midata;
  app.config.globalProperties.$storage = storage;
  app.config.globalProperties.$moment = moment;

});

export { midata, storage, moment };
"
      >
      </highlightjs>
      <p>
        In der quasar.conf.js Datei muss das entsprechende Boot-Array mit dem
        String 'plugins' ergänzt werden. Dies referenziert beim Boot-Prozess die
        zuvor erstellte plugins.ts Datei. Wie sie am Beispiel unten sehen, sind
        nebst 'plugins' /src/boot/plugins.ts die weiteren Boot-Dateien 'i18n'
        /src/boot/i18n.ts und 'highlight' /src/boot/highlight.ts vorhanden.
      </p>
      <highlightjs
        language="javascript"
        code="// quasar.conf.js
module.exports = configure(function (ctx) {
  return {
    // ...
    boot: ['i18n', 'plugins', 'highlight'],
    // ...
      };
});
"
      ></highlightjs>
    </div>

    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">
        Dokumentation und weiterführende Informationen
      </div>
      <p>
        Es lohnt sich einen Blick in die offizielle Quasar CLI Dokumentation zu
        werfen.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://quasar.dev/quasar-cli#introduction'"
        label="Quasar CLI Dokumentation"
        color="primary"
        class="midata-fade text-white q-mb-lg"
        flat
      />
    </div>

    <div class="q-my-xl text-grey">Quelle: https://quasar.dev/quasar-cli</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Quasar',
});
</script>
