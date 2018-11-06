
import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {Property} from '../../models/property';

@Component({
  selector: 'pharos-property-display',
  templateUrl: './property-display.component.html',
  styleUrls: ['./property-display.component.css']
})

export class PropertyDisplayComponent implements OnInit {
/**
 * reusable generic component to display pharos information. uses getter and setter for values, and html
 * will be expanded with templates for router links and external links.
 */
  @Input() showLabel = true;

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<Property>(null);

  // change data to use getter and setter
  @Input()
  set property(value: Property) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value);
  }

  get property() {
    // get the latest value from _data BehaviorSubject
    const prop = this._data.getValue();
    if (prop && prop.label ==='IDG Disease') {
/*      prop.internalHref = '/diseases' + prop.href.split('/diseases')[1];
      console.log(prop);*/
      prop.href = null;
    }
    return prop;
  }

  ngOnInit() {
    // now we can subscribe to it
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeWhile(() => !this.property)
      )
      .subscribe(x => x);
  }
}
