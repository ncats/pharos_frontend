import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';


/**
 * baseline object from firebase
 */
export interface Message {
  /**
   * date of message
   */
  date: string;
  /**
   * index of message - firebase doesn't automatically order anything
   */
  index: number;
  /**
   * message text
   */
  message: string;
}

/**
 * comment - has author and title, with image
 *  todo: deprecate?
 */
export interface Comment extends Message {
  /**
   * who wrote the comment
   */
  author: string;
  /**
   * profile comment image
   */
  imgurl: string;
  /**
   * title of comment
   */
  title: string;
}

/**
 * panel that reads a list of comments/messages from firebase
 */
@Component({
  selector: 'pharos-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewsPanelComponent implements OnInit {

  /**
   * list of messages from firebase
   */
  items: Message[];

  /**
   * constructor with database depencency
   * @param {AngularFirestore} db
   */
  constructor(private db: AngularFirestore) {  }

  /**
   * fetch messages, and subscribe to changes
   * sort by index and only take 5
   */
  ngOnInit() {
    this.db.collection<Message>('public').valueChanges()
      .subscribe(items => {
        this.items = items.sort((a, b) => b.index - a.index).slice(0, 4);
      });
  }

}
