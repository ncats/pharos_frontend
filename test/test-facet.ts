import {Facet} from '../src/app/models/facet';

export const TESTFACET: Facet = new Facet(
  {
    facet: 'Target Development Level',
    values: [
      {
        name: 'Tdark',
        count: 666
      }, {
        name: 'Tbio',
        count: 666
      }, {
        name: 'Tchem',
        count: 666
      }, {
        name: 'Tclin',
        count: 666
      }
    ],
    count: 40, min: 0, max: 48, binSize: 2, dataType: 'Category', upSets: []
});

