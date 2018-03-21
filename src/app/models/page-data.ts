export class PageData {
  total: number;
  count: number;
  skip: number;
  top: number;

  constructor (obj: any) {
    this.total = obj.total ? obj.total : 0;
    this.count = obj.count ? obj.count : 0;
    this.skip = obj.skip ? obj.skip : 0;
    this.top = obj.top ? obj.top : 0;
  }
}
