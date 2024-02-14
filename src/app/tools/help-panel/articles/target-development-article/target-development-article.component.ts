import {Component} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

/**
 * displays target development level article. Injected into help panel.
 */
@Component({
  standalone: true,
  imports: [FlexLayoutModule],
  selector: 'pharos-target-development-article',
  templateUrl: './target-development-article.component.html',
  styleUrls: ['./target-development-article.component.scss']
})
export class TargetDevelopmentArticleComponent {

  /**
   * no args
   */
  constructor() { }

}
