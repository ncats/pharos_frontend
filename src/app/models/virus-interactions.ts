
export class ViralInteractionDetails {
  finalLR: number;
  protein_name: string;
  protein_ncbi: string;
  dataSource: string;
}

export class VirusDetails {
  taxonomyID: string;
  name: string;
  nucleic1: string;
  nucleic2: string;
  order: string;
  family: string;
  subfamily: string;
  genus: string;
  species: string;
  interactionDetails: [ViralInteractionDetails];
}
