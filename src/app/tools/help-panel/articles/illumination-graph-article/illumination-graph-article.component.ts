import {Component} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';

/**
 * display article about the illumination graph
 */
@Component({
  standalone: true,
  imports: [FlexLayoutModule, MatDivider, MatIcon],
  selector: 'pharos-illumination-graph-article',
  templateUrl: './illumination-graph-article.component.html',
  styleUrls: ['./illumination-graph-article.component.scss']
})
export class IlluminationGraphArticleComponent {

  /**
   * no args
   */
  constructor() { }

}
