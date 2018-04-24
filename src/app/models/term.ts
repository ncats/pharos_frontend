import {Property} from "./property";

export class Term extends Property {
term: string;
href: string;

constructor (obj:any) {
  super(obj);
  Object.entries((obj)).forEach((prop) => this[prop[0]] = prop[1]);
}

getData(): string {return this.term}
}
