export const VACD_RECORD_DOCUMENT={
  'resourceType' : 'Bundle',
  'id' : '1-3-VaccinationRecord',
  'meta' : {
    'lastUpdated' : '2022-05-13T00:00:00.568+02:00',
    'profile' : [
      'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-document-vaccination-record'
    ]
  },
  'identifier' : {
    'system' : 'urn:ietf:rfc:3986',
    'value' : 'urn:uuid:5b8a26b2-dd6d-4c04-acaf-e4a44b7bcf47'
  },
  'type' : 'document',
  'timestamp' : '2022-05-13T00:00:00.568+02:00',
  'entry' : [
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Composition/2-3-VaccinationRecordComposition',
      'resource' : {
        'resourceType' : 'Composition',
        'id' : '2-3-VaccinationRecordComposition',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-composition-vaccination-record'
          ]
        },
        'language' : 'en-US',
        'text' : {
          'status' : 'extensions',
          'div' : '<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-US\" lang=\"en-US\"><p><b>Generated Narrative</b></p><div style=\"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\"><p style=\"margin-bottom: 0px\">Resource \"2-3-VaccinationRecordComposition\"  (Language \"en-US\") </p><p style=\"margin-bottom: 0px\">Profile: <a href=\"StructureDefinition-ch-vacd-composition-vaccination-record.html\">CH VACD VaccinationRecord Composition Profile</a></p></div><p><b>EPR Version Number</b>: 1</p><p><b>identifier</b>: id: urn:uuid:00ae697d-3635-4c21-af13-4eaa8018c135</p><p><b>status</b>: final</p><p><b>type</b>: Immunization record <span style=\"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\"> (<a href=\"https://browser.ihtsdotools.org/\">SNOMED CT</a>#41000179103)</span></p><p><b>date</b>: 2021-06-01T00:00:00+02:00</p><p><b>author</b>: <a href=\"#PractitionerRole_6-1-PractitionerRole\">See above (PractitionerRole/6-1-PractitionerRole)</a></p><p><b>title</b>: Vaccination Record</p><p><b>confidentiality</b>: N</p><p><b>custodian</b>: <a href=\"#Organization_5-1-Organization\">See above (Organization/5-1-Organization)</a></p></div>'
        },
        'extension' : [
          {
            'id' : 'versionNumber',
            'url' : 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-epr-versionnumber',
            'valueUnsignedInt' : 1
          }
        ],
        'identifier' : {
          'system' : 'urn:ietf:rfc:3986',
          'value' : 'urn:uuid:00ae697d-3635-4c21-af13-4eaa8018c135'
        },
        'status' : 'final',
        'type' : {
          'coding' : [
            {
              'system' : 'http://snomed.info/sct',
              'code' : '41000179103',
              'display' : 'Immunization record'
            }
          ]
        },
        'subject' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'date' : '2021-06-01T00:00:00+02:00',
        'author' : [
          {
            'reference' : 'PractitionerRole/6-1-PractitionerRole'
          }
        ],
        'title' : 'Vaccination Record',
        'confidentiality' : 'N',
        '_confidentiality' : {
          'extension' : [
            {
              'url' : 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-epr-confidentialitycode',
              'valueCodeableConcept' : {
                'coding' : [
                  {
                    'system' : 'http://snomed.info/sct',
                    'code' : '17621005',
                    'display' : 'Normal (qualifier value)'
                  }
                ]
              }
            }
          ]
        },
        'custodian' : {
          'reference' : 'Organization/5-1-Organization'
        },
        'section' : [
          {
            'id' : 'administration',
            'title' : 'Immunization Administration',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '11369-6',
                  'display' : 'Hx of Immunization'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing all immunization entries.</div>'
            },
            'entry' : [
              {
                'reference' : 'Immunization/7-2-Immunization'
              },
              {
                'reference' : 'Immunization/7-3-Immunization'
              },
              {
                'reference' : 'Immunization/7-4-Immunization'
              },
              {
                'reference' : 'Immunization/7-5-Immunization'
              },
              {
                'reference' : 'Immunization/7-6-Immunization'
              }
            ]
          },
          {
            'id' : 'medicalproblems',
            'title' : 'Other Relevant Observations',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '11450-4',
                  'display' : 'Problem list Reported'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the medical problem entries.</div>'
            },
            'entry' : [
              {
                'reference' : 'Condition/8-2-Condition'
              },
              {
                'reference' : 'Condition/8-3-Condition'
              }
            ]
          },
          {
            'id' : 'sectionIlnessesUndergondeForImmunization1',
            'title' : 'Undergone illnesses for immunization',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '11348-0',
                  'display' : 'Hx of Past illness'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the undergone illnesses for immunization entries.</div>'
            },
            'entry' : [
              {
                'reference' : 'Condition/8-4-Condition'
              }
            ]
          },
          {
            'id' : 'allergies',
            'title' : 'Allergies',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '48765-2',
                  'display' : 'Allergies and adverse reactions Document'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\'>This is the section containing the allergy entries.</div>'
            },
            'entry' : [
              {
                'reference' : 'AllergyIntolerance/11-1-AllergyIntolerance'
              },
              {
                'reference' : 'AllergyIntolerance/11-2-AllergyIntolerance'
              }
            ]
          },
          {
            'id' : 'otherRelevantObservations',
            'title' : 'Other Relevant Observations',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '30954-2',
                  'display' : 'Relevant diagnostic tests/laboratory data Narrative'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-US\" lang=\"en-US\">This section MAY contain relevant coded results of a patient for the given document context. The section MUST contain at least one Problem entry. In case of no relevant results, one of the "special case" codes MUST be used. In the context of immunizations, this section may indicate the gestational age of a child if relevant for immunization of the child. In the context of lab reports, this section may indicate the gestational age of a child if relevant for the observation interpretation.</div>'
            },
            'entry' : [
              {
                'reference' : 'Condition/8-9-Condition'
              }
            ]
          },
          {
            'id' : 'sectionLab1',
            'title' : 'Lab',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '18727-8',
                  'display' : 'Serology studies (set)'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the lab entries.</div>'
            },
            'entry' : [
              {
                'reference' : 'Observation/9-1-Observation'
              }
            ]
          },
          {
            'id' : 'pregnancy',
            'title' : 'Pregnancy',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '10162-6',
                  'display' : 'Pregnancies Hx'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the pregnancy status entry.</div>'
            },
            'entry' : [
              {
                'reference' : 'Condition/8-1-Condition'
              }
            ]
          },
          {
            'id' : 'annotation',
            'title' : 'Comments',
            'code' : {
              'coding' : [
                {
                  'system' : 'http://loinc.org',
                  'code' : '48767-8',
                  'display' : 'Annotation comment [Interpretation] Narrative'
                }
              ]
            },
            'text' : {
              'status' : 'generated',
              'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\'>This is the section containing all immunization entries.</div>'
            }
          }
        ]
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Patient/3-1-Patient',
            'resource': {
                'resourceType': 'Patient',
                'id': '3-1-Patient',
                'meta': {
                    'profile': [
                        'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-patient-epr'
                    ]
                },
                'text': {
                    'status': 'generated',
                    'div': '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'3-1-Patient\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-patient-epr.html\'>CH Core Patient Profile EPR</a></p></div><p><b>identifier</b>: id: 2.16.756.5.30.1.127.3.10.3, id: 761337619779800896</p><p><b>name</b>: Franz Molina </p><p><b>telecom</b>: ph: tel:+41.32.685.12.34(HOME)</p><p><b>gender</b>: male</p><p><b>birthDate</b>: 1972-09-20</p><p><b>address</b>: Leidensweg 10 Specimendorf 9876 CH </p></div>'
                },
                'identifier': [
                    {
                        'system': 'urn:oid:2.16.756.5.31',
                        'value': '2.16.756.5.30.1.127.3.10.3'
                    },
                    {
                        'system': 'urn:oid:2.16.756.5.30.1.123.100.1.1.1',
                        'value': '761337619779800896'
                    }
                ],
                'name': [
                    {
                        'family': 'Molina',
                        'given': [
                            'Franz'
                        ]
                    }
                ],
                'telecom': [
                    {
                        'system': 'phone',
                        'value': 'tel:+41.32.685.12.34',
                        'use': 'home'
                    }
                ],
                'gender': 'male',
                'birthDate': '1972-09-20',
                'address': [
                    {
                        'type': 'both',
                        'line': [
                            ''
                        ],
                        'city': '',
                        'postalCode': '',
                        'country': 'CH'
                    }
                ]
            }
       
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Practitioner/4-1-Practitioner',
      'resource': {
        'resourceType': 'Practitioner',
        'id': '4-1-Practitioner',
        'meta': {
            'profile': [
                'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-practitioner-epr'
            ]
        },
        'text': {
            'status': 'generated',
            'div': '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'4-1-Practitioner\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-practitioner-epr.html\'>CH Core Practitioner Profile EPR</a></p></div><p><b>identifier</b>: id: 2.16.756.5.30.1.178.1.1</p><p><b>active</b>: true</p><p><b>name</b>: Eva Schmitt </p><p><b>telecom</b>: ph: tel:+41.32.234.55.66(WORK), fax: fax:+41.32.234.55.67(WORK), <a href=\'mailto:mailto:Schmitt@klinikhoehenweg.ch\'>mailto:Schmitt@klinikhoehenweg.ch</a>, <a href=\'http://www.klinikhoehenweg.ch\'>http://www.klinikhoehenweg.ch</a></p><p><b>address</b>: Höhenweg 2 Biel 2500 CH </p></div>'
        },
        'identifier': [
            {
                'system': 'urn:oid:2.51.1.3',
                'value': '2.16.756.5.30.1.178.1.1'
            }
        ],
        'active': true,
        'name': [
            {
                'family': 'Schmitt',
                'given': [
                    'Eva'
                ],
                'prefix': [
                    'Dr. med.'
                ]
            }
        ],
        'telecom': [
            {
                'system': 'phone',
                'value': 'tel:+41.32.234.55.66',
                'use': 'work'
            },
            {
                'system': 'email',
                'value': 'mailto:Schmitt@klinikhoehenweg.ch',
                'use': 'work'
            },
            {
                'system': 'url',
                'value': 'http://www.klinikhoehenweg.ch',
                'use': 'work'
            }
        ],
        'address': [
            {
                'type': 'physical',
                'line': [
                    'Höhenweg 2'
                ],
                'city': 'Biel',
                'postalCode': '2500',
                'country': 'CH'
            }
        ]
    }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Organization/5-1-Organization',
      'resource': {
        'resourceType': 'Organization',
        'id': '5-1-Organization',
        'meta': {
            'profile': [
                'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-organization-epr'
            ]
        },
        'text': {
            'status': 'generated',
            'div': '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'5-1-Organization\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-organization-epr.html\'>CH Core Organization Profile EPR</a></p></div><p><b>identifier</b>: id: 2.16.756.5.30.1.178.1.1</p><p><b>name</b>: Klinik Höheweg</p><p><b>telecom</b>: ph: tel:+41.32.234.55.66(WORK), fax: fax:+41.32.234.55.67(WORK), <a href=\'mailto:mailto:Schmitt@klinikhoehenweg.ch\'>mailto:Schmitt@klinikhoehenweg.ch</a>, <a href=\'http://www.klinikhoehenweg.ch\'>http://www.klinikhoehenweg.ch</a></p><p><b>address</b>: Höhenweg 2 Biel BE 2500 CH </p></div>'
        },
        'identifier': [
            {
                'system': 'urn:oid:2.51.1.3',
                'value': '2.16.756.5.30.1.178.1.1'
            }
        ],
        'name': 'Klinik Höheweg',
        'telecom': [
            {
                'system': 'phone',
                'value': 'tel:+41.32.234.55.66',
                'use': 'work'
            },
            {
                'system': 'fax',
                'value': 'fax:+41.32.234.55.67',
                'use': 'work'
            },
            {
                'system': 'email',
                'value': 'mailto:Schmitt@klinikhoehenweg.ch',
                'use': 'work'
            }
        ],
        'address': [
            {
                'line': [
                    'Höhenweg 2'
                ],
                'city': 'Biel',
                'state': 'BE',
                'postalCode': '2500',
                'country': 'CH'
            }
        ]
    }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/PractitionerRole/6-1-PractitionerRole',
      'resource' : {
        'resourceType' : 'PractitionerRole',
        'id' : '6-1-PractitionerRole',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-practitionerrole-epr'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'6-1-PractitionerRole\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-practitionerrole-epr.html\'>CH Core Practitioner Role Profile EPR</a></p></div><p><b>active</b>: true</p><p><b>practitioner</b>: <a href=\'#Practitioner_4-1-Practitioner\'>See above (Practitioner/4-1-Practitioner)</a></p><p><b>organization</b>: <a href=\'#Organization_5-1-Organization\'>See above (Organization/5-1-Organization)</a></p></div>'
        },
        'active' : true,
        'practitioner' : {
          'reference' : 'Practitioner/4-1-Practitioner'
        },
        'organization' : {
          'reference' : 'Organization/5-1-Organization'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/PractitionerRole/6-2-PractitionerRole',
      'resource' : {
        'resourceType' : 'PractitionerRole',
        'id' : '6-2-PractitionerRole',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-practitionerrole'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'6-2-PractitionerRole\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-practitionerrole.html\'>CH Core Practitioner Role Profile</a></p></div><p><b>active</b>: true</p><p><b>practitioner</b>: <a href=\'#Practitioner_4-2-Practitioner\'>See above (Practitioner/4-1-Practitioner)</a></p><p><b>organization</b>: <a href=\'#Organization_5-2-Organization\'>See above (Organization/5-1-Organization)</a></p></div>'
        },
        'active' : true,
        'practitioner' : {
          'reference' : 'Practitioner/4-1-Practitioner'
        },
        'organization' : {
          'reference' : 'Organization/5-1-Organization'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Practitioner/4-1-Practitioner',
      'resource' : {
        'resourceType' : 'Practitioner',
        'id' : '4-1-Practitioner',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-practitioner'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'4-1-Practitioner\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-practitioner.html\'>CH Core Practitioner Profile</a></p></div><p><b>identifier</b>: id: 2000000000030</p><p><b>active</b>: true</p><p><b>name</b>: Detlef Demo </p><p><b>address</b>: Hilfgasse 7 Hilferswil BE 3456 CH </p></div>'
        },
        'identifier' : [
          {
            'system' : 'urn:oid:2.51.1.3',
            'value' : '2000000000030'
          }
        ],
        'active' : true,
        'name' : [
          {
            'family' : 'Demo',
            'given' : [
              'Detlef'
            ]
          }
        ],
        'address' : [
          {
            'id' : '12-6-Address',
            'line' : [
              'Hilfgasse 7'
            ],
            'city' : 'Hilferswil',
            'state' : 'BE',
            'postalCode' : '3456',
            'country' : 'CH'
          }
        ]
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Organization/5-1-Organization',
      'resource' : {
        'resourceType' : 'Organization',
        'id' : '5-1-Organization',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-organization'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'5-1-Organization\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-organization.html\'>CH Core Organization Profile</a></p></div><p><b>identifier</b>: id: 2010000000041</p><p><b>name</b>: Praxis Demo</p><p><b>address</b>: Hilfgasse 7 Hilferswil BE 3456 CH </p></div>'
        },
        'identifier' : [
          {
            'system' : 'urn:oid:2.51.1.3',
            'value' : '2010000000041'
          }
        ],
        'name' : 'Praxis Demo',
        'address' : [
          {
            'id' : '12-6-Address',
            'line' : [
              'Hilfgasse 7'
            ],
            'city' : 'Hilferswil',
            'state' : 'BE',
            'postalCode' : '3456',
            'country' : 'CH'
          }
        ]
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/PractitionerRole/6-3-PractitionerRole',
      'resource' : {
        'resourceType' : 'PractitionerRole',
        'id' : '6-3-PractitionerRole',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-practitionerrole'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'6-3-PractitionerRole\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-practitionerrole.html\'>CH Core Practitioner Role Profile</a></p></div><p><b>active</b>: true</p><p><b>practitioner</b>: <a href=\'#Practitioner_4-3-Practitioner\'>See above (Practitioner/4-3-Practitioner)</a></p><p><b>organization</b>: <a href=\'#Organization_5-3-Organization\'>See above (Organization/5-3-Organization)</a></p></div>'
        },
        'active' : true,
        'practitioner' : {
          'reference' : 'Practitioner/4-3-Practitioner'
        },
        'organization' : {
          'reference' : 'Organization/5-3-Organization'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Practitioner/4-3-Practitioner',
      'resource' : {
        'resourceType' : 'Practitioner',
        'id' : '4-3-Practitioner',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-practitioner'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'4-3-Practitioner\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-practitioner.html\'>CH Core Practitioner Profile</a></p></div><p><b>identifier</b>: id: 2000000000031</p><p><b>active</b>: true</p><p><b>name</b>: Max Muster </p><p><b>address</b>: Mustergasse 99 Beispielen SG 9876 CH </p></div>'
        },
        'identifier' : [
          {
            'system' : 'urn:oid:2.51.1.3',
            'value' : '2000000000031'
          }
        ],
        'active' : true,
        'name' : [
          {
            'family' : 'Muster',
            'given' : [
              'Max'
            ]
          }
        ],
        'address' : [
          {
            'line' : [
              'Mustergasse 99'
            ],
            'city' : 'Beispielen',
            'state' : 'SG',
            'postalCode' : '9876',
            'country' : 'CH'
          }
        ]
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Organization/5-3-Organization',
      'resource' : {
        'resourceType' : 'Organization',
        'id' : '5-3-Organization',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-core/StructureDefinition/ch-core-organization'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'5-3-Organization\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'http://fhir.ch/ig/ch-core/StructureDefinition-ch-core-organization.html\'>CH Core Organization Profile</a></p></div><p><b>identifier</b>: id: 2010000000051</p><p><b>name</b>: Praxis Muster</p><p><b>address</b>: Mustergasse 99 Beispielen SG 9876 CH </p></div>'
        },
        'identifier' : [
          {
            'system' : 'urn:oid:2.51.1.3',
            'value' : '2010000000051'
          }
        ],
        'name' : 'Praxis Muster',
        'address' : [
          {
            'line' : [
              'Mustergasse 99'
            ],
            'city' : 'Beispielen',
            'state' : 'SG',
            'postalCode' : '9876',
            'country' : 'CH'
          }
        ]
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Condition/8-2-Condition',
      'resource' : {
        'resourceType' : 'Condition',
        'id' : '8-2-Condition',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-medical-problems'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'8-2-Condition\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-medical-problems.html\'>CH VACD Medical Problems Profile</a></p></div><p><b>code</b>: ANDERE_LEBERERKRANKUNG <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'CodeSystem-ch-vacd-complication-risks-cs.html\'>Swiss Complication Risks Codesystem</a>#114036)</span></p><p><b>subject</b>: <a href=\'#Patient_3-1-Patient\'>See above (Patient/3-1-Patient)</a></p><p><b>recordedDate</b>: 2019-04-01T00:00:00+02:00</p><p><b>recorder</b>: <a href=\'#PractitionerRole_6-1-PractitionerRole\'>See above (PractitionerRole/6-1-PractitionerRole)</a></p></div>'
        },
        'code' : {
          'coding' : [
            {
              'system' : 'urn:oid:2.16.756.5.30.1.127.3.3.1',
              'code' : '114036',
              'display' : 'ANDERE_LEBERERKRANKUNG'
            }
          ]
        },
        'subject' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'recordedDate' : '2019-04-01T00:00:00+02:00',
        'recorder' : {
          'reference' : 'PractitionerRole/6-1-PractitionerRole'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Condition/8-3-Condition',
      'resource' : {
        'resourceType' : 'Condition',
        'id' : '8-3-Condition',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-medical-problems'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'8-3-Condition\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-medical-problems.html\'>CH VACD Medical Problems Profile</a></p></div><p><b>code</b>: FLEDERMAUSFORSCHER_UND_SCHUETZER <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'CodeSystem-ch-vacd-exposure-risks-cs.html\'>Swiss Exposure Risks Codesystem</a>#213006)</span></p><p><b>subject</b>: <a href=\'#Patient_3-1-Patient\'>See above (Patient/3-1-Patient)</a></p><p><b>recordedDate</b>: 2009-04-01T00:00:00+02:00</p><p><b>recorder</b>: <a href=\'#PractitionerRole_6-1-PractitionerRole\'>See above (PractitionerRole/6-1-PractitionerRole)</a></p></div>'
        },
        'code' : {
          'coding' : [
            {
              'system' : 'urn:oid:2.16.756.5.30.1.127.3.3.2',
              'code' : '213006',
              'display' : 'FLEDERMAUSFORSCHER_UND_SCHUETZER'
            }
          ]
        },
        'subject' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'recordedDate' : '2009-04-01T00:00:00+02:00',
        'recorder' : {
          'reference' : 'PractitionerRole/6-1-PractitionerRole'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Condition/8-4-Condition',
      'resource' : {
        'resourceType' : 'Condition',
        'id' : '8-4-Condition',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-pastillnesses'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'8-4-Condition\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-pastillnesses.html\'>CH VACD Past Illness Profile</a></p></div><p><b>code</b>: Measles (disorder) <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://browser.ihtsdotools.org/\'>SNOMED CT</a>#14189004)</span></p><p><b>subject</b>: <a href=\'#Patient_3-1-Patient\'>See above (Patient/3-1-Patient)</a></p><p><b>onset</b>: 1966-11-30T00:00:00+01:00</p><p><b>recordedDate</b>: 1999-04-01T00:00:00+02:00</p><p><b>recorder</b>: <a href=\'#PractitionerRole_6-1-PractitionerRole\'>See above (PractitionerRole/6-1-PractitionerRole)</a></p></div>'
        },
        'code' : {
          'coding' : [
            {
              'system' : 'http://snomed.info/sct',
              'code' : '14189004',
              'display' : 'Measles (disorder)'
            }
          ]
        },
        'subject' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'onsetDateTime' : '1966-11-30T00:00:00+01:00',
        'recordedDate' : '1999-04-01T00:00:00+02:00',
        'recorder' : {
          'reference' : 'PractitionerRole/6-1-PractitionerRole'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/AllergyIntolerance/11-1-AllergyIntolerance',
      'resource' : {
        'resourceType' : 'AllergyIntolerance',
        'id' : '11-1-AllergyIntolerance',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-allergyintolerances'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'11-1-AllergyIntolerance\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-allergyintolerances.html\'>CH VACD AllergyIntolerance Profile</a></p></div><p><b>clinicalStatus</b>: Active <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'http://terminology.hl7.org/3.0.0/CodeSystem-allergyintolerance-clinical.html\'>AllergyIntolerance Clinical Status Codes</a>#active)</span></p><p><b>code</b>: Allergy to egg protein (finding) <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://browser.ihtsdotools.org/\'>SNOMED CT</a>#213020009)</span></p><p><b>patient</b>: <a href=\'#Patient_3-1-Patient\'>See above (Patient/3-1-Patient)</a></p><p><b>recordedDate</b>: 2004-07-11T00:00:00+02:00</p><p><b>recorder</b>: <a href=\'#PractitionerRole_6-1-PractitionerRole\'>See above (PractitionerRole/6-1-PractitionerRole)</a></p></div>'
        },
        'clinicalStatus' : {
          'coding' : [
            {
              'system' : 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
              'code' : 'active'
            }
          ]
        },
        'code' : {
          'coding' : [
            {
              'system' : 'http://snomed.info/sct',
              'code' : '213020009',
              'display' : 'Allergy to egg protein (finding)'
            }
          ]
        },
        'patient' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'recordedDate' : '2004-07-11T00:00:00+02:00',
        'recorder' : {
          'reference' : 'PractitionerRole/6-1-PractitionerRole'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/AllergyIntolerance/11-2-AllergyIntolerance',
      'resource' : {
        'resourceType' : 'AllergyIntolerance',
        'id' : '11-2-AllergyIntolerance',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-allergyintolerances'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'11-2-AllergyIntolerance\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-allergyintolerances.html\'>CH VACD AllergyIntolerance Profile</a></p></div><p><b>clinicalStatus</b>: Active <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'http://terminology.hl7.org/3.0.0/CodeSystem-allergyintolerance-clinical.html\'>AllergyIntolerance Clinical Status Codes</a>#active)</span></p><p><b>code</b>: Atopic dermatitis (disorder) <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://browser.ihtsdotools.org/\'>SNOMED CT</a>#24079001)</span></p><p><b>patient</b>: <a href=\'#Patient_3-1-Patient\'>See above (Patient/3-1-Patient)</a></p><p><b>recordedDate</b>: 1996-07-11T00:00:00+02:00</p><p><b>recorder</b>: <a href=\'#PractitionerRole_6-1-PractitionerRole\'>See above (PractitionerRole/6-1-PractitionerRole)</a></p></div>'
        },
        'clinicalStatus' : {
          'coding' : [
            {
              'system' : 'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
              'code' : 'active'
            }
          ]
        },
        'code' : {
          'coding' : [
            {
              'system' : 'http://snomed.info/sct',
              'code' : '24079001',
              'display' : 'Atopic dermatitis (disorder)'
            }
          ]
        },
        'patient' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'recordedDate' : '1996-07-11T00:00:00+02:00',
        'recorder' : {
          'reference' : 'PractitionerRole/6-1-PractitionerRole'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Condition/8-9-Condition',
      'resource' : {
        'resourceType' : 'Condition',
        'id' : '8-9-Condition',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-other-observations'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative</b></p><div style=\"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\"><p style=\"margin-bottom: 0px\">Resource \"8-9-Condition\" </p><p style=\"margin-bottom: 0px\">Profile: <a href=\"StructureDefinition-ch-vacd-other-observations.html\">CH VACD Other Relevant Observations (Condition)</a></p></div><p><b>code</b>: Gestational age in days <span style=\"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\"> (<a href=\"https://loinc.org/\">LOINC</a>#49052-4)</span></p><p><b>subject</b>: <a href=\"#Patient_3-1-Patient\">See above (Patient/3-1-Patient)</a></p><p><b>onset</b>: 266 day<span style=\"background: LightGoldenRodYellow\"> (Details: UCUM code d = "d")</span></p><p><b>recordedDate</b>: 2009-03-31T00:00:00+02:00</p><p><b>recorder</b>: <a href=\"#PractitionerRole_6-1-PractitionerRole\">See above (PractitionerRole/6-1-PractitionerRole)</a></p></div>'
        },
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '49052-4',
              'display' : 'Gestational age in days'
            }
          ]
        },
        'subject' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'onsetAge' : {
          'value' : 266,
          'unit' : 'day',
          'system' : 'http://unitsofmeasure.org',
          'code' : 'd'
        },
        'recordedDate' : '2009-03-31T00:00:00+02:00',
        'recorder' : {
          'reference' : 'PractitionerRole/6-1-PractitionerRole'
        }
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Observation/9-1-Observation',
      'resource' : {
        'resourceType' : 'Observation',
        'id' : '9-1-Observation',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-laboratory-serology'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative</b></p><div style=\"display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\"><p style=\"margin-bottom: 0px\">Resource \"9-1-Observation\" </p><p style=\"margin-bottom: 0px\">Profile: <a href=\"StructureDefinition-ch-vacd-laboratory-serology.html\">CH VACD Laboratory And Serology Profile</a></p></div><p><b>status</b>: final</p><p><b>code</b>: Hepatitis B virus surface Ab [Units/volume] in Serum <span style=\"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\"> (<a href=\"https://loinc.org/\">LOINC</a>#16935-9)</span></p><p><b>subject</b>: <a href=\"#Patient_3-1-Patient\">See above (Patient/3-1-Patient)</a></p><p><b>effective</b>: 1971-10-01</p><p><b>performer</b>: <a href=\"#PractitionerRole_6-1-PractitionerRole\">See above (PractitionerRole/6-1-PractitionerRole)</a></p><p><b>value</b>: 99 [iU]/L<span style=\"background: LightGoldenRodYellow\"> (Details: UCUM code [iU]/L = "[iU]/L")</span></p><p><b>interpretation</b>: Positive <span style=\"background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\"> (<a href=\"http://terminology.hl7.org/3.0.0/CodeSystem-v3-ObservationInterpretation.html\">ObservationInterpretation</a>#POS)</span></p></div>'
        },
        'status' : 'final',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '16935-9',
              'display' : 'Hepatitis B virus surface Ab [Units/volume] in Serum'
            }
          ]
        },
        'subject' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'effectiveDateTime' : '1971-10',
        'performer' : [
          {
            'reference' : 'PractitionerRole/6-1-PractitionerRole'
          }
        ],
        'valueQuantity' : {
          'value' : 99,
          'unit' : '[iU]/L',
          'system' : 'http://unitsofmeasure.org',
          'code' : '[iU]/L'
        },
        'interpretation' : [
          {
            'coding' : [
              {
                'system' : 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
                'code' : 'POS',
                'display' : 'Positive'
              }
            ]
          }
        ]
      }
    },
    {
      'fullUrl' : 'http://test.fhir.ch/r4/Condition/8-1-Condition',
      'resource' : {
        'resourceType' : 'Condition',
        'id' : '8-1-Condition',
        'meta' : {
          'profile' : [
            'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-pregnancy'
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'8-1-Condition\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-pregnancy.html\'>CH VACD Pregnancy Profile</a></p></div><p><b>code</b>: Delivery date Estimated from last menstrual period <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://loinc.org/\'>LOINC</a>#11779-6)</span></p><p><b>subject</b>: <a href=\'#Patient_3-1-Patient\'>See above (Patient/3-1-Patient)</a></p><p><b>onset</b>: 2021-10-31T00:00:00+02:00</p><p><b>recordedDate</b>: 2021-06-01T00:00:00+02:00</p><p><b>recorder</b>: <a href=\'#PractitionerRole_6-1-PractitionerRole\'>See above (PractitionerRole/6-1-PractitionerRole)</a></p></div>'
        },
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '11779-6',
              'display' : 'Delivery date Estimated from last menstrual period'
            }
          ]
        },
        'subject' : {
          'reference' : 'Patient/3-1-Patient'
        },
        'onsetDateTime' : '2021-10-31T00:00:00+02:00',
        'recordedDate' : '2021-06-01T00:00:00+02:00',
        'recorder' : {
          'reference' : 'PractitionerRole/6-1-PractitionerRole'
        }
      }
    }
  ]
}

