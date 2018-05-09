/**
 * Created by sheilstk on 6/16/17.
 */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Link} from '../../models/link';

@Injectable()
export class LinkService {
  //  Observable navItem source
  private _linkSource = new Subject<any>();
  private  masterLinkMap: Map<string, Link> = new Map();
private clickedLinkList: Link[] = [];
private hoveredLinkList: Link[] = [];

  //  Observable navItem stream
  linkslist$ = this._linkSource.asObservable();

  //  service command
  clickedLinks(link: Link): void {
    this.clickedLinkList.push(link);
    this._linkSource.next({
      clicked: this.clickedLinkList,
      hovered: this.hoveredLinkList
    });
  }

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

  removeClickedLink(link: Link): void {
    this.clickedLinkList.splice( this.clickedLinkList.indexOf(link), 1);
    this._linkSource.next({
      clicked: this.clickedLinkList,
      hovered: this.hoveredLinkList
    });
  }

  getLinks(): Map<string, Link> {
    return this.masterLinkMap;
  }

  getById(id): Link {
    return this.masterLinkMap.get(id);
  }

  setLink(link: Link): void {
    this.masterLinkMap.set(link.uuid, link);
  }

  // searches to see if a link exists. if it does, it returns the link with the sent data merged,
  // if it doesn't exist, it makes a new link with the data
  makeLink(id: string, source?: any, target?: any, data?: any): Link {
    let l: Link = this.masterLinkMap.get(id);
    if (!l) {
      l = new Link(source, target, data);
    }
    return l;
  }






}
