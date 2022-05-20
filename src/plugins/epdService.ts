import { JSOnFhir } from '@i4mi/js-on-fhir';
import {
  Patient,
  Bundle,
  ObservationStatus,
  Observation,
  Immunization,
  ImmunizationPerformer,
  Condition, Organization,
  AllergyIntolerance,
  Practitioner,
  DocumentReference,
  BundleEntry,
  List,
  Resource,
  Coding,
  Composition
} from '@i4mi/fhir_r4';
import moment from 'moment';
import { EPR_SPID_OID, HOEHEWEG_OID, CURRENT_DOCUMENT, EPD_PLAYGROUND_OID } from './helpers';
import { reactive } from 'vue';
import { VACD_COMPOSITION_ENTRY, VACD_IMMUNIZATION_ENTRY, FHIR_DOCUMENT_BUNLDE, VACD_RECORD_DOCUMENT } from '../plugins/VACD RECORD DOCUMENT'
import { number } from '@intlify/core-base';

// import moment library. More information under https://momentjs.com
const now = moment();

export const loggedInPatient: { loggedIn: Patient | undefined } = reactive({ loggedIn: undefined })

export const vaccinations = []

export default class EpdService {
  jsOnFhir: JSOnFhir
  loggedIn: false
  practitioner: Practitioner
  currentPatient: Patient
  immunization: Immunization
  immunizationPerformer: ImmunizationPerformer
  organization: Organization
  patientSpid: string
  immunizations: Array<Immunization>

  vaccCodeName = new Map<string, number>([
    ['FSME-Immun CC', 450],
    ['Encepur N', 627],
    ['Inflexal V', 614],
    ['Poliorix', 669]
  ])

  diseaseCodeName = new Map<string, number>([
    ['Windpocken', 38907003],
    ['Masern', 14189004],
    ['Mumps', 36989005],
    ['Röteln', 36989005],
    ['Virale hepatitis, Typ A', 40468003],
    ['Virale hepatitis, Typ B', 66071002],
    ['Frühsommer-Miningoenzephalithis (FSME)', 32323003],
    ['Gelbfieber', 16541001],
    ['Starrkrampf', 76902006]
  ])


  constructor() {
    this.jsOnFhir = new JSOnFhir(
      'https://test.ahdis.ch/mag-bfh',
      'irr🐘', // get it? its irrELEVANT!
      'irr🐘',
      true
    );
  }

  /**
   * Gets the patient resource from the fhir endpoint.
   * @returns patient resource as JSON
   */
  getPatientResource(spid: string): void {
    const SEARCH_PARAMS = {

      // target system is the ID we want
      identifier: EPR_SPID_OID + '|' + spid,
    };

    this.jsOnFhir
      .search('Patient', SEARCH_PARAMS)
      .then((result) => {
        const bundle = result as Bundle;
        loggedInPatient.loggedIn = bundle.entry[0].resource as Patient
      })
  }

  /**
 * Gets the vaccination resources as bundle from the fhir endpoint.
 * @returns bundle with observation resources as JSON.
 */

  async getVaccinations(): Promise<void> {
    const SEARCH_PARAMS = {
      status: 'current',
      'patient.identifier': EPD_PLAYGROUND_OID + '|7de95899-1e73-4ee2-8632-13987ee67ed6'
    };

    const vaccinationRecordDocumentBundle = await this.getDocumentReference().then(res => {
      return res;
    });

    const docsAmount = vaccinationRecordDocumentBundle.entry.length

    console.log('Amount of current Documents: ', docsAmount)

    const vacdDocuments = vaccinationRecordDocumentBundle
      .entry

    const vacdVaccinationRecordDocuments = vacdDocuments.filter(document =>
      (document.resource as DocumentReference)
        .type
        .coding[0]
        .display === 'Impfausweis'
    )

    vacdVaccinationRecordDocuments.sort(function (a, b) {
      return new Date((b.resource as DocumentReference)
        .content[0]
        .attachment
        .creation).getTime() -
        new Date((a.resource as DocumentReference)
          .content[0]
          .attachment
          .creation).getTime();
    });

    const urlOfMostCurrentDocument = (vacdVaccinationRecordDocuments[0].resource as DocumentReference)
      .content[0]
      .attachment
      .url

    console.log('urlOfMostCurrentDocument: ', urlOfMostCurrentDocument)

    const response = await fetch(urlOfMostCurrentDocument);
    const data = await response.json();

    this.practitioner = data.entry.find((entry: BundleEntry) => {
      return entry
        .resource
        .resourceType === 'Practitioner'
    }).resource as Practitioner

    console.log('Practitioner ', this.practitioner)

    this.currentPatient = data.entry.find((entry: BundleEntry) => {
      return entry
        .resource
        .resourceType === 'Patient'
    }).resource as Patient

    console.log('Patient ', this.currentPatient)

    this.organization = data.entry.find((entry: BundleEntry) => {
      return entry
        .resource
        .resourceType === 'Organization'
    }).resource as Organization

    console.log('Organization ', this.organization)

    this.immunizations = data.entry.filter((entry: BundleEntry) => {
      return entry
        .resource
        .resourceType === 'Immunization'
    }).map(x => x.resource as Immunization)

    console.log('Immunizations ', this.immunizations)

    this.createVaccinationTable()
    //zuerst array mit allen imunizations und dann durch das array durchiterieren, practitioner etc dazuführen und dann in eigenes Objekt
  }

