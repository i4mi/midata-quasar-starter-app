<template>
  <q-page>
    <div class="text-h3 text-weight-thin">Basics</div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Node.js</div>
      <div class="text-h6">Was ist Node.js</div>
      <p>
        Node.js ist eine serverseitige, eventbasierte
        JavaScript-Laufzeitumgebung, die von Entwickler Ryan Dahl als Anwendung
        für die Entwicklung von skalierbaren Netzwerkanwendungen konzipiert
        wurde. Seit der Einführung im Jahr 2009 hat Node.js immer mehr an
        Bekanntheit gewonnen und gehört mittlerweile zu den gefragtesten
        Anwendungs-Frameworks in der Programmierung.
      </p>
      <p>
        Node.js basiert als Anwendung mit seinen Funktionen auf der V8-Engine
        von Google Chrome. Das bedeutet, dass die gleiche Engine, die in Google
        Chrome zum Ausführen des JavaScript-Codes eingesetzt wird, auch in
        Node.js verwendet wird.
      </p>
      <p>
        Selbst wenn das Framework der Anwendung hauptsächlich als
        Laufzeitumgebung für die Webserver-Programmierung eingesetzt wird,
        findet es inzwischen auch in anderen Gebieten Verwendung, wie
        beispielsweise bei der Erstellung von Skripten oder Tools für die
        Kommandozeile oder bei der Entwicklung von Desktop- oder
        Echtzeitanwendungen.
      </p>
    </div>

    <div class="q-my-xl">
      <div class="text-h6">Anwendungsvorteile von Node.js</div>
      <p>
        Der wohl bedeutendste Unterschied von Node.js zu herkömmlichen
        Web-Serving-Techniken und -Funktionen ist der, dass es sich bei der
        Kommunikation um eine asynchrone, eine sogenannte Non-Blocking I/O
        handelt. Laut Entwickler Ryan Dahl wurde dies bis zur Einführung von
        Node.js falsch angewendet, da bis dahin das Thread-Modell im Einsatz
        war, und somit der gesamte Prozess der Anwendung aufgrund der synchronen
        Kommunikation blockiert wurde. Mit Node.js muss der Server nicht mehr
        für jede Anfrage einen eigenen Thread starten. Stattdessen gibt es einen
        Single-Thread als Funktion, der alle Anfragen in einer endlos laufenden
        Ereignisschleife nacheinander bearbeitet und somit viel weniger
        Arbeitsspeicher verbraucht als die herkömmlichen Modelle. Ein geniales
        Funktionsprinzip!
      </p>
      <p>
        Zudem wird für eine Node.js Anwendung kein zusätzlicher Server benötigt,
        da die Anwendung gleichzeitig auch den Webserver darstellt. Dass Server
        und Client dabei die gleiche Programmiersprache (JavaScript) verwenden,
        ist sicherlich ein weiterer Vorteil für viele Nutzer, da die
        Einstiegshürde vor allem für Webentwickler entsprechend niedrig ist und
        sich fast jede Funktion von selbst erklärt.
      </p>
      <p>
        Node.js kommt als Anwendung ausserdem mit einer Reihe von
        Built-in-Modulen und -Funktionen, die ohne weitere Installation zur
        Verfügung stehen. Beispielsweise gibt es unter anderem das url-Modul,
        welches Funktionen zum Analysieren und Formatieren von URLs liefert,
        oder das fs-Modul, womit in der Anwendung der Zugriff auf das lokale
        Dateisystem ermöglicht wird. Auch das Erstellen von eigenen Modulen ist
        möglich. Zur Installation von Modulen/Funktionen und zur Verwaltung von
        Abhängigkeiten verfügt Node über einen sogenannten
        <b>Node Package Manager (npm)</b>. Mit der Installation der Anwendung
        Node.js wird gleichzeitig auch npm installiert und steht dem Nutzer
        somit sofort zur Verfügung.
      </p>
    </div>

    <div class="q-my-xl">
      <div class="text-h6">Einführung in Node.js</div>
      <p>
        Da JavaScript eines der bekanntesten und gefragtesten Sprachen in der
        Webentwicklung ist und in der Regel in allen gängigen Webbrowsern
        verwendet wird, fällt der Einstieg in die Anwendung vor allem
        Webentwicklern besonders leicht. Wer die Skriptsprache beherrscht, aber
        ein Tutorial machen möchte, um die wichtigsten Methoden und Module von
        Node.js kennenzulernen, sollte einen Blick auf das Node.js Tutorial von
        w3schools werfen.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://www.w3schools.com/nodejs/'"
        label="Tutorial von w3schools"
        color="primary"
        class="midata-fade text-white q-mb-lg"
        flat
      />
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Installation von Node.js</div>
      <p>
        Der npm (Node Package Manager) wird ebenfalls auf Ihrem Computer
        installiert, wenn Sie Node.js installieren
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://nodejs.dev/en/download/'"
        label="Node.js download"
        color="primary"
        class="midata-fade text-white q-mb-lg"
        flat
      />
      <p>
        Vergewissern Sie sich, dass Node und npm installiert sind, indem Sie
        einfache Befehle ausführen, um zu sehen, welche Version von beiden
        installiert ist:
      </p>
      <highlightjs
        language="javascript"
        code="$ node -v
