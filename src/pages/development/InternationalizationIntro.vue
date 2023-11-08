<template>
  <q-page>
    <div class="text-h3 text-weight-thin">
      Internationalisierung mit Vue-i18n und der Javascript Internationalization
      API (Intl)
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Was ist Internationalisierung?</div>
      <p>
        Internationalisierung ist ein Designprozess, der sicherstellt, dass ein
        Produkt (eine Website oder eine Anwendung) an verschiedene Sprachen und
        Regionen angepasst werden kann, ohne dass technische Änderungen am
        Quellcode erforderlich sind. Betrachten Sie die Internationalisierung
        als Vorbereitung für die Lokalisierung.
      </p>
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Vue-i18n Beschreibung</div>
      <p>
        Vue i18n ist das Internationalisierungs-Plugin von Vue.js. Es integriert
        einfach einige Lokalisierungsfunktionen in Ihre Vue.js Anwendung.
      </p>
      <div class="q-qb-sm text-h5">Installation</div>
      <p>
        Wenn Sie es versäumt haben, i18n während des
        Quasar-Erstellungsassistenten zu aktivieren, können Sie es auch manuell
        einrichten.
      </p>
      <highlightjs
        language="javascript"
        code="$ yarn add vue-i18n@next
oder
$ npm install vue-i18n@next"
      />
      <p>Erstellen Sie eine Datei src/boot/i18n.js mit folgendem Inhalt:</p>
      <highlightjs
        language="javascript"
        code="import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

// Import messages
import messages from 'src/i18n';

export default boot(({ app }) => {
  // Create i18n instance with options
  const i18n = createI18n({
    locale: 'de-ch',
    legacy: false,
    messages,
  });
  // Set i18n instance on app
  app.use(i18n);
});
"
      ></highlightjs>
      <p>
        Erstellen Sie in Ihrer Anwendung einen Ordner (/src/i18n/), der die
        Definitionen für jede von Ihnen unterstützte Sprache enthält. Beispiel:
        src/i18n. Beachten Sie den Hinweis "import messages from 'src/i18n'" aus
        Schritt 2. In diesem Schritt schreiben Sie den Inhalt, der importiert
        wird.
      </p>
      <p>
        Verweisen Sie nun auf diese Datei in quasar.config.js im Abschnitt boot:
      </p>
      <p>Jetzt können Sie sie in Ihren Seiten verwenden.</p>

      <highlightjs
        language="javascript"
        code="// quasar.conf.js
