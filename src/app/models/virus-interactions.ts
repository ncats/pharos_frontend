import {PharosSerializer} from "./pharos-base";

export class ViralInteractionDetails {
  finalLR: number;
  protein_name: string;
  protein_ncbi: string;
  dataSource: string;
  pdbIDs: string[] = [];
  confirmed(): boolean{
    return this.pdbIDs.length > 0;
  }
  static sort(a: ViralInteractionDetails, b: ViralInteractionDetails) : number {
    if(a.confirmed() && !b.confirmed()){
      return -1;
    }
    if(b.confirmed() && !a.confirmed()){
      return 1;
    }
    return b.finalLR - a.finalLR;
  }
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
  interactionDetails: ViralInteractionDetails[] = [];
  confirmed(): boolean{
    return !!this.interactionDetails.find(ppi => {return ppi.confirmed()});
  }
  static sort(a: VirusDetails, b: VirusDetails) : number {
    if(a.confirmed() && !b.confirmed()){
      return 1;
    }
    if(b.confirmed() && !a.confirmed()){
      return -1;
    }
    return a.interactionDetails.length - b.interactionDetails.length;
  }
}

export class VirusDetailsSerializer implements PharosSerializer{
  fromJson(json: any): any {
    const obj = new VirusDetails();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    const viralInteractionDetailsSerializer = new VirusInteractionSerializer();
    obj.interactionDetails = json.interactionDetails.map(ppi => {return viralInteractionDetailsSerializer.fromJson(ppi)})
      .sort((a,b) => {return ViralInteractionDetails.sort(a,b);});
    return obj;
  }
}

export class VirusInteractionSerializer implements PharosSerializer{
  fromJson(json: any): any {
    const obj = new ViralInteractionDetails();
    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);
    return obj;
  }
}
