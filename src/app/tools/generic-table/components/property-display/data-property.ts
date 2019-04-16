export class DataProperty {
  id?: number;
  name?: string;
  label: string;
  term?: string | number | Date;
  href?: string;
  sortable?: boolean;
  sorted?: 'asc' | 'desc' | null;
  internalLink?: string;
  externalLink?: string;
  visible?: boolean;
  width?: number;
  customComponent?: any;

  constructor(obj?: any){
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
