import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

export interface Message {
  date: string;
  index: number;
  message: string;
}

export interface Comment extends Message {
  author: string;
  imgurl: string;
  title: string;
}

@Component({
  selector: 'pharos-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewsPanelComponent implements OnInit {
  items: Message[];

  constructor(private db: AngularFirestore) {
     this.db.collection<Message>('public').valueChanges()
       .subscribe(items => {
      this.items = items.sort((a, b) => b.index - a.index).slice(0, 4);
  });
  }

  ngOnInit() {
  }

}
