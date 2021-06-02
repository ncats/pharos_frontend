export class LigandAssociationDetails {
  actValMap: Map<string, AssociationStats> = new Map<string, AssociationStats>();
  actVals: string;
  avgActVal: number;
  modeOfAction: string;

  static fromJSON(json: any): LigandAssociationDetails{
    const obj = new LigandAssociationDetails();
    obj.actVals = json.actVals;
    obj.avgActVal = json.avgActVal;
    obj.modeOfAction = json.modeOfAction;

    const activities = obj.actVals.split(',');
    activities.forEach(act => {
      const pieces = act.trim().split(' ');
      const type = pieces.length > 1 ? pieces[0] : '-';
      const val = pieces.length > 1 ? pieces[1] : pieces[0];
      let stats = new AssociationStats();
      if (obj.actValMap.has(type)){
        stats = obj.actValMap.get(type);
      } else {
        obj.actValMap.set(type, stats);
      }
      stats.list.push(parseFloat(val));
    });
    obj.actValMap.forEach((v, k) => {
      v.calculateStats();
    });
    return obj;
  }

}

export class AssociationStats {
  list: number[] = [];
  mean?: number;
  n?: number;
  stddev?: number;
  stderr?: number;

  calculateStats() {
    this.mean = this.average(this.list);
    this.n = this.list.length;
    this.stddev = this.standardDeviation(this.list);
    this.stderr = this.stddev / Math.sqrt(this.n);
  }

  standardDeviation(data) {
    const avg = this.average(data);
    const sqDiffs = data.map(d => (d - avg) ** 2);
    const avgSqDiff = this.average(sqDiffs);
    return Math.sqrt(avgSqDiff);
  }

  average(data){
    const total = data.reduce((sum, value) => {
      return sum + value;
    }, 0);
    return total / data.length;
  }
}
