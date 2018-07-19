/**
 * [TableData]
 */
export class TableData {
  name: string;
  label?: string;
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  internalLink?: string;
  externalLink?: string;
  width?: number;
  tooltip?: boolean;

  constructor(obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
