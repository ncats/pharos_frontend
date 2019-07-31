import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pharos-loading-spinner',
  templateUrl: './pharos-loading-spinner.component.html',
  styleUrls: ['./pharos-loading-spinner.component.scss']
})
export class PharosLoadingSpinnerComponent implements OnInit {

 // @Input() showSpinner = true;
  @Input() showText = true;

  constructor() { }

  ngOnInit() {
  }
}
