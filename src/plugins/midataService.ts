import { JSOnFhir } from '@i4mi/js-on-fhir';
import {
  Patient,
  Bundle,
  Immunization,
  ImmunizationPerformer,
  Organization,
  Practitioner,
  BundleEntry,
  ObservationStatus,
  Observation,
  ImmunizationStatus,
  date
} from '@i4mi/fhir_r4';
import moment from 'moment';
import { storage } from 'src/boot/plugins';
import { number } from '@intlify/core-base';

export const vaccinationsMidata = []



// import moment library. More information under https://momentjs.com
const now = moment();

export default class MidataService {
  jsOnFhir: JSOnFhir
  practitioner: Practitioner
  loggedIn: false
  currentPatient: Patient
  immunization: Immunization
  immunizationPerformer: ImmunizationPerformer
  organization: Organization
  patientSpid: string
  immunizations: Array<Immunization>
  currentVACDRecord: Bundle
  immunizationResource: BundleEntry
  compositionResource: BundleEntry

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
  public authenticate(params?: Record<string, unknown>): void {
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
        .search('Patient', { _id: this.jsOnFhir.getPatient() })
        .then((result) => {
          const patientBundle = result as Bundle;
          (patientBundle.entry?.length !== undefined && patientBundle.entry?.length > 0 && patientBundle.entry[0].resource)
            ? resolve(patientBundle.entry[0].resource as Patient)
            : reject('No entry in patient bundle found!');
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
          const observationBundle = result as Bundle;
          observationBundle.entry?.length > 0
            ? resolve(observationBundle)
            : reject('No entries in observation bundle found!');
        })
        .catch((error) => reject(error));
    });
  }

  createVaccinationTable(vaccinations: Array<Immunization>): void {

    this.immunizations = vaccinations
    // interface Row {
    //   name: string,
    //   lotNo: string,
    //   protection: string,
    //   dosageno: string,
    //   vaccinationdate: string,
    //   practicioner: string,
    //   platform: Array<string>,
    // }
    interface midataRow {
      name: string,
      // date: string,
      vaccinationdate: string,
      primarysource: boolean,
      lotNo: string,
      expirationDate: string,
      site: string,
      occurrenceString: string,
      route: string,
      doseQuantity: string,
      dosageno: string,
      // performer:string,
      practicioner:string | 'Not Registered',
      note:string,
      platform: Array<string>,
      protection: string,
    }

    this.immunizations.forEach(element => {


      const miRow: midataRow = {
      name: setVacUndefined(element),//element.vaccineCode.coding[0].code,
      dosageno: '1', // Immunization Sources online still no dosage numer implemented.
      platform: ['Midata'],
      lotNo: element.lotNumber,
      protection: element.vaccineCode.text,
      vaccinationdate: element.occurrenceString,
      practicioner: setPerformerUndefined(element),

      //not used in Overview.
      doseQuantity: 'test dose quantity',   // JSON.stringify(element.doseQuantity.value),
      expirationDate: element.expirationDate,
      occurrenceString: element.occurrenceString,
      route:'test route',  //JSON.stringify(element.route.coding[0].display),
      note:'test note', //JSON.stringify(element.note[0].text)
      primarysource: element.primarySource,
      site:'test site',// JSON.stringify(element.site.coding[0].display), // not sure if this works

      }
      vaccinationsMidata.push(miRow)


    });

    //check if the Performer is defined. If not, set the value as a string.
    function setPerformerUndefined(element:Immunization){

      if(element.performer === undefined){
           return ''}
      else{
            return element.performer[0].actor.display
      }

    }
    //check if the element Vaccination name is defined. If not, set the value as  a string.
    function setVacUndefined(element:Immunization){
      if(element.vaccineCode.coding === undefined){
           return ''}
      else{
            return element.vaccineCode.coding[0].code
      }

    }




  }


  /**
   * Gets all observations from the fhir endpoint.
   * @returns bundle with observations
   */
  public loadObservations() {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.search('Observation').then((result) => {
        result
          ? resolve(
            (result as Bundle).entry?.map(
              (entry) => entry.resource as Observation
            ) || []
          )
          : reject('Error');
      }).catch((error) => reject(error));
    });
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
      }).catch((error) => reject(error));
    });
  }

  /**
   * Creates a observation (of type bodytemperature) resource on the fhir server
   * @param _status the status of the observation according to: http://hl7.org/fhir/observation-status
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @returns a promise:
   *              - if successfull -> response with the created resource as JSON
   *              - if not successfull -> error message
   */
  public createObservation(
    _status: ObservationStatus,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      const observation = this.newBtObservation(_status, bodySite, value);
      this.jsOnFhir.create(observation).then((result) => {
        result ? resolve(result as Observation) : reject('internal error');
      }).catch((error) => reject(error));
    });
  }

  /**
   * Updates a observation (of type bodytemperature) resource on the fhir server.
   * @param _id identification for the observation to be updated.
   * @param bodySite the body site where the bodytemperature was measured.
   * @param value the measured body temperature value.
   * @returns a promise:
   *              - if successfull -> response with the updated resource as JSON
   *              - if not successfull -> error message
   */
  updateObservation(
    _id: string,
    bodySite: string,
    value: number
  ): Promise<Observation> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir.search('Observation/' + _id).then((result) => {
        if (result) {
          const fhirObservation = result as Observation;
          fhirObservation.valueQuantity.value = value;
          fhirObservation.bodySite = this.getBodySite(bodySite);
          fhirObservation.method = this.getMethod(bodySite);
          fhirObservation.issued = now.format();
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
      }).catch((error) => reject(error));
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
        reference: 'Patient/' + this.jsOnFhir.getPatient(),
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
  * Helper function that creates a bodySite object to be used in an observation.
  * @param bodySite the body site where the bodytemperature was measured.
  * @returns bodySite with coding as JSON.
  */
  getBodySite(bodySite: string) {
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
      default:
        return {
          coding: [
            {
              system: 'http://loinc.org',
              code: 'LA9370-3',
              display: 'Axillary',
            },
          ],
        };
    }
  }

  /**
  * Helper function that creates a Method of measurement to be used in an observation.
  * @param bodySite the body site where the bodytemperature was measured.
  * @returns method of temperature taking with coding as JSON.
  */
  getMethod(bodySite: string) {
    switch (bodySite) {
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
      case 'Tympanic membrane':
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




  /**
    * ---------------------------------------------------------------
    * Gets the Immunization resources as bundle from the fhir endpoint.
    * @returns bundle with Immunization resources as JSON.
    * ----------------------------------------------------------------
    */
  getImmunizationResourcesAsBundle(): Promise<Bundle> {
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('Immunization')
        .then((result) => {
          const immunizationBundle = result as Bundle;

          immunizationBundle.entry?.length > 0
            ? resolve(immunizationBundle)
            : reject('No entries in Immunization bundle found!');
        })
        .catch((error) => reject(error));
    });
  }

  /**
    * Gets all immunizations from the fhir endpoint.
    * @returns bundle with Immunizations
    */
  public loadImmunizations() {

    return new Promise((resolve, reject) => {
      this.jsOnFhir.search('Immunization').then((result) => {
        result
          ? resolve(
            (result as Bundle).entry?.map(
              (entry) => entry.resource as Immunization
            ) || []
          )
          : reject('Error');
      }).catch((error) => reject(error));
    });
  }

  /**
  * Creates a Immunization (of type bodytemperature) resource on the fhir server
  *              - if successfull -> response with the created resource as JSON
  *              - if not successfull -> error message
  */
  public createImmunization(
  ): Promise<Immunization> {
    return new Promise((resolve, reject) => {
      const immunization = this.newImmunization();
      this.jsOnFhir.create(immunization).then((result) => {
        result ? resolve(result as Immunization) : reject('internal error');
      }).catch((error) => reject(error));
    });
  }

  /**
* Creates immunization with status (compleated as default), vacination code, patient, date, lot number, performer and dose quantity
*/
  // newImmunization(): Immunization {
  //   return {

  //     resourceType: 'Immunization',
  //     status: ImmunizationStatus.COMPLETED,

  //     /**
  //     * vacinationCode: string
  //     * dateAndTime: date
  //     * primarySource: booleam
  //     * lotnumber:string
  //     * expirationDate:date
  //     * site: array ( hast to have part of the body and a code)
  //     */

  //     /**
  //      * Needded for display
  //      * Vac Name
  //      * Platform
  //      * LotNumber
  //      * Schutz
  //      * Dosisnumber
  //      * Update Date
  //      * Practitioner
  //      */

  //     vaccineCode: {
  //       coding: [
  //         {
  //           system: 'urn:oid:1.2.36.1.2001.1005.17',
  //           code: 'FLUVAX',
  //         }
  //       ],
  //       text: 'Fluvax (In fluenza)',
  //     },

  //     occurrenceDateTime: '2013-01-10',
  //     primarySource: true,
  //     lotNumber: 'AAJN11K',
  //     expirationDate: '2015-02-15',

  //     site: {
  //       coding: [
  //         {
  //           system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite',
  //           code: 'LA',
  //           display: 'left arm'
  //         }
  //       ]
  //     },

  //     patient: {
  //       display: '',
  //       reference: 'Patient/' + this.jsOnFhir.getPatient(),
  //     },

  //     occurrenceString: '2022-02-16',

  //     route: {
  //       coding: [
  //         {
  //           system: 'http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration',
  //           code: 'IM',
  //           display: 'Injection, intramuscular'
  //         }
  //       ]
  //     },


  //     doseQuantity: {
  //       value: 5,
  //       system: 'http://unitsofmeasure.org',
  //       code: 'mg'
  //     },


  //     performer: [
  //       {
  //         actor: {
  //           identifier:
  //           {
  //             system: 'http://www.gs1.org/gln',
  //             value: '7640166732204'
  //           },
  //           display: 'Dr. med. Hanspeter Wenger'
  //         }
  //       }
  //     ],
  //     note: [
  //       {
  //         text: 'if you are reading this, your code worked'
  //       }
  //     ]



  //   };
  // }


  newImmunization(impstoffname?:string, platform?:string, lotnummer?:string, schutz?:string, verabreichung?:string, performer?:string): Immunization {

    return {

      resourceType: 'Immunization',
      status: ImmunizationStatus.COMPLETED,

      /**
      * vacinationCode: string
      * dateAndTime: date
      * primarySource: booleam
      * lotnumber:string
      * expirationDate:date
      * site: array ( hast to have part of the body and a code)
      */

      /**
       * Needded for display
       * Vac Name
       * Platform
       * LotNumber
       * Schutz
       * Dosisnumber
       * Update Date
       * Practitioner
       */

      vaccineCode: {
        coding: [
          {
            system: 'urn:oid:1.2.36.1.2001.1005.17',
            code: impstoffname ||'FLUVAX',
          }
        ],
        text: schutz || 'Fluvax (In fluenza)',
      },

      occurrenceDateTime: verabreichung || '2013-01-10',
      primarySource: true,
      lotNumber: lotnummer || 'AAJN11K',
      expirationDate: '2015-02-15',

      site: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite',
            code: 'LA',
            display: 'left arm'
          }
        ]
      },

      patient: {
        display: '',
        reference: 'Patient/' + this.jsOnFhir.getPatient(),
      },

      occurrenceString: verabreichung||'2022-02-16',

      route: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration',
            code: 'IM',
            display: 'Injection, intramuscular'
          }
        ]
      },


      doseQuantity: {
        value: 5,
        system: 'http://unitsofmeasure.org',
        code: 'mg'
      },


      performer: [
        {
          actor: {
            identifier:
            {
              system: 'http://www.gs1.org/gln',
              value: '7640166732204'
            },
            display: performer || 'Dr. med. Hanspeter Wenger'
          }
        }
      ],
      note: [
        {
          text: ''
        }
      ]




    };
  }


  /**
  * Helper function that creates a Method of measurement to be used in an observation.
  * @param bodySite the body site where the bodytemperature was measured.
  * @returns method of temperature taking with coding as JSON.
  */
  getImmunizationSite(bodySite: string) {
    switch (bodySite) {
      case 'left arm':
        return {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite',
              code: 'LA',
              display: 'left arm'
            }
          ]
        };
      case 'left gluteus':
        return {

          system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite',
          code: 'LG',
          display: 'left gluteus medius'


        };
      case 'right gluteus':
        return {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite',
          code: 'RG',
          display: 'right gluteus medius'
        };
      case 'right arm':
        return {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite',
          code: 'RA',
          display: 'right arm'
        };
      default:
        return {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ActSite',
          code: '_HumanSubstanceAdministrationSite',
          display: 'Human Substance Administration Site'

        };
    }
  }



}




