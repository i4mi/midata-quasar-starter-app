<template>
  <q-page>
    <div class="text-h3 text-weight-thin">Versionskontrolle und Git(-Hub)</div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Basics</div>
      <p>
        Im Grossen und Ganzen ist GitHub eine Website und ein Cloud-basierter
        Dienst, der Entwicklern hilft, ihren Code zu speichern und zu verwalten
        sowie Änderungen an ihrem Code zu verfolgen und zu kontrollieren. Um
        genau zu verstehen, was GitHub ist, müssen Sie zwei miteinander
        verbundene Prinzipien kennen:
      </p>
      <ul>
        <li>Versionskontrolle</li>
        <li>Git</li>
      </ul>
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Versionskontrolle</div>
      <p>
        Die Versionskontrolle hilft Entwicklern, Änderungen am Code eines
        Softwareprojekts zu verfolgen und zu verwalten. Wenn ein Softwareprojekt
        wächst, wird die Versionskontrolle unerlässlich. Nehmen Sie WordPress
        als Beispiel.
      </p>
      <p>
        Zu diesem Zeitpunkt ist WordPress ein ziemlich grosses Projekt. Wenn ein
        Hauptentwickler an einem bestimmten Teil der WordPress-Codebasis
        arbeiten wollte, wäre es weder sicher noch effizient, ihn direkt den
        "offiziellen" Quellcode bearbeiten zu lassen.
      </p>
      <p>
        Stattdessen ermöglicht die Versionskontrolle den Entwicklern ein
        sicheres Arbeiten durch <b>Branching</b> und <b>Merging</b>.
      </p>
      <p>
        Beim Branching dupliziert ein Entwickler einen Teil des Quellcodes (das
        so genannte <b>Repository</b>). Der Entwickler kann dann gefahrlos
        Änderungen an diesem Teil des Codes vornehmen, ohne den Rest des
        Projekts zu beeinträchtigen.
      </p>
      <p>
        Sobald der Entwickler seinen Teil des Codes richtig zum Laufen gebracht
        hat, kann er ihn wieder in den Hauptquellcode <b>mergen</b>, um ihn
        offiziell zu machen.
      </p>

      <p>
        Alle diese Änderungen werden dann nachverfolgt und können bei Bedarf
        rückgängig gemacht werden.
      </p>
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Git</div>
      <p>
        Git ist ein spezielles Open-Source-Versionskontrollsystem, das 2005 von
        Linus Torvalds entwickelt wurde.
      </p>
      <p>
        Git ist ein verteiltes Versionskontrollsystem, was bedeutet, dass die
        gesamte Codebasis und die Historie auf dem Computer eines jeden
        Entwicklers verfügbar sind, was ein einfaches Verzweigen und
        Zusammenführen ermöglicht.
      </p>
      <p>
        Laut einer Stack Overflow-Umfrage unter Entwicklern verwenden über 87 %
        der Entwickler Git.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://git-scm.com/downloads'"
        label="Download Git"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Github</div>
      <p>
        GitHub ist ein gewinnorientiertes Unternehmen, das einen Cloud-basierten
        Hosting-Service für Git-Repositorys anbietet. Im Wesentlichen
        erleichtert es Einzelpersonen und Teams die Verwendung von Git zur
        Versionskontrolle und Zusammenarbeit.
      </p>
      <p>
        Die Benutzeroberfläche von GitHub ist so benutzerfreundlich, dass auch
        Programmieranfänger die Vorteile von Git nutzen können. Ohne GitHub
        erfordert die Verwendung von Git im Allgemeinen etwas mehr technisches
        Verständnis und die Verwendung der Befehlszeile.
      </p>
      <p>
        GitHub ist jedoch so benutzerfreundlich, dass manche Leute GitHub sogar
        für die Verwaltung anderer Projekte nutzen - etwa für das Schreiben von
        Büchern.
      </p>
      <p>
        Ausserdem kann sich jeder kostenlos anmelden und ein öffentliches
        Code-Repository hosten, was GitHub besonders bei Open-Source-Projekten
        beliebt macht.
      </p>
      <p>
        Als Unternehmen verdient GitHub sein Geld mit dem Verkauf von gehosteten
        privaten Code-Repositories sowie mit anderen geschäftsorientierten
        Plänen, die es Unternehmen erleichtern, Teammitglieder und Sicherheit zu
        verwalten.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://desktop.github.com/'"
        label="Download GitHub Desktop"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Schnelleinstieg Github</div>
      <p>
        Nutzen Sie GitHub, um Git-Repositories zu verwalten und mit anderen
        zusammenzuarbeiten.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://docs.github.com/en/get-started/quickstart'"
        label="GitHub Schnelleinstieg"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Arbeitsabläufe mit Git</div>
      <p>
        Git-Workflows ermutigen Entwickler und DevOps-Teams dazu, Git effektiv
        und konsequent zu nutzen. Git bietet eine grosse Flexibilität bei der
        Verwaltung von Änderungen. Da der Schwerpunkt von Git auf Flexibilität
        liegt, gibt es keinen standardisierten Prozess für die Interaktion mit
        Git. Wenn Sie mit einem Team an einem mit Git verwalteten Projekt
        arbeiten, müssen Sie sicherstellen, dass sich das Team darüber einig
        ist, wie die Änderungen durchgeführt werden sollen. Um sicherzustellen,
        dass das Team auf derselben Seite steht, sollte ein vereinbarter
        Git-Workflow entwickelt oder ausgewählt werden. Es gibt mehrere
        veröffentlichte Git-Workflows, die für Ihr Team geeignet sein könnten.
        Im Folgenden werden wir einige dieser Git-Workflows besprechen.
      </p>

      <q-btn-dropdown
        class="q-mt-lg midata-fade text-white"
        label="Git Workflows"
        icon="timeline"
      >
        <q-list>
          <q-item
            clickable
            v-close-popup
            @click="
              openNewTab(
                'https://www.atlassian.com/git/tutorials/comparing-workflows#centralized-workflow'
              )
            "
          >
            <q-item-section>
              <q-item-label>Centralized Workflow</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="
              openNewTab(
                'https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow'
              )
            "
          >
            <q-item-section>
              <q-item-label>Git Feature Branch Workflow</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="
              openNewTab(
                'https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow'
              )
            "
          >
            <q-item-section>
              <q-item-label>Gitflow Workflow</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="
              openNewTab(
                'https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow'
              )
            "
          >
            <q-item-section>
              <q-item-label>Forking Workflow</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Lesenswert</div>
      <p>Ein erfolgreiches Git-Verzweigungsmodell von Vincent Driessen</p>
      <p>
        In diesem Beitrag stellt Vincent Driessen das Entwicklungsmodell vor,
        das er vor etwa einem Jahr für einige seiner Projekte (sowohl bei der
        Arbeit als auch privat) eingeführt hat und welches sich als sehr
        erfolgreich erwiesen hat.
      </p>

      <q-btn
        type="a"
        target="_blank"
        :href="'https://nvie.com/posts/a-successful-git-branching-model/'"
        label="Lesen"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>

    <div class="q-my-xl text-grey">
      Quelle: https://kinsta.com/knowledgebase/what-is-github/
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { openURL } from 'quasar';

export default defineComponent({
  name: 'Github',
  methods: {
    openNewTab(link: string) {
      openURL(link, null);
    },
  },
});
</script>
