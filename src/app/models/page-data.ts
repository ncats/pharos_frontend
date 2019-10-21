/**
 * class to track page data used i nthe custom pharos paginator
 */
export class PageData {
  /**
   * total number of pages (not objects)
   */
  total: number;

  /**
   * page size
   */
  skip: number;

  /**
   * number of rows
   */
  top: number;

  /**
   * map object values as available, set defaults for others
   * @param obj
   */
  constructor (obj: any) {
    this.total = obj.total ? obj.total : 0;
    this.skip = obj.skip ? obj.skip : 0;
    this.top = obj.top ? obj.top : 10;
  }
}
