import {Target, TargetSerializer} from '../src/app/models/target';
import {Disease, DiseaseSerializer} from '../src/app/models/disease';
import {Ligand, LigandSerializer} from '../src/app/models/ligand';

export const TESTLIGAND: Ligand = new LigandSerializer().fromJson({
  id: 1,
  version: 1,
  created: 1554855492000,
  modified: 1554855494000,
  deprecated: false,
  name: 'naratriptan',
  description: null,
  structureId: 'dfc2f200-7d05-4d3a-9158-bcbcf300c957',
  self: 'https://pharos.nih.gov/idg/api/v1/ligands(1)?view=full',
  kind: 'ix.idg.models.Ligand',
  _properties: {
    count: 14,
    href: 'https://pharos.nih.gov/idg/api/v1/ligands(1)/properties',
  },
  _links: {
    count: 5,
    href: 'https://pharos.nih.gov/idg/api/v1/ligands(1)/links',
  },
  _synonyms: {
    count: 4,
    href: 'https://pharos.nih.gov/idg/api/v1/ligands(1)/synonyms',
  },
  _publications: null,
  _namespace: null,
});




