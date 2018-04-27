export class TableData {
  name: string;
  label?: string;
  sortable?: boolean;
  internalLink?: string;
  externalLink?: string;
  width?: number;
  tooltip?: boolean;

  constructor(obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
