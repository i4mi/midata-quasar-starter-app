<template>
  <q-page>
    <div class="text-h3 text-weight-thin">
      Internationalisierung mit Vue-i18n und Moment.js
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
        Vue I18n ist das Internationalisierungs-Plugin von Vue.js. Es integriert
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
import messages from 'src/i18n';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'de',
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
        language="javscript"
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
      :label="$t('lang.option')"
      icon="language"
    >
      <q-list>
        <q-item clickable v-close-popup @click="changeLanguage('de')">
          <q-item-section>
            <q-item-label>{{ $t('lang.de') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="changeLanguage('fr')">
          <q-item-section>
            <q-item-label>{{ $t('lang.fr') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="changeLanguage('en')">
          <q-item-section>
            <q-item-label>{{ $t('lang.en') }}</q-item-label>
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
              {{ $t('card.info') }}
            </q-tooltip>
          </q-icon>
        </q-img>
        <q-card-section>
          <div class="text-h6">{{ $t('card.title') }}</div>
          <div class="text-subtitle2">{{ $t('card.subTitle') }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ $t('card.text') }}
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn
            type="a"
            target="_blank"
            :href="'https://www.zermatt.ch/matterhorn'"
            :label="$t('card.more')"
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
        :label="$t('interpolation.label')"
        :display-value="`${
          model.label ? $t('interpolation.weather.' + model.label) : ''
        }`"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{
                $t('interpolation.weather.' + scope.opt.label)
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <div class="text-subtitle">
        {{
          $t('interpolation.message', {
            condition: $t('interpolation.weather.' + model.label),
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
        :label="$t('interpolation.artBD.label')"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || $t('interpolation.artBD.empty'),
          ,
          (val) =>
            (val >= 30 && val <= 120) ||
            $t('interpolation.artBD.error', { value: val }),
        ]"
      />
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Lokalisation mit Moment.js</div>
      <p>
        Das npm Paket moment.js macht ortsspezifische Datums- und Zeitformate
        verfügbar.
      </p>

      <div class="q-qb-sm text-h5">Installation</div>
      <highlightjs
        language="javascript"
        code="$ yarn add moment
oder
$ npm install moment"
      />

      <div class="q-my-md">
        <div class="q-mb-md text-h6">Beispiel:</div>

        <q-btn-dropdown
          class="midata-fade text-white"
          label="Datums- und Zeitformat"
          icon="today"
        >
          <q-list>
            <q-item clickable v-close-popup @click="changeLocale('de-ch')">
              <q-item-section>
                <q-item-label>Deutsch (Schweiz)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="changeLocale('fr-ch')">
              <q-item-section>
                <q-item-label>Französisch (Schweiz)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="changeLocale('it-ch')">
              <q-item-section>
                <q-item-label>Italienisch (Schweiz)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="changeLocale('en-gb')">
              <q-item-section>
                <q-item-label>Englisch (United Kingdom)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <p>
        Ausgewählte Sprache <b>({{ locale }})</b>:
      </p>
      <div
        style="overflow-x: scroll; background-color: #f6f6f6"
        class="q-px-sm"
      >
        <pre>moment.locale()          // {{ $moment.locale() }}</pre>
        <pre>moment().format('LT')    // {{ $moment().format('LT') }}</pre>
        <pre>moment().format('LTS')   // {{ $moment().format('LTS') }}</pre>
        <pre>moment().format('L')     // {{ $moment().format('L') }}</pre>
        <pre>moment().format('l')     // {{ $moment().format('l') }}</pre>
        <pre>moment().format('LL')    // {{ $moment().format('LL') }}</pre>
        <pre>moment().format('ll')    // {{ $moment().format('ll') }}</pre>
        <pre>moment().format('LLL')   // {{ $moment().format('LLL') }}</pre>
        <pre>moment().format('lll')   // {{ $moment().format('lll') }}</pre>
        <pre>moment().format('LLLL')  // {{ $moment().format('LLLL') }}</pre>
        <pre>moment().format('llll')  // {{ $moment().format('llll') }}</pre>
      </div>
    </div>
    <div class="q-my-xl text-grey">
      Quellen:
      <ul>
        <li>https://kazupon.github.io/vue-i18n/</li>

        <li>https://momentjs.com/</li>
      </ul>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Internationalization',
  setup() {
    return {
      rrziel3: ref(null),
      model: ref({ label: 'sun' }),
      locale: ref('de-ch'),
      options: [
        { label: 'sun' },
        { label: 'cloud' },
        { label: 'rain' },
        { label: 'storm' },
        { label: 'mist' },
      ],
    };
  },
  methods: {
    changeLanguage(value: string) {
      if (this.$i18n.availableLocales.includes(value)) {
        this.$i18n.locale = value;
        this.$storage.setCurrentLanguage(value)
      }
    },
    changeLocale(value: string) {
      this.$moment.locale(value);
      this.locale = value;
    },
  },
});
</script>