export const VACD_COMPOSITION_ENTRY = {
  'fullUrl' : 'http://test.fhir.ch/r4/Composition/2-3-VaccinationRecordComposition',
  'resource' : {
    'resourceType' : 'Composition',
    'id' : '2-3-VaccinationRecordComposition',
    'meta' : {
      'profile' : [
        'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-composition-vaccination-record'
      ]
    },
    'language' : 'en-US',
    'text' : {
      'status' : 'extensions',
      'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'2-3-VaccinationRecordComposition\'  (Language \'en-US\') </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-composition-vaccination-record.html\'>CH VACD VaccinationRecord Composition Profile</a></p></div><p><b>EPR Version Number</b>: 1</p><p><b>identifier</b>: id: urn:uuid:00ae697d-3635-4c21-af13-4eaa8018c135</p><p><b>status</b>: final</p><p><b>type</b>: Immunization record <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://browser.ihtsdotools.org/\'>SNOMED CT</a>#41000179103)</span></p><p><b>date</b>: 2021-06-01T00:00:00+02:00</p><p><b>author</b>: <a href=\'#PractitionerRole_6-1-PractitionerRole\'>See above (PractitionerRole/6-1-PractitionerRole)</a></p><p><b>title</b>: Vaccination Record</p><p><b>confidentiality</b>: N</p><p><b>custodian</b>: <a href=\'#Organization_5-1-Organization\'>See above (Organization/5-1-Organization)</a></p></div>'
    },
    'extension' : [
      {
        'id' : 'versionNumber',
        'url' : 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-epr-versionnumber',
        'valueUnsignedInt' : 1
      }
    ],
    'identifier' : {
      'system' : 'urn:ietf:rfc:3986',
      'value' : 'urn:uuid:00ae697d-3635-4c21-af13-4eaa8018c135'
    },
    'status' : 'final',
    'type' : {
      'coding' : [
        {
          'system' : 'http://snomed.info/sct',
          'code' : '41000179103',
          'display' : 'Immunization record'
        }
      ]
    },
    'subject' : {
      'reference' : 'Patient/3-1-Patient'
    },
    'date' : '2021-06-01T00:00:00+02:00',
    'author' : [
      {
        'reference' : 'PractitionerRole/6-1-PractitionerRole'
      }
    ],
    'title' : 'Vaccination Record',
    'confidentiality' : 'N',
    '_confidentiality' : {
      'extension' : [
        {
          'url' : 'http://fhir.ch/ig/ch-core/StructureDefinition/ch-ext-epr-confidentialitycode',
          'valueCodeableConcept' : {
            'coding' : [
              {
                'system' : 'http://snomed.info/sct',
                'code' : '17621005',
                'display' : 'Normal (qualifier value)'
              }
            ]
          }
        }
      ]
    },
    'custodian' : {
      'reference' : 'Organization/5-1-Organization'
    },
    'section' : [
      {
        'id' : 'administration',
        'title' : 'Immunization Administration',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '11369-6',
              'display' : 'Hx of Immunization'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing all immunization entries.</div>'
        },
        'entry' : [
        ]
      },
      {
        'id' : 'medicalproblems',
        'title' : 'Other Relevant Observations',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '11450-4',
              'display' : 'Problem list Reported'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the medical problem entries.</div>'
        },
        'entry' : [
          {
            'reference' : 'Condition/8-2-Condition'
          },
          {
            'reference' : 'Condition/8-3-Condition'
          }
        ]
      },
      {
        'id' : 'sectionIlnessesUndergondeForImmunization1',
        'title' : 'Undergone illnesses for immunization',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '11348-0',
              'display' : 'Hx of Past illness'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the undergone illnesses for immunization entries.</div>'
        },
        'entry' : [
          {
            'reference' : 'Condition/8-4-Condition'
          }
        ]
      },
      {
        'id' : 'allergies',
        'title' : 'Allergies',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '48765-2',
              'display' : 'Allergies and adverse reactions Document'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\'>This is the section containing the allergy entries.</div>'
        },
        'entry' : [
          {
            'reference' : 'AllergyIntolerance/11-1-AllergyIntolerance'
          },
          {
            'reference' : 'AllergyIntolerance/11-2-AllergyIntolerance'
          }
        ]
      },
      {
        'id' : 'otherRelevantObservations',
        'title' : 'Other Relevant Observations',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '30954-2',
              'display' : 'Relevant diagnostic tests/laboratory data Narrative'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en-US\" lang=\"en-US\">This section MAY contain relevant coded results of a patient for the given document context. The section MUST contain at least one Problem entry. In case of no relevant results, one of the "special case" codes MUST be used. In the context of immunizations, this section may indicate the gestational age of a child if relevant for immunization of the child. In the context of lab reports, this section may indicate the gestational age of a child if relevant for the observation interpretation.</div>'
        },
        'entry' : [
          {
            'reference' : 'Condition/8-9-Condition'
          }
        ]
      },
      {
        'id' : 'sectionLab1',
        'title' : 'Lab',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '18727-8',
              'display' : 'Serology studies (set)'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the lab entries.</div>'
        },
        'entry' : [
          {
            'reference' : 'Observation/9-1-Observation'
          }
        ]
      },
      {
        'id' : 'pregnancy',
        'title' : 'Pregnancy',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '10162-6',
              'display' : 'Pregnancies Hx'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\' lang=\'en-US\'>This is the section containing the pregnancy status entry.</div>'
        },
        'entry' : [
          {
            'reference' : 'Condition/8-1-Condition'
          }
        ]
      },
      {
        'id' : 'annotation',
        'title' : 'Comments',
        'code' : {
          'coding' : [
            {
              'system' : 'http://loinc.org',
              'code' : '48767-8',
              'display' : 'Annotation comment [Interpretation] Narrative'
            }
          ]
        },
        'text' : {
          'status' : 'generated',
          'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\' xml:lang=\'en-US\'>This is the section containing all immunization entries.</div>'
        }
      }
    ]
  }
}

