import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable()
export class NodeMenuControllerService {
  private _clickedMenuSource = new Subject<any>();
  //  Observable navItem stream
  clickedmenu$ = this._clickedMenuSource.asObservable();
  private _activeMenu: string;

  //  service command
  /**
   * tracks which node has the menu ope, and toggles visibilty accordingly
   * @param {string} node
   */
  toggleVisible(node: string) {
    // menu already open -- close it
     if (this._activeMenu && this._activeMenu === node) {
      this.hideMenus();
    } else {
    // menu closed -- open it
      this._activeMenu = node;
      this.showMenu();
    }
  }

  /**
   * opens menu
   * @returns void
   */
  showMenu(): void {
    this._clickedMenuSource.next(true);
  }

  /**
   * closes menu
   * @returns void
   */
  hideMenus(): void {
    this._clickedMenuSource.next(false);
  }

}

