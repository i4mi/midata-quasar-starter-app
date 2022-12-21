import MidataService from './midataService';
import { Observation, ObservationStatus, Patient } from '@i4mi/fhir_r4';
import { Notify } from 'quasar';
import { ref } from 'vue';

const STORAGE_KEY = 'demo-app-storage';

export default class Storage {
  private currentLanguage = 'de';
  private patientResource = {} as Patient;
  private currentObservation = {} as Observation;
  public observations = ref<Observation[]>([]);

  midata: MidataService;

  constructor(_midataService: MidataService) {
    this.midata = _midataService;
    this.restoreFromStorage();
  }

  /**
   * Persists data to sessionStorage.
   */
  private persist(): void {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this));
  }

  /**
   * Restores data from sessionStorage.
   */
  private restoreFromStorage(): void {
    const persisted = sessionStorage.getItem(STORAGE_KEY);
    if (persisted) {
      const storage = JSON.parse(persisted);
      this.currentLanguage = storage.currentLanguage;
      this.observations = storage.observations
      this.patientResource = storage.patientResource;
    } else if (this.midata.isLoggedIn()) {
      void this.restoreFromMidata();
    } else {
      console.log('Could not restore from storage. Log in first.');
    }
  }

  /**
   *
   * @returns a promise:
   *              - if successfull ->
   *              - if not successfull ->
   */
  public restoreFromMidata(): Promise<void> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.midata.getPatientResource(),
        this.midata.loadObservations(),
      ])
        .then((results) => {
          this.patientResource = results[0];
          this.observations.value = results[1]
          this.persist();
          resolve();
        })
        .catch((error) => {
          console.warn('Error', error);
          reject(error);
        });
    });
  }

  /**
   * Sets the current Language.
   * @param _lang
   */
  public setCurrentLanguage(_lang: string): void {
    this.currentLanguage = _lang;
    this.persist();
  }

  /**
   * Gets the current language.
   * @returns the current language
   */
  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * deletes all data from sessionStorage and sets the currentLanguage to 'de'.
   */
  public deleteDataInStore(): void {
    this.currentLanguage = 'de';
    this.observations.value = [];
    this.patientResource = {} as Patient;
    this.currentObservation = {} as Observation;
    this.persist();
  }

  /**
   * Gets the patient resource from the store.
   * @returns
   */
  public getPatient(): Patient {
    return this.patientResource;
  }

  public getObservations() {
    return this.observations
  }

  /**
   * Creates a new Observation
   * @param _status
   * @param bodySite
   * @param value
   * @returns
   */
  public createObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.midata
        .createObservation(_status, bodySite, value)
        .then((result) => {
          if (result) {
            this.midata
              .loadObservations()
              .then((res) => {
                this.observations.value = res
                this.persist();
                Notify.create({
                  message: 'Observation erfolgreich gespeichert',
                  color: 'green',
                  position: 'top',
                  icon: 'announcement',
                });
                resolve(result);
              })
              .catch((error) => reject(error));
          } else {
            Notify.create({
              message: 'Die Observation konnte nicht erstellt werden',
              color: 'red',
              position: 'top',
              icon: 'announcement',
            });
            reject('Error');
          }
        })
        .catch((error) => reject(error));
    });
  }

  /**
   *
   * @param _id
   * @param bodySite
   * @param value
   * @param observationStatus
   * @returns
   */
  public updateObservation(
    _id: string,
    bodySite: string,
    value: number,
    observationStatus: ObservationStatus = ObservationStatus.PRELIMINARY
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.midata
        .updateObservation(_id, bodySite, value, observationStatus)
        .then((result) => {
          if (result) {
            this.midata
              .loadObservations()
              .then((res) => {
                this.observations.value = res
                this.persist();
                Notify.create({
                  message: 'Observation erfolgreich bearbeitet',
                  color: 'green',
                  position: 'top',
                  icon: 'announcement',
                });
                resolve(result);
              })
              .catch((error) => reject(error));
          } else {
            Notify.create({
              message: 'Die Observation konnte nicht bearbeitet werden',
              color: 'red',
              position: 'top',
              icon: 'announcement',
            });
            reject('Error');
          }
        })
        .catch((error) => reject(error));
    });
  }

  /**
   *
   * @param _id
   */
  public setCurrentObservation(_id: string): void {
    void this.midata.searchWithId('Observation', _id).then((result) => {
      this.currentObservation = result as Observation;
      this.persist();
    });
  }

  /**
   *
   * @returns
   */
  public getCurrentObservation(): Observation {
    return this.currentObservation;
  }
}
