import {Component, Input} from '@angular/core';
import {Disease} from '../../../../models/disease';

/**
 * header component for disease details page display
 */
@Component({
  selector: 'pharos-disease-header',
  templateUrl: './disease-header.component.html',
  styleUrls: ['./disease-header.component.css']
})

export class DiseaseHeaderComponent {
  /**
   * disease object
   */
  @Input() disease: Disease;

  /**
   * no args constructor
   */
  constructor() { }

}
