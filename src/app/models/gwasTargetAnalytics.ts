export class GwasTargetAnalytics {
  associations: GwasTargetAssociation[];

  constructor(json: any) {
    this.associations = json.associations.map(assoc => new GwasTargetAssociation(assoc));
  }
}

export class GwasTargetAssociation {
  ensgID: string;
  traitCountForGene: number;
  studyCountForGene: number;
  trait: string;
  efoID: string;
  studyCountForAssoc: number;
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
  constructor(json: any) {
    Object.entries((json)).forEach((prop) => this[prop[0]] = prop[1]);
    if (this.meanRankScore) {
      this.meanRankScore = parseFloat(this.meanRankScore.toFixed(1));
    }
    if (this.medianOddsRatio) {
      this.medianOddsRatio = parseFloat(this.medianOddsRatio.toFixed(1));
    }
    this.provLink = `https://unmtid-shinyapps.net/shiny/tiga/?trait=${this.efoID}&gene=${this.ensgID}`;
  }
}

