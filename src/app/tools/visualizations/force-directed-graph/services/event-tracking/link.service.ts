/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Link} from '../../models/link';

/**
 * service to create links
 * track which links have been clicked on
 * track which link is hovered on
 */
@Injectable()
export class LinkService {
  /**
   * map of all created links
   * @type {Map<any, any>}
   */
  private  masterLinkMap: Map<string, Link> = new Map();

  /**
   * RxJs subject that broadcasts changes to clikced/hovered links
   * @type {Subject<any>}
   * @private
   */
  private _linkSource = new Subject<any>();
  /**
   * list of links that have been clicked on
   * @type {any[]}
   */
  private clickedLinkList: Link[] = [];
  /**
   * link that is currently hovered on, wrapped in an array
   * @type {any[]}
   */
  private hoveredLinkList: Link[] = [];

  //  Observable navItem stream
  /**
   * Observable for components to subscribe to (primarily to display links)
   * @type {Observable<any>}
   */
  linkslist$ = this._linkSource.asObservable();

  /**
   * adds link to clicked link list
   * pushes broadcast of link clicks
    * @param {Link} link
   */
  clickedLinks(link: Link): void {
    this.clickedLinkList.push(link);
    this._linkSource.next({
      clicked: this.clickedLinkList,
      hovered: this.hoveredLinkList
    });
  }

  /**
   * update hovered link
   * pushes broadcast of changes
   * @param {Link[]} link
   */
  hoveredLink(link: Link[]): void {
    if (this.hoveredLinkList.length > 0) {
      this.hoveredLinkList = [];
    }
    this.hoveredLinkList.push(...link);
    this._linkSource.next({
      clicked: this.clickedLinkList,
      hovered: this.hoveredLinkList
    });
  }

  /**
   * remove link from clicked list
   * broadcast changes
   * @param {Link} link
   */
  removeClickedLink(link: Link): void {
    this.clickedLinkList.splice( this.clickedLinkList.indexOf(link), 1);
    this._linkSource.next({
      clicked: this.clickedLinkList,
      hovered: this.hoveredLinkList
    });
  }

  /**
   * return full map of links (mapped by uuid)
   * @return {Map<string, Link>}
   */
  getLinks(): Map<string, Link> {
    return this.masterLinkMap;
  }

  /**
   * get link by uuid
   * @param id
   * @return {Link}
   */
  getById(id): Link {
    return this.masterLinkMap.get(id);
  }

  /**
   * set link in {masterLinkMap}
   * @param {Link} link
   */
  setLink(link: Link): void {
    this.masterLinkMap.set(link.uuid, link);
  }

  /**
   * searches to see if a link exists. if it does, it returns the link with the sent data merged,
   * if it doesn't exist, it makes a new link with the data
   * @param {string} id
   * @param source
   * @param target
   * @param data
   * @return {Link}
   */
  makeLink(id: string, source?: any, target?: any, data?: any): Link {
    let l: Link = this.masterLinkMap.get(id);
    if (!l) {
      l = new Link(source, target, data);
      l.uuid = id;
    }
    return l;
  }


  empty() {
    this.masterLinkMap.clear();
  }



}
