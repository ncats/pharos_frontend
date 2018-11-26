
export class PdbReportData {
  structureId: string;
  chainId: string;
  ligandId: string;
  ligandSmiles: string;
  EC50: string;
  IC50: string;
  Ka: string;
  Kd: string;
  Ki: string;
  pubmedId: string;
  releaseDate: string;
  experimentalTechnique: string;
  structureTitle: string;

  constructor (obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
