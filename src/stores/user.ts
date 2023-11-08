import { defineStore } from 'pinia';
import { Observation, ObservationStatus, Patient } from '@i4mi/fhir_r4';
import { copyToClipboard, Notify } from 'quasar';
import { useSessionStorage } from '@vueuse/core';
import { midata } from 'boot/plugins';
import { ObservationType } from 'src/plugins/midataService';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export const useUserStore = defineStore('user', () => {

  /**
   * Instance variables of this store. They are being saved to sessionStorage
   * automatically and reactively using the "useSessionStorage" composable from
   * VueUse
   */
  const currentLanguage = useSessionStorage('currentLanguage', 'de')
  const patientResource = useSessionStorage('patientResource', {} as Patient)
  const currentObservation = useSessionStorage('currentObservation', {} as Observation)
  const observations = useSessionStorage('observations', [] as Observation[])
  const currentFilter = useSessionStorage('currentFilter', '')
  const patientResourceVisible = useSessionStorage('patientResourceVisible', false)
  const patientResourceExpanded = useSessionStorage('patientResourceExpanded', false)
  const observationsExpanded = useSessionStorage('observationsExpanded', false)

  /**
   * Other variables
   */
  const i18n = useI18n()
  i18n.locale.value = currentLanguage.value;
  const DAY_MILLISECONDS = 1000 * 60 * 60 * 24

  /**
   * Deletes all data from this store and sets the currentLanguage to 'de'.
   */
  function deleteDataInStore(): void {
    currentLanguage.value = 'de-ch';
    observations.value = [] as Observation[];
    patientResource.value = {} as Patient;
    currentObservation.value = {} as Observation;
  }

  /**
   * Restores data from the MIDATA server.
   * @returns a promise:
   *              - if successfull ->
   *              - if not successfull ->
   */
  async function restoreFromMidata(): Promise<void> {
    try {
      const results = await Promise.all([
        midata.getPatientResource(),
        midata.loadObservations(),
      ]);
      patientResource.value = results[0];
      observations.value = results[1];
    } catch (error) {
      console.warn('Error while restoring from MIDATA: ', error);
      throw error;
    }
  }

  /**
   * Computed property for the Observationlist filtered by code. To change the
   * filter, edit "currentFilter.value" of this store
   * @param code Code of the Observations first code-able concept
   */
  const filteredList = computed(() => {
    return observations.value
      .filter((obs: Observation) => {
        return obs.code.coding[0].code === currentFilter.value
      })
      .sort((a: Observation, b: Observation) => {
        return new Date(a.issued).getTime() - new Date(b.issued).getTime();
      });
  })

  /**
   * Computed property for the full-name of the Patient resource
   */
  const fullPatientName = computed(() => {
    if (patientResource.value.name){
      return patientResource.value.name[0].given.toString() + ' ' + patientResource.value.name[0].family;
    }
    return undefined
  })

  /**
   * Computed to display the number of Observations
   */
  const numberOfObservations = computed(() => {
    return observations.value.length
  })

  /**
   * Sets the selected observation if the id is different from the current Observation.
   * Used to observations them in the UI
   * @param _id MIDATA id of the observation.
   */
  async function setCurrentObservation(_id: string): Promise<void> {
    if (_id !== currentObservation.value.id) {
      currentObservation.value = await midata.searchWithId('Observation', _id)
    }
  }

  /**
   * Creates a new Observation.
   * @param _status Status of the Observation. Default is PRELIMINARY for newly
   * created Observations.
   * @param bodySite String representing a bodySite. Needs to be present in
   * the fhirData.json file.
   * @param values Observation value or values with multivalued Observations.
   * @param observationType Type of the Observation.
   * @returns a promise:
   *              - if successfull -> MIDATA server observation resource response.
   *              - if not successfull -> Error response.
   */
  async function createObservation(
    _status: ObservationStatus,
    bodySite: string,
    values: number[],
    observationType: ObservationType
  ): Promise<Observation> {
    try {
      const result = await midata.createObservation(_status, bodySite, values, observationType);
      if (result) {
        observations.value.push(result)
        Notify.create({
          message: 'Observation erfolgreich gespeichert',
          color: 'green',
          position: 'top',
          icon: 'announcement',
        });
        return result;
      } else {
        throw new Error('Error while creating MIDATA Observation. No result from Server');
      }
    } catch (error) {
      console.log(error)
      Notify.create({
        message: 'Die Observation konnte nicht erstellt werden',
        color: 'red',
        position: 'top',
        icon: 'announcement',
      });
    }
  }

  /**
   * Updates an Observation with a new value and bodySite. Changes the issued
   * date to the current date and time
   * @param _id MIDATA id of the Observation
   * @param bodySite String representing the bodySite of the Observation.
   * Needs to be present in the fhirData.json file
   * @param values Observation Value or Values with multivalued Observations
   * @param observationType Type of the Observation (ObservationType enum)
   * @param observationStatus Status of the Observation. Default is PRELIMINARY.
   * A deleted Observation gets the type ENTERED_IN_ERROR
   * @returns a promise:
   *              - if successfull -> MIDATA server observation resource response.
   *              - if not successfull -> Error response.
   */
  async function updateObservation(
    _id: string,
    bodySite: string,
    values: number[],
    observationType: ObservationType,
    observationStatus: ObservationStatus = ObservationStatus.PRELIMINARY
  ): Promise<Observation> {
    try {
      const result = await midata.updateObservation(_id, bodySite, values, observationType, observationStatus);
      if (result) {
        observations.value = await midata.loadObservations();
        Notify.create({
          message: 'Observation erfolgreich bearbeitet',
          color: 'green',
          position: 'top',
          icon: 'announcement',
        });
        return result;
      } else {
        throw new Error('Error while updating MIDATA Observation. No result from Server');
      }
    } catch (error) {
      console.log(error)
      Notify.create({
        message: 'Die Observation konnte nicht bearbeitet werden',
        color: 'red',
        position: 'top',
        icon: 'announcement',
      });
    }
  }

  /**
   * Copies an item to the clipboard in JSON-Format. Uses the Quasar Function
   * "copyToClipboard"
   * @param item Item that should be copied to the clipboard. Preferably
   * a JSON Object or a string.
   * @param label Label to display in the quasar notify component.
   */
  async function copyItemToClipBoard(item: any, label = 'Resource'): Promise<void> {
    try {
      await copyToClipboard(JSON.stringify(item, null, 2));
      Notify.create({
        message: `${label} kopiert`,
        color: 'green',
        position: 'top',
        icon: 'announcement'
      });
    } catch (e) {
      Notify.create({
        message: `Kopieren von ${label} fehlgeschlagen`,
        color: 'red',
        position: 'top',
        icon: 'announcement',
      })
    }
  }

  /**
   * Changes the locale of i18n and the Pinia userStore.
   * @param locale
   */
  function changeLanguage(locale: string) {
    console.log('-------------------- chaning: ', locale)
    const validLocale = getValidLocale(locale);
    i18n.locale.value = validLocale;
    currentLanguage.value = validLocale;
  }

  /**
   * MIDATA stores their locales in a slightly different format than supported
   * by this App (for example 'de' instead of 'de-ch'). This method converts them to the
   * same format
   * @param locale
   */
  function getValidLocale(locale: string): string{
    switch (locale){
      case 'de-ch':
      case 'de':
        return 'de-ch'
      case 'fr-ch':
      case 'fr':
        return 'fr-ch'
      case 'en-gb':
      case 'en':
        return 'en-gb'
      default:
        return 'de-ch'
    }
  }

  /**
   * Formats a date String to the format 'lll' (21. Feb. 2023 14:00)
   * @param date String representing a date in the ISO format.
   */
  function formatDate(date: string) {
    return new Intl.DateTimeFormat(currentLanguage.value,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).format(Date.parse(date))
  }

  /**
   * Generates a string to represent the difference in time from now to the
   * specified date as a natural language string
   * @param date String representing a date in the ISO format.
   */
  function fromNow(date: string) {

    //Difference in days
    const difference = Math.round((new Date(date).getTime() -
      new Date().getTime()) / DAY_MILLISECONDS)

    return new Intl.RelativeTimeFormat(currentLanguage.value,
      { numeric: 'auto' }).format(difference, 'days')
  }

  return { currentLanguage, patientResource, currentObservation,
    observations, currentFilter, filteredList, patientResourceVisible, patientResourceExpanded,
    observationsExpanded, fullPatientName, numberOfObservations,
    deleteDataInStore, copyToClipBoard: copyItemToClipBoard, restoreFromMidata,
    createObservation, updateObservation, setCurrentObservation, changeLanguage,
    formatDate, fromNow}
})
