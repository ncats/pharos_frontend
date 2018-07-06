import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AngularFirestore} from "angularfire2/firestore";
import * as katex from 'katex';
import {KatexRenderService} from "../tools/katex-render.service";

export interface Question {
  subject: string;
  question: string;
  answer: string;
  equaation?: boolean;
}

@Component({
  selector: 'pharos-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
  providers: [KatexRenderService]
})
export class FaqPageComponent implements OnInit {
questions: Question[];
fields: string[];
questionsMap: Map<string, Question[]> = new Map<string, Question[]>();
  @ViewChildren('faqAnswer') answers: QueryList<ElementRef>;


  constructor(
    private db: AngularFirestore,
    private katexRenderService: KatexRenderService
              ) {}

  ngOnInit() {
    this.db.collection<Question>('faqs').valueChanges()
      .subscribe(items => {
        items.map(question => {
          const qArr: Question[] = this.questionsMap.get(question.subject);
          if (qArr){
            qArr.push(question);
            this.questionsMap.set(question.subject, qArr);
          } else {
            this.questionsMap.set(question.subject, [question]);
          }
        });
        this.fields = Array.from(this.questionsMap.keys());
      });
  }

  ngAfterViewInit(){
    let equations =[];
    this.answers.changes.subscribe(answers => {
       equations = answers.filter(answer => {
        return answer.nativeElement.classList.contains('equation')
      });
      equations.forEach(element => {
       this.katexRenderService.renderMathInElement(element.nativeElement, {});
      })
    });
  }
}
