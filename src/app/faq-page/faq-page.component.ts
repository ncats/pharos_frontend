import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {KatexRenderService} from '../tools/equation-renderer/services/katex-render.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {isPlatformBrowser} from "@angular/common";

/**
 * Question model for object retrieved from firebase
 * // todo should probably move to models directory
 */
export interface Question {
  /**
   * main subject of question
   */
  subject: string;
  /**
   * asked question
   */
  question: string;

  /**
   * answer to question
   */
  answer: string;

  /**
   * boolean flag to render katex expressions
   */
  equation?: boolean;
}

/**
 * page to display faqs section of pharos
 */
@Component({
  selector: 'pharos-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [KatexRenderService]
})

export class FaqPageComponent implements OnInit {
  /**
   * extracted list of field labels to be used as accordion panel headers
   */
  subjects: string[];

  /**
   * questions from firebase, mapped vy
   * @type {Map<string, Question[]>}
   */
  questionsMap: Map<string, Question[]> = new Map<string, Question[]>();

  /**
   * Query List of answer elements to render with katex
   */
  @ViewChildren('faqAnswer') answers: QueryList<ElementRef>;

  /**
   * firestore database to retrieve questions
   * katex render service renders equation text as a math image
   * @param {AngularFirestore} db
   * @param {KatexRenderService} katexRenderService
   */
  constructor(private db: AngularFirestore,
              private katexRenderService: KatexRenderService,
              @Inject(PLATFORM_ID) private platformID: Object) {
  }

  /**
   * retrieve questions from database, and watch for changes
   */
  ngOnInit() {
    this.db.collection<Question>('faqs').valueChanges()
      .subscribe(items => {
        // create and map questions by subject
        if (items && items.length) {
          items.map(question => {
            const qArr: Question[] = this.questionsMap.get(question.subject);
            if (qArr) {
              qArr.push(question);
              this.questionsMap.set(question.subject, qArr);
            } else {
              this.questionsMap.set(question.subject, [question]);
            }
          });

          // get list of subjects for accordion
          this.subjects = Array.from(this.questionsMap.keys());

          // find and render equations with katex
          if (isPlatformBrowser(this.platformID)) {
            this.answers.changes.subscribe(answers => {
              const equations: any[] = answers.filter(answer => {
                return answer.nativeElement.classList.contains('equation');
              });
              equations.forEach(element => {
                this.katexRenderService.renderMathInElement(element.nativeElement, {});
              });
            });
          }
        }
      });
  }
}
