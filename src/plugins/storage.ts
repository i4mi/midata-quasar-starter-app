import MidataService, { ObservationType } from './midataService';
import { Observation, ObservationStatus, Patient } from '@i4mi/fhir_r4';
import { copyToClipboard, Notify } from 'quasar';

const STORAGE_KEY = 'demo-app-storage';

export default class Storage {

  private currentLanguage = 'de';
  private patientResource = {} as Patient;
  private currentObservation = {} as Observation;
  private observations = [] as Observation[];

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
      this.observations = storage.observations;
      this.patientResource = storage.patientResource;
    } else if (this.midata.isLoggedIn()) {
      void this.restoreFromMidata();
    } else {
      console.log('Could not restore from storage. Log in first.');
    }
  }

  /**
   * Restores data from the midata server.
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
          this.observations = results[1]
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
    this.observations = [];
    this.patientResource = {} as Patient;
    this.currentObservation = {} as Observation;
    this.persist();
  }

  /**
   * Gets the patient resource from the store.
   * @returns Fhir patient resource.
   */
  public getPatient(): Patient {
    return this.patientResource;
  }

  /**
   * Gets all the observations from the store.
   * @returns Array of observations.
   */
  public getObservations(): Observation[] {
    return this.observations
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
   *              - if successfull -> Midata server observation resource response.
   *              - if not successfull -> Error response.
   */
  public createObservation(
    _status: ObservationStatus,
    bodySite: string,
    values: number[],
    observationType: ObservationType
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.midata
        .createObservation(_status, bodySite, values, observationType)
        .then((result) => {
          if (result) {
            this.midata
              .loadObservations()
              .then((res) => {
                this.observations = res
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
   * Updates an Observation with a new value and bodySite. Changes the issued
   * date to the current date and time
   * @param _id Midata id of the Observation
   * @param bodySite String representing the bodySite of the Observation.
   * Needs to be present in the fhirData.json file
   * @param values Observation Value or Values with multivalued Observations
   * @param observationType Type of the Observation (ObservationType enum)
   * @param observationStatus Status of the Observation. Default is PRELIMINARY.
   * A deleted Observation gets the type ENTERED_IN_ERROR
   * @returns a promise:
   *              - if successfull -> Midata server observation resource response.
   *              - if not successfull -> Error response.
   */
  public updateObservation(
    _id: string,
    bodySite: string,
    values: number[],
    observationType: ObservationType,
    observationStatus: ObservationStatus = ObservationStatus.PRELIMINARY
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.midata
        .updateObservation(_id, bodySite, values, observationType, observationStatus)
        .then((result) => {
          if (result) {
            this.midata
              .loadObservations()
              .then((res) => {
                this.observations = res
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
   * Sets the selected observation. Used to observations them in the UI
   * @param _id Midata id of the observation.
   */
  public setCurrentObservation(_id: string): void {
    void this.midata.searchWithId('Observation', _id).then((result) => {
      this.currentObservation = result as Observation;
      this.persist();
    });
  }

  /**
   * Retrieves the selected observation
   * @returns Observation object
   */
  public getCurrentObservation(): Observation {
    return this.currentObservation;
  }

  /**
   * Copies an item to the clipboard in JSON-Format.
   * @param item Item that should be copied to the clipboard. Preferably
   * a JSON Object or a string.
   * @param label Label to display in the quasar notify component.
   */
  public copyToClipBoard(item: any, label = 'Resource') {
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
}
