<template>
  <login-card></login-card>
  <q-page>
<!--     <div class="q-mb-xl">
      <div class="text-h3 text-weight-thin">Midata Demo</div>
      <q-separator spaced class="midata-fade"></q-separator>
    </div> -->

    <q-btn
      color="black"
      label="Test Create Immunization"
      icon="search"
      rounded
      outline
      @click="this.$storage.createImmunization()"
      class="gt-xs"
    />
    <q-btn
      color="black"
      label="Test Immunizations Array"
      icon="search"
      rounded
      outline
      @click="testImmunizationsArray()"
      class="gt-xs"
    />
<!-- 
    <q-btn
      color="black"
      label="Test Observation Array"
      icon="search"
      rounded
      outline
      @click="testObservationArray()"
      class="gt-xs"
    /> -->

    <div class="row justify-end">
      <q-btn
        @click="
          getPatient();
          flag = true;
        "
        flat
        text-color="white"
        class="gt-xs midata-fade"
      >
        <q-icon left name="person"></q-icon>
        Patientenresource von MIDATA abfragen
      </q-btn>
      <q-btn
        @click="
          getPatient();
          flag = true;
        "
        flat
        icon="person"
        text-color="white"
        class="lt-sm midata-fade"
        label="Patienten Ressource abfragen"
      >
      </q-btn>
      <q-space />
      <q-btn
        color="black"
        label="Logout"
        icon="logout"
        rounded
        outline
        @click="logout()"
        class="gt-xs"
      />
      <q-btn
        color="black"
        icon="logout"
        round
        outline
        @click="logout()"
        class="lt-sm"
      />
    </div>

    <div style="height: 25px"></div>
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
              <q-card-section class="innerCardScroll">
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

    <div style="height: 100px" />

    <q-card bordered>
      <q-card-section>
        <!--         <q-item-label header
          >Alle Körpertemperatur Observationen von
          {{ getFullPatientName() }}</q-item-label
        > -->
        <q-virtual-scroll
          :items="getObservations()"
          bordered
          padding
          class="rounded-borders"
          style="max-height: 300px"
        >
          <template v-slot="{ item, index }">
            <q-item clickable dense v-ripple :key="index">
              <q-item-section avatar>
                <q-avatar
                  icon="thermostat"
                  text-color="white"
                  class="midata-fade"
                >
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <!--                 <q-item-label
                  lines="1"
                  v-if="item.code.coding[0].display == 'Body temperature'"
                >
                  Körpertemperatur
                </q-item-label> -->
                <q-item-label caption>
                  Wert: {{ item.valueQuantity.value }}
                  {{ item.valueQuantity.unit }} ({{
                    item.bodySite.coding[0].display
                  }})
                </q-item-label>
                <q-item-label caption>
                  Datum:
                  {{ formatDate(item.issued) }}
                </q-item-label>
              </q-item-section>
              <q-btn
                color="primary"
                outlined
                flat
                @mouseover="setCurrentObservation(item.id)"
                @click.stop="showEditDialog = true"
                icon="edit"
                class="gt-xs"
              >
                Observation bearbeiten
              </q-btn>
              <q-btn
                color="primary"
                outlined
                round
                flat
                @mouseover="setCurrentObservation(item.id)"
                @click.stop="showEditDialog = true"
                icon="edit"
                class="lt-sm"
              >
              </q-btn>
            </q-item>
            <q-separator inset spaced />
          </template>
        </q-virtual-scroll>
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          outlined
          flat
          icon="add"
          @click.stop="showAddDialog = true"
          label="Observation hinzufügen"
        />
      </q-card-actions>
    </q-card>

    <edit-observation-dialog
      :visible="showEditDialog"
      @close="showEditDialog = false"
    ></edit-observation-dialog>
    <add-observation-dialog
      :visible="showAddDialog"
      @close="showAddDialog = false"
    >
    </add-observation-dialog>

    <!-- ---------------Immunization Painel------------------------------------------ -->

    <!-- ------------------------------------------ -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginCard from '../../components/LoginCard.vue';
import { Patient } from '@i4mi/fhir_r4';
import bodySites from '../../data/bodySites.json';
import EditObservationDialog from '../../components/EditObservationDialog.vue';
import AddObservationDialog from '../../components/AddObservationDialog.vue';

export default defineComponent({
  name: 'MidataDemo',
  components: {
    'login-card': LoginCard,
    'edit-observation-dialog': EditObservationDialog,
    AddObservationDialog,
  },
  setup() {
    const bodySite = ref('');
    const bodyTemperature = ref(36.8);

    return {
      expanded: ref(false),
      showAddDialog: ref(false),
      showEditDialog: ref(false),
      //q-select BodySite
      bodySite,
      options: bodySites.bodySites,

      //q-input bodytemperature
      bodyTemperature,

      //onReset of Form
      onReset() {
        bodySite.value = '';
        bodyTemperature.value = 36.8;
      },
    };
  },
  data: () => ({
    patientResource: {} as Patient,
    flag: false,
  }),
  computed: {},
  methods: {
    /*     getFullPatientName() {
      let name = this.$storage.getPatient().name;
      return name[0].given.toString() + ' ' + name[0].family;
    }, */
    isEmpty(obj: any) {
      return JSON.stringify(obj) === '{}';
    },
    getPatient() {
      this.patientResource = this.$storage.getPatient();
      console.log(this.patientResource);
    },
    getObservations() {
      return this.$storage.getObservations();
    },
    getImmunizations() {
      return this.$storage.getImmunizations();
    },
    setCurrentObservation(id: any) {
      this.$storage.setCurrentObservation(id);
    },
    getCurrentObservation() {
      return this.$storage.getCurrentObservation();
    },
    /*     getObservationId() {
      return this.$storage.getCurrentObservation().id;
    }, */
    formatDate(date: any) {
      return this.$moment(date.toString()).format('lll');
    },
    logout() {
      this.$midata.logout();
      location.reload();
    },

    testImmunizationsArray() {
      console.log(
        'getImmunizationResourcesAsBundle: ' +
          this.$midata.getImmunizationResourcesAsBundle()
      );
      console.log(this.$storage.getImmunizations());
    },
    testObservationArray() {
      //console.log(this.$midata.getPatientResource())
      //console.log('getObservationResourcesAsBundle: '+this.$midata.getObservationResourcesAsBundle());
      console.log(this.$storage.getObservations());
    },
  },
});
</script>

<style lang="sass" scoped>
.innerCardScroll
  overflow: scroll
  height: 300px
</style>
