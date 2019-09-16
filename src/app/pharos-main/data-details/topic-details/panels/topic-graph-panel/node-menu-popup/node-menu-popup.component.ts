import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {SGNode} from 'smrtgraph-core';

@Component({
  selector: 'pharos-node-menu-popup',
  templateUrl: './node-menu-popup.component.html',
  styleUrls: ['./node-menu-popup.component.scss']
})
export class NodeMenuPopupComponent implements OnInit {
  @HostBinding('style.top') y = '0px';
  @HostBinding('style.left') x = '0px';
  @HostBinding('style.visibility') visibility = 'hidden';
 // @Input() @HostBinding('style.width') width = '200px';

  node: SGNode;

  constructor() {
  }
  ngOnInit() {
  }
  open(e: any) {
    this.visibility = 'hidden';
    console.log(e);
    this.x = `${e.event.pageX / 2}px`;
    this.y = `${e.event.pageY / 2}px`;
    this.visibility = 'visible';
    this.node = e.node;
    e.event.stopPropagation();
  }
  close() {
    this.visibility = 'hidden';
  }
  /* @HostListener('document:click')
   public onDocumentClick() {
     console.log('document click');
     if (this.visibility === 'visible') {
       this.close();
     }
   }*/
}
