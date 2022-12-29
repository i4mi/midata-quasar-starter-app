import { JSOnFhir } from '@i4mi/js-on-fhir';
import { Bundle, Observation, ObservationStatus, Patient } from '@i4mi/fhir_r4';
import moment from 'moment';
import { ObservationType } from 'src/plugins/storage';

// import moment library. More information under https://momentjs.com
const now = moment();

export default class MidataService {
  jsOnFhir: JSOnFhir;

  constructor() {
    this.jsOnFhir = new JSOnFhir(
      process.env.VUE_FHIR_BASE_URL,
      process.env.VUE_FHIR_APP_NAME,
      process.env.VUE_FHIR_REDIRECT_URL
    );
  }

  /**
   * Returns the jsOnFhir object for making direct method calls.
   * @returns the jsOnFhir as JSON.
   */
  public getJSonFhir(): JSOnFhir {
    return this.jsOnFhir;
  }

  /**
   * Checks that the token isn't empty and hasn't expired yet. Therefore returns the status of the login status.
   * @returns true if the user is logged in (token valid and not expired yet) and false otherwise.
   */
  public isLoggedIn(): boolean {
    return this.jsOnFhir.isLoggedIn();
  }

  /**
   * Logs the user out by resetting authentification details.
   */
  public logout(): void {
    this.jsOnFhir.logout();
  }

  /**
   * Initiates the oAuth process.
   * @param params
   */
  public authenticate(params?: {[p: string]: string}): void {
    this.jsOnFhir.authenticate(params);
  }

  /**
   * Handles the response of oAuth portal (server).
   * @returns a promise:
   *              - if successfull -> response of the oAuth portal (server) includes: token, refreshtoken etc.
   *              - if not successfull -> error response.
   */
  public handleAuthResponse(): Promise<any> {
    return this.jsOnFhir.handleAuthResponse();
  }

  /**
   * Gets the patient resource from the fhir endpoint.
   * @returns patient resource as JSON
   */
  public getPatientResource(): Promise<Patient> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .getResource('Patient', this.jsOnFhir.getUserId())
        .then((result) => {
          if (result.resourceType === 'Patient'){
            resolve(result as Patient)
          }
          else {
            reject('No Patient resource found');
          }
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Gets the observation resources as bundle from the fhir endpoint.
   * @returns bundle with observation resources as JSON.
   */
  getObservationResourcesAsBundle(): Promise<Bundle> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Observation')
        .then((result) => {
          result.entry?.length > 0
            ? resolve(result)
            : reject('No entries in observation bundle found!');
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * Gets all observations from the fhir endpoint that do not have the status
   * "ENTERED_IN_ERROR"
   * @returns bundle with observations
   */
  public async loadObservations() {
      const result = await this.jsOnFhir.search('Observation');
      const observations = result.entry?.map(entry => entry.resource as Observation) || [];
      return observations.filter(obs => obs.status !== ObservationStatus.ENTERED_IN_ERROR);
  }

  /**
   * searches the fhir endpoint for one or more resources.
   * @param resourceType resource type to look up
   * @param params search parameters according to fhir resource guide (not mandatory)
   * @returns a promise:
   *              - if successfull -> response with resource(s) as JSON
   *              - if not successfull -> error message
   */
  search(resourceType: any, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.search(resourceType, params).then((result) => {
        result ? resolve(result) : reject('Error');
      }).catch((error)=> reject(error));
    });
  }

  /**
   * searches the fhir endpoint for one resource with the id.
   * @param resourceType resource type to look up
   * @param _id The id of the fhir resource
   * @returns a promise:
   *              - if successfull -> response with resource(s) as JSON
   *              - if not successfull -> error message
   */
  searchWithId(resourceType: any, _id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.getResource(resourceType, _id).then((result) => {
        result ? resolve(result) : reject('Error');
      }).catch((error)=> reject(error));
    });
  }

