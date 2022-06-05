import MidataService from './midataService';
import { Immunization, Patient } from '@i4mi/fhir_r4';
import { Notify } from 'quasar';

const STORAGE_KEY = 'demo-app-storage';


export default class Storage {

  private currentLanguage = 'de';
  private patientResource = {} as Patient;
  private immunizations = new Array<Immunization>();

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
      this.immunizations = storage.immunizations;
      this.patientResource = storage.patientResource;
      this.immunizations = storage.immunizations;

    } else if (this.midata.isLoggedIn()) {
      void this.restoreFromMidata();
    } else {
      console.log('Could not restore from storage. Log in first.');
    }

  }
  /**
    * Gets all Immunizations from the store.
    * @returns
    */
  public getImmunizations(): Array<Immunization> {
    return this.immunizations;

  }
  /**
   * restores the data from MIDATA
   * 
   * @returns a promise:
   *              - if successfull -> the patient, the immunizations, and the rows for the vaccination table
   *              - if not successfull -> an Error
   */
  public restoreFromMidata(): Promise<void> {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.midata.getPatientResource(),
        this.midata.loadImmunizations(),
      ])
        .then((results) => {
          this.patientResource = results[0];
          this.immunizations = results[1] as Array<Immunization>;
          this.midata.createVaccinationTable(this.getImmunizations())
          this.persist()
          resolve()
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
    this.patientResource = {} as Patient;
    this.persist();
  }

  /**
   * Gets the patient resource from the store.
   * @returns a patient as a Patient
   */
  public getPatient(): Patient {
    return this.patientResource;
  }

  /**
   * creates a new Immunization
   * @returns a promise:
   *              - if successfull -> the immunization
   *              - if not successfull -> an Error
   */
  public createImmunization(): Promise<Immunization> {
    return new Promise((resolve, reject) => {
      this.midata
        .createImmunization()
        .then((result) => {
          if (result) {
            this.midata
              .loadImmunizations()
              .then((res) => {
                this.immunizations = res as Array<Immunization>;
                this.persist();
                Notify.create({
                  message: 'Immunization erfolgreich gespeichert',
                  color: 'green',
                  position: 'top',
                  icon: 'announcement',
                });
                resolve(result);
              })
              .catch((error) => reject(error));
          } else {
            Notify.create({
              message: 'Die Immunization konnte nicht erstellt werden',
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


}
