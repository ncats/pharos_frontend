import {PharosProperty} from "./pharos-property";

export class DataVersionInfo {
  key: string;
  dataSources: DataSourceInfo[];
  constructor(json: any) {
    this.key = json.key;
    this.dataSources = json.dataSources.map(ds => new DataSourceInfo(ds));
  }
  static parseJson(json: any[]): DataVersionInfo[] {
    return json.map(dv => new DataVersionInfo(dv));
  }
}

export class DataSourceInfo {
  name: string;
  description: string;
  url: string;
  license: string;
  licenseURL: string;
  citation: string;
  files: DataFileDetails[];

  constructor(json) {
    this.name = json.name;
    this.description = json.description;
    this.url = json.url;
    this.license = json.license;
    this.licenseURL = json.licenseURL;
    this.citation = json.citation;
    this.files = json.files.map(f => new DataFileDetails(f));
  }

  asProperties() {
    const props: PharosProperty[] = [];
    const fields = ['description', 'url', 'license', 'licenseURL', 'citation'];
    const labels = ['Description', 'URL', 'License', 'License URL', 'Citation'];
    fields.forEach((f, i) => {
      if (this[f]) {
        if (this[f].startsWith('http://') || this[f].startsWith('https://')) {
          props.push(new PharosProperty(
            {name:f, label: labels[i], term: this[f], externalLink: this[f]}
          ))
        } else {
          props.push(new PharosProperty(
            {name:f, label: labels[i], innerHTML: this[f]}
          ));

        }
      }
    });
    return props;
  }

  filesAsProperties() {
    return this.files.map(f => {
      const fileProp: any = {};
      fileProp.key = new PharosProperty({name:"key", label: "key", term: f.key});
      fileProp.file = new PharosProperty({name:"file", label: "file", term: f.file});
      fileProp.version = new PharosProperty({name:"version", label: "version", term: f.version});
      fileProp.releaseDate = new PharosProperty({name:"releaseDate", label: "releaseDate",
        term: f.releaseDate ? f.releaseDate.toDateString() : null});
      fileProp.downloadDate = new PharosProperty({name:"downloadDate", label: "downloadDate",
        term: f.downloadDate ? f.downloadDate.toDateString(): null});
      return fileProp;
    });
  }
}

export class DataFileDetails {
  key: string;
  file: string;
  version: string;
  releaseDate: Date;
  downloadDate: Date;

  constructor(json: any) {
    this.key = json.key;
    this.file = json.file;
    this.version = json.version;
    this.releaseDate = json.releaseDate ? new Date(Date.parse(json.releaseDate)) : null;
    this.downloadDate = json.downloadDate ? new Date(Date.parse(json.downloadDate)) : null;
  }
}
