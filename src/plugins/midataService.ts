import { JSOnFhir } from '@i4mi/js-on-fhir';
import {
  Patient,
  Bundle,
  Immunization,
  ImmunizationPerformer,
  Organization,
  Practitioner,
  BundleEntry,
  ImmunizationStatus,
  integer,
  NarrativeStatus
} from '@i4mi/fhir_r4';

export const vaccinationsMidata = []

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
   * creates rows for the table in the overview tab out of the immunizations in MIDATA
   * @param vaccinations a list with all immunizations
   */
  createVaccinationTable(vaccinations: Array<Immunization>): void {

    this.immunizations = vaccinations

    interface midataRow {
      name: string,
      vaccinationdate: string,
      primarysource: boolean,
      lotNo: string,
      expirationDate: string,
      site: string,
      occurrenceString: string,
      route: string,
      doseQuantity: string,
      dosageno: string,
      practicioner: string,
      note: string,
      platform: Array<string>,
      protection: string,
    }

    this.immunizations.forEach(element => {
      const miRow: midataRow = {
        name: ifVacUndefined(element),
        dosageno: ifDoseNumUndefined(element),
        platform: ['Midata'],
        lotNo: element.lotNumber,
        protection: '',
        vaccinationdate: element.occurrenceString,
        practicioner: ifPerformerUndefined(element),
        doseQuantity: 'test dose quantity',
        expirationDate: element.expirationDate,
        occurrenceString: element.occurrenceString,
        route: 'test route',
        note: 'test note',
        primarysource: element.primarySource,
        site: 'test site',
      }
      vaccinationsMidata.push(miRow)
    });

    /**
     * check if the Performer is defined. If not, set the value as a string.
     * @returns string with Performer's  name
     */
    function ifPerformerUndefined(element: Immunization) {
      if (element.performer === undefined) {
        return 'Undefined'
      }
      else {
        return element.performer[0].actor.display
      }

    }
    /**
     * check if the Vaccination is defined. If not, set the value as a string.
     * @returns name of the vaccin
     */
    //check if the element Vaccination name is defined. If not, set the value as  a string.
    function ifVacUndefined(element: Immunization) {
      if (element.performer === undefined) {
        return 'Undefined'
      }
      else {
        return element.vaccineCode.coding[0].code
      }

    }

    /**
     * check if the Dosis number is defined. If not, set the value as a string.
     * @returns Dosis number
     */
    function ifDoseNumUndefined(element: Immunization,) {
      if (element.protocolApplied === undefined) {
        return 'Undefined'
      }
      else {
        return element.protocolApplied[0].doseNumberPositiveInt.toString()
      }
    }
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
    * Gets the Immunization resources as bundle from the fhir endpoint.
    * @returns bundle with Immunization resources as JSON.
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
  * Creates a Immunization  resource on the fhir server
  *              - if successfull -> response with the created resource as JSON
  *              - if not successfull -> error message
  */

  public createImmunization(immun?: Immunization
  ): Promise<Immunization> {
    let immunization: Immunization
    return new Promise((resolve, reject) => {
      if (immun)
        immunization = immun;
      else
        immunization = this.newImmunization();
      this.jsOnFhir.create(immunization).then((result) => {
        result ? resolve(result as Immunization) : reject('internal error');
      }).catch((error) => reject(error));
    });
  }



  /**
   * Creates a new Immunization  esources with the parameters from Vaccination aquisition UI
   */
  newImmunization(impfstoffname?: string, protection?: string, dosisnumber?: integer, lotnumber?: string, date?: string, performer?: string): Immunization {
    return {

      resourceType: 'Immunization',
      id: '8227-Immunization',
      meta: {
        profile: [
          'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-immunization'
        ]
      },
      text: {
        status: NarrativeStatus.ADDITIONAL,
        div: "<div xmlns='http://www.w3.org/1999/xhtml'><p><b>Generated Narrative</b></p><div style='display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%'><p style='margin-bottom: 0px'>Resource '7-4-Immunization' </p><p style='margin-bottom: 0px'>Profile: <a href='StructureDefinition-ch-vacd-immunization.html'>CH VACD Immunization Profile</a></p></div><p><b>identifier</b>: id: 34567</p><p><b>status</b>: completed</p><p><b>vaccineCode</b>: Boostrix <span style='background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki'> (<a href='CodeSystem-ch-vacd-swissmedic-cs.html'>Swiss Medic Authorized Vaccines Codesystem</a>#637)</span></p><p><b>patient</b>: <a href='#Patient_3-1-Patient'>See above (Patient/3-1-Patient)</a></p><p><b>occurrence</b>: 2015-11-01T00:00:00+01:00</p><p><b>recorded</b>: 2015-11-01T00:00:00+01:00</p><p><b>lotNumber</b>: 12-34244</p><p><b>route</b>: Intramuscular use <span style='background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki'> (standardterms.edqm.eu#20035000)</span></p><h3>Performers</h3><table class='grid'><tr><td>-</td><td><b>Actor</b></td></tr><tr><td>*</td><td><a href='#PractitionerRole_6-2-PractitionerRole'>See above (PractitionerRole/6-2-PractitionerRole)</a></td></tr></table><h3>ProtocolApplieds</h3><table class='grid'><tr><td>-</td><td><b>TargetDisease</b></td><td><b>DoseNumber[x]</b></td></tr><tr><td>*</td><td>Diphtheria caused by Corynebacterium diphtheriae (disorder) <span style='background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki'> (<a href='https://browser.ihtsdotools.org/'>SNOMED CT</a>#397430003)</span>, Tetanus (disorder) <span style='background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki'> (<a href='https://browser.ihtsdotools.org/'>SNOMED CT</a>#76902006)</span>, Pertussis (disorder) <span style='background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki'> (<a href='https://browser.ihtsdotools.org/'>SNOMED CT</a>#27836007)</span></td><td>1</td></tr></table></div>"
      },
      identifier: [
        {
          system: 'urn:oid:2.16.756.5.30.1.147.1.3.1',
          value: '34567'
        }
      ],
      status: ImmunizationStatus.COMPLETED,

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

      vaccineCode: {
        coding: [
          {
            system: 'urn:oid:1.2.36.1.2001.1005.17',
            code: impfstoffname || 'FLUVAX',
          }
        ],

      },

      occurrenceDateTime: '2022-10-05',

      lotNumber: lotnumber || 'AAJN11K',
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
        reference: this.jsOnFhir.getPatient(),
      },



      occurrenceString: '2022-02-16',

      route: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration',
            code: 'IM',
            display: 'Injection, intramuscular'
          }
        ]
      },

      protocolApplied: [
        {
          targetDisease: [
            {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '38907003',
                  display: protection || 'Windpocken'
                  // display: 'Windpocken'
                }
              ]
            }
          ],
          doseNumberString: '',
          doseNumberPositiveInt: dosisnumber.toString() || '0'
        }
      ],
    }
  }
}











