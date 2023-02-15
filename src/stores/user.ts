import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Observation, ObservationStatus, Patient } from '@i4mi/fhir_r4';
import { copyToClipboard, Notify } from 'quasar';
import { useSessionStorage } from '@vueuse/core';
import { midata } from 'boot/plugins';
import { ObservationType } from 'src/plugins/midataService';

export const useUserStore = defineStore('counter', () => {

  const currentLanguage = ref(useSessionStorage('currentLanguage', 'de'))
  const patientResource = ref(useSessionStorage('patientResource', {} as Patient))
  const currentObservation = ref(useSessionStorage('currentObservation', {} as Observation))
  const observations = ref(useSessionStorage('observations', [] as Observation[]))

  function deleteDataInStore(): void {
    currentLanguage.value = 'de';
    observations.value = [] as Observation[];
    patientResource.value = {} as Patient;
    currentObservation.value = {} as Observation;
  }

  function restoreFromStorage(): void {
    if (midata.isLoggedIn()) {
      void restoreFromMidata();
    } else {
      console.log('Could not restore from storage. Log in first.');
    }
  }

  async function restoreFromMidata(): Promise<void> {
    try {
      const results = await Promise.all([
        midata.getPatientResource(),
        midata.loadObservations(),
      ]);
      patientResource.value = results[0];
      observations.value = results[1];
    } catch (error) {
      console.warn('Error', error);
      throw error;
    }
  }

  function setCurrentObservation(_id: string): void {
    void midata.searchWithId('Observation', _id).then((result) => {
      currentObservation.value = result as Observation;
    });
  }

  async function createObservation(
    _status: ObservationStatus,
    bodySite: string,
    values: number[],
    observationType: ObservationType
  ): Promise<Observation> {
    try {
      const result = await midata.createObservation(_status, bodySite, values, observationType);
      if (result) {
        observations.value = await midata.loadObservations();
        Notify.create({
          message: 'Observation erfolgreich gespeichert',
          color: 'green',
          position: 'top',
          icon: 'announcement',
        });
        return result;
      } else {
        throw new Error('Error');
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
        throw new Error('Error');
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

  function copyToClipBoard(item: any, label = 'Resource') {
    copyToClipboard(JSON.stringify(item, null, 2))
      .then(() => {
        Notify.create({
          message: `${label} kopiert`,
          color: 'green',
          position: 'top',
          icon: 'announcement',
        })
      })
      .catch(() => {
        Notify.create({
          message: `Kopieren von ${label} fehlgeschlagen`,
          color: 'red',
          position: 'top',
          icon: 'announcement',
        })
      })
  }

  return { currentLanguage, patientResource, currentObservation, observations,
    deleteDataInStore, copyToClipBoard, restoreFromStorage, restoreFromMidata,
    createObservation, updateObservation, setCurrentObservation}
})