v14.17.5
$ npm -v
7.24.2"
      />
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Integrierte Entwicklungsumgebung (IDE)</div>
      <p>
        Eine integrierte Entwicklungsumgebung oder IDE stellt Programmierern
        eine Sammlung der wichtigsten Werkzeuge zur Softwareentwicklung unter
        einer Oberfläche zur Verfügung. Die Arbeit für die Erstellung von
        Programmen wird dadurch vereinfacht.
      </p>
      <p>Empfehlungen:</p>
      <div></div>

      <div class="q-pa-md row items-start q-gutter-sm">
        <q-card class="my-card">
          <q-img
            src="../../assets/development-basics/vscIcon.svg"
            height="150px"
            fit="contain"
            class="q-mt-md"
          />

          <q-card-section>
            <div class="text-h6">Visual Studio Code</div>
            <div class="text-subtitle2">von Microsoft</div>
          </q-card-section>

          <q-separator spaced inset class="midata-fade"></q-separator>

          <q-card-section class="q-pt-none">
            Visual Studio Code ist ein leichtgewichtiger, aber leistungsstarker
            Quellcode-Editor, der auf Ihrem Desktop läuft und für Windows, macOS
            und Linux verfügbar ist. <br />
            Er bietet integrierte Unterstützung für JavaScript, TypeScript und
            Node.js und verfügt über ein umfangreiches Ökosystem von
            Erweiterungen für andere Sprachen (wie C++, C#, Java, Python, PHP,
            Go) und Laufzeiten (wie .NET und Unity).
          </q-card-section>
          <q-card-actions>
            <q-btn
              type="a"
              target="_blank"
              :href="'https://code.visualstudio.com/download'"
              label="Download"
              color="primary"
              class="midata-fade text-white full-width"
              flat
            />
          </q-card-actions>
        </q-card>
        <q-space></q-space>

        <q-card class="my-card">
          <q-img
            src="../../assets/development-basics/ijIcon.svg"
            height="150px"
            fit="contain"
            class="q-mt-md"
          />

          <q-card-section>
            <div class="text-h6">WebStorm</div>
            <div class="text-subtitle2">von JetBrains</div>
          </q-card-section>
          <q-separator spaced inset class="midata-fade"></q-separator>

          <q-card-section class="q-pt-none">
            WebStorm ist eine integrierte Entwicklungsumgebung für JavaScript
            und verwandte Technologien. So wie andere JetBrains-IDEs erleichtert
            sie Ihnen die Entwicklung, automatisiert Routinearbeiten und hilft
            Ihnen, komplexe Aufgaben problemlos zu bewältigen. <br />
            Benötigt ein JetBrains Account. Erhalten Sie kostenlosen Zugang für
            den persönlichen Gebrauch im Studium:
            <a
              href="https://www.jetbrains.com/community/education/#students"
              target="_blank"
              >Lizenz anfordern</a
            >
          </q-card-section>
          <q-card-actions>
            <q-btn
              type="a"
              target="_blank"
              :href="'https://www.jetbrains.com/de-de/webstorm/'"
              label="Download"
              color="primary"
              class="midata-fade text-white full-width"
              flat
            />
          </q-card-actions>
        </q-card>
        <q-space></q-space>
        <q-card class="my-card">
          <q-img
            src="../../assets/development-basics/atomIcon.svg"
            height="150px"
            fit="contain"
            class="q-mt-md"
          />
          <q-card-section>
            <div class="text-h6">Atom</div>
            <div class="text-subtitle2">von GitHub</div>
          </q-card-section>
          <q-separator spaced inset class="midata-fade"></q-separator>

          <q-card-section class="q-pt-none">
            Atom ist ein freier und quelloffener Text- und Quellcode-Editor für
            macOS, Linux und Microsoft Windows mit Unterstützung für in
            JavaScript geschriebene Plug-ins und integrierter Git-Steuerung.
            <br /><br />
            Seine Entwickler nennen ihn einen "hackbaren Texteditor für das 21.
            Jahrhundert", da er in HTML, CSS und JavaScript vollständig
            anpassbar ist.
          </q-card-section>
          <q-card-actions>
            <q-btn
              type="a"
              target="_blank"
              :href="'https://atom.io/'"
              label="Download"
              color="primary"
              class="midata-fade text-white full-width"
              flat
          /></q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="q-my-xl text-grey">
      Quelle: https://www.arocom.de/fachbegriffe/webentwicklung/nodejs
    </div>
  </q-page>
</template>

<script setup lang="ts">
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
  min-height: 500px
  margin-top: 25px
</style>