export const VACD_IMMUNIZATION_ENTRY = {
  'fullUrl' : 'http://test.fhir.ch/r4/Immunization/7-4-Immunization',
  'resource' : {
    'resourceType' : 'Immunization',
    'id' : '7-4-Immunization',
    'meta' : {
      'profile' : [
        'http://fhir.ch/ig/ch-vacd/StructureDefinition/ch-vacd-immunization'
      ]
    },
    'text' : {
      'status' : 'generated',
      'div' : '<div xmlns=\'http://www.w3.org/1999/xhtml\'><p><b>Generated Narrative</b></p><div style=\'display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%\'><p style=\'margin-bottom: 0px\'>Resource \'7-4-Immunization\' </p><p style=\'margin-bottom: 0px\'>Profile: <a href=\'StructureDefinition-ch-vacd-immunization.html\'>CH VACD Immunization Profile</a></p></div><p><b>identifier</b>: id: 34567</p><p><b>status</b>: completed</p><p><b>vaccineCode</b>: Boostrix <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'CodeSystem-ch-vacd-swissmedic-cs.html\'>Swiss Medic Authorized Vaccines Codesystem</a>#637)</span></p><p><b>patient</b>: <a href=\'#Patient_3-1-Patient\'>See above (Patient/3-1-Patient)</a></p><p><b>occurrence</b>: 2015-11-01T00:00:00+01:00</p><p><b>recorded</b>: 2015-11-01T00:00:00+01:00</p><p><b>lotNumber</b>: 12-34244</p><p><b>route</b>: Intramuscular use <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (standardterms.edqm.eu#20035000)</span></p><h3>Performers</h3><table class=\'grid\'><tr><td>-</td><td><b>Actor</b></td></tr><tr><td>*</td><td><a href=\'#PractitionerRole_6-2-PractitionerRole\'>See above (PractitionerRole/6-2-PractitionerRole)</a></td></tr></table><h3>ProtocolApplieds</h3><table class=\'grid\'><tr><td>-</td><td><b>TargetDisease</b></td><td><b>DoseNumber[x]</b></td></tr><tr><td>*</td><td>Diphtheria caused by Corynebacterium diphtheriae (disorder) <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://browser.ihtsdotools.org/\'>SNOMED CT</a>#397430003)</span>, Tetanus (disorder) <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://browser.ihtsdotools.org/\'>SNOMED CT</a>#76902006)</span>, Pertussis (disorder) <span style=\'background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki\'> (<a href=\'https://browser.ihtsdotools.org/\'>SNOMED CT</a>#27836007)</span></td><td>1</td></tr></table></div>'
    },
    'identifier' : [
      {
        'system' : 'urn:oid:2.16.756.5.30.1.147.1.3.1',
        'value' : '34567'
      }
    ],
    'status' : 'completed',
    'vaccineCode' : {
      'coding' : [
        {
          'system' : 'http://fhir.ch/ig/ch-vacd/CodeSystem/ch-vacd-swissmedic-cs',
          'code' : '637',
          'display' : 'Boostrix'
        }
      ]
    },
    'patient' : {
      'reference' : 'Patient/3-1-Patient'
    },
    'occurrenceDateTime' : '2015-11-01T00:00:00+01:00',
    'recorded' : '2015-11-01T00:00:00+01:00',
    'lotNumber' : '12-34244',
    'route' : {
      'coding' : [
        {
          'system' : 'http://standardterms.edqm.eu',
          'code' : '20035000',
          'display' : 'Intramuscular use'
        }
      ]
    },
    'performer' : [
      {
        'actor' : {
          'reference' : 'PractitionerRole/6-2-PractitionerRole'
        }
      }
    ],
    'protocolApplied' : [
      {
        'targetDisease' : [
          {
            'coding' : [
              {
                'system' : 'http://snomed.info/sct',
                'code' : '397430003',
                'display' : 'Diphtheria caused by Corynebacterium diphtheriae (disorder)'
              }
            ]
          },
          {
            'coding' : [
              {
                'system' : 'http://snomed.info/sct',
                'code' : '76902006',
                'display' : 'Tetanus (disorder)'
              }
            ]
          },
          {
            'coding' : [
              {
                'system' : 'http://snomed.info/sct',
                'code' : '27836007',
                'display' : 'Pertussis (disorder)'
              }
            ]
          }
        ],
        'doseNumberPositiveInt' : 1
      }
    ]
  }
}

