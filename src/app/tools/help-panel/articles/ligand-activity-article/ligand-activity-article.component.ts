import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';

/**
 * display ligand activity article, injected into the help panel
 */
@Component({
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatListModule],
  selector: 'pharos-ligand-activity-article',
  templateUrl: './ligand-activity-article.component.html',
  styleUrls: ['./ligand-activity-article.component.scss']
})
export class LigandActivityArticleComponent {

  /**
   * no args
   */
  constructor() { }
}
