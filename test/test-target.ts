import {Target, TargetSerializer} from '../src/app/models/target';

export const TESTTARGET: Target = new TargetSerializer().fromJson({
  id: 7617,
  version: 3,
  created: 1516103936000,
  modified: 1516104267000,
  deprecated: false,
  href: '',
  gene: '',
  accession: '',
  name: 'Tumor necrosis factor',
  description: 'The TNF intracellular domain (ICD) form induces IL12 production in dendritic cells.',
  idgFamily: 'Non-IDG',
  idgTDL: 'Tclin',
  novelty: -4.693574972449313,
  antibodyCount: 2261,
  monoclonalCount: 1555,
  pubmedCount: null,
  jensenScore: 50044.646273,
  patentCount: null,
  grantCount: 12875,
  grantTotalCost: 1347433881.9400039,
  r01Count: 7547,
  ppiCount: null,
  knowledgeAvailability: 51.342101729874294,
  pubTatorScore: 4.59645142492597,
  sequence: [
    'GATTACA'
  ],
  geneSummary: '',
  self: 'https://pharos.nih.gov/idg/api/v1/targets(7617)?view=full',
  _organism: null,
  _synonyms: {'count': 231, 'href': 'https://pharos.nih.gov/idg/api/v1/targets(7617)/synonyms'},
  _publications: {'count': 4826, 'href': 'https://pharos.nih.gov/idg/api/v1/targets(7617)/publications'},
  _properties: {'count': 19024, 'href': 'https://pharos.nih.gov/idg/api/v1/targets(7617)/properties'},
  _links: {'count': 5223, 'href': 'https://pharos.nih.gov/idg/api/v1/targets(7617)/links'},
  _namespace: null
});




