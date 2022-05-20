import MidataService from './midataService';
import EpdService from './epdService';
import {
  Observation,
  ObservationStatus,
  Patient, Immunization, ImmunizationPerformer, Condition, AllergyIntolerance
} from '@i4mi/fhir_r4';
import { Notify } from 'quasar';
import { reactive } from 'vue'

const STORAGE_KEY = 'demo-app-storage';


export const vaccination = reactive({
  vaccination: {
    instance: {
      epd: false,
      midata: false
    },
    name: '',
    protections: [
      { chickenpox: false },
      { measles: false },
      { mumps: false },
      { rubella: false },
      { hepA: false },
      { hepB: false },
      { fsma: false },
      { tetanus: false },
    ],
    doseNo: '',
    lotNo: '',
    dateTime: '',
    practicioner: '',
  }
})

export const vaccinations = reactive({
  id: [{ id: 0, vaccination: vaccination }]
})

export default class Storage {

  private currentLanguage = 'de';
  private currentObservation: Observation
  private observations = new Array<Observation>();

  private patientResource = {} as Patient;
  private performerResource = {} as ImmunizationPerformer;

  private currentImmunization = {} as Immunization;
  private immunizations = new Array<Immunization>();

  private medicalProblem = {} as Condition;
  private medicalProblems = new Array<Condition>();

  private pastIllness = {} as Condition;
  private pastIllnesses = new Array<Condition>();

  private allergy = {} as AllergyIntolerance;
  private allergies = new Array<AllergyIntolerance>();

  midata: MidataService;
  epd: EpdService;

  constructor(_midataService: MidataService, _epdService: EpdService) {
    this.midata = _midataService;
    this.restoreFromStorage();
    this.epd = _epdService;
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
      this.immunizations = storage.immunizations;
      this.medicalProblems = storage.medicalProblems;
      this.pastIllnesses = storage.pastIllnesses;
      this.allergies = storage.allergies;
      this.performerResource = storage.performerResource;
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
          this.observations = results[1] as Array<Observation>;
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
    this.observations = new Array<Observation>();
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

  /**
   * Gets all Observation from the store.
   * @returns
   */
  public getObservations(): Array<Observation> {
    return this.observations;
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
                this.observations = res as Array<Observation>;
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
   * @returns
   */
  public updateObservation(
    _id: string,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.midata
        .updateObservation(_id, bodySite, value)
        .then((result) => {
          if (result) {
            this.midata
              .loadObservations()
              .then((res) => {
                this.observations = res as Array<Observation>;
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
   */
  public setCurrentObservation(_id: string): void {
    void this.midata.search('Observation/' + _id).then((result) => {
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
