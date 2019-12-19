import {Target, TargetSerializer} from '../src/app/models/target';
import {Ligand, LigandSerializer} from '../src/app/models/ligand';

export const TESTLIGAND: Ligand = new LigandSerializer().fromJson({
  ligid: 'T16444CNC2AA',
  name: 'sunitinib',
  description: 'inhibits VEGF-R2 and PDGF-Rbeta tyrosine kinase; has antineoplastic activity',
  isdrug: true,
  smiles: 'CCN(CC)CCNC(=O)C1=C(C)NC(\\C=C2/C(=O)NC3=C2C=C(F)C=C3)=C1C',
  synonyms: [
    {
      name: 'PubChem', value: '5329102', __typename: 'Prop'
    }, {
      name: 'DrugCentral',
      value: '2544',
      __typename: 'Prop'
    }],
  activityCount: 256,
  __typename: 'Ligand',
  activities: [{
    type: 'IC50',
    moa: 'INHIBITOR',
    value: 8.8,
    reference: null,
    target: {
      symbol: 'RET', idgTDL: 'Tclin', name: 'Proto-oncogene tyrosine-protein kinase receptor Ret', __typename: 'Target'
    },
    pubs: null,
    __typename: 'LigandActivity'
  },
    {
      type: 'IC50',
      moa: null,
      value: 8.80000019,
      reference: null,
      target: {
        symbol: 'RET', idgTDL: 'Tclin', name: 'Proto-oncogene tyrosine-protein kinase receptor Ret', __typename: 'Target'
      },
      pubs: null,
      __typename: 'LigandActivity'
    }]
}
);


export const TESTLIGANDPROPS: Target = new LigandSerializer()._asProperties(TESTLIGAND);



