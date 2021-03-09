export class FieldList{
  listName?: string;
  field: FieldDetail[];

  equals(other: FieldList){
    return this.listName === other.listName;
  }

  constructor(obj: any) {
    this.listName = obj.listName;
    this.field = obj.field.map(f => {
      return new FieldDetail(f);
    });
    this.field = this.field.sort((a,b) => a.order - b.order);
  }

  asFieldList(): string[]{
    return this.field.map(f => f.type);
  }

  asMultiFieldList(singles: FieldList): string[] {
    return this.onlyMultiFields(singles).map(f => f.type);
  }

  onlyMultiFields(singles: FieldList): FieldDetail[] {
    return this.field.filter(f => {
      return !singles.asFieldList().includes(f.type);
    });
  }
}
export class FieldDetail{
  order: number ;
  type: string;
  dataTable: string;
  dataColumn: string;
  select: string;
  whereClause: string;
  null_table: string;
  null_column: string;
  null_count_column: string;
  null_where_clause: string;
  dataType: string;
  binSize: number;
  log: boolean;
  sourceExplanation: string;
  modelName: string;
  rootTable: string;
  rootColumn: string;

  constructor(obj: any) {
    this.order = obj.order;
    this.type = obj.type;
    this.dataTable = obj.dataTable;
    this.dataColumn = obj.dataColumn;
    this.select = obj.select;
    this.whereClause = obj.whereClause;
    this.null_table = obj.null_table;
    this.null_column = obj.null_column;
    this.null_count_column = obj.null_count_column;
    this.null_where_clause = obj.null_where_clause;
    this.dataType = obj.dataType;
    this.binSize = obj.binSize;
    this.log = obj.log;
    this.sourceExplanation = obj.sourceExplanation;
    this.modelName = obj.modelName;
    this.rootTable = obj.rootTable;
    this.rootColumn = obj.rootColumn;
  }
}
