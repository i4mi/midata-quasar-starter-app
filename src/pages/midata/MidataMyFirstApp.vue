<template>
  <q-page>
    <div class="text-h3 text-weight-thin">Meine erste MIDATA App</div>

    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Was sind die Voraussetzungen?</div>
      <div class="text-h6">Developer Account</div>
      <p>
        Wenn Sie ein MIDATA-Plugin, eine mobile App oder einen Backend-Service
        entwickeln möchten, benötigen Sie ein Entwicklerkonto.
      </p>
      <p>
        Ihr Entwicklerkonto unterscheidet sich von Ihrem normalen
        Kontoinhaberkonto, das Sie möglicherweise ebenfalls haben. Sie können
        ein Entwicklerkonto mit der gleichen E-Mail wie ein Kontoinhaberkonto
        haben.
      </p>
      <p>
        Bitte beachten Sie, dass die Ausstellung eines Entwicklerkontos vom
        Bestehen eines Vertrages und/oder einer Partnerschaftsvereinbarung
        zwischen MIDATA und dem Antragsteller abhängig ist.
      </p>
      <p>
        <b>HINWEIS:</b> Nachdem Ihr Entwicklerkonto aktiviert wurde, erhalten
        Sie eine E-Mail.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://test.midata.coop/#/public_developer/registration'"
        label="Registrierung (Developer Account)"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>
    <q-separator spaced class="midata-fade"></q-separator>
    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">MIDATA Developer Portal</div>
      <div class="text-h6">Startseite</div>
      <p>
        Auf dem MIDATA Developer Portal sehen Sie im Header die zur Verfügung
        stehenden Menuitems (Ihre Applikationen, Projekte, Workspace, Sandbox,
        Testeinträge und Testbenutzer). Fürs Erste sind die Menuitems «Ihre
        Applikationen und Testbenutzer» von Bedeutung.
      </p>
      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DeveloperPortal_Overview.png"
        class="img-800 q-my-md"
      >
      </q-img>
    </div>
    <q-separator spaced class="midata-fade"></q-separator>
    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Neue Applikation registrieren</div>
      <p>
        Bevor Sie Ihre App mit MIDATA verbinden können, muss sie zunächst
        registriert werden.
      </p>
      <p>
        Um Ihre Anwendung zu registrieren, melden Sie sich bei Ihrem
        Entwicklerkonto an. Klicken Sie auf der Seite "Ihre Applikationen" auf
        "Ein neues Plugin registrieren" und füllen Sie das Formular aus. Wählen
        Sie "Anwendung (Smartphone/Web)" als "Typ" der Applikation.
      </p>
      <p>
        Jede Anwendung muss einen internen Namen haben, der von der Plattform
        verwendet wird, um diese Anwendung zu identifizieren. Der
        Anwendungsentwickler muss auch einen öffentlichen Namen für die
        markierte Stelle und eine textuelle Beschreibung angeben, die
        beschreibt, was sie tut. Für die OAuth 2.0-Anmeldung Ihrer Anwendung müssen
        Sie die möglichen Redirect-URIs definieren. Ausserdem muss ein geheimer
        Schlüssel angegeben werden, der der mobilen Anwendung bekannt ist, aber
        nicht öffentlich gemacht werden sollte.
      </p>
      <q-expansion-item
        icon="photo"
        label="MIDATA Neue Applikation registrieren Formular einsehen"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
        class="q-mb-lg"
      >
        <q-card>
          <q-card-section>
            <q-img
              src="../../assets/midata/myfirstapp/MIDATA_CreateApplication.png"
              class="img-800"
            ></q-img>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <p>Nachfolgend wird auf die auszufüllenden Felder eingegangen:</p>

      <div class="text-h6">Interner Name</div>
      <p>
        Dieser Name wird intern verwendet, um Ihre Anwendung zu identifizieren.
        Er sollte ein gültiger Bezeichner sein (a-z, A-Z, 0-9, _). Der Name muss
        systemweit eindeutig sein. Wenn Sie SMART auf FHIR-Authentifizierung
        verwenden möchten, muss der interne Name mit dem client_id-Parameter
        übereinstimmen, den Ihre Anwendung während der Authentifizierung sendet.
        Für die MIDATA-API muss er mit dem appname-Parameter während der
        Authentifizierung übereinstimmen.
      </p>

      <div class="text-h6">Applikationstyp</div>
      <p>
        Muss für eine externe Anwendung auf "Anwendung (Smartphone/Web)" gesetzt
        werden.
      </p>

      <div class="text-h6">Zielrolle</div>
      <p>
        Ist Ihre Anwendung nur für eine bestimmte Benutzerrolle bestimmt?
        Andernfalls wählen Sie "Beliebige Rolle".
      </p>
      <p>
        Wenn Sie "Beliebige Rolle" auswählen, wird auf der OAuth 2.0-Anmeldeseite
        eine Auswahlliste mit Rollen angezeigt. Wenn Sie beispielsweise
        "Forscher" auswählen, wird auf der OAuth 2.0-Anmeldeseite eine Auswahlliste
        für ein Forschungsprojekt angezeigt.
      </p>

      <div class="text-h6">Anforderungen</div>
      <p>
        Bitte wählen Sie alle Anforderungen aus, die Ihre Anwendung in Bezug auf
        den Benutzer hat, der die Anwendung nutzt. Die MIDATA-Plattform selbst
        kann Standardanforderungen haben. Bitte bedenken Sie, dass sich diese in
        Zukunft ändern können. Derzeit sind diese Anforderungen verfügbar: (Die
        fett markierten Anforderungen werden derzeit von der Plattform selbst
        verlangt)
      </p>

      <ul>
        <li>
          <b>Die E-Mail-Adresse des Nutzers muss der Plattform bekannt sein</b>
        </li>
        <li>
          E-Mail-Adresse des Nutzers muss verifiziert worden sein - Wenn
          ausgewählt, kann die App erst genutzt werden, nachdem der Nutzer seine
          E-Mail-Adresse bestätigt hat. Andernfalls hat er einen Tag Zeit, dies
          zu tun.
        </li>

        <li>
          Handynummer des Nutzers muss der Plattform bekannt sein - Die
          Plattform fragt nach der Nummer, wenn sie nicht bereits bekannt ist.
        </li>

        <li>
          Die Handynummer des Nutzers muss verifiziert worden sein - Der Nutzer
          muss einmal 2FA mit seiner Handynummer durchführen, um die Richtigkeit
          der Nummer zu beweisen
        </li>

        <li>
          2-Faktor-Authentifizierung beim Login - Der APP-Login kann durch 2FA
          geschützt werden
        </li>

        <li>
          Postadresse des Nutzers muss der Plattform bekannt sein - Der Nutzer
          wird nach seiner Adresse gefragt, wenn sie der Plattform nicht bereits
          bekannt ist
        </li>

        <li>
          Die Postadresse des Nutzers muss verifiziert worden sein - Die
          Verifizierung der Adresse erfolgt durch Eingabe eines Codes, der dem
          Nutzer per Brief zugeschickt wird
        </li>

        <li>
          Das Geburtsdatum des Nutzers muss bekannt sein - Der Nutzer wird nach
          seinem Geburtsdatum gefragt
        </li>

        <li>
          Der Personalausweis des Nutzers muss überprüft worden sein - derzeit
          nicht unterstützt (Stand 25.11.21)
        </li>

        <li>
          Der Nutzer muss Mitglied der Genossenschaft sein - derzeit nicht
          unterstützt (Stand 25.11.21)
        </li>
        <li>
          Das Konto muss von einem MIDATA-Administrator freigeschaltet worden
          sein
        </li>
      </ul>

      <div class="text-h6">Name</div>
      <p>
        Der Name Ihrer Anwendung, der dem Endbenutzer angezeigt wird.
        (Internationaler Name)
      </p>
      <div class="text-h6">Beschreibung</div>
      <p>
        Eine Beschreibung Ihrer Anwendung. Diese kann dem Endbenutzer als Teil
        der OAuth 2.0-Autorisierung angezeigt werden. Sie kann auch zu den Listen
        der verfügbaren MIDATA-Apps hinzugefügt werden, falls dies jemals als
        Funktion zur Plattform hinzugefügt wird. (Internationale Beschreibung)
      </p>

      <div class="text-h6">Name der Organisation</div>
      <p>
        Wenn die App von einer Organisation bereitgestellt wird, geben Sie hier
        den Namen der Organisation ein.
      </p>

      <div class="text-h6">Herausgeber</div>
      <p>
        Wenn die App von einem Drittanbieter veröffentlicht wird, geben Sie hier
        den Namen der veröffentlichenden Organisation ein.
      </p>

      <div class="text-h6">Entwicklungsteam</div>
      <p>
        Hier kann die E-Mail-Adresse des Entwicklers angegeben werden. Wenn es
        mehrere Entwickler gibt, kann eine durch Komma separierte Liste von
        E-Mail-Adressen eingetragen werden.
      </p>

      <div class="text-h6">Unterstützung für mehrere Sprachen</div>
      <p>
        Name und Beschreibung können auch in anderen Sprachen angegeben werden.
        Wenn keine Übersetzung für die Sprache des Benutzers verfügbar ist, wird
        die internationale Version von oben verwendet. Wählen Sie zunächst die
        gewünschte Sprache aus und geben Sie dann den lokalisierten Namen und
        die Beschreibung ein.
      </p>

      <div class="text-h6">Schlagwörter</div>
      <p>
        Dies wird derzeit für Applikationen ignoriert (Stand 25.11.21). Die
        Schlagwörter entsprechen Kategorien unter welchen das Plugin im Store
        erscheinen wird.
      </p>
      <p>Zur Auswahl stehen folgende Schlagwörter:</p>
      <ul>
        <li>Analyse</li>
        <li>Import</li>
        <li>Planung</li>
        <li>Protokoll</li>
        <li>Experte</li>
      </ul>

      <div class="text-h6">Schreibzugriff</div>
      <p>Bitte wählen Sie aus, ob und welche Daten Ihre App schreiben darf.</p>
      <p>Mögliche Auswahlen sind:</p>
      <ul>
        <li>Es dürfen keine Daten geschrieben werden</li>
        <li>Vorhandene Daten dürfen aktualisiert werden</li>
        <li>
          Daten, für die eine Einwilligung vorliegt, dürfen geschrieben oder
          aktualisiert werden
        </li>
        <li>
          Alle Arten von Daten dürfen geschrieben oder aktualisiert werden
        </li>
      </ul>

      <div class="text-h6">Weitergabe von Daten</div>
      <p>
        Ihre Anwendung kann FHIR-Zustimmungsressourcen erstellen, um die
        gemeinsame Nutzung von Daten mit anderen Personen vorzuschlagen. Wenn
        Sie dieses Kontrollkästchen aktivieren, kann Ihre Anwendung sogar
        *aktive* Einwilligungen erstellen, wenn nur Daten freigegeben werden,
        auf die die Anwendung ohnehin zugreifen kann.
      </p>

      <div class="text-h6">Benutzersuche</div>
      <p>
        Aktivieren Sie dieses Kontrollkästchen, wenn Ihre Anwendung den
        FHIR-Endpunkt /fhir/person verwendet, um nach anderen Personen zu
        suchen, die Ihre Anwendung nutzen.
      </p>
      <p>
        Wenn dieses Kontrollkästchen nicht aktiviert ist, werden bei einer Suche
        über den Endpunkt /fhir/person nur Kontoinhaber gefunden, die ihr Konto
        explizit als durchsuchbar markiert haben.
      </p>

      <div class="text-h6">Fehlerberichte senden</div>
      <p>
        Wenn dieses Kontrollkästchen aktiviert ist, wird der Entwickler ({user})
        per E-Mail über Fehler benachrichtigt, die durch diese Applikation
        verursacht werden.
      </p>

      <div class="text-h6">Bemerkung</div>
      <p>
        Nachdem Sie alle benötigten Felder ausgefüllt haben, können Sie die
        Applikation registrieren. Die Applikation wird auf der Startseite des
        Developer Portals angezeigt.
      </p>
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Verwaltung bestehender Applikationen</div>
      <p>
        Wählen Sie im oberen Menü "Ihre Applikationen". Sie sehen die Liste der
        Applikationen, die Sie bereits registriert haben. Klicken Sie auf den
        Namen der Applikation oder auf die Schaltfläche "Verwalten" einer
        bestehenden Anwendung, um eine detaillierte Ansicht und weitere Optionen
        zu erhalten.
      </p>
      <div class="text-h6">Übersichtsseite</div>
      <p>
        Nachdem Sie eine Anwendung ausgewählt haben, sehen Sie eine
        Übersichtsseite für diese Anwendung:
      </p>
      <q-expansion-item
        icon="photo"
        label="MIDATA Übersichtsseite anzeigen"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
        class="q-mb-lg"
      >
        <q-card>
          <q-card-section>
            <q-img
              src="../../assets/midata/myfirstapp/MIDATA_ApplicationOverview.png"
              class="img-800"
            ></q-img>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div class="text-h6">Ändern der Grundeinstellungen der Applikation</div>
      <p>
        Damit Ihre Applikation korrekt funktionieren kann, müssen folgende
        Einstellungen bearbeitet werden.
      </p>

      <div class="text-h6">Applikationsgeheimnis</div>
      <p>
        Ihre Anwendung benötigt dieses "Geheimnis" bei der Anmeldung. Das
        Anwendungsgeheimnis ist für die Authentifizierung mit der MIDATA-API und
        für den vertraulichen Start von SMART on FHIR erforderlich. Sie können
        das Geheimnis frei wählen.
      </p>
      <p>
        <b>WICHTIG:</b> Wenn Sie Anwendungen von Drittanbietern entwickeln,
        sollten Sie kein Geheimnis festlegen. Die App wird dieses Geheimnis
        nicht schützen können. Weitere Informationen darüber, wie und wann das
        Geheimnis zu verwenden ist, finden Sie im Leitfaden für intelligente
        Autorisierung.
      </p>

      <div class="text-h6">
        Redirect URI (optional, erforderlich für OAuth 2.0-Anmeldung)
      </div>
      <p>
        Die Redirect URI wird für die öffentliche SMART on FHIR Startsequenz
        verwendet. Die Redirect-URI muss mit der Redirect-URI übereinstimmen,
        die Ihre Anwendung während der Authentifizierung bereitstellen wird.
      </p>

      <div class="text-h6">Freischaltcode (optional)</div>
      <p>
        Wenn dieses Feld ausgefüllt ist, muss jeder Benutzer, der Ihre Anwendung
        nutzen möchte, diesen Code während der OAuth 2.0-Anmeldung eingeben.
        Verwenden Sie diese Funktion, um die Nutzung Ihrer Anwendung auf ein
        Ereignis zu beschränken, z. B. auf eine Messe.
      </p>

      <p>
        Nach der Registrierung müssen Sie den Zugriffsfilter für Ihre Anwendung
        festlegen. Der Zugriffsfilter legt fest, auf welche Daten Ihre Anwendung
        zugreifen muss.
      </p>
      <q-expansion-item
        icon="photo"
        label="MIDATA Applikation verwalten anzeigen"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
        class="q-mb-lg"
      >
        <q-card>
          <q-card-section>
            <q-img
              src="../../assets/midata/myfirstapp/MIDATA_ManageApplication.png"
              class="img-800"
            ></q-img>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Data Access Filter</div>
      <p>
        Jede Anwendung, die Midata nutzt, hat ihre eigenen Zugriffsrechte auf
        die Daten. Nachdem Sie Ihre Anwendung registriert haben, sollten Sie als
        erstes festlegen, welche Zugriffsrechte Ihre Anwendung benötigt.
      </p>
      <p>
        Der Benutzer, der die Anwendung nutzen wird, muss dieser Liste
        zustimmen, wenn er Ihre Anwendung zum ersten Mal nutzt.
      </p>

      <q-expansion-item
        icon="photo"
        label="MIDATA Access Filter anzeigen"
        header-class="bg-primary text-white"
        expand-icon-class="text-white"
        class="q-mb-lg"
      >
        <q-card>
          <q-card-section>
            <q-img
              src="../../assets/midata/myfirstapp/MIDATA_DataAccessFilter.png"
              class="img-800"
            ></q-img>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div class="text-h6">Zugangsfilter erstellen</div>
      <p>
        Jetzt sehen Sie eine Übersicht über alle Einstellungen und Dinge, die
        mit einer Anwendung gemacht werden können. In dieser Ansicht klicken Sie
        auf Datenzugriffsfilter ändern.
      </p>
      <p>
        Wenn Sie zum ersten Mal einen Zugangsfilter definieren, sehen Sie eine
        Standardauswahl. Nun hängt es davon ab, welche Art von Benutzer Zugang
        zu MIDATA aus Ihrer Anwendung benötigt. Zum Beispiel: Wenn nur Patienten
        die Anwendung nutzen, dann wählen Sie Patienten aus und klicken Sie auf
        Abschicken.
      </p>

      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DataAccessFilterCreate1.png"
        class="img-800 q-my-md"
      ></q-img>

      <p>
        Nachdem Sie auf Abschicken geklickt haben, sehen Sie eine Übersicht über
        alle verfügbaren Datentypen. Nach der Auswahl des Patienten handelt es
        sich nur um den zuvor ausgewählten Patienten.
      </p>
      <p>
        Aktivieren Sie das Kontrollkästchen Alle Benutzer abmelden und klicken
        Sie auf Speichern und beenden.
      </p>

      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DataAccessFilterCreate2.png"
        class="img-800 q-my-md"
      ></q-img>

      <div class="text-h6">Zugangsfilter bearbeiten</div>
      <p>
        Wenn der Zugriffsfilter wie oben beschrieben definiert wurde, sollte ein
        Benutzer (Patient) nun in der Lage sein, sich anzumelden und seine
        eigenen oder andere freigegebene Patientenressourcen zu lesen und zu
        bearbeiten. In den meisten Fällen reicht dies nicht aus.
      </p>

      <p>
        Um neue Ressourcen zu definieren, navigieren Sie, wie oben beschrieben,
        zur Übersicht aller zugänglichen Datentypen.
      </p>
      <p>
        Zurück in der Übersicht der Datentypen, klicken Sie auf die Schaltfläche
        Weitere Datentypen hinzufügen.
      </p>

      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DataAccessFilterEdit1.png"
        class="img-800 q-my-md"
      ></q-img>

      <p>
        Nun erscheint eine Suchleiste. Geben Sie die Ressource ein, auf die Sie
        zugreifen möchten. In diesem Beispiel wollen wir auf Körpertemperatur
        zugreifen. Daher geben wir in das Suchfeld ein: body temperature oder
        Körpertemperatur ein
      </p>
      <p>
        Nachdem Sie die Suchanfrage eingegeben haben, klicken Sie auf Suchen
        (nicht möglich mit Enter).
      </p>
      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DataAccessFilterEdit2.png"
        class="img-800 q-my-md"
      ></q-img>

      <p>
        Nun sehen Sie eine Liste von Ergebnissen mit der angegebenen
        Suchanfrage. Wählen Sie die gewünschte Ressource aus, indem Sie auf
        ihren Namen in der Spalte Treffer klicken. Jetzt wählen wir zum Beispiel
        http://loinc.org 8310-5.
      </p>
      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DataAccessFilterEdit3.png"
        class="img-800 q-my-md"
      ></q-img>

      <p>
        Geben Sie das richtige Datenformat ein, falls es nicht angegeben ist.
        Das Datenformat ist immer der "grundlegende" Typ der Ressource. Zum
        Beispiel ist die Körpertemperatur eine Beobachtung. Klicken Sie dann auf
        Übernehmen.
      </p>
      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DataAccessFilterEdit4.png"
        class="img-800 q-my-md"
      ></q-img>

      <p>
        Wiederholen Sie diese wenigen Schritte für jeden Datentyp, den Sie in
        der Anwendung verwenden möchten. Nachdem Sie alle erforderlichen
        Ressourcen definiert haben, markieren Sie Logout all users und klicken
        Sie auf Save and exit.
      </p>

      <p>
        <b>HINWEIS:</b> Es stehen nur Datentypen bzw. Codes zur Verfügung,
        welche unter https://api-doc.midata.coop/codes.html hinterlegt sind.
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://api-doc.midata.coop/codes.html'"
        label="Datentypen einsehen"
        color="primary"
        class="midata-fade text-white"
        flat
      />
    </div>
    <q-separator spaced class="midata-fade"></q-separator>

    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Authentifizierung</div>
      <p>
        Die MIDATA Plattform unterstützt die SMART on FHIR-Authentifizierung
        unter Verwendung der öffentlichen Standalone-Startsequenz. Die SMART on
        FHIR-Authentifizierung basiert auf dem OAuth 2.0 Prozess.
      </p>
      <p>
        Hier ist ein Link zur offiziellen Spezifikation, die Ihnen bei der
        Entwicklung helfen kann:
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'http://hl7.org/fhir/smart-app-launch/'"
        label="offizielle Spezifikation"
        color="primary"
        class="midata-fade text-white q-mb-lg"
        flat
      />
      <p>
        Die Bibliothek @i4mi/js-on-fhir (npm Paket) verwaltet den OAuth 2.0
        Prozess für jede JavaScript Web-App (angular, vuejs, js etc.).
      </p>
      <q-btn
        type="a"
        target="_blank"
        :href="'https://www.npmjs.com/package/@i4mi/js-on-fhir'"
        label="@i4mi/js-on-fhir"
        color="primary"
        class="midata-fade text-white q-mb-lg"
        flat
      />
      <p>
        Dieses npm Paket wird in der MIDATA Demo App für die Verwaltung des
        OAuth 2.0 Prozesses eingesetzt.
      </p>
      <q-btn
        to="/midata/demo"
        label="MIDATA Demo"
        class="midata-fade text-white"
      ></q-btn>
    </div>

    <q-separator spaced class="midata-fade"></q-separator>
    <div class="q-my-xl">
      <div class="q-qb-sm text-h5">Test-Benutzerkonten</div>
      <p>
        Als Entwickler können Sie Testkonten mit anderen Rollen (Kontoinhaber,
        Gesundheitsfachperson und Forscher) registrieren. Diese Testkonten
        müssen keine real existierenden Personen repräsentieren, sondern sind
        nur zum Testen Ihrer Anwendung gedacht. Sie sind an Ihr Entwicklerkonto
        gebunden. Wenn Sie eine Applikation entwickeln, werden diese Testkonten
        Ihrer lokalen Installation der Applikation zugewiesen.
      </p>
      <p>
        Klicken Sie im oberen Menü auf "Testbenutzer", um eine Liste aller von
        Ihnen erstellten Testbenutzer anzuzeigen.
      </p>
      <q-img
        src="../../assets/midata/myfirstapp/MIDATA_DeveloperPortal_TestUser.png"
        class="img-800 q-my-md"
      ></q-img>
      <p>
        Klicken Sie auf "Kontoinhaber registrieren", "Gesundheitsdienstleister
        registrieren" oder "Forscher registrieren", um einen neuen Testbenutzer
        zu registrieren. Sie werden dann auf die "normale" Registrierungsseite
        für diese Rolle weitergeleitet. Das auf diese Weise erstellte
        Benutzerkonto ist sofort verfügbar und es wird keine Begrüssungsmail an
        die verwendete E-Mail-Adresse gesendet.
      </p>
      <p>
        Dies stellt die Grundlage dar, damit Sie sich zu einem späteren Punkt
        bei MIDATA mit Hilfe eines Test-Benutzerkontos anmelden können.
      </p>
    </div>

    <div class="q-my-xl text-grey">Quelle: https://api-doc.midata.coop/</div>
  </q-page>
</template>

<script setup lang="ts">
</script>

<style lang="sass" scoped>
.img-800
  max-width: 800px
</style>
