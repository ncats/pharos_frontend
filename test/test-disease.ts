import {Target, TargetSerializer} from '../src/app/models/target';
import {Disease, DiseaseSerializer} from '../src/app/models/disease';

export const TESTDISEASE: Disease = new DiseaseSerializer().fromJson({
  id: 1,
  version: 1,
  created: 1554855453000,
  modified: 1554855453000,
  deprecated: false,
  name: 'Carcinoma',
  description: null,
  self: 'https://pharos.nih.gov/idg/api/v1/diseases(1)?view=full',
  kind: 'ix.idg.models.Disease',
  _properties: {
    count: 5,
    href: 'https://pharos.nih.gov/idg/api/v1/diseases(1)/properties',
  },
  _links: {
    count: 11493,
    href: 'https://pharos.nih.gov/idg/api/v1/diseases(1)/links',
  },
  _synonyms: {
    count: 3,
    href: 'https://pharos.nih.gov/idg/api/v1/diseases(1)/synonyms',
  },
  _publications: null,
  _namespace: null,
});




