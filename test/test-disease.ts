import {Target, TargetSerializer} from '../src/app/models/target';
import {Disease, DiseaseSerializer} from '../src/app/models/disease';

export const TESTDISEASE: Disease = new DiseaseSerializer().fromJson({
  name: 'Carcinoma',
  associationCount: 666,
  associations: []
});




