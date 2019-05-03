import {Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {KatexRenderService} from '../tools/equation-renderer/services/katex-render.service';
import {AngularFirestore} from '@angular/fire/firestore';

export interface Question {
  subject: string;
  question: string;
  answer: string;
  equation?: boolean;
}

@Component({
  selector: 'pharos-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [KatexRenderService]
})
export class FaqPageComponent implements OnInit {
  fields: string[];
  questionsMap: Map<string, Question[]> = new Map<string, Question[]>();
  @ViewChildren('faqAnswer') answers: QueryList<ElementRef>;


  constructor(private db: AngularFirestore,
              private katexRenderService: KatexRenderService) {
  }

  ngOnInit() {
    this.db.collection<Question>('faqs').valueChanges()
      .subscribe(items => {
        items.map(question => {
          const qArr: Question[] = this.questionsMap.get(question.subject);
          if (qArr) {
            qArr.push(question);
            this.questionsMap.set(question.subject, qArr);
          } else {
            this.questionsMap.set(question.subject, [question]);
          }
        });
        this.fields = Array.from(this.questionsMap.keys());
        this.answers.changes.subscribe(answers => {
          const equations: any[] = answers.filter(answer => {
            return answer.nativeElement.classList.contains('equation');
          });
          equations.forEach(element => {
            this.katexRenderService.renderMathInElement(element.nativeElement, {});
          });
        });
      });
  }
}
