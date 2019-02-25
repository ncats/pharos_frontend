import { Directive } from '@angular/core';

@Directive({
  selector: '[pharosTrackScroll]',
  host: {'(window:scroll)': 'track($event)'}

})
export class TrackScrollDirective {

  constructor() { }
  track($event: Event) {
    console.debug("Scroll Event", $event);
  }
}
