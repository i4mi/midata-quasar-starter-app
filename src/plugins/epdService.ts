import { JSOnFhir } from '@i4mi/js-on-fhir';
import {
  Patient,
  Bundle,
  Immunization,
  ImmunizationPerformer,
  Organization,
  Practitioner,
  DocumentReference,
  BundleEntry,
  Composition,
} from '@i4mi/fhir_r4';
import moment from 'moment';
import { EPR_SPID_OID, EPD_PLAYGROUND_OID } from './helpers';
import { reactive } from 'vue';
import { VACD_IMMUNIZATION_ENTRY, FHIR_DOCUMENT_BUNLDE } from '../plugins/VACD RECORD DOCUMENT'

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
  currentVACDRecord: Bundle
  immunizationResource: BundleEntry
  compositionResource: BundleEntry

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
 */
  async getVaccinations(): Promise<void> {

    this.immunizations= []    
    // gets the current bundle with all health documents the patient has
    const vaccinationRecordDocumentBundle = await this.getDocumentReference().then(res => {
      return res;
    });

    // gets the amount of entries the patient has
    const docsAmount = vaccinationRecordDocumentBundle.entry.length
    console.log('Amount of current Documents: ', docsAmount)

    //gets all entries
    const vacdDocuments = vaccinationRecordDocumentBundle
      .entry

    //singles out the vaccination document entries
    const vacdVaccinationRecordDocuments = vacdDocuments.filter(document =>
      (document.resource as DocumentReference)
        .type
        .coding[0]
        .display === 'Impfausweis'
    )

    //sort them according to date to get the newest one, in future implementations,
    //only one current vaccination document should exist which hasnt been implemented due to time constraints
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

    //gets the url of the most current document
    const urlOfMostCurrentDocument = (vacdVaccinationRecordDocuments[0].resource as DocumentReference)
      .content[0]
      .attachment
      .url

    //fetches the most current vaccination document
    const response = await fetch(urlOfMostCurrentDocument);
    const data = await response.json();
    this.currentVACDRecord = data as Bundle

    //sets the practicioner from the most current vacd entry
    this.practitioner = data?.entry.find((entry?: BundleEntry) => {
      if (entry)
        return entry
          .resource
          .resourceType === 'Practitioner'
    }).resource as Practitioner
    console.log('Practitioner ', this.practitioner)

    //sets the patient from the most current vacd entry
    this.currentPatient = data?.entry.find((entry?: BundleEntry) => {
      if (entry)
        return entry
          .resource
          .resourceType === 'Patient'
    }).resource as Patient
    console.log('Patient ', this.currentPatient)

    //sets the organization from the most current vacd entry
    this.organization = data?.entry.find((entry?: BundleEntry) => {
      if (entry)
        return entry
          .resource
          .resourceType === 'Organization'
    }).resource as Organization
    console.log('Organization ', this.organization)

    //sets the immunizations from the most current vacd entry
    this.immunizations = data?.entry.filter((entry?: BundleEntry) => {
      if (entry)
        return entry
          .resource
          .resourceType === 'Immunization'
    }).map(x => x.resource as Immunization)
    console.log('Immunizations ', this.immunizations)

    this.createVaccinationTable()
  }

  /**
   * gets the VACD Record document
   * @returns a Promise with the vacd record document
   */
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

  /**
   * creates rows of immunization data
   */
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
      element.protocolApplied[0].targetDisease.forEach(target => {
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
    date: Date,
    id: string) {
    const entry = VACD_IMMUNIZATION_ENTRY
    const entryResource = entry.resource

    entry.fullUrl = 'http://test.fhir.ch/r4/Immunization/' + id
    entryResource.id = id

    const vaccineCode = this.setVaccineCode(immunizationName)
    entryResource.vaccineCode.coding[0] = vaccineCode

    entryResource.occurrenceDateTime = date.toString()

    entryResource.recorded = moment(now).format('YYYY-MM-DD').toString()

    entryResource.lotNumber = lotNo

    const targetDiseases = this.setTargetDiseases(illnesses)

    entryResource.protocolApplied[0].targetDisease = targetDiseases

    entry.resource = entryResource

    this.immunizationResource = entry
  }

  /**
   * creates a Composition FHIR resource https://build.fhir.org/composition.html
   * @param immunizationName the name of the vaccination
   * @param illnesses a list of the illnesses that the immunization tackles
   * @param doseNo the number of the dose
   * @param lotNo the Lot number of the dose
   * @param date the date in which the vaccination was performed
   */
  setVaccinationComposition(
    immunizationName: string,
    illnesses: Array<string>,
    doseNo: string,
    lotNo: string,
    date: Date) {

    const immunizationId: string = this.makeid(4) + '-Immunization'
    const compositionEntry = this.currentVACDRecord.entry.find((entry: BundleEntry) => {
      return entry
        .resource
        .resourceType === 'Composition'
    }).resource as Composition

    this.setVaccinationEntry(
      immunizationName,
      illnesses,
      doseNo,
      lotNo,
      date,
      immunizationId)

    compositionEntry.section[0].entry.push(
      { 'reference': 'Immunization/' + immunizationId }
    )

    compositionEntry.id = this.makeid(2) + '-VaccinationRecordComposition'
    const compositionResource = { fullUrl: 'http://test.fhir.ch/r4/Composition/' + compositionEntry.id, resource: {} }
    compositionResource.resource = compositionEntry

    this.compositionResource = compositionResource
  }

  /**
   * creates a VaccinationRecord FHIR resource http://fhir.ch/ig/ch-vacd/vaccination-record-document.html
   * @param immunizationName the name of the vaccination
   * @param illnesses a list of the illnesses that the immunization tackles
   * @param doseNo the number of the dose
   * @param lotNo the Lot number of the dose
   * @param date the date in which the vaccination was performed
   */
  setVACDRecordBundle(immunizationName: string,
    illnesses: Array<string>,
    doseNo: string,
    lotNo: string,
    date: Date) {

    this.setVaccinationComposition(
      immunizationName,
      illnesses,
      doseNo,
      lotNo,
      date)

    const index: number = this.currentVACDRecord.entry.findIndex((entry: BundleEntry) => entry.resource.resourceType === 'Composition')
    delete this.currentVACDRecord.entry[index]
    //copyright Christian C. Salvadó
    const filtered: BundleEntry[] = this.currentVACDRecord.entry.filter(function (el) {
      return el != null;
    });
    this.currentVACDRecord.entry = filtered

    this.currentVACDRecord.entry.unshift(this.compositionResource)
    this.currentVACDRecord.entry.push(this.immunizationResource)
    console.log('index', index, '\nentry', this.currentVACDRecord.entry, '\n')

    const bundleId: string = this.makeid(2) + '-VaccinationRecord'
    this.currentVACDRecord.id = bundleId
    this.currentVACDRecord.timestamp = moment().format()
  }

  /**
   * Creates the envelope which the EPD needs to receive FHIR data
   */
  setProvideBundle() {
    const provideBundle = FHIR_DOCUMENT_BUNLDE

    const recordString: string = JSON.stringify(this.currentVACDRecord)
    const base64Data: string = btoa(recordString)

    provideBundle.entry[0].resource.data = base64Data.toString()
    provideBundle.entry[1].resource.date = moment(now).format('YYYY-MM-DD').toString()
    provideBundle.entry[2].resource.date = moment(now).format('YYYY-MM-DD').toString()
    provideBundle.entry[2].resource.masterIdentifier.value = 'urn:oid:89913ac4-f8a3-4eee-9e41-123' + this.makeid(3)

     this.jsOnFhir.create(provideBundle)
      .then((res) => {
        console.log('Create result', res)
      })
      .catch(err => {
        console.log(err);
      });
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

  /**
copyright of the user csharptest.net

generates a hash out of the characters in @param characters
The length is determined by the number provided to the method

@param length the length of the hash
@returns hash value of a certain length as string
 */
  makUuid(length: number): string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstufwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}
