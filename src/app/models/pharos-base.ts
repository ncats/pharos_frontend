export class PharosBase {
  created:  number;
  deprecated: boolean;
  href: string;
  id: number;
  kind?: string;
  modified:  number;
  version: number;
  _namespace: string;

  constructor (obj: any) {
    Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
  }
}
