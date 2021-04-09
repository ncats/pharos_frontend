import {Target, TargetSerializer} from './target';

export class GwasDiseaseAnalytics {
  efoID: string;
  trait: string;
  geneCount: number;
  studyCount: number;
  associations: GwasDiseaseAssociation[];

  constructor(json: any) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
    this.associations = json.associations.map(assoc => new GwasDiseaseAssociation(assoc, this.efoID));
  }
}

export class GwasDiseaseAssociation {
  target: Target;
  ensgID: string;
  studyCount: number;
  snpCount: number;
  wSnpCount: number;
  traitCountForGene: number;
  studyCountForGene: number;
  medianPvalue: number;
  medianOddsRatio: number;
  betaCount: number;
  meanStudyN: number;
  rcras: number;
  meanRank: number;
  meanRankScore: number;
  provLink: string;
  constructor(json: any, efoID: string) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
    const ts: TargetSerializer = new TargetSerializer();
    if (json.target) {
      this.target = ts.fromJson(json.target);
    }
    if (this.meanRankScore) {
      this.meanRankScore = parseFloat(this.meanRankScore.toFixed(1));
    }
    if (this.medianOddsRatio) {
      this.medianOddsRatio = parseFloat(this.medianOddsRatio.toFixed(1));
    }
    this.provLink = `https://unmtid-shinyapps.net/shiny/tiga/?trait=${efoID}&gene=${this.ensgID}`;
  }
}

