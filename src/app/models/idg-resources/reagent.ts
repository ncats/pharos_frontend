export class Antibody extends Reagent {
  antibodyID: string;
  name: string;
  usage: string;
}

export class Cell extends Reagent {
  cellName: string;
  cellID: string;
  type: string;
  vectorID: string;
}

export class GeneticConstruct extends Reagent {
  vectorType: string;
  vectorName: string;
  RRID: string;
}

export class Mouse extends Reagent {
  name: string;
  MMRRCID: string;
  allele: string;
  constructDetails: string;
  correspondingConstruct: string;
}

export class SmallMolecule extends Reagent {
  batchSmiles: string;
  canonicalSmiles: string;
  name: string;
  externalIDRegistrationSystem: string;
  externalID: string;
}

export class Peptide extends Reagent {
  prmType: string;
  resourceID: string;
}

export class Reagent {
  drgc: string;
  resourceType: string;
  dataPageLink: string;
  repository: string;
  repositoryPageLink: string;
  generatingIC: string;
}
