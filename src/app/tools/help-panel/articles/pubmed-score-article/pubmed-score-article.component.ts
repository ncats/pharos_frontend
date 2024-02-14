import {Component} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * displays pubmed score article. injected into help panel
 */
@Component({
  standalone: true,
  imports: [FlexLayoutModule],
  selector: 'pharos-pubmed-score-article',
  templateUrl: './pubmed-score-article.component.html',
  styleUrls: ['./pubmed-score-article.component.scss']
})
export class PubmedScoreArticleComponent {

  /**
   * no args
   */
  constructor() { }

}
