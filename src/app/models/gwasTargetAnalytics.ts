export class GwasTargetAnalytics {
  ensgID: string;
  traitCount: number;
  studyCount: number;
  associations: GwasTargetAssociation[];

  constructor(json: any) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
    this.associations = json.associations.map(assoc => new GwasTargetAssociation(assoc, this.ensgID));
  }
}

export class GwasTargetAssociation {
  trait: string;
  efoID: string;
  studyCount: number;
  snpCount: number;
  wSnpCount: number;
  geneCountForTrait: number;
  studyCountForTrait: number;
  medianPvalue: number;
  medianOddsRatio: number;
  betaCount: number;
  meanStudyN: number;
  rcras: number;
  meanRank: number;
  meanRankScore: number;
  provLink: string;
  diseaseName: string;
  constructor(json: any, ensgID: string) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
    if (this.meanRankScore) {
      this.meanRankScore = parseFloat(this.meanRankScore.toFixed(1));
    }
    if (this.medianOddsRatio) {
      this.medianOddsRatio = parseFloat(this.medianOddsRatio.toFixed(1));
    }
    this.provLink = `https://unmtid-shinyapps.net/shiny/tiga/?trait=${this.efoID}&gene=${ensgID}`;
  }
}