return {
  boot: [
    // ...
    'i18n'
  ],
  // ...
}"
      ></highlightjs>
    </div>

    <q-separator spaced class="midata-fade"></q-separator>
    <q-btn-dropdown
      class="q-mt-lg midata-fade text-white"
      :label="i18n.t('lang.option')"
      icon="language"
    >
      <q-list>
        <q-item clickable v-close-popup @click="store.changeLanguage('de-ch')">
          <q-item-section>
            <q-item-label>{{ i18n.t('lang.de') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="store.changeLanguage('fr-ch')">
          <q-item-section>
            <q-item-label>{{ i18n.t('lang.fr') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="store.changeLanguage('en-gb')">
          <q-item-section>
            <q-item-label>{{ i18n.t('lang.en') }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <div class="q-my-sm">
      <div class="q-mb-md text-h6">Beispiel 1:</div>

      <q-card style="max-width: 500px">
        <q-img src="../../assets/internationalization/matterhorn.png">
          <q-icon
            class="absolute all-pointer-events"
            size="30px"
            name="info"
            color="white"
            style="top: 8px; right: 8px"
          >
            <q-tooltip>
              {{ i18n.t('card.info') }}
            </q-tooltip>
          </q-icon>
        </q-img>
        <q-card-section>
          <div class="text-h6">{{ i18n.t('card.title') }}</div>
          <div class="text-subtitle2">{{ i18n.t('card.subTitle') }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ i18n.t('card.text') }}
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn
            type="a"
            target="_blank"
            :href="'https://www.zermatt.ch/matterhorn'"
            :label="i18n.t('card.more')"
            color="primary"
            flat
          />
        </q-card-actions>
      </q-card>
    </div>

    <div class="q-my-sm" style="max-width: 500px">
      <div class="q-mb-md text-h6">Beispiel 2 (Interpolation):</div>
      <q-select
        filled
        v-model="model"
        :options="options"
        :label="i18n.t('interpolation.label')"
        :display-value="`${
          model.label ? i18n.t('interpolation.weather.' + model.label) : ''
        }`"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{
                i18n.t('interpolation.weather.' + scope.opt.label)
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="text-subtitle">
        {{
          i18n.t('interpolation.message', {
            condition: i18n.t('interpolation.weather.' + model.label),
          })
        }}
      </div>
    </div>

    <div class="q-my-sm q-mb-md" style="max-width: 500px">
      <div class="q-mb-md text-h6">
        Beispiel 3 (Interpolation für Fehlertexte):
      </div>
      <q-input
        filled
        type="number"
        v-model="rrziel3"
        :label="i18n.t('interpolation.artBD.label')"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || i18n.t('interpolation.artBD.empty'),
          ,
          (val) =>
            (val >= 30 && val <= 120) ||
            i18n.t('interpolation.artBD.error', { value: val }),
        ]"
      />
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">
        Lokalisation mit der Javascript Internationalization API (Intl)
      </div>
      <p>
        Javascript besitzt eine eingebaute API, mit der man zum Beispiel
        Datum-Objekte in verschiedenen Sprachen anzeigen kann. Um ein Datum in
        verschiedenen Sprachen anzeigen zu können, kann man Statische Funktionen
        des Intl Objekts zugreifen. Intl kann noch mehr als ein Datum anzeigen,
        mehr dazu finden sie in der Intl-Dokumentation und unten in den
        Beispielen.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl'"
        label="Javascript Internationalization API Dokumentation"
        color="primary"
        class="midata-fade text-white"
        flat
      />

      <div class="q-my-md">
        <div class="q-mb-md text-h6">Beispiel:</div>

        <q-btn-dropdown
          class="midata-fade text-white"
          label="Datums- und Zeitformat"
          icon="today"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="store.changeLanguage('de-ch')"
            >
              <q-item-section>
                <q-item-label>Deutsch (Schweiz)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="store.changeLanguage('fr-ch')"
            >
              <q-item-section>
                <q-item-label>Französisch (Schweiz)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              @click="store.changeLanguage('en-gb')"
            >
              <q-item-section>
                <q-item-label>Englisch (United Kingdom)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <p>
        Ausgewählte Sprache <b>({{ i18n.locale }})</b>:
      </p>
      <div
        style="overflow-x: scroll; background-color: #f6f6f6"
        class="q-px-sm"
      >
        <b>Daten</b>
        <pre><b>{{ store.currentLanguage }}</b>    // store.currentLanguage</pre>
        <pre><b>{{ new Intl.DateTimeFormat(store.currentLanguage, {hour: 'numeric', minute: 'numeric'}).format(new Date) }}</b>    // new Intl.DateTimeFormat(store.currentLanguage, {hour: 'numeric', minute: 'numeric'}).format(new Date)</pre>
        <pre><b>{{ new Intl.DateTimeFormat(store.currentLanguage, {hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(new Date) }}</b>   // new Intl.DateTimeFormat(store.currentLanguage, {hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(new Date)</pre>
        <pre><b>{{ new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date) }}</b>   // new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date)</pre>
        <pre><b>{{ new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date) }}</b>    // new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date)</pre>
        <pre><b>{{ new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date) }}</b>    // new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date)</pre>
        <pre><b>{{ new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date) }}</b>   // new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', weekday: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date)</pre>
        <pre><b>{{ new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', weekday: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date) }}</b> // new Intl.DateTimeFormat(store.currentLanguage, {year: 'numeric', month: 'long', weekday: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(new Date)</pre>
        <b>Relative Daten</b>
        <pre><b>{{ new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long' }).format(-32,'minutes') }}</b>    // new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long'' }).format(32, 'minutes')</pre>
        <pre><b>{{ new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long' }).format(16, 'days') }}</b>    // new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long' }).format(16, 'days')</pre>
        <pre><b>{{ new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long' }).format(-4, 'months') }}</b>    // new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long' }).format(4, 'months')</pre>
        <pre><b>{{ new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long' }).format(1, 'years') }}</b>    // new Intl.RelativeTimeFormat(store.currentLanguage, { style: 'long' }).format(1, 'years')</pre>
        <b>Zahlen und Währungen</b>
        <pre><b>{{ new Intl.NumberFormat(store.currentLanguage, { style: 'currency', currency: 'EUR' }).format(123456.789) }}</b></pre>
        <pre><b>{{ new Intl.NumberFormat(store.currentLanguage, { style: 'currency', currency: 'JPY' }).format(123456.789) }}</b></pre>
        <pre><b>{{ new Intl.NumberFormat(store.currentLanguage, { style: 'currency', currency: 'USD' }).format(123456.789) }}</b></pre>
        <pre><b>{{ new Intl.NumberFormat(store.currentLanguage, { style: "unit", unit: 'kilometer-per-hour', unitDisplay: 'long'}).format(32) }}</b></pre>
        <pre><b>{{ new Intl.NumberFormat(store.currentLanguage, { style: "unit", unit: 'liter', unitDisplay: 'long'}).format(1.5) }}</b></pre>
      </div>
    </div>
    <div class="q-my-xl text-grey">
      Quellen:
      <ul>
        <li>https://kazupon.github.io/vue-i18n/</li>
        <li>
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'stores/user';

const i18n = useI18n();
const store = useUserStore();

const rrziel3 = ref(null);
const model = ref({ label: 'sun' });
const options = [
  { label: 'sun' },
  { label: 'cloud' },
  { label: 'rain' },
  { label: 'storm' },
  { label: 'mist' },
];
</script>
