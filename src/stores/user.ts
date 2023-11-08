import { defineStore } from 'pinia';
import { Patient } from '@i4mi/fhir_r4';
import { copyToClipboard, Notify } from 'quasar';
import { useSessionStorage } from '@vueuse/core';
import { midata } from 'boot/plugins';
import { computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  /**
   * Instance variables of this store. They are being saved to sessionStorage
   * automatically and reactively using the "useSessionStorage" composable from
   * VueUse
   */
  const patientResource = useSessionStorage<Patient>(
    'patientResource',
    {} as Patient
  );
  const patientResourceVisible = useSessionStorage<boolean>(
    'patientResourceVisible',
    false
  );
  const patientResourceExpanded = useSessionStorage<boolean>(
    'patientResourceExpanded',
    false
  );

  /**
   * Deletes all data from this store and sets the currentLanguage to 'de'.
   */
  function deleteDataInStore(): void {
    patientResource.value = {} as Patient;
  }

  /**
   * Restores data from the MIDATA server.
   * @returns a promise:
   *              - if successfull ->
   *              - if not successfull ->
   */
  async function restoreFromMidata(): Promise<void> {
    try {
      patientResource.value = await midata.getPatientResource();
    } catch (error) {
      console.warn('Error while restoring from MIDATA: ', error);
      throw error;
    }
  }

  /**
   * Computed property for the full-name of the Patient resource
   */
  const fullPatientName = computed(() => {
    if (patientResource.value.name) {
      return (
        patientResource.value.name[0].given.toString() +
        ' ' +
        patientResource.value.name[0].family
      );
    }
    return undefined;
  });

  /**
   * Copies an item to the clipboard in JSON-Format. Uses the Quasar Function
   * "copyToClipboard"
   * @param item Item that should be copied to the clipboard. Preferably
   * a JSON Object or a string.
   * @param label Label to display in the quasar notify component.
   */
  async function copyItemToClipBoard(
    item: any,
    label = 'Resource'
  ): Promise<void> {
    try {
      await copyToClipboard(JSON.stringify(item, null, 2));
      Notify.create({
        message: `${label} kopiert`,
        color: 'green',
        position: 'top',
        icon: 'announcement',
      });
    } catch (e) {
      Notify.create({
        message: `Kopieren von ${label} fehlgeschlagen`,
        color: 'red',
        position: 'top',
        icon: 'announcement',
      });
    }
  }

  return {
    patientResource,
    patientResourceVisible,
    patientResourceExpanded,
    fullPatientName,
    deleteDataInStore,
    copyToClipBoard: copyItemToClipBoard,
    restoreFromMidata,
  };
});
