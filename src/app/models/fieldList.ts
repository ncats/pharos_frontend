export class FieldList{
  listName?: string;
  field: FieldDetail[];

  equals(other: FieldList){
    if (!other) {return false; }
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
    return this.field.map(f => f.name);
  }

  asMultiFieldList(singles: FieldList): string[] {
    return this.onlyMultiFields(singles).map(f => f.name);
  }

  onlyMultiFields(singles: FieldList): FieldDetail[] {
    return this.field.filter(f => {
      return !singles.asFieldList().includes(f.name);
    });
  }
}
export class FieldDetail{
  order: number;
  name: string;
  description: string;
  group_method: string;
  dataType: string;
  default: boolean;

  constructor(obj: any) {
    this.order = obj.order;
    this.name = obj.name;
    this.description = obj.description;
    this.group_method = obj.group_method;
    this.dataType = obj.dataType;
    this.default = obj.default;
  }
}