export const FHIR_DOCUMENT_BUNLDE = {
  'id': 'bundle-id-e37e3dd8-798c-4c51-a412-b5cbdbf07ab5',
  'resourceType': 'Bundle',
  'meta': {
      'profile': [
          'http://profiles.ihe.net/ITI/MHD/StructureDefinition/IHE.MHD.Comprehensive.ProvideBundle'
      ]
  },
  'type': 'transaction',
  'entry': [
      {
          'fullUrl': 'urn:uuid:0281a69f-47b6-4b76-ab25-8cd137ba3fa6',
          'resource': {
              'resourceType': 'Binary',
              'contentType': 'application/fhir+json',
              'data': ''
          },
          'request': {
              'method': 'POST',
              'url': 'urn:uuid:0281a69f-47b6-4b76-ab25-8cd137ba3fa6'
          }
      },
      {
          'fullUrl': 'urn:uuid:2eeb97d6-ee16-4aac-94d0-27b217259b24',
          'resource': {
              'resourceType': 'List',
              'id': 'urn:uuid:2eeb97d6-ee16-4aac-94d0-27b217259b24',
              'meta': {
                  'profile': [
                      'http://profiles.ihe.net/ITI/MHD/StructureDefinition/IHE.MHD.Comprehensive.SubmissionSet'
                  ]
              },
              'extension': [
                  {
                      'url': 'http://profiles.ihe.net/ITI/MHD/StructureDefinition/ihe-designationType',
                      'valueCodeableConcept': {
                          'coding': [
                              {
                                  'system': 'http://snomed.info/sct',
                                  'code': '71388002',
                                  'display': 'Procedure (procedure)'
                              }
                          ]
                      }
                  },
                  {
                      'url': 'http://profiles.ihe.net/ITI/MHD/StructureDefinition/ihe-sourceId',
                      'valueIdentifier': {
                          'value': 'urn:oid:1.3.6.1.4.1.12559.11.13.2.5'
                      }
                  }
              ],
              'identifier': [
                  {
                      'use': 'official',
                      'system': 'urn:ietf:rfc:3986',
                      'value': 'urn:uuid:2eeb97d6-ee16-4aac-94d0-27b217259b24'
                  }
              ],
              'status': 'current',
              'mode': 'working',
              'title': 'VACDUploadDoc',
              'code': {
                  'coding': [
                      {
                          'system': 'http://profiles.ihe.net/ITI/MHD/CodeSystem/MHDlistTypes',
                          'code': 'submissionset',
                          'display': 'Submission Set'
                      }
                  ]
              },
              'subject': {
                  'reference': 'https://test.ahdis.ch/mag-bfh/fhir/Patient/urn:oid:1.1.1.99.1-7de95899-1e73-4ee2-8632-13987ee67ed6'
              },
              'entry': [
                  {
                      'item': {
                          'reference': 'urn:uuid:6e4a7068-b107-40dd-89bb-' // needs to be unique and add 12 chars
                      }
                  }
              ],
              'date': '2022-06-13'
          },
          'request': {
              'method': 'POST',
              'url': 'urn:uuid:2eeb97d6-ee16-4aac-94d0-27b217259b24'
          }
      },
      {
          'fullUrl': 'urn:uuid:6e4a7068-b107-40dd-89bb-' // needs to be unique and add 12 chars
          ,
          'resource': {
              'resourceType': 'DocumentReference',
              'contained': [
                  {
                      'resourceType': 'Patient',
                      'id': '1.1.1.99.1-7de95899-1e73-4ee2-8632-13987ee67ed6',
                      'identifier': [
                          {
                              'system': 'urn:oid:1.1.1.99.1',
                              'value': '7de95899-1e73-4ee2-8632-13987ee67ed6'
                          },
                          {
                              'system': 'urn:oid:2.16.756.5.30.1.127.3.10.3',
                              'value': '761337619779800896'
                          },
                          {
                              'system': 'urn:oid:2.16.756.5.30.1.178.1.1',
                              'value': 'PAT.9779.8008'
                          }
                      ],
                      'active': true,
                      'name': [
                          {
                              'family': 'Molina',
                              'given': [
                                  'Franz'
                              ]
                          }
                      ],
                      'gender': 'male',
                      'birthDate': '1972-09-20'
                  }
              ],
              'masterIdentifier': {
                  'value': 'urn:oid:89913ac4-f8a3-4eee-9e41-' // needs to be unique and add 12 chars
              },
              'identifier': [
                  {
                      'use': 'official',
                      'system': 'urn:ietf:rfc:3986',
                      'value': 'urn:uuid:6e4a7068-b107-40dd-89bb-' // needs to be unique and add 12 chars
                  }
              ],
              'status': 'current',
              'type': {
                  'coding': [
                      {
                          'system': 'http://snomed.info/sct',
                          'code': '41000179103',
                          'display': 'Impfausweis'
                      }
                  ]
              },
              'category': [
                  {
                      'coding': [
                          {
                              'system': 'http://snomed.info/sct',
                              'code': '184216000',
                              'display': 'Langzeitdokumentation'
                          }
                      ]
                  }
              ],
              'subject': {
                  'reference': 'https://test.ahdis.ch/mag-bfh/fhir/Patient/urn:oid:1.1.1.99.1-7de95899-1e73-4ee2-8632-13987ee67ed6'
              },
              'source': 'urn:oid:1.3.6.1.4.1.12559.11.13.2.5',
              'date': '2022-05-13',
              'description': 'Impfdokument',
              'securityLabel': [
                  {
                      'coding': [
                          {
                              'system': 'http://snomed.info/sct',
                              'code': '17621005',
                              'display': 'Normal (qualifier value)'
                          }
                      ]
                  }
              ],
              'content': [
                  {
                      'attachment': {
                          'contentType': 'application/fhir+json',
                          'language': 'de-CH',
                          'url': 'urn:uuid:0281a69f-47b6-4b76-ab25-8cd137ba3fa6'
                      },
                      'format': {
                          'system': 'urn:oid:1.3.6.1.4.1.19376.1.2.3',
                          'code': 'urn:ihe:pcc:ic:2009',
                          'display': 'Immunization Content (IC)'
                      }
                  }
              ],
              'context': {
                  'facilityType': {
                      'coding': [
                          {
                              'system': 'http://snomed.info/sct',
                              'code': '66280005',
                              'display': 'Private home-based care (environment)'
                          }
                      ]
                  },
                  'practiceSetting': {
                      'coding': [
                          {
                              'system': 'http://snomed.info/sct',
                              'code': '394658006',
                              'display': 'Other clinical specialty'
                          }
                      ]
                  },
                  'sourcePatientInfo': {
                      'reference': '#1.1.1.99.1-7de95899-1e73-4ee2-8632-13987ee67ed6'
                  }
              }
          },
          'request': {
              'method': 'POST',
              'url': 'urn:uuid:6e4a7068-b107-40dd-89bb-' // needs to be unique and add 12 chars
          }
      }
  ]
}