  /**
   * Creates a observation (of type bodytemperature) resource on the fhir server
   * @param _status the status of the observation according to: http://hl7.org/fhir/observation-status
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @param observationType Type of the Observation that should be created
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
  public createObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number,
    observationType: ObservationType
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {

      let observation;
      if (observationType == ObservationType.BODY_TEMPERATURE){
        observation = this.newBtObservation(_status, bodySite, value);
      }
      else if (observationType == ObservationType.HEART_RATE){
        observation = this.newHrObservation(_status, bodySite, value);
        console.log(observation)
      }
      else {
        throw new Error('No matching ObservationType found')
      }
      this.jsOnFhir.create(observation).then((result) => {
        result ? resolve(result as Observation) : reject('internal error');
      }).catch((error)=> reject(error));
    });
  }

  /**
   * Updates a observation (of type bodytemperature) resource on the fhir server.
   * @param _id identification for the observation to be updated.
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @param observationStatus optional status for Observation. Default is ObservationStatus.PRELIMINARY
   * @returns a promise:
   *              - if successfull -> response with the updated resource as JSON
   *              - if not successfull -> error message
   */
  updateObservation(
    _id: string,
    bodySite: string,
    value: number,
    observationStatus: ObservationStatus = ObservationStatus.PRELIMINARY
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.getResource('Observation', _id).then((result) => {
        if (result) {
          const fhirObservation = result as Observation;
          fhirObservation.valueQuantity.value = value;
          fhirObservation.bodySite = this.getBodySite(bodySite);
          fhirObservation.method = this.getMethod(bodySite);
          fhirObservation.issued = now.format();
          fhirObservation.status = observationStatus
          this.jsOnFhir
            .update(fhirObservation)
            .then((res) => {
              resolve(res as Observation);
            })
            .catch((error: Error) => {
              console.warn('Could not update observation ' + _id, error);
              reject(error);
            });
        } else {
          reject(
            new Error(
              'Invalid observation id: Observation ' + _id + ' was not found.'
            )
          );
        }
      }).catch((error)=> reject(error));
    });
  }

  /**
   * Creates observation (of type Bodytemperature) where you can specify the status, bodySite and value.
   * @param _status the status of the observation according to: http://hl7.org/fhir/observation-status
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @returns
   */
  newBtObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number
  ): Observation {
    return {
      resourceType: 'Observation',
      status: _status,
      category: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8310-5',
            display: 'Body temperature',
          },
        ],
        text: 'Temperature',
      },
      subject: {
        reference: 'Patient/' + this.jsOnFhir.getUserId(),
      },
      issued: now.format(),
      performer: [
        {
          reference: 'Practitioner/mdh0us3',
        },
      ],
      valueQuantity: {
        value: value,
        unit: 'degrees C',
        system: 'http://unitsofmeasure.org',
        code: 'Cel',
      },
      bodySite: this.getBodySite(bodySite),
      method: this.getMethod(bodySite),
    };
  }

  /**
   * Creates observation (of type Heart Rate) where you can specify the status, bodySite and value.
   * @param _status the status of the observation according to: http://hl7.org/fhir/observation-status
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @returns
   */
  newHrObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number
  ): Observation {
    return {
      resourceType: 'Observation',
      status: _status,
      category: [
        {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/observation-category',
              code: 'vital-signs',
              display: 'Vital Signs',
            },
          ],
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8867-4',
            display: 'Heart rate',
          },
        ],
        text: 'Heart rate',
      },
      subject: {
        reference: 'Patient/' + this.jsOnFhir.getUserId(),
      },
      issued: now.format(),
      performer: [
        {
          reference: 'Practitioner/mdh0us3',
        },
      ],
      valueQuantity: {
        value: value,
        unit: '{beats}/min',
        system: 'http://unitsofmeasure.org',
        code: '{beats}/min',
      },
      bodySite: this.getBodySite(bodySite),
      method: this.getMethod(bodySite),
    };
  }

  /**
   * Helper function that creates a bodySite object to be used in an observation.
   * @param bodySite the body site where the Observation (of type
   * BodyTemperature or Heart Rate) was measured.
   * @returns bodySite with coding as JSON.
   */
  getBodySite(bodySite: string) {

    //Body Temperature https://loinc.org/8327-9/
    switch (bodySite) {
      case 'Axillary':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Axillary',
            },
          ],
        };
      case 'Oral':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9367-9',
              display: 'Oral',
            },
          ],
        };
      case 'Ear':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA21929-7',
              display: 'Ear',
            },
          ],
        };
      case 'Tympanic membrane':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9368-7',
              display: 'Tympanic membrane',
            },
          ],
        };
      case 'Temporal artery (forehead)':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Temporal artery (forehead)',
            },
          ],
        };
      case 'Rectal':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Rectal',
            },
          ],
        };
      case 'Urinary bladder':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9371-1',
              display: 'Urinary bladder',
            },
          ],
        };
      case 'Nasal':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9263-0',
              display: 'Nasal',
            },
          ],
        };
      case 'Nasopharyngeal':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA18005-1',
              display: 'Nasopharyngeal',
            },
          ],
        };
      case 'Finger':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA11862-2',
              display: 'Finger',
            },
          ],
        };
      case 'Toe':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: '	LA21930-5',
              display: 'Toe',
            },
          ],
        };

      //HeartRate https://loinc.org/LL3627-8/
      case 'Brachial artery':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA24033-5',
              display: 'Brachial artery',
            },
          ],
        };
      case 'Carotid artery':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA24031-9',
              display: 'Carotid artery',
            },
          ],
        };
      case 'Dorsalis pedis artery':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: '	LA24034-3',
              display: 'Dorsalis pedis artery',
            },
          ],
        };
      case 'Femoral artery':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: '	LA24032-7',
              display: 'Femoral artery',
            },
          ],
        };
      case 'Posterior tibial artery':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: '	LA24035-0',
              display: 'Posterior tibial artery',
            },
          ],
        };
      case 'Radial artery':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: '	LA24030-1',
              display: 'Radial artery',
            },
          ],
        };
      case 'Cardiac apex':
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: '	LA21930-5',
              display: 'Cardiac apex',
            },
          ],
        };
      default:
        throw Error(`No Body site found matching the String ${bodySite}`)
    }
  }

  /**
   * Helper function that creates a Method of measurement to be used in an observation.
   * @param bodySite the body site where the Observation (of type
   * BodyTemperature or Heart Rate) was measured.
   * @returns method of temperature taking with coding as JSON.
   */
  getMethod(bodySite: string) {
    switch (bodySite) {

      //Bodytemperature https://browser.ihtsdotools.org/?perspective=full&conceptId1=56342008&edition=MAIN&release=&languages=en
      case 'Oral':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '89003005',
              display: 'Oral temperature taking (procedure)',
            },
          ],
        };
      case 'Tympanic membrane':
      case 'Ear':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '448093005',
              display:
                'Measurement of temperature using tympanic thermometer (procedure)',
            },
          ],
        };
      case 'Rectal':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '18649001',
              display: 'Rectal temperature taking (procedure)',
            },
          ],
        };

      //Heart Rate https://browser.ihtsdotools.org/?perspective=full&conceptId1=65653002&edition=MAIN&release=&languages=en
      case 'Brachial artery':
      case 'Femoral artery':
      case 'Posterior tibial artery':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '424411004',
              display: 'Peripheral pulse taking (procedure)',
            },
          ],
        };
      case 'Carotid artery':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '65653002',
              display: 'Pulse taking (procedure) ',
            },
          ],
        };
      case 'Dorsalis pedis artery':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '91161007',
              display: 'Pedal pulse taking (procedure) ',
            },
          ],
        };
      case 'Radial artery':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '72027000',
              display: 'Radial pulse taking (procedure)',
            },
          ],
        };
      case 'Cardiac apex':
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '4625008',
              display: ' Apical pulse taking (procedure)',
            },
          ],
        };
      default:
        return {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '56342008',
              display: 'Temperature taking (procedure)',
            },
          ],
        };
    }
  }
}