  async getDocumentReference(): Promise<Bundle> {
    const SEARCH_PARAMS = {
      status: 'current',
      'patient.identifier': EPD_PLAYGROUND_OID + '|7de95899-1e73-4ee2-8632-13987ee67ed6'
    };
    return new Promise((resolve, reject) => {
      this.jsOnFhir
        .search('DocumentReference', SEARCH_PARAMS)
        .then((result) => {
          const documentBundle = result as Bundle;
          documentBundle.entry?.length > 0
            ? resolve(documentBundle)
            : reject('No entries in bundle found!');
        })
        .catch((error) => reject(error));
    });
  }

  handleVaccinationResourcesAsBundle(): void {
    const vaccinationRecordDocumentBundle = this.getVaccinations();
  }

  createVaccinationTable(): void {
    interface Row {
      name: string,
      lotNo: string,
      protection: string,
      dosageno: string,
      vaccinationdate: string,
      practicioner: string,
      platform: Array<string>,
    }

    this.immunizations.forEach(element => {

      const protections: Array<string> = []
      element
        .protocolApplied[0]
        .targetDisease
        .forEach(target => {
          protections.push(target.coding[0].display)
        }
        )

      const row: Row = {
        name: element.vaccineCode.coding[0].display,
        lotNo: element.lotNumber,
        protection: protections.join(', '),
        dosageno: element.identifier[0].value,
        vaccinationdate: moment(element.occurrenceDateTime).format('MMMM Do YYYY, h:mm a'),
        practicioner: this.practitioner.name[0].family + ' ' + this.practitioner.name[0].given[0],
        platform: ['EPD']
      }
      vaccinations.push(row)
    });
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
   * creates a immunization FHIR resource https://build.fhir.org/immunization.html 
   * @param immunizationName the name of the vaccination
   * @param illnesses a list of the illnesses that the immunization tackles
   * @param doseNo the number of the dose
   * @param lotNo the Lot number of the dose
   * @param date the date in which the vaccination was performed
   */
  setVaccinationEntry(
    immunizationName: string,
    illnesses: Array<string>,
    doseNo: string,
    lotNo: string,
    date: Date): void {
    const entry = VACD_IMMUNIZATION_ENTRY
    const entryResource = entry.resource
    const id: string = 'Immunization-' + this.makeid(4)
    entry.fullUrl = 'http://test.fhir.ch/r4/Immunization/' + id
    entryResource.id = id

    const vaccineCode = this.setVaccineCode(immunizationName)
    entryResource.vaccineCode.coding[0] = vaccineCode

    entryResource.occurrenceDateTime = date.toString()

    entryResource.recorded = new Date().toDateString()

    entryResource.lotNumber = lotNo

    const targetDiseases = this.setTargetDiseases(illnesses)

    entryResource.protocolApplied[0].targetDisease = targetDiseases

    entry.resource = entryResource
    console.log('entry: ', JSON.stringify(entry))
    this.setVaccinationComposition(entry)
  }

  setVaccinationComposition(vaccinationEntry) {
    const entry = VACD_COMPOSITION_ENTRY



  }

  /**
   * Sets the code of the diseases according to the snomed code system
   * @param illnesses the names of the illnesses as string
   * @returns a FHIR object array 
   */
  setTargetDiseases(illnesses: Array<string>): Array<{ coding: { system: string, code: string, display: string }[] }> {
    const diseaseCode = {
      'system': 'http://snomed.info/sct',
      'code': 'placeholder',
      'display': 'placeholder'
    }
    const targetDiseases = []

    illnesses.forEach(element => {

      if (this.diseaseCodeName.has(element)) {
        diseaseCode.code = this.diseaseCodeName.get(element).toString()
        diseaseCode.display = element
      } else {
        throw new Error('Wrong name provided')
      }

      targetDiseases.push({ 'coding': [diseaseCode] })
    });

    return targetDiseases
  }

  /**
   * sets the correct vaccination code of the standard from http://fhir.ch/ig/ch-vacd/CodeSystem/ch-vacd-swissmedic-cs
   * @param name the name of the vaccine
   * @returns a FHIR Object that contains a system, a code, and a display value
   */
  setVaccineCode(name: string): { system: string, code: string, display: string } {
    const vaccineCode = {
      'system': 'http://fhir.ch/ig/ch-vacd/CodeSystem/ch-vacd-swissmedic-cs',
      'code': 'placeholder',
      'display': 'placeholder'
    }

    if (this.vaccCodeName.has(name)) {
      vaccineCode.code = this.vaccCodeName.get(name).toString()
      vaccineCode.display = name
    }
    return vaccineCode
  }


  /**
  copyright of the user csharptest.net
  
  generates a hash out of the characters in @param characters 
  The length is determined by the number provided to the method
  
  @param length the length of the hash 
  @returns hash value of a certain length as string
   */
  makeid(length: number): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}
