import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDivider} from '@angular/material/divider';
import {ReviewBannerService} from '../pharos-services/review-banner.service';

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
}

/**
 * page to display faqs section of pharos
 */
@Component({
  standalone: true,
  imports: [CommonModule, MatAccordion, MatExpansionModule, FlexLayoutModule, MatDivider],
  selector: 'pharos-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})

export class FaqPageComponent implements OnInit, OnDestroy {
  dbSubscription: Subscription;
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
   * Query List of answer elements to render
   */
  @ViewChildren('faqAnswer') answers: QueryList<ElementRef>;

  /**
   * firestore database to retrieve questions
   * @param {AngularFirestore} db
   */
  constructor(private db: AngularFirestore,
              public bannerService: ReviewBannerService) {
  }

  /**
   * retrieve questions from database, and watch for changes
   */
  ngOnInit() {
    // @ts-ignore
    this.dbSubscription = this.db.collection<Question>('faqs').valueChanges()
      .subscribe(items => {
        // create and map questions by subject
        if (items && items.length) {
          items.map(question => {
            const qArr: Question[] = this.questionsMap.get(question.subject);
            if (qArr) {
              const existingQuestion = qArr.find(q => q.question === question.question);
              if (existingQuestion) {
                existingQuestion.answer = question.answer;
              }
              else {
                qArr.push(question);
              }
            } else {
              this.questionsMap.set(question.subject, [question]);
            }
          });

          // get list of subjects for accordion
          this.subjects = Array.from(this.questionsMap.keys());
        }
      });
  }

  ngOnDestroy(): void {
    if (this.dbSubscription) {
      this.dbSubscription.unsubscribe();
    }
  }
}
